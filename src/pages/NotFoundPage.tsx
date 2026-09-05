import React from 'react';
import { ArrowLeft, Home, Search } from 'lucide-react';

interface NotFoundPageProps {
  navigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
        <span>404 • Page Not Found</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
        Lost in Cyberspace?
      </h1>

      <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
        The page you are searching for might have been removed, renamed, or is temporarily unavailable. Let’s get you back on track.
      </p>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/40"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <button
          onClick={() => navigate('/services')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors inline-flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Explore Services</span>
        </button>
      </div>
    </div>
  );
};
