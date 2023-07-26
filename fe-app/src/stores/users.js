import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore('users', {
  state: () => ({ user: {}, countryAddedToFavorite: false, countryRemovedFromFavorite: false }),
  getters: {
    getUser(state) {
      return state.user
    },
    getCountryAddedToFavorite(state) {
      return state.countryAddedToFavorite
    },
    getRemovedCountryFromFavorite(state) {
      return state.countryRemovedFromFavorite
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
            newFavoriteCountry: countryId
          },
          {
            withCredentials: true
          }
        )
        if (response.data.country_id) {
          this.countryAddedToFavorite = true
        }
      } catch (error) {
        console.error(error)
      }
    },
    async removeCountryFromFavorites(countryId, email) {
      try {
        const response = await axios.post(
          `http://localhost:3500/users/deletefavoritecountries`,
          {
            deletedCountry: countryId
          },
          {
            withCredentials: true
          }
        )
        if (response.data.country_id) {
          this.countryRemovedFromFavorite = true
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})
