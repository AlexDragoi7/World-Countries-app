import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({ authData: [], paswordReset: false }),
  getters: {
    getAuthData(state) {
      return state.authData
    }
  },
  actions: {
    async login(email, password) {
      try {
        const loginData = { email, password }
        const response = await axios.post(`http://localhost:3500/users/login`, loginData)
        this.authData = response.data
        localStorage.setItem('accessToken', response.data.accessToken)
        document.cookie = `token=${response.data.accessToken}`
      } catch (error) {
        console.log(error)
        console.error(error)
      }
    },
    async logout() {
      this.authData = null
      localStorage.clear()
    },
    async resetPassword(email, new_password) {
      try {
        const response = await axios.patch(`http://localhost:3500/users/resetpassword`, {
          email,
          new_password
        })
        console.log(response)
        this.paswordReset = true
      } catch (error) {}
    }
  }
})
