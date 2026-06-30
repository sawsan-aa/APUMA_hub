import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const { systemConfig } = useApp();

  return (
    <footer className="mt-16 bg-linear-to-br from-emerald-900 to-emerald-800 text-emerald-100">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[13px] bg-white/15 flex items-center justify-center">
                <img src={`${import.meta.env.BASE_URL}icons/logo-mark.png`} alt="APUMA" className="w-7 h-7 object-contain" />
              </div>
              <span className="font-display font-extrabold text-xl text-white">APUMA</span>
            </div>
            <p className="text-[13px] font-semibold mt-3.5 leading-relaxed max-w-[260px] text-emerald-200">
              APU Muslim Association — Islamic reminders &amp; insights, and a home for the Muslim student community at Asia Pacific University.
            </p>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-extrabold text-white mb-3">Explore</h4>
            <div className="flex flex-col gap-2 text-[13px] font-semibold">
              <Link to="/feed" className="text-emerald-200 hover:text-white transition">Latest Posts</Link>
              <Link to="/feed" className="text-emerald-200 hover:text-white transition">Events &amp; Posters</Link>
              <Link to="/courses" className="text-emerald-200 hover:text-white transition">Seerah Course</Link>
              <Link to="/broadcast" className="text-emerald-200 hover:text-white transition">Broadcast</Link>
              <Link to="/team" className="text-emerald-200 hover:text-white transition">Our Members</Link>
            </div>
          </div>

          {/* Community */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-extrabold text-white mb-3">Community</h4>
            <div className="flex flex-col gap-2 text-[13px] font-semibold">
              <Link to="/team" className="text-emerald-200 hover:text-white transition">About APUMA</Link>
              <Link to="/join" className="text-emerald-200 hover:text-white transition">Join Us</Link>
              <a href="https://asksunnah.com" target="_blank" rel="noreferrer" className="text-emerald-200 hover:text-white transition">Ask Sunnah</a>
              <a href="mailto:apuma@apu.edu.my" className="text-emerald-200 hover:text-white transition">Contact</a>
            </div>
          </div>

          {/* Stay connected */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="text-sm font-extrabold text-white mb-3">Stay connected</h4>
            <div className="flex gap-2.5 mb-4">
              <a
                href="https://www.instagram.com/apu_ma/"
                target="_blank"
                rel="noreferrer"
                className="w-[42px] h-[42px] rounded-[13px] bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="https://www.youtube.com/@apumuslimassociation"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-[42px] h-[42px] rounded-[13px] bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <Youtube size={20} className="text-white" />
              </a>
            </div>
            <a
              href={systemConfig.whatsappGroupUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-center w-full bg-green-600 hover:bg-green-500 text-white font-extrabold text-[13px] py-2.5 rounded-[13px] mb-2.5 transition"
            >
              Join Community
            </a>
            <Link
              to="/courses"
              className="block text-center w-full bg-amber-500 hover:bg-amber-400 text-white font-extrabold text-[13px] py-2.5 rounded-[13px] transition"
            >
              Join Course
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-[12.5px] font-semibold text-emerald-300">
            © 2026 APU Muslim Association. Made with 💚 for the ummah.
          </p>
          <p className="text-[12.5px] font-semibold text-emerald-300">
            <span className="font-display text-amber-300">اهدِنَا الصِّرَاطَ المُستَقِيمَ</span>
            <span className="text-emerald-200/70"> — “Guide us to the Straight Path.” (1:5)</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
