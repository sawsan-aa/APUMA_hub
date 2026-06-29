import React from 'react';
import { CourseRoadmap } from '../components/CourseRoadmap';
import { Award, BookOpen, Sparkles } from 'lucide-react';

export const SeerahCourse: React.FC = () => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      
      {/* Academy Header Intro */}
      <div className="text-center space-y-3 pb-2 max-w-xl mx-auto">
        <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest font-mono block">
          APUMA Educational Hub
        </span>
        <h1 className="text-3xl font-extrabold font-sans text-gray-950 tracking-tight flex items-center justify-center gap-2">
          <span>Seerah Academy</span>
          <span className="text-emerald-700 text-2xl font-serif">الشبكة</span>
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Embark on a gamified, chronological adventure exploring the life and manners of Prophet Muhammad (ﷺ). Earn XP, read bite-sized insights, and challenge yourself with module quizzes!
        </p>
      </div>

      {/* Embedded Roadmap Component */}
      <section className="bg-amber-50/10 rounded-3xl">
        <CourseRoadmap />
      </section>

      {/* Sidenote/Guidelines for child friendliness */}
      <div className="bg-emerald-50/50 rounded-3xl border border-emerald-100 p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-5">
        <div className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-sm text-emerald-600 flex-shrink-0">
          <BookOpen size={28} />
        </div>
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-emerald-900 font-sans flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-500" />
            Designed for Active Learners
          </h4>
          <p className="text-emerald-800/80 leading-relaxed">
            Our curriculum is constructed in brief, conversational micro-facts specifically tailored for individuals with busy schedules, students preparing for exams, and younger children. Enjoy learning Seerah in an easy and encouraging environment!
          </p>
        </div>
      </div>

    </div>
  );
};
