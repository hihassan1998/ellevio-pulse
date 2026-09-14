'use client';

import React, { useState } from 'react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!res.ok) throw new Error('AI Route Failed');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          assistantResponse += chunk;
          
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'assistant', content: assistantResponse };
            return updated;
          });
        }
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Ursäkta, jag kunde inte ansluta till AI-tjänsten just nu. Kontrollera att din OPENAI_API_KEY är inställd i .env.local.' }
      ]);
    } finally {
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
            <div className={`p-3.5 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-[#0b8454] text-white rounded-tr-none font-medium' : 'bg-white border border-[#e5e3e1] text-[#2c2827] rounded-tl-none shadow-xs'}`}>
              {m.content || <span className="animate-pulse">Tänker...</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form with Ellevio Primary Button */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="t.ex. Varför skiljer sig elpriset i SE1 och SE3?"
          className="flex-1 bg-white border border-[#757575] rounded-lg px-4 py-3 text-sm text-[#2c2827] focus:outline-none focus:border-[#0b8454]"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="btn-ellevio-primary flex items-center gap-2 disabled:opacity-50"
        >
          <span>Skicka</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
