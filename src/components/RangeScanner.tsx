import React, { useState, useMemo } from 'react';
import { Filter, Calendar, Sparkles, CheckCircle2, XCircle, Search } from 'lucide-react';
import { analyzeLeapYear } from '../utils/leapYear';

interface RangeScannerProps {
  onSelectYear: (year: number) => void;
}

export const RangeScanner: React.FC<RangeScannerProps> = ({ onSelectYear }) => {
  const [startYear, setStartYear] = useState<number>(1990);
  const [endYear, setEndYear] = useState<number>(2035);
  const [filterMode, setFilterMode] = useState<'all' | 'leap' | 'century'>('all');

  // Compute years list with safety clamp
  const yearsList = useMemo(() => {
    const s = Math.max(1, Math.min(startYear, endYear));
    const e = Math.min(9999, Math.max(startYear, endYear));
    const list = [];
    const count = Math.min(e - s + 1, 300); // max 300 for snappy UI

    for (let y = s; y < s + count; y++) {
      list.push(analyzeLeapYear(y));
    }
    return list;
  }, [startYear, endYear]);

  const filteredYears = useMemo(() => {
    if (filterMode === 'leap') {
      return yearsList.filter((item) => item.isLeap);
    }
    if (filterMode === 'century') {
      return yearsList.filter((item) => item.isDivisibleBy100);
    }
    return yearsList;
  }, [yearsList, filterMode]);

  const totalLeapCount = useMemo(
    () => yearsList.filter((item) => item.isLeap).length,
    [yearsList]
  );

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
            Toplu Analiz & İstatistik
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Yıl Aralığı Tarayıcı (Batch Scanner)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Belirlediğiniz tarih aralığındaki tüm yılları Java algoritmasıyla saniyeler içinde tarayın.
          </p>
        </div>

        {/* Inputs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 font-mono">Başlangıç:</span>
            <input
              type="number"
              value={startYear}
              onChange={(e) => setStartYear(parseInt(e.target.value, 10) || 1)}
              className="w-20 bg-transparent text-white font-mono font-bold text-sm focus:outline-none"
              min="1"
              max="9999"
            />
          </div>

          <span className="text-slate-500 font-bold">-</span>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 font-mono">Bitiş:</span>
            <input
              type="number"
              value={endYear}
              onChange={(e) => setEndYear(parseInt(e.target.value, 10) || 1)}
              className="w-20 bg-transparent text-white font-mono font-bold text-sm focus:outline-none"
              min="1"
              max="9999"
            />
          </div>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block mb-1">Taranan Yıl Sayısı</span>
          <span className="text-2xl font-extrabold text-white font-mono">{yearsList.length}</span>
        </div>
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4">
          <span className="text-xs text-emerald-400 block mb-1">Artık Yıl Sayısı</span>
          <span className="text-2xl font-extrabold text-emerald-400 font-mono">{totalLeapCount}</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block mb-1">Normal Yıl Sayısı</span>
          <span className="text-2xl font-extrabold text-slate-300 font-mono">
            {yearsList.length - totalLeapCount}
          </span>
        </div>
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4">
          <span className="text-xs text-amber-400 block mb-1">Eklenen Artık Gün (+29 Şub)</span>
          <span className="text-2xl font-extrabold text-amber-300 font-mono">+{totalLeapCount} Gün</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Tüm Yıllar ({yearsList.length})
          </button>
          <button
            onClick={() => setFilterMode('leap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterMode === 'leap'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Yalnızca Artık Yıllar ({totalLeapCount})
          </button>
          <button
            onClick={() => setFilterMode('century')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterMode === 'century'
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Yüzyıl Yılları (100'ün Katları)
          </button>
        </div>

        {/* Quick Range Presets */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="text-slate-500">Hazır Aralıklar:</span>
          <button
            onClick={() => {
              setStartYear(1980);
              setEndYear(2030);
            }}
            className="hover:text-amber-400 underline cursor-pointer"
          >
            1980-2030
          </button>
          <span>•</span>
          <button
            onClick={() => {
              setStartYear(1600);
              setEndYear(2100);
            }}
            className="hover:text-amber-400 underline cursor-pointer"
          >
            1600-2100 (Yüzyıl Testi)
          </button>
          <span>•</span>
          <button
            onClick={() => {
              setStartYear(2020);
              setEndYear(2040);
            }}
            className="hover:text-amber-400 underline cursor-pointer"
          >
            2020-2040
          </button>
        </div>
      </div>

      {/* Grid of Year Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredYears.map((item) => (
          <div
            key={item.year}
            onClick={() => onSelectYear(item.year)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer group hover:scale-[1.02] ${
              item.isLeap
                ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/70'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base font-bold font-mono text-white group-hover:text-amber-400 transition-colors">
                {item.year}
              </span>
              {item.isLeap ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <XCircle className="w-4 h-4 text-slate-600" />
              )}
            </div>

            <div className="mt-1 text-[11px] text-slate-400">
              {item.isLeap ? (
                <span className="text-emerald-400 font-semibold font-mono">
                  366 Gün (Artık)
                </span>
              ) : (
                <span className="text-slate-400 font-mono">
                  365 Gün
                </span>
              )}
            </div>

            {item.isDivisibleBy100 && (
              <div className="mt-1">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  {item.isDivisibleBy400 ? 'Yüzyıl (400 Katı)' : 'Yüzyıl (İstisna)'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredYears.length === 0 && (
        <div className="text-center py-12 text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800">
          Bu filtreye uygun yıl bulunamadı.
        </div>
      )}
    </div>
  );
};
