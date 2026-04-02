import './ChatBotSideBar.css'
import botIcon from '../../../images/chatbotIcon.png'
import { useState, useEffect } from 'react'


function ChatHistory({ chatTopic }) {
    return (
        <div className="chat-history">
            {/* <img className='chat-icon' src={botIcon}></img> */}
            <div className="sidebar-chat-topic">
                <span>{chatTopic}</span>
            </div>
        </div>
    )
}

export default function ChatBotSideBar() {
    const data = [
        {
            id: 1,
            topic: "Css1Css1Css1Css1Css1",
        },
        {
            id: 2,
            topic: "css2"
        },
        {
            id: 3,
            topic: "css3"
        }
    ]

    const [chatHistory, setchatHistory] = useState(data)


    return (

        <div className="chat-sidebar">
            
            <img className="menuIcon" src='/memuIcon.svg'></img>

            <div className="chat-histories-container">
                <div className='chat-subtitle'><span>Chat History</span></div>

                <div className="chat-hisories">

                    <div className="new-chat-history">
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