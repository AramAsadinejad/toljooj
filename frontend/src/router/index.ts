import { createRouter, createWebHistory, type RouteRecordInfo, type RouteRecordRaw } from 'vue-router'
import Login from '@/components/Login.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/Register.vue'),
  },

  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
