import React from 'react';

/**
 * SingMeter Logo Component
 * 现代化的音域测试品牌 Logo，包含音频波形和麦克风元素
 * 
 * @param {Object} props
 * @param {number} props.width - Logo 宽度（默认 200）
 * @param {number} props.height - Logo 高度（默认 200）
 * @param {boolean} props.showText - 是否显示文字（默认 true）
 * @param {string} props.className - 额外的 CSS 类名
 */
const Logo = ({ 
  width = 200, 
  height = 200, 
  showText = true,
  className = '' 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* 主渐变色 - 蓝紫粉科技感 */}
        <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#A855F7', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
        </linearGradient>

        {/* 波形渐变 */}
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
          <stop offset="33%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
          <stop offset="66%" style={{ stopColor: '#D946EF', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
        </linearGradient>

        {/* 发光效果 */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* 背景圆形 */}
      <circle cx="100" cy="100" r="95" fill="url(#mainGradient)" opacity="0.08"/>

      {/* 音频频谱条 - 左侧 */}
      <g transform="translate(100, 100)">
        {/* 左侧频谱 */}
        <rect x="-70" y="-5" width="4" height="10" rx="2" fill="url(#mainGradient)" opacity="0.5"/>
        <rect x="-62" y="-8" width="4" height="16" rx="2" fill="url(#mainGradient)" opacity="0.6"/>
        <rect x="-54" y="-12" width="4" height="24" rx="2" fill="url(#mainGradient)" opacity="0.7"/>
        <rect x="-46" y="-18" width="4" height="36" rx="2" fill="url(#mainGradient)" opacity="0.8"/>
        <rect x="-38" y="-24" width="4" height="48" rx="2" fill="url(#mainGradient)" opacity="0.9"/>
        <rect x="-30" y="-28" width="4" height="56" rx="2" fill="url(#mainGradient)"/>

        {/* 右侧频谱 */}
        <rect x="26" y="-28" width="4" height="56" rx="2" fill="url(#mainGradient)"/>
        <rect x="34" y="-24" width="4" height="48" rx="2" fill="url(#mainGradient)" opacity="0.9"/>
        <rect x="42" y="-18" width="4" height="36" rx="2" fill="url(#mainGradient)" opacity="0.8"/>
        <rect x="50" y="-12" width="4" height="24" rx="2" fill="url(#mainGradient)" opacity="0.7"/>
        <rect x="58" y="-8" width="4" height="16" rx="2" fill="url(#mainGradient)" opacity="0.6"/>
        <rect x="66" y="-5" width="4" height="10" rx="2" fill="url(#mainGradient)" opacity="0.5"/>

        {/* 波形线条 - 上方 */}
        <path 
          d="M -25 -35 Q -20 -42, -15 -35 T -5 -35 T 5 -35 T 15 -35 T 25 -35"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* 波形线条 - 下方 */}
        <path 
          d="M -25 35 Q -20 42, -15 35 T -5 35 T 5 35 T 15 35 T 25 35"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* 麦克风图标 */}
        <g filter="url(#glow)">
          {/* 麦克风头部 */}
          <ellipse cx="0" cy="-20" rx="14" ry="16" fill="url(#mainGradient)"/>
          <ellipse cx="0" cy="-20" rx="12" ry="14" fill="#1F2937"/>
          
          {/* 麦克风网格 */}
          <g stroke="url(#mainGradient)" strokeWidth="1.5" opacity="0.8">
            <line x1="-9" y1="-28" x2="9" y2="-28"/>
            <line x1="-10" y1="-23" x2="10" y2="-23"/>
            <line x1="-11" y1="-18" x2="11" y2="-18"/>
            <line x1="-10" y1="-13" x2="10" y2="-13"/>
            <line x1="-9" y1="-8" x2="9" y2="-8"/>
          </g>

          {/* 麦克风主体 */}
          <rect x="-10" y="-5" width="20" height="22" rx="2" fill="#374151"/>
          <rect x="-9" y="-4" width="18" height="20" rx="1.5" fill="#1F2937"/>
          
          {/* 主体细节线条 */}
          <g stroke="url(#mainGradient)" strokeWidth="1" opacity="0.6">
            <line x1="-9" y1="0" x2="9" y2="0"/>
            <line x1="-9" y1="5" x2="9" y2="5"/>
            <line x1="-9" y1="10" x2="9" y2="10"/>
          </g>

          {/* 连接器 */}
          <ellipse cx="0" cy="17" rx="10" ry="2.5" fill="#374151"/>

          {/* 支架 */}
          <line x1="0" y1="17" x2="0" y2="32" stroke="#374151" strokeWidth="4" strokeLinecap="round"/>
          <line x1="-12" y1="32" x2="12" y2="32" stroke="#374151" strokeWidth="4" strokeLinecap="round"/>
          
          {/* 支架装饰点 */}
          <circle cx="-12" cy="32" r="2" fill="url(#mainGradient)"/>
          <circle cx="12" cy="32" r="2" fill="url(#mainGradient)"/>
        </g>

        {/* 测量刻度圆弧 - 左上 */}
        <path 
          d="M -65 -65 A 92 92 0 0 1 -45 -75"
          stroke="url(#mainGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />

        {/* 测量刻度圆弧 - 右上 */}
        <path 
          d="M 45 -75 A 92 92 0 0 1 65 -65"
          stroke="url(#mainGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />

        {/* 测量刻度圆弧 - 左下 */}
        <path 
          d="M -65 65 A 92 92 0 0 0 -45 75"
          stroke="url(#mainGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />

        {/* 测量刻度圆弧 - 右下 */}
        <path 
          d="M 45 75 A 92 92 0 0 0 65 65"
          stroke="url(#mainGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />

        {/* 刻度标记 */}
        {[-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = Math.cos(rad) * 85;
          const y1 = Math.sin(rad) * 85;
          const x2 = Math.cos(rad) * 90;
          const y2 = Math.sin(rad) * 90;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#mainGradient)"
              strokeWidth="1.5"
              opacity="0.3"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* SINGMETER 文字 */}
      {showText && (
        <text
          x="100"
          y="185"
          fontFamily="'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif"
          fontSize="18"
          fontWeight="900"
          fill="#1F2937"
          textAnchor="middle"
          letterSpacing="3"
        >
          SINGMETER
        </text>
      )}
    </svg>
  );
};

export default Logo;

