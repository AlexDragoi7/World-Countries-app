import { createRouter, createWebHistory } from 'vue-router'
import ContinentsView from '../views/ContinentsView.vue'
import CountriesView from '../views/CountriesView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ResetPassword from '../views/ResetPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword
    },
    {
      path: '/continents',
      name: 'continents',
      component: ContinentsView
    },
    {
      path: '/continents/:continent',
      name: 'continents-countries',
      component: CountriesView
    }
  ]
})

export default router
