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
      path: '/countries',
      name: 'countries',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CountriesView
    }
  ]
})

export default router
