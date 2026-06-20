import React from 'react'
import { useSelector } from 'react-redux'

function OrderSummary() {

  const items = useSelector(state => state.cart.items)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0) 

  const tax = subtotal * 0.1 // (10%)

  const total = subtotal + tax

  return (
    <>
        <h3>Order summary</h3>

        <div className="table-responsive">
            <table className="table table-info">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">title</th>
                        <th scope="col">author</th>
                        <th scope="col">price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">subtotal</th>
                    </tr>
                </thead>
                <tbody>
                {
                items.map(item => (
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>£{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>£{ (item.price * item.quantity).toFixed(2) }</td>
                    </tr>
                ))
                }
                </tbody>
            </table>
        </div>

        <ul class="list-group mb-2">
            <li class="list-group-item fw-bold">Subtotal</li>
            <li class="list-group-item">£{subtotal.toFixed(2)}</li>
            <li class="list-group-item fw-bold">Tax (10%)</li>
            <li class="list-group-item">£{tax.toFixed(2)}</li>
            <li class="list-group-item fw-bold text-uppercase">Total</li>
            <li class="list-group-item">£{total.toFixed(2)}</li>
        </ul>
    </>
  )
}

export default OrderSummary