import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import Modal from '../../components/common/Modal';
import { Plus, Megaphone } from 'lucide-react';
import { Formik, Form, Field } from 'formik';

export default function AnnouncementsPage() {
  const { t, lang, announcements, addAnnouncement, currentUser } = useAppStore();
  const [modal, setModal] = useState(false);
  const canAdd = ['admin', 'owner'].includes(currentUser?.role);

  const handleAdd = (values, { resetForm }) => {
    addAnnouncement({ ...values, schoolId: 1 });
    resetForm();
    setModal(false);
  };

  const typeColors = { general: 'badge-blue', parents: 'badge-purple', students: 'badge-green' };
  const typeLabels = { general: { ar: 'عام', en: 'General' }, parents: { ar: 'أولياء أمور', en: 'Parents' }, students: { ar: 'طلاب', en: 'Students' } };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('announcements')}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'إعلانات المدرسة' : 'School Announcements'}</p>
        </div>
        {canAdd && (
          <button onClick={() => setModal(true)} className="btn-primary">
            <Plus size={16} /> {lang === 'ar' ? 'إعلان جديد' : 'New Announcement'}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {announcements.map(ann => (
          <div key={ann.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Megaphone size={22} className="text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{lang === 'ar' ? ann.title : ann.titleEn}</h3>
                  <span className={`badge ${typeColors[ann.type]}`}>
                    {lang === 'ar' ? typeLabels[ann.type].ar : typeLabels[ann.type].en}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{ann.content}</p>
                <p className="text-xs text-slate-400 mt-2">📅 {ann.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {canAdd && (
        <Modal isOpen={modal} onClose={() => setModal(false)} title={lang === 'ar' ? 'إضافة إعلان جديد' : 'Add Announcement'}>
          <Formik initialValues={{ title: '', titleEn: '', content: '', type: 'general' }} onSubmit={handleAdd}>
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}</label>
                  <Field name="title" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}</label>
                  <Field name="titleEn" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('description')}</label>
                <Field as="textarea" name="content" rows={4} className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'ar' ? 'الجمهور المستهدف' : 'Target Audience'}</label>
                <Field as="select" name="type" className="input-field">
                  <option value="general">{lang === 'ar' ? 'عام' : 'General'}</option>
                  <option value="parents">{lang === 'ar' ? 'أولياء أمور' : 'Parents'}</option>
                  <option value="students">{lang === 'ar' ? 'طلاب' : 'Students'}</option>
                </Field>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 justify-center">{t('save')}</button>
                <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">{t('cancel')}</button>
              </div>
            </Form>
          </Formik>
        </Modal>
      )}
    </div>
  );
}
