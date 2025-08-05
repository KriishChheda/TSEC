import './App.css'
import { Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage'
import Navbar from './components/Navbar';
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App
