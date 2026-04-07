import './ChatBotPage.css'
import Header from '../../components/Header'
import ChatBotSideBar from './ChatBotSideBar/ChatBotSideBar'
import ChatBotMessages from './ChatBotMessages/ChatBotMessages'
import { useState } from 'react'


export function ChatBotPage() {
    const data = [ // [Update] get the histoies from backend 
        {
            id: crypto.randomUUID(),
            topic: "Topic1Topic1Topic1Topic1",
            content: [
                {
                    id: crypto.randomUUID(),
                    sender: "user",
                    content: "hi!"
                }, {
                    id: crypto.randomUUID(),
                    sender: "bot",
                    content: "hi I  bot"
                }
            ]
        },{
            id: crypto.randomUUID(),
            topic: "Topic2",
            content: [
                {
                    id: crypto.randomUUID(),
                    sender: "user",
                    content: "hi I amasd bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bot"
                }, {
                    id: crypto.randomUUID(),
                    sender: "bot",
                    content: "hi I asdam bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bot"
                }, {
                    id: crypto.randomUUID(),
                    sender: "user",
                    content: "hi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi asdI am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bot"
                }, {
                    id: crypto.randomUUID(),
                    sender: "user",
                    content: "hi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am asdbothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bot"
                }, {
                    id: crypto.randomUUID(),
                    sender: "bot",
                    content: "hi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bot"
                }
            ]
        },{
            id: crypto.randomUUID(),
            topic: "topic3",
            content: [
                {
                    id: crypto.randomUUID(),
                    sender: "user",
                    content: "hi!"
                }, {
                    id: crypto.randomUUID(),
                    sender: "bot",
                    content: "hi I  bot"
                }
            ]
        },
        
        
    ]

    // chat always create one instead of null
    // const [chatHistories, setChatHistories] = useState(data)
    // const [currentHistory,setCurrentHistory] = useState(data[0])
    
    const [chatHistories, setChatHistories] = useState([])
    const [currentHistory,setCurrentHistory] = useState({})
    
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
                    />

                    {/* always put the latest chat history first */}
                    <ChatBotMessages 
                        chatHistories={chatHistories}
                        setChatHistories={setChatHistories}
                        currentHistory={currentHistory} 
                        setCurrentHistory={setCurrentHistory}
                    />

                </div>

            </div>
        </>
    )
}