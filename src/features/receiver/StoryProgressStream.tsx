'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryItem } from '@/types/gift';
import { MapPin, Heart, MessageCircle, ChevronRight, ChevronLeft, Sparkles, Camera } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

const STORY_INTRO_PROMPTS = [
  'remember this? 🥹',
  'yeah… that was a good day ❤️',
  'and then this happened 💀',
  'bro thought he was the main character ✨',
  'okay this one stays between us 🤫',
  'unfiltered decision #47 😂',
  'the day we had zero survival instincts 🌊',
];

export const StoryProgressStream: React.FC<{ memories: MemoryItem[] }> = ({ memories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState(127);
  const [hasLiked, setHasLiked] = useState(false);

  if (!memories || !memories.length) return null;

  const currentMem = memories[currentIndex] || memories[0];
  const storyPrompt = STORY_INTRO_PROMPTS[currentIndex % STORY_INTRO_PROMPTS.length];

  const handleNext = () => {
    triggerHaptic('light');
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    triggerHaptic('light');
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleLike = () => {
    triggerHaptic('medium');
    setHasLiked(!hasLiked);
    setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-md mx-auto my-12 px-4 select-none">
      <div className="text-center mb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-pink-400">
          INSTAGRAM STORY REEL
        </span>
        <h3 className="font-serif text-2xl font-bold text-white">Our Story Progression 📸</h3>
      </div>

      {/* Main Instagram Story Card Container */}
      <div className="relative aspect-[9/16] w-full rounded-3xl bg-slate-900 border-2 border-white/20 shadow-2xl overflow-hidden flex flex-col justify-between p-4">
        {/* Story Progress Bar Indicators */}
        <div className="relative z-30 flex items-center gap-1.5 w-full pt-1">
          {memories.map((_, idx) => (
            <div
              key={idx}
              className="h-1 flex-1 rounded-full overflow-hidden bg-white/20"
            >
              <div
                className={`h-full bg-white transition-all duration-300 ${
                  idx === currentIndex ? 'w-full' : idx < currentIndex ? 'w-full opacity-60' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Story Header */}
        <div className="relative z-30 flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Camera className="h-3.5 w-3.5 text-pink-400" />
            <span className="text-[11px] font-mono font-bold text-slate-200">
              {currentMem.fileName || `IMG_28${currentIndex + 40}.JPG`}
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-pink-300 bg-pink-500/20 px-2.5 py-1 rounded-full border border-pink-400/30">
            Story {currentIndex + 1} / {memories.length}
          </span>
        </div>

        {/* Tap Left / Right Controls */}
        <div className="absolute inset-0 z-20 flex">
          <div className="w-1/2 h-full cursor-pointer" onClick={handlePrev} />
          <div className="w-1/2 h-full cursor-pointer" onClick={handleNext} />
        </div>

        {/* Story Media Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-10"
          >
            <img
              src={currentMem.url}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Story Bottom Content & Engagement */}
        <div className="relative z-30 flex flex-col gap-2 pt-16">
          <span className="text-xs font-serif italic text-pink-300 drop-shadow-md">
            {storyPrompt}
          </span>

          <p className="font-serif text-lg font-bold text-white drop-shadow-lg leading-tight">
            {currentMem.caption || currentMem.insideJokeAi || 'Unfiltered decision'}
          </p>

          {/* Location Badge */}
          {currentMem.location && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-amber-200">
              <MapPin className="h-3 w-3 text-pink-400" />
              <span>{currentMem.location.name} {currentMem.location.time || '3:47 PM'}</span>
            </div>
          )}

          {/* Social Engagement Stats */}
          <div className="flex items-center justify-between border-t border-white/20 pt-3 mt-1">
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-pink-400 transition-colors min-h-[44px]"
            >
              <Heart
                className={`h-5 w-5 ${
                  hasLiked ? 'text-rose-500 fill-rose-500 scale-110' : 'text-white'
                }`}
              />
              <span>{likes}</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <MessageCircle className="h-4 w-4" />
              <span>38 comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
