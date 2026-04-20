import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Palette, Save, Eye } from 'lucide-react';

const defaultBrandings = {
  1: { primaryColor: '#0e8fe3', secondaryColor: '#f97316', logo: '🏫', schoolName: 'مدرسة النيل الدولية', schoolNameEn: 'Nile International School', tagline: 'نحو مستقبل أفضل', taglineEn: 'Towards a Better Future' },
  2: { primaryColor: '#8b5cf6', secondaryColor: '#10b981', logo: '🎓', schoolName: 'أكاديمية المستقبل', schoolNameEn: 'Future Academy', tagline: 'التميز في التعليم', taglineEn: 'Excellence in Education' },
  3: { primaryColor: '#10b981', secondaryColor: '#3b82f6', logo: '⭐', schoolName: 'مدرسة الأمل', schoolNameEn: 'Hope School', tagline: 'نبني الأجيال', taglineEn: 'Building Generations' },
  4: { primaryColor: '#f97316', secondaryColor: '#8b5cf6', logo: '🌟', schoolName: 'مدرسة الرواد', schoolNameEn: 'Pioneers School', tagline: 'رواد المستقبل', taglineEn: 'Future Pioneers' },
};

export default function BrandingPage() {
  const { lang, schools } = useAppStore();
  const [selectedSchool, setSelectedSchool] = useState(1);
  const [brandings, setBrandings] = useState(defaultBrandings);
  const [saved, setSaved] = useState(false);

  const current = brandings[selectedSchool];

  const update = (key, val) => setBrandings(prev => ({
    ...prev,
    [selectedSchool]: { ...prev[selectedSchool], [key]: val }
  }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const emojis = ['🏫', '🎓', '⭐', '🌟', '📚', '✏️', '🏆', '🎯', '🌐', '💡'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Palette size={22} className="text-primary-500" />
          {lang === 'ar' ? 'هوية كل مدرسة (Multi-tenant Branding)' : 'School Branding (Multi-tenant)'}
        </h1>
        <p className="text-sm text-slate-500">{lang === 'ar' ? 'خصص شكل كل مدرسة بالكامل' : 'Customize each school\'s appearance'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-4">
          {/* School selector */}
          <div className="card">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">{lang === 'ar' ? 'اختر المدرسة' : 'Select School'}</p>
            <div className="grid grid-cols-2 gap-2">
              {schools.map(sc => (
                <button key={sc.id} onClick={() => setSelectedSchool(sc.id)}
                  className={`p-3 rounded-xl border-2 text-start transition-all ${selectedSchool === sc.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{brandings[sc.id]?.logo}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{lang === 'ar' ? sc.name : sc.nameEn}</p>
                      <div className="w-4 h-4 rounded-full mt-0.5" style={{ background: brandings[sc.id]?.primaryColor }} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="card space-y-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'الألوان' : 'Colors'}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">{lang === 'ar' ? 'اللون الأساسي' : 'Primary Color'}</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={current.primaryColor} onChange={e => update('primaryColor', e.target.value)} className="w-10 h-10 rounded-xl border-0 cursor-pointer" />
                  <span className="text-sm font-mono text-slate-600 dark:text-slate-400">{current.primaryColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">{lang === 'ar' ? 'اللون الثانوي' : 'Accent Color'}</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={current.secondaryColor} onChange={e => update('secondaryColor', e.target.value)} className="w-10 h-10 rounded-xl border-0 cursor-pointer" />
                  <span className="text-sm font-mono text-slate-600 dark:text-slate-400">{current.secondaryColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="card">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">{lang === 'ar' ? 'أيقونة المدرسة' : 'School Icon'}</p>
            <div className="flex flex-wrap gap-2">
              {emojis.map(e => (
                <button key={e} onClick={() => update('logo', e)}
                  className={`w-10 h-10 rounded-xl text-xl transition-all ${current.logo === e ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Names */}
          <div className="card space-y-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'أسماء وشعارات' : 'Names & Taglines'}</p>
            {[
              { key: 'schoolName', label: lang === 'ar' ? 'اسم المدرسة (عربي)' : 'School Name (Arabic)' },
              { key: 'schoolNameEn', label: lang === 'ar' ? 'اسم المدرسة (إنجليزي)' : 'School Name (English)' },
              { key: 'tagline', label: lang === 'ar' ? 'الشعار (عربي)' : 'Tagline (Arabic)' },
              { key: 'taglineEn', label: lang === 'ar' ? 'الشعار (إنجليزي)' : 'Tagline (English)' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs text-slate-500 mb-1">{f.label}</label>
                <input value={current[f.key]} onChange={e => update(f.key, e.target.value)} className="input-field" />
              </div>
            ))}
          </div>

          <button onClick={handleSave} className={`btn-primary w-full justify-center ${saved ? 'bg-emerald-600 hover:bg-emerald-600' : ''}`}>
            {saved ? <><span>✅</span> {lang === 'ar' ? 'تم الحفظ!' : 'Saved!'}</> : <><Save size={16} /> {lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}</>}
          </button>
        </div>

        {/* Preview */}
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
            <Eye size={16} /> {lang === 'ar' ? 'معاينة مباشرة' : 'Live Preview'}
          </p>

          {/* Login preview */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="p-6 text-white text-center" style={{ background: `linear-gradient(135deg, ${current.primaryColor}, ${current.secondaryColor})` }}>
              <div className="text-5xl mb-2">{current.logo}</div>
              <h2 className="text-xl font-bold">{lang === 'ar' ? current.schoolName : current.schoolNameEn}</h2>
              <p className="text-sm opacity-80 mt-1">{lang === 'ar' ? current.tagline : current.taglineEn}</p>
            </div>

            {/* Sidebar preview */}
            <div className="flex" style={{ height: 200 }}>
              <div className="w-48 p-3 space-y-1.5" style={{ background: current.primaryColor + '15' }}>
                {['لوحة التحكم', 'الطلاب', 'المعلمون', 'التقارير'].map(item => (
                  <div key={item} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ background: current.primaryColor }} />
                    <span className="text-slate-600 dark:text-slate-400">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-900">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'الطلاب', value: '1,240' },
                    { label: 'المعلمون', value: '86' },
                    { label: 'الحضور', value: '95%' },
                    { label: 'المعدل', value: '88%' },
                  ].map(item => (
                    <div key={item.label} className="bg-white dark:bg-slate-800 rounded-lg p-2 text-center">
                      <p className="text-sm font-bold" style={{ color: current.primaryColor }}>{item.value}</p>
                      <p className="text-[10px] text-slate-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* All schools overview */}
          <div className="mt-4 card">
            <p className="text-xs font-semibold text-slate-500 mb-3">{lang === 'ar' ? 'كل المدارس' : 'All Schools'}</p>
            <div className="space-y-2">
              {schools.map(sc => (
                <div key={sc.id} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{ background: brandings[sc.id]?.primaryColor + '20' }}>
                    {brandings[sc.id]?.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{lang === 'ar' ? brandings[sc.id]?.schoolName : brandings[sc.id]?.schoolNameEn}</p>
                    <p className="text-[10px] text-slate-400 truncate">{lang === 'ar' ? brandings[sc.id]?.tagline : brandings[sc.id]?.taglineEn}</p>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full" style={{ background: brandings[sc.id]?.primaryColor }} />
                    <div className="w-4 h-4 rounded-full" style={{ background: brandings[sc.id]?.secondaryColor }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
