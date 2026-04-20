import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
const dayNamesAr = { sunday: 'الأحد', monday: 'الإثنين', tuesday: 'الثلاثاء', wednesday: 'الأربعاء', thursday: 'الخميس' };
const dayNamesEn = { sunday: 'Sunday', monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday' };

const subjectColors = {
  'رياضيات': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  'لغة عربية': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  'علوم': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  'لغة إنجليزية': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  'تربية دينية': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  'رياضة': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
  'فنون': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',
  'استراحة': 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700',
};

export default function SchedulePage() {
  const { t, lang, schedule } = useAppStore();
  const [selectedClass, setSelectedClass] = useState('الثالث أ');
  const classSchedule = schedule[selectedClass] || {};

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('schedule')}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'الجدول الدراسي الأسبوعي' : 'Weekly Class Schedule'}</p>
        </div>
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          className="input-field w-auto"
        >
          <option value="الثالث أ">الثالث أ</option>
          <option value="الرابع أ">الرابع أ</option>
        </select>
      </div>

      {/* Grid schedule */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="table-header text-start w-24">{lang === 'ar' ? 'الوقت' : 'Time'}</th>
                {days.map(day => (
                  <th key={day} className="table-header text-center">
                    {lang === 'ar' ? dayNamesAr[day] : dayNamesEn[day]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(classSchedule[days[0]] || []).map((_, slotIdx) => (
                <tr key={slotIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="table-cell font-mono text-xs text-slate-500 whitespace-nowrap">
                    {classSchedule[days[0]]?.[slotIdx]?.time || ''}
                  </td>
                  {days.map(day => {
                    const lesson = classSchedule[day]?.[slotIdx];
                    if (!lesson) return <td key={day} className="table-cell" />;
                    const colorClass = subjectColors[lesson.subject] || 'bg-slate-100';
                    return (
                      <td key={day} className="table-cell text-center">
                        {lesson.subject === 'استراحة' ? (
                          <span className="text-xs text-slate-400">☕ {lesson.subject}</span>
                        ) : (
                          <div className={`inline-block px-3 py-1.5 rounded-lg border text-xs font-semibold ${colorClass}`}>
                            <div>{lesson.subject}</div>
                            {lesson.teacher && <div className="font-normal opacity-70 text-[10px]">{lesson.teacher.split(' ').slice(-1)[0]}</div>}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="card">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">{lang === 'ar' ? 'المواد الدراسية' : 'Subjects'}</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(subjectColors).filter(([k]) => k !== 'استراحة').map(([subject, cls]) => (
            <span key={subject} className={`badge border ${cls}`}>{subject}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
