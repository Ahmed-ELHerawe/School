import { useAppStore } from '../../store/useAppStore';

const allBadges = [
  { id: 'top_student',    emoji: '🏆', label: 'أعلى درجة',      labelEn: 'Top Student',      desc: 'حصل على أعلى معدل دراسي',   descEn: 'Highest GPA in class',      color: 'from-amber-400 to-yellow-500',  earned: true },
  { id: 'full_attend',    emoji: '⭐', label: 'حضور كامل',      labelEn: 'Perfect Attendance',desc: 'لم يغب ولا يوم واحد',        descEn: 'Zero absences this month',   color: 'from-emerald-400 to-teal-500',  earned: true },
  { id: 'hw_champion',    emoji: '📚', label: 'بطل الواجبات',   labelEn: 'HW Champion',      desc: 'سلّم جميع الواجبات في وقتها', descEn: 'All homework submitted on time', color: 'from-blue-400 to-primary-500', earned: true },
  { id: 'fast_learner',   emoji: '🚀', label: 'متعلم سريع',    labelEn: 'Fast Learner',     desc: 'تحسن معدله 10% في شهر',     descEn: 'Improved GPA by 10%',       color: 'from-purple-400 to-violet-500', earned: false },
  { id: 'reading_star',   emoji: '📖', label: 'نجم القراءة',    labelEn: 'Reading Star',     desc: 'أنهى 5 كتب من المكتبة',      descEn: 'Read 5 books from library',  color: 'from-pink-400 to-rose-500',     earned: false },
  { id: 'math_wizard',    emoji: '🔢', label: 'ساحر الأرقام',  labelEn: 'Math Wizard',      desc: 'حصل على 100% في الرياضيات', descEn: 'Perfect math score',         color: 'from-cyan-400 to-sky-500',      earned: true },
  { id: 'team_player',    emoji: '🤝', label: 'روح الفريق',    labelEn: 'Team Player',      desc: 'شارك في الأنشطة الجماعية',   descEn: 'Participated in group activities', color: 'from-orange-400 to-amber-500', earned: false },
  { id: 'creative_mind',  emoji: '🎨', label: 'عقل مبدع',      labelEn: 'Creative Mind',    desc: 'تميز في مادة الفنون',        descEn: 'Excellence in Arts',         color: 'from-fuchsia-400 to-pink-500',  earned: false },
  { id: '3_months_attend',emoji: '🎯', label: '3 أشهر بلا غياب', labelEn: '3-Month Streak', desc: 'حضر 3 أشهر متواصلة',        descEn: '3 months no absence',       color: 'from-lime-400 to-green-500',    earned: false },
];

const leaderboard = [
  { rank: 1, name: 'نور أحمد', nameEn: 'Nour Ahmed', grade: 'الثالث أ', badges: 5, points: 980, avatar: '👧' },
  { rank: 2, name: 'يوسف محمد', nameEn: 'Youssef Mohamed', grade: 'الثالث أ', badges: 4, points: 850, avatar: '👦' },
  { rank: 3, name: 'مريم سامي', nameEn: 'Mariam Sami', grade: 'الإعدادي أ', badges: 3, points: 720, avatar: '👧' },
  { rank: 4, name: 'عمر خالد', nameEn: 'Omar Khaled', grade: 'الرابع أ', badges: 2, points: 540, avatar: '👦' },
];

export default function BadgesPage() {
  const { lang } = useAppStore();
  const earned = allBadges.filter(b => b.earned);
  const locked = allBadges.filter(b => !b.earned);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lang === 'ar' ? '🏅 نظام الإنجازات والبادجز' : '🏅 Achievements & Badges'}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'اجمع البادجز وتصدر لوحة الشرف' : 'Collect badges and top the leaderboard'}</p>
      </div>

      {/* My stats */}
      <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white border-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">👦</div>
          <div className="flex-1">
            <h2 className="font-bold text-lg">{lang === 'ar' ? 'يوسف محمد' : 'Youssef Mohamed'}</h2>
            <p className="text-primary-200 text-sm">{lang === 'ar' ? 'الثالث أ' : 'Grade 3A'}</p>
            <div className="flex gap-4 mt-2">
              <span className="bg-white/20 text-xs px-3 py-1 rounded-full">🏅 {earned.length} {lang === 'ar' ? 'بادج' : 'badges'}</span>
              <span className="bg-white/20 text-xs px-3 py-1 rounded-full">⭐ 850 {lang === 'ar' ? 'نقطة' : 'points'}</span>
              <span className="bg-white/20 text-xs px-3 py-1 rounded-full">🏆 {lang === 'ar' ? 'المركز 2' : 'Rank #2'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Earned badges */}
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">✅ {lang === 'ar' ? `البادجز المكتسبة (${earned.length})` : `Earned (${earned.length})`}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {earned.map(badge => (
            <div key={badge.id} className="card text-center hover:shadow-md transition-shadow cursor-pointer group">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-3xl mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                {badge.emoji}
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">{lang === 'ar' ? badge.label : badge.labelEn}</p>
              <p className="text-xs text-slate-400 mt-1">{lang === 'ar' ? badge.desc : badge.descEn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Locked badges */}
      <div>
        <h3 className="font-semibold text-slate-500 dark:text-slate-400 mb-3">🔒 {lang === 'ar' ? `البادجز المقفلة (${locked.length})` : `Locked (${locked.length})`}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {locked.map(badge => (
            <div key={badge.id} className="card text-center opacity-50">
              <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-3xl mx-auto mb-3 grayscale">
                {badge.emoji}
              </div>
              <p className="font-bold text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? badge.label : badge.labelEn}</p>
              <p className="text-xs text-slate-400 mt-1">{lang === 'ar' ? badge.desc : badge.descEn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="card">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">🏆 {lang === 'ar' ? 'لوحة الشرف' : 'Leaderboard'}</h3>
        <div className="space-y-2">
          {leaderboard.map(s => (
            <div key={s.rank} className={`flex items-center gap-3 p-3 rounded-xl ${s.rank === 2 ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800' : 'bg-slate-50 dark:bg-slate-800'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${s.rank === 1 ? 'bg-amber-400 text-white' : s.rank === 2 ? 'bg-slate-400 text-white' : s.rank === 3 ? 'bg-orange-400 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                {s.rank === 1 ? '🥇' : s.rank === 2 ? '🥈' : s.rank === 3 ? '🥉' : s.rank}
              </div>
              <span className="text-xl">{s.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-slate-900 dark:text-white">{lang === 'ar' ? s.name : s.nameEn}</p>
                <p className="text-xs text-slate-400">{s.grade}</p>
              </div>
              <div className="text-end">
                <p className="font-bold text-sm text-slate-900 dark:text-white">{s.points} ⭐</p>
                <p className="text-xs text-slate-400">🏅 {s.badges}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
