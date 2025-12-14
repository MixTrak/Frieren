'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizonal, MessageCircle, X } from 'lucide-react';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });
            const data = await res.json();
            setMessages(prev => [
                ...prev,
                { role: 'bot', content: data.reply || '⚠️ No response from server.' },
            ]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [
                ...prev,
                { role: 'bot', content: '⚠️ Error connecting to server.' },
            ]);
        }
        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#01b793] rounded-full flex items-center justify-center shadow-lg shadow-[#01b793]/25 hover:bg-[#00a583] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle chat"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageCircle className="w-6 h-6 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[380px] h-[450px] bg-gradient-to-b from-[#0a1f1c] to-[#051512] border border-[#1a3a35] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-4 py-3 bg-[#01b793] flex items-center gap-3">
                            <div className="w-8 h-8 relative rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                    src="/logo.png"
                                    alt="Frieren Logo"
                                    width={32}
                                    height={32}
                                    className="object-cover rounded-full"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Frieren Assistant</h3>
                                <p className="text-xs text-white/80">Ask me anything</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2 text-sm scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {messages.length === 0 && (
                                <div className="text-center text-[#afbfc1]/70 py-8">
                                    <p className="text-lg mb-2">👋</p>
                                    <p>Hi! How can I help you today?</p>
                                    <p className="text-xs mt-1">Ask about our services, pricing, or anything else!</p>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`px-3 py-2 rounded-xl max-w-[85%] break-words ${msg.role === 'user'
                                        ? 'ml-auto bg-[#01b793] text-white rounded-br-md'
                                        : 'mr-auto bg-[#1a3a35] text-white rounded-bl-md'
                                        }`}
                                >
                                    {msg.content}
                                </motion.div>
                            ))}

                            {loading && (
                                <div className="mr-auto px-3 py-2 rounded-xl bg-[#1a3a35] text-[#afbfc1] text-xs">
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-[#01b793] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-[#01b793] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-[#01b793] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-[#1a3a35] flex items-center gap-2 bg-[#051512]">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                placeholder="Type a message..."
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={loading}
                                className="flex-1 rounded-xl bg-[#0a1f1c] border border-[#1a3a35] px-3 py-2 text-sm text-white placeholder-[#afbfc1]/50 focus:outline-none focus:border-[#01b793] disabled:opacity-50"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="p-2.5 rounded-xl bg-[#01b793] hover:bg-[#00a583] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <SendHorizonal size={18} className="text-white" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
