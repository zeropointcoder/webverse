<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/auth'

const members = ref([])
const authStore = useAuthStore()

onMounted(() => {
    members.value = authStore.users
})

</script>

<template>
    <h2 class="mb-3">Eatery Manager Dashboard</h2>
    <h4 class="mb-3">Total registered members: {{ members.length }}</h4>

    <div class="table-responsive">
        <table class="table table-success">
            <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">fullname</th>
                <th scope="col">email</th>
                <th scope="col">password</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(mgr, index) in members" :key="index">
                    <th scope="row">{{ mgr.id }}</th>
                    <td>{{ mgr.fullname }}</td>
                    <td>{{ mgr.email }}</td>
                    <td>{{ mgr.password }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>