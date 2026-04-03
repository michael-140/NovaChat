import { useState } from 'react'
import './ChatInput.css'

export default function ChatInput({messages, setMessages}){
    const [inputText, setInputText] = useState('')

    function updateInputText(e){
        setInputText(e.target.value)
    }

    function sendMessage(){
        if (inputText === ''){
            return
        }
        const newUserMessage = [
            ...messages,
            {
                id: crypto.randomUUID(),
                sender: "user",
                content: inputText
            }
        ]
        setMessages(newUserMessage)

        const newBotMessage = [
            ...newUserMessage,
            {
                id: crypto.randomUUID(),
                sender: "bot",
                content: "Sorry~ So far AI function does not available!"
            }
        ]
        
        setTimeout(()=>{
            setMessages(newBotMessage)
        },1500)

        setInputText("")
    }
    
    const keyEnter = e=>{
        if (e.key==='Enter') sendMessage()

        if (e.key==='Escape') e.target.blur()
    }

    return (
        <div className="chat-input-container">
                <div className="chat-input-box">

                    <input 
                        className='chat-input' 
                        placeholder='Enter the message'
                        onChange={updateInputText}
                        onKeyDown={keyEnter}
                        value={inputText}
                    />

                    <button className='chat-sendbtn' 
                    onClick={sendMessage}
                    style={{
                        cursor: inputText ==="" ? 'not-allowed': "pointer"
                    }}
                    >
                        Send
                    </button>

                </div>
        </div>
    )
}