'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/quote', label: 'Get Quote' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                    ? 'bg-[#051512]/95 backdrop-blur-md shadow-lg shadow-[#01b793]/5'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative w-10 h-10 transition-transform duration-500 group-hover:rotate-[360deg]">
                                <Image
                                    src="/logo.png"
                                    alt="Frieren Logo"
                                    fill
                                    className="object-contain rounded-full"
                                />
                            </div>
                            <span className="text-xl font-bold text-white hidden sm:block">
                                Frieren
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-4 py-2 text-[#afbfc1] hover:text-white transition-colors group"
                                >
                                    <span className="relative z-10">{link.label}</span>
                                    <motion.div
                                        className="absolute inset-0 bg-[#01b793]/10 rounded-lg opacity-0 group-hover:opacity-100"
                                        layoutId={`nav-bg-${link.href}`}
                                        transition={{ duration: 0.2 }}
                                    />
                                </Link>
                            ))}
                            <Link
                                href="/quote"
                                className="ml-4 px-6 py-2.5 bg-[#01b793] text-white font-medium rounded-lg hover:bg-[#00a583] transition-all hover:shadow-lg hover:shadow-[#01b793]/25 active:scale-95"
                            >
                                Start Project
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-[#afbfc1] hover:text-white"
                            aria-label="Toggle menu"
                        >
                            <motion.div
                                animate={isMobileMenuOpen ? 'open' : 'closed'}
                                className="w-6 h-5 flex flex-col justify-between"
                            >
                                <motion.span
                                    variants={{
                                        closed: { rotate: 0, y: 0 },
                                        open: { rotate: 45, y: 8 },
                                    }}
                                    className="block h-0.5 w-full bg-current origin-left"
                                />
                                <motion.span
                                    variants={{
                                        closed: { opacity: 1 },
                                        open: { opacity: 0 },
                                    }}
                                    className="block h-0.5 w-full bg-current"
                                />
                                <motion.span
                                    variants={{
                                        closed: { rotate: 0, y: 0 },
                                        open: { rotate: -45, y: -8 },
                                    }}
                                    className="block h-0.5 w-full bg-current origin-left"
                                />
                            </motion.div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-16 z-30 md:hidden"
                    >
                        <div className="bg-[#051512]/98 backdrop-blur-lg border-t border-[#01b793]/10 shadow-xl">
                            <div className="px-4 py-4 space-y-1">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-4 py-3 text-[#afbfc1] hover:text-white hover:bg-[#01b793]/10 rounded-lg transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navLinks.length * 0.1 }}
                                    className="pt-4"
                                >
                                    <Link
                                        href="/quote"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full px-4 py-3 bg-[#01b793] text-white text-center font-medium rounded-lg hover:bg-[#00a583] transition-colors"
                                    >
                                        Start Project
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
