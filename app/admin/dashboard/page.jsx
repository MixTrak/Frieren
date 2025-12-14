'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Dynamic import for admin order table to reduce initial bundle
const AdminOrderTable = dynamic(() => import('@/components/AdminOrderTable'), {
    loading: () => (
        <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-[#01b793] border-t-transparent rounded-full" />
        </div>
    ),
});

export default function AdminDashboardPage() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a1f1c] via-[#051512] to-[#0a1f1c]">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#051512]/95 backdrop-blur-md border-b border-[#1a3a35]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/logo.png"
                                    alt="Frieren Logo"
                                    fill
                                    className="object-contain rounded-full"
                                />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">Frieren Admin</h1>
                                <p className="text-xs text-[#afbfc1]">Order Management</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-[#afbfc1] hover:text-white hover:bg-[#1a3a35] rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <AdminOrderTable />
                </motion.div>
            </main>
        </div>
    );
}
