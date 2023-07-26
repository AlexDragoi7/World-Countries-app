import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({ authData: [], paswordReset: false, authUser: {} }),
  getters: {
    getAuthData(state) {
      return state.authData
    },
    getAuthUser(state) {
      return state.authUser
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
        console.error(error)
      }
    },
    async logout() {
      this.authData = null
      localStorage.clear()
    },
    async getAuthenticatedUser() {
      try {
        const response = await axios.get(`http://localhost:3500/users/user`, {
          withCredentials: true
        })

        this.authUser = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async resetPassword(email, new_password) {
      try {
        const response = await axios.patch(`http://localhost:3500/users/resetpassword`, {
          email,
          new_password
        })

        this.paswordReset = true
      } catch (error) {}
    }
  }
})
