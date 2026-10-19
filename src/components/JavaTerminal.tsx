import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Copy, Check, Terminal as TermIcon, ArrowRight, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { analyzeLeapYear, PRESET_YEARS } from '../utils/leapYear';
import { TerminalEntry } from '../types';

interface JavaTerminalProps {
  currentYear: number;
  setCurrentYear: (year: number) => void;
  onAnalysisSelect?: (year: number) => void;
}

export const JavaTerminal: React.FC<JavaTerminalProps> = ({
  currentYear,
  setCurrentYear,
  onAnalysisSelect,
}) => {
  const [inputVal, setInputVal] = useState<string>(currentYear.toString());
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: 'init-1',
      timestamp: '00:01',
      inputYear: 2020,
      output: '2020 bir artık yıldır !',
      isLeap: true,
    },
    {
      id: 'init-2',
      timestamp: '00:02',
      inputYear: 2021,
      output: '2021 bir artık yıldır değildir !',
      isLeap: false,
    },
  ]);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRun = (yearToRun?: number) => {
    const rawNum = yearToRun !== undefined ? yearToRun : parseInt(inputVal, 10);
    if (isNaN(rawNum)) return;

    setIsRunning(true);
    setCurrentYear(rawNum);
    setInputVal(rawNum.toString());

    setTimeout(() => {
      const result = analyzeLeapYear(rawNum);
      const newEntry: TerminalEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        inputYear: rawNum,
        output: result.resultMessage,
        isLeap: result.isLeap,
      };

      setHistory((prev) => [...prev, newEntry]);
      setIsRunning(false);

      if (result.isLeap) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899'],
        });
      }
    }, 180);
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isRunning]);

  const handleCopyHistory = () => {
    const text = history
      .map(
        (h) =>
          `Yıl Giriniz : ${h.inputYear}\n${h.output}\nİmza: ENES ÖZTÜRK`
      )
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      {/* Intro banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Geliştirici İmzası: ENES ÖZTÜRK</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Java Konsol Çalıştırıcısı (Terminal)
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Kullanıcının girdiği yılı analiz eden Java programını canlı olarak test edin.
              Senaryoda istenen <code className="text-amber-300 font-mono font-medium">"2020 bir artık yıldır !"</code> ve <code className="text-amber-300 font-mono font-medium">"2021 bir artık yıldır değildir !"</code> çıktılarını doğrudan üretir.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              openjdk version "21"
            </span>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>Hızlı Test Yılları (Tıklayıp Çalıştırın):</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESET_YEARS.map((preset) => (
              <button
                key={preset.year}
                onClick={() => handleRun(preset.year)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer border ${
                  currentYear === preset.year
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white hover:bg-slate-900'
                }`}
                title={preset.tag}
              >
                <span>{preset.year}</span>
                <span className="text-[10px] text-slate-400 font-sans group-hover:text-slate-300">
                  {preset.tag.includes('Artık Yıl Değil') ? '❌ Artık Değil' : preset.tag.includes('Artık') ? '✅ Artık' : ''}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Terminal Window */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden font-mono text-sm ring-1 ring-white/5">
        
        {/* Terminal Header Bar */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/50"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/50"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/50"></span>
            <span className="ml-3 text-xs text-slate-400 flex items-center gap-1.5">
              <TermIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>bash - ArtikYil.java [Enes Öztürk]</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyHistory}
              title="Konsol çıktısını kopyala"
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
            <button
              onClick={handleClear}
              title="Konsolu temizle"
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Temizle</span>
            </button>
          </div>
        </div>

        {/* Terminal Content Screen */}
        <div className="p-4 sm:p-6 min-h-[340px] max-h-[500px] overflow-y-auto space-y-4 text-slate-200">
          
          {/* Compilation Banner */}
          <div className="text-slate-500 text-xs pb-3 border-b border-slate-900 leading-relaxed">
            <div className="text-amber-400 font-semibold mb-1">
              /* ENES ÖZTÜRK - JAVA ARTIK YIL ALGORİTMASI */
            </div>
            <div>$ javac ArtikYil.java</div>
            <div>$ java ArtikYil</div>
            <div className="text-emerald-400 mt-1">✔ Program derlendi ve çalışmaya hazır.</div>
          </div>

          {/* History of runs */}
          {history.map((entry, index) => (
            <div key={entry.id} className="space-y-1.5 pt-2 border-t border-slate-900/60">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <span className="text-slate-600">[{entry.timestamp}]</span>
                <span className="text-amber-400 font-bold">$ java ArtikYil</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-cyan-400 font-semibold select-none">Yıl Giriniz :</span>
                <span className="text-white font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {entry.inputYear}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {entry.isLeap ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                )}
                <span
                  className={`text-base font-bold ${
                    entry.isLeap ? 'text-emerald-300' : 'text-rose-300'
                  }`}
                >
                  {entry.output}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 pl-6 italic">
                Program İmzası: ENES ÖZTÜRK
              </div>
            </div>
          ))}

          {/* Active Run Pending */}
          {isRunning && (
            <div className="flex items-center gap-3 text-amber-400 animate-pulse pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Java JVM hesaplıyor: yil = {inputVal}...</span>
            </div>
          )}

          {/* Prompt Input Form Inside Terminal */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRun();
            }}
            className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <div className="flex items-center gap-2 flex-1 bg-slate-900/90 rounded-xl px-3.5 py-2.5 border border-slate-800 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
              <span className="text-cyan-400 font-bold select-none text-sm whitespace-nowrap">
                Yıl Giriniz :
              </span>
              <input
                ref={inputRef}
                type="number"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Örn: 2024"
                className="w-full bg-transparent text-white font-bold text-base focus:outline-none placeholder:text-slate-600 font-mono"
                min="1"
                max="9999"
              />
              <span className="text-xs text-slate-400 select-none hidden sm:inline">
                [Enter ↵]
              </span>
            </div>

            <button
              type="submit"
              disabled={isRunning || !inputVal}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-500 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Çalıştır (Run)</span>
            </button>
          </form>

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer Bar */}
        <div className="bg-slate-900/60 border-t border-slate-800/80 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Çıkış Kodu: 0 (Başarılı)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Yazar & İmza:</span>
            <span className="text-amber-400 font-bold font-mono">ENES ÖZTÜRK</span>
          </div>
        </div>

      </div>

      {/* Quick Comparison Card based on current analysis */}
      {(() => {
        const analysis = analyzeLeapYear(currentYear);
        return (
          <div
            className={`p-5 rounded-2xl border transition-all ${
              analysis.isLeap
                ? 'bg-emerald-950/20 border-emerald-500/30'
                : 'bg-rose-950/20 border-rose-500/30'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                    analysis.isLeap
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {analysis.isLeap ? '366' : '365'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{analysis.resultMessage}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    {analysis.reason}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-xs px-3 py-1 rounded-full font-mono bg-slate-900 border border-slate-800 text-slate-300">
                  Şubat: <strong className={analysis.isLeap ? 'text-emerald-400' : 'text-amber-400'}>{analysis.februaryDays} Gün</strong>
                </span>
                <span className="text-xs px-3 py-1 rounded-full font-mono bg-slate-900 border border-slate-800 text-slate-300">
                  Yıl: <strong>{analysis.totalDaysInYear} Gün</strong>
                </span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
