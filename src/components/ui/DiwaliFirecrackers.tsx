'use client';

import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundFX } from '@/lib/soundEffects';

interface FirecrackerParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
}

export function launchDiwaliFirecrackers() {
  soundFX.playRocketWhistle();

  setTimeout(() => {
    soundFX.playFirecrackerBoom();
  }, 300);

  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 100 };

  const interval: NodeJS.Timeout = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    soundFX.playFirecrackerBoom();

    // Left & Right Diwali Rocket Explosions
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.2, y: 0.7 },
      colors: ['#FFD700', '#FF4500', '#FF1493', '#00FF7F', '#00BFFF', '#FF8C00'],
    });

    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.8, y: 0.7 },
      colors: ['#FFD700', '#FF4500', '#FF1493', '#00FF7F', '#00BFFF', '#FF8C00'],
    });
  }, 300);
}

export const DiwaliFirecrackersCanvas: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: FirecrackerParticle[] = [];
    const colors = ['#FFD700', '#FF4500', '#FF1493', '#00FF7F', '#00BFFF', '#FF8C00', '#FFFFFF'];

    function createExplosion(x: number, y: number) {
      soundFX.playFirecrackerBoom();
      const count = 45;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 6 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 4 + 2,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
        });
      }
    }

    const timer = setInterval(() => {
      const rx = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
      const ry = Math.random() * (canvas.height * 0.5) + canvas.height * 0.1;
      createExplosion(rx, ry);
    }, 800);

    let animId: number;
    function render() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(idx, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      });

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(animId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    />
  );
};
