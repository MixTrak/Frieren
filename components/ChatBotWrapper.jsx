'use client';

import dynamic from 'next/dynamic';

// Dynamically import ChatBot to prevent SSR issues
const ChatBot = dynamic(() => import('./ChatBot'), {
    ssr: false,
    loading: () => null
});

export default function ChatBotWrapper() {
    return <ChatBot />;
}
