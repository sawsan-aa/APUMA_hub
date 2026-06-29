import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  UserRole, 
  UserCourseProgress, 
  ContentDraft, 
  PublishedPost, 
  TeamMember, 
  SystemConfig,
  CourseModule
} from '../types';

interface AppContextType {
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  loginAs: (role: UserRole) => void;
  courseModules: CourseModule[];
  progress: UserCourseProgress;
  completeSession: (moduleId: string, sessionId: string, xpGained: number) => void;
  completeModuleQuiz: (moduleId: string, scorePercentage: number) => void;
  drafts: ContentDraft[];
  createDraft: (title: string, brief: string, panels: string[]) => void;
  uploadDesignAssets: (draftId: string, imageUrls: string[]) => void;
  approveDraftToPublish: (draftId: string, category: 'post' | 'event' | 'announcement') => void;
  rejectOrDeleteDraft: (draftId: string) => void;
  posts: PublishedPost[];
  deletePost: (postId: string) => void;
  members: TeamMember[];
  systemConfig: SystemConfig;
  toggleRecruitment: (isOpen: boolean) => void;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Static Seerah Modules Data (Duolingo Style chronological structure)
const INITIAL_MODULES: CourseModule[] = [
  {
    id: 'before-risalah',
    title: 'Before Risalah',
    arabicTitle: 'قبل الرسالة',
    description: 'Explore the pre-Islamic Arabian society, the year of the elephant, the Prophet’s noble birth, and his youth before revelation.',
    order: 1,
    icon: 'Compass',
    sessions: [
      {
        id: 'session-jahiliyyah',
        title: 'Arabia Before Islam',
        duration: '4 min',
        xp: 15,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
        contentPanels: [
          "Before Islam, the Arabian Peninsula was largely tribal with no central government.",
          "Most Arabs practiced polytheism and worshipped idols in the Kaaba.",
          "Despite this, some individuals, known as Hunafa', still followed the monotheistic path of Prophet Ibrahim (Abraham).",
          "Society had noble values like hospitality and poetry, but was also marred by female infanticide, active warfare, and injustice."
        ],
        order: 1
      },
      {
        id: 'session-early-life',
        title: 'Birth & Youth of Muhammad (ﷺ)',
        duration: '5 min',
        xp: 20,
        contentPanels: [
          "Prophet Muhammad (ﷺ) was born in Mecca in the Year of the Elephant (circa 570 CE) to Aminah and Abdullah.",
          "His father Abdullah passed away before his birth, and his mother Aminah passed when he was only six.",
          "He was raised by his loving grandfather Abdul-Muttalib, and later by his uncle Abu Talib.",
          "As a youth, he earned the titles 'Al-Amin' (The Trustworthy) and 'As-Sadiq' (The Truthful) because of his impeccable character."
        ],
        order: 2
      }
    ],
    quiz: {
      id: 'quiz-before-risalah',
      title: 'Before Risalah Comprehensive Quiz',
      questions: [
        {
          id: 'q1',
          question: 'What title did the Meccans give to Prophet Muhammad (ﷺ) due to his absolute honesty?',
          options: ['Al-Amin', 'Al-Mubin', 'Al-Kamil', 'Al-Farooq'],
          correctAnswerIndex: 0,
          explanation: 'Muhammad (ﷺ) was known as Al-Amin, which means "The Trustworthy", due to his honest dealings and perfect moral code.'
        },
        {
          id: 'q2',
          question: 'Who took care of Prophet Muhammad (ﷺ) after his grandfather Abdul-Muttalib passed away?',
          options: ['His mother Aminah', 'His uncle Abu Talib', 'His wet-nurse Halimah', 'Abu Lahab'],
          correctAnswerIndex: 1,
          explanation: 'His uncle Abu Talib took him under his care and protected him throughout his early prophethood.'
        }
      ]
    }
  },
  {
    id: 'beginning-of-dawah',
    title: 'Beginning of Dawah',
    arabicTitle: 'بدء الدعوة',
    description: 'Learn about the first revelation in Cave Hira, the secret dawah phase, and the onset of public persecution.',
    order: 2,
    icon: 'BookOpen',
    sessions: [
      {
        id: 'session-cave-hira',
        title: 'The First Revelation',
        duration: '5 min',
        xp: 20,
        contentPanels: [
          "At age 40, during seclusion in Cave Hira, Angel Jibreel (Gabriel) appeared to Muhammad (ﷺ).",
          "Jibreel squeezed him and commanded: 'Iqra!' (Read!). The Prophet replied: 'I cannot read.'",
          "The first five verses of Surah Al-Alaq were revealed, marking the beginning of prophethood.",
          "Shaken, he ran home to his wife Khadijah, who comforted him and took him to her Christian cousin Waraqah ibn Nawfal."
        ],
        order: 1
      },
      {
        id: 'session-secret-dawah',
        title: 'The Secret Calls to Islam',
        duration: '4 min',
        xp: 15,
        contentPanels: [
          "For the first three years, the Prophet (ﷺ) propagated Islam secretly to close friends and relatives.",
          "Khadijah was the first woman to accept Islam, Ali ibn Abi Talib was the first child, and Abu Bakr was the first adult male.",
          "The early believers met secretly in the house of Al-Arqam to learn and pray.",
          "This secret phase established a strong core foundation of believers before facing public opposition."
        ],
        order: 2
      }
    ],
    quiz: {
      id: 'quiz-beginning-dawah',
      title: 'Beginning of Dawah Quiz',
      questions: [
        {
          id: 'q3',
          question: 'Which Surah and how many verses were first revealed to the Prophet (ﷺ) in Cave Hira?',
          options: [
            'Surah Al-Fatiha, first 7 verses',
            'Surah Al-Alaq, first 5 verses',
            'Surah Al-Muddaththir, first 10 verses',
            'Surah Al-Ikhlas, all 4 verses'
          ],
          correctAnswerIndex: 1,
          explanation: 'The first revelation consisted of the first five verses of Surah Al-Alaq, starting with "Read in the name of your Lord who created..."'
        },
        {
          id: 'q4',
          question: 'Where did the early Muslims meet secretly during the first three years of secret dawah?',
          options: [
            'The House of Abu Bakr',
            'The Cave of Thawr',
            'The House of Al-Arqam',
            'Around the Kaaba'
          ],
          correctAnswerIndex: 2,
          explanation: 'The house of Al-Arqam (Dar al-Arqam) was the clandestine sanctuary where early Muslims gathered to study Islam.'
        }
      ]
    }
  },
  {
    id: 'hijrah',
    title: 'The Hijrah to Madinah',
    arabicTitle: 'الهجرة النبوية',
    description: 'Follow the miraculous migration of the Prophet (ﷺ) and Abu Bakr from Mecca to Yathrib (Madinah).',
    order: 3,
    icon: 'Milestone',
    sessions: [
      {
        id: 'session-migration-escape',
        title: 'Escaping Mecca',
        duration: '6 min',
        xp: 25,
        contentPanels: [
          "As the Quraysh plotted to assassinate the Prophet (ﷺ), Allah commanded him to migrate to Madinah.",
          "Ali ibn Abi Talib bravely slept in the Prophet's bed to fool the assassins while the Prophet escaped.",
          "The Prophet (ﷺ) met Abu Bakr, and together they slipped out of Mecca under the cover of night.",
          "They hid in Cave Thawr for three days, where a miraculous spiderweb and nesting dove hid them from search parties."
        ],
        order: 1
      },
      {
        id: 'session-entering-madinah',
        title: 'Arrival in Madinah',
        duration: '5 min',
        xp: 20,
        contentPanels: [
          "Upon reaching Yathrib, the people welcomed him with joy, singing 'Tala al-Badru Alayna'.",
          "The city's name was changed to Madinatun-Nabi (City of the Prophet) or simply Madinah.",
          "The Prophet established brotherhood (Muwakhah) between the Meccan Emigrants (Muhajirun) and the local Helpers (Ansar).",
          "He constructed the Prophet's Mosque (Al-Masjid an-Nabawi), which became the spiritual and civic heart of the community."
        ],
        order: 2
      }
    ],
    quiz: {
      id: 'quiz-hijrah',
      title: 'The Hijrah Quiz',
      questions: [
        {
          id: 'q5',
          question: 'Who slept in the Prophet’s bed to delay the Quraysh assassins while the Prophet escaped?',
          options: ['Abu Bakr', 'Umar ibn al-Khattab', 'Ali ibn Abi Talib', 'Uthman ibn Affan'],
          correctAnswerIndex: 2,
          explanation: 'Ali ibn Abi Talib (may Allah be pleased with him) volunteered to sleep in the bed, risking his life to ensure the Prophet\'s safe escape.'
        },
        {
          id: 'q6',
          question: 'What was the original name of the city of Madinah before the Hijrah?',
          options: ['Yathrib', 'Taif', 'Khaybar', 'Quba'],
          correctAnswerIndex: 0,
          explanation: 'Before the Prophet\'s migration, the city was known as Yathrib.'
        }
      ]
    }
  },
  {
    id: 'after-hijrah',
    title: 'After Hijrah (State-building)',
    arabicTitle: 'بناء الدولة',
    description: 'Examine the establishment of the Madinan Covenant, the integration of tribes, and building the first Islamic state.',
    order: 4,
    icon: 'Building',
    sessions: [
      {
        id: 'session-madinah-covenant',
        title: 'The Constitution of Madinah',
        duration: '5 min',
        xp: 20,
        contentPanels: [
          "The Prophet (ﷺ) drafted the Charter of Madinah, one of the earliest written constitutions.",
          "It united the warring Aws and Khazraj tribes, the Muhajirun, and Jewish tribes under a single federated structure.",
          "It guaranteed religious freedom, mutual defense, and established a framework for justice.",
          "Every community member was designated equal rights and responsibilities in defending the city."
        ],
        order: 1
      }
    ],
    quiz: {
      id: 'quiz-after-hijrah',
      title: 'After Hijrah Quiz',
      questions: [
        {
          id: 'q7',
          question: 'What is the historically significant document that established religious freedom and security in Madinah?',
          options: ['Treaty of Hudaybiyyah', 'The Constitution of Madinah', 'Pledge of Aqabah', 'Sermon of Mount Safa'],
          correctAnswerIndex: 1,
          explanation: 'The Constitution (or Charter) of Madinah outlined rights and responsibilities for all tribes, Jews, and Muslims.'
        }
      ]
    }
  },
  {
    id: 'wars',
    title: 'Defensive Campaigns',
    arabicTitle: 'الغزوات والدفاع',
    description: 'Study the major defense battles: Badr, Uhud, and Al-Khandaq (The Trench) which protected the infant state.',
    order: 5,
    icon: 'ShieldAlert',
    sessions: [
      {
        id: 'session-battle-badr',
        title: 'The Battle of Badr',
        duration: '6 min',
        xp: 25,
        contentPanels: [
          "In 2 AH, the Battle of Badr occurred—the first major defensive confrontation.",
          "An ill-equipped Muslim force of 313 stood against 1,000 well-armed Meccan warriors.",
          "Despite being outnumbered, the Muslims achieved a miraculous victory with divine help.",
          "This established Muslims as a solid military and political force to be respected in Arabia."
        ],
        order: 1
      },
      {
        id: 'session-battle-trench',
        title: 'The Battle of the Trench',
        duration: '5 min',
        xp: 20,
        contentPanels: [
          "In 5 AH, an alliance of 10,000 confederates marched on Madinah to crush the Muslims.",
          "On Salman al-Farsi’s advice, the Muslims dug a massive defensive trench around Madinah’s exposed borders.",
          "This ingenious strategy halted the Quraysh cavalry and resulted in a prolonged siege.",
          "Severe storms and tribal fractures eventually forced the confederates to retreat, cementing Madinah's safety."
        ],
        order: 2
      }
    ],
    quiz: {
      id: 'quiz-wars',
      title: 'Defensive Campaigns Quiz',
      questions: [
        {
          id: 'q8',
          question: 'Whose brilliant advice to dig a trench saved Madinah during the Battle of the Confederates?',
          options: ['Abu Bakr', 'Salman al-Farsi', 'Khalid ibn al-Walid', 'Hamzah ibn Abdul-Muttalib'],
          correctAnswerIndex: 1,
          explanation: 'Salman al-Farsi, a Persian companion, suggested digging the trench—a warfare tactic unfamiliar to Arabian tribes.'
        }
      ]
    }
  },
  {
    id: 'prophets-manners',
    title: 'Prophet’s Manners',
    arabicTitle: 'أخلاق النبي',
    description: 'Learn about his infinite patience, forgiveness, mercy, and exemplary character with companions and opponents alike.',
    order: 6,
    icon: 'Heart',
    sessions: [
      {
        id: 'session-mercy-all',
        title: 'Mercy to the Worlds',
        duration: '5 min',
        xp: 20,
        contentPanels: [
          "Allah states in the Quran: 'We sent you not but as a mercy to the worlds' (21:107).",
          "His mercy extended to animals, children, women, and even those who plotted his harm.",
          "When he returned to Taif—where he was previously stoned and bloodied—he refused the angel's offer to crush the city, praying instead for their guidance.",
          "During the Conquest of Mecca, he declared a general amnesty, forgiving his bitterest lifelong enemies."
        ],
        order: 1
      }
    ],
    quiz: {
      id: 'quiz-manners',
      title: 'Prophet’s Manners Quiz',
      questions: [
        {
          id: 'q9',
          question: 'What did the Prophet (ﷺ) do when he returned to Mecca as a conqueror and met his former oppressors?',
          options: [
            'He ordered their exile',
            'He declared a general amnesty and forgave them',
            'He exacted equal retribution',
            'He confiscated all their wealth'
          ],
          correctAnswerIndex: 1,
          explanation: 'The Prophet (ﷺ) demonstrated ultimate grace by declaring, "Go, for you are free," pardoning his former tormentors.'
        }
      ]
    }
  },
  {
    id: 'prophets-sunnah',
    title: 'Prophet’s Daily Sunnah',
    arabicTitle: 'السنة النبوية',
    description: 'Discover simple, high-reward daily habits of the Prophet (ﷺ) that you can adopt to enrich your life.',
    order: 7,
    icon: 'Smile',
    sessions: [
      {
        id: 'session-daily-sunnah',
        title: 'Daily Habits & Smiles',
        duration: '4 min',
        xp: 15,
        contentPanels: [
          "Smiling is Charity: The Prophet (ﷺ) said, 'Your smiling in the face of your brother is charity.'",
          "Using the Siwak: He highly encouraged dental hygiene, particularly using the natural miswak before prayers.",
          "Sleeping on the Right Side: He slept on his right side, placing his hand under his right cheek, reciting prayers.",
          "Eating with the Right Hand: He instructed to eat from what is near and always use the right hand."
        ],
        order: 1
      }
    ],
    quiz: {
      id: 'quiz-sunnah',
      title: 'Prophet’s Sunnah Quiz',
      questions: [
        {
          id: 'q10',
          question: 'According to the Prophet (ﷺ), what action towards your brother is considered a charity (sadaqah)?',
          options: ['Frowning', 'Smiling', 'Staring', 'Arguing'],
          correctAnswerIndex: 1,
          explanation: 'Smiling is taught in Islam as a beautiful, accessible act of charity that spreads peace and warm affection.'
        }
      ]
    }
  }
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
const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 'leader-pres',
    name: 'Brother Tariq Al-Mansoor',
    roleName: 'APUMA President',
    category: 'executive',
    bio: 'A passionate final-year Computer Science student from Jordan. Tariq aims to foster an inclusive, supportive environment for all Muslim students at APU, building lasting bonds and beautiful events.',
    avatar: '🧔',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    order: 1
  },
  {
    id: 'leader-vp',
    name: 'Sister Yasmin Shaukat',
    roleName: 'Vice President',
    category: 'executive',
    bio: 'Software Engineering student from Malaysia. Yasmin manages internal organization, academic collaborations, and supports sisters-only circle activities inside APUMA.',
    avatar: '🧕',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    order: 2
  },
  {
    id: 'leader-sm',
    name: 'Brother Bilal Farooq',
    roleName: 'Head of Social Media & Design',
    category: 'executive',
    bio: 'Media and Communications major from Pakistan. Bilal is the artistic visionary behind our beautiful infographics, reels, and cute educational slides.',
    avatar: '🎨',
    instagram: 'https://instagram.com',
    order: 3
  },
  {
    id: 'member-ali',
    name: 'Brother Ali Reda',
    roleName: 'Design Committee',
    category: 'team',
    bio: 'Multimedia designer from Lebanon. Ali loves creating cute illustrations and translating deep Islamic history into digestible mobile carousels.',
    avatar: '👨‍💻',
    order: 4
  },
  {
    id: 'member-fatimah',
    name: 'Sister Fatimah Al-Hassan',
    roleName: 'Content Strategist',
    category: 'team',
    bio: 'Fatimah researches verified narrations and Hadiths to write precise, engaging content panels for our daily educational feeds.',
    avatar: '📝',
    order: 5
  }
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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load state from LocalStorage, otherwise use initial mock data
  const [currentUser, setCurrentUserState] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('apuma_user');
    return saved ? JSON.parse(saved) : { id: 'guest-id', name: 'Guest User', email: '', role: 'guest' };
  });

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

  // Helper login for presentation/demonstration
  const loginAs = (role: UserRole) => {
    if (role === 'guest') {
      setCurrentUserState({ id: 'guest-id', name: 'Guest User', email: '', role: 'guest' });
    } else if (role === 'member') {
      setCurrentUserState({ id: 'member-user', name: 'Ahmad Rafiq', email: 'ahmad@apu.edu.my', role: 'member', avatar: '🧑' });
    } else if (role === 'team') {
      setCurrentUserState({ id: 'team-user', name: 'Ali Reda (Designer)', email: 'ali.reda@apuma.org', role: 'team', avatar: '🎨' });
    } else if (role === 'executive') {
      setCurrentUserState({ id: 'executive-user', name: 'Tariq Al-Mansoor (President)', email: 'tariq.pres@apuma.org', role: 'executive', avatar: '👑' });
    } else if (role === 'admin') {
      setCurrentUserState({ id: 'admin-user', name: 'APUMA Super Admin', email: 'admin@apuma.org', role: 'admin', avatar: '⚡' });
    }
  };

  const setCurrentUser = (user: UserProfile | null) => {
    setCurrentUserState(user);
  };

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

  // Content Strategy Draft Action
  const createDraft = (title: string, brief: string, panels: string[]) => {
    const newDraft: ContentDraft = {
      id: `draft-${Date.now()}`,
      title,
      brief,
      panels,
      status: 'draft',
      submittedBy: currentUser?.name || 'Anonymous Strategist',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setDrafts(prev => [newDraft, ...prev]);
  };

  // Design Phase Action
  const uploadDesignAssets = (draftId: string, imageUrls: string[]) => {
    setDrafts(prev => prev.map(draft => {
      if (draft.id === draftId) {
        return {
          ...draft,
          status: 'designed',
          designImages: imageUrls,
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
      setCurrentUser,
      loginAs,
      courseModules: INITIAL_MODULES,
      progress,
      completeSession,
      completeModuleQuiz,
      drafts,
      createDraft,
      uploadDesignAssets,
      approveDraftToPublish,
      rejectOrDeleteDraft,
      posts,
      deletePost,
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
