<script setup>

</script>

<template>
    <div v-if="!false" class="card">
        <div class="card-body">
            <h5 class="card-title">Order details not available</h5>
            <p class="card-text">No order information could be found.</p>
            <p class="card-text">Your session may have expired or the page was refreshed.</p>
        </div>
        <div class="card-body">
            <router-link to="/products" class="btn btn-sm btn-primary">Back to products</router-link>
        </div>
    </div>
    
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Order successful</h5>
            <p class="card-text">Your order has been placed successfully.</p>
        </div>

        <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Order ID</strong>: order.orderId</li>
            <li className="list-group-item"><strong>Status</strong>: order.status</li>
            <li className="list-group-item"><strong>Items ordered</strong>: order.items.length</li>
            <li className="list-group-item"><strong>Total</strong>: £0</li>
        </ul>

        <div class="card-body">
            <router-link to="/" class="btn btn-sm btn-warning">Continue shopping</router-link>
        </div>
    </div>
</template>