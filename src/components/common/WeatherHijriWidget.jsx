import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets } from 'lucide-react';

const HIJRI_MONTHS_AR = ['محرم','صفر','ربيع الأول','ربيع الثاني','جمادى الأولى','جمادى الثانية','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'];
const HIJRI_MONTHS_EN = ['Muharram','Safar','Rabi I','Rabi II','Jumada I','Jumada II','Rajab','Sha\'ban','Ramadan','Shawwal','Dhul-Qi\'dah','Dhul-Hijjah'];

function toHijri(date) {
  // Simple approximation
  const jd = Math.floor((date.getTime() / 86400000) + 2440587.5);
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { day, month: month - 1, year };
}

const weatherConditions = [
  { icon: Sun, label: 'مشمس', labelEn: 'Sunny', temp: 28, humidity: 35, wind: 12, color: 'text-amber-500' },
  { icon: Cloud, label: 'غائم جزئياً', labelEn: 'Partly Cloudy', temp: 24, humidity: 50, wind: 18, color: 'text-slate-400' },
  { icon: CloudRain, label: 'ممطر', labelEn: 'Rainy', temp: 18, humidity: 80, wind: 22, color: 'text-blue-400' },
];

export default function WeatherHijriWidget({ lang }) {
  const [now] = useState(new Date());
  const hijri = toHijri(now);
  const weather = weatherConditions[0]; // Mock: sunny Cairo
  const WeatherIcon = weather.icon;

  const days_ar = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  const days_en = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months_ar = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  const months_en = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div className="card bg-gradient-to-br from-sky-500 to-primary-600 text-white border-0 p-4">
      <div className="flex items-center justify-between">
        {/* Weather */}
        <div className="flex items-center gap-3">
          <WeatherIcon size={36} className="text-yellow-300" />
          <div>
            <p className="text-3xl font-bold">{weather.temp}°</p>
            <p className="text-sky-200 text-xs">{lang === 'ar' ? 'القاهرة' : 'Cairo'} · {lang === 'ar' ? weather.label : weather.labelEn}</p>
            <div className="flex gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-sky-200"><Droplets size={10} /> {weather.humidity}%</span>
              <span className="flex items-center gap-1 text-xs text-sky-200"><Wind size={10} /> {weather.wind} km/h</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-16 bg-white/20" />

        {/* Date */}
        <div className="text-end">
          <p className="text-xs text-sky-200">{lang === 'ar' ? days_ar[now.getDay()] : days_en[now.getDay()]}</p>
          <p className="font-bold">{now.getDate()} {lang === 'ar' ? months_ar[now.getMonth()] : months_en[now.getMonth()]} {now.getFullYear()}</p>
          <div className="h-px bg-white/20 my-1" />
          <p className="text-xs text-sky-200">{lang === 'ar' ? 'الموافق' : 'Hijri'}</p>
          <p className="font-semibold text-sm">{hijri.day} {lang === 'ar' ? HIJRI_MONTHS_AR[hijri.month] : HIJRI_MONTHS_EN[hijri.month]} {hijri.year} هـ</p>
        </div>
      </div>
    </div>
  );
}
