import React from 'react';
import { Terminal, Code2, Calendar, Sparkles, Binary, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: 'terminal' | 'analysis' | 'code' | 'scanner' | 'theory';
  setActiveTab: (tab: 'terminal' | 'analysis' | 'code' | 'scanner' | 'theory') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Project Title */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/20 text-white font-mono font-bold text-lg ring-1 ring-white/20">
              ☕
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  Java Artık Yıl Hesaplayıcı
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold">
                  Java 8+
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span>Algoritma & Konsol Simülasyonu</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-400 font-medium">İmza: ENES ÖZTÜRK</span>
              </p>
            </div>
          </div>

          {/* Author Badge */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-400 font-medium">Geliştirici:</span>
              <span className="text-amber-300 font-bold tracking-wide uppercase font-mono">
                ENES ÖZTÜRK
              </span>
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-2 border-t border-slate-800/80 pt-2 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Java Terminali</span>
          </button>

          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'analysis'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Matematik & Şubat Takvimi</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'code'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Java Kaynak Kodları</span>
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'scanner'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>Yıl Aralığı Tarayıcı</span>
          </button>

          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'theory'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Artık Yıl Bilimi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
