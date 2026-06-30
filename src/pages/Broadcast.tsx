import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { isExecutive } from '../lib/account';
import { CHANNELS, youTubeId, ytThumb, ytEmbed } from '../data/broadcasts';
import { Play, Trash2, Plus, X, ExternalLink, Youtube, Radio } from 'lucide-react';

const inputCls =
  'w-full px-3.5 py-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-sm font-semibold text-emerald-900 placeholder:text-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:bg-white transition';

export const Broadcast: React.FC = () => {
  const { broadcasts, addBroadcast, deleteBroadcast, currentUser } = useApp();
  const canEdit = isExecutive(currentUser?.role || 'guest');

  const categories = useMemo(() => ['All', ...Array.from(new Set(broadcasts.map(b => b.category).filter(Boolean) as string[]))], [broadcasts]);
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState<string | null>(broadcasts[0]?.id ?? null);

  const filtered = filter === 'All' ? broadcasts : broadcasts.filter(b => b.category === filter);
  const featured = broadcasts.find(b => b.id === selectedId) || filtered[0] || broadcasts[0] || null;

  const play = (id: string) => { setSelectedId(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // exec add form
  const [showAdd, setShowAdd] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState('');
  const [category, setCategory] = useState('Lecture');
  const [err, setErr] = useState('');

  const submitAdd = () => {
    const vid = youTubeId(url);
    if (!vid) { setErr('Paste a valid YouTube link or video id.'); return; }
    if (!title.trim() || !channel.trim()) { setErr('Add a title and channel name.'); return; }
    addBroadcast({ title: title.trim(), channel: channel.trim(), videoId: vid, category: category.trim() || 'Lecture' });
    setUrl(''); setTitle(''); setChannel(''); setCategory('Lecture'); setErr(''); setShowAdd(false);
  };

  return (
    <div className="py-10 animate-pop">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-3.5">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-600 font-extrabold text-xs px-3.5 py-1.5 rounded-full">
            <Radio size={13} /> WATCH &amp; LEARN
          </span>
          <h1 className="text-4xl font-extrabold text-emerald-800 mt-3">Broadcast 📺</h1>
          <p className="text-[15px] font-semibold text-emerald-700/60 mt-2">Courses &amp; lectures streamed straight from trusted YouTube channels.</p>
        </div>
        {canEdit && (
          <button
            onClick={() => { setShowAdd(s => !s); setErr(''); }}
            className="btn-pop inline-flex items-center gap-1.5 bg-emerald-600 text-white text-sm px-4 py-2.5 shadow-[0_4px_0_0_#047857] hover:bg-emerald-500"
          >
            {showAdd ? <><X size={16} /> Close</> : <><Plus size={16} /> Add broadcast</>}
          </button>
        )}
      </div>

      {/* exec add form */}
      {canEdit && showAdd && (
        <div className="mt-4 bg-white border border-emerald-50 rounded-[22px] p-5 shadow-[0_10px_30px_-22px_rgba(5,150,105,0.5)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="YouTube link or video id" className={`${inputCls} sm:col-span-2`} />
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className={inputCls} />
            <input value={channel} onChange={e => setChannel(e.target.value)} placeholder="Channel / presenter" className={inputCls} />
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category (e.g. Tafsir)" className={inputCls} />
            <button onClick={submitAdd} className="btn-pop bg-amber-500 text-white text-sm px-5 py-2.5 shadow-[0_4px_0_0_#d97706] hover:bg-amber-400">Add to library</button>
          </div>
          {err && <p className="text-[13px] font-bold text-rose-600 mt-2.5">{err}</p>}
        </div>
      )}

      {!featured ? (
        <div className="mt-7 text-center py-16 bg-emerald-50/60 rounded-3xl border border-dashed border-emerald-200 text-sm font-semibold text-emerald-700/60">
          No broadcasts yet.
        </div>
      ) : (
        <>
          {/* featured player */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
            <div>
              <div className="rounded-[24px] overflow-hidden bg-emerald-950 aspect-video border border-emerald-100 shadow-[0_14px_40px_-22px_rgba(5,150,105,0.55)]">
                <iframe
                  key={featured.id}
                  src={ytEmbed(featured.videoId)}
                  title={featured.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex items-start justify-between gap-3 mt-3.5">
                <div>
                  <div className="flex items-center gap-2">
                    {featured.category && <span className="text-[11px] font-extrabold text-amber-500 uppercase tracking-wide">{featured.category}</span>}
                    {featured.live && <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-white bg-rose-600 px-2 py-0.5 rounded-full"><Radio size={10} /> LIVE</span>}
                  </div>
                  <h2 className="text-2xl font-extrabold text-emerald-900 mt-1 leading-tight">{featured.title}</h2>
                  <div className="text-[13px] font-extrabold text-emerald-600 mt-1 flex items-center gap-1.5"><Youtube size={15} /> {featured.channel}</div>
                  {featured.description && <p className="text-[14px] font-semibold text-emerald-700/60 mt-2 leading-relaxed">{featured.description}</p>}
                </div>
                {canEdit && (
                  <button
                    onClick={() => { if (confirm('Remove this broadcast?')) deleteBroadcast(featured.id); }}
                    title="Remove"
                    className="shrink-0 w-9 h-9 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* channels to follow */}
            <aside className="bg-white border border-emerald-50 rounded-[24px] p-5 shadow-[0_10px_30px_-22px_rgba(5,150,105,0.5)]">
              <h3 className="text-base font-extrabold text-emerald-800 mb-3">Channels to follow</h3>
              <div className="flex flex-col gap-2.5">
                {CHANNELS.map(c => (
                  <a
                    key={c.handle}
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-emerald-50 transition group"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold shrink-0" style={{ background: c.tint }}>
                      {c.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] font-extrabold text-emerald-900 leading-tight truncate">{c.name}</div>
                      <div className="text-[11.5px] font-semibold text-emerald-700/55 truncate">{c.handle}</div>
                    </div>
                    <ExternalLink size={15} className="text-emerald-400 group-hover:text-emerald-600 shrink-0" />
                  </a>
                ))}
              </div>
            </aside>
          </div>

          {/* category filter */}
          <div className="flex flex-wrap gap-2 mt-9">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`font-extrabold text-[13px] px-3.5 py-2.5 rounded-xl transition cursor-pointer ${
                  filter === c ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* library grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {filtered.map(b => (
              <button
                key={b.id}
                onClick={() => play(b.id)}
                className={`card-lift text-left bg-white border rounded-[22px] overflow-hidden shadow-[0_8px_26px_-18px_rgba(5,150,105,0.5)] cursor-pointer ${
                  b.id === featured.id ? 'border-emerald-400' : 'border-emerald-50'
                }`}
              >
                <div className="relative aspect-video bg-emerald-100 overflow-hidden">
                  <img src={ytThumb(b.videoId)} alt={b.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/15 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <span className="w-12 h-12 rounded-full bg-white/90 text-emerald-700 flex items-center justify-center shadow-lg">
                      <Play size={20} fill="currentColor" />
                    </span>
                  </div>
                  {b.live && <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 text-[10px] font-extrabold text-white bg-rose-600 px-2 py-0.5 rounded-full"><Radio size={10} /> LIVE</span>}
                  {b.id === featured.id && <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold text-white bg-emerald-600 px-2 py-0.5 rounded-full">Now playing</span>}
                </div>
                <div className="p-4">
                  {b.category && <span className="text-[10.5px] font-extrabold text-amber-500 uppercase tracking-wide">{b.category}</span>}
                  <h3 className="text-[15px] font-extrabold text-emerald-900 mt-0.5 leading-tight line-clamp-2">{b.title}</h3>
                  <div className="text-[12px] font-bold text-emerald-600 mt-1 flex items-center gap-1"><Youtube size={13} /> {b.channel}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
