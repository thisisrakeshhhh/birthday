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
  PlanType,
  MediaMode,
  BirthdayRoast,
  MidnightDropConfig,
} from '@/types/gift';
import { runAIMemoryDirector } from '@/features/ai/director';

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem_1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&auto=format&fit=crop',
    caption: 'Teddy & Kitty Memory ☕✨',
    insideJokeAi: 'Attempting to look aesthetic before spilling tea 💀',
    date: '2023-06-14',
    location: { name: 'Paris, France', year: '2023' },
    rotation: -4,
    tapeColor: '#F472B6',
    chapter: 'The Evidence 📸',
    isAvatar: true,
  },
  {
    id: 'mem_2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop',
    caption: 'Sunset laughs 🌅💛',
    insideJokeAi: '0 survival instincts detected in this photo 🌊😂',
    date: '2023-08-20',
    location: { name: 'Goa Coast', year: '2023' },
    rotation: 6,
    tapeColor: '#F59E0B',
    chapter: 'Unfiltered Moments 🍿',
    isAvatar: true,
  },
  {
    id: 'mem_3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop',
    caption: 'Starry celebration 🌌🎂',
    insideJokeAi: 'Main character energy loading... 👑✨',
    date: '2024-01-01',
    location: { name: 'Home Sweet Home', year: '2024' },
    rotation: -2,
    tapeColor: '#38BDF8',
    chapter: 'Why We Love You ❤️',
    isAvatar: true,
  },
];

const INITIAL_NOTE: WrittenNote = {
  id: 'note_1',
  author: 'Alex',
  message: 'Your boring birthday text era is over. Happy Birthday Emily ❤️',
  handwritingFont: 'Caveat',
  paperTexture: 'parchment',
};

const DEFAULT_GIFT: DigitalGift = {
  id: 'gift_demo',
  receiverName: 'Emily ❤️',
  senderName: 'Alex',
  occasion: 'birthday',
  relationship: 'best_friend',
  vibe: 'roast',
  plan: 'free',
  mediaMode: 'avatars',
  avatarPairId: 'cute_bear_cat',
  themeId: 'midnight',
  aiPrompt: 'She loves dogs, sister, turning 21, purple aesthetics.',
  personality: 'unhinged & funny',
  funnyMemory: 'we got lost at 2 AM looking for tacos',
  loveDetail: 'how you always listen when I need a friend',
  memories: INITIAL_MEMORIES,
  notes: [INITIAL_NOTE],
  roast: {
    enabled: true,
    introText: "Okay... we've reviewed the evidence. 💀",
    roastMemories: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&auto=format&fit=crop',
        caption: 'Making decisions that would concern a government investigation 💀',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop',
        caption: 'Zero survival instincts, 100% confidence 😂',
      },
    ],
    outroText: 'Okay okay... we love you ❤️',
  },
  midnightDrop: {
    enabled: false,
    unlockDate: new Date(Date.now() + 86400000).toISOString(),
    isLocked: false,
  },
  spotifyUrl: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
  createdAt: new Date().toISOString(),
  isWrapped: false,
  viewsCount: 142,
  replayCount: 38,
  reactions: [
    { emoji: '❤️', timestamp: '2 mins ago' },
    { emoji: '🥹', timestamp: ' Just now' },
    { emoji: '💀', timestamp: ' Just now' },
  ],
  whatsappShareText: "Yo Emily, I made a birthday surprise for you 👀 Don't open this around other people 😂👇",
  scenes: [
    { id: 'sc_1', type: 'intro' },
    { id: 'sc_2', type: 'constellation' },
    { id: 'sc_3', type: 'roast' },
    { id: 'sc_4', type: 'cake' },
    { id: 'sc_5', type: 'story_chapters' },
    { id: 'sc_6', type: 'memory_map' },
    { id: 'sc_7', type: 'envelope' },
    { id: 'sc_8', type: 'finale' },
  ],
};

interface BuilderState {
  currentGift: DigitalGift;
  currentStep: number;
  isAiGenerating: boolean;
  setReceiverName: (name: string) => void;
  setSenderName: (name: string) => void;
  setRelationship: (rel: RelationshipCategory) => void;
  setVibe: (vibe: VibeCategory) => void;
  setPlan: (plan: PlanType) => void;
  setMediaMode: (mode: MediaMode) => void;
  setAvatarPairId: (avatarPairId: string) => void;
  setOccasion: (occ: OccasionType) => void;
  setTheme: (themeId: ThemeId) => void;
  setPersonality: (val: string) => void;
  setFunnyMemory: (val: string) => void;
  setLoveDetail: (val: string) => void;
  setMidnightDrop: (enabled: boolean, dateStr?: string) => void;
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

      setReceiverName: (receiverName) =>
        set((state) => ({ currentGift: { ...state.currentGift, receiverName } })),

      setSenderName: (senderName) =>
        set((state) => ({ currentGift: { ...state.currentGift, senderName } })),

      setRelationship: (relationship) =>
        set((state) => ({ currentGift: { ...state.currentGift, relationship } })),

      setVibe: (vibe) =>
        set((state) => ({ currentGift: { ...state.currentGift, vibe } })),

      setPlan: (plan) =>
        set((state) => ({ currentGift: { ...state.currentGift, plan } })),

      setMediaMode: (mediaMode) =>
        set((state) => ({ currentGift: { ...state.currentGift, mediaMode } })),

      setAvatarPairId: (avatarPairId) =>
        set((state) => ({ currentGift: { ...state.currentGift, avatarPairId } })),

      setOccasion: (occasion) =>
        set((state) => ({ currentGift: { ...state.currentGift, occasion } })),

      setTheme: (themeId) =>
        set((state) => ({ currentGift: { ...state.currentGift, themeId } })),

      setPersonality: (personality) =>
        set((state) => ({ currentGift: { ...state.currentGift, personality } })),

      setFunnyMemory: (funnyMemory) =>
        set((state) => ({ currentGift: { ...state.currentGift, funnyMemory } })),

      setLoveDetail: (loveDetail) =>
        set((state) => ({ currentGift: { ...state.currentGift, loveDetail } })),

      setMidnightDrop: (enabled, dateStr) =>
        set((state) => ({
          currentGift: {
            ...state.currentGift,
            midnightDrop: {
              enabled,
              unlockDate: dateStr || new Date(Date.now() + 86400000).toISOString(),
              isLocked: enabled,
            },
          },
        })),

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
            relationship: state.currentGift.relationship,
            vibe: state.currentGift.vibe,
            receiverName: state.currentGift.receiverName,
            senderName: state.currentGift.senderName,
            personality: state.currentGift.personality,
            funnyMemory: state.currentGift.funnyMemory,
            loveDetail: state.currentGift.loveDetail,
          });

          set((s) => ({
            isAiGenerating: false,
            currentGift: {
              ...s.currentGift,
              themeId: res.themeId,
              whatsappShareText: res.whatsappShareText,
              roast: {
                enabled: s.currentGift.vibe === 'roast' || s.currentGift.vibe === 'unhinged',
                introText: res.roastIntro,
                roastMemories: s.currentGift.memories.map((m) => ({
                  imageUrl: m.url,
                  caption: m.roastCaption || m.caption || 'Unfiltered decision 💀',
                })),
                outroText: res.roastOutro,
              },
              notes: [
                {
                  id: `note_ai_${Date.now()}`,
                  author: s.currentGift.senderName || 'Me',
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
      name: 'memorybloom_draft_store_v3',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
