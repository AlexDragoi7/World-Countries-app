import { createRouter, createWebHistory } from 'vue-router'
import ContinentsView from '../views/ContinentsView.vue'
import CountriesView from '../views/CountriesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'continents',
      component: ContinentsView
    },
    {
      path: '/:continent',
      name: 'continents-countries',
      component: CountriesView
    }
  ]
})

export default router
