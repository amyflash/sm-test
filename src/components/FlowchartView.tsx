import React, { useState } from 'react';
import { Sparkles, ArrowRight, Play, CheckCircle2, Smartphone, LayoutGrid, HelpCircle } from 'lucide-react';
import { QuestionId, ResultId, PathStep } from '../types';
import { QUESTIONS_DATA, RESULTS_DATA } from '../data/quizData';
import { playTapSound } from '../utils/audio';

interface FlowchartViewProps {
  pathHistory: PathStep[];
  currentResult: ResultId | null;
  onSelectResult: (resultId: ResultId) => void;
  onStartQuizFromNode?: (nodeId: QuestionId) => void;
}

export const FlowchartView: React.FC<FlowchartViewProps> = ({
  pathHistory,
  currentResult,
  onSelectResult,
}) => {
  const [selectedResultHighlight, setSelectedResultHighlight] = useState<ResultId | null>(currentResult || 7);
  const [mobileMode, setMobileMode] = useState<'interactive' | 'panorama'>('interactive');

  // Check if a node was visited in the current path history
  const visitedQuestions = new Set<QuestionId>(pathHistory.map((s) => s.questionId));

  // Determine path for highlighted result
  const getPathForOutcome = (resultId: ResultId): { 
    steps: { questionId: QuestionId; answer: 'YES' | 'NO'; nextLabel: string }[];
    questions: QuestionId[];
  } => {
    switch (resultId) {
      case 1:
        return {
          questions: ['q_hair', 'q_normal', 'q_fork'],
          steps: [
            { questionId: 'q_hair', answer: 'YES', nextLabel: '发现同事/朋友换发型' },
            { questionId: 'q_normal', answer: 'NO', nextLabel: '脑海中不常纠结“正常情况应该怎样”' },
            { questionId: 'q_fork', answer: 'YES', nextLabel: '发现叉子脏了直接找店员交涉' },
          ],
        };
      case 2:
        return {
          questions: ['q_hair', 'q_normal', 'q_fork', 'q_seat'],
          steps: [
            { questionId: 'q_hair', answer: 'YES', nextLabel: '发现同事/朋友换发型' },
            { questionId: 'q_normal', answer: 'NO', nextLabel: '脑海中不常纠结“正常情况应该怎样”' },
            { questionId: 'q_fork', answer: 'NO', nextLabel: '叉子脏了忍耐或自己擦' },
            { questionId: 'q_seat', answer: 'YES', nextLabel: '位置太窄主动要求店员换座' },
          ],
        };
      case 3:
        return {
          questions: ['q_dog', 'q_heavy', 'q_outfit'],
          steps: [
            { questionId: 'q_dog', answer: 'NO', nextLabel: '觉得动物穿衣服无感' },
            { questionId: 'q_heavy', answer: 'YES', nextLabel: '拿很重东西常放下来休息' },
            { questionId: 'q_outfit', answer: 'YES', nextLabel: '服装搭配会主动配合对方' },
          ],
        };
      case 4:
        return {
          questions: ['q_dog', 'q_heavy', 'q_early'],
          steps: [
            { questionId: 'q_dog', answer: 'NO', nextLabel: '对宠物装扮无感' },
            { questionId: 'q_heavy', answer: 'NO', nextLabel: '拿很重东西咬牙坚持' },
            { questionId: 'q_early', answer: 'YES', nextLabel: '与人有约通常提前到达' },
          ],
        };
      case 5:
        return {
          questions: ['q_dog', 'q_heavy', 'q_early'],
          steps: [
            { questionId: 'q_dog', answer: 'NO', nextLabel: '对宠物装扮无感' },
            { questionId: 'q_heavy', answer: 'NO', nextLabel: '拿重物硬扛' },
            { questionId: 'q_early', answer: 'NO', nextLabel: '踩点到达或很少提前' },
          ],
        };
      case 6:
        return {
          questions: ['q_hair', 'q_normal', 'q_metro', 'q_fork'],
          steps: [
            { questionId: 'q_hair', answer: 'YES', nextLabel: '会发现发型改变' },
            { questionId: 'q_normal', answer: 'YES', nextLabel: '常有“正常情况下应该这样”念头' },
            { questionId: 'q_metro', answer: 'NO', nextLabel: '出闸前不急着掏票卡' },
            { questionId: 'q_fork', answer: 'NO', nextLabel: '服务瑕疵倾向息事宁人' },
          ],
        };
      case 7:
        return {
          questions: ['q_dog', 'q_heavy', 'q_outfit', 'q_idiot'],
          steps: [
            { questionId: 'q_dog', answer: 'NO', nextLabel: '对宠物打扮无感' },
            { questionId: 'q_heavy', answer: 'YES', nextLabel: '拿很重东西放下来休息' },
            { questionId: 'q_outfit', answer: 'NO', nextLabel: '穿搭按自己喜好来' },
            { questionId: 'q_idiot', answer: 'NO', nextLabel: '不喜欢被恋人骂笨蛋' },
          ],
        };
      case 8:
        return {
          questions: ['q_dog', 'q_heavy', 'q_outfit', 'q_idiot'],
          steps: [
            { questionId: 'q_dog', answer: 'NO', nextLabel: '对宠物打扮无感' },
            { questionId: 'q_heavy', answer: 'YES', nextLabel: '累了就停下来歇会儿' },
            { questionId: 'q_outfit', answer: 'NO', nextLabel: '穿衣互不干涉' },
            { questionId: 'q_idiot', answer: 'YES', nextLabel: '很享受恋人亲昵地嗔怪“笨蛋”' },
          ],
        };
    }
  };

  const activeHighlightedPath = selectedResultHighlight ? getPathForOutcome(selectedResultHighlight) : null;

  const isQuestionActive = (qId: QuestionId) => {
    if (selectedResultHighlight && activeHighlightedPath) {
      return activeHighlightedPath.questions.includes(qId);
    }
    return visitedQuestions.has(qId);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-6 pb-16 sm:pb-4">
      {/* Top Banner with Mobile View Switcher */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-stone-850 to-stone-900 border border-stone-750 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>🗺️ 流程图全景透视</span>
              <span className="text-[10px] sm:text-xs font-normal px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                10节点 · 8终点
              </span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              原图分支逻辑交互还原，点击编号可一键追溯达成路线。
            </p>
          </div>

          {/* Mobile Display Toggle */}
          <div className="flex sm:hidden items-center self-stretch bg-stone-800 p-1 rounded-xl border border-stone-700">
            <button
              onClick={() => {
                playTapSound(500);
                setMobileMode('interactive');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                mobileMode === 'interactive'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-stone-400'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>路线拆解</span>
            </button>
            <button
              onClick={() => {
                playTapSound(500);
                setMobileMode('panorama');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                mobileMode === 'panorama'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-stone-400'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>全景树图</span>
            </button>
          </div>
        </div>

        {/* Quick Result Selector Filter */}
        <div className="pt-2 border-t border-stone-800 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs text-stone-400 shrink-0">点击结果查看路线：</span>
          <div className="flex items-center gap-1.5">
            {([1, 2, 3, 4, 5, 6, 7, 8] as ResultId[]).map((rId) => {
              const isSelected = selectedResultHighlight === rId;
              return (
                <button
                  key={rId}
                  onClick={() => {
                    playTapSound(550 + rId * 20);
                    setSelectedResultHighlight(rId);
                  }}
                  className={`w-8 h-8 shrink-0 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-950 scale-105 ring-2 ring-rose-400/50'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-750 border border-stone-700 active:scale-95'
                  }`}
                >
                  {rId}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBILE INTERACTIVE PATH BREAKDOWN (Clean vertical scroll on phones) */}
      {selectedResultHighlight && (
        <div className={`sm:hidden ${mobileMode === 'interactive' ? 'block' : 'hidden'}`}>
          {(() => {
            const targetRes = RESULTS_DATA[selectedResultHighlight];
            const pathInfo = getPathForOutcome(selectedResultHighlight);
            return (
              <div className="rounded-3xl bg-stone-900 border border-stone-800 p-5 space-y-4">
                {/* Header Result Summary */}
                <div 
                  onClick={() => onSelectResult(targetRes.id)}
                  className="p-4 rounded-2xl bg-stone-850 border border-stone-750 flex items-center justify-between cursor-pointer active:scale-98 transition"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-rose-400">
                        NO.{targetRes.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${targetRes.themeColor.badgeBg}`}>
                        {targetRes.type}
                      </span>
                    </div>
                    <div className="text-base font-black text-white">
                      {targetRes.title}
                    </div>
                    <p className="text-xs text-amber-200 italic mt-0.5">
                      “{targetRes.originalQuote}”
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                </div>

                {/* Steps Ladder */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>该结果的标准决策路径 (共 {pathInfo.steps.length} 步)：</span>
                  </div>

                  <div className="space-y-2 relative before:absolute before:top-3 before:bottom-3 before:left-4 before:w-0.5 before:bg-stone-800">
                    {pathInfo.steps.map((st, idx) => {
                      const q = QUESTIONS_DATA[st.questionId];
                      return (
                        <div key={idx} className="relative flex items-start gap-3 pl-1">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 border ${
                            st.answer === 'YES'
                              ? 'bg-rose-500 text-white border-rose-400 shadow-sm'
                              : 'bg-stone-800 text-stone-300 border-stone-700'
                          }`}>
                            {idx + 1}
                          </div>

                          <div className="flex-1 p-3 rounded-2xl bg-stone-850/90 border border-stone-750 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-stone-200">
                                {q?.question}
                              </span>
                              <span className={`px-2 py-0.5 rounded font-black text-[10px] ml-1 shrink-0 ${
                                st.answer === 'YES'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : 'bg-stone-750 text-stone-300'
                              }`}>
                                {st.answer}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-400">
                              ↳ {st.nextLabel}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    {/* Destination Finish */}
                    <div className="relative flex items-center gap-3 pl-1 pt-1">
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow">
                        ✓
                      </div>
                      <div className="flex-1 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-600/50 text-xs font-bold text-emerald-300">
                        到达目标：NO.{targetRes.id} {targetRes.title}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectResult(targetRes.id)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white text-xs font-bold shadow active:scale-98 transition flex items-center justify-center gap-1.5"
                >
                  <span>查看此性格的完整深度画像报告</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* FULL PANORAMA TREE VIEW (Visible on desktop or when toggled on mobile) */}
      <div className={`relative overflow-x-auto p-4 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl ${
        mobileMode === 'panorama' ? 'block' : 'hidden sm:block'
      }`}>
        <div className="sm:hidden text-center text-[11px] text-stone-400 mb-3 bg-stone-850 p-2 rounded-xl flex items-center justify-center gap-1">
          <span>👈 左右滑动可查看完整关系网 👉</span>
        </div>

        <div className="min-w-[680px] flex flex-col items-center gap-6">

          {/* START BADGE */}
          <div className="flex flex-col items-center">
            <div className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-sm tracking-widest shadow-lg shadow-rose-950/50 flex items-center gap-2">
              <Play className="w-4 h-4 fill-white" />
              <span>START 开始测试</span>
            </div>
            <div className="w-0.5 h-6 bg-stone-700" />
          </div>

          {/* LEVEL 1: Q_HAIR */}
          <div className="w-full flex justify-center">
            <div className={`p-4 rounded-2xl max-w-md w-full text-center transition-all border ${
              isQuestionActive('q_hair')
                ? 'bg-rose-950/60 border-rose-500 shadow-lg shadow-rose-950/40 text-rose-100 ring-2 ring-rose-500/20'
                : 'bg-stone-850 border-stone-750 text-stone-200'
            }`}>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                起点节点
              </div>
              <div className="text-sm font-bold">
                {QUESTIONS_DATA.q_hair.question}
              </div>
              {visitedQuestions.has('q_hair') && (
                <div className="mt-1 text-[11px] text-rose-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 已回答
                </div>
              )}
            </div>
          </div>

          {/* Connectors Branch from Q1 */}
          <div className="w-full max-w-xl flex justify-between px-16 text-xs font-black">
            <div className="flex flex-col items-center">
              <span className="text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-600/40">
                YES 是的
              </span>
              <div className="w-0.5 h-6 bg-stone-700" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-stone-300 bg-stone-800 px-2 py-0.5 rounded border border-stone-700">
                NO 不会
              </span>
              <div className="w-0.5 h-6 bg-stone-700" />
            </div>
          </div>

          {/* LEVEL 2: Q_NORMAL & Q_DOG */}
          <div className="w-full max-w-3xl grid grid-cols-2 gap-6">
            <div className={`p-3.5 rounded-2xl transition-all border ${
              isQuestionActive('q_normal')
                ? 'bg-rose-950/60 border-rose-500 shadow-md text-rose-100 ring-1 ring-rose-400/40'
                : 'bg-stone-850 border-stone-750 text-stone-200'
            }`}>
              <div className="text-[10px] text-stone-400 mb-1">规则秩序</div>
              <div className="text-xs sm:text-sm font-semibold">
                {QUESTIONS_DATA.q_normal.question}
              </div>
            </div>

            <div className={`p-3.5 rounded-2xl transition-all border ${
              isQuestionActive('q_dog')
                ? 'bg-rose-950/60 border-rose-500 shadow-md text-rose-100 ring-1 ring-rose-400/40'
                : 'bg-stone-850 border-stone-750 text-stone-200'
            }`}>
              <div className="text-[10px] text-stone-400 mb-1">日常萌感</div>
              <div className="text-xs sm:text-sm font-semibold">
                {QUESTIONS_DATA.q_dog.question}
              </div>
            </div>
          </div>

          {/* LEVEL 3: Core Hub Questions */}
          <div className="w-full max-w-4xl grid grid-cols-3 gap-4 pt-2">
            <div className={`p-3 rounded-xl border text-xs sm:text-sm ${
              isQuestionActive('q_metro')
                ? 'bg-rose-950/60 border-rose-500 text-rose-100'
                : 'bg-stone-850 border-stone-750 text-stone-300'
            }`}>
              <span className="text-[10px] text-stone-400 block mb-0.5">闸口拿卡</span>
              <span className="font-medium">{QUESTIONS_DATA.q_metro.question}</span>
            </div>

            <div className={`p-3 rounded-xl border text-xs sm:text-sm ${
              isQuestionActive('q_fork')
                ? 'bg-rose-950/60 border-rose-500 text-rose-100'
                : 'bg-stone-850 border-stone-750 text-stone-300'
            }`}>
              <span className="text-[10px] text-stone-400 block mb-0.5">脏叉子交涉</span>
              <span className="font-medium">{QUESTIONS_DATA.q_fork.question}</span>
            </div>

            <div className={`p-3 rounded-xl border text-xs sm:text-sm ${
              isQuestionActive('q_heavy')
                ? 'bg-rose-950/60 border-rose-500 text-rose-100'
                : 'bg-stone-850 border-stone-750 text-stone-300'
            }`}>
              <span className="text-[10px] text-stone-400 block mb-0.5">拿重物休息</span>
              <span className="font-medium">{QUESTIONS_DATA.q_heavy.question}</span>
            </div>
          </div>

          {/* LEVEL 4: Detail Interactions */}
          <div className="w-full max-w-4xl grid grid-cols-4 gap-3 pt-2">
            <div className={`p-3 rounded-xl border text-xs ${
              isQuestionActive('q_seat')
                ? 'bg-rose-950/60 border-rose-500 text-rose-100'
                : 'bg-stone-850 border-stone-750 text-stone-300'
            }`}>
              <span className="text-[10px] text-stone-400 block mb-0.5">座位太窄</span>
              <span className="font-medium">{QUESTIONS_DATA.q_seat.question}</span>
            </div>

            <div className={`p-3 rounded-xl border text-xs ${
              isQuestionActive('q_outfit')
                ? 'bg-rose-950/60 border-rose-500 text-rose-100'
                : 'bg-stone-850 border-stone-750 text-stone-300'
            }`}>
              <span className="text-[10px] text-stone-400 block mb-0.5">配合穿搭</span>
              <span className="font-medium">{QUESTIONS_DATA.q_outfit.question}</span>
            </div>

            <div className={`p-3 rounded-xl border text-xs ${
              isQuestionActive('q_early')
                ? 'bg-rose-950/60 border-rose-500 text-rose-100'
                : 'bg-stone-850 border-stone-750 text-stone-300'
            }`}>
              <span className="text-[10px] text-stone-400 block mb-0.5">提前到达</span>
              <span className="font-medium">{QUESTIONS_DATA.q_early.question}</span>
            </div>

            <div className={`p-3 rounded-xl border text-xs ${
              isQuestionActive('q_idiot')
                ? 'bg-rose-950/60 border-rose-500 text-rose-100'
                : 'bg-stone-850 border-stone-750 text-stone-300'
            }`}>
              <span className="text-[10px] text-stone-400 block mb-0.5">被骂笨蛋</span>
              <span className="font-medium">{QUESTIONS_DATA.q_idiot.question}</span>
            </div>
          </div>

          {/* DIVIDER TO RESULTS */}
          <div className="w-full border-t border-dashed border-stone-800 my-2" />

          {/* LEVEL 5: ALL 8 RESULTS GRID */}
          <div className="w-full">
            <div className="text-center text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>8条终点测试结果（点击任意卡片查看详细报告）</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {([1, 2, 3, 4, 5, 6, 7, 8] as ResultId[]).map((rId) => {
                const res = RESULTS_DATA[rId];
                const isSelected = selectedResultHighlight === rId;
                const isCurrentHit = currentResult === rId;

                return (
                  <div
                    key={rId}
                    onClick={() => {
                      playTapSound(600);
                      onSelectResult(rId);
                    }}
                    className={`relative p-3.5 rounded-2xl transition-all cursor-pointer border text-left group active:scale-97 ${
                      isSelected || isCurrentHit
                        ? 'bg-stone-800 border-rose-500 ring-2 ring-rose-500/30 shadow-xl'
                        : 'bg-stone-850/80 hover:bg-stone-800 border-stone-750 hover:border-stone-650'
                    }`}
                  >
                    {isCurrentHit && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold shadow">
                        当前命中
                      </span>
                    )}

                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-rose-400">
                        #{res.id}
                      </span>
                      <span className="text-[10px] text-stone-400 px-1.5 py-0.5 rounded bg-stone-800">
                        {res.type}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-white mb-1 group-hover:text-rose-300 transition line-clamp-1">
                      {res.title}
                    </div>

                    <p className="text-[11px] text-stone-400 line-clamp-2 italic mb-2">
                      “{res.originalQuote}”
                    </p>

                    <div className="flex items-center justify-end text-[11px] text-rose-400 font-medium">
                      <span>查看详情</span>
                      <ArrowRight className="w-3 h-3 ml-0.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
