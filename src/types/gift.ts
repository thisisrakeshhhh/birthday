export type ThemeId =
  | 'midnight'
  | 'pink_crush'
  | 'y2k'
  | 'cherry_bomb'
  | 'juicebox'
  | 'cloudcore'
  | 'toxic_bestie'
  | 'emo'
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

export type MediaMode = 'avatars' | 'photos';

export interface AvatarPair {
  id: string;
  name: string; // e.g. "Cute Cat & Bear 🧸🐱"
  creatorAvatarUrl: string;
  receiverAvatarUrl: string;
  duoStyle: '3d_plush' | 'anime_chibi' | 'pixel_retro' | 'minimal_doodle' | 'bro_memes';
}

export interface LocationTag {
  name: string;
  year?: string;
  time?: string;
  coordinates?: { lat: number; lng: number };
}

export interface MemoryItem {
  id: string;
  type: 'image' | 'video' | 'voice' | 'gif';
  url: string;
  caption?: string;
  insideJokeAi?: string;
  fileName?: string; // e.g. "IMG_2847.JPG"
  likesCount?: number;
  commentsCount?: number;
  roastCaption?: string;
  date?: string;
  location?: LocationTag;
  rotation?: number; // Polaroid tilt degrees (-15 to 15)
  tapeColor?: string;
  chapter?: string;
  isAvatar?: boolean;
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
  introText: string;
  roastMemories: Array<{
    imageUrl: string;
    caption: string;
    exhibitLabel?: string;
  }>;
  outroText: string;
}

export interface MidnightDropConfig {
  enabled: boolean;
  unlockDate: string;
  isLocked: boolean;
}

export interface SceneConfig {
  id: string;
  type: 'intro' | 'constellation' | 'roast' | 'story_chapters' | 'instagram_story' | 'cake' | 'memory_map' | 'envelope' | 'spotify_music' | 'finale';
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
  mediaMode: MediaMode;
  avatarPairId?: string;
  themeId: ThemeId;
  aiPrompt?: string;
  personality?: string;
  funnyMemory?: string;
  insideJokeInput?: string;
  loveDetail?: string;
  memories: MemoryItem[];
  notes: WrittenNote[];
  roast?: BirthdayRoast;
  midnightDrop?: MidnightDropConfig;
  spotifyUrl?: string;
  songTitle?: string;
  artistName?: string;
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
  insideJokeInput?: string;
  loveDetail?: string;
}

export interface AIStoryResponse {
  themeId: ThemeId;
  conversationalIntro: string;
  generatedLetter: string;
  insideJokeRoast: string;
  closingMessage: string;
  roastIntro: string;
  roastOutro: string;
  whatsappShareText: string;
  suggestedChapters: string[];
}
