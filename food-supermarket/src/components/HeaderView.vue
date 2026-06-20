<script setup>
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart } from 'lucide-vue-next'

const cartStore = useCartStore()

</script>

<template>
    <nav class="navbar bg-dark">
        <div class="container">
            <router-link to="/" class="navbar-brand text-uppercase text-light">Food Supermarket</router-link>

            <div class="d-flex align-items-center text-light">
                <router-link to="/products" class="me-2 text-decoration-none text-info">products</router-link>
                
                <router-link to="/cart" class="me-2 text-decoration-none text-info">cart <ShoppingCart :size="22" /><span class="badge text-bg-warning">{{ cartStore.totalItems }}</span></router-link>
            </div>
        </div>
    </nav>
</template>