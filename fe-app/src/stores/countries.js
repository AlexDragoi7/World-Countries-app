import { defineStore } from 'pinia'
import axios from 'axios'

export const useCountriesStore = defineStore('countries', {
  state: () => ({ countries: [] }),
  getters: {
    getCountries(state) {
      return state.countries
    }
  },
  actions: {
    async fetchCountriesByContinent(continentId) {
      try {
        const response = await axios.get(`http://localhost:3500/countries/${continentId}`)
        this.countries = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
