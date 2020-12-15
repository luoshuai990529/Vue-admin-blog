
// 引入校验方法
import { validMobile } from '@/utils/validate'
import { register, createCaptcha } from '@/api/user'
export default {
  name: 'Register',
  data() {
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('用户名格式不正确'))
    }
    return {
      captchaContent: '',
      captchaSvg: '',
      captchaText: '',
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', message: '账号格式错误', validator: validateMobile }],
        password: [{ required: true, min: 6, trigger: 'blur', message: '密码最少6位' }]
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
  mounted() {
    // 获取验证码
    this.createCaptcha()
  },
  methods: {
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
      // 注册
      // 验证验证码
      if (this.captchaText !== this.captchaSvg) {
        // 如果验证码输入错误  重新请求验证码
        this.$message({
          type: 'warning',
          message: '验证码错误'
        })
        this.captchaText = ''
        this.createCaptcha()
        return
      }
      // 先完成手动的校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            // 表示校验通过
            this.loading = true // 先让按钮转圈
            // await this['user/login'](this.loginForm) // 调用action
            const res = await register(this.loginForm)
            this.loading = false
            if (res.code === 202) {
              this.$message({
                type: 'warning',
                message: res.message
              })
              this.loginForm.account = ''
              this.captchaText = ''
              this.createCaptcha()
            } else {
              this.$message({
                type: 'success',
                message: res.message
              })
              // 注册成功跳转到登录页
              this.$router.push('/') // 跳到主页
            }
          } catch (error) {
            this.loading = false // 失败之后关闭转圈
          }
        }
      })
    },
    async createCaptcha() {
      const result = await createCaptcha()
      this.captchaContent = result.data
      this.captchaSvg = result.text.toLowerCase()
    },
    changeCaptcha() {
      this.createCaptcha()
    }
  }
}
