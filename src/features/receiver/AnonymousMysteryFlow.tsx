'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnonymousConfig } from '@/types/gift';
import { Shield, Eye, EyeOff, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface AnonymousMysteryFlowProps {
  config: AnonymousConfig;
  senderName?: string;
}

export const AnonymousMysteryFlow: React.FC<AnonymousMysteryFlowProps> = ({ config, senderName }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(config.isRevealed);
  const [keepSecret, setKeepSecret] = useState(false);

  const clues = config.clues || [];

  const handleNextStep = () => {
    triggerHaptic('light');
    setStepIndex((prev) => prev + 1);
  };

  const handleRevealClick = () => {
    triggerHaptic('success');
    setIsRevealed(true);
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleKeepSecretClick = () => {
    triggerHaptic('medium');
    setKeepSecret(true);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto my-12 px-4 select-none">
      <div className="rounded-3xl bg-slate-950/90 p-6 border border-white/20 shadow-2xl backdrop-blur-xl text-center space-y-6">
        {/* Top Confidential Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-1.5 text-xs font-bold text-sky-300">
          <HelpCircle className="h-4 w-4 text-sky-400 animate-pulse" />
          <span>CONFIDENTIAL INTERACTIVE MYSTERY</span>
        </div>

        {/* Step 0: Initial Screen */}
        {stepIndex === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-white">
              You don&apos;t know who this is yet.
            </h2>
            <p className="text-sm text-slate-300">
              {config.senderAlias || 'Someone has been noticing the little things.'}
            </p>
            <button
              onClick={handleNextStep}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg cursor-pointer min-h-[44px]"
            >
              <span>See Clues →</span>
            </button>
          </motion.div>
        )}

        {/* Step 1..N: Clue Cards */}
        {stepIndex > 0 && stepIndex <= clues.length && (
          <motion.div key={stepIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <span className="text-xs font-mono font-bold text-sky-400 tracking-widest uppercase">
              {clues[stepIndex - 1].label}
            </span>
            <h3 className="font-serif text-2xl font-bold text-white italic">
              &quot;{clues[stepIndex - 1].text}&quot;
            </h3>
            <p className="text-xs text-slate-400">
              Clue {stepIndex} of {clues.length}
            </p>
            <button
              onClick={handleNextStep}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 text-xs font-bold text-white border border-white/20 hover:bg-white/20 cursor-pointer min-h-[44px]"
            >
              <span>{stepIndex === clues.length ? 'Final Question →' : 'Next Clue →'}</span>
            </button>
          </motion.div>
        )}

        {/* Final Decision Screen */}
        {stepIndex > clues.length && !isRevealed && !keepSecret && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <h3 className="font-serif text-3xl font-bold text-white">
              Do you want to know who sent this?
            </h3>
            <p className="text-xs text-slate-300">
              The identity will only be revealed if you tap below.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleRevealClick}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-xs font-bold text-white shadow-xl min-h-[44px] cursor-pointer"
              >
                <Eye className="h-4 w-4" /> REVEAL THEM ✨
              </button>
              <button
                onClick={handleKeepSecretClick}
                className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-xs font-bold text-slate-300 border border-white/20 min-h-[44px] cursor-pointer"
              >
                <EyeOff className="h-4 w-4" /> KEEP IT A MYSTERY 🤫
              </button>
            </div>
          </motion.div>
        )}

        {/* Revealed Identity State */}
        {isRevealed && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3 pt-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              IDENTITY REVEALED 🕵️✨
            </span>
            <h2 className="font-serif text-3xl font-bold text-amber-200">
              Sent by {senderName || 'Someone who cares about you'} ❤️
            </h2>
            <p className="text-xs text-slate-300">
              They decided to stop hiding and say something real.
            </p>
          </motion.div>
        )}

        {/* Kept Secret State */}
        {keepSecret && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
              MYSTERY PRESERVED 🤫
            </span>
            <p className="font-serif text-lg italic text-slate-200">
              &quot;Some secrets are better felt than known.&quot;
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
