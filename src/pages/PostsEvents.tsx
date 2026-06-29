import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PublishedPost } from '../types';
import { 
  Calendar, 
  MapPin, 
  User, 
  BookOpen, 
  X, 
  Tag, 
  Sparkles, 
  Download,
  Copy,
  Check,
  Trash2
} from 'lucide-react';

export const PostsEvents: React.FC = () => {
  const { posts, currentUser, deletePost } = useApp();
  const userRole = currentUser?.role || 'guest';
  const isLeader = userRole === 'team' || userRole === 'executive' || userRole === 'admin';

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'post' | 'event' | 'announcement'>('all');
  const [selectedPost, setSelectedPost] = useState<PublishedPost | null>(null);

  // Copying helper state
  const [isCopied, setIsCopied] = useState(false);

  // Filter posts based on category selection
  const filteredPosts = posts.filter(post => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'event':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'announcement':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  const handleCopyCaption = (post: PublishedPost) => {
    navigator.clipboard.writeText(post.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center space-y-3 pb-2">
        <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest font-mono block">
          APUMA Noticeboard
        </span>
        <h1 className="text-3xl font-extrabold font-sans text-gray-950 tracking-tight">
          Feeds, Posters & Events
        </h1>
        <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
          Explore educational slides, student announcements, and beneficial reminders designed by the APUMA design committees.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-y border-gray-100 py-4">
        <button
          id="btn-filter-all"
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-emerald-800 text-white'
              : 'bg-slate-50 border border-gray-200 text-gray-600 hover:bg-slate-100'
          }`}
        >
          All Updates ({posts.length})
        </button>
        <button
          id="btn-filter-posts"
          onClick={() => setSelectedCategory('post')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedCategory === 'post'
              ? 'bg-emerald-800 text-white'
              : 'bg-slate-50 border border-gray-200 text-gray-600 hover:bg-slate-100'
          }`}
        >
          Infographics ({posts.filter(p => p.category === 'post').length})
        </button>
        <button
          id="btn-filter-events"
          onClick={() => setSelectedCategory('event')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedCategory === 'event'
              ? 'bg-emerald-800 text-white'
              : 'bg-slate-50 border border-gray-200 text-gray-600 hover:bg-slate-100'
          }`}
        >
          Campaigns & Events ({posts.filter(p => p.category === 'event').length})
        </button>
        <button
          id="btn-filter-announcements"
          onClick={() => setSelectedCategory('announcement')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedCategory === 'announcement'
              ? 'bg-emerald-800 text-white'
              : 'bg-slate-50 border border-gray-200 text-gray-600 hover:bg-slate-100'
          }`}
        >
          Announcements ({posts.filter(p => p.category === 'announcement').length})
        </button>
      </div>

      {/* Grid of Published posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.length === 0 ? (
          <div className="md:col-span-3 text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-xs text-slate-500">No approved posts found for this category.</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group bg-white rounded-3xl border border-emerald-100/60 overflow-hidden shadow-xl shadow-emerald-950/5 flex flex-col justify-between hover:shadow-md hover:border-emerald-200 transition duration-300 cursor-pointer"
            >
              <div>
                <div className="aspect-video relative bg-slate-100 overflow-hidden">
                  <img 
                    src={post.images[0]} 
                    alt={post.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className={`absolute top-3 left-3 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border ${getCategoryBadge(post.category)}`}>
                    {post.category}
                  </span>

                  {isLeader && (
                    <button
                      id={`btn-delete-post-${post.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this posted post from APUMA noticeboard?')) {
                          deletePost(post.id);
                        }
                      }}
                      title="Delete Post"
                      className="absolute top-3 right-3 p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full border border-rose-100 shadow-sm transition hover:scale-110 cursor-pointer z-10"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                    <Calendar size={11} />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-gray-900 group-hover:text-emerald-800 transition line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {post.content}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-4 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-medium flex items-center gap-1">
                  <User size={10} />
                  {post.author}
                </span>
                <span className="text-emerald-700 font-bold group-hover:underline flex items-center gap-0.5">
                  View Script →
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ======================================================= */}
      {/* READ POST & SLIDES MODAL */}
      {/* ======================================================= */}
      {selectedPost && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden border border-emerald-100 shadow-2xl flex flex-col justify-between max-h-[90vh]">
            
            {/* Header */}
            <div className="p-5 bg-emerald-800 text-white flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-300 block mb-1 uppercase tracking-wider">
                  APUMA Feed Reader
                </span>
                <h3 className="text-sm font-bold truncate max-w-md">{selectedPost.title}</h3>
              </div>

              <button
                id="btn-close-post-reader"
                onClick={() => setSelectedPost(null)}
                className="p-1.5 rounded-full hover:bg-emerald-700 text-white/80 hover:text-white transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto space-y-6">
              
              {/* Graphic Carousel mock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedPost.images.map((img, imgIdx) => (
                  <div key={imgIdx} className="rounded-2xl overflow-hidden aspect-video bg-black border border-slate-100 shadow-sm relative">
                    <img 
                      src={img} 
                      alt={`Carousel slide ${imgIdx+1}`} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 right-2 bg-emerald-950/85 text-amber-300 font-bold font-mono text-[9px] px-2 py-0.5 rounded-full border border-emerald-700/50">
                      Slide {imgIdx + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-500 pb-3 border-b border-gray-100">
                  <span className="flex items-center gap-1 text-emerald-800 font-bold">
                    <Tag size={12} />
                    Category: {selectedPost.category.toUpperCase()}
                  </span>
                  <span>•</span>
                  <span>By: {selectedPost.author}</span>
                  <span>•</span>
                  <span>Released: {selectedPost.date}</span>
                </div>

                <div className="bg-amber-50/20 rounded-2xl p-5 border border-amber-100/40 text-xs text-gray-700 leading-relaxed space-y-4 whitespace-pre-line">
                  <h4 className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
                    <BookOpen size={14} className="text-amber-500" />
                    Complete Caption & Scripts:
                  </h4>
                  <p>{selectedPost.content}</p>
                </div>
              </div>

            </div>

            {/* Footer Utilities */}
            <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  id="btn-post-copy-caption"
                  onClick={() => handleCopyCaption(selectedPost)}
                  className="px-4 py-2.5 rounded-xl bg-amber-50 text-amber-950 text-xs font-bold hover:bg-amber-100 border border-amber-200 transition flex items-center gap-1 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check size={14} className="text-emerald-700" />
                      Caption Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy Caption for Sharing
                    </>
                  )}
                </button>

                {isLeader && (
                  <button
                    id="btn-post-delete-modal"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this posted post from APUMA noticeboard?')) {
                        deletePost(selectedPost.id);
                        setSelectedPost(null);
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 border border-rose-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 size={14} />
                    Delete Post
                  </button>
                )}
              </div>

              <button
                id="btn-post-close-action"
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Done Reading
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
