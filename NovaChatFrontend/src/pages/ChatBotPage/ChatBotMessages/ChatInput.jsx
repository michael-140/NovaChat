import { useState } from 'react'
import './ChatInput.css'
import {WarnWindow} from '../../../components/WarnWindow'

export default function ChatInput({chatHistories, setChatHistories, currentHistory,setCurrentHistory}){

    const [inputText, setInputText] = useState('')
    const [warnMessage, setWarnMessage] = useState('')

    function updateInputText(e){
        setInputText(e.target.value)
    }

    function sendMessage(){
        // avoid empty input and wait bot fully response
        if (!inputText.trim()){
            return
        }

        let pervMessages = currentHistory.content || []
        let firstMessages = pervMessages[0]? pervMessages[0].content:[]
        const lastMessage = pervMessages[pervMessages.length - 1]

        if (lastMessage && lastMessage.sender !== 'bot'){
            setWarnMessage("Please wait for response before sending new message~")
            setTimeout(()=>{setWarnMessage("")},5000)
            return
        }

        // updating the state of user asking
        const newMessage = {
            id: crypto.randomUUID(),
            sender: "user",
            content: inputText
        }

        const activeHistory = Object.keys(currentHistory).length === 0?
        {
            id: crypto.randomUUID(),
            topic: newMessage.content.slice(0,10) +"...",
            content: []
        }: currentHistory

        const newUserHistory = {
            ...activeHistory,
            topic:firstMessages.slice(0,10) +"...",
            content: [
                ...pervMessages,
                newMessage
            ]
        }


        setCurrentHistory(newUserHistory);
        setInputText("");

        // update the ai response 
        
        setTimeout(()=>{

            const botMessage = {
                id: crypto.randomUUID(),
                sender: "bot",
                content: "Sorry~ So far AI function does not available!"
            }

            // update the topic
            firstMessages = newUserHistory.content[0].content    

            const newBotHistory = {
                ...newUserHistory,
                topic:firstMessages.slice(0,10) +"...",
                content: [
                    ...newUserHistory.content,
                    botMessage
                ]
            }
            
            setCurrentHistory(newBotHistory)

            setChatHistories((prev) => {
                const list = prev || []
                const isExisting = list.some(h => h.id === newBotHistory.id)

                if (isExisting) {
                    // Update existing record in the list
                    return list.map(h => h.id === newBotHistory.id ? newBotHistory : h);
                } else {
                    // Add the  new chat 
                    return [newBotHistory];
                }
            });
        },1000)

        setInputText("")
    }
    
    const keyEnter = e=>{
        if (e.key==='Enter') sendMessage()

        if (e.key==='Escape') e.target.blur()
    }

    return (
        <>
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
            <WarnWindow warnMessage={warnMessage}/>
        </>

    )
}