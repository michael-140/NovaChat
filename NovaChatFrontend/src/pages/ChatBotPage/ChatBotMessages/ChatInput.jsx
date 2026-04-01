import './ChatInput.css'

export default function ChatInput(){
    return (
        <div className="chat-input-container">
                <div className="chat-input-box">
                    <input className='chat-input' placeholder='Enter the message'></input>
                    <button className='chat-sendbtn'>Send</button>
                </div>
        </div>
    )
}