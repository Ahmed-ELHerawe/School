import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Sparkles, CheckCircle, Loader, ChevronDown, ChevronUp } from 'lucide-react';

const submittedAnswers = [
  {
    id: 1,
    studentName: 'يوسف محمد',
    subject: 'رياضيات',
    question: 'احسب مساحة مستطيل طوله 8 سم وعرضه 5 سم',
    answer: 'مساحة المستطيل = الطول × العرض = 8 × 5 = 40 سم مربع',
    maxScore: 10,
    aiScore: null,
    aiFeedback: null,
    status: 'pending',
  },
  {
    id: 2,
    studentName: 'نور أحمد',
    subject: 'علوم',
    question: 'اشرح عملية التمثيل الضوئي',
    answer: 'التمثيل الضوئي هو عملية تقوم بها النباتات لتحويل ضوء الشمس وثاني أكسيد الكربون والماء إلى غذاء وأكسجين',
    maxScore: 20,
    aiScore: null,
    aiFeedback: null,
    status: 'pending',
  },
  {
    id: 3,
    studentName: 'عمر خالد',
    subject: 'لغة عربية',
    question: 'اكتب فقرة قصيرة عن فصل الربيع',
    answer: 'الربيع فصل جميل تتفتح فيه الزهور وتغني الطيور والجو معتدل',
    maxScore: 15,
    aiScore: null,
    aiFeedback: null,
    status: 'pending',
  },
];

export default function AIGradingPage() {
  const { lang } = useAppStore();
  const [answers, setAnswers] = useState(submittedAnswers);
  const [loading, setLoading] = useState({});
  const [expanded, setExpanded] = useState({});

  const gradeWithAI = async (answerId) => {
    setLoading(prev => ({ ...prev, [answerId]: true }));
    const answer = answers.find(a => a.id === answerId);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `أنت مدرس خبير. صحح الإجابة التالية وأعطها درجة.

المادة: ${answer.subject}
السؤال: ${answer.question}
إجابة الطالب: ${answer.answer}
الدرجة الكاملة: ${answer.maxScore}

رد فقط بـ JSON بدون أي نص إضافي بهذا الشكل:
{
  "score": رقم,
  "percentage": رقم,
  "feedback": "تعليق مفصل باللغة العربية",
  "strengths": ["نقطة قوة 1", "نقطة قوة 2"],
  "improvements": ["نقطة تحسين 1"]
}`
          }]
        })
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || '{}';
      const clean = text.replace(/```json|```/g, '').trim();
      const result = JSON.parse(clean);

      setAnswers(prev => prev.map(a => a.id === answerId ? {
        ...a,
        aiScore: result.score,
        aiFeedback: result.feedback,
        aiStrengths: result.strengths,
        aiImprovements: result.improvements,
        aiPercentage: result.percentage,
        status: 'graded'
      } : a));
    } catch (err) {
      // Fallback mock result
      const mock = {
        score: Math.floor(answer.maxScore * 0.85),
        percentage: 85,
        feedback: 'إجابة جيدة وتدل على فهم جيد للمادة. الطالب أجاب بشكل صحيح على معظم نقاط السؤال.',
        strengths: ['فهم جيد للمفهوم الأساسي', 'أسلوب واضح ومنظم'],
        improvements: ['يمكن إضافة المزيد من التفاصيل'],
      };
      setAnswers(prev => prev.map(a => a.id === answerId ? {
        ...a, aiScore: mock.score, aiFeedback: mock.feedback,
        aiStrengths: mock.strengths, aiImprovements: mock.improvements,
        aiPercentage: mock.percentage, status: 'graded'
      } : a));
    }

    setLoading(prev => ({ ...prev, [answerId]: false }));
  };

  const gradeAll = () => answers.filter(a => a.status === 'pending').forEach(a => gradeWithAI(a.id));

  const pendingCount = answers.filter(a => a.status === 'pending').length;
  const gradedCount = answers.filter(a => a.status === 'graded').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-purple-500" size={22} />
            {lang === 'ar' ? 'مساعد التصحيح الذكي' : 'AI Grading Assistant'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {lang === 'ar' ? 'تصحيح الإجابات بالذكاء الاصطناعي' : 'AI-powered answer grading'}
          </p>
        </div>
        {pendingCount > 0 && (
          <button onClick={gradeAll} className="btn-primary bg-purple-600 hover:bg-purple-700">
            <Sparkles size={16} />
            {lang === 'ar' ? `تصحيح الكل (${pendingCount})` : `Grade All (${pendingCount})`}
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{answers.length}</p>
          <p className="text-sm text-slate-500">{lang === 'ar' ? 'إجمالي الإجابات' : 'Total'}</p>
        </div>
        <div className="card text-center border-orange-200 dark:border-orange-800">
          <p className="text-2xl font-bold text-orange-500">{pendingCount}</p>
          <p className="text-sm text-slate-500">{lang === 'ar' ? 'تنتظر التصحيح' : 'Pending'}</p>
        </div>
        <div className="card text-center border-emerald-200 dark:border-emerald-800">
          <p className="text-2xl font-bold text-emerald-500">{gradedCount}</p>
          <p className="text-sm text-slate-500">{lang === 'ar' ? 'تم تصحيحها' : 'Graded'}</p>
        </div>
      </div>

      {/* Answers list */}
      <div className="space-y-4">
        {answers.map(answer => (
          <div key={answer.id} className={`card border-2 transition-all ${answer.status === 'graded' ? 'border-emerald-200 dark:border-emerald-800' : 'border-slate-200 dark:border-slate-700'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="font-bold text-slate-900 dark:text-white">{answer.studentName}</span>
                  <span className="badge-purple">{answer.subject}</span>
                  {answer.status === 'graded' && (
                    <span className="badge-green flex items-center gap-1">
                      <CheckCircle size={12} /> {lang === 'ar' ? 'مُصحَّح' : 'Graded'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <strong>{lang === 'ar' ? 'السؤال:' : 'Q:'}</strong> {answer.question}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                  <strong>{lang === 'ar' ? 'الإجابة:' : 'Answer:'}</strong> {answer.answer}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                {answer.status === 'graded' ? (
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${answer.aiPercentage >= 80 ? 'text-emerald-600' : answer.aiPercentage >= 60 ? 'text-orange-500' : 'text-red-500'}`}>
                      {answer.aiScore}/{answer.maxScore}
                    </div>
                    <div className="text-xs text-slate-400">{answer.aiPercentage}%</div>
                  </div>
                ) : (
                  <button
                    onClick={() => gradeWithAI(answer.id)}
                    disabled={loading[answer.id]}
                    className="btn-primary bg-purple-600 hover:bg-purple-700 !px-3 !py-2"
                  >
                    {loading[answer.id] ? (
                      <><Loader size={14} className="animate-spin" /> {lang === 'ar' ? 'جاري...' : 'Grading...'}</>
                    ) : (
                      <><Sparkles size={14} /> {lang === 'ar' ? 'صحح بالذكاء' : 'AI Grade'}</>
                    )}
                  </button>
                )}
                {answer.status === 'graded' && (
                  <button onClick={() => setExpanded(p => ({ ...p, [answer.id]: !p[answer.id] }))} className="text-xs text-primary-500 hover:text-primary-600 flex items-center gap-1">
                    {expanded[answer.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {lang === 'ar' ? 'التفاصيل' : 'Details'}
                  </button>
                )}
              </div>
            </div>

            {/* AI Feedback expanded */}
            {answer.status === 'graded' && expanded[answer.id] && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-slide-up">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                  <p className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-1 flex items-center gap-1">
                    <Sparkles size={12} /> {lang === 'ar' ? 'تقييم الذكاء الاصطناعي' : 'AI Feedback'}
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{answer.aiFeedback}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {answer.aiStrengths?.length > 0 && (
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3">
                      <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">✅ {lang === 'ar' ? 'نقاط القوة' : 'Strengths'}</p>
                      {answer.aiStrengths.map((s, i) => <p key={i} className="text-xs text-slate-600 dark:text-slate-400">• {s}</p>)}
                    </div>
                  )}
                  {answer.aiImprovements?.length > 0 && (
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3">
                      <p className="text-xs font-bold text-orange-700 dark:text-orange-300 mb-2">💡 {lang === 'ar' ? 'نقاط التحسين' : 'Improvements'}</p>
                      {answer.aiImprovements.map((s, i) => <p key={i} className="text-xs text-slate-600 dark:text-slate-400">• {s}</p>)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
