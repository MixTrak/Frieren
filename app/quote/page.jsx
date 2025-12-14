'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import PricingForm from '@/components/PricingForm';

export default function QuotePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a1f1c] via-[#051512] to-[#0a1f1c]">
            <Navbar />

            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #01b793 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="relative z-10 pt-32 pb-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-2 bg-[#01b793]/10 border border-[#01b793]/30 rounded-full text-[#01b793] text-sm font-medium mb-6">
                            Get Your Custom Quote
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Build Your Package
                        </h1>
                        <p className="text-[#afbfc1] max-w-xl mx-auto">
                            Select the services you need and get an instant price estimate.
                            No hidden fees, just transparent pricing.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#0a1f1c] border border-[#1a3a35] rounded-3xl p-6 sm:p-8"
                    >
                        <PricingForm />
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 flex flex-wrap justify-center gap-6 text-[#afbfc1] text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#01b793]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Secure Process
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#01b793]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            24h Response Time
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#01b793]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            No Hidden Fees
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
