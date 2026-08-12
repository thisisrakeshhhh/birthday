'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wand2, Skull, BarChart3, MessageCircle } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const handleNavClick = () => {
    triggerHaptic('light');
  };

  const handleWhatsAppShare = () => {
    triggerHaptic('success');
    const shareText = encodeURIComponent(
      "Yo! Check out MemoryBloom - Make them a tiny internet universe for their birthday 👀👇 https://birthday-self-theta.vercel.app/"
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/15 px-4 py-2 flex items-center justify-around shadow-2xl">
      <Link
        href="/"
        onClick={handleNavClick}
        className={`flex flex-col items-center gap-1 min-h-[48px] min-w-[48px] justify-center text-[10px] font-bold ${
          pathname === '/' ? 'text-pink-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className="h-5 w-5" />
        <span>Home</span>
      </Link>

      <Link
        href="/express"
        onClick={handleNavClick}
        className={`flex flex-col items-center gap-1 min-h-[48px] min-w-[48px] justify-center text-[10px] font-bold ${
          pathname === '/express' ? 'text-amber-300' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Wand2 className="h-5 w-5" />
        <span>Create</span>
      </Link>

      <Link
        href="/g/gift_demo"
        onClick={handleNavClick}
        className={`flex flex-col items-center gap-1 min-h-[48px] min-w-[48px] justify-center text-[10px] font-bold ${
          pathname.startsWith('/g/') ? 'text-pink-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Skull className="h-5 w-5" />
        <span>Demo</span>
      </Link>

      <Link
        href="/dashboard"
        onClick={handleNavClick}
        className={`flex flex-col items-center gap-1 min-h-[48px] min-w-[48px] justify-center text-[10px] font-bold ${
          pathname === '/dashboard' ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <BarChart3 className="h-5 w-5" />
        <span>Analytics</span>
      </Link>

      <button
        onClick={handleWhatsAppShare}
        className="flex flex-col items-center gap-1 min-h-[48px] min-w-[48px] justify-center text-[10px] font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
      >
        <MessageCircle className="h-5 w-5 fill-emerald-400/20" />
        <span>Share</span>
      </button>
    </div>
  );
};
