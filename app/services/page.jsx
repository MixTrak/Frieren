'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import AnimatedSection from '@/components/AnimatedSection';
import { PRICING } from '@/lib/validation';

const pricingTiers = {
    frontend: [
        {
            tier: 'modern',
            name: 'Modern Website',
            price: PRICING.frontend.modern,
            features: [
                'Clean, responsive design',
                'Mobile-first approach',
                'SEO optimized',
                'Fast loading performance',
                'Contact form integration',
            ],
        },
        {
            tier: 'animations',
            name: 'Animations + Custom Theme',
            price: PRICING.frontend.animations,
            popular: true,
            features: [
                'Everything in Modern',
                'Scroll-triggered animations',
                'Custom color scheme',
                'Micro-interactions',
                'Page transitions',
                'Parallax effects',
            ],
        },
        {
            tier: 'everything',
            name: 'Everything + 1 Revision',
            price: PRICING.frontend.everything,
            features: [
                'Everything in Animations',
                'One free revision round',
                'Priority support',
                'Source files included',
                'Extended documentation',
                '30-day bug support',
            ],
        },
    ],
    backend: [
        {
            tier: 'modern',
            name: 'Modern Admin Panel',
            price: PRICING.backend.modern,
            features: [
                'Clean dashboard UI',
                'Data management tools',
                'Role-based access',
                'Secure authentication',
                'Export functionality',
            ],
        },
        {
            tier: 'premium',
            name: 'Premium Admin Experience',
            price: PRICING.backend.premium,
            features: [
                'Everything in Modern',
                'Animated interface',
                'Custom theme matching',
                'Advanced analytics',
                'One revision round',
                'API documentation',
            ],
        },
    ],
    addons: [
        {
            name: 'User Management',
            price: PRICING.mongodb.user,
            description: 'Complete signup/login system with sessions',
        },
        {
            name: 'GridFS',
            price: PRICING.mongodb.gridfs,
            description: 'Image upload and storage in MongoDB',
        },
        {
            name: 'Combo Pack',
            price: PRICING.mongodb.combo,
            description: 'User + GridFS bundle (Save ₹500)',
            highlight: true,
        },
        {
            name: 'Uropay Integration',
            price: PRICING.uropay,
            description: 'Payment gateway (max 200/month)',
        },
    ],
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-[#051512]">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-block px-4 py-2 bg-[#01b793]/10 border border-[#01b793]/30 rounded-full text-[#01b793] text-sm font-medium mb-6">
                            Transparent Pricing
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Services & Pricing
                        </h1>
                        <p className="text-[#afbfc1] max-w-2xl mx-auto">
                            Choose the perfect package for your needs. All prices are one-time payments
                            with no hidden fees.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Frontend Packages */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-2">Frontend Packages</h2>
                        <p className="text-[#afbfc1]">Beautiful, responsive websites for your brand</p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-6">
                        {pricingTiers.frontend.map((tier, index) => (
                            <AnimatedSection key={tier.tier} animation="fadeUp" delay={index * 0.1}>
                                <div
                                    className={`relative h-full p-6 rounded-2xl border ${tier.popular
                                            ? 'bg-gradient-to-b from-[#01b793]/10 to-transparent border-[#01b793]'
                                            : 'bg-[#0a1f1c] border-[#1a3a35]'
                                        }`}
                                >
                                    {tier.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#01b793] text-white text-xs font-medium rounded-full">
                                            Most Popular
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold text-[#01b793]">₹{tier.price.toLocaleString()}</span>
                                    </div>
                                    <ul className="space-y-3 mb-6">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2 text-[#afbfc1] text-sm">
                                                <svg className="w-5 h-5 text-[#01b793] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/quote"
                                        className={`block w-full py-3 rounded-xl font-medium text-center transition-all ${tier.popular
                                                ? 'bg-[#01b793] text-white hover:bg-[#00a583]'
                                                : 'border-2 border-[#1a3a35] text-[#afbfc1] hover:border-[#01b793] hover:text-white'
                                            }`}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Backend Packages */}
            <section className="py-16 px-4 bg-[#0a1f1c]">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-2">Backend / Admin Panel</h2>
                        <p className="text-[#afbfc1]">Powerful tools to manage your website</p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {pricingTiers.backend.map((tier, index) => (
                            <AnimatedSection key={tier.tier} animation="fadeUp" delay={index * 0.1}>
                                <div className="h-full p-6 bg-[#051512] border border-[#1a3a35] rounded-2xl">
                                    <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold text-[#01b793]">₹{tier.price.toLocaleString()}</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2 text-[#afbfc1] text-sm">
                                                <svg className="w-5 h-5 text-[#01b793] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Add-ons */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-2">Add-ons</h2>
                        <p className="text-[#afbfc1]">Enhance your website with additional features</p>
                    </AnimatedSection>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pricingTiers.addons.map((addon, index) => (
                            <AnimatedSection key={addon.name} animation="fadeUp" delay={index * 0.1}>
                                <div
                                    className={`h-full p-6 rounded-2xl border ${addon.highlight
                                            ? 'bg-gradient-to-b from-[#01b793]/10 to-transparent border-[#01b793]'
                                            : 'bg-[#0a1f1c] border-[#1a3a35]'
                                        }`}
                                >
                                    {addon.highlight && (
                                        <span className="inline-block px-2 py-1 bg-[#01b793] text-white text-xs font-medium rounded mb-3">
                                            Best Value
                                        </span>
                                    )}
                                    <h3 className="text-lg font-bold text-white mb-2">{addon.name}</h3>
                                    <p className="text-[#afbfc1] text-sm mb-4">{addon.description}</p>
                                    <div className="text-2xl font-bold text-[#01b793]">₹{addon.price.toLocaleString()}</div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 bg-[#0a1f1c]">
                <div className="max-w-3xl mx-auto text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-[#afbfc1] mb-8">
                            Use our interactive pricing form to build your custom package and get an instant quote.
                        </p>
                        <Link
                            href="/quote"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#01b793] text-white font-medium rounded-xl hover:bg-[#00a583] transition-all hover:shadow-lg hover:shadow-[#01b793]/25 active:scale-95"
                        >
                            Build Your Package
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-[#051512] border-t border-[#1a3a35]">
                <div className="max-w-7xl mx-auto px-4 text-center text-[#afbfc1] text-sm">
                    © {new Date().getFullYear()} Frieren. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
