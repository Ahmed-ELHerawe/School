import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ScatterChart, Scatter
} from 'recharts';

const yearlyData = [
  { year: '2021', avg: 75, attendance: 88, pass: 91, students: 980 },
  { year: '2022', avg: 79, attendance: 90, pass: 93, students: 1050 },
  { year: '2023', avg: 83, attendance: 92, pass: 95, students: 1150 },
  { year: '2024', avg: 88, attendance: 95, pass: 97, students: 1240 },
];

const studentYearly = [
  { year: '2021-2022', math: 72, science: 78, arabic: 80, english: 68, religion: 90, avg: 78 },
  { year: '2022-2023', math: 79, science: 82, arabic: 85, english: 75, religion: 92, avg: 83 },
  { year: '2023-2024', math: 88, science: 91, arabic: 89, english: 94, religion: 96, avg: 92 },
];

const teacherPerf = [
  { name: 'أ. محمد علي', subject: 'رياضيات', avgStudentScore: 85, classCount: 3, satisfaction: 92 },
  { name: 'أ. فاطمة حسن', subject: 'عربي', avgStudentScore: 88, classCount: 2, satisfaction: 95 },
  { name: 'أ. أحمد سعيد', subject: 'علوم', avgStudentScore: 82, classCount: 2, satisfaction: 89 },
  { name: 'أ. سارة محمود', subject: 'إنجليزي', avgStudentScore: 91, classCount: 2, satisfaction: 97 },
];

const subjectTrend = [
  { month: 'سبت', math: 78, science: 82, arabic: 85, english: 79 },
  { month: 'أكت', math: 80, science: 84, arabic: 86, english: 81 },
  { month: 'نوف', math: 79, science: 83, arabic: 88, english: 83 },
  { month: 'ديس', math: 83, science: 87, arabic: 89, english: 85 },
  { month: 'ين', math: 85, science: 88, arabic: 90, english: 87 },
  { month: 'فبر', math: 87, science: 90, arabic: 91, english: 90 },
  { month: 'مار', math: 88, science: 91, arabic: 89, english: 94 },
];

const COLORS = ['#0e8fe3', '#10b981', '#f97316', '#8b5cf6'];

export default function AdvancedAnalyticsPage() {
  const { lang } = useAppStore();
  const [tab, setTab] = useState('school');

  const tabs = [
    { id: 'school', ar: 'المدرسة', en: 'School' },
    { id: 'student', ar: 'الطالب', en: 'Student' },
    { id: 'teachers', ar: 'المعلمون', en: 'Teachers' },
    { id: 'subjects', ar: 'المواد', en: 'Subjects' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          📊 {lang === 'ar' ? 'التحليلات المتقدمة' : 'Advanced Analytics'}
        </h1>
        <p className="text-sm text-slate-500">{lang === 'ar' ? 'تقارير مقارنة متعددة السنوات' : 'Multi-year comparative reports'}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
            {lang === 'ar' ? t.ar : t.en}
          </button>
        ))}
      </div>

      {/* School Analytics */}
      {tab === 'school' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {yearlyData.slice(-1).map(d => [
              { label: lang === 'ar' ? 'متوسط الدرجات' : 'Avg Score', value: `${d.avg}%`, color: 'text-primary-600', change: '+5%' },
              { label: lang === 'ar' ? 'الحضور' : 'Attendance', value: `${d.attendance}%`, color: 'text-emerald-600', change: '+3%' },
              { label: lang === 'ar' ? 'نسبة النجاح' : 'Pass Rate', value: `${d.pass}%`, color: 'text-purple-600', change: '+2%' },
              { label: lang === 'ar' ? 'الطلاب' : 'Students', value: d.students.toLocaleString(), color: 'text-orange-600', change: '+90' },
            ]).flat().map((item, i) => (
              <div key={i} className="card text-center">
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-xs text-slate-500 mt-1">{item.label}</p>
                <p className="text-xs text-emerald-500 font-medium mt-1">↑ {item.change} {lang === 'ar' ? 'عن العام الماضي' : 'vs last year'}</p>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'تطور أداء المدرسة (4 سنوات)' : 'School Performance (4 Years)'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={yearlyData}>
                <defs>
                  {['avg', 'attendance', 'pass'].map((k, i) => (
                    <linearGradient key={k} id={`g${k}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS[i]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS[i]} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="avg" stroke={COLORS[0]} fill={`url(#gavg)`} strokeWidth={2} name={lang === 'ar' ? 'المتوسط' : 'Average'} />
                <Area type="monotone" dataKey="attendance" stroke={COLORS[1]} fill={`url(#gattendance)`} strokeWidth={2} name={lang === 'ar' ? 'الحضور' : 'Attendance'} />
                <Area type="monotone" dataKey="pass" stroke={COLORS[2]} fill={`url(#gpass)`} strokeWidth={2} name={lang === 'ar' ? 'النجاح' : 'Pass Rate'} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Student Analytics */}
      {tab === 'student' && (
        <div className="space-y-5">
          <div className="card">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">يوسف محمد - {lang === 'ar' ? 'مقارنة سنوية' : 'Yearly Comparison'}</h3>
            <p className="text-xs text-slate-400 mb-4">{lang === 'ar' ? 'أداء الطالب عبر 3 سنوات دراسية' : 'Student performance over 3 academic years'}</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={studentYearly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="math" fill="#0e8fe3" radius={[3,3,0,0]} name={lang==='ar'?'رياضيات':'Math'} />
                <Bar dataKey="science" fill="#10b981" radius={[3,3,0,0]} name={lang==='ar'?'علوم':'Science'} />
                <Bar dataKey="arabic" fill="#f97316" radius={[3,3,0,0]} name={lang==='ar'?'عربي':'Arabic'} />
                <Bar dataKey="english" fill="#8b5cf6" radius={[3,3,0,0]} name={lang==='ar'?'إنجليزي':'English'} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'الرادار المعرفي' : 'Knowledge Radar'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={[
                { subject: lang==='ar'?'رياضيات':'Math', A: 88, B: 72 },
                { subject: lang==='ar'?'علوم':'Science', A: 91, B: 78 },
                { subject: lang==='ar'?'عربي':'Arabic', A: 89, B: 80 },
                { subject: lang==='ar'?'إنجليزي':'English', A: 94, B: 68 },
                { subject: lang==='ar'?'دين':'Religion', A: 96, B: 90 },
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <Radar name={lang==='ar'?'هذا العام':'This Year'} dataKey="A" stroke="#0e8fe3" fill="#0e8fe3" fillOpacity={0.3} />
                <Radar name={lang==='ar'?'العام الماضي':'Last Year'} dataKey="B" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'مقارنة المعدلات السنوية' : 'Annual GPA Comparison'}</h3>
            <div className="space-y-3">
              {studentYearly.map((y, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{y.year}</span>
                    <span className={`font-bold ${y.avg >= 90 ? 'text-emerald-600' : y.avg >= 80 ? 'text-blue-600' : 'text-orange-500'}`}>{y.avg}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${y.avg}%`, background: COLORS[i] }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Teachers Analytics */}
      {tab === 'teachers' && (
        <div className="space-y-5">
          <div className="card">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'أداء المعلمين' : 'Teacher Performance'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={teacherPerf} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" domain={[70, 100]} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={90} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgStudentScore" fill="#0e8fe3" radius={[0,4,4,0]} name={lang==='ar'?'متوسط درجات الطلاب':'Avg Student Score'} />
                <Bar dataKey="satisfaction" fill="#10b981" radius={[0,4,4,0]} name={lang==='ar'?'رضا الطلاب %':'Student Satisfaction %'} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teacherPerf.map((t, i) => (
              <div key={i} className="card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-lg">👨‍🏫</div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.subject} | {t.classCount} {lang === 'ar' ? 'فصول' : 'classes'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2 text-center">
                    <p className="font-bold text-primary-600">{t.avgStudentScore}%</p>
                    <p className="text-xs text-slate-400">{lang === 'ar' ? 'متوسط الطلاب' : 'Student Avg'}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2 text-center">
                    <p className="font-bold text-emerald-600">{t.satisfaction}%</p>
                    <p className="text-xs text-slate-400">{lang === 'ar' ? 'رضا الطلاب' : 'Satisfaction'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subjects Analytics */}
      {tab === 'subjects' && (
        <div className="space-y-5">
          <div className="card">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'اتجاه الأداء بالمواد (7 أشهر)' : 'Subject Performance Trend (7 Months)'}</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={subjectTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="math" stroke="#0e8fe3" strokeWidth={2} dot={{ r: 3 }} name={lang==='ar'?'رياضيات':'Math'} />
                <Line type="monotone" dataKey="science" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name={lang==='ar'?'علوم':'Science'} />
                <Line type="monotone" dataKey="arabic" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} name={lang==='ar'?'عربي':'Arabic'} />
                <Line type="monotone" dataKey="english" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name={lang==='ar'?'إنجليزي':'English'} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
