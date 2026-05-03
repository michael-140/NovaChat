import './ChatBotPage.css'
import Header from '../../components/Header'
import ChatBotSideBar from './ChatBotSideBar/ChatBotSideBar'
import ChatBotMessages from './ChatBotMessages/ChatBotMessages'
import { useState, useEffect } from 'react'



export function ChatBotPage() {

    const [chatHistories, setChatHistories] = useState([])
    const [currentHistory, setCurrentHistory] = useState({})

    useEffect(() => { // fetch chat histories from backend
        fetch('http://localhost:8000/api/chatHistories')
            .then(res => res.json()).then(data => {
                setChatHistories(data)
            })
    }, [])

    const syncWithBackend = async (chatToSave) => {
        try {
            if (chatToSave && chatToSave.id) {
                fetch('http://localhost:8000/api/updateChatHistory', {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(chatToSave)
                })
            }
            // console.log("current history updated")
        } catch (err) {
            // console.error("Failed to sync with backend", err)
        }
    }

    return (
        <>
            <Header />

            <div className='chatbot-container'>

                <div className="chatbot">

                    <ChatBotSideBar
                        chatHistories={chatHistories}
                        setChatHistories={setChatHistories}
                        currentHistory={currentHistory}
                        setCurrentHistory={setCurrentHistory}
                        syncWithBackend = {syncWithBackend}
                    />

                    {/* always put the latest chat history first */}
                    <ChatBotMessages
                        chatHistories={chatHistories}
                        setChatHistories={setChatHistories}
                        currentHistory={currentHistory}
                        setCurrentHistory={setCurrentHistory}
                        syncWithBackend = {syncWithBackend}
                    />

                </div>

            </div>
        </>
    )
}