import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const icons = {
  success: <CheckCircle size={16} className="text-emerald-500" />,
  error:   <XCircle size={16} className="text-red-500" />,
  warning: <AlertCircle size={16} className="text-amber-500" />,
  info:    <Info size={16} className="text-blue-500" />,
};
const bgMap = {
  success: 'border-emerald-200 dark:border-emerald-800/50',
  error:   'border-red-200 dark:border-red-800/50',
  warning: 'border-amber-200 dark:border-amber-800/50',
  info:    'border-blue-200 dark:border-blue-800/50',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useAppStore();
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-5 end-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id}
          className={`flex items-center gap-3 bg-white dark:bg-slate-800 border ${bgMap[toast.type] || bgMap.info} rounded-xl px-4 py-3 shadow-xl pointer-events-auto animate-slide-up min-w-[260px] max-w-sm`}>
          {icons[toast.type] || icons.info}
          <p className="text-sm text-slate-700 dark:text-slate-200 flex-1">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex-shrink-0">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
