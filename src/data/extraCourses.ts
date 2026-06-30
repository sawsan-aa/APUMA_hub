/**
 * Additional APUMA learning tracks beyond the Seerah course.
 * Content reflects standard, well-established teaching of Arabic reading,
 * Tajweed (rules of Quranic recitation) and Asbab al-Nuzul. Each track is fully
 * playable: bite-sized sessions + an unlocking module quiz. IDs are course-
 * prefixed so global learner progress stays unique and stable.
 */
import { Course } from '../types';

const ARABIC: Course = {
  id: 'arabic',
  title: 'Reading Arabic & Qur’an Words',
  emoji: '🔤',
  accent: '#2563EB',
  subtitle: 'Start from the letters and build up to reading real Qur’anic words.',
  modules: [
    {
      id: 'ar-letters',
      title: 'The Arabic Letters',
      arabicTitle: 'الحروف',
      description: 'Meet the 28 letters — their shapes, distinguishing dots and sounds — the foundation of everything that follows.',
      order: 1,
      icon: 'BookOpen',
      sessions: [
        {
          id: 'ar-letters-s1', title: 'Alif to Tha', duration: '4 min', xp: 15, order: 1,
          videoUrl: 'https://www.youtube.com/embed/fJ9_79bg5H4',
          videoTitle: 'Arabic Alphabet: Listen & Repeat',
          listen: {
            intro: 'Tap the speaker to hear each of the first four letters.', items: [
              { ar: 'ا', translit: 'Alif' }, { ar: 'ب', translit: 'Ba' }, { ar: 'ت', translit: 'Ta' }, { ar: 'ث', translit: 'Tha' },
            ]
          },
          practice: {
            intro: 'Now record yourself saying each letter and compare.', items: [
              { ar: 'ا', translit: 'Alif' }, { ar: 'ب', translit: 'Ba' }, { ar: 'ت', translit: 'Ta' }, { ar: 'ث', translit: 'Tha' },
            ]
          },
          contentPanels: [
            'The Arabic alphabet has 28 letters and is written and read from right to left.',
            'The first four letters are ا (Alif), ب (Ba), ت (Ta) and ث (Tha).',
            'Ba, Ta and Tha share one shape — only the dots differ: Ba has one dot below, Ta two above, Tha three above.',
            'Reading Arabic begins with knowing each letter’s name, shape, and the dots that tell similar letters apart.',
          ],
        },
        {
          id: 'ar-letters-s2', title: 'Jim to Dal', duration: '4 min', xp: 15, order: 2,
          contentPanels: [
            'Next come ج (Jim), ح (Ha), خ (Kha) and then د (Dal).',
            'Jim, Ha and Kha share one shape — the dot tells them apart: Jim a dot below, Kha a dot above, Ha none.',
            'Dal is short, sits on the line, and is one of the letters that does not join to the letter after it.',
            'Arabic groups letters by shape — learning one shape unlocks several letters at once.',
          ],
        },
        {
          id: 'ar-letters-s3', title: 'Letter Sounds & the Throat', duration: '5 min', xp: 20, order: 3,
          videoUrl: 'https://www.youtube.com/embed/XJzH4rzPsww',
          videoTitle: 'How to pronounce the Arabic letters',
          listen: {
            intro: 'These letters have no English equivalent — hear them carefully.', items: [
              { ar: 'ع', translit: 'Ayn' }, { ar: 'ح', translit: 'Ha' }, { ar: 'خ', translit: 'Kha' }, { ar: 'ق', translit: 'Qaf' },
            ]
          },
          practice: {
            intro: 'Record yourself producing each throat letter.', items: [
              { ar: 'ع', translit: 'Ayn' }, { ar: 'ح', translit: 'Ha' }, { ar: 'خ', translit: 'Kha' }, { ar: 'ق', translit: 'Qaf' },
            ]
          },
          contentPanels: [
            'Every letter has a sound made from a specific point of the mouth or throat — its makhraj.',
            'Some sounds have no English equivalent, like ع (Ayn), ح (Ha) and ق (Qaf), and come from deep in the throat.',
            'Pronouncing a letter from the wrong place can change a word’s meaning completely.',
            'Careful, correct pronunciation is the foundation of reciting the Qur’an beautifully.',
          ],
        },
      ],
      quiz: {
        id: 'ar-quiz-letters', title: 'The Arabic Letters Quiz',
        questions: [
          { id: 'arq1', question: 'How many letters are in the Arabic alphabet?', options: ['26', '28', '29', '30'], correctAnswerIndex: 1, explanation: 'The Arabic alphabet has 28 letters, written from right to left.' },
          { id: 'arq2', question: 'What distinguishes Ba, Ta and Tha from one another?', options: ['Their size', 'The number and position of dots', 'Their colour', 'Nothing'], correctAnswerIndex: 1, explanation: 'They share one base shape; the dots (one below, two above, three above) tell them apart.' },
          { id: 'arq2b', question: 'What is a letter’s “makhraj”?', options: ['Its dot', 'Its point of articulation', 'Its meaning', 'Its number'], correctAnswerIndex: 1, explanation: 'The makhraj is the point in the mouth or throat from which the letter’s sound is produced.' },
        ],
      },
    },
    {
      id: 'ar-forms',
      title: 'Letter Forms',
      arabicTitle: 'أشكال الحروف',
      description: 'Letters change shape depending on where they sit in a word. Learn to join them smoothly.',
      order: 2,
      icon: 'BookOpen',
      sessions: [
        {
          id: 'ar-forms-s1', title: 'Joining Letters', duration: '4 min', xp: 15, order: 1,
          contentPanels: [
            'Most Arabic letters connect to the letter that follows them, forming flowing words.',
            'Six letters never join to the next one: ا د ذ ر ز و — after them you lift the pen.',
            'Joining letters is what turns separate symbols into a readable word.',
            'Spotting these six “non-connectors” makes reading noticeably easier.',
          ],
        },
        {
          id: 'ar-forms-s2', title: 'Start, Middle, End', duration: '5 min', xp: 20, order: 2,
          contentPanels: [
            'A single letter can take up to four forms: isolated, initial, medial and final.',
            'For example ع looks different at the start (عـ), middle (ـعـ) and end (ـع) of a word.',
            'The core shape stays recognisable — only the connecting strokes change.',
            'Recognising these forms is the key skill for fluent reading.',
          ],
        },
      ],
      quiz: {
        id: 'ar-quiz-forms', title: 'Letter Forms Quiz',
        questions: [
          { id: 'arq3', question: 'How many Arabic letters do NOT connect to the letter after them?', options: ['Two', 'Four', 'Six', 'Ten'], correctAnswerIndex: 2, explanation: 'Six letters (ا د ذ ر ز و) do not join to the following letter.' },
          { id: 'arq4', question: 'How many forms can a single Arabic letter take?', options: ['One', 'Two', 'Up to four', 'Up to six'], correctAnswerIndex: 2, explanation: 'Up to four: isolated, initial, medial and final.' },
        ],
      },
    },
    {
      id: 'ar-harakat',
      title: 'Short Vowels (Harakat)',
      arabicTitle: 'الحركات',
      description: 'The small marks above and below letters that give them their vowel sounds.',
      order: 3,
      icon: 'BookOpen',
      sessions: [
        {
          id: 'ar-harakat-s1', title: 'Fatha, Kasra, Damma', duration: '5 min', xp: 20, order: 1,
          listen: {
            intro: 'Hear how the three short vowels change the same letter.', items: [
              { ar: 'بَ', translit: 'ba', meaning: 'fatha' }, { ar: 'بِ', translit: 'bi', meaning: 'kasra' }, { ar: 'بُ', translit: 'bu', meaning: 'damma' },
            ]
          },
          practice: {
            intro: 'Record yourself saying ba, bi, bu.', items: [
              { ar: 'بَ', translit: 'ba' }, { ar: 'بِ', translit: 'bi' }, { ar: 'بُ', translit: 'bu' },
            ]
          },
          contentPanels: [
            'Harakat are small marks that give a letter its vowel sound.',
            'Fatha ( َ ) above gives a short “a” (بَ = “ba”); Kasra ( ِ ) below gives “i” (بِ = “bi”).',
            'Damma ( ُ ) above — a tiny waw — gives “u” (بُ = “bu”).',
            'With just these three marks you can already sound out countless syllables.',
          ],
        },
        {
          id: 'ar-harakat-s2', title: 'Sukoon, Shaddah & Tanween', duration: '4 min', xp: 15, order: 2,
          contentPanels: [
            'Sukoon ( ْ ) means no vowel — the letter is a resting consonant.',
            'Shaddah ( ّ ) doubles the letter with emphasis — it is pronounced twice.',
            'Tanween ( ً ٍ ٌ ) is a doubled harakah at the end of a word, adding an “n” sound (an / in / un).',
            'Together, these marks let you pronounce any Arabic word precisely.',
          ],
        },
      ],
      quiz: {
        id: 'ar-quiz-harakat', title: 'Harakat Quiz',
        questions: [
          { id: 'arq5', question: 'Which harakah gives a short “i” sound and sits below the letter?', options: ['Fatha', 'Kasra', 'Damma', 'Sukoon'], correctAnswerIndex: 1, explanation: 'Kasra ( ِ ) sits below the letter and gives the “i” sound.' },
          { id: 'arq6', question: 'What does a Shaddah ( ّ ) do to a letter?', options: ['Silences it', 'Doubles it', 'Removes it', 'Lengthens the vowel'], correctAnswerIndex: 1, explanation: 'Shaddah doubles the letter with emphasis — it is pronounced twice.' },
          { id: 'arq6b', question: 'What sound does Tanween add at the end of a word?', options: ['An “m” sound', 'An “n” sound', 'A long vowel', 'Nothing'], correctAnswerIndex: 1, explanation: 'Tanween adds an “n” sound — an, in or un — to the end of the word.' },
        ],
      },
    },
    {
      id: 'ar-words',
      title: 'First Qur’an Words',
      arabicTitle: 'كلمات قرآنية',
      description: 'Put it together with the “al-” rule and read your first real words from the Qur’an.',
      order: 4,
      icon: 'BookOpen',
      sessions: [
        {
          id: 'ar-words-s1', title: 'Sun & Moon Letters', duration: '5 min', xp: 20, order: 1,
          contentPanels: [
            'The word for “the” is ال (al-). With “moon letters” the ل is pronounced clearly: القَمَر = “al-qamar”.',
            'With “sun letters” the ل is silent and the next letter doubles: الشَّمس = “ash-shams”, not “al-shams”.',
            'There are 14 sun letters and 14 moon letters.',
            'This one small rule instantly makes your reading sound natural.',
          ],
        },
        {
          id: 'ar-words-s2', title: 'Reading Real Words', duration: '5 min', xp: 20, order: 2,
          listen: {
            intro: 'Hear these common Qur’anic words.', items: [
              { ar: 'اللّٰه', translit: 'Allah', meaning: 'God' }, { ar: 'رَبّ', translit: 'Rabb', meaning: 'Lord' },
              { ar: 'كِتَاب', translit: 'Kitab', meaning: 'Book' }, { ar: 'بِسْمِ اللَّهِ', translit: 'Bismillah', meaning: 'In the name of Allah' },
            ]
          },
          practice: {
            intro: 'Record yourself reading “Bismillah”.', items: [
              { ar: 'بِسْمِ اللَّهِ', translit: 'Bismillah', meaning: 'In the name of Allah' },
            ]
          },
          contentPanels: [
            'You can already read words like اللّٰه (Allah), رَبّ (Rabb — Lord) and كِتَاب (Kitab — Book).',
            'Read slowly, letter by letter, then blend the sounds together.',
            'Try بِسْمِ اللَّهِ — “Bismillah” — “In the name of Allah”.',
            'With daily practice, fluent Qur’an reading is within everyone’s reach, in shā’ Allah.',
          ],
        },
      ],
      quiz: {
        id: 'ar-quiz-words', title: 'First Qur’an Words Quiz',
        questions: [
          { id: 'arq7', question: 'In “ash-shams” (الشَّمس), why is the “l” of “al-” not pronounced?', options: ['It is a spelling error', 'Sheen is a sun letter, so the ل is silent and the letter doubles', 'It is always silent', 'Because of the shaddah on the alif'], correctAnswerIndex: 1, explanation: 'Sheen is a sun letter: the ل of “al-” is silent and the sun letter is doubled — “ash-shams”.' },
          { id: 'arq8', question: 'What does “Bismillah” mean?', options: ['Praise be to Allah', 'In the name of Allah', 'Allah is greatest', 'There is no god but Allah'], correctAnswerIndex: 1, explanation: '“Bismillah” means “In the name of Allah”.' },
        ],
      },
    },
  ],
};

const TAJWEED: Course = {
  id: 'tajweed',
  title: 'Tajweed',
  emoji: '📖',
  accent: '#DB2777',
  subtitle: 'Recite beautifully with the rules of articulation, nasalisation and elongation.',
  modules: [
    {
      id: 'tj-makharij',
      title: 'Articulation (Makharij)',
      arabicTitle: 'المخارج',
      description: 'Where each letter is born — the points of articulation in the mouth and throat.',
      order: 1,
      icon: 'Smile',
      sessions: [
        {
          id: 'tj-makharij-s1', title: 'Points of the Mouth', duration: '5 min', xp: 20, order: 1,
          videoUrl: 'https://www.youtube.com/embed/tiiE9LI3elo',
          videoTitle: 'Makharij al-Huruf — the articulation points',
          contentPanels: [
            'Makharij are the precise points from which each letter’s sound emerges.',
            'There are five main regions: the empty mouth/throat space, the throat, the tongue, the lips and the nasal passage.',
            'Most letters are produced by the tongue meeting different parts of the mouth.',
            'Producing a letter from the wrong point can change a word’s meaning — so accuracy matters.',
          ],
        },
        {
          id: 'tj-makharij-s2', title: 'The Throat Letters', duration: '4 min', xp: 15, order: 2,
          listen: {
            intro: 'Hear the six throat letters, from deepest to highest.', items: [
              { ar: 'ء', translit: 'Hamza' }, { ar: 'ه', translit: 'Ha' }, { ar: 'ع', translit: 'Ayn' },
              { ar: 'ح', translit: 'Haa' }, { ar: 'غ', translit: 'Ghayn' }, { ar: 'خ', translit: 'Kha' },
            ]
          },
          practice: {
            intro: 'Record yourself articulating each throat letter.', items: [
              { ar: 'ء', translit: 'Hamza' }, { ar: 'ه', translit: 'Ha' }, { ar: 'ع', translit: 'Ayn' },
              { ar: 'ح', translit: 'Haa' }, { ar: 'غ', translit: 'Ghayn' }, { ar: 'خ', translit: 'Kha' },
            ]
          },
          contentPanels: [
            'Six letters are articulated from the throat: ء ه ع ح غ خ.',
            'They are grouped as deep (ء ه), middle (ع ح) and upper (غ خ) throat.',
            'These are the letters learners most often mispronounce.',
            'Mastering them removes many recitation mistakes at once.',
          ],
        },
      ],
      quiz: {
        id: 'tj-quiz-makharij', title: 'Makharij Quiz',
        questions: [
          { id: 'tjq1', question: 'What does “Makharij” refer to?', options: ['Rules of stopping', 'Points of articulation of the letters', 'Rules of elongation', 'Types of madd'], correctAnswerIndex: 1, explanation: 'Makharij are the points in the mouth and throat from which letters are articulated.' },
          { id: 'tjq2', question: 'How many letters are articulated from the throat?', options: ['Three', 'Five', 'Six', 'Eight'], correctAnswerIndex: 2, explanation: 'Six throat letters: ء ه ع ح غ خ.' },
        ],
      },
    },
    {
      id: 'tj-noon-meem',
      title: 'Rules of Noon Sakinah',
      arabicTitle: 'أحكام النون الساكنة',
      description: 'The four rules that govern a silent Noon (and tanween) — the heart of tajweed.',
      order: 2,
      icon: 'Smile',
      sessions: [
        {
          id: 'tj-noon-s1', title: 'Izhar & Idgham', duration: '5 min', xp: 20, order: 1,
          contentPanels: [
            'When a Noon Sakinah (نْ) or tanween meets the six throat letters (ء ه ع ح غ خ), the rule is Izhar — pronounce the noon clearly.',
            'When it meets the letters of يَرْمَلُون (ي ر م ل و ن), the rule is Idgham — the noon merges into the next letter.',
            'Four of them (ي ن م و) merge with ghunnah (a nasal hum); two (ل ر) merge without ghunnah.',
            'These rules keep recitation smooth and connected.',
          ],
        },
        {
          id: 'tj-noon-s2', title: 'Iqlab & Ikhfa', duration: '5 min', xp: 20, order: 2,
          contentPanels: [
            'Iqlab applies before just one letter, ب: the noon is flipped into a hidden meem sound with ghunnah.',
            'Ikhfa applies before the remaining 15 letters: the noon is “hidden” — a light nasal sound between izhar and idgham.',
            'The maths checks out: 6 (Izhar) + 6 (Idgham) + 1 (Iqlab) + 15 (Ikhfa) = all 28 letters.',
            'Each rule has a precise trigger; with practice they become automatic.',
          ],
        },
      ],
      quiz: {
        id: 'tj-quiz-noon', title: 'Noon Sakinah Quiz',
        questions: [
          { id: 'tjq3', question: 'Which rule “hides” the noon with a light nasal sound before 15 letters?', options: ['Izhar', 'Idgham', 'Ikhfa', 'Iqlab'], correctAnswerIndex: 2, explanation: 'Ikhfa hides the noon before its 15 letters with a light ghunnah.' },
          { id: 'tjq4', question: 'Iqlab turns the noon into a hidden meem before which single letter?', options: ['ب', 'م', 'ن', 'ت'], correctAnswerIndex: 0, explanation: 'Iqlab occurs only before ب, flipping the noon into a hidden meem with ghunnah.' },
          { id: 'tjq4b', question: 'The Idgham letters are gathered in which word?', options: ['قطب جد', 'يرملون', 'سكون', 'حروف'], correctAnswerIndex: 1, explanation: 'The six Idgham letters (ي ر م ل و ن) are remembered by the word يَرْمَلُون (Yarmaloon).' },
        ],
      },
    },
    {
      id: 'tj-madd',
      title: 'Madd (Elongation)',
      arabicTitle: 'المد',
      description: 'Stretching the vowels ا و ي for the correct length — neither too short nor too long.',
      order: 3,
      icon: 'Smile',
      sessions: [
        {
          id: 'tj-madd-s1', title: 'Natural Madd', duration: '4 min', xp: 15, order: 1,
          contentPanels: [
            'The madd (elongation) letters are ا و ي. Natural Madd (Madd Tabee‘i) stretches them for two counts (harakat).',
            'It occurs when a madd letter has no hamzah or sukoon after it.',
            'It is the baseline length from which every other madd is measured.',
            'Holding it for exactly two counts gives recitation its steady rhythm.',
          ],
        },
        {
          id: 'tj-madd-s2', title: 'Connected, Separated & Necessary Madd', duration: '5 min', xp: 20, order: 2,
          contentPanels: [
            'Madd Wajib Muttasil (connected): a hamzah follows the madd letter in the same word — stretch 4–5 counts.',
            'Madd Ja’iz Munfasil (separated): the hamzah begins the next word — stretch 4–5 counts (or 2 in some styles).',
            'Madd Lazim (necessary): a sukoon follows the madd letter in the same word — stretch a full 6 counts.',
            'Counting consistently is the secret to a beautiful, measured recitation.',
          ],
        },
      ],
      quiz: {
        id: 'tj-quiz-madd', title: 'Madd Quiz',
        questions: [
          { id: 'tjq5', question: 'How many counts is the natural Madd (Madd Tabee‘i)?', options: ['One', 'Two', 'Four', 'Six'], correctAnswerIndex: 1, explanation: 'Natural Madd is held for two counts (harakat).' },
          { id: 'tjq6', question: 'Madd Wajib Muttasil occurs when a hamzah follows the madd letter…', options: ['in the next word', 'in the same word', 'never', 'at a stop'], correctAnswerIndex: 1, explanation: 'Connected (Muttasil) madd is when the hamzah comes within the same word — stretched 4–5 counts.' },
          { id: 'tjq6b', question: 'How many counts is Madd Lazim (a sukoon after the madd letter)?', options: ['Two', 'Four', 'Five', 'Six'], correctAnswerIndex: 3, explanation: 'Madd Lazim is the longest — a full six counts.' },
        ],
      },
    },
    {
      id: 'tj-qalqalah',
      title: 'Qalqalah',
      arabicTitle: 'القلقلة',
      description: 'The gentle echo or “bounce” given to certain letters when they carry a sukoon.',
      order: 4,
      icon: 'Smile',
      sessions: [
        {
          id: 'tj-qalqalah-s1', title: 'The Five Letters', duration: '4 min', xp: 15, order: 1,
          listen: {
            intro: 'Hear the five qalqalah letters with a sukoon — notice the bounce.', items: [
              { ar: 'قْ', translit: 'Qa(lqalah)' }, { ar: 'طْ', translit: 'Ta' }, { ar: 'بْ', translit: 'Ba' },
              { ar: 'جْ', translit: 'Ja' }, { ar: 'دْ', translit: 'Da' },
            ]
          },
          practice: {
            intro: 'Record yourself bouncing each qalqalah letter.', items: [
              { ar: 'قْ', translit: 'Qa' }, { ar: 'طْ', translit: 'Ta' }, { ar: 'بْ', translit: 'Ba' },
              { ar: 'جْ', translit: 'Ja' }, { ar: 'دْ', translit: 'Da' },
            ]
          },
          contentPanels: [
            'Qalqalah applies to five letters gathered in the phrase قُطْبُ جَدّ: ق ط ب ج د.',
            'When one of them carries a sukoon, it is given a slight echoing “bounce”.',
            'Listen for it at the ends of verses — it adds clarity and beauty.',
            'The bounce is light and quick; it is never an added vowel.',
          ],
        },
        {
          id: 'tj-qalqalah-s2', title: 'Lesser & Greater Qalqalah', duration: '5 min', xp: 20, order: 2,
          contentPanels: [
            'Qalqalah Sughra (lesser) occurs when the letter has a sukoon in the middle of a word.',
            'Qalqalah Kubra (greater) occurs when you stop on the letter at the end of a word — a stronger bounce.',
            'The strongest echo of all comes when you stop on a letter that also carries a shaddah.',
            'Mastering qalqalah makes word-endings crisp and recitation lively.',
          ],
        },
      ],
      quiz: {
        id: 'tj-quiz-qalqalah', title: 'Qalqalah Quiz',
        questions: [
          { id: 'tjq7', question: 'How many Qalqalah letters are there, and how are they remembered?', options: ['Three — حروف', 'Five — قطب جد', 'Six — يرملون', 'Seven — سكون'], correctAnswerIndex: 1, explanation: 'Five letters — ق ط ب ج د — gathered in the phrase قُطْبُ جَدّ (Qutbu Jadd).' },
          { id: 'tjq8', question: 'When is Qalqalah strongest?', options: ['With a fatha', 'In the middle of a word', 'When stopping on the letter (especially with a shaddah)', 'Never'], correctAnswerIndex: 2, explanation: 'The greater Qalqalah — strongest when stopping at the end of a word, and strongest of all with a shaddah.' },
        ],
      },
    },
  ],
};

const ASBAB: Course = {
  id: 'asbab',
  title: 'Reasons of Revelation',
  emoji: '📜',
  accent: '#9333EA',
  subtitle: 'Discover the stories and contexts behind why certain ayahs were revealed.',
  modules: [
    {
      id: 'as-basics',
      title: 'Asbab al-Nuzul Basics',
      arabicTitle: 'أسباب النزول',
      description: 'What “reasons of revelation” means and why this science matters for understanding the Qur’an.',
      order: 1,
      icon: 'BookOpen',
      sessions: [
        {
          id: 'as-basics-s1', title: 'What & Why', duration: '5 min', xp: 20, order: 1,
          contentPanels: [
            'Asbab al-Nuzul are the events or questions that prompted specific verses of the Qur’an to be revealed.',
            'Knowing the context helps us grasp a verse’s precise meaning and wisdom.',
            'Not every verse has a sabab — much of the Qur’an was revealed as general guidance.',
            'This science guards against misreading verses out of their original setting.',
          ],
        },
        {
          id: 'as-basics-s2', title: 'How We Know', duration: '4 min', xp: 15, order: 2,
          contentPanels: [
            'Reasons of revelation are known only through authentic narrations from the Companions who witnessed the events.',
            'Scholars such as al-Wahidi and al-Suyuti carefully collected and graded these reports.',
            'A sound chain of narration (isnad) is essential — context is never guessed.',
            'That is why Asbab al-Nuzul is treated as a precise, evidence-based discipline.',
          ],
        },
      ],
      quiz: {
        id: 'as-quiz-basics', title: 'Basics Quiz',
        questions: [
          { id: 'asq1', question: 'What are Asbab al-Nuzul?', options: ['Rules of recitation', 'The reasons / contexts of revelation', 'Names of the surahs', 'Types of madd'], correctAnswerIndex: 1, explanation: 'They are the events or questions behind the revelation of specific verses.' },
          { id: 'asq2', question: 'How is a reason of revelation reliably established?', options: ['By personal opinion', 'Through an authentic chain of narration', 'By the verse number', 'It cannot be known'], correctAnswerIndex: 1, explanation: 'Only through authentic narration (isnad) from the Companions — never by guessing.' },
        ],
      },
    },
    {
      id: 'as-makki-madani',
      title: 'Makkan vs Madinan',
      arabicTitle: 'مكي ومدني',
      description: 'How the place and stage of revelation shaped the themes of the Qur’an.',
      order: 2,
      icon: 'BookOpen',
      sessions: [
        {
          id: 'as-mm-s1', title: 'Makkan Revelation', duration: '5 min', xp: 20, order: 1,
          contentPanels: [
            'Verses revealed before the Hijrah are “Makkan” and focus on belief (tawhid), the afterlife, and stories of earlier prophets.',
            'They are often short, powerful and rhythmic — calling hearts to faith under persecution.',
            'They built the spiritual foundation of the first Muslims.',
            'Many open with “O mankind…”, addressing all people.',
          ],
        },
        {
          id: 'as-mm-s2', title: 'Madinan Revelation', duration: '5 min', xp: 20, order: 2,
          contentPanels: [
            'Verses revealed after the Hijrah are “Madinan” and address law, worship, community and social justice.',
            'They tend to be longer and detail prayer, zakah, fasting, contracts and governance.',
            'Many open with “O you who believe…”, addressing the established community.',
            'Together, the Makkan and Madinan phases form a complete way of life.',
          ],
        },
      ],
      quiz: {
        id: 'as-quiz-mm', title: 'Context Quiz',
        questions: [
          { id: 'asq3', question: 'Makkan revelation mainly emphasises…', options: ['Inheritance law', 'Belief, tawhid and the afterlife', 'Trade contracts', 'Battle strategy'], correctAnswerIndex: 1, explanation: 'Makkan verses focus on belief, the afterlife and the stories of the prophets.' },
          { id: 'asq4', question: 'Which themes are typical of Madinan verses?', options: ['Law, worship and community', 'Only past stories', 'Only tawhid', 'Tajweed rules'], correctAnswerIndex: 0, explanation: 'Madinan verses deal with law, worship and the life of the community.' },
        ],
      },
    },
    {
      id: 'as-occasions',
      title: 'Famous Occasions',
      arabicTitle: 'مناسبات مشهورة',
      description: 'Well-documented incidents behind specific revelations.',
      order: 3,
      icon: 'BookOpen',
      sessions: [
        {
          id: 'as-occ-s1', title: 'The Slander (Al-Ifk)', duration: '5 min', xp: 20, order: 1,
          contentPanels: [
            'When ‘A’ishah (رضي الله عنها) was falsely accused, the rumour spread and tested the whole community for about a month.',
            'Ten consecutive verses of Surah An-Nur (24:11–20) were revealed, declaring her complete innocence.',
            'The verses condemned spreading rumours and demanded clear evidence before any accusation.',
            'The lesson endures: verify before you speak, and never repeat slander.',
          ],
        },
        {
          id: 'as-occ-s2', title: 'The Change of the Qibla', duration: '4 min', xp: 15, order: 2,
          contentPanels: [
            'The early Muslims first prayed facing Bayt al-Maqdis (Jerusalem).',
            'Around 2 AH, verses of Surah Al-Baqarah (2:142–150, especially 2:144) commanded turning to the Ka‘bah in Makkah.',
            'The Qur’an framed it as a test: “…to make evident who would follow the Messenger from who would turn back” (2:143).',
            'It became a defining sign of the Muslim community’s unity and identity.',
          ],
        },
      ],
      quiz: {
        id: 'as-quiz-occ', title: 'Occasions Quiz',
        questions: [
          { id: 'asq5', question: 'Which surah’s verses declared ‘A’ishah’s innocence in the event of Al-Ifk?', options: ['Al-Baqarah', 'An-Nur', 'Al-Kahf', 'Ya-Sin'], correctAnswerIndex: 1, explanation: 'Surah An-Nur (24:11–20) — ten verses — cleared her of the slander.' },
          { id: 'asq6', question: 'Towards where did the Muslims pray before the change of the Qibla?', options: ['The Ka‘bah', 'Jerusalem (Bayt al-Maqdis)', 'Madinah', 'Mount Uhud'], correctAnswerIndex: 1, explanation: 'They first prayed towards Jerusalem, then were commanded (2:144) to face the Ka‘bah.' },
        ],
      },
    },
  ],
};

export const EXTRA_COURSES: Course[] = [ARABIC, TAJWEED, ASBAB];
