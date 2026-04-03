import './ChatBotSideBar.css'

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

    function AddNewChat(){
        const newHistory = [
            {
                id: crypto.randomUUID(),
                topic: 'Let\' start', // [Update] ask the backend 
                content: []
            },
            ...chatHistories
        ]
        setChatHistories(newHistory)
    }


    return (

        <div className="chat-sidebar">
            
            <img className="menuIcon" src='/memuIcon.svg'></img>

            <div className="chat-histories-container">
                <div className='chat-subtitle'><span>Chat History</span></div>

                <div className="chat-hisories">

                    <div className="new-chat-history" onClick={AddNewChat}>
                        <img className='new-chat-icon' src='/newChatIcon.svg'></img>
                        <div className="new-sidebar-chat-topic">
                            <span>New Chat</span>
                        </div>
                    </div>


                    {
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