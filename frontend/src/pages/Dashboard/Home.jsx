import React, { useState } from 'react';
import { Send, AlertCircle, BookOpen, ChevronRight } from 'lucide-react';

const DashboardHome = () => {
    const [description, setDescription] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = () => {
        if (!description.trim()) return;

        setLoading(true);
        // Simulate AI delay
        setTimeout(() => {
            setResults([
                {
                    section: 'Section 378',
                    title: 'Theft',
                    confidence: 92,
                    explanation: 'Whoever, intending to take dishonestly any movable property out of the possession of any person without that persons consent.',
                    punishment: 'Imprisonment of up to 3 years, or fine, or both.'
                },
                {
                    section: 'Section 420',
                    title: 'Cheating and dishonestly inducing delivery of property',
                    confidence: 75,
                    explanation: 'Cheating and thereby dishonestly inducing the person deceived to deliver any property to any person.',
                    punishment: 'Imprisonment of up to 7 years and fine.'
                },
                {
                    section: 'Section 403',
                    title: 'Dishonest misappropriation of property',
                    confidence: 60,
                    explanation: 'Dishonest misappropriation or conversion to one\'s own use of any movable property.',
                    punishment: 'Imprisonment of up to 2 years, or fine, or both.'
                }
            ]);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="dashboard-content">
            <header className="page-header">
                <h1>Legal Assistant</h1>
                <p className="subtitle">Describe your situation to find relevant legal information.</p>
            </header>

            <div className="grid-layout">
                <div className="input-section">
                    <div className="card input-card">
                        <label className="label">Describe Incident</label>
                        <textarea
                            className="input textarea-lg"
                            placeholder="E.g., My neighbor damaged my car while parking and is refusing to pay for repairs..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="action-row">
                            <span className="helper-text">Be as specific as possible.</span>
                            <button
                                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                                onClick={handleAnalyze}
                                disabled={loading || !description.trim()}
                            >
                                {loading ? 'Analyzing...' : <>Analyze Issue <Send size={18} className="ml-2" /></>}
                            </button>
                        </div>
                    </div>

                    {results && (
                        <div className="results-container">
                            <h3>Analysis Results</h3>
                            <div className="results-list">
                                {results.map((item, index) => (
                                    <div key={index} className="result-card card">
                                        <div className="result-header">
                                            <div className="section-badge">{item.section}</div>
                                            <div className="confidence-wrapper">
                                                <div className="confidence-label">{item.confidence}% match</div>
                                                <div className="confidence-bar-bg">
                                                    <div className="confidence-bar-fill" style={{ width: `${item.confidence}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="result-title">{item.title}</h4>
                                        <p className="result-desc">{item.explanation}</p>

                                        <div className="result-toggle">
                                            <button className="btn-link">
                                                <span>View Punishment</span>
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="info-sidebar">
                    <div className="card info-card bg-blue">
                        <AlertCircle size={24} className="info-icon" />
                        <h4>Disclaimer</h4>
                        <p>This tool is for legal awareness only. The information provided here does not constitute legal advice. Please consult a qualified advocate for legal proceedings.</p>
                    </div>

                    <div className="card info-card">
                        <BookOpen size={24} className="info-icon text-accent" />
                        <h4>IPC Guide</h4>
                        <p>The Indian Penal Code (IPC) is the official criminal code of India. It covers all substantive aspects of criminal law.</p>
                    </div>
                </div>
            </div>

            <style>{`
        .page-header {
          margin-bottom: 2rem;
        }

        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
        }

        .textarea-lg {
          min-height: 150px;
          resize: vertical;
          margin-bottom: 1rem;
        }

        .action-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .helper-text {
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }

        .loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .ml-2 { margin-left: 0.5rem; }

        .results-container {
          margin-top: 2rem;
        }
        
        .results-container h3 {
            margin-bottom: 1rem;
        }

        .results-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .result-card {
            border-left: 4px solid var(--color-accent);
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .section-badge {
          background: #EFF6FF;
          color: var(--color-accent);
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
        }

        .confidence-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .confidence-label {
            font-size: 0.75rem;
            color: var(--color-text-muted);
        }

        .confidence-bar-bg {
          width: 60px;
          height: 6px;
          background: #F1F5F9;
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .confidence-bar-fill {
          height: 100%;
          background: var(--color-success);
          border-radius: var(--radius-full);
        }

        .result-title {
            font-size: 1.125rem;
            margin-bottom: 0.5rem;
        }

        .result-desc {
            color: var(--color-text-muted);
            font-size: 0.95rem;
            margin-bottom: 1rem;
            line-height: 1.6;
        }

        .btn-link {
          color: var(--color-accent);
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          font-size: 0.875rem;
        }

        .info-sidebar {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .info-card {
            padding: 1.5rem;
        }
        
        .bg-blue {
            background: #EFF6FF;
            border-color: #DBEAFE;
        }

        .info-icon {
            margin-bottom: 1rem;
            color: var(--color-accent);
        }
        
        .bg-blue .info-icon {
            color: #1D4ED8;
        }
        
        .text-accent {
            color: var(--color-accent);
        }

        .info-card h4 {
            margin-bottom: 0.5rem;
            font-size: 1rem;
        }

        .info-card p {
            font-size: 0.875rem;
            color: var(--color-text-muted);
            line-height: 1.6;
        }

        @media (max-width: 1024px) {
            .grid-layout {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
        </div>
    );
};

export default DashboardHome;
