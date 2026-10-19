import React from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Share2, 
  GitBranch, 
  Heart, 
  ShieldAlert, 
  Smile, 
  Compass, 
  Zap,
  BookOpen
} from 'lucide-react';
import { PersonalityResult, ResultId, PathStep } from '../types';
import { RESULTS_DATA, QUESTIONS_DATA } from '../data/quizData';
import { playTapSound } from '../utils/audio';

interface ResultCardProps {
  result: PersonalityResult;
  pathHistory: PathStep[];
  onReset: () => void;
  onViewFlowchart: () => void;
  onOpenSharePoster: () => void;
  onSelectResult: (resultId: ResultId) => void;
  onViewGallery: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  pathHistory,
  onReset,
  onViewFlowchart,
  onOpenSharePoster,
  onSelectResult,
  onViewGallery,
}) => {
  const bestMatch = RESULTS_DATA[result.bestMatchId];
  const worstMatch = RESULTS_DATA[result.worstMatchId];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 pb-20 sm:pb-6 px-1">
      {/* Easter Egg Banner for Type 7 (飞蛾扑火型M) or special types */}
      {result.id === 7 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 border-2 border-emerald-500/60 shadow-xl shadow-emerald-950/40 text-emerald-100 flex items-start gap-3">
          <div className="text-2xl mt-0.5">🌟</div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className="font-black text-xs px-2 py-0.5 rounded-full bg-emerald-500 text-stone-950">
                原博重点寻找
              </span>
              <span className="text-xs text-emerald-300 font-bold">
                “选7的快出来，我要和你做朋友！”
              </span>
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              恭喜你解锁了微博原博主最想寻找的灵魂挚友类型！你的无私与深情，是人间不可多得的宝物！
            </p>
          </div>
        </div>
      )}

      {/* Main Result Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-850 via-stone-900 to-stone-950 border border-stone-750 shadow-2xl p-5 sm:p-9 text-stone-100">
        {/* Glow ambient background */}
        <div 
          className="absolute -top-24 -right-24 w-52 sm:w-64 h-52 sm:h-64 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ backgroundColor: result.themeColor.accent }}
        />

        {/* Top Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-800 border border-stone-700 text-stone-300">
              NO.{result.id}
            </span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${result.themeColor.badgeBg}`}>
              {result.type === 'Switch' ? '双面 Switch' : `${result.type} 型属性`}
            </span>
          </div>

          <div className="text-[11px] sm:text-xs text-stone-400">
            命中率约 12.5%
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-5 sm:mb-6">
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-1.5 flex items-center gap-2 sm:gap-3">
            <span>{result.title}</span>
            <span className="text-lg sm:text-2xl text-stone-400 font-normal">
              #{result.id}
            </span>
          </h1>
          <p className="text-xs sm:text-base text-stone-300 font-medium">
            {result.subtitle}
          </p>
        </div>

        {/* Original Weibo Quote Quote-Box */}
        <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-stone-800/80 to-stone-850/80 border border-stone-700/80 shadow-inner mb-5 sm:mb-6">
          <div className="text-[11px] font-bold uppercase text-amber-400/90 tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>原博经典金句评语</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-amber-200 leading-snug italic">
            “{result.originalQuote}”
          </p>
        </div>

        {/* S vs M Ratio Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-stone-900/90 border border-stone-800">
          <div className="flex justify-between items-center text-xs font-bold text-stone-300 mb-2">
            <span className="flex items-center gap-1 text-rose-400">
              <Zap className="w-3.5 h-3.5" />
              S 掌控指数: {result.sPercentage}%
            </span>
            <span className="flex items-center gap-1 text-blue-400">
              M 顺从指数: {result.mPercentage}%
              <Heart className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-stone-800 overflow-hidden flex p-0.5">
            <div 
              className="h-full rounded-l-full bg-gradient-to-r from-rose-600 to-pink-500 transition-all duration-1000"
              style={{ width: `${result.sPercentage}%` }}
              title={`S 指数 ${result.sPercentage}%`}
            />
            <div 
              className="h-full rounded-r-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000"
              style={{ width: `${result.mPercentage}%` }}
              title={`M 指数 ${result.mPercentage}%`}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {result.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-xl bg-stone-800/90 text-stone-300 border border-stone-700/60"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Summary Description */}
        <div className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6 bg-stone-850/40 p-4 rounded-2xl border border-stone-800">
          {result.summary}
        </div>

        {/* 4-Dimension Attributes Radar Bar Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-6">
          <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800">
            <div className="flex justify-between text-[11px] sm:text-xs text-stone-400 mb-1 font-medium">
              <span>👑 掌控欲</span>
              <span className="text-stone-200 font-bold">{result.radarScores.dominance}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-stone-800 overflow-hidden">
              <div 
                className="h-full bg-rose-500 rounded-full" 
                style={{ width: `${result.radarScores.dominance}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800">
            <div className="flex justify-between text-[11px] sm:text-xs text-stone-400 mb-1 font-medium">
              <span>❤️ 奉献度</span>
              <span className="text-stone-200 font-bold">{result.radarScores.devotion}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-stone-800 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full" 
                style={{ width: `${result.radarScores.devotion}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800">
            <div className="flex justify-between text-[11px] sm:text-xs text-stone-400 mb-1 font-medium">
              <span>🛡️ 边界感</span>
              <span className="text-stone-200 font-bold">{result.radarScores.boundary}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-stone-800 overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full" 
                style={{ width: `${result.radarScores.boundary}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800">
            <div className="flex justify-between text-[11px] sm:text-xs text-stone-400 mb-1 font-medium">
              <span>🐾 撒娇萌度</span>
              <span className="text-stone-200 font-bold">{result.radarScores.playfulness}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-stone-800 overflow-hidden">
              <div 
                className="h-full bg-pink-500 rounded-full" 
                style={{ width: `${result.radarScores.playfulness}%` }}
              />
            </div>
          </div>
        </div>

        {/* Key Traits List */}
        <div className="mb-6 space-y-2">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-stone-400" />
            <span>核心行为图鉴</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
            {result.keyTraits.map((trait, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-stone-800/40 border border-stone-750">
                <span className="text-rose-400 font-bold shrink-0">✓</span>
                <span>{trait}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dating and Friendship Behavior */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 text-xs leading-relaxed">
          <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800">
            <span className="font-bold text-rose-300 block mb-1">
              💘 恋爱相处风格：
            </span>
            <p className="text-stone-300">{result.datingStyle}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800">
            <span className="font-bold text-amber-300 block mb-1">
              🤝 朋友相处模式：
            </span>
            <p className="text-stone-300">{result.friendshipStyle}</p>
          </div>
        </div>

        {/* Best and Worst Match Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6">
          {/* Best Match */}
          <div 
            onClick={() => {
              playTapSound(620);
              onSelectResult(result.bestMatchId);
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-950/40 to-stone-900 border border-rose-800/50 hover:border-rose-500 transition cursor-pointer active:scale-98 group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                天作之合 · 灵魂CP
              </span>
              <span className="text-[10px] text-stone-400 group-hover:text-rose-300">
                点击查看 →
              </span>
            </div>
            <div className="font-bold text-stone-100 text-xs sm:text-sm mb-1">
              #{bestMatch.id} {bestMatch.title}
            </div>
            <p className="text-[11px] text-stone-400 line-clamp-1 italic">
              “{bestMatch.originalQuote}”
            </p>
          </div>

          {/* Worst / Avoid Match */}
          <div 
            onClick={() => {
              playTapSound(480);
              onSelectResult(result.worstMatchId);
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 hover:border-stone-700 transition cursor-pointer active:scale-98 group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-stone-400 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                磨合极高 · 火星撞地球
              </span>
              <span className="text-[10px] text-stone-400 group-hover:text-stone-300">
                点击查看 →
              </span>
            </div>
            <div className="font-bold text-stone-200 text-xs sm:text-sm mb-1">
              #{worstMatch.id} {worstMatch.title}
            </div>
            <p className="text-[11px] text-stone-400 line-clamp-1 italic">
              “{worstMatch.originalQuote}”
            </p>
          </div>
        </div>

        {/* Life Advice */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200/90 text-xs mb-6 sm:mb-8 flex items-start gap-2.5">
          <Smile className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300">相处秘籍：</span>
            <span>{result.advice}</span>
          </div>
        </div>

        {/* Path History Breakdown */}
        {pathHistory.length > 0 && (
          <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80">
            <h4 className="text-xs font-bold text-stone-400 mb-2 flex items-center justify-between">
              <span>你的答题抉择脉络：</span>
              <button
                onClick={() => {
                  playTapSound(520);
                  onViewFlowchart();
                }}
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold text-xs active:scale-95"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>全景图路线</span>
              </button>
            </h4>

            <div className="space-y-1.5 text-xs">
              {pathHistory.map((step, idx) => {
                const q = QUESTIONS_DATA[step.questionId];
                return (
                  <div key={idx} className="flex items-center justify-between gap-2 py-1 border-b border-stone-800/50 last:border-none">
                    <span className="text-stone-400 truncate flex-1 text-[11px] sm:text-xs">
                      {idx + 1}. {q?.question}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-black text-[10px] shrink-0 ${
                      step.answer === 'YES' 
                        ? 'bg-rose-500/20 text-rose-300' 
                        : 'bg-stone-800 text-stone-400'
                    }`}>
                      {step.answer}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <button
            onClick={() => {
              playTapSound(600);
              onOpenSharePoster();
            }}
            className="w-full flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-black text-sm shadow-xl shadow-rose-950/40 active:scale-98 transition cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>生成专属海报 / 发圈分享</span>
          </button>

          <button
            onClick={() => {
              playTapSound(500);
              onReset();
            }}
            className="flex items-center justify-center gap-2 py-3 sm:py-3.5 px-5 rounded-2xl bg-stone-800 hover:bg-stone-750 text-stone-200 font-bold text-xs sm:text-sm border border-stone-700 active:scale-98 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重新测一次</span>
          </button>

          <button
            onClick={() => {
              playTapSound(500);
              onViewGallery();
            }}
            className="flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-750 text-stone-200 font-bold text-xs sm:text-sm border border-stone-700 active:scale-98 transition cursor-pointer"
            title="查看8大类型图鉴"
          >
            <BookOpen className="w-4 h-4" />
            <span className="sm:hidden">图鉴</span>
            <span className="hidden sm:inline">全部8大属性</span>
          </button>
        </div>
      </div>
    </div>
  );
};
