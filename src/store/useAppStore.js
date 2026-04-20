import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations } from '../i18n/translations';
import * as mockData from '../data/mockData';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // ── Theme ──────────────────────────────────────────────────────────────
      isDark: false,
      toggleTheme: () => {
        const v = !get().isDark;
        set({ isDark: v });
        document.documentElement.classList.toggle('dark', v);
      },

      // ── Language ───────────────────────────────────────────────────────────
      lang: 'ar',
      toggleLang: () => {
        const l = get().lang === 'ar' ? 'en' : 'ar';
        set({ lang: l });
        document.documentElement.setAttribute('lang', l);
        document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
      },
      t: (key) => translations[get().lang]?.[key] || key,

      // ── Auth ───────────────────────────────────────────────────────────────
      currentUser: null,
      isAuthenticated: false,
      login: (user) => set({ currentUser: user, isAuthenticated: true }),
      logout: () => set({ currentUser: null, isAuthenticated: false }),

      // ── UI ─────────────────────────────────────────────────────────────────
      sidebarOpen: true,
      toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),

      // ── Toast System ───────────────────────────────────────────────────────
      toasts: [],
      showToast: (message, type = 'success', duration = 3500) => {
        const id = Date.now() + Math.random();
        set(s => ({ toasts: [...s.toasts, { id, message, type }] }));
        setTimeout(() => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })), duration);
      },
      removeToast: (id) => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),

      // ── Data (scoped by schoolId for non-owner roles) ──────────────────────
      schools:         mockData.schools,
      teachers:        mockData.teachers,
      students:        mockData.students,
      parents:         mockData.parents,
      staff:           mockData.staff,
      homeworks:       mockData.homeworks,
      exams:           mockData.exams,
      notifications:   mockData.notifications,
      messages:        mockData.messages,
      absenceRequests: mockData.absenceRequests,
      books:           mockData.books,
      announcements:   mockData.announcements,
      schedule:        mockData.schedule,
      monthlyPerformance: mockData.monthlyPerformance,
      activities:      mockData.activities,
      paymentHistory:  mockData.paymentHistory,

      // ── Scoped helpers (return only data for current school) ───────────────
      getSchoolTeachers:  () => get().teachers.filter(t  => t.schoolId  === get().currentUser?.schoolId),
      getSchoolStudents:  () => get().students.filter(s  => s.schoolId  === get().currentUser?.schoolId),
      getSchoolStaff:     () => get().staff.filter(s     => s.schoolId  === get().currentUser?.schoolId),
      getSchoolHomeworks: () => get().homeworks.filter(h => h.schoolId  === get().currentUser?.schoolId),
      getSchoolExams:     () => get().exams.filter(e     => e.schoolId  === get().currentUser?.schoolId),
      getSchoolBooks:     () => get().books.filter(b     => b.schoolId  === get().currentUser?.schoolId),
      getSchoolAnnouncements: () => get().announcements.filter(a => a.schoolId === get().currentUser?.schoolId),
      getSchoolActivities:    () => get().activities.filter(a  => a.schoolId === get().currentUser?.schoolId),
      getSchoolPaymentHistory:() => get().paymentHistory.filter(p => p.schoolId === get().currentUser?.schoolId),
      getSchoolNotifications: () => get().notifications.filter(n =>
        n.schoolId === get().currentUser?.schoolId || get().currentUser?.role === 'owner'
      ),

      // ── Notifications ──────────────────────────────────────────────────────
      markNotificationRead: (id) => set(s => ({
        notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),
      markAllNotificationsRead: () => set(s => ({
        notifications: s.notifications.map(n => ({ ...n, read: true }))
      })),
      addNotification: (notif) => {
        const schoolId = get().currentUser?.schoolId;
        set(s => ({ notifications: [{ ...notif, id: Date.now(), read: false, schoolId }, ...s.notifications] }));
      },

      // ── Messages ───────────────────────────────────────────────────────────
      sendMessage: (msg) => {
        const schoolId = get().currentUser?.schoolId;
        set(s => ({ messages: [...s.messages, { ...msg, id: Date.now(), time: new Date().toISOString(), schoolId }] }));
        get().showToast(get().lang === 'ar' ? 'تم إرسال الرسالة' : 'Message sent', 'success');
      },

      // ── Homework ───────────────────────────────────────────────────────────
      submitHomework: (hwId) => {
        set(s => ({ homeworks: s.homeworks.map(h => h.id === hwId ? { ...h, status: 'submitted' } : h) }));
        get().showToast(get().lang === 'ar' ? 'تم تسليم الواجب' : 'Homework submitted', 'success');
      },
      gradeHomework: (hwId, grade) => {
        set(s => ({ homeworks: s.homeworks.map(h => h.id === hwId ? { ...h, status: 'graded', grade } : h) }));
        get().showToast(get().lang === 'ar' ? 'تم التصحيح بنجاح' : 'Graded successfully', 'success');
      },
      addHomework: (hw) => {
        const schoolId = get().currentUser?.schoolId;
        set(s => ({ homeworks: [{ ...hw, id: Date.now(), status: 'pending', schoolId }, ...s.homeworks] }));
        get().showToast(get().lang === 'ar' ? 'تم إضافة الواجب' : 'Homework added', 'success');
      },
      deleteHomework: (id) => {
        set(s => ({ homeworks: s.homeworks.filter(h => h.id !== id) }));
        get().showToast(get().lang === 'ar' ? 'تم حذف الواجب' : 'Homework deleted', 'info');
      },

      // ── Exams ──────────────────────────────────────────────────────────────
      addExam: (exam) => {
        const schoolId = get().currentUser?.schoolId;
        set(s => ({ exams: [{ ...exam, id: Date.now(), status: 'upcoming', schoolId }, ...s.exams] }));
        get().showToast(get().lang === 'ar' ? 'تم إضافة الامتحان' : 'Exam added', 'success');
      },
      deleteExam: (id) => {
        set(s => ({ exams: s.exams.filter(e => e.id !== id) }));
        get().showToast(get().lang === 'ar' ? 'تم حذف الامتحان' : 'Exam deleted', 'info');
      },

      // ── Absence Requests ───────────────────────────────────────────────────
      addAbsenceRequest: (req) => {
        const schoolId = get().currentUser?.schoolId;
        set(s => ({ absenceRequests: [{ ...req, id: Date.now(), status: 'pending', submittedAt: new Date().toISOString().split('T')[0], schoolId }, ...s.absenceRequests] }));
        get().showToast(get().lang === 'ar' ? 'تم إرسال طلب الغياب' : 'Absence request sent', 'success');
      },
      updateAbsenceRequest: (id, status) => {
        set(s => ({ absenceRequests: s.absenceRequests.map(r => r.id === id ? { ...r, status } : r) }));
        get().showToast(
          get().lang === 'ar' ? (status === 'approved' ? 'تم الموافقة على الطلب' : 'تم رفض الطلب') : (status === 'approved' ? 'Request approved' : 'Request rejected'),
          status === 'approved' ? 'success' : 'error'
        );
      },

      // ── Students ───────────────────────────────────────────────────────────
      addStudent: (student) => {
        const schoolId = get().currentUser?.schoolId;
        const id = Date.now();
        set(s => ({ students: [...s.students, { ...student, id, schoolId, status: 'active' }] }));
        get().showToast(get().lang === 'ar' ? 'تم إضافة الطالب' : 'Student added', 'success');
        return id;
      },
      updateStudent: (id, updates) => {
        set(s => ({ students: s.students.map(st => st.id === id ? { ...st, ...updates } : st) }));
        get().showToast(get().lang === 'ar' ? 'تم تحديث بيانات الطالب' : 'Student updated', 'success');
      },
      transferStudent: (studentId, newSchoolId) => {
        set(s => ({ students: s.students.map(st => st.id === studentId ? { ...st, schoolId: newSchoolId } : st) }));
        get().showToast(get().lang === 'ar' ? 'تم نقل الطالب' : 'Student transferred', 'success');
      },

      // ── Payments ───────────────────────────────────────────────────────────
      recordPayment: (studentId, amount, method, installment, notes = '') => {
        const schoolId = get().currentUser?.schoolId;
        const student  = get().students.find(s => s.id === studentId);
        if (!student) return;
        // Update student fees
        const newPaid = student.fees.paid + amount;
        const newDue  = Math.max(0, student.fees.due - amount);
        set(s => ({
          students: s.students.map(st => st.id === studentId
            ? { ...st, fees: { ...st.fees, paid: newPaid, due: newDue } }
            : st
          ),
          paymentHistory: [...s.paymentHistory, {
            id: Date.now(), studentId, studentName: student.name, amount, method, installment,
            date: new Date().toISOString().split('T')[0], notes, schoolId
          }]
        }));
        get().showToast(get().lang === 'ar' ? `تم تسجيل دفعة ${amount.toLocaleString()} EGP` : `Payment of ${amount.toLocaleString()} EGP recorded`, 'success');
      },

      // ── Announcements ──────────────────────────────────────────────────────
      addAnnouncement: (ann) => {
        const schoolId = get().currentUser?.schoolId;
        set(s => ({ announcements: [{ ...ann, id: Date.now(), date: new Date().toISOString().split('T')[0], schoolId }, ...s.announcements] }));
        get().showToast(get().lang === 'ar' ? 'تم نشر الإعلان' : 'Announcement published', 'success');
      },
      deleteAnnouncement: (id) => {
        set(s => ({ announcements: s.announcements.filter(a => a.id !== id) }));
        get().showToast(get().lang === 'ar' ? 'تم حذف الإعلان' : 'Announcement deleted', 'info');
      },

      // ── Teachers ───────────────────────────────────────────────────────────
      addTeacher: (teacher) => {
        const schoolId = get().currentUser?.schoolId;
        set(s => ({ teachers: [...s.teachers, { ...teacher, id: Date.now(), schoolId, status: 'active' }] }));
        get().showToast(get().lang === 'ar' ? 'تم إضافة المعلم' : 'Teacher added', 'success');
      },
      updateTeacher: (id, updates) => {
        set(s => ({ teachers: s.teachers.map(t => t.id === id ? { ...t, ...updates } : t) }));
        get().showToast(get().lang === 'ar' ? 'تم تحديث بيانات المعلم' : 'Teacher updated', 'success');
      },

      // ── Staff ──────────────────────────────────────────────────────────────
      addStaff: (member) => {
        const schoolId = get().currentUser?.schoolId;
        set(s => ({ staff: [...s.staff, { ...member, id: Date.now(), schoolId, status: 'active' }] }));
        get().showToast(get().lang === 'ar' ? 'تم إضافة الموظف' : 'Staff added', 'success');
      },
      updateStaff: (id, updates) => {
        set(s => ({ staff: s.staff.map(m => m.id === id ? { ...m, ...updates } : m) }));
      },

      // ── Activities ─────────────────────────────────────────────────────────
      addActivity: (activity) => {
        const schoolId = get().currentUser?.schoolId;
        set(s => ({ activities: [...s.activities, { ...activity, id: Date.now(), schoolId, enrolled: 0 }] }));
        get().showToast(get().lang === 'ar' ? 'تم إضافة النشاط' : 'Activity added', 'success');
      },
      enrollInActivity: (activityId) => {
        set(s => ({ activities: s.activities.map(a => a.id === activityId ? { ...a, enrolled: a.enrolled + 1 } : a) }));
        get().showToast(get().lang === 'ar' ? 'تم التسجيل في النشاط' : 'Enrolled in activity', 'success');
      },

      // ── Library ────────────────────────────────────────────────────────────
      borrowBook: (bookId) => {
        set(s => ({ books: s.books.map(b => b.id === bookId ? { ...b, borrowed: b.borrowed + 1, available: b.available - 1 } : b) }));
        get().showToast(get().lang === 'ar' ? 'تم استعارة الكتاب' : 'Book borrowed', 'success');
      },
      returnBook: (bookId) => {
        set(s => ({ books: s.books.map(b => b.id === bookId ? { ...b, borrowed: Math.max(0, b.borrowed - 1), available: b.available + 1 } : b) }));
        get().showToast(get().lang === 'ar' ? 'تم إرجاع الكتاب' : 'Book returned', 'success');
      },
    }),
    {
      name: 'school-system-v4',
      partialState: (state) => ({
        isDark: state.isDark,
        lang: state.lang,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
