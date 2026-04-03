import './Header.css'

export default function Header() {
    return (
        <header className="header">

            <div className="icon">
                <img src="/novachatIcon.svg" alt="NovaChat Icon" className="icon-image" />
                <span>NovaChat</span>
            </div>

            <div className="navigation">
                <a href="/home" className="nav-link ">Home</a>
                <a href="/chatbot" className="nav-link active">ChatBot</a>
                <a href="contact" className="nav-link ">Contact</a>
            </div>
            
            <div className="login">Login</div>

        </header>
    )
}