import './ChatBotMessages.css'
import botIcon from '../../../images/chatbotIcon.png'
import userIcon from '../../../images/userIcon.png'
import ChatInput from './ChatInput'
import { useEffect, useRef, useState } from 'react'


function Message({ sender, content }) {
    const isUser = sender === 'user';
    
    return (
        <div className={isUser ? "user-messages" : "bot-messages"}>
            {!isUser && <img className='chat-icon' src={botIcon} alt="bot" />}
            <span className={isUser ? 'user-message' : 'bot-message'}>{content}</span>
            {isUser && <img className='chat-icon' src={userIcon} alt="user" />}
        </div>
    );
}

export default function ChatBotMessages({ currentHistory, setCurrentHistory }) {

    const chatMessageRef = useRef(null)

    useEffect(()=>{ // scroll to the new message
        const containerElem = chatMessageRef.current
        if (containerElem){
            containerElem.scrollTop = containerElem.scrollHeight
        }
    }, [currentHistory])

    return (
        <div className="chat-messages-container">

            <div className="chat-messages" ref={chatMessageRef}>

                {currentHistory.content.length === 0 ? ( // empty 
                    <>
                        <h1 className='chat-topic'>Let's start the chat!</h1>
                    </>
                ) : (
                    <>
                        <h1 className='chat-topic'>{currentHistory.topic}</h1>

                        {currentHistory.content.map((message) => {
                            return (
                                < Message key={message.id} sender={message.sender} content={message.content} />
                            )
                        })}
                    </>
                )}
            </div>

            <ChatInput 
                currentHistory={currentHistory}
                setCurrentHistory={setCurrentHistory}
            />
        </div>
    )
}