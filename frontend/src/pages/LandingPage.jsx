import React from 'react';
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
  ChevronRight
} from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Navigation */}
            <nav className="navbar">
                <div className="container nav-content">
                    <div className="brand">
                        <Scale size={28} className="text-accent" />
                        <span className="brand-name">LawLens</span>
                    </div>
                    <div className="nav-actions">
                        <span className="privacy-badge">
                            <Lock size={14} /> Anonymous & Secure
                        </span>
                        <Link to="/signin" className="btn btn-primary">
                            Sign In
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section">
                <div className="container hero-grid">
                    <div className="hero-text-content">
                        <div className="badge-pill">
                            <ShieldCheck size={16} /> Privacy-First Legal AI
                        </div>
                        <h1 className="hero-title">
                            Legal Clarity, <br />
                            <span className="text-gradient">Zero Data Retention.</span>
                        </h1>
                        <p className="hero-text">
                            Describe your incident in plain language. Our deterministic AI maps it to the <strong>Indian Penal Code (IPC)</strong> without storing your data or hallucinating laws.
                        </p>
                        <div className="hero-cta-group">
                            <Link to="/signin" className="btn btn-primary btn-lg">
                                Analyze Incident <ArrowRight size={20} className="ml-2" />
                            </Link>
                        </div>
                    </div>
                    
                    {/* Visualizing the "Incident-to-Law" UVP */}
                    <div className="hero-visual">
                        <div className="glass-card simulation-card">
                            <div className="sim-header">
                                <div className="dot red"></div>
                                <div className="dot yellow"></div>
                                <div className="dot green"></div>
                            </div>
                            <div className="sim-body">
                                <div className="input-mock">
                                    <span className="label">Your Input:</span>
                                    <p>"Someone snatch my gold chain from my neck while I was waiting for the bus..."</p>
                                </div>
                                <div className="processing-line">
                                    <div className="connector"></div>
                                    <div className="ai-badge"><BrainCircuit size={14}/> Semantic Mapping</div>
                                    <div className="connector"></div>
                                </div>
                                <div className="output-mock">
                                    <div className="result-header">
                                        <BookOpen size={16} className="text-accent"/>
                                        <strong>IPC Section 379 - Theft</strong>
                                    </div>
                                    <div className="tags">
                                        <span className="tag warning">Cognizable</span>
                                        <span className="tag neutral">Non-Bailable</span>
                                        <span className="tag info">3 Years Imprisonment</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Problem/Solution Contrast (Why LawLens?) */}
            <section className="section bg-light">
                <div className="container">
                    <div className="section-header">
                        <h2>Why LawLens?</h2>
                        <p>The bridge between everyday language and the Indian Penal Code.</p>
                    </div>
                    
                    <div className="comparison-grid">
                        <div className="feature-card">
                            <div className="icon-box privacy">
                                <Lock size={24} />
                            </div>
                            <h3>Privacy by Design</h3>
                            <p>Unlike standard AI chatbots, we process queries locally or statelessly. Your sensitive incident details are <strong>never stored</strong> in our database.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box accuracy">
                                <FileText size={24} />
                            </div>
                            <h3>No Hallucinations</h3>
                            <p>We use retrieval-based AI, not generative. We show you the <strong>exact IPC text</strong>, not a summary invented by a machine.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box context">
                                <Scale size={24} />
                            </div>
                            <h3>Indian Context</h3>
                            <p>Trained specifically on Indian statutes. We provide structured attributes: Bailability, Cognizability, and Jurisdiction.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2>How It Works</h2>
                        <p>From confusion to clarity in three private steps.</p>
                    </div>

                    <div className="steps-wrapper">
                        <div className="step-item">
                            <span className="step-number">01</span>
                            <h3>Describe Incident</h3>
                            <p>Type what happened in your own words. "He hit me with a stick."</p>
                        </div>
                        <div className="step-connector">
                            <ChevronRight size={24} />
                        </div>
                        <div className="step-item">
                            <span className="step-number">02</span>
                            <h3>AI Analysis</h3>
                            <p>Our NLP engine matches semantic meaning to legal definitions.</p>
                        </div>
                        <div className="step-connector">
                            <ChevronRight size={24} />
                        </div>
                        <div className="step-item">
                            <span className="step-number">03</span>
                            <h3>Legal Mapping</h3>
                            <p>Get the specific IPC Sections, punishments, and court details.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <Scale size={24} /> LawLens
                        </div>
                        <p className="disclaimer">
                            <strong>Disclaimer:</strong> LawLens is a legal information platform, not a substitute for professional legal counsel. We do not provide legal advice.
                        </p>
                        <p className="copyright">&copy; 2026 LawLens. Privacy-First Legal Awareness.</p>
                    </div>
                </div>
            </footer>

            <style>{`
        :root {
          --color-bg: #0F172A; /* Deep Navy Background */
          --color-bg-light: #1E293B; /* Slate for cards */
          --color-primary: #3B82F6; /* Tech Blue */
          --color-accent: #F59E0B; /* Gold/Amber for Justice */
          --color-text-main: #F8FAFC;
          --color-text-muted: #94A3B8;
          --font-heading: 'Merriweather', serif; /* Professional Serif */
          --font-body: 'Inter', sans-serif;
          --radius-lg: 12px;
        }

        /* Base Styles */
        body {
            margin: 0;
            font-family: var(--font-body);
            background-color: var(--color-bg);
            color: var(--color-text-main);
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s;
            cursor: pointer;
        }

        .btn-primary {
            background: var(--color-primary);
            color: white;
            padding: 0.6rem 1.25rem;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .btn-primary:hover {
            background: #2563EB;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        /* Navbar */
        .navbar {
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255,255,255,0.05);
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
            gap: 0.75rem;
        }

        .brand-name {
            font-family: var(--font-heading);
            font-weight: 700;
            font-size: 1.5rem;
            color: white;
            letter-spacing: -0.02em;
        }

        .nav-actions {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .privacy-badge {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.8rem;
            color: var(--color-accent);
            background: rgba(245, 158, 11, 0.1);
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            border: 1px solid rgba(245, 158, 11, 0.2);
        }

        /* Hero */
        .hero-section {
            padding: 5rem 0;
            min-height: 80vh;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
        }
        
        /* Background decorative glow */
        .hero-section::before {
            content: '';
            position: absolute;
            top: -20%;
            right: -10%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            z-index: -1;
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .badge-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.875rem;
            color: var(--color-text-muted);
            margin-bottom: 1.5rem;
        }

        .hero-title {
            font-family: var(--font-heading);
            font-size: 3.5rem;
            line-height: 1.1;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }

        .text-gradient {
            background: linear-gradient(135deg, #FFF 0%, #94A3B8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero-text {
            font-size: 1.125rem;
            color: var(--color-text-muted);
            margin-bottom: 2.5rem;
            max-width: 500px;
        }

        .hero-cta-group {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            align-items: flex-start;
        }
        
        .helper-text {
            font-size: 0.8rem;
            color: rgba(255,255,255,0.4);
        }

        /* Simulation Card (The Visual Demo) */
        .glass-card {
            background: rgba(30, 41, 59, 0.7);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            overflow: hidden;
        }

        .sim-header {
            background: rgba(255,255,255,0.03);
            padding: 0.75rem 1rem;
            display: flex;
            gap: 0.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .red { background: #EF4444; }
        .yellow { background: #F59E0B; }
        .green { background: #10B981; }

        .sim-body { padding: 1.5rem; }

        .input-mock {
            background: rgba(0,0,0,0.3);
            padding: 1rem;
            border-radius: 8px;
            border-left: 3px solid var(--color-primary);
            margin-bottom: 1rem;
        }
        
        .input-mock .label {
            display: block;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--color-primary);
            margin-bottom: 0.25rem;
        }
        
        .input-mock p { margin: 0; font-style: italic; color: #E2E8F0; }

        .processing-line {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1rem 0;
            gap: 0.5rem;
        }

        .connector { height: 1px; flex: 1; background: rgba(255,255,255,0.1); }
        .ai-badge { 
            font-size: 0.75rem; 
            display: flex; 
            align-items: center; 
            gap: 0.25rem; 
            color: var(--color-accent);
        }

        .output-mock {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.2);
            padding: 1rem;
            border-radius: 8px;
        }

        .result-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
            color: white;
        }

        .tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .tag { font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600; }
        .tag.warning { background: rgba(239, 68, 68, 0.2); color: #FCA5A5; }
        .tag.neutral { background: rgba(245, 158, 11, 0.2); color: #FCD34D; }
        .tag.info { background: rgba(59, 130, 246, 0.2); color: #93C5FD; }

        /* Features Section */
        .section { padding: 5rem 0; }
        .bg-light { background: var(--color-bg-light); border-top: 1px solid rgba(255,255,255,0.05); }

        .section-header { text-align: center; margin-bottom: 4rem; }
        .section-header h2 { font-family: var(--font-heading); font-size: 2.25rem; margin-bottom: 1rem; }
        .section-header p { color: var(--color-text-muted); }

        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .feature-card {
            background: rgba(255,255,255,0.02);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.05);
            transition: transform 0.3s;
        }

        .feature-card:hover {
            background: rgba(255,255,255,0.04);
            transform: translateY(-5px);
        }

        .icon-box {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
        }

        .icon-box.privacy { background: rgba(16, 185, 129, 0.1); color: #10B981; }
        .icon-box.accuracy { background: rgba(59, 130, 246, 0.1); color: #3B82F6; }
        .icon-box.context { background: rgba(245, 158, 11, 0.1); color: #F59E0B; }

        .feature-card h3 { font-family: var(--font-heading); margin-bottom: 0.5rem; }
        .feature-card p { font-size: 0.95rem; color: var(--color-text-muted); }

        /* Steps */
        .steps-wrapper {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            gap: 1rem;
        }

        .step-item {
            flex: 1;
            text-align: center;
            max-width: 250px;
        }

        .step-number {
            display: block;
            font-size: 3rem;
            font-weight: 800;
            color: rgba(255,255,255,0.05);
            line-height: 1;
            margin-bottom: -1rem;
            position: relative;
            z-index: 0;
        }

        .step-item h3 { position: relative; z-index: 1; font-family: var(--font-heading); margin-bottom: 0.5rem; }
        .step-item p { color: var(--color-text-muted); font-size: 0.9rem; }

        .step-connector {
            margin-top: 2rem;
            color: rgba(255,255,255,0.1);
        }

        /* Footer */
        .footer {
            border-top: 1px solid rgba(255,255,255,0.05);
            padding: 3rem 0;
            margin-top: 2rem;
            text-align: center;
        }

        .footer-brand {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-weight: 700;
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }

        .disclaimer {
            font-size: 0.8rem;
            color: #64748B;
            max-width: 600px;
            margin: 0 auto 1rem;
        }

        .copyright { color: #475569; font-size: 0.8rem; }

        @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr; text-align: center; }
            .hero-text { margin-left: auto; margin-right: auto; }
            .hero-cta-group { align-items: center; }
            .nav-actions { display: none; } /* Simplify mobile nav */
            .steps-wrapper { flex-direction: column; align-items: center; }
            .step-connector { transform: rotate(90deg); margin: 0.5rem 0; }
        }
      `}</style>
        </div>
    );
};

export default LandingPage;