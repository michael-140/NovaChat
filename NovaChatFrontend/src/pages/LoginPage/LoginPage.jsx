import { useState } from 'react';
import Header from '../../components/Header';
import './LoginPage.css';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
    const [isLogin, setIsLogin] = useState(true); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const { checkAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 

        const account = e.target.account.value;
        const password = e.target.password.value;
        const endpoint = isLogin ? 'login' : 'register';

        try {
            const res = await fetch(`http://localhost:8000/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ account, password }),
                credentials: 'include'
            });

            const data = await res.json();

            if (res.ok) {
                if (isLogin) {
                    await checkAuth(); 
                    window.location.href = '/chatbot';
                } else {
                    alert("Registration successful! Please login.");
                    setIsLogin(true); 
                }
            } else {
                
                setErrorMessage(data.error || "An error occurred");
            }
        } catch (error) {
            setErrorMessage("Server connection failed");
            console.error(`${isLogin ? 'Login' : 'Register'} failed`, error);
        }
    };

    return (
        <>
            <Header />
            <div className="login-container">
                <form className='login-form' onSubmit={handleSubmit}>
                    <h1>{isLogin ? 'Login' : 'Register'}</h1>

                    <div className="img-container">
                        <img src='/novachatIcon.svg' className='login-novaIcon' alt="icon" />
                    </div>

                    {errorMessage && <div className="error-banner">{errorMessage}</div>}

                    <div className="input-containers">
                        <div className="input-container">
                            <label>Account</label>
                            <input type='text' id='account' name='account' placeholder='Your account' required />
                        </div>

                        <div className="input-container">
                            <label>Password</label>
                            <input type='password' id='password' name='password' placeholder='Your password' required />
                        </div>
                    </div>

                    <input type='submit' className='login-submit-btn' value={isLogin ? 'Login' : 'Sign Up'} />

                    <p className="auth-switch-text">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <span onClick={() => {setIsLogin(!isLogin); setErrorMessage('');}}>
                            {isLogin ? ' Register now' : ' Login here'}
                        </span>
                    </p>
                </form>
            </div>
        </>
    );
}