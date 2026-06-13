import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Foot from './components/Foot'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>

      <main className='my-5' style={{minHeight: '100vh',}}>
        <div className='container'>
          <Routes>
            <Route path={'/'} element={<Dashboard></Dashboard>}></Route>
            <Route path={'*'} element={<Navigate to={'/'} />}></Route>
          </Routes>
        </div>
      </main>

      <Foot></Foot>
    </BrowserRouter>
  )
}

export default App
