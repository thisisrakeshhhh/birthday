'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGiftBuilderStore } from '@/features/builder/store';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { ConstellationIntro } from '@/features/receiver/ConstellationIntro';
import { InteractiveEnvelope } from '@/features/receiver/InteractiveEnvelope';
import { ScrapbookPolaroid } from '@/features/receiver/ScrapbookPolaroid';
import { MemoryMap } from '@/features/receiver/MemoryMap';
import { BirthdayRoastSection } from '@/features/receiver/BirthdayRoastSection';
import { InteractiveCake } from '@/features/receiver/InteractiveCake';
import { MidnightDropLock } from '@/features/receiver/MidnightDropLock';
import { StoryProgressStream } from '@/features/receiver/StoryProgressStream';
import { SpotifyGenZPlayer } from '@/features/receiver/SpotifyGenZPlayer';
import { THEME_REGISTRY } from '@/features/themes/tokens';
import { launchDiwaliFirecrackers } from '@/components/ui/DiwaliFirecrackers';
import { Sparkles, Music, Heart, MessageCircle, Copy, Check, Wand2, Flame } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function ReceiverExperiencePage() {
  const { currentGift } = useGiftBuilderStore();
  const [showLock, setShowLock] = useState<boolean>(currentGift.midnightDrop?.enabled || false);
  const [showConstellation, setShowConstellation] = useState(true);
  const [reactions, setReactions] = useState<string[]>(['❤️', '🥹', '💀']);
  const [copiedLink, setCopiedLink] = useState(false);

  const theme = THEME_REGISTRY[currentGift.themeId] || THEME_REGISTRY.midnight;

  const handleSendReaction = (emoji: string) => {
    triggerHaptic('medium');
    setReactions((prev) => [...prev, emoji]);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  const handleFirecrackers = () => {
    triggerHaptic('heavy');
    launchDiwaliFirecrackers();
  };

  const handleWhatsAppShare = () => {
    triggerHaptic('success');
    const shareText = encodeURIComponent(
      currentGift.whatsappShareText ||
        `Yo ${currentGift.receiverName}, I made something for you 👀 Don't open this around other people 😂👇 https://birthday-self-theta.vercel.app/g/${currentGift.id}`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const handleCopyLink = () => {
    triggerHaptic('light');
    const fullUrl = `${window.location.origin}/g/${currentGift.id}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (showLock) {
    return (
      <MidnightDropLock
        receiverName={currentGift.receiverName}
        onUnlock={() => setShowLock(false)}
      />
    );
  }

  if (showConstellation) {
    return (
      <ConstellationIntro
        receiverName={currentGift.receiverName}
        onComplete={() => setShowConstellation(false)}
      />
    );
  }

  return (
    <AuroraBackground themeId="midnight">
      {/* Floating Header Actions */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={handleFirecrackers}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-3.5 py-2 text-xs font-extrabold text-white shadow-lg border border-amber-300/40 hover:scale-105 transition-transform min-h-[44px]"
        >
          <Sparkles className="h-4 w-4" />
          <span>Firecrackers 🎆</span>
        </button>

        <button
          onClick={handleWhatsAppShare}
          className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg border border-emerald-400/40 hover:bg-emerald-500 transition-colors min-h-[44px]"
        >
          <MessageCircle className="h-4 w-4 fill-white" />
          <span>Share 💚</span>
        </button>
      </div>

      <div className="flex min-h-screen flex-col items-center px-4 py-16 text-slate-100 max-w-4xl mx-auto w-full space-y-16">
        {/* Conversational Intro Banner */}
        <div className="text-center space-y-3 pt-6">
          <span className="inline-block rounded-full bg-pink-500/20 border border-pink-400/40 px-4 py-1.5 text-xs font-bold text-pink-300 backdrop-blur-md">
            {currentGift.vibe === 'roast' || currentGift.vibe === 'unhinged'
              ? 'WARNING: emotional damage ahead 💀'
              : currentGift.vibe === 'romantic'
              ? "okay… this one's for you ❤️"
              : 'someone has something to tell you 👀'}
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold text-white leading-tight">
            {currentGift.receiverName}
          </h1>
          <p className="text-sm text-slate-300 font-medium">Created with love by {currentGift.senderName}</p>
        </div>

        {/* Spotify Gen-Z Player */}
        <div className="w-full">
          <SpotifyGenZPlayer songTitle={currentGift.songTitle} artistName={currentGift.artistName} />
        </div>

        {/* Birthday Roast Section */}
        {currentGift.roast?.enabled && (
          <div className="w-full">
            <BirthdayRoastSection roast={currentGift.roast} receiverName={currentGift.receiverName} />
          </div>
        )}

        {/* Instagram Story Progress Reel */}
        <div className="w-full">
          <StoryProgressStream memories={currentGift.memories} />
        </div>

        {/* Interactive Birthday Cake */}
        <div className="w-full">
          <InteractiveCake receiverName={currentGift.receiverName} />
        </div>

        {/* Chapter 1: Scrapbook Polaroid Gallery */}
        <div className="w-full space-y-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-amber-200 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-amber-300" /> Chapter 1: Memory Wall 📸
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {currentGift.memories.map((mem, idx) => (
              <ScrapbookPolaroid key={mem.id} memory={mem} index={idx} />
            ))}
          </div>
        </div>

        {/* Chapter 2: Memory Map */}
        <div className="w-full">
          <MemoryMap memories={currentGift.memories} />
        </div>

        {/* Chapter 3: Sealed Envelope */}
        <div className="w-full">
          <InteractiveEnvelope
            senderName={currentGift.senderName}
            receiverName={currentGift.receiverName}
            message={currentGift.notes[0]?.message || 'Your boring birthday text era is over.'}
          />
        </div>

        {/* Real-time Reaction Stream */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Send Live Reaction to {currentGift.senderName}
          </p>
          <div className="flex items-center gap-3">
            {['❤️', '🥹', '😂', '💀', '✨'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleSendReaction(emoji)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-2xl transition-transform hover:scale-115 min-h-[44px] min-w-[44px] cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* WhatsApp Share Card */}
        <div className="w-full max-w-md rounded-3xl bg-slate-900/90 p-6 border border-white/15 text-center flex flex-col items-center gap-4 shadow-2xl">
          <h4 className="font-serif text-lg font-bold text-white">Send the Surprise</h4>
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-xl hover:bg-emerald-500 w-full min-h-[44px]"
          >
            <MessageCircle className="h-5 w-5 fill-white" />
            <span>Send on WhatsApp 💚</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-2.5 text-xs font-semibold text-slate-200 border border-white/15 hover:bg-white/20 w-full min-h-[44px]"
          >
            {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
        </div>

        {/* Viral Loop Footer */}
        <div className="text-center pt-16 pb-12 space-y-4 border-t border-white/10 w-full">
          <p className="font-serif text-2xl sm:text-3xl italic text-pink-300">
            &quot;Not a birthday wish. A whole experience.&quot;
          </p>
          <p className="text-xs text-slate-400">
            Want to make someone feel this special?
          </p>
          <Link href="/express" className="inline-block">
            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-xs font-bold text-white shadow-lg hover:scale-105 transition-transform min-h-[44px]">
              <Wand2 className="h-4 w-4" />
              Make Your Own Surprise ✨
            </button>
          </Link>
        </div>
      </div>
    </AuroraBackground>
  );
}
