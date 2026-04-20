import { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { CreditCard, Plus, Search, Filter, TrendingUp, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Modal from '../../components/common/Modal';
import StatCard from '../../components/common/StatCard';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function FeesManagementPage() {
  const { lang, t, getSchoolStudents, getSchoolPaymentHistory, recordPayment, showToast } = useAppStore();
  const students = getSchoolStudents();
  const history  = getSchoolPaymentHistory();

  const [search, setSearch]         = useState('');
  const [filterStatus, setFilter]   = useState('all');
  const [payModal, setPayModal]      = useState(null); // student obj
  const [expanded, setExpanded]      = useState(null);

  const filtered = useMemo(() => students.filter(s => {
    const name = (lang === 'ar' ? s.name : s.nameEn).toLowerCase();
    if (search && !name.includes(search.toLowerCase())) return false;
    if (filterStatus === 'paid')    return s.fees.due === 0;
    if (filterStatus === 'partial') return s.fees.due > 0 && s.fees.paid > 0;
    if (filterStatus === 'unpaid')  return s.fees.paid === 0;
    return true;
  }), [students, search, filterStatus, lang]);

  const totalRevenue  = students.reduce((s, st) => s + st.fees.paid, 0);
  const totalPending  = students.reduce((s, st) => s + st.fees.due,  0);
  const paidCount     = students.filter(s => s.fees.due === 0).length;

  const schema = Yup.object({
    amount:  Yup.number().min(1).required(lang === 'ar' ? 'مطلوب' : 'Required'),
    method:  Yup.string().required(),
    installment: Yup.number().min(1).required(),
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'إدارة المصاريف' : 'Fees Management'}</h1>
          <p className="text-sm text-slate-500">{lang === 'ar' ? 'دفع جزئي، سجل كامل' : 'Partial payments & full history'}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CreditCard}   label={lang === 'ar' ? 'إجمالي المحصل'   : 'Total Collected'} value={`${(totalRevenue/1000).toFixed(0)}K`} sub="EGP" color="green"  delay={0}   />
        <StatCard icon={AlertCircle}  label={lang === 'ar' ? 'متأخرات'          : 'Pending'        } value={`${(totalPending/1000).toFixed(0)}K`} sub="EGP" color="red"    delay={50}  />
        <StatCard icon={CheckCircle}  label={lang === 'ar' ? 'مكتملو السداد'    : 'Fully Paid'     } value={paidCount}                                       color="blue"   delay={100} />
        <StatCard icon={TrendingUp}   label={lang === 'ar' ? 'نسبة التحصيل'     : 'Collection Rate'} value={`${students.length ? Math.round(totalRevenue/(totalRevenue+totalPending)*100) : 0}%`} color="purple" delay={150} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={lang === 'ar' ? 'ابحث عن طالب...' : 'Search student...'}
            className="input-field ps-9 !py-2 text-sm" />
        </div>
        <div className="flex gap-1">
          {[['all','الكل','All'],['paid','مكتمل','Paid'],['partial','جزئي','Partial'],['unpaid','لم يدفع','Unpaid']].map(([v,ar,en]) => (
            <button key={v} onClick={() => setFilter(v)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${filterStatus === v ? 'bg-primary-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary-300'}`}>
              {lang === 'ar' ? ar : en}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="table-header text-start">{t('name')}</th>
              <th className="table-header text-start">{t('grade')}</th>
              <th className="table-header text-start">{lang === 'ar' ? 'الإجمالي' : 'Total'}</th>
              <th className="table-header text-start">{lang === 'ar' ? 'المدفوع' : 'Paid'}</th>
              <th className="table-header text-start">{lang === 'ar' ? 'المتبقي' : 'Due'}</th>
              <th className="table-header text-start">{lang === 'ar' ? 'نسبة السداد' : 'Progress'}</th>
              <th className="table-header text-start">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
              <th className="table-header text-start">{lang === 'ar' ? 'إجراء' : 'Action'}</th>
            </tr></thead>
            <tbody>
              {filtered.map(s => {
                const pct  = Math.round(s.fees.paid / s.fees.total * 100);
                const isEx = expanded === s.id;
                const sHistory = history.filter(h => h.studentId === s.id);
                return (
                  <>
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setExpanded(isEx ? null : s.id)}>
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xs font-bold text-primary-600">
                            {(lang === 'ar' ? s.name : s.nameEn).charAt(0)}
                          </div>
                          <span className="font-medium text-sm">{lang === 'ar' ? s.name : s.nameEn}</span>
                        </div>
                      </td>
                      <td className="table-cell text-sm">{s.grade}</td>
                      <td className="table-cell font-semibold text-sm">{s.fees.total.toLocaleString()}</td>
                      <td className="table-cell text-emerald-600 font-semibold text-sm">{s.fees.paid.toLocaleString()}</td>
                      <td className="table-cell text-red-500 font-semibold text-sm">{s.fees.due.toLocaleString()}</td>
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width:`${pct}%`, background: pct===100?'#10b981':pct>50?'#0e8fe3':'#f97316' }} />
                          </div>
                          <span className="text-xs text-slate-500">{pct}%</span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className={`badge ${s.fees.due===0?'badge-green':s.fees.paid>0?'badge-orange':'badge-red'}`}>
                          {s.fees.due===0?(lang==='ar'?'مكتمل':'Paid'):s.fees.paid>0?(lang==='ar'?'جزئي':'Partial'):(lang==='ar'?'لم يدفع':'Unpaid')}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          {s.fees.due > 0 && (
                            <button onClick={e => { e.stopPropagation(); setPayModal(s); }} className="btn-primary !py-1 !px-3 !text-xs">
                              <Plus size={12} /> {lang === 'ar' ? 'دفع' : 'Pay'}
                            </button>
                          )}
                          {isEx ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                        </div>
                      </td>
                    </tr>
                    {isEx && (
                      <tr key={`${s.id}-ex`} className="bg-slate-50 dark:bg-slate-800/30">
                        <td colSpan={8} className="px-4 py-3">
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{lang === 'ar' ? 'سجل المدفوعات' : 'Payment History'}</p>
                          {sHistory.length === 0
                            ? <p className="text-xs text-slate-400">{lang === 'ar' ? 'لا توجد مدفوعات' : 'No payments yet'}</p>
                            : (
                              <div className="space-y-1">
                                {sHistory.map(p => (
                                  <div key={p.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-700 last:border-0">
                                    <span className="text-slate-600 dark:text-slate-400">{p.date}</span>
                                    <span className="text-slate-600 dark:text-slate-400">{lang === 'ar' ? `القسط ${p.installment}` : `Installment ${p.installment}`}</span>
                                    <span className="text-emerald-600 font-bold">{p.amount.toLocaleString()} EGP</span>
                                    <span className="text-slate-500">{p.method}</span>
                                    {p.notes && <span className="text-slate-400 italic">{p.notes}</span>}
                                  </div>
                                ))}
                              </div>
                            )}
                          {/* Installments plan */}
                          <div className="mt-3">
                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{lang === 'ar' ? 'خطة التقسيط' : 'Installment Plan'}</p>
                            <div className="flex gap-2 flex-wrap">
                              {s.fees.installments?.map((inst, i) => (
                                <div key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border ${inst.paid ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'}`}>
                                  {inst.paid ? '✓' : '⏳'} {lang==='ar'?`القسط ${i+1}`:`Inst. ${i+1}`}: {inst.amount.toLocaleString()} — {inst.date}
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal isOpen={!!payModal} onClose={() => setPayModal(null)} title={lang === 'ar' ? `تسجيل دفعة — ${payModal?.name}` : `Record Payment — ${payModal?.nameEn}`}>
        {payModal && (
          <Formik
            initialValues={{ amount: payModal.fees.due, method: 'نقداً', installment: (payModal.fees.installments?.findIndex(i => !i.paid) ?? 0) + 1, notes: '' }}
            validationSchema={schema}
            onSubmit={(values, { resetForm }) => {
              recordPayment(payModal.id, Number(values.amount), values.method, Number(values.installment), values.notes);
              resetForm(); setPayModal(null);
            }}
          >
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-xl mb-2">
                <div><span className="text-slate-500">{lang==='ar'?'الإجمالي':'Total'}:</span> <strong>{payModal.fees.total.toLocaleString()} EGP</strong></div>
                <div><span className="text-slate-500">{lang==='ar'?'المدفوع':'Paid'}:</span> <strong className="text-emerald-600">{payModal.fees.paid.toLocaleString()} EGP</strong></div>
                <div><span className="text-slate-500">{lang==='ar'?'المتبقي':'Due'}:</span> <strong className="text-red-500">{payModal.fees.due.toLocaleString()} EGP</strong></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'المبلغ المدفوع':'Amount Paid'}</label>
                <Field name="amount" type="number" className="input-field" />
                <ErrorMessage name="amount" render={m => <p className="text-red-500 text-xs mt-1">{m}</p>} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'طريقة الدفع':'Payment Method'}</label>
                <Field as="select" name="method" className="input-field">
                  <option value="نقداً">{lang==='ar'?'نقداً':'Cash'}</option>
                  <option value="تحويل بنكي">{lang==='ar'?'تحويل بنكي':'Bank Transfer'}</option>
                  <option value="فيزا">{lang==='ar'?'فيزا':'Visa'}</option>
                  <option value="انستاباي">{lang==='ar'?'انستاباي':'InstaPay'}</option>
                </Field>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'رقم القسط':'Installment #'}</label>
                <Field name="installment" type="number" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang==='ar'?'ملاحظات':'Notes'}</label>
                <Field name="notes" className="input-field" placeholder={lang==='ar'?'اختياري...':'Optional...'} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 justify-center"><CheckCircle size={15} /> {lang==='ar'?'تأكيد الدفع':'Confirm Payment'}</button>
                <button type="button" onClick={() => setPayModal(null)} className="btn-secondary flex-1 justify-center">{t('cancel')}</button>
              </div>
            </Form>
          </Formik>
        )}
      </Modal>
    </div>
  );
}
