'use client';

import React, { useState } from 'react';
import { useGiftBuilderStore } from '@/features/builder/store';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { ConstellationIntro } from '@/features/receiver/ConstellationIntro';
import { InteractiveEnvelope } from '@/features/receiver/InteractiveEnvelope';
import { ScrapbookPolaroid } from '@/features/receiver/ScrapbookPolaroid';
import { MemoryMap } from '@/features/receiver/MemoryMap';
import { THEME_REGISTRY } from '@/features/themes/tokens';
import { Sparkles, Music, Heart, Share2, Volume2 } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function ReceiverExperiencePage() {
  const { currentGift } = useGiftBuilderStore();
  const [showConstellation, setShowConstellation] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [reactions, setReactions] = useState<string[]>(['❤️', '🥹']);

  const theme = THEME_REGISTRY[currentGift.themeId] || THEME_REGISTRY.cute;

  const handleSendReaction = (emoji: string) => {
    triggerHaptic('medium');
    setReactions((prev) => [...prev, emoji]);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  if (showConstellation) {
    return (
      <ConstellationIntro
        receiverName={currentGift.receiverName}
        onComplete={() => setShowConstellation(false)}
      />
    );
  }

  return (
    <AuroraBackground themeId={currentGift.themeId}>
      {/* Floating Header Audio Control */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            triggerHaptic('light');
            setIsPlayingMusic(!isPlayingMusic);
          }}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 backdrop-blur-xl px-4 py-2 text-xs font-bold text-white shadow-lg min-h-[44px]"
        >
          <Music className={`h-4 w-4 ${isPlayingMusic ? 'animate-spin text-pink-400' : 'text-slate-400'}`} />
          <span>{isPlayingMusic ? 'Music Playing 🎶' : 'Play Soundtrack'}</span>
        </button>
      </div>

      <div className="flex min-h-screen flex-col items-center px-4 py-16 text-slate-100 max-w-4xl mx-auto w-full space-y-24">
        {/* Title Header */}
        <div className="text-center space-y-3 pt-6">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
            A Digital Gift For You
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight">
            {currentGift.receiverName}
          </h1>
          <p className="text-sm text-slate-300">Created with love by {currentGift.senderName}</p>
        </div>

        {/* Chapter 1: Story Polaroids */}
        <div className="w-full space-y-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold text-amber-200 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" /> Chapter 1: Shared Memories
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {currentGift.memories.map((mem, idx) => (
              <ScrapbookPolaroid key={mem.id} memory={mem} index={idx} />
            ))}
          </div>
        </div>

        {/* Chapter 2: Interactive Travel Memory Map */}
        <div className="w-full">
          <MemoryMap memories={currentGift.memories} />
        </div>

        {/* Chapter 3: Sealed Envelope Note */}
        <div className="w-full">
          <InteractiveEnvelope
            senderName={currentGift.senderName}
            receiverName={currentGift.receiverName}
            message={currentGift.notes[0]?.message || 'You deserve a memory you will never forget.'}
          />
        </div>

        {/* Real-time Reaction Floating Stream */}
        <div className="flex flex-col items-center gap-3 pt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Send Live Reaction to {currentGift.senderName}
          </p>
          <div className="flex items-center gap-3">
            {['❤️', '🥹', '😂', '😭', '✨'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleSendReaction(emoji)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-2xl transition-transform hover:scale-115 min-h-[44px] min-w-[44px]"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Emotional Finale */}
        <div className="text-center pt-16 pb-12 space-y-4 border-t border-white/10 w-full">
          <p className="font-serif text-2xl sm:text-3xl italic text-pink-300">
            &quot;Some memories never end.&quot;
          </p>
          <p className="text-xs text-slate-400">
            Made with ❤️ using <span className="text-white font-bold">MemoryBloom</span>
          </p>
        </div>
      </div>
    </AuroraBackground>
  );
}
