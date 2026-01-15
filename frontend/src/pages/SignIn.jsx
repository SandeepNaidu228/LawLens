import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Gavel } from 'lucide-react';

const SignIn = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Bypass logic as requested
        navigate('/dashboard');
    };

    return (
        <div className="auth-page">
            <div className="auth-card card">
                <div className="auth-header">
                    <div className="logo">
                        <Gavel size={32} color="var(--color-accent)" />
                    </div>
                    <h1>Welcome Back</h1>
                    <p className="subtitle">Sign in to access your legal dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="label">Email or Phone</label>
                        <input type="text" className="input" placeholder="name@example.com" />
                    </div>

                    <div className="form-group">
                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">
                        Sign In
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="#" className="link">Create account</Link></p>
                </div>
            </div>

            <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-background);
          padding: var(--spacing-md);
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          padding: 2.5rem;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo {
          display: inline-flex;
          padding: var(--spacing-sm);
          background: #EFF6FF;
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-md);
        }

        .auth-header h1 {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-xs);
        }

        .subtitle {
          color: var(--color-text-muted);
          font-size: 0.875rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .btn-block {
          width: 100%;
          margin-top: var(--spacing-sm);
        }

        .auth-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }

        .link {
          color: var(--color-accent);
          font-weight: 500;
        }
        
        .link:hover {
          text-decoration: underline;
        }
      `}</style>
        </div>
    );
};

export default SignIn;
