<script setup>
import ProductCard from '@/components/ProductCard.vue'
import { products } from '@/data/products'
import { useCartStore } from '@/store/cartStore'

const cartStore = useCartStore()

const handleAddToCart = (product) => {
    cartStore.addToCart(product)

    console.log("Cart: ", cartStore.cartItems)
}

</script>

<template>
    <h1 class="mb-3">Food Supermarket</h1>

    <h4 class="alert alert-info">Total cart items: {{ cartStore.totalItems }}</h4>

    <p>Fresh groceries and ingredients for recipes.</p>

    <div class="row">
        <product-card v-for="(item) in products" :key="item.id" :product="item" @add="handleAddToCart"></product-card>
    </div>
    
</template>