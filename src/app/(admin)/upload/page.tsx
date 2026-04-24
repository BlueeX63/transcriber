'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    if (selectedFile.size > 100 * 1024 * 1024) {
      alert("File size exceeds 100MB limit.");
      return;
    }
    setFile(selectedFile);
    setTranscription(null); // Reset transcription on new file
    setTitle(''); // Reset title
  };

  const handleUpload = async () => {
    if (!file) return;
    if (!title.trim()) {
      alert("Please enter a title for the transcript before transcribing.");
      return;
    }
    setIsUploading(true);
    setTranscription(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setTranscription(data.transcription);
      } else {
        alert(data.error || 'Failed to transcribe audio.');
      }
    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred during transcription.');
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setTranscription(null);
    setTitle('');
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

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
      <main className="flex-1 flex flex-col items-center px-6 py-12 max-w-6xl mx-auto w-full">
        
        <div className="w-full mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Upload Audio</h1>
          <p className="text-base text-gray-500">
            Upload an audio file (up to 100MB) to generate a text transcription automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          
          {/* Left Column: Upload Area */}
          <div className="flex flex-col gap-6">
            <div 
              className={`relative bg-white rounded-3xl border-2 border-dashed p-10 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-sm ${
                isDragging ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-300 hover:border-gray-400'
              } ${file ? 'border-solid border-gray-200' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{ minHeight: '360px' }}
            >
              {!file ? (
                <>
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-400 border border-gray-100">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag and drop your audio here</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Files supported: MP3, WAV, M4A. Max size: 100MB.
                  </p>
                  <input 
                    type="file" 
                    accept="audio/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={(e) => e.target.files && handleFileSelection(e.target.files[0])}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Browse files
                  </button>
                </>
              ) : (
                <div className="w-full flex flex-col items-center">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 border border-indigo-100">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18V5l12-2v13" />
                            <circle cx="6" cy="18" r="3" />
                            <circle cx="18" cy="16" r="3" />
                        </svg>
                    </div>
                    <p className="text-base font-semibold text-gray-900 truncate w-full max-w-sm mb-1 px-4" title={file.name}>
                        {file.name}
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    
                    <div className="w-full max-w-sm px-4 mb-8">
                        <label htmlFor="transcript-title" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                            Transcript Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="transcript-title"
                            placeholder="e.g. Project Kickoff Meeting"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isUploading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow disabled:opacity-50 disabled:bg-gray-50 shadow-sm"
                        />
                    </div>
                    
                    <div className="flex gap-3 w-full max-w-sm px-4">
                        <button 
                            onClick={clearFile}
                            disabled={isUploading}
                            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            Remove
                        </button>
                        <button 
                            onClick={handleUpload}
                            disabled={isUploading}
                            className="flex-[2] flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 border border-transparent rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                        >
                            {isUploading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                'Transcribe Audio'
                            )}
                        </button>
                    </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Transcription Area */}
          <div className="flex flex-col h-full">
            <div className="bg-white rounded-3xl border border-gray-200 p-8 flex flex-col h-full shadow-sm" style={{ minHeight: '360px' }}>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {title ? title : 'Transcription Result'}
                </h3>
              </div>

              <div className="flex-1 flex flex-col">
                {isUploading ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4" />
                        <p className="text-sm font-medium text-gray-900">Processing audio...</p>
                        <p className="text-xs text-gray-500 mt-1">This might take a few moments.</p>
                    </div>
                ) : transcription ? (
                    <div className="flex-1 relative group bg-gray-50 p-6 rounded-2xl border border-gray-100 overflow-y-auto">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => navigator.clipboard.writeText(transcription)}
                                className="p-2 bg-white border border-gray-200 rounded-md text-gray-500 hover:text-gray-900 shadow-sm"
                                title="Copy to clipboard"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
                            {transcription}
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-30">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <p className="text-sm">
                            Your transcribed text will appear here.
                        </p>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}