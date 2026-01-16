import React, { useState } from 'react';
import {
    Send,
    AlertTriangle,
    BookOpen,
    ShieldCheck,
    Activity,
    Info,
    Scale,
    Gavel
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
            const response = await fetch('https://lawlens-backend.onrender.com/analyze', {
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
                setResults([]); // Handle no match gracefully or show a message
                // You might want to show the message from backend: data.message
                // For now, setting empty results or specific handling
                alert(data.message); // Simple feedback
            } else {
                // Map backend response to frontend expectations if necessary
                // Backend returns: results: [{ipc_section, offense, confidence, explanation, punishment, cognizable, bailable, ...}]
                // Frontend expects: {section, title, confidence, explanation, punishment, type, bailable}

                const mappedResults = (data.results || []).map(item => ({
                    section: 'Section ' + item.ipc_section,
                    title: item.offense,
                    confidence: item.confidence,
                    explanation: item.explanation,
                    punishment: item.punishment,
                    type: item.cognizable, // 'type' in frontend seems to map to 'Cognizable'
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
        <div className="dashboard-container animate-fade-in">
            <header className="page-header">
                <h1>AI Legal Assistant</h1>
                <p className="subtitle">Describe your situation to map it to the Indian Penal Code.</p>
            </header>

            <div className="grid-layout">
                {/* Main Input & Results Column */}
                <div className="main-panel">

                    {/* Input Card */}
                    <div className="card input-card">
                        <div className="input-header">
                            <label className="label">Incident Description</label>
                            <span className="secure-badge">
                                <ShieldCheck size={14} /> Private & Stateless Processing
                            </span>
                        </div>
                        <textarea
                            className="text-area"
                            placeholder="E.g., My neighbor damaged my car while parking intentionally and is now refusing to pay for repairs..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="action-row">
                            <span className="helper-text">
                                <Info size={14} className="inline-icon" /> Be specific about actions and intent.
                            </span>
                            <button
                                className={`btn-primary ${loading ? 'pulsing' : ''}`}
                                onClick={handleAnalyze}
                                disabled={loading || !description.trim()}
                            >
                                {loading ? 'Analyzing...' : <>Analyze Incident <Send size={16} className="ml-2" /></>}
                            </button>
                        </div>
                    </div>

                    {/* Results Section */}
                    {results && (
                        <div className="results-container animate-slide-up">
                            <div className="results-header-row">
                                <h3>Analysis Report</h3>
                                <span className="meta-tag">{results.length} Sections Found</span>
                            </div>

                            <div className="results-list">
                                {results.map((item, index) => (
                                    <div key={index} className="result-card">
                                        <div className="card-top-row">
                                            <div className="badges-group">
                                                <span className="section-badge">{item.section}</span>
                                                <span className="type-badge">{item.type}</span>
                                            </div>
                                            <div className="confidence-wrapper">
                                                <span className="confidence-label">Match:</span>
                                                <div className="confidence-track">
                                                    <div
                                                        className={`confidence-fill ${item.confidence > 80 ? 'high' : item.confidence > 60 ? 'med' : 'low'}`}
                                                        style={{ width: `${item.confidence}%` }}
                                                    ></div>
                                                </div>
                                                <span className="confidence-val">{item.confidence}%</span>
                                            </div>
                                        </div>

                                        <h4 className="result-title">{item.title}</h4>
                                        <p className="result-desc">{item.explanation}</p>

                                        <div className="punishment-box">
                                            <div className="punishment-label">
                                                <Gavel size={14} className="text-accent" /> Legal Consequence
                                            </div>
                                            <p>{item.punishment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="info-sidebar">
                    <div className="card info-card privacy-card">
                        <div className="card-icon-wrapper success">
                            <ShieldCheck size={24} />
                        </div>
                        <h4>Privacy First</h4>
                        <p>Your incident data is processed in-memory and discarded immediately after analysis. No logs are kept.</p>
                    </div>

                    <div className="card info-card">
                        <div className="card-icon-wrapper accent">
                            <Scale size={24} />
                        </div>
                        <h4>Understanding IPC</h4>
                        <p>The IPC (Indian Penal Code) is the official criminal code of India. This tool maps semantic intent to legal text.</p>
                    </div>

                    {/* <div className="card info-card disclaimer-card">
                        <div className="card-icon-wrapper danger">
                            <AlertTriangle size={24} />
                        </div>
                         <h4>Disclaimer</h4>
                         <p>This tool is for informational purposes only. It is not a substitute for professional legal advice.</p>
                    </div> */}
                </div>
            </div>

            <style>{`
                :root {
                    --color-bg: #0F172A;
                    --color-bg-card: #1E293B;
                    --color-bg-input: #0F172A;
                    --color-primary: #3B82F6;
                    --color-primary-hover: #2563EB;
                    --color-accent: #F59E0B;
                    --color-text-main: #F8FAFC;
                    --color-text-muted: #94A3B8;
                    --color-border: rgba(255,255,255,0.1);
                    --font-heading: 'Merriweather', serif;
                    --font-body: 'Inter', sans-serif;
                }

                .dashboard-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding-bottom: 4rem;
                }

                .page-header { margin-bottom: 2.5rem; }
                .page-header h1 { 
                    font-family: var(--font-heading); 
                    font-size: 2rem; 
                    margin-bottom: 0.5rem; 
                    color: var(--color-text-main);
                }
                .subtitle { color: var(--color-text-muted); font-size: 1rem; }

                .grid-layout {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 2rem;
                }

                /* Cards */
                .card {
                    background: var(--color-bg-card);
                    border: 1px solid var(--color-border);
                    border-radius: 16px;
                    padding: 1.5rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
                }

                /* Input Section */
                .input-header { display: flex; justify-content: space-between; margin-bottom: 1rem; align-items: center; }
                .label { font-weight: 600; color: var(--color-text-main); font-size: 0.95rem; }
                
                .secure-badge {
                    display: flex; align-items: center; gap: 0.4rem;
                    font-size: 0.75rem; color: #10B981;
                    background: rgba(16, 185, 129, 0.1);
                    padding: 0.25rem 0.6rem; border-radius: 20px;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                    font-weight: 500;
                }

                .text-area {
                    width: 100%; min-height: 180px;
                    background: var(--color-bg-input);
                    border: 1px solid var(--color-border);
                    color: white; padding: 1rem; border-radius: 8px;
                    font-family: var(--font-body); font-size: 1rem; line-height: 1.6;
                    resize: vertical; margin-bottom: 1.25rem;
                    transition: border-color 0.2s;
                }
                .text-area:focus { outline: none; border-color: var(--color-primary); }
                .text-area::placeholder { color: rgba(148, 163, 184, 0.5); }

                .action-row { display: flex; justify-content: space-between; align-items: center; }
                .helper-text { font-size: 0.85rem; color: var(--color-text-muted); display: flex; align-items: center; gap: 0.4rem; }
                .inline-icon { opacity: 0.7; }

                .btn-primary {
                    background: var(--color-primary);
                    color: white; border: none;
                    padding: 0.75rem 1.5rem; border-radius: 8px;
                    font-weight: 600; cursor: pointer;
                    display: flex; align-items: center; transition: all 0.2s;
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .btn-primary:hover { background: var(--color-primary-hover); transform: translateY(-1px); }
                .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
                .pulsing { animation: pulse 1.5s infinite; }
                .ml-2 { margin-left: 0.5rem; }

                /* Results */
                .results-container { margin-top: 3rem; }
                .results-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
                .results-header-row h3 { font-family: var(--font-heading); font-size: 1.5rem; color: var(--color-text-main); margin: 0; }
                .meta-tag { background: rgba(255,255,255,0.1); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; color: var(--color-text-muted); }
                
                .results-list { display: flex; flex-direction: column; gap: 1.5rem; }

                .result-card {
                    background: rgba(30, 41, 59, 0.6); /* Glass effect */
                    border: 1px solid var(--color-border);
                    border-left: 4px solid var(--color-accent);
                    padding: 1.5rem; border-radius: 0 12px 12px 0;
                    position: relative;
                }

                .card-top-row { display: flex; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem; }
                .badges-group { display: flex; gap: 0.5rem; }
                
                .section-badge {
                    background: rgba(245, 158, 11, 0.15); color: var(--color-accent);
                    font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 6px;
                    font-size: 0.85rem; letter-spacing: 0.5px;
                }
                .type-badge {
                    font-size: 0.75rem; background: rgba(255, 255, 255, 0.05);
                    padding: 0.25rem 0.6rem; border-radius: 4px; color: var(--color-text-muted);
                    display: flex; align-items: center;
                }

                .confidence-wrapper { display: flex; align-items: center; gap: 0.75rem; }
                .confidence-label { font-size: 0.8rem; color: var(--color-text-muted); }
                .confidence-track { width: 80px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
                .confidence-fill { height: 100%; border-radius: 10px; }
                .confidence-fill.high { background: #10B981; }
                .confidence-fill.med { background: #F59E0B; }
                .confidence-fill.low { background: #EF4444; }
                .confidence-val { font-size: 0.85rem; font-weight: 600; color: white; min-width: 3ch; }

                .result-title { font-size: 1.25rem; margin-bottom: 0.5rem; color: white; font-weight: 600; font-family: var(--font-heading); }
                .result-desc { color: var(--color-text-muted); margin-bottom: 1.5rem; line-height: 1.6; }

                .punishment-box {
                    background: rgba(245, 158, 11, 0.05); padding: 1rem;
                    border-radius: 8px; border: 1px solid rgba(245, 158, 11, 0.1);
                }
                .punishment-label {
                    display: flex; align-items: center; gap: 0.5rem;
                    font-size: 0.8rem; text-transform: uppercase;
                    letter-spacing: 0.5px; color: var(--color-accent);
                    margin-bottom: 0.5rem; font-weight: 600;
                }
                .punishment-box p { margin: 0; font-size: 0.95rem; color: #E2E8F0; line-height: 1.5; }
                .text-accent { color: var(--color-accent); }

                /* Sidebar */
                .info-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
                .info-card { padding: 1.5rem; }
                .card-icon-wrapper { 
                    width: 48px; height: 48px; border-radius: 10px; 
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 1rem;
                }
                .card-icon-wrapper.success { background: rgba(16, 185, 129, 0.1); color: #10B981; }
                .card-icon-wrapper.accent { background: rgba(245, 158, 11, 0.1); color: var(--color-accent); }
                .card-icon-wrapper.danger { background: rgba(239, 68, 68, 0.1); color: #EF4444; }

                .info-card h4 { font-size: 1.1rem; margin-bottom: 0.5rem; color: white; font-weight: 600; font-family: var(--font-heading); }
                .info-card p { font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; }
                
                .disclaimer-card { border-color: rgba(255, 255, 255, 0.05); background: transparent; }
                .disclaimer-card h4 { color: var(--color-text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px; }
                .disclaimer-card p { font-size: 0.8rem; color: #64748B; }

                /* Animations */
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                .animate-slide-up { animation: slideUp 0.4s ease-out; }

                @media (max-width: 900px) {
                    .grid-layout { grid-template-columns: 1fr; }
                    .info-sidebar { display: none; }
                }
            `}</style>
        </div>
    );
};

export default Home;