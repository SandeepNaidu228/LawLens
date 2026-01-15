import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, FileText, Shield, Gavel, CheckCircle } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Navigation */}
            <nav className="navbar">
                <div className="container nav-content">
                    <div className="brand">
                        <Gavel size={28} color="var(--color-accent)" />
                        <span className="brand-name">LawLens</span>
                    </div>
                    <Link to="/signin" className="btn btn-primary">
                        Sign In
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section">
                <div className="container hero-content">
                    <div className="badge">
                        AI-Powered Legal Awareness
                    </div>
                    <h1 className="hero-title">
                        Understand Your <br />
                        <span className="text-accent">Legal Rights</span> in Seconds.
                    </h1>
                    <p className="hero-text">
                        Describe your problem in plain language. Our AI instantly maps it to relevant IPC sections, helping you understand the law without the jargon.
                    </p>
                    <div className="hero-cta">
                        <Link to="/signin" className="btn btn-primary btn-lg">
                            Get Started <ArrowRight size={20} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* How It Works */}
            <section className="section bg-white">
                <div className="container">
                    <div className="section-header">
                        <h2>How It Works</h2>
                        <p>Three simple steps to legal clarity</p>
                    </div>

                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-icon">
                                <MessageSquareIcon />
                            </div>
                            <h3>1. Describe Incident</h3>
                            <p>Type what happened in your own words. No legal terms needed.</p>
                        </div>

                        <div className="step-arrow">
                            <ArrowRight size={24} color="var(--color-text-muted)" />
                        </div>

                        <div className="step-card">
                            <div className="step-icon">
                                <SearchIcon />
                            </div>
                            <h3>2. AI Analysis</h3>
                            <p>Our intelligent system scans the Indian Penal Code to find matches.</p>
                        </div>

                        <div className="step-arrow">
                            <ArrowRight size={24} color="var(--color-text-muted)" />
                        </div>

                        <div className="step-card">
                            <div className="step-icon">
                                <FileTextIcon />
                            </div>
                            <h3>3. Get Explanation</h3>
                            <p>Receive clear summaries of relevant sections and punishments.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon-wrapper">
                                <CheckCircle size={24} color="var(--color-success)" />
                            </div>
                            <div>
                                <h3>AI-Powered Mapping</h3>
                                <p>Advanced NLP connects your story to the exact laws that apply.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon-wrapper">
                                <Shield size={24} color="var(--color-accent)" />
                            </div>
                            <div>
                                <h3>Privacy First</h3>
                                <p>We don't store your query data. Your search is completely anonymous.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon-wrapper">
                                <Gavel size={24} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h3>IPC Coverage</h3>
                                <p>Comprehensive database of the Indian Penal Code sections.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <p className="copyright">&copy; 2024 LawLens. Legal Awareness Platform.</p>
                    </div>
                </div>
            </footer>

            <style>{`
        .landing-page {
          background: var(--color-background);
        }

        .navbar {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 1rem 0;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--color-primary);
        }

        .hero-section {
          padding: 6rem 0;
          text-align: center;
          background: radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 50%);
        }

        .badge {
          display: inline-block;
          background: #EFF6FF;
          color: var(--color-accent);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }

        .text-accent {
          color: var(--color-accent);
        }

        .hero-text {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }

        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }

        .ml-2 {
          margin-left: 0.5rem;
        }

        .section {
          padding: 5rem 0;
        }

        .bg-white {
          background: white;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .section-header p {
          color: var(--color-text-muted);
          font-size: 1.125rem;
        }

        .steps-grid {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 2rem;
        }

        .step-card {
          flex: 1;
          text-align: center;
          max-width: 300px;
        }

        .step-icon {
          width: 64px;
          height: 64px;
          background: #F1F5F9;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--color-primary);
        }
        
        .step-arrow {
            margin-top: 20px;
            display: flex;
            align-items: center;
        }
        
        @media (max-width: 768px) {
            .steps-grid {
                flex-direction: column;
                align-items: center;
            }
            .step-arrow {
                transform: rotate(90deg);
                margin: 10px 0;
            }
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
        }

        .footer {
          padding: 2rem 0;
          text-align: center;
          color: var(--color-text-muted);
          border-top: 1px solid var(--color-border);
        }
      `}</style>
        </div>
    );
};

// Icons wrapper for cleanliness
const MessageSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
);
const FileTextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
);

export default LandingPage;
