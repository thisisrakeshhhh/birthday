export type ThemeId =
  | 'galaxy'
  | 'anime'
  | 'cute'
  | 'minimal'
  | 'luxury'
  | 'nature'
  | 'flowers'
  | 'retro'
  | 'neon'
  | 'scrapbook';

export type OccasionType =
  | 'birthday'
  | 'anniversary'
  | 'proposal'
  | 'wedding'
  | 'friendship'
  | 'graduation'
  | 'mothers_day'
  | 'valentines'
  | 'custom';

export type EmotionCategory = 'loved' | 'happy' | 'emotional' | 'funny' | 'nostalgic';

export interface LocationTag {
  name: string;
  year?: string;
  coordinates?: { lat: number; lng: number };
}

export interface MemoryItem {
  id: string;
  type: 'image' | 'video' | 'voice' | 'gif';
  url: string;
  caption?: string;
  date?: string;
  location?: LocationTag;
  rotation?: number; // Polaroid tilt degrees (-15 to 15)
  tapeColor?: string;
  chapter?: 'We Met' | 'Crazy Days' | 'Best Memories' | 'Today' | string;
}

export interface WrittenNote {
  id: string;
  author: string;
  message: string;
  handwritingFont: 'Caveat' | 'Sacramento' | 'Dancing Script' | 'Satisfy';
  paperTexture?: 'parchment' | 'notebook' | 'pink_paper' | 'gold_foil';
}

export interface SceneConfig {
  id: string;
  type: 'intro' | 'constellation' | 'story_chapters' | 'memory_map' | 'envelope' | 'vinyl_music' | 'finale';
  title?: string;
  subtitle?: string;
  durationMs?: number;
  data?: Record<string, any>;
}

export interface DigitalGift {
  id: string;
  receiverName: string;
  senderName: string;
  occasion: OccasionType;
  emotion: EmotionCategory;
  themeId: ThemeId;
  aiPrompt?: string;
  memories: MemoryItem[];
  notes: WrittenNote[];
  spotifyUrl?: string;
  customAudioUrl?: string;
  unlockDate?: string; // Time Capsule lock ISO string
  scenes: SceneConfig[];
  createdAt: string;
  isWrapped: boolean;
  viewsCount: number;
  replayCount: number;
  reactions: Array<{ emoji: string; timestamp: string }>;
}

export interface AIStoryRequest {
  relationship: string;
  receiverName: string;
  occasion: OccasionType;
  emotion: EmotionCategory;
  keyDetails: string;
}

export interface AIStoryResponse {
  themeId: ThemeId;
  suggestedChapters: string[];
  generatedLetter: string;
  suggestedMusic: string;
  suggestedPaletteName: string;
}
