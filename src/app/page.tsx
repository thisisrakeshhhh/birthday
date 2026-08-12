'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PhonePreview } from '@/features/builder/PhonePreview';
import { ScrapbookPolaroid } from '@/features/receiver/ScrapbookPolaroid';
import { MemoryItem, VibeCategory } from '@/types/gift';
import {
  Sparkles,
  Wand2,
  Gift,
  Heart,
  Play,
  CheckCircle2,
  Skull,
  Crown,
} from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

const LANDING_MEMORIES: MemoryItem[] = [
  {
    id: 'l1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop',
    caption: 'Our first Paris trip ☕✨',
    insideJokeAi: 'Attempting to look aesthetic before spilling coffee 💀',
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
    insideJokeAi: '0 survival instincts detected in this photo 🌊😂',
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
    insideJokeAi: 'Main character energy loading... 👑✨',
    date: '2024-01-01',
    location: { name: 'Home', year: '2024' },
    rotation: -2,
    tapeColor: '#38BDF8',
  },
];

export default function LandingPage() {
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory>('roast');

  return (
    <AuroraBackground themeId="midnight">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 backdrop-blur-md bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-white tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-md">
            🌸
          </span>
          <span className="text-white drop-shadow-sm">MemoryBloom</span>
        </Link>

        <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <a href="#how-it-works" className="text-slate-200 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#roast" className="text-slate-200 hover:text-white transition-colors">
            Birthday Roast 💀
          </a>
          <a href="#pricing" className="text-slate-200 hover:text-white transition-colors">
            Pricing
          </a>
          <Link href="/express">
            <MagneticButton variant="gold" className="py-2 px-5 text-sm text-slate-950 font-bold">
              Make one for free ✨
            </MagneticButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center select-none">
        {/* Gen-Z Slogan Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-pink-500/60 bg-pink-500/20 px-4.5 py-2 text-xs font-extrabold text-pink-200 backdrop-blur-md mb-6 shadow-lg shadow-pink-500/20"
        >
          <Sparkles className="h-4 w-4 text-pink-400 animate-spin" />
          <span>Your boring birthday text era is over.</span>
        </motion.div>

        {/* Primary Conversational Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-5xl leading-[1.1] mb-6 drop-shadow-2xl"
        >
          Your &apos;happy birthday ❤️&apos; text{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300 drop-shadow-lg">
            could never.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-200 max-w-2xl font-sans font-medium mb-10 leading-relaxed drop-shadow-md"
        >
          Make them a tiny internet universe instead. Turn photos, memories, music and inside jokes into a surprise they&apos;ll actually remember.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/express">
            <MagneticButton variant="gold" className="px-8 py-4 text-lg font-bold text-slate-950">
              <Wand2 className="h-5 w-5 text-slate-950" />
              Make one for free ✨
            </MagneticButton>
          </Link>
          <Link href="/g/gift_demo">
            <MagneticButton variant="glass" className="px-8 py-4 text-lg">
              <Play className="h-5 w-5 text-pink-400 fill-pink-400" />
              Show me something insane 👀
            </MagneticButton>
          </Link>
        </motion.div>

        {/* Viral Slogan Pills */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-medium">
          <span className="rounded-full bg-white/10 px-3.5 py-1.5 border border-white/15">
            ⚡ No app required
          </span>
          <span className="rounded-full bg-white/10 px-3.5 py-1.5 border border-white/15">
            💬 WhatsApp 1-tap share
          </span>
          <span className="rounded-full bg-white/10 px-3.5 py-1.5 border border-white/15">
            🥹 &quot;WAIT... YOU MADE THIS FOR ME?&quot;
          </span>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
            4 Simple Steps
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
            How It Works
          </h2>
          <p className="text-slate-300 text-sm mt-2 font-medium">
            Create a tiny internet universe in under 90 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="rounded-3xl bg-white/5 p-6 border border-white/10 flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 font-bold text-xl mb-4 border border-pink-400/30">
              1
            </span>
            <h3 className="font-serif text-lg font-bold text-white mb-1">Pick Their Vibe</h3>
            <p className="text-xs text-slate-300">
              Roast, Emotional, Unhinged, Romantic, Bro Code, or Delulu.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 p-6 border border-white/10 flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300 font-bold text-xl mb-4 border border-amber-400/30">
              2
            </span>
            <h3 className="font-serif text-lg font-bold text-white mb-1">Add Memories</h3>
            <p className="text-xs text-slate-300">
              Upload 3–5 photos, inside jokes, and personal voice notes.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 p-6 border border-white/10 flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300 font-bold text-xl mb-4 border border-purple-400/30">
              3
            </span>
            <h3 className="font-serif text-lg font-bold text-white mb-1">We Make the Magic</h3>
            <p className="text-xs text-slate-300">
              Gemini Flash builds the letter, constellation reveal & 3D box.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 p-6 border border-white/10 flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 font-bold text-xl mb-4 border border-emerald-400/30">
              4
            </span>
            <h3 className="font-serif text-lg font-bold text-white mb-1">Send the Link</h3>
            <p className="text-xs text-slate-300">
              Share on WhatsApp with 1 tap. Watch them react live.
            </p>
          </div>
        </div>
      </section>

      {/* Birthday Roast Feature Showcase */}
      <section id="roast" className="py-24 px-6 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4">
            <Skull className="h-4 w-4" /> VIRAL FEATURE
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            Roast Your Birthday Person 💀
          </h2>
          <p className="text-slate-300 mt-4 leading-relaxed font-medium">
            Upload 3-5 photos. Gemini AI generates a hilarious, unhinged birthday roast. Starts with: <span className="font-bold text-amber-200">&quot;Okay... we&apos;ve reviewed the evidence. 💀&quot;</span> and ends with <span className="font-bold text-pink-300">&quot;Okay okay... we love you ❤️&quot;</span>
          </p>
        </div>

        <div className="flex justify-center">
          <PhonePreview />
        </div>
      </section>

      {/* Pricing Section (Free vs ₹9 Launch Offer) */}
      <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto w-full text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
          Unbeatable Acquisition Pricing
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2 mb-4">
          Choose Your Birthday Experience
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto mb-12 font-medium">
          Start creating right now for free. Upgrade to Premium for ₹9 launch price while in beta!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          {/* FREE EXPERIENCE */}
          <div className="rounded-3xl bg-white/5 p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">FREE Experience</h3>
                <span className="text-xs font-bold text-slate-400 line-through">₹499 value</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">Make them smile in 60 seconds.</p>

              <div className="my-6">
                <span className="text-5xl font-serif font-bold text-white">₹0</span>
                <span className="text-xs text-slate-400"> / free forever</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> 5 Memory Photos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Personalized Birthday Message
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Background Music & 3 Themes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Basic Cinematic Reveal
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> 1-Tap WhatsApp Share Link
                </li>
              </ul>
            </div>

            <Link href="/express" className="mt-8">
              <MagneticButton variant="secondary" className="w-full text-sm font-bold">
                Make one for free ✨
              </MagneticButton>
            </Link>
          </div>

          {/* PREMIUM MAGIC (₹9 LAUNCH OFFER) */}
          <div className="rounded-3xl bg-gradient-to-b from-pink-500/25 via-purple-600/20 to-slate-950 p-8 border-2 border-pink-400 flex flex-col justify-between relative shadow-2xl shadow-pink-500/30 scale-102">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 px-5 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg">
              🔥 Launch Offer · ₹9 Only
            </span>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Crown className="h-6 w-6 text-amber-300" /> PREMIUM MAGIC
                </h3>
                <span className="text-xs font-bold text-slate-400 line-through">₹1,599 value</span>
              </div>
              <p className="text-xs text-pink-300 mt-1 font-medium">
                Make it unreasonably personal.
              </p>

              <div className="my-6 flex items-baseline gap-2">
                <span className="text-6xl font-serif font-bold text-amber-300">₹9</span>
                <span className="text-xs text-slate-300 font-medium">beta launch pricing</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-200 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400 shrink-0" /> EVERYTHING IN FREE +
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400 shrink-0" /> Instagram Story Progression Stream
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400 shrink-0" /> Spotify Birthday Soundtrack Player 🎵
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400 shrink-0" /> AI Birthday Letter & AI Roast Mode 💀
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400 shrink-0" /> Constellation Star Name Reveal ✨
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink-400 shrink-0" /> Interactive Cake & Blow-Out Candles 🎂
                </li>
              </ul>
            </div>

            <Link href="/express" className="mt-8">
              <MagneticButton variant="gold" className="w-full text-sm font-bold text-slate-950">
                Unlock Premium Magic for ₹9 ✨
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-xs text-slate-400 font-medium">
        <p>Made with ❤️ by MemoryBloom. Not a birthday wish. A whole experience.</p>
      </footer>
    </AuroraBackground>
  );
}
