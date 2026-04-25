'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

type Transcript = {
  id: string;
  title: string;
  text: string;
  createdAt: string;
};

export default function TranscriptsList({ transcripts }: { transcripts: Transcript[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this transcript?')) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/transcripts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSelectedTranscript(null);
        router.refresh(); // Refresh server component data
      } else {
        alert('Failed to delete transcript.');
      }
    } catch (error) {
      alert('An error occurred while deleting.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredTranscripts = transcripts.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <Link href="/home" className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 transition-colors cursor-pointer" title="Back to Home">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
            <span className="text-lg font-bold text-gray-900 tracking-tight">VoiceScript</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider ml-1">Admin</span>
        </div>
        <LogoutButton />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10 max-w-6xl mx-auto w-full flex flex-col">
        
        {/* Page Title & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Transcripts</h1>
                <p className="text-base text-gray-500">
                    Browse and search through your previously transcribed texts.
                </p>
            </div>
            
            <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search transcripts..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-shadow"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

        {/* Transcripts List */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm flex-1 flex flex-col">
            {filteredTranscripts.length > 0 ? (
                <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
                    {filteredTranscripts.map((transcript) => (
                        <div 
                            key={transcript.id} 
                            onClick={() => setSelectedTranscript(transcript)}
                            className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6"
                        >
                            <div className="shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
                                    <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                                        {transcript.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-400 shrink-0">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        <span>{new Date(transcript.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span className="hidden sm:inline">{new Date(transcript.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                    {transcript.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No transcripts found</h3>
                    <p className="text-sm text-gray-500 max-w-sm">
                        {searchQuery 
                            ? `We couldn't find any transcripts matching "${searchQuery}". Try adjusting your search term.`
                            : "You haven't transcribed any audio files yet. Head over to the Upload section to get started!"}
                    </p>
                </div>
            )}
        </div>
      </main>

      {/* Transcript Detail Modal */}
      {selectedTranscript && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <div 
                  className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
                  onClick={() => setSelectedTranscript(null)}
              ></div>
              
              {/* Modal Content */}
              <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {/* Header */}
                  <div className="flex items-start justify-between p-6 border-b border-gray-100 bg-gray-50/50 pr-40">
                      <div>
                          <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedTranscript.title}</h2>
                          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                {new Date(selectedTranscript.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(selectedTranscript.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </div>
                      </div>
                      <div className="absolute top-6 right-6 flex items-center gap-3">
                          <button 
                              onClick={() => {
                                  navigator.clipboard.writeText(selectedTranscript.text);
                                  setCopied(true);
                                  setTimeout(() => setCopied(false), 2000);
                              }}
                              className={`px-3 py-1.5 rounded-xl border shadow-sm transition-all duration-300 flex items-center justify-center gap-1.5 text-sm font-semibold
                                ${copied 
                                  ? 'bg-green-50 border-green-200 text-green-600 scale-105' 
                                  : 'bg-white border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 hover:scale-105 active:scale-95'}`}
                          >
                              {copied ? (
                                  <>
                                      <svg className="animate-in zoom-in duration-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                          <polyline points="20 6 9 17 4 12"></polyline>
                                      </svg>
                                      <span className="animate-in fade-in duration-300">Copied!</span>
                                  </>
                              ) : (
                                  <>
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                      </svg>
                                      <span>Copy</span>
                                  </>
                              )}
                          </button>
                          <button 
                              onClick={() => {
                                  setSelectedTranscript(null);
                                  setCopied(false);
                              }}
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 bg-gray-100/50 rounded-xl transition-colors"
                              title="Close"
                          >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                          </button>
                      </div>
                  </div>
                  
                  {/* Body */}
                  <div className="p-6 overflow-y-auto flex-1 text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
                      {selectedTranscript.text}
                  </div>
                  
                  {/* Footer */}
                  <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
                      <button 
                          onClick={() => handleDelete(selectedTranscript.id)}
                          disabled={isDeleting}
                          className="px-4 py-2 bg-white border border-red-200 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          {isDeleting ? (
                              <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                          ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line x1="10" y1="11" x2="10" y2="17"></line>
                                  <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                          )}
                          {isDeleting ? 'Deleting...' : 'Delete Transcript'}
                      </button>

                      <button 
                          onClick={() => {
                              setSelectedTranscript(null);
                              setCopied(false);
                          }}
                          className="px-6 py-2.5 bg-indigo-600 border border-transparent rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
                      >
                          Close
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
