import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ContentDraft } from '../types';
import { 
  FileText, 
  Palette, 
  CheckSquare, 
  Plus, 
  Download, 
  Copy, 
  Check, 
  Send, 
  Trash2, 
  Sliders, 
  ToggleLeft, 
  ToggleRight, 
  ExternalLink,
  Layers,
  Image as ImageIcon,
  User,
  Calendar,
  Sparkles,
  RefreshCw,
  Eye,
  X
} from 'lucide-react';

export const DesignWorkflow: React.FC = () => {
  const { 
    currentUser, 
    drafts, 
    createDraft, 
    uploadDesignAssets, 
    approveDraftToPublish, 
    rejectOrDeleteDraft,
    systemConfig,
    toggleRecruitment
  } = useApp();

  const userRole = currentUser?.role || 'guest';
  const isExecutive = userRole === 'executive' || userRole === 'admin';
  const isLeader = userRole === 'team' || userRole === 'executive' || userRole === 'admin';

  // State for creating new Content Draft
  const [newTitle, setNewTitle] = useState('');
  const [newBrief, setNewBrief] = useState('');
  const [panels, setPanels] = useState<string[]>(['Slide 1 (Cover): ', 'Slide 2: ']);
  const [activeTab, setActiveTab] = useState<'board' | 'create'>('board');

  // State for simulating uploads
  const [uploadDraftId, setUploadDraftId] = useState<string | null>(null);
  const [simulatedImageUrl, setSimulatedImageUrl] = useState('');
  const [selectedMockup, setSelectedMockup] = useState<string>('mosque');

  // UI state for clipboard / download feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  // Mock template presets for quick Canva simulation
  const MOCKUP_PRESETS = {
    mosque: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
    koran: 'https://images.unsplash.com/photo-1609599006353-e629f1d503f3?auto=format&fit=crop&q=80&w=400',
    nature: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400',
    lantern: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=400'
  };

  // Add a carousel slide panel
  const handleAddPanel = () => {
    setPanels([...panels, `Slide ${panels.length + 1}: `]);
  };

  // Remove a carousel slide panel
  const handleRemovePanel = (index: number) => {
    if (panels.length <= 1) return;
    const nextPanels = [...panels];
    nextPanels.splice(index, 1);
    setPanels(nextPanels);
  };

  // Update text in a panel
  const handlePanelChange = (index: number, val: string) => {
    const nextPanels = [...panels];
    nextPanels[index] = val;
    setPanels(nextPanels);
  };

  // Submit Draft Briefing
  const handleSubmitBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBrief.trim()) return;
    createDraft(newTitle, newBrief, panels.filter(p => p.trim() !== ''));
    setNewTitle('');
    setNewBrief('');
    setPanels(['Slide 1 (Cover): ', 'Slide 2: ']);
    setActiveTab('board');
  };

  // Simulate Canva upload with Unsplash graphics
  const handleSimulatedUpload = (draftId: string) => {
    const chosenUrl = simulatedImageUrl.trim() || MOCKUP_PRESETS[selectedMockup as keyof typeof MOCKUP_PRESETS];
    uploadDesignAssets(draftId, [chosenUrl]);
    setUploadDraftId(null);
    setSimulatedImageUrl('');
  };

  // Copy Slides Caption to Instagram Clipboard
  const handleCopyCaption = (draft: ContentDraft) => {
    const fullCaption = `📢 ${draft.title}\n\n📝 Brief:\n${draft.brief}\n\n📖 Carousel Slides:\n${draft.panels.map((p, i) => `Slide ${i+1}:\n${p}`).join('\n\n')}\n\n#apuma #apumuslims #apuuniversity`;
    navigator.clipboard.writeText(fullCaption);
    setCopiedId(draft.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Simulate Downloading post zip
  const handleDownloadAssets = (draft: ContentDraft) => {
    setDownloadedId(draft.id);
    setTimeout(() => setDownloadedId(null), 2500);
    // For browser side simulation, create a text blob of content
    const textData = `APUMA Canva Package: ${draft.title}\nBrief: ${draft.brief}\nImages: ${draft.designImages?.join(', ') || ''}`;
    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apuma-assets-${draft.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full">
      {/* Top Controls & Global Toggles */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-emerald-900 shadow-md">
        <div>
          <span className="text-amber-400 font-mono text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-1">
            <Layers size={14} />
            APUMA Internal Management Dashboard
          </span>
          <h2 className="text-xl font-bold font-sans">Design & Publication Pipeline</h2>
          <p className="text-xs text-emerald-200/80 mt-1">
            Welcome back, <span className="font-bold text-amber-300 capitalize">{currentUser?.name} ({userRole})</span>. Collaborate securely across strategy, graphics design, and leadership sign-off.
          </p>
        </div>

        {/* Executive Recruitment Toggle */}
        <div className="flex items-center gap-4 bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800/80">
          <div className="text-left">
            <span className="text-xs font-semibold block text-emerald-100 font-sans">APU Recruitment Status</span>
            <span className="text-[10px] text-emerald-300/80 font-mono">
              Forms: {systemConfig.recruitmentOpen ? '🟢 OPEN' : '🔴 CLOSED'}
            </span>
          </div>

          <button
            id="btn-toggle-recruitment"
            disabled={!isExecutive}
            onClick={() => toggleRecruitment(!systemConfig.recruitmentOpen)}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              !isExecutive 
                ? 'opacity-50 cursor-not-allowed text-gray-500' 
                : 'text-white'
            }`}
          >
            {systemConfig.recruitmentOpen ? (
              <ToggleRight size={40} className="text-amber-400" />
            ) : (
              <ToggleLeft size={40} className="text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 mb-8 gap-2">
        <button
          id="tab-view-board"
          onClick={() => setActiveTab('board')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'board' 
              ? 'border-emerald-700 text-emerald-800 font-extrabold' 
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Sliders size={16} />
          Workflow Board
        </button>
        <button
          id="tab-view-create"
          onClick={() => setActiveTab('create')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'create' 
              ? 'border-emerald-700 text-emerald-800 font-extrabold' 
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Plus size={16} />
          Draft Content Strategy
        </button>
      </div>

      {/* ========================================== */}
      {/* 1. DRAFT CONTENT STRATEGY CREATOR PANEL */}
      {/* ========================================== */}
      {activeTab === 'create' && (
        <form onSubmit={handleSubmitBrief} className="bg-white rounded-3xl border border-emerald-100/60 p-8 shadow-xl shadow-emerald-950/5">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-5 mb-6">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 font-sans">Brief a New Social Media Post</h3>
              <p className="text-xs text-gray-500">Draft your topic content and define the text strategy for the Canva graphics design team.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Brief Info */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 font-mono">
                  Campaign Title *
                </label>
                <input
                  id="input-draft-title"
                  type="text"
                  required
                  placeholder="e.g. Virtues of Dhul Hijjah Fasting"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 font-mono">
                  Creative Brief / Caption *
                </label>
                <textarea
                  id="input-draft-brief"
                  rows={4}
                  required
                  placeholder="Summarize the core message, key Hadiths to use, visual style recommendation (e.g. pastel colors, minimal illustration)."
                  value={newBrief}
                  onChange={(e) => setNewBrief(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-600 focus:bg-white transition leading-relaxed"
                />
              </div>
            </div>

            {/* Right Multi-panel slider creator */}
            <div className="lg:col-span-6 bg-amber-50/20 border border-amber-100/40 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold font-sans text-amber-900 block uppercase tracking-wider">
                  📖 Multi-Panel Carousel Script
                </span>
                <button
                  id="btn-add-carousel-slide"
                  type="button"
                  onClick={handleAddPanel}
                  className="px-3 py-1 bg-amber-400 text-emerald-950 font-bold rounded-xl text-xs hover:bg-amber-300 transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={12} />
                  Add Slide
                </button>
              </div>

              <p className="text-[11px] text-amber-800/80 mb-4 leading-relaxed">
                Provide precise sequential texts to put on each slide panel of the Instagram carousel post.
              </p>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {panels.map((panel, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-gray-400 w-16">
                      Slide {idx + 1}
                    </span>
                    <input
                      id={`input-slide-text-${idx}`}
                      type="text"
                      placeholder={`Enter text script for slide ${idx + 1}`}
                      value={panel}
                      onChange={(e) => handlePanelChange(idx, e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 transition"
                    />
                    <button
                      id={`btn-remove-slide-${idx}`}
                      type="button"
                      disabled={panels.length <= 1}
                      onClick={() => handleRemovePanel(idx)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-6 flex justify-end gap-3">
            <button
              id="btn-cancel-brief"
              type="button"
              onClick={() => setActiveTab('board')}
              className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="btn-submit-brief-pipeline"
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition flex items-center gap-1.5 cursor-pointer"
            >
              <Send size={14} />
              Publish to "Today's Content"
            </button>
          </div>
        </form>
      )}

      {/* ========================================== */}
      {/* 2. THE THREE-STAGE PIPELINE KANBAN BOARD */}
      {/* ========================================== */}
      {activeTab === 'board' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMN 1: Content Strategy (Today's Content Queue) */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 min-h-[500px]">
            <div className="flex items-center justify-between mb-5 border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                  <FileText size={16} />
                </span>
                <h4 className="font-bold text-sm text-gray-900 font-sans">1. Today's Content</h4>
              </div>
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {drafts.filter(d => d.status === 'draft').length}
              </span>
            </div>

            <div className="space-y-4">
              {drafts.filter(d => d.status === 'draft').length === 0 ? (
                <div className="text-center py-10 px-4 bg-white/40 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    No briefs in draft queue. Have a brilliant idea? Use the "Draft Content Strategy" tab to seed the next campaign!
                  </p>
                </div>
              ) : (
                drafts.filter(d => d.status === 'draft').map((draft) => (
                  <div key={draft.id} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm hover:shadow transition space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h5 className="font-bold text-sm text-gray-900">{draft.title}</h5>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1.5 mt-1">
                          <User size={11} />
                          Briefed by: {draft.submittedBy}
                        </span>
                      </div>
                      {isLeader && (
                        <button
                          id={`btn-delete-draft-${draft.id}`}
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete this draft brief "${draft.title}"?`)) {
                              rejectOrDeleteDraft(draft.id);
                            }
                          }}
                          title="Delete Draft"
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer flex-shrink-0"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>

                    <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100/50 text-xs text-amber-900/80 leading-relaxed">
                      <strong>Brief:</strong> {draft.brief}
                    </div>

                    {/* Slides detail */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block font-mono">
                        Carousel Slide Script:
                      </span>
                      <div className="bg-slate-50 rounded-xl p-2.5 space-y-1">
                        {draft.panels.map((p, pIdx) => (
                          <div key={pIdx} className="text-[10px] text-gray-600 truncate">
                            <span className="font-mono font-bold text-emerald-800 mr-1">Slide {pIdx+1}:</span> {p}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action: APUMA Team Upload Section */}
                    {uploadDraftId === draft.id ? (
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs space-y-3 mt-2">
                        <span className="font-bold text-emerald-800 block">🎨 Simulate Canva Design Export</span>
                        
                        <div>
                          <label className="block text-[10px] font-semibold text-emerald-900 mb-1">
                            Choose Graphic Motif:
                          </label>
                          <select 
                            id="select-mockup"
                            value={selectedMockup}
                            onChange={(e) => setSelectedMockup(e.target.value)}
                            className="w-full p-2 rounded bg-white border border-emerald-200 text-xs focus:outline-none"
                          >
                            <option value="mosque">Golden Crescent Mosque (Green)</option>
                            <option value="koran">Holy Qur’an & Lantern (Sandalwood)</option>
                            <option value="nature">Serene Olive Branches (Pastel)</option>
                            <option value="lantern">Traditional Eid Lanterns (Amber)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-semibold text-emerald-900 mb-1.5">
                            Or Upload Local Picture File:
                          </label>
                          <div className="border border-dashed border-emerald-300 rounded-xl bg-white p-3 text-center hover:bg-emerald-50/50 transition relative">
                            <input
                              id={`input-file-upload-${draft.id}`}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setSimulatedImageUrl(reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="space-y-1">
                              <ImageIcon size={20} className="mx-auto text-emerald-600" />
                              <p className="text-[10px] text-emerald-800 font-bold">
                                {simulatedImageUrl.startsWith('data:') 
                                  ? '✅ Picture Ready!' 
                                  : 'Click to select picture file'}
                              </p>
                              <p className="text-[9px] text-gray-400">Supports PNG, JPG, JPEG, WebP</p>
                            </div>
                          </div>

                          {simulatedImageUrl.startsWith('data:') && (
                            <div className="mt-2 relative rounded-lg overflow-hidden border border-emerald-200 aspect-video bg-black">
                              <img 
                                src={simulatedImageUrl} 
                                alt="Local upload preview" 
                                className="w-full h-full object-cover" 
                              />
                              <button
                                type="button"
                                onClick={() => setSimulatedImageUrl('')}
                                className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition cursor-pointer"
                              >
                                <X size={10} />
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-1.5 justify-end">
                          <button
                            id="btn-cancel-upload"
                            onClick={() => setUploadDraftId(null)}
                            className="px-2.5 py-1.5 bg-white border border-emerald-200 text-[10px] rounded hover:bg-emerald-100 transition cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            id="btn-confirm-upload"
                            onClick={() => handleSimulatedUpload(draft.id)}
                            className="px-2.5 py-1.5 bg-emerald-700 text-white font-bold text-[10px] rounded hover:bg-emerald-800 transition cursor-pointer"
                          >
                            Upload completed Canva
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        id={`btn-design-action-${draft.id}`}
                        onClick={() => setUploadDraftId(draft.id)}
                        className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Palette size={13} />
                        Submit Completed Canva Designs
                      </button>
                    )}

                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 2: Canva Design Queue (Awaiting Executive Review) */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 min-h-[500px]">
            <div className="flex items-center justify-between mb-5 border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                  <Palette size={16} />
                </span>
                <h4 className="font-bold text-sm text-gray-900 font-sans">2. Verification Queue</h4>
              </div>
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {drafts.filter(d => d.status === 'designed').length}
              </span>
            </div>

            <div className="space-y-4">
              {drafts.filter(d => d.status === 'designed').length === 0 ? (
                <div className="text-center py-10 px-4 bg-white/40 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    No posts currently awaiting verification. Completed graphics uploaded by designers will appear here for leadership sign-off.
                  </p>
                </div>
              ) : (
                drafts.filter(d => d.status === 'designed').map((draft) => (
                  <div key={draft.id} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm hover:shadow transition space-y-4">
                    
                    {/* Visual Asset mock representation */}
                    {draft.designImages && draft.designImages.length > 0 && (
                      <div className="relative group rounded-xl overflow-hidden border border-emerald-100 shadow-sm aspect-video bg-black">
                        <img 
                          src={draft.designImages[0]} 
                          alt="Canva slide preview" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <span className="absolute bottom-2 left-2 bg-emerald-950/85 text-amber-300 font-bold font-mono text-[9px] px-2 py-0.5 rounded-full border border-emerald-700/50 flex items-center gap-1">
                          <Sparkles size={8} />
                          Canva Completed
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h5 className="font-bold text-sm text-gray-900">{draft.title}</h5>
                        <div className="flex flex-col gap-1 mt-1 text-[10px] text-gray-500">
                          <span className="flex items-center gap-1">
                            <User size={10} />
                            Writer: {draft.submittedBy}
                          </span>
                          <span className="flex items-center gap-1">
                            <Palette size={10} />
                            Designer: {draft.designedBy}
                          </span>
                        </div>
                      </div>
                      {isLeader && (
                        <button
                          id={`btn-delete-designed-${draft.id}`}
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete this designed draft "${draft.title}"?`)) {
                              rejectOrDeleteDraft(draft.id);
                            }
                          }}
                          title="Delete Draft"
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer flex-shrink-0"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-gray-600 border border-slate-100">
                      <strong>Script:</strong> {draft.panels[0]} ...
                    </div>

                    {/* Executive Verification controls */}
                    {isExecutive ? (
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100/80 space-y-3.5">
                        <span className="text-[10px] font-bold font-mono text-emerald-800 uppercase tracking-wider block">
                          👑 Executive Action Required:
                        </span>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            id={`btn-reject-draft-${draft.id}`}
                            onClick={() => rejectOrDeleteDraft(draft.id)}
                            className="py-2 bg-white text-rose-600 border border-rose-100 text-xs font-semibold rounded-xl hover:bg-rose-50 transition cursor-pointer"
                          >
                            Reject
                          </button>
                          <button
                            id={`btn-approve-post-${draft.id}`}
                            onClick={() => approveDraftToPublish(draft.id, 'post')}
                            className="py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                          >
                            <Send size={11} />
                            Approve & Post
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-amber-50 text-amber-800 text-[10px] p-2.5 rounded-xl border border-amber-100 leading-normal">
                        Awaiting executive role verification to publish to the public timeline.
                      </div>
                    )}

                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 3: Approved & Published Queue (Instagram Sharing Desk) */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 min-h-[500px]">
            <div className="flex items-center justify-between mb-5 border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-950 text-amber-400 rounded-lg">
                  <CheckSquare size={16} />
                </span>
                <h4 className="font-bold text-sm text-gray-900 font-sans">3. Published Desk</h4>
              </div>
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {drafts.filter(d => d.status === 'approved').length}
              </span>
            </div>

            <div className="space-y-4">
              {drafts.filter(d => d.status === 'approved').length === 0 ? (
                <div className="text-center py-10 px-4 bg-white/40 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    No posts shared today. Approved posts with downloadable design sheets will populate this desk instantly.
                  </p>
                </div>
              ) : (
                drafts.filter(d => d.status === 'approved').map((draft) => (
                  <div key={draft.id} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm hover:shadow transition space-y-4">
                    
                    {draft.designImages && draft.designImages.length > 0 && (
                      <div className="rounded-xl overflow-hidden aspect-video bg-black relative border border-slate-100">
                        <img 
                          src={draft.designImages[0]} 
                          alt="Published graphic" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-600 text-white font-mono font-bold text-[9px] border border-emerald-500 shadow-sm">
                          LIVE ON FEED
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h5 className="font-bold text-sm text-gray-900">{draft.title}</h5>
                        <span className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1.5 mt-1">
                          <Calendar size={11} />
                          Approved: {draft.approvedAt}
                        </span>
                      </div>
                      {isLeader && (
                        <button
                          id={`btn-delete-published-${draft.id}`}
                          onClick={() => {
                            if (confirm(`Are you sure you want to remove this draft from the published desk list?`)) {
                              rejectOrDeleteDraft(draft.id);
                            }
                          }}
                          title="Remove from Desk"
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer flex-shrink-0"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>

                    {/* Meta quick desk utilities (Download / Copy to Clipboard) */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <button
                        id={`btn-copy-instagram-${draft.id}`}
                        onClick={() => handleCopyCaption(draft)}
                        className="py-2 rounded-xl bg-amber-50 text-amber-950 text-[10px] font-bold hover:bg-amber-100 border border-amber-200 transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {copiedId === draft.id ? (
                          <>
                            <Check size={11} className="text-emerald-700" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            Copy Caption
                          </>
                        )}
                      </button>

                      <button
                        id={`btn-download-assets-${draft.id}`}
                        onClick={() => handleDownloadAssets(draft)}
                        className="py-2 rounded-xl bg-emerald-50 text-emerald-800 text-[10px] font-bold hover:bg-emerald-100 border border-emerald-100 transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {downloadedId === draft.id ? (
                          <>
                            <Check size={11} className="text-emerald-700" />
                            Downloaded
                          </>
                        ) : (
                          <>
                            <Download size={11} />
                            Download ZIP
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
