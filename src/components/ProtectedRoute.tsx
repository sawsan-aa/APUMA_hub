import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, LogIn, Compass, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser, loginAs } = useApp();
  const userRole = currentUser?.role || 'guest';

  const isAllowed = allowedRoles.includes(userRole);

  if (!isAllowed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-amber-50/30">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl shadow-emerald-950/5 text-center transition-all">
          <div className="inline-flex p-4 rounded-full bg-rose-50 border border-rose-100 text-rose-500 mb-6 animate-pulse">
            <ShieldAlert size={48} />
          </div>
          
          <h2 className="text-2xl font-bold font-sans text-gray-900 tracking-tight mb-3">
            Halt, Believer!
          </h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            This internal workflow area is strictly guarded. You are currently browsing as a{' '}
            <span className="font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 capitalize">
              {userRole}
            </span>
            . Only authorized <span className="font-semibold text-emerald-700">APUMA Team Members</span> and{' '}
            <span className="font-semibold text-emerald-700">Executives</span> can access this content pipeline.
          </p>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100/60 mb-6 text-left">
            <span className="text-xs font-semibold text-emerald-800 block mb-2 uppercase tracking-wider font-mono">
              🛡️ APUMA Dev Sandbox Switcher:
            </span>
            <p className="text-xs text-emerald-700/80 mb-3">
              Instantly assume an authorized role to test the full content strategy and approval workflow:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                id="btn-login-team-sandbox"
                onClick={() => loginAs('team')}
                className="py-2 px-1 text-[10px] font-bold rounded-xl bg-white text-emerald-800 border border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition shadow-sm flex items-center justify-center gap-1 cursor-pointer"
              >
                <LogIn size={11} />
                APUMA Team
              </button>
              <button
                id="btn-login-exec-sandbox"
                onClick={() => loginAs('executive')}
                className="py-2 px-1 text-[10px] font-bold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition shadow-sm flex items-center justify-center gap-1 cursor-pointer"
              >
                <ShieldAlert size={11} />
                Executive
              </button>
              <button
                id="btn-login-admin-sandbox"
                onClick={() => loginAs('admin')}
                className="py-2 px-1 text-[10px] font-bold rounded-xl bg-amber-400 text-emerald-950 hover:bg-amber-300 transition shadow-sm flex items-center justify-center gap-1 cursor-pointer"
              >
                <Sparkles size={11} />
                Super Admin
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              id="lnk-back-home"
              to="/"
              className="py-3 px-5 rounded-xl bg-emerald-100 text-emerald-800 font-semibold text-sm hover:bg-emerald-200 transition flex items-center justify-center gap-2"
            >
              <Compass size={18} />
              Return to Public Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
