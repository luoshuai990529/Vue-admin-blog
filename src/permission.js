import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login', '/404', '/registerAC'] // 定义白名单 所有不受权限控制的页面

// 路由的前置守卫
router.beforeEach(async function(to, from, next) {
  NProgress.start() // 开启进度条
  // 首先判断有没有token
  if (store.getters.token) {
    // 如果有token就判断是否去登录页
    if (to.path === '/login') {
      next('/') // 跳到主页
    } else {
      store.getters.userId ? console.log('有用户id直接放行') : console.log('没有用户id，重新请求用户信息')
      if (!store.getters.userId) {
        // 如果没有用户ID， 重新调用Vuex获取资料的action
        const { roles } = await store.dispatch('user/getUserInfo')
        // roles.menus 是权限标识 它要去和路由模块做对应 进行筛选 筛选的得到的权限 进行addRoutes 并写入到vuex的state中
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        // routes就是该用户所拥有的动态路由数组
        // 将得到的动态路由添加到路由表中
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        // 如果进行了addRoutes 请用next(to.path) 否则会导致 刷新路由权限失效 这是一个已知缺陷
        next(to.path)
      } else {
        // 如果拥有用户ID 就直接放行
        next()
      }
    }
  } else {
    // 如果没有token
    if (whiteList.indexOf(to.path) > -1) {
      // 如果大于-1 表示在白名单里 就放行
      next()
    } else {
      next('/login') // 否则跳到登录页
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})

// 后置守卫
router.afterEach(function() {
  NProgress.done() // 关闭进度条
})

