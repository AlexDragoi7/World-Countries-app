import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore('users', {
  state: () => ({ user: {} }),
  getters: {
    getUser(state) {
      return state.user
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
    }
  }
})
