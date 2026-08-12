import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  DigitalGift,
  MemoryItem,
  OccasionType,
  ThemeId,
  WrittenNote,
  RelationshipCategory,
  VibeCategory,
  FamiliarityLevel,
  RelationshipIntent,
  AnonymousConfig,
  SituationshipCard,
  GroupChatVote,
  PlanType,
  BirthdayRoast,
  MidnightDropConfig,
} from '@/types/gift';
import { runAIMemoryDirector } from '@/features/ai/director';

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem_1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop',
    caption: 'That unforgettable coffee date ☕✨',
    insideJokeAi: 'And somehow this person still thinks they are coordinated 💀',
    fileName: 'IMG_2847.JPG',
    likesCount: 142,
    commentsCount: 38,
    date: '2023-06-14',
    location: { name: 'Paris, France', time: '3:47 PM' },
    rotation: -4,
    tapeColor: '#F472B6',
    chapter: 'The Evidence 📸',
  },
  {
    id: 'mem_2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop',
    caption: 'Sunset laughs at the beach 🌅💛',
    insideJokeAi: '0 survival instincts, 100% main character confidence 🌊',
    fileName: 'IMG_2910.JPG',
    likesCount: 98,
    commentsCount: 14,
    date: '2023-08-20',
    location: { name: 'Goa Coast', time: '6:12 PM' },
    rotation: 6,
    tapeColor: '#F59E0B',
    chapter: 'Unfiltered Moments 🍿',
  },
];

const INITIAL_NOTE: WrittenNote = {
  id: 'note_1',
  author: 'Someone who cares',
  message: 'I wasn\'t planning on sending this. Then I kept thinking about you. So here we are.',
  handwritingFont: 'Caveat',
  paperTexture: 'parchment',
};

const DEFAULT_ANONYMOUS: AnonymousConfig = {
  enabled: true,
  revealMode: 'reveal_at_end',
  isRevealed: false,
  senderAlias: 'Someone who notices the little things 🕵️',
  clues: [
    { id: 'c1', label: 'CLUE 01', text: "You've probably seen me around before." },
    { id: 'c2', label: 'CLUE 02', text: 'You were wearing headphones and not paying attention.' },
    { id: 'c3', label: 'CLUE 03', text: 'I finally decided to say something.' },
  ],
};

const DEFAULT_SITUATIONSHIP: SituationshipCard[] = [
  { id: 's1', title: 'Besties?', subtitle: 'Just friends who text 24/7', voteCount: 42 },
  { id: 's2', title: 'Something more?', subtitle: 'We both know it', voteCount: 128 },
  { id: 's3', title: 'Delusion?', subtitle: 'It\'s giving soulmate energy', voteCount: 89 },
  { id: 's4', title: 'Nobody knows.', subtitle: 'Let\'s stop pretending', voteCount: 210 },
];

const DEFAULT_GROUP_VOTE: GroupChatVote = {
  redFlags: 2,
  greenFlags: 38,
  sendIt: 94,
  dontDoIt: 3,
};

const DEFAULT_GIFT: DigitalGift = {
  id: 'gift_demo',
  receiverName: 'Someone Special 👀',
  senderName: '',
  occasion: 'custom',
  relationship: 'best_friend',
  vibe: 'roast',
  familiarity: 'barely_know',
  intent: 'keep_anonymous',
  plan: 'free',
  themeId: 'secret',
  aiPrompt: 'I see her at the library. She wears headphones. I want to confess.',
  personality: 'mysterious & quiet',
  funnyMemory: 'we looked at each other 3 times in 10 minutes',
  insideJokeInput: 'always listening to lo-fi hip hop',
  loveDetail: 'how you focus when you study',
  anonymousConfig: DEFAULT_ANONYMOUS,
  situationshipCards: DEFAULT_SITUATIONSHIP,
  groupChatVote: DEFAULT_GROUP_VOTE,
  memories: INITIAL_MEMORIES,
  notes: [INITIAL_NOTE],
  roast: {
    enabled: false,
    introText: "Okay... we've reviewed the evidence. 💀",
    roastMemories: [],
    outroText: 'Okay okay... we love you ❤️',
  },
  spotifyUrl: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
  songTitle: 'the song that reminds me of you',
  artistName: 'Your Favorite Memory',
  createdAt: new Date().toISOString(),
  isWrapped: false,
  viewsCount: 142,
  replayCount: 38,
  reactions: [
    { emoji: '❤️', timestamp: '2 mins ago' },
    { emoji: '🥹', timestamp: ' Just now' },
    { emoji: '🕵️', timestamp: ' Just now' },
  ],
  whatsappShareText: 'Someone wants to tell you something 👀 Don\'t ask questions. Just open this 👇',
  scenes: [
    { id: 'sc_1', type: 'anonymous_mystery' },
    { id: 'sc_2', type: 'crush_confession' },
    { id: 'sc_3', type: 'situationship_quiz' },
    { id: 'sc_4', type: 'instagram_story' },
    { id: 'sc_5', type: 'group_chat_council' },
    { id: 'sc_6', type: 'envelope' },
    { id: 'sc_7', type: 'finale' },
  ],
};

interface BuilderState {
  currentGift: DigitalGift;
  currentStep: number;
  isAiGenerating: boolean;
  setFamiliarity: (fam: FamiliarityLevel) => void;
  setIntent: (intent: RelationshipIntent) => void;
  setOccasion: (occ: OccasionType) => void;
  setRelationship: (rel: RelationshipCategory) => void;
  setVibe: (vibe: VibeCategory) => void;
  setReceiverName: (name: string) => void;
  setSenderName: (name: string) => void;
  setPlan: (plan: PlanType) => void;
  setTheme: (themeId: ThemeId) => void;
  setRawInputText: (text: string) => void;
  setAnonymousMode: (enabled: boolean, revealMode?: AnonymousConfig['revealMode']) => void;
  addClue: (text: string) => void;
  addMemory: (mem: Omit<MemoryItem, 'id'>) => void;
  removeMemory: (id: string) => void;
  reorderMemories: (memories: MemoryItem[]) => void;
  updateNote: (message: string, handwritingFont?: WrittenNote['handwritingFont']) => void;
  generateWithAiDirector: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetGift: () => void;
}

export const useGiftBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      currentGift: DEFAULT_GIFT,
      currentStep: 1,
      isAiGenerating: false,

      setFamiliarity: (familiarity) =>
        set((state) => ({
          currentGift: {
            ...state.currentGift,
            familiarity,
            anonymousConfig: {
              ...state.currentGift.anonymousConfig!,
              enabled: familiarity === 'dont_know_name' || familiarity === 'barely_know',
            },
          },
        })),

      setIntent: (intent) =>
        set((state) => ({ currentGift: { ...state.currentGift, intent } })),

      setOccasion: (occasion) =>
        set((state) => ({ currentGift: { ...state.currentGift, occasion } })),

      setRelationship: (relationship) =>
        set((state) => ({ currentGift: { ...state.currentGift, relationship } })),

      setVibe: (vibe) =>
        set((state) => ({ currentGift: { ...state.currentGift, vibe } })),

      setReceiverName: (receiverName) =>
        set((state) => ({ currentGift: { ...state.currentGift, receiverName } })),

      setSenderName: (senderName) =>
        set((state) => ({ currentGift: { ...state.currentGift, senderName } })),

      setPlan: (plan) =>
        set((state) => ({ currentGift: { ...state.currentGift, plan } })),

      setTheme: (themeId) =>
        set((state) => ({ currentGift: { ...state.currentGift, themeId } })),

      setRawInputText: (aiPrompt) =>
        set((state) => ({ currentGift: { ...state.currentGift, aiPrompt } })),

      setAnonymousMode: (enabled, revealMode) =>
        set((state) => ({
          currentGift: {
            ...state.currentGift,
            anonymousConfig: {
              ...state.currentGift.anonymousConfig!,
              enabled,
              revealMode: revealMode || state.currentGift.anonymousConfig!.revealMode,
            },
          },
        })),

      addClue: (text) =>
        set((state) => {
          const existingClues = state.currentGift.anonymousConfig?.clues || [];
          const newClue = {
            id: `c_${Date.now()}`,
            label: `CLUE 0${existingClues.length + 1}`,
            text,
          };
          return {
            currentGift: {
              ...state.currentGift,
              anonymousConfig: {
                ...state.currentGift.anonymousConfig!,
                clues: [...existingClues, newClue],
              },
            },
          };
        }),

      addMemory: (memData) =>
        set((state) => {
          const newMem: MemoryItem = {
            ...memData,
            id: `mem_${Date.now()}`,
            rotation: Math.random() * 12 - 6,
          };
          return {
            currentGift: {
              ...state.currentGift,
              memories: [...state.currentGift.memories, newMem],
            },
          };
        }),

      removeMemory: (id) =>
        set((state) => ({
          currentGift: {
            ...state.currentGift,
            memories: state.currentGift.memories.filter((m) => m.id !== id),
          },
        })),

      reorderMemories: (memories) =>
        set((state) => ({
          currentGift: { ...state.currentGift, memories },
        })),

      updateNote: (message, handwritingFont) =>
        set((state) => {
          const existingNote = state.currentGift.notes[0] || INITIAL_NOTE;
          const updated: WrittenNote = {
            ...existingNote,
            message,
            handwritingFont: handwritingFont || existingNote.handwritingFont,
          };
          return {
            currentGift: {
              ...state.currentGift,
              notes: [updated],
            },
          };
        }),

      generateWithAiDirector: () => {
        const state = get();
        set({ isAiGenerating: true });

        setTimeout(() => {
          const res = runAIMemoryDirector({
            familiarity: state.currentGift.familiarity,
            intent: state.currentGift.intent,
            receiverName: state.currentGift.receiverName,
            senderName: state.currentGift.senderName,
            rawInputText: state.currentGift.aiPrompt,
            funnyMemory: state.currentGift.funnyMemory,
            loveDetail: state.currentGift.loveDetail,
          });

          set((s) => ({
            isAiGenerating: false,
            currentGift: {
              ...s.currentGift,
              themeId: res.themeId,
              whatsappShareText: res.whatsappShareText,
              anonymousConfig: {
                ...s.currentGift.anonymousConfig!,
                clues: res.clues.length ? res.clues : s.currentGift.anonymousConfig!.clues,
              },
              notes: [
                {
                  id: `note_ai_${Date.now()}`,
                  author: s.currentGift.senderName || 'Someone who cares',
                  message: res.generatedLetter,
                  handwritingFont: 'Caveat',
                },
              ],
            },
          }));
        }, 1000);
      },

      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      goToStep: (currentStep) => set({ currentStep }),

      resetGift: () =>
        set({
          currentGift: DEFAULT_GIFT,
          currentStep: 1,
        }),
    }),
    {
      name: 'memorybloom_draft_store_v4',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
