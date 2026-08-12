'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { triggerHaptic } from '@/lib/utils';
import { Gift, Heart, Sparkles, CheckCircle2, MessageCircle, Copy, Check, BarChart3, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import { useGiftBuilderStore } from '@/features/builder/store';
import { launchDiwaliFirecrackers } from '@/components/ui/DiwaliFirecrackers';

export const GiftWrappingBox: React.FC<{ giftId?: string }> = ({ giftId = 'gift_demo' }) => {
  const [step, setStep] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const { currentGift } = useGiftBuilderStore();

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep(2); // Ribbon wraps
      triggerHaptic('medium');
    }, 1200);

    const t2 = setTimeout(() => {
      setStep(3); // Paper folds
      triggerHaptic('heavy');
    }, 2600);

    const t3 = setTimeout(() => {
      setStep(4); // Wax Seal stamps & Diwali Firecrackers burst
      triggerHaptic('success');
      launchDiwaliFirecrackers();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleWhatsAppShare = () => {
    triggerHaptic('success');
    const fullUrl = `${window.location.origin}/g/${currentGift.id || giftId}`;
    const shareText = encodeURIComponent(
      currentGift.whatsappShareText ||
        `Yo ${currentGift.receiverName || 'there'}, I made a birthday surprise for you 👀 Don't open this around other people 😂👇 ${fullUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const handleCopyLink = () => {
    triggerHaptic('light');
    const fullUrl = `${window.location.origin}/g/${currentGift.id || giftId}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-6 text-center text-white overflow-hidden bg-slate-950">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-pink-400">
        Wrapping Ceremony
      </p>

      <h1 className="font-serif text-3xl sm:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200">
        {step < 4 ? 'Transforming Memories into Magic...' : 'Your Magic is Ready! ✨'}
      </h1>

      {/* 3D Box Wrapping Stage */}
      <div className="relative flex h-64 w-64 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 p-2 shadow-2xl border-4 border-amber-300/60">
        {/* Step 1: Photos Collapsing */}
        {step === 1 && (
          <motion.div
            animate={{ scale: [1.2, 0.8, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <Sparkles className="h-16 w-16 text-yellow-200 animate-spin" />
            <p className="mt-2 text-xs font-bold text-amber-100">Gathering Photos...</p>
          </motion.div>
        )}

        {/* Step 2: Silk Ribbon Wrapping */}
        {step === 2 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <div className="absolute h-8 w-full bg-pink-600/90 shadow-md border-y border-pink-300" />
            <div className="absolute w-8 h-full bg-pink-600/90 shadow-md border-x border-pink-300" />
            <Gift className="relative z-10 h-16 w-16 text-amber-100 animate-bounce" />
          </motion.div>
        )}

        {/* Step 3: Paper Folding */}
        {step === 3 && (
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: [10, -10, 0] }}
            transition={{ duration: 1 }}
            className="relative flex flex-col items-center justify-center"
          >
            <div className="h-20 w-20 rounded-full bg-red-700 border-4 border-amber-300 shadow-xl flex items-center justify-center">
              <Heart className="h-10 w-10 text-amber-200 fill-amber-200" />
            </div>
            <p className="mt-2 text-xs font-bold text-amber-100">Sealing Wax Stamp...</p>
          </motion.div>
        )}

        {/* Step 4: Finished Box Ready */}
        {step === 4 && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-16 w-16 text-emerald-300 drop-shadow-md" />
            <p className="text-sm font-bold text-white">Gift Wrapped & Sealed!</p>
          </motion.div>
        )}
      </div>

      {/* Action Buttons once Wrapped */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-col items-center gap-4 w-full max-w-md"
        >
          {/* 1-Tap WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2.5 rounded-full bg-emerald-600 px-8 py-4 text-base font-extrabold text-white shadow-xl hover:bg-emerald-500 hover:scale-105 transition-all w-full min-h-[44px]"
          >
            <MessageCircle className="h-5 w-5 fill-white" />
            <span>Send to {currentGift.receiverName || 'Recipient'} on WhatsApp 💚</span>
          </button>

          <div className="grid grid-cols-2 gap-3 w-full">
            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-3 text-xs font-bold text-slate-200 border border-white/20 hover:bg-white/20 transition-colors min-h-[44px]"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Link Copied!' : 'Copy Magic Link'}</span>
            </button>

            {/* Sender Dashboard Analytics */}
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 rounded-full bg-purple-600/30 px-4 py-3 text-xs font-bold text-purple-200 border border-purple-400/40 hover:bg-purple-600/40 transition-colors min-h-[44px]"
            >
              <BarChart3 className="h-4 w-4 text-purple-300" />
              <span>Sender Dashboard 📊</span>
            </Link>
          </div>

          {/* Preview Experience Link */}
          <Link
            href={`/g/${giftId}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-pink-300 transition-colors pt-2"
          >
            <Eye className="h-4 w-4" />
            <span>Preview Receiver Experience →</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
};
