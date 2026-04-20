import { useAppStore } from '../../store/useAppStore';
import StatCard from '../../components/common/StatCard';
import { Users, UserCheck, GraduationCap, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { stages } from '../../data/mockData';

const stageData = [
  { stage: 'رياض أطفال', teachers: 8, students: 120 },
  { stage: 'ابتدائي', teachers: 32, students: 480 },
  { stage: 'إعدادي', teachers: 24, students: 380 },
  { stage: 'ثانوي', teachers: 22, students: 260 },
];

export default function AdminDashboard() {
  const { t, lang, teachers, students, staff, absenceRequests } = useAppStore();
  const schoolTeachers = teachers.filter(t => t.schoolId === 1);
  const schoolStudents = students.filter(s => s.schoolId === 1);
  const pendingRequests = absenceRequests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'لوحة مدير المدرسة' : 'School Admin Dashboard'}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'مدرسة النيل الدولية' : 'Nile International School'}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label={t('totalStudents')} value={schoolStudents.length} color="blue" delay={0} />
        <StatCard icon={Users} label={t('totalTeachers')} value={schoolTeachers.length} color="green" delay={50} />
        <StatCard icon={UserCheck} label={t('staff')} value={staff.length} color="purple" delay={100} />
        <StatCard icon={AlertTriangle} label={lang === 'ar' ? 'طلبات معلقة' : 'Pending Requests'} value={pendingRequests.length} color="orange" delay={150} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Stage breakdown */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'توزيع المعلمين بالمراحل' : 'Teachers by Stage'}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="teachers" fill="#0e8fe3" radius={[6, 6, 0, 0]} name={lang === 'ar' ? 'معلمون' : 'Teachers'} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Student breakdown */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{lang === 'ar' ? 'الطلاب بالمراحل' : 'Students by Stage'}</h3>
          <div className="space-y-3">
            {stageData.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{s.stage}</span>
                  <span className="text-slate-500 dark:text-slate-400">{s.students} طالب</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(s.students / 480) * 100}%`,
                      background: ['#0e8fe3', '#10b981', '#8b5cf6', '#f97316'][i]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teachers table */}
      <div className="card overflow-hidden p-0">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white">{t('teachers')}</h3>
          <span className="badge-blue">{schoolTeachers.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header text-start">{t('name')}</th>
                <th className="table-header text-start">{t('subject')}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'المرحلة' : 'Stage'}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'الحضور' : 'Attendance'}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {schoolTeachers.map(teacher => (
                <tr key={teacher.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {(lang === 'ar' ? teacher.name : teacher.nameEn).charAt(0)}
                      </div>
                      <span className="font-medium text-sm">{lang === 'ar' ? teacher.name : teacher.nameEn}</span>
                    </div>
                  </td>
                  <td className="table-cell">{lang === 'ar' ? teacher.subject : teacher.subjectEn}</td>
                  <td className="table-cell">{teacher.stage}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${teacher.attendance}%` }} />
                      </div>
                      <span className="text-xs">{teacher.attendance}%</span>
                    </div>
                  </td>
                  <td className="table-cell"><span className="badge-green">{t('active')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending absence requests */}
      {pendingRequests.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle size={16} className="text-orange-500" />
            {lang === 'ar' ? 'طلبات غياب معلقة' : 'Pending Absence Requests'}
          </h3>
          <div className="space-y-3">
            {pendingRequests.map(req => (
              <AbsenceRequestCard key={req.id} req={req} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AbsenceRequestCard({ req }) {
  const { updateAbsenceRequest, t, lang } = useAppStore();

  return (
    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/20">
      <div>
        <p className="font-medium text-sm text-slate-900 dark:text-white">{req.studentName}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{req.reason} - {req.date}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => updateAbsenceRequest(req.id, 'approved')} className="btn-primary !py-1.5 !px-3 !text-xs bg-emerald-500 hover:bg-emerald-600">
          {t('approve')}
        </button>
        <button onClick={() => updateAbsenceRequest(req.id, 'rejected')} className="btn-danger !py-1.5 !px-3 !text-xs">
          {t('reject')}
        </button>
      </div>
    </div>
  );
}
