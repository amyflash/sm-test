/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  QuestionId, 
  ResultId, 
  PathStep 
} from './types';
import { 
  QUESTIONS_DATA, 
  RESULTS_DATA, 
  INITIAL_QUESTION_ID 
} from './data/quizData';
import { Navbar } from './components/Navbar';
import { QuizCard } from './components/QuizCard';
import { ResultCard } from './components/ResultCard';
import { FlowchartView } from './components/FlowchartView';
import { AllTypesGallery } from './components/AllTypesGallery';
import { SharePosterModal } from './components/SharePosterModal';
import { OriginalImageModal } from './components/OriginalImageModal';
import { 
  getSoundEnabled, 
  setSoundEnabled, 
  playFanfareSound,
  playTapSound 
} from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'quiz' | 'flowchart' | 'gallery'>('quiz');
  const [currentQuestionId, setCurrentQuestionId] = useState<QuestionId>(INITIAL_QUESTION_ID);
  const [pathHistory, setPathHistory] = useState<PathStep[]>([]);
  const [resultId, setResultId] = useState<ResultId | null>(null);
  const [inspectResultId, setInspectResultId] = useState<ResultId | null>(null);
  const [sound, setSound] = useState<boolean>(true);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showOriginalModal, setShowOriginalModal] = useState<boolean>(false);

  // Sync sound setting
  useEffect(() => {
    setSound(getSoundEnabled());
  }, []);

  const handleToggleSound = (enabled: boolean) => {
    setSound(enabled);
    setSoundEnabled(enabled);
  };

  // Answer handler
  const handleAnswer = (answer: 'YES' | 'NO') => {
    const currentQuestion = QUESTIONS_DATA[currentQuestionId];
    if (!currentQuestion) return;

    const nextTarget = answer === 'YES' ? currentQuestion.yesTarget : currentQuestion.noTarget;

    const newStep: PathStep = {
      questionId: currentQuestionId,
      answer,
      nextTarget,
    };

    const newHistory = [...pathHistory, newStep];
    setPathHistory(newHistory);

    if (typeof nextTarget === 'number') {
      // Reached result!
      setResultId(nextTarget);
      playFanfareSound();

      // Launch celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#a855f7', '#eab308', '#06b6d4'],
        });
      } catch {
        // Ignore
      }
    } else {
      // Move to next question
      setCurrentQuestionId(nextTarget);
    }
  };

  // Go back to previous question
  const handleGoBack = () => {
    if (pathHistory.length === 0) return;
    const previousHistory = [...pathHistory];
    const lastStep = previousHistory.pop();
    setPathHistory(previousHistory);
    setResultId(null);
    if (lastStep) {
      setCurrentQuestionId(lastStep.questionId);
    }
  };

  // Reset test
  const handleReset = () => {
    setPathHistory([]);
    setResultId(null);
    setCurrentQuestionId(INITIAL_QUESTION_ID);
    setCurrentTab('quiz');
  };

  // Inspect a specific result from gallery or flowchart
  const handleSelectResult = (targetId: ResultId) => {
    setInspectResultId(targetId);
  };

  // Active result to display
  const displayResultId = inspectResultId || resultId;
  const activeResult = displayResultId ? RESULTS_DATA[displayResultId] : null;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setInspectResultId(null);
          setCurrentTab(tab);
        }}
        soundEnabled={sound}
        setSoundEnabled={handleToggleSound}
        onOpenOriginalModal={() => setShowOriginalModal(true)}
      />

      {/* Main Body Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-2.5 sm:px-4 py-4 sm:py-8 md:py-12 flex flex-col justify-center pb-24 sm:pb-8">
        {/* If user clicked to inspect a result or has finished the quiz */}
        {inspectResultId ? (
          <div>
            <div className="mb-3 sm:mb-4 max-w-2xl mx-auto flex items-center justify-between">
              <button
                onClick={() => {
                  playTapSound(480);
                  setInspectResultId(null);
                }}
                className="text-xs text-stone-300 hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-stone-850 border border-stone-750 transition active:scale-95"
              >
                <span>← 返回上一界面</span>
              </button>
              <span className="text-[11px] sm:text-xs text-stone-500">
                正在深度查看 NO.{inspectResultId} 属性画像
              </span>
            </div>
            {activeResult && (
              <ResultCard
                result={activeResult}
                pathHistory={resultId === inspectResultId ? pathHistory : []}
                onReset={handleReset}
                onViewFlowchart={() => {
                  setInspectResultId(null);
                  setCurrentTab('flowchart');
                }}
                onOpenSharePoster={() => setShowShareModal(true)}
                onSelectResult={handleSelectResult}
                onViewGallery={() => {
                  setInspectResultId(null);
                  setCurrentTab('gallery');
                }}
              />
            )}
          </div>
        ) : currentTab === 'quiz' ? (
          resultId && activeResult ? (
            <ResultCard
              result={activeResult}
              pathHistory={pathHistory}
              onReset={handleReset}
              onViewFlowchart={() => setCurrentTab('flowchart')}
              onOpenSharePoster={() => setShowShareModal(true)}
              onSelectResult={handleSelectResult}
              onViewGallery={() => setCurrentTab('gallery')}
            />
          ) : (
            <QuizCard
              question={QUESTIONS_DATA[currentQuestionId]}
              stepNumber={pathHistory.length + 1}
              totalEstimatedSteps={4}
              pathHistory={pathHistory}
              onAnswer={handleAnswer}
              onGoBack={handleGoBack}
              onReset={handleReset}
            />
          )
        ) : currentTab === 'flowchart' ? (
          <FlowchartView
            pathHistory={pathHistory}
            currentResult={resultId}
            onSelectResult={handleSelectResult}
          />
        ) : (
          <AllTypesGallery
            onSelectResult={handleSelectResult}
            currentResult={resultId}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-850 py-5 sm:py-6 text-center text-xs text-stone-500 mb-16 sm:mb-0">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block animate-ping" />
            <span className="text-stone-400">测测你的SM属性吧 · 经典性格测试</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <button
              onClick={() => setShowOriginalModal(true)}
              className="hover:text-stone-200 transition underline underline-offset-4 active:scale-95 text-xs"
            >
              原博图文溯源
            </button>
            <button
              onClick={() => {
                setInspectResultId(7);
              }}
              className="hover:text-emerald-400 text-emerald-500/80 transition active:scale-95 text-xs"
            >
              “选7的快出来做朋友”
            </button>
          </div>
        </div>
      </footer>

      {/* Share Poster Modal */}
      {showShareModal && activeResult && (
        <SharePosterModal
          result={activeResult}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* Original Image Modal */}
      {showOriginalModal && (
        <OriginalImageModal onClose={() => setShowOriginalModal(false)} />
      )}
    </div>
  );
}
