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

            {/* Pricing Section */}
            <section id="pricing" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-800">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Start for free, scale as you grow. No hidden fees.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Starter Plan */}
                        <motion.div
                            className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-800">Starter</h3>
                                <div className="text-4xl font-bold mt-4 mb-2">$0</div>
                                <p className="text-slate-500">For early-stage founders</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle size={18} className="text-blue-500" /> 1 User</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle size={18} className="text-blue-500" /> Basic Validation Tools</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle size={18} className="text-blue-500" /> 3 Active Projects</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle size={18} className="text-blue-500" /> Community Support</li>
                            </ul>
                            <motion.button
                                className="w-full py-3 px-6 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Get Started
                            </motion.button>
                        </motion.div>

                        {/* Pro Plan */}
                        <motion.div
                            className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden transform md:-translate-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-purple-500 text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                            <div className="mb-6">
                                <h3 className="text-xl font-bold">Pro</h3>
                                <div className="text-4xl font-bold mt-4 mb-2">$29<span className="text-lg text-slate-400 font-normal">/mo</span></div>
                                <p className="text-slate-400">For growing startups</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-300"><CheckCircle size={18} className="text-blue-400" /> Up to 5 Users</li>
                                <li className="flex items-center gap-3 text-slate-300"><CheckCircle size={18} className="text-blue-400" /> Advanced Financial Modeling</li>
                                <li className="flex items-center gap-3 text-slate-300"><CheckCircle size={18} className="text-blue-400" /> Unlimited Projects</li>
                                <li className="flex items-center gap-3 text-slate-300"><CheckCircle size={18} className="text-blue-400" /> Priority Support</li>
                                <li className="flex items-center gap-3 text-slate-300"><CheckCircle size={18} className="text-blue-400" /> AI Insights</li>
                            </ul>
                            <motion.button
                                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Start Free Trial
                            </motion.button>
                        </motion.div>

                        {/* Enterprise Plan */}
                        <motion.div
                            className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-800">Enterprise</h3>
                                <div className="text-4xl font-bold mt-4 mb-2">Custom</div>
                                <p className="text-slate-500">For scaling teams</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle size={18} className="text-blue-500" /> Unlimited Users</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle size={18} className="text-blue-500" /> Custom Integrations</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle size={18} className="text-blue-500" /> Dedicated Account Manager</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle size={18} className="text-blue-500" /> 24/7 Phone Support</li>
                            </ul>
                            <motion.button
                                className="w-full py-3 px-6 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Contact Sales
                            </motion.button>
                        </motion.div>
                    </div>
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
