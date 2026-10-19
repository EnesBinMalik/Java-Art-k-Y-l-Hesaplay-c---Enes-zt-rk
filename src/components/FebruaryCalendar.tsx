import React from 'react';
import { Calendar as CalIcon, Sparkles, Check, AlertCircle } from 'lucide-react';
import { getFebruaryDays } from '../utils/leapYear';

interface FebruaryCalendarProps {
  year: number;
}

const WEEK_DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

export const FebruaryCalendar: React.FC<FebruaryCalendarProps> = ({ year }) => {
  const { isLeap, daysCount, startDayOfWeek } = getFebruaryDays(year);

  // Generate blank offset slots + day numbers
  const calendarSlots: (number | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarSlots.push(null);
  }
  for (let d = 1; d <= daysCount; d++) {
    calendarSlots.push(d);
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <CalIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Şubat {year} Takvimi</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-mono font-semibold ${
                  isLeap
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                {daysCount} Gün
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {isLeap ? '29 Şubat eklendi (Artık Gün)' : '28 gün çeker (Normal Yıl)'}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono text-slate-400 block">Toplam Yıl</span>
          <span className="text-sm font-bold text-white font-mono">
            {isLeap ? '366 Gün' : '365 Gün'}
          </span>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold text-slate-400 mt-4 mb-2">
        {WEEK_DAYS.map((day, idx) => (
          <div
            key={day}
            className={`py-1.5 rounded-md ${
              idx >= 5 ? 'text-amber-400/80 bg-amber-500/5' : 'text-slate-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-mono text-xs sm:text-sm">
        {calendarSlots.map((day, index) => {
          if (day === null) {
            return (
              <div
                key={`empty-${index}`}
                className="h-10 sm:h-12 rounded-lg bg-slate-950/30 border border-dashed border-slate-900/60"
              />
            );
          }

          const isFeb29 = day === 29;

          return (
            <div
              key={`day-${day}`}
              className={`h-10 sm:h-12 rounded-lg flex flex-col items-center justify-center relative transition-all ${
                isFeb29
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 animate-pulse'
                  : 'bg-slate-950/70 text-slate-200 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <span className="text-sm sm:text-base">{day}</span>
              {isFeb29 && (
                <span className="text-[9px] font-sans font-bold leading-none uppercase tracking-tighter mt-0.5">
                  Artık Gün
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* 29 February Special Info Note */}
      <div className="mt-5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs flex items-start gap-3">
        {isLeap ? (
          <>
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-emerald-400 font-semibold">{year} bir artık yıldır:</strong>{' '}
              Dünya’nın Güneş etrafındaki 365 gün 6 saatlik dönüşünün çeyrek günlük fazlalığı 4 yılda 1 tam gün oluşturur. Bu sebeple <strong>29 Şubat</strong> takvime eklenmiştir.
            </p>
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-amber-400 font-semibold">{year} normal bir yıldır:</strong>{' '}
              Şubat ayı 28 gün çeker. 29 Şubat bu takvimde yer almaz ve yıl toplamda 365 gündür.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
