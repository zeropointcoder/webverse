<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { loginUser } from '@/services/authService'

const email = ref('')
const password = ref('')
const err = ref('')

const router = useRouter()
const authStore = useAuthStore()

const login = () => {
    if(email.value === '' && password.value === '') {
        return
    }

    try {
        const user = loginUser(email.value, password.value)

        if(!user) {
            err.value = 'Invalid email or password!'
            return
        }

        authStore.login(user)
        router.push('/dashboard')
    } catch (error) {
        err.value = error.message
    }
}

</script>

<template>
    <h2>Member Login</h2>

    <p class="text-danger mb-3" v-if="err">{{ err }}</p>

    <form @submit.prevent="login">
        <div class="mb-3">
            <label for="email" class="form-label">email</label>
            <input v-model="email" type="email" class="form-control" id="email" aria-describedby="userHelp" />
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" />
        </div>

        <button type="submit" class="btn btn-sm btn-danger">Login</button>

        <p class="mt-3">
            New user? <router-link to="/register">Register here</router-link>
        </p>
    </form>
</template>