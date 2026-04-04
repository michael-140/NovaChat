import './WarnWindow.css'
export function WarnWindow({warnMessage}){
    return (
        <>
            <div className={warnMessage? "warning-container-shown": "warning-container"}>
                {warnMessage || ""} 
            </div>
        </>
    )
}