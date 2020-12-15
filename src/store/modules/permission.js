// vuex的权限模块
import { constantRoutes, asyncRoutes } from '@/router'
// console.log(asyncRoutes)
// vuex中的permission模块用来存放当前的 静态路由 + 当前用户的 权限路由
const state = {
  routes: constantRoutes // 所有人默认拥有静态路由
}
const mutations = {
  // newRoutes可以认为是 用户登录 通过权限所得到的动态路由的部分
  setRoutes(state, newRoutes) {
    // 下面这么写不对 不是语法不对 是业务不对
    // state.routes = [...state.routes, ...newRoutes]
    // 有一种情况  张三 登录 获取了动态路由 追加到路由上  李四登录 4个动态路由
    // 应该是每次更新 都应该在静态路由的基础上进行追加
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // 负责筛选路由的action action的功能是 通过将menus的数据和动态路由的数据进行匹配，得到筛选之后的路由
  // asyncRoutes 是所有的动态路由  我们要从menus中找标识  然后在asyncRoutes中找和这个标识一样的路由
  // ["settings", "social_securitys", "permissions", "approvals", "departments", "salarys", "employees", "user12345", "attendances"]
  async filterRoutes(context, menus) {
    const routes = []
    menus.forEach(item => {
      //   item 就是一个标识
      if (asyncRoutes.some(route => route.name === item)) {
        //  这个认为找到了标识一样的路由
        routes.push(...asyncRoutes.filter(route => route.name === item))
      }
    })
    // 执行到这里的时候 routes就已经是 和menus标识关联完成的路由了  routes相当于完成筛选之后的动态路由
    context.commit('setRoutes', routes)
    return routes // 这里为什么又要return呢 上面是 将数据写入 vuex  return的作用是将数据返回 供 去做 addRoutes使用
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
