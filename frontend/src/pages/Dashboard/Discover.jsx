import React, { useState, useMemo } from 'react';
import { ChevronRight, X, Gavel, Shield, AlertTriangle, Book, Search, BookOpen, Sparkles } from 'lucide-react';
import ipcDataRaw from '../../../../semantic-search/ipc_sections.json';

const Discover = () => {
    const [selectedIPC, setSelectedIPC] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const sortedIPC = useMemo(() => {
        return [...ipcDataRaw].sort((a, b) => {
            const secA = a.section.replace('Section ', '').trim();
            const secB = b.section.replace('Section ', '').trim();
            return secA.localeCompare(secB, undefined, { numeric: true, sensitivity: 'base' });
        });
    }, []);

    const filteredIPC = useMemo(() => {
        if (!searchQuery.trim()) return sortedIPC;
        const query = searchQuery.toLowerCase();
        return sortedIPC.filter(ipc => 
            ipc.section.toLowerCase().includes(query) ||
            ipc.title.toLowerCase().includes(query) ||
            ipc.desc.toLowerCase().includes(query)
        );
    }, [sortedIPC, searchQuery]);

    return (
        <div className="discover-page">
            <header className="page-header">
                <div className="header-content">
                    <div className="header-badge">
                        <Sparkles size={14} />
                        <span>Legal Reference</span>
                    </div>
                    <h1>IPC Library</h1>
                    <p>Browse the complete registry of Indian Penal Code sections with detailed legal definitions.</p>
                </div>
            </header>

            <div className="search-section">
                <div className="search-wrapper">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by section number, title, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className="clear-btn" onClick={() => setSearchQuery('')}>
                            <X size={16} />
                        </button>
                    )}
                </div>
                <div className="search-meta">
                    <span>{filteredIPC.length} sections found</span>
                </div>
            </div>

            <div className="ipc-grid">
                {filteredIPC.map((ipc, index) => (
                    <div 
                        key={`${ipc.id}-${index}`}
                        className="ipc-card" 
                        onClick={() => setSelectedIPC(ipc)}
                    >
                        <div className="card-header">
                            <span className="section-badge">{ipc.section}</span>
                            <ChevronRight size={18} className="arrow-icon" />
                        </div>
                        <h3>{ipc.title}</h3>
                        <p className="truncate-text">{ipc.desc}</p>
                        <div className="card-footer">
                            <div className="mini-tag">
                                <Shield size={12} />
                                <span>{ipc.type}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredIPC.length === 0 && (
                <div className="no-results">
                    <BookOpen size={40} />
                    <h3>No sections found</h3>
                    <p>Try adjusting your search terms or browse all sections by clearing the search.</p>
                </div>
            )}

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
                                    <Book size={18} />
                                    <span>Legal Definition</span>
                                </div>
                                <p>{selectedIPC.desc}</p>
                            </div>

                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Nature of Offense</label>
                                    <div className="value-row">
                                        <Shield size={18} className="icon-success" />
                                        <span>{selectedIPC.type}</span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <label>Bail Status</label>
                                    <div className="value-row">
                                        <AlertTriangle size={18} className="icon-warning" />
                                        <span>{selectedIPC.bailable}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="punishment-section">
                                <div className="punishment-header">
                                    <Gavel size={16} />
                                    <span>Punishment Prescribed</span>
                                </div>
                                <p>Imprisonment for a term which may extend to the duration specified in the specific subsection, or fine, or both.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .discover-page {
                    max-width: 1200px;
                    margin: 0 auto;
                    animation: fadeIn 0.4s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .page-header {
                    margin-bottom: 2rem;
                    text-align: center;
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
                    font-size: 2.25rem;
                    margin-bottom: 0.5rem;
                    color: var(--color-text-primary, #F8FAFC);
                    letter-spacing: -0.02em;
                }

                .page-header p {
                    color: var(--color-text-muted, #64748B);
                    font-size: 1rem;
                }

                .search-section {
                    margin-bottom: 2.5rem;
                }

                .search-wrapper {
                    position: relative;
                    max-width: 600px;
                    margin: 0 auto 1rem;
                }

                .search-wrapper .search-icon {
                    position: absolute;
                    left: 1.25rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--color-text-subtle, #475569);
                    pointer-events: none;
                }

                .search-wrapper input {
                    width: 100%;
                    background: rgba(17, 24, 39, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 1rem 3rem 1rem 3.25rem;
                    color: var(--color-text-primary, #F8FAFC);
                    font-size: 1rem;
                    transition: all 0.2s ease;
                }

                .search-wrapper input::placeholder {
                    color: var(--color-text-subtle, #475569);
                }

                .search-wrapper input:focus {
                    outline: none;
                    border-color: var(--color-primary, #6366F1);
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
                }

                .clear-btn {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    border-radius: 50%;
                    width: 28px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-text-muted, #64748B);
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .clear-btn:hover {
                    background: rgba(255, 255, 255, 0.15);
                    color: var(--color-text-primary, #F8FAFC);
                }

                .search-meta {
                    text-align: center;
                    font-size: 0.85rem;
                    color: var(--color-text-muted, #64748B);
                }

                .ipc-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
                    gap: 1.25rem;
                }

                .ipc-card {
                    background: rgba(17, 24, 39, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    display: flex;
                    flex-direction: column;
                }

                .ipc-card:hover {
                    background: rgba(17, 24, 39, 0.8);
                    border-color: var(--color-primary, #6366F1);
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .section-badge {
                    background: rgba(212, 175, 55, 0.12);
                    color: var(--color-accent, #D4AF37);
                    font-weight: 700;
                    font-size: 0.8rem;
                    padding: 0.35rem 0.75rem;
                    border-radius: 8px;
                    letter-spacing: 0.3px;
                }

                .arrow-icon {
                    color: var(--color-text-muted, #64748B);
                    opacity: 0;
                    transform: translateX(-5px);
                    transition: all 0.2s ease;
                }

                .ipc-card:hover .arrow-icon {
                    opacity: 1;
                    transform: translateX(0);
                }

                .ipc-card h3 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 1.15rem;
                    font-weight: 600;
                    margin: 0 0 0.75rem 0;
                    color: var(--color-text-primary, #F8FAFC);
                }

                .truncate-text {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    color: var(--color-text-secondary, #CBD5E1);
                    font-size: 0.9rem;
                    line-height: 1.6;
                    flex: 1;
                    margin-bottom: 1rem;
                }

                .card-footer {
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }

                .mini-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    font-size: 0.75rem;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.3rem 0.6rem;
                    border-radius: 6px;
                    color: var(--color-text-muted, #64748B);
                }

                .no-results {
                    text-align: center;
                    padding: 4rem 2rem;
                    animation: fadeIn 0.4s ease-out;
                }

                .no-results svg {
                    color: var(--color-text-subtle, #475569);
                    margin-bottom: 1rem;
                }

                .no-results h3 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    color: var(--color-text-primary, #F8FAFC);
                    margin: 0 0 0.5rem 0;
                }

                .no-results p {
                    color: var(--color-text-muted, #64748B);
                    max-width: 400px;
                    margin: 0 auto;
                }

                .modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(8, 11, 20, 0.9);
                    backdrop-filter: blur(12px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 200;
                    padding: 1.5rem;
                    animation: fadeIn 0.2s ease;
                }

                .modal-content {
                    background: var(--color-bg-card, #111827);
                    width: 100%;
                    max-width: 680px;
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
                    position: relative;
                    animation: slideUp 0.3s ease;
                    max-height: 90vh;
                    overflow-y: auto;
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .close-btn {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-text-muted, #64748B);
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .close-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--color-text-primary, #F8FAFC);
                    transform: rotate(90deg);
                }

                .modal-header {
                    padding: 2.5rem 2.5rem 1.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                }

                .modal-section-badge {
                    display: inline-block;
                    color: var(--color-accent, #D4AF37);
                    font-weight: 700;
                    font-size: 0.9rem;
                    margin-bottom: 0.5rem;
                    letter-spacing: 0.5px;
                }

                .modal-header h2 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 1.75rem;
                    margin: 0;
                    color: var(--color-text-primary, #F8FAFC);
                    line-height: 1.25;
                    padding-right: 2rem;
                }

                .modal-body {
                    padding: 2rem 2.5rem 2.5rem;
                }

                .legal-text-box {
                    background: rgba(0, 0, 0, 0.25);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 1.5rem;
                    border-radius: 16px;
                    margin-bottom: 2rem;
                }

                .icon-title {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--color-accent, #D4AF37);
                    font-weight: 600;
                    font-size: 0.9rem;
                    margin-bottom: 0.75rem;
                }

                .legal-text-box p {
                    color: var(--color-text-secondary, #CBD5E1);
                    line-height: 1.75;
                    font-size: 1rem;
                    margin: 0;
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .info-item label {
                    display: block;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--color-text-muted, #64748B);
                    margin-bottom: 0.75rem;
                }

                .value-row {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-weight: 600;
                    font-size: 1rem;
                    color: var(--color-text-primary, #F8FAFC);
                }

                .icon-success {
                    color: var(--color-success, #10B981);
                }

                .icon-warning {
                    color: var(--color-warning, #F59E0B);
                }

                .punishment-section {
                    background: rgba(239, 68, 68, 0.08);
                    border-left: 4px solid var(--color-danger, #EF4444);
                    padding: 1.5rem;
                    border-radius: 0 16px 16px 0;
                }

                .punishment-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #FCA5A5;
                    font-weight: 600;
                    font-size: 0.9rem;
                    margin-bottom: 0.75rem;
                }

                .punishment-section p {
                    color: #FECACA;
                    font-size: 0.95rem;
                    margin: 0;
                    line-height: 1.6;
                }

                .modal-content::-webkit-scrollbar {
                    width: 8px;
                }

                .modal-content::-webkit-scrollbar-track {
                    background: transparent;
                }

                .modal-content::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }

                @media (max-width: 768px) {
                    .ipc-grid {
                        grid-template-columns: 1fr;
                    }

                    .modal-content {
                        margin: 1rem;
                    }

                    .modal-header,
                    .modal-body {
                        padding-left: 1.5rem;
                        padding-right: 1.5rem;
                    }

                    .info-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default Discover;
