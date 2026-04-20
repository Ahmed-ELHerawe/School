import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Search, BookOpen } from 'lucide-react';

export default function LibraryPage() {
  const { t, lang, books } = useAppStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const subjects = [...new Set(books.map(b => b.subject))];
  const filtered = books.filter(b =>
    (filter === 'all' || b.subject === filter) &&
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t('library')}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'الكتب والمذكرات الدراسية' : 'Books and study materials'}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute top-1/2 -translate-y-1/2 start-3 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input-field ps-8" placeholder={t('search')} />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'btn-primary' : 'btn-secondary'}>
            {lang === 'ar' ? 'الكل' : 'All'}
          </button>
          {subjects.map(s => (
            <button key={s} onClick={() => setFilter(s)} className={filter === s ? 'btn-primary' : 'btn-secondary'}>{s}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filtered.map(book => (
          <div key={book.id} className="group cursor-pointer">
            <div
              className="rounded-2xl p-5 text-white text-center mb-3 aspect-[3/4] flex flex-col items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-md"
              style={{ background: `linear-gradient(135deg, ${book.coverColor}, ${book.coverColor}cc)` }}
            >
              <BookOpen size={40} className="mb-3 opacity-80" />
              <p className="text-sm font-bold leading-tight text-center">{book.title}</p>
              <p className="text-xs opacity-70 mt-1">{book.pages} {lang === 'ar' ? 'صفحة' : 'pages'}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{book.subject}</p>
              <p className="text-xs text-slate-400">{book.grade}</p>
              <button className="mt-2 text-xs text-primary-500 hover:text-primary-600 font-medium">
                {lang === 'ar' ? '📥 تنزيل' : '📥 Download'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
          <p>{t('noData')}</p>
        </div>
      )}
    </div>
  );
}
