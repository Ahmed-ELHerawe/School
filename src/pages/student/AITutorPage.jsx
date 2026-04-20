import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Send, Bot, User, Sparkles, BookOpen, RefreshCw } from 'lucide-react';

const SUGGESTED = [
  { ar: 'اشرحلي قانون نيوتن الثاني', en: 'Explain Newton\'s second law' },
  { ar: 'ما هي عملية التمثيل الضوئي؟', en: 'What is photosynthesis?' },
  { ar: 'كيف أحل مسائل الكسور؟', en: 'How do I solve fraction problems?' },
  { ar: 'ما الفرق بين الاسم والفعل؟', en: 'What\'s the difference between a noun and verb?' },
  { ar: 'اشرحلي الضرب المتقاطع', en: 'Explain cross multiplication' },
  { ar: 'ما هي عناصر القصة؟', en: 'What are story elements?' },
];

export default function AITutorPage() {
  const { lang, currentUser } = useAppStore();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: lang === 'ar'
        ? '👋 مرحباً! أنا مساعدك الذكي للتعلم. يمكنك سؤالي في أي مادة دراسية وسأشرح لك بأسلوب بسيط وواضح. ما الذي تريد تعلمه اليوم؟'
        : '👋 Hello! I\'m your AI learning assistant. Ask me anything about your subjects and I\'ll explain it simply. What would you like to learn today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('all');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const subjects = [
    { value: 'all', ar: 'كل المواد', en: 'All Subjects' },
    { value: 'math', ar: 'رياضيات', en: 'Math' },
    { value: 'science', ar: 'علوم', en: 'Science' },
    { value: 'arabic', ar: 'عربي', en: 'Arabic' },
    { value: 'english', ar: 'إنجليزي', en: 'English' },
  ];

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);

    try {
      const subjectCtx = subject !== 'all' ? `المادة المختارة: ${subjects.find(s => s.value === subject)?.[lang === 'ar' ? 'ar' : 'en']}. ` : '';
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `أنت مساعد تعليمي ذكي لطلاب المرحلة الابتدائية والإعدادية في مصر. ${subjectCtx}
اشرح المفاهيم بأسلوب بسيط وممتع مناسب للأطفال. استخدم أمثلة من الحياة اليومية المصرية. 
استخدم الإيموجي لتجميل الشرح. اكتب باللغة العربية دائماً ما لم يسألك الطالب بالإنجليزية.
لا تزيد عن 200 كلمة في الإجابة. نهاية كل إجابة اسأل سؤالاً واحداً للتأكد من الفهم.`,
          messages: [...messages, { role: 'user', content: msg }]
        })
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || (lang === 'ar' ? 'عذراً، حدث خطأ. حاول مرة أخرى.' : 'Sorry, an error occurred. Please try again.');
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      const fallbackMsg = lang === 'ar'
        ? '🔢 مثال على الكسور:\n\nالكسر هو جزء من الكل!\nتخيل بيتزا مقسمة لـ 4 أجزاء 🍕\nلو أكلت جزء واحد = أكلت 1/4 من البيتزا\n\nهل فهمت؟ ما هو 2/4 من البيتزا؟ 🤔'
        : 'Sorry, an error occurred. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackMsg }]);
    }
    setLoading(false);
  };

  const clearChat = () => setMessages([{
    role: 'assistant',
    content: lang === 'ar' ? '👋 محادثة جديدة! ما الذي تريد تعلمه؟' : '👋 New chat! What would you like to learn?'
  }]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bot className="text-purple-500" size={22} />
            {lang === 'ar' ? 'مساعد التعلم الذكي' : 'AI Learning Tutor'}
          </h1>
          <p className="text-sm text-slate-500">{lang === 'ar' ? 'اسأل في أي مادة وسأشرح لك' : 'Ask me anything about your subjects'}</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={subject} onChange={e => setSubject(e.target.value)} className="input-field w-auto text-sm">
            {subjects.map(s => <option key={s.value} value={s.value}>{lang === 'ar' ? s.ar : s.en}</option>)}
          </select>
          <button onClick={clearChat} className="btn-secondary !px-2.5 !py-2" title={lang === 'ar' ? 'محادثة جديدة' : 'New chat'}>
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-1">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-gradient-to-br from-purple-500 to-violet-600' : 'bg-primary-600'}`}>
              {msg.role === 'assistant' ? <Bot size={18} className="text-white" /> : <User size={18} className="text-white" />}
            </div>
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === 'assistant'
                ? 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                : 'bg-primary-600 text-white rounded-tr-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTED.map((s, i) => (
            <button key={i} onClick={() => sendMessage(lang === 'ar' ? s.ar : s.en)}
              className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 px-3 py-1.5 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors">
              {lang === 'ar' ? s.ar : s.en}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          className="input-field flex-1"
          placeholder={lang === 'ar' ? 'اسأل سؤالك هنا...' : 'Ask your question here...'}
          disabled={loading}
        />
        <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="btn-primary !px-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
