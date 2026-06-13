import React from 'react'

function Navbar() {
  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <a className="navbar-brand text-uppercase text-light" href="#">Student Access Portal</a>
        <div className="d-flex align-items-center text-light">
            <span className="me-2">Welcome <span className="text-info">username</span></span>
            
            <button type="button" className="btn btn-sm btn-outline-warning">Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar