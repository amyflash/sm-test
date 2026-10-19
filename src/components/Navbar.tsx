import React from 'react';
import { Volume2, VolumeX, Sparkles, GitBranch, BookOpen, Image as ImageIcon } from 'lucide-react';
import { playTapSound } from '../utils/audio';

interface NavbarProps {
  currentTab: 'quiz' | 'flowchart' | 'gallery';
  setCurrentTab: (tab: 'quiz' | 'flowchart' | 'gallery') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onOpenOriginalModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  soundEnabled,
  setSoundEnabled,
  onOpenOriginalModal,
}) => {
  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-stone-900/90 border-b border-stone-800 text-stone-100 pt-safe">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Logo & Brand */}
          <div 
            onClick={() => {
              playTapSound(600);
              setCurrentTab('quiz');
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-purple-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-950/40">
              <span className="font-black text-sm sm:text-base tracking-wider">SM</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-sm sm:text-lg text-white tracking-tight">
                  SM属性测试
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-medium">
                  经典版
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-stone-400 hidden sm:block">
                选7的快出来，我要和你做朋友！
              </p>
            </div>
          </div>

          {/* Desktop Tab Controls (Hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-1 bg-stone-800/80 p-1 rounded-xl border border-stone-700/60">
            <button
              onClick={() => {
                playTapSound(520);
                setCurrentTab('quiz');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                currentTab === 'quiz'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>答题测试</span>
            </button>

            <button
              onClick={() => {
                playTapSound(520);
                setCurrentTab('flowchart');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                currentTab === 'flowchart'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              <span>全景流程图</span>
            </button>

            <button
              onClick={() => {
                playTapSound(520);
                setCurrentTab('gallery');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                currentTab === 'gallery'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>8大属性</span>
            </button>
          </div>

          {/* Top Right Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Original Weibo Image View Button */}
            <button
              onClick={() => {
                playTapSound(480);
                onOpenOriginalModal();
              }}
              title="查看原博图文对照"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-750 transition active:scale-95"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs">原图对照</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playTapSound(700);
              }}
              title={soundEnabled ? '音效开启' : '音效静音'}
              className="p-1.5 sm:p-2 rounded-lg bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-750 transition active:scale-95"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-500" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (Thumb Friendly) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-xl border-t border-stone-800 px-3 py-1.5 pb-safe shadow-[0_-8px_20px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => {
              playTapSound(520);
              setCurrentTab('quiz');
            }}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all active:scale-95 ${
              currentTab === 'quiz'
                ? 'text-rose-400 font-bold bg-rose-500/10'
                : 'text-stone-400 font-medium hover:text-stone-200'
            }`}
          >
            <Sparkles className={`w-4 h-4 mb-0.5 ${currentTab === 'quiz' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[11px]">答题测试</span>
          </button>

          <button
            onClick={() => {
              playTapSound(520);
              setCurrentTab('flowchart');
            }}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all active:scale-95 ${
              currentTab === 'flowchart'
                ? 'text-purple-400 font-bold bg-purple-500/10'
                : 'text-stone-400 font-medium hover:text-stone-200'
            }`}
          >
            <GitBranch className={`w-4 h-4 mb-0.5 ${currentTab === 'flowchart' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[11px]">全景流程图</span>
          </button>

          <button
            onClick={() => {
              playTapSound(520);
              setCurrentTab('gallery');
            }}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all active:scale-95 ${
              currentTab === 'gallery'
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-stone-400 font-medium hover:text-stone-200'
            }`}
          >
            <BookOpen className={`w-4 h-4 mb-0.5 ${currentTab === 'gallery' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[11px]">8大图鉴</span>
          </button>
        </div>
      </nav>
    </>
  );
};
