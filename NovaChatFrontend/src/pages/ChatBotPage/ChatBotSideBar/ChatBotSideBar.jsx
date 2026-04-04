import './ChatBotSideBar.css'
import {useState} from 'react'
function ChatHistory({ currentHistoryid,history,setCurrentHistory }) {
    
    const changeCurrentChat = ()=>{
        setCurrentHistory(history)
    }

    return (
        <button onClick={changeCurrentChat}>
            <div className={currentHistoryid===history.id? "history-active chat-history": "chat-history"}>
                <div className="sidebar-chat-topic">
                    <span>{history.topic}</span>
                </div>
            </div>
        </button>

    )
}

export default function ChatBotSideBar({chatHistories,setChatHistories,currentHistory,setCurrentHistory}) {

    const [isSideBarMax, setIsSideBarMax] = useState(true)

    function AddNewChat(){

        const newHistory = {
                id: crypto.randomUUID(),
                topic: 'Let\' start the chat!', // [Update] ask the backend 
                content: []
        }
        const newHistories = chatHistories? [newHistory, ...chatHistories]:[newHistory]

        setChatHistories(newHistories)
        setCurrentHistory(newHistories[0])
    }

    function changeSideBarSize(){
        setIsSideBarMax(!isSideBarMax)
    }


    return (

        <div className={isSideBarMax?
        "chat-sidebar max-side-bar" : "chat-sidebar min-side-bar"}>
            
            <button className={isSideBarMax?"menuIcon": " menuIcon-Center"} onClick={changeSideBarSize} >
                <img  src='/memuIcon.svg'></img>
            </button>

            <div className="chat-histories-container">
                <div className='chat-subtitle'>
                    <span className={!isSideBarMax && "hidden-class"}>Chat History</span>
                </div>

                <div className="chat-hisories">

                    <div className="new-chat-history" onClick={AddNewChat}>
                        <img className={isSideBarMax?'new-chat-icon':'new-chat-icon new-chat-icon-center'} src='/newChatIcon.svg'></img>
                        <div className={isSideBarMax?"new-sidebar-chat-topic":"hidden-class"}>
                            <span>New Chat</span>
                        </div>
                    </div>

                    {
                        chatHistories &&
                        chatHistories.map((history) => {
                            return <ChatHistory 
                                        history={history} 
                                        setCurrentHistory={setCurrentHistory}
                                        currentHistoryid={currentHistory.id}
                                        key={history.id} 
                                    />
                        })
                    }
                </div>

            </div>

        </div>
    )
}