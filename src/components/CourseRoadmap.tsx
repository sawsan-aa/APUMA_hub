import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CourseModule, SessionMedia } from '../types';
import { X, Star, Flame, Check, Lock, Play, Trophy, ChevronLeft, RotateCcw } from 'lucide-react';
import { ListenStep, RecordStep } from './MediaSteps';
import { currentTheme } from '../lib/theme';

/* ---------- player step model ---------- */
type Step =
  | { type: 'card'; emoji: string; heading: string; body: string }
  | { type: 'video'; title: string; url: string }
  | { type: 'listen'; media: SessionMedia }
  | { type: 'record'; media: SessionMedia }
  | { type: 'quiz'; q: { question: string; options: string[]; correctAnswerIndex: number; explanation: string } }
  | { type: 'reward'; xp: number };

interface ActivePlayer {
  kind: 'session' | 'quiz';
  moduleId: string;
  sessionId?: string;
  title: string;
  accent: string;
  xp: number;
  totalQuiz: number;
  steps: Step[];
}

const NODE_SHIFT = [0, 70, 0, -70];

export const CourseRoadmap: React.FC = () => {
  const { activeCourse, progress, completeSession, completeModuleQuiz, currentUser, resetProgress } = useApp();
  const navigate = useNavigate();
  const accent = activeCourse.accent;
  const role = currentUser?.role || 'guest';
  const isGuest = role === 'guest';
  const dark = currentTheme() === 'dark';

  const [guestAck, setGuestAck] = useState(false);
  const [gateFor, setGateFor] = useState<null | (() => void)>(null);

  const [active, setActive] = useState<ActivePlayer | null>(null);
  const [step, setStep] = useState(0);
  const [quizSel, setQuizSel] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);

  const done = (id: string) => progress.completedSessionIds.includes(id);
  const moduleUnlocked = (m: CourseModule) => {
    if (m.order === 1) return true;
    const prev = activeCourse.modules.find(x => x.order === m.order - 1);
    return !!prev && progress.completedModuleIds.includes(prev.id);
  };
  const modulePct = (m: CourseModule) => {
    const total = m.sessions.length + 1; // sessions + quiz
    const cleared = m.sessions.filter(s => done(s.id)).length + (progress.completedModuleIds.includes(m.id) ? 1 : 0);
    return Math.round((cleared / total) * 100);
  };

  const totalXp = progress.totalXp;
  const streak = Math.max(progress.completedModuleIds.length, 1);

  /* ---------- open helpers ---------- */
  const withGate = (fn: () => void) => {
    if (isGuest && !guestAck) { setGateFor(() => fn); return; }
    fn();
  };

  const resetPlayerState = () => { setStep(0); setQuizSel(null); setRevealed(false); setCorrect(0); };

  const openSession = (m: CourseModule, sessionId: string) => {
    const session = m.sessions.find(s => s.id === sessionId)!;
    const steps: Step[] = session.contentPanels.map((p, i) => ({
      type: 'card', emoji: activeCourse.emoji,
      heading: i === 0 ? session.title : '',
      body: p,
    }));
    if (session.videoUrl) steps.push({ type: 'video', title: session.videoTitle || session.title, url: session.videoUrl });
    if (session.listen) steps.push({ type: 'listen', media: session.listen });
    if (session.practice) steps.push({ type: 'record', media: session.practice });
    steps.push({ type: 'reward', xp: session.xp });
    resetPlayerState();
    setActive({ kind: 'session', moduleId: m.id, sessionId, title: session.title, accent, xp: session.xp, totalQuiz: 0, steps });
  };

  const openQuiz = (m: CourseModule) => {
    const steps: Step[] = m.quiz.questions.map(q => ({ type: 'quiz', q }));
    steps.push({ type: 'reward', xp: 50 });
    resetPlayerState();
    setActive({ kind: 'quiz', moduleId: m.id, title: m.quiz.title, accent, xp: 50, totalQuiz: m.quiz.questions.length, steps });
  };

  const closePlayer = () => { setActive(null); resetPlayerState(); };

  /* ---------- player flow ---------- */
  const cur = active ? active.steps[step] : null;
  const next = () => { setStep(s => s + 1); setQuizSel(null); setRevealed(false); };
  const reveal = () => {
    if (!cur || cur.type !== 'quiz') return;
    if (quizSel === cur.q.correctAnswerIndex) setCorrect(c => c + 1);
    setRevealed(true);
  };
  const claim = () => {
    if (!active) return;
    if (active.kind === 'session' && active.sessionId) {
      completeSession(active.moduleId, active.sessionId, active.xp);
    } else if (active.kind === 'quiz') {
      const pct = active.totalQuiz ? Math.round((correct / active.totalQuiz) * 100) : 0;
      completeModuleQuiz(active.moduleId, pct);
    }
    closePlayer();
  };

  /* ---------- primary button for the player footer ---------- */
  let primaryLabel = 'Continue';
  let primaryDisabled = false;
  let primaryAction = next;
  if (cur?.type === 'quiz') {
    if (!revealed) { primaryLabel = 'Check answer'; primaryDisabled = quizSel === null; primaryAction = reveal; }
    else { primaryLabel = 'Continue'; primaryAction = next; }
  } else if (cur?.type === 'reward') {
    primaryLabel = active?.kind === 'quiz' ? 'Finish quiz 🎉' : 'Claim reward 🎉';
    primaryAction = claim;
  }
  const stepPct = active ? Math.round(((step + 1) / active.steps.length) * 100) : 0;

  return (
    <div className="animate-pop">
      {/* ===== course header ===== */}
      <div className="sticky top-[68px] z-30 -mx-5 sm:-mx-6 px-5 sm:px-6 py-3.5 bg-cream/90 backdrop-blur-md border-b border-emerald-100">
        <button
          id="btn-all-courses"
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 font-extrabold text-[12.5px] px-3.5 py-2 rounded-xl hover:bg-emerald-100 transition cursor-pointer"
        >
          <ChevronLeft size={15} strokeWidth={3} /> All courses
        </button>
        <div className="flex items-center justify-between mt-2 max-w-2xl">
          <div>
            <h1 className="text-2xl font-extrabold text-emerald-800 flex items-center gap-2">
              <span>{activeCourse.emoji}</span> {activeCourse.title}
            </h1>
            <p className="text-[13px] font-extrabold text-emerald-500">Keep going — you’re on a roll!</p>
          </div>
          <div className="flex gap-2.5">
            <div className="flex items-center gap-1.5 bg-amber-100 text-amber-700 px-3.5 py-2 rounded-2xl font-extrabold">
              <Star size={17} className="fill-amber-400 text-amber-500" /> {totalXp}
            </div>
            <div className="flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3.5 py-2 rounded-2xl font-extrabold">
              <Flame size={17} className="fill-orange-400 text-orange-500" /> {streak}
            </div>
          </div>
        </div>
        <div
          className={`mt-3 max-w-2xl text-[12.5px] font-bold px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-3 ${
            isGuest ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
          }`}
        >
          <span>
            {isGuest
              ? '⚠ Playing as guest — progress saves on this device. Log in to sync across devices.'
              : `✓ Signed in as ${currentUser?.name} — your progress syncs to your account.`}
          </span>
        </div>
      </div>

      {/* ===== snaking roadmap ===== */}
      <div className="max-w-2xl mx-auto pb-10">
        {activeCourse.modules.map((m) => {
          const unlocked = moduleUnlocked(m);
          const quizDone = progress.completedModuleIds.includes(m.id);
          const allSessionsDone = m.sessions.every(s => done(s.id));

          // build node list (sessions + final quiz)
          let prevDone = true;
          const sessionNodes = m.sessions.map((s) => {
            const isDone = done(s.id);
            let status: 'done' | 'current' | 'locked';
            if (!unlocked) status = 'locked';
            else if (isDone) status = 'done';
            else if (prevDone) status = 'current';
            else status = 'locked';
            prevDone = isDone;
            return { id: s.id, title: s.title, xp: s.xp, status, kind: 'session' as const };
          });
          const quizStatus: 'done' | 'current' | 'locked' =
            !unlocked ? 'locked' : quizDone ? 'done' : allSessionsDone ? 'current' : 'locked';
          const nodes = [
            ...sessionNodes,
            { id: m.quiz.id, title: 'Module Quiz', xp: 50, status: quizStatus, kind: 'quiz' as const },
          ];

          return (
            <div key={m.id}>
              {/* module banner */}
              <div
                className="flex items-center gap-4 rounded-[26px] px-5 py-4 mt-10 mb-2 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.25)]"
                style={{ background: unlocked ? `linear-gradient(135deg, ${accent}, ${accent}cc)` : '#D1D5DB' }}
              >
                <div className="w-[50px] h-[50px] rounded-2xl bg-white/25 flex items-center justify-center text-2xl shrink-0">
                  {m.icon === 'lock' ? '🔒' : activeCourse.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-extrabold text-white/75 uppercase tracking-widest">Module {m.order}</div>
                  <h2 className="text-xl font-extrabold text-white truncate">{m.title}</h2>
                  {unlocked && (
                    <div className="h-2 bg-white/30 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: `${modulePct(m)}%` }} />
                    </div>
                  )}
                </div>
                {!unlocked && <Lock size={22} className="text-white/90" />}
              </div>

              {/* nodes */}
              <div className="flex flex-col items-center gap-7 py-6">
                {nodes.map((n, ni) => {
                  const locked = n.status === 'locked';
                  const isCurrent = n.status === 'current';
                  const isDone = n.status === 'done';
                  const onTap = () => {
                    if (locked) return;
                    if (n.kind === 'quiz') withGate(() => openQuiz(m));
                    else withGate(() => openSession(m, n.id));
                  };
                  return (
                    <div
                      key={n.id}
                      className="flex flex-col items-center"
                      style={{ transform: `translateX(${NODE_SHIFT[ni % NODE_SHIFT.length]}px)` }}
                    >
                      <div className="relative">
                        {isCurrent && (
                          <span className="absolute inset-0 rounded-full animate-ping-soft" style={{ background: accent }} />
                        )}
                        <button
                          id={`node-${n.id}`}
                          onClick={onTap}
                          disabled={locked}
                          className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-transform ${isCurrent ? 'animate-bounce-soft hover:scale-105' : locked ? 'cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}`}
                          style={{
                            borderColor: locked ? '#E5E7EB' : accent,
                            background: isDone ? accent : locked ? '#F3F4F6' : '#FFFFFF',
                            boxShadow: locked ? 'none' : `0 8px 0 0 ${accent}33, 0 10px 22px -8px ${accent}88`,
                          }}
                        >
                          {isDone ? (
                            <Check size={34} strokeWidth={3.2} className="text-white" />
                          ) : locked ? (
                            <Lock size={28} className="text-gray-400" />
                          ) : n.kind === 'quiz' ? (
                            <Trophy size={30} style={{ color: accent }} />
                          ) : (
                            <Play size={28} fill={accent} stroke="none" />
                          )}
                        </button>
                        {isCurrent && (
                          <span className="absolute -top-1.5 -right-1.5 w-[26px] h-[26px] rounded-full bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-md">!</span>
                        )}
                      </div>
                      <div className={`mt-2 text-[12.5px] font-extrabold text-center max-w-[140px] ${locked ? 'text-gray-400' : 'text-emerald-900'}`}>
                        {n.title}
                      </div>
                      {!locked && <div className="text-[11px] font-extrabold text-amber-500 mt-0.5">+{n.xp} XP</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== guest gate ===== */}
      {gateFor && (
        <div className="fixed inset-0 z-90 bg-emerald-900/45 backdrop-blur-sm flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-white rounded-[28px] p-7 text-center shadow-2xl animate-slide-up">
            <div className="w-16 h-16 mx-auto rounded-[20px] bg-emerald-100 flex items-center justify-center text-3xl">🏆</div>
            <h3 className="text-[22px] font-extrabold text-emerald-800 mt-4">Save your progress?</h3>
            <p className="text-sm font-semibold text-emerald-700/60 mt-2 leading-relaxed">
              Log in as a member to sync your XP across devices — or keep playing as a guest and we’ll remember progress on this device.
            </p>
            <div className="flex flex-col gap-2.5 mt-5">
              <button
                onClick={() => { setGateFor(null); navigate('/login'); }}
                className="btn-pop bg-emerald-600 text-white py-3 shadow-[0_5px_0_0_#047857]"
              >
                Log in to save progress
              </button>
              <button
                onClick={() => { const fn = gateFor; setGuestAck(true); setGateFor(null); fn(); }}
                className="btn-pop bg-emerald-50 text-emerald-800 py-3"
              >
                Continue as Guest
              </button>
            </div>
            <button onClick={() => setGateFor(null)} className="mt-3 text-[13px] font-bold text-gray-400 hover:text-gray-500 cursor-pointer">
              Maybe later
            </button>
          </div>
        </div>
      )}

      {/* ===== session / quiz player ===== */}
      {active && cur && (
        <div className="fixed inset-0 z-100 bg-cream flex flex-col">
          {/* top bar */}
          <div className="flex items-center gap-3.5 px-5 py-4 max-w-2xl w-full mx-auto">
            <button onClick={closePlayer} className="w-[38px] h-[38px] rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 cursor-pointer">
              <X size={18} strokeWidth={2.6} />
            </button>
            <div className="flex-1 h-3.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${stepPct}%`, background: active.accent }} />
            </div>
            <div className="flex items-center gap-1.5 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-xl font-extrabold text-[13px] shrink-0">
              <Star size={15} className="fill-amber-400 text-amber-500" /> {active.xp}
            </div>
          </div>

          {/* body */}
          <div className="flex-1 overflow-y-auto flex flex-col justify-center apuma-scroll">
            <div className="max-w-xl w-full mx-auto px-6 pb-10">
              <div className="text-center text-xs font-extrabold uppercase tracking-widest" style={{ color: active.accent }}>
                {active.title}
              </div>

              {cur.type === 'card' && (
                <div className="animate-pop mt-4">
                  {/* small supporting icon — the text is the focus */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: `${active.accent}1f` }}>
                      {cur.emoji}
                    </div>
                    {cur.heading && (
                      <span className="text-[13px] font-extrabold uppercase tracking-wide" style={{ color: active.accent }}>{cur.heading}</span>
                    )}
                  </div>
                  <p className="text-[19px] sm:text-[21px] font-semibold text-emerald-900 mt-5 leading-[1.75]">{cur.body}</p>
                </div>
              )}

              {cur.type === 'video' && (
                <div className="animate-pop">
                  <h2 className="text-2xl font-extrabold text-emerald-900 text-center mt-5">{cur.title}</h2>
                  <div className="mt-4 rounded-[26px] overflow-hidden aspect-video bg-black border border-emerald-100">
                    <iframe
                      width="100%" height="100%" src={cur.url} title={cur.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-center text-[13.5px] font-semibold text-gray-400 mt-3">A short video lesson — watch, then continue.</p>
                </div>
              )}

              {cur.type === 'listen' && <ListenStep media={cur.media} accent={active.accent} />}

              {cur.type === 'record' && <RecordStep media={cur.media} accent={active.accent} />}

              {cur.type === 'quiz' && (
                <div className="animate-pop">
                  <div className="text-center text-[13px] font-extrabold text-amber-500 uppercase tracking-wide mt-3.5">Quiz time 🧠</div>
                  <h2 className="text-[23px] font-extrabold text-emerald-900 text-center mt-2 leading-snug">{cur.q.question}</h2>
                  <div className="flex flex-col gap-3 mt-6">
                    {cur.q.options.map((opt, i) => {
                      let bg = dark ? '#13211d' : '#fff';
                      let color = dark ? '#edf6f2' : '#064E3B';
                      let border = `2px solid ${dark ? '#294035' : '#E5E7EB'}`;
                      let icon = '';
                      if (!revealed) {
                        if (quizSel === i) { bg = dark ? '#0e2a22' : '#ECFDF5'; border = `2px solid ${active.accent}`; color = active.accent; }
                      } else if (i === cur.q.correctAnswerIndex) {
                        bg = dark ? '#0f3a26' : '#DCFCE7'; border = '2px solid #16A34A'; color = dark ? '#4ade80' : '#15803D'; icon = '✓';
                      } else if (quizSel === i) {
                        bg = dark ? '#3a1619' : '#FEE2E2'; border = '2px solid #DC2626'; color = dark ? '#fb7185' : '#B91C1C'; icon = '✕';
                      } else { color = dark ? '#6f8a7f' : '#9CA3AF'; }
                      return (
                        <button
                          key={i}
                          onClick={() => !revealed && setQuizSel(i)}
                          disabled={revealed}
                          className="flex items-center justify-between gap-2.5 text-left px-[18px] py-4 rounded-[18px] font-extrabold text-[15.5px] transition-all cursor-pointer"
                          style={{ background: bg, color, border }}
                        >
                          <span>{opt}</span>
                          <span className="text-lg font-black">{icon}</span>
                        </button>
                      );
                    })}
                  </div>
                  {revealed && (
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-green-700 leading-relaxed">
                      💡 {cur.q.explanation}
                    </div>
                  )}
                </div>
              )}

              {cur.type === 'reward' && (
                <div className="text-center animate-pop py-3">
                  <div className="text-7xl animate-bounce-soft">🎉</div>
                  <h2 className="text-3xl font-extrabold text-emerald-800 mt-2">
                    {active.kind === 'quiz' ? 'Quiz complete!' : 'Session complete!'}
                  </h2>
                  <p className="text-[15.5px] font-semibold text-emerald-700/60 mt-2">
                    {active.kind === 'quiz' ? 'Great effort, masha’Allah!' : `You completed “${active.title}”. Masha’Allah!`}
                  </p>
                  <div className="inline-flex items-center gap-2 mt-5 bg-amber-100 text-amber-700 font-extrabold text-[22px] px-6 py-3 rounded-[18px]">
                    <Star size={26} className="fill-amber-400 text-amber-500" /> +{cur.xp} XP
                  </div>
                  {active.kind === 'quiz' && (
                    <div className="mt-4 text-[15px] font-extrabold" style={{ color: correct / active.totalQuiz >= 0.7 ? (dark ? '#34d399' : '#059669') : (dark ? '#fb7185' : '#DC2626') }}>
                      You scored {correct} / {active.totalQuiz}
                      {correct / active.totalQuiz >= 0.7 ? ' — passed! Next module unlocked ✨' : ' — need 70% to unlock the next module.'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* footer */}
          <div className="border-t border-gray-200 bg-white">
            <div className="max-w-xl mx-auto px-6 py-4">
              <button
                onClick={primaryAction}
                disabled={primaryDisabled}
                className="btn-pop w-full py-4 text-white text-base"
                style={{
                  background: primaryDisabled ? (dark ? '#243029' : '#D1D5DB') : active.accent,
                  boxShadow: primaryDisabled ? 'none' : '0 5px 0 0 rgba(0,0,0,0.18)',
                }}
              >
                {primaryLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
