/**
 * APUMA Application Types and Interfaces
 */

export type UserRole = 'guest' | 'member' | 'team' | 'executive' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
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

export interface CourseSession {
  id: string;
  title: string;
  duration: string; // e.g., "5 min"
  xp: number; // Experience points awarded
  videoUrl?: string; // YouTube or Vimeo embed ID
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
  brief: string; // Core concept/guidelines for the design
  panels: string[]; // Carousel slides text content
  status: DraftStatus;
  designImages?: string[]; // Uploaded image panels (Canva design assets)
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
export interface TeamMember {
  id: string;
  name: string;
  roleName: string; // e.g. "President", "VP"
  category: 'executive' | 'team';
  bio: string;
  avatar: string;
  instagram?: string;
  linkedin?: string;
  order: number;
}

// Global configurations (Executive managed)
export interface SystemConfig {
  recruitmentOpen: boolean; // Flag to lock/unlock Google Form application
  recruitmentFormUrl: string;
  whatsappGroupUrl: string;
}
