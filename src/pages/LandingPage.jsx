import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart3, Users, DollarSign, Zap, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import '../landing.css'; // Import Antigravity Theme

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const LandingPage = () => {
    return (
        <div className="landing-page">
            <ParticleBackground />

            {/* Navigation Header */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="landing-nav"
            >
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
            </motion.nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-glow"></div>

                <motion.div
                    className="hero-content"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp} className="hero-badge">
                        <Zap size={16} fill="currentColor" />
                        <span>Trusted by 500+ Startups</span>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="hero-title">
                        Your All-in-One
                        <br />
                        <span className="gradient-text"> Startup Command Center</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="hero-subtitle">
                        Manage validation, roadmaps, finances, and teams in one beautiful platform.
                        Make data-driven decisions and scale faster without the chaos.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="hero-cta">
                        <Link to="/signup" className="cta-primary">
                            Start Free Trial
                            <ArrowRight size={20} />
                        </Link>
                        <Link to="/login" className="cta-secondary">
                            View Demo
                        </Link>
                    </motion.div>

                    <motion.p variants={fadeInUp} className="hero-notice">
                        <CheckCircle size={14} className="text-green-500" />
                        No credit card required • Free 30-day trial
                    </motion.p>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="section-title">Everything You Need to Scale</h2>
                    <p className="section-subtitle">Powerful features designed for founders, by founders. Replace multiple disjointed tools with one cohesive operating system.</p>
                </motion.div>

                <div className="features-container">
                    {/* Feature 1: Product Roadmap (Right Visual) */}
                    <FeatureRow
                        icon={<TrendingUp size={24} />}
                        title="Product Roadmap"
                        description="Visual kanban boards, milestone tracking, and team collaboration. Keep everyone aligned on what matters most."
                        features={["Drag-and-drop tasks", "Milestone tracking", "Team assignments"]}
                        imageSide="right"
                        visual={
                            <div className="mockup-kanban" style={{ display: 'flex', gap: '0.75rem', height: '100%', alignItems: 'stretch' }}>
                                {/* To Do Column */}
                                <div style={{ flex: 1, background: '#f1f5f9', borderRadius: '8px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', marginBottom: '0.25rem' }}>TO DO</div>
                                    <div style={{ background: 'white', padding: '0.75rem', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: '0.8rem', fontWeight: '500', color: '#334155' }}>
                                        Mobile App MVP
                                        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.25rem' }}>
                                            <div style={{ width: '20px', height: '4px', background: '#ef4444', borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                    <div style={{ background: 'white', padding: '0.75rem', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: '0.8rem', fontWeight: '500', color: '#334155' }}>
                                        Q3 Hiring Plan
                                        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.25rem' }}>
                                            <div style={{ width: '20px', height: '4px', background: '#3b82f6', borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                </div>
                                {/* In Progress Column */}
                                <div style={{ flex: 1, background: '#f1f5f9', borderRadius: '8px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', marginBottom: '0.25rem' }}>IN PROGRESS</div>
                                    <div style={{ background: 'white', padding: '0.75rem', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: '0.8rem', fontWeight: '500', color: '#334155' }}>
                                        Stripe Integration
                                        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.25rem' }}>
                                            <div style={{ width: '20px', height: '4px', background: '#f59e0b', borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                    <div style={{ opacity: 0.5, background: 'white', height: '40px', borderRadius: '6px', border: '1px dashed #cbd5e1' }}></div>
                                </div>
                                {/* Done Column */}
                                <div style={{ flex: 1, background: '#f1f5f9', borderRadius: '8px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', marginBottom: '0.25rem' }}>DONE</div>
                                    <div style={{ background: 'white', padding: '0.75rem', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: '0.8rem', fontWeight: '500', color: '#334155', textDecoration: 'line-through', color: '#94a3b8' }}>
                                        User Auth
                                    </div>
                                    <div style={{ background: 'white', padding: '0.75rem', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: '0.8rem', fontWeight: '500', color: '#334155', textDecoration: 'line-through', color: '#94a3b8' }}>
                                        Landing Page
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    {/* Feature 2: Financial Dashboard (Left Visual) */}
                    <FeatureRow
                        icon={<DollarSign size={24} />}
                        title="Financial Dashboard"
                        description="Track burn rate, runway, expenses, and MRR in real-time. Make informed financial decisions with total clarity."
                        features={["Runway calculator", "Expense tracking", "Revenue analytics"]}
                        imageSide="left"
                        visual={
                            <div className="mockup-chart" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '2rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Total MRR</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>$12,450</div>
                                        <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><TrendingUp size={12} /> +15%</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Burn Rate</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>$4,200</div>
                                        <div style={{ fontSize: '0.75rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}> ↓ -5%</div>
                                    </div>
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                                    {[30, 45, 35, 60, 50, 75, 65, 80].map((h, i) => (
                                        <div key={i} style={{
                                            flex: 1,
                                            height: `${h}%`,
                                            background: i >= 5 ? 'var(--accent-primary)' : '#e2e8f0',
                                            borderRadius: '4px 4px 0 0',
                                            transition: 'height 1s'
                                        }}></div>
                                    ))}
                                </div>
                            </div>
                        }
                    />

                    {/* Feature 3: Team Management (Right Visual) */}
                    <FeatureRow
                        icon={<Users size={24} />}
                        title="Team Management"
                        description="Role-based access, permissions, and collaboration tools. Empower your team to move fast without breaking things."
                        features={["Role-based access", "Activity tracking", "Real-time updates"]}
                        imageSide="right"
                        visual={
                            <div className="mockup-list" style={{ display: 'flex', flexDirection: 'column' }}>
                                {[
                                    { name: 'Sarah Chen', role: 'Product Owner', status: 'Online', color: '#bfdbfe' },
                                    { name: 'Mike Ross', role: 'Developer', status: 'In Meeting', color: '#fca5a5' },
                                    { name: 'Alex Kim', role: 'Designer', status: 'Offline', color: '#dcfce7' },
                                    { name: 'Emily Davis', role: 'Marketing', status: 'Online', color: '#fde047' }
                                ].map((user, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: user.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>{user.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.role}</div>
                                        </div>
                                        <div style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', background: user.status === 'Online' ? '#dcfce7' : '#f1f5f9', color: user.status === 'Online' ? '#166534' : '#64748b', fontSize: '0.7rem', fontWeight: '500' }}>
                                            {user.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    />

                    {/* Feature 4: Validation Engine (Left Visual) */}
                    <FeatureRow
                        icon={<BarChart3 size={24} />}
                        title="Validation Engine"
                        description="Get real-time customer insights, sentiment analysis, and AI-powered recommendations to validate your product decisions."
                        features={["Sentiment tracking", "Feedback loop automation", "Smart recommendations"]}
                        imageSide="left"
                        visual={
                            <div className="mockup-code" style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#64748b' }}>
                                <div style={{ color: '#ec4899', marginBottom: '0.5rem' }}>import <span style={{ color: '#0f172a' }}>{'{ Analyze }'}</span> from <span style={{ color: '#2563eb' }}>'ai-core'</span>;</div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <span style={{ color: '#7c3aed' }}>const</span> insights = <span style={{ color: '#7c3aed' }}>await</span> Analyze.sentiment({'{'}
                                    <br />&nbsp;&nbsp;source: <span style={{ color: '#2563eb' }}>'user-feedback'</span>,
                                    <br />&nbsp;&nbsp;confidence: <span style={{ color: '#2563eb' }}>0.98</span>
                                    <br />{'}'});
                                </div>
                                <div style={{ padding: '0.5rem', background: '#f0fdf4', borderRadius: '4px', borderLeft: '3px solid #10b981', color: '#15803d' }}>
                                    // Analysis Complete<br />
                                    // Sentiment: Positive (98%)
                                </div>
                            </div>
                        }
                    />
                </div>
            </section>

            {/* Social Proof Section */}
            <section id="testimonials" className="testimonials-section">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="section-title">Loved by Founders Worldwide</h2>
                    <p className="section-subtitle">Join hundreds of startups scaling faster and smarter with StartupOps.</p>
                </motion.div>

                <div className="testimonials-grid">
                    <TestimonialCard
                        quote="StartupOps transformed how we validate features. We reduced our development cycle by 40% by focusing on what users actually want."
                        author="Sarah Johnson"
                        role="Founder, TechFlow"
                        initials="SJ"
                    />
                    <TestimonialCard
                        quote="The financial dashboard alone is worth it. We finally have clarity on our runway and can make confident hiring decisions."
                        author="Michael Kim"
                        role="CEO, DataSync"
                        initials="MK"
                    />
                    <TestimonialCard
                        quote="Best investment we made. Our team is aligned, productive, and we're shipping faster than ever. Highly recommended!"
                        author="Emily Rodriguez"
                        role="Co-founder, GrowthHub"
                        initials="ER"
                    />
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-grid">
                    <StatItem number="500+" label="Startups" />
                    <StatItem number="$2.5M+" label="Saved in Costs" />
                    <StatItem number="40%" label="Faster Shipping" />
                    <StatItem number="99.9%" label="Uptime" />
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="pricing-section">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="section-title">Simple, Transparent Pricing</h2>
                    <p className="section-subtitle">Start for free, scale as you grow. No hidden fees.</p>
                </motion.div>

                <div className="pricing-grid">
                    {/* Starter Plan */}
                    <motion.div
                        className="pricing-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div>
                            <h3 className="plan-name">Starter</h3>
                            <div className="plan-price">$0</div>
                            <p className="plan-description">For early-stage founders</p>
                        </div>
                        <ul className="pricing-features">
                            <li className="pricing-feature"><CheckCircle size={18} /> 1 User</li>
                            <li className="pricing-feature"><CheckCircle size={18} /> Basic Validation Tools</li>
                            <li className="pricing-feature"><CheckCircle size={18} /> 3 Active Projects</li>
                            <li className="pricing-feature"><CheckCircle size={18} /> Community Support</li>
                        </ul>
                        <motion.button
                            className="pricing-btn outline"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Get Started
                        </motion.button>
                    </motion.div>

                    {/* Pro Plan */}
                    <motion.div
                        className="pricing-card popular"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="popular-badge">POPULAR</div>
                        <div>
                            <h3 className="plan-name">Pro</h3>
                            <div className="plan-price">$29<span className="plan-period">/mo</span></div>
                            <p className="plan-description">For growing startups</p>
                        </div>
                        <ul className="pricing-features">
                            <li className="pricing-feature"><CheckCircle size={18} /> Up to 5 Users</li>
                            <li className="pricing-feature"><CheckCircle size={18} /> Advanced Financial Modeling</li>
                            <li className="pricing-feature"><CheckCircle size={18} /> Unlimited Projects</li>
                            <li className="pricing-feature"><CheckCircle size={18} /> Priority Support</li>
                            <li className="pricing-feature"><CheckCircle size={18} /> AI Insights</li>
                        </ul>
                        <motion.button
                            className="pricing-btn primary"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Start Free Trial
                        </motion.button>
                    </motion.div>

                    {/* Enterprise Plan */}
                    <motion.div
                        className="pricing-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div>
                            <h3 className="plan-name">Enterprise</h3>
                            <div className="plan-price">Custom</div>
                            <p className="plan-description">For scaling teams</p>
                        </div>
                        <ul className="pricing-features">
                            <li className="pricing-feature"><CheckCircle size={18} /> Unlimited Users</li>
                            <li className="pricing-feature"><CheckCircle size={18} /> Custom Integrations</li>
                            <li className="pricing-feature"><CheckCircle size={18} /> Dedicated Account Manager</li>
                            <li className="pricing-feature"><CheckCircle size={18} /> 24/7 Phone Support</li>
                        </ul>
                        <motion.button
                            className="pricing-btn secondary"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Contact Sales
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <motion.div
                    className="cta-content"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="cta-title">Ready to Scale Your Startup?</h2>
                    <p className="cta-subtitle">
                        Join hundreds of founders using StartupOps to build better products faster.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/signup" className="cta-button">
                            Start Your Free Trial
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                    <p className="cta-notice">30-day free trial • No credit card required</p>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="landing-logo">
                            <div className="brand-logo-landing">S</div>
                            <span className="brand-name">StartupOps</span>
                        </div>
                        <p className="footer-tagline">Empowering startups to scale faster</p>
                    </div>
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
                <div className="footer-bottom">
                    <p>&copy; 2026 StartupOps. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#privacy">Privacy</a>
                        <a href="#terms">Terms</a>
                        <a href="#twitter">Twitter</a>
                        <a href="#linkedin">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Helper Components
const FeatureRow = ({ icon, title, description, features, imageSide = 'right', visual }) => (
    <div className={`feature-row ${imageSide === 'left' ? 'reverse' : ''}`}>
        <motion.div
            className="feature-text-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageSide === 'left' ? slideInRight : slideInLeft}
        >
            <div className="feature-row-icon">
                {icon}
            </div>
            <h3 className="feature-row-title">{title}</h3>
            <p className="feature-row-desc">{description}</p>
            <ul className="feature-row-list">
                {features.map((feature, index) => (
                    <li key={index}><CheckCircle size={18} /> {feature}</li>
                ))}
            </ul>
        </motion.div>
        <motion.div
            className="feature-visual-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageSide === 'left' ? slideInLeft : slideInRight}
        >
            <div className="glow-effect"></div>
            <div className="mockup-window">
                <div className="window-header">
                    <div className="window-dots">
                        <div className="window-dot dot-red"></div>
                        <div className="window-dot dot-yellow"></div>
                        <div className="window-dot dot-green"></div>
                    </div>
                    <div className="window-address">startupops.app</div>
                </div>
                <div className="window-content">
                    {visual}
                </div>
            </div>
        </motion.div>
    </div>
);

const TestimonialCard = ({ quote, author, role, initials }) => (
    <motion.div
        className="testimonial-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
    >
        <div className="testimonial-stars">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
            ))}
        </div>
        <p className="testimonial-text">"{quote}"</p>
        <div className="testimonial-author">
            <div className="author-avatar">{initials}</div>
            <div className="author-info">
                <div className="author-name">{author}</div>
                <div className="author-role">{role}</div>
            </div>
        </div>
    </motion.div>
);

const StatItem = ({ number, label }) => (
    <motion.div
        className="stat-item"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
    >
        <div className="stat-number">{number}</div>
        <div className="stat-label">{label}</div>
    </motion.div>
);

export default LandingPage;
