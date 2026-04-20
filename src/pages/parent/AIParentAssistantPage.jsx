import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Send, Bot, User, RefreshCw, TrendingUp } from 'lucide-react';

const SUGGESTED_PARENT = [
  { ar: 'كيف أداء ابني الدراسي هذا الشهر؟', en: "How is my child's performance this month?" },
  { ar: 'هل نسبة حضور ابني كويسة؟', en: "Is my child's attendance good?" },
  { ar: 'ايه المواد اللي محتاج تحسين؟', en: 'Which subjects need improvement?' },
  { ar: 'هل في واجبات متأخرة؟', en: 'Are there any overdue homeworks?' },
  { ar: 'ايه المصاريف المتبقية؟', en: 'What are the remaining fees?' },
  { ar: 'ازاي أساعد ابني في المذاكرة؟', en: 'How can I help my child study?' },
];

export default function AIParentAssistantPage() {
  const { lang, students, homeworks, absenceRequests } = useAppStore();
  const student = students.find(s => s.id === 1);
  const studentHomeworks = homeworks.filter(h => h.class === student?.grade);
  const pendingHW = studentHomeworks.filter(h => h.status === 'pending').length;

  const studentContext = student ? `
بيانات الطالب:
- الاسم: ${student.name}
- الصف: ${student.grade}
- المعدل الدراسي: ${student.gpa}%
- نسبة الحضور: ${student.attendance}%
- عدد الغيابات: ${student.absences} يوم
- واجبات معلقة: ${pendingHW}
- المصاريف المدفوعة: ${student.fees.paid.toLocaleString()} جنيه
- المصاريف المتبقية: ${student.fees.due.toLocaleString()} جنيه
- الكتب: ${student.books?.join(', ')}
` : '';

  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: lang === 'ar'
      ? `👋 أهلاً! أنا مساعدك الذكي لمتابعة أداء ابنك **${student?.name}**.\n\nيمكنك سؤالي عن أي شيء يخص دراسته، حضوره، واجباته، أو المصاريف وسأجيبك فوراً! 📊`
      : `👋 Hello! I'm your AI assistant for tracking **${student?.nameEn}**'s progress.\n\nAsk me anything about grades, attendance, homework, or fees! 📊`
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 800,
          system: `أنت مساعد ذكي لولي أمر طالب في مدرسة مصرية. 
${studentContext}
أجب على أسئلة ولي الأمر بناءً على هذه البيانات.
كن ودوداً ومشجعاً. قدم نصائح عملية للمساعدة في تحسين أداء الطالب.
اكتب باللغة العربية. لا تزيد عن 150 كلمة.`,
          messages: [...messages, { role: 'user', content: msg }]
        })
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || 'عذراً، حدث خطأ.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      // Fallback smart responses
      let reply = '';
      const q = msg.toLowerCase();
      if (q.includes('أداء') || q.includes('معدل') || q.includes('درجات')) {
        reply = `📊 **أداء ${student?.name}:**\n\nالمعدل الدراسي الحالي **${student?.gpa}%** وهو ${student?.gpa >= 85 ? '✅ ممتاز! استمر على هذا المستوى' : student?.gpa >= 70 ? '👍 جيد، مع القليل من الجهد هيتحسن أكثر' : '⚠️ يحتاج اهتمام أكثر في المذاكرة'}.\n\nنصيحة: خصص ساعة يومياً للمراجعة مع ابنك 📚`;
      } else if (q.includes('حضور') || q.includes('غياب')) {
        reply = `📅 **الحضور:**\n\nنسبة حضور ${student?.name} هي **${student?.attendance}%** وعدد الغيابات **${student?.absences} يوم**.\n\n${student?.attendance >= 90 ? '✅ ممتاز! حضور منتظم جداً' : '⚠️ تحتاج متابعة، الحد الأدنى المطلوب 80%'}`;
      } else if (q.includes('واجب') || q.includes('مهام')) {
        reply = `📝 **الواجبات:**\n\nفي **${pendingHW} واجب** معلق لم يُسلَّم بعد.\n\n${pendingHW > 0 ? '⚠️ يرجى التأكد من إنجاز الواجبات في مواعيدها لأنها تؤثر على الدرجات.' : '✅ ممتاز! كل الواجبات مسلمة.'}`;
      } else if (q.includes('مصاريف') || q.includes('رسوم')) {
        reply = `💳 **المصاريف:**\n\nالمدفوع: **${student?.fees.paid.toLocaleString()} جنيه**\nالمتبقي: **${student?.fees.due.toLocaleString()} جنيه**\n\n${student?.fees.due === 0 ? '✅ تم سداد كامل المصاريف!' : '⚠️ يرجى سداد المبلغ المتبقي في أقرب وقت.'}`;
      } else {
        reply = `💡 يمكنك سؤالي عن:\n- الأداء الدراسي والمعدل\n- الحضور والغيابات\n- الواجبات المعلقة\n- المصاريف\n- نصائح للمذاكرة`;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bot className="text-pink-500" size={22} />
            {lang === 'ar' ? 'المساعد الذكي لولي الأمر' : 'AI Parent Assistant'}
          </h1>
          <p className="text-sm text-slate-500">{lang === 'ar' ? `متابعة أداء ${student?.name}` : `Track ${student?.nameEn}'s progress`}</p>
        </div>
        <button onClick={() => setMessages([{ role: 'assistant', content: lang === 'ar' ? '👋 محادثة جديدة!' : '👋 New chat!' }])} className="btn-secondary !px-2.5 !py-2">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Quick stats bar */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { label: lang === 'ar' ? 'المعدل' : 'GPA', value: `${student?.gpa}%`, color: 'text-emerald-600' },
          { label: lang === 'ar' ? 'الحضور' : 'Attend.', value: `${student?.attendance}%`, color: 'text-blue-600' },
          { label: lang === 'ar' ? 'الغياب' : 'Absent', value: student?.absences, color: 'text-red-500' },
          { label: lang === 'ar' ? 'واجبات' : 'HW Due', value: pendingHW, color: 'text-orange-500' },
        ].map((item, i) => (
          <div key={i} className="card py-3 text-center">
            <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-gradient-to-br from-pink-500 to-rose-600' : 'bg-primary-600'}`}>
              {msg.role === 'assistant' ? <Bot size={18} className="text-white" /> : <User size={18} className="text-white" />}
            </div>
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === 'assistant'
                ? 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                : 'bg-primary-600 text-white rounded-tr-sm'
            }`}>{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                {[0, 150, 300].map(d => <div key={d} className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTED_PARENT.map((s, i) => (
            <button key={i} onClick={() => sendMessage(lang === 'ar' ? s.ar : s.en)}
              className="text-xs bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 px-3 py-1.5 rounded-full hover:bg-pink-100 transition-colors">
              {lang === 'ar' ? s.ar : s.en}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
          className="input-field flex-1" placeholder={lang === 'ar' ? 'اسأل عن أداء ابنك...' : "Ask about your child's progress..."} disabled={loading} />
        <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="btn-primary !px-4 bg-pink-600 hover:bg-pink-700 disabled:opacity-50">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
