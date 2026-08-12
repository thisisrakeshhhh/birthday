'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PhonePreview } from '@/features/builder/PhonePreview';
import { ScrapbookPolaroid } from '@/features/receiver/ScrapbookPolaroid';
import { MemoryItem, RelationshipIntent } from '@/types/gift';
import {
  Sparkles,
  Wand2,
  Gift,
  Heart,
  Play,
  CheckCircle2,
  Skull,
  Crown,
  HelpCircle,
  Eye,
  EyeOff,
  MessageCircle,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

const INTENTS: Array<{ id: RelationshipIntent; label: string; icon: string; desc: string }> = [
  { id: 'i_like_you', label: '💌 I like you', icon: '💌', desc: 'Warm & honest confession' },
  { id: 'keep_anonymous', label: '🕵️ Keep me anonymous', icon: '🕵️', desc: 'Clues & mystery reveal' },
  { id: 'crush', label: '👀 I have a crush', icon: '👀', desc: 'Natural, zero-cringe reveal' },
  { id: 'what_are_we', label: '🫠 What are we?', icon: '🫠', desc: 'Interactive situationship cards' },
  { id: 'i_miss_you', label: '🥀 I miss you', icon: '🥀', desc: 'Cinematic nostalgic memories' },
  { id: 'i_love_you', label: '❤️ I love you', icon: '❤️', desc: 'Intimate deep affection' },
  { id: 'roast', label: '😂 Roast them', icon: '😂', desc: 'Unhinged evidence & laughs' },
  { id: 'just_because', label: '✨ Just because', icon: '✨', desc: 'Surprise for no reason' },
];

export default function LandingPage() {
  const [selectedIntent, setSelectedIntent] = useState<RelationshipIntent>('keep_anonymous');

  return (
    <AuroraBackground themeId="secret">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 backdrop-blur-md bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-white tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md">
            🌸
          </span>
          <span className="text-white drop-shadow-sm">MemoryBloom</span>
        </Link>

        <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <a href="#intents" className="text-slate-200 hover:text-white transition-colors">
            What Are You Saying?
          </a>
          <a href="#anonymous" className="text-slate-200 hover:text-white transition-colors">
            Anonymous Mode 🕵️
          </a>
          <a href="#pricing" className="text-slate-200 hover:text-white transition-colors">
            Pricing
          </a>
          <Link href="/express">
            <MagneticButton variant="gold" className="py-2 px-5 text-sm text-slate-950 font-bold">
              Create something →
            </MagneticButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center select-none">
        {/* Slogan Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-4.5 py-2 text-xs font-extrabold text-sky-200 backdrop-blur-md mb-6 shadow-lg shadow-sky-500/10"
        >
          <Sparkles className="h-4 w-4 text-sky-400 animate-spin" />
          <span>Feelings, but interactive.</span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-5xl leading-[1.1] mb-6 drop-shadow-2xl"
        >
          Say something{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-300 to-pink-300 drop-shadow-lg">
            without saying it.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-200 max-w-2xl font-sans font-medium mb-10 leading-relaxed drop-shadow-md"
        >
          Turn a crush, confession, memory or secret into an interactive experience they&apos;ll actually remember.
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
              <span>Create something →</span>
            </MagneticButton>
          </Link>
          <Link href="/g/gift_demo">
            <MagneticButton variant="glass" className="px-8 py-4 text-lg">
              <Eye className="h-5 w-5 text-sky-400" />
              <span>Someone sent me something 👀</span>
            </MagneticButton>
          </Link>
        </motion.div>

        {/* Supporting Line */}
        <div className="mt-12 text-xs text-slate-400 font-medium">
          No app. No account for the recipient. Works instantly on WhatsApp & Instagram.
        </div>
      </section>

      {/* Relationship Intent Section */}
      <section id="intents" className="py-24 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Conversational Expression
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
            What are you trying to say?
          </h2>
          <p className="text-slate-300 text-sm mt-2 font-medium">
            MemoryBloom turns messy human feelings into a cinematic digital story.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {INTENTS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                triggerHaptic('light');
                setSelectedIntent(item.id);
              }}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer min-h-[44px] ${
                selectedIntent === item.id
                  ? 'bg-gradient-to-br from-sky-500/20 via-indigo-600/20 to-slate-950 border-sky-400 shadow-xl shadow-sky-500/20 scale-102'
                  : 'bg-slate-900/60 border-white/10 hover:bg-slate-900'
              }`}
            >
              <div>
                <span className="text-base font-bold text-white block mb-1">{item.label}</span>
                <p className="text-xs text-slate-300">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Anonymous Mode Showcase */}
      <section id="anonymous" className="py-24 px-6 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-3.5 py-1 text-xs font-bold text-sky-300 mb-4">
            <EyeOff className="h-4 w-4" /> CORE DIFFERENTIATOR
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            You don&apos;t even need their name. 🕵️
          </h2>
          <p className="text-slate-300 mt-4 leading-relaxed font-medium">
            &quot;I see her at the library. She wears headphones. I don&apos;t know her name.&quot; MemoryBloom transforms your story into: <span className="font-bold text-sky-200">&quot;Someone has been noticing the little things.&quot;</span> with interactive mystery clues.
          </p>

          <div className="mt-8 space-y-3">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200">
              <span className="font-bold text-sky-400">CLUE 01:</span> &quot;You&apos;ve probably seen me before.&quot;
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200">
              <span className="font-bold text-sky-400">CLUE 02:</span> &quot;You were wearing headphones and not paying attention.&quot;
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <PhonePreview />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
            4 Steps to Impact
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="rounded-3xl bg-white/5 p-6 border border-white/10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-300 font-bold text-xl mb-4 mx-auto">
              1
            </span>
            <h3 className="font-serif text-lg font-bold text-white mb-1">Tell us the situation</h3>
            <p className="text-xs text-slate-300">Crush, secret, situationship, or roast.</p>
          </div>

          <div className="rounded-3xl bg-white/5 p-6 border border-white/10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300 font-bold text-xl mb-4 mx-auto">
              2
            </span>
            <h3 className="font-serif text-lg font-bold text-white mb-1">Pick the vibe</h3>
            <p className="text-xs text-slate-300">Secret, Crush, Romantic, Nostalgia, or Delulu.</p>
          </div>

          <div className="rounded-3xl bg-white/5 p-6 border border-white/10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 font-bold text-xl mb-4 mx-auto">
              3
            </span>
            <h3 className="font-serif text-lg font-bold text-white mb-1">We build the magic</h3>
            <p className="text-xs text-slate-300">Gemini Flash crafts tone, clues & story.</p>
          </div>

          <div className="rounded-3xl bg-white/5 p-6 border border-white/10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 font-bold text-xl mb-4 mx-auto">
              4
            </span>
            <h3 className="font-serif text-lg font-bold text-white mb-1">Send the link</h3>
            <p className="text-xs text-slate-300">Share on WhatsApp or Instagram DMs.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto w-full text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
          Unbeatable Acquisition Offer
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2 mb-12">
          Simple Transparent Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          {/* FREE */}
          <div className="rounded-3xl bg-white/5 p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">Send Something</h3>
              <p className="text-xs text-slate-300 mt-1">Basic interactive experience.</p>
              <div className="my-6">
                <span className="text-5xl font-serif font-bold text-white">₹0</span>
                <span className="text-xs text-slate-400"> / free</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Basic story experience
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 5 Memory Photos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> WhatsApp 1-tap share link
                </li>
              </ul>
            </div>
            <Link href="/express" className="mt-8">
              <MagneticButton variant="secondary" className="w-full text-sm font-bold">
                Create something →
              </MagneticButton>
            </Link>
          </div>

          {/* PREMIUM */}
          <div className="rounded-3xl bg-gradient-to-b from-sky-500/25 via-indigo-600/20 to-slate-950 p-8 border-2 border-sky-400 flex flex-col justify-between relative shadow-2xl">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-1 text-xs font-bold uppercase tracking-wider text-slate-950">
              🔥 Launch Offer · ₹9 Only
            </span>
            <div>
              <h3 className="text-2xl font-bold text-white">Make It Unforgettable</h3>
              <p className="text-xs text-sky-300 mt-1 font-medium">Full interactive magic.</p>
              <div className="my-6 flex items-baseline gap-2">
                <span className="text-6xl font-serif font-bold text-sky-300">₹9</span>
                <span className="text-xs text-slate-300 font-medium">beta launch price</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-400" /> Anonymous Mystery & Clues
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-400" /> Situationship Quiz & Group Vote
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-400" /> Gemini Flash AI Director
                </li>
              </ul>
            </div>
            <Link href="/express" className="mt-8">
              <MagneticButton variant="gold" className="w-full text-sm font-bold text-slate-950">
                Unlock for ₹9 ✨
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-xs text-slate-400 font-medium">
        <p>MemoryBloom — Feelings, but interactive.</p>
      </footer>
    </AuroraBackground>
  );
}
