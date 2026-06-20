import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../store/cart/cartSlice'
import { Link } from 'react-router-dom'
import EmptyCart from '../components/EmptyCart'
import CartItem from '../components/CartItem'

function Cart() {
  const dispatch = useDispatch()

  const items = useSelector(state => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if(items.length === 0) {
    return <EmptyCart />
  }

  return (
    <>
      <h2 className="mb-3">Shopping Cart 🛒 ({items.length} items)</h2>

      <div className="row">
          <div className="col-9">
              <div className="table-responsive">
                  <table className="table table-info">
                      <thead>
                          <tr>
                              <th scope="col">id</th>
                              <th scope="col">img</th>
                              <th scope="col">title</th>
                              <th scope="col">author</th>
                              <th scope="col">price</th>
                              <th scope="col">➖</th>
                              <th scope="col">➕</th>
                              <th scope="col">subtotal</th>
                              <th scope="col">🗑️</th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                        items.map(item => (
                          <CartItem item={item} key={item.id}></CartItem>
                        ))
                      }
                      </tbody>
                  </table>
              </div>
          </div>
          <div className="col-3">
              <h2 className="mb-3">Order summary 🛒</h2>
              <h3 className="mb-3">Total: £{total.toFixed(2)}</h3>
              
              <div className="d-flex justify-content-between">
                  <Link to={"/checkout"} className="btn btn-sm btn-info">Proceed to checkout</Link>

                  <button onClick={() => dispatch(clearCart())} type="button" className="btn btn-sm btn-secondary">Clear cart</button>
              </div>
          </div>
      </div>
    </>
  )
}

export default Cart