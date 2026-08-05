'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGiftBuilderStore } from '@/features/builder/store';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PhonePreview } from '@/features/builder/PhonePreview';
import { EmotionCategory } from '@/types/gift';
import { Wand2, Sparkles, Upload, ArrowRight, Heart, Smile, Sparkle, Flame } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

const EMOTIONS: Array<{ id: EmotionCategory; label: string; icon: string; desc: string }> = [
  { id: 'loved', label: '❤️ Loved', icon: '❤️', desc: 'Warm, deep affection' },
  { id: 'happy', label: '😂 Happy', icon: '😂', desc: 'Joyful & humorous' },
  { id: 'emotional', label: '🥹 Emotional', icon: '🥹', desc: 'Tear-jerking gratitude' },
  { id: 'funny', label: '😎 Funny', icon: '😎', desc: 'Inside jokes & chaos' },
  { id: 'nostalgic', label: '😭 Nostalgic', icon: '😭', desc: 'Bittersweet memories' },
];

export default function ExpressModePage() {
  const router = useRouter();
  const {
    currentGift,
    setReceiverName,
    setEmotion,
    aiPromptInput,
    setAiPromptInput,
    generateWithAiDirector,
    isAiGenerating,
    currentStep,
    nextStep,
    prevStep,
  } = useGiftBuilderStore();

  const handleAiBuild = () => {
    triggerHaptic('heavy');
    generateWithAiDirector();
  };

  const handleFinish = () => {
    triggerHaptic('success');
    router.push('/wrap');
  };

  return (
    <AuroraBackground themeId={currentGift.themeId}>
      <div className="flex min-h-screen flex-col items-center p-6 pt-12 pb-24">
        {/* Header */}
        <div className="flex w-full max-w-4xl items-center justify-between mb-8">
          <Link href="/" className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <span>🌸</span> MemoryBloom
          </Link>
          <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-3 py-1 text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Wand2 className="h-3.5 w-3.5" /> Express Mode (2 mins)
          </span>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Wizard Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Step 1: AI Prompt & Receiver Details */}
            <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 border border-white/20 shadow-xl">
              <h2 className="font-serif text-2xl font-bold text-white mb-1 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-pink-400" />
                Step 1: Tell AI about them
              </h2>
              <p className="text-xs text-slate-300 mb-4">
                Example: &quot;She&apos;s my sister, loves dogs, purple, turning 21, traveled to Paris.&quot;
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Receiver&apos;s Name
                  </label>
                  <input
                    type="text"
                    value={currentGift.receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    placeholder="For Emily ❤️"
                    className="w-full rounded-xl bg-slate-900/80 px-4 py-3 text-sm text-white border border-white/20 focus:border-pink-400 focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Relationship & Key Details
                  </label>
                  <textarea
                    rows={3}
                    value={aiPromptInput}
                    onChange={(e) => setAiPromptInput(e.target.value)}
                    placeholder="Tell us their favorite things, inside jokes, memories..."
                    className="w-full rounded-xl bg-slate-900/80 p-3 text-sm text-white border border-white/20 focus:border-pink-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-2">
                    What do you want them to feel?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {EMOTIONS.map((emo) => (
                      <button
                        key={emo.id}
                        type="button"
                        onClick={() => {
                          triggerHaptic('light');
                          setEmotion(emo.id);
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all min-h-[44px] ${
                          currentGift.emotion === emo.id
                            ? 'bg-pink-500/20 border-pink-400 text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <div>{emo.label}</div>
                        <div className="text-[10px] text-slate-400">{emo.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <MagneticButton
                  onClick={handleAiBuild}
                  disabled={isAiGenerating}
                  variant="gold"
                  className="w-full mt-2"
                >
                  {isAiGenerating ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 animate-spin" /> AI Director Crafting Story...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Wand2 className="h-4 w-4" /> AI Auto-Generate Theme & Letter
                    </span>
                  )}
                </MagneticButton>
              </div>
            </div>

            {/* Finish Action */}
            <div className="flex justify-end">
              <MagneticButton onClick={handleFinish} variant="primary" className="px-8 py-4">
                <span>Proceed to Gift Wrapping</span>
                <ArrowRight className="h-5 w-5" />
              </MagneticButton>
            </div>
          </div>

          {/* Sticky Phone Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-pink-300 mb-2">
              Live Phone Sync
            </h3>
            <PhonePreview />
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
