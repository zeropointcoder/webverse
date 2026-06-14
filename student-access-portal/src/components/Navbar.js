import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <Link to={'/'} className="navbar-brand text-uppercase text-light">Student Access Portal</Link>
        
        <div className="d-flex align-items-center text-light">
            <span className="me-2">Welcome <span className="text-info">username</span></span>
            
            <button type="button" className="btn btn-sm btn-outline-warning">Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar