/**
 * Curated "Broadcast" courses & lectures streamed from YouTube channels.
 * Executives can add/remove these from the Broadcast page; the list persists
 * to localStorage. Seeded with a starter set the committee can edit.
 */
import { Broadcast } from '../types';

export const SEED_BROADCASTS: Broadcast[] = [
  { id: 'b-seerah-hira', title: 'The First Revelation & the Cave of Hira', channel: 'Mufti Menk', videoId: 'WYrW4YCy0Sc', category: 'Seerah', description: 'The full story of Iqra and the beginning of revelation.' },
  { id: 'b-alaq', title: 'Surah Al-‘Alaq Explained', channel: 'Story of the Prophet', videoId: 'QQG5eahYEwU', category: 'Tafsir', description: 'The first verses revealed, explained chapter by chapter.' },
  { id: 'b-arabic-alphabet', title: 'Arabic Alphabet: Listen & Repeat', channel: 'Learn Arabic', videoId: 'fJ9_79bg5H4', category: 'Arabic', description: 'Hear and repeat all 28 letters of the Arabic alphabet.' },
  { id: 'b-arabic-pronounce', title: 'How to Pronounce the Arabic Letters', channel: 'Ismail Alqadi', videoId: 'XJzH4rzPsww', category: 'Arabic', description: 'Correct pronunciation, letter by letter.' },
  { id: 'b-tajweed-makharij', title: 'Makharij al-Huruf — Articulation Points', channel: 'Shaykh Ismail Al-Qadi', videoId: 'tiiE9LI3elo', category: 'Tajweed', description: 'Where each letter is articulated in the mouth and throat.' },
];

// Channels worth following (links open the channel on YouTube).
export interface BroadcastChannel { name: string; handle: string; url: string; tint: string; }
export const CHANNELS: BroadcastChannel[] = [
  { name: 'APU Muslim Association', handle: '@apumuslimassociation', url: 'https://www.youtube.com/@apumuslimassociation', tint: '#059669' },
  { name: 'Mufti Menk', handle: '@muftimenk', url: 'https://www.youtube.com/@muftimenk', tint: '#0D9488' },
  { name: 'Bayyinah', handle: '@bayyinah', url: 'https://www.youtube.com/@bayyinah', tint: '#2563EB' },
  { name: 'Yaqeen Institute', handle: '@yaqeeninstituteofficial', url: 'https://www.youtube.com/@yaqeeninstituteofficial', tint: '#9333EA' },
];

/** Extract a YouTube video id from a URL or raw id. */
export function youTubeId(input: string): string | null {
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const ytEmbed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}`;
