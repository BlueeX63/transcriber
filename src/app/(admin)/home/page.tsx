import React from 'react';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">VoiceScript</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider ml-1">Admin</span>
        </div>
        <LogoutButton />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Welcome to the Dashboard</h1>
          <p className="text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
            Manage your audio files and transcriptions from here. Choose an action below to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Upload Audio Card */}
          <Link href="/upload" className="group bg-white rounded-3xl p-10 border border-gray-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer shadow-sm">
            <div className="w-24 h-24 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300 shadow-sm border border-indigo-100">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-indigo-600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Upload Audio</h2>
            <p className="text-gray-500 leading-relaxed text-sm">
              Upload new audio files for instant transcription. Supports MP3, WAV, and M4A formats.
            </p>
          </Link>

          {/* Show Transcripts Card */}
          <Link href="/transcripts" className="group bg-white rounded-3xl p-10 border border-gray-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer shadow-sm">
            <div className="w-24 h-24 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300 shadow-sm border border-indigo-100">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-indigo-600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Show Transcripts</h2>
            <p className="text-gray-500 leading-relaxed text-sm">
              View, search, and manage your previously transcribed audio files and texts.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}