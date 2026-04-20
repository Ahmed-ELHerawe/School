import { useAppStore } from '../../store/useAppStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';

const classComparison = [
  { class: 'الثالث أ', avg: 88, attendance: 95, pass: 98 },
  { class: 'الثالث ب', avg: 82, attendance: 91, pass: 94 },
  { class: 'الرابع أ', avg: 85, attendance: 93, pass: 96 },
  { class: 'الرابع ب', avg: 79, attendance: 89, pass: 91 },
  { class: 'الخامس أ', avg: 91, attendance: 97, pass: 99 },
];

const subjectPerformance = [
  { subject: 'رياضيات', score: 82 },
  { subject: 'علوم', score: 88 },
  { subject: 'عربي', score: 91 },
  { subject: 'إنجليزي', score: 85 },
  { subject: 'دين', score: 95 },
];

export default function ReportsPage() {
  const { t, lang, monthlyPerformance, students } = useAppStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('reports')}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'تقارير وإحصائيات متقدمة' : 'Advanced reports and analytics'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly trend */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'متابعة الأداء الشهري' : 'Monthly Performance Trend'}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="average" stroke="#0e8fe3" strokeWidth={2} dot={{ r: 4 }} name={lang === 'ar' ? 'متوسط الدرجات' : 'Avg Score'} />
              <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name={lang === 'ar' ? 'الحضور' : 'Attendance'} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject radar */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'الأداء بالمواد' : 'Performance by Subject'}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={subjectPerformance}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <Radar dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Class comparison */}
        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'مقارنة أداء الفصول' : 'Class Performance Comparison'}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={classComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="class" tick={{ fontSize: 11 }} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="avg" fill="#0e8fe3" radius={[4, 4, 0, 0]} name={lang === 'ar' ? 'المتوسط' : 'Average'} />
              <Bar dataKey="attendance" fill="#10b981" radius={[4, 4, 0, 0]} name={lang === 'ar' ? 'الحضور' : 'Attendance'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Students table */}
      <div className="card overflow-hidden p-0">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white">{lang === 'ar' ? 'تقرير الطلاب التفصيلي' : 'Detailed Student Report'}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header text-start">{t('name')}</th>
                <th className="table-header text-start">{t('grade')}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'المعدل' : 'GPA'}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'الحضور' : 'Attendance'}</th>
                <th className="table-header text-start">{t('absences')}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'المصاريف' : 'Fees'}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'التقييم' : 'Rating'}</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="table-cell font-medium">{lang === 'ar' ? s.name : s.nameEn}</td>
                  <td className="table-cell">{s.grade}</td>
                  <td className="table-cell">
                    <span className={`font-bold ${s.gpa >= 90 ? 'text-emerald-600' : s.gpa >= 75 ? 'text-blue-600' : 'text-orange-500'}`}>{s.gpa}%</span>
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
                  <td className="table-cell">
                    <span className={`badge ${s.fees.due === 0 ? 'badge-green' : 'badge-red'}`}>
                      {s.fees.due === 0 ? (lang === 'ar' ? 'مكتمل' : 'Paid') : `${s.fees.due.toLocaleString()} EGP`}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${s.gpa >= 90 ? 'badge-green' : s.gpa >= 75 ? 'badge-blue' : 'badge-orange'}`}>
                      {s.gpa >= 90 ? (lang === 'ar' ? 'ممتاز' : 'Excellent') : s.gpa >= 75 ? (lang === 'ar' ? 'جيد' : 'Good') : (lang === 'ar' ? 'مقبول' : 'Fair')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
