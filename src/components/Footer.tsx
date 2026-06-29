import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Instagram, 
  Twitter, 
  MessageCircle, 
  Award, 
  ChevronRight, 
  Compass, 
  Users,
  MapPin,
  Mail,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { systemConfig } = useApp();

  return (
    <footer className="bg-emerald-950 text-white border-t border-emerald-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* APUMA brand statement with beautiful typography */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg border border-emerald-500">
                <span>🕌</span>
              </div>
              <span className="font-extrabold text-lg text-emerald-100 font-sans tracking-tight">
                APUMA ACADEMY
              </span>
            </div>
            
            <p className="text-emerald-200/70 text-xs leading-relaxed max-w-sm">
              The Muslim Association of Asia Pacific University (APUMA) is a student-led organization designed to foster brotherhood, sisterhood, spiritual enrichment, and dynamic academic growth on campus.
            </p>

            <div className="flex items-center gap-3 text-emerald-200/50 text-[11px] pt-2">
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>APU Campus, Kuala Lumpur</span>
              </div>
            </div>
          </div>

          {/* Quick links to all requested public pages */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold font-sans text-xs uppercase tracking-widest text-amber-400">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              <Link id="lnk-foot-home" to="/" className="text-emerald-200/80 hover:text-white text-xs transition flex items-center gap-1">
                <ChevronRight size={12} className="text-amber-500" />
                Public Hub
              </Link>
              <Link id="lnk-foot-course" to="/academy" className="text-emerald-200/80 hover:text-white text-xs transition flex items-center gap-1">
                <ChevronRight size={12} className="text-amber-500" />
                Seerah Academy
              </Link>
              <Link id="lnk-foot-feed" to="/feed" className="text-emerald-200/80 hover:text-white text-xs transition flex items-center gap-1">
                <ChevronRight size={12} className="text-amber-500" />
                Announcements & Posters
              </Link>
              <Link id="lnk-foot-team" to="/team" className="text-emerald-200/80 hover:text-white text-xs transition flex items-center gap-1">
                <ChevronRight size={12} className="text-amber-500" />
                Executive Leadership
              </Link>
              <Link id="lnk-foot-join" to="/join" className="text-emerald-200/80 hover:text-white text-xs transition flex items-center gap-1">
                <ChevronRight size={12} className="text-amber-500" />
                Recruitment & Form
              </Link>
            </nav>
          </div>

          {/* Connect handles & direct click CTAs */}
          <div className="md:col-span-4 space-y-5">
            <div>
              <h4 className="font-bold font-sans text-xs uppercase tracking-widest text-amber-400 mb-3">
                Connect With Us
              </h4>
              
              <div className="flex items-center gap-3">
                <a 
                  id="lnk-foot-instagram"
                  href="https://www.instagram.com/apu_ma/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-900 border border-emerald-800 text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  id="lnk-foot-twitter"
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-900 border border-emerald-800 text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
                >
                  <Twitter size={18} />
                </a>
                <a 
                  id="lnk-foot-email"
                  href="mailto:apuma@apu.edu.my" 
                  className="p-2.5 rounded-xl bg-emerald-900 border border-emerald-800 text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                id="lnk-foot-whatsapp-channel"
                href={systemConfig.whatsappGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageCircle size={14} />
                Join WhatsApp
              </a>

              <Link
                id="lnk-foot-academy-cta"
                to="/academy"
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Award size={14} />
                Join Seerah Course
              </Link>
            </div>
          </div>

        </div>

        {/* Legal and system info */}
        <div className="border-t border-emerald-900/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-200/40 font-mono">
          <p>© 2026 APUMA. Muslim Association of Asia Pacific University. All Rights Reserved.</p>
          <div className="flex items-center gap-1 mt-2 sm:mt-0 text-[10px]">
            <span>Developed with</span>
            <Heart size={10} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>for beneficial knowledge.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
