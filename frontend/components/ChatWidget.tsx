'use client';

import { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '@/lib/api';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let storedId = localStorage.getItem('chat_user_id');
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem('chat_user_id', storedId);
    }
    setUserId(storedId);
    
    // Initial bot message if opening for first time
    if (messages.length === 0) {
      setMessages([
        { role: 'bot', text: 'Hello! How can we help you? We offer AC Repair, Plumbing, and Cleaning services.' }
      ]);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#chat') {
        setIsOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Check initial hash on mount
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const handleOpenChatService = async (e: Event) => {
      const customEvent = e as CustomEvent<{ service: string }>;
      const service = customEvent.detail?.service;
      if (!service) return;

      // 1. Generate new session ID to reset backend state
      const newUserId = crypto.randomUUID();
      localStorage.setItem('chat_user_id', newUserId);
      setUserId(newUserId);
      
      // 2. Format user message for display
      const serviceNameFormatted = service === "ac_repair" 
        ? "AC Repair" 
        : service.charAt(0).toUpperCase() + service.slice(1);
      
      // 3. Open widget and show user message immediately
      setIsOpen(true);
      setMessages([{ role: 'user', text: serviceNameFormatted }]);
      setIsLoading(true);

      // 4. Send service intent to backend
      try {
        const reply = await sendChatMessage(newUserId, service);
        setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
      } catch (error) {
        setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, something went wrong. Please try again.' }]);
      } finally {
        setIsLoading(false);
      }
    };

    window.addEventListener('open-chat-service', handleOpenChatService);
    return () => {
      window.removeEventListener('open-chat-service', handleOpenChatService);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (window.location.hash === '#chat') {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !userId) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(userId, userMessage);
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[350px] h-[450px] bg-white border border-gray-200 shadow-xl rounded-lg flex flex-col overflow-hidden z-50">
          <div className="bg-primary text-white p-3 font-semibold flex justify-between items-center">
            <span>Chat Support</span>
            <button onClick={handleClose} className="text-xl">&times;</button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[80%] p-2 rounded-md ${msg.role === 'user' ? 'bg-primary text-white self-end rounded-br-none' : 'bg-gray-200 text-black self-start rounded-bl-none'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-200 text-black self-start p-2 rounded-md rounded-bl-none text-sm text-gray-500">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="border-t p-2 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-primary text-sm text-black"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary text-white px-3 py-1 rounded disabled:opacity-50 text-sm font-medium"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Floating Call Button */}
      <a
        href="tel:+920000000000"
        className="fixed bottom-4 right-20 bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl z-50 hover:scale-110 active:scale-95 transition-all duration-300"
        title="Call helpline"
      >
        📞
      </a>

      {/* Floating Chat Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-4 right-4 bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl z-50 hover:bg-teal-700 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        💬
      </button>
    </>
  );
}
