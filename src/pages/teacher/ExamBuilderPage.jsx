import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Plus, Trash2, Save, FileText, CheckSquare, AlignLeft, Circle, GripVertical } from 'lucide-react';

const Q_TYPES = [
  { key: 'mcq',       icon: <Circle size={14} />,       label: 'اختيار من متعدد', labelEn: 'MCQ' },
  { key: 'truefalse', icon: <CheckSquare size={14} />,   label: 'صح / خطأ',        labelEn: 'True / False' },
  { key: 'essay',     icon: <AlignLeft size={14} />,     label: 'مقالي',            labelEn: 'Essay' },
];

const newQ = (type) => ({
  id: Date.now() + Math.random(),
  type, text: '', marks: 2,
  options: type === 'mcq' ? ['', '', '', ''] : [],
  correct: type === 'truefalse' ? 'true' : null,
  answer: '',
});

export default function ExamBuilderPage() {
  const { lang, t, addExam, showToast, getSchoolStudents } = useAppStore();
  const students = getSchoolStudents();
  const grades   = [...new Set(students.map(s => s.grade))];

  const [meta, setMeta]       = useState({ title: '', subject: '', class: '', date: '', time: '', duration: 60 });
  const [questions, setQs]    = useState([]);
  const [saved, setSaved]     = useState(false);

  const addQuestion = (type) => setQs(qs => [...qs, newQ(type)]);

  const updateQ = (id, field, value) =>
    setQs(qs => qs.map(q => q.id === id ? { ...q, [field]: value } : q));

  const updateOption = (id, idx, value) =>
    setQs(qs => qs.map(q => q.id === id ? { ...q, options: q.options.map((o, i) => i === idx ? value : o) } : q));

  const removeQ = (id) => setQs(qs => qs.filter(q => q.id !== id));

  const totalMarks = questions.reduce((s, q) => s + Number(q.marks), 0);

  const handleSave = () => {
    if (!meta.title || !meta.subject || !meta.class || !meta.date) {
      showToast(lang === 'ar' ? 'يرجى إكمال البيانات الأساسية' : 'Please fill required fields', 'error'); return;
    }
    if (questions.length === 0) {
      showToast(lang === 'ar' ? 'أضف سؤالاً واحداً على الأقل' : 'Add at least one question', 'error'); return;
    }
    addExam({ ...meta, totalMarks, questions });
    setSaved(true);
    showToast(lang === 'ar' ? `تم حفظ الامتحان (${totalMarks} درجة)` : `Exam saved (${totalMarks} marks)`, 'success');
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'بناء الامتحان' : 'Exam Builder'}</h1>
          <p className="text-sm text-slate-500">{lang === 'ar' ? 'MCQ + مقالي + صح/خطأ' : 'MCQ + Essay + True/False'}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge-blue text-sm">{lang==='ar'?`${totalMarks} درجة`:`${totalMarks} marks`}</span>
          <span className="badge-green">{questions.length} {lang==='ar'?'سؤال':'questions'}</span>
          <button onClick={handleSave} className="btn-primary">
            <Save size={15} /> {lang==='ar'?'حفظ الامتحان':'Save Exam'}
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="card grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{lang==='ar'?'عنوان الامتحان *':'Exam Title *'}</label>
          <input value={meta.title} onChange={e => setMeta({...meta,title:e.target.value})} className="input-field !py-2 text-sm" placeholder={lang==='ar'?'مثال: امتحان الفصل الأول':'e.g. Term 1 Exam'} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('subject')} *</label>
          <input value={meta.subject} onChange={e => setMeta({...meta,subject:e.target.value})} className="input-field !py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{lang==='ar'?'الفصل *':'Class *'}</label>
          <select value={meta.class} onChange={e => setMeta({...meta,class:e.target.value})} className="input-field !py-2 text-sm">
            <option value="">{lang==='ar'?'اختر الفصل':'Select class'}</option>
            {grades.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('date')} *</label>
          <input type="date" value={meta.date} onChange={e => setMeta({...meta,date:e.target.value})} className="input-field !py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('time')}</label>
          <input type="time" value={meta.time} onChange={e => setMeta({...meta,time:e.target.value})} className="input-field !py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{lang==='ar'?'المدة (دقيقة)':'Duration (min)'}</label>
          <input type="number" value={meta.duration} onChange={e => setMeta({...meta,duration:e.target.value})} className="input-field !py-2 text-sm" />
        </div>
      </div>

      {/* Add question buttons */}
      <div className="flex gap-2 flex-wrap">
        {Q_TYPES.map(qt => (
          <button key={qt.key} onClick={() => addQuestion(qt.key)}
            className="btn-secondary !py-2 !text-xs gap-1.5">
            <Plus size={13} /> {qt.icon} {lang === 'ar' ? qt.label : qt.labelEn}
          </button>
        ))}
      </div>

      {/* Questions */}
      {questions.length === 0 ? (
        <div className="card text-center py-12 text-slate-400">
          <FileText size={36} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">{lang === 'ar' ? 'لم تضف أسئلة بعد — اختر نوع السؤال من الأعلى' : 'No questions yet — select a question type above'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div key={q.id} className="card border-2 border-slate-100 dark:border-slate-700 relative">
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-1 flex-shrink-0 mt-1">
                  <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-xs font-bold text-primary-600">{idx + 1}</span>
                  <span className={`badge text-[10px] ${q.type==='mcq'?'badge-blue':q.type==='truefalse'?'badge-green':'badge-purple'}`}>
                    {lang==='ar'?Q_TYPES.find(t=>t.key===q.type)?.label:Q_TYPES.find(t=>t.key===q.type)?.labelEn}
                  </span>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex gap-3">
                    <input value={q.text} onChange={e => updateQ(q.id,'text',e.target.value)}
                      className="input-field flex-1 !py-2 text-sm" placeholder={lang==='ar'?'نص السؤال...':'Question text...'} />
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <input type="number" value={q.marks} onChange={e => updateQ(q.id,'marks',e.target.value)} className="input-field !w-16 !py-2 text-sm text-center" min="1" />
                      <span className="text-xs text-slate-400">{lang==='ar'?'درجة':'marks'}</span>
                    </div>
                  </div>

                  {q.type === 'mcq' && (
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input type="radio" name={`correct-${q.id}`} value={String(i)}
                            checked={q.correct === String(i)} onChange={() => updateQ(q.id,'correct',String(i))}
                            className="accent-primary-500 flex-shrink-0" />
                          <input value={opt} onChange={e => updateOption(q.id, i, e.target.value)}
                            className="input-field flex-1 !py-1.5 text-xs"
                            placeholder={`${lang==='ar'?'خيار':'Option'} ${String.fromCharCode(65+i)}`} />
                        </div>
                      ))}
                      <p className="col-span-2 text-[10px] text-slate-400">{lang==='ar'?'• اختر الإجابة الصحيحة بالضغط على الدائرة':'• Click circle to mark correct answer'}</p>
                    </div>
                  )}

                  {q.type === 'truefalse' && (
                    <div className="flex gap-4">
                      {[['true','صح','True'],['false','خطأ','False']].map(([v,ar,en]) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name={`tf-${q.id}`} value={v}
                            checked={q.correct === v} onChange={() => updateQ(q.id,'correct',v)}
                            className="accent-primary-500" />
                          <span className={`text-sm font-medium ${v==='true'?'text-emerald-600':'text-red-500'}`}>{lang==='ar'?ar:en}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === 'essay' && (
                    <textarea value={q.answer} onChange={e => updateQ(q.id,'answer',e.target.value)}
                      rows={2} className="input-field text-xs resize-none"
                      placeholder={lang==='ar'?'نموذج الإجابة (اختياري)...':'Model answer (optional)...'} />
                  )}
                </div>
                <button onClick={() => removeQ(q.id)} className="text-red-400 hover:text-red-600 flex-shrink-0 transition-colors mt-1">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
