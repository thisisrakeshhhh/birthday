'use client';

import React from 'react';
import Link from 'next/link';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useGiftBuilderStore } from '@/features/builder/store';
import { LayoutDashboard, Eye, RotateCcw, Share2, Sparkles, Heart, Clock } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

export default function DashboardPage() {
  const { currentGift } = useGiftBuilderStore();

  return (
    <AuroraBackground themeId="secret">
      <div className="flex min-h-screen flex-col items-center p-6 pt-12 max-w-5xl mx-auto w-full">
        {/* Navigation Header */}
        <div className="flex w-full items-center justify-between mb-8">
          <Link href="/" className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <span>🌸</span> MemoryBloom
          </Link>
          <Link href="/create">
            <MagneticButton variant="primary" className="py-2 px-4 text-xs">
              <Sparkles className="h-4 w-4" /> Create New Gift
            </MagneticButton>
          </Link>
        </div>

        {/* Title */}
        <div className="w-full mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-pink-400" /> Sender Dashboard
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time viewer analytics & live reaction stream.
          </p>
        </div>

        {/* Live Watching Banner */}
        <div className="w-full rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-600/20 to-slate-900 border border-pink-400/40 p-4 mb-8 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">
                {currentGift.receiverName} opened your gift! ❤️
              </p>
              <p className="text-xs text-slate-300">Watching live right now...</p>
            </div>
          </div>
          <span className="text-xs font-bold text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-400/30">
            Live Stream Active
          </span>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-10">
          <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
            <Eye className="h-5 w-5 text-sky-400 mb-2" />
            <p className="text-xs text-slate-400">Total Views</p>
            <p className="font-serif text-2xl font-bold text-white mt-1">{currentGift.viewsCount}</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
            <RotateCcw className="h-5 w-5 text-amber-400 mb-2" />
            <p className="text-xs text-slate-400">Replays</p>
            <p className="font-serif text-2xl font-bold text-white mt-1">{currentGift.replayCount}</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
            <Heart className="h-5 w-5 text-rose-400 mb-2" />
            <p className="text-xs text-slate-400">Reactions</p>
            <p className="font-serif text-2xl font-bold text-white mt-1">
              {currentGift.reactions.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
            <Clock className="h-5 w-5 text-emerald-400 mb-2" />
            <p className="text-xs text-slate-400">Time Watched</p>
            <p className="font-serif text-2xl font-bold text-white mt-1">3m 42s</p>
          </div>
        </div>

        {/* Live Reaction Stream List */}
        <div className="w-full rounded-3xl bg-white/5 p-6 border border-white/10 mb-8">
          <h3 className="font-serif text-xl font-bold text-white mb-4">Live Reaction Feed</h3>
          <div className="flex flex-col gap-3">
            {currentGift.reactions.map((rx, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{rx.emoji}</span>
                  <span className="text-slate-200 font-medium">
                    {currentGift.receiverName} sent a reaction
                  </span>
                </div>
                <span className="text-slate-400">{rx.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
