import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, GitFork, Calculator, HelpCircle } from 'lucide-react';
import { analyzeLeapYear, PRESET_YEARS } from '../utils/leapYear';
import { FebruaryCalendar } from './FebruaryCalendar';

interface StepByStepVisualizerProps {
  currentYear: number;
  setCurrentYear: (year: number) => void;
}

export const StepByStepVisualizer: React.FC<StepByStepVisualizerProps> = ({
  currentYear,
  setCurrentYear,
}) => {
  const analysis = analyzeLeapYear(currentYear);

  return (
    <div className="space-y-6">
      {/* Year Selector & Quick Navigation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
            Algoritma & Matematiksel Denetim
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Adım Adım Artık Yıl Doğrulama
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Girilen yılın 3 temel kuraldan nasıl geçtiğini inceleyin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400 font-mono">İncelenen Yıl:</label>
          <input
            type="number"
            value={currentYear}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val)) setCurrentYear(val);
            }}
            className="w-28 bg-slate-950 border border-slate-700 text-white font-mono font-bold text-lg px-3 py-1.5 rounded-xl text-center focus:outline-none focus:border-amber-500"
            min="1"
            max="9999"
          />
        </div>
      </div>

      {/* Grid: 3 Rules on left, February Calendar on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 3 Mathematical Rules & Boolean Logic (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Rule 1 Card */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              analysis.isDivisibleBy4
                ? 'bg-slate-900/90 border-emerald-500/30'
                : 'bg-slate-900/90 border-rose-500/30'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mt-0.5 ${
                    analysis.isDivisibleBy4
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  1
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Kural 1: 4'ün Katı Olma Kuralı</span>
                    <span className="text-xs font-mono text-slate-400 font-normal">
                      (yil % 4 == 0)
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Genel kural olarak artık yıllar 4 rakamının katı olan yıllardır.
                  </p>
                </div>
              </div>

              {analysis.isDivisibleBy4 ? (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sağlandı</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30">
                  <XCircle className="w-4 h-4" />
                  <span>Sağlanmadı</span>
                </div>
              )}
            </div>

            {/* Math operation box */}
            <div className="mt-3 bg-slate-950/80 rounded-xl p-3 border border-slate-800 font-mono text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
              <span>
                {currentYear} ÷ 4 = {Math.floor(currentYear / 4)}
              </span>
              <span className="font-bold text-amber-300">
                Kalan (Mod): {currentYear} % 4 = {analysis.remainder4}
              </span>
              <span className={analysis.isDivisibleBy4 ? 'text-emerald-400' : 'text-rose-400'}>
                {analysis.isDivisibleBy4 ? '0 (Tam Bölünür)' : `${analysis.remainder4} (Kalanlı)`}
              </span>
            </div>
          </div>

          {/* Rule 2 Card */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              analysis.isDivisibleBy100
                ? 'bg-slate-900/90 border-amber-500/40'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mt-0.5 ${
                    analysis.isDivisibleBy100
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  2
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Kural 2: Yüzyıl (100) Filtresi</span>
                    <span className="text-xs font-mono text-slate-400 font-normal">
                      (yil % 100 == 0)
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    100'ün katı olan yıllar kural istisnasına tabidir (1700, 1800, 1900 artık yıl değildir).
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${
                  analysis.isDivisibleBy100
                    ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                    : 'text-slate-400 bg-slate-800/60 border-slate-700'
                }`}
              >
                <span>{analysis.isDivisibleBy100 ? 'Yüzyıl Yılı (100\'ün Katı)' : 'Yüzyıl Yılı Değil'}</span>
              </div>
            </div>

            {/* Math operation box */}
            <div className="mt-3 bg-slate-950/80 rounded-xl p-3 border border-slate-800 font-mono text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
              <span>
                {currentYear} ÷ 100 = {Math.floor(currentYear / 100)}
              </span>
              <span className="font-bold text-amber-300">
                Kalan (Mod): {currentYear} % 100 = {analysis.remainder100}
              </span>
              <span className={analysis.isDivisibleBy100 ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                {analysis.isDivisibleBy100 ? '0 (Yüzyıl Sonu!)' : '100\'e bölünmez'}
              </span>
            </div>
          </div>

          {/* Rule 3 Card */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              analysis.isDivisibleBy400
                ? 'bg-slate-900/90 border-emerald-500/40 ring-1 ring-emerald-500/20'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mt-0.5 ${
                    analysis.isDivisibleBy400
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  3
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Kural 3: 400 Yıl İstisnası (Büyük Düzeltme)</span>
                    <span className="text-xs font-mono text-slate-400 font-normal">
                      (yil % 400 == 0)
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    100'ün katı olanlardan SADECE 400'e kalansız bölünebilenler (1200, 1600, 2000, 2400) artık yıldır.
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${
                  analysis.isDivisibleBy400
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : 'text-slate-400 bg-slate-800/60 border-slate-700'
                }`}
              >
                <span>{analysis.isDivisibleBy400 ? '400\'ün Katı (Artık Yıl!)' : '400\'ün Katı Değil'}</span>
              </div>
            </div>

            {/* Math operation box */}
            <div className="mt-3 bg-slate-950/80 rounded-xl p-3 border border-slate-800 font-mono text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
              <span>
                {currentYear} ÷ 400 = {Math.floor(currentYear / 400)}
              </span>
              <span className="font-bold text-amber-300">
                Kalan (Mod): {currentYear} % 400 = {analysis.remainder400}
              </span>
              <span className={analysis.isDivisibleBy400 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {analysis.isDivisibleBy400 ? '0 (400\'e Tam Bölünür)' : `Kalan: ${analysis.remainder400}`}
              </span>
            </div>
          </div>

          {/* Java Boolean Formula Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4" />
              <span>Java Mantıksal İfadesi (Boolean Expression)</span>
            </div>
            
            <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto">
              <div className="text-slate-500">// Java kodu:</div>
              <div className="mt-1 text-white">
                <span className="text-amber-400">boolean</span> artikYil ={' '}
                <span className="text-sky-300">(yil % 4 == 0 && yil % 100 != 0)</span>{' '}
                <span className="text-pink-400">||</span>{' '}
                <span className="text-emerald-300">(yil % 400 == 0)</span>;
              </div>

              {/* Dynamic Substituted values */}
              <div className="mt-3 pt-3 border-t border-slate-900 text-xs text-slate-400">
                <div className="text-slate-500">// {currentYear} için değerlerin yerine konması:</div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-white">
                  <span>artikYil =</span>
                  <span className={analysis.isDivisibleBy4 && !analysis.isDivisibleBy100 ? 'text-emerald-400' : 'text-slate-400'}>
                    ({analysis.isDivisibleBy4 ? 'true' : 'false'} && {!analysis.isDivisibleBy100 ? 'true' : 'false'})
                  </span>
                  <span className="text-pink-400">||</span>
                  <span className={analysis.isDivisibleBy400 ? 'text-emerald-400' : 'text-slate-400'}>
                    ({analysis.isDivisibleBy400 ? 'true' : 'false'})
                  </span>
                  <span className="text-slate-500">=&gt;</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded ${
                      analysis.isLeap ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {analysis.isLeap ? 'true' : 'false'}
                  </span>
                </div>
              </div>
            </div>

            {/* Turkish explanation */}
            <div className="mt-3 text-xs text-slate-300 flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-amber-400 font-bold">Sonuç:</span>
              <span>{analysis.reason}</span>
            </div>
          </div>

        </div>

        {/* Right Column: February Calendar & Interactive Flowchart (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <FebruaryCalendar year={currentYear} />

          {/* Decision Tree / Flowchart */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
              <GitFork className="w-4 h-4" />
              <span>Algoritma Karar Ağacı</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* Step 1 */}
              <div
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  analysis.isDivisibleBy4
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                }`}
              >
                <div>
                  <span className="font-bold">1. Adım:</span> {currentYear} % 4 == 0 ?
                </div>
                <div className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-slate-900">
                  {analysis.isDivisibleBy4 ? 'EVET' : 'HAYIR'}
                </div>
              </div>

              {/* Step 2 or rejection */}
              {analysis.isDivisibleBy4 ? (
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    analysis.isDivisibleBy100
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                      : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  <div>
                    <span className="font-bold">2. Adım:</span> {currentYear} % 100 == 0 ?
                  </div>
                  <div className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-slate-900">
                    {analysis.isDivisibleBy100 ? 'EVET (Yüzyıl)' : 'HAYIR (Artık Yıl)'}
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-rose-900/20 border border-rose-800/40 text-rose-300 text-xs">
                  ➡ 4'e tam bölünemediği için doğrudan <strong>Artık Yıl Değil</strong> kararı verilir.
                </div>
              )}

              {/* Step 3 (Only if 100'e bölünüyorsa) */}
              {analysis.isDivisibleBy100 && (
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    analysis.isDivisibleBy400
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                  }`}
                >
                  <div>
                    <span className="font-bold">3. Adım:</span> {currentYear} % 400 == 0 ?
                  </div>
                  <div className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-slate-900">
                    {analysis.isDivisibleBy400 ? 'EVET (Artık)' : 'HAYIR'}
                  </div>
                </div>
              )}

              {/* Final Conclusion Box */}
              <div
                className={`p-4 rounded-xl border font-sans text-center font-bold text-sm ${
                  analysis.isLeap
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                }`}
              >
                <div className="text-xs text-slate-400 uppercase font-mono mb-0.5">Programın Nihai Çıktısı</div>
                <div className="text-base font-extrabold">{analysis.resultMessage}</div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">İmza: ENES ÖZTÜRK</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
