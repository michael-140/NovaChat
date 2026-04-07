import { useState } from 'react'
import './ChatInput.css'
import {WarnWindow} from '../../../components/WarnWindow'

export default function ChatInput({setChatHistories, currentHistory,setCurrentHistory}){

    const [inputText, setInputText] = useState('')
    const [warnMessage, setWarnMessage] = useState('')

    function updateInputText(e){
        setInputText(e.target.value)
    }

    // save the latest message 
    function updateResponse(sender){

        let pervMessages = currentHistory.content || []
        let firstMessages = pervMessages[0]? pervMessages[0].content:[]
        const lastMessage = pervMessages[pervMessages.length - 1]

        // wait bot fully response
        if (lastMessage && lastMessage.sender !== 'bot'){
            setWarnMessage("Please wait for response before sending new message~")
            setTimeout(()=>{setWarnMessage("")},5000)
            return
        }

        const newMessage = {
            id: crypto.randomUUID(),
            sender: sender,
            content: inputText
        }

        const activeHistory = Object.keys(currentHistory).length === 0?
        { // create a new one if empty
            id: crypto.randomUUID(),
            topic: newMessage.content.slice(0,10) +"...",
            content: []
        }: currentHistory // use the current history

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

        // for the ai response 
        setTimeout(()=>{

            // update the topic
            firstMessages = newUserHistory.content[0].content    

            const newBotHistory = {
                ...newUserHistory,
                topic:firstMessages.slice(0,10) +"...",
                content: [
                    ...newUserHistory.content,
                    {
                        id: crypto.randomUUID(),
                        sender: "bot",
                        content: "Sorry~ So far AI function does not available!"
                    }
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
                    return [newBotHistory, ...list];
                }
            });
        },1000)
    }

    function sendMessage(){
        // avoid empty input 
        if (!inputText.trim()){
            return
        }

        updateResponse("user")
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