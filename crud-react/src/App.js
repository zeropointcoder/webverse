import './App.css'
import Navbar from './components/Navbar'
import Foot from './components/Foot'
import Employee from './components/Employee'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>

      <main className='my-5' style={{minHeight: '100vh',}}>
        <div className='container'>
          <Routes>
            <Route path={'/'} element={<Employee></Employee>} />
            <Route path={'*'} element={<Navigate to={'/'} />} />
          </Routes>
        </div>
      </main>

      <Foot></Foot>
    </BrowserRouter>
  )
}

export default App
