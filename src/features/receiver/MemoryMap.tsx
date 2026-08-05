'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryItem } from '@/types/gift';
import { MapPin, X, Sparkles } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

interface MemoryMapProps {
  memories: MemoryItem[];
}

export const MemoryMap: React.FC<MemoryMapProps> = ({ memories }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  // Filter memories that have location tags
  const mappedMemories = memories.filter((m) => m.location);

  return (
    <div className="relative w-full py-12 px-4 flex flex-col items-center">
      <div className="text-center mb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Our Travel Journey
        </span>
        <h2 className="font-serif text-3xl font-bold text-slate-100">
          Memory Map 📍
        </h2>
      </div>

      {/* Stylized Interactive Map Canvas */}
      <div className="relative w-full max-w-2xl aspect-[16/9] rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/50 shadow-2xl p-6 overflow-hidden flex items-center justify-center">
        {/* World Grid Texture Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />

        <p className="absolute top-4 left-4 text-[11px] text-indigo-300 font-mono">
          INTERACTIVE LOCATIONS • {mappedMemories.length} PINS FOUND
        </p>

        {/* Floating Pins */}
        <div className="relative w-full h-full flex items-center justify-around">
          {mappedMemories.map((mem, idx) => (
            <motion.div
              key={mem.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.2, type: 'spring' }}
              className="relative group cursor-pointer"
              onClick={() => {
                triggerHaptic('medium');
                setSelectedMemory(mem);
              }}
            >
              <span className="absolute -inset-2 rounded-full bg-pink-500/30 animate-ping" />
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg border border-white/40 hover:scale-115 transition-transform min-h-[44px] min-w-[44px]">
                <MapPin className="h-5 w-5" />
              </button>
              <span className="mt-1 block text-center text-[10px] font-bold text-amber-200 bg-slate-900/80 px-2 py-0.5 rounded-full border border-white/10">
                {mem.location?.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup on Pin Click */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full rounded-2xl bg-white p-4 text-slate-900 shadow-2xl border border-stone-200"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-3 right-3 rounded-full bg-stone-100 p-1 text-stone-600 hover:bg-stone-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>

              <img
                src={selectedMemory.url}
                alt={selectedMemory.caption}
                className="w-full aspect-[4/3] object-cover rounded-lg mb-3"
              />
              <div className="flex items-center gap-1 text-xs font-bold text-pink-600 mb-1">
                <MapPin className="h-4 w-4" />
                <span>{selectedMemory.location?.name} ({selectedMemory.location?.year})</span>
              </div>
              <p className="font-serif text-lg font-bold text-slate-800">
                {selectedMemory.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
