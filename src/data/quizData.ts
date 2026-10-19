import { QuestionId, QuestionNode, PersonalityResult, ResultId } from '../types';

export const INITIAL_QUESTION_ID: QuestionId = 'q_hair';

export const QUESTIONS_DATA: Record<QuestionId, QuestionNode> = {
  q_hair: {
    id: 'q_hair',
    question: '会发现朋友或同事发型改变了？',
    tagline: '面对身边人微小的外貌变化，你是否总能在第一时间敏锐觉察？',
    category: '日常细节',
    yesTarget: 'q_normal',
    noTarget: 'q_dog',
    yesLabel: '会，一眼就能看出来',
    noLabel: '很少注意，除非剪得特别夸张',
  },
  q_normal: {
    id: 'q_normal',
    question: '常常有这样的念头：“正常情况下应该这样……”？',
    tagline: '脑海里是否经常有一套清晰的标准、秩序或对事物的合理预期？',
    category: '规则观念',
    yesTarget: 'q_metro',
    noTarget: 'q_fork',
    yesLabel: '经常，凡事都有它该有的规矩',
    noLabel: '不太有，凡事顺其自然开心就好',
  },
  q_dog: {
    id: 'q_dog',
    question: '觉得小狗打蝴蝶结或穿衣服会很可爱？',
    tagline: '看到宠物被精心打扮成拟人萌系风格，内心会被瞬间戳中吗？',
    category: '日常细节',
    yesTarget: 'q_metro',
    noTarget: 'q_heavy',
    yesLabel: '超萌！忍不住多看两眼',
    noLabel: '觉得动物自然状态最舒服，没太大感觉',
  },
  q_metro: {
    id: 'q_metro',
    question: '地铁站出闸前很早就把票卡拿出来准备好？',
    tagline: '习惯凡事提前准备，绝对不允许自己被卡在闸机口耽误时间？',
    category: '生活态度',
    yesTarget: 'q_early',
    noTarget: 'q_fork',
    yesLabel: '对，提前拿在手里才安心',
    noLabel: '走到闸口才慢悠悠掏手机或刷卡',
  },
  q_fork: {
    id: 'q_fork',
    question: '在咖啡店发现叉子是脏的，会跟店员说？',
    tagline: '在外就餐遇到服务瑕疵或卫生问题，会直接主动要求店员处理吗？',
    category: '人际舒适',
    yesTarget: 1, // 结果 1：特顶级S
    noTarget: 'q_seat',
    yesLabel: '会直接叫服务员，要求换干净的',
    noLabel: '算了，自己拿纸巾擦擦或者默默不用',
  },
  q_heavy: {
    id: 'q_heavy',
    question: '拿很重的东西时，常常放下来休息？',
    tagline: '提着沉重行李或物品时，感到累了就会停下来歇歇，不会硬撑？',
    category: '生活态度',
    yesTarget: 'q_outfit',
    noTarget: 'q_early',
    yesLabel: '累了就放地上歇会儿，不逞强',
    noLabel: '咬牙一鼓作气扛到目的地再说',
  },
  q_seat: {
    id: 'q_seat',
    question: '在店里坐的位置太窄，会叫店员换位？',
    tagline: '对于用餐或就坐的舒适空间，会积极主张自己的权利吗？',
    category: '人际舒适',
    yesTarget: 2, // 结果 2：老子自有主张型S
    noTarget: 'q_outfit',
    yesLabel: '会礼貌询问店员能不能换个宽敞位置',
    noLabel: '将就坐着吧，懒得折腾店员',
  },
  q_outfit: {
    id: 'q_outfit',
    question: '服装搭配会配合对方？',
    tagline: '和约会对象或好友同行出门时，会根据对方风格或色系调整穿搭？',
    category: '日常细节',
    yesTarget: 3, // 结果 3：只对自己碗里的会让步S
    noTarget: 'q_idiot',
    yesLabel: '会配合，统一风格更有仪式感',
    noLabel: '按自己心意穿，互不干涉',
  },
  q_early: {
    id: 'q_early',
    question: '会比约定时间提前到达？',
    tagline: '与人有约时，倾向于预留充足富余时间，早到一会儿等人？',
    category: '生活态度',
    yesTarget: 4, // 结果 4：撒娇任性心S
    noTarget: 5, // 结果 5：外表柔弱，内心狂霸的M（？）
    yesLabel: '通常会提前5-10分钟到达',
    noLabel: '踩点到或者偶尔卡着红线',
  },
  q_idiot: {
    id: 'q_idiot',
    question: '还蛮喜欢被恋人骂“笨蛋”？',
    tagline: '在恋爱关系中，听到恋人带点无奈又宠溺地嗔怪你“笨蛋”，心里会觉得甜丝丝吗？',
    category: '亲密互动',
    yesTarget: 8, // 结果 8：特顶级M
    noTarget: 7, // 结果 7：飞蛾扑火型M
    yesLabel: '挺受用的，觉得这是一种甜甜的爱称',
    noLabel: '不太喜欢，听着有点贬低或刺耳',
  },
};

export const RESULTS_DATA: Record<ResultId, PersonalityResult> = {
  1: {
    id: 1,
    type: 'S',
    title: '特顶级S',
    subtitle: '宇宙掌控者 · 绝对霸权',
    originalQuote: '宇宙为你而存在，你一定是拿皮鞭抽着地球转的那位',
    summary: '极高自尊与掌控力的天生王者。任何场面你都习惯占据主导权，行事雷厉风行，对不合理和敷衍零容忍。在关系中充满保护欲与支配欲，是令人心甘情愿跟随的领袖。',
    sPercentage: 99,
    mPercentage: 1,
    radarScores: {
      dominance: 98,
      devotion: 35,
      boundary: 95,
      playfulness: 20,
    },
    tags: ['霸气侧漏', '绝对主导', '说一不二', '降维打击', '护短霸总'],
    keyTraits: [
      '对生活秩序与高品质有极高要求，眼里容不得沙子',
      '擅长做决定并承担所有后果，不喜欢他人指手画脚',
      '外表极度强势，但对自己人有着山岳般的保护力',
      '对于顺从、懂得崇拜自己的人毫无抵抗力'
    ],
    datingStyle: '强掌控、高庇护。习惯安排好一切行程与大方向，喜欢伴侣对自己毫无保留地依赖。',
    friendshipStyle: '局里的定海神针。朋友有难直接开大招罩着，但嘴上从不拖泥带水。',
    bestMatchId: 8, // 特顶级M
    worstMatchId: 2, // 老子自有主张型S
    advice: '偶尔试着放下肩上的鞭子，地球其实自己也会转；学着表达脆弱，会让人更爱你。',
    themeColor: {
      primary: 'from-rose-600 to-red-800',
      secondary: 'bg-red-500/10 text-red-600',
      accent: '#e11d48',
      badgeBg: 'bg-rose-950 text-rose-200 border-rose-700',
      border: 'border-rose-400',
    },
  },
  2: {
    id: 2,
    type: 'S',
    title: '老子自有主张型S',
    subtitle: '傲娇独行侠 · 原则守门人',
    originalQuote: '我不扑倒你，但也绝对不能让你扑倒我',
    summary: '清醒独立的边界感大师。你不会主动压迫或为难他人，但也绝不允许任何人跨过你的底线。你拥有强大的自我内核与清晰的主张，想拿捏你比登天还难。',
    sPercentage: 85,
    mPercentage: 15,
    radarScores: {
      dominance: 80,
      devotion: 45,
      boundary: 98,
      playfulness: 35,
    },
    tags: ['人间清醒', '不可冒犯', '反客为主', '独立硬骨', '原则王者'],
    keyTraits: [
      '极度反感他人强加意志或道德绑架',
      '不爱争抢风头，但在自己的舒适圈内拥有最高发言权',
      '面对冒犯会毫不客气地反击，立场坚定绝不妥协',
      '内心其实很讲道理，吃软不吃硬'
    ],
    datingStyle: '势均力敌。你追求彼此尊重与灵魂共鸣，你可以宠爱对方，但绝不会向无理取闹低头。',
    friendshipStyle: '靠谱直率。从不曲意逢迎，凡事讲究真诚与分寸。',
    bestMatchId: 6, // 撒娇求奖励型M
    worstMatchId: 1, // 特顶级S
    advice: '适当收敛刺角，世界上不仅有“扑倒”与“被扑倒”，还有温柔的并肩漫步。',
    themeColor: {
      primary: 'from-amber-600 to-orange-800',
      secondary: 'bg-orange-500/10 text-orange-600',
      accent: '#ea580c',
      badgeBg: 'bg-orange-950 text-orange-200 border-orange-700',
      border: 'border-orange-400',
    },
  },
  3: {
    id: 3,
    type: 'S',
    title: '只对自己碗里的会让步S',
    subtitle: '外冷内热狼系 · 专属双标',
    originalQuote: '除了自家碗里的，其他人别挡路',
    summary: '将“极致双标”演绎到艺术境界的护短王者。对外人是一堵冷峻的高墙，客气而疏离；对认定是“自家碗里”的人，却能交出全部的偏爱与耐心。',
    sPercentage: 75,
    mPercentage: 25,
    radarScores: {
      dominance: 75,
      devotion: 70,
      boundary: 90,
      playfulness: 50,
    },
    tags: ['顶级护短', '外冷内软', '专属温柔', '唯你独尊', '狼系宠溺'],
    keyTraits: [
      '圈外人冷漠疏离，圈内人掏心掏肺',
      '极强的领地意识与排他性，讨厌别人觊觎自己的珍宝',
      '只有被你认可的人，才能看到你撒娇或退让的一面',
      '愿意为了对方改变行程、穿搭甚至生活习惯'
    ],
    datingStyle: '满分偏爱。全世界与你为敌时，他会站在你身边对抗全世界。',
    friendshipStyle: '死忠挚友。只要进了你的核心圈，就算赴汤蹈火也毫不迟疑。',
    bestMatchId: 6, // 撒娇求奖励型M
    worstMatchId: 5, // 扮猪吃虎M
    advice: '不要给被偏爱的人太大窒息感，适当留点呼吸空间，爱会更长久。',
    themeColor: {
      primary: 'from-purple-600 to-indigo-900',
      secondary: 'bg-purple-500/10 text-purple-600',
      accent: '#9333ea',
      badgeBg: 'bg-purple-950 text-purple-200 border-purple-700',
      border: 'border-purple-400',
    },
  },
  4: {
    id: 4,
    type: 'S',
    title: '撒娇任性心S',
    subtitle: '傲娇小猫咪 · 娇嗔控场',
    originalQuote: '谁说S不能做宠物……',
    summary: '深谙“以退为进”精髓的猫系统治者。表面上可能软萌可爱、甚至像个爱撒娇的宠物，但实际节奏完全掌控在你爪子里。你用最软的方式做最霸道的事！',
    sPercentage: 65,
    mPercentage: 35,
    radarScores: {
      dominance: 65,
      devotion: 55,
      boundary: 75,
      playfulness: 95,
    },
    tags: ['猫系傲娇', '口嫌体直', '恃宠而骄', '甜辣主子', '隐秘掌控'],
    keyTraits: [
      '擅长用示弱、任性或撒娇迫使对方答应自己的要求',
      '心情好的时候主动贴贴，心情不好谁也别想碰',
      '看似顺从，实则每一步都在引导对方按自己的剧本走',
      '极其注重细节与情调，对仪式感要求很高'
    ],
    datingStyle: '甜辣博弈。把伴侣拿捏得死死的，对方痛并快乐地把你捧在手心。',
    friendshipStyle: '可爱团宠。朋友们都乐意宠着你，因为你总能带来意想不到的快乐。',
    bestMatchId: 7, // 飞蛾扑火型M
    worstMatchId: 2, // 老子自有主张S
    advice: '任性是一门调情艺术，但记得别太常踩对方底线，偶尔真诚回馈会让对方更安心。',
    themeColor: {
      primary: 'from-pink-500 to-rose-700',
      secondary: 'bg-pink-500/10 text-pink-600',
      accent: '#ec4899',
      badgeBg: 'bg-pink-950 text-pink-200 border-pink-700',
      border: 'border-pink-400',
    },
  },
  5: {
    id: 5,
    type: 'Switch',
    title: '外表柔弱，内心狂霸的M（？）',
    subtitle: '双面魔王 · 扮猪吃虎',
    originalQuote: '在外看起来是M，但关门后第一件事一定是拿起皮鞭',
    summary: '反差感拉满的终极潜伏者。日常社交里彬彬有礼、看似人畜无害甚至容易妥协，但只要进入私密领地或被真正触怒，瞬间切换大号，皮鞭在手教所有人重新做人！',
    sPercentage: 55,
    mPercentage: 45,
    radarScores: {
      dominance: 70,
      devotion: 50,
      boundary: 85,
      playfulness: 65,
    },
    tags: ['终极切黑', '反差萌神', '扮猪吃虎', '关门变身', '深藏不露'],
    keyTraits: [
      '公共场合习惯隐匿光芒，能忍则忍，不惹麻烦',
      '内心其实非常有主见，默默给所有人打分',
      '一旦获得全权信任或关上门，极具爆发力与支配感',
      '享受那种“别人以为我是兔子，其实我是大灰狼”的戏剧感'
    ],
    datingStyle: '惊喜过山车。让另一半永远猜不透你的下一个形态，新鲜感永远保鲜。',
    friendshipStyle: '腹黑军师。外表老好人，关键时刻能拿出狠辣果决的方案。',
    bestMatchId: 1, // 特顶级S
    worstMatchId: 8, // 特顶级M
    advice: '别把所有真实想法都藏在门后，适度对外表露锋芒，能避免很多不必要的消耗。',
    themeColor: {
      primary: 'from-violet-600 to-fuchsia-900',
      secondary: 'bg-violet-500/10 text-violet-600',
      accent: '#8b5cf6',
      badgeBg: 'bg-violet-950 text-violet-200 border-violet-700',
      border: 'border-violet-400',
    },
  },
  6: {
    id: 6,
    type: 'M',
    title: '撒娇求奖励型M',
    subtitle: '忠犬系暖宝 · 夸夸充电宝',
    originalQuote: '任劳任怨，主人你快夸我嘛~',
    summary: '让人心软成一滩水的忠犬型人格。在感情和关系里你从不计较付出多少，只要对方真诚地给你一句夸奖、摸摸头或者一个拥抱，你立刻满血复活，继续乐颠颠为你奔波。',
    sPercentage: 20,
    mPercentage: 80,
    radarScores: {
      dominance: 25,
      devotion: 85,
      boundary: 40,
      playfulness: 90,
    },
    tags: ['忠犬小狗', '渴望摸头', '情绪价值', '任劳任怨', '甜度爆表'],
    keyTraits: [
      '对认可与肯定极度敏感，一句夸奖能开心整整一星期',
      '非常善解人意，能敏锐捕捉对方的情绪起伏',
      '甘愿在背后做好辅助与后勤工作，不争不抢',
      '害怕被冷落，缺乏安全感时会用加倍的付出来确认关系'
    ],
    datingStyle: '无微不至。把对方的生活起居和喜怒哀乐放在第一位，是绝世贤惠伴侣。',
    friendshipStyle: '贴心小天使。总是默默买单、递纸巾、安抚每个人的情绪。',
    bestMatchId: 2, // 老子自有主张S
    worstMatchId: 8, // 特顶级M
    advice: '学会为自己的优秀鼓掌，你自身的发光不需要完全寄托在别人的口头奖赏上。',
    themeColor: {
      primary: 'from-amber-400 to-yellow-600',
      secondary: 'bg-amber-500/10 text-amber-600',
      accent: '#d97706',
      badgeBg: 'bg-amber-950 text-amber-200 border-amber-700',
      border: 'border-amber-400',
    },
  },
  7: {
    id: 7,
    type: 'M',
    title: '飞蛾扑火型M',
    subtitle: '原帖钦定挚友 · 极致奉献',
    originalQuote: '岂止是任劳任怨，简直赴汤蹈火在所不惜',
    summary: '原博主高呼“选7的快出来我要和你做朋友！”的传说级神仙人格！一旦认定一个人或一件事，你会毫无保留、不计代价地全情投入。你的奉献是纯粹而炽烈的烈火，令人震撼动容。',
    sPercentage: 10,
    mPercentage: 90,
    radarScores: {
      dominance: 15,
      devotion: 99,
      boundary: 30,
      playfulness: 55,
    },
    tags: ['原帖钦定', '赴汤蹈火', '真爱无悔', '神仙死党', '炽热燃烧'],
    keyTraits: [
      '对朋友和爱人具有超强忠诚度，刀山火海在所不惜',
      '哪怕自己受委屈，也决不能让自己守护的人吃亏',
      '情感极其浓烈深沉，有一种近乎英雄主义的牺牲感',
      '是所有人梦寐以求的生死之交与终身守护者'
    ],
    datingStyle: '倾囊相授。只要你开心，天上的星星也想方设法摘给你。',
    friendshipStyle: '义薄云天。真正的“你若有难，我必带人踏平坎坷”。',
    bestMatchId: 1, // 特顶级S 或 4 撒娇任性心S
    worstMatchId: 6, // 撒娇求奖励M
    advice: '你的爱如此贵重，请先务必留三分给自己；别为了照亮别人，把自己燃成灰烬。',
    themeColor: {
      primary: 'from-emerald-500 to-teal-800',
      secondary: 'bg-emerald-500/10 text-emerald-600',
      accent: '#059669',
      badgeBg: 'bg-emerald-950 text-emerald-200 border-emerald-700',
      border: 'border-emerald-400',
    },
    easterEgg: '✨ 原博高光款！原博主高呼：“选7的快出来我要和你做朋友！”——你的无私与深情是全宇宙最珍贵的宝物！',
  },
  8: {
    id: 8,
    type: 'M',
    title: '特顶级M',
    subtitle: '全装备满级受众 · 自带道具',
    originalQuote: '自备皮鞭自备蜡烛自备一切道具你们懂的',
    summary: '参透了人生至高境界的满级王者。你不仅甘愿臣服，甚至贴心到把所有流程与道具准备妥当，主打一个“让对方省心、让自己尽兴”。在被支配与约束中，你获得了最纯粹的松弛与归宿。',
    sPercentage: 2,
    mPercentage: 98,
    radarScores: {
      dominance: 5,
      devotion: 95,
      boundary: 20,
      playfulness: 80,
    },
    tags: ['道具自备', '满级领悟', '终极躺平', '沉浸体验', '省心伴侣'],
    keyTraits: [
      '对生活或关系里的管束乐在其中，喜欢被明确的规则指引',
      '情商极高，善于用极致的迎合来消除一切矛盾与摩擦',
      '极度反感勾心斗角，更愿意把方向盘交给信任的人',
      '具有惊人的包容度与韧性，心态极为通透豁达'
    ],
    datingStyle: '彻底交付。完全信任另一半的判断，享受被管束和被带领的安全感。',
    friendshipStyle: '百搭润滑剂。跟谁都能处，从不挑刺，哪里需要往哪搬。',
    bestMatchId: 1, // 特顶级S (绝配)
    worstMatchId: 7, // 飞蛾扑火M
    advice: '顺从是你的舒适区，但永远保留自己的核心价值观，别让善良成了被利用的软肋。',
    themeColor: {
      primary: 'from-blue-600 to-indigo-900',
      secondary: 'bg-blue-500/10 text-blue-600',
      accent: '#2563eb',
      badgeBg: 'bg-blue-950 text-blue-200 border-blue-700',
      border: 'border-blue-400',
    },
  },
};
