import { useAppStore } from '../../store/useAppStore';
import { AlertTriangle, TrendingDown, UserX, CreditCard, Bell, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function EarlyWarningPage() {
  const { lang, students, addNotification } = useAppStore();
  const [dismissed, setDismissed] = useState([]);

  const warnings = [];

  students.forEach(s => {
    if (s.attendance < 80) {
      warnings.push({
        id: `att-${s.id}`, type: 'attendance', severity: s.attendance < 70 ? 'high' : 'medium',
        studentName: s.name, studentNameEn: s.nameEn, grade: s.grade,
        message: `نسبة الحضور ${s.attendance}% أقل من الحد المسموح 80%`,
        messageEn: `Attendance ${s.attendance}% below 80% threshold`,
        value: s.attendance, icon: UserX, color: 'red',
      });
    }
    if (s.gpa < 60) {
      warnings.push({
        id: `gpa-${s.id}`, type: 'gpa', severity: s.gpa < 50 ? 'high' : 'medium',
        studentName: s.name, studentNameEn: s.nameEn, grade: s.grade,
        message: `المعدل الدراسي ${s.gpa}% أقل من 60%`,
        messageEn: `GPA ${s.gpa}% below 60%`,
        value: s.gpa, icon: TrendingDown, color: 'orange',
      });
    }
    if (s.fees.due > 5000) {
      warnings.push({
        id: `fee-${s.id}`, type: 'fees', severity: 'medium',
        studentName: s.name, studentNameEn: s.nameEn, grade: s.grade,
        message: `متأخر في سداد ${s.fees.due.toLocaleString()} جنيه`,
        messageEn: `${s.fees.due.toLocaleString()} EGP fees overdue`,
        value: s.fees.due, icon: CreditCard, color: 'purple',
      });
    }
    if (s.absences > 10) {
      warnings.push({
        id: `abs-${s.id}`, type: 'absences', severity: 'high',
        studentName: s.name, studentNameEn: s.nameEn, grade: s.grade,
        message: `تجاوز عدد الغيابات ${s.absences} يوم`,
        messageEn: `${s.absences} absences exceeded`,
        value: s.absences, icon: AlertTriangle, color: 'red',
      });
    }
  });

  const active = warnings.filter(w => !dismissed.includes(w.id));
  const high = active.filter(w => w.severity === 'high');
  const medium = active.filter(w => w.severity === 'medium');

  const notifyParent = (w) => {
    addNotification({
      type: 'warning', title: `تحذير: ${w.studentName}`, titleEn: `Warning: ${w.studentNameEn}`,
      message: w.message, icon: '⚠️', time: 'الآن'
    });
  };

  const colorMap = {
    red: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800',
    orange: 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800',
    purple: 'bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800',
  };
  const iconColorMap = {
    red: 'bg-red-100 dark:bg-red-900/30 text-red-500',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-500',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-500',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="text-orange-500" size={22} />
          {lang === 'ar' ? 'نظام الإنذار المبكر' : 'Early Warning System'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {lang === 'ar' ? 'رصد آلي لحالات الطلاب التي تحتاج تدخلاً' : 'Automated monitoring for students needing intervention'}
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center border-red-200 dark:border-red-800">
          <p className="text-2xl font-bold text-red-500">{high.length}</p>
          <p className="text-xs text-slate-500">{lang === 'ar' ? 'إنذارات عالية' : 'High Priority'}</p>
        </div>
        <div className="card text-center border-orange-200 dark:border-orange-800">
          <p className="text-2xl font-bold text-orange-500">{medium.length}</p>
          <p className="text-xs text-slate-500">{lang === 'ar' ? 'إنذارات متوسطة' : 'Medium Priority'}</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">{students.length - new Set(active.map(w => w.studentName)).size}</p>
          <p className="text-xs text-slate-500">{lang === 'ar' ? 'طلاب بدون إنذارات' : 'No Warnings'}</p>
        </div>
        <div className="card text-center border-emerald-200 dark:border-emerald-800">
          <p className="text-2xl font-bold text-emerald-500">{dismissed.length}</p>
          <p className="text-xs text-slate-500">{lang === 'ar' ? 'تم معالجتها' : 'Resolved'}</p>
        </div>
      </div>

      {active.length === 0 ? (
        <div className="card text-center py-12">
          <CheckCircle size={40} className="text-emerald-500 mx-auto mb-3" />
          <p className="font-semibold text-slate-900 dark:text-white">{lang === 'ar' ? 'لا توجد إنذارات نشطة 🎉' : 'No active warnings 🎉'}</p>
          <p className="text-sm text-slate-500 mt-1">{lang === 'ar' ? 'جميع الطلاب بحالة جيدة' : 'All students are in good standing'}</p>
        </div>
      ) : (
        <>
          {high.length > 0 && (
            <div>
              <h3 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2 mb-3">
                🔴 {lang === 'ar' ? `إنذارات عالية الأولوية (${high.length})` : `High Priority (${high.length})`}
              </h3>
              <div className="space-y-3">
                {high.map(w => <WarningCard key={w.id} w={w} lang={lang} colorMap={colorMap} iconColorMap={iconColorMap} onDismiss={() => setDismissed(p => [...p, w.id])} onNotify={() => notifyParent(w)} />)}
              </div>
            </div>
          )}
          {medium.length > 0 && (
            <div>
              <h3 className="font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-2 mb-3">
                🟡 {lang === 'ar' ? `إنذارات متوسطة (${medium.length})` : `Medium Priority (${medium.length})`}
              </h3>
              <div className="space-y-3">
                {medium.map(w => <WarningCard key={w.id} w={w} lang={lang} colorMap={colorMap} iconColorMap={iconColorMap} onDismiss={() => setDismissed(p => [...p, w.id])} onNotify={() => notifyParent(w)} />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function WarningCard({ w, lang, colorMap, iconColorMap, onDismiss, onNotify }) {
  return (
    <div className={`card border-2 ${colorMap[w.color]} flex items-center justify-between gap-4`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColorMap[w.color]}`}>
          <w.icon size={18} />
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white text-sm">{lang === 'ar' ? w.studentName : w.studentNameEn}</p>
          <p className="text-xs text-slate-500">{w.grade}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{lang === 'ar' ? w.message : w.messageEn}</p>
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button onClick={onNotify} className="btn-secondary !py-1.5 !px-3 !text-xs">
          <Bell size={12} /> {lang === 'ar' ? 'إشعار ولي الأمر' : 'Notify Parent'}
        </button>
        <button onClick={onDismiss} className="btn-primary !py-1.5 !px-3 !text-xs bg-emerald-500 hover:bg-emerald-600">
          <CheckCircle size={12} /> {lang === 'ar' ? 'تمت المعالجة' : 'Resolve'}
        </button>
      </div>
    </div>
  );
}
