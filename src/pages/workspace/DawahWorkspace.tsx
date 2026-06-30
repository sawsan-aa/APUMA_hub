import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CERTIFIED_SOURCES } from '../../lib/sources';
import { ExternalLink, Plus, Trash2, Save, Upload, FileText, CheckCircle2, Clock } from 'lucide-react';

const blankSlides = () => ['', ''];

export const DawahWorkspace: React.FC = () => {
  const { drafts, createDraft, updateDraft, rejectOrDeleteDraft, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slides, setSlides] = useState<string[]>(blankSlides());
  const [notice, setNotice] = useState('');

  // Briefs authored by the Da'wah team (newest first).
  const myDrafts = drafts.filter(d => d.status === 'draft');

  const setSlide = (i: number, v: string) => setSlides(s => s.map((x, idx) => (idx === i ? v : x)));
  const addSlide = () => setSlides(s => [...s, '']);
  const removeSlide = (i: number) => setSlides(s => (s.length <= 1 ? s : s.filter((_, idx) => idx !== i)));

  const clearForm = () => { setTitle(''); setDescription(''); setSlides(blankSlides()); };

  const valid = title.trim() && description.trim() && slides.some(s => s.trim());

  const save = (submitted: boolean) => {
    if (!valid) { setNotice('Add a title, description and at least one slide first.'); return; }
    createDraft(title.trim(), description.trim(), slides.map(s => s.trim()).filter(Boolean), submitted);
    clearForm();
    setNotice(submitted ? '✅ Uploaded — the Design team can now pick it up.' : '💾 Saved as draft.');
    setTimeout(() => setNotice(''), 3500);
  };

  return (
    <div className="py-8 animate-pop">
      <div>
        <h1 className="text-3xl font-extrabold text-emerald-800">Da’wah Workspace 📖</h1>
        <p className="text-sm font-semibold text-emerald-700/60 mt-1">
          Research from certified sources, then write today’s post content for the Design team.
        </p>
      </div>

      {/* Certified sources */}
      <section className="mt-7">
        <h2 className="text-lg font-extrabold text-emerald-800 mb-3">Certified sources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {CERTIFIED_SOURCES.map(s => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="card-lift bg-white border border-emerald-50 rounded-2xl p-4 shadow-[0_8px_26px_-18px_rgba(5,150,105,0.5)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{s.emoji}</span>
                <ExternalLink size={15} className="text-emerald-400" />
              </div>
              <h3 className="text-[15px] font-extrabold text-emerald-900 mt-2">{s.name}</h3>
              <div className="text-[13px] font-bold text-emerald-500">{s.arabic}</div>
              <p className="text-[12px] font-semibold text-emerald-700/55 mt-1.5 leading-snug">{s.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-7 mt-9 items-start">
        {/* Composer */}
        <section className="bg-white border border-emerald-50 rounded-[26px] p-7 shadow-[0_12px_32px_-22px_rgba(5,150,105,0.5)]">
          <h2 className="text-xl font-extrabold text-emerald-800 flex items-center gap-2"><FileText size={20} /> Today’s post content</h2>

          <label className="block text-xs font-extrabold text-emerald-700 uppercase tracking-wide mt-5 mb-1.5">Title</label>
          <input
            id="input-title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. The mercy in small acts"
            className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-sm font-semibold text-emerald-900 placeholder:text-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
          />

          <label className="block text-xs font-extrabold text-emerald-700 uppercase tracking-wide mt-4 mb-1.5">Description / caption</label>
          <textarea
            id="input-description"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Core message, hadith references, tone & visual direction for the designers…"
            className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-sm font-semibold text-emerald-900 placeholder:text-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:bg-white transition leading-relaxed"
          />

          <div className="flex items-center justify-between mt-5 mb-2">
            <label className="text-xs font-extrabold text-emerald-700 uppercase tracking-wide">Carousel slides</label>
            <button id="btn-add-slide" type="button" onClick={addSlide} className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 font-extrabold text-xs px-3 py-1.5 rounded-lg hover:bg-amber-200 transition cursor-pointer">
              <Plus size={13} /> Add slide
            </button>
          </div>
          <div className="space-y-2.5">
            {slides.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="shrink-0 w-14 text-xs font-extrabold text-emerald-500">Slide {i + 1}</span>
                <input
                  id={`input-slide-${i}`}
                  value={s}
                  onChange={e => setSlide(i, e.target.value)}
                  placeholder={i === 0 ? 'Cover text…' : `Slide ${i + 1} content…`}
                  className="flex-1 px-3.5 py-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-[13px] font-semibold text-emerald-900 placeholder:text-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => removeSlide(i)}
                  disabled={slides.length <= 1}
                  className="w-9 h-9 rounded-lg text-rose-500 hover:bg-rose-50 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          {notice && <div className="mt-4 text-[13px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-3.5 py-2.5">{notice}</div>}

          <div className="flex flex-wrap gap-2.5 mt-6">
            <button id="btn-delete-form" type="button" onClick={clearForm} className="btn-pop bg-gray-100 text-gray-600 px-4 py-2.5 text-sm flex items-center gap-1.5">
              <Trash2 size={15} /> Delete
            </button>
            <button id="btn-save-draft" type="button" onClick={() => save(false)} className="btn-pop bg-emerald-50 text-emerald-700 px-4 py-2.5 text-sm flex items-center gap-1.5">
              <Save size={15} /> Save as draft
            </button>
            <button id="btn-upload" type="button" onClick={() => save(true)} className="btn-pop bg-emerald-600 text-white px-5 py-2.5 text-sm shadow-[0_5px_0_0_#047857] hover:bg-emerald-500 flex items-center gap-1.5 ml-auto">
              <Upload size={15} /> Upload to Design team
            </button>
          </div>
        </section>

        {/* My briefs */}
        <aside>
          <h2 className="text-lg font-extrabold text-emerald-800 mb-3">My content ({myDrafts.length})</h2>
          <div className="space-y-3">
            {myDrafts.length === 0 ? (
              <div className="text-center py-10 bg-emerald-50/60 rounded-2xl border border-dashed border-emerald-200 text-[13px] font-semibold text-emerald-700/55 px-5">
                Nothing yet — compose today’s post and save or upload it.
              </div>
            ) : myDrafts.map(d => (
              <div key={d.id} className="bg-white border border-emerald-50 rounded-2xl p-4 shadow-[0_8px_26px_-20px_rgba(5,150,105,0.5)]">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[14px] font-extrabold text-emerald-900 leading-tight">{d.title}</h3>
                  <button onClick={() => rejectOrDeleteDraft(d.id)} title="Delete" className="shrink-0 w-7 h-7 rounded-lg text-rose-500 hover:bg-rose-50 flex items-center justify-center cursor-pointer">
                    <Trash2 size={13} />
                  </button>
                </div>
                <p className="text-[12px] font-semibold text-emerald-700/55 mt-1 line-clamp-2 leading-snug">{d.brief}</p>
                <div className="text-[11px] font-bold text-emerald-500 mt-1.5">{d.panels.length} slides</div>
                <div className="flex items-center justify-between mt-3">
                  {d.submitted ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full"><CheckCircle2 size={12} /> Uploaded</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full"><Clock size={12} /> Draft</span>
                  )}
                  {!d.submitted && (
                    <button onClick={() => updateDraft(d.id, { submitted: true })} className="text-[12px] font-extrabold text-emerald-600 hover:text-emerald-700 cursor-pointer">Upload →</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
