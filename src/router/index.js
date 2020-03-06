import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import SecondHome from '@/views/home/second_home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' // 强制跳转到home页

  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '', // 二级路由的path什么都不写 代表二级路由的默认组件
        component: SecondHome// 默认的二级路由组件
      }, {
        // path:'/home/comment', 完整地址
        path: 'comment', // 简写地址
        component: () => import('@/views/comment')// 组件
      }, {
        // path: '/home/material' // 二级路由地址
        path: 'material', // 简写地址 下面要有component
        component: () => import('@/views/material')
        // 采用按需加载的---点击素材管理的时候才会请求这个组件，且只请求一次
      }
    ]
    // I在一级路由的路由表下 children配置二级路由表
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  // {
  //   // 按需加载
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
