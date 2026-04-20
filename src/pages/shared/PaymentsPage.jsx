import { useAppStore } from '../../store/useAppStore';
import { CreditCard, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import StatCard from '../../components/common/StatCard';

export default function PaymentsPage() {
  const { t, lang, students } = useAppStore();

  const totalRevenue = students.reduce((s, st) => s + st.fees.paid, 0);
  const totalDue = students.reduce((s, st) => s + st.fees.due, 0);
  const fullyPaid = students.filter(s => s.fees.due === 0).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('payments')}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'متابعة المصاريف الدراسية' : 'School Fees Management'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={CheckCircle} label={lang === 'ar' ? 'إجمالي المحصل' : 'Total Collected'} value={`${totalRevenue.toLocaleString()}`} sub="EGP" color="green" delay={0} />
        <StatCard icon={AlertCircle} label={lang === 'ar' ? 'إجمالي المتبقي' : 'Total Due'} value={`${totalDue.toLocaleString()}`} sub="EGP" color="red" delay={50} />
        <StatCard icon={Clock} label={lang === 'ar' ? 'طلاب سددوا بالكامل' : 'Fully Paid'} value={`${fullyPaid}/${students.length}`} color="blue" delay={100} />
      </div>

      <div className="card overflow-hidden p-0">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white">{lang === 'ar' ? 'تفاصيل مصاريف الطلاب' : 'Student Fees Details'}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header text-start">{t('name')}</th>
                <th className="table-header text-start">{t('grade')}</th>
                <th className="table-header text-start">{t('total')}</th>
                <th className="table-header text-start">{t('paid')}</th>
                <th className="table-header text-start">{t('remaining')}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'نسبة السداد' : 'Payment %'}</th>
                <th className="table-header text-start">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const pct = Math.round((s.fees.paid / s.fees.total) * 100);
                return (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="table-cell font-medium">{lang === 'ar' ? s.name : s.nameEn}</td>
                    <td className="table-cell">{s.grade}</td>
                    <td className="table-cell">{s.fees.total.toLocaleString()} EGP</td>
                    <td className="table-cell text-emerald-600 font-semibold">{s.fees.paid.toLocaleString()} EGP</td>
                    <td className="table-cell text-red-500 font-semibold">{s.fees.due.toLocaleString()} EGP</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${pct === 100 ? 'bg-emerald-500' : pct >= 50 ? 'bg-orange-400' : 'bg-red-400'}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs font-medium">{pct}%</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${s.fees.due === 0 ? 'badge-green' : s.fees.due < 5000 ? 'badge-orange' : 'badge-red'}`}>
                        {s.fees.due === 0 ? (lang === 'ar' ? 'مكتمل' : 'Complete') : s.fees.due < 5000 ? (lang === 'ar' ? 'جزئي' : 'Partial') : (lang === 'ar' ? 'متأخر' : 'Overdue')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
