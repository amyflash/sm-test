import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart, Shield, Shuffle } from 'lucide-react';
import { ResultId, PersonalityResult } from '../types';
import { RESULTS_DATA } from '../data/quizData';
import { playTapSound } from '../utils/audio';

interface AllTypesGalleryProps {
  onSelectResult: (resultId: ResultId) => void;
  currentResult: ResultId | null;
}

export const AllTypesGallery: React.FC<AllTypesGalleryProps> = ({
  onSelectResult,
  currentResult,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'S' | 'M' | 'Switch'>('ALL');

  const allResults = Object.values(RESULTS_DATA) as PersonalityResult[];

  const filtered = allResults.filter((item) => {
    if (filter === 'ALL') return true;
    if (filter === 'S') return item.type === 'S';
    if (filter === 'M') return item.type === 'M';
    if (filter === 'Switch') return item.type === 'Switch';
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-6 pb-20 sm:pb-6 px-1">
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-stone-850 via-stone-900 to-stone-850 border border-stone-750 flex flex-col gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>全量属性图鉴</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight mb-1">
            8大经典性格画像全览
          </h2>
          <p className="text-xs text-stone-400">
            从“拿皮鞭抽地球”到“赴汤蹈火”，轻触卡片查看深度解构。
          </p>
        </div>

        {/* Filter Pills with Horizontal Scroll on Mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => {
              playTapSound(500);
              setFilter('ALL');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition active:scale-95 ${
              filter === 'ALL'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            全部 (8)
          </button>
          <button
            onClick={() => {
              playTapSound(520);
              setFilter('S');
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition active:scale-95 ${
              filter === 'S'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-stone-800 text-stone-400 hover:text-rose-300'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>S掌控型 (4)</span>
          </button>
          <button
            onClick={() => {
              playTapSound(540);
              setFilter('M');
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition active:scale-95 ${
              filter === 'M'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-stone-800 text-stone-400 hover:text-blue-300'
            }`}
          >
            <Heart className="w-3 h-3" />
            <span>M顺从型 (3)</span>
          </button>
          <button
            onClick={() => {
              playTapSound(560);
              setFilter('Switch');
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition active:scale-95 ${
              filter === 'Switch'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-stone-800 text-stone-400 hover:text-purple-300'
            }`}
          >
            <Shuffle className="w-3 h-3" />
            <span>双面 (1)</span>
          </button>
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filtered.map((item) => {
          const isCurrent = currentResult === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                playTapSound(600);
                onSelectResult(item.id);
              }}
              className={`group relative overflow-hidden rounded-3xl p-4 sm:p-6 transition-all duration-150 cursor-pointer border text-left flex flex-col justify-between active:scale-98 ${
                isCurrent
                  ? 'bg-stone-800 border-rose-500 shadow-xl ring-2 ring-rose-500/20'
                  : 'bg-stone-850 hover:bg-stone-800 border-stone-750 hover:border-stone-650'
              }`}
            >
              {/* Highlight badge for current or 7 */}
              {isCurrent && (
                <div className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black shadow">
                  当前你的结果
                </div>
              )}
              {item.id === 7 && !isCurrent && (
                <div className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  “选7的做朋友”
                </div>
              )}

              <div>
                {/* Header Tag */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-black text-rose-400">
                    NO.{item.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${item.themeColor.badgeBg}`}>
                    {item.type === 'Switch' ? '双面 Switch' : `${item.type} 型`}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-rose-300 transition mb-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 mb-2.5 font-medium">
                  {item.subtitle}
                </p>

                {/* Original Quote */}
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-750 mb-3">
                  <p className="text-xs font-bold text-amber-200 italic line-clamp-2">
                    “{item.originalQuote}”
                  </p>
                </div>

                {/* Ratio Bar */}
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-[10px] font-semibold text-stone-400">
                    <span>S 掌控: {item.sPercentage}%</span>
                    <span>M 顺从: {item.mPercentage}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-stone-800 flex overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full"
                      style={{ width: `${item.sPercentage}%` }}
                    />
                    <div 
                      className="bg-blue-500 h-full"
                      style={{ width: `${item.mPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-400">
                  灵魂CP: #{item.bestMatchId}号
                </span>
                <span className="text-rose-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>查看详情</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
