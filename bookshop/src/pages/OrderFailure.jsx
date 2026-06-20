import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {resetOrder} from '../store/cart/cartSlice'

function OrderFailure() {
  const dispatch = useDispatch()

  const error = useSelector((state) => state.cart.error)

  return (
    <>
      <div className="card">
          <div className="card-body">
              <h5 className="card-title">Order failed</h5>
              <p className="card-text">Unfortunately, we could not process your order.</p>
              <p className="text-danger fw-bold">{error}</p>

          </div>
          <div className="card-body">
              <Link to="/checkout" onClick={() => dispatch(resetOrder())} className="btn btn-sm btn-info me-3">Retry checkout</Link>

              <Link to="/" onClick={() => dispatch(resetOrder())} className="btn btn-sm btn-warning">Back to products</Link>
          </div>
      </div>
    </>
  )
}

export default OrderFailure