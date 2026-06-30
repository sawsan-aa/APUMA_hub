// Certified Islamic reference sources surfaced in the Da'wah workspace.
export interface CertifiedSource {
  name: string;
  arabic: string;
  desc: string;
  url: string;
  emoji: string;
}

export const CERTIFIED_SOURCES: CertifiedSource[] = [
  { name: 'Sahih al-Bukhari', arabic: 'صحيح البخاري', desc: 'The most authentic collection of hadith — full text with references.', url: 'https://sunnah.com/bukhari', emoji: '📗' },
  { name: 'Sahih Muslim', arabic: 'صحيح مسلم', desc: 'The second most authentic hadith collection, fully searchable.', url: 'https://sunnah.com/muslim', emoji: '📘' },
  { name: 'The Qur’an (translated)', arabic: 'القرآن الكريم', desc: 'Read the Qur’an with verified English translation & tafsir.', url: 'https://quran.com/en', emoji: '📖' },
  { name: 'Sunnah.com library', arabic: 'مكتبة السنة', desc: 'Search across all major hadith collections in one place.', url: 'https://sunnah.com', emoji: '🔎' },
];

// Opens a fresh, Instagram-post-sized Canva project.
export const CANVA_NEW_INSTAGRAM_POST = 'https://www.canva.com/create/instagram-posts/';

// Demo image pool used to *simulate* pulling assets from a pasted Canva link.
// (A real integration needs the Canva Connect API + OAuth; a browser cannot read
// a Canva project's images from a share link due to auth + CORS.)
export const CANVA_DEMO_IMAGES = [
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1609599006353-e629f1d503f3?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600',
];

export const isCanvaLink = (url: string) => /canva\.com\//i.test(url.trim());
