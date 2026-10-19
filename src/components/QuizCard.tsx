import React from 'react';
import { Check, X, RotateCcw, ArrowLeft, Sparkles } from 'lucide-react';
import { QuestionNode, PathStep, ResultId } from '../types';
import { playTapSound, playBackSound } from '../utils/audio';

interface QuizCardProps {
  question: QuestionNode;
  stepNumber: number;
  totalEstimatedSteps: number;
  pathHistory: PathStep[];
  onAnswer: (answer: 'YES' | 'NO') => void;
  onGoBack: () => void;
  onReset: () => void;
  onJumpToResultPreview?: (resultId: ResultId) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  stepNumber,
  pathHistory,
  onAnswer,
  onGoBack,
  onReset,
}) => {
  const triggerHaptic = () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(12);
      }
    } catch {
      // Ignore
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-1">
      {/* Top Progress and Nav Bar */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 text-xs font-bold">
            第 {stepNumber} 题
          </span>
          <span className="text-xs text-stone-400 font-medium">
            {question.category}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {pathHistory.length > 0 && (
            <button
              onClick={() => {
                triggerHaptic();
                playBackSound();
                onGoBack();
              }}
              className="flex items-center gap-1 text-xs text-stone-300 hover:text-white transition px-2.5 py-1.5 rounded-lg bg-stone-850 hover:bg-stone-800 border border-stone-750 active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>上一题</span>
            </button>
          )}

          <button
            onClick={() => {
              triggerHaptic();
              playBackSound();
              onReset();
            }}
            className="flex items-center gap-1 text-xs text-stone-400 hover:text-rose-400 transition px-2.5 py-1.5 rounded-lg hover:bg-stone-850 active:scale-95"
            title="重新开始"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">重新开始</span>
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-850 via-stone-900 to-stone-900 border border-stone-750 p-5 sm:p-8 shadow-2xl backdrop-blur-sm">
        {/* Glow orb */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative Quote Mark */}
        <div className="text-rose-500/25 font-serif text-4xl sm:text-6xl leading-none select-none mb-1">
          “
        </div>

        {/* Question Text */}
        <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-stone-100 leading-snug tracking-tight mb-2 sm:mb-3">
          {question.question}
        </h2>

        {/* Tagline / Subtitle */}
        <p className="text-xs sm:text-base text-stone-400 mb-6 sm:mb-8 leading-relaxed">
          {question.tagline}
        </p>

        {/* Action Choice Buttons (Optimized for Mobile Thumbs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* YES Button */}
          <button
            onClick={() => {
              triggerHaptic();
              playTapSound(580);
              onAnswer('YES');
            }}
            className="group relative flex items-center sm:flex-col justify-start sm:justify-center p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-500/25 to-rose-600/15 hover:from-rose-500 hover:to-rose-600 active:from-rose-600 active:to-rose-700 text-stone-100 hover:text-white border-2 border-rose-500/40 hover:border-rose-400 shadow-lg shadow-rose-950/20 active:scale-97 transition-all duration-150 cursor-pointer text-left"
          >
            <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-rose-500/30 group-hover:bg-white/20 flex items-center justify-center shrink-0 mr-3 sm:mr-0 sm:mb-2 transition">
              <Check className="w-5 h-5 sm:w-4 sm:h-4 text-rose-300 group-hover:text-white stroke-[3]" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black tracking-wide text-rose-400 group-hover:text-white mb-0.5 sm:text-center">
                YES 是的
              </div>
              <div className="text-xs text-stone-300 group-hover:text-rose-50 font-medium sm:text-center">
                {question.yesLabel || '会，确实会这样'}
              </div>
            </div>
          </button>

          {/* NO Button */}
          <button
            onClick={() => {
              triggerHaptic();
              playTapSound(460);
              onAnswer('NO');
            }}
            className="group relative flex items-center sm:flex-col justify-start sm:justify-center p-4 sm:p-5 rounded-2xl bg-stone-800/90 hover:bg-stone-750 active:bg-stone-700 text-stone-100 hover:text-white border-2 border-stone-700/80 hover:border-stone-500 shadow-lg active:scale-97 transition-all duration-150 cursor-pointer text-left"
          >
            <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-stone-700 group-hover:bg-white/20 flex items-center justify-center shrink-0 mr-3 sm:mr-0 sm:mb-2 transition">
              <X className="w-5 h-5 sm:w-4 sm:h-4 text-stone-400 group-hover:text-white stroke-[3]" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black tracking-wide text-stone-300 group-hover:text-white mb-0.5 sm:text-center">
                NO 不会
              </div>
              <div className="text-xs text-stone-400 group-hover:text-stone-200 font-medium sm:text-center">
                {question.noLabel || '不会，并没有这种习惯'}
              </div>
            </div>
          </button>
        </div>

        {/* Live Breadcrumbs & History */}
        {pathHistory.length > 0 && (
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-stone-800">
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-400 mb-2">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>当前答题轨迹：</span>
            </div>
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
              {pathHistory.map((step, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span className="text-[11px] px-2 py-0.5 rounded-lg bg-stone-800 text-stone-300 border border-stone-700">
                    Q{idx + 1}:
                    <span className={`ml-1 font-bold ${step.answer === 'YES' ? 'text-rose-400' : 'text-stone-400'}`}>
                      {step.answer}
                    </span>
                  </span>
                  <span className="text-stone-600 text-xs">→</span>
                </div>
              ))}
              <span className="text-[11px] px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                Q{stepNumber} 当前
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tip */}
      <div className="mt-3 text-center">
        <p className="text-[11px] text-stone-400 flex items-center justify-center gap-1">
          <span>💡 凭第一直觉作答，无需反复斟酌</span>
        </p>
      </div>
    </div>
  );
};
