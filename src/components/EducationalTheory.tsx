import React from 'react';
import { BookOpen, Globe2, Sun, Clock, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';

export const EducationalTheory: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Matematik & Astronomi Temeli - Hazırlayan: ENES ÖZTÜRK</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Artık Yıl Nedir ve Neden 400 Yıl İstisnası Vardır?
        </h2>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-4xl">
          Artık yıl, Miladî takvimde 365 yerine 366 günü olan yıldır. Bu fazladan gün (artık gün), normalde 28 gün olan şubat ayına <strong>29 Şubat</strong>’ın eklenmesi ile elde edilir.
        </p>
      </div>

      {/* 3 Core Rules Explained in Detail */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono mb-3">
            01
          </div>
          <h3 className="text-base font-bold text-white mb-2">
            4 Rakamının Katı Olan Yıllar
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Genel kural olarak artık yıllar 4 rakamının katı olan yıllardır:
          </p>
          <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-amber-300">
            1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024 ...
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold font-mono mb-3">
            02
          </div>
          <h3 className="text-base font-bold text-white mb-2">
            100'ün Katı Olan Yıllar (İstisna)
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            100'ün katı olan yıllar 4'e bölünse dahi doğrudan artık yıl kabul edilmez:
          </p>
          <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-rose-400">
            1700, 1800 ve 1900 yılları 4'e bölünmesine rağmen artık yıl DEĞİLDİR!
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono mb-3">
            03
          </div>
          <h3 className="text-base font-bold text-white mb-2">
            400'ün Katı Olan Yüzyıllar
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            100'ün katı olanlardan <strong>sadece 400'e kalansız bölünebilenler</strong> artık yıldır:
          </p>
          <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-emerald-400">
            1200, 1600, 2000, 2400 yılları artık yıldır.
          </div>
        </div>

      </div>

      {/* Deep Astronomical Explanation */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-indigo-400 uppercase tracking-wider">
          <Sun className="w-4 h-4 text-amber-400" />
          <span>Astronomik Hatanın Düzeltilme Sebebi</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white">
          Neden 365,25 Değil de 365,242 Gün?
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          Dünya’nın Güneş etrafında bir tam turu (Tropikal Yıl) tam olarak <strong>365 gün 6 saat (365,25 gün)</strong> DEĞİLDİR.
          Gerçek astronomik süre yaklaşık <strong>365 gün, 5 saat, 48 dakika ve 46 saniyedir (yaklaşık 365,2422 gün)</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
              <Clock className="w-4 h-4" />
              <span>Jülyen Takvimi Hatası (Sadece 4 yılda 1 gün)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Her 4 yılda bir 1 gün eklenirse, yıl ortalaması 365,25 gün kabul edilmiş olur. Fakat gerçek yıl 365,2422 gündür.
              Aradaki <strong>0,0078 günlük (~11 dakikalık)</strong> fazlalık her 128 yılda 1 tam gün, her 400 yılda ise yaklaşık <strong>3,12 gün</strong> takvimin kaymasına yol açar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
              <CheckCircle className="w-4 h-4" />
              <span>Gregoryen Takvimi Çözümü (1582'den Günümüze)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              400 yıllık döngüde biriken 3 günlük hatayı silmek için; 100'ün katı olan 4 yüzyıldan 3'ü (1700, 1800, 1900) artık yıl olmaktan çıkarılmış, yalnızca 400'ün katı olan 1 tanesi (2000) artık yıl sayılmıştır. Böylece takvim mevsimlerle kusursuz dengelenmiştir.
            </p>
          </div>

        </div>

        {/* Visual Formula banner */}
        <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm font-mono text-slate-200">
            <span className="text-amber-400 font-bold">Java Koşulu:</span>{' '}
            <code>(yil % 4 == 0 && yil % 100 != 0) || (yil % 400 == 0)</code>
          </div>
          <div className="text-xs text-amber-300 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 whitespace-nowrap">
            Yazar: ENES ÖZTÜRK
          </div>
        </div>

      </div>
    </div>
  );
};
