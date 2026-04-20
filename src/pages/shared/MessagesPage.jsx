import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Send, Search } from 'lucide-react';

const contacts = [
  { id: 1, name: 'أ. محمد علي', nameEn: 'Mr. Mohamed Ali', role: 'teacher', avatar: '👨‍🏫', online: true },
  { id: 2, name: 'أ. فاطمة حسن', nameEn: 'Ms. Fatma Hassan', role: 'teacher', avatar: '👩‍🏫', online: false },
  { id: 3, name: 'محمد إبراهيم', nameEn: 'Mohamed Ibrahim', role: 'parent', avatar: '👨‍👦', online: true },
  { id: 4, name: 'الإدارة', nameEn: 'Administration', role: 'admin', avatar: '🏫', online: true },
];

export default function MessagesPage() {
  const { t, lang, messages, sendMessage } = useAppStore();
  const [selected, setSelected] = useState(contacts[0]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  const filtered = contacts.filter(c =>
    (lang === 'ar' ? c.name : c.nameEn).toLowerCase().includes(search.toLowerCase())
  );

  const conversation = messages.filter(m =>
    (m.fromId === selected.id || m.toId === selected.id)
  );

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage({ from: lang === 'ar' ? 'أنا' : 'Me', fromId: 'me', to: selected.name, toId: selected.id, message: input });
    setInput('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-5 animate-fade-in">
      {/* Contacts */}
      <div className="w-72 flex-shrink-0 card p-0 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-3">{t('messages')}</h2>
          <div className="relative">
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 start-3 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} className="input-field ps-8 !py-2" placeholder={t('search')} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map(contact => (
            <div
              key={contact.id}
              onClick={() => setSelected(contact)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${selected.id === contact.id ? 'bg-primary-50 dark:bg-primary-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">{contact.avatar}</div>
                {contact.online && <div className="absolute bottom-0 end-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{lang === 'ar' ? contact.name : contact.nameEn}</p>
                <p className="text-xs text-slate-400 truncate">{contact.online ? (lang === 'ar' ? 'متصل' : 'Online') : (lang === 'ar' ? 'غير متصل' : 'Offline')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 card p-0 overflow-hidden flex flex-col">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">{selected.avatar}</div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">{lang === 'ar' ? selected.name : selected.nameEn}</p>
            <p className="text-xs text-emerald-500">{selected.online ? (lang === 'ar' ? 'متصل الآن' : 'Online') : (lang === 'ar' ? 'غير متصل' : 'Offline')}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {conversation.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-slate-500 text-sm">{lang === 'ar' ? 'ابدأ المحادثة' : 'Start the conversation'}</p>
            </div>
          ) : conversation.map((msg, i) => {
            const isMe = msg.fromId === 'me';
            return (
              <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${isMe ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-sm'}`}>
                  <p>{msg.message}</p>
                  <p className={`text-[10px] mt-1 ${isMe ? 'text-primary-200' : 'text-slate-400'}`}>{msg.time?.split('T')[1]?.slice(0, 5) || msg.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="input-field flex-1"
            placeholder={lang === 'ar' ? 'اكتب رسالتك...' : 'Type a message...'}
          />
          <button onClick={handleSend} className="btn-primary !px-3 !py-2.5">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
