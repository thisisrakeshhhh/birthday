'use client';

import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

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
  // Burst 1: Golden Sparklers from sides
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

  const interval: NodeJS.Timeout = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Left & Right Diwali Rocket Launch
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
  }, 250);
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
      const count = 40;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 2,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
        });
      }
    }

    // Auto-launch random cracker bursts across canvas
    const timer = setInterval(() => {
      const rx = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
      const ry = Math.random() * (canvas.height * 0.5) + canvas.height * 0.1;
      createExplosion(rx, ry);
    }, 700);

    let animId: number;
    function render() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(idx, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
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
