import React from 'react';
import { User, Mail, Shield, BarChart, Settings } from 'lucide-react';

const Profile = () => {
    return (
        <div className="profile-page animate-fade-in">
            <header className="page-header">
                <h1>My Profile</h1>
                <p className="subtitle">Manage your account settings and usage stats.</p>
            </header>

            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar-lg">User</div>
                    <div className="header-info">
                        <h2>Username</h2>
                        <div className="badge-row">
                            <span className="status-badge">Active</span>
                        </div>
                    </div>
                    <button className="edit-btn">
                        <Settings size={16} /> Edit Profile
                    </button>
                </div>

                <div className="divider"></div>

                <div className="profile-details-grid">
                    <div className="detail-item">
                        <label><Mail size={14} /> Email Address</label>
                        <p>john.doe@example.com</p>
                    </div>
                    <div className="detail-item">
                        <label><User size={14} /> Username</label>
                        <p>legal_eagle_99</p>
                    </div>
                </div>
            </div>

            <div className="stats-section">
                <h3>Usage Statistics</h3>
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon"><BarChart size={20} className="text-accent"/></div>
                        <span className="stat-value">124</span>
                        <span className="stat-label">Queries Run</span>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon"><Shield size={20} className="text-green"/></div>
                        <span className="stat-value">0</span>
                        <span className="stat-label">Data Leaks</span>
                    </div>
                </div>
            </div>

            <style>{`
                :root {
                    --bg-card: #1E293B;
                    --color-border: rgba(255, 255, 255, 0.1);
                    --color-text-main: #F8FAFC;
                    --color-text-muted: #94A3B8;
                    --color-primary: #3B82F6;
                    --color-accent: #F59E0B;
                    --font-heading: 'Merriweather', serif;
                }

                .profile-page {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .page-header { margin-bottom: 2.5rem; }
                .page-header h1 { font-family: var(--font-heading); font-size: 2rem; margin-bottom: 0.5rem; color: var(--color-text-main); }
                .subtitle { color: var(--color-text-muted); }

                /* Main Profile Card */
                .profile-card {
                    background: var(--bg-card);
                    border: 1px solid var(--color-border);
                    border-radius: 16px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                }

                .profile-header {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }

                .profile-avatar-lg {
                    width: 80px; height: 80px;
                    background: var(--color-primary);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 2rem; font-weight: 700; color: white;
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }

                .header-info h2 {
                    font-family: var(--font-heading);
                    font-size: 1.5rem;
                    margin: 0 0 0.5rem 0;
                    color: var(--color-text-main);
                }

                .badge-row { display: flex; gap: 0.5rem; }
                .role-badge, .status-badge {
                    font-size: 0.75rem; padding: 0.2rem 0.6rem;
                    border-radius: 20px; font-weight: 600;
                }
                .role-badge { background: rgba(245, 158, 11, 0.1); color: var(--color-accent); }
                .status-badge { background: rgba(16, 185, 129, 0.1); color: #10B981; }

                .edit-btn {
                    margin-left: auto;
                    background: transparent;
                    border: 1px solid var(--color-border);
                    color: var(--color-text-main);
                    padding: 0.6rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex; align-items: center; gap: 0.5rem;
                    transition: 0.2s;
                }
                .edit-btn:hover { background: rgba(255,255,255,0.05); }

                .divider {
                    height: 1px;
                    background: var(--color-border);
                    margin: 2rem 0;
                }

                .profile-details-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                }

                .detail-item label {
                    display: flex; align-items: center; gap: 0.5rem;
                    font-size: 0.85rem; color: var(--color-text-muted);
                    margin-bottom: 0.5rem;
                }
                .detail-item p {
                    margin: 0; font-size: 1rem; color: var(--color-text-main); font-weight: 500;
                }
                .text-green { color: #10B981 !important; }

                /* Stats Section */
                .stats-section h3 {
                    font-family: var(--font-heading);
                    margin-bottom: 1.5rem;
                    color: var(--color-text-main);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                }

                .stat-card {
                    background: var(--bg-card);
                    border: 1px solid var(--color-border);
                    padding: 1.5rem;
                    border-radius: 12px;
                    display: flex; flex-direction: column;
                    align-items: flex-start;
                }

                .stat-icon {
                    background: rgba(255,255,255,0.05);
                    padding: 0.5rem; border-radius: 8px;
                    margin-bottom: 1rem;
                }
                .text-accent { color: var(--color-accent); }

                .stat-value {
                    font-size: 2rem; font-weight: 700; color: var(--color-text-main);
                    line-height: 1; margin-bottom: 0.25rem;
                }
                .stat-label { font-size: 0.85rem; color: var(--color-text-muted); }

                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                @media (max-width: 600px) {
                    .profile-header { flex-direction: column; text-align: center; }
                    .edit-btn { margin-left: 0; width: 100%; justify-content: center; margin-top: 1rem; }
                    .badge-row { justify-content: center; }
                }
            `}</style>
        </div>
    );
};

export default Profile;