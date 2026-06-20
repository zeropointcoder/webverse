import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cart/cartSlice'
import {toast} from 'react-toastify'

function ProductCard({book}) {
  const dispatch = useDispatch()

  const onAddToCart = () => {
    dispatch(addToCart(book))

    toast.success(`${book.title} added to cart`)
  }

  return (
    <div className='col-4'>
        <div className="card mb-3">
            <img src={book.image} className="text-center m-auto mt-4" width="100%" height="200" alt={book.title} />

            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text"><strong>Author:</strong> {book.author}</p>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">[{book.category}]</li>
                <li className="list-group-item">£{book.price}</li>
            </ul>

            <div className="card-body">
                <button onClick={onAddToCart} type="button" className="btn btn-sm btn-danger">Add to cart</button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard