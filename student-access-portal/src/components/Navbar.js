import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser } from '../services/authService'

function Navbar() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <Link to={'/'} className="navbar-brand text-uppercase text-light">Student Access Portal</Link>
        
        {user && (
          <div className="d-flex align-items-center text-light">
              <span className="me-2">Welcome <span className="text-info">{user.fullname}</span></span>
              
              <button onClick={handleLogout} type="button" className="btn btn-sm btn-outline-warning">Logout</button>
          </div>
        )}
        
      </div>
    </nav>
  )
}

export default Navbar