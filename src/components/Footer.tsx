import React from 'react';
import { Coffee, ShieldCheck, Heart, Terminal, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-16 py-10 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-900">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ☕
            </div>
            <div>
              <span className="font-bold text-white block">Java Artık Yıl Algoritması</span>
              <span className="text-slate-400">Miladî & Gregoryen Takvim Standartları</span>
            </div>
          </div>

          {/* Prominent Signature Badge */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <div className="text-center sm:text-left">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Geliştirici İmzası</span>
              <span className="text-sm font-extrabold text-amber-300 font-mono tracking-wider">
                ENES ÖZTÜRK
              </span>
            </div>
          </div>
        </div>

        {/* Verification Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Java Artık Yıl Hesaplayıcı. Tüm algoritmik senaryolar (2020: artık yıl, 2021: artık yıl değildir) doğrulanmıştır.
          </p>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono">
              Java SE 8+
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono">
              React + TypeScript
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
