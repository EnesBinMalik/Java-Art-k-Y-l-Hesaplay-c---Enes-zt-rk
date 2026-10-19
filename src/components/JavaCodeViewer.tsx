import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, CheckCircle, Sparkles, Terminal } from 'lucide-react';
import { JAVA_CODE_STANDARD, JAVA_CODE_IF_ELSE_NESTED, JAVA_CODE_MODERN } from '../utils/leapYear';

export const JavaCodeViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'standard' | 'nested' | 'modern'>('standard');
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    switch (activeTab) {
      case 'nested':
        return { code: JAVA_CODE_IF_ELSE_NESTED, filename: 'ArtikYilIfElse.java' };
      case 'modern':
        return { code: JAVA_CODE_MODERN, filename: 'ArtikYilModern.java' };
      default:
        return { code: JAVA_CODE_STANDARD, filename: 'ArtikYil.java' };
    }
  };

  const { code, filename } = getCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/x-java-source;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Explanation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Yazar & Geliştirici: ENES ÖZTÜRK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Java Kaynak Kodları & Proje Dosyaları
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ödev veya projeleriniz için derlenebilir, temiz ve açıklamalı Java kaynak kodları.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-all border border-slate-700 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>.java İndir</span>
          </button>
        </div>
      </div>

      {/* Code Editor Window */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm ring-1 ring-white/5">
        
        {/* Editor Tabs Header */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 select-none">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('standard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'standard'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>ArtikYil.java (Standart Çözüm)</span>
            </button>

            <button
              onClick={() => setActiveTab('nested')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'nested'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-sky-400" />
              <span>ArtikYilIfElse.java (Açık Mantık)</span>
            </button>

            <button
              onClick={() => setActiveTab('modern')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'modern'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>ArtikYilModern.java (java.time API)</span>
            </button>
          </div>

          <span className="text-xs font-mono text-slate-400">
            {filename}
          </span>
        </div>

        {/* Code Content Box with line numbers */}
        <div className="p-4 sm:p-6 overflow-x-auto max-h-[550px] overflow-y-auto bg-slate-950 text-slate-200 leading-relaxed">
          <pre className="grid grid-cols-[auto_1fr] gap-x-4">
            <span className="select-none text-slate-600 text-right pr-2 border-r border-slate-800/80 font-mono text-xs">
              {code.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </span>
            <code className="text-slate-200 font-mono text-xs sm:text-sm">
              {code.split('\n').map((line, i) => {
                // simple syntax highlight tint
                let colorClass = 'text-slate-200';
                if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
                  colorClass = 'text-emerald-400/90 italic';
                } else if (line.includes('import ') || line.includes('public ') || line.includes('class ') || line.includes('static ') || line.includes('void ') || line.includes('boolean ') || line.includes('int ') || line.includes('new ')) {
                  colorClass = 'text-amber-300';
                } else if (line.includes('System.out.print') || line.includes('scanner.') || line.includes('Year.isLeap')) {
                  colorClass = 'text-sky-300';
                } else if (line.includes('ENES ÖZTÜRK')) {
                  colorClass = 'text-amber-400 font-bold';
                }

                return (
                  <div key={i} className={colorClass}>
                    {line || ' '}
                  </div>
                );
              })}
            </code>
          </pre>
        </div>

        {/* Local Run Guide Footer */}
        <div className="bg-slate-900/80 border-t border-slate-800 px-5 py-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-slate-300 font-bold mb-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>Kendi Bilgisayarınızda (CMD / Terminal) Nasıl Çalıştırılır?</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 font-mono text-slate-300">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[11px] mb-1">1. Adım: Derleme</span>
              <code>javac {filename}</code>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[11px] mb-1">2. Adım: Çalıştırma</span>
              <code>java {filename.replace('.java', '')}</code>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            * Java JDK 8, 11, 17 veya 21 kurulu olmalıdır. Program Scanner sınıfı ile kullanıcıdan konsol girdisi alır.
          </div>
        </div>

      </div>
    </div>
  );
};
