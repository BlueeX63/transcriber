import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-8 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-800">VoiceScript</span>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex-1 flex items-center justify-center pt-20 pb-24 px-8">
        <div className="max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-600 mb-4">
            Admin Dashboard
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Audio to text,<br />
            simplified.
          </h1>
          <p className="mt-5 text-base text-gray-500 leading-relaxed max-w-md mx-auto">
            Upload short audio files, transcribe them automatically, and store the results — all from a single admin interface.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/login"
              className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
            >
              Go to Dashboard
            </Link>
            <a
              href="#how"
              className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Learn more ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto w-12 h-px bg-gray-200" />

      {/* ── How it works ── */}
      <section id="how" className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-600 mb-3">
            How it works
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-12">
            Three simple steps.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-sm transition-shadow">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Upload audio</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Drop in an MP3, WAV, or M4A file. Keep it short — that is what this tool is built for.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-sm transition-shadow">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Get the transcript</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Speech-to-text runs automatically. You will have accurate, readable text in seconds.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-sm transition-shadow">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Store & search</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Every transcript is saved alongside the original audio. Search anytime by keyword.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-8 mb-16">
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Ready to get started?</h2>
            <p className="text-sm text-gray-500 mt-1">Sign in to the admin dashboard and start transcribing.</p>
          </div>
          <Link
            href="/login"
            className="shrink-0 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Sign in →
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-6 px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} VoiceScript</p>
          <p className="text-xs text-gray-400">Admin access only</p>
        </div>
      </footer>

    </div>
  );
}