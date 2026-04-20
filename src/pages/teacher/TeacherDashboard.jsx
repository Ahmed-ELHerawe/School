import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import StatCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';
import { Users, ClipboardList, FileText, CheckCircle, Clock, Plus } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function TeacherDashboard() {
  const { t, lang, students, homeworks, exams, addHomework, addExam, gradeHomework, addNotification } = useAppStore();
  const myStudents = students.filter(s => s.schoolId === 1);
  const myHomeworks = homeworks.filter(h => h.class === 'الثالث أ');
  const myExams = exams;
  const [hwModal, setHwModal] = useState(false);
  const [examModal, setExamModal] = useState(false);

  const pendingGrading = myHomeworks.filter(h => h.status === 'submitted');

  const handleAddHW = (values, { resetForm }) => {
    addHomework({ ...values, class: 'الثالث أ', assignedBy: 'أ. محمد علي' });
    addNotification({ type: 'homework', title: 'واجب جديد', titleEn: 'New Homework', message: `واجب جديد: ${values.title}`, icon: '📚', time: 'الآن' });
    resetForm();
    setHwModal(false);
  };

  const handleAddExam = (values, { resetForm }) => {
    addExam({ ...values, class: 'الثالث أ' });
    resetForm();
    setExamModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'لوحة المعلم' : 'Teacher Dashboard'}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'الثالث أ - رياضيات' : 'Grade 3A - Mathematics'}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setHwModal(true)} className="btn-primary">
            <Plus size={16} /> {lang === 'ar' ? 'واجب جديد' : 'New HW'}
          </button>
          <button onClick={() => setExamModal(true)} className="btn-secondary">
            <Plus size={16} /> {lang === 'ar' ? 'امتحان جديد' : 'New Exam'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label={t('students')} value={myStudents.length} color="blue" delay={0} />
        <StatCard icon={ClipboardList} label={t('homework')} value={myHomeworks.length} color="green" delay={50} />
        <StatCard icon={FileText} label={t('exams')} value={myExams.length} color="purple" delay={100} />
        <StatCard icon={Clock} label={lang === 'ar' ? 'تحتاج تصحيح' : 'Needs Grading'} value={pendingGrading.length} color="orange" delay={150} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Homeworks */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('homework')}</h3>
          <div className="space-y-3">
            {myHomeworks.map(hw => (
              <div key={hw.id} className="flex items-start justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-slate-900 dark:text-white truncate">{hw.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{hw.subject} - {lang === 'ar' ? 'استحقاق:' : 'Due:'} {hw.dueDate}</p>
                </div>
                <div className="flex items-center gap-2 ms-3">
                  <span className={`badge ${hw.status === 'graded' ? 'badge-green' : hw.status === 'submitted' ? 'badge-orange' : 'badge-blue'}`}>
                    {t(hw.status)}
                  </span>
                  {hw.status === 'submitted' && (
                    <button
                      onClick={() => { gradeHomework(hw.id, 18); }}
                      className="text-xs text-primary-500 hover:text-primary-600 font-medium"
                    >
                      {lang === 'ar' ? 'صحح' : 'Grade'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exams */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('exams')}</h3>
          <div className="space-y-3">
            {myExams.map(ex => (
              <div key={ex.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm text-slate-900 dark:text-white">{ex.title}</p>
                  <span className={`badge ${ex.status === 'completed' ? 'badge-green' : 'badge-blue'}`}>{t(ex.status)}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{ex.subject} | {ex.date} | {ex.duration} {lang === 'ar' ? 'دقيقة' : 'min'}</p>
                {ex.status === 'completed' && ex.results && (
                  <div className="flex gap-3 mt-2">
                    <span className="text-xs text-slate-500">{lang === 'ar' ? 'متوسط:' : 'Avg:'} <strong className="text-slate-900 dark:text-white">{ex.results.average}</strong></span>
                    <span className="text-xs text-slate-500">{lang === 'ar' ? 'أعلى:' : 'High:'} <strong className="text-emerald-600">{ex.results.highest}</strong></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Students performance */}
      <div className="card overflow-hidden p-0">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white">{lang === 'ar' ? 'أداء الطلاب' : 'Student Performance'}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header text-start">{t('name')}</th>
                <th className="table-header text-start">{t('grade')}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'المعدل' : 'GPA'}</th>
                <th className="table-header text-start">{t('attendance')}</th>
                <th className="table-header text-start">{t('absences')}</th>
              </tr>
            </thead>
            <tbody>
              {myStudents.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="table-cell font-medium">{lang === 'ar' ? s.name : s.nameEn}</td>
                  <td className="table-cell">{s.grade}</td>
                  <td className="table-cell">
                    <span className={`font-bold ${s.gpa >= 90 ? 'text-emerald-600' : s.gpa >= 75 ? 'text-blue-600' : 'text-orange-600'}`}>{s.gpa}%</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${s.attendance}%` }} />
                      </div>
                      <span className="text-xs">{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${s.absences > 10 ? 'badge-red' : s.absences > 5 ? 'badge-orange' : 'badge-green'}`}>{s.absences}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Homework Modal */}
      <Modal isOpen={hwModal} onClose={() => setHwModal(false)} title={lang === 'ar' ? 'إضافة واجب جديد' : 'Add New Homework'}>
        <Formik
          initialValues={{ title: '', subject: '', description: '', dueDate: '' }}
          validationSchema={Yup.object({
            title: Yup.string().required(lang === 'ar' ? 'مطلوب' : 'Required'),
            subject: Yup.string().required(lang === 'ar' ? 'مطلوب' : 'Required'),
            dueDate: Yup.string().required(lang === 'ar' ? 'مطلوب' : 'Required'),
          })}
          onSubmit={handleAddHW}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'ar' ? 'عنوان الواجب' : 'Title'}</label>
              <Field name="title" className="input-field" placeholder={lang === 'ar' ? 'أدخل عنوان الواجب' : 'Enter homework title'} />
              <ErrorMessage name="title" render={m => <p className="text-red-500 text-xs mt-1">{m}</p>} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('subject')}</label>
              <Field as="select" name="subject" className="input-field">
                <option value="">{lang === 'ar' ? 'اختر المادة' : 'Select subject'}</option>
                <option value="رياضيات">رياضيات</option>
                <option value="علوم">علوم</option>
                <option value="لغة عربية">لغة عربية</option>
                <option value="لغة إنجليزية">لغة إنجليزية</option>
              </Field>
              <ErrorMessage name="subject" render={m => <p className="text-red-500 text-xs mt-1">{m}</p>} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('description')}</label>
              <Field as="textarea" name="description" rows={3} className="input-field resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('due')}</label>
              <Field name="dueDate" type="date" className="input-field" />
              <ErrorMessage name="dueDate" render={m => <p className="text-red-500 text-xs mt-1">{m}</p>} />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex-1 justify-center">{t('save')}</button>
              <button type="button" onClick={() => setHwModal(false)} className="btn-secondary flex-1 justify-center">{t('cancel')}</button>
            </div>
          </Form>
        </Formik>
      </Modal>

      {/* Add Exam Modal */}
      <Modal isOpen={examModal} onClose={() => setExamModal(false)} title={lang === 'ar' ? 'إضافة امتحان جديد' : 'Add New Exam'}>
        <Formik
          initialValues={{ title: '', subject: '', date: '', time: '', duration: '', totalMarks: '' }}
          validationSchema={Yup.object({
            title: Yup.string().required(lang === 'ar' ? 'مطلوب' : 'Required'),
            subject: Yup.string().required(lang === 'ar' ? 'مطلوب' : 'Required'),
            date: Yup.string().required(lang === 'ar' ? 'مطلوب' : 'Required'),
          })}
          onSubmit={handleAddExam}
        >
          <Form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'ar' ? 'عنوان الامتحان' : 'Title'}</label>
                <Field name="title" className="input-field" />
                <ErrorMessage name="title" render={m => <p className="text-red-500 text-xs mt-1">{m}</p>} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('subject')}</label>
                <Field as="select" name="subject" className="input-field">
                  <option value="">اختر</option>
                  <option value="رياضيات">رياضيات</option>
                  <option value="علوم">علوم</option>
                </Field>
                <ErrorMessage name="subject" render={m => <p className="text-red-500 text-xs mt-1">{m}</p>} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('date')}</label>
                <Field name="date" type="date" className="input-field" />
                <ErrorMessage name="date" render={m => <p className="text-red-500 text-xs mt-1">{m}</p>} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('time')}</label>
                <Field name="time" type="time" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'ar' ? 'المدة (دقيقة)' : 'Duration (min)'}</label>
                <Field name="duration" type="number" className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'ar' ? 'الدرجة الكاملة' : 'Total Marks'}</label>
              <Field name="totalMarks" type="number" className="input-field" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex-1 justify-center">{t('save')}</button>
              <button type="button" onClick={() => setExamModal(false)} className="btn-secondary flex-1 justify-center">{t('cancel')}</button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
