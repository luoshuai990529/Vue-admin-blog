import axios from 'axios'
import Cookies from 'js-cookie'

// 拿到store仓库，可以拿到根级的getters
import store from '@/store'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'
const service = axios.create({
  // 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 5s 超时
})

// 检查超时的函数
const TimeOut = 7200 // 定义两个小时的有效时间
const CheckTimeOut = function() {
  // 首先要获取缓存中的时间戳
  var currentTime = new Date().getTime() // 获取当前时间
  var timeStamp = getTimeStamp() ? getTimeStamp() : 0
  return (currentTime - timeStamp) / 1000 > TimeOut
}

// 请求拦截器
service.interceptors.request.use((config) => {
  // 请求拦截：统一注入token
  if (store.getters.token) {
    // 如果token存在，就检查token是否超时
    if (CheckTimeOut()) {
      // 如果进来，表示差距已经大于7200秒了
      // 调用登出的action
      store.dispatch('user/logout') // 调用登出的action
      router.push('/login') // 回到登录页
      return Promise.reject(new Error('token超时了')) // 为了阻止继续往下走 要返回一个promise的reject
    }
    // 如果token存在 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  if (config.method === 'post') {
    // 如果我发送的是post请求  需要在请求头带上csrftoken，这是egg的安全策略
    const csrftoken = Cookies.get('csrfToken')
    config.headers['x-csrf-token'] = csrftoken
  }
  // 必须返回config 配置
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  //  因为response实际上多加了一层data
  const { success, message } = response.data
  if (success === 'ok') {
    //  如果成功 表示业务执行成功 直接返回data
    return response.data
  } else {
    // 如果返回的状态码为401 代表token身份验证错误  回到登录页
    if (response.data.code === 401) {
      Message.error(message) // 先提示错误
      store.dispatch('user/logout') // 调用登出的action
      router.push('/login') // 回到登录页
      return Promise.reject(new Error(message))
    }
    // 表示没有执行成功先弹出错误消息 再reject 如403等用户冻结信息
    Message.error(message) // 先提示错误
    return Promise.reject(new Error(message))
  }
},
error => {
  if (error && error.response && error.response.data.code === 10002) {
    //  当状态码为10002时 表示后端告诉我 超时了
    store.dispatch('user/logout') // 调用登出的action
    router.push('/login') // 回到登录页
    return Promise.reject(new Error('超时了')) // 返回错误
  } else {
    // 提示失败
    Message.error(error.message) // 提示错误
    return Promise.reject(error) // 返回错误
  }
}
)

// 导出
export default service
