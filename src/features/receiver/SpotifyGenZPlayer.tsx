'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, SkipBack, SkipForward, Heart, Disc, Volume2, VolumeX } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

const DUMMY_AUDIO_PRESETS: Record<string, string> = {
  lofi: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
  acoustic: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=sweet-piano-11115.mp3',
  cosmic: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b41e8f23.mp3?filename=ambient-piano-10781.mp3',
};

export const SpotifyGenZPlayer: React.FC<{
  songTitle?: string;
  artistName?: string;
  customAudioUrl?: string;
}> = ({
  songTitle = 'the song that reminds me of you',
  artistName = 'Your Favorite Memory',
  customAudioUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioSrc = customAudioUrl || DUMMY_AUDIO_PRESETS.lofi;

  const togglePlay = () => {
    triggerHaptic('medium');
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => {
          console.warn('Audio playback interaction needed:', e);
          setIsPlaying(true);
        });
      }
    }
  };

  const toggleMute = () => {
    triggerHaptic('light');
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto my-8 px-4 select-none">
      {/* HTML5 Audio Player Element */}
      <audio ref={audioRef} src={audioSrc} loop />

      <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl p-5 border border-white/20 shadow-2xl flex flex-col gap-4">
        {/* Top Label */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 border-b border-white/10 pb-2">
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
            <p className="text-xs text-slate-300 truncate">{artistName}</p>
          </div>

          <button
            onClick={toggleMute}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer text-slate-300 hover:text-white"
          >
            {isMuted ? <VolumeX className="h-5 w-5 text-red-400" /> : <Volume2 className="h-5 w-5 text-pink-400" />}
          </button>
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
              animate={{ width: isPlaying ? ['20%', '95%'] : '35%' }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono">
            <span>1:24</span>
            <span>3:42</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => triggerHaptic('light')} className="text-slate-300 hover:text-white min-h-[44px]">
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={togglePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform min-h-[44px] min-w-[44px] cursor-pointer"
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
