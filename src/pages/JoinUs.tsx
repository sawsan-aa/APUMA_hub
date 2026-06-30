import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, UserPlus, Lock, HelpCircle } from 'lucide-react';

export const JoinUs: React.FC = () => {
  const { systemConfig, currentUser, toggleRecruitment } = useApp();
  const role = currentUser?.role || 'guest';
  const isExec = role === 'executive' || role === 'admin';
  const closed = !systemConfig.recruitmentOpen;

  return (
    <div className="py-12 text-center animate-pop">
      <span className="inline-block bg-amber-100 text-amber-700 font-extrabold text-xs px-3.5 py-1.5 rounded-full">JOIN APUMA</span>
      <h1 className="text-4xl font-extrabold text-emerald-800 mt-4">Be part of the family 🤝</h1>
      <p className="text-base font-semibold text-emerald-700/70 mt-2.5 max-w-md mx-auto">
        Two easy ways in — drop into our community, or apply to become an official APUMA member.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-9 text-left">
        {/* Join community */}
        <div className="bg-white rounded-[30px] border-2 border-emerald-100 p-8 shadow-[0_14px_36px_-22px_rgba(5,150,105,0.5)] flex flex-col">
          <div className="w-[60px] h-[60px] rounded-[20px] bg-green-100 flex items-center justify-center">
            <MessageCircle size={30} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-emerald-900 mt-4">Join Community</h2>
          <p className="text-sm font-semibold text-emerald-700/60 mt-2 leading-relaxed grow">
            Get reminders, event news, and weekly Seerah drops in our WhatsApp Channel. No commitment — just good vibes.
          </p>
          <a
            id="lnk-join-whatsapp"
            href={systemConfig.whatsappGroupUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-pop block text-center mt-5 bg-green-600 text-white py-3.5 shadow-[0_6px_0_0_#15803d] hover:bg-green-500"
          >
            Open WhatsApp Channel →
          </a>
        </div>

        {/* Be a member */}
        <div className="relative bg-white rounded-[30px] border-2 border-amber-200 p-8 shadow-[0_14px_36px_-22px_rgba(245,158,11,0.55)] flex flex-col">
          {closed && (
            <div className="absolute inset-0 bg-cream/85 backdrop-blur-[2px] rounded-[30px] flex flex-col items-center justify-center gap-2 z-2">
              <Lock size={32} className="text-amber-700" />
              <div className="font-extrabold text-amber-700">Recruitment is currently closed</div>
            </div>
          )}
          <div className="w-[60px] h-[60px] rounded-[20px] bg-amber-100 flex items-center justify-center">
            <UserPlus size={30} className="text-amber-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-emerald-900 mt-4">Be a Member</h2>
          <p className="text-sm font-semibold text-emerald-700/60 mt-2 leading-relaxed grow">
            Help run events, design posters, and shape the community. Fill the recruitment form and we’ll be in touch.
          </p>
          <a
            id="lnk-join-recruitment"
            href={closed ? undefined : systemConfig.recruitmentFormUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-pop block text-center mt-5 bg-amber-500 text-white py-3.5 shadow-[0_6px_0_0_#d97706] hover:bg-amber-400"
          >
            Open recruitment form →
          </a>
        </div>
      </div>

      {/* exec control */}
      {isExec && (
        <button
          id="btn-toggle-recruitment"
          onClick={() => toggleRecruitment(closed)}
          className="mt-8 bg-emerald-50 text-emerald-600 font-bold text-[13px] px-[18px] py-2.5 rounded-[13px] border border-dashed border-emerald-300 hover:bg-emerald-100 transition cursor-pointer"
        >
          ⚙ Executive control: {closed ? 'Recruitment LOCKED (click to open)' : 'Recruitment OPEN (click to lock)'}
        </button>
      )}

      {/* FAQ */}
      <section className="mt-12 max-w-3xl mx-auto text-left bg-white rounded-[28px] border border-emerald-50 p-8 shadow-[0_12px_32px_-24px_rgba(5,150,105,0.5)]">
        <h3 className="text-lg font-extrabold text-emerald-800 flex items-center gap-2">
          <HelpCircle size={20} className="text-emerald-600" /> Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <h4 className="font-extrabold text-emerald-900 text-sm">Do I need to be Muslim to join?</h4>
            <p className="text-[13px] font-semibold text-emerald-700/60 mt-1.5 leading-relaxed">Not at all! APUMA welcomes students of every background to our public events and the Seerah course.</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <h4 className="font-extrabold text-emerald-900 text-sm">Are the certificates official?</h4>
            <p className="text-[13px] font-semibold text-emerald-700/60 mt-1.5 leading-relaxed">Yes — active members and executives receive certificates signed by APU administration and faculty advisors.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
