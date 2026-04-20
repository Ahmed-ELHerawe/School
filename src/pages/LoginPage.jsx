import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppStore } from '../store/useAppStore';
import { Eye, EyeOff, GraduationCap, Sun, Moon, Globe } from 'lucide-react';

import { systemUsers } from '../data/mockData';
const users = systemUsers;

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const { login, isDark, toggleTheme, lang, toggleLang, t } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = (values, { setFieldError }) => {
    const user = users.find(u => u.email === values.email && u.password === values.password);
    if (user) {
      login(user);
      navigate(`/${user.role}`);
    } else {
      setFieldError('password', lang === 'ar' ? 'بيانات خاطئة' : 'Invalid credentials');
    }
  };

  const quickLogin = (user) => {
    login(user);
    navigate(`/${user.role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />
      </div>

      {/* Top controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button onClick={toggleLang} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-sm font-medium transition-all backdrop-blur-sm">
          <Globe size={14} />
          {lang === 'ar' ? 'EN' : 'ع'}
        </button>
        <button onClick={toggleTheme} className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all backdrop-blur-sm">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white font-arabic">{t('appName')}</h1>
          <p className="text-primary-300 text-sm mt-1">{lang === 'ar' ? 'منصة إدارة تعليمية متكاملة' : 'Integrated Education Management Platform'}</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string().email(lang === 'ar' ? 'بريد إلكتروني غير صالح' : 'Invalid email').required(lang === 'ar' ? 'مطلوب' : 'Required'),
              password: Yup.string().required(lang === 'ar' ? 'مطلوب' : 'Required'),
            })}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-1.5">{t('email')}</label>
                  <Field name="email" type="email" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent" placeholder={lang === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'} />
                  <ErrorMessage name="email" render={msg => <p className="text-red-400 text-xs mt-1">{msg}</p>} />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-1.5">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
                  <div className="relative">
                    <Field name="password" type={showPass ? 'text' : 'password'} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent pr-10" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute inset-y-0 left-3 flex items-center text-white/60 hover:text-white">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <ErrorMessage name="password" render={msg => <p className="text-red-400 text-xs mt-1">{msg}</p>} />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-primary-500/30 text-sm mt-2">
                  {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>

          {/* Quick Login — grouped by school */}
          <div className="mt-5 pt-5 border-t border-white/10">
            <p className="text-white/50 text-xs text-center mb-3">{lang === 'ar' ? 'دخول سريع للتجربة' : 'Quick demo login'}</p>
            {/* Owner */}
            <div className="mb-2">
              <p className="text-white/30 text-[9px] uppercase tracking-wider mb-1">{lang === 'ar' ? 'المالك' : 'Owner'}</p>
              <div className="flex gap-2 flex-wrap">
                {users.filter(u => u.role === 'owner').map(user => (
                  <button key={user.id} onClick={() => quickLogin(user)}
                    className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-xl px-2.5 py-1.5 transition-all">
                    <span>{user.avatar}</span>
                    <span className="text-white/80 text-[10px]">{lang === 'ar' ? user.name : user.nameEn}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* By school */}
            {[1,2,3,4].map(schoolId => {
              const schoolUsers = users.filter(u => u.schoolId === schoolId);
              if (!schoolUsers.length) return null;
              const schoolName = {1:'النيل',2:'المستقبل',3:'الأمل',4:'الرواد'}[schoolId];
              const schoolNameEn = {1:'Nile',2:'Future',3:'Hope',4:'Pioneers'}[schoolId];
              return (
                <div key={schoolId} className="mb-2">
                  <p className="text-white/30 text-[9px] uppercase tracking-wider mb-1">
                    🏫 {lang === 'ar' ? schoolName : schoolNameEn}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {schoolUsers.map(user => (
                      <button key={user.id} onClick={() => quickLogin(user)}
                        className="flex items-center gap-1 bg-white/10 hover:bg-white/20 rounded-xl px-2 py-1 transition-all">
                        <span className="text-sm">{user.avatar}</span>
                        <div className="text-start">
                          <p className="text-white/80 text-[9px] leading-tight">{lang === 'ar' ? user.name.split(' ').slice(-1)[0] : user.nameEn.split(' ').slice(-1)[0]}</p>
                          <p className="text-white/40 text-[8px]">{lang === 'ar' ? {admin:'مدير',teacher:'معلم',student:'طالب',parent:'ولي'}[user.role] : user.role}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
