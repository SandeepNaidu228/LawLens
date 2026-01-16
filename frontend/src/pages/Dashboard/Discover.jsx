import React, { useState, useMemo } from 'react';
import { ChevronRight, X, Gavel, Shield, AlertTriangle, Book } from 'lucide-react';

// Importing the dataset directly from the local file
import ipcDataRaw from '../../../../semantic-search/ipc_sections.json';

const Discover = () => {
    // Only state needed is for the selected modal item
    const [selectedIPC, setSelectedIPC] = useState(null);

    // Sort the data by IPC Section Number numerically/naturally
    const sortedIPC = useMemo(() => {
        return [...ipcDataRaw].sort((a, b) => {
            // Remove "Section " prefix to get "140", "120B", etc.
            const secA = a.section.replace('Section ', '').trim();
            const secB = b.section.replace('Section ', '').trim();
            
            // Use localeCompare with numeric: true for natural sorting 
            // (e.g., puts 2 before 10, and 120A after 120)
            return secA.localeCompare(secB, undefined, { numeric: true, sensitivity: 'base' });
        });
    }, []);

    return (
        <div className="discover-container animate-fade-in">
            <header className="page-header">
                <h1>IPC Library</h1>
                <p className="subtitle">Browse the complete registry of Indian Penal Code sections.</p>
            </header>

            {/* Grid Results - Displaying SORTED sections */}
            <div className="ipc-grid">
                {sortedIPC.map((ipc) => (
                    <div key={ipc.id} className="ipc-card" onClick={() => setSelectedIPC(ipc)}>
                        <div className="card-header">
                            <span className="section-badge">{ipc.section}</span>
                            <ChevronRight size={18} className="arrow-icon" />
                        </div>
                        <h3>{ipc.title}</h3>
                        <p className="truncate-text">{ipc.desc}</p>
                        <div className="card-footer">
                            <div className="mini-tag">
                                <Shield size={12} /> {ipc.type}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Modal Overlay */}
            {selectedIPC && (
                <div className="modal-backdrop" onClick={() => setSelectedIPC(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedIPC(null)}>
                            <X size={24} />
                        </button>

                        <div className="modal-header">
                            <span className="modal-section-badge">{selectedIPC.section}</span>
                            <h2>{selectedIPC.title}</h2>
                        </div>

                        <div className="modal-body">
                            <div className="legal-text-box">
                                <div className="icon-title">
                                    <Book size={18} className="text-accent" /> Legal Definition
                                </div>
                                <p>{selectedIPC.desc}</p>
                            </div>

                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Nature of Offense</label>
                                    <div className="value-row">
                                        <Shield size={18} className="text-green" />
                                        <span>{selectedIPC.type}</span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <label>Bail Status</label>
                                    <div className="value-row">
                                        <AlertTriangle size={18} className="text-amber" />
                                        <span>{selectedIPC.bailable}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="punishment-section">
                                <h4><Gavel size={16} /> Punishment Prescribed</h4>
                                <p>Imprisonment for a term which may extend to the duration specified in the specific subsection, or fine, or both.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                :root {
                    --color-bg: #0F172A;
                    --color-bg-card: #1E293B;
                    --color-primary: #3B82F6;
                    --color-accent: #F59E0B;
                    --color-text-main: #F8FAFC;
                    --color-text-muted: #94A3B8;
                    --color-border: rgba(255, 255, 255, 0.1);
                    --font-heading: 'Merriweather', serif;
                    --font-body: 'Inter', sans-serif;
                }

                .discover-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* Header */
                .page-header { margin-bottom: 3rem; text-align: center; }
                .page-header h1 { 
                    font-family: var(--font-heading); 
                    font-size: 2.5rem; 
                    margin-bottom: 0.5rem; 
                    color: var(--color-text-main);
                }
                .subtitle { color: var(--color-text-muted); font-size: 1.1rem; }

                /* Grid */
                .ipc-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 1.5rem;
                }

                .ipc-card {
                    background: rgba(30, 41, 59, 0.4);
                    border: 1px solid var(--color-border);
                    border-radius: 16px;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    position: relative;
                    overflow: hidden;
                    display: flex; flex-direction: column;
                }

                .ipc-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--color-primary);
                    background: var(--color-bg-card);
                    box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.4);
                }

                .card-header {
                    display: flex; justify-content: space-between; align-items: center;
                    margin-bottom: 1rem;
                }

                .section-badge {
                    background: rgba(245, 158, 11, 0.1);
                    color: var(--color-accent);
                    font-weight: 700; font-size: 0.8rem;
                    padding: 0.25rem 0.75rem; border-radius: 6px;
                }
                
                .arrow-icon { color: var(--color-text-muted); opacity: 0; transition: 0.2s; }
                .ipc-card:hover .arrow-icon { opacity: 1; transform: translateX(5px); }

                .ipc-card h3 {
                    font-size: 1.2rem; font-weight: 600; margin-bottom: 0.75rem;
                    color: var(--color-text-main); font-family: var(--font-heading);
                }

                .truncate-text {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    color: var(--color-text-muted);
                    font-size: 0.95rem; line-height: 1.6;
                    margin-bottom: auto; /* Pushes footer down */
                    padding-bottom: 1.5rem;
                }

                .card-footer {
                    display: flex; gap: 0.5rem; padding-top: 1rem;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }

                .mini-tag {
                    font-size: 0.75rem;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.25rem 0.6rem;
                    border-radius: 4px;
                    color: var(--color-text-muted);
                    display: flex; align-items: center; gap: 5px;
                }

                /* Modal Overlay */
                .modal-backdrop {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(15, 23, 42, 0.85);
                    backdrop-filter: blur(8px);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 200; padding: 1rem;
                }

                .modal-content {
                    background: var(--color-bg-card);
                    width: 100%; max-width: 650px;
                    border-radius: 20px;
                    border: 1px solid var(--color-border);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
                    position: relative;
                    animation: slideUp 0.3s ease-out;
                    max-height: 90vh; overflow-y: auto;
                }

                .close-btn {
                    position: absolute; top: 1.5rem; right: 1.5rem;
                    background: transparent; border: none;
                    color: var(--color-text-muted);
                    cursor: pointer; transition: 0.2s;
                }
                .close-btn:hover { color: white; transform: rotate(90deg); }

                .modal-header {
                    padding: 2.5rem 2.5rem 1.5rem;
                    border-bottom: 1px solid var(--color-border);
                    background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);
                }

                .modal-section-badge {
                    color: var(--color-accent);
                    font-weight: 700; font-size: 1rem;
                    display: block; margin-bottom: 0.5rem;
                    letter-spacing: 0.5px;
                }

                .modal-header h2 {
                    font-family: var(--font-heading);
                    font-size: 2rem; margin: 0; line-height: 1.2;
                }

                .modal-body { padding: 2.5rem; }

                .legal-text-box {
                    background: rgba(15, 23, 42, 0.5);
                    padding: 1.5rem; border-radius: 12px;
                    border: 1px solid var(--color-border);
                    margin-bottom: 2rem;
                }
                .icon-title { display: flex; align-items: center; gap: 0.5rem; color: white; font-weight: 600; margin-bottom: 0.75rem; font-size: 0.9rem; }
                .legal-text-box p { color: #E2E8F0; line-height: 1.8; font-size: 1.05rem; margin: 0; }

                .info-grid {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 1.5rem; margin-bottom: 2rem;
                }

                .info-item label {
                    display: block; font-size: 0.75rem;
                    text-transform: uppercase; letter-spacing: 1px;
                    color: var(--color-text-muted); margin-bottom: 0.75rem;
                }

                .value-row {
                    display: flex; align-items: center; gap: 0.75rem;
                    font-weight: 600; font-size: 1rem; color: white;
                }

                .punishment-section {
                    background: rgba(239, 68, 68, 0.1);
                    border-left: 4px solid #EF4444;
                    padding: 1.5rem; border-radius: 0 12px 12px 0;
                }

                .punishment-section h4 {
                    color: #FCA5A5; margin: 0 0 0.75rem 0;
                    font-size: 1rem; font-weight: 600;
                    display: flex; align-items: center; gap: 0.5rem;
                }

                .punishment-section p {
                    color: #FECACA; font-size: 1rem;
                    margin: 0; line-height: 1.6;
                }

                /* Utilities */
                .text-accent { color: var(--color-accent); }
                .text-green { color: #10B981; }
                .text-amber { color: #F59E0B; }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

                /* Scrollbar */
                .modal-content::-webkit-scrollbar { width: 8px; }
                .modal-content::-webkit-scrollbar-track { background: var(--color-bg); }
                .modal-content::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
            `}</style>
        </div>
    );
};

export default Discover;