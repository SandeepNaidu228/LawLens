import React, { useState } from 'react';
import {
    Send,
    ShieldCheck,
    Info,
    Scale,
    Gavel,
    Sparkles,
    BookOpen,
    AlertCircle,
    Loader2
} from 'lucide-react';

const Home = () => {
    const [description, setDescription] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!description.trim()) return;

        setLoading(true);
        setResults(null);
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8001';
            const response = await fetch(`${baseUrl}/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }),
            });

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const data = await response.json();

            if (data.status === 'no_clear_match') {
                setResults([]);
                alert(data.message);
            } else {
                const mappedResults = (data.results || []).map(item => ({
                    section: 'Section ' + item.ipc_section,
                    title: item.offense,
                    confidence: item.confidence,
                    explanation: item.explanation,
                    punishment: item.punishment,
                    type: item.cognizable,
                    bailable: item.bailable
                }));
                setResults(mappedResults);
            }

        } catch (error) {
            console.error('Error analyzing incident:', error);
            alert('Failed to analyze incident. Please ensure the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page">
            <header className="page-header">
                <div className="header-content">
                    <div className="header-badge">
                        <Sparkles size={14} />
                        <span>AI Legal Assistant</span>
                    </div>
                    <h1>Analyze Your Legal Situation</h1>
                    <p>Describe your incident in plain language. Our AI will map it to relevant IPC sections with privacy-first processing.</p>
                </div>
            </header>

            <div className="main-layout">
                <div className="main-column">
                    <div className="input-card">
                        <div className="card-header">
                            <div className="header-left">
                                <h3>Incident Description</h3>
                            </div>
                            <div className="privacy-badge">
                                <ShieldCheck size={14} />
                                <span>Stateless Processing</span>
                            </div>
                        </div>
                        
                        <div className="textarea-wrapper">
                            <textarea
                                placeholder="E.g., My neighbor damaged my car while parking intentionally and is now refusing to pay for repairs..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        
                        <div className="card-footer">
                            <div className="helper">
                                <Info size={14} />
                                <span>Be specific about actions, intent, and circumstances for accurate results.</span>
                            </div>
                            <button
                                className={`analyze-btn ${loading ? 'loading' : ''}`}
                                onClick={handleAnalyze}
                                disabled={loading || !description.trim()}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="spinner" />
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Analyze Incident</span>
                                        <Send size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {results && results.length > 0 && (
                        <div className="results-section">
                            <div className="results-header">
                                <h2>Analysis Report</h2>
                                <span className="results-count">{results.length} Section{results.length !== 1 ? 's' : ''} Found</span>
                            </div>

                            <div className="results-grid">
                                {results.map((item, index) => (
                                    <div key={index} className="result-card">
                                        <div className="result-top">
                                            <div className="section-info">
                                                <span className="section-badge">{item.section}</span>
                                                <span className="type-tag">{item.type}</span>
                                            </div>
                                            <div className="confidence-meter">
                                                <span className="confidence-label">Match</span>
                                                <div className="confidence-bar">
                                                    <div 
                                                        className={`confidence-fill ${item.confidence > 80 ? 'high' : item.confidence > 60 ? 'medium' : 'low'}`}
                                                        style={{ width: `${item.confidence}%` }}
                                                    ></div>
                                                </div>
                                                <span className="confidence-value">{item.confidence}%</span>
                                            </div>
                                        </div>

                                        <h4 className="result-title">{item.title}</h4>
                                        <p className="result-explanation">{item.explanation}</p>

                                        <div className="punishment-box">
                                            <div className="punishment-header">
                                                <Gavel size={14} />
                                                <span>Legal Consequence</span>
                                            </div>
                                            <p>{item.punishment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {results && results.length === 0 && (
                        <div className="no-results">
                            <AlertCircle size={32} />
                            <h3>No Clear Match Found</h3>
                            <p>Try providing more specific details about the incident, including actions taken and intent.</p>
                        </div>
                    )}
                </div>

                <aside className="sidebar-column">
                    <div className="info-card privacy">
                        <div className="info-icon">
                            <ShieldCheck size={24} />
                        </div>
                        <h4>Privacy First</h4>
                        <p>Your incident data is processed in-memory and discarded immediately. No logs are kept.</p>
                    </div>

                    <div className="info-card knowledge">
                        <div className="info-icon">
                            <Scale size={24} />
                        </div>
                        <h4>Understanding IPC</h4>
                        <p>The Indian Penal Code is the official criminal code of India. This tool maps semantic intent to legal text.</p>
                    </div>

                    <div className="info-card tips">
                        <div className="info-icon">
                            <BookOpen size={24} />
                        </div>
                        <h4>Tips for Better Results</h4>
                        <ul>
                            <li>Describe the incident clearly</li>
                            <li>Include who did what</li>
                            <li>Mention any injuries or damages</li>
                            <li>Note if threats were made</li>
                        </ul>
                    </div>
                </aside>
            </div>

            <style>{`
                .home-page {
                    max-width: 1200px;
                    margin: 0 auto;
                    animation: fadeIn 0.4s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .page-header {
                    margin-bottom: 2.5rem;
                }

                .header-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(99, 102, 241, 0.1);
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    padding: 0.4rem 0.9rem;
                    border-radius: 100px;
                    font-size: 0.8rem;
                    color: var(--color-primary-light, #818CF8);
                    margin-bottom: 1rem;
                }

                .page-header h1 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    color: var(--color-text-primary, #F8FAFC);
                    letter-spacing: -0.02em;
                }

                .page-header p {
                    color: var(--color-text-muted, #64748B);
                    font-size: 1rem;
                    max-width: 600px;
                }

                .main-layout {
                    display: grid;
                    grid-template-columns: 1fr 320px;
                    gap: 2rem;
                }

                .main-column {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .input-card {
                    background: rgba(17, 24, 39, 0.6);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 20px;
                    overflow: hidden;
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .card-header h3 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: var(--color-text-primary, #F8FAFC);
                    margin: 0;
                }

                .privacy-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.75rem;
                    color: var(--color-success, #10B981);
                    background: rgba(16, 185, 129, 0.1);
                    padding: 0.35rem 0.7rem;
                    border-radius: 100px;
                    border: 1px solid rgba(16, 185, 129, 0.15);
                }

                .textarea-wrapper {
                    padding: 1.5rem;
                }

                .textarea-wrapper textarea {
                    width: 100%;
                    min-height: 180px;
                    background: rgba(0, 0, 0, 0.25);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 12px;
                    padding: 1rem;
                    color: var(--color-text-primary, #F8FAFC);
                    font-family: var(--font-sans, 'Inter', sans-serif);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    resize: vertical;
                    transition: all 0.2s ease;
                }

                .textarea-wrapper textarea::placeholder {
                    color: var(--color-text-subtle, #475569);
                }

                .textarea-wrapper textarea:focus {
                    outline: none;
                    border-color: var(--color-primary, #6366F1);
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
                }

                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    background: rgba(0, 0, 0, 0.15);
                    border-top: 1px solid rgba(255, 255, 255, 0.03);
                }

                .helper {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: var(--color-text-muted, #64748B);
                }

                .analyze-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.85rem 1.5rem;
                    background: linear-gradient(135deg, var(--color-primary, #6366F1) 0%, var(--color-primary-dark, #4F46E5) 100%);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
                }

                .analyze-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
                }

                .analyze-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .analyze-btn.loading .spinner {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .results-section {
                    animation: slideUp 0.4s ease-out;
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .results-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .results-header h2 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 1.5rem;
                    color: var(--color-text-primary, #F8FAFC);
                    margin: 0;
                }

                .results-count {
                    font-size: 0.85rem;
                    color: var(--color-text-muted, #64748B);
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.35rem 0.75rem;
                    border-radius: 100px;
                }

                .results-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .result-card {
                    background: rgba(17, 24, 39, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-left: 4px solid var(--color-accent, #D4AF37);
                    border-radius: 0 16px 16px 0;
                    padding: 1.5rem;
                    transition: all 0.2s ease;
                }

                .result-card:hover {
                    background: rgba(17, 24, 39, 0.8);
                    border-color: rgba(255, 255, 255, 0.1);
                }

                .result-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .section-info {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }

                .section-badge {
                    background: rgba(212, 175, 55, 0.15);
                    color: var(--color-accent, #D4AF37);
                    font-weight: 700;
                    font-size: 0.85rem;
                    padding: 0.35rem 0.75rem;
                    border-radius: 8px;
                    letter-spacing: 0.3px;
                }

                .type-tag {
                    font-size: 0.75rem;
                    color: var(--color-text-muted, #64748B);
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.3rem 0.6rem;
                    border-radius: 6px;
                }

                .confidence-meter {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .confidence-label {
                    font-size: 0.8rem;
                    color: var(--color-text-muted, #64748B);
                }

                .confidence-bar {
                    width: 80px;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .confidence-fill {
                    height: 100%;
                    border-radius: 10px;
                    transition: width 0.5s ease;
                }

                .confidence-fill.high { background: linear-gradient(90deg, #10B981, #34D399); }
                .confidence-fill.medium { background: linear-gradient(90deg, #F59E0B, #FBBF24); }
                .confidence-fill.low { background: linear-gradient(90deg, #EF4444, #F87171); }

                .confidence-value {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--color-text-primary, #F8FAFC);
                    min-width: 36px;
                }

                .result-title {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 1.25rem;
                    color: var(--color-text-primary, #F8FAFC);
                    margin: 0 0 0.75rem 0;
                }

                .result-explanation {
                    color: var(--color-text-secondary, #CBD5E1);
                    font-size: 0.95rem;
                    line-height: 1.65;
                    margin: 0 0 1.25rem 0;
                }

                .punishment-box {
                    background: rgba(212, 175, 55, 0.08);
                    border: 1px solid rgba(212, 175, 55, 0.15);
                    border-radius: 12px;
                    padding: 1rem;
                }

                .punishment-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--color-accent, #D4AF37);
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 0.5rem;
                }

                .punishment-box p {
                    color: var(--color-text-secondary, #CBD5E1);
                    font-size: 0.95rem;
                    margin: 0;
                    line-height: 1.5;
                }

                .no-results {
                    background: rgba(17, 24, 39, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 16px;
                    padding: 3rem;
                    text-align: center;
                    animation: fadeIn 0.4s ease-out;
                }

                .no-results svg {
                    color: var(--color-text-muted, #64748B);
                    margin-bottom: 1rem;
                }

                .no-results h3 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    color: var(--color-text-primary, #F8FAFC);
                    margin: 0 0 0.5rem 0;
                }

                .no-results p {
                    color: var(--color-text-muted, #64748B);
                    margin: 0;
                    max-width: 400px;
                    margin: 0 auto;
                }

                .sidebar-column {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .info-card {
                    background: rgba(17, 24, 39, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    padding: 1.5rem;
                }

                .info-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                }

                .info-card.privacy .info-icon {
                    background: rgba(16, 185, 129, 0.1);
                    color: var(--color-success, #10B981);
                }

                .info-card.knowledge .info-icon {
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--color-accent, #D4AF37);
                }

                .info-card.tips .info-icon {
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--color-primary-light, #818CF8);
                }

                .info-card h4 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 1.05rem;
                    color: var(--color-text-primary, #F8FAFC);
                    margin: 0 0 0.5rem 0;
                }

                .info-card p {
                    color: var(--color-text-muted, #64748B);
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin: 0;
                }

                .info-card ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .info-card ul li {
                    color: var(--color-text-muted, #64748B);
                    font-size: 0.9rem;
                    padding: 0.35rem 0;
                    padding-left: 1rem;
                    position: relative;
                }

                .info-card ul li::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 4px;
                    height: 4px;
                    background: var(--color-primary-light, #818CF8);
                    border-radius: 50%;
                }

                @media (max-width: 1000px) {
                    .main-layout {
                        grid-template-columns: 1fr;
                    }

                    .sidebar-column {
                        display: none;
                    }
                }

                @media (max-width: 600px) {
                    .card-footer {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: stretch;
                    }

                    .helper {
                        text-align: center;
                        justify-content: center;
                    }

                    .analyze-btn {
                        justify-content: center;
                    }

                    .result-top {
                        flex-direction: column;
                    }

                    .confidence-meter {
                        width: 100%;
                    }

                    .confidence-bar {
                        flex: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;
