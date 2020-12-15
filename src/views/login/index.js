
// 引入校验方法
import { validMobile } from '@/utils/validate'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('用户名格式不正确'))
    }
    return {
      loginForm: {
        account: '18374723577',
        password: '123456'
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', message: '账号不能为空', validator: validateMobile }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 引入子模块方法
    ...mapActions(['user/login']),
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // 登录按钮
      // 先完成手动的校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            // 表示校验通过
            this.loading = true // 先让按钮转圈
            await this['user/login'](this.loginForm) // 调用action
            this.loading = false
            // 跳转到主页
            this.$router.push('/') // 跳到主页
          } catch (error) {
            this.loading = false // 失败之后关闭转圈
          }
        }
      })
    }
  }
}
