<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    product: Object
})

const emit = defineEmits(["add"])

const handleAdd = () => {
    emit("add", props.product)
}
</script>

<template>
    <div class="col-4">
        <div class="card mb-3">
            <img :src="product.image" class="text-center m-auto mt-4" width="100%" height="200" :alt="product.name" />

            <div class="card-body">
                <h5 class="card-title">{{product.name}}</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>

            <ul class="list-group list-group-flush">
                <li class="list-group-item">{{product.category}}</li>
                <li class="list-group-item">£{{product.price.toFixed(2)}}</li>
            </ul>

            <div class="card-body">
                <button @click="handleAdd" type="button" class="btn btn-sm btn-danger">Add to cart</button>
            </div>
        </div>
    </div>
    
</template>