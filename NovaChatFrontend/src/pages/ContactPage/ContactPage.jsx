import React, { useState } from 'react';
import Header from '../../components/Header';
import './ContactPage.css';

export function ContactPage() {
    const [status, setStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate an API call
        setTimeout(() => setStatus('success'), 2000);
    };

    return (
        <>
            <Header />

            <div className="contact-page-container">

                <main className="contact-main">
                    <h1 className="contact-title">Contact Me</h1>

                    <div className="contact-glass-card">
                        <div className="contact-info">
                            <div className="info-item">
                                <div className="info-icon">
                                    {/* <img src='/gmailIcon.svg'></img> */}
                                    <svg viewBox="0 0 48 48" width="24px" height="24px">
                                        <path fill="#4285F4" d="M45,16.2V38c0,2.209-1.791,4-4,4H13.6l-0.2-0.2L7,35V10.8L45,16.2z" />
                                        <path fill="#34A853" d="M7,10.8V35L2.2,38.2C1.3,38.9,1,40,1,41s0.3,2.1,1.2,2.8C3.1,44.7,4.3,45,5.5,45h8.1V10.8L7,10.8z" />
                                        <path fill="#FBBC05" d="M7,10.8L1,16.2V41c0,1,0.3,2.1,1.2,2.8c0.9,0.7,2.1,1,3.3,1h8.1V10.8L7,10.8z" />
                                        <path fill="#EA4335" d="M47,6v35c0,2.209-1.791,4-4,4H33V10.8L47,6z" />
                                        <path fill="#C5221F" d="M33,10.8v34.2h8.1c1.2,0,2.4-0.3,3.3-1c0.9-0.7,1.2-1.8,1.2-2.8V16.2L33,10.8z" />
                                        <path fill="#EA4335" d="M42,6H6C3.791,6,2,7.791,2,10v6.2l22,14.8l22-14.8V10C46,7.791,44.209,6,42,6z" />
                                    </svg>
                                </div>
                                <div className="info-text">
                                    <p>Email</p>
                                    <a href='mailto:cmlok140@gmail.com'>cmlok140@gmail.com</a>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon">
                                    <img src='/githubIcon.svg'></img>
                                </div>
                                <div className="info-text">
                                    <p>GitHub</p>
                                    <a href='https://github.com/michael-140' target='_blank'>michael-140</a>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Name</label>
                                <input type="text" placeholder="Your Name" required />
                            </div>

                            <div className="input-group">
                                <label>Email</label>
                                <input type="email" placeholder="your.email@example.com" required />
                            </div>

                            <div className="input-group">
                                <label>Message</label>
                                <textarea rows="5" placeholder="Write your message..." required></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`send-btn ${status}`}
                                disabled={status !== 'idle'}
                            >
                                {status === 'idle' && 'Send Message'}
                                {status === 'sending' && 'Sending...'}
                                {status === 'success' && 'Message Sent! ✓'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>

        </>

    );
}