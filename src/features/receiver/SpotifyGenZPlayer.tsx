'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, SkipBack, SkipForward, Heart, Disc } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

export const SpotifyGenZPlayer: React.FC<{ songTitle?: string; artistName?: string }> = ({
  songTitle = 'the song that reminds me of you',
  artistName = 'Your Favorite Memory',
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(true);

  const togglePlay = () => {
    triggerHaptic('light');
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full max-w-md mx-auto my-8 px-4 select-none">
      <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl p-5 border border-white/15 shadow-2xl flex flex-col gap-4">
        {/* Top Label */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/10 pb-2">
          <span className="flex items-center gap-1.5 font-bold text-pink-400">
            <Disc className={`h-4 w-4 ${isPlaying ? 'animate-spin' : ''}`} /> your birthday soundtrack
          </span>
          {/* Animated Waveform Bars */}
          <div className="flex items-end gap-0.5 h-3">
            {[0.4, 0.8, 0.5, 1, 0.6].map((h, i) => (
              <motion.span
                key={i}
                animate={isPlaying ? { height: ['20%', '100%', '30%'] } : { height: '20%' }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-pink-400 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Album Art & Track Info */}
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-amber-400 p-0.5 shadow-md shrink-0">
            <div className="h-full w-full rounded-2xl bg-slate-950 flex items-center justify-center">
              <Music className="h-6 w-6 text-pink-300" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-serif text-sm font-bold text-white truncate">{songTitle}</p>
            <p className="text-xs text-slate-400 truncate">{artistName}</p>
          </div>

          <button
            onClick={() => {
              triggerHaptic('light');
              setIsLiked(!isLiked);
            }}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
          </button>
        </div>

        {/* Scrub Bar */}
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden relative">
            <motion.div
              animate={{ width: isPlaying ? ['20%', '90%'] : '50%' }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>1:24</span>
            <span>3:42</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => triggerHaptic('light')} className="text-slate-400 hover:text-white min-h-[44px]">
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={togglePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform min-h-[44px] min-w-[44px]"
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white ml-0.5" />}
          </button>
          <button onClick={() => triggerHaptic('light')} className="text-slate-400 hover:text-white min-h-[44px]">
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
