'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerHaptic } from '@/lib/utils';
import { Flame, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveCake: React.FC<{ receiverName: string }> = ({ receiverName }) => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [isBlownOut, setIsBlownOut] = useState(false);

  const toggleCandle = (idx: number) => {
    triggerHaptic('medium');
    const updated = [...candlesLit];
    updated[idx] = !updated[idx];
    setCandlesLit(updated);

    if (updated.every((c) => !c)) {
      handleAllBlown();
    }
  };

  const blowAll = () => {
    triggerHaptic('success');
    setCandlesLit([false, false, false]);
    handleAllBlown();
  };

  const handleAllBlown = () => {
    setIsBlownOut(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#F59E0B', '#C084FC', '#38BDF8', '#FEF08A'],
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-10 px-4 text-center select-none">
      <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
        Interactive Birthday Moment
      </span>
      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
        Make a Wish & Blow the Candles! 🎂
      </h3>

      {/* Stylized Birthday Cake */}
      <div className="relative flex flex-col items-center">
        {/* Candle Flames Layer */}
        <div className="flex items-center gap-6 mb-1">
          {candlesLit.map((isLit, idx) => (
            <button
              key={idx}
              onClick={() => toggleCandle(idx)}
              className="flex flex-col items-center cursor-pointer min-h-[44px] min-w-[44px] justify-end pb-1"
            >
              <AnimatePresence>
                {isLit && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.25, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="h-6 w-4 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-lg shadow-amber-400/80 flex items-center justify-center"
                  >
                    <Flame className="h-3 w-3 text-red-500 fill-yellow-300 animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>
              {!isLit && (
                <span className="text-[10px] text-slate-400 font-bold">💨 Off</span>
              )}
              {/* Candle Stick */}
              <div className="h-10 w-2.5 rounded-t-sm bg-gradient-to-b from-pink-300 to-purple-400 border border-white/40 shadow-xs" />
            </button>
          ))}
        </div>

        {/* Top Tier Cake */}
        <div className="h-14 w-44 rounded-t-3xl bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 border-2 border-white/60 shadow-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-4 bg-white/40 rounded-b-full" />
          <span className="font-serif text-xs font-bold text-slate-900 tracking-wider">
            Happy Birthday
          </span>
        </div>

        {/* Bottom Tier Cake */}
        <div className="h-20 w-64 rounded-b-2xl rounded-t-lg bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 border-2 border-white/60 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-4 bg-amber-200/50 rounded-b-full" />
          <span className="font-serif text-lg font-bold text-white drop-shadow-md">
            {receiverName}
          </span>
        </div>

        {/* Cake Plate */}
        <div className="h-3 w-72 rounded-full bg-slate-200 shadow-xl border border-stone-300" />
      </div>

      {/* Blow Out Action Button */}
      <div className="mt-8">
        {!isBlownOut ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={blowAll}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-pink-500/30 cursor-pointer min-h-[44px]"
          >
            <Sparkles className="h-4 w-4" /> Blow Out Candles 🕯️
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xl">✨🎉🎂</span>
            <p className="font-serif text-base font-bold text-amber-200">
              Wish Granted! Happy Birthday {receiverName} ❤️
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
