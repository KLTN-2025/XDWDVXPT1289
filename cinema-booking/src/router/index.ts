import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Movies from '@/views/Movies.vue'
import Seats from '@/views/Seats.vue'
import Payment from '@/views/Payment.vue'
import Ticket from '@/views/Ticket.vue'
import Admin from '@/views/Admin.vue'
import Auth from '@/views/Auth.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/seats',
      name: 'seats',
      component: Seats
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: Ticket
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})

export default router
