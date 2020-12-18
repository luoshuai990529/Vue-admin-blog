import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 引入多个模块的规则
import articleRouter from './modules/article'
import todoRouter from './modules/todo'
import authorityRouter from './modules/authority'
import codesRouter from './modules/codes'
import commentRouter from './modules/comment'
import edituserRouter from './modules/edituser'
import approvalRouter from './modules/approval'

// constantRoutes 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/registerAC',
    component: () => import('@/views/register/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

// 动态路由 将所有模块的路由都放入到了一个asyncRoutes里面的数组里了
export const asyncRoutes = [
  todoRouter,
  authorityRouter,
  codesRouter,
  commentRouter,
  edituserRouter,
  articleRouter,
  approvalRouter
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    mode: 'history', // require service support  默认模式就是hash  换成history
    base: '/blog/',
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes]
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter() // reset router
  router.matcher = newRouter.matcher // reset router 这句代码是重置路由的关键
  // matcher是 路由的信息对象
}

export default router
