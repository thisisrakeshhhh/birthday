'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MemoryItem } from '@/types/gift';
import { MapPin, Calendar } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

interface ScrapbookPolaroidProps {
  memory: MemoryItem;
  index: number;
}

export const ScrapbookPolaroid: React.FC<ScrapbookPolaroidProps> = ({ memory, index }) => {
  const rotation = memory.rotation ?? (index % 2 === 0 ? -3 : 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 30 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => triggerHaptic('light')}
      className="group relative flex flex-col rounded-sm bg-white p-3 shadow-xl transition-all duration-300 border border-stone-200 cursor-pointer select-none max-w-sm w-full"
    >
      {/* Decorative Washi Tape Sticker */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 opacity-85 shadow-xs border border-white/40"
        style={{ backgroundColor: memory.tapeColor || '#F472B6', transform: 'rotate(-2deg)' }}
      />

      {/* Polaroid Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 rounded-xs">
        <img
          src={memory.url}
          alt={memory.caption || 'Memory'}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Location Tag Badge */}
        {memory.location && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-slate-950/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-amber-200">
            <MapPin className="h-3 w-3 text-pink-400" />
            <span>{memory.location.name}</span>
          </div>
        )}
      </div>

      {/* Handwritten Caption & Date */}
      <div className="mt-3 flex flex-col gap-1 px-1">
        {memory.caption && (
          <p className="font-serif text-lg font-bold text-slate-800 leading-snug">
            {memory.caption}
          </p>
        )}
        {memory.date && (
          <div className="flex items-center gap-1 text-[11px] text-stone-500">
            <Calendar className="h-3 w-3 text-amber-600" />
            <span>{memory.date}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
