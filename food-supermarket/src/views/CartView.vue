<script setup>
import EmptyCart from '@/components/EmptyCart.vue'
import CartItem from '@/components/CartItem.vue'
import { useCartStore } from '@/store/cartStore'

const cartStore = useCartStore()

</script>

<template>
    <h2 class="mb-3">Shopping Cart 🛒 ({{ cartStore.totalItems }} items)</h2>

    <empty-cart v-if="cartStore.totalItems === 0"></empty-cart>

    <div v-else class="row">
        <div class="col-9">
            <div class="table-responsive">
                <table class="table table-success">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">img</th>
                            <th scope="col">title</th>
                            <th scope="col">price</th>
                            <th scope="col">
                                ➖ <span class="mx-3">Qty</span> ➕
                            </th>
                            <th scope="col">subtotal</th>
                            <th scope="col">🗑️</th>
                        </tr>
                    </thead>
                    <tbody>
                        <cart-item v-for="(cartitem) in cartStore.cartItems" :key="cartitem.id" :item="cartitem"></cart-item>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-3">
            <h2 class="mb-3">Order summary 🛒</h2>
            <h3 class="mb-3">Total: £{{ cartStore.totalPrice.toFixed(2) }}</h3>

            <div class="d-flex justify-content-between">
                <router-link to="/checkout" class="btn btn-sm btn-info">Proceed to checkout</router-link>

                <button @click="cartStore.clearCart" type="button" class="btn btn-sm btn-secondary">Clear cart</button>
            </div>
        </div>
    </div>
    
</template>