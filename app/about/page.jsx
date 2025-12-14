'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import AnimatedSection from '@/components/AnimatedSection';

const values = [
    {
        title: 'Quality First',
        description: 'We never compromise on quality. Every line of code is written with care and attention to detail.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
    },
    {
        title: 'Client Focused',
        description: 'Your success is our success. We work closely with you to understand and exceed your expectations.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        title: 'Innovation',
        description: 'We stay ahead of the curve, using the latest technologies and design trends in every project.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
    },
    {
        title: 'Transparency',
        description: 'No hidden fees, no surprises. We believe in clear communication and honest pricing.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
    },
];

const process = [
    {
        step: '01',
        title: 'Discovery',
        description: 'We start by understanding your vision, goals, and requirements through detailed discussions.',
    },
    {
        step: '02',
        title: 'Design',
        description: 'Our designers create mockups and prototypes that align with your brand identity.',
    },
    {
        step: '03',
        title: 'Development',
        description: 'We build your website with clean, efficient code and modern technologies.',
    },
    {
        step: '04',
        title: 'Delivery',
        description: 'After thorough testing, we launch your website and provide ongoing support.',
    },
];

export default function AboutPage() {
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
                            About Frieren
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Crafting Digital Excellence
                        </h1>
                        <p className="text-[#afbfc1] max-w-2xl mx-auto text-lg">
                            We&apos;re a passionate team of developers and designers dedicated to creating
                            exceptional digital experiences that help businesses thrive online.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 px-4 bg-[#0a1f1c]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <AnimatedSection animation="fadeLeft">
                            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                            <p className="text-[#afbfc1] mb-4">
                                At Frieren, we believe every business deserves a website that truly represents
                                their brand and values. We&apos;re not just building websites – we&apos;re crafting
                                digital experiences that engage, inspire, and convert.
                            </p>
                            <p className="text-[#afbfc1] mb-4">
                                Our team combines technical expertise with creative vision to deliver solutions
                                that stand out in today&apos;s competitive digital landscape. From stunning animations
                                to secure admin panels, we handle every aspect of your web presence.
                            </p>
                            <p className="text-[#afbfc1]">
                                Whether you&apos;re a startup looking for your first website or an established
                                business ready for a redesign, we&apos;re here to bring your vision to life.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeRight" delay={0.2}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#051512] border border-[#1a3a35] rounded-2xl p-6 text-center">
                                    <div className="text-3xl font-bold text-[#01b793] mb-2">50+</div>
                                    <div className="text-[#afbfc1] text-sm">Projects Completed</div>
                                </div>
                                <div className="bg-[#051512] border border-[#1a3a35] rounded-2xl p-6 text-center">
                                    <div className="text-3xl font-bold text-[#01b793] mb-2">100%</div>
                                    <div className="text-[#afbfc1] text-sm">Client Satisfaction</div>
                                </div>
                                <div className="bg-[#051512] border border-[#1a3a35] rounded-2xl p-6 text-center">
                                    <div className="text-3xl font-bold text-[#01b793] mb-2">2+</div>
                                    <div className="text-[#afbfc1] text-sm">Years Experience</div>
                                </div>
                                <div className="bg-[#051512] border border-[#1a3a35] rounded-2xl p-6 text-center">
                                    <div className="text-3xl font-bold text-[#01b793] mb-2">24/7</div>
                                    <div className="text-[#afbfc1] text-sm">Support Available</div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
                        <p className="text-[#afbfc1] max-w-2xl mx-auto">
                            These core values guide everything we do
                        </p>
                    </AnimatedSection>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <AnimatedSection key={value.title} animation="fadeUp" delay={index * 0.1}>
                                <div className="h-full p-6 bg-[#0a1f1c] border border-[#1a3a35] rounded-2xl text-center">
                                    <div className="w-16 h-16 mx-auto bg-[#01b793]/10 rounded-xl flex items-center justify-center text-[#01b793] mb-4">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                                    <p className="text-[#afbfc1] text-sm">{value.description}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-16 px-4 bg-[#0a1f1c]">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Our Process</h2>
                        <p className="text-[#afbfc1] max-w-2xl mx-auto">
                            A streamlined workflow for successful project delivery
                        </p>
                    </AnimatedSection>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {process.map((step, index) => (
                            <AnimatedSection key={step.step} animation="fadeUp" delay={index * 0.1}>
                                <div className="relative h-full p-6 bg-[#051512] border border-[#1a3a35] rounded-2xl">
                                    <div className="text-5xl font-bold text-[#01b793]/20 mb-4">{step.step}</div>
                                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-[#afbfc1] text-sm">{step.description}</p>
                                    {index < process.length - 1 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#1a3a35]" />
                                    )}
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Work With Us?
                        </h2>
                        <p className="text-[#afbfc1] mb-8">
                            Let&apos;s discuss your project and create something amazing together.
                        </p>
                        <Link
                            href="/quote"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#01b793] text-white font-medium rounded-xl hover:bg-[#00a583] transition-all hover:shadow-lg hover:shadow-[#01b793]/25 active:scale-95"
                        >
                            Start Your Project
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
