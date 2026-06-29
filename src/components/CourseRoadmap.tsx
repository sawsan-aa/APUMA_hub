import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseModule, CourseSession, CourseQuestion } from '../types';
import { 
  Compass, 
  BookOpen, 
  Milestone, 
  Building, 
  Shield, 
  Heart, 
  Smile, 
  Lock, 
  CheckCircle, 
  Play, 
  Award, 
  ArrowRight, 
  ArrowLeft,
  X,
  Sparkles,
  AlertCircle,
  Clock,
  UserCheck,
  Video
} from 'lucide-react';

export const CourseRoadmap: React.FC = () => {
  const { 
    courseModules, 
    progress, 
    completeSession, 
    completeModuleQuiz,
    currentUser,
    loginAs,
    resetProgress
  } = useApp();

  // Active modal/interactive states
  const [activeSession, setActiveSession] = useState<CourseSession | null>(null);
  const [activeSessionModule, setActiveSessionModule] = useState<CourseModule | null>(null);
  const [currentPanelIndex, setCurrentPanelIndex] = useState<number>(0);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const [activeQuizModule, setActiveQuizModule] = useState<CourseModule | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  // Selected module in roadmap detail panel
  const [selectedModuleId, setSelectedModuleId] = useState<string>('before-risalah');

  // Map icons to actual components
  const getIconComponent = (iconName: string, size: number = 24, className: string = '') => {
    switch (iconName) {
      case 'Compass': return <Compass size={size} className={className} />;
      case 'BookOpen': return <BookOpen size={size} className={className} />;
      case 'Milestone': return <Milestone size={size} className={className} />;
      case 'Building': return <Building size={size} className={className} />;
      case 'ShieldAlert': return <Shield size={size} className={className} />;
      case 'Heart': return <Heart size={size} className={className} />;
      case 'Smile': return <Smile size={size} className={className} />;
      default: return <BookOpen size={size} className={className} />;
    }
  };

  // Check if a module is unlocked
  const isModuleUnlocked = (module: CourseModule) => {
    if (module.order === 1) return true;
    
    // Find the previous module
    const previousModule = courseModules.find(m => m.order === module.order - 1);
    if (!previousModule) return false;

    // Previous module's quiz must be completed (passed with >= 70%)
    return progress.completedModuleIds.includes(previousModule.id);
  };

  // Check if all sessions in a module are completed
  const areAllSessionsCompleted = (module: CourseModule) => {
    return module.sessions.every(session => progress.completedSessionIds.includes(session.id));
  };

  // Handle Session Start
  const startSession = (module: CourseModule, session: CourseSession) => {
    setActiveSession(session);
    setActiveSessionModule(module);
    setCurrentPanelIndex(0);
    setShowVideo(false);
  };

  // Handle Quiz Start
  const startQuiz = (module: CourseModule) => {
    setActiveQuizModule(module);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setShowQuizResult(false);
  };

  // Next Session Panel (Slide)
  const handleNextPanel = () => {
    if (!activeSession) return;
    if (currentPanelIndex < activeSession.contentPanels.length - 1) {
      setCurrentPanelIndex(prev => prev + 1);
    } else {
      // Completed session!
      completeSession(activeSessionModule!.id, activeSession.id, activeSession.xp);
      setActiveSession(null);
      setActiveSessionModule(null);
    }
  };

  // Submit Answer
  const handleCheckAnswer = () => {
    if (!activeQuizModule || selectedOption === null) return;
    
    const question = activeQuizModule.quiz.questions[currentQuestionIndex];
    if (selectedOption === question.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
    setIsAnswerChecked(true);
  };

  // Next Question or complete quiz
  const handleNextQuestion = () => {
    if (!activeQuizModule) return;
    
    const totalQuestions = activeQuizModule.quiz.questions.length;
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      // Show results
      const finalScorePercentage = Math.round((score / totalQuestions) * 100);
      completeModuleQuiz(activeQuizModule.id, finalScorePercentage);
      setShowQuizResult(true);
    }
  };

  const selectedModule = courseModules.find(m => m.id === selectedModuleId) || courseModules[0];
  const selectedUnlocked = isModuleUnlocked(selectedModule);

  return (
    <div className="w-full">
      {/* Upper Status Bar */}
      <div className="bg-emerald-800 text-white rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700 shadow-lg shadow-emerald-950/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-700/60 rounded-2xl border border-emerald-600">
            <Award className="text-amber-400" size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold font-sans">Your Seerah Academy Progress</h3>
            <p className="text-xs text-emerald-100 flex items-center gap-1.5 mt-1">
              <span className="font-bold text-amber-300 font-mono text-sm">{progress.totalXp} XP</span> earned 
              • <span className="font-mono">{progress.completedSessionIds.length}</span> sessions completed
              • <span className="font-mono">{progress.completedModuleIds.length}</span> modules unlocked
            </p>
          </div>
        </div>

        {/* Sync Prompt or Role Guide */}
        <div className="flex flex-wrap items-center gap-2">
          {currentUser?.role === 'guest' ? (
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200 px-4 py-2.5 rounded-2xl text-xs flex flex-col sm:flex-row items-center gap-3">
              <span>⚠️ Playing as <strong>Guest</strong> (temporary save).</span>
              <button 
                id="btn-login-member-roadmap"
                onClick={() => loginAs('member')}
                className="bg-amber-400 text-emerald-950 px-3 py-1 font-semibold rounded-xl hover:bg-amber-300 transition text-[11px] cursor-pointer"
              >
                Sign In to Save
              </button>
            </div>
          ) : (
            <div className="bg-emerald-700/50 border border-emerald-600 text-emerald-100 px-4 py-2 rounded-2xl text-xs flex items-center gap-2">
              <UserCheck size={14} className="text-amber-400" />
              <span>Synced with cloud for <strong>{currentUser?.name}</strong></span>
            </div>
          )}
          <button 
            id="btn-reset-academy"
            onClick={resetProgress}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-900/60 text-emerald-300 hover:bg-emerald-900 hover:text-white transition cursor-pointer"
          >
            Reset Acad
          </button>
        </div>
      </div>

      {/* Main Roadmap Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Vertical Roadmap Path (Duolingo Style) */}
        <div className="lg:col-span-5 flex flex-col items-center py-6 bg-white rounded-3xl border border-emerald-100/60 p-6 shadow-xl shadow-emerald-950/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 bg-emerald-50 rounded-full blur-3xl opacity-50 -z-0"></div>
          
          <h3 className="font-bold font-sans text-emerald-900 text-lg mb-8 uppercase tracking-wider text-center z-10 flex items-center gap-2">
            <Sparkles className="text-amber-500 animate-spin" size={18} />
            Seerah Pathway
          </h3>

          <div className="flex flex-col items-center gap-4 w-full max-w-xs relative z-10">
            {courseModules.map((module, idx) => {
              const unlocked = isModuleUnlocked(module);
              const isSelected = selectedModuleId === module.id;
              const isCompleted = progress.completedModuleIds.includes(module.id);
              
              // Custom staggered alignment (snaking roadmap path)
              const offsetClasses = [
                'translate-x-0',     // Step 1: Center
                'translate-x-6',     // Step 2: Slightly Right
                'translate-x-12',    // Step 3: Right
                'translate-x-6',     // Step 4: Slightly Right
                'translate-x-0',     // Step 5: Center
                '-translate-x-6',    // Step 6: Slightly Left
                '-translate-x-12',   // Step 7: Left
              ];
              const alignmentClass = offsetClasses[idx % offsetClasses.length];

              return (
                <div key={module.id} className="flex flex-col items-center w-full">
                  {/* Connective Line (except first) */}
                  {idx > 0 && (
                    <div className={`w-1 h-12 -my-2 border-l-4 border-dashed ${
                      unlocked ? 'border-emerald-500' : 'border-gray-200'
                    }`}></div>
                  )}

                  {/* Circle Button */}
                  <button
                    id={`btn-module-circle-${module.id}`}
                    onClick={() => setSelectedModuleId(module.id)}
                    className={`group relative flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 shadow-md transition-all duration-300 transform hover:scale-110 cursor-pointer ${alignmentClass} ${
                      isSelected 
                        ? 'bg-amber-400 border-emerald-600 ring-4 ring-amber-200 text-emerald-950' 
                        : unlocked
                          ? isCompleted
                            ? 'bg-emerald-600 border-emerald-700 text-white'
                            : 'bg-emerald-100 border-emerald-500 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {/* Tiny Lock Icon if locked */}
                    {!unlocked && (
                      <span className="absolute -top-1 -right-1 p-1 bg-gray-400 rounded-full text-white border border-white">
                        <Lock size={10} />
                      </span>
                    )}

                    {/* Tiny Complete Check if passed */}
                    {isCompleted && (
                      <span className="absolute -top-1 -right-1 p-1 bg-emerald-500 rounded-full text-white border border-white">
                        <CheckCircle size={10} />
                      </span>
                    )}

                    {getIconComponent(module.icon, 28)}

                    {/* Order Tag */}
                    <span className="absolute -bottom-1.5 bg-emerald-900 text-amber-300 font-bold font-mono text-[9px] px-2 py-0.5 rounded-full border border-emerald-700">
                      Mod {module.order}
                    </span>
                  </button>

                  {/* Simple text label */}
                  <span className={`text-xs font-bold font-sans mt-3 text-center truncate w-32 ${alignmentClass} ${
                    isSelected ? 'text-amber-600 font-extrabold' : 'text-gray-700'
                  }`}>
                    {module.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Module Detail Board */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-emerald-100/60 p-8 shadow-xl shadow-emerald-950/5 min-h-[500px] flex flex-col justify-between">
          <div>
            <div className="border-b border-gray-100 pb-5 mb-6">
              <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                Selected Module {selectedModule.order} of {courseModules.length}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-2xl font-bold font-sans text-gray-900 tracking-tight flex items-center gap-2">
                  {selectedModule.title}
                  {selectedModule.arabicTitle && (
                    <span className="text-emerald-600 font-normal font-sans text-lg border-l border-gray-200 pl-2">
                      {selectedModule.arabicTitle}
                    </span>
                  )}
                </h2>
                
                {/* State Badges */}
                <div>
                  {!selectedUnlocked ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100">
                      <Lock size={12} />
                      Locked
                    </span>
                  ) : progress.completedModuleIds.includes(selectedModule.id) ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                      <CheckCircle size={12} />
                      Passed • {progress.quizScores[selectedModule.id]}%
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200">
                      In Progress
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {selectedModule.description}
              </p>
            </div>

            {/* List of bite-sized sessions */}
            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-bold font-sans text-gray-400 uppercase tracking-wider mb-2">
                Bite-Sized Sessions ({selectedModule.sessions.length})
              </h4>
              
              {selectedModule.sessions.map((session) => {
                const isSessionDone = progress.completedSessionIds.includes(session.id);
                return (
                  <div 
                    key={session.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition ${
                      !selectedUnlocked 
                        ? 'bg-gray-50 border-gray-100 opacity-60' 
                        : isSessionDone
                          ? 'bg-emerald-50/50 border-emerald-100/60 hover:bg-emerald-50'
                          : 'bg-white border-emerald-100/80 hover:shadow-md hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-xl ${
                        isSessionDone ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {getIconComponent(selectedModule.icon, 18)}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-gray-900">{session.title}</h5>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {session.duration}
                          </span>
                          <span>•</span>
                          <span className="text-amber-600 font-semibold">+{session.xp} XP</span>
                        </div>
                      </div>
                    </div>

                    <button
                      id={`btn-start-session-${session.id}`}
                      disabled={!selectedUnlocked}
                      onClick={() => startSession(selectedModule, session)}
                      className={`px-3 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1 cursor-pointer ${
                        !selectedUnlocked
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : isSessionDone
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                      }`}
                    >
                      {isSessionDone ? 'Review' : 'Start'}
                      <Play size={12} fill="currentColor" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Module Quiz Trigger */}
          <div className="bg-emerald-50/40 rounded-2xl border border-emerald-100 p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                  <Award size={16} className="text-amber-500" />
                  Module Challenge: Final Quiz
                </h4>
                <p className="text-xs text-emerald-800/80 mt-1">
                  Complete all sessions above and score at least <strong>70%</strong> to pass and unlock the next Seerah chapter!
                </p>
              </div>

              <button
                id={`btn-start-quiz-${selectedModule.id}`}
                disabled={!selectedUnlocked || (!areAllSessionsCompleted(selectedModule) && !progress.completedModuleIds.includes(selectedModule.id))}
                onClick={() => startQuiz(selectedModule)}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow transition cursor-pointer ${
                  !selectedUnlocked || (!areAllSessionsCompleted(selectedModule) && !progress.completedModuleIds.includes(selectedModule.id))
                    ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    : 'bg-amber-400 text-emerald-950 border border-amber-400 hover:bg-amber-300'
                }`}
              >
                Take Module Quiz
                <ArrowRight size={14} />
              </button>
            </div>
            
            {!areAllSessionsCompleted(selectedModule) && selectedUnlocked && (
              <span className="text-[10px] text-amber-700/80 mt-2 block font-mono">
                ⚠️ Locked: Please complete all {selectedModule.sessions.length} sessions above before taking this quiz.
              </span>
            )}
            {!selectedUnlocked && (
              <span className="text-[10px] text-rose-700 block mt-2 font-mono">
                ⚠️ Locked: Complete the previous module's quiz to unlock this entire course block.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SESSION INTERACTIVE MODAL (Duolingo Style Bite-Sized Cards) */}
      {/* ======================================================== */}
      {activeSession && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl overflow-hidden border border-emerald-100 shadow-2xl flex flex-col justify-between max-h-[90vh]">
            
            {/* Header: Progress bar */}
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between gap-4">
              <div className="flex-1">
                <span className="text-[10px] font-bold font-mono text-amber-300 block mb-1 uppercase tracking-wider">
                  {activeSessionModule?.title} • {activeSession.title}
                </span>
                {/* Progress bar */}
                <div className="w-full bg-emerald-950/60 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-amber-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentPanelIndex + (showVideo ? 1 : 0)) / (activeSession.contentPanels.length + (activeSession.videoUrl ? 1 : 0))) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button
                id="btn-close-session"
                onClick={() => {
                  setActiveSession(null);
                  setActiveSessionModule(null);
                }}
                className="p-1.5 rounded-full hover:bg-emerald-700 text-white/80 hover:text-white transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body of Session Card */}
            <div className="p-8 overflow-y-auto flex-1 flex flex-col items-center justify-center min-h-[250px] bg-amber-50/10">
              {/* If we have a video and are on slide index 0 or as selected */}
              {activeSession.videoUrl && showVideo ? (
                <div className="w-full">
                  <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1 mb-2 font-mono">
                    <Video size={13} />
                    Watch Interactive Lesson:
                  </span>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md border border-emerald-100/50 mb-4 bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={activeSession.videoUrl}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    Watch this short, beneficial overview on Seerah history. Once finished, click Next to resume!
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  {/* Decorative Islamic Star Icon or similar */}
                  <div className="inline-flex p-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 mb-2">
                    {getIconComponent(activeSessionModule?.icon || 'BookOpen', 32, 'animate-bounce')}
                  </div>
                  
                  <p className="text-lg font-medium text-gray-900 leading-relaxed font-sans max-w-sm mx-auto">
                    "{activeSession.contentPanels[currentPanelIndex]}"
                  </p>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {activeSession.videoUrl && (
                  <button
                    id="btn-toggle-video"
                    onClick={() => setShowVideo(!showVideo)}
                    className="px-3.5 py-2.5 rounded-xl border border-emerald-100 text-emerald-800 text-xs font-bold hover:bg-emerald-50 transition flex items-center gap-1 cursor-pointer"
                  >
                    <Video size={14} />
                    {showVideo ? 'Show Slides' : 'Watch Video'}
                  </button>
                )}
                {currentPanelIndex > 0 && !showVideo && (
                  <button
                    id="btn-prev-panel"
                    onClick={() => setCurrentPanelIndex(prev => prev - 1)}
                    className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}
              </div>

              <button
                id="btn-next-panel-action"
                onClick={handleNextPanel}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition flex items-center gap-1 cursor-pointer"
              >
                {currentPanelIndex === activeSession.contentPanels.length - 1 && (!activeSession.videoUrl || showVideo) ? 'Complete Session (+XP)' : 'Next Slide'}
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* QUIZ INTERACTIVE MODAL */}
      {/* ======================================================== */}
      {activeQuizModule && (
        <div className="fixed inset-0 bg-slate-900/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl overflow-hidden border border-emerald-100 shadow-2xl flex flex-col justify-between max-h-[95vh]">
            
            {/* Header */}
            <div className="p-4 bg-amber-400 text-emerald-950 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold font-mono text-emerald-800 uppercase tracking-widest block">
                  QUIZ CHALLENGE
                </span>
                <h3 className="text-sm font-bold">{activeQuizModule.quiz.title}</h3>
              </div>

              <button
                id="btn-close-quiz"
                onClick={() => {
                  setActiveQuizModule(null);
                }}
                className="p-1.5 rounded-full hover:bg-amber-300 text-emerald-950 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quiz Body */}
            <div className="p-8 overflow-y-auto flex-1">
              {!showQuizResult ? (
                <div className="space-y-6">
                  {/* Progress Header */}
                  <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                    <span>Question {currentQuestionIndex + 1} of {activeQuizModule.quiz.questions.length}</span>
                    <span className="text-emerald-700 font-bold">Passed Score: 70%</span>
                  </div>

                  {/* Question */}
                  <h4 className="text-lg font-bold font-sans text-gray-900 leading-relaxed">
                    {activeQuizModule.quiz.questions[currentQuestionIndex].question}
                  </h4>

                  {/* Options List */}
                  <div className="space-y-3">
                    {activeQuizModule.quiz.questions[currentQuestionIndex].options.map((option, oIdx) => {
                      const isSelected = selectedOption === oIdx;
                      const isCorrect = oIdx === activeQuizModule.quiz.questions[currentQuestionIndex].correctAnswerIndex;
                      
                      let optionStyle = 'border-gray-200 bg-white hover:bg-slate-50 text-gray-800';
                      if (isSelected) {
                        optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-500/20';
                      }
                      if (isAnswerChecked) {
                        if (isCorrect) {
                          optionStyle = 'border-emerald-600 bg-emerald-100 text-emerald-950 font-bold';
                        } else if (isSelected) {
                          optionStyle = 'border-rose-300 bg-rose-50 text-rose-950 line-through';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          id={`btn-quiz-option-${oIdx}`}
                          disabled={isAnswerChecked}
                          onClick={() => setSelectedOption(oIdx)}
                          className={`w-full p-4 rounded-2xl border text-left text-sm transition flex items-center justify-between cursor-pointer ${optionStyle}`}
                        >
                          <span>{option}</span>
                          {isAnswerChecked && isCorrect && (
                            <span className="text-emerald-700 font-bold text-xs bg-white px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wide">
                              Correct!
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Box */}
                  {isAnswerChecked && (
                    <div className={`p-4 rounded-2xl text-xs border leading-relaxed ${
                      selectedOption === activeQuizModule.quiz.questions[currentQuestionIndex].correctAnswerIndex
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                        : 'bg-rose-50 border-rose-100 text-rose-800'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                        {selectedOption === activeQuizModule.quiz.questions[currentQuestionIndex].correctAnswerIndex ? (
                          <>🎉 MashaAllah! Excellent!</>
                        ) : (
                          <>📖 Benefit & Reflect:</>
                        )}
                      </div>
                      <p>{activeQuizModule.quiz.questions[currentQuestionIndex].explanation}</p>
                    </div>
                  )}
                </div>
              ) : (
                // QUIZ SUMMARY SCREEN
                <div className="text-center py-6 space-y-5">
                  <div className="inline-flex p-5 rounded-full bg-amber-100 text-amber-600 border-2 border-amber-200">
                    <Award size={48} className="animate-spin" />
                  </div>
                  
                  <h3 className="text-2xl font-bold font-sans text-gray-900">
                    Quiz Challenge Complete!
                  </h3>

                  <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 max-w-sm mx-auto">
                    <span className="text-xs uppercase font-semibold text-emerald-800 tracking-wider">
                      Your Score
                    </span>
                    <p className="text-5xl font-extrabold text-emerald-800 mt-2 font-sans">
                      {Math.round((score / activeQuizModule.quiz.questions.length) * 100)}%
                    </p>
                    <p className="text-xs text-gray-500 mt-2 font-mono">
                      ({score} of {activeQuizModule.quiz.questions.length} questions correct)
                    </p>
                  </div>

                  {Math.round((score / activeQuizModule.quiz.questions.length) * 100) >= 70 ? (
                    <div className="space-y-2 text-sm text-emerald-800 font-medium px-4">
                      <p className="text-emerald-700 font-bold">🎉 Congratulations, brother/sister! You Passed!</p>
                      <p className="text-gray-500 text-xs">The next chronological Seerah module has been unlocked for your journey.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm text-rose-800 font-medium px-4">
                      <p className="text-rose-600 font-bold">⚠️ Almost there! Try again!</p>
                      <p className="text-gray-500 text-xs">You need at least 70% to pass this module and unlock subsequent chapters.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quiz Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-end gap-3">
              {!showQuizResult ? (
                <>
                  {!isAnswerChecked ? (
                    <button
                      id="btn-quiz-check"
                      disabled={selectedOption === null}
                      onClick={handleCheckAnswer}
                      className={`px-6 py-3 rounded-xl font-bold text-sm transition flex items-center gap-1.5 cursor-pointer ${
                        selectedOption === null 
                          ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                      }`}
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      id="btn-quiz-next"
                      onClick={handleNextQuestion}
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center gap-1.5 cursor-pointer"
                    >
                      {currentQuestionIndex === activeQuizModule.quiz.questions.length - 1 ? 'Show Results' : 'Next Question'}
                      <ArrowRight size={14} />
                    </button>
                  )}
                </>
              ) : (
                <button
                  id="btn-quiz-finish"
                  onClick={() => {
                    setActiveQuizModule(null);
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition cursor-pointer"
                >
                  Close & Back to Road
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
