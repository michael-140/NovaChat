import './ChatBotSideBar.css'
import botIcon from '../../../images/chatbotIcon.png'

export default function ChatBotSideBar() {
    return (
        <div className="chat-sidebar">
            <div className="chat-historys">
                <div className='chat-subtitle'>Chat History</div>
                <div className="chat-history history-active">
                    <img className='chat-icon' src={botIcon}></img>
                    <div className="sidebar-chat-topic">
                        About CSS
                    </div>
                </div>

                <div className="chat-history">
                    <img className='chat-icon' src={botIcon}></img>
                    <div className="sidebar-chat-topic">
                        About CSS2
                    </div>
                </div>
            </div>

            <img className="menuIcon" src='/memuIcon.svg'></img>


        </div>
    )
}