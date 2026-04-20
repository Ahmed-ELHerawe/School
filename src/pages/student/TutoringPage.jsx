import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Calendar, Clock, CheckCircle, Plus } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { Formik, Form, Field } from 'formik';

const availableTeachers = [
  { id: 1, name: 'أ. محمد علي', nameEn: 'Mr. Mohamed Ali', subject: 'رياضيات', subjectEn: 'Math', avatar: '👨‍🏫', rating: 4.9, price: 150, slots: ['09:00', '11:00', '14:00', '16:00'] },
  { id: 2, name: 'أ. فاطمة حسن', nameEn: 'Ms. Fatma Hassan', subject: 'لغة عربية', subjectEn: 'Arabic', avatar: '👩‍🏫', rating: 4.8, price: 130, slots: ['10:00', '13:00', '15:00'] },
  { id: 3, name: 'أ. سارة محمود', nameEn: 'Ms. Sara Mahmoud', subject: 'لغة إنجليزية', subjectEn: 'English', avatar: '👩‍🏫', rating: 5.0, price: 180, slots: ['08:00', '12:00', '17:00'] },
  { id: 4, name: 'أ. أحمد سعيد', nameEn: 'Mr. Ahmed Saeed', subject: 'علوم', subjectEn: 'Science', avatar: '👨‍🏫', rating: 4.7, price: 140, slots: ['09:30', '11:30', '14:30'] },
];

const DAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];

export default function TutoringPage() {
  const { lang } = useAppStore();
  const [bookings, setBookings] = useState([
    { id: 1, teacher: 'أ. محمد علي', subject: 'رياضيات', date: '2024-03-20', time: '09:00', status: 'confirmed', price: 150 },
    { id: 2, teacher: 'أ. سارة محمود', subject: 'لغة إنجليزية', date: '2024-03-22', time: '12:00', status: 'pending', price: 180 },
  ]);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleBook = (values, { resetForm }) => {
    setBookings(prev => [...prev, {
      id: Date.now(),
      teacher: lang === 'ar' ? selected.name : selected.nameEn,
      subject: lang === 'ar' ? selected.subject : selected.subjectEn,
      date: values.date, time: values.time,
      status: 'pending', price: selected.price
    }]);
    resetForm();
    setModal(false);
    setSelected(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          🗓️ {lang === 'ar' ? 'الحصص الخاصة' : 'Private Tutoring'}
        </h1>
        <p className="text-sm text-slate-500">{lang === 'ar' ? 'احجز حصة خاصة مع معلمك المفضل' : 'Book a private session with your favorite teacher'}</p>
      </div>

      {/* My bookings */}
      {bookings.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'حجوزاتي' : 'My Bookings'}</h3>
          <div className="space-y-2">
            {bookings.map(b => (
              <div key={b.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-lg">📚</div>
                  <div>
                    <p className="font-medium text-sm text-slate-900 dark:text-white">{b.teacher} - {b.subject}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-2">
                      <Calendar size={10} /> {b.date} <Clock size={10} /> {b.time}
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <span className={`badge ${b.status === 'confirmed' ? 'badge-green' : 'badge-orange'}`}>
                    {b.status === 'confirmed' ? (lang === 'ar' ? '✅ مؤكد' : '✅ Confirmed') : (lang === 'ar' ? '⏳ معلق' : '⏳ Pending')}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">{b.price} {lang === 'ar' ? 'جنيه' : 'EGP'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available teachers */}
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'المعلمون المتاحون' : 'Available Teachers'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableTeachers.map(t => (
            <div key={t.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-3xl">{t.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">{lang === 'ar' ? t.name : t.nameEn}</h3>
                  <p className="text-sm text-slate-500">{lang === 'ar' ? t.subject : t.subjectEn}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-amber-400 text-xs">{'⭐'.repeat(Math.floor(t.rating))}</span>
                    <span className="text-xs text-slate-400">{t.rating}</span>
                  </div>
                </div>
                <div className="text-end">
                  <p className="font-bold text-primary-600">{t.price}</p>
                  <p className="text-xs text-slate-400">{lang === 'ar' ? 'جنيه/ساعة' : 'EGP/hr'}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-500 mb-2">{lang === 'ar' ? 'المواعيد المتاحة اليوم:' : "Today's Available Slots:"}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.slots.map(slot => (
                    <span key={slot} className="text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 px-2 py-0.5 rounded-lg">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

              <button onClick={() => { setSelected(t); setModal(true); }} className="btn-primary w-full justify-center">
                <Plus size={16} /> {lang === 'ar' ? 'احجز حصة' : 'Book Session'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <Modal isOpen={modal} onClose={() => { setModal(false); setSelected(null); }}
        title={lang === 'ar' ? `حجز مع ${selected?.name}` : `Book with ${selected?.nameEn}`}>
        {selected && (
          <Formik initialValues={{ date: '', time: '' }} onSubmit={handleBook}>
            <Form className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <span className="text-3xl">{selected.avatar}</span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{lang === 'ar' ? selected.name : selected.nameEn}</p>
                  <p className="text-sm text-slate-500">{lang === 'ar' ? selected.subject : selected.subjectEn} • {selected.price} {lang === 'ar' ? 'جنيه/ساعة' : 'EGP/hr'}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'ar' ? 'تاريخ الحصة' : 'Session Date'}</label>
                <Field name="date" type="date" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'ar' ? 'الموعد' : 'Time Slot'}</label>
                <Field as="select" name="time" className="input-field">
                  <option value="">{lang === 'ar' ? 'اختر الموعد' : 'Select slot'}</option>
                  {selected.slots.map(s => <option key={s} value={s}>{s}</option>)}
                </Field>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">{lang === 'ar' ? 'سعر الحصة:' : 'Session fee:'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selected.price} {lang === 'ar' ? 'جنيه' : 'EGP'}</span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 justify-center">{lang === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking'}</button>
                <button type="button" onClick={() => { setModal(false); setSelected(null); }} className="btn-secondary flex-1 justify-center">{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
              </div>
            </Form>
          </Formik>
        )}
      </Modal>
    </div>
  );
}
