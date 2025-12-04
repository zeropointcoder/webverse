import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar bg-dark">
        <div className="container">
            <Link to={'/'} className="navbar-brand text-uppercase text-light" href="#">Crud 20<sup>81</sup>React</Link>

            <div className='d-flex'>
                <button type='button' className='btn btn-danger btn-sm' data-bs-toggle='modal' data-bs-target='#employeeFormModal'>add</button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar