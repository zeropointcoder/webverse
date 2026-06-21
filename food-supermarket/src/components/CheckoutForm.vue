<script setup>
import { reactive } from 'vue'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const checkoutForm = reactive({
    fullname: '',
    email: '',
    address: '',
    cardnumber: '',
    expiry: '',
    cvv: ''
})

const errors = reactive({
    fullname: '',
    email: '',
    address: '',
    cardnumber: '',
    expiry: '',
    cvv: ''
})

const validate = () => {
    let valid = true

    errors.fullname = checkoutForm.fullname? '' : 'Fullname is required'
    errors.email = checkoutForm.email.includes('@')? '' : 'Valid email is required'
    errors.address = checkoutForm.address? '' : 'Address is required'
    errors.cardnumber = checkoutForm.cardnumber? '': 'Card number is required'
    errors.expiry = checkoutForm.expiry? '': 'Card expiry is required'
    errors.cvv = checkoutForm.cvv? '': 'Card CVV is required'

    if(errors.fullname || errors.email || errors.address || errors.cardnumber || errors.expiry || errors.cvv ) {
        valid = false
    }

    return valid
}

const handleSubmit = async () => {
    if(!validate()) return

    const result = await cartStore.submitOrder({
        fullname: checkoutForm.fullname,
        email: checkoutForm.email,
        address: checkoutForm.address,
        cardnumber: checkoutForm.cardnumber,
        expiry: checkoutForm.expiry,
        cvv: checkoutForm.cvv
    })

    if(result.success) {
        toast.success(`Order placed successfully!`)
        router.push('/orders/success')
    } else {
        toast.error(`Order processing failed.`)
        router.push('/orders/failure')
    }
}

</script>

<template>
    <form @submit.prevent="handleSubmit">
        <h2>Place order</h2>
        <h5>Customer details</h5>
        
        <p v-if="cartStore.orderError" class="alert alert-danger">{{ cartStore.orderError }}</p>
        
        <div class="mb-3">
            <label for="fullname" class="form-label">Fullname</label>
            <input type="text" v-model="checkoutForm.fullname" class="form-control" id="fullname" name="fullname" placeholder="Enter fullname" />
            <small v-if="errors.fullname" class="text-danger">{{ errors.fullname }}</small>
        </div>
        
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" v-model="checkoutForm.email" class="form-control" id="email" name="email" placeholder="Enter email" />
            <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
        </div>

        <div class="mb-3">
            <label for="address" class="form-label">address</label>
            <input type="text" v-model="checkoutForm.address" class="form-control" id="address" name="address" placeholder="Enter address" />
            <small v-if="errors.address" class="text-danger">{{ errors.address }}</small>
        </div>

        <h5>Payment details</h5>

        <div class="mb-3">
            <label for="cardnumber" class="form-label">Card number</label>
            <input type="text" v-model="checkoutForm.cardnumber" class="form-control" id="cardnumber" name="cardnumber" placeholder="Enter card number" />
            <small v-if="errors.cardnumber" class="text-danger">{{ errors.cardnumber }}</small>
        </div>

        <div class="mb-3">
            <label for="expiry" class="form-label">Card expiry</label>
            <input type="text" v-model="checkoutForm.expiry" class="form-control" id="expiry" name="expiry" placeholder="Enter card expiry" />
            <small v-if="errors.expiry" class="text-danger">{{ errors.expiry }}</small>
        </div>

        <div class="mb-3">
            <label for="cvv" class="form-label">CVV</label>
            <input type="text" v-model="checkoutForm.cvv" class="form-control" id="cvv" name="cvv" placeholder="Enter card CVV" />
            <small v-if="errors.cvv" class="text-danger">{{ errors.cvv }}</small>
        </div>

        <button type="submit" class="btn btn-sm btn-info" :disabled="cartStore.isSubmittingOrder">{{ cartStore.isSubmittingOrder ? 'Processing...' : 'Place Order' }}</button>
    </form>
</template>