import './ChatBotPage.css'
import botIcon from '../../images/chatbotIcon.png'
import userIcon from '../../images/userIcon.png'
import Header from '../../components/Header'
import ChatBotSideBar from '../ChatBotSideBar/ChatBotSideBar'   


export function ChatBotPage() {
    return(
        <>
            <Header />
            <div className='chatbot-container'>

                <div className="chatbot">

                    <ChatBotSideBar/>

                    <div className="chat-messages-container">

                        <div className="chat-messages">

                            <h1 className='chat-topic'>About CSS</h1>
                            
                            <div className="bot-messages">
                                <img className='chat-icon' src={botIcon}></img>
                                <span className='bot-message'>hi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bot</span>
                            </div>

                            <div className="user-messages">
                                <span className='user-message'>hi I am userhi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bot</span>
                                <img className='chat-icon' src={userIcon}></img>
                            </div>

                            <div className="user-messages">
                                <span className='user-message'>hi I am userhi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bot</span>
                                <img className='chat-icon' src={userIcon}></img>
                            </div>
                            
                            <div className="user-messages">
                                <span className='user-message'>hi I am userhi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bot</span>
                                <img className='chat-icon' src={userIcon}></img>
                            </div>

                            <div className="bot-messages">
                                <img className='chat-icon' src={botIcon}></img>
                                <span className='bot-message'>hi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bothi I am bot</span>
                            </div>

                        </div>

                        

                        <div className="chat-input-container">
                            <div className="chat-input-box">
                                <input className='chat-input' placeholder='Enter the message'></input>
                                <button className='chat-sendbtn'>Send</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}