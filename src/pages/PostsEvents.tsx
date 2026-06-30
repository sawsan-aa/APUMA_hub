import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PublishedPost } from '../types';
import { canModerate } from '../lib/account';
import { X, Copy, Check, Trash2, Tag } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmtDay = (d: string) => d.slice(8, 10);
const fmtMon = (d: string) => MONTHS[Math.max(0, parseInt(d.slice(5, 7), 10) - 1)] || '';

type Filter = 'all' | 'post' | 'event' | 'announcement';
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'post', label: 'Posts' },
  { key: 'event', label: 'Events' },
  { key: 'announcement', label: 'Announcements' },
];

const tagColor = (c: string) => (c === 'event' ? '#059669' : c === 'announcement' ? '#E11D48' : '#F59E0B');

export const PostsEvents: React.FC = () => {
  const { posts, currentUser, deletePost, systemConfig } = useApp();
  const role = currentUser?.role || 'guest';
  const isLeader = canModerate(role);

  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<PublishedPost | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = filter === 'all' ? posts : posts.filter(p => p.category === filter);
  const featured = filtered[0] || null;
  const rest = filtered.slice(1);
  const news = posts.filter(p => p.category === 'event' || p.category === 'announcement').slice(0, 4);

  const copyCaption = (p: PublishedPost) => {
    navigator.clipboard.writeText(p.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-10 animate-pop">
      {/* header + tabs */}
      <div className="flex flex-wrap items-end justify-between gap-3.5">
        <div>
          <span className="inline-block bg-green-100 text-green-700 font-extrabold text-xs px-3.5 py-1.5 rounded-full">FROM APUMA</span>
          <h1 className="text-4xl font-extrabold text-emerald-800 mt-3">Posts &amp; News 📰</h1>
          <p className="text-[15px] font-semibold text-emerald-700/60 mt-2">Reflections, tafsir snippets, campus updates and announcements.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button
              key={f.key}
              id={`btn-filter-${f.key}`}
              onClick={() => setFilter(f.key)}
              className={`font-extrabold text-[13px] px-3.5 py-2.5 rounded-xl transition cursor-pointer ${
                filter === f.key ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-7 mt-7 items-start">
        {/* main column */}
        <div>
          {!featured ? (
            <div className="text-center py-16 bg-emerald-50/60 rounded-3xl border border-dashed border-emerald-200 text-sm font-semibold text-emerald-700/60">
              No posts in this category yet.
            </div>
          ) : (
            <>
              <article
                onClick={() => setSelected(featured)}
                className="card-lift grid sm:grid-cols-[42%_1fr] bg-white border border-emerald-50 rounded-[28px] overflow-hidden shadow-[0_12px_32px_-20px_rgba(5,150,105,0.45)] cursor-pointer"
              >
                <div className="bg-emerald-100 min-h-[200px]">
                  <img src={featured.images[0]} alt={featured.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <div className="p-7 relative">
                  {isLeader && (
                    <button
                      id={`btn-delete-${featured.id}`}
                      onClick={(e) => { e.stopPropagation(); if (confirm('Delete this post?')) deletePost(featured.id); }}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wide" style={{ color: tagColor(featured.category) }}>{featured.category}</span>
                    <span className="text-[11px] font-bold text-gray-400">· {featured.date}</span>
                  </div>
                  <h2 className="text-[27px] font-extrabold text-emerald-900 mt-2.5 leading-tight">{featured.title}</h2>
                  <p className="text-[14.5px] font-semibold text-emerald-700/60 mt-3 leading-relaxed line-clamp-4">{featured.content}</p>
                  <div className="flex items-center justify-between mt-5">
                    <span className="text-[13px] font-extrabold text-emerald-700">✍️ {featured.author}</span>
                    <span className="text-[13px] font-extrabold text-emerald-600">Read post →</span>
                  </div>
                </div>
              </article>

              <div className="grid sm:grid-cols-2 gap-[18px] mt-[18px]">
                {rest.map(p => (
                  <article
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="card-lift bg-white border border-emerald-50 rounded-3xl overflow-hidden shadow-[0_8px_26px_-16px_rgba(5,150,105,0.4)] cursor-pointer relative"
                  >
                    {isLeader && (
                      <button
                        id={`btn-delete-${p.id}`}
                        onClick={(e) => { e.stopPropagation(); if (confirm('Delete this post?')) deletePost(p.id); }}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 text-rose-600 flex items-center justify-center hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                    <div className="h-[118px] bg-emerald-100 overflow-hidden">
                      <img src={p.images[0]} alt={p.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-[18px]">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-wide" style={{ color: tagColor(p.category) }}>{p.category}</span>
                        <span className="text-[11px] font-bold text-gray-400">· {p.date}</span>
                      </div>
                      <h3 className="text-[17px] font-bold text-emerald-900 mt-1 leading-tight line-clamp-2">{p.title}</h3>
                      <p className="text-[12.5px] font-semibold text-emerald-700/60 mt-1.5 leading-snug line-clamp-2">{p.content}</p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>

        {/* sidebar */}
        <aside className="flex flex-col gap-[18px] lg:sticky lg:top-[85px]">
          <div className="bg-white border border-emerald-50 rounded-[26px] p-6 shadow-[0_10px_30px_-20px_rgba(5,150,105,0.45)]">
            <h3 className="text-lg font-extrabold text-emerald-800 flex items-center gap-2">📣 News &amp; Announcements</h3>
            <div className="mt-3.5">
              {news.length === 0 ? (
                <p className="text-[13px] font-semibold text-emerald-700/50 py-3">Nothing scheduled right now.</p>
              ) : news.map(n => (
                <button
                  key={n.id}
                  onClick={() => setSelected(n)}
                  className="w-full flex gap-3 py-3.5 border-b border-emerald-50 last:border-0 text-left cursor-pointer group"
                >
                  <div className="shrink-0 w-[46px] text-center rounded-xl py-1.5" style={{ background: `${tagColor(n.category)}1f` }}>
                    <div className="text-base font-extrabold leading-none" style={{ color: tagColor(n.category) }}>{fmtDay(n.date)}</div>
                    <div className="text-[9.5px] font-extrabold uppercase" style={{ color: tagColor(n.category) }}>{fmtMon(n.date)}</div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[13.5px] font-extrabold text-emerald-900 leading-tight group-hover:text-emerald-600 line-clamp-2">{n.title}</h4>
                    <p className="text-xs font-semibold text-emerald-700/55 mt-1 line-clamp-2 leading-snug">{n.content}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-linear-to-br from-emerald-800 to-emerald-600 rounded-[26px] p-6 text-white">
            <h3 className="text-lg font-extrabold">Never miss a drop 🌙</h3>
            <p className="text-[13px] font-semibold text-emerald-100 mt-1.5 leading-relaxed">Join our WhatsApp Channel for weekly Seerah posts and event news.</p>
            <a
              href={systemConfig.whatsappGroupUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-center w-full bg-white text-emerald-800 font-extrabold text-sm py-3 rounded-2xl mt-4 hover:bg-emerald-50 transition"
            >
              Join the channel →
            </a>
          </div>
        </aside>
      </div>

      {/* reader modal */}
      {selected && (
        <div className="fixed inset-0 z-100 bg-emerald-900/55 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[28px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between gap-4 px-6 py-4 bg-linear-to-br from-emerald-800 to-emerald-600 text-white">
              <h3 className="text-sm font-extrabold truncate">{selected.title}</h3>
              <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div className="p-7 overflow-y-auto apuma-scroll space-y-5">
              <div className="grid sm:grid-cols-2 gap-3.5">
                {selected.images.map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden aspect-video bg-emerald-100 relative">
                    <img src={img} alt={`slide ${i + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 right-2 bg-emerald-900/80 text-amber-300 font-extrabold text-[9px] px-2 py-0.5 rounded-full">Slide {i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-bold text-gray-500 pb-3 border-b border-emerald-50">
                <span className="flex items-center gap-1 text-emerald-700"><Tag size={12} /> {selected.category.toUpperCase()}</span>
                <span>· By {selected.author}</span>
                <span>· {selected.date}</span>
              </div>
              <p className="text-sm font-semibold text-emerald-800/80 leading-relaxed whitespace-pre-line">{selected.content}</p>
            </div>
            <div className="px-6 py-4 border-t border-emerald-50 flex items-center justify-between gap-3">
              <button
                onClick={() => copyCaption(selected)}
                className="px-4 py-2.5 rounded-xl bg-amber-50 text-amber-700 text-xs font-extrabold border border-amber-200 hover:bg-amber-100 transition flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <><Check size={14} className="text-emerald-600" /> Copied!</> : <><Copy size={14} /> Copy caption</>}
              </button>
              <button onClick={() => setSelected(null)} className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold transition cursor-pointer">
                Done reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
