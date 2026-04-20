import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Play, Upload, Clock, Eye, Plus } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { Formik, Form, Field } from 'formik';

const initialVideos = [
  { id: 1, title: 'شرح الضرب والقسمة', titleEn: 'Multiplication & Division', subject: 'رياضيات', teacher: 'أ. محمد علي', duration: '12:34', views: 145, thumbnail: '🔢', grade: 'الثالث', uploadDate: '2024-03-10', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 2, title: 'التمثيل الضوئي', titleEn: 'Photosynthesis', subject: 'علوم', teacher: 'أ. أحمد سعيد', duration: '8:20', views: 98, thumbnail: '🌿', grade: 'الثالث', uploadDate: '2024-03-12', url: '' },
  { id: 3, title: 'قواعد اللغة العربية - النعت', titleEn: 'Arabic Grammar - Adjectives', subject: 'لغة عربية', teacher: 'أ. فاطمة حسن', duration: '15:45', views: 203, thumbnail: '📝', grade: 'الثالث', uploadDate: '2024-03-14', url: '' },
  { id: 4, title: 'Reading Comprehension Tips', titleEn: 'Reading Comprehension Tips', subject: 'لغة إنجليزية', teacher: 'أ. سارة محمود', duration: '10:12', views: 167, thumbnail: '📖', grade: 'الثالث', uploadDate: '2024-03-15', url: '' },
  { id: 5, title: 'الكسور العشرية', titleEn: 'Decimal Fractions', subject: 'رياضيات', teacher: 'أ. محمد علي', duration: '9:55', views: 89, thumbnail: '🔣', grade: 'الرابع', uploadDate: '2024-03-16', url: '' },
  { id: 6, title: 'المناخ في مصر', titleEn: 'Climate in Egypt', subject: 'علوم', teacher: 'أ. أحمد سعيد', duration: '11:30', views: 76, thumbnail: '🌦️', grade: 'الثالث', uploadDate: '2024-03-17', url: '' },
];

const subjectColors = {
  'رياضيات': 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
  'علوم': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600',
  'لغة عربية': 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
  'لغة إنجليزية': 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
};

export default function VideoLibraryPage() {
  const { lang, currentUser } = useAppStore();
  const [videos, setVideos] = useState(initialVideos);
  const [filter, setFilter] = useState('all');
  const [playing, setPlaying] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);
  const isTeacher = currentUser?.role === 'teacher';

  const subjects = [...new Set(videos.map(v => v.subject))];
  const filtered = filter === 'all' ? videos : videos.filter(v => v.subject === filter);

  const handleUpload = (values, { resetForm }) => {
    setVideos(prev => [{
      id: Date.now(), ...values, views: 0,
      thumbnail: '🎥', uploadDate: new Date().toISOString().split('T')[0],
      teacher: lang === 'ar' ? 'أ. محمد علي' : 'Mr. Mohamed Ali',
    }, ...prev]);
    resetForm();
    setUploadModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            🎥 {lang === 'ar' ? 'مكتبة الفيديوهات التعليمية' : 'Educational Video Library'}
          </h1>
          <p className="text-sm text-slate-500">{lang === 'ar' ? 'فيديوهات شرح لكل المواد' : 'Explanation videos for all subjects'}</p>
        </div>
        {isTeacher && (
          <button onClick={() => setUploadModal(true)} className="btn-primary">
            <Upload size={16} /> {lang === 'ar' ? 'رفع فيديو' : 'Upload Video'}
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'btn-primary' : 'btn-secondary'}>
          {lang === 'ar' ? 'الكل' : 'All'} ({videos.length})
        </button>
        {subjects.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={filter === s ? 'btn-primary' : 'btn-secondary'}>
            {s} ({videos.filter(v => v.subject === s).length})
          </button>
        ))}
      </div>

      {/* Playing Video */}
      {playing && (
        <div className="card border-2 border-primary-200 dark:border-primary-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white">{lang === 'ar' ? playing.title : playing.titleEn}</h3>
            <button onClick={() => setPlaying(null)} className="btn-secondary !py-1 !px-3 !text-xs">✕ {lang === 'ar' ? 'إغلاق' : 'Close'}</button>
          </div>
          <div className="bg-slate-900 rounded-xl aspect-video flex items-center justify-center">
            {playing.url ? (
              <iframe src={playing.url} className="w-full h-full rounded-xl" allowFullScreen title={playing.title} />
            ) : (
              <div className="text-center text-white">
                <div className="text-6xl mb-4">{playing.thumbnail}</div>
                <p className="text-lg font-bold">{lang === 'ar' ? playing.title : playing.titleEn}</p>
                <p className="text-slate-400 text-sm mt-2">▶️ {lang === 'ar' ? 'جاري التشغيل...' : 'Now Playing...'}</p>
                <div className="mt-4 w-64 h-2 bg-slate-700 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full w-1/3 animate-pulse" />
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
            <span>👨‍🏫 {playing.teacher}</span>
            <span>⏱️ {playing.duration}</span>
            <span>👁️ {playing.views} {lang === 'ar' ? 'مشاهدة' : 'views'}</span>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(video => (
          <div key={video.id} className="card hover:shadow-md transition-all duration-200 group cursor-pointer p-0 overflow-hidden"
            onClick={() => { setPlaying(video); setVideos(prev => prev.map(v => v.id === video.id ? { ...v, views: v.views + 1 } : v)); }}>
            {/* Thumbnail */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 aspect-video flex items-center justify-center relative">
              <span className="text-5xl">{video.thumbnail}</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <div className="w-12 h-12 bg-white/0 group-hover:bg-white/90 rounded-full flex items-center justify-center transition-all scale-0 group-hover:scale-100">
                  <Play size={20} className="text-slate-900 ms-1" />
                </div>
              </div>
              <div className="absolute bottom-2 end-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-lg flex items-center gap-1">
                <Clock size={10} /> {video.duration}
              </div>
              <div className={`absolute top-2 start-2 text-xs px-2 py-0.5 rounded-lg font-medium ${subjectColors[video.subject] || 'bg-slate-100'}`}>
                {video.subject}
              </div>
            </div>
            {/* Info */}
            <div className="p-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 mb-1">{lang === 'ar' ? video.title : video.titleEn}</h3>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>👨‍🏫 {video.teacher}</span>
                <span className="flex items-center gap-1"><Eye size={10} /> {video.views}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">📅 {video.uploadDate}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal isOpen={uploadModal} onClose={() => setUploadModal(false)} title={lang === 'ar' ? 'رفع فيديو جديد' : 'Upload New Video'}>
        <Formik initialValues={{ title: '', titleEn: '', subject: '', duration: '', grade: '', url: '' }} onSubmit={handleUpload}>
          <Form className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{lang === 'ar' ? 'العنوان عربي' : 'Arabic Title'}</label>
                <Field name="title" className="input-field" placeholder="شرح الكسور" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{lang === 'ar' ? 'العنوان إنجليزي' : 'English Title'}</label>
                <Field name="titleEn" className="input-field" placeholder="Fractions Explained" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{lang === 'ar' ? 'المادة' : 'Subject'}</label>
                <Field as="select" name="subject" className="input-field">
                  <option value="">اختر</option>
                  <option value="رياضيات">رياضيات</option>
                  <option value="علوم">علوم</option>
                  <option value="لغة عربية">لغة عربية</option>
                  <option value="لغة إنجليزية">لغة إنجليزية</option>
                </Field>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{lang === 'ar' ? 'الصف' : 'Grade'}</label>
                <Field as="select" name="grade" className="input-field">
                  <option value="">اختر</option>
                  <option value="الثالث">الثالث</option>
                  <option value="الرابع">الرابع</option>
                  <option value="الخامس">الخامس</option>
                </Field>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{lang === 'ar' ? 'المدة' : 'Duration'}</label>
                <Field name="duration" className="input-field" placeholder="10:30" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">YouTube URL</label>
                <Field name="url" className="input-field" placeholder="https://..." />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex-1 justify-center">{lang === 'ar' ? 'رفع' : 'Upload'}</button>
              <button type="button" onClick={() => setUploadModal(false)} className="btn-secondary flex-1 justify-center">{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
