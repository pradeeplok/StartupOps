import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart3, Users, DollarSign, Zap, TrendingUp, Shield, Globe, Star } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Navigation Header */}
            <nav className="landing-nav">
                <div className="landing-nav-content">
                    <div className="landing-logo">
                        <div className="brand-logo-landing">S</div>
                        <span className="brand-name">StartupOps</span>
                    </div>
                    <div className="landing-nav-links">
                        <a href="#features">Features</a>
                        <a href="#testimonials">Testimonials</a>
                        <a href="#pricing">Pricing</a>
                        <Link to="/login" className="nav-login-btn">Login</Link>
                        <Link to="/signup" className="nav-signup-btn">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">
                        <Zap size={16} />
                        <span>Trusted by 500+ Startups</span>
                    </div>
                    <h1 className="hero-title">
                        Your All-in-One
                        <span className="gradient-text"> Startup Command Center</span>
                    </h1>
                    <p className="hero-subtitle">
                        Manage validation, roadmaps, finances, and teams in one beautiful platform.
                        Make data-driven decisions and scale faster with StartupOps.
                    </p>
                    <div className="hero-cta">
                        <Link to="/signup" className="cta-primary">
                            Start Free Trial
                            <ArrowRight size={20} />
                        </Link>
                        <Link to="/login" className="cta-secondary">
                            Sign In
                        </Link>
                    </div>
                    <p className="hero-notice">No credit card required • Free 30-day trial</p>
                </div>
                <div className="hero-visual">
                    <div className="dashboard-mockup">
                        <div className="mockup-header">
                            <div className="mockup-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="mockup-content">
                            <div className="mockup-card">
                                <BarChart3 size={24} />
                                <div className="mockup-text">Real-time Analytics</div>
                            </div>
                            <div className="mockup-card">
                                <Users size={24} />
                                <div className="mockup-text">Team Collaboration</div>
                            </div>
                            <div className="mockup-card">
                                <DollarSign size={24} />
                                <div className="mockup-text">Financial Tracking</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="section-header">
                    <h2 className="section-title">Everything You Need to Scale</h2>
                    <p className="section-subtitle">Powerful features designed for founders, by founders</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <BarChart3 size={28} />
                        </div>
                        <h3 className="feature-title">Validation Engine</h3>
                        <p className="feature-description">
                            Get real-time customer insights, sentiment analysis, and AI-powered recommendations
                            to validate your product decisions.
                        </p>
                        <ul className="feature-list">
                            <li><CheckCircle size={16} /> Sentiment tracking</li>
                            <li><CheckCircle size={16} /> Feedback loop automation</li>
                            <li><CheckCircle size={16} /> Smart recommendations</li>
                        </ul>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <TrendingUp size={28} />
                        </div>
                        <h3 className="feature-title">Product Roadmap</h3>
                        <p className="feature-description">
                            Visual kanban boards, milestone tracking, and team collaboration.
                            Keep everyone aligned on what matters.
                        </p>
                        <ul className="feature-list">
                            <li><CheckCircle size={16} /> Drag-and-drop tasks</li>
                            <li><CheckCircle size={16} /> Milestone tracking</li>
                            <li><CheckCircle size={16} /> Team assignments</li>
                        </ul>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <DollarSign size={28} />
                        </div>
                        <h3 className="feature-title">Financial Dashboard</h3>
                        <p className="feature-description">
                            Track burn rate, runway, expenses, and MRR in real-time.
                            Make informed financial decisions with clarity.
                        </p>
                        <ul className="feature-list">
                            <li><CheckCircle size={16} /> Runway calculator</li>
                            <li><CheckCircle size={16} /> Expense tracking</li>
                            <li><CheckCircle size={16} /> Revenue analytics</li>
                        </ul>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <Users size={28} />
                        </div>
                        <h3 className="feature-title">Team Management</h3>
                        <p className="feature-description">
                            Role-based access, permissions, and collaboration tools.
                            Empower your team to move fast.
                        </p>
                        <ul className="feature-list">
                            <li><CheckCircle size={16} /> Role-based access</li>
                            <li><CheckCircle size={16} /> Activity tracking</li>
                            <li><CheckCircle size={16} /> Real-time updates</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section id="testimonials" className="testimonials-section">
                <div className="section-header">
                    <h2 className="section-title">Loved by Founders Worldwide</h2>
                    <p className="section-subtitle">Join hundreds of startups scaling with StartupOps</p>
                </div>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                        </div>
                        <p className="testimonial-text">
                            "StartupOps transformed how we validate features. We reduced our development
                            cycle by 40% by focusing on what users actually want."
                        </p>
                        <div className="testimonial-author">
                            <div className="author-avatar">SJ</div>
                            <div className="author-info">
                                <div className="author-name">Sarah Johnson</div>
                                <div className="author-role">Founder, TechFlow</div>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                        </div>
                        <p className="testimonial-text">
                            "The financial dashboard alone is worth it. We finally have clarity on our
                            runway and can make confident hiring decisions."
                        </p>
                        <div className="testimonial-author">
                            <div className="author-avatar">MK</div>
                            <div className="author-info">
                                <div className="author-name">Michael Kim</div>
                                <div className="author-role">CEO, DataSync</div>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                        </div>
                        <p className="testimonial-text">
                            "Best investment we made. Our team is aligned, productive, and we're
                            shipping faster than ever. Highly recommended!"
                        </p>
                        <div className="testimonial-author">
                            <div className="author-avatar">ER</div>
                            <div className="author-info">
                                <div className="author-name">Emily Rodriguez</div>
                                <div className="author-role">Co-founder, GrowthHub</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-number">500+</div>
                        <div className="stat-label">Startups</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">$2.5M+</div>
                        <div className="stat-label">Saved in Costs</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">40%</div>
                        <div className="stat-label">Faster Shipping</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">98%</div>
                        <div className="stat-label">Satisfaction</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Scale Your Startup?</h2>
                    <p className="cta-subtitle">
                        Join hundreds of founders using StartupOps to build better products faster.
                    </p>
                    <Link to="/signup" className="cta-button">
                        Start Your Free Trial
                        <ArrowRight size={20} />
                    </Link>
                    <p className="cta-notice">30-day free trial • No credit card required</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="brand-logo-landing">S</div>
                        <span className="brand-name">StartupOps</span>
                        <p className="footer-tagline">Empowering startups to scale faster</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Product</h4>
                            <a href="#features">Features</a>
                            <a href="#pricing">Pricing</a>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                        <div className="footer-column">
                            <h4>Company</h4>
                            <a href="#about">About</a>
                            <a href="#blog">Blog</a>
                            <a href="#careers">Careers</a>
                        </div>
                        <div className="footer-column">
                            <h4>Support</h4>
                            <a href="#help">Help Center</a>
                            <a href="#contact">Contact</a>
                            <a href="#docs">Documentation</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 StartupOps. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#privacy">Privacy</a>
                        <a href="#terms">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
