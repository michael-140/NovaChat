import './Header.css'

export default function Header() {
    return (
        <header className="header">

            <div className="icon">
                <a href="/home">
                    <img src="/novachatIcon.svg" alt="NovaChat Icon" className="icon-image" />
                </a>
                <a href="/home">
                    <span>NovaChat</span>
                </a>

            </div>

            <div className="navigation">
                <a href="/home" className="nav-link ">Home</a>
                <a href="/chatbot" className="nav-link active">ChatBot</a>
                <a href="/contact" className="nav-link ">Contact</a>
            </div>
            
            <div href="/login" className="login">
                <a href="/login" className="nav-link">Login</a>
            </div>

        </header>
    )
}