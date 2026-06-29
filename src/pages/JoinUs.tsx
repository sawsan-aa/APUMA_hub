import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageCircle, 
  UserPlus, 
  Lock, 
  HelpCircle, 
  ExternalLink, 
  Sparkles, 
  ChevronRight, 
  AlertCircle 
} from 'lucide-react';

export const JoinUs: React.FC = () => {
  const { systemConfig, currentUser } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      
      {/* Intro Header */}
      <div className="text-center space-y-3 pb-4">
        <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest font-mono block">
          APUMA Family Admissions
        </span>
        <h1 className="text-3xl font-extrabold font-sans text-gray-950 tracking-tight">
          Join the APUMA Community
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
          Whether you want to browse benefits as a general follower, or actively write content and lead as an official committee member, find your place today!
        </p>
      </div>

      {/* Two distinct options split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* OPTION 1: Join Community (WhatsApp newsletter channel) */}
        <div className="bg-white rounded-3xl border border-emerald-100/60 p-8 shadow-xl shadow-emerald-950/5 flex flex-col justify-between hover:border-emerald-200 transition duration-300">
          <div className="space-y-6">
            <div className="inline-flex p-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <MessageCircle size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-xl text-gray-900 font-sans">
                1. Join WhatsApp Community
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Connect with hundreds of fellow Muslim students at APU. Get instant alerts about weekly Halaqahs, brother/sister socials, Friday reminders, and free Eid lunches!
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <ChevronRight size={14} className="text-emerald-500" />
                <span>Weekly news and event reminders</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight size={14} className="text-emerald-500" />
                <span>Spiritual verses and daily Hadith cards</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight size={14} className="text-emerald-500" />
                <span>Direct support contact for campus concerns</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <a
              id="lnk-join-whatsapp-channel"
              href={systemConfig.whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-2xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle size={16} />
              Join WhatsApp Channel
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* OPTION 2: Be a Member (Recruitment Google Form application) */}
        <div className="bg-white rounded-3xl border border-emerald-100/60 p-8 shadow-xl shadow-emerald-950/5 flex flex-col justify-between hover:border-emerald-200 transition duration-300 relative overflow-hidden">
          
          {/* Subtle recruitment status ribbon */}
          <div className="absolute top-0 right-0">
            {systemConfig.recruitmentOpen ? (
              <span className="bg-emerald-100 text-emerald-800 font-mono font-bold text-[9px] px-3 py-1 uppercase rounded-bl-xl border-l border-b border-emerald-200">
                Intake Active
              </span>
            ) : (
              <span className="bg-rose-50 text-rose-700 font-mono font-bold text-[9px] px-3 py-1 uppercase rounded-bl-xl border-l border-b border-rose-100">
                Closed
              </span>
            )}
          </div>

          <div className="space-y-6">
            <div className="inline-flex p-4 rounded-full bg-amber-50 text-amber-500 border border-amber-100">
              <UserPlus size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-xl text-gray-900 font-sans">
                2. Be a Committee Member
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Step up and serve! Join the core APUMA working team. Gain professional experience in content writing, Canva graphics design, public speaking, and event orchestration.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <ChevronRight size={14} className="text-amber-500" />
                <span>Earn co-curricular points at APU</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight size={14} className="text-amber-500" />
                <span>Certificate of service signed by campus advisors</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight size={14} className="text-amber-500" />
                <span>Exclusive workspace access for publication pipelines</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            {systemConfig.recruitmentOpen ? (
              <a
                id="lnk-join-recruitment-form"
                href={systemConfig.recruitmentFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm rounded-2xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus size={16} />
                Apply for Recruitment
                <ExternalLink size={14} />
              </a>
            ) : (
              // Recruitment Closed State Card
              <div className="space-y-4">
                <div className="p-4 bg-rose-50 border border-rose-100/60 rounded-2xl text-rose-800 text-xs flex items-start gap-2.5">
                  <AlertCircle size={18} className="flex-shrink-0 text-rose-500 mt-0.5" />
                  <div>
                    <span className="font-bold block">Recruitment is currently CLOSED</span>
                    <p className="text-rose-700/80 mt-1 leading-relaxed">
                      APUMA recruitment cycles typically open in September and February. Sign up for our WhatsApp channel to be notified instantly when the next form goes live!
                    </p>
                  </div>
                </div>

                <button
                  id="btn-recruitment-disabled"
                  disabled
                  className="w-full py-4 bg-gray-100 border border-gray-200 text-gray-400 font-bold text-sm rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <Lock size={16} />
                  Applications Closed
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* FAQs about APUMA */}
      <section className="bg-white rounded-3xl border border-emerald-100/60 p-8 shadow-xl shadow-emerald-950/5 space-y-6">
        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
          <HelpCircle size={20} className="text-emerald-700" />
          Frequently Asked Questions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600 leading-relaxed">
          <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
            <h4 className="font-bold text-gray-900">Do I need to be a Muslim to join APUMA?</h4>
            <p>Absolutely not! APUMA welcomes all students, guests, and researchers of any religious background. Everyone is invited to participate in all our public gatherings and complete the Seerah learning course.</p>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
            <h4 className="font-bold text-gray-900">Are the certificates of service official?</h4>
            <p>Yes, all active APUMA team members and executives receive formal, physical certificates signed directly by Asia Pacific University administration and our appointed faculty advisors.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
