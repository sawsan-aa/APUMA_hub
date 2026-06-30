import React, { useEffect, useRef, useState } from 'react';
import { SessionMedia } from '../types';
import { Volume2, Mic, Square, RotateCcw, AlertCircle } from 'lucide-react';

/** Speak Arabic (or any) text using the browser's built-in speech synthesis. */
const speak = (text: string, lang = 'ar-SA') => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.8;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

const ttsSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

const ItemRow: React.FC<{ ar: string; translit?: string; meaning?: string; lang: string; accent: string }> = ({ ar, translit, meaning, lang, accent }) => (
  <div className="flex items-center justify-between gap-3 bg-white border border-emerald-100 rounded-2xl px-4 py-3">
    <div className="min-w-0">
      <div className="font-display text-2xl text-emerald-900 leading-tight" dir="rtl">{ar}</div>
      {(translit || meaning) && (
        <div className="text-[12.5px] font-semibold text-emerald-700/60 mt-0.5">
          {translit}{translit && meaning ? ' — ' : ''}{meaning}
        </div>
      )}
    </div>
    <button
      onClick={() => speak(ar, lang)}
      disabled={!ttsSupported()}
      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-40 cursor-pointer transition active:scale-95"
      style={{ background: accent }}
      aria-label={`Listen to ${translit || ar}`}
    >
      <Volume2 size={18} />
    </button>
  </div>
);

/** Listening step — learner hears native pronunciation of each item. */
export const ListenStep: React.FC<{ media: SessionMedia; accent: string }> = ({ media, accent }) => {
  const lang = media.lang || 'ar-SA';
  return (
    <div className="animate-pop mt-4">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: accent }}>
          <Volume2 size={18} />
        </div>
        <span className="text-[13px] font-extrabold uppercase tracking-wide" style={{ color: accent }}>Listen &amp; repeat</span>
      </div>
      <p className="text-[16px] font-semibold text-emerald-800/80 mt-3 leading-relaxed">
        {media.intro || 'Tap the speaker to hear each one, then say it out loud.'}
      </p>
      <div className="flex flex-col gap-2.5 mt-4">
        {media.items.map((it, i) => (
          <ItemRow key={i} ar={it.ar} translit={it.translit} meaning={it.meaning} lang={lang} accent={accent} />
        ))}
      </div>
      {media.items.length > 1 && (
        <button
          onClick={() => speak(media.items.map(i => i.ar).join('، '), lang)}
          disabled={!ttsSupported()}
          className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:opacity-40 cursor-pointer"
        >
          <Volume2 size={16} /> Play all
        </button>
      )}
      {!ttsSupported() && (
        <p className="mt-3 text-[12.5px] font-semibold text-amber-700 flex items-center gap-1.5">
          <AlertCircle size={14} /> Your browser doesn’t support audio playback for this step.
        </p>
      )}
    </div>
  );
};

/** Recording step — learner records their pronunciation and plays it back. */
export const RecordStep: React.FC<{ media: SessionMedia; accent: string }> = ({ media, accent }) => {
  const lang = media.lang || 'ar-SA';
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [err, setErr] = useState('');
  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const recSupported =
    typeof window !== 'undefined' &&
    typeof (window as any).MediaRecorder !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia;

  // Clean up any object URL we created.
  useEffect(() => () => { if (audioUrl) URL.revokeObjectURL(audioUrl); }, [audioUrl]);

  const start = async () => {
    setErr('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunks.current = [];
      mr.ondataavailable = (e) => { if (e.data.size) chunks.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunks.current, { type: mr.mimeType || 'audio/webm' });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
      };
      mr.start();
      recRef.current = mr;
      setRecording(true);
    } catch {
      setErr('Microphone unavailable or permission denied.');
    }
  };

  const stop = () => { recRef.current?.stop(); setRecording(false); };

  return (
    <div className="animate-pop mt-4">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: accent }}>
          <Mic size={18} />
        </div>
        <span className="text-[13px] font-extrabold uppercase tracking-wide" style={{ color: accent }}>Your turn — record it</span>
      </div>
      <p className="text-[16px] font-semibold text-emerald-800/80 mt-3 leading-relaxed">
        {media.intro || 'Hear it, then record yourself and compare.'}
      </p>

      <div className="flex flex-col gap-2.5 mt-4">
        {media.items.map((it, i) => (
          <ItemRow key={i} ar={it.ar} translit={it.translit} meaning={it.meaning} lang={lang} accent={accent} />
        ))}
      </div>

      {recSupported ? (
        <div className="mt-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
          {!recording ? (
            <button
              onClick={start}
              className="btn-pop inline-flex items-center gap-2 text-white px-5 py-2.5 text-sm"
              style={{ background: accent, boxShadow: '0 4px 0 0 rgba(0,0,0,0.18)' }}
            >
              <Mic size={16} /> {audioUrl ? 'Record again' : 'Start recording'}
            </button>
          ) : (
            <button
              onClick={stop}
              className="btn-pop inline-flex items-center gap-2 bg-rose-600 text-white px-5 py-2.5 text-sm shadow-[0_4px_0_0_#9f1239]"
            >
              <Square size={15} fill="currentColor" /> Stop
            </button>
          )}

          {recording && (
            <span className="ml-3 inline-flex items-center gap-1.5 text-[13px] font-extrabold text-rose-600">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" /> Recording…
            </span>
          )}

          {audioUrl && !recording && (
            <div className="mt-3 flex items-center gap-3">
              <audio src={audioUrl} controls className="h-9 max-w-full" />
              <button onClick={() => { if (audioUrl) URL.revokeObjectURL(audioUrl); setAudioUrl(null); }} className="text-emerald-500 hover:text-emerald-700 cursor-pointer" aria-label="Clear recording">
                <RotateCcw size={16} />
              </button>
            </div>
          )}
          <p className="text-[12px] font-semibold text-emerald-700/50 mt-2">Compare your recording with the speaker above. Recordings stay on your device.</p>
        </div>
      ) : (
        <p className="mt-3 text-[12.5px] font-semibold text-amber-700 flex items-center gap-1.5">
          <AlertCircle size={14} /> Recording isn’t supported in this browser.
        </p>
      )}
      {err && <p className="mt-2 text-[12.5px] font-bold text-rose-600">{err}</p>}
    </div>
  );
};
