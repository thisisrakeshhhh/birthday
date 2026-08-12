'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { THEME_REGISTRY } from '@/features/themes/tokens';
import { ThemeId } from '@/types/gift';

export const AuroraBackground: React.FC<{ themeId?: ThemeId; children?: React.ReactNode }> = ({
  themeId = 'soft',
  children,
}) => {
  const theme = THEME_REGISTRY[themeId] || THEME_REGISTRY.soft;

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden transition-colors duration-700`}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      {/* SVG Noise & Film Grain Filter Overlay */}
      <div className="pointer-events-none fixed inset-0 z-10 opacity-[0.04] mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="filmGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#filmGrain)" />
        </svg>
      </div>

      {/* Floating Animated Gradient Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, -60, 0],
            y: [0, -70, 50, 0],
            scale: [1, 1.25, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 h-[35rem] w-[35rem] rounded-full blur-[110px] opacity-40 pointer-events-none"
          style={{ backgroundColor: theme.colors.accent }}
        />
        <motion.div
          animate={{
            x: [0, -90, 70, 0],
            y: [0, 60, -80, 0],
            scale: [1, 0.85, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-32 h-[38rem] w-[38rem] rounded-full blur-[130px] opacity-35 pointer-events-none"
          style={{ backgroundColor: theme.colors.accentSecondary }}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 flex min-h-screen flex-col">{children}</div>
    </div>
  );
};
