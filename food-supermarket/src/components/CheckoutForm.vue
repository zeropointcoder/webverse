<script setup>

</script>

<template>
    <form>
        <h2>Place order</h2>
        <h5>Customer details</h5>

        <div class="mb-3">
            <label for="fullname" class="form-label">Fullname</label>
            <input type="text" class="form-control" id="fullname" name="fullname" placeholder="Enter fullname" />
            <small v-if="true" class="text-danger">error</small>
        </div>
        
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Enter email" />
            <small v-if="true" class="text-danger">error</small>
        </div>

        <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input type="text" class="form-control" id="phone" name="email" placeholder="Enter email" />
            <small v-if="true" class="text-danger">error</small>
        </div>

        <h5>Payment details</h5>

        <div class="mb-3">
            <label for="cardnumber" class="form-label">Card number</label>
            <input type="text" class="form-control" id="cardnumber" name="cardnumber" placeholder="Enter card number" />
            <small v-if="true" class="text-danger">error</small>
        </div>

        <div class="mb-3">
            <label for="expiry" class="form-label">Card expiry</label>
            <input type="text" class="form-control" id="expiry" name="expiry" placeholder="Enter card expiry" />
            <small v-if="true" class="text-danger">error</small>
        </div>

        <div class="mb-3">
            <label for="cvv" class="form-label">CVV</label>
            <input type="text" class="form-control" id="cvv" name="cvv" placeholder="Enter card CVV" />
            <small v-if="true" class="text-danger">error</small>
        </div>

        <button type="submit" class="btn btn-sm btn-info" disabled="false">{{ true ? 'Processing...' : 'Place Order' }}</button>
    </form>
</template>