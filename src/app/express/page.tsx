'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGiftBuilderStore } from '@/features/builder/store';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PhonePreview } from '@/features/builder/PhonePreview';
import { FamiliarityLevel, RelationshipIntent } from '@/types/gift';
import { Wand2, Sparkles, ArrowRight, EyeOff, Heart, HelpCircle } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

const FAMILIARITIES: Array<{ id: FamiliarityLevel; label: string }> = [
  { id: 'know_well', label: 'I know them well' },
  { id: 'know_little', label: 'I know them a little' },
  { id: 'just_met', label: "We've only just met" },
  { id: 'barely_know', label: 'I barely know them' },
  { id: 'dont_know_name', label: "I don't even know their name 💀" },
];

const INTENTS: Array<{ id: RelationshipIntent; label: string; icon: string }> = [
  { id: 'i_like_you', label: '💌 I like you', icon: '💌' },
  { id: 'keep_anonymous', label: '🕵️ Keep me anonymous', icon: '🕵️' },
  { id: 'crush', label: '👀 I have a crush', icon: '👀' },
  { id: 'what_are_we', label: '🫠 What are we?', icon: '🫠' },
  { id: 'i_miss_you', label: '🥀 I miss you', icon: '🥀' },
  { id: 'i_love_you', label: '❤️ I love you', icon: '❤️' },
  { id: 'roast', label: '😂 Roast them', icon: '😂' },
  { id: 'just_because', label: '✨ Just because', icon: '✨' },
];

export default function ExpressModePage() {
  const router = useRouter();
  const {
    currentGift,
    setFamiliarity,
    setIntent,
    setReceiverName,
    setRawInputText,
    generateWithAiDirector,
    isAiGenerating,
  } = useGiftBuilderStore();

  const handleAiBuild = () => {
    triggerHaptic('heavy');
    generateWithAiDirector();
  };

  const handleFinish = () => {
    triggerHaptic('success');
    router.push('/wrap');
  };

  const isAnonymous = currentGift.familiarity === 'dont_know_name';

  return (
    <AuroraBackground themeId={currentGift.themeId}>
      <div className="flex min-h-screen flex-col items-center p-6 pt-12 pb-24">
        {/* Header */}
        <div className="flex w-full max-w-4xl items-center justify-between mb-8">
          <Link href="/" className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <span>🌸</span> MemoryBloom
          </Link>
          <span className="rounded-full bg-sky-400/20 border border-sky-400/40 px-3.5 py-1 text-xs font-bold text-sky-300 flex items-center gap-1.5">
            <Wand2 className="h-3.5 w-3.5" /> Feelings, but interactive.
          </span>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Controls */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-3xl bg-slate-950/80 backdrop-blur-xl p-6 border border-white/20 shadow-xl space-y-6">
              {/* Question 1: How much do you know them? */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-sky-300 mb-2">
                  1. How much do you know about them?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {FAMILIARITIES.map((fam) => (
                    <button
                      key={fam.id}
                      type="button"
                      onClick={() => {
                        triggerHaptic('light');
                        setFamiliarity(fam.id);
                      }}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all min-h-[44px] ${
                        currentGift.familiarity === fam.id
                          ? 'bg-sky-500/30 border-sky-400 text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {fam.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Name Input (Hidden if dont_know_name) */}
              {!isAnonymous && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-sky-300 mb-1.5">
                    Their Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={currentGift.receiverName || ''}
                    onChange={(e) => setReceiverName(e.target.value)}
                    placeholder="e.g. Someone Special 👀"
                    className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm text-white border border-white/20 focus:border-sky-400 focus:outline-none min-h-[44px]"
                  />
                </div>
              )}

              {/* Question 2: What are you trying to say? */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-sky-300 mb-2">
                  2. What are you trying to say?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INTENTS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        triggerHaptic('light');
                        setIntent(item.id);
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all min-h-[44px] ${
                        currentGift.intent === item.id
                          ? 'bg-gradient-to-r from-sky-500/30 to-indigo-600/30 border-sky-400 text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messy Natural Language Prompt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-sky-300 mb-1.5">
                  3. Tell us the situation in your own words
                </label>
                <textarea
                  rows={3}
                  value={currentGift.aiPrompt || ''}
                  onChange={(e) => setRawInputText(e.target.value)}
                  placeholder="e.g. I see her at the library. She wears headphones. I want to confess."
                  className="w-full rounded-xl bg-slate-900 p-3 text-xs text-white border border-white/20 focus:border-sky-400 focus:outline-none"
                />
              </div>

              {/* AI Director Trigger */}
              <MagneticButton
                onClick={handleAiBuild}
                disabled={isAiGenerating}
                variant="gold"
                className="w-full mt-2"
              >
                {isAiGenerating ? (
                  <span className="flex items-center gap-2 text-slate-950 font-bold">
                    <Sparkles className="h-4 w-4 animate-spin text-slate-950" /> Gemini Flash Director Building Experience...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-slate-950 font-bold">
                    <Wand2 className="h-4 w-4" /> Create Interactive Experience ✨
                  </span>
                )}
              </MagneticButton>
            </div>

            {/* Next Action */}
            <div className="flex justify-end">
              <MagneticButton onClick={handleFinish} variant="primary" className="px-8 py-4 font-bold">
                <span>Proceed to Launch</span>
                <ArrowRight className="h-5 w-5" />
              </MagneticButton>
            </div>
          </div>

          {/* Sticky Phone Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-300 mb-2">
              Live Phone Sync
            </h3>
            <PhonePreview />
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
