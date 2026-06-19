import React from 'react'
import ProductCard from '../components/ProductCard'
import {books} from '../data/books'
import { useSelector } from 'react-redux'

function Products() {

  return (
    <>
      <h2>Student bookshop</h2>

      <p>Discover academic and technical books to boost your learning.</p>

      <div className='row'>
        {
          books.map(book => (
            <ProductCard book={book} key={book.id}></ProductCard>
          ))
        }
      </div>
    </>
  )
}

export default Products