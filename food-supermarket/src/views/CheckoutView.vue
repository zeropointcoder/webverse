<script setup>
import OrderSummary from '@/components/OrderSummary.vue'
import CheckoutForm from '@/components/CheckoutForm.vue'
import EmptyCart from '@/components/EmptyCart.vue'
import { useCartStore } from '@/store/cartStore'

const cartStore = useCartStore()
</script>

<template>
    <h1>Checkout</h1>

    <empty-cart v-if="cartStore.totalItems === 0"></empty-cart>

    <div v-else class="row">
        <div class="col-6">
            <order-summary></order-summary>
        </div>
        <div class="col-6">
            <checkout-form></checkout-form>
        </div>
    </div>
</template>