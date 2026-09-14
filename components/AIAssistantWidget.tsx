'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, X, Headset, ChevronDown, Lock } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isHumanOperator?: boolean;
}

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [tooltipMessageIndex, setTooltipMessageIndex] = useState(0);
  const [isHumanMode, setIsHumanMode] = useState(false);
  const [showBankIdModal, setShowBankIdModal] = useState(false);

  const tooltipPrompts = [
    "Behöver du hjälp med något? Fråga mig!",
    "Fråga om elområden, solceller eller fakturor 💡",
    "Undrar du vad strömavbrott eller elnät innebär?",
    "Få snabba svar dygnet runt – prova AI-assistenten!"
  ];

  const aiWelcomeMessage: Message = {
    role: 'assistant',
    content: '🤖 Hej! Jag är Ellevios AI-kundassistent. Vad kan jag hjälpa dig med idag? Ställ din fråga om elområden (SE1–SE4), elnätsavgifter eller solceller.'
  };

  const humanWelcomeMessage: Message = {
    role: 'assistant',
    isHumanOperator: true,
    content: '👋 Hej! Jag heter Maria och är kundtjänstoperatör på Ellevio. Du har nu kopplats till mänsklig betjäning. Vad kan jag hjälpa dig med i ditt ärende?'
  };

  const [messages, setMessages] = useState<Message[]>([aiWelcomeMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const isFetchingRef = useRef(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Clean Mode Toggle: Replaces or updates the welcome message without piling them up in a stack
  const handleToggleMode = () => {
    const nextMode = !isHumanMode;
    setIsHumanMode(nextMode);

    setMessages(prev => {
      // 1. If only initial welcome message exists, swap it cleanly
      if (prev.length <= 1) {
        return [nextMode ? humanWelcomeMessage : aiWelcomeMessage];
      }

      // 2. If the last message is an un-replied welcome message, replace it instead of stacking
      const lastMsg = prev[prev.length - 1];
      if (lastMsg.role === 'assistant' && (lastMsg.content.includes('🤖 Hej!') || lastMsg.content.includes('👋 Hej!'))) {
        const updated = [...prev];
        updated[updated.length - 1] = nextMode ? humanWelcomeMessage : aiWelcomeMessage;
        return updated;
      }

      // 3. Otherwise append single mode welcome notice
      return [...prev, nextMode ? humanWelcomeMessage : aiWelcomeMessage];
    });
  };

  // Looping Tooltip Popup Loop (every 10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setTooltipMessageIndex((prev) => (prev + 1) % tooltipPrompts.length);
        setShowTooltip(true);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();

    if (!query || loading || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    const userMessage: Message = { role: 'user', content: query };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    // If in Human Operator Mode
    if (isHumanMode) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            isHumanOperator: true,
            content: '🎧 [Mänsklig Operatör - Maria på Ellevio]: Tack för ditt meddelande! Jag granskar ditt ärende just nu. (Demonstrerar Human-in-the-Loop överlämning & dataloggning för Ellevio webbstrategi).'
          }
        ]);
        setLoading(false);
        isFetchingRef.current = false;
      }, 1000);
      return;
    }

    // Timeout Guard: Abort request after 10 seconds
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
    <>
      {/* 1. BankID Demo Modal */}
      {showBankIdModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full p-6 rounded-2xl shadow-2xl border border-[#e5e3e1] relative animate-in fade-in zoom-in-95 duration-150 text-center">
            <button 
              onClick={() => setShowBankIdModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-blue-50 text-[#005A9C] rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-base text-[#2c2827] mb-2">
              BankID-Identifiering (Demo)
            </h3>
            
            <p className="text-xs text-[#757575] leading-relaxed mb-4">
              BankID-inloggning är avstängd i detta demoprojekt och visas endast i uppvisningssyfte för att visa hur legitimering kan integreras i Ellevios kundchatt.
            </p>

            <button 
              onClick={() => setShowBankIdModal(false)}
              className="w-full bg-[#0b8454] hover:bg-[#0f5a46] text-white font-semibold text-xs py-2.5 rounded-lg transition-colors"
            >
              Stäng fönster
            </button>
          </div>
        </div>
      )}

      {/* 2. Looping Tooltip Speech Bubble */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50 max-w-[260px] bg-[#2c2827] text-white text-xs p-3 rounded-2xl shadow-xl border border-[#0b8454] animate-bounce flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#f5a623] shrink-0" />
            <span className="font-medium">{tooltipPrompts[tooltipMessageIndex]}</span>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-white shrink-0 ml-1"
            title="Stäng meddelande"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. Floating Trigger Icon Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`fixed bottom-6 right-6 z-50 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-105 border-2 border-white flex items-center justify-center group ${isHumanMode ? 'bg-[#2c2827]' : 'bg-[#0b8454] hover:bg-[#0f5a46]'}`}
        aria-label="Öppna Kundassistent"
      >
        {isOpen ? (
          <ChevronDown className="w-7 h-7" />
        ) : (
          <div className="relative">
            {isHumanMode ? <Headset className="w-7 h-7" /> : <Bot className="w-7 h-7" />}
            <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${isHumanMode ? 'bg-emerald-400' : 'bg-[#f5a623]'}`} />
          </div>
        )}
      </button>

      {/* 4. Floating Openable Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[520px] max-w-[calc(100vw-2rem)] z-50 bg-white rounded-2xl shadow-2xl border border-[#e5e3e1] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Dynamic Header */}
          <div className={`p-4 text-white flex items-center justify-between shadow-xs transition-colors ${isHumanMode ? 'bg-[#2c2827]' : 'bg-[#0b8454]'}`}>
            <div className="flex items-center gap-2.5">
              <div className="bg-white/20 p-2 rounded-lg">
                {isHumanMode ? <Headset className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  {isHumanMode ? 'Ellevio Kundtjänst' : 'Ellevio AI-Kundassistent'}
                  {!isHumanMode && <Sparkles className="w-3.5 h-3.5 text-[#f5a623] fill-current" />}
                </h3>
                <p className="text-[11px] text-emerald-100 font-normal flex items-center gap-1">
                  {isHumanMode ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      <span className="font-semibold text-white">🟢 Ansluten till Mänsklig Operatör</span>
                    </>
                  ) : (
                    <span>🤖 AI-assistent (gpt-4o-mini)</span>
                  )}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white p-1 rounded-lg hover:bg-white/10"
              aria-label="Stäng chatt"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Bar: BankID & Mode Switcher */}
          <div className="bg-[#e7f6f0] px-3 py-2 border-b border-[#0b8454]/20 flex items-center justify-between text-xs">
            {/* BankID Button */}
            <button 
              onClick={() => setShowBankIdModal(true)}
              className="inline-flex items-center gap-1 bg-white text-[#2c2827] px-2.5 py-1 rounded-md border border-[#e5e3e1] font-semibold text-[11px] hover:bg-gray-50 transition-colors"
            >
              <Lock className="w-3 h-3 text-[#0b8454]" />
              <span>Legitimera med BankID</span>
            </button>

            {/* Human vs AI Switcher Button */}
            <button 
              onClick={handleToggleMode}
              className="inline-flex items-center gap-1 text-[#0b8454] font-bold hover:underline text-[11px]"
            >
              {isHumanMode ? <Bot className="w-3.5 h-3.5" /> : <Headset className="w-3.5 h-3.5" />}
              <span>{isHumanMode ? 'Byt till AI' : 'Byt till Mänsklig Kontakt'}</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f2f1f0] text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex items-start gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white shrink-0 font-bold ${m.role === 'user' ? 'bg-[#2c2827]' : m.isHumanOperator ? 'bg-[#2c2827]' : 'bg-[#0b8454]'}`}>
                  {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : m.isHumanOperator ? <Headset className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`p-3 rounded-xl max-w-[82%] whitespace-pre-wrap leading-relaxed ${m.role === 'user' ? 'bg-[#0b8454] text-white rounded-tr-none font-medium' : m.isHumanOperator ? 'bg-white border-2 border-[#2c2827] text-[#2c2827] rounded-tl-none shadow-xs font-medium' : 'bg-white border border-[#e5e3e1] text-[#2c2827] rounded-tl-none shadow-xs'}`}>
                  {m.content || <span className="animate-pulse">Tänker...</span>}
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-[#e5e3e1] flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isHumanMode ? "Skriv till mänsklig operatör (Maria)..." : "Fråga om elområden, solceller..."}
              disabled={loading}
              className="flex-1 bg-gray-50 border border-[#e5e3e1] rounded-lg px-3 py-2 text-xs text-[#2c2827] focus:outline-none focus:border-[#0b8454] disabled:bg-gray-100"
            />
            <button 
              type="submit" 
              disabled={loading}
              className={`text-white p-2.5 rounded-lg text-xs font-semibold flex items-center justify-center disabled:opacity-50 transition-colors ${isHumanMode ? 'bg-[#2c2827] hover:bg-black' : 'bg-[#0b8454] hover:bg-[#0f5a46]'}`}
              aria-label="Skicka meddelande"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
