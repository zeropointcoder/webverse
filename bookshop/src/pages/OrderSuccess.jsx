import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { clearCart, resetOrder } from '../store/cart/cartSlice'
import { Link } from 'react-router-dom'

function OrderSuccess() {
  const dispatch = useDispatch()
  const order = useSelector(state => state.cart.order)

  const handleContinueShopping = () => {
    dispatch(clearCart())
    dispatch(resetOrder())
  }
  
  if(!order) {
    return (
      <div className="card">
        <div className="card-body">
            <h5 className="card-title">Order details not available</h5>
            <p className="card-text">No order information could be found.</p>
            <p className="card-text">Your session may have expired or the page was refreshed.</p>
        </div>
        <div className="card-body">
            <Link to="/" type="button" className="btn btn-sm btn-warning">Back to products</Link>
        </div>
    </div>
    )
  }

  return (
    <>
      <div className="card">
          <div className="card-body">
              <h5 className="card-title">Order successful</h5>
              <p className="card-text">Your order has been placed successfully.</p>
          </div>
          <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Order ID</strong>: {order.orderId}</li>
              <li className="list-group-item"><strong>Status</strong>: {order.status}</li>
              <li className="list-group-item"><strong>Items ordered</strong>: {order.items.length}</li>
              <li className="list-group-item"><strong>Total</strong>: £{order.total.toFixed(2)}</li>
          </ul>
          <div className="card-body">
              <Link to="/" type="button" className="btn btn-sm btn-warning" onClick={handleContinueShopping}
              >Continue shopping</Link>
          </div>
      </div>
    </>
  )
}

export default OrderSuccess