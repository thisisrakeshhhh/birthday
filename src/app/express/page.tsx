'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGiftBuilderStore } from '@/features/builder/store';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PhonePreview } from '@/features/builder/PhonePreview';
import { RelationshipCategory, VibeCategory } from '@/types/gift';
import { Wand2, Sparkles, ArrowRight, Heart, Skull, Crown, Flame, Check } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

const RELATIONSHIPS: Array<{ id: RelationshipCategory; label: string; icon: string }> = [
  { id: 'my_person', label: '❤️ My Person', icon: '❤️' },
  { id: 'best_friend', label: '🫂 Best Friend', icon: '🫂' },
  { id: 'my_menace', label: '😂 My Menace', icon: '😂' },
  { id: 'bro_sis', label: '🗿 Bro / Sis', icon: '🗿' },
  { id: 'crush', label: '💕 Crush', icon: '💕' },
  { id: 'bestie', label: '👑 Bestie', icon: '👑' },
  { id: 'someone_special', label: '🥹 Someone Special', icon: '🥹' },
];

const VIBES: Array<{ id: VibeCategory; label: string; icon: string; desc: string }> = [
  { id: 'roast', label: '💀 Roast', icon: '💀', desc: 'Unhinged evidence & chaotic roast' },
  { id: 'emotional', label: '😭 Emotional', icon: '😭', desc: 'Tear-jerking gratitude' },
  { id: 'unhinged', label: '😂 Unhinged', icon: '😂', desc: 'Inside jokes & chaos' },
  { id: 'wholesome', label: '🫶 Wholesome', icon: '🫶', desc: 'Sweet, warm affection' },
  { id: 'romantic', label: '❤️ Romantic', icon: '❤️', desc: 'Intimate candlelight vibes' },
  { id: 'bro_code', label: '🗿 Bro Code', icon: '🗿', desc: 'No-cringe bro energy' },
  { id: 'main_character', label: '✨ Main Character', icon: '✨', desc: 'Spotlight aura' },
  { id: 'delulu', label: '🥀 Delulu', icon: '🥀', desc: 'Dreamy butterfly magic' },
];

export default function ExpressModePage() {
  const router = useRouter();
  const {
    currentGift,
    setReceiverName,
    setRelationship,
    setVibe,
    setPersonality,
    setFunnyMemory,
    setLoveDetail,
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

  return (
    <AuroraBackground themeId={currentGift.themeId}>
      <div className="flex min-h-screen flex-col items-center p-6 pt-12 pb-24">
        {/* Header */}
        <div className="flex w-full max-w-4xl items-center justify-between mb-8">
          <Link href="/" className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <span>🌸</span> MemoryBloom
          </Link>
          <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-3.5 py-1 text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Wand2 className="h-3.5 w-3.5" /> Express Mode (2 mins)
          </span>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Controls Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 border border-white/20 shadow-xl space-y-6">
              {/* Question 1: Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-300 mb-1.5">
                  Who is this birthday surprise for?
                </label>
                <input
                  type="text"
                  value={currentGift.receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="For Emily ❤️"
                  className="w-full rounded-xl bg-slate-900/80 px-4 py-3 text-sm text-white border border-white/20 focus:border-pink-400 focus:outline-none min-h-[44px]"
                />
              </div>

              {/* Question 2: Relationship */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-300 mb-2">
                  What are they to you?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {RELATIONSHIPS.map((rel) => (
                    <button
                      key={rel.id}
                      type="button"
                      onClick={() => {
                        triggerHaptic('light');
                        setRelationship(rel.id);
                      }}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all min-h-[44px] ${
                        currentGift.relationship === rel.id
                          ? 'bg-pink-500/30 border-pink-400 text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {rel.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Vibe */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-300 mb-2">
                  What&apos;s the vibe?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {VIBES.map((vb) => (
                    <button
                      key={vb.id}
                      type="button"
                      onClick={() => {
                        triggerHaptic('light');
                        setVibe(vb.id);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-0.5 min-h-[44px] ${
                        currentGift.vibe === vb.id
                          ? 'bg-amber-400/20 border-amber-400 text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xs font-bold text-white">{vb.label}</span>
                      <span className="text-[10px] text-slate-400">{vb.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Prompt Details */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    One funny memory or inside joke
                  </label>
                  <input
                    type="text"
                    value={currentGift.funnyMemory || ''}
                    onChange={(e) => setFunnyMemory(e.target.value)}
                    placeholder="e.g. got lost looking for tacos at 2 AM"
                    className="w-full rounded-xl bg-slate-900/80 px-4 py-2.5 text-xs text-white border border-white/20 min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    One thing you love about them
                  </label>
                  <input
                    type="text"
                    value={currentGift.loveDetail || ''}
                    onChange={(e) => setLoveDetail(e.target.value)}
                    placeholder="e.g. how you always listen when I need a friend"
                    className="w-full rounded-xl bg-slate-900/80 px-4 py-2.5 text-xs text-white border border-white/20 min-h-[44px]"
                  />
                </div>
              </div>

              {/* AI Build Trigger */}
              <MagneticButton
                onClick={handleAiBuild}
                disabled={isAiGenerating}
                variant="gold"
                className="w-full mt-4"
              >
                {isAiGenerating ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 animate-spin text-slate-950" /> Gemini Flash Crafting Magic...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-slate-950 font-bold">
                    <Wand2 className="h-4 w-4" /> Make My Surprise ✨
                  </span>
                )}
              </MagneticButton>
            </div>

            {/* Next Action */}
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
