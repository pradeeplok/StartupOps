import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart3, Users, DollarSign, Zap, TrendingUp, Shield, Globe, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

                {/* Hero Visual Removed */}
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

                <motion.div
                    className="features-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <FeatureCard
                        icon={<BarChart3 size={28} />}
                        title="Validation Engine"
                        description="Get real-time customer insights, sentiment analysis, and AI-powered recommendations to validate your product decisions."
                        features={["Sentiment tracking", "Feedback loop automation", "Smart recommendations"]}
                    />

                    <FeatureCard
                        icon={<TrendingUp size={28} />}
                        title="Product Roadmap"
                        description="Visual kanban boards, milestone tracking, and team collaboration. Keep everyone aligned on what matters most."
                        features={["Drag-and-drop tasks", "Milestone tracking", "Team assignments"]}
                    />

                    <FeatureCard
                        icon={<DollarSign size={28} />}
                        title="Financial Dashboard"
                        description="Track burn rate, runway, expenses, and MRR in real-time. Make informed financial decisions with total clarity."
                        features={["Runway calculator", "Expense tracking", "Revenue analytics"]}
                    />

                    <FeatureCard
                        icon={<Users size={28} />}
                        title="Team Management"
                        description="Role-based access, permissions, and collaboration tools. Empower your team to move fast without breaking things."
                        features={["Role-based access", "Activity tracking", "Real-time updates"]}
                    />
                </motion.div>
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
const FeatureCard = ({ icon, title, description, features }) => (
    <motion.div
        className="feature-card"
        variants={fadeInUp}
    >
        <div className="feature-icon">
            {icon}
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
        <ul className="feature-list">
            {features.map((feature, index) => (
                <li key={index}><CheckCircle size={16} /> {feature}</li>
            ))}
        </ul>
    </motion.div>
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
