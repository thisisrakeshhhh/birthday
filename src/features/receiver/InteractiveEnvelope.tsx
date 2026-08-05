'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerHaptic } from '@/lib/utils';
import { Heart, Sparkles, Lock, MailOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveEnvelopeProps {
  senderName: string;
  receiverName: string;
  message: string;
  fontFamily?: string;
}

export const InteractiveEnvelope: React.FC<InteractiveEnvelopeProps> = ({
  senderName,
  receiverName,
  message,
}) => {
  const [isSealBroken, setIsSealBroken] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleBreakSeal = () => {
    if (isSealBroken) return;
    triggerHaptic('heavy');
    setIsSealBroken(true);

    setTimeout(() => {
      setIsOpen(true);
      triggerHaptic('success');

      // Trigger Confetti Explosion
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#C084FC', '#F59E0B', '#38BDF8'],
      });
    }, 600);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-12 px-4 select-none">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-pink-400">
        A Secret Sealed Letter
      </p>

      <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl bg-gradient-to-br from-amber-100 via-rose-50 to-pink-100 p-6 shadow-2xl border border-amber-200/80 overflow-hidden flex flex-col items-center justify-center">
        {/* Envelope Paper Flap */}
        <motion.div
          animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 0 : 20 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-amber-200 to-rose-200 rounded-t-2xl origin-top border-b border-amber-300/60 shadow-md flex items-center justify-center"
        >
          {!isSealBroken && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBreakSeal}
              className="relative z-30 flex h-16 w-16 items-center justify-center rounded-full bg-red-700 shadow-xl shadow-red-900/50 border-2 border-amber-300 cursor-pointer min-h-[44px] min-w-[44px]"
            >
              <Heart className="h-8 w-8 text-amber-200 fill-amber-200 animate-pulse" />
              <span className="absolute -bottom-6 text-[10px] uppercase tracking-wider text-red-900 font-bold bg-amber-100/90 px-2 py-0.5 rounded-full shadow-xs">
                Peel Seal
              </span>
            </motion.button>
          )}
        </motion.div>

        {/* Outer Sealed Copy when Closed */}
        {!isOpen && (
          <div className="z-10 flex flex-col items-center text-center mt-12">
            <MailOpen className="h-8 w-8 text-pink-500 mb-2 opacity-60" />
            <p className="font-serif text-lg font-bold text-slate-800">
              For {receiverName}
            </p>
            <p className="text-xs text-slate-500">From {senderName}</p>
          </div>
        )}

        {/* Letter Sliding Out when Unsealed */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
              className="relative z-30 w-full h-full rounded-xl bg-amber-50/95 p-6 shadow-xl border border-amber-200 text-slate-900 flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-2 mb-3">
                <span className="text-xs font-serif text-amber-800 font-semibold italic">
                  Handwritten Note
                </span>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>

              {/* Animated Pen Stroke Content */}
              <div className="font-serif text-lg sm:text-xl leading-relaxed text-amber-950 whitespace-pre-line italic">
                {message}
              </div>

              <div className="mt-auto pt-4 text-right">
                <p className="text-sm font-bold text-pink-600 font-serif">
                  With Love, {senderName} ❤️
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
