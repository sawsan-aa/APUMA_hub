/**
 * APUMA Application Types and Interfaces
 */

/**
 * Roles:
 *  - guest      : not logged in (browsing only)
 *  - user       : self-registered public account (login OR register)
 *  - community  : admin-provisioned community member
 *  - dawah      : Da'wah team member (writes post content)
 *  - design     : Design team member (produces graphics)
 *  - executive  : Executives (approve & publish)
 *  - admin       : super admin
 * Member accounts (community/dawah/design/executive) have their type set by the Admin.
 */
export type UserRole = 'guest' | 'user' | 'community' | 'dawah' | 'design' | 'executive' | 'admin';

// The four admin-assignable member types surfaced on the Member login.
export type MemberType = 'community' | 'dawah' | 'design' | 'executive';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

// Stored credential record (demo only — passwords are kept in localStorage in
// plaintext; a real deployment would authenticate against a backend).
export interface StoredAccount {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar?: string;
  kind: 'user' | 'member'; // which login channel the account belongs to
}

export interface AuthResult {
  ok: boolean;
  error?: string;
  role?: UserRole; // resolved role on success (drives post-login routing)
}

// Gamified Seerah Course Structure
export interface CourseQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CourseQuiz {
  id: string;
  title: string;
  questions: CourseQuestion[];
}

// A word/phrase used in listening or pronunciation-practice steps.
export interface PronunciationItem {
  ar: string;        // Arabic text to hear / repeat
  translit?: string; // transliteration (e.g. "Bismillah")
  meaning?: string;  // optional gloss
}

// Listening (hear it) or pronunciation (record yourself) media for a session.
export interface SessionMedia {
  lang?: string;     // BCP-47 speech language, defaults to 'ar-SA'
  intro?: string;    // short instruction shown above the items
  items: PronunciationItem[];
}

export interface CourseSession {
  id: string;
  title: string;
  duration: string; // e.g., "5 min"
  xp: number; // Experience points awarded
  videoUrl?: string;   // YouTube embed URL (https://www.youtube.com/embed/ID)
  videoTitle?: string; // optional label for the video step
  listen?: SessionMedia;   // listening step — hear native pronunciation
  practice?: SessionMedia; // recording step — practise your own pronunciation
  contentPanels: string[]; // Sequential, bite-sized slides (Duolingo style)
  order: number;
}

export interface CourseModule {
  id: string;
  title: string;
  arabicTitle?: string;
  description: string;
  order: number;
  sessions: CourseSession[];
  quiz: CourseQuiz;
  icon: string; // Lucide icon name
}

// A full learning track (Seerah, Arabic, Tajweed, Asbab al-Nuzul…)
export interface Course {
  id: string;
  title: string;
  emoji: string;
  accent: string; // brand hex accent used across roadmap + cards
  subtitle: string;
  modules: CourseModule[];
}

// Saved Progression State
export interface UserCourseProgress {
  userId: string;
  completedSessionIds: string[]; // List of session IDs completed
  completedModuleIds: string[]; // List of module IDs whose quiz has been passed
  quizScores: Record<string, number>; // moduleId -> highest score percentage
  totalXp: number;
}

// Internal Design-Post Workflow State
export type DraftStatus = 'draft' | 'designed' | 'approved';

export interface ContentDraft {
  id: string;
  title: string;
  brief: string; // Description / core message written by the Da'wah team
  panels: string[]; // Carousel slides text content
  status: DraftStatus;
  submitted?: boolean; // Da'wah "Upload" — makes the brief visible to the Design team
  designImages?: string[]; // Uploaded image panels (Canva design assets)
  canvaLink?: string; // Optional "view project" Canva link the designer pasted
  submittedBy: string;
  submittedAt: string;
  designedBy?: string;
  designedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
}

// Public Feeds (Posts / Events / Announcements)
export interface PublishedPost {
  id: string;
  title: string;
  content: string; // Text summary
  images: string[]; // Links to images
  category: 'post' | 'event' | 'announcement';
  author: string;
  date: string;
}

// Team Profile Info
export type TeamGender = 'sister' | 'brother';
export type TeamUnit = 'design' | 'dawah'; // Design team | Da'wah team

export interface TeamMember {
  id: string;
  name: string;
  roleName: string; // e.g. "President", "Social Media"
  category: 'executive' | 'team';
  gender?: TeamGender; // for non-executive team members
  unit?: TeamUnit;     // which sub-team they belong to
  bio: string;
  avatar: string;
  instagram?: string;
  linkedin?: string;
  order: number;
}

// Broadcast — a course / lecture streamed from a YouTube channel
export interface Broadcast {
  id: string;
  title: string;
  channel: string;        // channel / presenter name
  videoId: string;        // YouTube video id
  description?: string;
  category?: string;      // e.g. Seerah, Tajweed, Arabic, Tafsir, Lecture
  live?: boolean;         // currently broadcasting live
}

// Global configurations (Executive managed)
export interface SystemConfig {
  recruitmentOpen: boolean; // Flag to lock/unlock Google Form application
  recruitmentFormUrl: string;
  whatsappGroupUrl: string;
}
