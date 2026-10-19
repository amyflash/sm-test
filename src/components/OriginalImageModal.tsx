import React from 'react';
import { X, CheckCircle, Smartphone } from 'lucide-react';
import { playTapSound } from '../utils/audio';

interface OriginalImageModalProps {
  onClose: () => void;
}

export const OriginalImageModal: React.FC<OriginalImageModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-750 rounded-3xl p-5 sm:p-8 shadow-2xl text-stone-100 my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            playTapSound(450);
            onClose();
          }}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-stone-850 hover:bg-stone-800 text-stone-400 hover:text-white transition active:scale-95 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-4 sm:mb-6 pr-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold mb-1.5">
            <span>📷 原博图文对照</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-white">
            微博热门经典分支测试原贴对照
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            本应用 100% 忠实复刻原图逻辑与金句文案
          </p>
        </div>

        {/* Weibo Mock Card */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-850 border border-stone-750 mb-4 sm:mb-5">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow">
              半
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-sm text-stone-100">
                  半次元cosplay频道
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-400 font-semibold">
                  ✓ 认证
                </span>
              </div>
              <span className="text-[10px] text-stone-400">
                转赞评 5万+ 级现象级互动心理测试
              </span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-stone-200 font-medium leading-relaxed mb-2.5">
            “测测你的SM属性吧~选7的快出来我要和你做朋友！🐱！”
          </div>

          <div className="flex items-center gap-3 text-[10px] sm:text-xs text-stone-400 pt-2 border-t border-stone-800">
            <span>🔄 4.5万 转发</span>
            <span>💬 8122 评论</span>
            <span>👍 2621 点赞</span>
          </div>
        </div>

        {/* Original Results Comparison List */}
        <div className="space-y-2 mb-5">
          <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            原图右侧【测试结果】完整文本对照录入：
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-stone-850/80 border border-stone-750">
              <span className="font-bold text-rose-400 block mb-0.5">1 特顶级S</span>
              <span className="text-stone-300">宇宙为你而存在，你一定是拿皮鞭抽着地球转的那位</span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-850/80 border border-stone-750">
              <span className="font-bold text-amber-400 block mb-0.5">2 老子自有主张型S</span>
              <span className="text-stone-300">我不扑倒你，但也绝对不能让你扑倒我</span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-850/80 border border-stone-750">
              <span className="font-bold text-purple-400 block mb-0.5">3 只对自己碗里的会让步S</span>
              <span className="text-stone-300">除了自家碗里的，其他人别挡路</span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-850/80 border border-stone-750">
              <span className="font-bold text-pink-400 block mb-0.5">4 撒娇任性心S</span>
              <span className="text-stone-300">谁说S不能做宠物……</span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-850/80 border border-stone-750">
              <span className="font-bold text-violet-400 block mb-0.5">5 外表柔弱，内心狂霸的M（？）</span>
              <span className="text-stone-300">在外看起来是M，但关门后第一件事一定是拿起皮鞭</span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-850/80 border border-stone-750">
              <span className="font-bold text-yellow-400 block mb-0.5">6 撒娇求奖励型M</span>
              <span className="text-stone-300">任劳任怨，主人你快夸我嘛~</span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-600/50">
              <span className="font-bold text-emerald-400 block mb-0.5">7 飞蛾扑火型M (原博特别寻找)</span>
              <span className="text-emerald-200">岂止是任劳任怨，简直赴汤蹈火在所不惜</span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-850/80 border border-stone-750">
              <span className="font-bold text-blue-400 block mb-0.5">8 特顶级M</span>
              <span className="text-stone-300">自备皮鞭自备蜡烛自备一切道具你们懂的</span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            playTapSound(500);
            onClose();
          }}
          className="w-full py-2.5 sm:py-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 font-bold text-xs sm:text-sm border border-stone-750 transition active:scale-98"
        >
          返回测试
        </button>
      </div>
    </div>
  );
};
