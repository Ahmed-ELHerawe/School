import { useAppStore } from '../../store/useAppStore';
import StatCard from '../../components/common/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { School, Users, TrendingUp, DollarSign, Award } from 'lucide-react';

const COLORS = ['#0e8fe3','#8b5cf6','#10b981','#f97316'];

export default function SchoolReportsPage() {
  const { lang, schools, teachers, students } = useAppStore();

  const compData = schools.map(sc => ({
    name: lang==='ar'?sc.name.split(' ').slice(-2).join(' '):sc.nameEn.split(' ').slice(-1)[0],
    students: sc.students, teachers: sc.teachers, revenue: sc.revenue/1000,
    ratio: Math.round(sc.students / sc.teachers),
  }));

  const totalRevenue = schools.reduce((s,sc)=>s+sc.revenue,0);
  const totalStudents = schools.reduce((s,sc)=>s+sc.students,0);
  const totalTeachers = schools.reduce((s,sc)=>s+sc.teachers,0);

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang==='ar'?'تقارير المالك — مقارنة المدارس':'Owner Reports — School Comparison'}</h1>
        <p className="text-sm text-slate-500">{lang==='ar'?'نظرة شاملة على أداء كل المدارس':'Comprehensive view of all schools performance'}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={School}  label={lang==='ar'?'المدارس':'Schools'}  value={schools.length} color="blue" delay={0} />
        <StatCard icon={Users}   label={lang==='ar'?'الطلاب':'Students'}  value={totalStudents.toLocaleString()} color="green" delay={50} />
        <StatCard icon={Users}   label={lang==='ar'?'المعلمون':'Teachers'} value={totalTeachers} color="purple" delay={100} />
        <StatCard icon={DollarSign} label={lang==='ar'?'الإيرادات':'Revenue'} value={`${(totalRevenue/1000).toFixed(0)}K`} sub="EGP" color="orange" delay={150} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang==='ar'?'مقارنة الطلاب والمعلمين':'Students vs Teachers'}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={compData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="students" fill="#0e8fe3" radius={[4,4,0,0]} name={lang==='ar'?'طلاب':'Students'} />
              <Bar dataKey="teachers" fill="#10b981" radius={[4,4,0,0]} name={lang==='ar'?'معلمون':'Teachers'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang==='ar'?'الإيرادات بالألف (EGP)':'Revenue (thousands EGP)'}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={compData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => [`${v}K EGP`]} />
              <Bar dataKey="revenue" radius={[4,4,0,0]} name={lang==='ar'?'إيرادات':'Revenue'}>
                {compData.map((_,i) => <Cell key={i} fill={COLORS[i%COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card overflow-hidden p-0">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white">{lang==='ar'?'ملخص المدارس':'Schools Summary'}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="table-header text-start">{lang==='ar'?'المدرسة':'School'}</th>
              <th className="table-header text-start">{lang==='ar'?'الطلاب':'Students'}</th>
              <th className="table-header text-start">{lang==='ar'?'المعلمون':'Teachers'}</th>
              <th className="table-header text-start">{lang==='ar'?'نسبة الطلاب/معلم':'Student:Teacher'}</th>
              <th className="table-header text-start">{lang==='ar'?'الإيرادات':'Revenue'}</th>
              <th className="table-header text-start">{lang==='ar'?'الاشتراك':'Plan'}</th>
              <th className="table-header text-start">{lang==='ar'?'الحالة':'Status'}</th>
            </tr></thead>
            <tbody>
              {schools.map(sc => (
                <tr key={sc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: sc.color+'20' }}>{sc.logo}</div>
                      <div>
                        <p className="font-medium text-sm text-slate-900 dark:text-white">{lang==='ar'?sc.name:sc.nameEn}</p>
                        <p className="text-xs text-slate-400">{sc.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell font-semibold">{sc.students.toLocaleString()}</td>
                  <td className="table-cell">{sc.teachers}</td>
                  <td className="table-cell">{Math.round(sc.students/sc.teachers)}:1</td>
                  <td className="table-cell font-semibold text-emerald-600">{sc.revenue.toLocaleString()} EGP</td>
                  <td className="table-cell"><span className={`badge ${sc.contract==='premium'?'badge-orange':sc.contract==='standard'?'badge-blue':'badge-gray'}`}>{sc.contract}</span></td>
                  <td className="table-cell"><span className={`badge ${sc.status==='active'?'badge-green':'badge-orange'}`}>{sc.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
