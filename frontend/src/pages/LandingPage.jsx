import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  FileText, 
  ShieldCheck, 
  Scale, 
  Lock, 
  BrainCircuit, 
  BookOpen,
  ChevronRight,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

const LandingPage = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="landing-page">
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container nav-content">
                    <div className="brand">
                        <div className="brand-icon">
                            <Scale size={24} />
                        </div>
                        <span className="brand-name">LawLens</span>
                    </div>
                    <div className="nav-actions">
                        <span className="privacy-badge">
                            <Lock size={12} /> 
                            <span>Privacy-First</span>
                        </span>
                        <Link to="/signin" className="btn btn-nav">
                            Sign In
                        </Link>
                        <Link to="/signin" className="btn btn-primary">
                            Get Started <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </nav>

            <header className="hero-section">
                <div className="hero-bg">
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="grid-overlay"></div>
                </div>
                
                <div className="container hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <Sparkles size={14} />
                            <span>AI-Powered Legal Intelligence</span>
                        </div>
                        
                        <h1 className="hero-title">
                            Navigate Indian Law
                            <span className="title-accent"> with Precision</span>
                        </h1>
                        
                        <p className="hero-description">
                            Transform complex legal scenarios into actionable insights. 
                            Our AI maps your situation to the exact IPC sections—privately, 
                            accurately, and instantly.
                        </p>
                        
                        <div className="hero-cta">
                            <Link to="/signin" className="btn btn-cta-primary">
                                <span>Start Free Analysis</span>
                                <ArrowRight size={18} />
                            </Link>
                            <Link to="/signin" className="btn btn-cta-secondary">
                                <span>Explore IPC Library</span>
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>

                        <div className="hero-trust">
                            <div className="trust-item">
                                <CheckCircle2 size={16} />
                                <span>No data retention</span>
                            </div>
                            <div className="trust-divider"></div>
                            <div className="trust-item">
                                <CheckCircle2 size={16} />
                                <span>500+ IPC sections</span>
                            </div>
                            <div className="trust-divider"></div>
                            <div className="trust-item">
                                <CheckCircle2 size={16} />
                                <span>Instant results</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="demo-window">
                            <div className="window-header">
                                <div className="window-dots">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                </div>
                                <span className="window-title">LawLens Analysis</span>
                            </div>
                            <div className="window-content">
                                <div className="demo-input">
                                    <div className="input-label">
                                        <Search size={14} />
                                        <span>Describe your incident</span>
                                    </div>
                                    <p className="input-text">"Someone snatched my gold chain from my neck while I was waiting for the bus..."</p>
                                </div>
                                
                                <div className="demo-processing">
                                    <div className="process-line"></div>
                                    <div className="process-badge">
                                        <BrainCircuit size={14} />
                                        <span>Semantic Analysis</span>
                                    </div>
                                    <div className="process-line"></div>
                                </div>
                                
                                <div className="demo-output">
                                    <div className="output-header">
                                        <div className="section-tag">
                                            <BookOpen size={14} />
                                            <span>IPC Section 379</span>
                                        </div>
                                        <div className="confidence-badge">98% Match</div>
                                    </div>
                                    <h4 className="output-title">Theft</h4>
                                    <div className="output-tags">
                                        <span className="tag cognizable">Cognizable</span>
                                        <span className="tag bailable">Non-Bailable</span>
                                        <span className="tag punishment">Up to 3 Years</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="visual-glow"></div>
                    </div>
                </div>
            </header>

            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">
                            <Zap size={14} />
                            <span>Why Choose LawLens</span>
                        </div>
                        <h2>Built for Privacy, <br />Engineered for Accuracy</h2>
                        <p>Unlike generic AI chatbots, LawLens is purpose-built for Indian legal intelligence.</p>
                    </div>
                    
                    <div className="features-grid">
                        <div className="feature-card featured">
                            <div className="feature-icon privacy">
                                <ShieldCheck size={28} />
                            </div>
                            <h3>Zero Data Retention</h3>
                            <p>Your queries are processed in-memory and discarded immediately. No logs, no history, no compromise on your privacy.</p>
                            <div className="feature-highlight">
                                <Lock size={14} />
                                <span>Enterprise-grade privacy</span>
                            </div>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon accuracy">
                                <FileText size={28} />
                            </div>
                            <h3>No Hallucinations</h3>
                            <p>We use retrieval-based AI anchored to the actual IPC text. You get exact legal provisions, not AI interpretations.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon context">
                                <Scale size={28} />
                            </div>
                            <h3>Indian Context</h3>
                            <p>Comprehensive coverage of Indian Penal Code with structured attributes: Bailability, Cognizability, and Jurisdiction.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="process-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">
                            <BrainCircuit size={14} />
                            <span>How It Works</span>
                        </div>
                        <h2>From Confusion to Clarity <br />in Three Steps</h2>
                    </div>

                    <div className="process-steps">
                        <div className="step-card">
                            <div className="step-number">01</div>
                            <div className="step-content">
                                <h3>Describe Your Situation</h3>
                                <p>Type what happened in plain language. No legal jargon required—just tell us your story.</p>
                            </div>
                            <div className="step-visual">
                                <div className="step-icon">
                                    <Search size={24} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="step-connector">
                            <ChevronRight size={20} />
                        </div>
                        
                        <div className="step-card">
                            <div className="step-number">02</div>
                            <div className="step-content">
                                <h3>AI Analysis</h3>
                                <p>Our NLP engine processes your description, extracting intent and matching semantic meaning to legal definitions.</p>
                            </div>
                            <div className="step-visual">
                                <div className="step-icon">
                                    <BrainCircuit size={24} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="step-connector">
                            <ChevronRight size={20} />
                        </div>
                        
                        <div className="step-card">
                            <div className="step-number">03</div>
                            <div className="step-content">
                                <h3>Get Results</h3>
                                <p>Receive specific IPC sections with punishments, bail status, and jurisdiction—all backed by actual legal text.</p>
                            </div>
                            <div className="step-visual">
                                <div className="step-icon">
                                    <BookOpen size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-content">
                            <h2>Ready to Navigate Indian Law?</h2>
                            <p>Join thousands using LawLens for quick, private, and accurate legal insights.</p>
                            <Link to="/signin" className="btn btn-cta-white">
                                <span>Start Your Analysis</span>
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                        <div className="cta-bg-elements">
                            <div className="cta-orb"></div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="brand-icon">
                                <Scale size={20} />
                            </div>
                            <span>LawLens</span>
                        </div>
                        <p className="disclaimer">
                            <strong>Disclaimer:</strong> LawLens is a legal information platform, not a substitute for professional legal counsel. 
                            We do not provide legal advice. Always consult a qualified lawyer for legal matters.
                        </p>
                        <div className="footer-bottom">
                            <p className="copyright">&copy; 2026 LawLens. Privacy-First Legal Intelligence.</p>
                        </div>
                    </div>
                </div>
            </footer>

            <style>{`
                .landing-page {
                    min-height: 100vh;
                    background: var(--color-bg-dark, #080B14);
                    color: var(--color-text-primary, #F8FAFC);
                    font-family: var(--font-sans, 'Inter', sans-serif);
                    overflow-x: hidden;
                }

                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 100;
                    padding: 1rem 0;
                    transition: all 0.3s ease;
                }

                .navbar.scrolled {
                    background: rgba(8, 11, 20, 0.85);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 0.75rem 0;
                }

                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .brand {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .brand-icon {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, var(--color-accent, #D4AF37) 0%, #B8860B 100%);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #080B14;
                }

                .brand-name {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-weight: 700;
                    font-size: 1.5rem;
                    letter-spacing: -0.02em;
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .privacy-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.75rem;
                    color: var(--color-accent, #D4AF37);
                    background: rgba(212, 175, 55, 0.08);
                    padding: 0.4rem 0.75rem;
                    border-radius: 100px;
                    border: 1px solid rgba(212, 175, 55, 0.15);
                }

                .btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    border-radius: 8px;
                }

                .btn-nav {
                    padding: 0.5rem 1rem;
                    color: var(--color-text-secondary, #CBD5E1);
                }

                .btn-nav:hover {
                    color: white;
                }

                .btn-primary {
                    padding: 0.6rem 1.25rem;
                    background: linear-gradient(135deg, var(--color-primary, #6366F1) 0%, var(--color-primary-dark, #4F46E5) 100%);
                    color: white;
                    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
                }

                .btn-primary:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
                }

                .hero-section {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    padding: 8rem 0 6rem;
                }

                .hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    pointer-events: none;
                }

                .gradient-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                }

                .orb-1 {
                    top: 10%;
                    right: 20%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
                }

                .orb-2 {
                    bottom: 20%;
                    left: 10%;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
                }

                .grid-overlay {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
                    background-size: 60px 60px;
                    mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
                }

                .hero-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(99, 102, 241, 0.1);
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    padding: 0.5rem 1rem;
                    border-radius: 100px;
                    font-size: 0.85rem;
                    color: var(--color-primary-light, #818CF8);
                    margin-bottom: 1.5rem;
                }

                .hero-title {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 700;
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.03em;
                }

                .title-accent {
                    display: block;
                    background: linear-gradient(135deg, var(--color-accent, #D4AF37) 0%, var(--color-accent-light, #F4D35E) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-description {
                    font-size: 1.125rem;
                    color: var(--color-text-secondary, #CBD5E1);
                    line-height: 1.7;
                    margin-bottom: 2rem;
                    max-width: 520px;
                }

                .hero-cta {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 2.5rem;
                }

                .btn-cta-primary {
                    padding: 1rem 1.75rem;
                    background: linear-gradient(135deg, var(--color-primary, #6366F1) 0%, var(--color-primary-dark, #4F46E5) 100%);
                    color: white;
                    font-weight: 600;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
                }

                .btn-cta-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.45);
                }

                .btn-cta-secondary {
                    padding: 1rem 1.75rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: var(--color-text-primary, #F8FAFC);
                    font-weight: 500;
                    border-radius: 12px;
                }

                .btn-cta-secondary:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(255, 255, 255, 0.15);
                }

                .hero-trust {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .trust-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--color-text-muted, #64748B);
                }

                .trust-item svg {
                    color: var(--color-success, #10B981);
                }

                .trust-divider {
                    width: 4px;
                    height: 4px;
                    background: var(--color-text-subtle, #475569);
                    border-radius: 50%;
                }

                .hero-visual {
                    position: relative;
                    z-index: 2;
                }

                .demo-window {
                    background: rgba(17, 24, 39, 0.8);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 
                        0 25px 50px rgba(0, 0, 0, 0.5),
                        0 0 100px rgba(99, 102, 241, 0.1);
                }

                .window-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.25rem;
                    background: rgba(255, 255, 255, 0.02);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .window-dots {
                    display: flex;
                    gap: 0.5rem;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                .dot.red { background: #EF4444; }
                .dot.yellow { background: #F59E0B; }
                .dot.green { background: #10B981; }

                .window-title {
                    font-size: 0.8rem;
                    color: var(--color-text-muted, #64748B);
                }

                .window-content {
                    padding: 1.5rem;
                }

                .demo-input {
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    padding: 1rem;
                    margin-bottom: 1.25rem;
                }

                .input-label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: var(--color-text-muted, #64748B);
                    margin-bottom: 0.5rem;
                }

                .input-text {
                    color: var(--color-text-secondary, #CBD5E1);
                    font-style: italic;
                    line-height: 1.5;
                    margin: 0;
                }

                .demo-processing {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1.25rem;
                }

                .process-line {
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
                }

                .process-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.75rem;
                    color: var(--color-accent, #D4AF37);
                    background: rgba(212, 175, 55, 0.1);
                    padding: 0.35rem 0.75rem;
                    border-radius: 100px;
                    white-space: nowrap;
                }

                .demo-output {
                    background: rgba(99, 102, 241, 0.08);
                    border: 1px solid rgba(99, 102, 241, 0.15);
                    border-radius: 12px;
                    padding: 1.25rem;
                }

                .output-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.75rem;
                }

                .section-tag {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.85rem;
                    color: var(--color-primary-light, #818CF8);
                    font-weight: 600;
                }

                .confidence-badge {
                    font-size: 0.75rem;
                    background: rgba(16, 185, 129, 0.15);
                    color: var(--color-success, #10B981);
                    padding: 0.25rem 0.6rem;
                    border-radius: 100px;
                    font-weight: 600;
                }

                .output-title {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 1.25rem;
                    margin: 0 0 0.75rem 0;
                }

                .output-tags {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .tag {
                    font-size: 0.7rem;
                    padding: 0.25rem 0.6rem;
                    border-radius: 6px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.3px;
                }

                .tag.cognizable {
                    background: rgba(239, 68, 68, 0.15);
                    color: #FCA5A5;
                }

                .tag.bailable {
                    background: rgba(245, 158, 11, 0.15);
                    color: #FCD34D;
                }

                .tag.punishment {
                    background: rgba(99, 102, 241, 0.15);
                    color: #A5B4FC;
                }

                .visual-glow {
                    position: absolute;
                    bottom: -100px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80%;
                    height: 200px;
                    background: radial-gradient(ellipse, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
                    filter: blur(60px);
                    pointer-events: none;
                }

                .features-section {
                    padding: 8rem 0;
                    position: relative;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .section-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(99, 102, 241, 0.1);
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    padding: 0.4rem 0.9rem;
                    border-radius: 100px;
                    font-size: 0.8rem;
                    color: var(--color-primary-light, #818CF8);
                    margin-bottom: 1.25rem;
                }

                .section-header h2 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: clamp(2rem, 4vw, 2.75rem);
                    margin-bottom: 1rem;
                    line-height: 1.2;
                }

                .section-header p {
                    font-size: 1.1rem;
                    color: var(--color-text-secondary, #CBD5E1);
                    max-width: 500px;
                    margin: 0 auto;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .feature-card {
                    background: rgba(17, 24, 39, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                }

                .feature-card:hover {
                    background: rgba(17, 24, 39, 0.8);
                    border-color: rgba(255, 255, 255, 0.1);
                    transform: translateY(-4px);
                }

                .feature-card.featured {
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(17, 24, 39, 0.8) 100%);
                    border-color: rgba(99, 102, 241, 0.2);
                }

                .feature-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                }

                .feature-icon.privacy {
                    background: rgba(16, 185, 129, 0.1);
                    color: var(--color-success, #10B981);
                }

                .feature-icon.accuracy {
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--color-primary-light, #818CF8);
                }

                .feature-icon.context {
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--color-accent, #D4AF37);
                }

                .feature-card h3 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 1.25rem;
                    margin-bottom: 0.75rem;
                }

                .feature-card p {
                    color: var(--color-text-secondary, #CBD5E1);
                    line-height: 1.7;
                    font-size: 0.95rem;
                }

                .feature-highlight {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 1.25rem;
                    padding: 0.5rem 0.9rem;
                    background: rgba(16, 185, 129, 0.1);
                    border-radius: 100px;
                    font-size: 0.8rem;
                    color: var(--color-success, #10B981);
                }

                .process-section {
                    padding: 6rem 0 8rem;
                    background: linear-gradient(180deg, transparent 0%, rgba(17, 24, 39, 0.3) 100%);
                }

                .process-steps {
                    display: flex;
                    align-items: stretch;
                    justify-content: center;
                    gap: 1rem;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .step-card {
                    flex: 1;
                    background: rgba(17, 24, 39, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    padding: 2rem;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .step-card:hover {
                    border-color: rgba(99, 102, 241, 0.2);
                    background: rgba(17, 24, 39, 0.7);
                }

                .step-number {
                    font-size: 4rem;
                    font-weight: 800;
                    color: rgba(99, 102, 241, 0.1);
                    line-height: 1;
                    margin-bottom: 1rem;
                }

                .step-content h3 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 1.2rem;
                    margin-bottom: 0.75rem;
                }

                .step-content p {
                    color: var(--color-text-secondary, #CBD5E1);
                    font-size: 0.95rem;
                    line-height: 1.6;
                }

                .step-visual {
                    position: absolute;
                    bottom: 1.5rem;
                    right: 1.5rem;
                }

                .step-icon {
                    width: 48px;
                    height: 48px;
                    background: rgba(99, 102, 241, 0.1);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-primary-light, #818CF8);
                }

                .step-connector {
                    display: flex;
                    align-items: center;
                    color: rgba(255, 255, 255, 0.15);
                }

                .cta-section {
                    padding: 4rem 0 8rem;
                }

                .cta-card {
                    position: relative;
                    background: linear-gradient(135deg, var(--color-primary, #6366F1) 0%, var(--color-primary-dark, #4F46E5) 100%);
                    border-radius: 24px;
                    padding: 4rem;
                    text-align: center;
                    overflow: hidden;
                }

                .cta-content {
                    position: relative;
                    z-index: 2;
                }

                .cta-card h2 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: clamp(1.75rem, 3vw, 2.5rem);
                    margin-bottom: 1rem;
                    color: white;
                }

                .cta-card p {
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 2rem;
                }

                .btn-cta-white {
                    padding: 1rem 2rem;
                    background: white;
                    color: var(--color-primary-dark, #4F46E5);
                    font-weight: 600;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                }

                .btn-cta-white:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
                }

                .cta-bg-elements {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .cta-orb {
                    position: absolute;
                    top: -50%;
                    right: -20%;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%);
                    border-radius: 50%;
                }

                .footer {
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 3rem 0;
                }

                .footer-content {
                    text-align: center;
                }

                .footer-brand {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .footer-brand .brand-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                }

                .footer-brand span {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-weight: 600;
                    font-size: 1.1rem;
                }

                .disclaimer {
                    font-size: 0.85rem;
                    color: var(--color-text-muted, #64748B);
                    max-width: 700px;
                    margin: 0 auto 1.5rem;
                    line-height: 1.6;
                }

                .copyright {
                    font-size: 0.8rem;
                    color: var(--color-text-subtle, #475569);
                }

                @media (max-width: 1024px) {
                    .hero-container {
                        grid-template-columns: 1fr;
                        text-align: center;
                        gap: 3rem;
                    }

                    .hero-content {
                        order: 1;
                    }

                    .hero-visual {
                        order: 2;
                        max-width: 500px;
                        margin: 0 auto;
                    }

                    .hero-description {
                        margin: 0 auto 2rem;
                    }

                    .hero-cta {
                        justify-content: center;
                    }

                    .hero-trust {
                        justify-content: center;
                    }

                    .features-grid {
                        grid-template-columns: 1fr;
                        max-width: 500px;
                    }

                    .process-steps {
                        flex-direction: column;
                        max-width: 500px;
                    }

                    .step-connector {
                        transform: rotate(90deg);
                        padding: 0.5rem 0;
                    }
                }

                @media (max-width: 768px) {
                    .nav-actions {
                        gap: 0.5rem;
                    }

                    .privacy-badge span {
                        display: none;
                    }

                    .btn-nav {
                        display: none;
                    }

                    .hero-section {
                        padding: 7rem 0 4rem;
                    }

                    .hero-cta {
                        flex-direction: column;
                    }

                    .trust-divider {
                        display: none;
                    }

                    .hero-trust {
                        flex-direction: column;
                        gap: 0.5rem;
                    }

                    .cta-card {
                        padding: 3rem 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
