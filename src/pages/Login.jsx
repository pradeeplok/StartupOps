import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { UserContext } from '../App';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [rememberMe, setRememberMe] = React.useState(false);
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'Failed to sign in';

            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many attempts. Please try again later';
                    break;
                default:
                    errorMessage = error.message;
            }

            setError(errorMessage);
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setIsLoading(true);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Google login error:', error);
            let errorMessage = 'Failed to sign in with Google';

            if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Sign-in popup was closed';
            } else if (error.code === 'auth/cancelled-popup-request') {
                errorMessage = 'Sign-in was cancelled';
            } else {
                errorMessage = error.message;
            }

            setError(errorMessage);
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-grid">
                {/* Left Side - Branding */}
                <div className="auth-branding">
                    <div className="auth-branding-content">
                        <div className="brand-logo-large">S</div>
                        <h1 className="auth-brand-title">StartupOps</h1>
                        <p className="auth-brand-subtitle">Your all-in-one startup command center</p>
                        <div className="auth-features">
                            <div className="auth-feature">
                                <div className="auth-feature-icon">✓</div>
                                <span>Real-time validation insights</span>
                            </div>
                            <div className="auth-feature">
                                <div className="auth-feature-icon">✓</div>
                                <span>Smart financial tracking</span>
                            </div>
                            <div className="auth-feature">
                                <div className="auth-feature-icon">✓</div>
                                <span>Team collaboration</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="auth-form-container">
                    <div className="auth-form-wrapper">
                        <div className="auth-header">
                            <LogIn size={32} style={{ color: 'var(--primary-blue)' }} />
                            <h2 className="auth-title">Welcome Back</h2>
                            <p className="auth-subtitle">Sign in to access your dashboard</p>
                        </div>

                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        {/* Google Sign-In Button */}
                        <button
                            type="button"
                            className="google-signin-btn"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z" />
                                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z" />
                                <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z" />
                                <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z" />
                            </svg>
                            <span>Continue with Google</span>
                        </button>

                        <div className="auth-divider">
                            <span>or</span>
                        </div>

                        <form onSubmit={handleEmailLogin} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <div className="input-with-icon">
                                    <Mail size={18} />
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-with-icon">
                                    <Lock size={18} />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-row">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        disabled={isLoading}
                                    />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="auth-link">Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                className="auth-submit-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
