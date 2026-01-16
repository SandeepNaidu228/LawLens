import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Shield, BarChart, Settings, Sparkles, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="profile-page">
            <header className="page-header">
                <div className="header-badge">
                    <Sparkles size={14} />
                    <span>Account Settings</span>
                </div>
                <h1>My Profile</h1>
                <p>Manage your account and view your usage statistics.</p>
            </header>

            <div className="profile-layout">
                <div className="profile-main">
                    <div className="profile-card">
                        <div className="profile-header">
                            <div className="avatar-section">
                                {user?.picture ? (
                                    <img src={user.picture} alt="Avatar" className="profile-avatar-img" />
                                ) : (
                                    <div className="profile-avatar">
                                        {user?.name?.charAt(0) || 'U'}
                                    </div>
                                )}
                                <div className="status-indicator"></div>
                            </div>
                            <div className="profile-info">
                                <h2>{user?.name || 'Guest User'}</h2>
                                <div className="badges">
                                    <span className="badge active">
                                        <CheckCircle2 size={12} />
                                        Active
                                    </span>
                                    <span className="badge plan">Free Plan</span>
                                </div>
                            </div>
                            <button className="edit-btn">
                                <Settings size={16} />
                                <span>Edit Profile</span>
                            </button>
                        </div>

                        <div className="profile-divider"></div>

                        <div className="profile-details">
                            <div className="detail-group">
                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <Mail size={18} />
                                    </div>
                                    <div className="detail-content">
                                        <label>Email Address</label>
                                        <p>{user?.email || 'Not provided'}</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <User size={18} />
                                    </div>
                                    <div className="detail-content">
                                        <label>Username</label>
                                        <p>@{user?.name?.toLowerCase().replace(/\s+/g, '_') || 'guest_user'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="stats-section">
                        <h3>Usage Statistics</h3>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon queries">
                                    <BarChart size={22} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-value">124</span>
                                    <span className="stat-label">Total Queries</span>
                                </div>
                                <div className="stat-trend positive">
                                    <TrendingUp size={14} />
                                    <span>+12%</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon privacy">
                                    <Shield size={22} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-value">0</span>
                                    <span className="stat-label">Data Stored</span>
                                </div>
                                <div className="stat-badge">
                                    <span>Privacy Compliant</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon time">
                                    <Clock size={22} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-value">2.3s</span>
                                    <span className="stat-label">Avg Response</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="profile-sidebar">
                    <div className="sidebar-card">
                        <div className="sidebar-icon">
                            <Shield size={24} />
                        </div>
                        <h4>Privacy Protection</h4>
                        <p>Your searches are processed in-memory and never stored. We maintain zero logs of your queries.</p>
                        <div className="privacy-indicator">
                            <CheckCircle2 size={14} />
                            <span>All systems secure</span>
                        </div>
                    </div>

                    <div className="sidebar-card upgrade">
                        <span className="upgrade-label">Upgrade Available</span>
                        <h4>Go Pro</h4>
                        <p>Get unlimited queries, priority support, and advanced features.</p>
                        <button className="upgrade-btn">View Plans</button>
                    </div>
                </aside>
            </div>

            <style>{`
                .profile-page {
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
                }

                .profile-layout {
                    display: grid;
                    grid-template-columns: 1fr 320px;
                    gap: 2rem;
                }

                .profile-main {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .profile-card {
                    background: rgba(17, 24, 39, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 20px;
                    overflow: hidden;
                }

                .profile-header {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 2rem;
                }

                .avatar-section {
                    position: relative;
                }

                .profile-avatar {
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, var(--color-primary, #6366F1) 0%, var(--color-primary-dark, #4F46E5) 100%);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    font-weight: 700;
                    color: white;
                    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
                }

                .profile-avatar-img {
                    width: 80px;
                    height: 80px;
                    border-radius: 16px;
                    object-fit: cover;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                }

                .status-indicator {
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 20px;
                    height: 20px;
                    background: var(--color-success, #10B981);
                    border: 3px solid var(--color-bg-card, #111827);
                    border-radius: 50%;
                }

                .profile-info {
                    flex: 1;
                }

                .profile-info h2 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 1.5rem;
                    margin: 0 0 0.75rem 0;
                    color: var(--color-text-primary, #F8FAFC);
                }

                .badges {
                    display: flex;
                    gap: 0.5rem;
                }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    font-size: 0.75rem;
                    padding: 0.35rem 0.7rem;
                    border-radius: 100px;
                    font-weight: 600;
                }

                .badge.active {
                    background: rgba(16, 185, 129, 0.1);
                    color: var(--color-success, #10B981);
                }

                .badge.plan {
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--color-accent, #D4AF37);
                }

                .edit-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.25rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 10px;
                    color: var(--color-text-primary, #F8FAFC);
                    font-weight: 500;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .edit-btn:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(255, 255, 255, 0.12);
                }

                .profile-divider {
                    height: 1px;
                    background: rgba(255, 255, 255, 0.05);
                }

                .profile-details {
                    padding: 2rem;
                }

                .detail-group {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }

                .detail-item {
                    display: flex;
                    gap: 1rem;
                }

                .detail-icon {
                    width: 44px;
                    height: 44px;
                    background: rgba(99, 102, 241, 0.1);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-primary-light, #818CF8);
                    flex-shrink: 0;
                }

                .detail-content label {
                    display: block;
                    font-size: 0.8rem;
                    color: var(--color-text-muted, #64748B);
                    margin-bottom: 0.25rem;
                }

                .detail-content p {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 500;
                    color: var(--color-text-primary, #F8FAFC);
                }

                .stats-section h3 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 1.25rem;
                    margin-bottom: 1.25rem;
                    color: var(--color-text-primary, #F8FAFC);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.25rem;
                }

                .stat-card {
                    background: rgba(17, 24, 39, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .stat-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-icon.queries {
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--color-accent, #D4AF37);
                }

                .stat-icon.privacy {
                    background: rgba(16, 185, 129, 0.1);
                    color: var(--color-success, #10B981);
                }

                .stat-icon.time {
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--color-primary-light, #818CF8);
                }

                .stat-content {
                    display: flex;
                    flex-direction: column;
                }

                .stat-value {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--color-text-primary, #F8FAFC);
                    line-height: 1;
                    margin-bottom: 0.25rem;
                }

                .stat-label {
                    font-size: 0.85rem;
                    color: var(--color-text-muted, #64748B);
                }

                .stat-trend {
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .stat-trend.positive {
                    color: var(--color-success, #10B981);
                }

                .stat-badge {
                    font-size: 0.75rem;
                    color: var(--color-success, #10B981);
                    background: rgba(16, 185, 129, 0.1);
                    padding: 0.35rem 0.7rem;
                    border-radius: 100px;
                    align-self: flex-start;
                }

                .profile-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .sidebar-card {
                    background: rgba(17, 24, 39, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    padding: 1.5rem;
                }

                .sidebar-icon {
                    width: 48px;
                    height: 48px;
                    background: rgba(16, 185, 129, 0.1);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-success, #10B981);
                    margin-bottom: 1rem;
                }

                .sidebar-card h4 {
                    font-family: var(--font-serif, 'Playfair Display', serif);
                    font-size: 1.1rem;
                    margin: 0 0 0.5rem 0;
                    color: var(--color-text-primary, #F8FAFC);
                }

                .sidebar-card p {
                    font-size: 0.9rem;
                    color: var(--color-text-muted, #64748B);
                    line-height: 1.6;
                    margin: 0;
                }

                .privacy-indicator {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    font-size: 0.85rem;
                    color: var(--color-success, #10B981);
                }

                .sidebar-card.upgrade {
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%);
                    border-color: rgba(99, 102, 241, 0.2);
                }

                .upgrade-label {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--color-primary-light, #818CF8);
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    display: block;
                }

                .upgrade-btn {
                    width: 100%;
                    margin-top: 1rem;
                    padding: 0.85rem;
                    background: linear-gradient(135deg, var(--color-primary, #6366F1) 0%, var(--color-primary-dark, #4F46E5) 100%);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .upgrade-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
                }

                @media (max-width: 1000px) {
                    .profile-layout {
                        grid-template-columns: 1fr;
                    }

                    .profile-sidebar {
                        display: none;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 600px) {
                    .profile-header {
                        flex-direction: column;
                        text-align: center;
                    }

                    .edit-btn {
                        width: 100%;
                        justify-content: center;
                    }

                    .detail-group {
                        grid-template-columns: 1fr;
                    }

                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default Profile;
