'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Wand2, Gift, LayoutDashboard, Heart } from 'lucide-react';
import { cn, triggerHaptic } from '@/lib/utils';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: Sparkles },
    { label: 'Express', href: '/express', icon: Wand2, highlight: true },
    { label: 'Builder', href: '/create', icon: Gift },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block sm:hidden pb-safe">
      <div className="mx-4 mb-3 rounded-full border border-white/20 bg-slate-950/80 p-1.5 backdrop-blur-xl shadow-2xl shadow-purple-950/40">
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
                  'relative flex flex-col items-center gap-1 rounded-full px-4 py-2 text-xs font-medium transition-all min-h-[44px] min-w-[44px] justify-center',
                  isActive
                    ? 'text-pink-400 font-semibold'
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
        </div>
      </div>
    </div>
  );
};
