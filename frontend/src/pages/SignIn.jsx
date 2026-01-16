import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { Scale, Lock, ShieldCheck, Mail, ArrowRight, Sparkles } from 'lucide-react';

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
    scope: 'email profile openid',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="auth-container">
        <div className="info-panel">
          <Link to="/" className="brand">
            <div className="brand-icon">
              <Scale size={24} />
            </div>
            <span className="brand-name">LawLens</span>
          </Link>

          <div className="info-content">
            <div className="info-badge">
              <Sparkles size={14} />
              <span>Privacy-First Legal AI</span>
            </div>
            <h1>Legal Clarity,<br />Zero Compromise.</h1>
            <p>Access India's most advanced privacy-first legal mapping engine. Transform complex legal scenarios into actionable insights.</p>

            <div className="trust-features">
              <div className="trust-item">
                <div className="trust-icon">
                  <ShieldCheck size={20} />
                </div>
                <div className="trust-text">
                  <span className="trust-title">No Search History</span>
                  <span className="trust-desc">Your queries are never stored</span>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">
                  <Lock size={20} />
                </div>
                <div className="trust-text">
                  <span className="trust-title">End-to-End Privacy</span>
                  <span className="trust-desc">In-memory processing only</span>
                </div>
              </div>
            </div>
          </div>

          <div className="info-footer">
            <p>&copy; 2026 LawLens Legal Tech</p>
          </div>
        </div>

        <div className="form-panel">
          <div className="form-container">
            <div className="form-header">
              <h2>Welcome back</h2>
              <p>Sign in to continue to your dashboard</p>
            </div>

            <button className="btn-google" onClick={() => login()}>
              <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.23856)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.369 L -25.464 53.369 L -25.464 56.469 C -23.494 60.379 -19.464 63.239 -14.754 63.239 Z" />
                  <path fill="#FBBC05" d="M -21.484 53.369 C -21.734 52.619 -21.864 51.819 -21.864 50.989 C -21.864 50.159 -21.734 49.359 -21.484 48.609 L -21.484 45.509 L -25.464 45.509 C -26.284 47.129 -26.754 48.989 -26.754 50.989 C -26.754 52.989 -26.284 54.849 -25.464 56.469 L -21.484 53.369 Z" />
                  <path fill="#EA4335" d="M -14.754 43.489 C -12.984 43.489 -11.404 44.099 -10.154 45.299 L -6.734 41.879 C -8.804 39.949 -11.514 38.739 -14.754 38.739 C -19.464 38.739 -23.494 41.599 -25.464 45.509 L -21.484 48.609 C -20.534 45.599 -17.884 43.489 -14.754 43.489 Z" />
                </g>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="divider">
              <span>or continue with email</span>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input type="email" placeholder="name@company.com" required />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input type="password" placeholder="Enter your password" required />
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-wrapper">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span>Remember me</span>
                </label>
                <Link to="#" className="link-forgot">Forgot Password?</Link>
              </div>

              <button type="submit" className="btn-submit">
                <span>Sign In</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="form-footer">
              <p>Don't have an account? <Link to="#" className="link-create">Create account</Link></p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-dark, #080B14);
          font-family: var(--font-sans, 'Inter', sans-serif);
          color: var(--color-text-primary, #F8FAFC);
          position: relative;
          overflow: hidden;
          padding: 1.5rem;
        }

        .auth-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
        }

        .orb-1 {
          top: -20%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
        }

        .orb-2 {
          bottom: -20%;
          right: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .auth-container {
          display: flex;
          width: 100%;
          max-width: 1000px;
          background: rgba(17, 24, 39, 0.6);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          z-index: 10;
        }

        .info-panel {
          flex: 1;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(17, 24, 39, 0.5) 100%);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          margin-bottom: 3rem;
        }

        .brand-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--color-accent, #D4AF37) 0%, #B8860B 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #080B14;
        }

        .brand-name {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--color-text-primary, #F8FAFC);
          letter-spacing: -0.02em;
        }

        .info-content {
          flex: 1;
        }

        .info-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          padding: 0.4rem 0.9rem;
          border-radius: 100px;
          font-size: 0.8rem;
          color: var(--color-primary-light, #818CF8);
          margin-bottom: 1.5rem;
        }

        .info-content h1 {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2.25rem;
          line-height: 1.15;
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .info-content > p {
          color: var(--color-text-secondary, #CBD5E1);
          line-height: 1.7;
          margin-bottom: 2.5rem;
          font-size: 1rem;
        }

        .trust-features {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .trust-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .trust-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .trust-item:first-child .trust-icon {
          background: rgba(16, 185, 129, 0.1);
          color: var(--color-success, #10B981);
        }

        .trust-item:last-child .trust-icon {
          background: rgba(212, 175, 55, 0.1);
          color: var(--color-accent, #D4AF37);
        }

        .trust-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .trust-title {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--color-text-primary, #F8FAFC);
        }

        .trust-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted, #64748B);
        }

        .info-footer {
          margin-top: auto;
          padding-top: 2rem;
        }

        .info-footer p {
          font-size: 0.8rem;
          color: var(--color-text-subtle, #475569);
        }

        .form-panel {
          flex: 1.1;
          padding: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-container {
          width: 100%;
          max-width: 360px;
        }

        .form-header {
          margin-bottom: 2rem;
        }

        .form-header h2 {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .form-header p {
          color: var(--color-text-muted, #64748B);
          font-size: 0.95rem;
        }

        .btn-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: white;
          color: #1e293b;
          border: none;
          padding: 0.9rem 1.25rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 1.5rem;
        }

        .btn-google:hover {
          background: #F8FAFC;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }

        .divider {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .divider span {
          padding: 0 1rem;
          font-size: 0.8rem;
          color: var(--color-text-subtle, #475569);
        }

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

        .form-group label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-secondary, #CBD5E1);
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--color-text-subtle, #475569);
          pointer-events: none;
        }

        .input-wrapper input {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--color-text-primary, #F8FAFC);
          padding: 0.9rem 1rem 0.9rem 3rem;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .input-wrapper input::placeholder {
          color: var(--color-text-subtle, #475569);
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: var(--color-primary, #6366F1);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: var(--color-text-muted, #64748B);
        }

        .checkbox-wrapper input {
          width: 16px;
          height: 16px;
          accent-color: var(--color-primary, #6366F1);
        }

        .link-forgot {
          color: var(--color-primary-light, #818CF8);
          font-weight: 500;
          transition: color 0.2s;
        }

        .link-forgot:hover {
          color: var(--color-primary, #6366F1);
        }

        .btn-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          background: linear-gradient(135deg, var(--color-primary, #6366F1) 0%, var(--color-primary-dark, #4F46E5) 100%);
          color: white;
          border: none;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
          margin-top: 0.5rem;
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
        }

        .form-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .form-footer p {
          font-size: 0.9rem;
          color: var(--color-text-muted, #64748B);
        }

        .link-create {
          color: var(--color-accent, #D4AF37);
          font-weight: 600;
          transition: color 0.2s;
        }

        .link-create:hover {
          color: var(--color-accent-light, #F4D35E);
        }

        @media (max-width: 800px) {
          .auth-container {
            flex-direction: column;
            max-width: 450px;
          }

          .info-panel {
            display: none;
          }

          .form-panel {
            padding: 2.5rem 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SignIn;
