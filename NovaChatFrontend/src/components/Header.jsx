import { NavLink } from 'react-router'
import './Header.css'
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const { user, setUser } = useAuth();

    const handleLogout = async () => {
        const res = await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (res.ok) {
            setUser(null);
            window.location.href = '/login';
        }
    };

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
            
            <div className="login">
                {user ? (
                    <NavLink className="nav-link" onClick={handleLogout}>
                        Logout
                    </NavLink>
                ) : (
                    <NavLink to="/login" className="nav-link">
                        Login
                    </NavLink>
                )}
            </div>

        </header>
    )
}