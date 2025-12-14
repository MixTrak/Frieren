'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onLoadComplete }) {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Track actual resource loading
        const trackLoading = async () => {
            // Simulate minimum loading time for brand impression
            const minLoadTime = 1500;
            const startTime = Date.now();

            // Track document ready state
            if (document.readyState === 'complete') {
                setProgress(100);
            } else {
                // Progressive loading simulation with actual checks
                const progressSteps = [
                    { delay: 200, target: 25 },
                    { delay: 400, target: 50 },
                    { delay: 600, target: 75 },
                ];

                for (const step of progressSteps) {
                    await new Promise((r) => setTimeout(r, step.delay));
                    setProgress(step.target);
                }

                // Wait for document to be ready
                await new Promise((resolve) => {
                    if (document.readyState === 'complete') {
                        resolve();
                    } else {
                        window.addEventListener('load', resolve);
                    }
                });

                setProgress(100);
            }

            // Ensure minimum load time for branding
            const elapsed = Date.now() - startTime;
            if (elapsed < minLoadTime) {
                await new Promise((r) => setTimeout(r, minLoadTime - elapsed));
            }

            setIsComplete(true);
            setTimeout(() => {
                onLoadComplete?.();
            }, 500);
        };

        trackLoading();
    }, [onLoadComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1f1c] via-[#051512] to-[#0a1f1c]"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `radial-gradient(circle at 2px 2px, #01b793 1px, transparent 0)`,
                                backgroundSize: '40px 40px',
                            }}
                        />
                    </div>

                    {/* Logo & Branding */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        {/* Logo Icon */}
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'easeInOut'
                            }}
                            className="mb-6"
                        >
                            <div className="relative w-24 h-24">
                                <Image
                                    src="/logo.png"
                                    alt="Frieren Logo"
                                    fill
                                    className="object-contain rounded-full"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Brand Name */}
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-4xl md:text-5xl font-bold text-white tracking-wide mb-2"
                        >
                            Frieren
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="text-[#afbfc1] text-lg mb-12"
                        >
                            Crafting Digital Excellence
                        </motion.p>

                        {/* Loading Bar Container */}
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: '200px' }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="relative h-1 bg-[#1a3a35] rounded-full overflow-hidden"
                        >
                            {/* Loading Bar Progress */}
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#01b793] to-[#03ddb0] rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            />

                            {/* Shimmer Effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }}
                            />
                        </motion.div>

                        {/* Progress Text */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-4 text-sm text-[#afbfc1] tabular-nums"
                        >
                            {progress}%
                        </motion.span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
