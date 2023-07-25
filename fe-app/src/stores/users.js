import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore('users', {
  state: () => ({ user: {}, countryAddedToFavorite: false }),
  getters: {
    getUser(state) {
      return state.user
    },
    getCountryAddedToFavorite(state) {
      return state.countryAddedToFavorite
    }
  },
  actions: {
    async signup(user) {
      try {
        const response = await axios.post(`http://localhost:3500/users/signup`, user)
        this.user = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async addCountriesToFavorites(countryId, email) {
      try {
        const response = await axios.post(
          `http://localhost:3500/users/favoritecountries`,
          {
            new_favoriteCountry: countryId,
            email: email
          },
          {
            withCredentials: true
          }
        )
        if (response.data.country_id) {
          this.countryAddedToFavorite = true
        }
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
