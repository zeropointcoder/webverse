import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <Link className="navbar-brand text-uppercase text-light" href="#">Student Management System</Link>

        <div className='d-flex'>
          <button type='button' className='btn btn-sm btn-danger' data-bs-toggle="modal" data-bs-target="#studentFormModal">add</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar