import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageSquare, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';

interface ConciergeChatProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ConciergeChat: React.FC<ConciergeChatProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', sender: 'AGENT', text: 'Welcome to Coshare Private Client Services. How can I assist you with your portfolio today?', timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'USER',
            text: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate Agent Response
        setTimeout(() => {
            setIsTyping(false);
            const responses = [
                "I've noted that request. A specialist will review your asset details shortly.",
                "Absolutely. I can arrange a viewing for that property tomorrow. Does 10 AM work?",
                "Your liquidity request is being processed. Expect an update within 24 hours.",
                "I have forwarded your inquiry to our automotive team."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            const newAgentMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: 'AGENT',
                text: randomResponse,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newAgentMsg]);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] md:z-[90] pointer-events-none flex items-end md:items-end justify-center md:justify-end p-4 md:p-6">
             {/* Chat Window */}
            <div className={`
                pointer-events-auto w-full md:w-[400px] bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col
                transition-all duration-500 ease-out origin-bottom-right
                ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10'}
                max-h-[80vh] md:max-h-[600px] h-[600px]
            `}>
                {/* Header */}
                <div className="bg-stone-900 text-white p-4 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                <Sparkles size={18} />
                            </div>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-stone-900 rounded-full"></div>
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-sm">Coshare Concierge</h3>
                            <p className="text-[10px] text-stone-400 uppercase tracking-wider">Typically replies in 2m</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`
                                max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                                ${msg.sender === 'USER' 
                                    ? 'bg-stone-900 text-white rounded-tr-none' 
                                    : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                                }
                            `}>
                                {msg.text}
                                <div className={`text-[9px] mt-2 uppercase tracking-widest opacity-50 ${msg.sender === 'USER' ? 'text-right' : 'text-left'}`}>
                                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-stone-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                                <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                                <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-stone-100 shrink-0">
                    <div className="relative flex items-center gap-2">
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your request..." 
                            className="w-full bg-stone-50 border border-stone-200 rounded-full py-3 pl-5 pr-12 text-sm focus:border-stone-900 focus:bg-white transition-all outline-none"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className="absolute right-1 top-1 p-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                    <div className="text-center mt-2">
                         <span className="text-[9px] text-stone-400 uppercase tracking-widest flex items-center justify-center gap-1">
                             <MessageSquare size={10} /> Private Client Encryption
                         </span>
                    </div>
                </div>
            </div>
        </div>
    );
};