import React from 'react'
import { Link } from 'react-router-dom'

function EmptyCart() {
  return (
    <div>
        <h2>Your cart is empty</h2>

        <p>Browse our collection and add some books to your cart</p>

        <Link to="/" className='btn btn-sm btn-outline-primary'>Continue shopping</Link>
    </div>
  )
}

export default EmptyCart