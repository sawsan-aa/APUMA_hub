import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { accountBadge, isStaff } from '../lib/account';
import { InstallButton } from './InstallButton';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, LogOut, Star } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, logout, progress } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const role = currentUser?.role || 'guest';
  const loggedIn = role !== 'guest';
  const badge = accountBadge(role);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'Broadcast', path: '/broadcast' },
    { label: 'Posts', path: '/feed' },
    { label: 'Members', path: '/team' },
    { label: 'Join Us', path: '/join' },
  ];
  if (isStaff(role)) navLinks.push({ label: 'Workspace', path: '/workspace' });

  // /academy is part of the Courses section
  const isActive = (path: string) =>
    path === '/courses'
      ? location.pathname === '/courses' || location.pathname === '/academy'
      : location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  // Close the side menu on navigation
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Lock body scroll while the side menu is open + close on Escape
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-[68px]">

          {/* Brand */}
          <Link id="lnk-nav-home" to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-[42px] h-[42px] rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-600/40 group-hover:scale-105 transition-transform">
              <img src={`${import.meta.env.BASE_URL}icons/logo-mark.png`} alt="APUMA" className="w-7 h-7 object-contain" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-[19px] text-emerald-800">APUMA</div>
              <div className="hidden sm:block text-[11px] font-bold text-emerald-500">Islamic reminders &amp; insights ✦</div>
            </div>
          </Link>

          {/* Controls (all sizes) — page links live in the side menu to keep this tidy */}
          <div className="flex items-center gap-2 sm:gap-2.5 ml-auto shrink-0">
            {/* XP (hidden on phones to keep room for the account/login) */}
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl">
              <Star size={13} className="text-amber-500 fill-amber-400" />
              <span className="text-xs font-extrabold text-amber-700">{progress.totalXp} XP</span>
            </div>

            {/* Account / Log in (kept in the navbar) */}
            {loggedIn ? (
              <div className="flex items-center gap-2 bg-white border border-emerald-100 p-1.5 sm:pl-3.5 rounded-2xl shadow-sm shadow-emerald-600/10">
                <div className="hidden sm:block text-right leading-tight">
                  <div className="text-[13px] font-extrabold text-emerald-900">{currentUser?.name}</div>
                  <div className={`text-[10px] font-extrabold uppercase tracking-wide ${badge.badgeText}`}>{badge.label}</div>
                </div>
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg ${badge.badgeBg}`}>
                  {currentUser?.avatar || badge.emoji}
                </div>
                <button
                  id="btn-logout"
                  onClick={handleLogout}
                  title="Log out"
                  className="hidden sm:flex w-8 h-8 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 items-center justify-center transition cursor-pointer"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                id="btn-nav-login"
                to="/login"
                className="btn-pop bg-emerald-600 text-white text-sm px-4 sm:px-5 py-2.5 shadow-[0_5px_0_0_#047857] hover:bg-emerald-500"
              >
                Log in
              </Link>
            )}

            <ThemeToggle className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center cursor-pointer" />
            <button
              id="btn-mobile-menu"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center cursor-pointer"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile side menu — portaled to <body> so the sticky header's
          backdrop-blur can't clip it or stack it under page content */}
      {createPortal(
        <div className={`fixed inset-0 z-60 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
        {/* backdrop */}
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-emerald-950/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* sliding panel */}
        <aside
          className={`absolute top-0 right-0 h-full w-[82%] max-w-xs bg-cream shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* panel header */}
          <div className="flex items-center justify-between px-5 h-[68px] border-b border-emerald-100 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-500 flex items-center justify-center">
                <img src={`${import.meta.env.BASE_URL}icons/logo-mark.png`} alt="APUMA" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-display font-extrabold text-[17px] text-emerald-800">APUMA</span>
            </div>
            <button
              id="btn-close-menu"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* panel content */}
          <div className="flex-1 overflow-y-auto apuma-scroll px-5 py-4 space-y-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  id={`lnk-mob-${link.path.replace('/', '') || 'home'}`}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-extrabold transition ${
                    isActive(link.path) ? 'bg-emerald-100 text-emerald-800' : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {loggedIn ? (
              <div className="flex items-center justify-between gap-3 bg-white border border-emerald-100 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg ${badge.badgeBg}`}>
                    {currentUser?.avatar || badge.emoji}
                  </div>
                  <div className="leading-tight">
                    <div className="text-[13px] font-extrabold text-emerald-900">{currentUser?.name}</div>
                    <div className={`text-[10px] font-extrabold uppercase ${badge.badgeText}`}>{badge.label}</div>
                  </div>
                </div>
                <button
                  id="btn-mob-logout"
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg bg-gray-100 text-gray-500 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut size={14} /> Log out
                </button>
              </div>
            ) : (
              <Link
                id="btn-mob-login"
                to="/login"
                onClick={() => setIsOpen(false)}
                className="btn-pop block text-center bg-emerald-600 text-white text-sm px-5 py-3 shadow-[0_5px_0_0_#047857]"
              >
                Log in
              </Link>
            )}

            <InstallButton block className="btn-pop inline-flex items-center justify-center gap-1.5 bg-amber-500 text-white text-sm px-5 py-3 shadow-[0_5px_0_0_#d97706]" />
          </div>
        </aside>
        </div>,
        document.body,
      )}
    </header>
  );
};
