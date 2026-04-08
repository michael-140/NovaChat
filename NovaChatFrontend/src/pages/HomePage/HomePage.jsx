import Header from '../../components/Header'
import "./HomePage.css"

export function HomePage() {
    
    const features = [
        {
            icon: '/nodejsIcon.svg',
            title: 'Frontend (React)',
            description: 'A responsive and intuitive user interface built with the latest React features.',
        },
        {
            icon: '/react.svg',
            title: 'Backend - Node.js (In progress)',
            description: 'High-performance server architecture managing data flow and AI integration.',
        },
        {
            icon: '/deepseekIcon.svg',
            title: 'AI - Ollama + DeepSeek (In progress)',
            description: 'Intelligent, context-aware conversations powered by cutting-edge local models.',
        },
    ];


    return (
        <div className='home-page-container'>
            <Header />

            <main>

                <section className={"hero-section"}>
                    <div className={"hero-container"}>
                        <h1 className={"headline"}>
                            Meet NovaChat: Your AI-Powered Conversation Partner.
                        </h1>
                        <p className={"hero-subheading"}>
                            Experience a sleek, modern UI for intelligent interactions, powered by a robust stack.
                        </p>

                        <div className={"hero-image-container"}>
                            {/* <img src='/homePageBg.png' alt="NovaChat AI Visualization" className={"hero-image"} /> */}
                            <a href="/chatbot" className={"hero-cta-button"}>
                                Try ChatBot
                            </a>
                        </div>

                    </div>
                </section>

                <section >
                    <h1 className='feature-header'>The project will be done by three parts</h1>
                    <div className='feature-cards-session'>
                        {features.map((feature) => (
                            <div key={crypto.randomUUID()} className="feature-card">
                                <div className="feature-icon-container">
                                    <img className='feature-icon-img' src={feature.icon}></img>
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            <footer>
                <p>&copy; 2026 NovaChat Project. All rights reserved.</p>
            </footer>
        </div>
    );
};