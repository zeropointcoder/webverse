import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Navbar from './components/Navbar'
import Foot from './components/Foot'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'


function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>

      <main className='my-5' style={{minHeight: '100vh',}}>
        <div className='container'>
          <Routes>
            
            <Route 
              path={'/'} 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            ></Route>

            <Route 
              path={'/register'} 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            ></Route>

            <Route 
              path={'/dashboard'} 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>

            <Route path={'*'} element={<Navigate to={'/'} />}></Route>

          </Routes>
        </div>
      </main>

      <Foot></Foot>

      <ToastContainer 
        position='top-right' 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop 
        closeOnClick 
        pauseOnHover 
      />

    </BrowserRouter>
  )
}

export default App
