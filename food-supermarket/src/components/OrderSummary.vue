<script setup>

</script>

<template>
    <h3>Order summary</h3>
    
    <div class="table-responsive">
        <table class="table table-success">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">title</th>
                    <th scope="col">price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">subtotal</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in [1,1,1,1]" :key="index">
                    <th scope="row">item.id</th>
                    <td>item.title</td>
                    <td>£item.price</td>
                    <td>item.quantity</td>
                    <td>£0</td>
                </tr>
            </tbody>
        </table>
    </div>

    <ul class="list-group mb-2">
        <li class="list-group-item fw-bold">Subtotal</li>
        <li class="list-group-item">£0</li>
        <li class="list-group-item fw-bold">Tax (10%)</li>
        <li class="list-group-item">£0</li>
        <li class="list-group-item fw-bold text-uppercase">Total</li>
        <li class="list-group-item">£0</li>
    </ul>
</template>