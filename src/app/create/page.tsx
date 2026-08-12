'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGiftBuilderStore } from '@/features/builder/store';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PhonePreview } from '@/features/builder/PhonePreview';
import { THEME_REGISTRY } from '@/features/themes/tokens';
import { ThemeId, OccasionType } from '@/types/gift';
import {
  Gift,
  Upload,
  Trash2,
  Plus,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  PenTool,
  Palette,
  Check,
} from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

const THEMES: ThemeId[] = [
  'secret',
  'crush',
  'chaotic',
  'romantic',
  'nostalgia',
  'delulu',
  'main_character',
  'bro_code',
  'midnight',
  'pink_crush',
];

export default function CreatorPage() {
  const router = useRouter();
  const {
    currentGift,
    currentStep,
    nextStep,
    prevStep,
    setReceiverName,
    setSenderName,
    setOccasion,
    setTheme,
    addMemory,
    removeMemory,
    updateNote,
  } = useGiftBuilderStore();

  const [newCaption, setNewCaption] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    triggerHaptic('medium');
    addMemory({
      type: 'image',
      url: newUrl,
      caption: newCaption || 'Unforgettable moment',
      date: new Date().toISOString().split('T')[0],
      location: { name: 'Special Place' },
    });
    setNewUrl('');
    setNewCaption('');
  };

  return (
    <AuroraBackground themeId={currentGift.themeId}>
      <div className="flex min-h-screen flex-col items-center p-6 pt-12 pb-24">
        {/* Navigation Bar */}
        <div className="flex w-full max-w-5xl items-center justify-between mb-6">
          <Link href="/" className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <span>🌸</span> MemoryBloom
          </Link>
          <span className="rounded-full bg-pink-500/20 border border-pink-400/40 px-3 py-1 text-xs font-bold text-pink-300">
            Creator Mode (Step {currentStep} of 4)
          </span>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Controls Panel */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 border border-white/20 shadow-xl">
              {/* Step 1: Occasion & Names */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-white">
                    Step 1: Receiver & Occasion
                  </h2>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Who is this gift for?
                    </label>
                    <input
                      type="text"
                      value={currentGift.receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      className="w-full rounded-xl bg-slate-900/80 px-4 py-3 text-sm text-white border border-white/20 focus:border-pink-400 focus:outline-none min-h-[44px]"
                      placeholder="For Emily ❤️"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={currentGift.senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full rounded-xl bg-slate-900/80 px-4 py-3 text-sm text-white border border-white/20 focus:border-pink-400 focus:outline-none min-h-[44px]"
                      placeholder="Alex"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Upload Memories */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-white">
                    Step 2: Add Memories
                  </h2>
                  <p className="text-xs text-slate-300">
                    Paste image URLs to create floating polaroid cards.
                  </p>

                  <form onSubmit={handleAddPhoto} className="flex flex-col gap-2">
                    <input
                      type="url"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      placeholder="Image URL (Unsplash, Imgur...)"
                      className="w-full rounded-xl bg-slate-900/80 px-4 py-2.5 text-xs text-white border border-white/20 min-h-[44px]"
                    />
                    <input
                      type="text"
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      placeholder="Handwritten Caption..."
                      className="w-full rounded-xl bg-slate-900/80 px-4 py-2.5 text-xs text-white border border-white/20 min-h-[44px]"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-pink-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-pink-600 min-h-[44px]"
                    >
                      <Plus className="h-4 w-4" /> Add Polaroid
                    </button>
                  </form>

                  {/* List of uploaded polaroids */}
                  <div className="mt-4 flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
                    {currentGift.memories.map((mem) => (
                      <div
                        key={mem.id}
                        className="flex items-center justify-between rounded-xl bg-slate-900/60 p-2.5 border border-white/10 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <img src={mem.url} alt="" className="h-8 w-8 rounded-md object-cover" />
                          <span className="font-medium text-white truncate max-w-[180px]">
                            {mem.caption}
                          </span>
                        </div>
                        <button
                          onClick={() => removeMemory(mem.id)}
                          className="text-red-400 hover:text-red-300 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Handwritten Note */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-amber-400" /> Step 3: Handwritten Letter
                  </h2>

                  <textarea
                    rows={6}
                    value={currentGift.notes[0]?.message || ''}
                    onChange={(e) => updateNote(e.target.value)}
                    className="w-full rounded-xl bg-amber-50 p-4 font-serif text-base text-amber-950 border border-amber-200 focus:outline-none italic"
                    placeholder="Write your secret letter here..."
                  />
                </div>
              )}

              {/* Step 4: Theme Selector */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                    <Palette className="h-5 w-5 text-purple-400" /> Step 4: 10 Aesthetic Themes
                  </h2>

                  <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                    {THEMES.map((thId) => {
                      const token = THEME_REGISTRY[thId];
                      const isSelected = currentGift.themeId === thId;
                      return (
                        <button
                          key={thId}
                          onClick={() => {
                            triggerHaptic('light');
                            setTheme(thId);
                          }}
                          className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all min-h-[44px] ${
                            isSelected
                              ? 'border-pink-400 bg-white/20 shadow-lg scale-102'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-white">
                            <span>{token.name}</span>
                            {isSelected && <Check className="h-4 w-4 text-pink-400" />}
                          </div>
                          <span className="text-[10px] text-slate-300 line-clamp-1">
                            {token.tagline}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                {currentStep > 1 ? (
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-1 text-xs text-slate-300 hover:text-white min-h-[44px] px-3"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                ) : <div />}

                {currentStep < 4 ? (
                  <MagneticButton onClick={nextStep} variant="primary" className="py-2.5 px-6 text-sm">
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </MagneticButton>
                ) : (
                  <MagneticButton
                    onClick={() => {
                      triggerHaptic('success');
                      router.push('/wrap');
                    }}
                    variant="gold"
                    className="py-2.5 px-6 text-sm"
                  >
                    <span>Wrap Gift</span>
                    <Sparkles className="h-4 w-4" />
                  </MagneticButton>
                )}
              </div>
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
