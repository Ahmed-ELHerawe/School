import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const events = [
  { id: 1, date: '2024-03-25', title: 'امتحان الرياضيات', titleEn: 'Math Exam', type: 'exam', color: '#0e8fe3' },
  { id: 2, date: '2024-03-28', title: 'امتحان اللغة العربية', titleEn: 'Arabic Exam', type: 'exam', color: '#0e8fe3' },
  { id: 3, date: '2024-03-20', title: 'واجب الرياضيات', titleEn: 'Math Homework Due', type: 'homework', color: '#f97316' },
  { id: 4, date: '2024-03-22', title: 'واجب العلوم', titleEn: 'Science Homework Due', type: 'homework', color: '#f97316' },
  { id: 5, date: '2024-04-01', title: 'إجازة عيد الفطر', titleEn: 'Eid Al-Fitr Holiday', type: 'holiday', color: '#10b981' },
  { id: 6, date: '2024-04-05', title: 'اجتماع أولياء الأمور', titleEn: 'Parent Meeting', type: 'meeting', color: '#8b5cf6' },
  { id: 7, date: '2024-03-17', title: 'اليوم الرياضي', titleEn: 'Sports Day', type: 'event', color: '#ec4899' },
  { id: 8, date: '2024-04-10', title: 'امتحان العلوم', titleEn: 'Science Exam', type: 'exam', color: '#0e8fe3' },
];

const typeConfig = {
  exam:     { label: 'امتحان', labelEn: 'Exam', color: 'badge-blue' },
  homework: { label: 'واجب', labelEn: 'Homework', color: 'badge-orange' },
  holiday:  { label: 'إجازة', labelEn: 'Holiday', color: 'badge-green' },
  meeting:  { label: 'اجتماع', labelEn: 'Meeting', color: 'badge-purple' },
  event:    { label: 'فعالية', labelEn: 'Event', color: 'badge-red' },
};

const MONTHS_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS_AR = ['أح','إث','ثل','أر','خم','جم','سب'];
const DAYS_EN = ['Su','Mo','Tu','We','Th','Fr','Sa'];

export default function CalendarPage() {
  const { lang } = useAppStore();
  const [current, setCurrent] = useState(new Date(2024, 2, 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [localEvents, setLocalEvents] = useState(events);
  const [showAdd, setShowAdd] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', type: 'exam' });

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getEventsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return localEvents.filter(e => e.date === dateStr);
  };

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const addEvent = () => {
    if (!newEvent.title || !selectedDate) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
    const cfg = typeConfig[newEvent.type];
    setLocalEvents(prev => [...prev, { id: Date.now(), date: dateStr, title: newEvent.title, titleEn: newEvent.title, type: newEvent.type, color: '#0e8fe3' }]);
    setNewEvent({ title: '', type: 'exam' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'التقويم الأكاديمي' : 'Academic Calendar'}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'الامتحانات والواجبات والفعاليات' : 'Exams, homework and events'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Calendar */}
        <div className="card lg:col-span-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={() => setCurrent(new Date(year, month - 1, 1))} className="btn-secondary !px-2.5 !py-2">
              <ChevronRight size={16} />
            </button>
            <h2 className="font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? MONTHS_AR[month] : MONTHS_EN[month]} {year}
            </h2>
            <button onClick={() => setCurrent(new Date(year, month + 1, 1))} className="btn-secondary !px-2.5 !py-2">
              <ChevronLeft size={16} />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 mb-2">
            {(lang === 'ar' ? DAYS_AR : DAYS_EN).map(d => (
              <div key={d} className="text-center text-xs font-semibold text-slate-400 py-1">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDate(day);
              const isSelected = selectedDate === day;
              const isToday = day === 17 && month === 2;
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`relative min-h-[52px] rounded-xl p-1 cursor-pointer transition-all border ${
                    isSelected ? 'bg-primary-600 border-primary-500 text-white' :
                    isToday ? 'border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20' :
                    'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`text-xs font-semibold block text-center mb-1 ${isSelected ? 'text-white' : isToday ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'}`}>{day}</span>
                  <div className="flex flex-wrap gap-0.5 justify-center">
                    {dayEvents.slice(0, 3).map(ev => (
                      <div key={ev.id} className="w-2 h-2 rounded-full" style={{ background: isSelected ? 'white' : ev.color }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {Object.entries(typeConfig).map(([type, cfg]) => (
              <span key={type} className={`badge ${cfg.color}`}>{lang === 'ar' ? cfg.label : cfg.labelEn}</span>
            ))}
          </div>
        </div>

        {/* Selected day events */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {selectedDate ? `${selectedDate} ${lang === 'ar' ? MONTHS_AR[month] : MONTHS_EN[month]}` : (lang === 'ar' ? 'اختر يوماً' : 'Select a day')}
            </h3>
            {selectedDate && (
              <button onClick={() => setShowAdd(!showAdd)} className="btn-primary !py-1.5 !px-3 !text-xs">
                <Plus size={12} /> {lang === 'ar' ? 'أضف' : 'Add'}
              </button>
            )}
          </div>

          {showAdd && selectedDate && (
            <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl space-y-2">
              <input value={newEvent.title} onChange={e => setNewEvent(p => ({ ...p, title: e.target.value }))} className="input-field text-xs" placeholder={lang === 'ar' ? 'عنوان الحدث' : 'Event title'} />
              <select value={newEvent.type} onChange={e => setNewEvent(p => ({ ...p, type: e.target.value }))} className="input-field text-xs">
                {Object.entries(typeConfig).map(([t, c]) => <option key={t} value={t}>{lang === 'ar' ? c.label : c.labelEn}</option>)}
              </select>
              <div className="flex gap-2">
                <button onClick={addEvent} className="btn-primary flex-1 justify-center !py-1.5 !text-xs">{lang === 'ar' ? 'حفظ' : 'Save'}</button>
                <button onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center !py-1.5 !text-xs">{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
              </div>
            </div>
          )}

          {!selectedDate ? (
            <p className="text-sm text-slate-400 text-center py-8">{lang === 'ar' ? 'انقر على يوم لعرض أحداثه' : 'Click a day to see events'}</p>
          ) : selectedEvents.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">{lang === 'ar' ? 'لا توجد أحداث في هذا اليوم' : 'No events on this day'}</p>
          ) : (
            <div className="space-y-2">
              {selectedEvents.map(ev => (
                <div key={ev.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: ev.color }} />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{lang === 'ar' ? ev.title : ev.titleEn}</p>
                    <span className={`badge text-[10px] mt-0.5 ${typeConfig[ev.type]?.color}`}>{lang === 'ar' ? typeConfig[ev.type]?.label : typeConfig[ev.type]?.labelEn}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upcoming events */}
      <div className="card">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'الأحداث القادمة' : 'Upcoming Events'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {localEvents.sort((a, b) => a.date.localeCompare(b.date)).map(ev => (
            <div key={ev.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: ev.color }}>
                {ev.date.split('-')[2]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{lang === 'ar' ? ev.title : ev.titleEn}</p>
                <p className="text-xs text-slate-400">{ev.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
