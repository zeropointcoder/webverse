import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

function Navbar() {
  const itemCount = useSelector(state => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  )

  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand text-uppercase text-light">Bookshop 📚</Link>
        
        <div class="d-flex align-items-center">
            <Link to="/products" className="me-2 text-decoration-none text-info">products</Link>&nbsp;
            <Link to="/cart" className="me-2 text-decoration-none text-info">cart 🛒 
                <span className="badge text-bg-warning">{itemCount}</span>
            </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar