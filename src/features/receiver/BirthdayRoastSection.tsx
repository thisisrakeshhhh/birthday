'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BirthdayRoast } from '@/types/gift';
import { Skull, Heart, Flame } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

export const BirthdayRoastSection: React.FC<{ roast: BirthdayRoast; receiverName: string }> = ({
  roast,
  receiverName,
}) => {
  if (!roast || !roast.enabled || !roast.roastMemories.length) return null;

  return (
    <div className="relative flex flex-col items-center justify-center py-12 px-4 text-center select-none w-full max-w-2xl mx-auto">
      <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-md mb-4">
        <Skull className="h-4 w-4 text-amber-400 animate-bounce" />
        <span>OFFICIAL BIRTHDAY ROAST 💀</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2 leading-tight">
        {roast.introText || "Okay... we've reviewed the evidence. 💀"}
      </h2>
      <p className="text-xs text-slate-300 mb-8">
        Photographic proof of your unhinged decisions over the years.
      </p>

      {/* Roast Cards Stream */}
      <div className="w-full flex flex-col gap-8 items-center">
        {roast.roastMemories.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30, rotate: idx % 2 === 0 ? -2 : 3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            onClick={() => triggerHaptic('medium')}
            className="w-full max-w-md rounded-2xl bg-zinc-900/90 p-4 border border-amber-400/30 shadow-2xl text-left cursor-pointer"
          >
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-3 border border-white/10">
              <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
              <span className="absolute top-2 left-2 rounded-full bg-red-600/90 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                EXHIBIT #{idx + 1}
              </span>
            </div>

            <p className="font-serif text-base sm:text-lg font-bold text-amber-200 leading-snug">
              {item.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Outro */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-10 rounded-full bg-rose-500/20 border border-rose-400/40 px-6 py-3 text-sm font-bold text-rose-200 backdrop-blur-md flex items-center gap-2"
      >
        <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
        <span>{roast.outroText || 'Okay okay... we love you ❤️'}</span>
      </motion.div>
    </div>
  );
};
