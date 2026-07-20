import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

const quickPrompts = ['What services do you offer?', 'Show me your portfolio', 'How much does a project cost?', 'How can I contact you?'];
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-4o-mini';

function getLocalFallbackReply(input) {
  const text = input.toLowerCase();

  if (/hello|hi|hey|greetings|good morning|good afternoon|good evening/.test(text)) {
    return 'Hi there! I’m Qubriant Assistant. I can help with services, recent work, technology choices, and the best next step for your project.';
  }

  if (/service|services|what do you do|software|website|app|mobile|ai|automation|build|develop/.test(text)) {
    return 'We help businesses build polished digital products, including websites, software platforms, AI-assisted solutions, and modern product experiences.';
  }

  if (/portfolio|project|case study|work|example|recent/.test(text)) {
    return 'Our work includes product design, platform modernization, web experiences, and AI-enabled solutions for startups and growing teams.';
  }

  if (/cost|price|budget|quote|estimate|how much/.test(text)) {
    return 'Project costs depend on scope, timeline, and complexity. The best next step is usually a short discovery conversation so we can give a tailored estimate.';
  }

  if (/contact|reach|call|talk|consult|book|meeting/.test(text)) {
    return 'You can contact us through the contact page or WhatsApp, and we’re happy to arrange a consultation to understand your goals.';
  }

  if (/technology|stack|react|node|next|python|cloud|backend|frontend/.test(text)) {
    return 'We work with modern technologies like React, Next.js, Node.js, Python, cloud platforms, and AI tools based on your product needs.';
  }

  if (/thanks|thank you|bye|goodbye|that helps/.test(text)) {
    return 'You’re very welcome. If you want, I can also help you explore the right service or the next step for your idea.';
  }

  return 'I can help with our services, recent work, technology choices, pricing, and the best next step for your idea.';
}

async function getAssistantReply(input) {
  if (!OPENROUTER_API_KEY) {
    return getLocalFallbackReply(input);
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Qubriant Technologies Website',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are a warm, professional AI assistant for Qubriant Technologies. Help visitors with services, portfolio, pricing, and next steps. Keep replies concise, human, and helpful.',
          },
          { role: 'user', content: input },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('OpenRouter request failed');
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content?.trim() || 'I’m here to help with your questions about Qubriant Technologies.';
  } catch (error) {
    console.error('OpenRouter error:', error);
    return getLocalFallbackReply(input);
  }
}

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: 'Hi! I’m Qubriant Assistant. I can help you understand our services, past work, and the best next step for your project.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const userMessage = { id: Date.now(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const reply = await getAssistantReply(trimmed);
    setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', text: reply }]);
    setIsTyping(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend(input);
  };

  return (
    <div className="fixed bottom-5 left-5 right-5 z-50 sm:left-auto sm:right-5">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-2xl shadow-cyan-500/20 transition hover:scale-105"
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {isOpen && (
        <div className="mb-3 mx-auto w-[92vw] max-w-[92vw] sm:max-w-sm overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white">
                <img src="/ai-chatbot-pic.jpg" alt="Assistant" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Qubriant Assistant</p>
                <p className="text-xs text-slate-400">Online now</p>
              </div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[340px] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${message.role === 'user' ? 'bg-cyan-500/20 text-cyan-100' : 'bg-white/10 text-slate-200'}`}>
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm text-slate-300">Typing…</div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 bg-white/5 px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2 justify-center">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button type="submit" className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIChatbot;
