import React from 'react'
import { useDispatch } from 'react-redux'
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../store/cart/cartSlice'

function CartItem({item}) {
    const dispatch = useDispatch()

    return (
        <tr>
            <th scope="row">{item.id}</th>
            <td>
                <img className='' src={item.image} alt={item.title} style={{ width: "100px", height: "100px" }} />
            </td>
            <td>{item.title}</td>
            <td>{item.author}</td>
            <td>£{item.price}</td>
            <td>
                <button onClick={() => dispatch(decreaseQuantity(item.id))} type="button" class="btn btn-sm btn-outline-primary">➖</button>
            
                <span className="mx-3">{item.quantity}</span>
                
                <button onClick={() => dispatch(increaseQuantity(item.id))} type="button" class="btn btn-sm btn-outline-primary">➕</button>
            </td>
            <td>£{ (item.price * item.quantity).toFixed(2) }</td>
            <td>
                <button onClick={() => dispatch(removeFromCart(item.id))} type="button" class="btn btn-sm btn-outline-danger">🗑️</button>
            </td>
        </tr>
    )
}

export default CartItem