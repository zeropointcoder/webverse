<script setup>
import OrderSummary from '@/components/OrderSummary.vue'
import CheckoutForm from '@/components/CheckoutForm.vue'

</script>

<template>
    <div class="row">
        <div class="col-6">
            <order-summary></order-summary>
        </div>
        <div class="col-6">
            <div v-if="true" class="alert alert-danger">error</div>

            <checkout-form></checkout-form>
        </div>
    </div>
</template>