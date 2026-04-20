import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import ErrorBoundary from './components/common/ErrorBoundary';
import ToastContainer from './components/common/Toast';
import DashboardLayout from './components/layout/DashboardLayout';
import NotFoundPage from './pages/NotFoundPage';

// ── Lazy imports ──────────────────────────────────────────────────────────────
const LoginPage              = lazy(() => import('./pages/LoginPage'));
const OwnerDashboard         = lazy(() => import('./pages/owner/OwnerDashboard'));
const AdminDashboard         = lazy(() => import('./pages/admin/AdminDashboard'));
const TeacherDashboard       = lazy(() => import('./pages/teacher/TeacherDashboard'));
const StudentDashboard       = lazy(() => import('./pages/student/StudentDashboard'));
const ParentDashboard        = lazy(() => import('./pages/parent/ParentDashboard'));
const AIGradingPage          = lazy(() => import('./pages/teacher/AIGradingPage'));
const EarlyWarningPage       = lazy(() => import('./pages/admin/EarlyWarningPage'));
const CalendarPage           = lazy(() => import('./pages/shared/CalendarPage'));
const BadgesPage             = lazy(() => import('./pages/student/BadgesPage'));
const SubjectAttendancePage  = lazy(() => import('./pages/student/SubjectAttendancePage'));
const PDFReportPage          = lazy(() => import('./pages/shared/PDFReportPage'));
const AITutorPage            = lazy(() => import('./pages/student/AITutorPage'));
const AIParentAssistantPage  = lazy(() => import('./pages/parent/AIParentAssistantPage'));
const AdvancedAnalyticsPage  = lazy(() => import('./pages/shared/AdvancedAnalyticsPage'));
const VideoLibraryPage       = lazy(() => import('./pages/shared/VideoLibraryPage'));
const OnlineExamPage         = lazy(() => import('./pages/student/OnlineExamPage'));
const TutoringPage           = lazy(() => import('./pages/student/TutoringPage'));
const BrandingPage           = lazy(() => import('./pages/owner/BrandingPage'));
const MessagesPage           = lazy(() => import('./pages/shared/MessagesPage'));
const ReportsPage            = lazy(() => import('./pages/shared/ReportsPage'));
const PaymentsPage           = lazy(() => import('./pages/shared/PaymentsPage'));
const LibraryPage            = lazy(() => import('./pages/shared/LibraryPage'));
const AttendancePage         = lazy(() => import('./pages/shared/AttendancePage'));
const AnnouncementsPage      = lazy(() => import('./pages/shared/AnnouncementsPage'));
const SettingsPage           = lazy(() => import('./pages/shared/SettingsPage'));
const PermissionsPage        = lazy(() => import('./pages/shared/PermissionsPage'));
const SchedulePage           = lazy(() => import('./pages/shared/SchedulePage'));
// New pages
const FeesManagementPage     = lazy(() => import('./pages/shared/FeesManagementPage'));
const ExamBuilderPage        = lazy(() => import('./pages/teacher/ExamBuilderPage'));
const StaffManagementPage    = lazy(() => import('./pages/admin/StaffManagementPage'));
const ParentCommunicationPage= lazy(() => import('./pages/teacher/ParentCommunicationPage'));
const StudentAnalyticsPage   = lazy(() => import('./pages/shared/StudentAnalyticsPage'));
const ActivitiesPage         = lazy(() => import('./pages/shared/ActivitiesPage'));
const SchoolReportsPage      = lazy(() => import('./pages/owner/SchoolReportsPage'));

// ── Spinner fallback ──────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
    </div>
  );
}

// ── Protected route ───────────────────────────────────────────────────────────
function ProtectedLayout({ role, children }) {
  const { isAuthenticated, currentUser } = useAppStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (currentUser?.role !== role) return <Navigate to={`/${currentUser?.role}`} replace />;
  return (
    <DashboardLayout role={role}>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </ErrorBoundary>
    </DashboardLayout>
  );
}

// ── Inline list components (extracted from App to reduce App.jsx size) ────────
function SchoolsPlaceholder() {
  const { schools, lang } = useAppStore();
  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang==='ar'?'المدارس':'Schools'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schools.map(sc => (
          <div key={sc.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: sc.color+'20' }}>{sc.logo}</div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{lang==='ar'?sc.name:sc.nameEn}</h3>
                <p className="text-sm text-slate-500">{sc.location} | {sc.students} {lang==='ar'?'طالب':'students'} | {sc.teachers} {lang==='ar'?'معلم':'teachers'}</p>
                <span className={`badge mt-1 ${sc.status==='active'?'badge-green':'badge-orange'}`}>{sc.contract}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeachersList() {
  const { getSchoolTeachers, lang, t } = useAppStore();
  const teachers = getSchoolTeachers();
  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('teachers')}</h1>
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="table-header text-start">{t('name')}</th>
              <th className="table-header text-start">{t('subject')}</th>
              <th className="table-header text-start">{lang==='ar'?'الفصول':'Classes'}</th>
              <th className="table-header text-start">{t('email')}</th>
              <th className="table-header text-start">{lang==='ar'?'الراتب':'Salary'}</th>
              <th className="table-header text-start">{lang==='ar'?'الحضور':'Att.'}</th>
            </tr></thead>
            <tbody>
              {teachers.map(t_ => (
                <tr key={t_.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xs font-bold text-emerald-600">{(lang==='ar'?t_.name:t_.nameEn).charAt(0)}</div>
                      <span className="font-medium text-sm">{lang==='ar'?t_.name:t_.nameEn}</span>
                    </div>
                  </td>
                  <td className="table-cell">{lang==='ar'?t_.subject:t_.subjectEn}</td>
                  <td className="table-cell text-xs">{t_.classes?.join(', ')}</td>
                  <td className="table-cell text-xs text-slate-500">{t_.email}</td>
                  <td className="table-cell font-semibold">{t_.salary?.toLocaleString()} EGP</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1.5">
                      <div className="w-14 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width:`${t_.attendance}%` }} />
                      </div>
                      <span className="text-xs">{t_.attendance}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StudentsList() {
  const { getSchoolStudents, lang, t } = useAppStore();
  const students = getSchoolStudents();
  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('students')}</h1>
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="table-header text-start">{t('name')}</th>
              <th className="table-header text-start">{t('grade')}</th>
              <th className="table-header text-start">GPA</th>
              <th className="table-header text-start">{t('attendance')}</th>
              <th className="table-header text-start">{t('absences')}</th>
              <th className="table-header text-start">{lang==='ar'?'المصاريف':'Fees'}</th>
            </tr></thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xs font-bold text-primary-600">{(lang==='ar'?s.name:s.nameEn).charAt(0)}</div>
                      <span className="font-medium text-sm">{lang==='ar'?s.name:s.nameEn}</span>
                    </div>
                  </td>
                  <td className="table-cell">{s.grade}</td>
                  <td className="table-cell"><span className={`font-bold ${s.gpa>=90?'text-emerald-600':s.gpa>=75?'text-blue-600':'text-orange-500'}`}>{s.gpa}%</span></td>
                  <td className="table-cell">{s.attendance}%</td>
                  <td className="table-cell"><span className={`badge ${s.absences>10?'badge-red':s.absences>5?'badge-orange':'badge-green'}`}>{s.absences}</span></td>
                  <td className="table-cell"><span className={`badge ${s.fees.due===0?'badge-green':'badge-red'}`}>{s.fees.due===0?(lang==='ar'?'مكتمل':'Paid'):`${s.fees.due.toLocaleString()} EGP`}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HomeworkList() {
  const { getSchoolHomeworks, lang, t, submitHomework, gradeHomework, currentUser } = useAppStore();
  const hw = getSchoolHomeworks();
  const isTeacher = currentUser?.role === 'teacher';
  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('homework')}</h1>
      <div className="space-y-3">
        {hw.map(h => (
          <div key={h.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{h.title}</h3>
                  <span className={`badge ${h.status==='graded'?'badge-green':h.status==='submitted'?'badge-orange':'badge-blue'}`}>{t(h.status)}</span>
                  {h.grade && <span className="badge-green">✅ {h.grade}/20</span>}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{h.description}</p>
                <div className="flex gap-4 mt-2 text-xs text-slate-400">
                  <span>📚 {h.subject}</span>
                  <span>📅 {h.dueDate}</span>
                  <span>👤 {h.assignedBy}</span>
                </div>
              </div>
              <div className="flex gap-2 ms-4">
                {!isTeacher && h.status==='pending' && <button onClick={() => submitHomework(h.id)} className="btn-primary !py-1.5 !text-xs">{t('submit')}</button>}
                {isTeacher  && h.status==='submitted' && <button onClick={() => gradeHomework(h.id, 18)} className="btn-primary !py-1.5 !text-xs">{lang==='ar'?'تصحيح':'Grade'}</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamsList() {
  const { getSchoolExams, lang, t } = useAppStore();
  const exams = getSchoolExams();
  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('exams')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map(ex => (
          <div key={ex.id} className={`card border-2 ${ex.status==='upcoming'?'border-primary-200 dark:border-primary-800':'border-emerald-200 dark:border-emerald-800'}`}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-slate-900 dark:text-white">{ex.title}</h3>
              <span className={`badge ${ex.status==='upcoming'?'badge-blue':'badge-green'}`}>{t(ex.status)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex gap-2"><span className="text-slate-400">📚</span><span className="text-slate-700 dark:text-slate-300">{ex.subject}</span></div>
              <div className="flex gap-2"><span className="text-slate-400">📅</span><span className="text-slate-700 dark:text-slate-300">{ex.date}</span></div>
              <div className="flex gap-2"><span className="text-slate-400">🕐</span><span className="text-slate-700 dark:text-slate-300">{ex.time}</span></div>
              <div className="flex gap-2"><span className="text-slate-400">⏱</span><span className="text-slate-700 dark:text-slate-300">{ex.duration} {lang==='ar'?'دقيقة':'min'}</span></div>
            </div>
            {ex.results && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div><p className="text-lg font-bold text-primary-600">{ex.results.average}</p><p className="text-xs text-slate-400">{lang==='ar'?'متوسط':'Avg'}</p></div>
                <div><p className="text-lg font-bold text-emerald-600">{ex.results.highest}</p><p className="text-xs text-slate-400">{lang==='ar'?'أعلى':'High'}</p></div>
                <div><p className="text-lg font-bold text-red-500">{ex.results.lowest}</p><p className="text-xs text-slate-400">{lang==='ar'?'أدنى':'Low'}</p></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const { isDark, lang } = useAppStore();
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang==='ar'?'rtl':'ltr');
  }, [isDark, lang]);

  const PL = ({ role, children }) => <ProtectedLayout role={role}>{children}</ProtectedLayout>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Navigate to="/login" replace />} />
        <Route path="/login"  element={<Suspense fallback={<PageLoader />}><LoginPage /></Suspense>} />

        {/* ── Owner ── */}
        <Route path="/owner"           element={<PL role="owner"><OwnerDashboard /></PL>} />
        <Route path="/owner/schools"   element={<PL role="owner"><SchoolsPlaceholder /></PL>} />
        <Route path="/owner/teachers"  element={<PL role="owner"><TeachersList /></PL>} />
        <Route path="/owner/students"  element={<PL role="owner"><StudentsList /></PL>} />
        <Route path="/owner/reports"         element={<PL role="owner"><SchoolReportsPage /></PL>} />
        <Route path="/owner/school-reports"  element={<PL role="owner"><SchoolReportsPage /></PL>} />
        <Route path="/owner/payments"  element={<PL role="owner"><PaymentsPage /></PL>} />
        <Route path="/owner/settings"  element={<PL role="owner"><SettingsPage /></PL>} />
        <Route path="/owner/calendar"  element={<PL role="owner"><CalendarPage /></PL>} />
        <Route path="/owner/analytics" element={<PL role="owner"><AdvancedAnalyticsPage /></PL>} />
        <Route path="/owner/branding"  element={<PL role="owner"><BrandingPage /></PL>} />

        {/* ── Admin ── */}
        <Route path="/admin"              element={<PL role="admin"><AdminDashboard /></PL>} />
        <Route path="/admin/teachers"     element={<PL role="admin"><TeachersList /></PL>} />
        <Route path="/admin/students"     element={<PL role="admin"><StudentsList /></PL>} />
        <Route path="/admin/staff"        element={<PL role="admin"><StaffManagementPage /></PL>} />
        <Route path="/admin/schedule"     element={<PL role="admin"><SchedulePage /></PL>} />
        <Route path="/admin/permissions"  element={<PL role="admin"><PermissionsPage /></PL>} />
        <Route path="/admin/announcements"element={<PL role="admin"><AnnouncementsPage /></PL>} />
        <Route path="/admin/reports"      element={<PL role="admin"><ReportsPage /></PL>} />
        <Route path="/admin/fees"         element={<PL role="admin"><FeesManagementPage /></PL>} />
        <Route path="/admin/payments"     element={<PL role="admin"><PaymentsPage /></PL>} />
        <Route path="/admin/settings"     element={<PL role="admin"><SettingsPage /></PL>} />
        <Route path="/admin/calendar"     element={<PL role="admin"><CalendarPage /></PL>} />
        <Route path="/admin/warnings"     element={<PL role="admin"><EarlyWarningPage /></PL>} />
        <Route path="/admin/activities"   element={<PL role="admin"><ActivitiesPage /></PL>} />
        <Route path="/admin/analytics"    element={<PL role="admin"><AdvancedAnalyticsPage /></PL>} />

        {/* ── Teacher ── */}
        <Route path="/teacher"               element={<PL role="teacher"><TeacherDashboard /></PL>} />
        <Route path="/teacher/students"      element={<PL role="teacher"><StudentsList /></PL>} />
        <Route path="/teacher/homework"      element={<PL role="teacher"><HomeworkList /></PL>} />
        <Route path="/teacher/exams"         element={<PL role="teacher"><ExamsList /></PL>} />
        <Route path="/teacher/exam-builder"  element={<PL role="teacher"><ExamBuilderPage /></PL>} />
        <Route path="/teacher/parents"       element={<PL role="teacher"><ParentCommunicationPage /></PL>} />
        <Route path="/teacher/schedule"      element={<PL role="teacher"><SchedulePage /></PL>} />
        <Route path="/teacher/messages"      element={<PL role="teacher"><MessagesPage /></PL>} />
        <Route path="/teacher/reports"       element={<PL role="teacher"><ReportsPage /></PL>} />
        <Route path="/teacher/settings"      element={<PL role="teacher"><SettingsPage /></PL>} />
        <Route path="/teacher/ai-grading"    element={<PL role="teacher"><AIGradingPage /></PL>} />
        <Route path="/teacher/calendar"      element={<PL role="teacher"><CalendarPage /></PL>} />
        <Route path="/teacher/videos"        element={<PL role="teacher"><VideoLibraryPage /></PL>} />
        <Route path="/teacher/analytics"     element={<PL role="teacher"><AdvancedAnalyticsPage /></PL>} />
        <Route path="/teacher/activities"    element={<PL role="teacher"><ActivitiesPage /></PL>} />

        {/* ── Student ── */}
        <Route path="/student"                  element={<PL role="student"><StudentDashboard /></PL>} />
        <Route path="/student/schedule"         element={<PL role="student"><SchedulePage /></PL>} />
        <Route path="/student/library"          element={<PL role="student"><LibraryPage /></PL>} />
        <Route path="/student/homework"         element={<PL role="student"><HomeworkList /></PL>} />
        <Route path="/student/exams"            element={<PL role="student"><ExamsList /></PL>} />
        <Route path="/student/attendance"       element={<PL role="student"><AttendancePage /></PL>} />
        <Route path="/student/payments"         element={<PL role="student"><PaymentsPage /></PL>} />
        <Route path="/student/messages"         element={<PL role="student"><MessagesPage /></PL>} />
        <Route path="/student/badges"           element={<PL role="student"><BadgesPage /></PL>} />
        <Route path="/student/calendar"         element={<PL role="student"><CalendarPage /></PL>} />
        <Route path="/student/subject-attendance" element={<PL role="student"><SubjectAttendancePage /></PL>} />
        <Route path="/student/pdf-report"       element={<PL role="student"><PDFReportPage /></PL>} />
        <Route path="/student/ai-tutor"         element={<PL role="student"><AITutorPage /></PL>} />
        <Route path="/student/online-exam"      element={<PL role="student"><OnlineExamPage /></PL>} />
        <Route path="/student/tutoring"         element={<PL role="student"><TutoringPage /></PL>} />
        <Route path="/student/videos"           element={<PL role="student"><VideoLibraryPage /></PL>} />
        <Route path="/student/analytics"        element={<PL role="student"><StudentAnalyticsPage /></PL>} />
        <Route path="/student/activities"       element={<PL role="student"><ActivitiesPage /></PL>} />

        {/* ── Parent ── */}
        <Route path="/parent"              element={<PL role="parent"><ParentDashboard /></PL>} />
        <Route path="/parent/schedule"     element={<PL role="parent"><SchedulePage /></PL>} />
        <Route path="/parent/performance"  element={<PL role="parent"><ReportsPage /></PL>} />
        <Route path="/parent/attendance"   element={<PL role="parent"><AttendancePage /></PL>} />
        <Route path="/parent/payments"     element={<PL role="parent"><PaymentsPage /></PL>} />
        <Route path="/parent/fees"         element={<PL role="parent"><FeesManagementPage /></PL>} />
        <Route path="/parent/permissions"  element={<PL role="parent"><PermissionsPage /></PL>} />
        <Route path="/parent/messages"     element={<PL role="parent"><MessagesPage /></PL>} />
        <Route path="/parent/notifications"element={<PL role="parent"><AnnouncementsPage /></PL>} />
        <Route path="/parent/calendar"     element={<PL role="parent"><CalendarPage /></PL>} />
        <Route path="/parent/pdf-report"   element={<PL role="parent"><PDFReportPage /></PL>} />
        <Route path="/parent/ai-assistant" element={<PL role="parent"><AIParentAssistantPage /></PL>} />
        <Route path="/parent/analytics"    element={<PL role="parent"><StudentAnalyticsPage /></PL>} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global Toast */}
      <ToastContainer />
    </BrowserRouter>
  );
}
