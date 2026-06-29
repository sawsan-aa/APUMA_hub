-- ==========================================
-- APUMA Muslim Association Database Schema
-- Production-Ready DDL with Row Level Security (RLS)
-- Target: PostgreSQL (compatible with Supabase / Cloud SQL)
-- ==========================================

-- Enable UUID generation extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define custom enum type for User Roles
CREATE TYPE user_role AS ENUM ('guest', 'member', 'team', 'executive');

-- 1. Profiles Table (Linked to Supabase Auth Users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'member',
    avatar TEXT,
    xp INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Team Members Profiles
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role_name TEXT NOT NULL,
    category TEXT CHECK (category IN ('executive', 'team')) NOT NULL,
    bio TEXT NOT NULL,
    avatar TEXT NOT NULL,
    instagram TEXT,
    linkedin TEXT,
    display_order INTEGER NOT NULL DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Course Progress Table
CREATE TABLE IF NOT EXISTS public.course_progress (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    completed_sessions TEXT[] NOT NULL DEFAULT '{}', -- Array of session IDs completed
    completed_modules TEXT[] NOT NULL DEFAULT '{}',  -- Array of module IDs passed
    quiz_scores JSONB NOT NULL DEFAULT '{}'::jsonb, -- Map of { moduleId: highest_score }
    total_xp INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Content Drafts (Design-Post Workflow)
CREATE TABLE IF NOT EXISTS public.content_drafts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    brief TEXT NOT NULL,
    panels TEXT[] NOT NULL, -- Array of text slides/carousel panels
    status TEXT CHECK (status IN ('draft', 'designed', 'approved')) NOT NULL DEFAULT 'draft',
    design_images TEXT[] DEFAULT '{}', -- Array of uploaded image asset URLs
    submitted_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    designed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    designed_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE
);

-- 5. Published Posts (Events, Articles, Posters)
CREATE TABLE IF NOT EXISTS public.published_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    images TEXT[] NOT NULL, -- Array of image links (Canva panels uploaded)
    category TEXT CHECK (category IN ('post', 'event', 'announcement')) NOT NULL DEFAULT 'post',
    author TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. System Configuration (Managed by Executives)
CREATE TABLE IF NOT EXISTS public.system_config (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Single row enforcement
    recruitment_open BOOLEAN NOT NULL DEFAULT TRUE,
    recruitment_form_url TEXT NOT NULL DEFAULT 'https://forms.gle/apuma-recruitment-example',
    whatsapp_group_url TEXT NOT NULL DEFAULT 'https://chat.whatsapp.com/apuma-community-example',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Initial System Config Row
INSERT INTO public.system_config (id, recruitment_open, recruitment_form_url, whatsapp_group_url)
VALUES (1, TRUE, 'https://forms.gle/apuma-recruitment-example', 'https://chat.whatsapp.com/apuma-community-example')
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.published_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are readable by anyone"
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profiles"
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Team Members Policies
CREATE POLICY "Team members are readable by anyone"
    ON public.team_members FOR SELECT USING (true);

CREATE POLICY "Only Executives can modify team member records"
    ON public.team_members FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'executive'
        )
    );

-- 3. Course Progress Policies
CREATE POLICY "Users can only select their own progress"
    ON public.course_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
    ON public.course_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own initial progress"
    ON public.course_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Content Drafts Policies (Design-Post Workflow RBAC)
CREATE POLICY "Drafts are readable by APUMA Team and Executives"
    ON public.content_drafts FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role IN ('team', 'executive')
        )
    );

CREATE POLICY "Drafts can be created by APUMA Team and Executives"
    ON public.content_drafts FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role IN ('team', 'executive')
        )
    );

CREATE POLICY "Drafts can be updated by APUMA Team and Executives"
    ON public.content_drafts FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role IN ('team', 'executive')
        )
    );

CREATE POLICY "Drafts can be deleted only by Executives"
    ON public.content_drafts FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'executive'
        )
    );

-- 5. Published Posts Policies
CREATE POLICY "Published posts are readable by anyone"
    ON public.published_posts FOR SELECT USING (true);

CREATE POLICY "Only Executives can manage published posts directly"
    ON public.published_posts FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'executive'
        )
    );

-- 6. System Config Policies
CREATE POLICY "System config is readable by anyone"
    ON public.system_config FOR SELECT USING (true);

CREATE POLICY "Only Executives can update system config"
    ON public.system_config FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'executive'
        )
    );

-- ==========================================
-- DATABASE TRIGGERS
-- ==========================================

-- Automatically create a profile and progress entry when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role, avatar)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'name', 'New Member'),
        'member',
        COALESCE(new.raw_user_meta_data->>'avatar_url', '')
    );
    
    INSERT INTO public.course_progress (user_id)
    VALUES (new.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
