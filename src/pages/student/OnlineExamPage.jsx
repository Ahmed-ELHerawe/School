import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Clock, CheckCircle, AlertTriangle, Trophy } from 'lucide-react';

const examQuestions = [
  { id: 1, question: 'كم ناتج 8 × 7 ؟', questionEn: 'What is 8 × 7?', options: ['48', '54', '56', '64'], correct: 2, points: 5 },
  { id: 2, question: 'ما هي عاصمة مصر؟', questionEn: 'What is the capital of Egypt?', options: ['الإسكندرية', 'القاهرة', 'الجيزة', 'الأقصر'], correct: 1, points: 5 },
  { id: 3, question: 'كم عدد أضلاع المثلث؟', questionEn: 'How many sides does a triangle have?', options: ['2', '3', '4', '5'], correct: 1, points: 5 },
  { id: 4, question: 'ما هو ناتج 100 ÷ 4 ؟', questionEn: 'What is 100 ÷ 4?', options: ['20', '25', '30', '40'], correct: 1, points: 5 },
  { id: 5, question: 'أي من التالي يمثل كسراً صحيحاً؟', questionEn: 'Which is a proper fraction?', options: ['5/3', '7/4', '3/5', '9/2'], correct: 2, points: 5 },
  { id: 6, question: 'ما هو الجذر التربيعي لـ 81؟', questionEn: 'What is the square root of 81?', options: ['7', '8', '9', '10'], correct: 2, points: 5 },
  { id: 7, question: 'كم يساوي 15% من 200؟', questionEn: 'What is 15% of 200?', options: ['20', '25', '30', '35'], correct: 2, points: 5 },
  { id: 8, question: 'أي الأشكال التالية لها 4 أضلاع متساوية؟', questionEn: 'Which shape has 4 equal sides?', options: ['المستطيل', 'المثلث', 'المربع', 'الدائرة'], correct: 2, points: 5 },
  { id: 9, question: 'ما ناتج 3³؟', questionEn: 'What is 3³?', options: ['9', '18', '27', '81'], correct: 2, points: 5 },
  { id: 10, question: 'أي العمليات تُنفَّذ أولاً في المعادلة؟', questionEn: 'Which operation is performed first?', options: ['الجمع', 'الضرب', 'الطرح', 'القسمة'], correct: 1, points: 10 },
];

const EXAM_DURATION = 15 * 60; // 15 minutes

export default function OnlineExamPage() {
  const { lang } = useAppStore();
  const [phase, setPhase] = useState('intro'); // intro | exam | result
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [timer, setTimer] = useState(null);
  const [current, setCurrent] = useState(0);

  const startExam = () => {
    setPhase('exam');
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(t); submitExam(); return 0; }
        return prev - 1;
      });
    }, 1000);
    setTimer(t);
  };

  const selectAnswer = (qId, optIdx) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const submitExam = () => {
    if (timer) clearInterval(timer);
    setPhase('result');
  };

  const score = examQuestions.reduce((sum, q) => answers[q.id] === q.correct ? sum + q.points : sum, 0);
  const totalPoints = examQuestions.reduce((s, q) => s + q.points, 0);
  const pct = Math.round((score / totalPoints) * 100);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const timeColor = timeLeft < 120 ? 'text-red-500' : timeLeft < 300 ? 'text-orange-500' : 'text-emerald-600';

  // Intro screen
  if (phase === 'intro') return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="card text-center py-10">
        <div className="text-6xl mb-4">📝</div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{lang === 'ar' ? 'امتحان الرياضيات' : 'Mathematics Exam'}</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">{lang === 'ar' ? 'الثالث أ - الفصل الدراسي الثاني' : 'Grade 3A - Semester 2'}</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: '❓', label: lang === 'ar' ? 'عدد الأسئلة' : 'Questions', value: examQuestions.length },
            { icon: '⏱️', label: lang === 'ar' ? 'الوقت' : 'Time', value: '15 دقيقة' },
            { icon: '🏆', label: lang === 'ar' ? 'الدرجة الكاملة' : 'Total', value: `${totalPoints} درجة` },
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="font-bold text-slate-900 dark:text-white">{item.value}</p>
              <p className="text-xs text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 text-start">
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-300 mb-2">⚠️ {lang === 'ar' ? 'تعليمات مهمة:' : 'Important Instructions:'}</p>
          <ul className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
            <li>• {lang === 'ar' ? 'اختر إجابة واحدة فقط لكل سؤال' : 'Choose only one answer per question'}</li>
            <li>• {lang === 'ar' ? 'لا يمكنك الرجوع لتغيير الإجابة' : 'You cannot go back to change answers'}</li>
            <li>• {lang === 'ar' ? 'سيُسلَّم الامتحان تلقائياً عند انتهاء الوقت' : 'Exam auto-submits when time runs out'}</li>
          </ul>
        </div>
        <button onClick={startExam} className="btn-primary w-full justify-center py-3 text-base">
          🚀 {lang === 'ar' ? 'ابدأ الامتحان' : 'Start Exam'}
        </button>
      </div>
    </div>
  );

  // Result screen
  if (phase === 'result') return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="card text-center py-8 mb-5">
        <div className={`text-6xl mb-3`}>{pct >= 90 ? '🏆' : pct >= 75 ? '🎉' : pct >= 60 ? '👍' : '📚'}</div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{lang === 'ar' ? 'انتهى الامتحان!' : 'Exam Complete!'}</h2>
        <div className={`text-5xl font-bold my-4 ${pct >= 90 ? 'text-emerald-500' : pct >= 75 ? 'text-blue-500' : pct >= 60 ? 'text-orange-500' : 'text-red-500'}`}>
          {score}/{totalPoints}
        </div>
        <div className="w-40 h-40 mx-auto relative mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
            <circle cx="50" cy="50" r="40" fill="none" strokeWidth="10"
              stroke={pct >= 90 ? '#10b981' : pct >= 75 ? '#3b82f6' : pct >= 60 ? '#f97316' : '#ef4444'}
              strokeDasharray={`${2.51 * pct} 251`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{pct}%</span>
          </div>
        </div>
        <p className={`font-bold text-lg ${pct >= 90 ? 'text-emerald-600' : pct >= 75 ? 'text-blue-600' : pct >= 60 ? 'text-orange-500' : 'text-red-500'}`}>
          {pct >= 90 ? (lang === 'ar' ? '🌟 ممتاز!' : '🌟 Excellent!') : pct >= 75 ? (lang === 'ar' ? '👏 جيد جداً!' : '👏 Very Good!') : pct >= 60 ? (lang === 'ar' ? '👍 جيد' : '👍 Good') : (lang === 'ar' ? '📚 تحتاج مراجعة' : '📚 Needs Review')}
        </p>
      </div>

      {/* Answer review */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'مراجعة الإجابات' : 'Answer Review'}</h3>
        {examQuestions.map((q, i) => {
          const userAns = answers[q.id];
          const isCorrect = userAns === q.correct;
          return (
            <div key={q.id} className={`card border-2 ${isCorrect ? 'border-emerald-200 dark:border-emerald-800' : 'border-red-200 dark:border-red-800'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-red-100 dark:bg-red-900/30 text-red-500'}`}>
                  {isCorrect ? '✓' : '✗'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">{lang === 'ar' ? q.question : q.questionEn}</p>
                  <div className="grid grid-cols-2 gap-1">
                    {q.options.map((opt, j) => (
                      <div key={j} className={`text-xs px-2 py-1 rounded-lg ${j === q.correct ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 font-bold' : j === userAns && !isCorrect ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-500'}`}>
                        {j === q.correct ? '✓ ' : j === userAns && !isCorrect ? '✗ ' : ''}{opt}
                      </div>
                    ))}
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500">{isCorrect ? q.points : 0}/{q.points}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Exam screen
  const q = examQuestions[current];
  const answered = Object.keys(answers).length;
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm text-slate-500">{lang === 'ar' ? `سؤال ${current + 1} من ${examQuestions.length}` : `Question ${current + 1} of ${examQuestions.length}`}</p>
          <div className="w-48 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-1">
            <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${((current + 1) / examQuestions.length) * 100}%` }} />
          </div>
        </div>
        <div className={`flex items-center gap-2 font-mono font-bold text-xl ${timeColor}`}>
          <Clock size={20} /> {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question */}
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="badge-blue">Q{current + 1}</span>
          <span className="badge-green">{q.points} {lang === 'ar' ? 'درجة' : 'pts'}</span>
        </div>
        <p className="text-lg font-semibold text-slate-900 dark:text-white mb-6 leading-relaxed">
          {lang === 'ar' ? q.question : q.questionEn}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => selectAnswer(q.id, i)}
              className={`p-4 rounded-xl border-2 text-sm font-medium text-start transition-all ${answers[q.id] === i ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 text-slate-700 dark:text-slate-300'}`}>
              <span className="font-bold me-2 text-slate-400">{['أ','ب','ج','د'][i]}.</span> {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrent(p => Math.max(0, p - 1))} disabled={current === 0} className="btn-secondary disabled:opacity-40">
          ← {lang === 'ar' ? 'السابق' : 'Previous'}
        </button>
        <span className="text-xs text-slate-400">{answered}/{examQuestions.length} {lang === 'ar' ? 'تم الإجابة' : 'answered'}</span>
        {current < examQuestions.length - 1 ? (
          <button onClick={() => setCurrent(p => p + 1)} className="btn-primary">
            {lang === 'ar' ? 'التالي' : 'Next'} →
          </button>
        ) : (
          <button onClick={submitExam} className="btn-primary bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle size={16} /> {lang === 'ar' ? 'تسليم الامتحان' : 'Submit Exam'}
          </button>
        )}
      </div>

      {/* Questions overview */}
      <div className="mt-5 card">
        <p className="text-xs font-semibold text-slate-500 mb-2">{lang === 'ar' ? 'ملخص الأسئلة' : 'Questions Overview'}</p>
        <div className="flex flex-wrap gap-1.5">
          {examQuestions.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${i === current ? 'bg-primary-600 text-white' : answers[examQuestions[i].id] !== undefined ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
