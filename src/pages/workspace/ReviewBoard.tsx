import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ContentDraft } from '../../types';
import { accountBadge } from '../../lib/account';
import { FileText, Palette, CheckSquare, Send, Trash2, ToggleLeft, ToggleRight, Copy, Check, ExternalLink } from 'lucide-react';

const Column: React.FC<{ icon: React.ReactNode; title: string; count: number; children: React.ReactNode }> = ({ icon, title, count, children }) => (
  <div className="bg-emerald-50/40 border border-emerald-100 rounded-3xl p-4 min-h-[420px]">
    <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-100">
      <div className="flex items-center gap-2">
        <span className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-emerald-700">{icon}</span>
        <h3 className="text-sm font-extrabold text-emerald-900">{title}</h3>
      </div>
      <span className="text-xs font-extrabold text-emerald-600 bg-white px-2 py-0.5 rounded-full">{count}</span>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const Empty: React.FC<{ text: string }> = ({ text }) => (
  <div className="text-center py-8 text-[12.5px] font-semibold text-emerald-700/50">{text}</div>
);

export const ReviewBoard: React.FC = () => {
  const { drafts, currentUser, approveDraftToPublish, rejectOrDeleteDraft, systemConfig, toggleRecruitment } = useApp();
  const role = currentUser?.role || 'guest';
  const isExec = role === 'executive' || role === 'admin';
  const badge = accountBadge(role);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const briefs = drafts.filter(d => d.status === 'draft' && d.submitted);
  const awaiting = drafts.filter(d => d.status === 'designed');
  const published = drafts.filter(d => d.status === 'approved');

  const copyCaption = (d: ContentDraft) => {
    const text = `📢 ${d.title}\n\n${d.brief}\n\n${d.panels.map((p, i) => `Slide ${i + 1}: ${p}`).join('\n')}\n\n#apuma #apumuslims`;
    navigator.clipboard.writeText(text);
    setCopiedId(d.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="py-8 animate-pop">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-800">Executive Review 👑</h1>
          <p className="text-sm font-semibold text-emerald-700/60 mt-1">Approve designs for publishing and manage recruitment.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border ${badge.badgeBg}`}>
            <span className="text-lg">{currentUser?.avatar || badge.emoji}</span>
            <div className="text-[13px] font-extrabold text-emerald-900">{currentUser?.name}</div>
          </div>
          <button
            onClick={() => toggleRecruitment(!systemConfig.recruitmentOpen)}
            disabled={!isExec}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-2xl border font-extrabold text-xs transition ${
              isExec ? 'cursor-pointer bg-white border-emerald-100 text-emerald-700 hover:bg-emerald-50' : 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400'
            }`}
          >
            {systemConfig.recruitmentOpen ? <ToggleRight size={22} className="text-emerald-500" /> : <ToggleLeft size={22} className="text-gray-400" />}
            Recruitment {systemConfig.recruitmentOpen ? 'OPEN' : 'CLOSED'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-7">
        {/* Briefs from Da'wah */}
        <Column icon={<FileText size={17} />} title="Briefs (Da’wah)" count={briefs.length}>
          {briefs.length === 0 ? <Empty text="No briefs uploaded yet." /> : briefs.map(d => (
            <div key={d.id} className="bg-white border border-emerald-50 rounded-2xl p-4">
              <h4 className="text-[14px] font-extrabold text-emerald-900">{d.title}</h4>
              <div className="text-[11px] font-bold text-emerald-500 mt-0.5">by {d.submittedBy} · {d.panels.length} slides</div>
              <p className="text-[12px] font-semibold text-emerald-700/55 mt-1.5 line-clamp-2">{d.brief}</p>
              <span className="inline-block mt-2 text-[11px] font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">Waiting for design</span>
            </div>
          ))}
        </Column>

        {/* Awaiting approval */}
        <Column icon={<Palette size={17} />} title="Awaiting approval" count={awaiting.length}>
          {awaiting.length === 0 ? <Empty text="No designs awaiting sign-off." /> : awaiting.map(d => (
            <div key={d.id} className="bg-white border border-emerald-50 rounded-2xl p-4">
              {d.designImages?.[0] && (
                <div className="aspect-video rounded-xl overflow-hidden bg-emerald-100 mb-3">
                  <img src={d.designImages[0]} alt={d.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
              )}
              <h4 className="text-[14px] font-extrabold text-emerald-900">{d.title}</h4>
              <div className="text-[11px] font-bold text-emerald-500 mt-0.5">writer {d.submittedBy} · design {d.designedBy}</div>
              {d.canvaLink && (
                <a href={d.canvaLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11.5px] font-extrabold text-[#8b3dff] mt-1.5">
                  View Canva project <ExternalLink size={11} />
                </a>
              )}
              {isExec ? (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button onClick={() => rejectOrDeleteDraft(d.id)} className="py-2 rounded-xl bg-white border border-rose-100 text-rose-600 text-xs font-extrabold hover:bg-rose-50 transition cursor-pointer">Reject</button>
                  <button onClick={() => approveDraftToPublish(d.id, 'post')} className="py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold hover:bg-emerald-500 transition flex items-center justify-center gap-1 cursor-pointer">
                    <Send size={12} /> Approve
                  </button>
                </div>
              ) : (
                <div className="mt-3 text-[11.5px] font-semibold text-amber-700 bg-amber-50 rounded-xl px-3 py-2">Awaiting an executive to approve.</div>
              )}
            </div>
          ))}
        </Column>

        {/* Published */}
        <Column icon={<CheckSquare size={17} />} title="Published" count={published.length}>
          {published.length === 0 ? <Empty text="Approved posts appear here." /> : published.map(d => (
            <div key={d.id} className="bg-white border border-emerald-50 rounded-2xl p-4">
              {d.designImages?.[0] && (
                <div className="aspect-video rounded-xl overflow-hidden bg-emerald-100 mb-3 relative">
                  <img src={d.designImages[0]} alt={d.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 bg-emerald-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full">LIVE</span>
                </div>
              )}
              <h4 className="text-[14px] font-extrabold text-emerald-900">{d.title}</h4>
              <div className="text-[11px] font-bold text-emerald-500 mt-0.5">approved {d.approvedAt}</div>
              <button onClick={() => copyCaption(d)} className="w-full mt-2.5 py-2 rounded-xl bg-amber-50 text-amber-700 text-[11.5px] font-extrabold border border-amber-100 hover:bg-amber-100 transition flex items-center justify-center gap-1.5 cursor-pointer">
                {copiedId === d.id ? <><Check size={12} className="text-emerald-600" /> Copied!</> : <><Copy size={12} /> Copy caption</>}
              </button>
              <button onClick={() => rejectOrDeleteDraft(d.id)} className="w-full mt-1.5 py-1.5 text-[11px] font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer">
                <Trash2 size={12} /> Remove
              </button>
            </div>
          ))}
        </Column>
      </div>
    </div>
  );
};
