import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import { TrendingUp, Award, BookOpen, Calendar, ChevronDown } from 'lucide-react';
import StatCard from '../../components/common/StatCard';

const subjectData = [
  { subject: 'رياضيات', score: 88, avg: 78 },
  { subject: 'عربي',    score: 92, avg: 81 },
  { subject: 'علوم',    score: 85, avg: 75 },
  { subject: 'إنجليزي',score: 79, avg: 72 },
  { subject: 'دين',     score: 95, avg: 88 },
];

export default function StudentAnalyticsPage() {
  const { lang, currentUser, getSchoolStudents, monthlyPerformance } = useAppStore();
  const students = getSchoolStudents();
  const myStudent = currentUser?.role === 'student'
    ? students.find(s => s.id === currentUser.studentId)
    : null;
  const [selectedId, setSelectedId] = useState(myStudent?.id || students[0]?.id);
  const student = students.find(s => s.id === selectedId) || students[0];

  if (!student) return <div className="card text-center py-12 text-slate-400">{lang==='ar'?'لا توجد بيانات':'No data available'}</div>;

  const radarData = subjectData.map(d => ({ subject: d.subject, A: d.score, B: d.avg }));

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang==='ar'?'تحليل الطالب':'Student Analytics'}</h1>
          <p className="text-sm text-slate-500">{lang==='ar'?'أداء عبر الزمن':'Performance over time'}</p>
        </div>
        {currentUser?.role !== 'student' && (
          <div className="relative">
            <select value={selectedId} onChange={e => setSelectedId(Number(e.target.value))} className="input-field !py-2 text-sm pe-8 appearance-none">
              {students.map(s => <option key={s.id} value={s.id}>{lang==='ar'?s.name:s.nameEn}</option>)}
            </select>
            <ChevronDown size={14} className="absolute end-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Student card */}
      <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white border-0 p-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">{currentUser?.avatar || '👦'}</div>
          <div>
            <h2 className="text-lg font-bold">{lang==='ar'?student.name:student.nameEn}</h2>
            <p className="text-primary-200 text-sm">{student.grade} | {student.stage}</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">GPA: {student.gpa}%</span>
              <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">{lang==='ar'?'حضور:':'Att:'} {student.attendance}%</span>
              <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">{lang==='ar'?`غياب: ${student.absences}`:`Abs: ${student.absences}`}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label={lang==='ar'?'المعدل الدراسي':'GPA'}       value={`${student.gpa}%`} color="green"  delay={0}   />
        <StatCard icon={Calendar}   label={lang==='ar'?'نسبة الحضور':'Attendance'}   value={`${student.attendance}%`} color="blue" delay={50}  />
        <StatCard icon={Award}      label={lang==='ar'?'أيام الغياب':'Absences'}     value={student.absences} color={student.absences>5?'red':'green'} delay={100} />
        <StatCard icon={BookOpen}   label={lang==='ar'?'المصاريف المدفوعة':'Fees Paid'} value={`${student.fees.paid.toLocaleString()}`} sub="EGP" color="purple" delay={150} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly trend */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang==='ar'?'التطور الشهري':'Monthly Progress'}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="average" stroke="#0e8fe3" strokeWidth={2} dot={{ fill: '#0e8fe3', r: 3 }} name={lang==='ar'?'المعدل':'Average'} />
              <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} name={lang==='ar'?'الحضور':'Attendance'} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject performance */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang==='ar'?'الأداء بالمواد':'Subject Performance'}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="subject" tick={{ fontSize: 9 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="score" fill="#0e8fe3" radius={[4,4,0,0]} name={lang==='ar'?'الطالب':'Student'} />
              <Bar dataKey="avg" fill="#e2e8f0" radius={[4,4,0,0]} name={lang==='ar'?'متوسط الفصل':'Class Avg'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar */}
      <div className="card">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang==='ar'?'مخطط الكفاءات':'Competency Radar'}</h3>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
            <Radar name={lang==='ar'?'الطالب':'Student'} dataKey="A" stroke="#0e8fe3" fill="#0e8fe3" fillOpacity={0.3} />
            <Radar name={lang==='ar'?'المتوسط':'Average'} dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
