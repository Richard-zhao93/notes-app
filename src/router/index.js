import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'MyToDo',
      component: () => import('@/views/MyTodo')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard')
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import('@/views/Setting')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About')
    }
  ]
})
