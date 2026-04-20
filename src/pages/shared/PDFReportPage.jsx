import { useAppStore } from '../../store/useAppStore';
import { Printer, Download, FileText } from 'lucide-react';

export default function PDFReportPage() {
  const { lang, students, monthlyPerformance } = useAppStore();
  const student = students.find(s => s.id === 1);

  const printReport = () => {
    const printContent = document.getElementById('print-area');
    const originalBody = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalBody;
    window.location.reload();
  };

  if (!student) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText size={22} className="text-primary-500" />
            {lang === 'ar' ? 'تقارير PDF قابلة للطباعة' : 'Printable PDF Reports'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'اطبع تقرير أداء الطالب' : 'Print student performance report'}</p>
        </div>
        <button onClick={printReport} className="btn-primary">
          <Printer size={16} /> {lang === 'ar' ? 'طباعة التقرير' : 'Print Report'}
        </button>
      </div>

      {/* Print preview */}
      <div id="print-area" className="card border-2 border-dashed border-slate-300 dark:border-slate-600">
        {/* Header */}
        <div className="text-center border-b border-slate-200 dark:border-slate-700 pb-5 mb-5">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-3">🏫</div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'مدرسة النيل الدولية' : 'Nile International School'}</h2>
          <p className="text-sm text-slate-500">{lang === 'ar' ? 'تقرير أداء طالب - الفصل الدراسي الثاني 2024' : 'Student Performance Report - Semester 2, 2024'}</p>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <div>
            <p className="text-xs text-slate-400">{lang === 'ar' ? 'اسم الطالب' : 'Student Name'}</p>
            <p className="font-bold text-slate-900 dark:text-white">{lang === 'ar' ? student.name : student.nameEn}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">{lang === 'ar' ? 'الصف' : 'Grade'}</p>
            <p className="font-bold text-slate-900 dark:text-white">{student.grade}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">{lang === 'ar' ? 'المعدل الدراسي' : 'GPA'}</p>
            <p className="font-bold text-emerald-600 text-lg">{student.gpa}%</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">{lang === 'ar' ? 'نسبة الحضور' : 'Attendance'}</p>
            <p className="font-bold text-primary-600 text-lg">{student.attendance}%</p>
          </div>
        </div>

        {/* Grades table */}
        <h3 className="font-bold text-slate-900 dark:text-white mb-3">{lang === 'ar' ? 'درجات المواد' : 'Subject Grades'}</h3>
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-primary-600 text-white">
              <th className="text-start px-4 py-2 text-sm rounded-s-xl">{lang === 'ar' ? 'المادة' : 'Subject'}</th>
              <th className="text-center px-4 py-2 text-sm">{lang === 'ar' ? 'الشهري' : 'Monthly'}</th>
              <th className="text-center px-4 py-2 text-sm">{lang === 'ar' ? 'نصف سنوي' : 'Mid-term'}</th>
              <th className="text-center px-4 py-2 text-sm">{lang === 'ar' ? 'النهائي' : 'Final'}</th>
              <th className="text-center px-4 py-2 text-sm rounded-e-xl">{lang === 'ar' ? 'التقدير' : 'Grade'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { subjectAr: 'رياضيات', subjectEn: 'Mathematics', monthly: 18, midterm: 42, final: 88 },
              { subjectAr: 'علوم', subjectEn: 'Science', monthly: 19, midterm: 44, final: 91 },
              { subjectAr: 'لغة عربية', subjectEn: 'Arabic', monthly: 17, midterm: 40, final: 85 },
              { subjectAr: 'لغة إنجليزية', subjectEn: 'English', monthly: 20, midterm: 46, final: 94 },
              { subjectAr: 'تربية دينية', subjectEn: 'Religion', monthly: 20, midterm: 48, final: 96 },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/50' : ''}>
                <td className="px-4 py-2 text-sm font-medium text-slate-900 dark:text-white">{lang === 'ar' ? row.subjectAr : row.subjectEn}</td>
                <td className="px-4 py-2 text-sm text-center">{row.monthly}/20</td>
                <td className="px-4 py-2 text-sm text-center">{row.midterm}/50</td>
                <td className="px-4 py-2 text-sm text-center font-bold">{row.final}/100</td>
                <td className="px-4 py-2 text-center">
                  <span className={`badge text-xs ${row.final >= 90 ? 'badge-green' : row.final >= 75 ? 'badge-blue' : 'badge-orange'}`}>
                    {row.final >= 90 ? (lang === 'ar' ? 'ممتاز' : 'Excellent') : row.final >= 75 ? (lang === 'ar' ? 'جيد جداً' : 'Very Good') : (lang === 'ar' ? 'جيد' : 'Good')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Monthly performance */}
        <h3 className="font-bold text-slate-900 dark:text-white mb-3">{lang === 'ar' ? 'التطور الشهري' : 'Monthly Progress'}</h3>
        <div className="flex gap-2">
          {monthlyPerformance.map((m, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2 mb-1">
                <p className="font-bold text-primary-600 text-sm">{m.average}%</p>
              </div>
              <p className="text-[10px] text-slate-400">{m.month}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between text-xs text-slate-400">
          <p>{lang === 'ar' ? 'تاريخ الإصدار: مارس 2024' : 'Issue Date: March 2024'}</p>
          <p>{lang === 'ar' ? 'منظومة التعليم الذكي' : 'EduSmart System'}</p>
          <p>{lang === 'ar' ? 'ختم المدرسة: ________________' : 'School Stamp: ________________'}</p>
        </div>
      </div>

      <style>{`@media print { body { direction: rtl; font-family: Cairo, sans-serif; } }`}</style>
    </div>
  );
}
