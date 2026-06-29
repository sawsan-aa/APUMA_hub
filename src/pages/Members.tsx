import React from 'react';
import { useApp } from '../context/AppContext';
import { Instagram, Linkedin, Mail, Sparkles } from 'lucide-react';

const isEmoji = (str: string) => {
  if (!str) return false;
  return str.length <= 4 && !str.includes('/') && !str.includes('.');
};

export const Members: React.FC = () => {
  const { members } = useApp();

  // Categorize members
  const executives = members.filter(m => m.category === 'executive');
  const workingCommittee = members.filter(m => m.category === 'team');

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      
      {/* Intro Header */}
      <div className="text-center space-y-3 pb-4">
        <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest font-mono block">
          APUMA Team Directory
        </span>
        <h1 className="text-3xl font-extrabold font-sans text-gray-950 tracking-tight">
          Who's Behind APUMA?
        </h1>
        <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
          The brilliant minds, content writers, multimedia designers, and executive board members who coordinate to serve Muslim students at Asia Pacific University.
        </p>
      </div>

      {/* 1. Executive Board Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <span className="text-amber-500 text-sm">👑</span>
          <h2 className="text-xl font-bold text-gray-900 font-sans">Executive Leadership Board</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {executives.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-3xl border border-emerald-100/60 p-6 flex flex-col items-center text-center shadow-xl shadow-emerald-950/5 hover:border-emerald-200 hover:scale-[1.01] transition-all duration-300 relative overflow-hidden"
            >
              {/* Little visual accent on executive cards */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-emerald-600"></div>

              {isEmoji(member.avatar) ? (
                <div className="w-24 h-24 rounded-3xl bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-4xl shadow-md mb-4 select-none">
                  {member.avatar}
                </div>
              ) : (
                <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-emerald-500 shadow-md mb-4 bg-slate-100 flex-shrink-0">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-3 w-full">
                <div>
                  <h3 className="font-extrabold font-sans text-sm text-gray-900">{member.name}</h3>
                  <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 mt-1 uppercase tracking-wide">
                    {member.roleName}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed min-h-[72px]">
                  {member.bio}
                </p>

                {/* Social Channels */}
                <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-50">
                  {member.instagram && (
                    <a 
                      href={member.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition"
                    >
                      <Instagram size={14} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition"
                    >
                      <Linkedin size={14} />
                    </a>
                  )}
                  <a 
                    href="mailto:apuma@apu.edu.my" 
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition"
                  >
                    <Mail size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Committee Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <span className="text-emerald-600 text-sm">💡</span>
          <h2 className="text-xl font-bold text-gray-900 font-sans">APUMA Committee & Working Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workingCommittee.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-3xl border border-emerald-100/40 p-5 flex flex-col sm:flex-row gap-5 items-center shadow-lg shadow-emerald-950/2 hover:border-emerald-200 transition"
            >
              {isEmoji(member.avatar) ? (
                <div className="w-20 h-20 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-center text-3xl shadow-sm flex-shrink-0 select-none">
                  {member.avatar}
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-emerald-200 shadow-sm bg-slate-100 flex-shrink-0">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-2 flex-1 text-center sm:text-left">
                <div>
                  <h3 className="font-extrabold font-sans text-sm text-gray-900">{member.name}</h3>
                  <span className="inline-block text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full mt-1">
                    {member.roleName}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {member.bio}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                  <a 
                    href="mailto:apuma@apu.edu.my" 
                    className="p-1 rounded text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition text-[10px] font-mono flex items-center gap-1"
                  >
                    <Mail size={12} />
                    <span>Contact</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recruitment Callout */}
      <div className="bg-amber-400/10 border border-amber-400/20 rounded-3xl p-6 text-center max-w-xl mx-auto space-y-3">
        <Sparkles size={24} className="text-amber-500 mx-auto animate-bounce" />
        <h3 className="font-bold text-amber-950 text-base">Want to Join the APUMA Committee?</h3>
        <p className="text-xs text-amber-900 leading-normal max-w-md mx-auto">
          We are always looking for creative content writers, digital designers, and enthusiastic event coordinators. Build experience and earn rewards!
        </p>
        <div className="pt-2">
          <a
            id="lnk-members-recruit-cta"
            href="/join"
            className="inline-flex py-2 px-4 rounded-xl bg-amber-400 text-emerald-950 hover:bg-amber-300 font-bold text-xs transition"
          >
            Apply on "Join Us" Page
          </a>
        </div>
      </div>

    </div>
  );
};
