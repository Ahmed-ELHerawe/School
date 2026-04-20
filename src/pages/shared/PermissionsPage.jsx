import { useAppStore } from '../../store/useAppStore';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function PermissionsPage() {
  const { t, lang, absenceRequests, updateAbsenceRequest } = useAppStore();

  const pending = absenceRequests.filter(r => r.status === 'pending');
  const resolved = absenceRequests.filter(r => r.status !== 'pending');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('permissions')}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'طلبات الغياب والانصراف' : 'Absence & Leave Requests'}</p>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div>
          <h3 className="font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-2 mb-3">
            <Clock size={16} /> {lang === 'ar' ? `طلبات معلقة (${pending.length})` : `Pending (${pending.length})`}
          </h3>
          <div className="space-y-3">
            {pending.map(req => (
              <div key={req.id} className="card border-orange-200 dark:border-orange-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{req.studentName}</p>
                  <p className="text-sm text-slate-500">{lang === 'ar' ? 'ولي الأمر:' : 'Parent:'} {req.parentName}</p>
                  <p className="text-sm text-slate-500">{lang === 'ar' ? 'السبب:' : 'Reason:'} {req.reason} | {lang === 'ar' ? 'التاريخ:' : 'Date:'} {req.date}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => updateAbsenceRequest(req.id, 'approved')} className="btn-primary !py-1.5 !px-3 !text-xs bg-emerald-500 hover:bg-emerald-600">
                    <CheckCircle size={14} /> {t('approve')}
                  </button>
                  <button onClick={() => updateAbsenceRequest(req.id, 'rejected')} className="btn-danger !py-1.5 !px-3 !text-xs">
                    <XCircle size={14} /> {t('reject')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resolved */}
      <div>
        <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">{lang === 'ar' ? 'الطلبات السابقة' : 'Previous Requests'}</h3>
        <div className="space-y-3">
          {resolved.map(req => (
            <div key={req.id} className="card flex items-center justify-between opacity-80">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{req.studentName}</p>
                <p className="text-sm text-slate-500">{req.reason} | {req.date}</p>
              </div>
              <span className={`badge ${req.status === 'approved' ? 'badge-green' : 'badge-red'}`}>
                {req.status === 'approved' ? (lang === 'ar' ? '✅ موافق' : '✅ Approved') : (lang === 'ar' ? '❌ مرفوض' : '❌ Rejected')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
