import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TeamMember, TeamGender, TeamUnit } from '../types';
import { Instagram, Linkedin, Mail } from 'lucide-react';

const isEmoji = (str: string) => !!str && str.length <= 4 && !str.includes('/') && !str.includes('.');

const AVATAR_BGS = [
  'linear-gradient(135deg,#A7F3D0,#34D399)',
  'linear-gradient(135deg,#FDE68A,#FBBF24)',
  'linear-gradient(135deg,#BAE6FD,#38BDF8)',
  'linear-gradient(135deg,#DDD6FE,#A78BFA)',
  'linear-gradient(135deg,#FBCFE8,#F472B6)',
];

const MemberCard: React.FC<{ m: TeamMember; i: number }> = ({ m, i }) => (
  <div className="bg-white rounded-[26px] p-6 text-center border border-emerald-50 shadow-[0_8px_26px_-18px_rgba(5,150,105,0.5)] card-lift">
    {isEmoji(m.avatar) ? (
      <div className="w-[84px] h-[84px] mx-auto rounded-full flex items-center justify-center text-[38px] shadow-md" style={{ background: AVATAR_BGS[i % AVATAR_BGS.length] }}>
        {m.avatar}
      </div>
    ) : (
      <div className="w-[84px] h-[84px] mx-auto rounded-full overflow-hidden shadow-md bg-emerald-100">
        <img src={m.avatar} alt={m.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
      </div>
    )}
    <div className="mt-3.5 inline-block bg-amber-100 text-amber-700 font-extrabold text-[11px] px-3 py-1 rounded-full tracking-wide">{m.roleName}</div>
    <h3 className="text-[18px] font-bold text-emerald-900 mt-2">{m.name}</h3>
    <p className="text-[13px] font-semibold text-emerald-700/60 mt-1.5 leading-snug">{m.bio}</p>
    <div className="flex items-center justify-center gap-1.5 mt-3 pt-3 border-t border-emerald-50">
      {m.instagram && (
        <a href={m.instagram} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition"><Instagram size={15} /></a>
      )}
      {m.linkedin && (
        <a href={m.linkedin} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition"><Linkedin size={15} /></a>
      )}
      <a href="mailto:apuma@apu.edu.my" className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition"><Mail size={15} /></a>
    </div>
  </div>
);

// One sub-team (e.g. Social Media) within a gender section.
const SubTeam: React.FC<{ title: string; emoji: string; members: TeamMember[]; offset: number }> = ({ title, emoji, members, offset }) => (
  <div>
    <h3 className="text-sm font-extrabold text-emerald-700/70 uppercase tracking-wide mb-3 flex items-center gap-1.5">
      <span>{emoji}</span> {title}
    </h3>
    {members.length === 0 ? (
      <div className="text-[13px] font-semibold text-emerald-700/45 bg-emerald-50/50 border border-dashed border-emerald-200 rounded-2xl py-6 text-center">
        Positions open — join us!
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {members.map((m, i) => <MemberCard key={m.id} m={m} i={offset + i} />)}
      </div>
    )}
  </div>
);

export const Members: React.FC = () => {
  const { members } = useApp();

  const executives = members.filter(m => m.category === 'executive');
  const team = (g: TeamGender, u: TeamUnit) => members.filter(m => m.category === 'team' && m.gender === g && m.unit === u);

  return (
    <div className="py-10 animate-pop">
      <div className="text-center">
        <span className="inline-block bg-amber-100 text-amber-700 font-extrabold text-xs px-3.5 py-1.5 rounded-full">MEET THE TEAM</span>
        <h1 className="text-4xl font-extrabold text-emerald-800 mt-4">Who’s Behind APUMA? 🌱</h1>
        <p className="text-base font-semibold text-emerald-700/70 mt-2.5 max-w-xl mx-auto">
          Islamic reminders and insights start with people. Meet the executives and the sisters’ and
          brothers’ teams who serve the Muslim community at Asia Pacific University.
        </p>
      </div>

      {/* Executive board */}
      <section className="mt-10">
        <h2 className="text-xl font-extrabold text-emerald-800 flex items-center gap-2 mb-5">👑 Executive Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {executives.map((m, i) => <MemberCard key={m.id} m={m} i={i} />)}
        </div>
      </section>

      {/* Sisters' teams */}
      <section className="mt-12 bg-linear-to-br from-pink-50/60 to-cream border border-pink-100 rounded-[28px] p-7">
        <h2 className="text-xl font-extrabold text-emerald-800 flex items-center gap-2 mb-5">🌸 Sisters’ Teams</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          <SubTeam title="Design" emoji="🎨" members={team('sister', 'design')} offset={0} />
          <SubTeam title="Da’wah" emoji="📖" members={team('sister', 'dawah')} offset={2} />
        </div>
      </section>

      {/* Brothers' teams */}
      <section className="mt-8 bg-linear-to-br from-emerald-50 to-cream border border-emerald-100 rounded-[28px] p-7">
        <h2 className="text-xl font-extrabold text-emerald-800 flex items-center gap-2 mb-5">🌿 Brothers’ Teams</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          <SubTeam title="Design" emoji="🎨" members={team('brother', 'design')} offset={0} />
          <SubTeam title="Da’wah" emoji="📖" members={team('brother', 'dawah')} offset={2} />
        </div>
      </section>

      {/* Recruitment callout */}
      <div className="mt-12 bg-linear-to-br from-emerald-50 to-cream border border-emerald-100 rounded-[28px] p-8 text-center max-w-2xl mx-auto">
        <div className="text-4xl">✨</div>
        <h3 className="text-xl font-extrabold text-emerald-800 mt-2">Want to join a team?</h3>
        <p className="text-sm font-semibold text-emerald-700/60 mt-2 max-w-md mx-auto leading-relaxed">
          The sisters’ and brothers’ Design and Da’wah teams are always looking for creatives,
          writers and helpers. Build experience and earn rewards!
        </p>
        <Link
          to="/join"
          className="btn-pop inline-block mt-5 bg-amber-500 text-white text-sm px-6 py-3 shadow-[0_5px_0_0_#d97706] hover:bg-amber-400"
        >
          Apply on the Join Us page →
        </Link>
      </div>
    </div>
  );
};
