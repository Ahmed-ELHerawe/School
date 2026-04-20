import { useAppStore } from '../../store/useAppStore';

const subjectAttendance = [
  { subject: 'رياضيات', subjectEn: 'Mathematics', teacher: 'أ. محمد علي', total: 24, present: 22, absent: 2, late: 0 },
  { subject: 'علوم', subjectEn: 'Science', teacher: 'أ. أحمد سعيد', total: 20, present: 18, absent: 1, late: 1 },
  { subject: 'لغة عربية', subjectEn: 'Arabic', teacher: 'أ. فاطمة حسن', total: 26, present: 25, absent: 1, late: 0 },
  { subject: 'لغة إنجليزية', subjectEn: 'English', teacher: 'أ. سارة محمود', total: 22, present: 20, absent: 2, late: 0 },
  { subject: 'تربية دينية', subjectEn: 'Religion', teacher: 'أ. كريم نصر', total: 16, present: 16, absent: 0, late: 0 },
  { subject: 'رياضة', subjectEn: 'PE', teacher: 'أ. طارق', total: 12, present: 10, absent: 2, late: 0 },
  { subject: 'فنون', subjectEn: 'Arts', teacher: 'أ. هدى', total: 10, present: 9, absent: 1, late: 0 },
];

export default function SubjectAttendancePage() {
  const { lang } = useAppStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'الحضور بالمادة' : 'Attendance by Subject'}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'تفاصيل الحضور لكل مادة دراسية' : 'Detailed attendance per subject'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjectAttendance.map((s, i) => {
          const pct = Math.round((s.present / s.total) * 100);
          const status = pct >= 90 ? 'good' : pct >= 75 ? 'warn' : 'bad';
          return (
            <div key={i} className="card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{lang === 'ar' ? s.subject : s.subjectEn}</h3>
                  <p className="text-xs text-slate-400">{s.teacher}</p>
                </div>
                <div className={`text-2xl font-bold ${status === 'good' ? 'text-emerald-500' : status === 'warn' ? 'text-orange-500' : 'text-red-500'}`}>
                  {pct}%
                </div>
              </div>
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${status === 'good' ? 'bg-emerald-500' : status === 'warn' ? 'bg-orange-400' : 'bg-red-400'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-2">
                  <p className="font-bold text-emerald-600 text-sm">{s.present}</p>
                  <p className="text-slate-500">{lang === 'ar' ? 'حاضر' : 'Present'}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2">
                  <p className="font-bold text-red-500 text-sm">{s.absent}</p>
                  <p className="text-slate-500">{lang === 'ar' ? 'غائب' : 'Absent'}</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
                  <p className="font-bold text-orange-500 text-sm">{s.late}</p>
                  <p className="text-slate-500">{lang === 'ar' ? 'متأخر' : 'Late'}</p>
                </div>
              </div>
              {status === 'bad' && (
                <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">⚠️ {lang === 'ar' ? 'نسبة الحضور أقل من الحد المسموح' : 'Attendance below required threshold'}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
