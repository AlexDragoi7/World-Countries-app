import { createRouter, createWebHistory } from 'vue-router'
import ContinentsView from '../views/ContinentsView.vue'
import CountriesView from '../views/CountriesView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ResetPassword from '../views/ResetPassword.vue'
import FavoriteCountriesView from '../views/FavoriteCountriesView.vue'

import isAuthenticated from '../services/auth'

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
      path: '/continents/:id/:name',
      name: 'continents-countries',
      component: CountriesView
    },
    {
      path: '/my-favorites',
      name: 'favorite-countries',
      component: FavoriteCountriesView
    }
  ]
})

router.beforeEach(async (to, from) => {
  const isUserAuthenticated = isAuthenticated()
  if (
    // make sure the user is authenticated
    !isUserAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login' &&
    to.name !== 'reset-password' &&
    to.name !== 'signup'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
