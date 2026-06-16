<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
    console.log('On mounted: ', authStore.user?.email)
})

const logout = () => {
    authStore.logout()

    router.push('/login')
}
</script>

<template>
    <nav class="navbar bg-dark">
        <div class="container">
            <router-link to="/" class="navbar-brand text-uppercase text-light" href="#">Eatery Access Portal</router-link>

            <div v-if="authStore.user?.email" class="d-flex align-items-center text-light">
                <span class="me-2">Welcome <span class="text-info">{{ authStore.user?.fullname }}</span></span>
                
                <button @click="logout" type="button" class="btn btn-sm btn-outline-warning">Logout</button>
            </div>
        </div>
    </nav>
</template>