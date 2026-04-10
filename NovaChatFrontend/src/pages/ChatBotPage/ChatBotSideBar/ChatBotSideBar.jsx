import './ChatBotSideBar.css'
import {useState} from 'react'
import newChatIcon from  '../../../images/newChatIcon.svg'
import menuIcon from  '../../../images/menuIcon.svg'

function ChatHistory({ chatHistories,setChatHistories,currentHistoryid,history,setCurrentHistory }) {
    
    const changeCurrentChat = ()=>{
        setCurrentHistory(history)

    }

    const delChat =  ()=>{

        setChatHistories(prevHistories => 
            prevHistories.filter(hist => hist.id !== history.id)
        )

        if (currentHistoryid === history.id) {
            setCurrentHistory({}); 
        }
    }

    return (
        <div className='chat-container'>
            <button className='switch-chat-btn' onClick={changeCurrentChat}>
                <div className={currentHistoryid===history.id? "history-active chat-history": "chat-history"}>
                    <div className="sidebar-chat-topic">
                        <span>{history.topic}</span>
                    </div>
                </div>
            </button>
            <button className="close-btn" onClick={delChat}>X</button>
        </div>

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
                <img  src={menuIcon}></img>
            </button>

            <div className="chat-histories-container">
                <div className='chat-subtitle'>
                    <span className={isSideBarMax?"":"hidden-class"}>Chat History</span>
                </div>

                <div className="chat-hisories">

                    <div className="new-chat-history" onClick={AddNewChat}>
                        <img className={isSideBarMax?'new-chat-icon':'new-chat-icon new-chat-icon-center'} src={newChatIcon}></img>
                        <div className={isSideBarMax?"new-sidebar-chat-topic":"hidden-class"}>
                            <span>New Chat</span>
                        </div>
                    </div>

                    {
                        chatHistories &&
                        chatHistories.map((history) => {
                            return <ChatHistory 
                                        history={history} 
                                        chatHistories={chatHistories}
                                        setChatHistories={setChatHistories}
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