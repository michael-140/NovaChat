import './ChatBotSideBar.css'
import botIcon from '../../../images/chatbotIcon.png'
import { useState, useEffect } from 'react'


function ChatHistory({ chatTopic }) {
    return (
        <div className="chat-history">
            <div className="sidebar-chat-topic">
                <span>{chatTopic}</span>
            </div>
        </div>
    )
}

export default function ChatBotSideBar() {
    const data = [
        {
            id: crypto.randomUUID(),
            topic: "Topic1Topic1Topic1Topic1",
        },
        {
            id: crypto.randomUUID(),
            topic: "Topic2"
        },
        {
            id: crypto.randomUUID(),
            topic: "Topic3"
        }
    ]

    const [chatHistory, setchatHistory] = useState(data)

    function AddNewChat(){
        const newHistory = [
            ...chatHistory,
            {
                id: crypto.randomUUID(),
                topic: 'Assigned by AI' // [Update] ask the backend 
            }
        ]
        setchatHistory(newHistory)
    }


    return (

        <div className="chat-sidebar">
            
            <img className="menuIcon" src='/memuIcon.svg'></img>

            <div className="chat-histories-container">
                <div className='chat-subtitle'><span>Chat History</span></div>

                <div className="chat-hisories">

                    <div className="new-chat-history" onClick={AddNewChat}>
                        <img className='new-chat-icon' src='/newChatIcon.svg'></img>
                        <div className="new-sidebar-chat-topic">
                            <span>New Chat</span>
                        </div>
                    </div>


                    {
                        chatHistory.map((history) => {
                            return <ChatHistory chatTopic={history.topic} key={history.id} />
                        })
                    }
                </div>


            </div>



        </div>
    )
}