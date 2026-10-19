import React, { useEffect, useState } from 'react';
import { X, Download, Copy, Check, Sparkles, Smartphone } from 'lucide-react';
import { PersonalityResult } from '../types';
import { playTapSound } from '../utils/audio';

interface SharePosterModalProps {
  result: PersonalityResult;
  onClose: () => void;
}

export const SharePosterModal: React.FC<SharePosterModalProps> = ({
  result,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);

  // Generate canvas image data URL on mount so mobile users can long-press to save directly to photos!
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const width = 800;
    const height = 1100;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw luxury dark gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#1c1917');
    bgGrad.addColorStop(0.5, '#0c0a09');
    bgGrad.addColorStop(1, '#1c1917');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative glow circle
    const glowGrad = ctx.createRadialGradient(width - 150, 150, 20, width - 150, 150, 350);
    glowGrad.addColorStop(0, 'rgba(225, 29, 72, 0.35)');
    glowGrad.addColorStop(1, 'rgba(225, 29, 72, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(width - 150, 150, 350, 0, Math.PI * 2);
    ctx.fill();

    // Border line frame
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // Top Header Badge
    ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#e11d48';
    ctx.fillText('SM属性性格测试 · 经典分支报告', 60, 90);

    ctx.font = '16px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#a8a29e';
    ctx.fillText('半次元经典原版复刻 · 选7的快出来做朋友', 60, 120);

    // Divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.moveTo(60, 145);
    ctx.lineTo(width - 60, 145);
    ctx.stroke();

    // Archetype NO & Type
    ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#fb7185';
    ctx.fillText(`TEST RESULT NO.${result.id}`, 60, 195);

    // Main Title
    ctx.font = '900 48px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(result.title, 60, 260);

    // Subtitle
    ctx.font = '22px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#d6d3d1';
    ctx.fillText(result.subtitle, 60, 305);

    // Quote Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(60, 345, width - 120, 120);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
    ctx.strokeRect(60, 345, width - 120, 120);

    ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('★ 原博经典评语：', 85, 380);

    ctx.font = 'italic bold 22px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#fef08a';
    ctx.fillText(`“${result.originalQuote}”`, 85, 425);

    // S / M Ratio Meter
    ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#fb7185';
    ctx.fillText(`S 掌控指数: ${result.sPercentage}%`, 60, 520);

    ctx.fillStyle = '#60a5fa';
    const mText = `M 顺从指数: ${result.mPercentage}%`;
    const mMetrics = ctx.measureText(mText);
    ctx.fillText(mText, width - 60 - mMetrics.width, 520);

    // Bar background
    ctx.fillStyle = '#292524';
    ctx.beginPath();
    ctx.roundRect(60, 535, width - 120, 24, 12);
    ctx.fill();

    // Bar progress S
    const sWidth = ((width - 120) * result.sPercentage) / 100;
    const barGrad = ctx.createLinearGradient(60, 535, 60 + sWidth, 535);
    barGrad.addColorStop(0, '#e11d48');
    barGrad.addColorStop(1, '#ec4899');
    ctx.fillStyle = barGrad;
    ctx.beginPath();
    ctx.roundRect(60, 535, sWidth, 24, 12);
    ctx.fill();

    // 4 Dimensions Stats
    ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#e7e5e4';
    ctx.fillText('核心特质维度：', 60, 610);

    const dims = [
      { label: '👑 掌控力', val: result.radarScores.dominance },
      { label: '❤️ 奉献度', val: result.radarScores.devotion },
      { label: '🛡️ 边界感', val: result.radarScores.boundary },
      { label: '🐾 撒娇萌度', val: result.radarScores.playfulness },
    ];

    dims.forEach((d, idx) => {
      const x = 60 + (idx % 2) * 360;
      const y = 645 + Math.floor(idx / 2) * 60;
      ctx.font = '16px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#a8a29e';
      ctx.fillText(`${d.label}: ${d.val}%`, x, y);

      ctx.fillStyle = '#292524';
      ctx.fillRect(x, y + 8, 300, 8);
      ctx.fillStyle = '#fb7185';
      ctx.fillRect(x, y + 8, (300 * d.val) / 100, 8);
    });

    // Tags
    ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#e7e5e4';
    ctx.fillText('个性标签：', 60, 800);

    ctx.font = '16px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#d6d3d1';
    let tagX = 60;
    result.tags.forEach((tag) => {
      const tagText = `#${tag}`;
      const tWidth = ctx.measureText(tagText).width + 24;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(tagX, 815, tWidth, 34, 17);
      ctx.fill();
      ctx.fillStyle = '#f43f5e';
      ctx.fillText(tagText, tagX + 12, 838);
      tagX += tWidth + 12;
    });

    // Summary block
    ctx.font = '16px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#a8a29e';
    ctx.fillText('恋爱风格：' + result.datingStyle, 60, 895);
    ctx.fillText('天作之合：NO.' + result.bestMatchId + ' 灵魂契合伴侣', 60, 930);

    // Footer
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.moveTo(60, 980);
    ctx.lineTo(width - 60, 980);
    ctx.stroke();

    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#78716c';
    ctx.fillText('测测你的SM属性 · 趣味性格分支测试', 60, 1020);
    ctx.fillText('选7的快出来，我要和你做朋友！', 60, 1045);

    try {
      setRenderedImageUrl(canvas.toDataURL('image/png'));
    } catch {
      // Fallback
    }
  }, [result]);

  // Copy text share summary
  const handleCopyText = async () => {
    const text = `【我的SM属性性格测试结果】\n` +
      `属性类型：NO.${result.id} ${result.title} (${result.subtitle})\n` +
      `S掌控力: ${result.sPercentage}% | M顺从度: ${result.mPercentage}%\n` +
      `原博金句：“${result.originalQuote}”\n` +
      `性格标签：#${result.tags.join(' #')}\n` +
      `最佳契合：#${result.bestMatchId}号\n` +
      `快来测测你的SM属性吧！选7的快出来，我要和你做朋友！`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      playTapSound(750);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Direct download trigger
  const handleDownload = () => {
    if (!renderedImageUrl) return;
    playTapSound(650);
    const link = document.createElement('a');
    link.download = `SM属性测试_NO${result.id}_${result.title}.png`;
    link.href = renderedImageUrl;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-sm sm:max-w-md bg-stone-900 border border-stone-750 rounded-3xl p-5 sm:p-6 shadow-2xl text-stone-100 my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            playTapSound(450);
            onClose();
          }}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition active:scale-95 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>专属海报已就绪</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            炫耀你的专属性格画像
          </h3>
          <p className="text-[11px] text-stone-400 mt-0.5 flex items-center justify-center gap-1">
            <Smartphone className="w-3 h-3 text-emerald-400" />
            <span>手机用户可长按下方海报直接保存到相册</span>
          </p>
        </div>

        {/* Rendered Image Card Preview */}
        <div className="rounded-2xl overflow-hidden border border-stone-750 shadow-2xl mb-4 bg-stone-950 flex items-center justify-center">
          {renderedImageUrl ? (
            <img
              src={renderedImageUrl}
              alt="性格测试分享海报"
              className="w-full h-auto max-h-[50vh] object-contain select-none cursor-pointer"
              title="长按或点击保存"
            />
          ) : (
            <div className="py-20 text-xs text-stone-500">
              正在绘制海报...
            </div>
          )}
        </div>

        {/* Action Buttons for Mobile */}
        <div className="space-y-2">
          <button
            onClick={handleDownload}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>下载高清海报图片 (PNG)</span>
          </button>

          <button
            onClick={handleCopyText}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-200 font-bold text-xs border border-stone-750 flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">已复制分享文案到剪贴板！</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-400" />
                <span>复制分享文案（发朋友圈/小红书/微博）</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
