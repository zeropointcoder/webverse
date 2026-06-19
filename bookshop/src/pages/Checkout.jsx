import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import CheckoutForm from '../components/CheckoutForm'
import OrderSummary from '../components/OrderSummary'
import { processOrder } from '../store/cart/cartSlice'

function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const items = useSelector(state => state.cart.items)
  const loading = useSelector(state => state.cart.loading)
  const error = useSelector(state => state.cart.error)
  const order = useSelector(state => state.cart.order)

  const handlePlaceOrder = (formData) => {
    dispatch(processOrder({customer: formData, items}))
  }

  useEffect(() => {
    if(order?.orderId) {
      navigate('/orders/success')
    }
  }, [order, navigate])

  useEffect(() => {
    if(error) {
      navigate("/orders/failure")
    }
  }, [error, navigate])

  return (
    <div className='row'>
      <div className='col-6'>
        <OrderSummary></OrderSummary>
      </div>
      <div className='col-6'>
        {
          error && (
            <div className='alert alert-danger'>{error}</div>
          )
        }
        
        <CheckoutForm onPlaceOrder={handlePlaceOrder} loading={loading}></CheckoutForm>
        
      </div>
    </div>     
  )
}

export default Checkout