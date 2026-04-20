import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import Modal from '../../components/common/Modal';
import StatCard from '../../components/common/StatCard';
import { Users, Plus, Star, Calendar, Clock } from 'lucide-react';
import { Formik, Form, Field } from 'formik';

export default function ActivitiesPage() {
  const { lang, t, getSchoolActivities, addActivity, enrollInActivity, currentUser } = useAppStore();
  const activities = getSchoolActivities();
  const [addModal, setAddModal] = useState(false);
  const isTeacher = currentUser?.role === 'teacher';
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'الأنشطة واللجان' : 'Activities & Clubs'}</h1>
          <p className="text-sm text-slate-500">{lang === 'ar' ? 'تسجيل وإدارة الأنشطة المدرسية' : 'Register and manage school activities'}</p>
        </div>
        {(isAdmin || isTeacher) && (
          <button onClick={() => setAddModal(true)} className="btn-primary">
            <Plus size={15} /> {lang === 'ar' ? 'نشاط جديد' : 'New Activity'}
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={Star}  label={lang==='ar'?'الأنشطة':'Activities'}     value={activities.length} color="blue" delay={0} />
        <StatCard icon={Users} label={lang==='ar'?'المسجلون':'Enrolled'}       value={activities.reduce((s,a)=>s+a.enrolled,0)} color="green" delay={50} />
        <StatCard icon={Users} label={lang==='ar'?'الطاقة الاستيعابية':'Capacity'} value={activities.reduce((s,a)=>s+a.maxStudents,0)} color="purple" delay={100} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map(act => {
          const pct = Math.round(act.enrolled / act.maxStudents * 100);
          const full = act.enrolled >= act.maxStudents;
          return (
            <div key={act.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{lang==='ar'?act.name:act.nameEn}</h3>
                  <span className={`badge text-[10px] mt-1 ${act.type==='رياضي'?'badge-blue':act.type==='فني'?'badge-orange':'badge-purple'}`}>{act.type}</span>
                </div>
                {full ? <span className="badge-red text-[10px]">{lang==='ar'?'مكتمل':'Full'}</span> : <span className="badge-green text-[10px]">{lang==='ar'?'متاح':'Available'}</span>}
              </div>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                <div className="flex items-center gap-2"><Users size={13} /><span>{act.supervisor}</span></div>
                <div className="flex items-center gap-2"><Calendar size={13} /><span>{lang==='ar'?act.day:act.day}</span></div>
                <div className="flex items-center gap-2"><Clock size={13} /><span>{act.time}</span></div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>{lang==='ar'?'المسجلون':'Enrolled'}: {act.enrolled}/{act.maxStudents}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width:`${pct}%`, background: full?'#f97316':'#10b981' }} />
                </div>
              </div>
              {currentUser?.role === 'student' && !full && (
                <button onClick={() => enrollInActivity(act.id)} className="btn-primary w-full justify-center !py-2 !text-xs">
                  <Plus size={13} /> {lang==='ar'?'التسجيل':'Enroll'}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title={lang==='ar'?'إضافة نشاط جديد':'Add New Activity'}>
        <Formik initialValues={{ name:'', nameEn:'', type:'أكاديمي', supervisor:'', day:'الأحد', time:'', maxStudents:20 }}
          onSubmit={(values,{resetForm}) => { addActivity(values); resetForm(); setAddModal(false); }}>
          <Form className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'اسم النشاط (عربي)':'Name (AR)'}</label><Field name="name" className="input-field" /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'اسم النشاط (إنجليزي)':'Name (EN)'}</label><Field name="nameEn" className="input-field" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'النوع':'Type'}</label>
                <Field as="select" name="type" className="input-field">
                  <option value="أكاديمي">{lang==='ar'?'أكاديمي':'Academic'}</option>
                  <option value="رياضي">{lang==='ar'?'رياضي':'Sports'}</option>
                  <option value="فني">{lang==='ar'?'فني':'Arts'}</option>
                </Field></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'المشرف':'Supervisor'}</label><Field name="supervisor" className="input-field" /></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'اليوم':'Day'}</label>
                <Field as="select" name="day" className="input-field">
                  {['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس'].map(d => <option key={d} value={d}>{d}</option>)}
                </Field></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'الوقت':'Time'}</label><Field name="time" className="input-field" placeholder="14:00-16:00" /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'الحد الأقصى':'Max Students'}</label><Field name="maxStudents" type="number" className="input-field" /></div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex-1 justify-center">{t('save')}</button>
              <button type="button" onClick={() => setAddModal(false)} className="btn-secondary flex-1 justify-center">{t('cancel')}</button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
