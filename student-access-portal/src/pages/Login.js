import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { toast } from 'react-toastify'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const [error, setError] = useState('')

  // useEffect(() => {
  //   if(isAuthenticated()) {
  //     navigate('/dashboard')
  //   }
  // }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()

    // setError('')

    if(email === '' || password === '') {
      return
    }

    const response = await loginUser(email, password)

    if(!response.success) {
      // setError(response.message)
      toast.error(response.message)
      return
    } 
    
    navigate('/dashboard')
  }

  return (
    <div>
      <h2>Student Login</h2>

      {/* {
        error && (
          <div className='text-danger'>{error}</div>
        )
      } */}

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label for="email" className="form-label">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder='Enter email' />
        </div>

        <div className="mb-3">
          <label for="password" className="form-label">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder='Enter password' />
        </div>
        
        <button type="submit" className="btn btn-sm btn-info">Login</button>
        
        <p className='mt-3'>New user?{" "} <Link to={'/register'}>Register here</Link> </p>
      </form>
    </div>
  )
}

export default Login