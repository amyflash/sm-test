export type QuestionId =
  | 'q_hair'
  | 'q_normal'
  | 'q_dog'
  | 'q_metro'
  | 'q_fork'
  | 'q_heavy'
  | 'q_seat'
  | 'q_outfit'
  | 'q_early'
  | 'q_idiot';

export type ResultId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface QuestionNode {
  id: QuestionId;
  question: string;
  tagline: string;
  category: '日常细节' | '规则观念' | '人际舒适' | '生活态度' | '亲密互动';
  yesTarget: QuestionId | ResultId;
  noTarget: QuestionId | ResultId;
  yesLabel?: string;
  noLabel?: string;
}

export interface PersonalityResult {
  id: ResultId;
  type: 'S' | 'M' | 'Switch';
  title: string;
  subtitle: string;
  originalQuote: string;
  summary: string;
  sPercentage: number;
  mPercentage: number;
  radarScores: {
    dominance: number; // 掌控力
    devotion: number;  // 奉献度
    boundary: number;  // 边界感
    playfulness: number; // 撒娇/萌度
  };
  tags: string[];
  keyTraits: string[];
  datingStyle: string;
  friendshipStyle: string;
  bestMatchId: ResultId;
  worstMatchId: ResultId;
  advice: string;
  themeColor: {
    primary: string;
    secondary: string;
    accent: string;
    badgeBg: string;
    border: string;
  };
  easterEgg?: string;
}

export interface PathStep {
  questionId: QuestionId;
  answer: 'YES' | 'NO';
  nextTarget: QuestionId | ResultId;
}
