import { UserRole, MemberType } from '../types';

export interface AccountBadge {
  label: string;
  emoji: string;
  badgeBg: string;   // tailwind classes for the chip background/border
  badgeText: string; // tailwind classes for the chip text colour
}

/** Visual identity for each role — keeps the navbar, login & workspaces consistent. */
export function accountBadge(role: UserRole): AccountBadge {
  switch (role) {
    case 'admin':
      return { label: 'Super Admin', emoji: '⚡', badgeBg: 'bg-amber-100 border-amber-200', badgeText: 'text-amber-700' };
    case 'executive':
      return { label: 'Executive', emoji: '👑', badgeBg: 'bg-amber-100 border-amber-200', badgeText: 'text-amber-700' };
    case 'design':
      return { label: 'Design Team', emoji: '🎨', badgeBg: 'bg-amber-100 border-amber-200', badgeText: 'text-amber-700' };
    case 'dawah':
      return { label: "Da'wah Team", emoji: '📖', badgeBg: 'bg-amber-100 border-amber-200', badgeText: 'text-amber-700' };
    case 'community':
      return { label: 'Community', emoji: '🌟', badgeBg: 'bg-emerald-100 border-emerald-200', badgeText: 'text-emerald-700' };
    case 'user':
      return { label: 'Member', emoji: '👤', badgeBg: 'bg-emerald-100 border-emerald-200', badgeText: 'text-emerald-700' };
    default:
      return { label: 'Guest', emoji: '👋', badgeBg: 'bg-gray-100 border-gray-200', badgeText: 'text-gray-500' };
  }
}

/** Label for an admin-assignable member type (used on the Member login). */
export function memberTypeLabel(t: MemberType): string {
  return t === 'community' ? 'Community Member'
    : t === 'dawah' ? "Da'wah Team Member"
    : t === 'design' ? 'Design Team Member'
    : 'Executive';
}

/** Has access to an internal workspace. */
export const isStaff = (role: UserRole) =>
  role === 'dawah' || role === 'design' || role === 'executive' || role === 'admin';

/** Can approve/publish and moderate content. */
export const isExecutive = (role: UserRole) => role === 'executive' || role === 'admin';

/** Can delete published posts. */
export const canModerate = (role: UserRole) => isStaff(role);
