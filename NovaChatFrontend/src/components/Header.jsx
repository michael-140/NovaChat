import { NavLink } from 'react-router'
import './Header.css'

export default function Header() {
    return (
        <header className="header">

            <div className="icon">
                <NavLink to="/home" className={(isActive)=>{isActive &&''}}>
                    <img src="/novachatIcon.svg" alt="NovaChat Icon" className="icon-image" />
                </NavLink>

                <NavLink to="/home" className={(isActive)=>{isActive&& ''}} >
                    <span>NovaChat</span>
                </NavLink>

            </div>

            <div className="navigation">
                <NavLink to="/home" className="nav-link ">Home</NavLink>
                <NavLink to="/chatbot" className="nav-link">ChatBot</NavLink>
                <NavLink to="/contact" className="nav-link ">Contact</NavLink>
            </div>
            
            <div href="/login" className="login">
                <NavLink to="/login" className="nav-link">Login</NavLink>
            </div>

        </header>
    )
}