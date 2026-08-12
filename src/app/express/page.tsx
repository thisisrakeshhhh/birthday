'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGiftBuilderStore } from '@/features/builder/store';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PhonePreview } from '@/features/builder/PhonePreview';
import { AVATAR_PAIRS } from '@/features/themes/avatars';
import { RelationshipCategory, VibeCategory, MediaMode } from '@/types/gift';
import { Wand2, Sparkles, ArrowRight, ShieldCheck, Camera, Sparkle, Check, Lock } from 'lucide-react';
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
    setMediaMode,
    setAvatarPairId,
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
              
              {/* Privacy Choice Banner */}
              <div className="rounded-2xl bg-emerald-500/20 border border-emerald-400/40 p-3.5 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-300 shrink-0" />
                <div className="text-xs text-slate-200">
                  <span className="font-extrabold text-emerald-200">100% Private Option:</span> Choose cute avatars or upload real photos. No account required.
                </div>
              </div>

              {/* Media Mode Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-300 mb-2">
                  Choose Memory Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('light');
                      setMediaMode('avatars');
                    }}
                    className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all min-h-[44px] ${
                      currentGift.mediaMode === 'avatars'
                        ? 'bg-emerald-500/30 border-emerald-400 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-extrabold">
                      <span>🎨 Cute Avatars</span>
                      {currentGift.mediaMode === 'avatars' && <Check className="h-4 w-4 text-emerald-300" />}
                    </div>
                    <span className="text-[10px] text-slate-300">100% private, zero photo upload needed!</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('light');
                      setMediaMode('photos');
                    }}
                    className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all min-h-[44px] ${
                      currentGift.mediaMode === 'photos'
                        ? 'bg-pink-500/30 border-pink-400 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-extrabold">
                      <span>📸 Real Photos</span>
                      {currentGift.mediaMode === 'photos' && <Check className="h-4 w-4 text-pink-300" />}
                    </div>
                    <span className="text-[10px] text-slate-300">Upload your own memory photos</span>
                  </button>
                </div>
              </div>

              {/* Avatar Pair Selection if Avatars Mode */}
              {currentGift.mediaMode === 'avatars' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-pink-300 mb-2">
                    Pick Your Cute Avatar Duo
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AVATAR_PAIRS.map((pair) => (
                      <button
                        key={pair.id}
                        type="button"
                        onClick={() => {
                          triggerHaptic('light');
                          setAvatarPairId(pair.id);
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all min-h-[44px] ${
                          currentGift.avatarPairId === pair.id
                            ? 'bg-pink-500/30 border-pink-400 text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {pair.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Receiver Name */}
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

              {/* Relationship */}
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

              {/* Vibe */}
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

              {/* AI Build Button */}
              <MagneticButton
                onClick={handleAiBuild}
                disabled={isAiGenerating}
                variant="gold"
                className="w-full mt-4"
              >
                {isAiGenerating ? (
                  <span className="flex items-center gap-2 text-slate-950 font-bold">
                    <Sparkles className="h-4 w-4 animate-spin" /> Gemini Flash Crafting Magic...
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
