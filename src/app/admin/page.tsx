'use client';

import React from 'react';
import Link from 'next/link';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { Shield, DollarSign, Users, Gift, TrendingUp, Layers } from 'lucide-react';

export default function AdminPage() {
  return (
    <AuroraBackground themeId="luxury">
      <div className="flex min-h-screen flex-col items-center p-6 pt-12 max-w-5xl mx-auto w-full text-slate-100">
        <div className="flex w-full items-center justify-between mb-8">
          <Link href="/" className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <span>🌸</span> MemoryBloom Admin
          </Link>
          <span className="rounded-full bg-yellow-400/20 border border-yellow-400/40 px-3 py-1 text-xs font-bold text-yellow-300 flex items-center gap-1">
            <Shield className="h-3.5 w-3.5" /> Platform Admin
          </span>
        </div>

        <div className="w-full mb-8">
          <h1 className="font-serif text-3xl font-bold text-white">SaaS Platform Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time MRR, conversions, and theme usage.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full mb-8">
          <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
            <DollarSign className="h-6 w-6 text-yellow-400 mb-2" />
            <p className="text-xs text-slate-400">Monthly Revenue (MRR)</p>
            <p className="font-serif text-3xl font-bold text-white mt-1">$14,820</p>
            <span className="text-[10px] text-emerald-400 font-bold">+24% this month</span>
          </div>

          <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
            <Gift className="h-6 w-6 text-pink-400 mb-2" />
            <p className="text-xs text-slate-400">Total Gifts Created</p>
            <p className="font-serif text-3xl font-bold text-white mt-1">1,420</p>
            <span className="text-[10px] text-pink-300 font-bold">88% completion rate</span>
          </div>

          <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
            <Users className="h-6 w-6 text-purple-400 mb-2" />
            <p className="text-xs text-slate-400">Active Subscribers</p>
            <p className="font-serif text-3xl font-bold text-white mt-1">380</p>
            <span className="text-[10px] text-purple-300 font-bold">MemoryBloom+</span>
          </div>

          <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
            <TrendingUp className="h-6 w-6 text-sky-400 mb-2" />
            <p className="text-xs text-slate-400">Express Mode Speed</p>
            <p className="font-serif text-3xl font-bold text-white mt-1">68s</p>
            <span className="text-[10px] text-sky-300 font-bold">Avg generation time</span>
          </div>
        </div>

        {/* Most Selected Themes */}
        <div className="w-full rounded-3xl bg-white/5 p-6 border border-white/10">
          <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-400" /> Popular Themes Distribution
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Cute Blobs & Hearts', pct: '38%' },
              { name: 'Galaxy Dreams', pct: '26%' },
              { name: 'Sakura Anime', pct: '18%' },
              { name: 'Vintage Scrapbook', pct: '12%' },
            ].map((t) => (
              <div key={t.name} className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-200">{t.name}</span>
                <span className="text-pink-400 font-bold">{t.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
