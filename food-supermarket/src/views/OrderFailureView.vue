<script setup>

</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Order failed</h5>
            <p class="card-text">Unfortunately, we could not process your order.</p>
            <p class="text-danger fw-bold">error</p>
        </div>
        <div class="card-body">
            <router-link to="/checkout" class="btn btn-sm btn-warning me-3">Retry checkout</router-link>

            <router-link to="/" class="btn btn-sm btn-info">Back to products</router-link>
        </div>
    </div>

</template>