import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { currentUser, lang } = useAppStore();
  const home = currentUser ? `/${currentUser.role}` : '/login';
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl font-black text-primary-200 dark:text-primary-900 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {lang === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          {lang === 'ar' ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.' : 'The page you are looking for does not exist or has been moved.'}
        </p>
        <button onClick={() => navigate(home)} className="btn-primary inline-flex">
          <Home size={16} />
          {lang === 'ar' ? 'الرئيسية' : 'Home'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
