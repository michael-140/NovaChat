import './ChatBotMessages.css'
import botIcon from '../../../images/chatbotIcon.png'
import userIcon from '../../../images/userIcon.png'
import ChatInput from './ChatInput'
import { useEffect, useRef } from 'react'
import socket from '../../../socket'


function Message({ sender, content }) {
    const isUser = sender === 'user';

    return ( // message format 
        <div className={isUser ? "user-messages" : "bot-messages"}>
            {!isUser && <img className='chat-icon' src={botIcon} alt="bot" />}
            <span className={isUser ? 'user-message' : 'bot-message'}>{content}</span>
            {isUser && <img className='chat-icon' src={userIcon} alt="user" />}
        </div>
    );
}

export default function ChatBotMessages({ chatHistories, setChatHistories, currentHistory, setCurrentHistory }) {

    const chatMessageRef = useRef(null)

    useEffect(() => { // scroll to the new message (down side)
        const containerElem = chatMessageRef.current
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight
        }
    }, [currentHistory])

    useEffect(()=>{ // listener for ai response 
        socket.on('messageResponse',(aiResponse)=>{
            
            const newContent = currentHistory.content? [...currentHistory.content, aiResponse]: [aiResponse]

            setCurrentHistory(prev=>({
                ...prev,
                content: [...prev.content, aiResponse]
            }))
            
            setChatHistories((prev) => {
                const list = prev || []
                const isExisting = list.some(h => h.id === currentHistory.id)

                if (isExisting) {
                    // Update existing record in the list
                    return list.map(h => h.id === currentHistory.id ? { ...h, content: [...h.content, aiResponse]} : h);
                } else {
                    // Add the  new chat 
                    return [currentHistory, ...list];
                }
            });

        })
        return () => socket.off('messageResponse');
    }, [currentHistory.id, chatHistories.id])

    return (
        <div className="chat-messages-container">

            <div className="chat-messages" ref={chatMessageRef}>
                {/* showing caht messages for new users and user with histories*/}
                {!currentHistory?.content || currentHistory.content.length === 0 ? (
                    <h1 className='chat-topic'>Let's start the chat!</h1>
                ) : (
                    <>
                        <h1 className='chat-topic'>{currentHistory.topic}</h1>
                        {currentHistory.content.map((message) => (
                            <Message key={message.id} sender={message.sender} content={message.content} />
                        ))}
                    </>
                )}

            </div>

            <ChatInput
                setChatHistories={setChatHistories}
                currentHistory={currentHistory}
                setCurrentHistory={setCurrentHistory}
            />
        </div>
    )
}