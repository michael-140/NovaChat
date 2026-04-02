import Header from './components/Header'
import { ChatBotPage } from './pages/ChatBotPage/ChatBotPage'
import {Routes, Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        {/* The root path should change to Home  */}
        <Route path="/" element={<ChatBotPage/>} /> 
        <Route path="/contact" element={<>Call me</>} />
        <Route path="/home" element={<>Home Page</>} />
        <Route path="/chatbot" element={<ChatBotPage/>} />
        <Route path="*" element={<>We dont have this page</>} />
      </Routes>

    </>
  )
}

export default App
