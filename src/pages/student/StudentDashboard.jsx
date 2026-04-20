import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import StatCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';
import { BookOpen, Calendar, ClipboardList, AlertCircle, TrendingUp, ArrowRightLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Formik, Form, Field } from 'formik';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
const dayNames = { ar: { sunday: 'الأحد', monday: 'الإثنين', tuesday: 'الثلاثاء', wednesday: 'الأربعاء', thursday: 'الخميس' } };

export default function StudentDashboard() {
  const { t, lang, students, homeworks, exams, books, schedule, monthlyPerformance, schools, transferStudent, addNotification } = useAppStore();
  const student = students.find(s => s.id === 1);
  const myHomeworks = homeworks.filter(h => h.class === student?.grade);
  const [transferModal, setTransferModal] = useState(false);

  if (!student) return null;

  const feePercent = Math.round((student.fees.paid / student.fees.total) * 100);
  const todaySchedule = schedule[student.grade]?.sunday || [];

  const handleTransfer = (values) => {
    transferStudent(student.id, parseInt(values.schoolId));
    addNotification({ type: 'transfer', title: 'تم طلب النقل', titleEn: 'Transfer Requested', message: 'تم تقديم طلب نقل الطالب', icon: '🔄', time: 'الآن' });
    setTransferModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Student header */}
      <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white p-6 border-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">👦</div>
          <div>
            <h1 className="text-xl font-bold">{lang === 'ar' ? student.name : student.nameEn}</h1>
            <p className="text-primary-200 text-sm">{student.grade} | {lang === 'ar' ? 'مدرسة النيل الدولية' : 'Nile International School'}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">GPA: {student.gpa}%</span>
              <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">حضور: {student.attendance}%</span>
            </div>
          </div>
          <div className="ms-auto">
            <button onClick={() => setTransferModal(true)} className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
              <ArrowRightLeft size={16} />
              {lang === 'ar' ? 'نقل المدرسة' : 'Transfer'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ClipboardList} label={t('homework')} value={myHomeworks.filter(h => h.status === 'pending').length} sub={lang === 'ar' ? 'معلق' : 'pending'} color="orange" delay={0} />
        <StatCard icon={BookOpen} label={t('books')} value={student.books.length} color="blue" delay={50} />
        <StatCard icon={AlertCircle} label={t('absences')} value={student.absences} color="red" delay={100} />
        <StatCard icon={TrendingUp} label={lang === 'ar' ? 'المعدل' : 'GPA'} value={`${student.gpa}%`} color="green" delay={150} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Today's schedule */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'جدول اليوم' : "Today's Schedule"}</h3>
          <div className="space-y-2">
            {todaySchedule.map((lesson, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${lesson.subject === 'استراحة' ? 'bg-slate-100 dark:bg-slate-800' : 'bg-primary-50 dark:bg-primary-900/10'}`}>
                <div className="text-center min-w-[60px]">
                  <p className="text-[10px] font-bold text-primary-600 dark:text-primary-400">{lesson.time.split('-')[0]}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold ${lesson.subject === 'استراحة' ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>{lesson.subject}</p>
                  {lesson.teacher && <p className="text-[10px] text-slate-500">{lesson.teacher}</p>}
                </div>
                {lesson.room && <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">{lesson.room}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Performance chart */}
        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('performance')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="average" stroke="#0e8fe3" strokeWidth={2} dot={{ fill: '#0e8fe3', r: 4 }} name={lang === 'ar' ? 'المعدل' : 'Average'} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Homeworks */}
      <div className="card">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('homework')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {myHomeworks.map(hw => (
            <div key={hw.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${hw.status === 'graded' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
                {hw.status === 'graded' ? '✅' : '📝'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm text-slate-900 dark:text-white truncate">{hw.title}</p>
                  {hw.grade && <span className="text-emerald-600 font-bold text-sm">{hw.grade}/20</span>}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{hw.subject} | {t('due')}: {hw.dueDate}</p>
                <span className={`badge mt-1 ${hw.status === 'graded' ? 'badge-green' : hw.status === 'submitted' ? 'badge-orange' : 'badge-blue'}`}>{t(hw.status)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Books */}
      <div className="card">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('books')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {books.filter(b => b.grade === 'الثالث').map(book => (
            <div key={book.id} className="group cursor-pointer">
              <div className="rounded-xl p-4 text-white text-center mb-2 transition-transform group-hover:scale-105" style={{ background: book.coverColor }}>
                <div className="text-3xl mb-1">📖</div>
                <p className="text-xs font-bold leading-tight">{book.title}</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">{book.pages} {lang === 'ar' ? 'صفحة' : 'pages'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fees */}
      <div className="card">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('payments')}</h3>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600 dark:text-slate-400">{t('paid')}: <strong className="text-emerald-600">{student.fees.paid.toLocaleString()} EGP</strong></span>
              <span className="text-slate-600 dark:text-slate-400">{t('remaining')}: <strong className="text-red-500">{student.fees.due.toLocaleString()} EGP</strong></span>
            </div>
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-700" style={{ width: `${feePercent}%` }} />
            </div>
            <p className="text-xs text-slate-500 mt-1">{feePercent}% {lang === 'ar' ? 'مدفوع من' : 'paid of'} {student.fees.total.toLocaleString()} EGP</p>
          </div>
        </div>
      </div>

      {/* Transfer Modal */}
      <Modal isOpen={transferModal} onClose={() => setTransferModal(false)} title={lang === 'ar' ? 'نقل الطالب' : 'Transfer Student'}>
        <Formik initialValues={{ schoolId: '' }} onSubmit={handleTransfer}>
          <Form className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">{lang === 'ar' ? 'اختر المدرسة المراد النقل إليها' : 'Select the school to transfer to'}</p>
            <Field as="select" name="schoolId" className="input-field">
              <option value="">{lang === 'ar' ? 'اختر المدرسة' : 'Select school'}</option>
              {schools.filter(s => s.id !== student.schoolId).map(s => (
                <option key={s.id} value={s.id}>{lang === 'ar' ? s.name : s.nameEn}</option>
              ))}
            </Field>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex-1 justify-center">{t('submit')}</button>
              <button type="button" onClick={() => setTransferModal(false)} className="btn-secondary flex-1 justify-center">{t('cancel')}</button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
