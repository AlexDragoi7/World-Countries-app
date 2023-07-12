// stores/continent.js
import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from 'axios'

export const useContinentStore = defineStore('continent', {
  state: () => ({ continents: [] }),
  getters: {
    getContinents(state) {
      return state.continents
    }
  },
  actions: {
    async fetchContinents() {
      try {
        const data = await axios.get('http://localhost:3500/continents')
        this.continents = data.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
