import { useState } from 'react'
import './ChatInput.css'

export default function ChatInput({currentHistory,setCurrentHistory}){
    const messages = currentHistory.content
    const [inputText, setInputText] = useState('')

    function updateInputText(e){
        setInputText(e.target.value)
    }

    function sendMessage(){
        if (inputText === ''){
            return
        }

        const newUserMessages = messages? [
            ...messages,
            {
                id: crypto.randomUUID(),
                sender: "user",
                content: inputText
            }
        ]: [
            {
                id: crypto.randomUUID(),
                sender: "user",
                content: inputText
            }
        ]

        const newUserHistory = {
            ...currentHistory,
            content: newUserMessages
        }


        setCurrentHistory(newUserHistory)

        const newBotMessages = [
            ...newUserMessages,
            {
                id: crypto.randomUUID(),
                sender: "bot",
                content: "Sorry~ So far AI function does not available!"
            }
        ]

        const newBotHistory = {
            ...newUserHistory,
            content: newBotMessages
        }
        
        setTimeout(()=>{
            setCurrentHistory(newBotHistory)
        },1000)

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