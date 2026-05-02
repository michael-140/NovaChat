import { useState } from 'react'
import './ChatInput.css'
import { WarnWindow } from '../../../components/WarnWindow'
import socket from '../../../socket'

export default function ChatInput({ setChatHistories, currentHistory, setCurrentHistory }) {

    const [inputText, setInputText] = useState('')
    const [warnMessage, setWarnMessage] = useState('')

    function updateInputText(e) {
        setInputText(e.target.value)
    }

    // save the latest message 
    function updateResponse(sender) {

        let pervMessages = currentHistory.content || []
        const lastMessage = pervMessages[pervMessages.length - 1]
        let firstMessage = pervMessages[0] || []

        // wait bot fully response
        if (lastMessage && lastMessage.sender !== 'bot') {
            setWarnMessage("Please wait for response before sending new message~")
            setTimeout(() => { setWarnMessage("") }, 5000)
            return
        }

        const newMessage = {
            id: crypto.randomUUID(),
            sender: sender,
            content: inputText
        }

        socket.emit('sendMessage', newMessage.content)
        let activeHistory;

        if (Object.keys(currentHistory).length === 0){
            activeHistory = { // create a new one if empty
                id: crypto.randomUUID(),
                topic: newMessage.content.slice(0, 10) + "...",
                content: []
            }
        }else if (currentHistory.content.length === 0) {
            activeHistory = {
            ...currentHistory,
            topic: newMessage.content.slice(0, 10) + "..."
            }
        }else activeHistory = currentHistory


                const newUserHistory = {
                    ...activeHistory,
                    content: [
                        ...pervMessages,
                        newMessage
                    ]
                }

                setCurrentHistory(newUserHistory);

                setChatHistories(prev => prev.map(h =>
                    h.id === newUserHistory.id ? newUserHistory : h
                ));
                setInputText("");
            }

        function sendMessage() {
            // avoid empty input 
            if (!inputText.trim()) {
                return
            }

            updateResponse("user")
        }

        const keyEnter = e => {
            if (e.key === 'Enter') sendMessage()

            if (e.key === 'Escape') e.target.blur()
        }

        return ( // input box 
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
                                cursor: inputText === "" ? 'not-allowed' : "pointer"
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
                <WarnWindow warnMessage={warnMessage} />
            </>

        )
    }