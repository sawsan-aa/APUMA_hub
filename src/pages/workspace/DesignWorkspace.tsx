import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CANVA_NEW_INSTAGRAM_POST, CANVA_DEMO_IMAGES, isCanvaLink } from '../../lib/sources';
import { ExternalLink, ImagePlus, Link2, Loader2, X, Send, Palette, CheckCircle2 } from 'lucide-react';

const readFiles = (files: FileList): Promise<string[]> =>
  Promise.all(
    Array.from(files).map(
      file =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        }),
    ),
  );

export const DesignWorkspace: React.FC = () => {
  const { drafts, uploadDesignAssets } = useApp();

  const todo = drafts.filter(d => d.status === 'draft' && d.submitted);
  const awaiting = drafts.filter(d => d.status === 'designed');

  const [openId, setOpenId] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [link, setLink] = useState('');
  const [retrieving, setRetrieving] = useState(false);
  const [err, setErr] = useState('');

  const open = (id: string) => { setOpenId(id); setImages([]); setLink(''); setErr(''); };
  const close = () => { setOpenId(null); setImages([]); setLink(''); setErr(''); };

  const onFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const urls = await readFiles(e.target.files);
    setImages(prev => [...prev, ...urls]);
    e.target.value = '';
  };

  // Simulated retrieval — a real version needs the Canva Connect API + OAuth.
  const retrieve = () => {
    setErr('');
    if (!isCanvaLink(link)) { setErr('Please paste a valid Canva project link (canva.com/…).'); return; }
    setRetrieving(true);
    window.setTimeout(() => {
      setImages(prev => [...prev, ...CANVA_DEMO_IMAGES.slice(0, 3)]);
      setRetrieving(false);
    }, 1300);
  };

  const removeImage = (i: number) => setImages(prev => prev.filter((_, idx) => idx !== i));

  const submit = (id: string) => {
    if (!images.length) { setErr('Add at least one picture or retrieve from a Canva link first.'); return; }
    uploadDesignAssets(id, images, isCanvaLink(link) ? link.trim() : undefined);
    close();
  };

  return (
    <div className="py-8 animate-pop">
      <div>
        <h1 className="text-3xl font-extrabold text-emerald-800">Design Workspace 🎨</h1>
        <p className="text-sm font-semibold text-emerald-700/60 mt-1">
          Turn the Da’wah team’s content into graphics, then submit them for executive review.
        </p>
      </div>

      {/* Today's content to design */}
      <section className="mt-7">
        <h2 className="text-lg font-extrabold text-emerald-800 mb-3">Today’s post content ({todo.length})</h2>
        {todo.length === 0 ? (
          <div className="text-center py-12 bg-emerald-50/60 rounded-3xl border border-dashed border-emerald-200 text-sm font-semibold text-emerald-700/55">
            Nothing to design yet — the Da’wah team hasn’t uploaded content.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {todo.map(d => (
              <article key={d.id} className="bg-white border border-emerald-50 rounded-[24px] p-6 shadow-[0_10px_30px_-20px_rgba(5,150,105,0.5)]">
                <h3 className="text-lg font-extrabold text-emerald-900">{d.title}</h3>
                <div className="text-[11px] font-bold text-emerald-500 mt-0.5">by {d.submittedBy}</div>
                <p className="text-[13px] font-semibold text-emerald-700/65 mt-2 leading-relaxed">{d.brief}</p>

                <div className="mt-3 space-y-1.5">
                  {d.panels.map((p, i) => (
                    <div key={i} className="bg-emerald-50/50 border border-emerald-100 rounded-xl px-3 py-2 text-[12.5px] font-semibold text-emerald-800">
                      <span className="font-extrabold text-emerald-600">Slide {i + 1}:</span> {p}
                    </div>
                  ))}
                </div>

                <a
                  href={CANVA_NEW_INSTAGRAM_POST}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pop inline-flex items-center gap-2 mt-4 bg-[#8b3dff] text-white px-4 py-2.5 text-sm shadow-[0_5px_0_0_#6d28d9] hover:opacity-95"
                >
                  <Palette size={16} /> Go to Canva (new IG post) <ExternalLink size={14} />
                </a>

                {openId === d.id ? (
                  <div className="mt-4 bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wide">Attach final graphics</span>
                      <button onClick={close} className="text-emerald-500 hover:text-emerald-700 cursor-pointer"><X size={16} /></button>
                    </div>

                    {/* Upload pictures */}
                    <label className="mt-3 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-emerald-200 rounded-xl bg-white py-5 cursor-pointer hover:bg-emerald-50/50 transition relative">
                      <input type="file" accept="image/*" multiple onChange={onFiles} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <ImagePlus size={22} className="text-emerald-600" />
                      <span className="text-[12px] font-extrabold text-emerald-700">Upload picture(s)</span>
                      <span className="text-[10.5px] font-semibold text-emerald-700/50">PNG, JPG, WebP — multiple allowed</span>
                    </label>

                    {/* Or paste Canva link */}
                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Link2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                          <input
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            placeholder="Paste Canva ‘view project’ link…"
                            className="w-full pl-9 pr-3 py-2.5 bg-white border border-emerald-100 rounded-xl text-[12.5px] font-semibold text-emerald-900 placeholder:text-emerald-700/40 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <button
                          onClick={retrieve}
                          disabled={retrieving}
                          className="btn-pop bg-emerald-600 text-white px-3.5 py-2.5 text-[12.5px] shadow-[0_4px_0_0_#047857] hover:bg-emerald-500 flex items-center gap-1.5 disabled:opacity-70"
                        >
                          {retrieving ? <><Loader2 size={14} className="animate-spin" /> Fetching…</> : 'Retrieve images'}
                        </button>
                      </div>
                      <p className="text-[10.5px] font-semibold text-emerald-700/45 mt-1">Pulls the project’s pictures automatically (simulated in this demo).</p>
                    </div>

                    {/* Previews */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        {images.map((src, i) => (
                          <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-emerald-100 bg-emerald-100">
                            <img src={src} alt={`asset ${i + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            <button onClick={() => removeImage(i)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center cursor-pointer"><X size={11} /></button>
                          </div>
                        ))}
                      </div>
                    )}

                    {err && <div className="text-[12px] font-bold text-rose-600 mt-2">{err}</div>}

                    <button
                      onClick={() => submit(d.id)}
                      className="btn-pop w-full mt-3 bg-emerald-700 text-white py-3 text-sm shadow-[0_5px_0_0_#065f46] hover:bg-emerald-600 flex items-center justify-center gap-2"
                    >
                      <Send size={15} /> Submit for executive review
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => open(d.id)}
                    className="btn-pop w-full mt-3 bg-emerald-50 text-emerald-700 py-2.5 text-sm hover:bg-emerald-100"
                  >
                    Attach graphics & submit →
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Awaiting executive review */}
      <section className="mt-10">
        <h2 className="text-lg font-extrabold text-emerald-800 mb-3">Awaiting executive review ({awaiting.length})</h2>
        {awaiting.length === 0 ? (
          <div className="text-center py-10 bg-emerald-50/40 rounded-2xl border border-dashed border-emerald-200 text-[13px] font-semibold text-emerald-700/50">
            Submitted designs will appear here until an executive approves them.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {awaiting.map(d => (
              <div key={d.id} className="bg-white border border-emerald-50 rounded-2xl overflow-hidden shadow-[0_8px_26px_-20px_rgba(5,150,105,0.5)]">
                {d.designImages?.[0] && (
                  <div className="aspect-video bg-emerald-100">
                    <img src={d.designImages[0]} alt={d.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-[14px] font-extrabold text-emerald-900">{d.title}</h3>
                  <div className="text-[11px] font-bold text-emerald-500 mt-0.5">{d.designImages?.length || 0} asset(s) · by {d.designedBy}</div>
                  <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                    <CheckCircle2 size={12} /> Sent for review
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
