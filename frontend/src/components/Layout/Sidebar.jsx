import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, MessageSquare, Bug, Twitter, Mail, LogOut, Gavel } from 'lucide-react';

const Sidebar = () => {
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
            <div className="sidebar-header">
                <Gavel size={28} color="var(--color-accent)" />
                <span className="brand-name">LawLens</span>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((section, idx) => (
                    <div key={idx} className="nav-section">
                        <h3 className="nav-section-title">{section.category}</h3>
                        {section.items.map((item, i) => (
                            <NavLink
                                key={i}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive && item.path !== '#' ? 'active' : ''}`}
                                end={item.path === '/dashboard'} // Exact match for home
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item logout-btn">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>

            <style>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: var(--color-surface);
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          padding: var(--spacing-lg);
          position: fixed;
          left: 0;
          top: 0;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xl);
          padding-left: var(--spacing-sm);
        }

        .brand-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--color-primary);
        }

        .nav-section {
          margin-bottom: var(--spacing-lg);
        }

        .nav-section-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-muted);
          margin-bottom: var(--spacing-sm);
          padding-left: var(--spacing-sm);
          letter-spacing: 0.5px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: 0.75rem var(--spacing-sm);
          color: var(--color-text-muted);
          border-radius: var(--radius-md);
          transition: all 0.2s;
          font-weight: 500;
          width: 100%;
          text-align: left;
        }

        .nav-item:hover {
          background: var(--color-background);
          color: var(--color-primary);
        }

        .nav-item.active {
          background: #EFF6FF; /* specialized lighter blue */
          color: var(--color-accent);
        }

        .sidebar-footer {
          margin-top: auto;
          border-top: 1px solid var(--color-border);
          padding-top: var(--spacing-md);
        }
        
        .logout-btn {
          color: #EF4444;
        }
        
        .logout-btn:hover {
          background: #FEF2F2;
          color: #DC2626;
        }
      `}</style>
        </div>
    );
};

export default Sidebar;
