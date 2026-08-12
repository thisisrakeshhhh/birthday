'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Sparkles, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <AuroraBackground themeId="secret">
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center text-slate-100 select-none">
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [-4, 4, -4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl mb-6"
        >
          🎈
        </motion.div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-2">
          404: Lost Balloon
        </h1>

        <p className="font-serif text-lg sm:text-xl text-pink-300 italic max-w-md mb-8">
          &quot;The memory floated away into the sky...&quot;
        </p>

        <Link href="/">
          <MagneticButton variant="gold" className="px-8 py-4 text-base">
            <Home className="h-5 w-5" /> Return Home
          </MagneticButton>
        </Link>
      </div>
    </AuroraBackground>
  );
}
