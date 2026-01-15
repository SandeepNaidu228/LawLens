import React, { useState } from 'react';
import { Search, ChevronRight, X } from 'lucide-react';

const mockIPC = [
    { id: 'ipc-500', section: 'Section 500', title: 'Punishment for defamation', desc: 'Punishment for defamation with simple imprisonment for a term which may extend to two years, or with fine, or with both.' },
    { id: 'ipc-299', section: 'Section 299', title: 'Culpable Homicide', desc: 'Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death.' },
    { id: 'ipc-124a', section: 'Section 124A', title: 'Sedition', desc: 'Whoever brings or attempts to bring into hatred or contempt, or excites or attempts to excite disaffection towards the Government established by law in India.' },
    { id: 'ipc-307', section: 'Section 307', title: 'Attempt to murder', desc: 'Whoever does any act with such intention or knowledge, and under such circumstances that, if he by that act caused death, he would be guilty of murder.' },
];

const Discover = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIPC, setSelectedIPC] = useState(null);

    const filteredIPC = mockIPC.filter(item =>
        item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="discover-page">
            <header className="page-header">
                <h1>Discover IPC Sections</h1>
                <p className="subtitle">Browse through the Indian Penal Code database.</p>
            </header>

            <div className="search-bar-container">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by section number or title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="ipc-grid">
                {filteredIPC.map((ipc) => (
                    <div key={ipc.id} className="card ipc-card" onClick={() => setSelectedIPC(ipc)}>
                        <div className="card-badge">{ipc.section}</div>
                        <h3>{ipc.title}</h3>
                        <p className="truncate-2-lines">{ipc.desc}</p>
                        <span className="learn-more">Learn more <ChevronRight size={16} /></span>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedIPC && (
                <div className="modal-overlay" onClick={() => setSelectedIPC(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedIPC(null)}>
                            <X size={24} />
                        </button>
                        <div className="modal-header">
                            <span className="modal-badge">{selectedIPC.section}</span>
                            <h2>{selectedIPC.title}</h2>
                        </div>
                        <div className="modal-body">
                            <h4>Description</h4>
                            <p>{selectedIPC.desc}</p>

                            <div className="punishment-box">
                                <h4>Punishment</h4>
                                <p>Information about punishment and cognizable/non-cognizable nature would go here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .search-bar-container {
                    position: relative;
                    margin-bottom: 2rem;
                    max-width: 600px;
                }

                .search-icon {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--color-text-muted);
                }

                .search-input {
                    width: 100%;
                    padding: 1rem 1rem 1rem 3rem;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-full);
                    font-size: 1rem;
                    font-family: var(--font-sans);
                    transition: all 0.2s;
                    box-shadow: var(--shadow-sm);
                }

                .search-input:focus {
                    outline: none;
                    border-color: var(--color-accent);
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                }

                .ipc-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                }

                .ipc-card {
                    cursor: pointer;
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .ipc-card:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--color-accent);
                }

                .card-badge {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--color-text-muted);
                    background: var(--color-background);
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    margin-bottom: 0.75rem;
                }

                .ipc-card h3 {
                    font-size: 1.125rem;
                    margin-bottom: 0.5rem;
                }

                .truncate-2-lines {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    color: var(--color-text-muted);
                    font-size: 0.95rem;
                    margin-bottom: 1rem;
                }

                .learn-more {
                    color: var(--color-accent);
                    font-size: 0.875rem;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                /* Modal */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(4px);
                }

                .modal-content {
                    background: white;
                    width: 90%;
                    max-width: 600px;
                    border-radius: var(--radius-lg);
                    padding: 2rem;
                    position: relative;
                    animation: slideUp 0.3s ease-out;
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .close-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    color: var(--color-text-muted);
                }
                
                .close-btn:hover {
                    color: var(--color-text-main);
                }

                .modal-header {
                    margin-bottom: 1.5rem;
                    border-bottom: 1px solid var(--color-border);
                    padding-bottom: 1rem;
                }

                .modal-badge {
                    color: var(--color-accent);
                    font-weight: 700;
                    font-size: 0.875rem;
                    display: block;
                    margin-bottom: 0.5rem;
                }
                
                .modal-header h2 {
                    margin: 0;
                }

                .modal-body h4 {
                    margin-bottom: 0.5rem;
                }
                
                .modal-body p {
                    color: var(--color-text-main);
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }

                .punishment-box {
                    background: #FEF2F2;
                    border-left: 4px solid #EF4444;
                    padding: 1rem;
                    border-radius: 0 var(--radius-md) var(--radius-md) 0;
                }
                
                .punishment-box p {
                    margin-bottom: 0;
                }
            `}</style>
        </div>
    );
};

export default Discover;
