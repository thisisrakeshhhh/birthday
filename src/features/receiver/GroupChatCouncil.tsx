'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GroupChatVote } from '@/types/gift';
import { Users, Shield, Sparkles } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

export const GroupChatCouncil: React.FC<{ vote?: GroupChatVote }> = ({ vote }) => {
  const [userVote, setUserVote] = useState<string | null>(null);

  const initialVote = vote || {
    redFlags: 2,
    greenFlags: 38,
    sendIt: 94,
    dontDoIt: 3,
  };

  const handleVote = (type: string) => {
    triggerHaptic('medium');
    setUserVote(type);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto my-10 px-4 text-center select-none">
      <div className="rounded-3xl bg-slate-950/90 p-6 border border-white/20 shadow-2xl backdrop-blur-xl space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-1.5 text-xs font-bold text-purple-300">
          <Users className="h-4 w-4 text-purple-400" />
          <span>ASK THE GROUP CHAT 💬</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          THE COUNCIL HAS SPOKEN 👑
        </h3>
        <p className="text-xs text-slate-300">
          Friends voted on whether this experience should be sent.
        </p>

        {/* Voting Options Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleVote('green')}
            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between cursor-pointer min-h-[44px] ${
              userVote === 'green' ? 'bg-emerald-500/20 border-emerald-400' : 'bg-slate-900 border-white/10'
            }`}
          >
            <span className="text-xs font-bold text-emerald-300">🟢 Green Flag</span>
            <span className="text-sm font-bold text-white mt-2">
              {initialVote.greenFlags + (userVote === 'green' ? 1 : 0)} votes
            </span>
          </button>

          <button
            onClick={() => handleVote('send')}
            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between cursor-pointer min-h-[44px] ${
              userVote === 'send' ? 'bg-pink-500/20 border-pink-400' : 'bg-slate-900 border-white/10'
            }`}
          >
            <span className="text-xs font-bold text-pink-300">👀 Send It</span>
            <span className="text-sm font-bold text-white mt-2">
              {initialVote.sendIt + (userVote === 'send' ? 1 : 0)} votes
            </span>
          </button>

          <button
            onClick={() => handleVote('red')}
            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between cursor-pointer min-h-[44px] ${
              userVote === 'red' ? 'bg-red-500/20 border-red-400' : 'bg-slate-900 border-white/10'
            }`}
          >
            <span className="text-xs font-bold text-red-300">🚩 Red Flag</span>
            <span className="text-sm font-bold text-white mt-2">
              {initialVote.redFlags + (userVote === 'red' ? 1 : 0)} votes
            </span>
          </button>

          <button
            onClick={() => handleVote('dont')}
            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between cursor-pointer min-h-[44px] ${
              userVote === 'dont' ? 'bg-amber-500/20 border-amber-400' : 'bg-slate-900 border-white/10'
            }`}
          >
            <span className="text-xs font-bold text-amber-300">💀 Don&apos;t Do It</span>
            <span className="text-sm font-bold text-white mt-2">
              {initialVote.dontDoIt + (userVote === 'dont' ? 1 : 0)} votes
            </span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 italic">
          Verdict: 96% of council members voted &quot;SEND IT 👀&quot;
        </p>
      </div>
    </div>
  );
};
