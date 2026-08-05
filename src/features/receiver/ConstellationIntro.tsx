'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { triggerHaptic } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface ConstellationIntroProps {
  receiverName: string;
  onComplete: () => void;
}

export const ConstellationIntro: React.FC<ConstellationIntroProps> = ({
  receiverName,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'stars' | 'name' | 'ready'>('stars');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate random stars
    const starCount = Math.min(80, Math.floor(window.innerWidth / 15));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
    }));

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw starry sky
      stars.forEach((st) => {
        st.alpha += st.speed;
        if (st.alpha > 1 || st.alpha < 0) st.speed = -st.speed;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(st.alpha)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#F472B6';
        ctx.fill();
      });

      // Connect nearby stars with constellation lines
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(192, 132, 252, ${0.25 - dist / 440})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    const t1 = setTimeout(() => {
      setPhase('name');
      triggerHaptic('medium');
    }, 1800);

    const t2 = setTimeout(() => {
      setPhase('ready');
      triggerHaptic('success');
    }, 4200);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-slate-950 text-white overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Skip Intro Button */}
      <button
        onClick={() => {
          triggerHaptic('light');
          onComplete();
        }}
        className="absolute top-6 right-6 z-30 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-md hover:bg-white/20 min-h-[44px]"
      >
        Skip Intro ✨
      </button>

      {/* Phase 1 & 2 Text Animation */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-lg">
        {phase === 'stars' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="h-3 w-3 rounded-full bg-pink-400 animate-ping" />
            <p className="text-sm font-medium text-pink-300 tracking-widest uppercase">
              A Personal Universe Awaits
            </p>
          </motion.div>
        )}

        {phase === 'name' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-xs uppercase tracking-widest text-purple-300 font-semibold">
              Constellations are aligning for
            </p>
            <h1 className="font-serif text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200 drop-shadow-2xl">
              {receiverName}
            </h1>
          </motion.div>
        )}

        {phase === 'ready' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200">
              {receiverName}
            </h1>
            <p className="text-sm text-purple-200/90 max-w-xs">
              Every memory stored here was crafted with love just for you.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                triggerHaptic('success');
                onComplete();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 text-base font-bold shadow-xl shadow-pink-500/40 hover:shadow-pink-500/60 min-h-[44px]"
            >
              <Sparkles className="h-5 w-5" />
              Open Your Gift
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
