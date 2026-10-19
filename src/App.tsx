import React, { useState } from 'react';
import { Header } from './components/Header';
import { JavaTerminal } from './components/JavaTerminal';
import { StepByStepVisualizer } from './components/StepByStepVisualizer';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { RangeScanner } from './components/RangeScanner';
import { EducationalTheory } from './components/EducationalTheory';
import { Footer } from './components/Footer';
import { Terminal, Calendar, Code2, Binary, BookOpen, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'analysis' | 'code' | 'scanner' | 'theory'>('terminal');
  const [currentYear, setCurrentYear] = useState<number>(2020);

  const handleSelectYearFromScanner = (year: number) => {
    setCurrentYear(year);
    setActiveTab('analysis');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Navbar & Signature */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Header Banner */}
      <div className="border-b border-slate-900 bg-gradient-to-b from-slate-900/50 to-transparent py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300 font-medium">Senaryo Doğrulandı:</span>
            <span className="text-emerald-400 font-mono">2020 (Artık Yıl)</span>
            <span>•</span>
            <span className="text-rose-400 font-mono">2021 (Artık Yıl Değildir)</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">Özel Tasarım & Algoritma:</span>
            <span className="text-amber-400 font-bold font-mono tracking-wide">
              ENES ÖZTÜRK
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'terminal' && (
          <JavaTerminal
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            onAnalysisSelect={() => setActiveTab('analysis')}
          />
        )}

        {activeTab === 'analysis' && (
          <StepByStepVisualizer
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
          />
        )}

        {activeTab === 'code' && <JavaCodeViewer />}

        {activeTab === 'scanner' && (
          <RangeScanner onSelectYear={handleSelectYearFromScanner} />
        )}

        {activeTab === 'theory' && <EducationalTheory />}
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}
