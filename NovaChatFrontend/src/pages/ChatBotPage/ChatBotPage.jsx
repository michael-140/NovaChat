import './ChatBotPage.css'
import Header from '../../components/Header'
import ChatBotSideBar from './ChatBotSideBar/ChatBotSideBar'
import ChatBotMessages from './ChatBotMessages/ChatBotMessages'
import { useState, useEffect } from 'react'



export function ChatBotPage() {

    const [chatHistories, setChatHistories] = useState([])
    const [currentHistory, setCurrentHistory] = useState({})

    const getHistoryFromBE = async ()=>{
        const res = await fetch('http://localhost:8000/api/chatHistories', 
        {
            method: 'GET',
            credentials: 'include'
        });

        return res
    }

    useEffect(() => {
        const isLogin = async () => {
            try{
                const res = await fetch('http://localhost:8000/api/reload', {
                    method: 'GET',
                    credentials: 'include'
                });
    
                if (!res.ok) {
                    window.location.href = '/login';
                    return
                }

                const hisRes = await getHistoryFromBE()

                if(hisRes.ok){
                    const data = await hisRes.json();
                    setChatHistories(data);
                }else{
                    setChatHistories([])
                }
                
            }catch(err){
                console.error("Error occurred while checking login status:", err);
            }

        }
    },[])

    useEffect(() => { // fetch chat histories from backend

        const fetchHistories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/chatHistories', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setChatHistories(data);
                } else {
                    setChatHistories([]) // if not ok, set to empty array
                }
            } catch (err) {
                // console.error("Failed to load histories:", err);
            }
        };

        fetchHistories();

    }, [])

    const syncWithBackend = async (chatToSave) => {
        if (!chatToSave || !chatToSave.id) return

        try {
            await fetch('http://localhost:8000/api/updateChatHistory', {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(chatToSave),
                credentials: 'include'
            })
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
                        syncWithBackend={syncWithBackend}
                    />

                    {/* always put the latest chat history first */}
                    <ChatBotMessages
                        chatHistories={chatHistories}
                        setChatHistories={setChatHistories}
                        currentHistory={currentHistory}
                        setCurrentHistory={setCurrentHistory}
                        syncWithBackend={syncWithBackend}
                    />

                </div>

            </div>
        </>
    )
}