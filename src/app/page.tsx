'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PhonePreview } from '@/features/builder/PhonePreview';
import { ScrapbookPolaroid } from '@/features/receiver/ScrapbookPolaroid';
import { MemoryItem, OccasionType } from '@/types/gift';
import {
  Sparkles,
  Wand2,
  Gift,
  Heart,
  Star,
  Play,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Calendar,
  Layers,
} from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

const LANDING_MEMORIES: MemoryItem[] = [
  {
    id: 'l1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop',
    caption: 'Our first Paris trip ☕✨',
    date: '2023-06-14',
    location: { name: 'Paris', year: '2023' },
    rotation: -4,
    tapeColor: '#F472B6',
  },
  {
    id: 'l2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop',
    caption: 'Sunset laughs at the beach 🌅💛',
    date: '2023-08-20',
    location: { name: 'Goa', year: '2023' },
    rotation: 6,
    tapeColor: '#F59E0B',
  },
  {
    id: 'l3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop',
    caption: 'Starry night celebration 🌌🎂',
    date: '2024-01-01',
    location: { name: 'Home', year: '2024' },
    rotation: -2,
    tapeColor: '#38BDF8',
  },
];

const OCCASIONS: Array<{ id: OccasionType; label: string; icon: string }> = [
  { id: 'birthday', label: 'Birthday', icon: '🎂' },
  { id: 'anniversary', label: 'Anniversary', icon: '💍' },
  { id: 'proposal', label: 'Proposal', icon: '💖' },
  { id: 'wedding', label: 'Wedding', icon: '💒' },
  { id: 'friendship', label: 'Friendship', icon: '🤝' },
  { id: 'graduation', label: 'Graduation', icon: '🎓' },
  { id: 'mothers_day', label: "Mother's Day", icon: '👩‍👧' },
  { id: 'valentines', label: 'Valentine', icon: '💌' },
];

export default function LandingPage() {
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('birthday');

  return (
    <AuroraBackground themeId="cute">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 backdrop-blur-md bg-slate-950/40 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-white tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-md">
            🌸
          </span>
          <span>MemoryBloom</span>
        </Link>

        <div className="hidden sm:flex items-center gap-4 text-sm font-medium">
          <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#features" className="text-slate-300 hover:text-white transition-colors">
            Surprises
          </a>
          <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
            Pricing
          </a>
          <Link href="/create">
            <MagneticButton variant="primary" className="py-2 px-5 text-sm">
              Create My Gift
            </MagneticButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center select-none">
        {/* Floating Balloons & Stars Deco */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 left-8 text-4xl opacity-80 pointer-events-none hidden sm:block"
        >
          🎈
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-36 right-12 text-4xl opacity-80 pointer-events-none hidden sm:block"
        >
          ✨
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold text-pink-300 backdrop-blur-md mb-6"
        >
          <Sparkles className="h-4 w-4 text-pink-400 animate-spin" />
          <span>Awwwards-Grade Gen-Z Digital Gifting</span>
        </motion.div>

        {/* Huge Emotional Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-5xl leading-[1.1] mb-6"
        >
          Some people deserve{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300">
            more than a gift.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-300 max-w-2xl font-sans font-light mb-10"
        >
          They deserve a memory they&apos;ll never forget. Turn photos, letters, and music into a cinematic unboxing experience.
        </motion.p>

        {/* Primary Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/express">
            <MagneticButton variant="gold" className="px-8 py-4 text-lg">
              <Wand2 className="h-5 w-5" />
              Express AI Generator (2 mins)
            </MagneticButton>
          </Link>
          <Link href="/create">
            <MagneticButton variant="glass" className="px-8 py-4 text-lg">
              <Gift className="h-5 w-5 text-pink-400" />
              Creator Mode
            </MagneticButton>
          </Link>
        </motion.div>

        {/* Floating Stickers & Micro Badges */}
        <div className="mt-16 flex items-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Constellation Name Reveal
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-pink-400" /> Sealed Wax Envelope
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-amber-400" /> 3D Wrapping Ceremony
          </span>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
            Step 1 of 5
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
            Choose the Occasion
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Tailors animations, background music, and emotional letter presets.
          </p>
        </div>

        {/* Occasions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {OCCASIONS.map((occ) => (
            <button
              key={occ.id}
              onClick={() => {
                triggerHaptic('light');
                setSelectedOccasion(occ.id);
              }}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all text-center min-h-[44px] min-w-[44px] cursor-pointer ${
                selectedOccasion === occ.id
                  ? 'bg-gradient-to-b from-pink-500/20 to-purple-600/20 border-pink-400 shadow-xl shadow-pink-500/20 scale-105'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
              }`}
            >
              <span className="text-4xl">{occ.icon}</span>
              <span className="font-medium text-sm text-white">{occ.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Live Phone Preview & Scrapbook Section */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Scrapbook Engine & Live Phone Sync
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2 leading-tight">
            Watch your gift come alive instantly.
          </h2>
          <p className="text-slate-300 mt-4 leading-relaxed">
            Every photo becomes a tilted polaroid with taped edges, location tags, and handwritten notes. The sticky live phone mockup syncs every stroke in real time.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <Sparkles className="h-6 w-6 text-pink-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white text-sm">Constellation Intro</h4>
                <p className="text-xs text-slate-400">
                  Starts with pitch-black sky connecting star lines to write the receiver&apos;s name.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <Heart className="h-6 w-6 text-rose-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white text-sm">Interactive Sealed Envelope</h4>
                <p className="text-xs text-slate-400">
                  Receiver breaks the 3D wax seal and pulls the silk ribbon to reveal handwritten text.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Mockup */}
        <div className="flex justify-center">
          <PhonePreview />
        </div>
      </section>

      {/* Memory Collage Showcase */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
          Visual Storytelling
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2 mb-12">
          Layered Memories & Floating Polaroids
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
          {LANDING_MEMORIES.map((mem, idx) => (
            <ScrapbookPolaroid key={mem.id} memory={mem} index={idx} />
          ))}
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto w-full text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
          Transparent Pricing
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2 mb-12">
          Choose Your Gift Experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Starter */}
          <div className="rounded-3xl bg-white/5 p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Starter</h3>
              <p className="text-xs text-slate-400 mt-1">Perfect for simple birthday cards.</p>
              <div className="my-6">
                <span className="text-4xl font-serif font-bold text-white">$9.99</span>
                <span className="text-xs text-slate-400"> / gift</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400" /> 1 Digital Gift Experience
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400" /> 10 Uploaded Polaroids
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400" /> Standard Sealed Envelope
                </li>
              </ul>
            </div>
            <Link href="/create" className="mt-8">
              <MagneticButton variant="secondary" className="w-full text-sm">
                Get Started
              </MagneticButton>
            </Link>
          </div>

          {/* Premium (Popular) */}
          <div className="rounded-3xl bg-gradient-to-b from-pink-500/20 via-purple-600/20 to-slate-950 p-8 border-2 border-pink-400 flex flex-col justify-between relative shadow-2xl shadow-pink-500/20">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Most Popular
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">Premium Magic</h3>
              <p className="text-xs text-slate-300 mt-1">Constellations, 3D wrapping & AI Director.</p>
              <div className="my-6">
                <span className="text-4xl font-serif font-bold text-white">$19.99</span>
                <span className="text-xs text-slate-300"> / gift</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400" /> All 10 Dynamic Aesthetic Themes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400" /> Constellation Name Reveal
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400" /> 3D Gift Wrapping Ceremony
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400" /> Memory Travel Map
                </li>
              </ul>
            </div>
            <Link href="/express" className="mt-8">
              <MagneticButton variant="primary" className="w-full text-sm">
                Create Premium Gift
              </MagneticButton>
            </Link>
          </div>

          {/* MemoryBloom+ Subscription */}
          <div className="rounded-3xl bg-white/5 p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-amber-300">MemoryBloom+</h3>
              <p className="text-xs text-slate-400 mt-1">Unlimited gifts & recurring access.</p>
              <div className="my-6">
                <span className="text-4xl font-serif font-bold text-white">$14.99</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400" /> Unlimited Gifts & AI Stories
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400" /> Time Capsule Locking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400" /> Printable Keepsake PDF & QR Code
                </li>
              </ul>
            </div>
            <Link href="/create" className="mt-8">
              <MagneticButton variant="gold" className="w-full text-sm">
                Subscribe to Plus
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-xs text-slate-500">
        <p>Made with ❤️ by MemoryBloom. Turn memories into magic.</p>
      </footer>
    </AuroraBackground>
  );
}
