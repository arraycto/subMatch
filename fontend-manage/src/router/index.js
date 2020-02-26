import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index.js"
import {
  isEmpty
} from "../utils/stringUtil.js"

import pub from './pub.js';

Vue.use(Router)

// 所有角色都可以访问的页面
export const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },
  {
    path: '/loginout',
    component: () => import('@/views/loginout/loginout'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/views/index'),
    hidden: true,
    children: [].concat(pub) // 在这里引入注册模块的路由
  }
]
// 需动态判断权限的路由
export const asyncRoutes = [
  {
    path: '/home',
    component: () => import('@/views/index'),
    children: [].concat(pub) // 在这里引入注册模块的路由
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  // mode:"history",
  routes: constantRoutes || store.getters.permission_routes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 未登陆的用户会被自动导航到login
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login' || to.path === '/loginon') {
//     next()
//     return
//   }
//   var token = store.getters.token || JSON.parse(sessionStorage.getItem('store')).user.token;
//   if (isEmpty(token)) {
//     router.push('/login')
//     return
//   }
//   next()
// })
export default router
