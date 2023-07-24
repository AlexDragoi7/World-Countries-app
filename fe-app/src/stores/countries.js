import { defineStore } from 'pinia'
import axios from 'axios'

export const useCountriesStore = defineStore('countries', {
  state: () => ({ countries: [], country: {} }),
  getters: {
    getCountries(state) {
      return state.countries
    },
    getCountry(state) {
      return state.country
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
    },
    async fecthCountryByName(countryName) {
      try {
        const response = await axios.get(
          `http://localhost:3500/countries/countryname?country_name=${countryName}`
        )
        this.country = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
