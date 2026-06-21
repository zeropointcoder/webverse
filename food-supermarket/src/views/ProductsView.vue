<script setup>
import ProductCard from '@/components/ProductCard.vue'
import { products } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { useToast } from 'vue-toastification'

const cartStore = useCartStore()
const toast = useToast()

const handleAddToCart = (product) => {
    cartStore.addToCart(product)

    toast.success(`${product.name} added to cart`)
}

</script>

<template>
    <h1 class="mb-3">Food Supermarket</h1>

    <p>Fresh groceries and ingredients for recipes.</p>

    <div class="row">
        <product-card v-for="(item) in products" :key="item.id" :product="item" @add="handleAddToCart"></product-card>
    </div>
    
</template>