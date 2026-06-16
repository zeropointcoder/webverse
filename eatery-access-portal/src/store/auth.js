import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {

    let userData = null

    try {
        userData = JSON.parse(localStorage.getItem('currentUser'))
    } catch (error) {
        localStorage.removeItem('currentUser')
    }

    const user = ref(userData)

    const users = ref(
        JSON.parse(localStorage.getItem('users')) || []
    )

    const login = (userData) => {
        user.value = userData
        localStorage.setItem('currentUser', JSON.stringify(userData))
    }

    const logout = () => {
        user.value = null
        localStorage.removeItem('currentUser')
    }

    return {
        user,
        users,
        login,
        logout
    }
})