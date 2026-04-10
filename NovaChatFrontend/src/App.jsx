import {Routes, Route} from 'react-router-dom'
import { ChatBotPage } from './pages/ChatBotPage/ChatBotPage'
import {HomePage} from './pages/HomePage/HomePage'
import {ContactPage} from './pages/ContactPage/ContactPage'
import './App.css'

function App() {
  
  return (
    <>
      <Routes>
        {/* The root path should change to Home  */}
        <Route path="/" element={<HomePage/>} /> 
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chatbot" element={<ChatBotPage/>} />
        <Route path="*" element={<>We dont have this page</>} />
      </Routes>

    </>
  )
}

export default App
