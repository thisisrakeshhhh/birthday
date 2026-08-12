'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SituationshipCard } from '@/types/gift';
import { HelpCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';
import confetti from 'canvas-confetti';

export const SituationshipQuiz: React.FC<{ cards?: SituationshipCard[] }> = ({ cards }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const defaultCards: SituationshipCard[] = cards || [
    { id: 's1', title: 'Besties?', subtitle: 'Just friends who text 24/7', voteCount: 42 },
    { id: 's2', title: 'Something more?', subtitle: 'We both know it', voteCount: 128 },
    { id: 's3', title: 'Delusion?', subtitle: 'It\'s giving soulmate energy', voteCount: 89 },
    { id: 's4', title: 'Nobody knows.', subtitle: 'Let\'s stop pretending', voteCount: 210 },
  ];

  const handleVote = (id: string) => {
    triggerHaptic('medium');
    setSelectedId(id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4 text-center select-none">
      <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-1.5 text-xs font-bold text-pink-300 backdrop-blur-md mb-4">
        <HelpCircle className="h-4 w-4 text-pink-400" />
        <span>SITUATIONSHIP CHECK 🫠</span>
      </div>

      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
        What are we?
      </h3>
      <p className="text-xs text-slate-300 mb-6">
        Tap what you think we actually are.
      </p>

      {/* Quiz Option Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {defaultCards.map((card) => {
          const isSelected = selectedId === card.id;
          return (
            <motion.button
              key={card.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleVote(card.id)}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer min-h-[44px] ${
                isSelected
                  ? 'bg-gradient-to-br from-pink-500/30 via-purple-600/30 to-slate-900 border-pink-400 shadow-xl shadow-pink-500/20'
                  : 'bg-slate-900/80 border-white/15 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-base font-bold text-white mb-1">
                  <span>{card.title}</span>
                  {isSelected && <CheckCircle2 className="h-5 w-5 text-pink-400" />}
                </div>
                <p className="text-xs text-slate-300">{card.subtitle}</p>
              </div>

              {isSelected && (
                <span className="mt-3 text-[10px] font-bold text-pink-300">
                  {card.voteCount + 1} people agreed
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {selectedId && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 font-serif text-base font-bold text-amber-200 italic"
        >
          &quot;Maybe it&apos;s time we stop pretending we don&apos;t know.&quot; ✨
        </motion.p>
      )}
    </div>
  );
};
