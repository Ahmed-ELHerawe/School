import{u as S,r as o,j as a,n as f}from"./index-D28rOmVs.js";import{R as A}from"./refresh-cw-D_6-y7Df.js";import{U as E}from"./user-C3-wO7_j.js";import{S as C}from"./send-Cahuf5oT.js";const I=[{ar:"كيف أداء ابني الدراسي هذا الشهر؟",en:"How is my child's performance this month?"},{ar:"هل نسبة حضور ابني كويسة؟",en:"Is my child's attendance good?"},{ar:"ايه المواد اللي محتاج تحسين؟",en:"Which subjects need improvement?"},{ar:"هل في واجبات متأخرة؟",en:"Are there any overdue homeworks?"},{ar:"ايه المصاريف المتبقية؟",en:"What are the remaining fees?"},{ar:"ازاي أساعد ابني في المذاكرة؟",en:"How can I help my child study?"}];function D(){var k;const{lang:r,students:v,homeworks:$,absenceRequests:H}=S(),e=v.find(s=>s.id===1),i=$.filter(s=>s.class===(e==null?void 0:e.grade)).filter(s=>s.status==="pending").length,w=e?`
بيانات الطالب:
- الاسم: ${e.name}
- الصف: ${e.grade}
- المعدل الدراسي: ${e.gpa}%
- نسبة الحضور: ${e.attendance}%
- عدد الغيابات: ${e.absences} يوم
- واجبات معلقة: ${i}
- المصاريف المدفوعة: ${e.fees.paid.toLocaleString()} جنيه
- المصاريف المتبقية: ${e.fees.due.toLocaleString()} جنيه
- الكتب: ${(k=e.books)==null?void 0:k.join(", ")}
`:"",[c,d]=o.useState([{role:"assistant",content:r==="ar"?`👋 أهلاً! أنا مساعدك الذكي لمتابعة أداء ابنك **${e==null?void 0:e.name}**.

يمكنك سؤالي عن أي شيء يخص دراسته، حضوره، واجباته، أو المصاريف وسأجيبك فوراً! 📊`:`👋 Hello! I'm your AI assistant for tracking **${e==null?void 0:e.nameEn}**'s progress.

Ask me anything about grades, attendance, homework, or fees! 📊`}]),[m,g]=o.useState(""),[x,b]=o.useState(!1),j=o.useRef(null);o.useEffect(()=>{var s;(s=j.current)==null||s.scrollIntoView({behavior:"smooth"})},[c]);const p=async s=>{var u,y;const t=s||m.trim();if(!(!t||x)){g(""),d(l=>[...l,{role:"user",content:t}]),b(!0);try{const h=((y=(u=(await(await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,system:`أنت مساعد ذكي لولي أمر طالب في مدرسة مصرية. 
${w}
أجب على أسئلة ولي الأمر بناءً على هذه البيانات.
كن ودوداً ومشجعاً. قدم نصائح عملية للمساعدة في تحسين أداء الطالب.
اكتب باللغة العربية. لا تزيد عن 150 كلمة.`,messages:[...c,{role:"user",content:t}]})})).json()).content)==null?void 0:u[0])==null?void 0:y.text)||"عذراً، حدث خطأ.";d(N=>[...N,{role:"assistant",content:h}])}catch{let l="";const n=t.toLowerCase();n.includes("أداء")||n.includes("معدل")||n.includes("درجات")?l=`📊 **أداء ${e==null?void 0:e.name}:**

المعدل الدراسي الحالي **${e==null?void 0:e.gpa}%** وهو ${(e==null?void 0:e.gpa)>=85?"✅ ممتاز! استمر على هذا المستوى":(e==null?void 0:e.gpa)>=70?"👍 جيد، مع القليل من الجهد هيتحسن أكثر":"⚠️ يحتاج اهتمام أكثر في المذاكرة"}.

نصيحة: خصص ساعة يومياً للمراجعة مع ابنك 📚`:n.includes("حضور")||n.includes("غياب")?l=`📅 **الحضور:**

نسبة حضور ${e==null?void 0:e.name} هي **${e==null?void 0:e.attendance}%** وعدد الغيابات **${e==null?void 0:e.absences} يوم**.

${(e==null?void 0:e.attendance)>=90?"✅ ممتاز! حضور منتظم جداً":"⚠️ تحتاج متابعة، الحد الأدنى المطلوب 80%"}`:n.includes("واجب")||n.includes("مهام")?l=`📝 **الواجبات:**

في **${i} واجب** معلق لم يُسلَّم بعد.

${i>0?"⚠️ يرجى التأكد من إنجاز الواجبات في مواعيدها لأنها تؤثر على الدرجات.":"✅ ممتاز! كل الواجبات مسلمة."}`:n.includes("مصاريف")||n.includes("رسوم")?l=`💳 **المصاريف:**

المدفوع: **${e==null?void 0:e.fees.paid.toLocaleString()} جنيه**
المتبقي: **${e==null?void 0:e.fees.due.toLocaleString()} جنيه**

${(e==null?void 0:e.fees.due)===0?"✅ تم سداد كامل المصاريف!":"⚠️ يرجى سداد المبلغ المتبقي في أقرب وقت."}`:l=`💡 يمكنك سؤالي عن:
- الأداء الدراسي والمعدل
- الحضور والغيابات
- الواجبات المعلقة
- المصاريف
- نصائح للمذاكرة`,d(h=>[...h,{role:"assistant",content:l}])}b(!1)}};return a.jsxs("div",{className:"flex flex-col h-[calc(100vh-140px)] animate-fade-in",children:[a.jsxs("div",{className:"flex items-center justify-between mb-4",children:[a.jsxs("div",{children:[a.jsxs("h1",{className:"text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2",children:[a.jsx(f,{className:"text-pink-500",size:22}),r==="ar"?"المساعد الذكي لولي الأمر":"AI Parent Assistant"]}),a.jsx("p",{className:"text-sm text-slate-500",children:r==="ar"?`متابعة أداء ${e==null?void 0:e.name}`:`Track ${e==null?void 0:e.nameEn}'s progress`})]}),a.jsx("button",{onClick:()=>d([{role:"assistant",content:r==="ar"?"👋 محادثة جديدة!":"👋 New chat!"}]),className:"btn-secondary !px-2.5 !py-2",children:a.jsx(A,{size:16})})]}),a.jsx("div",{className:"grid grid-cols-4 gap-3 mb-4",children:[{label:r==="ar"?"المعدل":"GPA",value:`${e==null?void 0:e.gpa}%`,color:"text-emerald-600"},{label:r==="ar"?"الحضور":"Attend.",value:`${e==null?void 0:e.attendance}%`,color:"text-blue-600"},{label:r==="ar"?"الغياب":"Absent",value:e==null?void 0:e.absences,color:"text-red-500"},{label:r==="ar"?"واجبات":"HW Due",value:i,color:"text-orange-500"}].map((s,t)=>a.jsxs("div",{className:"card py-3 text-center",children:[a.jsx("p",{className:`text-lg font-bold ${s.color}`,children:s.value}),a.jsx("p",{className:"text-xs text-slate-400",children:s.label})]},t))}),a.jsxs("div",{className:"flex-1 overflow-y-auto space-y-4 mb-4",children:[c.map((s,t)=>a.jsxs("div",{className:`flex gap-3 ${s.role==="user"?"flex-row-reverse":""}`,children:[a.jsx("div",{className:`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 ${s.role==="assistant"?"bg-gradient-to-br from-pink-500 to-rose-600":"bg-primary-600"}`,children:s.role==="assistant"?a.jsx(f,{size:18,className:"text-white"}):a.jsx(E,{size:18,className:"text-white"})}),a.jsx("div",{className:`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${s.role==="assistant"?"bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm":"bg-primary-600 text-white rounded-tr-sm"}`,children:s.content})]},t)),x&&a.jsxs("div",{className:"flex gap-3",children:[a.jsx("div",{className:"w-9 h-9 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center",children:a.jsx(f,{size:18,className:"text-white"})}),a.jsx("div",{className:"bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-3 rounded-2xl",children:a.jsx("div",{className:"flex gap-1",children:[0,150,300].map(s=>a.jsx("div",{className:"w-2 h-2 bg-pink-400 rounded-full animate-bounce",style:{animationDelay:`${s}ms`}},s))})})]}),a.jsx("div",{ref:j})]}),c.length<=1&&a.jsx("div",{className:"flex flex-wrap gap-2 mb-3",children:I.map((s,t)=>a.jsx("button",{onClick:()=>p(r==="ar"?s.ar:s.en),className:"text-xs bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 px-3 py-1.5 rounded-full hover:bg-pink-100 transition-colors",children:r==="ar"?s.ar:s.en},t))}),a.jsxs("div",{className:"flex gap-3",children:[a.jsx("input",{value:m,onChange:s=>g(s.target.value),onKeyDown:s=>s.key==="Enter"&&p(),className:"input-field flex-1",placeholder:r==="ar"?"اسأل عن أداء ابنك...":"Ask about your child's progress...",disabled:x}),a.jsx("button",{onClick:()=>p(),disabled:x||!m.trim(),className:"btn-primary !px-4 bg-pink-600 hover:bg-pink-700 disabled:opacity-50",children:a.jsx(C,{size:16})})]})]})}export{D as default};
