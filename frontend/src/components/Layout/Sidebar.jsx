import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Compass, MessageSquare, Bug, Twitter, Mail, LogOut, Scale, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    {
      category: 'MAIN',
      items: [
        { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Compass size={20} />, label: 'IPC Library', path: '/dashboard/discover' },
      ]
    },
    {
      category: 'SUPPORT',
      items: [
        { icon: <MessageSquare size={20} />, label: 'Feedback', path: '#' },
        { icon: <Bug size={20} />, label: 'Report Issue', path: '#' },
      ]
    },
    {
      category: 'CONNECT',
      items: [
        { icon: <Twitter size={20} />, label: 'Twitter', path: '#' },
        { icon: <Mail size={20} />, label: 'Contact', path: '#' },
      ]
    }
  ];

  return (
    <aside className="sidebar">
      <Link to="/" className="brand">
        <div className="brand-icon">
          <Scale size={22} />
        </div>
        <span className="brand-name">LawLens</span>
      </Link>

      <nav className="nav-container">
        {navItems.map((section, idx) => (
          <div key={idx} className="nav-section">
            <span className="section-label">{section.category}</span>
            <ul className="nav-list">
              {section.items.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive && item.path !== '#' ? 'active' : ''}`
                    }
                    end={item.path === '/dashboard'}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    <ChevronRight size={14} className="nav-arrow" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/dashboard/profile" className="user-card">
          {user?.picture ? (
            <img src={user.picture} alt="Avatar" className="user-avatar-img" />
          ) : (
            <div className="user-avatar">{user?.name?.charAt(0) || 'U'}</div>
          )}
          <div className="user-details">
            <span className="user-name">{user?.name || 'Guest User'}</span>
            <span className="user-plan">Free Plan</span>
          </div>
        </Link>

        <button onClick={handleSignOut} className="logout-btn" title="Sign Out">
          <LogOut size={18} />
        </button>
      </div>

      <style>{`
        .sidebar {
          width: 280px;
          height: 100vh;
          background: var(--color-bg-elevated, #0D1220);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 50;
          padding: 1.5rem;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          padding: 0.5rem;
          margin-bottom: 2rem;
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .brand:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--color-accent, #D4AF37) 0%, #B8860B 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #080B14;
        }

        .brand-name {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-weight: 700;
          font-size: 1.35rem;
          color: var(--color-text-primary, #F8FAFC);
          letter-spacing: -0.02em;
        }

        .nav-container {
          flex: 1;
          overflow-y: auto;
        }

        .nav-section {
          margin-bottom: 1.75rem;
        }

        .section-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--color-text-subtle, #475569);
          text-transform: uppercase;
          letter-spacing: 1.2px;
          padding: 0 0.5rem;
          margin-bottom: 0.75rem;
        }

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0.75rem;
          color: var(--color-text-muted, #64748B);
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.04);
          color: var(--color-text-primary, #F8FAFC);
        }

        .nav-link.active {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%);
          color: var(--color-primary-light, #818CF8);
        }

        .nav-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: var(--color-primary, #6366F1);
          border-radius: 0 2px 2px 0;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nav-label {
          flex: 1;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .nav-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s ease;
          color: var(--color-text-subtle, #475569);
        }

        .nav-link:hover .nav-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .sidebar-footer {
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-card {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .user-card:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        .user-avatar {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, var(--color-primary, #6366F1) 0%, var(--color-primary-dark, #4F46E5) 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          color: white;
          flex-shrink: 0;
        }

        .user-avatar-img {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-primary, #F8FAFC);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-plan {
          font-size: 0.75rem;
          color: var(--color-text-muted, #64748B);
        }

        .logout-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          color: var(--color-text-muted, #64748B);
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.2);
          color: var(--color-danger, #EF4444);
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 72px;
            padding: 1rem 0.75rem;
            align-items: center;
          }

          .brand {
            padding: 0;
            margin-bottom: 1.5rem;
          }

          .brand-name,
          .nav-label,
          .nav-arrow,
          .section-label,
          .user-details {
            display: none;
          }

          .brand-icon {
            width: 44px;
            height: 44px;
          }

          .nav-link {
            justify-content: center;
            padding: 0.85rem;
          }

          .nav-link.active::before {
            display: none;
          }

          .sidebar-footer {
            flex-direction: column;
            gap: 0.5rem;
          }

          .user-card {
            padding: 0;
          }

          .user-avatar,
          .user-avatar-img {
            width: 44px;
            height: 44px;
          }

          .logout-btn {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
