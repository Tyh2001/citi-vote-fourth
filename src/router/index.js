import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/vote',
    component: () => import('@/views/vote.vue')
  },
  {
    path: '/list',
    component: () => import('@/views/list.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  }
})

// router.beforeEach((to, from, next) => {
//   if (from.path === '/list' && to.path !== '/list') {
//     next('/list')
//     return
//   }
//   if (to.path !== '/' && !store.state.SOEID) {
//     next('/')
//   } else {
//     next()
//   }
// })

export default router
