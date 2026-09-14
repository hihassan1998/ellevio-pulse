'use client';

import React, { useState, useRef } from 'react';
import { Bot, Send, User, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistantWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hej! Jag är Ellevios AI-kundassistent. Har du frågor om elområden (SE1–SE4), elnätsavgifter eller hur du ansluter solceller till elnätet?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const isFetchingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();

    // Loop & Double-submit Guard: Block if empty, loading, or currently fetching
    if (!query || loading || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    const userMessage: Message = { role: 'user', content: query };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    // Timeout Guard: Abort request after 10 seconds to prevent hanging or infinite loops
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages.slice(-6) }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder('utf-8');
      let assistantText = '';

      // Append empty assistant message placeholder
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const textChunk = decoder.decode(value, { stream: true });
        assistantText += textChunk;

        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', content: assistantText };
          return next;
        });
      }
    } catch (err: any) {
      console.error('AI Chat Error:', err);
      const isAbort = err.name === 'AbortError';
      const errorMsg = isAbort 
        ? 'Förfrågan tog för lång tid. Vänligen försök igen.' 
        : 'Ursäkta, kunde inte ansluta till AI-tjänsten. Kontrollera att din OPENAI_API_KEY är inställd i .env.local.';

      setMessages(prev => {
        // If placeholder was added, update it; otherwise append
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.role === 'assistant' && lastMsg.content === '') {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', content: errorMsg };
          return next;
        }
        return [...prev, { role: 'assistant', content: errorMsg }];
      });
    } finally {
      clearTimeout(timeoutId);
      isFetchingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <div className="card-ellevio mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#e7f6f0] text-[#0b8454] p-2.5 rounded-lg border border-[#0b8454]/20">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#2c2827] flex items-center gap-2">
            AI Kundassistent <Sparkles className="w-4 h-4 text-[#f5a623] fill-current" />
          </h2>
          <p className="text-xs text-[#757575]">Drivs av OpenAI gpt-4o-mini – Ställ dina el- och nätfrågor på svenska</p>
        </div>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto space-y-3 p-4 bg-[#f2f1f0] rounded-lg mb-4 text-sm border border-[#e5e3e1]">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex items-start gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs text-white shrink-0 font-bold ${m.role === 'user' ? 'bg-[#2c2827]' : 'bg-[#0b8454]'}`}>
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`p-3.5 rounded-lg max-w-[80%] whitespace-pre-wrap leading-relaxed ${m.role === 'user' ? 'bg-[#0b8454] text-white rounded-tr-none font-medium' : 'bg-white border border-[#e5e3e1] text-[#2c2827] rounded-tl-none shadow-xs'}`}>
              {m.content || <span className="animate-pulse">Tänker...</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="t.ex. Varför skiljer sig elpriset i SE1 och SE3?"
          disabled={loading}
          className="flex-1 bg-white border border-[#757575] rounded-lg px-4 py-3 text-sm text-[#2c2827] focus:outline-none focus:border-[#0b8454] disabled:bg-gray-100"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="btn-ellevio-primary flex items-center gap-2 disabled:opacity-50"
        >
          <span>{loading ? 'Skickar...' : 'Skicka'}</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
