import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const CourseCatalog: React.FC = () => {
  const { courses, progress, setActiveCourse } = useApp();
  const navigate = useNavigate();

  const open = (id: string) => {
    setActiveCourse(id);
    navigate('/academy');
    window.scrollTo(0, 0);
  };

  return (
    <div className="py-10 animate-pop">
      <div className="text-center">
        <span className="inline-block bg-amber-100 text-amber-700 font-extrabold text-xs px-3.5 py-1.5 rounded-full">
          LEARNING TRACKS
        </span>
        <h1 className="text-4xl font-extrabold text-emerald-800 mt-4">Pick a course to begin 🚀</h1>
        <p className="text-base font-semibold text-emerald-700/70 mt-2.5 max-w-lg mx-auto">
          Four playful tracks, each a gamified path of bite-sized lessons, videos, and quizzes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px] max-w-4xl mx-auto mt-9">
        {courses.map((c) => {
          const allSessions = c.modules.flatMap(m => m.sessions);
          const total = allSessions.length;
          const done = allSessions.filter(s => progress.completedSessionIds.includes(s.id)).length;
          const pct = total ? Math.round((done / total) * 100) : 0;

          return (
            <button
              key={c.id}
              id={`btn-course-${c.id}`}
              onClick={() => open(c.id)}
              className="card-lift text-left bg-white rounded-[28px] overflow-hidden border border-emerald-50 shadow-[0_14px_36px_-22px_rgba(5,150,105,0.55)] flex flex-col cursor-pointer"
            >
              <div
                className="h-[118px] flex items-center justify-between px-6"
                style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}cc)` }}
              >
                <span className="text-[54px] leading-none">{c.emoji}</span>
                <span className="bg-white/25 text-white font-extrabold text-xs px-3 py-1.5 rounded-full">
                  {total} lessons
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-[21px] font-extrabold text-emerald-900">{c.title}</h2>
                <p className="text-[13.5px] font-semibold text-emerald-700/60 mt-1.5 leading-snug min-h-[38px]">{c.subtitle}</p>
                <div className="flex items-center gap-2.5 mt-4">
                  <div className="flex-1 h-[9px] bg-emerald-50 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c.accent }} />
                  </div>
                  <span className="text-xs font-extrabold" style={{ color: c.accent }}>{pct}%</span>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 mt-4 text-white font-extrabold text-sm px-[18px] py-2.5 rounded-[13px]"
                  style={{ background: c.accent }}
                >
                  {done > 0 ? 'Continue' : 'Start'} →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
