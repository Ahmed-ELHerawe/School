import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import StatCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';
import { Calendar, TrendingUp, AlertCircle, CreditCard, MessageSquare, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Formik, Form, Field } from 'formik';

export default function ParentDashboard() {
  const { t, lang, students, schedule, monthlyPerformance, absenceRequests, addAbsenceRequest, messages, sendMessage } = useAppStore();
  const student = students.find(s => s.id === 1);
  const [absenceModal, setAbsenceModal] = useState(false);
  const [msgModal, setMsgModal] = useState(false);

  if (!student) return null;

  const myRequests = absenceRequests.filter(r => r.studentId === student.id);
  const todaySchedule = schedule[student.grade]?.sunday || [];
  const feePercent = Math.round((student.fees.paid / student.fees.total) * 100);

  const handleAbsenceRequest = (values, { resetForm }) => {
    addAbsenceRequest({ studentId: student.id, studentName: student.name, parentName: 'محمد إبراهيم', ...values });
    resetForm();
    setAbsenceModal(false);
  };

  const handleSendMessage = (values, { resetForm }) => {
    sendMessage({ from: 'محمد إبراهيم', fromId: 'p1', to: values.to, toId: 1, message: values.message });
    resetForm();
    setMsgModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card bg-gradient-to-br from-pink-600 to-rose-700 text-white border-0 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">👨‍👦</div>
          <div>
            <p className="text-pink-200 text-sm">{lang === 'ar' ? 'ولي أمر' : 'Parent'}</p>
            <h1 className="text-xl font-bold">{lang === 'ar' ? 'محمد إبراهيم' : 'Mohamed Ibrahim'}</h1>
            <p className="text-pink-200 text-sm mt-1">{lang === 'ar' ? 'ابنه:' : 'Child:'} {lang === 'ar' ? student.name : student.nameEn} | {student.grade}</p>
          </div>
          <div className="ms-auto flex gap-2">
            <button onClick={() => setAbsenceModal(true)} className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all">
              <Plus size={14} /> {lang === 'ar' ? 'طلب غياب' : 'Request Absence'}
            </button>
            <button onClick={() => setMsgModal(true)} className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all">
              <MessageSquare size={14} /> {lang === 'ar' ? 'مراسلة معلم' : 'Message Teacher'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label={lang === 'ar' ? 'المعدل الدراسي' : 'GPA'} value={`${student.gpa}%`} color="green" delay={0} />
        <StatCard icon={Calendar} label={lang === 'ar' ? 'نسبة الحضور' : 'Attendance'} value={`${student.attendance}%`} color="blue" delay={50} />
        <StatCard icon={AlertCircle} label={t('absences')} value={student.absences} color="red" delay={100} />
        <StatCard icon={CreditCard} label={lang === 'ar' ? 'المتبقي من المصاريف' : 'Fees Due'} value={`${student.fees.due.toLocaleString()}`} sub="EGP" color="orange" delay={150} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Schedule */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'جدول ابنك اليوم' : "Child's Schedule Today"}</h3>
          <div className="space-y-2">
            {todaySchedule.map((lesson, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${lesson.subject === 'استراحة' ? 'bg-slate-50 dark:bg-slate-800' : 'bg-pink-50 dark:bg-pink-900/10'}`}>
                <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400 min-w-[55px]">{lesson.time.split('-')[0]}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">{lesson.subject}</p>
                  {lesson.teacher && <p className="text-[10px] text-slate-400">{lesson.teacher}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('performance')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="average" stroke="#ec4899" strokeWidth={2} dot={{ fill: '#ec4899', r: 4 }} name={lang === 'ar' ? 'المعدل' : 'Average'} />
              <Line type="monotone" dataKey="attendance" stroke="#0e8fe3" strokeWidth={2} dot={{ fill: '#0e8fe3', r: 4 }} name={lang === 'ar' ? 'الحضور' : 'Attendance'} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fees */}
      <div className="card">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('payments')}</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <p className="text-lg font-bold text-slate-900 dark:text-white">{student.fees.total.toLocaleString()}</p>
            <p className="text-xs text-slate-500">{t('total')} EGP</p>
          </div>
          <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <p className="text-lg font-bold text-emerald-600">{student.fees.paid.toLocaleString()}</p>
            <p className="text-xs text-emerald-600">{t('paid')} EGP</p>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <p className="text-lg font-bold text-red-500">{student.fees.due.toLocaleString()}</p>
            <p className="text-xs text-red-500">{t('remaining')} EGP</p>
          </div>
        </div>
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" style={{ width: `${feePercent}%` }} />
        </div>
        <p className="text-xs text-slate-500 mt-2">{feePercent}% {lang === 'ar' ? 'تم السداد' : 'paid'}</p>
      </div>

      {/* Absence Requests */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">{t('permissions')}</h3>
          <button onClick={() => setAbsenceModal(true)} className="btn-primary !py-1.5 !text-xs">
            <Plus size={14} /> {lang === 'ar' ? 'طلب جديد' : 'New Request'}
          </button>
        </div>
        <div className="space-y-2">
          {myRequests.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">{t('noData')}</p>
          ) : myRequests.map(req => (
            <div key={req.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{req.reason}</p>
                <p className="text-xs text-slate-400">{req.date}</p>
              </div>
              <span className={`badge ${req.status === 'approved' ? 'badge-green' : req.status === 'rejected' ? 'badge-red' : 'badge-orange'}`}>
                {t(req.status)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">{t('messages')}</h3>
          <button onClick={() => setMsgModal(true)} className="btn-secondary !py-1.5 !text-xs">
            <Plus size={14} /> {t('newMessage')}
          </button>
        </div>
        <div className="space-y-2">
          {[
            { from: 'أ. محمد علي', message: 'يوسف يحتاج تحسين في مادة الرياضيات', time: 'اليوم 10:30', read: true },
            { from: 'أ. فاطمة حسن', message: 'تحسن ملحوظ في الكتابة، استمروا هكذا', time: 'أمس', read: false },
          ].map((msg, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${!msg.read ? 'bg-pink-50 dark:bg-pink-900/10' : 'bg-slate-50 dark:bg-slate-800'}`}>
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-xs font-bold text-emerald-600 flex-shrink-0">
                {msg.from.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">{msg.from}</p>
                  <p className="text-[10px] text-slate-400">{msg.time}</p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{msg.message}</p>
              </div>
              {!msg.read && <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0 mt-1" />}
            </div>
          ))}
        </div>
      </div>

      {/* Absence Request Modal */}
      <Modal isOpen={absenceModal} onClose={() => setAbsenceModal(false)} title={lang === 'ar' ? 'طلب إذن غياب' : 'Absence Request'}>
        <Formik initialValues={{ date: '', reason: '' }} onSubmit={handleAbsenceRequest}>
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('date')}</label>
              <Field name="date" type="date" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'ar' ? 'سبب الغياب' : 'Reason'}</label>
              <Field as="select" name="reason" className="input-field">
                <option value="">{lang === 'ar' ? 'اختر السبب' : 'Select reason'}</option>
                <option value="مرض">{lang === 'ar' ? 'مرض' : 'Illness'}</option>
                <option value="موعد طبي">{lang === 'ar' ? 'موعد طبي' : 'Medical Appointment'}</option>
                <option value="ظروف عائلية">{lang === 'ar' ? 'ظروف عائلية' : 'Family Circumstances'}</option>
                <option value="أخرى">{lang === 'ar' ? 'أخرى' : 'Other'}</option>
              </Field>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex-1 justify-center">{t('send')}</button>
              <button type="button" onClick={() => setAbsenceModal(false)} className="btn-secondary flex-1 justify-center">{t('cancel')}</button>
            </div>
          </Form>
        </Formik>
      </Modal>

      {/* Message Modal */}
      <Modal isOpen={msgModal} onClose={() => setMsgModal(false)} title={t('newMessage')}>
        <Formik initialValues={{ to: '', message: '' }} onSubmit={handleSendMessage}>
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'ar' ? 'إلى' : 'To'}</label>
              <Field as="select" name="to" className="input-field">
                <option value="">{lang === 'ar' ? 'اختر المعلم' : 'Select Teacher'}</option>
                <option value="أ. محمد علي">أ. محمد علي - رياضيات</option>
                <option value="أ. فاطمة حسن">أ. فاطمة حسن - لغة عربية</option>
                <option value="أ. سارة محمود">أ. سارة محمود - لغة إنجليزية</option>
              </Field>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
              <Field as="textarea" name="message" rows={4} className="input-field resize-none" placeholder={lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message...'} />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex-1 justify-center">{t('send')}</button>
              <button type="button" onClick={() => setMsgModal(false)} className="btn-secondary flex-1 justify-center">{t('cancel')}</button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
