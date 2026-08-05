import { ThemeId } from '@/types/gift';

export interface ThemeTokens {
  id: ThemeId;
  name: string;
  tagline: string;
  colors: {
    bgGradient: string;
    cardBg: string;
    cardBorder: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentGlow: string;
    badgeBg: string;
  };
  particles: {
    type: 'hearts' | 'stars' | 'sakura' | 'leaves' | 'fireflies' | 'balloons' | 'confetti' | 'bubbles';
    primaryColor: string;
    secondaryColor: string;
    density: number;
  };
  cursor: {
    glowColor: string;
    trailEmoji: string;
  };
  typography: {
    headingFont: string;
    handwritingFont: string;
  };
  audio: {
    ambientPreset: string;
  };
}

export const THEME_REGISTRY: Record<ThemeId, ThemeTokens> = {
  galaxy: {
    id: 'galaxy',
    name: 'Galaxy Dreams',
    tagline: 'Infinite cosmic dust and twinkling constellations.',
    colors: {
      bgGradient: 'from-slate-950 via-purple-950 to-slate-900',
      cardBg: 'rgba(23, 15, 38, 0.65)',
      cardBorder: 'rgba(168, 85, 247, 0.3)',
      textPrimary: '#F3E8FF',
      textSecondary: '#C084FC',
      accent: '#C084FC',
      accentGlow: '0 0 25px rgba(192, 132, 252, 0.5)',
      badgeBg: 'rgba(192, 132, 252, 0.15)',
    },
    particles: {
      type: 'stars',
      primaryColor: '#E9D5FF',
      secondaryColor: '#38BDF8',
      density: 45,
    },
    cursor: {
      glowColor: '#C084FC',
      trailEmoji: '✨',
    },
    typography: {
      headingFont: 'Clash Display',
      handwritingFont: 'Caveat',
    },
    audio: {
      ambientPreset: 'cosmic_synth',
    },
  },
  anime: {
    id: 'anime',
    name: 'Sakura Anime',
    tagline: 'Falling cherry blossoms and soft pastel dreams.',
    colors: {
      bgGradient: 'from-pink-100 via-purple-100 to-rose-200',
      cardBg: 'rgba(255, 255, 255, 0.75)',
      cardBorder: 'rgba(244, 114, 182, 0.4)',
      textPrimary: '#881337',
      textSecondary: '#E11D48',
      accent: '#EC4899',
      accentGlow: '0 0 20px rgba(236, 72, 153, 0.4)',
      badgeBg: 'rgba(244, 114, 182, 0.2)',
    },
    particles: {
      type: 'sakura',
      primaryColor: '#F472B6',
      secondaryColor: '#FB7185',
      density: 35,
    },
    cursor: {
      glowColor: '#F472B6',
      trailEmoji: '🌸',
    },
    typography: {
      headingFont: 'Satoshi',
      handwritingFont: 'Sacramento',
    },
    audio: {
      ambientPreset: 'lofi_piano',
    },
  },
  cute: {
    id: 'cute',
    name: 'Cute Blobs & Hearts',
    tagline: 'Soft pastels, floating clouds, and sweet micro-interactions.',
    colors: {
      bgGradient: 'from-rose-100 via-amber-100 to-sky-100',
      cardBg: 'rgba(255, 255, 255, 0.8)',
      cardBorder: 'rgba(251, 113, 133, 0.35)',
      textPrimary: '#4C1D95',
      textSecondary: '#7C3AED',
      accent: '#FB7185',
      accentGlow: '0 0 20px rgba(251, 113, 133, 0.4)',
      badgeBg: 'rgba(251, 113, 133, 0.15)',
    },
    particles: {
      type: 'hearts',
      primaryColor: '#FDA4AF',
      secondaryColor: '#C084FC',
      density: 30,
    },
    cursor: {
      glowColor: '#FDA4AF',
      trailEmoji: '❤️',
    },
    typography: {
      headingFont: 'Satoshi',
      handwritingFont: 'Caveat',
    },
    audio: {
      ambientPreset: 'sweet_musicbox',
    },
  },
  minimal: {
    id: 'minimal',
    name: 'Sleek Warm Minimal',
    tagline: 'Clean typography, subtle shadows, and effortless elegance.',
    colors: {
      bgGradient: 'from-amber-50 via-stone-100 to-orange-50',
      cardBg: 'rgba(255, 255, 255, 0.9)',
      cardBorder: 'rgba(214, 211, 209, 0.6)',
      textPrimary: '#1C1917',
      textSecondary: '#78716C',
      accent: '#D97706',
      accentGlow: '0 0 15px rgba(217, 119, 6, 0.3)',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
    },
    particles: {
      type: 'bubbles',
      primaryColor: '#F59E0B',
      secondaryColor: '#D97706',
      density: 20,
    },
    cursor: {
      glowColor: '#F59E0B',
      trailEmoji: '✨',
    },
    typography: {
      headingFont: 'General Sans',
      handwritingFont: 'Satisfy',
    },
    audio: {
      ambientPreset: 'minimal_acoustic',
    },
  },
  luxury: {
    id: 'luxury',
    name: 'Obsidian & Gold',
    tagline: 'Dark champagne luxury, velvet glass, and golden sparkle.',
    colors: {
      bgGradient: 'from-zinc-950 via-neutral-900 to-stone-950',
      cardBg: 'rgba(24, 24, 27, 0.8)',
      cardBorder: 'rgba(234, 179, 8, 0.4)',
      textPrimary: '#FEF08A',
      textSecondary: '#EAB308',
      accent: '#EAB308',
      accentGlow: '0 0 30px rgba(234, 179, 8, 0.5)',
      badgeBg: 'rgba(234, 179, 8, 0.2)',
    },
    particles: {
      type: 'fireflies',
      primaryColor: '#FACC15',
      secondaryColor: '#FEF08A',
      density: 35,
    },
    cursor: {
      glowColor: '#EAB308',
      trailEmoji: '⭐',
    },
    typography: {
      headingFont: 'Clash Display',
      handwritingFont: 'Sacramento',
    },
    audio: {
      ambientPreset: 'grand_orchestral',
    },
  },
  nature: {
    id: 'nature',
    name: 'Serene Nature & Mint',
    tagline: 'Floating autumn leaves, soft rainfall, and forest calm.',
    colors: {
      bgGradient: 'from-emerald-950 via-teal-900 to-slate-950',
      cardBg: 'rgba(6, 78, 59, 0.5)',
      cardBorder: 'rgba(52, 211, 153, 0.3)',
      textPrimary: '#ECFDF5',
      textSecondary: '#34D399',
      accent: '#10B981',
      accentGlow: '0 0 25px rgba(16, 185, 129, 0.4)',
      badgeBg: 'rgba(52, 211, 153, 0.15)',
    },
    particles: {
      type: 'leaves',
      primaryColor: '#34D399',
      secondaryColor: '#A7F3D0',
      density: 30,
    },
    cursor: {
      glowColor: '#34D399',
      trailEmoji: '🍃',
    },
    typography: {
      headingFont: 'Satoshi',
      handwritingFont: 'Caveat',
    },
    audio: {
      ambientPreset: 'forest_birds',
    },
  },
  flowers: {
    id: 'flowers',
    name: 'Botanical Bloom',
    tagline: 'Lush lavender, peach petals, and floral elegance.',
    colors: {
      bgGradient: 'from-purple-100 via-rose-100 to-peach-100',
      cardBg: 'rgba(255, 255, 255, 0.85)',
      cardBorder: 'rgba(192, 132, 252, 0.35)',
      textPrimary: '#581C87',
      textSecondary: '#9333EA',
      accent: '#A855F7',
      accentGlow: '0 0 20px rgba(168, 85, 247, 0.4)',
      badgeBg: 'rgba(192, 132, 252, 0.2)',
    },
    particles: {
      type: 'sakura',
      primaryColor: '#C084FC',
      secondaryColor: '#F472B6',
      density: 35,
    },
    cursor: {
      glowColor: '#C084FC',
      trailEmoji: '🌺',
    },
    typography: {
      headingFont: 'Clash Display',
      handwritingFont: 'Sacramento',
    },
    audio: {
      ambientPreset: 'harp_breeze',
    },
  },
  retro: {
    id: 'retro',
    name: 'Vintage Scrapbook',
    tagline: 'Sepia paper grain, faded polaroids, and nostalgic stamps.',
    colors: {
      bgGradient: 'from-stone-200 via-amber-100 to-yellow-100',
      cardBg: 'rgba(254, 243, 199, 0.9)',
      cardBorder: 'rgba(180, 83, 9, 0.4)',
      textPrimary: '#451A03',
      textSecondary: '#B45309',
      accent: '#D97706',
      accentGlow: '0 0 15px rgba(217, 119, 6, 0.3)',
      badgeBg: 'rgba(217, 119, 6, 0.2)',
    },
    particles: {
      type: 'confetti',
      primaryColor: '#D97706',
      secondaryColor: '#B45309',
      density: 25,
    },
    cursor: {
      glowColor: '#D97706',
      trailEmoji: '📜',
    },
    typography: {
      headingFont: 'General Sans',
      handwritingFont: 'Caveat',
    },
    audio: {
      ambientPreset: 'vinyl_crackle',
    },
  },
  neon: {
    id: 'neon',
    name: 'Cyber Neon Night',
    tagline: 'Electric cyan, magenta glow, and futuristic pulse.',
    colors: {
      bgGradient: 'from-gray-950 via-slate-900 to-blue-950',
      cardBg: 'rgba(15, 23, 42, 0.8)',
      cardBorder: 'rgba(6, 182, 212, 0.5)',
      textPrimary: '#67E8F9',
      textSecondary: '#F43F5E',
      accent: '#06B6D4',
      accentGlow: '0 0 35px rgba(6, 182, 212, 0.6)',
      badgeBg: 'rgba(6, 182, 212, 0.25)',
    },
    particles: {
      type: 'fireflies',
      primaryColor: '#06B6D4',
      secondaryColor: '#F43F5E',
      density: 40,
    },
    cursor: {
      glowColor: '#06B6D4',
      trailEmoji: '⚡',
    },
    typography: {
      headingFont: 'Clash Display',
      handwritingFont: 'Satisfy',
    },
    audio: {
      ambientPreset: 'synthwave_pulse',
    },
  },
  scrapbook: {
    id: 'scrapbook',
    name: 'Craft Paper & Tape',
    tagline: 'Authentic physical paper textures, washi tape, and cute stickers.',
    colors: {
      bgGradient: 'from-orange-100 via-amber-100 to-rose-100',
      cardBg: 'rgba(255, 251, 235, 0.95)',
      cardBorder: 'rgba(245, 158, 11, 0.4)',
      textPrimary: '#78350F',
      textSecondary: '#D97706',
      accent: '#F59E0B',
      accentGlow: '0 0 20px rgba(245, 158, 11, 0.4)',
      badgeBg: 'rgba(245, 158, 11, 0.2)',
    },
    particles: {
      type: 'hearts',
      primaryColor: '#F59E0B',
      secondaryColor: '#F472B6',
      density: 30,
    },
    cursor: {
      glowColor: '#F59E0B',
      trailEmoji: '🎀',
    },
    typography: {
      headingFont: 'Satoshi',
      handwritingFont: 'Caveat',
    },
    audio: {
      ambientPreset: 'paper_rustle',
    },
  },
};
