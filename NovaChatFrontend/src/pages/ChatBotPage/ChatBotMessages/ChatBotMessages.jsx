import './ChatBotMessages.css'
import botIcon from '../../../images/chatbotIcon.png'
import userIcon from '../../../images/userIcon.png'
import ChatInput from './ChatInput'
import { useState } from 'react'


function Message({ sender, content }) {
    console.log("Enter the message")
    return (
        <>
            {
                sender === 'user' && (
                    <>
                        <div className="user-messages">
                            <span className='user-message'>{content}</span>
                            <img className='chat-icon' src={userIcon} />
                        </div>
                    </>
                )
            }

            {
                sender === 'bot' && (
                    <>
                        <div className="bot-messages">
                            <img className='chat-icon' src={botIcon} />
                            <span className='bot-message'>{content}</span>
                        </div>
                    </>
                )
            }

            {
                console.log("Finish the message")

            }

        </>
    )
}

export default function ChatBotMessages({ topic }) {
    const data = [
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
        },
    ]
    const [messages, setMessages] = useState(data)

    return (
        <div className="chat-messages-container">

            <div className="chat-messages">

                {messages.length === 0 ? ( // empty 
                    <>
                        <h1 className='chat-topic'>Let's start the chat!</h1>
                    </>
                ) : (
                    <>
                        <h1 className='chat-topic'>{topic}</h1>

                        {messages.map((message) => {
                            return (
                                < Message key={message.id} sender={message.sender} content={message.content} />
                            )
                        })}
                    </>
                )}
            </div>

            <ChatInput />
        </div>
    )
}