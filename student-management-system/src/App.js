import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import Foot from './components/Foot'
import Student from './components/student/Student'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      
      <main className='my-5' style={{minHeight:'100vh',}}>
        <div className='container'>
          <Routes>
            <Route path={'/'} element={<Student></Student>} />
            <Route path={'*'} element={<Navigate to={'/'} />} />
          </Routes>
        </div>
      </main>

      <Foot></Foot>
    </BrowserRouter>
  );
}

export default App;
