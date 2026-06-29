import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Menu, 
  X, 
  Award, 
  Layers, 
  Users, 
  HelpCircle, 
  Compass, 
  Newspaper, 
  ChevronDown, 
  ShieldAlert, 
  Sparkles,
  Heart
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, loginAs, progress } = useApp();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showSandboxDrop, setShowSandboxDrop] = useState(false);

  const activeRole = currentUser?.role || 'guest';

  // Helper to determine if path is active
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Public Hub', path: '/', icon: <Compass size={16} /> },
    { label: 'Seerah Academy', path: '/academy', icon: <Award size={16} /> },
    { label: 'Posts & Events', path: '/feed', icon: <Newspaper size={16} /> },
    { label: 'Who Behind Us', path: '/team', icon: <Users size={16} /> },
    { label: 'Join Us', path: '/join', icon: <HelpCircle size={16} /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* APUMA Brand Identity with cute child-friendly green crescent logo */}
          <Link id="lnk-nav-home" to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-emerald-500 group-hover:scale-105 transition-transform duration-300">
              <span className="text-amber-400 font-sans">🕌</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-emerald-900 font-sans tracking-tight">APUMA</span>
                <span className="bg-amber-400 text-emerald-950 text-[9px] font-extrabold font-sans px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  APU
                </span>
              </div>
              <p className="text-[10px] text-emerald-700 font-medium font-sans">Muslim Student Association</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                id={`lnk-nav-${link.path.replace('/', '') || 'home'}`}
                to={link.path}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-sans flex items-center gap-2 transition ${
                  isActive(link.path)
                    ? 'bg-emerald-50 text-emerald-800 font-extrabold'
                    : 'text-gray-600 hover:bg-emerald-50/50 hover:text-emerald-900'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {/* Protected internal workspace visible only to Team/Executives/Admin */}
            {(activeRole === 'team' || activeRole === 'executive' || activeRole === 'admin') && (
              <Link
                id="lnk-nav-workflow"
                to="/workflow"
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-sans flex items-center gap-2 border border-dashed transition ${
                  isActive('/workflow')
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-extrabold'
                    : 'border-emerald-200 text-emerald-800 bg-emerald-50/40 hover:bg-emerald-100'
                }`}
              >
                <Layers size={14} className="animate-pulse" />
                Work Desk
              </Link>
            )}
          </nav>

          {/* Right Area: XP Counter & Sandbox Role Switcher */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Live XP Counter for gamified course */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-2xl">
              <span className="text-amber-500 text-sm">✨</span>
              <span className="text-xs font-mono font-bold text-amber-950">
                {progress.totalXp} XP
              </span>
            </div>

            {/* Developer Sandbox Switcher Dropdown */}
            <div className="relative">
              <button
                id="btn-nav-role-switcher"
                onClick={() => setShowSandboxDrop(!showSandboxDrop)}
                className="px-4 py-2 bg-emerald-800 text-white rounded-2xl text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-2 cursor-pointer border border-emerald-600 shadow-sm"
              >
                <span>Role: </span>
                <span className="text-amber-300 capitalize">{activeRole}</span>
                <ChevronDown size={14} />
              </button>

              {showSandboxDrop && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-emerald-100 shadow-xl p-3 z-50">
                  <span className="text-[10px] font-bold font-mono text-emerald-900 uppercase tracking-widest block mb-2 px-2">
                    🔄 SANDBOX SIMULATOR
                  </span>
                  
                  <div className="space-y-1">
                    <button
                      id="btn-sim-guest"
                      onClick={() => { loginAs('guest'); setShowSandboxDrop(false); }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center justify-between cursor-pointer ${
                        activeRole === 'guest' ? 'bg-emerald-50 text-emerald-800 font-extrabold' : 'text-gray-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>Public Guest</span>
                    </button>
                    <button
                      id="btn-sim-member"
                      onClick={() => { loginAs('member'); setShowSandboxDrop(false); }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center justify-between cursor-pointer ${
                        activeRole === 'member' ? 'bg-emerald-50 text-emerald-800 font-extrabold' : 'text-gray-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>Student Member</span>
                    </button>
                    <button
                      id="btn-sim-team"
                      onClick={() => { loginAs('team'); setShowSandboxDrop(false); }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center justify-between cursor-pointer ${
                        activeRole === 'team' ? 'bg-emerald-50 text-emerald-800 font-extrabold' : 'text-gray-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>APUMA Team (Designer)</span>
                    </button>
                    <button
                      id="btn-sim-exec"
                      onClick={() => { loginAs('executive'); setShowSandboxDrop(false); }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center justify-between cursor-pointer ${
                        activeRole === 'executive' ? 'bg-emerald-50 text-emerald-800 font-extrabold' : 'text-gray-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>Executive (President)</span>
                    </button>
                    <button
                      id="btn-sim-admin"
                      onClick={() => { loginAs('admin'); setShowSandboxDrop(false); }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center justify-between cursor-pointer ${
                        activeRole === 'admin' ? 'bg-emerald-50 text-emerald-800 font-extrabold' : 'text-gray-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>Super Admin ⚡</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-xl">
              <span className="text-[10px] font-bold text-amber-800">{progress.totalXp} XP</span>
            </div>

            <button
              id="btn-mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100 hover:bg-emerald-100 transition cursor-pointer"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-5 space-y-3.5 shadow-inner">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                id={`lnk-mob-${link.path.replace('/', '') || 'home'}`}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 ${
                  isActive(link.path)
                    ? 'bg-emerald-50 text-emerald-800 font-extrabold'
                    : 'text-gray-600 hover:bg-emerald-50/50'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {(activeRole === 'team' || activeRole === 'executive' || activeRole === 'admin') && (
              <Link
                id="lnk-mob-workflow"
                to="/workflow"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 border border-dashed border-emerald-200 text-emerald-800 bg-emerald-50/20`}
              >
                <Layers size={15} />
                Work Desk (Team)
              </Link>
            )}
          </nav>

          {/* Mobile Role Switching sandbox */}
          <div className="border-t border-slate-100 pt-4">
            <span className="text-[10px] font-bold font-mono text-emerald-900 uppercase tracking-widest block mb-2 px-1">
              🔄 QUICK ROLE SWITCH
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="btn-mob-sim-guest"
                onClick={() => { loginAs('guest'); setIsOpen(false); }}
                className={`py-2 px-3 text-[11px] font-semibold rounded-xl border cursor-pointer ${
                  activeRole === 'guest' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-50 border-gray-200 text-gray-700'
                }`}
              >
                Guest
              </button>
              <button
                id="btn-mob-sim-member"
                onClick={() => { loginAs('member'); setIsOpen(false); }}
                className={`py-2 px-3 text-[11px] font-semibold rounded-xl border cursor-pointer ${
                  activeRole === 'member' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-50 border-gray-200 text-gray-700'
                }`}
              >
                Member
              </button>
              <button
                id="btn-mob-sim-team"
                onClick={() => { loginAs('team'); setIsOpen(false); }}
                className={`py-2 px-3 text-[11px] font-semibold rounded-xl border cursor-pointer ${
                  activeRole === 'team' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-50 border-gray-200 text-gray-700'
                }`}
              >
                APUMA Team
              </button>
              <button
                id="btn-mob-sim-exec"
                onClick={() => { loginAs('executive'); setIsOpen(false); }}
                className={`py-2 px-3 text-[11px] font-semibold rounded-xl border cursor-pointer ${
                  activeRole === 'executive' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-50 border-gray-200 text-gray-700'
                }`}
              >
                Executive
              </button>
              <button
                id="btn-mob-sim-admin"
                onClick={() => { loginAs('admin'); setIsOpen(false); }}
                className={`py-2 px-3 text-[11px] font-semibold rounded-xl border cursor-pointer ${
                  activeRole === 'admin' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-50 border-gray-200 text-gray-700'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
