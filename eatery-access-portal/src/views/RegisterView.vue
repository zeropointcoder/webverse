<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '@/services/authService'

const router = useRouter()

const fullname = ref('')
const email = ref('')
const password = ref('')
const success = ref('')
const err = ref('')

const register = () => {
    if(fullname.value === '' || email.value === '' || password.value === '') {
        return
    }

    const newUser = {
        fullname: fullname.value,
        email: email.value,
        password: password.value
    }

    try {
        registerUser(newUser)

        success.value = 'Member registered successfully! Redirecting in 3 seconds..'

        setTimeout(() => {
            router.push('/login')
        }, 3000)
        
    } catch (error) {
        err.value = error.message
    }
}

</script>

<template>
    <h2>Member Registration</h2>

    <p class="text-danger mb-3" v-if="err">{{ err }}</p>
    <p class="text-primary mb-3" v-if="success">{{ success }}</p>

    <form @submit.prevent="register">
        <div class="mb-3">
            <div id="userHelp" class="form-text mb-3">We'll never share your personal details with anyone else.</div>

            <label for="fullname" class="form-label">fullname</label>
            <input v-model="fullname" type="text" class="form-control" id="fullname" aria-describedby="userHelp" />
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">email</label>
            <input v-model="email" type="email" class="form-control" id="email" aria-describedby="userHelp" />
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" />
        </div>

        <button type="submit" class="btn btn-sm btn-warning">Register</button>

        <p class="mt-3">
            Already registered? <router-link to="/login">Login here</router-link>
        </p>
    </form>
</template>