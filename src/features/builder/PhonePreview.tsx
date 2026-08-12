'use client';

import React from 'react';
import { useGiftBuilderStore } from '@/features/builder/store';
import { THEME_REGISTRY } from '@/features/themes/tokens';
import { Sparkles, MapPin, Heart, Music } from 'lucide-react';

export const PhonePreview: React.FC = () => {
  const { currentGift } = useGiftBuilderStore();
  const theme = THEME_REGISTRY[currentGift.themeId] || THEME_REGISTRY.cute;

  return (
    <div className="relative mx-auto w-full max-w-[320px] aspect-[9/18] rounded-[48px] border-[10px] border-slate-900 bg-slate-950 p-2 shadow-2xl overflow-hidden select-none">
      {/* iPhone Dynamic Island / Camera Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-slate-900 z-40 border border-slate-800" />

      {/* Screen Viewport */}
      <div
        className={`h-full w-full rounded-[36px] bg-gradient-to-br ${theme.colors.gradient} overflow-y-auto p-4 pt-10 text-slate-100 flex flex-col items-center gap-4 relative transition-colors duration-500`}
      >
        {/* Header Title */}
        <div className="text-center">
          <span className="text-[10px] uppercase font-bold text-pink-400 tracking-wider">
            MemoryBloom Preview
          </span>
          <h2 className="font-serif text-xl font-bold text-white leading-tight">
            For {currentGift.receiverName || 'Someone Special'}
          </h2>
        </div>

        {/* Polaroid Memory Stack */}
        <div className="w-full flex flex-col gap-3">
          {currentGift.memories.slice(0, 2).map((mem, idx) => (
            <div
              key={mem.id}
              className="rounded-lg bg-white p-2 text-slate-900 shadow-md border border-stone-200 transform"
              style={{ transform: `rotate(${mem.rotation || (idx % 2 === 0 ? -3 : 4)}deg)` }}
            >
              <img
                src={mem.url}
                alt={mem.caption}
                className="w-full aspect-[4/3] object-cover rounded-md"
              />
              <p className="font-serif text-xs font-bold mt-1 text-stone-800 truncate">
                {mem.caption}
              </p>
              {mem.location && (
                <span className="flex items-center gap-0.5 text-[9px] text-pink-600 font-medium mt-0.5">
                  <MapPin className="h-2.5 w-2.5" />
                  {mem.location.name}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Handwritten Note Preview */}
        {currentGift.notes[0] && (
          <div className="w-full rounded-xl bg-amber-50/90 p-3 text-slate-900 shadow-sm border border-amber-200 text-xs font-serif italic">
            <p className="line-clamp-4">{currentGift.notes[0].message}</p>
            <p className="text-[10px] font-bold text-pink-600 text-right mt-1">
              — {currentGift.senderName || 'Me'}
            </p>
          </div>
        )}

        {/* Music Player Bar */}
        <div className="mt-auto w-full rounded-full bg-slate-900/80 backdrop-blur-md p-2 flex items-center justify-between border border-white/10 text-[10px]">
          <div className="flex items-center gap-2">
            <Music className="h-3.5 w-3.5 text-pink-400 animate-spin" />
            <span className="truncate font-medium text-slate-200">Soft Ambient Track</span>
          </div>
          <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400" />
        </div>
      </div>
    </div>
  );
};
