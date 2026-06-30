import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserCourseProgress,
  ContentDraft,
  PublishedPost,
  TeamMember,
  SystemConfig,
  Course,
  StoredAccount,
  AuthResult,
  MemberType,
  Broadcast
} from '../types';
import { SEERAH_MODULES } from '../data/seerahCourse';
import { EXTRA_COURSES } from '../data/extraCourses';
import { SEED_BROADCASTS } from '../data/broadcasts';

interface AppContextType {
  currentUser: UserProfile | null;
  // Email/password auth
  login: (email: string, password: string, channel: 'user' | 'member', memberType?: MemberType) => AuthResult;
  register: (name: string, email: string, password: string) => AuthResult;
  logout: () => void;
  courses: Course[];
  activeCourseId: string;
  setActiveCourse: (courseId: string) => void;
  activeCourse: Course;
  progress: UserCourseProgress;
  completeSession: (moduleId: string, sessionId: string, xpGained: number) => void;
  completeModuleQuiz: (moduleId: string, scorePercentage: number) => void;
  drafts: ContentDraft[];
  createDraft: (title: string, brief: string, panels: string[], submitted?: boolean) => void;
  updateDraft: (draftId: string, partial: Partial<ContentDraft>) => void;
  uploadDesignAssets: (draftId: string, imageUrls: string[], canvaLink?: string) => void;
  approveDraftToPublish: (draftId: string, category: 'post' | 'event' | 'announcement') => void;
  rejectOrDeleteDraft: (draftId: string) => void;
  posts: PublishedPost[];
  deletePost: (postId: string) => void;
  broadcasts: Broadcast[];
  addBroadcast: (b: Omit<Broadcast, 'id'>) => void;
  deleteBroadcast: (id: string) => void;
  members: TeamMember[];
  systemConfig: SystemConfig;
  toggleRecruitment: (isOpen: boolean) => void;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);


// Full set of learning tracks. Seerah keeps its original rich content & IDs
// (so saved progress stays valid); the other tracks live in data/extraCourses.
const COURSES: Course[] = [
  {
    id: 'seerah',
    title: "The Prophet's Seerah",
    emoji: '🕌',
    accent: '#059669',
    subtitle: 'Walk through the life of Prophet Muhammad ﷺ, from birth to legacy.',
    modules: SEERAH_MODULES,
  },
  ...EXTRA_COURSES,
];

// Mock Published Posts
const INITIAL_POSTS: PublishedPost[] = [
  {
    id: 'post-eid-greetings',
    title: 'APUMA Eid Al-Adha Celebration 2026',
    content: 'Allahu Akbar, Allahu Akbar! Join us for a delightful Eid social gathering filled with traditional sweets, games, and spiritual sisterhood/brotherhood in the APU Main Lobby. Bring your friends and let’s celebrate together!',
    images: ['https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800'],
    category: 'event',
    author: 'Executives Team',
    date: '2026-06-15'
  },
  {
    id: 'post-fridays-reminder',
    title: 'Weekly Sunnahs of Jummah',
    content: 'A gentle reminder to make the most of Friday: 1. Read Surah Al-Kahf. 2. Send abundant blessings (Salawat) upon the Prophet. 3. Perform Ghusl and wear clean clothes. 4. Seek the hour of accepted supplication.',
    images: ['https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'],
    category: 'post',
    author: 'Head of Social Media',
    date: '2026-06-25'
  }
];

// Mock APUMA leaders
// APUMA committee. Executive board, then the Design and Da'wah teams split into
// sisters' and brothers' members.
const DESIGN_BIO = 'Creates posters, infographics and graphics for APUMA’s feed.';
const DAWAH_BIO = 'Prepares sourced Islamic reminders and insights for the community.';

const INITIAL_MEMBERS: TeamMember[] = [
  // ---- Executive board ----
  { id: 'exec-pres', name: 'Abdur Rehman Usmani', roleName: 'President', category: 'executive', bio: 'Leads APUMA’s vision and represents the Muslim student community at APU.', avatar: '🧔🏻', order: 1 },
  { id: 'exec-vp', name: 'Sawsan Al-Rabeei', roleName: 'Vice President', category: 'executive', bio: 'Coordinates the teams and keeps events and reminders running smoothly.', avatar: '🧕🏻', order: 2 },
  { id: 'exec-head-dd', name: 'Rida', roleName: 'Head of Design & Da’wah', category: 'executive', bio: 'Leads the Design and Da’wah teams across content, posters and reminders.', avatar: '🧕🏽', order: 3 },

  // ---- Design team ----
  { id: 'des-sis-1', name: 'Sawsan Al-Shareef', roleName: 'Design', category: 'team', gender: 'sister', unit: 'design', bio: DESIGN_BIO, avatar: '🧕🏻', order: 4 },
  { id: 'des-sis-2', name: 'Afifah', roleName: 'Design', category: 'team', gender: 'sister', unit: 'design', bio: DESIGN_BIO, avatar: '🧕🏽', order: 5 },
  { id: 'des-sis-3', name: 'Fatima', roleName: 'Design', category: 'team', gender: 'sister', unit: 'design', bio: DESIGN_BIO, avatar: '🧕🏾', order: 6 },
  { id: 'des-sis-4', name: 'Jumana', roleName: 'Design', category: 'team', gender: 'sister', unit: 'design', bio: DESIGN_BIO, avatar: '🧕🏻', order: 7 },
  { id: 'des-sis-5', name: 'Zahirah', roleName: 'Design', category: 'team', gender: 'sister', unit: 'design', bio: DESIGN_BIO, avatar: '🧕🏽', order: 8 },
  { id: 'des-bro-1', name: 'Abdullah Rabei', roleName: 'Design', category: 'team', gender: 'brother', unit: 'design', bio: DESIGN_BIO, avatar: '🧑🏻', order: 9 },

  // ---- Da'wah team ----
  { id: 'daw-sis-1', name: 'Esraa', roleName: 'Da’wah', category: 'team', gender: 'sister', unit: 'dawah', bio: DAWAH_BIO, avatar: '🧕🏻', order: 10 },
  { id: 'daw-sis-2', name: 'Leyla', roleName: 'Da’wah', category: 'team', gender: 'sister', unit: 'dawah', bio: DAWAH_BIO, avatar: '🧕🏽', order: 11 },
  { id: 'daw-sis-3', name: 'Ranya', roleName: 'Da’wah', category: 'team', gender: 'sister', unit: 'dawah', bio: DAWAH_BIO, avatar: '🧕🏾', order: 12 },
  { id: 'daw-sis-4', name: 'Safa', roleName: 'Da’wah', category: 'team', gender: 'sister', unit: 'dawah', bio: DAWAH_BIO, avatar: '🧕🏻', order: 13 },
  { id: 'daw-sis-5', name: 'Sara', roleName: 'Da’wah', category: 'team', gender: 'sister', unit: 'dawah', bio: DAWAH_BIO, avatar: '🧕🏽', order: 14 },
  { id: 'daw-sis-6', name: 'Muna', roleName: 'Da’wah', category: 'team', gender: 'sister', unit: 'dawah', bio: DAWAH_BIO, avatar: '🧕🏾', order: 15 },
  { id: 'daw-bro-1', name: 'Abdullah', roleName: 'Da’wah', category: 'team', gender: 'brother', unit: 'dawah', bio: DAWAH_BIO, avatar: '🧑🏽', order: 16 },
];

// Mock Content Strategy Drafts
const INITIAL_DRAFTS: ContentDraft[] = [
  {
    id: 'draft-1',
    title: 'Patience (Sabr) in Times of Trial',
    brief: 'Provide an uplifting educational post about the beauty of Sabr. Suggest three actionable steps for university exam stress.',
    panels: [
      "Slide 1 Title: Finding Peace in Exam Stress: The Power of Sabr (Patience).",
      "Slide 2: Sabr is not just passive waiting; it is a beautiful, active trust in Allah's timing. 'Indeed, with hardship comes ease.'",
      "Slide 3 Actions: 1. Tie your camel (study smart) 2. Relinquish control (pray Tahajjud) 3. Keep tongue moist with Dhikr.",
      "Slide 4 Action: Share this with a fellow APU student who is preparing for finals right now! Tag APUMA!"
    ],
    status: 'draft',
    submittedBy: 'Sister Fatimah Al-Hassan',
    submittedAt: '2026-06-27'
  },
  {
    id: 'draft-2',
    title: 'Virtues of the Ten Days of Dhul Hijjah',
    brief: 'Carousel slides detailing the virtues and recommended deeds for the best 10 days of the year.',
    panels: [
      "Slide 1: The Best 10 Days of the Year: Dhul Hijjah is here!",
      "Slide 2: Prophet Muhammad (ﷺ) said: 'There are no days in which righteous deeds are more beloved to Allah than these ten days.'",
      "Slide 3 Recommendations: Fast the day of Arafah, do abundant Takbeer (Allahu Akbar), and perform Qurbani.",
      "Slide 4 Outro: Join APUMA on Thursday for our communal Iftar!"
    ],
    status: 'designed',
    designImages: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=400'
    ],
    submittedBy: 'Sister Fatimah Al-Hassan',
    submittedAt: '2026-06-26',
    designedBy: 'Brother Ali Reda',
    designedAt: '2026-06-28'
  }
];

// Default browsing identity before anyone logs in.
const GUEST: UserProfile = { id: 'guest-id', name: 'Guest', email: '', role: 'guest' };

// Admin-provisioned demo accounts. In a real deployment these would live in a
// database and be created by the Admin; here they are seeded so the Member login
// (and each workspace) is testable. Passwords are demo-only plaintext.
const SEED_ACCOUNTS: StoredAccount[] = [
  { id: 'acc-community', kind: 'member', role: 'community', name: 'Aisha M.',  email: 'community@apuma.org', password: 'member123', avatar: '🌟' },
  { id: 'acc-dawah',     kind: 'member', role: 'dawah',     name: 'Bilal F.',  email: 'dawah@apuma.org',     password: 'member123', avatar: '📖' },
  { id: 'acc-design',    kind: 'member', role: 'design',    name: 'Yusuf K.',  email: 'design@apuma.org',    password: 'member123', avatar: '🎨' },
  { id: 'acc-exec',      kind: 'member', role: 'executive', name: 'Ahmad R.',  email: 'exec@apuma.org',      password: 'member123', avatar: '👑' },
  { id: 'acc-admin',     kind: 'member', role: 'admin',     name: 'APUMA Admin', email: 'admin@apuma.org',   password: 'admin123',  avatar: '⚡' },
];

const profileOf = (a: StoredAccount): UserProfile => ({ id: a.id, name: a.name, email: a.email, role: a.role, avatar: a.avatar });

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load state from LocalStorage, otherwise use initial mock data
  const [currentUser, setCurrentUserState] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('apuma_user');
    return saved ? JSON.parse(saved) : GUEST;
  });

  // Credential store: seeded admin-provisioned accounts + any self-registered users.
  const [accounts, setAccounts] = useState<StoredAccount[]>(() => {
    const saved = localStorage.getItem('apuma_accounts');
    const registered: StoredAccount[] = saved ? JSON.parse(saved) : [];
    // Always keep the seeded accounts present, layered under saved registrations.
    const seededIds = new Set(SEED_ACCOUNTS.map(a => a.id));
    return [...SEED_ACCOUNTS, ...registered.filter(a => !seededIds.has(a.id))];
  });

  useEffect(() => {
    // Persist only self-registered users (seeded accounts are code-defined).
    const registered = accounts.filter(a => !SEED_ACCOUNTS.some(s => s.id === a.id));
    localStorage.setItem('apuma_accounts', JSON.stringify(registered));
  }, [accounts]);

  const [posts, setPosts] = useState<PublishedPost[]>(() => {
    const saved = localStorage.getItem('apuma_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [drafts, setDrafts] = useState<ContentDraft[]>(() => {
    const saved = localStorage.getItem('apuma_drafts');
    return saved ? JSON.parse(saved) : INITIAL_DRAFTS;
  });

  const [systemConfig, setSystemConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('apuma_config');
    return saved ? JSON.parse(saved) : {
      recruitmentOpen: true,
      recruitmentFormUrl: 'https://forms.gle/apuma-recruitment-example',
      whatsappGroupUrl: 'https://chat.whatsapp.com/apuma-community-example'
    };
  });

  const [activeCourseId, setActiveCourseId] = useState<string>('seerah');
  const activeCourse = COURSES.find(c => c.id === activeCourseId) || COURSES[0];
  const setActiveCourse = (courseId: string) => setActiveCourseId(courseId);

  const [progress, setProgress] = useState<UserCourseProgress>(() => {
    const key = `apuma_progress_${currentUser?.id || 'guest'}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {
      userId: currentUser?.id || 'guest',
      completedSessionIds: [],
      completedModuleIds: [],
      quizScores: {},
      totalXp: 0
    };
  });

  // Save data to LocalStorage on changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('apuma_user', JSON.stringify(currentUser));
      // Load progress corresponding to this user
      const key = `apuma_progress_${currentUser.id}`;
      const savedProg = localStorage.getItem(key);
      if (savedProg) {
        setProgress(JSON.parse(savedProg));
      } else {
        setProgress({
          userId: currentUser.id,
          completedSessionIds: [],
          completedModuleIds: [],
          quizScores: {},
          totalXp: 0
        });
      }
    } else {
      localStorage.removeItem('apuma_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('apuma_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('apuma_drafts', JSON.stringify(drafts));
  }, [drafts]);

  useEffect(() => {
    localStorage.setItem('apuma_config', JSON.stringify(systemConfig));
  }, [systemConfig]);

  // Save progress for active user
  useEffect(() => {
    const userId = currentUser?.id || 'guest';
    const key = `apuma_progress_${userId}`;
    localStorage.setItem(key, JSON.stringify(progress));
  }, [progress, currentUser]);

  const findByEmail = (email: string) =>
    accounts.find(a => a.email.toLowerCase() === email.trim().toLowerCase());

  // Email/password login. `channel` distinguishes the public User tab from the
  // admin-provisioned Member tab; `memberType` enforces the Admin-set type.
  const login = (email: string, password: string, channel: 'user' | 'member', memberType?: MemberType): AuthResult => {
    if (!email.trim() || !password) return { ok: false, error: 'Please enter your email and password.' };
    const acc = findByEmail(email);
    if (!acc || acc.password !== password) return { ok: false, error: 'Invalid email or password.' };
    if (channel === 'user' && acc.kind !== 'user') {
      return { ok: false, error: 'This is a member account — use the Member tab to sign in.' };
    }
    if (channel === 'member') {
      if (acc.kind !== 'member') return { ok: false, error: 'No member account found — did you mean the User tab?' };
      // Admin is a superuser and may sign in under any selected type.
      if (memberType && acc.role !== memberType && acc.role !== 'admin') {
        return { ok: false, error: 'That user type does not match the Admin’s records for this account.' };
      }
    }
    setCurrentUserState(profileOf(acc));
    return { ok: true, role: acc.role };
  };

  // Self-service registration → a public `user` account.
  const register = (name: string, email: string, password: string): AuthResult => {
    if (!name.trim() || !email.trim() || !password) return { ok: false, error: 'Please fill in your name, email and password.' };
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
    if (findByEmail(email)) return { ok: false, error: 'An account with this email already exists.' };
    const acc: StoredAccount = {
      id: `user-${Date.now()}`, kind: 'user', role: 'user',
      name: name.trim(), email: email.trim(), password, avatar: '👤',
    };
    setAccounts(prev => [...prev, acc]);
    setCurrentUserState(profileOf(acc));
    return { ok: true, role: acc.role };
  };

  const logout = () => setCurrentUserState(GUEST);

  // Complete a session in Seerah Course
  const completeSession = (moduleId: string, sessionId: string, xpGained: number) => {
    setProgress(prev => {
      if (prev.completedSessionIds.includes(sessionId)) return prev;
      
      const newCompletedSessions = [...prev.completedSessionIds, sessionId];
      const nextXp = prev.totalXp + xpGained;

      return {
        ...prev,
        completedSessionIds: newCompletedSessions,
        totalXp: nextXp
      };
    });
  };

  // Complete a Module quiz (unlocks next module)
  const completeModuleQuiz = (moduleId: string, scorePercentage: number) => {
    setProgress(prev => {
      const currentHighest = prev.quizScores[moduleId] || 0;
      const newScores = {
        ...prev.quizScores,
        [moduleId]: Math.max(currentHighest, scorePercentage)
      };

      let newCompletedModules = [...prev.completedModuleIds];
      // If passed (score >= 70%), add to completed modules if not already there
      if (scorePercentage >= 70 && !newCompletedModules.includes(moduleId)) {
        newCompletedModules.push(moduleId);
      }

      return {
        ...prev,
        completedModuleIds: newCompletedModules,
        quizScores: newScores
      };
    });
  };

  // Da'wah content action. `submitted: true` ("Upload") makes the brief visible
  // to the Design team; `false` ("Save as draft") keeps it private to Da'wah.
  const createDraft = (title: string, brief: string, panels: string[], submitted = false) => {
    const newDraft: ContentDraft = {
      id: `draft-${Date.now()}`,
      title,
      brief,
      panels,
      status: 'draft',
      submitted,
      submittedBy: currentUser?.name || "Da'wah Team",
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setDrafts(prev => [newDraft, ...prev]);
  };

  const updateDraft = (draftId: string, partial: Partial<ContentDraft>) => {
    setDrafts(prev => prev.map(d => (d.id === draftId ? { ...d, ...partial } : d)));
  };

  // Design Phase Action — attach graphics (uploaded or pulled from a Canva link).
  const uploadDesignAssets = (draftId: string, imageUrls: string[], canvaLink?: string) => {
    setDrafts(prev => prev.map(draft => {
      if (draft.id === draftId) {
        return {
          ...draft,
          status: 'designed',
          designImages: imageUrls,
          canvaLink: canvaLink ?? draft.canvaLink,
          designedBy: currentUser?.name || 'APUMA Designer',
          designedAt: new Date().toISOString().split('T')[0]
        };
      }
      return draft;
    }));
  };

  // Leadership Review: Executive approval
  const approveDraftToPublish = (draftId: string, category: 'post' | 'event' | 'announcement') => {
    const draft = drafts.find(d => d.id === draftId);
    if (!draft) return;

    // Create published post
    const newPost: PublishedPost = {
      id: `post-${Date.now()}`,
      title: draft.title,
      content: draft.brief + "\n\n" + draft.panels.join("\n\n"),
      images: draft.designImages && draft.designImages.length > 0 
        ? draft.designImages 
        : ['https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'], // Fallback
      category: category,
      author: draft.submittedBy,
      date: new Date().toISOString().split('T')[0]
    };

    setPosts(prev => [newPost, ...prev]);

    // Update draft state
    setDrafts(prev => prev.map(d => {
      if (d.id === draftId) {
        return {
          ...d,
          status: 'approved',
          approvedBy: currentUser?.name || 'APUMA Executive',
          approvedAt: new Date().toISOString().split('T')[0]
        };
      }
      return d;
    }));
  };

  // Reject or Delete Content Draft
  const rejectOrDeleteDraft = (draftId: string) => {
    setDrafts(prev => prev.filter(d => d.id !== draftId));
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  // Broadcasts (YouTube course library)
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>(() => {
    const saved = localStorage.getItem('apuma_broadcasts');
    return saved ? JSON.parse(saved) : SEED_BROADCASTS;
  });
  useEffect(() => { localStorage.setItem('apuma_broadcasts', JSON.stringify(broadcasts)); }, [broadcasts]);
  const addBroadcast = (b: Omit<Broadcast, 'id'>) => setBroadcasts(prev => [{ ...b, id: `bc-${Date.now()}` }, ...prev]);
  const deleteBroadcast = (id: string) => setBroadcasts(prev => prev.filter(x => x.id !== id));

  // Executive recruitment toggle
  const toggleRecruitment = (isOpen: boolean) => {
    setSystemConfig(prev => ({
      ...prev,
      recruitmentOpen: isOpen
    }));
  };

  const resetProgress = () => {
    setProgress({
      userId: currentUser?.id || 'guest',
      completedSessionIds: [],
      completedModuleIds: [],
      quizScores: {},
      totalXp: 0
    });
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      login,
      register,
      logout,
      courses: COURSES,
      activeCourseId,
      setActiveCourse,
      activeCourse,
      progress,
      completeSession,
      completeModuleQuiz,
      drafts,
      createDraft,
      updateDraft,
      uploadDesignAssets,
      approveDraftToPublish,
      rejectOrDeleteDraft,
      posts,
      deletePost,
      broadcasts,
      addBroadcast,
      deleteBroadcast,
      members: INITIAL_MEMBERS,
      systemConfig,
      toggleRecruitment,
      resetProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
