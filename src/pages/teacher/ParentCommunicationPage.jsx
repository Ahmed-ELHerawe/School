import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import Modal from '../../components/common/Modal';
import { MessageSquare, Send, Users, TrendingUp, FileText, Plus } from 'lucide-react';
import { Formik, Form, Field } from 'formik';

export default function ParentCommunicationPage() {
  const { lang, t, getSchoolStudents, sendMessage, messages, currentUser, showToast } = useAppStore();
  const students = getSchoolStudents();
  const [msgModal, setMsgModal] = useState(null); // student obj
  const [reportModal, setReportModal] = useState(null);
  const myMessages = messages.filter(m => m.fromId === currentUser?.teacherId || m.toId === currentUser?.teacherId);

  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? students : students.filter(s => {
    if (filter === 'low')  return s.gpa < 75;
    if (filter === 'abs')  return s.absences > 5;
    return true;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang==='ar'?'تواصل مع الأهالي':'Parent Communication'}</h1>
          <p className="text-sm text-slate-500">{lang==='ar'?'تقارير ورسائل فردية':'Individual reports & messages'}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {[['all',lang==='ar'?'الكل':'All'],['low',lang==='ar'?'أداء منخفض (<75%)':'Low Performance (<75%)'],['abs',lang==='ar'?'غياب كثير (>5)':'High Absences (>5)']].map(([v,l]) => (
          <button key={v} onClick={() => setFilter(v)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${filter===v?'bg-primary-500 text-white':'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}>
            {l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(s => (
          <div key={s.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-sm font-bold text-primary-600">
                {(lang==='ar'?s.name:s.nameEn).charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white text-sm">{lang==='ar'?s.name:s.nameEn}</p>
                <p className="text-xs text-slate-500">{s.grade}</p>
              </div>
              <div className="flex gap-1.5">
                <span className={`badge text-xs ${s.gpa>=90?'badge-green':s.gpa>=75?'badge-blue':'badge-orange'}`}>GPA: {s.gpa}%</span>
                <span className={`badge text-xs ${s.absences>5?'badge-red':'badge-green'}`}>{lang==='ar'?`غياب: ${s.absences}`:`Abs: ${s.absences}`}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setMsgModal(s)} className="btn-secondary flex-1 justify-center !py-1.5 !text-xs">
                <MessageSquare size={13} /> {lang==='ar'?'رسالة للولي':'Message Parent'}
              </button>
              <button onClick={() => setReportModal(s)} className="btn-primary flex-1 justify-center !py-1.5 !text-xs">
                <FileText size={13} /> {lang==='ar'?'تقرير أداء':'Performance Report'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Message Modal */}
      <Modal isOpen={!!msgModal} onClose={() => setMsgModal(null)} title={lang==='ar'?`رسالة لولي أمر ${msgModal?.name}`:`Message Parent of ${msgModal?.nameEn}`}>
        {msgModal && (
          <Formik initialValues={{ message: '' }}
            onSubmit={(values,{resetForm}) => {
              sendMessage({ from: currentUser?.name, fromId: currentUser?.teacherId, to: `ولي أمر ${msgModal.name}`, toId: msgModal.parentId, message: values.message, schoolId: currentUser?.schoolId });
              resetForm(); setMsgModal(null);
            }}>
            <Form className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm">
                <p className="text-slate-600 dark:text-slate-400">{lang==='ar'?'الطالب:':'Student:'} <strong className="text-slate-900 dark:text-white">{lang==='ar'?msgModal.name:msgModal.nameEn}</strong></p>
                <p className="text-slate-600 dark:text-slate-400">{lang==='ar'?'الفصل:':'Class:'} <strong className="text-slate-900 dark:text-white">{msgModal.grade}</strong></p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'نص الرسالة':'Message'}</label>
                <Field as="textarea" name="message" rows={4} className="input-field resize-none" placeholder={lang==='ar'?'اكتب رسالتك...':'Write your message...'} />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1 justify-center"><Send size={14} /> {t('send')}</button>
                <button type="button" onClick={() => setMsgModal(null)} className="btn-secondary flex-1 justify-center">{t('cancel')}</button>
              </div>
            </Form>
          </Formik>
        )}
      </Modal>

      {/* Report Modal */}
      <Modal isOpen={!!reportModal} onClose={() => setReportModal(null)} title={lang==='ar'?`تقرير أداء — ${reportModal?.name}`:`Performance Report — ${reportModal?.nameEn}`} size="lg">
        {reportModal && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                [lang==='ar'?'المعدل الدراسي':'GPA', `${reportModal.gpa}%`, reportModal.gpa>=90?'text-emerald-600':reportModal.gpa>=75?'text-blue-600':'text-orange-500'],
                [lang==='ar'?'نسبة الحضور':'Attendance', `${reportModal.attendance}%`, 'text-blue-600'],
                [lang==='ar'?'أيام الغياب':'Absences', reportModal.absences, reportModal.absences>10?'text-red-500':reportModal.absences>5?'text-orange-500':'text-emerald-600'],
              ].map(([l,v,c],i) => (
                <div key={i} className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <p className={`text-2xl font-bold ${c}`}>{v}</p>
                  <p className="text-xs text-slate-500 mt-1">{l}</p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
              <p className="font-semibold text-sm text-blue-800 dark:text-blue-300 mb-2">{lang==='ar'?'تقييم المعلم':'Teacher Assessment'}</p>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                {reportModal.gpa >= 90
                  ? (lang==='ar'?'الطالب متفوق ويستحق التشجيع. أداؤه ممتاز في جميع المواد.':'Excellent student who deserves encouragement. Outstanding performance across all subjects.')
                  : reportModal.gpa >= 75
                  ? (lang==='ar'?'الطالب جيد ويمكن تحسين أدائه بمزيد من المراجعة.':'Good student with room for improvement through more review.')
                  : (lang==='ar'?'الطالب يحتاج اهتماماً إضافياً ومتابعة منزلية.':'Student needs extra attention and home follow-up.')
                }
              </p>
            </div>
            <button onClick={() => { sendMessage({ from: currentUser?.name, fromId: currentUser?.teacherId, to: `ولي أمر ${reportModal.name}`, toId: reportModal.parentId, message: `تقرير أداء ${reportModal.name}: المعدل ${reportModal.gpa}% | الحضور ${reportModal.attendance}%`, schoolId: currentUser?.schoolId }); setReportModal(null); }}
              className="btn-primary w-full justify-center">
              <Send size={14} /> {lang==='ar'?'إرسال التقرير للولي':'Send Report to Parent'}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
