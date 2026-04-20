import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import {
  LayoutDashboard, School, Users, UserCheck, BookOpen, Calendar,
  FileText, MessageSquare, Bell, Settings, LogOut, Sun, Moon,
  Globe, Menu, X, GraduationCap, ClipboardList, CreditCard,
  Library, AlertCircle, Home, BarChart2, Sparkles, AlertTriangle,
  Award, Printer, BookMarked, Bot, Play, Palette, ChevronUp,
  MoreHorizontal
} from 'lucide-react';
import NotificationsPanel from '../common/NotificationsPanel';

const navConfig = {
  owner: [
    { icon: LayoutDashboard, key: 'dashboard',  path: '/owner' },
    { icon: School,          key: 'schools',    path: '/owner/schools' },
    { icon: Users,           key: 'teachers',   path: '/owner/teachers' },
    { icon: UserCheck,       key: 'students',   path: '/owner/students' },
    { icon: BarChart2,       key: 'reports',    path: '/owner/reports' },
    { icon: BarChart2,       label: 'مقارنة المدارس',    labelEn: 'School Reports',      path: '/owner/school-reports' },
    { icon: BarChart2,       label: 'التحليلات المتقدمة', labelEn: 'Advanced Analytics',  path: '/owner/analytics' },
    { icon: CreditCard,      key: 'payments',   path: '/owner/payments' },
    { icon: Calendar,        label: 'التقويم',  labelEn: 'Calendar',                     path: '/owner/calendar' },
    { icon: Palette,         label: 'هوية المدارس', labelEn: 'School Branding',          path: '/owner/branding' },
    { icon: Settings,        key: 'settings',   path: '/owner/settings' },
  ],
  admin: [
    { icon: LayoutDashboard, key: 'dashboard',   path: '/admin' },
    { icon: Users,           key: 'teachers',    path: '/admin/teachers' },
    { icon: UserCheck,       key: 'students',    path: '/admin/students' },
    { icon: Users,           key: 'staff',       path: '/admin/staff' },
    { icon: Calendar,        key: 'schedule',    path: '/admin/schedule' },
    { icon: Calendar,        label: 'التقويم',   labelEn: 'Calendar',         path: '/admin/calendar' },
    { icon: AlertTriangle,   label: 'الإنذار المبكر', labelEn: 'Early Warning', path: '/admin/warnings' },
    { icon: AlertCircle,     key: 'permissions', path: '/admin/permissions' },
    { icon: Bell,            key: 'announcements', path: '/admin/announcements' },
    { icon: BarChart2,       key: 'reports',     path: '/admin/reports' },
    { icon: CreditCard,      label: 'إدارة المصاريف', labelEn: 'Fees Mgmt',   path: '/admin/fees' },
    { icon: CreditCard,      key: 'payments',    path: '/admin/payments' },
    { icon: Sparkles,        label: 'الأنشطة',  labelEn: 'Activities',        path: '/admin/activities' },
    { icon: BarChart2,       label: 'التحليلات', labelEn: 'Analytics',         path: '/admin/analytics' },
    { icon: Settings,        key: 'settings',    path: '/admin/settings' },
  ],
  teacher: [
    { icon: LayoutDashboard, key: 'dashboard',    path: '/teacher' },
    { icon: UserCheck,       key: 'students',     path: '/teacher/students' },
    { icon: ClipboardList,   key: 'homework',     path: '/teacher/homework' },
    { icon: FileText,        key: 'exams',        path: '/teacher/exams' },
    { icon: FileText,        label: 'بناء الامتحان',    labelEn: 'Exam Builder',   path: '/teacher/exam-builder' },
    { icon: Sparkles,        label: 'التصحيح الذكي',    labelEn: 'AI Grading',     path: '/teacher/ai-grading' },
    { icon: Users,           label: 'تواصل الأهالي',    labelEn: 'Parent Comm.',   path: '/teacher/parents' },
    { icon: Play,            label: 'مكتبة الفيديو',    labelEn: 'Video Library',  path: '/teacher/videos' },
    { icon: Calendar,        key: 'schedule',     path: '/teacher/schedule' },
    { icon: Calendar,        label: 'التقويم',    labelEn: 'Calendar',            path: '/teacher/calendar' },
    { icon: MessageSquare,   key: 'messages',     path: '/teacher/messages' },
    { icon: BarChart2,       label: 'التحليلات',  labelEn: 'Analytics',           path: '/teacher/analytics' },
    { icon: Sparkles,        label: 'الأنشطة',    labelEn: 'Activities',          path: '/teacher/activities' },
    { icon: Settings,        key: 'settings',     path: '/teacher/settings' },
  ],
  student: [
    { icon: Home,            key: 'dashboard',    path: '/student' },
    { icon: Bot,             label: 'مساعد ذكي', labelEn: 'AI Tutor',            path: '/student/ai-tutor' },
    { icon: Calendar,        key: 'schedule',     path: '/student/schedule' },
    { icon: Library,         key: 'library',      path: '/student/library' },
    { icon: Play,            label: 'فيديوهات شرح', labelEn: 'Video Library',    path: '/student/videos' },
    { icon: ClipboardList,   key: 'homework',     path: '/student/homework' },
    { icon: FileText,        key: 'exams',        path: '/student/exams' },
    { icon: FileText,        label: 'امتحان أونلاين', labelEn: 'Online Exam',    path: '/student/online-exam' },
    { icon: Users,           label: 'حصص خاصة',  labelEn: 'Tutoring',            path: '/student/tutoring' },
    { icon: UserCheck,       key: 'attendance',   path: '/student/attendance' },
    { icon: BookMarked,      label: 'حضور المواد', labelEn: 'Subject Attendance', path: '/student/subject-attendance' },
    { icon: Award,           label: 'الإنجازات',  labelEn: 'Badges',              path: '/student/badges' },
    { icon: Calendar,        label: 'التقويم',    labelEn: 'Calendar',            path: '/student/calendar' },
    { icon: CreditCard,      key: 'payments',     path: '/student/payments' },
    { icon: Printer,         label: 'تقرير PDF',  labelEn: 'PDF Report',          path: '/student/pdf-report' },
    { icon: MessageSquare,   key: 'messages',     path: '/student/messages' },
    { icon: BarChart2,       label: 'تحليل الأداء', labelEn: 'My Analytics',     path: '/student/analytics' },
    { icon: Sparkles,        label: 'الأنشطة',    labelEn: 'Activities',          path: '/student/activities' },
  ],
  parent: [
    { icon: Home,            key: 'dashboard',    path: '/parent' },
    { icon: Bot,             label: 'مساعد ذكي', labelEn: 'AI Assistant',         path: '/parent/ai-assistant' },
    { icon: Calendar,        key: 'schedule',     path: '/parent/schedule' },
    { icon: BarChart2,       key: 'performance',  path: '/parent/performance' },
    { icon: BarChart2,       label: 'التحليلات المتقدمة', labelEn: 'Advanced Analytics', path: '/parent/analytics' },
    { icon: UserCheck,       key: 'attendance',   path: '/parent/attendance' },
    { icon: Calendar,        label: 'التقويم',    labelEn: 'Calendar',            path: '/parent/calendar' },
    { icon: CreditCard,      key: 'payments',     path: '/parent/payments' },
    { icon: CreditCard,      label: 'إدارة المصاريف', labelEn: 'Fees Details',   path: '/parent/fees' },
    { icon: AlertCircle,     key: 'permissions',  path: '/parent/permissions' },
    { icon: Printer,         label: 'تقرير PDF',  labelEn: 'PDF Report',          path: '/parent/pdf-report' },
    { icon: MessageSquare,   key: 'messages',     path: '/parent/messages' },
    { icon: Bell,            key: 'notifications', path: '/parent/notifications' },
  ],
};

// How many items to show directly in the bottom bar (rest go in "More" sheet)
const BOTTOM_BAR_COUNT = 4;

const roleColors = {
  owner:   'from-amber-500 to-orange-600',
  admin:   'from-primary-500 to-primary-700',
  teacher: 'from-emerald-500 to-teal-600',
  student: 'from-purple-500 to-violet-600',
  parent:  'from-pink-500 to-rose-600',
};

const roleBg = {
  owner:   'bg-amber-500',
  admin:   'bg-primary-500',
  teacher: 'bg-emerald-500',
  student: 'bg-purple-500',
  parent:  'bg-pink-500',
};

export default function DashboardLayout({ children, role }) {
  const { currentUser, logout, isDark, toggleTheme, lang, toggleLang, t,
          notifications, sidebarOpen, toggleSidebar } = useAppStore();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMore,  setShowMore]  = useState(false);   // bottom sheet "More"
  const moreRef = useRef(null);

  const navItems    = navConfig[role] || [];
  const bottomItems = navItems.slice(0, BOTTOM_BAR_COUNT);
  const moreItems   = navItems.slice(BOTTOM_BAR_COUNT);

  const schoolNotifs = notifications.filter(
    n => n.schoolId === currentUser?.schoolId || currentUser?.role === 'owner'
  );
  const unreadCount = schoolNotifs.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate('/login'); };

  const getLabel = (item) =>
    item.label ? (lang === 'ar' ? item.label : item.labelEn) : t(item.key);

  // Close "More" sheet when navigating
  useEffect(() => { setShowMore(false); }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    if (!showMore) return;
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setShowMore(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showMore]);

  const isActive = (path) =>
    path === `/${role}` ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">

      {/* ── Desktop Sidebar ───────────────────────────────────────────── */}
      <aside className={`
        hidden lg:flex flex-col flex-shrink-0
        ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}
        transition-all duration-300
        bg-white dark:bg-slate-900
        border-e border-slate-200 dark:border-slate-800
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${roleColors[role]} flex items-center justify-center shadow-md flex-shrink-0`}>
              <GraduationCap size={18} className="text-white" />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate">{t('appName')}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t(role)}</p>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${roleColors[role]} flex items-center justify-center text-lg flex-shrink-0`}>
              {currentUser?.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {lang === 'ar' ? currentUser?.name : currentUser?.nameEn}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              end={item.path === `/${role}`}
              className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}
            >
              <item.icon size={18} />
              <span>{getLabel(item)}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-0.5">
          <button onClick={handleLogout} className="sidebar-link-inactive w-full">
            <LogOut size={18} />
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>

      {/* ── Main area ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── Header ── */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-3 flex-shrink-0">
          {/* Toggle sidebar (desktop) */}
          <button onClick={toggleSidebar} className="hidden lg:flex btn-secondary !px-2.5 !py-2">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* App name (mobile) */}
          <div className="flex lg:hidden items-center gap-2">
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${roleColors[role]} flex items-center justify-center`}>
              <GraduationCap size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{t('appName')}</span>
          </div>

          <div className="flex-1" />

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button onClick={toggleLang} className="btn-secondary !px-3 !py-2 text-xs">
              <Globe size={14} />
              {lang === 'ar' ? 'EN' : 'ع'}
            </button>
            <button onClick={toggleTheme} className="btn-secondary !px-2.5 !py-2">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="btn-secondary !px-2.5 !py-2 relative"
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-5 pb-24 lg:pb-5">
          {children}
        </main>

        {/* ── Mobile Bottom Navigation Bar ──────────────────────────── */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex items-stretch h-[62px]">

            {/* First 4 nav items */}
            {bottomItems.map((item, i) => {
              const active = isActive(item.path);
              return (
                <NavLink
                  key={i}
                  to={item.path}
                  end={item.path === `/${role}`}
                  className="flex-1 flex flex-col items-center justify-center gap-0.5 relative group"
                >
                  {({ isActive: navActive }) => (
                    <>
                      {/* Active indicator pill */}
                      {navActive && (
                        <span className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full ${roleBg[role]} transition-all`} />
                      )}
                      <div className={`
                        w-10 h-7 rounded-xl flex items-center justify-center transition-all duration-200
                        ${navActive
                          ? `${roleBg[role]} text-white shadow-sm`
                          : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        }
                      `}>
                        <item.icon size={18} />
                      </div>
                      <span className={`text-[10px] font-medium leading-none transition-colors truncate max-w-[56px] text-center
                        ${navActive ? `text-slate-900 dark:text-white` : 'text-slate-400 dark:text-slate-500'}
                      `}>
                        {getLabel(item)}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}

            {/* "More" button — shows rest of nav items in bottom sheet */}
            {moreItems.length > 0 && (
              <button
                onClick={() => setShowMore(s => !s)}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 relative group"
              >
                {showMore && (
                  <span className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full ${roleBg[role]}`} />
                )}
                <div className={`
                  w-10 h-7 rounded-xl flex items-center justify-center transition-all duration-200
                  ${showMore
                    ? `${roleBg[role]} text-white shadow-sm`
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                  }
                `}>
                  {showMore ? <ChevronUp size={18} /> : <MoreHorizontal size={18} />}
                </div>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 leading-none">
                  {lang === 'ar' ? 'المزيد' : 'More'}
                </span>
              </button>
            )}
          </div>
        </nav>

        {/* ── More bottom sheet ──────────────────────────────────────── */}
        {showMore && (
          <>
            {/* Backdrop */}
            <div
              className="lg:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowMore(false)}
            />

            {/* Sheet */}
            <div
              ref={moreRef}
              className="lg:hidden fixed bottom-[62px] inset-x-0 z-40 bg-white dark:bg-slate-900 rounded-t-2xl shadow-2xl border-t border-slate-200 dark:border-slate-700 animate-slide-up"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
              </div>

              {/* Sheet header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${roleColors[role]} flex items-center justify-center`}>
                    <span className="text-sm">{currentUser?.avatar}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {lang === 'ar' ? currentUser?.name : currentUser?.nameEn}
                    </p>
                    <p className="text-[10px] text-slate-400">{t(role)}</p>
                  </div>
                </div>
                <button onClick={() => setShowMore(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1">
                  <X size={18} />
                </button>
              </div>

              {/* More nav items — grid */}
              <div className="p-4 grid grid-cols-4 gap-2 max-h-[55vh] overflow-y-auto">
                {moreItems.map((item, i) => {
                  const active = isActive(item.path);
                  return (
                    <NavLink
                      key={i}
                      to={item.path}
                      end={item.path === `/${role}`}
                      className={`
                        flex flex-col items-center gap-1.5 p-2.5 rounded-2xl transition-all
                        ${active
                          ? `${roleBg[role].replace('bg-', 'bg-').replace('500', '50')} dark:bg-white/5 ring-1 ring-current`
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }
                      `}
                    >
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center
                        ${active ? `${roleBg[role]} text-white shadow-sm` : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}
                      `}>
                        <item.icon size={20} />
                      </div>
                      <span className={`text-[10px] font-medium text-center leading-tight line-clamp-2
                        ${active ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400'}
                      `}>
                        {getLabel(item)}
                      </span>
                    </NavLink>
                  );
                })}
              </div>

              {/* Logout in sheet */}
              <div className="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-semibold transition-all"
                >
                  <LogOut size={16} />
                  {t('logout')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
