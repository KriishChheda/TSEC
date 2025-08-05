import './App.css'
import { Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage'
import Navbar from './components/Navbar';
import ChatComponent from './components/ChatComponent';
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/chat" element={<ChatComponent />} />
      </Routes>
    </>
  )
}

export default App
