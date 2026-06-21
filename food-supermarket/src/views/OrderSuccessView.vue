<script setup>
import { useCartStore } from '@/store/cartStore'

const cartStore = useCartStore()

</script>

<template>
    
    <div v-if="cartStore.lastOrder" class="card">
        <div class="card-body">
            <h5 class="card-title">Order successful</h5>
            <p class="card-text">Your order has been placed successfully.</p>
        </div>

        <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Order ID</strong>: {{ cartStore.lastOrder.id }}</li>
            <li className="list-group-item"><strong>Status</strong>: {{ cartStore.lastOrder.status }}</li>
            <li className="list-group-item"><strong>Items ordered</strong>: {{ cartStore.lastOrder.items.length }}</li>
            <li className="list-group-item"><strong>Total</strong>: £{{ cartStore.lastOrder.total.toFixed(2) }}</li>
            <li className="list-group-item">[<strong>Created at</strong>: {{ new Date(cartStore.lastOrder.createdAt).toLocaleString()  }}]</li>
        </ul>

        <div class="card-body">
            <router-link to="/" class="btn btn-sm btn-warning">Continue shopping</router-link>
        </div>
    </div>

    <div v-else class="card">
        <div class="card-body">
            <h5 class="card-title">Order details not available</h5>
            <p class="card-text">No order information could be found.</p>
            <p class="card-text">Your session may have expired or the page was refreshed.</p>
        </div>
        <div class="card-body">
            <router-link to="/products" class="btn btn-sm btn-primary">Back to products</router-link>
        </div>
    </div>

</template>