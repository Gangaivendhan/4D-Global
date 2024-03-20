import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import userCreation from '../pages/creation/userCreation.vue'
import EmployerDashboard from '../pages/dashboard/EmployerDashboard.vue'
import TLDashboard from '../pages/dashboard/TLDashboard.vue'
import AdminDashboard from '../pages/dashboard/AdminDashboard.vue'
import Header from '@/pages/Layout/Header.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),



  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: '/login',
      name: 'login',
      component: HomeView
    },
    
    {
      path: '/Header',
      name: 'Header',
      component: Header,

      children:[
        {
          path: '/userCreation',
          name: 'userCreation',
          component: userCreation
        },
        {
          path: '/EmployerDashboard',
          name: 'EmployerDashboard',
          component: EmployerDashboard
        },
        {
          path: '/TLDashboard',
          name: 'TLDashboard',
          component: TLDashboard
        },
        {
          path: '/AdminDashboard',
          name: 'AdminDashboard',
          component: AdminDashboard
        },
      ]
    },
  ]
})

export default router
