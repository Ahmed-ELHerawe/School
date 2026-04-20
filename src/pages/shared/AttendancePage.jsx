import { useAppStore } from '../../store/useAppStore';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const attendanceHistory = [
  { date: '2024-03-17', status: 'present', day: 'الأحد' },
  { date: '2024-03-16', status: 'present', day: 'السبت' },
  { date: '2024-03-14', status: 'absent', day: 'الخميس' },
  { date: '2024-03-13', status: 'present', day: 'الأربعاء' },
  { date: '2024-03-12', status: 'present', day: 'الثلاثاء' },
  { date: '2024-03-11', status: 'late', day: 'الإثنين' },
  { date: '2024-03-10', status: 'present', day: 'الأحد' },
  { date: '2024-03-07', status: 'absent', day: 'الخميس' },
  { date: '2024-03-06', status: 'present', day: 'الأربعاء' },
  { date: '2024-03-05', status: 'present', day: 'الثلاثاء' },
];

const monthlyData = [
  { month: 'سبتمبر', present: 22, absent: 2, late: 0 },
  { month: 'أكتوبر', present: 20, absent: 3, late: 1 },
  { month: 'نوفمبر', present: 21, absent: 1, late: 2 },
  { month: 'ديسمبر', present: 18, absent: 4, late: 0 },
  { month: 'يناير', present: 22, absent: 0, late: 1 },
  { month: 'فبراير', present: 19, absent: 2, late: 1 },
  { month: 'مارس', present: 10, absent: 1, late: 1 },
];

export default function AttendancePage() {
  const { t, lang, students } = useAppStore();
  const student = students.find(s => s.id === 1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('attendance')}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'سجل الحضور والغياب' : 'Attendance Record'}</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center border-emerald-200 dark:border-emerald-800">
          <CheckCircle size={28} className="text-emerald-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{student?.attendance}%</p>
          <p className="text-sm text-slate-500">{lang === 'ar' ? 'نسبة الحضور' : 'Attendance Rate'}</p>
        </div>
        <div className="card text-center border-red-200 dark:border-red-800">
          <XCircle size={28} className="text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{student?.absences}</p>
          <p className="text-sm text-slate-500">{lang === 'ar' ? 'أيام غياب' : 'Absent Days'}</p>
        </div>
        <div className="card text-center border-orange-200 dark:border-orange-800">
          <Clock size={28} className="text-orange-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-900 dark:text-white">3</p>
          <p className="text-sm text-slate-500">{lang === 'ar' ? 'تأخيرات' : 'Late Days'}</p>
        </div>
      </div>

      {/* Monthly breakdown */}
      <div className="card">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'ملخص شهري' : 'Monthly Summary'}</h3>
        <div className="space-y-3">
          {monthlyData.map((m, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-20">{m.month}</span>
              <div className="flex-1 flex gap-1 h-6">
                {Array.from({ length: m.present }).map((_, j) => (
                  <div key={j} className="flex-1 bg-emerald-400 rounded-sm" style={{ maxWidth: 12 }} />
                ))}
                {Array.from({ length: m.late }).map((_, j) => (
                  <div key={j} className="flex-1 bg-orange-400 rounded-sm" style={{ maxWidth: 12 }} />
                ))}
                {Array.from({ length: m.absent }).map((_, j) => (
                  <div key={j} className="flex-1 bg-red-400 rounded-sm" style={{ maxWidth: 12 }} />
                ))}
              </div>
              <span className="text-xs text-slate-400 w-24 text-end">
                {m.present}✅ {m.absent}❌ {m.late}⏰
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="flex items-center gap-1.5 text-xs text-slate-500"><div className="w-3 h-3 bg-emerald-400 rounded-sm" />{lang === 'ar' ? 'حاضر' : 'Present'}</span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500"><div className="w-3 h-3 bg-orange-400 rounded-sm" />{lang === 'ar' ? 'متأخر' : 'Late'}</span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500"><div className="w-3 h-3 bg-red-400 rounded-sm" />{lang === 'ar' ? 'غائب' : 'Absent'}</span>
        </div>
      </div>

      {/* History */}
      <div className="card overflow-hidden p-0">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white">{lang === 'ar' ? 'السجل التفصيلي' : 'Detailed Record'}</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {attendanceHistory.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.status === 'present' ? 'bg-emerald-100 dark:bg-emerald-900/30' : item.status === 'absent' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
                  {item.status === 'present' ? <CheckCircle size={18} className="text-emerald-500" /> : item.status === 'absent' ? <XCircle size={18} className="text-red-500" /> : <Clock size={18} className="text-orange-500" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{item.day}</p>
                  <p className="text-xs text-slate-400">{item.date}</p>
                </div>
              </div>
              <span className={`badge ${item.status === 'present' ? 'badge-green' : item.status === 'absent' ? 'badge-red' : 'badge-orange'}`}>
                {item.status === 'present' ? (lang === 'ar' ? 'حاضر' : 'Present') : item.status === 'absent' ? (lang === 'ar' ? 'غائب' : 'Absent') : (lang === 'ar' ? 'متأخر' : 'Late')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
