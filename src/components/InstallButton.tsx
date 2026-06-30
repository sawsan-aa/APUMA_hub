import React, { useEffect, useState } from 'react';
import { Download, Share, Plus, X, Check } from 'lucide-react';

/**
 * "Install app" button.
 *  - Android / desktop Chrome & Edge: fires the native install prompt.
 *  - iOS Safari (no prompt API): shows Add-to-Home-Screen instructions.
 *  - Hidden once the app is already installed / running standalone.
 */
export const InstallButton: React.FC<{ className?: string; block?: boolean }> = ({ className, block }) => {
  const [deferred, setDeferred] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [help, setHelp] = useState(false);

  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(display-mode: standalone)').matches || (navigator as any).standalone === true);
  const isIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);

  useEffect(() => {
    const onPrompt = (e: Event) => { e.preventDefault(); setDeferred(e); };
    const onInstalled = () => { setInstalled(true); setDeferred(null); setHelp(false); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed || isStandalone) return null;

  const click = async () => {
    if (deferred) {
      deferred.prompt();
      try { await deferred.userChoice; } catch { /* ignore */ }
      setDeferred(null);
    } else {
      setHelp(h => !h);
    }
  };

  const base =
    'btn-pop inline-flex items-center justify-center gap-1.5 bg-amber-500 text-white text-sm px-3.5 py-2 shadow-[0_4px_0_0_#d97706] hover:bg-amber-400 cursor-pointer';

  return (
    <div className={block ? 'relative' : 'relative inline-block'}>
      <button id="btn-install-app" onClick={click} className={`${className || base} ${block ? 'w-full' : ''}`}>
        <Download size={16} /> Install app
      </button>

      {help && (
        <>
          <div className="fixed inset-0 z-90" onClick={() => setHelp(false)} />
          <div className="absolute right-0 mt-2 z-100 w-72 bg-white rounded-2xl border border-emerald-100 shadow-2xl p-4 text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-emerald-900">Add APUMA to your phone</h4>
              <button onClick={() => setHelp(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={16} /></button>
            </div>
            {isIOS ? (
              <ol className="mt-2.5 space-y-2 text-[13px] font-semibold text-emerald-800/80">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center text-[11px] font-extrabold shrink-0">1</span>
                  Tap the Share button <Share size={14} className="text-emerald-600" /> in Safari
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center text-[11px] font-extrabold shrink-0">2</span>
                  Choose “Add to Home Screen” <Plus size={14} className="text-emerald-600" />
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center text-[11px] font-extrabold shrink-0">3</span>
                  Tap “Add” <Check size={14} className="text-emerald-600" />
                </li>
              </ol>
            ) : (
              <p className="mt-2.5 text-[13px] font-semibold text-emerald-800/80 leading-relaxed">
                Open your browser menu <span className="font-extrabold">(⋮)</span> and choose
                <span className="font-extrabold"> “Install app”</span> or
                <span className="font-extrabold"> “Add to Home screen”.</span>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
