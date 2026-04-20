import { useAppStore } from '../../store/useAppStore';
import StatCard from '../../components/common/StatCard';
import WeatherHijriWidget from '../../components/common/WeatherHijriWidget';
import { School, Users, GraduationCap, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { month: 'سبت', revenue: 85000 },
  { month: 'أكت', revenue: 92000 },
  { month: 'نوف', revenue: 78000 },
  { month: 'ديس', revenue: 110000 },
  { month: 'ين', revenue: 95000 },
  { month: 'فبر', revenue: 105000 },
  { month: 'مار', revenue: 120000 },
];

const COLORS = ['#0e8fe3', '#8b5cf6', '#10b981', '#f97316'];

export default function OwnerDashboard() {
  const { t, lang, schools } = useAppStore();
  const totalStudents = schools.reduce((s, sc) => s + sc.students, 0);
  const totalTeachers = schools.reduce((s, sc) => s + sc.teachers, 0);
  const totalRevenue = schools.reduce((s, sc) => s + sc.revenue, 0);
  const activeSchools = schools.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('dashboard')}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'نظرة عامة على كل المدارس' : 'Overview of all schools'}</p>
      </div>

      <WeatherHijriWidget lang={lang} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={School} label={t('activeSchools')} value={activeSchools} sub={`${schools.length} ${lang === 'ar' ? 'إجمالي' : 'total'}`} color="blue" delay={0} />
        <StatCard icon={GraduationCap} label={t('totalStudents')} value={totalStudents.toLocaleString()} color="green" delay={50} />
        <StatCard icon={Users} label={t('totalTeachers')} value={totalTeachers.toLocaleString()} color="purple" delay={100} />
        <StatCard icon={DollarSign} label={t('revenue')} value={`${(totalRevenue / 1000).toFixed(0)}K`} sub={lang === 'ar' ? 'جنيه مصري' : 'EGP'} color="orange" delay={150} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'الإيرادات الشهرية' : 'Monthly Revenue'}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0e8fe3" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0e8fe3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`${v.toLocaleString()} EGP`]} />
              <Area type="monotone" dataKey="revenue" stroke="#0e8fe3" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Schools Distribution */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'توزيع الطلاب' : 'Student Distribution'}</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={schools} dataKey="students" nameKey="name" cx="50%" cy="50%" outerRadius={60} paddingAngle={3}>
                {schools.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {schools.map((sc, i) => (
              <div key={sc.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-[120px]">{lang === 'ar' ? sc.name : sc.nameEn}</span>
                </div>
                <span className="text-xs font-semibold text-slate-900 dark:text-white">{sc.students}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schools Table */}
      <div className="card overflow-hidden p-0">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white">{t('schools')}</h3>
          <span className="badge-blue">{schools.length} {lang === 'ar' ? 'مدرسة' : 'schools'}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header text-start">{lang === 'ar' ? 'المدرسة' : 'School'}</th>
                <th className="table-header text-start">{t('totalStudents')}</th>
                <th className="table-header text-start">{t('totalTeachers')}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'الموقع' : 'Location'}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'الاشتراك' : 'Plan'}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {schools.map(sc => (
                <tr key={sc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: sc.color + '20' }}>
                        {sc.logo}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">{lang === 'ar' ? sc.name : sc.nameEn}</p>
                        <p className="text-xs text-slate-400">{sc.revenue.toLocaleString()} EGP</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell font-semibold">{sc.students.toLocaleString()}</td>
                  <td className="table-cell">{sc.teachers}</td>
                  <td className="table-cell">{sc.location}</td>
                  <td className="table-cell">
                    <span className={`badge ${sc.contract === 'premium' ? 'badge-orange' : sc.contract === 'standard' ? 'badge-blue' : 'badge-gray'}`}>
                      {sc.contract}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${sc.status === 'active' ? 'badge-green' : 'badge-orange'}`}>
                      {sc.status === 'active' ? t('active') : 'Trial'}
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
