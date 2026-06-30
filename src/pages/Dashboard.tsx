import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const isEmoji = (str: string) => !!str && str.length <= 4 && !str.includes('/') && !str.includes('.');

const POSTER_BGS = [
  'linear-gradient(160deg,#059669,#047857)',
  'linear-gradient(160deg,#D97706,#B45309)',
  'linear-gradient(160deg,#0D9488,#0F766E)',
  'linear-gradient(160deg,#10B981,#059669)',
];
const LEADER_BGS = [
  'linear-gradient(135deg,#A7F3D0,#34D399)',
  'linear-gradient(135deg,#FDE68A,#FBBF24)',
  'linear-gradient(135deg,#BAE6FD,#38BDF8)',
];

const SectionHead: React.FC<{ title: string; to?: string; cta?: string }> = ({ title, to, cta }) => (
  <div className="flex items-baseline justify-between">
    <h2 className="text-2xl sm:text-[26px] font-extrabold text-emerald-800">{title}</h2>
    {to && (
      <Link to={to} className="text-sm font-extrabold text-emerald-600 hover:text-emerald-700 transition">
        {cta || 'See all'} →
      </Link>
    )}
  </div>
);

export const Dashboard: React.FC = () => {
  const { posts, members, courses, progress, setActiveCourse } = useApp();
  const navigate = useNavigate();

  const latestPosts = posts.slice(0, 3);
  const events = posts.filter(p => p.category === 'event').slice(0, 4);
  const leaders = members.filter(m => m.category === 'executive').slice(0, 3);

  const openCourse = (id: string) => { setActiveCourse(id); navigate('/academy'); window.scrollTo(0, 0); };

  return (
    <div className="py-8 space-y-11 animate-pop">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-[10px] bg-linear-to-br from-emerald-800 via-emerald-600 to-emerald-500 px-8 sm:px-11 py-12 sm:py-14">
        <div className="absolute -top-8 right-10 w-32 h-32 rounded-full bg-emerald-200/25 animate-floaty" />
        <div className="absolute -bottom-10 right-40 w-20 h-20 rounded-3xl bg-amber-500/35 animate-floaty-slow" />
        <div className="relative max-w-xl">
          <span className="inline-block bg-white/20 text-emerald-50 font-extrabold text-xs px-3.5 py-1.5 rounded-full tracking-wide">
            ★ APU MUSLIM ASSOCIATION
          </span>
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight mt-4">
            Where the <span className="text-amber-400">Muslim Community</span> of APU <span className="text-amber-400">lives</span>
          </h1>
          <p className="text-emerald-50/90 text-base sm:text-[17px] font-semibold mt-3.5 leading-relaxed">
            Islamic reminders &amp; insights, a gamified Seerah academy, and a home for every Muslim student at APU.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              id="btn-hero-courses"
              to="/courses"
              className="btn-pop bg-amber-500 text-white text-[15px] px-6 py-3.5 shadow-[0_6px_0_0_#d97706] hover:bg-amber-400"
            >
              Start the journey →
            </Link>
            <Link
              id="btn-hero-join"
              to="/join"
              className="btn-pop bg-white/95 text-emerald-800 text-[15px] px-6 py-3.5 hover:bg-white"
            >
              Join the community
            </Link>
          </div>
          <p className="text-emerald-50/80 text-sm font-semibold mt-6 leading-relaxed">
            <span className="font-display text-amber-300 text-lg">اهدِنَا الصِّرَاطَ المُستَقِيمَ</span>
            <span className="block mt-0.5">“Guide us to the Straight Path.” — Qur’an 1:5</span>
          </p>
        </div>
      </section>


      {/* LATEST POSTS */}
      <section>
        <SectionHead title="Latest Posts" to="/feed" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] mt-[18px]">
          {latestPosts.length === 0 ? (
            <div className="md:col-span-3 text-center py-12 bg-emerald-50/60 rounded-3xl border border-dashed border-emerald-200 text-sm font-semibold text-emerald-700/60">
              No posts published yet.
            </div>
          ) : latestPosts.map((p) => (
            <Link
              key={p.id}
              to="/feed"
              className="card-lift bg-white rounded-3xl border border-emerald-50 overflow-hidden shadow-[0_8px_26px_-16px_rgba(5,150,105,0.4)]"
            >
              <div className="h-[130px] bg-emerald-100 overflow-hidden">
                <img src={p.images[0]} alt={p.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <div className="p-[18px]">
                <span className="text-[11px] font-extrabold text-amber-500 uppercase tracking-wide">{p.category}</span>
                <h3 className="text-[18px] font-bold text-emerald-900 mt-1 leading-tight line-clamp-2">{p.title}</h3>
                <p className="text-[13px] font-semibold text-emerald-700/60 mt-1.5 leading-snug line-clamp-2">{p.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section>
        <SectionHead title="Featured Courses" to="/courses" cta="See all courses" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px] mt-[18px]">
          {courses.map((c) => {
            const all = c.modules.flatMap(m => m.sessions);
            const total = all.length;
            const done = all.filter(s => progress.completedSessionIds.includes(s.id)).length;
            const pct = total ? Math.round((done / total) * 100) : 0;
            return (
              <button
                key={c.id}
                id={`btn-dash-course-${c.id}`}
                onClick={() => openCourse(c.id)}
                className="card-lift text-left bg-white rounded-[22px] overflow-hidden border border-emerald-50 shadow-[0_8px_26px_-18px_rgba(5,150,105,0.5)] flex flex-col cursor-pointer"
              >
                <div className="h-20 flex items-center justify-between px-4" style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}cc)` }}>
                  <span className="text-[40px] leading-none">{c.emoji}</span>
                  <span className="bg-white/25 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full">{total} lessons</span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-[16px] font-extrabold text-emerald-900 leading-tight">{c.title}</h3>
                  <p className="text-[12px] font-semibold text-emerald-700/60 mt-1 leading-snug line-clamp-2 flex-1">{c.subtitle}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-2 bg-emerald-50 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c.accent }} />
                    </div>
                    <span className="text-[11px] font-extrabold" style={{ color: c.accent }}>{pct}%</span>
                  </div>
                  <span className="inline-flex items-center gap-1 mt-3 self-start text-white font-extrabold text-[13px] px-3.5 py-2 rounded-xl" style={{ background: c.accent }}>
                    {done > 0 ? 'Continue' : 'Start'} →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* LATEST POSTERS & EVENTS */}
      <section>
        <SectionHead title="Latest Posters & Events" to="/feed" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[18px] mt-[18px]">
          {events.length === 0 ? (
            <div className="col-span-2 md:col-span-4 text-center py-12 bg-emerald-50/60 rounded-3xl border border-dashed border-emerald-200 text-sm font-semibold text-emerald-700/60">
              No events scheduled — check back soon!
            </div>
          ) : events.map((e, i) => (
            <Link
              key={e.id}
              to="/feed"
              className="card-lift relative rounded-[22px] overflow-hidden aspect-4/5 flex flex-col justify-end p-4 shadow-[0_10px_28px_-14px_rgba(5,150,105,0.45)]"
              style={{ background: POSTER_BGS[i % POSTER_BGS.length] }}
            >
              {e.images[0] && (
                <img src={e.images[0]} alt={e.title} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-55" />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent" />
              <span className="absolute top-3.5 right-3.5 bg-white/90 text-emerald-800 font-extrabold text-[11px] px-2.5 py-1 rounded-full">
                {e.date.slice(5)}
              </span>
              <h3 className="relative text-white text-[17px] font-bold leading-tight">{e.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* WHO'S BEHIND APUMA */}
      <section className="bg-linear-to-br from-emerald-50 to-cream border border-emerald-100 rounded-[32px] px-8 sm:px-10 py-9">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl sm:text-[26px] font-extrabold text-emerald-800">Who’s Behind APUMA? 🌱</h2>
          <Link to="/team" className="text-sm font-extrabold text-emerald-600 hover:text-emerald-700 transition">See all members →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {leaders.map((L, i) => (
            <div key={L.id} className="bg-white rounded-[26px] p-6 text-center border border-emerald-50 shadow-[0_8px_26px_-18px_rgba(5,150,105,0.5)]">
              {isEmoji(L.avatar) ? (
                <div
                  className="w-[84px] h-[84px] mx-auto rounded-full flex items-center justify-center text-[38px] shadow-md"
                  style={{ background: LEADER_BGS[i % LEADER_BGS.length] }}
                >
                  {L.avatar}
                </div>
              ) : (
                <div className="w-[84px] h-[84px] mx-auto rounded-full overflow-hidden shadow-md bg-emerald-100">
                  <img src={L.avatar} alt={L.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="mt-3.5 inline-block bg-amber-100 text-amber-700 font-extrabold text-[11px] px-3 py-1 rounded-full tracking-wide">
                {L.roleName}
              </div>
              <h3 className="text-[19px] font-bold text-emerald-900 mt-2">{L.name}</h3>
              <p className="text-[13px] font-semibold text-emerald-700/60 mt-1.5 leading-snug">{L.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
