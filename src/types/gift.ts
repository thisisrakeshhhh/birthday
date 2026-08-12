export type ThemeId =
  | 'secret'
  | 'crush'
  | 'chaotic'
  | 'romantic'
  | 'nostalgia'
  | 'delulu'
  | 'main_character'
  | 'bro_code'
  | 'midnight'
  | 'pink_crush'
  | 'y2k'
  | 'cherry_bomb'
  | 'juicebox'
  | 'cloudcore'
  | 'toxic_bestie'
  | 'emo'
  | 'scrapbook'
  | 'soft'
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

export type FamiliarityLevel =
  | 'know_well'
  | 'know_little'
  | 'just_met'
  | 'barely_know'
  | 'dont_know_name';

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

export type RelationshipIntent =
  | 'i_like_you'
  | 'keep_anonymous'
  | 'crush'
  | 'what_are_we'
  | 'i_miss_you'
  | 'i_love_you'
  | 'roast'
  | 'surprise'
  | 'just_because'
  | 'dont_know_what_to_say';

export type AnonymousRevealMode =
  | 'keep_unknown'
  | 'reveal_at_end'
  | 'request_reveal';

export type PlanType = 'free' | 'premium';

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
  fileName?: string;
  likesCount?: number;
  commentsCount?: number;
  roastCaption?: string;
  date?: string;
  location?: LocationTag;
  rotation?: number;
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

export interface MysteryClue {
  id: string;
  label: string;
  text: string;
}

export interface AnonymousConfig {
  enabled: boolean;
  revealMode: AnonymousRevealMode;
  isRevealed: boolean;
  senderAlias?: string;
  clues: MysteryClue[];
}

export interface SituationshipCard {
  id: string;
  title: string;
  subtitle: string;
  voteCount: number;
}

export interface GroupChatVote {
  redFlags: number;
  greenFlags: number;
  sendIt: number;
  dontDoIt: number;
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
  type:
    | 'intro'
    | 'anonymous_mystery'
    | 'crush_confession'
    | 'situationship_quiz'
    | 'constellation'
    | 'roast'
    | 'story_chapters'
    | 'instagram_story'
    | 'cake'
    | 'memory_map'
    | 'envelope'
    | 'group_chat_council'
    | 'spotify_music'
    | 'finale';
  title?: string;
  subtitle?: string;
  durationMs?: number;
  data?: Record<string, any>;
}

export interface DigitalGift {
  id: string;
  receiverName?: string;
  senderName?: string;
  occasion: OccasionType;
  relationship: RelationshipCategory;
  vibe: VibeCategory;
  familiarity: FamiliarityLevel;
  intent: RelationshipIntent;
  plan: PlanType;
  themeId: ThemeId;
  aiPrompt?: string;
  personality?: string;
  funnyMemory?: string;
  insideJokeInput?: string;
  loveDetail?: string;
  anonymousConfig?: AnonymousConfig;
  situationshipCards?: SituationshipCard[];
  groupChatVote?: GroupChatVote;
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
  familiarity?: FamiliarityLevel;
  intent?: RelationshipIntent;
  relationship?: RelationshipCategory;
  vibe?: VibeCategory;
  occasion?: OccasionType;
  receiverName?: string;
  senderName?: string;
  keyDetails?: string;
  rawInputText?: string;
  personality?: string;
  funnyMemory?: string;
  insideJokeInput?: string;
  loveDetail?: string;
}

export interface AIStoryResponse {
  themeId: ThemeId;
  conversationalIntro: string;
  generatedLetter: string;
  insideJokeRoast?: string;
  closingMessage: string;
  roastIntro: string;
  roastOutro: string;
  whatsappShareText: string;
  clues: MysteryClue[];
  suggestedChapters: string[];
  suggestedMusic?: string;
  suggestedPaletteName?: string;
}
