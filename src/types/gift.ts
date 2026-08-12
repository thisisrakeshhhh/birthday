export type ThemeId =
  | 'midnight'
  | 'scrapbook'
  | 'chaotic'
  | 'soft'
  | 'main_character'
  | 'romantic'
  | 'bro_code'
  | 'delulu'
  | 'galaxy'
  | 'anime'
  | 'cute'
  | 'minimal'
  | 'luxury'
  | 'nature'
  | 'flowers'
  | 'retro'
  | 'neon';

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

export type RelationshipCategory =
  | 'my_person'
  | 'best_friend'
  | 'my_menace'
  | 'bro_sis'
  | 'crush'
  | 'bestie'
  | 'someone_special';

export type VibeCategory =
  | 'emotional'
  | 'unhinged'
  | 'roast'
  | 'wholesome'
  | 'romantic'
  | 'bro_code'
  | 'main_character'
  | 'delulu';

export type PlanType = 'free' | 'premium';

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
  roastCaption?: string;
  date?: string;
  location?: LocationTag;
  rotation?: number; // Polaroid tilt degrees (-15 to 15)
  tapeColor?: string;
  chapter?: string;
}

export interface WrittenNote {
  id: string;
  author: string;
  message: string;
  handwritingFont: 'Caveat' | 'Sacramento' | 'Dancing Script' | 'Satisfy';
  paperTexture?: 'parchment' | 'notebook' | 'pink_paper' | 'gold_foil';
}

export interface BirthdayRoast {
  enabled: boolean;
  introText: string; // "Okay... we've reviewed the evidence."
  roastMemories: Array<{
    imageUrl: string;
    caption: string;
  }>;
  outroText: string; // "Okay okay... we love you ❤️"
}

export interface MidnightDropConfig {
  enabled: boolean;
  unlockDate: string; // ISO string e.g. "2026-08-15T00:00:00Z"
  isLocked: boolean;
}

export interface SceneConfig {
  id: string;
  type: 'intro' | 'constellation' | 'roast' | 'story_chapters' | 'cake' | 'memory_map' | 'envelope' | 'vinyl_music' | 'finale';
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
  relationship: RelationshipCategory;
  vibe: VibeCategory;
  plan: PlanType;
  themeId: ThemeId;
  aiPrompt?: string;
  personality?: string;
  funnyMemory?: string;
  loveDetail?: string;
  memories: MemoryItem[];
  notes: WrittenNote[];
  roast?: BirthdayRoast;
  midnightDrop?: MidnightDropConfig;
  spotifyUrl?: string;
  customAudioUrl?: string;
  voiceNoteUrl?: string;
  videoUrl?: string;
  scenes: SceneConfig[];
  createdAt: string;
  isWrapped: boolean;
  viewsCount: number;
  replayCount: number;
  reactions: Array<{ emoji: string; timestamp: string }>;
  whatsappShareText?: string;
}

export interface AIStoryRequest {
  relationship: RelationshipCategory;
  vibe: VibeCategory;
  receiverName: string;
  senderName: string;
  personality?: string;
  funnyMemory?: string;
  loveDetail?: string;
  insideJoke?: string;
}

export interface AIStoryResponse {
  themeId: ThemeId;
  openingText: string;
  generatedLetter: string;
  closingMessage: string;
  roastIntro: string;
  roastOutro: string;
  whatsappShareText: string;
  suggestedChapters: string[];
}
