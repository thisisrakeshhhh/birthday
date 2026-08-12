'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { THEME_REGISTRY } from '@/features/themes/tokens';
import { ThemeId } from '@/types/gift';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const ThemeCursor: React.FC<{ themeId?: ThemeId }> = ({ themeId = 'secret' }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const theme = THEME_REGISTRY[themeId] || THEME_REGISTRY.secret;

  useEffect(() => {
    let count = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Throttle trail particle spawn rate for performance
      count++;
      if (count % 4 === 0) {
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          emoji: theme.cursor.trailEmoji,
        };
        setParticles((prev) => [...prev.slice(-12), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [theme.cursor.trailEmoji]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden sm:block">
      {/* Outer Glow Aura */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full mix-blend-screen opacity-70 blur-md pointer-events-none"
        style={{
          backgroundColor: theme.cursor.glowColor,
          boxShadow: `0 0 20px ${theme.cursor.glowColor}`,
        }}
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.1 }}
      />

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-white border border-pink-400 pointer-events-none shadow-sm"
        animate={{ x: mousePos.x - 5, y: mousePos.y - 5 }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
      />

      {/* Dynamic Particle Trail */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ opacity: 0, scale: 0.3, y: -20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed text-sm pointer-events-none select-none"
          style={{ left: p.x - 6, top: p.y - 6 }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
};
