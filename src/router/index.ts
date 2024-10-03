import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

// const guard = (to:any) => {
//   if(to.meta.requiresAuth && !store.state.authenticated){
//     return {
//       path: '/',
//       query: { redirect: to.fullPath },
//     }
//   }
// }

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../components/LoginCom.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/HomeCom.vue'),
    // meta:{requiresAuth:true},
    // beforeEnter:[guard]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/RegisterCom.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgotpassword',
    component: () => import('../components/ForgotPassword.vue')
  },
  {
    path: '/reset-password',
    name: 'resetpassword',
    component: () => import('../components/PassConfirmpas.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
