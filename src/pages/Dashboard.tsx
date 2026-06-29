import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Users, 
  FileText, 
  BookOpen, 
  MessageSquare,
  Instagram,
  Heart
} from 'lucide-react';

const isEmoji = (str: string) => {
  if (!str) return false;
  return str.length <= 4 && !str.includes('/') && !str.includes('.');
};

export const Dashboard: React.FC = () => {
  const { posts, members, systemConfig } = useApp();

  // Filter posts to show only events / announcements or normal articles
  const latestEvents = posts.filter(p => p.category === 'event').slice(0, 2);
  const latestArticles = posts.filter(p => p.category === 'post').slice(0, 3);

  // Top 3 leaders
  const topLeaders = members.slice(0, 3);

  return (
    <div className="space-y-16">
      
      {/* 1. VISUAL MINI-HERO WELCOME BANNERS */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl overflow-hidden shadow-xl border border-emerald-700 relative">
        {/* Background Subtle Elements */}
        <div className="absolute top-0 right-0 p-32 bg-amber-400 rounded-full blur-3xl opacity-15 translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-0 p-24 bg-mint-400 rounded-full blur-3xl opacity-10 -translate-x-12 translate-y-12"></div>

        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-700/60 text-amber-300 text-[10px] font-bold uppercase tracking-widest border border-emerald-600/50">
            <Sparkles size={11} className="animate-pulse" />
            Empowering Muslim Students Since 2012
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold font-sans tracking-tight leading-tight">
            Learn, Grow & Belong with <span className="text-amber-400">APUMA</span>
          </h1>

          <p className="text-emerald-100 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            Welcome to the Muslim Association of Asia Pacific University (APUMA). Explore our gamified Duolingo-style Seerah academy, browse visual campus guidelines, and connect with a vibrant global student community!
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4">
            <Link
              id="btn-hero-academy"
              to="/academy"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-amber-400 text-emerald-950 font-extrabold text-sm hover:bg-amber-300 transition-all shadow-md flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <BookOpen size={16} />
              Start Seerah Course (Duolingo Style)
            </Link>

            <Link
              id="btn-hero-join"
              to="/join"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-900/60 text-white border border-emerald-700/80 font-bold text-sm hover:bg-emerald-800/80 transition-all flex items-center justify-center gap-2"
            >
              <Users size={16} />
              Become a Member
            </Link>
          </div>
        </div>
      </section>

      {/* 2. LATEST POSTS & GRAPHICS GRID SECTION */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider font-mono block">
              Knowledge Sharing
            </span>
            <h2 className="text-2xl font-bold font-sans text-gray-950">
              Latest Infographics & Posts
            </h2>
          </div>

          <Link
            id="btn-see-all-posts"
            to="/feed"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            See All Posts
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.length === 0 ? (
            <div className="md:col-span-3 text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-xs text-gray-500">No approved articles found on the feed yet.</p>
            </div>
          ) : (
            latestArticles.map((article) => (
              <article 
                key={article.id}
                className="bg-white rounded-3xl border border-emerald-100/60 overflow-hidden shadow-xl shadow-emerald-950/5 flex flex-col justify-between hover:shadow-md hover:border-emerald-200 transition duration-300"
              >
                <div>
                  <div className="aspect-video relative bg-slate-100">
                    <img 
                      src={article.images[0]} 
                      alt={article.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      📖 Infographic
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-mono font-bold text-gray-400">
                      Published: {article.date}
                    </span>
                    <h3 className="font-bold text-base text-gray-900 line-clamp-2 hover:text-emerald-800 transition">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {article.content}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">By: {article.author}</span>
                  <Link 
                    id={`btn-read-post-${article.id}`}
                    to="/feed" 
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    Read Slide Script →
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* 3. LATEST POSTERS & EVENTS TIMELINE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider font-mono block">
              Join Active Life
            </span>
            <h2 className="text-2xl font-bold font-sans text-gray-950">
              Upcoming Events & Assemblies
            </h2>
          </div>

          <Link
            id="btn-see-all-events"
            to="/feed"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            See All Events
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Events Grid split into layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {latestEvents.length === 0 ? (
            <div className="md:col-span-2 text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-xs text-gray-500">No events scheduled. Check back later, sister/brother!</p>
            </div>
          ) : (
            latestEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-amber-50/20 border border-amber-100/50 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-center shadow-xl shadow-amber-950/2 hover:shadow-md hover:border-amber-200 transition duration-300"
              >
                <div className="w-full sm:w-40 h-40 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-amber-100">
                  <img 
                    src={event.images[0]} 
                    alt={event.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 text-[9px] font-extrabold uppercase tracking-wide">
                      ⚡ UPCOMING EVENT
                    </span>
                    <h3 className="font-extrabold text-lg text-gray-900 mt-2 font-sans tracking-tight">
                      {event.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                    {event.content}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-medium text-slate-500 border-t border-amber-100/60 pt-3">
                    <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                      <Calendar size={12} />
                      Shared: {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      APU Campus
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. WHO'S BEHIND APUMA? EXECUTIVE SPOTLIGHT */}
      <section className="bg-white rounded-3xl border border-emerald-100/60 p-8 shadow-xl shadow-emerald-950/5 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-gray-50 pb-5">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider font-mono block">
              Meet our Leadership
            </span>
            <h2 className="text-2xl font-bold font-sans text-gray-950">
              Who’s Behind APUMA?
            </h2>
            <p className="text-xs text-gray-500 mt-1">Get to know the executive team dedicated to serving the APU Muslim student body.</p>
          </div>

          <Link
            id="btn-see-all-members"
            to="/team"
            className="px-5 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 border border-emerald-100 transition flex items-center gap-1"
          >
            See All Members
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Leaders cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topLeaders.map((leader) => (
            <div 
              key={leader.id}
              className="flex flex-col items-center text-center p-6 bg-slate-50/50 rounded-3xl border border-slate-100/80 hover:shadow transition duration-300"
            >
              {isEmoji(leader.avatar) ? (
                <div className="w-24 h-24 rounded-3xl bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-4xl shadow-md mb-4 select-none">
                  {leader.avatar}
                </div>
              ) : (
                <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-emerald-500 mb-4 bg-slate-100 shadow-md">
                  <img 
                    src={leader.avatar} 
                    alt={leader.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-extrabold font-sans text-sm text-gray-900">{leader.name}</h3>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">
                  {leader.roleName}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed pt-2 line-clamp-3">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
