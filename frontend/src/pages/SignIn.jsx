import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { Scale, Lock, ShieldCheck, Mail } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }

        const userData = await response.json();
        console.log('User Data fetched:', userData); // Debugging
        authLogin(userData);
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        alert('Failed to login with Google. Please try again.');
      }
    },
    onError: () => {
      console.log('Login Failed');
      alert('Google Login Failed');
    },
    scope: 'email profile openid', // Explicitly request scopes
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Bypass logic as requested
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      {/* Background Decor */}
      <div className="bg-glow"></div>

      <div className="auth-container">
        {/* Left Side - Trust/Info Panel (Visible on Desktop) */}
        <div className="info-panel">
          <div className="brand">
            <Scale size={32} className="text-accent" />
            <span className="brand-name">LawLens</span>
          </div>

          <div className="info-content">
            <h2>Legal Clarity, <br />Zero Compromise.</h2>
            <p>Access India's most advanced privacy-first legal mapping engine.</p>

            <div className="trust-badges">
              <div className="badge-item">
                <ShieldCheck size={20} className="text-green" />
                <span>No Search History Logs</span>
              </div>
              <div className="badge-item">
                <Lock size={20} className="text-accent" />
                <span>End-to-End Encryption</span>
              </div>
            </div>
          </div>

          <div className="info-footer">
            <p>&copy; 2024 LawLens Legal Tech</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="form-panel">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Welcome Back</h1>
              <p className="subtitle">Please enter your details to sign in.</p>
            </div>

            {/* Google Sign In */}
            <button className="btn-google" onClick={() => login()}>
              <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.23856)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.369 L -25.464 53.369 L -25.464 56.469 C -23.494 60.379 -19.464 63.239 -14.754 63.239 Z" />
                  <path fill="#FBBC05" d="M -21.484 53.369 C -21.734 52.619 -21.864 51.819 -21.864 50.989 C -21.864 50.159 -21.734 49.359 -21.484 48.609 L -21.484 45.509 L -25.464 45.509 C -26.284 47.129 -26.754 48.989 -26.754 50.989 C -26.754 52.989 -26.284 54.849 -25.464 56.469 L -21.484 53.369 Z" />
                  <path fill="#EA4335" d="M -14.754 43.489 C -12.984 43.489 -11.404 44.099 -10.154 45.299 L -6.734 41.879 C -8.804 39.949 -11.514 38.739 -14.754 38.739 C -19.464 38.739 -23.494 41.599 -25.464 45.509 L -21.484 48.609 C -20.534 45.599 -17.884 43.489 -14.754 43.489 Z" />
                </g>
              </svg>
              Sign in with Google
            </button>

            <div className="divider">
              <span>or continue with email</span>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="label">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input type="email" className="input" placeholder="name@company.com" required />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input type="password" className="input" placeholder="••••••••" required />
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <Link to="#" className="link-sm">Forgot Password?</Link>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Sign In
              </button>
            </form>

            <div className="auth-footer">
              <p>Don't have an account? <Link to="#" className="link">Create account</Link></p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --color-bg: #0F172A;
          --color-bg-card: #1E293B;
          --color-primary: #3B82F6;
          --color-primary-dark: #2563EB;
          --color-accent: #F59E0B;
          --color-text-main: #F8FAFC;
          --color-text-muted: #94A3B8;
          --color-border: rgba(255, 255, 255, 0.1);
          --font-heading: 'Merriweather', serif;
          --font-body: 'Inter', sans-serif;
        }

        .auth-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-bg);
            font-family: var(--font-body);
            color: var(--color-text-main);
            position: relative;
            overflow: hidden;
            padding: 1rem;
        }

        .bg-glow {
            position: absolute;
            top: -10%;
            left: -10%;
            width: 50%;
            height: 50%;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
        }

        .auth-container {
            display: flex;
            width: 100%;
            max-width: 900px;
            background: var(--color-bg-card);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid var(--color-border);
            z-index: 10;
        }

        /* Info Panel (Left) */
        .info-panel {
            flex: 1;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            padding: 3rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-right: 1px solid var(--color-border);
            position: relative;
            overflow: hidden;
        }
        
        /* Subtle texture for info panel */
        .info-panel::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: radial-gradient(#3B82F6 1px, transparent 1px);
            background-size: 30px 30px;
            opacity: 0.05;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            position: relative;
            z-index: 2;
        }

        .brand-name {
            font-family: var(--font-heading);
            font-weight: 700;
            font-size: 1.5rem;
            color: white;
        }

        .info-content {
            position: relative;
            z-index: 2;
            margin-top: 2rem;
        }

        .info-content h2 {
            font-family: var(--font-heading);
            font-size: 2rem;
            line-height: 1.2;
            margin-bottom: 1rem;
        }

        .info-content p {
            color: var(--color-text-muted);
            margin-bottom: 2rem;
            line-height: 1.6;
        }

        .trust-badges {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .badge-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.9rem;
            color: #E2E8F0;
        }

        .info-footer {
            position: relative;
            z-index: 2;
            font-size: 0.8rem;
            color: rgba(255,255,255,0.3);
        }

        /* Form Panel (Right) */
        .form-panel {
            flex: 1.2;
            padding: 3rem;
            background: rgba(30, 41, 59, 0.5);
        }

        .auth-header {
            text-align: left;
            margin-bottom: 2rem;
        }

        .auth-header h1 {
            font-family: var(--font-heading);
            font-size: 1.75rem;
            margin-bottom: 0.5rem;
        }

        .subtitle {
            color: var(--color-text-muted);
            font-size: 0.95rem;
        }

        /* Google Button */
        .btn-google {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            background: white;
            color: #1e293b;
            border: 1px solid white;
            padding: 0.75rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            margin-bottom: 1.5rem;
        }

        .btn-google:hover {
            background: #F8FAFC;
            transform: translateY(-1px);
        }

        /* Divider */
        .divider {
            display: flex;
            align-items: center;
            text-align: center;
            color: var(--color-text-muted);
            font-size: 0.8rem;
            margin-bottom: 1.5rem;
        }

        .divider::before, .divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid var(--color-border);
        }

        .divider span {
            padding: 0 10px;
        }

        /* Form Styling */
        .auth-form {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .label {
            font-size: 0.85rem;
            font-weight: 500;
            color: #CBD5E1;
        }

        .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }

        .input-icon {
            position: absolute;
            left: 1rem;
            color: var(--color-text-muted);
        }

        .input {
            width: 100%;
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid var(--color-border);
            color: white;
            padding: 0.75rem 1rem 0.75rem 2.75rem;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.2s;
        }

        .input:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
        }

        .checkbox-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            color: var(--color-text-muted);
        }
        
        .link-sm {
            color: var(--color-primary);
            text-decoration: none;
        }
        
        .link-sm:hover { text-decoration: underline; }

        .btn-block {
            width: 100%;
            background: var(--color-primary);
            color: white;
            border: none;
            padding: 0.85rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 0.5rem;
            transition: all 0.2s;
        }

        .btn-block:hover {
            background: var(--color-primary-dark);
        }

        .auth-footer {
            margin-top: 2rem;
            text-align: center;
            font-size: 0.9rem;
            color: var(--color-text-muted);
        }

        .link {
            color: var(--color-accent);
            font-weight: 500;
            text-decoration: none;
        }
        
        .link:hover {
            text-decoration: underline;
        }
        
        .text-accent { color: var(--color-accent); }
        .text-green { color: #10B981; }

        /* Responsive */
        @media (max-width: 768px) {
            .auth-container { flex-direction: column; max-width: 500px; }
            .info-panel { display: none; } /* Hide info panel on mobile */
            .form-panel { padding: 2rem; }
        }
      `}</style>
    </div>
  );
};

export default SignIn;