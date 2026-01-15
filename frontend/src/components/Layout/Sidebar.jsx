import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Compass, MessageSquare, Bug, Twitter, Mail, LogOut, Scale } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    {
      category: 'GENERAL',
      items: [
        { icon: <Home size={20} />, label: 'Home', path: '/dashboard' },
        { icon: <Compass size={20} />, label: 'Discover', path: '/dashboard/discover' },
      ]
    },
    {
      category: 'FEEDBACK',
      items: [
        { icon: <MessageSquare size={20} />, label: 'Suggest Feature', path: '#' },
        { icon: <Bug size={20} />, label: 'Report Bug', path: '#' },
      ]
    },
    {
      category: 'SOCIAL',
      items: [
        { icon: <Twitter size={20} />, label: 'Twitter', path: '#' },
        { icon: <Mail size={20} />, label: 'Email', path: '#' },
      ]
    }
  ];

  return (
    <div className="sidebar">
      {/* 1. Brand -> Landing Page */}
      <Link to="/" className="sidebar-header">
        <Scale size={28} className="text-accent" />
        <span className="brand-name">LawLens</span>
      </Link>

      <nav className="sidebar-nav">
        {navItems.map((section, idx) => (
          <div key={idx} className="nav-section">
            <h3 className="nav-section-title">{section.category}</h3>
            {section.items.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item ${isActive && item.path !== '#' ? 'active' : ''}`
                }
                end={item.path === '/dashboard'}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        {/* 2. User Profile -> Profile Page */}
        <Link to="/dashboard/profile" className="user-profile">
          {user?.picture ? (
            <img src={user.picture} alt="Avatar" className="avatar-img" />
          ) : (
            <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
          )}
          <div className="user-info">
            <span className="name">{user?.name || 'Guest User'}</span>
            <span className="role">Free Plan</span>
          </div>
        </Link>

        {/* 3. Sign Out -> Landing Page */}
        <button onClick={handleSignOut} className="logout-btn">
          <LogOut size={20} />
        </button>
      </div>

      <style>{`
                :root {
                    --bg-sidebar: rgba(15, 23, 42, 0.95);
                    --color-border: rgba(255, 255, 255, 0.1);
                    --color-accent: #F59E0B;
                    --color-primary: #3B82F6;
                    --text-main: #F8FAFC;
                    --text-muted: #94A3B8;
                    --font-heading: 'Merriweather', serif;
                    --font-body: 'Inter', sans-serif;
                }

                .sidebar {
                    width: 260px;
                    height: 100vh;
                    background: var(--bg-sidebar);
                    border-right: 1px solid var(--color-border);
                    display: flex;
                    flex-direction: column;
                    padding: 1.5rem;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 50;
                    backdrop-filter: blur(10px);
                }

                /* Header */
                .sidebar-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 2.5rem;
                    padding-left: 0.5rem;
                    text-decoration: none;
                    transition: opacity 0.2s;
                }
                .sidebar-header:hover { opacity: 0.8; }

                .brand-name {
                    font-family: var(--font-heading);
                    font-weight: 700;
                    font-size: 1.5rem;
                    color: var(--text-main);
                    letter-spacing: -0.02em;
                }
                .text-accent { color: var(--color-accent); }

                /* Navigation */
                .nav-section { margin-bottom: 2rem; }

                .nav-section-title {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: rgba(148, 163, 184, 0.6);
                    margin-bottom: 0.75rem;
                    padding-left: 0.75rem;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem;
                    color: var(--text-muted);
                    border-radius: 8px;
                    transition: all 0.2s;
                    font-weight: 500;
                    text-decoration: none;
                    font-family: var(--font-body);
                    font-size: 0.95rem;
                }

                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: var(--text-main);
                }

                .nav-item.active {
                    background: rgba(245, 158, 11, 0.1); /* Gold tint */
                    color: var(--color-accent);
                    font-weight: 600;
                }

                /* Footer */
                .sidebar-footer {
                    margin-top: auto;
                    border-top: 1px solid var(--color-border);
                    padding-top: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    text-decoration: none;
                    flex: 1;
                    padding: 0.5rem;
                    border-radius: 8px;
                    transition: background 0.2s;
                }
                .user-profile:hover {
                    background: rgba(255,255,255,0.05);
                }

                .avatar {
                    width: 36px; height: 36px;
                    background: var(--color-primary);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 700; font-size: 0.85rem;
                    color: white;
                }
                
                .avatar-img {
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .user-info {
                    display: flex; flex-direction: column;
                }
                .name { font-size: 0.9rem; font-weight: 600; color: var(--text-main); }
                .role { font-size: 0.75rem; color: var(--text-muted); }
                
                .logout-btn {
                    background: transparent;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 6px;
                    transition: 0.2s;
                }
                
                .logout-btn:hover {
                    background: rgba(239, 68, 68, 0.1);
                    color: #EF4444;
                }

                @media (max-width: 768px) {
                    .sidebar { width: 70px; padding: 1.5rem 0.5rem; align-items: center; }
                    .brand-name, .nav-item span, .nav-section-title, .user-info { display: none; }
                    .sidebar-header { margin-bottom: 2rem; padding-left: 0; }
                    .nav-item { justify-content: center; padding: 0.75rem; }
                    .sidebar-footer { flex-direction: column; gap: 1rem; }
                    .user-profile { padding: 0; justify-content: center; }
                }
            `}</style>
    </div>
  );
};

export default Sidebar;