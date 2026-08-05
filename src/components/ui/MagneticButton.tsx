'use client';

import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn, triggerHaptic } from '@/lib/utils';

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'gold';
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  className,
  onClick,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * 0.3;
    const distanceY = (e.clientY - centerY) * 0.3;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerHaptic('medium');
    if (onClick) onClick(e);
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 border border-white/20',
    secondary:
      'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 shadow-md',
    glass:
      'bg-white/20 dark:bg-white/10 backdrop-blur-xl text-slate-900 dark:text-white border border-white/30 hover:bg-white/30',
    gold:
      'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/30 border border-yellow-300/40',
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-colors duration-200 min-h-[44px] min-w-[44px] select-none cursor-pointer',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
