import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const role = currentUser?.role || 'guest';

  if (!allowedRoles.includes(role)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 animate-pop">
        <div className="max-w-md w-full bg-white rounded-[28px] p-9 border border-amber-200 shadow-[0_14px_40px_-20px_rgba(245,158,11,0.4)] text-center">
          <div className="w-16 h-16 mx-auto rounded-[20px] bg-amber-100 flex items-center justify-center text-3xl">🔒</div>
          <h2 className="text-2xl font-extrabold text-emerald-800 mt-4">This area is team-only</h2>
          <p className="text-sm font-semibold text-emerald-700/60 mt-2 leading-relaxed">
            The content workflow is reserved for the APUMA Team and Executives. Log in with one of those
            accounts to continue — you’re currently a{' '}
            <span className="font-extrabold text-amber-700 capitalize">{role}</span>.
          </p>
          <div className="flex flex-col gap-2.5 mt-6">
            <button
              id="btn-switch-account"
              onClick={() => navigate('/login')}
              className="btn-pop bg-emerald-600 text-white py-3 shadow-[0_5px_0_0_#047857] hover:bg-emerald-500"
            >
              Switch account
            </button>
            <Link
              id="lnk-back-home"
              to="/"
              className="btn-pop bg-emerald-50 text-emerald-800 py-3 hover:bg-emerald-100"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
