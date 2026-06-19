import {BrowserRouter} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Foot from './components/Foot'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>

      <Navbar></Navbar>

      <main className='my-5' style={{minHeight: '100vh',}}>
        <div className='container'>
          <AppRoutes></AppRoutes>
        </div>
      </main>

      <Foot></Foot>

    </BrowserRouter>    
  )
}

export default App;
