'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface LoginForm {
    username: string;
    password: string;
}

export default function LoginPage() {
    const [form, setForm] = useState<LoginForm>({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.username || !form.password) {
            setError('Please enter your username and password.');
            return;
        }
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: form.username, password: form.password }),
            });

            if (res.ok) {
                router.push('/home');
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || 'Invalid credentials. Please try again.');
                setIsLoading(false);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #f5f5f4; }

        .field-input {
          width: 100%;
          padding: 10px 12px 10px 38px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.875rem;
          font-family: 'Inter', sans-serif;
          color: #1e293b;
          background: #fff;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .field-input::placeholder { color: #94a3b8; }
        .field-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }
        .field-input.has-error {
          border-color: #f87171;
          box-shadow: 0 0 0 3px rgba(248,113,113,0.1);
        }
      `}</style>

            {/* Page layout: two columns */}
            <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>

                {/* ── Left panel (brand) ── */}
                <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-indigo-600 relative overflow-hidden select-none">
                    {/* Subtle texture circles */}
                    <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-indigo-500/40" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-700/40 translate-x-1/3 translate-y-1/3" />

                    {/* Logo */}
                    <div className="relative z-10 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <span className="text-white font-semibold text-sm tracking-wide">AdminPanel</span>
                    </div>

                    {/* Center quote */}
                    <div className="relative z-10">
                        <p className="text-white/90 text-2xl font-semibold leading-snug max-w-xs">
                            Manage your workspace with clarity and control.
                        </p>
                        <p className="mt-4 text-indigo-200 text-sm leading-relaxed max-w-xs">
                            A secure, centralized hub for your team's administration — built for speed and simplicity.
                        </p>
                    </div>

                    {/* Bottom info */}
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-semibold">A</div>
                        <div>
                            <p className="text-white text-sm font-medium">Admin Access</p>
                            <p className="text-indigo-200 text-xs">Restricted to authorized users only</p>
                        </div>
                    </div>
                </div>

                {/* ── Right panel (form) ── */}
                <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-12">
                    <div className="w-full max-w-sm">

                        {/* Mobile logo */}
                        <div className="lg:hidden flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <span className="text-slate-800 font-semibold text-sm tracking-wide">AdminPanel</span>
                        </div>

                        {/* Small centered label */}
                        <p className="text-lg text-slate-800 text-center mb-3 tracking-wide uppercase font-bold">Sign-In to Your Account</p>

                        {/* Form card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
                            <form onSubmit={handleSubmit} noValidate>

                                {/* Username */}
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-[0.8rem] font-medium text-slate-700 mb-1.5">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                                            </svg>
                                        </span>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            className={`field-input ${error ? 'has-error' : ''}`}
                                            placeholder="e.g. john.doe"
                                            value={form.username}
                                            onChange={handleChange}
                                            autoComplete="username"
                                            spellCheck={false}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="mb-5">
                                    <label htmlFor="password" className="block text-[0.8rem] font-medium text-slate-700 mb-1.5">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </span>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            className={`field-input pr-10 ${error ? 'has-error' : ''}`}
                                            placeholder="Enter your password"
                                            value={form.password}
                                            onChange={handleChange}
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center"
                                        >
                                            {showPassword ? (
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                    <line x1="1" y1="1" x2="23" y2="23" />
                                                </svg>
                                            ) : (
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Error */}
                                {error && (
                                    <div role="alert" className="flex items-start gap-2 px-3.5 py-2.5 mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-[0.8rem]">
                                        <svg className="mt-0.5 shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                        {error}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    id="login-submit-btn"
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2"
                                >
                                    {isLoading && (
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    )}
                                    {isLoading ? 'Signing in…' : 'Sign in'}
                                </button>
                            </form>
                        </div>

                        {/* Footer note */}
                        <p className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            Secure, encrypted connection
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
}