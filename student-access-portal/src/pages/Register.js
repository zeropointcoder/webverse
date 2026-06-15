import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import { toast } from 'react-toastify'

function Register() {
  const navigate = useNavigate()

  const [fullname, setFullname] = useState('')
  const [course, setCourse] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const [error, setError] = useState('')
  // const [success, setSuccess] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    // setError('')
    // setSuccess('')

    if(fullname === '' || course === '' || email === '' || password === '') {
      return
    }

    const student = {
      fullname: fullname,
      course: course,
      email: email,
      password: password
    }

    const response = await registerUser(student) //authService

    if(!response.success) {
      // setError(response.message)
      toast.error(response.message)
      return
    }

    // setSuccess('Registration successful! Redirecting to login..')
    toast.success('Registration successful! Redirecting to login..')

    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  return (
    <div>
      <h2>Student registration</h2>

      {/* {
        error && (
          <div className='text-danger'>{error}</div>
        )
      } */}

      {/* {
        success && (
          <div className='text-info'>{success}</div>
        )
      } */}

      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <div id="detailsHelp" className="form-text mb-3">We'll never share your personal details with anyone else.</div>

          <label for="fullname" className="form-label">Fullname</label>
          <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} className="form-control" id="fullname"  placeholder='Enter fullname' aria-describedby="detailsHelp" />
        </div>

        <div className="mb-3">
          <label for="course" className="form-label">Course</label>
          <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} className="form-control" id="course"  placeholder='Enter course' aria-describedby="detailsHelp" />
        </div>

        <div className="mb-3">
          <label for="email" className="form-label">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email"  placeholder='Enter email' aria-describedby="detailsHelp" />
        </div>

        <div className="mb-3">
          <label for="password" className="form-label">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password"  placeholder='Enter password' aria-describedby="detailsHelp" />
        </div>
        
        <button type="submit" className="btn btn-sm btn-warning">Register</button>

        <p className='mt-3'>Already registered?{" "} <Link to={'/login'}>Login here</Link> </p>
      </form>
    </div>
  )
}

export default Register