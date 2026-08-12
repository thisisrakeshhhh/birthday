'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Wand2, Gift, LayoutDashboard, MessageCircle } from 'lucide-react';
import { cn, triggerHaptic } from '@/lib/utils';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const handleWhatsAppShare = () => {
    triggerHaptic('success');
    const shareText = encodeURIComponent(
      "Yo! Check out MemoryBloom - Make them a tiny internet universe for their birthday 👀👇 https://birthday-self-theta.vercel.app/"
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const navItems = [
    { label: 'Home', href: '/', icon: Sparkles },
    { label: 'Express', href: '/express', icon: Wand2, highlight: true },
    { label: 'Demo', href: '/g/gift_demo', icon: Gift },
    { label: 'Stats', href: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block sm:hidden pb-safe">
      <div className="mx-3 mb-2 rounded-full border border-white/20 bg-slate-950/90 p-1.5 backdrop-blur-2xl shadow-2xl shadow-purple-950/60">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => triggerHaptic('light')}
                className={cn(
                  'relative flex flex-col items-center gap-0.5 rounded-full px-3 py-1.5 text-[10px] font-bold transition-all min-h-[48px] min-w-[48px] justify-center',
                  isActive
                    ? 'text-pink-400 font-extrabold'
                    : 'text-slate-400 hover:text-slate-200',
                  item.highlight && !isActive && 'text-amber-300'
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-white/10 blur-xs" />
                )}
                <Icon className={cn('h-5 w-5', item.highlight && 'animate-pulse text-amber-300')} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={handleWhatsAppShare}
            className="relative flex flex-col items-center gap-0.5 rounded-full px-3 py-1.5 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 min-h-[48px] min-w-[48px] justify-center cursor-pointer"
          >
            <MessageCircle className="h-5 w-5 fill-emerald-400/20" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
