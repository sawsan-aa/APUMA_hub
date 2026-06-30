export type Theme = 'light' | 'dark';

const COOKIE = 'apuma_theme';

export function getCookie(name: string): string | null {
  const m = document.cookie.match('(?:^|; )' + name + '=([^;]*)');
  return m ? decodeURIComponent(m[1]) : null;
}

export function setCookie(name: string, value: string, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

/** Theme saved in the user's cookie (null if they've never chosen). */
export function getStoredTheme(): Theme | null {
  const v = getCookie(COOKIE);
  return v === 'dark' || v === 'light' ? v : null;
}

/** Apply a theme to <html> and remember it in a cookie for next time. */
export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  setCookie(COOKIE, theme);
}

export function currentTheme(): Theme {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
