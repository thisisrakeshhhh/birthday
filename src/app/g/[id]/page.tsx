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
import { AnonymousMysteryFlow } from '@/features/receiver/AnonymousMysteryFlow';
import { SituationshipQuiz } from '@/features/receiver/SituationshipQuiz';
import { GroupChatCouncil } from '@/features/receiver/GroupChatCouncil';
import { THEME_REGISTRY } from '@/features/themes/tokens';
import { Sparkles, Music, Heart, MessageCircle, Copy, Check, Wand2, ArrowRight } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function ReceiverExperiencePage() {
  const { currentGift } = useGiftBuilderStore();
  const [showLock, setShowLock] = useState<boolean>(currentGift.midnightDrop?.enabled || false);
  const [showConstellation, setShowConstellation] = useState(false);
  const [reactions, setReactions] = useState<string[]>(['❤️', '🥹', '🕵️']);
  const [copiedLink, setCopiedLink] = useState(false);

  const theme = THEME_REGISTRY[currentGift.themeId] || THEME_REGISTRY.secret;

  const isAnonymous = currentGift.anonymousConfig?.enabled || currentGift.familiarity === 'dont_know_name';
  const displayTitle = isAnonymous
    ? 'Someone has been watching...'
    : currentGift.receiverName || 'Someone Special';

  const handleSendReaction = (emoji: string) => {
    triggerHaptic('medium');
    setReactions((prev) => [...prev, emoji]);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  const handleWhatsAppShare = () => {
    triggerHaptic('success');
    const shareText = encodeURIComponent(
      currentGift.whatsappShareText ||
        `Someone wants to tell you something 👀 Don't ask questions. Just open this 👇 https://birthday-self-theta.vercel.app/g/${currentGift.id}`
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
        receiverName={currentGift.receiverName || 'Someone Special'}
        onUnlock={() => setShowLock(false)}
      />
    );
  }

  if (showConstellation) {
    return (
      <ConstellationIntro
        receiverName={displayTitle}
        onComplete={() => setShowConstellation(false)}
      />
    );
  }

  return (
    <AuroraBackground themeId={currentGift.themeId}>
      {/* Floating Header WhatsApp Share */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={handleWhatsAppShare}
          className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg border border-emerald-400/40 hover:bg-emerald-500 transition-colors min-h-[44px]"
        >
          <MessageCircle className="h-4 w-4 fill-white" />
          <span>Share 💚</span>
        </button>
      </div>

      <div className="flex min-h-screen flex-col items-center px-4 py-16 text-slate-100 max-w-4xl mx-auto w-full space-y-16">
        {/* Conversational Digital Object Intro Header */}
        <div className="text-center space-y-3 pt-6">
          <span className="inline-block rounded-full bg-sky-500/20 border border-sky-400/40 px-4 py-1.5 text-xs font-bold text-sky-300 backdrop-blur-md">
            {isAnonymous
              ? 'Someone has been noticing the little things 🕵️'
              : currentGift.intent === 'crush'
              ? "okay… this is embarrassing 👀"
              : currentGift.intent === 'what_are_we'
              ? "what are we? 🫠"
              : 'someone made an interactive story for you ✨'}
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold text-white leading-tight">
            {displayTitle}
          </h1>
          {!isAnonymous && currentGift.senderName && (
            <p className="text-sm text-slate-300 font-medium">From {currentGift.senderName}</p>
          )}
        </div>

        {/* Anonymous Mystery Flow (If enabled) */}
        {isAnonymous && currentGift.anonymousConfig && (
          <div className="w-full">
            <AnonymousMysteryFlow
              config={currentGift.anonymousConfig}
              senderName={currentGift.senderName}
            />
          </div>
        )}

        {/* Situationship Quiz (If what_are_we intent) */}
        {(currentGift.intent === 'what_are_we' || currentGift.situationshipCards?.length) && (
          <div className="w-full">
            <SituationshipQuiz cards={currentGift.situationshipCards} />
          </div>
        )}

        {/* Group Chat Council */}
        {currentGift.groupChatVote && (
          <div className="w-full">
            <GroupChatCouncil vote={currentGift.groupChatVote} />
          </div>
        )}

        {/* Spotify Gen-Z Player */}
        <div className="w-full">
          <SpotifyGenZPlayer songTitle={currentGift.songTitle} artistName={currentGift.artistName} />
        </div>

        {/* Birthday Roast Section (If roast intent) */}
        {currentGift.roast?.enabled && (
          <div className="w-full">
            <BirthdayRoastSection roast={currentGift.roast} receiverName={displayTitle} />
          </div>
        )}

        {/* Instagram Story Progress Reel */}
        <div className="w-full">
          <StoryProgressStream memories={currentGift.memories} />
        </div>

        {/* Chapter 1: Memory Wall */}
        <div className="w-full space-y-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-amber-200 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-amber-300" /> Shared Moments 📸
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

        {/* Chapter 3: Sealed Envelope Note */}
        <div className="w-full">
          <InteractiveEnvelope
            senderName={currentGift.senderName || 'Someone who cares'}
            receiverName={displayTitle}
            message={currentGift.notes[0]?.message || 'I wasn\'t planning on saying this. Then I kept thinking about you. So here we are.'}
          />
        </div>

        {/* Real-time Reaction Stream */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Send Live Reaction
          </p>
          <div className="flex items-center gap-3">
            {['❤️', '🥹', '😂', '💀', '🕵️'].map((emoji) => (
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
          <h4 className="font-serif text-lg font-bold text-white">Send this to them 👀</h4>
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
          <p className="font-serif text-2xl sm:text-3xl italic text-sky-300">
            &quot;Say something without saying it.&quot;
          </p>
          <p className="text-xs text-slate-400">
            Want to make someone feel something?
          </p>
          <Link href="/express" className="inline-block">
            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg hover:scale-105 transition-transform min-h-[44px]">
              <Wand2 className="h-4 w-4" />
              Create your own →
            </button>
          </Link>
        </div>
      </div>
    </AuroraBackground>
  );
}
