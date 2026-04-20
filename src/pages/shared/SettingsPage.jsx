import { useAppStore } from '../../store/useAppStore';
import { Moon, Sun, Globe, Bell, Shield, User, Palette } from 'lucide-react';

export default function SettingsPage() {
  const { t, lang, toggleLang, isDark, toggleTheme, currentUser } = useAppStore();

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('settings')}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'إعدادات الحساب والتطبيق' : 'Account & App Settings'}</p>
      </div>

      {/* Profile */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <User size={18} className="text-primary-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">{t('profile')}</h3>
        </div>
        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-2xl">{currentUser?.avatar}</div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">{lang === 'ar' ? currentUser?.name : currentUser?.nameEn}</p>
            <p className="text-sm text-slate-500">{currentUser?.email}</p>
            <span className="badge-blue mt-1">{t(currentUser?.role)}</span>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Palette size={18} className="text-primary-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">{lang === 'ar' ? 'المظهر واللغة' : 'Appearance & Language'}</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div className="flex items-center gap-3">
              {isDark ? <Moon size={18} className="text-slate-500" /> : <Sun size={18} className="text-amber-500" />}
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{lang === 'ar' ? 'وضع العرض' : 'Display Mode'}</p>
                <p className="text-xs text-slate-500">{isDark ? t('darkMode') : t('lightMode')}</p>
              </div>
            </div>
            <button onClick={toggleTheme} className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${isDark ? 'bg-primary-600' : 'bg-slate-300'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${isDark ? 'translate-x-6 start-1' : 'start-1'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-blue-500" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{lang === 'ar' ? 'اللغة' : 'Language'}</p>
                <p className="text-xs text-slate-500">{lang === 'ar' ? 'العربية' : 'English'}</p>
              </div>
            </div>
            <button onClick={toggleLang} className="btn-secondary !py-1.5">
              {lang === 'ar' ? 'Switch to EN' : 'التغيير للعربية'}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Bell size={18} className="text-primary-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">{t('notifications')}</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: lang === 'ar' ? 'إشعارات الواجبات' : 'Homework Notifications', defaultOn: true },
            { label: lang === 'ar' ? 'إشعارات الامتحانات' : 'Exam Notifications', defaultOn: true },
            { label: lang === 'ar' ? 'إشعارات الغياب' : 'Absence Notifications', defaultOn: true },
            { label: lang === 'ar' ? 'إشعارات المصاريف' : 'Fee Notifications', defaultOn: false },
            { label: lang === 'ar' ? 'الإعلانات' : 'Announcements', defaultOn: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-700 dark:text-slate-300">{item.label}</span>
              <div className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${item.defaultOn ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.defaultOn ? 'translate-x-5 start-0.5' : 'start-0.5'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Shield size={18} className="text-primary-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">{lang === 'ar' ? 'الأمان' : 'Security'}</h3>
        </div>
        <div className="space-y-2">
          <button className="w-full text-start p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium">
            🔑 {lang === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
          </button>
          <button className="w-full text-start p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium">
            📱 {lang === 'ar' ? 'المصادقة الثنائية (OTP)' : 'Two-Factor Auth (OTP)'}
          </button>
        </div>
      </div>
    </div>
  );
}
