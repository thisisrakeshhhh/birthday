import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'success' = 'light') {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    switch (type) {
      case 'light':
        navigator.vibrate(15);
        break;
      case 'medium':
        navigator.vibrate(35);
        break;
      case 'heavy':
        navigator.vibrate(70);
        break;
      case 'success':
        navigator.vibrate([20, 40, 20, 60]);
        break;
    }
  }
}

export function generateRandomId(prefix: string = 'id'): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
}

export function formatDateString(dateStr?: string): string {
  if (!dateStr) return 'Special Memory';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
