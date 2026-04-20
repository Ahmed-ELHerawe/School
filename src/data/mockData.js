// ═══════════════════════════════════════════════════════════════════════════════
// SCHOOL SYSTEM v4 — MOCK DATA
// كل مدرسة لها: مدير + معلمين + طلاب + أولياء أمور خاصين بيها
// ═══════════════════════════════════════════════════════════════════════════════

export const schools = [
  { id: 1, name: 'مدرسة النيل الدولية',   nameEn: 'Nile International School', logo: '🏫', color: '#0e8fe3', students: 1240, teachers: 86, stage: 'k12',       location: 'القاهرة',     contract: 'premium',  status: 'active', revenue: 450000, founded: 2010 },
  { id: 2, name: 'أكاديمية المستقبل',     nameEn: 'Future Academy',             logo: '🎓', color: '#8b5cf6', students:  876, teachers: 62, stage: 'k12',       location: 'الجيزة',      contract: 'standard', status: 'active', revenue: 310000, founded: 2015 },
  { id: 3, name: 'مدرسة الأمل',          nameEn: 'Hope School',                logo: '⭐', color: '#10b981', students:  540, teachers: 41, stage: 'primary',    location: 'الإسكندرية', contract: 'basic',    status: 'active', revenue: 180000, founded: 2018 },
  { id: 4, name: 'مدرسة الرواد',         nameEn: 'Pioneers School',            logo: '🌟', color: '#f97316', students:  320, teachers: 28, stage: 'secondary',  location: 'المنصورة',   contract: 'standard', status: 'trial',  revenue:  95000, founded: 2020 },
];

// ─── USERS (auth) ─────────────────────────────────────────────────────────────
// المالك — يرى كل المدارس
// كل مدرسة لها مدير + معلمين + طلاب + أولياء أمور
export const systemUsers = [
  // Owner
  { id: 'u0',  email: 'owner@school.com',   password: '123456', role: 'owner',   name: 'محمد الأمين',    nameEn: 'Mohamed Al-Amin',   avatar: '👑', schoolId: null },

  // School 1 — النيل
  { id: 'u1',  email: 'admin@nile.com',     password: '123456', role: 'admin',   name: 'أحمد محفوظ',    nameEn: 'Ahmed Mahfouz',      avatar: '🏫', schoolId: 1 },
  { id: 'u2',  email: 'math@nile.com',      password: '123456', role: 'teacher', name: 'أ. محمد علي',   nameEn: 'Mr. Mohamed Ali',    avatar: '👨‍🏫', schoolId: 1, teacherId: 1 },
  { id: 'u3',  email: 'arabic@nile.com',    password: '123456', role: 'teacher', name: 'أ. فاطمة حسن',  nameEn: 'Ms. Fatma Hassan',   avatar: '👩‍🏫', schoolId: 1, teacherId: 2 },
  { id: 'u4',  email: 'student1@nile.com',  password: '123456', role: 'student', name: 'يوسف محمد',     nameEn: 'Youssef Mohamed',    avatar: '👦', schoolId: 1, studentId: 1 },
  { id: 'u5',  email: 'student2@nile.com',  password: '123456', role: 'student', name: 'نور أحمد',      nameEn: 'Nour Ahmed',         avatar: '👧', schoolId: 1, studentId: 2 },
  { id: 'u6',  email: 'parent1@nile.com',   password: '123456', role: 'parent',  name: 'محمد إبراهيم',  nameEn: 'Mohamed Ibrahim',    avatar: '👨‍👦', schoolId: 1, parentId: 1, studentId: 1 },

  // School 2 — المستقبل
  { id: 'u7',  email: 'admin@future.com',   password: '123456', role: 'admin',   name: 'سارة النجار',   nameEn: 'Sara Al-Najar',      avatar: '🏫', schoolId: 2 },
  { id: 'u8',  email: 'sci@future.com',     password: '123456', role: 'teacher', name: 'أ. أحمد سعيد',  nameEn: 'Mr. Ahmed Saeed',    avatar: '👨‍🏫', schoolId: 2, teacherId: 5 },
  { id: 'u9',  email: 'student1@future.com',password: '123456', role: 'student', name: 'عمر خالد',      nameEn: 'Omar Khaled',        avatar: '👦', schoolId: 2, studentId: 5 },
  { id: 'u10', email: 'parent1@future.com', password: '123456', role: 'parent',  name: 'خالد حسن',      nameEn: 'Khaled Hassan',      avatar: '👨‍👦', schoolId: 2, parentId: 3, studentId: 5 },

  // School 3 — الأمل
  { id: 'u11', email: 'admin@hope.com',     password: '123456', role: 'admin',   name: 'منى الشريف',    nameEn: 'Mona Al-Sharif',     avatar: '🏫', schoolId: 3 },
  { id: 'u12', email: 'eng@hope.com',       password: '123456', role: 'teacher', name: 'أ. سارة محمود', nameEn: 'Ms. Sara Mahmoud',   avatar: '👩‍🏫', schoolId: 3, teacherId: 7 },
  { id: 'u13', email: 'student1@hope.com',  password: '123456', role: 'student', name: 'مريم سامي',     nameEn: 'Mariam Sami',        avatar: '👧', schoolId: 3, studentId: 7 },
  { id: 'u14', email: 'parent1@hope.com',   password: '123456', role: 'parent',  name: 'سامي محمود',    nameEn: 'Sami Mahmoud',       avatar: '👨‍👦', schoolId: 3, parentId: 5, studentId: 7 },

  // School 4 — الرواد
  { id: 'u15', email: 'admin@pioneers.com', password: '123456', role: 'admin',   name: 'كريم النجار',   nameEn: 'Karim Al-Najar',     avatar: '🏫', schoolId: 4 },
  { id: 'u16', email: 'math@pioneers.com',  password: '123456', role: 'teacher', name: 'أ. هند كمال',   nameEn: 'Ms. Hind Kamal',     avatar: '👩‍🏫', schoolId: 4, teacherId: 9 },
  { id: 'u17', email: 'student1@pioneers.com', password: '123456', role: 'student', name: 'زياد وليد',  nameEn: 'Ziad Walid',         avatar: '👦', schoolId: 4, studentId: 9 },
  { id: 'u18', email: 'parent1@pioneers.com',  password: '123456', role: 'parent',  name: 'وليد سعد',   nameEn: 'Walid Saad',         avatar: '👨‍👦', schoolId: 4, parentId: 7, studentId: 9 },
];

// ─── TEACHERS ─────────────────────────────────────────────────────────────────
export const teachers = [
  // School 1
  { id: 1,  name: 'أ. محمد علي',   nameEn: 'Mr. Mohamed Ali',   subject: 'الرياضيات',       subjectEn: 'Mathematics', stage: 'primary',   classes: ['الثالث أ','الثالث ب','الرابع أ'], schoolId: 1, email: 'math@nile.com',    phone: '01012345678', salary: 8500,  joinDate: '2020-09-01', attendance: 95, status: 'active' },
  { id: 2,  name: 'أ. فاطمة حسن',  nameEn: 'Ms. Fatma Hassan',  subject: 'اللغة العربية',   subjectEn: 'Arabic',      stage: 'prep',      classes: ['الأول إعدادي أ','الثاني إعدادي ب'], schoolId: 1, email: 'arabic@nile.com',  phone: '01098765432', salary: 7800,  joinDate: '2019-09-01', attendance: 98, status: 'active' },
  { id: 3,  name: 'أ. أحمد سعيد',  nameEn: 'Mr. Ahmed Saeed',  subject: 'العلوم',           subjectEn: 'Science',     stage: 'primary',   classes: ['الرابع أ','الخامس أ'], schoolId: 1, email: 'sci@nile.com',     phone: '01156789012', salary: 8000,  joinDate: '2021-09-01', attendance: 92, status: 'active' },
  { id: 4,  name: 'أ. سارة محمود', nameEn: 'Ms. Sara Mahmoud',  subject: 'اللغة الإنجليزية',subjectEn: 'English',     stage: 'secondary', classes: ['الأول ثانوي أ','الثاني ثانوي أ'], schoolId: 1, email: 'eng1@nile.com',    phone: '01234567890', salary: 9200,  joinDate: '2018-09-01', attendance: 97, status: 'active' },
  // School 2
  { id: 5,  name: 'أ. أحمد سعيد',  nameEn: 'Mr. Ahmed Saeed',  subject: 'العلوم',           subjectEn: 'Science',     stage: 'primary',   classes: ['الثالث أ'], schoolId: 2, email: 'sci@future.com',   phone: '01112345678', salary: 8200,  joinDate: '2021-01-01', attendance: 94, status: 'active' },
  { id: 6,  name: 'أ. نهى كمال',   nameEn: 'Ms. Noha Kamal',   subject: 'الرياضيات',       subjectEn: 'Mathematics', stage: 'prep',      classes: ['الأول إعدادي أ'], schoolId: 2, email: 'math@future.com',  phone: '01212345678', salary: 7600,  joinDate: '2020-06-01', attendance: 90, status: 'active' },
  // School 3
  { id: 7,  name: 'أ. سارة محمود', nameEn: 'Ms. Sara Mahmoud',  subject: 'اللغة الإنجليزية',subjectEn: 'English',     stage: 'primary',   classes: ['الرابع أ'], schoolId: 3, email: 'eng@hope.com',     phone: '01312345678', salary: 7400,  joinDate: '2022-09-01', attendance: 96, status: 'active' },
  { id: 8,  name: 'أ. كريم نصر',   nameEn: 'Mr. Karim Nasr',   subject: 'التربية الدينية', subjectEn: 'Religion',    stage: 'primary',   classes: ['الثالث أ','الرابع أ'], schoolId: 3, email: 'rel@hope.com',     phone: '01412345678', salary: 6800,  joinDate: '2021-09-01', attendance: 99, status: 'active' },
  // School 4
  { id: 9,  name: 'أ. هند كمال',   nameEn: 'Ms. Hind Kamal',   subject: 'الرياضيات',       subjectEn: 'Mathematics', stage: 'secondary', classes: ['الأول ثانوي أ'], schoolId: 4, email: 'math@pioneers.com',phone: '01512345678', salary: 9500,  joinDate: '2020-09-01', attendance: 93, status: 'active' },
  { id: 10, name: 'أ. وائل ناصر',  nameEn: 'Mr. Wael Nasser',  subject: 'الفيزياء',        subjectEn: 'Physics',     stage: 'secondary', classes: ['الثاني ثانوي أ'], schoolId: 4, email: 'phys@pioneers.com',phone: '01612345678', salary: 9000,  joinDate: '2019-09-01', attendance: 91, status: 'active' },
];

// ─── STUDENTS ─────────────────────────────────────────────────────────────────
export const students = [
  // School 1
  { id: 1, name: 'يوسف محمد',   nameEn: 'Youssef Mohamed', grade: 'الثالث أ',         stage: 'primary',   schoolId: 1, parentId: 1, gpa: 88, attendance: 92, absences: 6,  fees: { total: 15000, paid: 12000, due: 3000,  installments: [{amount:5000,date:'2024-09-01',paid:true},{amount:5000,date:'2025-01-01',paid:true},{amount:5000,date:'2025-04-01',paid:false}] }, status: 'active' },
  { id: 2, name: 'نور أحمد',    nameEn: 'Nour Ahmed',      grade: 'الثالث أ',         stage: 'primary',   schoolId: 1, parentId: 2, gpa: 94, attendance: 98, absences: 1,  fees: { total: 15000, paid: 15000, due: 0,     installments: [{amount:5000,date:'2024-09-01',paid:true},{amount:5000,date:'2025-01-01',paid:true},{amount:5000,date:'2025-04-01',paid:true}]  }, status: 'active' },
  { id: 3, name: 'عمر خالد',    nameEn: 'Omar Khaled',     grade: 'الرابع أ',         stage: 'primary',   schoolId: 1, parentId: 3, gpa: 76, attendance: 85, absences: 11, fees: { total: 15000, paid: 8000,  due: 7000,  installments: [{amount:5000,date:'2024-09-01',paid:true},{amount:5000,date:'2025-01-01',paid:false},{amount:5000,date:'2025-04-01',paid:false}] }, status: 'active' },
  { id: 4, name: 'مريم سامي',   nameEn: 'Mariam Sami',     grade: 'الأول إعدادي أ',  stage: 'prep',      schoolId: 1, parentId: 4, gpa: 91, attendance: 96, absences: 3,  fees: { total: 18000, paid: 18000, due: 0,     installments: [{amount:6000,date:'2024-09-01',paid:true},{amount:6000,date:'2025-01-01',paid:true},{amount:6000,date:'2025-04-01',paid:true}]  }, status: 'active' },
  // School 2
  { id: 5, name: 'عمر خالد',    nameEn: 'Omar Khaled',     grade: 'الثالث أ',         stage: 'primary',   schoolId: 2, parentId: 5, gpa: 82, attendance: 90, absences: 7,  fees: { total: 12000, paid: 8000,  due: 4000,  installments: [{amount:4000,date:'2024-09-01',paid:true},{amount:4000,date:'2025-01-01',paid:true},{amount:4000,date:'2025-04-01',paid:false}] }, status: 'active' },
  { id: 6, name: 'لينا وليد',   nameEn: 'Lina Walid',      grade: 'الأول إعدادي أ',  stage: 'prep',      schoolId: 2, parentId: 6, gpa: 79, attendance: 88, absences: 8,  fees: { total: 14000, paid: 10000, due: 4000,  installments: [{amount:5000,date:'2024-09-01',paid:true},{amount:5000,date:'2025-01-01',paid:true},{amount:4000,date:'2025-04-01',paid:false}] }, status: 'active' },
  // School 3
  { id: 7, name: 'مريم سامي',   nameEn: 'Mariam Sami',     grade: 'الرابع أ',         stage: 'primary',   schoolId: 3, parentId: 7, gpa: 95, attendance: 99, absences: 0,  fees: { total: 10000, paid: 10000, due: 0,     installments: [{amount:3500,date:'2024-09-01',paid:true},{amount:3500,date:'2025-01-01',paid:true},{amount:3000,date:'2025-04-01',paid:true}]  }, status: 'active' },
  { id: 8, name: 'يحيى عادل',   nameEn: 'Yahya Adel',      grade: 'الثالث أ',         stage: 'primary',   schoolId: 3, parentId: 8, gpa: 70, attendance: 80, absences: 15, fees: { total: 10000, paid: 5000,  due: 5000,  installments: [{amount:3500,date:'2024-09-01',paid:true},{amount:3500,date:'2025-01-01',paid:false},{amount:3000,date:'2025-04-01',paid:false}] }, status: 'active' },
  // School 4
  { id: 9,  name: 'زياد وليد',  nameEn: 'Ziad Walid',      grade: 'الأول ثانوي أ',   stage: 'secondary', schoolId: 4, parentId: 9, gpa: 86, attendance: 93, absences: 5,  fees: { total: 20000, paid: 15000, due: 5000,  installments: [{amount:7000,date:'2024-09-01',paid:true},{amount:7000,date:'2025-01-01',paid:true},{amount:6000,date:'2025-04-01',paid:false}]  }, status: 'active' },
  { id: 10, name: 'رانا سامر',  nameEn: 'Rana Samer',      grade: 'الثاني ثانوي أ',  stage: 'secondary', schoolId: 4, parentId:10, gpa: 78, attendance: 87, absences: 9,  fees: { total: 20000, paid: 12000, due: 8000,  installments: [{amount:7000,date:'2024-09-01',paid:true},{amount:7000,date:'2025-01-01',paid:false},{amount:6000,date:'2025-04-01',paid:false}] }, status: 'active' },
];

// ─── PARENTS ──────────────────────────────────────────────────────────────────
export const parents = [
  { id: 1,  name: 'محمد إبراهيم', nameEn: 'Mohamed Ibrahim', phone: '01012345678', email: 'parent1@nile.com',     studentIds: [1], schoolId: 1 },
  { id: 2,  name: 'أحمد علي',     nameEn: 'Ahmed Ali',       phone: '01098765432', email: 'parent2@nile.com',     studentIds: [2], schoolId: 1 },
  { id: 3,  name: 'خالد حسن',     nameEn: 'Khaled Hassan',   phone: '01156789012', email: 'parent3@nile.com',     studentIds: [3], schoolId: 1 },
  { id: 4,  name: 'سامي محمود',   nameEn: 'Sami Mahmoud',    phone: '01234567890', email: 'parent4@nile.com',     studentIds: [4], schoolId: 1 },
  { id: 5,  name: 'خالد حسن',     nameEn: 'Khaled Hassan',   phone: '01312345678', email: 'parent1@future.com',   studentIds: [5], schoolId: 2 },
  { id: 6,  name: 'وليد ناصر',    nameEn: 'Walid Nasser',    phone: '01412345678', email: 'parent2@future.com',   studentIds: [6], schoolId: 2 },
  { id: 7,  name: 'سامي محمود',   nameEn: 'Sami Mahmoud',    phone: '01512345678', email: 'parent1@hope.com',     studentIds: [7], schoolId: 3 },
  { id: 8,  name: 'عادل يحيى',    nameEn: 'Adel Yahya',      phone: '01612345678', email: 'parent2@hope.com',     studentIds: [8], schoolId: 3 },
  { id: 9,  name: 'وليد سعد',     nameEn: 'Walid Saad',      phone: '01712345678', email: 'parent1@pioneers.com', studentIds: [9], schoolId: 4 },
  { id: 10, name: 'سامر كمال',    nameEn: 'Samer Kamal',     phone: '01812345678', email: 'parent2@pioneers.com', studentIds:[10], schoolId: 4 },
];

// ─── STAFF ────────────────────────────────────────────────────────────────────
export const staff = [
  { id: 1,  name: 'محمود عادل',  role: 'سكرتير',     department: 'الإدارة',     schoolId: 1, joinDate: '2018-01-01', salary: 5000, attendance: 97, status: 'active' },
  { id: 2,  name: 'هالة نصر',    role: 'محاسب',      department: 'المالية',     schoolId: 1, joinDate: '2019-03-01', salary: 6500, attendance: 95, status: 'active' },
  { id: 3,  name: 'عمر فاروق',   role: 'حارس أمن',   department: 'الأمن',       schoolId: 1, joinDate: '2020-09-01', salary: 3800, attendance: 99, status: 'active' },
  { id: 4,  name: 'رانيا سالم',  role: 'سكرتيرة',   department: 'الإدارة',     schoolId: 2, joinDate: '2021-01-01', salary: 4800, attendance: 94, status: 'active' },
  { id: 5,  name: 'طارق حسين',   role: 'محاسب',      department: 'المالية',     schoolId: 2, joinDate: '2020-05-01', salary: 6200, attendance: 96, status: 'active' },
  { id: 6,  name: 'نادية عمر',   role: 'سكرتيرة',   department: 'الإدارة',     schoolId: 3, joinDate: '2022-09-01', salary: 4500, attendance: 98, status: 'active' },
  { id: 7,  name: 'حسام يوسف',   role: 'حارس أمن',   department: 'الأمن',       schoolId: 4, joinDate: '2021-06-01', salary: 3600, attendance: 100,status: 'active' },
];

// ─── HOMEWORKS ────────────────────────────────────────────────────────────────
export const homeworks = [
  { id: 1,  title: 'حل تمارين الكسور',           subject: 'الرياضيات',       class: 'الثالث أ',        schoolId: 1, description: 'حل التمارين من 1 إلى 10 في الكتاب المدرسي صفحة 45', dueDate: '2025-04-20', status: 'pending',   assignedBy: 'أ. محمد علي',   grade: null },
  { id: 2,  title: 'قراءة درس النهر',            subject: 'اللغة العربية',   class: 'الثالث أ',        schoolId: 1, description: 'قراءة الدرس وكتابة ملخص من 5 أسطر',                dueDate: '2025-04-18', status: 'submitted', assignedBy: 'أ. فاطمة حسن',  grade: null },
  { id: 3,  title: 'تجربة الضوء',               subject: 'العلوم',           class: 'الثالث أ',        schoolId: 1, description: 'إجراء التجربة وكتابة النتائج',                       dueDate: '2025-04-15', status: 'graded',    assignedBy: 'أ. أحمد سعيد',  grade: 18 },
  { id: 4,  title: 'Paragraph about your family',subject: 'اللغة الإنجليزية',class: 'الثالث أ',        schoolId: 1, description: 'Write 5 sentences about your family',                dueDate: '2025-04-22', status: 'pending',   assignedBy: 'أ. سارة محمود', grade: null },
  { id: 5,  title: 'مسائل الجمع والطرح',         subject: 'الرياضيات',       class: 'الثالث أ',        schoolId: 2, description: 'حل الصفحة 30 كاملة',                                dueDate: '2025-04-21', status: 'pending',   assignedBy: 'أ. نهى كمال',   grade: null },
  { id: 6,  title: 'بحث عن المياه',              subject: 'العلوم',           class: 'الثالث أ',        schoolId: 2, description: 'بحث من صفحتين عن أنواع المياه',                     dueDate: '2025-04-19', status: 'graded',    assignedBy: 'أ. أحمد سعيد',  grade: 17 },
];

// ─── EXAMS ────────────────────────────────────────────────────────────────────
export const exams = [
  { id: 1, title: 'امتحان الرياضيات الشهري',      subject: 'الرياضيات',       class: 'الثالث أ', schoolId: 1, date: '2025-04-25', time: '09:00', duration: 60,  totalMarks: 30, status: 'upcoming',  results: null },
  { id: 2, title: 'امتحان اللغة العربية',          subject: 'اللغة العربية',   class: 'الثالث أ', schoolId: 1, date: '2025-03-20', time: '10:00', duration: 90,  totalMarks: 40, status: 'completed', results: { average: 32, highest: 40, lowest: 22, passRate: 90 } },
  { id: 3, title: 'امتحان العلوم',                subject: 'العلوم',           class: 'الرابع أ', schoolId: 1, date: '2025-04-28', time: '11:00', duration: 45,  totalMarks: 20, status: 'upcoming',  results: null },
  { id: 4, title: 'Monthly Science Test',         subject: 'Science',         class: 'الثالث أ', schoolId: 2, date: '2025-04-26', time: '09:30', duration: 50,  totalMarks: 25, status: 'upcoming',  results: null },
  { id: 5, title: 'امتحان الفيزياء الفصلي',       subject: 'الفيزياء',        class: 'الثاني ثانوي أ', schoolId: 4, date: '2025-05-01', time: '10:00', duration: 120, totalMarks: 60, status: 'upcoming', results: null },
];

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
export const notifications = [
  { id: 1,  type: 'homework',  title: 'واجب جديد',           titleEn: 'New Homework',         message: 'تم إضافة واجب رياضيات', messageEn: 'Math homework added',     icon: '📚', time: 'منذ 5 دقائق',  read: false, schoolId: 1 },
  { id: 2,  type: 'exam',      title: 'امتحان قادم',          titleEn: 'Upcoming Exam',         message: 'امتحان رياضيات يوم الخميس', messageEn: 'Math exam on Thursday',  icon: '📝', time: 'منذ ساعة',     read: false, schoolId: 1 },
  { id: 3,  type: 'payment',   title: 'تذكير بالمصاريف',     titleEn: 'Fee Reminder',          message: 'موعد القسط الثالث 1 أبريل', messageEn: 'Third installment due',  icon: '💰', time: 'أمس',          read: true,  schoolId: 1 },
  { id: 4,  type: 'grade',     title: 'تم تصحيح الواجب',     titleEn: 'Homework Graded',       message: 'واجب العلوم: 18/20',         messageEn: 'Science HW: 18/20',     icon: '✅', time: 'منذ يومين',   read: true,  schoolId: 1 },
  { id: 5,  type: 'homework',  title: 'واجب جديد',           titleEn: 'New Homework',         message: 'تم إضافة واجب علوم',       messageEn: 'Science homework added',  icon: '📚', time: 'منذ 10 دقائق', read: false, schoolId: 2 },
  { id: 6,  type: 'exam',      title: 'امتحان قادم',          titleEn: 'Upcoming Exam',         message: 'امتحان علوم يوم الاثنين',  messageEn: 'Science exam Monday',    icon: '📝', time: 'منذ 2 ساعة',   read: false, schoolId: 2 },
];

// ─── MESSAGES ─────────────────────────────────────────────────────────────────
export const messages = [
  { id: 1, from: 'أ. محمد علي',   fromId: 2,  to: 'محمد إبراهيم', toId: 'p1', message: 'يوسف يحتاج تحسين في مادة الرياضيات', time: '2025-04-15T10:30:00', read: true,  schoolId: 1 },
  { id: 2, from: 'أ. فاطمة حسن',  fromId: 3,  to: 'محمد إبراهيم', toId: 'p1', message: 'تحسن ملحوظ في الكتابة، استمروا هكذا', time: '2025-04-14T09:00:00', read: false, schoolId: 1 },
  { id: 3, from: 'محمد إبراهيم',  fromId: 'p1', to: 'أ. محمد علي', toId: 2,  message: 'شكراً على الإشعار، سنهتم بالأمر',    time: '2025-04-15T11:00:00', read: true,  schoolId: 1 },
];

// ─── ABSENCE REQUESTS ─────────────────────────────────────────────────────────
export const absenceRequests = [
  { id: 1, studentId: 1, studentName: 'يوسف محمد',  parentName: 'محمد إبراهيم', reason: 'مرض',           date: '2025-04-10', status: 'approved', submittedAt: '2025-04-09', schoolId: 1 },
  { id: 2, studentId: 2, studentName: 'نور أحمد',   parentName: 'أحمد علي',     reason: 'موعد طبي',      date: '2025-04-12', status: 'pending',  submittedAt: '2025-04-11', schoolId: 1 },
  { id: 3, studentId: 3, studentName: 'عمر خالد',   parentName: 'خالد حسن',     reason: 'ظروف عائلية',  date: '2025-04-08', status: 'rejected', submittedAt: '2025-04-07', schoolId: 1 },
  { id: 4, studentId: 5, studentName: 'عمر خالد',   parentName: 'خالد حسن',     reason: 'مرض',           date: '2025-04-11', status: 'pending',  submittedAt: '2025-04-10', schoolId: 2 },
];

// ─── BOOKS ────────────────────────────────────────────────────────────────────
export const books = [
  { id: 1,  title: 'رياضيات الثالث',       subject: 'رياضيات',       grade: 'الثالث', pages: 180, coverColor: '#0e8fe3', available: 25, borrowed: 3,  schoolId: 1 },
  { id: 2,  title: 'علوم الثالث',          subject: 'علوم',           grade: 'الثالث', pages: 145, coverColor: '#10b981', available: 20, borrowed: 5,  schoolId: 1 },
  { id: 3,  title: 'لغة عربية الثالث',    subject: 'لغة عربية',     grade: 'الثالث', pages: 200, coverColor: '#f97316', available: 22, borrowed: 2,  schoolId: 1 },
  { id: 4,  title: 'إنجليزي الثالث',      subject: 'إنجليزي',       grade: 'الثالث', pages: 160, coverColor: '#8b5cf6', available: 18, borrowed: 7,  schoolId: 1 },
  { id: 5,  title: 'تربية دينية الثالث',  subject: 'تربية دينية',   grade: 'الثالث', pages: 120, coverColor: '#ec4899', available: 28, borrowed: 1,  schoolId: 1 },
  { id: 6,  title: 'رياضيات الثالث',       subject: 'رياضيات',       grade: 'الثالث', pages: 170, coverColor: '#0e8fe3', available: 15, borrowed: 4,  schoolId: 2 },
];

// ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────────
export const announcements = [
  { id: 1, title: 'إجازة نصف العام',        titleEn: 'Mid-Year Holiday',         content: 'يسعدنا إعلامكم بأن إجازة نصف العام ستبدأ في 15 أبريل وتنتهي في 22 أبريل', date: '2025-04-10', priority: 'high',   schoolId: 1, author: 'إدارة المدرسة' },
  { id: 2, title: 'حفل التخرج',             titleEn: 'Graduation Ceremony',      content: 'يقام حفل التخرج للصف الثالث الثانوي يوم الجمعة 30 مايو',                   date: '2025-04-08', priority: 'medium', schoolId: 1, author: 'إدارة المدرسة' },
  { id: 3, title: 'جدول الامتحانات الفصلية',titleEn: 'Term Exams Schedule',      content: 'يبدأ الامتحان الفصلي الثاني في 15 مايو لجميع المراحل',                     date: '2025-04-05', priority: 'high',   schoolId: 1, author: 'شعبة الامتحانات' },
  { id: 4, title: 'نشاط الرحلة المدرسية',  titleEn: 'School Trip Activity',     content: 'رحلة مدرسية إلى متحف القاهرة يوم الأربعاء 24 أبريل',                      date: '2025-04-07', priority: 'low',    schoolId: 2, author: 'إدارة الأنشطة' },
];

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────
export const schedule = {
  'الثالث أ': {
    sunday:    [ { time: '08:00-08:45', subject: 'رياضيات',       teacher: 'أ. محمد علي',   room: 'A101' }, { time: '08:45-09:30', subject: 'لغة عربية',     teacher: 'أ. فاطمة حسن',  room: 'A101' }, { time: '09:30-10:00', subject: 'استراحة', teacher: '', room: '' }, { time: '10:00-10:45', subject: 'علوم',           teacher: 'أ. أحمد سعيد',  room: 'A101' }, { time: '10:45-11:30', subject: 'لغة إنجليزية', teacher: 'أ. سارة محمود', room: 'A101' } ],
    monday:    [ { time: '08:00-08:45', subject: 'لغة إنجليزية', teacher: 'أ. سارة محمود', room: 'A101' }, { time: '08:45-09:30', subject: 'رياضيات',       teacher: 'أ. محمد علي',   room: 'A101' }, { time: '09:30-10:00', subject: 'استراحة', teacher: '', room: '' }, { time: '10:00-10:45', subject: 'تربية دينية',  teacher: 'أ. كريم نصر',   room: 'A101' }, { time: '10:45-11:30', subject: 'علوم',           teacher: 'أ. أحمد سعيد',  room: 'A101' } ],
    tuesday:   [ { time: '08:00-08:45', subject: 'لغة عربية',     teacher: 'أ. فاطمة حسن',  room: 'A101' }, { time: '08:45-09:30', subject: 'علوم',           teacher: 'أ. أحمد سعيد',  room: 'A101' }, { time: '09:30-10:00', subject: 'استراحة', teacher: '', room: '' }, { time: '10:00-10:45', subject: 'رياضيات',       teacher: 'أ. محمد علي',   room: 'A101' }, { time: '10:45-11:30', subject: 'لغة إنجليزية', teacher: 'أ. سارة محمود', room: 'A101' } ],
    wednesday: [ { time: '08:00-08:45', subject: 'علوم',           teacher: 'أ. أحمد سعيد',  room: 'A101' }, { time: '08:45-09:30', subject: 'تربية دينية',  teacher: 'أ. كريم نصر',   room: 'A101' }, { time: '09:30-10:00', subject: 'استراحة', teacher: '', room: '' }, { time: '10:00-10:45', subject: 'لغة عربية',     teacher: 'أ. فاطمة حسن',  room: 'A101' }, { time: '10:45-11:30', subject: 'رياضيات',       teacher: 'أ. محمد علي',   room: 'A101' } ],
    thursday:  [ { time: '08:00-08:45', subject: 'لغة إنجليزية', teacher: 'أ. سارة محمود', room: 'A101' }, { time: '08:45-09:30', subject: 'لغة عربية',     teacher: 'أ. فاطمة حسن',  room: 'A101' }, { time: '09:30-10:00', subject: 'استراحة', teacher: '', room: '' }, { time: '10:00-10:45', subject: 'رياضيات',       teacher: 'أ. محمد علي',   room: 'A101' }, { time: '10:45-11:30', subject: 'تربية دينية',  teacher: 'أ. كريم نصر',   room: 'A101' } ],
  },
  'الرابع أ': {
    sunday:    [ { time: '08:00-08:45', subject: 'علوم',           teacher: 'أ. أحمد سعيد',  room: 'B102' }, { time: '08:45-09:30', subject: 'رياضيات',       teacher: 'أ. محمد علي',   room: 'B102' }, { time: '09:30-10:00', subject: 'استراحة', teacher: '', room: '' }, { time: '10:00-10:45', subject: 'لغة إنجليزية', teacher: 'أ. سارة محمود', room: 'B102' }, { time: '10:45-11:30', subject: 'لغة عربية',     teacher: 'أ. فاطمة حسن',  room: 'B102' } ],
    monday:    [ { time: '08:00-08:45', subject: 'رياضيات',       teacher: 'أ. محمد علي',   room: 'B102' }, { time: '08:45-09:30', subject: 'علوم',           teacher: 'أ. أحمد سعيد',  room: 'B102' }, { time: '09:30-10:00', subject: 'استراحة', teacher: '', room: '' }, { time: '10:00-10:45', subject: 'لغة عربية',     teacher: 'أ. فاطمة حسن',  room: 'B102' }, { time: '10:45-11:30', subject: 'تربية دينية',  teacher: 'أ. كريم نصر',   room: 'B102' } ],
    tuesday:   [ { time: '08:00-08:45', subject: 'لغة إنجليزية', teacher: 'أ. سارة محمود', room: 'B102' }, { time: '08:45-09:30', subject: 'لغة عربية',     teacher: 'أ. فاطمة حسن',  room: 'B102' }, { time: '09:30-10:00', subject: 'استراحة', teacher: '', room: '' }, { time: '10:00-10:45', subject: 'علوم',           teacher: 'أ. أحمد سعيد',  room: 'B102' }, { time: '10:45-11:30', subject: 'رياضيات',       teacher: 'أ. محمد علي',   room: 'B102' } ],
    wednesday: [ { time: '08:00-08:45', subject: 'لغة عربية',     teacher: 'أ. فاطمة حسن',  room: 'B102' }, { time: '08:45-09:30', subject: 'تربية دينية',  teacher: 'أ. كريم نصر',   room: 'B102' }, { time: '09:30-10:00', subject: 'استراحة', teacher: '', room: '' }, { time: '10:00-10:45', subject: 'رياضيات',       teacher: 'أ. محمد علي',   room: 'B102' }, { time: '10:45-11:30', subject: 'علوم',           teacher: 'أ. أحمد سعيد',  room: 'B102' } ],
    thursday:  [ { time: '08:00-08:45', subject: 'علوم',           teacher: 'أ. أحمد سعيد',  room: 'B102' }, { time: '08:45-09:30', subject: 'رياضيات',       teacher: 'أ. محمد علي',   room: 'B102' }, { time: '09:30-10:00', subject: 'استراحة', teacher: '', room: '' }, { time: '10:00-10:45', subject: 'لغة إنجليزية', teacher: 'أ. سارة محمود', room: 'B102' }, { time: '10:45-11:30', subject: 'لغة عربية',     teacher: 'أ. فاطمة حسن',  room: 'B102' } ],
  },
};

// ─── MONTHLY PERFORMANCE ──────────────────────────────────────────────────────
export const monthlyPerformance = [
  { month: 'سبت', average: 82, attendance: 95, homework: 78 },
  { month: 'أكت', average: 85, attendance: 97, homework: 82 },
  { month: 'نوف', average: 80, attendance: 93, homework: 75 },
  { month: 'ديس', average: 88, attendance: 96, homework: 85 },
  { month: 'ين',  average: 84, attendance: 94, homework: 80 },
  { month: 'فبر', average: 87, attendance: 98, homework: 88 },
  { month: 'مار', average: 90, attendance: 97, homework: 92 },
];

// ─── ACTIVITIES ───────────────────────────────────────────────────────────────
export const activities = [
  { id: 1, name: 'فريق كرة القدم',     nameEn: 'Football Team',    type: 'رياضي',     supervisor: 'أ. محمد علي',   day: 'الأربعاء', time: '14:00-16:00', maxStudents: 22, enrolled: 18, schoolId: 1 },
  { id: 2, name: 'نادي الفن والرسم',   nameEn: 'Art Club',         type: 'فني',       supervisor: 'أ. فاطمة حسن',  day: 'الثلاثاء', time: '13:30-15:00', maxStudents: 15, enrolled: 12, schoolId: 1 },
  { id: 3, name: 'فريق الخطابة',       nameEn: 'Debate Team',      type: 'أكاديمي',   supervisor: 'أ. سارة محمود', day: 'الخميس',   time: '13:00-14:30', maxStudents: 10, enrolled: 8,  schoolId: 1 },
  { id: 4, name: 'نادي العلوم',        nameEn: 'Science Club',     type: 'أكاديمي',   supervisor: 'أ. أحمد سعيد',  day: 'الاثنين',  time: '14:00-15:30', maxStudents: 20, enrolled: 15, schoolId: 2 },
];

// ─── PAYMENTS HISTORY ─────────────────────────────────────────────────────────
export const paymentHistory = [
  { id: 1, studentId: 1, studentName: 'يوسف محمد',  amount: 5000, date: '2024-09-01', installment: 1, method: 'نقداً',      notes: '',               schoolId: 1 },
  { id: 2, studentId: 1, studentName: 'يوسف محمد',  amount: 5000, date: '2025-01-01', installment: 2, method: 'تحويل بنكي', notes: 'محول',           schoolId: 1 },
  { id: 3, studentId: 2, studentName: 'نور أحمد',   amount: 5000, date: '2024-09-01', installment: 1, method: 'نقداً',      notes: '',               schoolId: 1 },
  { id: 4, studentId: 2, studentName: 'نور أحمد',   amount: 5000, date: '2025-01-01', installment: 2, method: 'نقداً',      notes: '',               schoolId: 1 },
  { id: 5, studentId: 2, studentName: 'نور أحمد',   amount: 5000, date: '2025-04-01', installment: 3, method: 'فيزا',       notes: 'مدفوع إلكتروني',schoolId: 1 },
  { id: 6, studentId: 5, studentName: 'عمر خالد',   amount: 4000, date: '2024-09-01', installment: 1, method: 'نقداً',      notes: '',               schoolId: 2 },
  { id: 7, studentId: 5, studentName: 'عمر خالد',   amount: 4000, date: '2025-01-01', installment: 2, method: 'تحويل بنكي', notes: '',               schoolId: 2 },
];

export const stages = [
  { id: 'kg',        name: 'رياض أطفال',        nameEn: 'Kindergarten', grades: ['KG1', 'KG2'] },
  { id: 'primary',   name: 'المرحلة الابتدائية', nameEn: 'Primary',      grades: ['الأول','الثاني','الثالث','الرابع','الخامس','السادس'] },
  { id: 'prep',      name: 'المرحلة الإعدادية',  nameEn: 'Preparatory',  grades: ['الأول الإعدادي','الثاني الإعدادي','الثالث الإعدادي'] },
  { id: 'secondary', name: 'المرحلة الثانوية',   nameEn: 'Secondary',    grades: ['الأول الثانوي','الثاني الثانوي','الثالث الثانوي'] },
];
