# 🕌 APUMA Muslim Student Portal & Seerah Academy

Welcome to the official, production-ready full-stack workspace of the **Muslim Association of Asia Pacific University (APUMA)**. 

This application provides a dual-purpose portal:
1. **Public Hub & Seerah Academy**: A student-facing portal with custom noticeboards, event rosters, and a **gamified (Duolingo-style) chronological Seerah course** with locks, slide panels, and quiz challenges.
2. **Internal Content Management Workflow**: An administrative pipeline where content writers draft slide carousels, designers submit completed Canva graphics, and executives review, reject, or instantly publish updates.

---

## 📂 Project Directory Structure

Here is the clean layout representing the entire Vite/TypeScript codebase:

```text
/
├── .env.example              # Environment variables template
├── .gitignore                # Untracked compilation outputs
├── index.html                # Entry document head & imports
├── metadata.json             # AI Studio app configurations
├── package.json              # Dependency declarations
├── tsconfig.json             # TS compilations guidelines
├── vite.config.ts            # Vite & PostCSS tailwind plugins
│
└── src/
    ├── App.tsx               # Main routing & state setup
    ├── index.css             # Tailwind @import styling
    ├── main.tsx              # React client bootstrapping
    ├── types.ts              # RBAC and Course schemas definitions
    │
    ├── components/
    │   ├── CourseRoadmap.tsx   # Duolingo-style chronological course
    │   ├── DesignWorkflow.tsx  # Kanban content strategy & Canva workflow
    │   ├── ProtectedRoute.tsx  # Role-Based Access Control wrapper
    │   ├── Navbar.tsx          # Branding header & sandbox switcher
    │   └── Footer.tsx          # Navigation, WhatsApp, & Instagram links
    │
    ├── db/
    │   └── schema.sql        # Production PostgreSQL schema + RLS policies
    │
    └── pages/
        ├── Dashboard.tsx     # Homepage feed & executive spotlights
        ├── JoinUs.tsx        # WhatsApp and registration Google Form paths
        ├── Members.tsx       # Team profiles roster
        └── SeerahCourse.tsx  # Seerah course launch pad
```

---

## 🛠️ Step-by-Step Installation & Local Run

Follow these guidelines to set up and run this application locally:

### 1. Prerequisite Requirements
Ensure you have the latest stable versions of **Node.js** (v18+ recommended) and **npm** installed.

### 2. Clone and Install Dependencies
Initialize npm dependencies in your project workspace:
```bash
# Clean install package node_modules
npm install
```

### 3. Setup Environment variables
Configure your secrets by copying `.env.example`:
```bash
cp .env.example .env
```
Open `.env` and fill out your specific API keys:
- `GEMINI_API_KEY`: Used for any AI-assisted draft translation or content auto-summarizing features.
- `APP_URL`: The URL where your application is hosted.

### 4. Running the Development Server
Launch the development server on port `3000`:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 5. Compiling and Bundling for Production
Build the optimized static files inside `dist/`:
```bash
npm run build
```

---

## 🗄️ Database Integration Guide (Supabase / Postgres)

To deploy the persistent backend, copy and execute the database script located in `/src/db/schema.sql` directly inside your database editor or Supabase SQL Editor.

### Database Schema Highlights
- **`profiles`**: Synchronizes with Supabase Auth (`auth.users`), maintaining user role parameters (`guest`, `member`, `team`, `executive`) and overall academy XP.
- **`course_progress`**: Tracks session completions and highest quiz scores, enforcing strict chronological locks.
- **`content_drafts`**: Powers the Internal Design-Post Workflow pipeline.
- **`system_config`**: Governs global recruitment flags, WhatsApp links, and Google form recruitment URLs.

### Row-Level Security (RLS) Policy Blueprint
The schema enforces strict Role-Based Access Controls (RBAC):
1. **Public Reads**: `profiles`, `team_members`, `published_posts`, and `system_config` are readable by anyone (guests/members).
2. **Personal Scopes**: `course_progress` is private and restricted: users can only select and update their own progression record.
3. **Internal Collaboration**: `content_drafts` (Work Desk) is strictly restricted to authenticated accounts with `team` or `executive` roles.
4. **Administrative CRUD**: Only `executive` roles can toggle global recruitment parameters or delete content drafts from the pipeline.

---

## 🚀 How to Scale Out the Codebase

This repository is built as a modular foundation to make future features extremely easy to add:

### 1. Adding More Seerah Chapters
To expand the learning curriculum, simply add a new `CourseModule` item to the `INITIAL_MODULES` array in `/src/context/AppContext.tsx`. The roadmap path will automatically render the new chapter, connect it with dotted tracks, and enforce locks based on your defined order!

```typescript
// Example of adding a new module:
{
  id: 'wars-detailed',
  title: 'Treaty of Hudaybiyyah',
  arabicTitle: 'صلح الحديبية',
  description: 'Study the diplomatic peace treaty and the expansion of dawah.',
  order: 6,
  icon: 'Compass',
  sessions: [ ... ],
  quiz: { ... }
}
```

### 2. Transitioning from Sandbox to Real Backend (Supabase Client)
When you are ready to replace our client-side `LocalStorage` mock backend with real-time cloud sync, run:
```bash
npm install @supabase/supabase-js
```
Then, inside `/src/context/AppContext.tsx`, replace the `localStorage` getters/setters with active Supabase calls:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Retrieve progress from postgres db:
const { data, error } = await supabase
  .from('course_progress')
  .select('*')
  .single();
```

---

## 🎨 Design System Elements

- **Theme Color Palette**: Deep Emerald Greens (`text-emerald-900`, `bg-emerald-800`), Mint Accents (`text-emerald-500`), Sand background (`bg-[#FCFBF7]`), and Amber Yellow (`text-amber-400`, `bg-amber-400`) representing golden lanterns, light, and achievements.
- **Duolingo Style Mechanics**: Circular roadmap triggers, progress bars, modular pop-up lesson slides, and interactive, encouraging question-feedback loops.
- **Touch-Friendly Targets**: Large clickable buttons (padding matching mobile requirements of `44px` cursor range) and clean hover animations using Tailwind transitions.
