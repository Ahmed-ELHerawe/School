# 🎓 منظومة التعليم الذكي - EduSmart System

نظام إدارة تعليمي متكامل مبني بـ React + Vite + Zustand + Formik

## 🚀 تشغيل المشروع

```bash
npm install
npm run dev
```

ثم افتح المتصفح على: **http://localhost:5173**

## 👥 بيانات الدخول (Demo)

| الدور | البريد الإلكتروني | كلمة المرور |
|-------|------------------|-------------|
| المالك (Owner) | owner@school.com | 123456 |
| مدير المدرسة (Admin) | admin@school.com | 123456 |
| معلم (Teacher) | teacher@school.com | 123456 |
| طالب (Student) | student@school.com | 123456 |
| ولي أمر (Parent) | parent@school.com | 123456 |

## ✨ المميزات

### 🏢 داشبورد المالك (Owner)
- عرض كل المدارس مع الإحصائيات
- تتبع الإيرادات والأداء
- تقارير شاملة

### 🏫 داشبورد مدير المدرسة (Admin)
- إدارة المعلمين والطلاب والموظفين
- الجدول الدراسي
- طلبات الغياب (موافقة/رفض)
- الإعلانات
- التقارير والإحصائيات
- متابعة المصاريف

### 👨‍🏫 داشبورد المعلم (Teacher)
- إضافة وتصحيح الواجبات
- إنشاء الامتحانات
- متابعة أداء الطلاب
- المحادثات مع أولياء الأمور

### 👦 داشبورد الطالب (Student)
- الجدول الدراسي اليومي
- الواجبات والامتحانات
- المكتبة الرقمية
- سجل الغياب
- متابعة المصاريف
- نقل إلى مدرسة أخرى

### 👨‍👦 داشبورد ولي الأمر (Parent)
- متابعة أداء الابن
- جدول الابن
- طلبات الغياب
- مراسلة المعلمين
- متابعة المصاريف

## 🛠️ التقنيات المستخدمة

- **React 18** + **Vite**
- **React Router v6** (Browser Router)
- **Zustand** (State Management)
- **Formik** + **Yup** (Forms & Validation)
- **Tailwind CSS** (Styling)
- **Recharts** (Charts)
- **Lucide React** (Icons)
- **i18n** (Arabic + English)
- **Dark/Light Mode**

## 📁 هيكل المشروع

```
src/
├── components/
│   ├── common/          # Modal, StatCard, NotificationsPanel
│   └── layout/          # DashboardLayout
├── data/
│   └── mockData.js      # بيانات تجريبية
├── i18n/
│   └── translations.js  # ترجمات عربي/إنجليزي
├── pages/
│   ├── owner/           # صفحات المالك
│   ├── admin/           # صفحات المدير
│   ├── teacher/         # صفحات المعلم
│   ├── student/         # صفحات الطالب
│   ├── parent/          # صفحات ولي الأمر
│   └── shared/          # صفحات مشتركة
├── store/
│   └── useAppStore.js   # Zustand Store
├── App.jsx              # Router الرئيسي
└── main.jsx
```
