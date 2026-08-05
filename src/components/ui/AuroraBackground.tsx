'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { THEME_REGISTRY } from '@/features/themes/tokens';
import { ThemeId } from '@/types/gift';

export const AuroraBackground: React.FC<{ themeId?: ThemeId; children?: React.ReactNode }> = ({
  themeId = 'cute',
  children,
}) => {
  const theme = THEME_REGISTRY[themeId] || THEME_REGISTRY.cute;

  return (
    <div className={`relative min-h-screen w-full bg-gradient-to-br ${theme.colors.bgGradient} overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-700`}>
      {/* SVG Noise & Paper Texture Filter Overlay */}
      <div className="pointer-events-none fixed inset-0 z-10 opacity-[0.035] mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Floating Aurora Liquid Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, -60, 0],
            y: [0, -70, 50, 0],
            scale: [1, 1.25, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full blur-[100px] opacity-45"
          style={{ backgroundColor: theme.particles.primaryColor }}
        />
        <motion.div
          animate={{
            x: [0, -90, 70, 0],
            y: [0, 60, -80, 0],
            scale: [1, 0.85, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-32 h-[35rem] w-[35rem] rounded-full blur-[120px] opacity-40"
          style={{ backgroundColor: theme.particles.secondaryColor }}
        />
        <motion.div
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -50, 60, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 left-1/4 h-[30rem] w-[30rem] rounded-full blur-[110px] opacity-35"
          style={{ backgroundColor: theme.colors.accent }}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 flex min-h-screen flex-col">{children}</div>
    </div>
  );
};
