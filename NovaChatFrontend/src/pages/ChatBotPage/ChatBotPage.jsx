import './ChatBotPage.css'
import Header from '../../components/Header'
import ChatBotSideBar from './ChatBotSideBar/ChatBotSideBar'   
import ChatBotMessages from './ChatBotMessages/ChatBotMessages'


export function ChatBotPage() {
    return(
        <>
            <Header />
            
            <div className='chatbot-container'>

                <div className="chatbot">

                    <ChatBotSideBar/>
                    <ChatBotMessages />
                    
                </div>

            </div>
        </>
    )
}