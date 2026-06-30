import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MemberType, UserRole } from '../types';
import { memberTypeLabel } from '../lib/account';
import { Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';

const landingFor = (role: UserRole) =>
  role === 'dawah' || role === 'design' || role === 'executive' || role === 'admin' ? '/workspace' : '/courses';

const MEMBER_TYPES: MemberType[] = ['community', 'dawah', 'design', 'executive'];

const DEMO_ACCOUNTS: { type: MemberType; email: string; password: string }[] = [
  { type: 'community', email: 'community@apuma.org', password: 'member123' },
  { type: 'dawah', email: 'dawah@apuma.org', password: 'member123' },
  { type: 'design', email: 'design@apuma.org', password: 'member123' },
  { type: 'executive', email: 'exec@apuma.org', password: 'member123' },
];

const inputCls =
  'w-full pl-11 pr-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-sm font-semibold text-emerald-900 placeholder:text-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:bg-white transition';

export const Login: React.FC = () => {
  const { login, register } = useApp();
  const navigate = useNavigate();

  const [tab, setTab] = useState<'user' | 'member'>('user');
  const [userMode, setUserMode] = useState<'login' | 'register'>('login');
  const [memberType, setMemberType] = useState<MemberType>('dawah');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const reset = () => { setError(''); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let res;
    if (tab === 'user') {
      res = userMode === 'register' ? register(name, email, password) : login(email, password, 'user');
    } else {
      res = login(email, password, 'member', memberType);
    }
    if (!res.ok) { setError(res.error || 'Something went wrong.'); return; }
    navigate(landingFor(res.role || 'user'));
    window.scrollTo(0, 0);
  };

  const fillDemo = (d: { type: MemberType; email: string; password: string }) => {
    setMemberType(d.type);
    setEmail(d.email);
    setPassword(d.password);
    setError('');
  };

  return (
    <div className="py-12 animate-pop">
      <div className="text-center">
        <span className="inline-block bg-amber-100 text-amber-700 font-extrabold text-xs px-3.5 py-1.5 rounded-full">WELCOME TO APUMA</span>
        <h1 className="text-4xl font-extrabold text-emerald-800 mt-4">Sign in to continue 🔑</h1>
        <p className="text-base font-semibold text-emerald-700/70 mt-2.5 max-w-md mx-auto">
          Public members can register freely. Team &amp; executive accounts are provisioned by the Admin.
        </p>
      </div>

      <div className="max-w-md mx-auto mt-8">
        {/* Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-emerald-50 p-1.5 rounded-2xl">
          {(['user', 'member'] as const).map(t => (
            <button
              key={t}
              id={`tab-${t}`}
              onClick={() => { setTab(t); reset(); }}
              className={`py-2.5 rounded-xl text-sm font-extrabold transition cursor-pointer ${
                tab === t ? 'bg-white text-emerald-800 shadow-sm' : 'text-emerald-600 hover:text-emerald-800'
              }`}
            >
              {t === 'user' ? 'User' : 'Member'}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="bg-white rounded-[28px] border border-emerald-50 p-7 mt-4 shadow-[0_14px_36px_-22px_rgba(5,150,105,0.55)]">
          {/* User login/register toggle */}
          {tab === 'user' && (
            <div className="flex gap-4 mb-5 text-sm font-extrabold">
              <button type="button" onClick={() => { setUserMode('login'); reset(); }} className={`pb-1 border-b-2 transition cursor-pointer ${userMode === 'login' ? 'border-emerald-500 text-emerald-800' : 'border-transparent text-emerald-600/50'}`}>Log in</button>
              <button type="button" onClick={() => { setUserMode('register'); reset(); }} className={`pb-1 border-b-2 transition cursor-pointer ${userMode === 'register' ? 'border-emerald-500 text-emerald-800' : 'border-transparent text-emerald-600/50'}`}>Register</button>
            </div>
          )}

          {/* Member type selector */}
          {tab === 'member' && (
            <div className="mb-4">
              <label className="block text-xs font-extrabold text-emerald-700 uppercase tracking-wide mb-1.5">User type (set by Admin)</label>
              <select
                id="select-member-type"
                value={memberType}
                onChange={(e) => setMemberType(e.target.value as MemberType)}
                className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-sm font-bold text-emerald-900 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {MEMBER_TYPES.map(t => <option key={t} value={t}>{memberTypeLabel(t)}</option>)}
              </select>
            </div>
          )}

          <div className="space-y-3">
            {tab === 'user' && userMode === 'register' && (
              <div className="relative">
                <UserIcon size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                <input id="input-name" type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className={inputCls} />
              </div>
            )}
            <div className="relative">
              <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
              <input id="input-email" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
            </div>
            <div className="relative">
              <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
              <input id="input-password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={inputCls} />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 mt-4 bg-rose-50 border border-rose-100 text-rose-700 text-[13px] font-semibold px-3.5 py-2.5 rounded-xl">
              <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error}
            </div>
          )}

          <button
            id="btn-auth-submit"
            type="submit"
            className="btn-pop w-full mt-5 py-3.5 text-white text-[15px] bg-emerald-600 shadow-[0_5px_0_0_#047857] hover:bg-emerald-500"
          >
            {tab === 'user' ? (userMode === 'register' ? 'Create account' : 'Log in') : `Log in as ${memberTypeLabel(memberType)}`}
          </button>

          {tab === 'user' && (
            <p className="text-center text-[13px] font-semibold text-emerald-700/60 mt-4">
              {userMode === 'login' ? 'New here?' : 'Already registered?'}{' '}
              <button type="button" onClick={() => { setUserMode(userMode === 'login' ? 'register' : 'login'); reset(); }} className="font-extrabold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                {userMode === 'login' ? 'Create an account' : 'Log in instead'}
              </button>
            </p>
          )}
        </form>

        {/* Demo member credentials */}
        {tab === 'member' && (
          <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4 mt-4">
            <p className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wide mb-2">Demo accounts (click to fill)</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map(d => (
                <button
                  key={d.type}
                  type="button"
                  onClick={() => fillDemo(d)}
                  className="text-left bg-white border border-amber-100 rounded-xl px-3 py-2 hover:border-amber-300 transition cursor-pointer"
                >
                  <div className="text-[12px] font-extrabold text-emerald-900">{memberTypeLabel(d.type)}</div>
                  <div className="text-[10.5px] font-semibold text-emerald-700/50 truncate">{d.email}</div>
                </button>
              ))}
            </div>
            <p className="text-[10.5px] font-semibold text-amber-700/70 mt-2">Password for all: <span className="font-mono font-bold">member123</span> · Admin: <span className="font-mono font-bold">admin@apuma.org / admin123</span></p>
          </div>
        )}
      </div>
    </div>
  );
};
