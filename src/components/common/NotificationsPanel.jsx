import { useAppStore } from '../../store/useAppStore';
import { Bell, X, Check } from 'lucide-react';

export default function NotificationsPanel({ onClose }) {
  const { notifications, markNotificationRead, markAllNotificationsRead, t, lang } = useAppStore();

  return (
    <div className="absolute top-full end-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden animate-slide-up">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{t('notifications')}</h3>
        <div className="flex items-center gap-2">
          <button onClick={markAllNotificationsRead} className="text-primary-500 hover:text-primary-600 text-xs flex items-center gap-1">
            <Check size={12} /> {t('markAllRead')}
          </button>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">{t('noData')}</div>
        ) : notifications.map(n => (
          <div
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${!n.read ? 'bg-primary-50 dark:bg-primary-900/10' : ''}`}
          >
            <span className="text-xl flex-shrink-0">{n.icon}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold ${!n.read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                {lang === 'ar' ? n.title : n.titleEn}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{n.message}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}
