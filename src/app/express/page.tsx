'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGiftBuilderStore } from '@/features/builder/store';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PhonePreview } from '@/features/builder/PhonePreview';
import { AVATAR_PAIRS } from '@/features/themes/avatars';
import { RelationshipCategory, VibeCategory } from '@/types/gift';
import {
  Wand2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Camera,
  Check,
  Plus,
  Trash2,
  Upload,
  Heart,
  UserCheck,
  MessageSquare,
  Palette,
} from 'lucide-react';
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

export default function ExpressWizardPage() {
  const router = useRouter();
  const {
    currentGift,
    setReceiverName,
    setSenderName,
    setRelationship,
    setVibe,
    setMediaMode,
    setAvatarPairId,
    setPersonality,
    setFunnyMemory,
    setLoveDetail,
    addMemory,
    removeMemory,
    generateWithAiDirector,
    isAiGenerating,
  } = useGiftBuilderStore();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');

  const handleNextStep = () => {
    triggerHaptic('medium');
    setActiveStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    triggerHaptic('light');
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl) return;
    triggerHaptic('medium');
    addMemory({
      type: 'image',
      url: newPhotoUrl,
      caption: newPhotoCaption || 'Unforgettable moment',
      date: new Date().toISOString().split('T')[0],
      location: { name: 'Special Place' },
    });
    setNewPhotoUrl('');
    setNewPhotoCaption('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      triggerHaptic('medium');
      const blobUrl = URL.createObjectURL(file);
      addMemory({
        type: 'image',
        url: blobUrl,
        caption: file.name.replace(/\.[^/.]+$/, ''),
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

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
      <div className="flex min-h-screen flex-col items-center p-4 sm:p-6 pt-8 pb-24 max-w-6xl mx-auto w-full">
        {/* Header Bar */}
        <div className="flex w-full items-center justify-between mb-6">
          <Link href="/" className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <span>🌸</span> MemoryBloom
          </Link>

          <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-3.5 py-1 text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Wand2 className="h-3.5 w-3.5" /> Step {activeStep} of 5
          </span>
        </div>

        {/* Wizard Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-8">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 transition-all duration-500"
            style={{ width: `${(activeStep / 5) * 100}%` }}
          />
        </div>

        <div className="grid w-full grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Step Panel */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6">
              
              {/* STEP 1: WHO'S THIS FOR? */}
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-pink-400">
                      STEP 1 / 5
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                      Who is this for? ❤️
                    </h2>
                    <p className="text-xs text-slate-300">
                      Tell us who you&apos;re making this surprise for.
                    </p>
                  </div>

                  {/* Receiver & Sender Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Their Name (Recipient)
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
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Your Name (Sender)
                      </label>
                      <input
                        type="text"
                        value={currentGift.senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Alex"
                        className="w-full rounded-xl bg-slate-900/80 px-4 py-3 text-sm text-white border border-white/20 focus:border-pink-400 focus:outline-none min-h-[44px]"
                      />
                    </div>
                  </div>

                  {/* Relationship Categories */}
                  <div>
                    <label className="block text-xs font-bold text-pink-300 uppercase tracking-wider mb-2">
                      What are they to you?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {RELATIONSHIPS.map((rel) => (
                        <button
                          key={rel.id}
                          type="button"
                          onClick={() => {
                            triggerHaptic('light');
                            setRelationship(rel.id);
                          }}
                          className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all min-h-[44px] ${
                            currentGift.relationship === rel.id
                              ? 'bg-pink-500/30 border-pink-400 text-white shadow-md scale-102'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          {rel.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PICK THE CHAOS / VIBE */}
              {activeStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-pink-400">
                      STEP 2 / 5
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                      Pick the vibe 💀
                    </h2>
                    <p className="text-xs text-slate-300">
                      Choose the mood & atmosphere for their surprise universe.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {VIBES.map((vb) => (
                      <button
                        key={vb.id}
                        type="button"
                        onClick={() => {
                          triggerHaptic('light');
                          setVibe(vb.id);
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col gap-1 min-h-[44px] ${
                          currentGift.vibe === vb.id
                            ? 'bg-amber-400/20 border-amber-400 text-white shadow-lg scale-102'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xs font-bold text-white flex items-center justify-between">
                          {vb.label}
                          {currentGift.vibe === vb.id && <Check className="h-4 w-4 text-amber-300" />}
                        </span>
                        <span className="text-[10px] text-slate-400 leading-snug">{vb.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: GIVE US THE LORE 👀 */}
              {activeStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-pink-400">
                      STEP 3 / 5
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                      Give us the lore 👀
                    </h2>
                    <p className="text-xs text-slate-300">
                      Tell us one thing only you two understand. Gemini AI will turn this into content!
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">
                      Inside Joke or Funny Memory (e.g. &quot;He fell into the pool at college fest&quot;)
                    </label>
                    <input
                      type="text"
                      value={currentGift.funnyMemory || ''}
                      onChange={(e) => setFunnyMemory(e.target.value)}
                      placeholder="e.g. Got lost at 2 AM looking for tacos in Goa..."
                      className="w-full rounded-xl bg-slate-900/80 px-4 py-3 text-sm text-white border border-white/20 focus:border-pink-400 focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">
                      Personality or What You Love About Them
                    </label>
                    <input
                      type="text"
                      value={currentGift.loveDetail || ''}
                      onChange={(e) => setLoveDetail(e.target.value)}
                      placeholder="e.g. How she always listens and brings coffee..."
                      className="w-full rounded-xl bg-slate-900/80 px-4 py-3 text-sm text-white border border-white/20 focus:border-pink-400 focus:outline-none min-h-[44px]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: CHOOSE YOUR MEMORIES */}
              {activeStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-pink-400">
                      STEP 4 / 5
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                      Choose memories 📸
                    </h2>
                    <p className="text-xs text-slate-300">
                      Start 100% private with cute avatars or upload real photos!
                    </p>
                  </div>

                  {/* Privacy Badge */}
                  <div className="rounded-2xl bg-emerald-500/20 border border-emerald-400/40 p-3.5 flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-emerald-300 shrink-0" />
                    <div className="text-xs text-slate-200">
                      <span className="font-extrabold text-emerald-200">100% Private Default:</span> Choose cute avatars or upload real photos. No account required.
                    </div>
                  </div>

                  {/* Mode Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic('light');
                        setMediaMode('avatars');
                      }}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all min-h-[44px] ${
                        currentGift.mediaMode === 'avatars'
                          ? 'bg-emerald-500/30 border-emerald-400 text-white shadow-lg'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-extrabold">
                        <span>🎨 Start with Avatars (Default)</span>
                        {currentGift.mediaMode === 'avatars' && <Check className="h-4 w-4 text-emerald-300" />}
                      </div>
                      <span className="text-[10px] text-slate-300">Zero photo upload required. 100% private!</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic('light');
                        setMediaMode('photos');
                      }}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all min-h-[44px] ${
                        currentGift.mediaMode === 'photos'
                          ? 'bg-pink-500/30 border-pink-400 text-white shadow-lg'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-extrabold">
                        <span>📸 Add Real Photos</span>
                        {currentGift.mediaMode === 'photos' && <Check className="h-4 w-4 text-pink-300" />}
                      </div>
                      <span className="text-[10px] text-slate-300">Upload your own memory photos</span>
                    </button>
                  </div>

                  {/* Avatars Mode Picker */}
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
                            className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all min-h-[44px] ${
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

                  {/* Photos Upload Form */}
                  {currentGift.mediaMode === 'photos' && (
                    <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
                          <Camera className="h-4 w-4 text-pink-400" /> Upload Memory Photos ({currentGift.memories.length})
                        </label>
                        <label className="cursor-pointer text-[11px] font-bold text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-400/40 hover:bg-pink-500/30">
                          <Upload className="h-3 w-3 inline mr-1" /> Choose File
                          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>
                      </div>

                      <form onSubmit={handleAddPhoto} className="flex flex-col gap-2">
                        <input
                          type="url"
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          placeholder="Or paste Photo URL (Unsplash, Imgur...)"
                          className="w-full rounded-xl bg-slate-900/80 px-3.5 py-2 text-xs text-white border border-white/20 focus:border-pink-400 focus:outline-none min-h-[44px]"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newPhotoCaption}
                            onChange={(e) => setNewPhotoCaption(e.target.value)}
                            placeholder="Memory caption (e.g. Paris coffee date ✨)"
                            className="flex-1 rounded-xl bg-slate-900/80 px-3.5 py-2 text-xs text-white border border-white/20 focus:border-pink-400 focus:outline-none min-h-[44px]"
                          />
                          <button
                            type="submit"
                            className="rounded-xl bg-pink-500 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-pink-600 shrink-0 flex items-center gap-1 min-h-[44px]"
                          >
                            <Plus className="h-4 w-4" /> Add
                          </button>
                        </div>
                      </form>

                      {/* Photo List */}
                      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                        {currentGift.memories.map((mem) => (
                          <div
                            key={mem.id}
                            className="flex items-center justify-between p-2 rounded-xl bg-slate-900/70 border border-white/10 text-xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <img src={mem.url} alt="" className="h-8 w-8 rounded-lg object-cover shrink-0" />
                              <span className="truncate font-medium text-slate-200">{mem.caption}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeMemory(mem.id)}
                              className="text-red-400 hover:text-red-300 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 5: MAKE THE MAGIC ✨ */}
              {activeStep === 5 && (
                <div className="space-y-6 text-center py-4">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300">
                    FINAL STEP
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-white">
                    Make the magic ✨
                  </h2>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Gemini Flash will construct their letter, birthday roast, constellation reveal, and soundtrack!
                  </p>

                  <MagneticButton
                    onClick={handleAiBuild}
                    disabled={isAiGenerating}
                    variant="gold"
                    className="w-full py-4 text-base font-bold text-slate-950"
                  >
                    {isAiGenerating ? (
                      <span className="flex items-center justify-center gap-2">
                        <Sparkles className="h-5 w-5 animate-spin" /> Gemini Flash Building Universe...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Wand2 className="h-5 w-5" /> Generate Magic Experience ✨
                      </span>
                    )}
                  </MagneticButton>
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                {activeStep > 1 ? (
                  <button
                    onClick={handlePrevStep}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white min-h-[44px]"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {activeStep < 5 ? (
                  <button
                    onClick={handleNextStep}
                    className="flex items-center gap-1.5 rounded-full bg-pink-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-pink-600 transition-colors min-h-[44px]"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <MagneticButton onClick={handleFinish} variant="gold" className="px-6 py-2 text-xs font-bold text-slate-950">
                    <span>Proceed to Wrap Gift 🎁</span>
                  </MagneticButton>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Live Phone Mockup */}
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
