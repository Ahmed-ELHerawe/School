import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import StatCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';
import { Users, UserPlus, CreditCard, Calendar, Search } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function StaffManagementPage() {
  const { lang, t, getSchoolStaff, addStaff, updateStaff } = useAppStore();
  const staff = getSchoolStaff();
  const [addModal, setAddModal] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = staff.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const totalSalaries = staff.reduce((s, m) => s + (m.salary || 0), 0);
  const avgAttendance = staff.length ? Math.round(staff.reduce((s, m) => s + (m.attendance || 0), 0) / staff.length) : 0;

  const schema = Yup.object({
    name: Yup.string().required(),
    role: Yup.string().required(),
    department: Yup.string().required(),
    salary: Yup.number().min(1).required(),
    joinDate: Yup.string().required(),
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'إدارة الموظفين' : 'Staff Management'}</h1>
        <button onClick={() => setAddModal(true)} className="btn-primary">
          <UserPlus size={15} /> {lang === 'ar' ? 'إضافة موظف' : 'Add Staff'}
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}    label={lang==='ar'?'إجمالي الموظفين':'Total Staff'}    value={staff.length}    color="blue"   delay={0}   />
        <StatCard icon={CreditCard} label={lang==='ar'?'إجمالي الرواتب':'Total Salaries'} value={`${(totalSalaries/1000).toFixed(0)}K`} sub="EGP" color="orange" delay={50}  />
        <StatCard icon={Calendar} label={lang==='ar'?'متوسط الحضور':'Avg Attendance'}   value={`${avgAttendance}%`} color="green"  delay={100} />
        <StatCard icon={Users}    label={lang==='ar'?'نشطون':'Active'}                   value={staff.filter(s=>s.status==='active').length} color="purple" delay={150} />
      </div>
      <div className="relative max-w-sm">
        <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="input-field ps-9 !py-2 text-sm" placeholder={lang==='ar'?'ابحث...':'Search...'} />
      </div>
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="table-header text-start">{t('name')}</th>
              <th className="table-header text-start">{lang==='ar'?'المسمى':'Role'}</th>
              <th className="table-header text-start">{lang==='ar'?'القسم':'Dept'}</th>
              <th className="table-header text-start">{lang==='ar'?'تاريخ الانضمام':'Join Date'}</th>
              <th className="table-header text-start">{lang==='ar'?'الراتب':'Salary'}</th>
              <th className="table-header text-start">{lang==='ar'?'الحضور':'Attendance'}</th>
              <th className="table-header text-start">{lang==='ar'?'الحالة':'Status'}</th>
            </tr></thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-xs font-bold text-purple-600">{s.name.charAt(0)}</div>
                      <span className="font-medium text-sm">{s.name}</span>
                    </div>
                  </td>
                  <td className="table-cell text-sm">{s.role}</td>
                  <td className="table-cell text-sm">{s.department}</td>
                  <td className="table-cell text-sm text-slate-500">{s.joinDate}</td>
                  <td className="table-cell font-semibold text-sm">{s.salary?.toLocaleString()} EGP</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width:`${s.attendance||0}%` }} />
                      </div>
                      <span className="text-xs">{s.attendance||0}%</span>
                    </div>
                  </td>
                  <td className="table-cell"><span className={`badge ${s.status==='active'?'badge-green':'badge-red'}`}>{s.status==='active'?(lang==='ar'?'نشط':'Active'):(lang==='ar'?'متوقف':'Inactive')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title={lang==='ar'?'إضافة موظف جديد':'Add New Staff'}>
        <Formik initialValues={{ name:'', role:'', department:'', salary:'', joinDate:'' }} validationSchema={schema}
          onSubmit={(values, {resetForm}) => { addStaff({...values, salary: Number(values.salary), attendance: 100}); resetForm(); setAddModal(false); }}>
          <Form className="space-y-4">
            {[['name',lang==='ar'?'الاسم الكامل':'Full Name'],['role',lang==='ar'?'المسمى الوظيفي':'Job Title'],['department',lang==='ar'?'القسم':'Department']].map(([n,l]) => (
              <div key={n}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{l}</label>
                <Field name={n} className="input-field" />
                <ErrorMessage name={n} render={m => <p className="text-red-500 text-xs mt-1">{m}</p>} />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'الراتب (EGP)':'Salary (EGP)'}</label>
                <Field name="salary" type="number" className="input-field" />
                <ErrorMessage name="salary" render={m => <p className="text-red-500 text-xs mt-1">{m}</p>} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'تاريخ الانضمام':'Join Date'}</label>
                <Field name="joinDate" type="date" className="input-field" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex-1 justify-center">{t('save')}</button>
              <button type="button" onClick={() => setAddModal(false)} className="btn-secondary flex-1 justify-center">{t('cancel')}</button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
