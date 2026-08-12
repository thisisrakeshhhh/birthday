'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { triggerHaptic } from '@/lib/utils';
import { Lock, Unlock, Sparkles, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MidnightDropLockProps {
  receiverName: string;
  unlockDateISO?: string;
  onUnlock: () => void;
}

export const MidnightDropLock: React.FC<MidnightDropLockProps> = ({
  receiverName,
  unlockDateISO,
  onUnlock,
}) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 2,
    minutes: 14,
    seconds: 36,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleUnlockClick = () => {
    triggerHaptic('success');
    setIsUnlocked(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 },
    });
    setTimeout(() => {
      onUnlock();
    }, 1200);
  };

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-6 text-center text-white bg-slate-950 overflow-hidden select-none">
      <div className="relative z-20 flex flex-col items-center max-w-md w-full">
        {/* Floating Lock Icon */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-24 w-24 rounded-full bg-gradient-to-tr from-pink-500 via-purple-600 to-amber-400 p-0.5 shadow-2xl shadow-purple-500/40 mb-6 flex items-center justify-center"
        >
          <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
            {isUnlocked ? (
              <Unlock className="h-10 w-10 text-amber-300 animate-bounce" />
            ) : (
              <Lock className="h-10 w-10 text-pink-400 animate-pulse" />
            )}
          </div>
        </motion.div>

        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
          MIDNIGHT DROP 🔐
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
          {isUnlocked ? 'The Surprise is Unlocked! 🎁' : 'Something is Waiting For You...'}
        </h1>

        <p className="text-xs text-slate-300 mb-8">
          Specially locked for <span className="font-bold text-pink-300">{receiverName}</span> until birthday midnight.
        </p>

        {/* Countdown Timer Display */}
        {!isUnlocked && (
          <div className="grid grid-cols-3 gap-3 w-full max-w-xs mb-8">
            <div className="flex flex-col items-center rounded-2xl bg-white/10 p-3 border border-white/15 backdrop-blur-md">
              <span className="font-serif text-3xl font-bold text-white">
                {formatNumber(timeLeft.hours)}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Hours</span>
            </div>

            <div className="flex flex-col items-center rounded-2xl bg-white/10 p-3 border border-white/15 backdrop-blur-md">
              <span className="font-serif text-3xl font-bold text-white">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Minutes</span>
            </div>

            <div className="flex flex-col items-center rounded-2xl bg-white/10 p-3 border border-white/15 backdrop-blur-md">
              <span className="font-serif text-3xl font-bold text-pink-300">
                {formatNumber(timeLeft.seconds)}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Seconds</span>
            </div>
          </div>
        )}

        {/* Open Early / Unlock Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUnlockClick}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-pink-500/40 cursor-pointer min-h-[44px]"
        >
          <Sparkles className="h-5 w-5" />
          <span>{isUnlocked ? 'Opening Experience...' : 'Unlock Now (Demo Mode) ✨'}</span>
        </motion.button>
      </div>
    </div>
  );
};
