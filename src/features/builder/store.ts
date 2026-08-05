import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DigitalGift, EmotionCategory, MemoryItem, OccasionType, ThemeId, WrittenNote } from '@/types/gift';
import { runAIMemoryDirector } from '@/features/ai/director';

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem_1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop',
    caption: 'That unforgettable coffee date ☕✨',
    date: '2023-06-14',
    location: { name: 'Paris, France', year: '2023' },
    rotation: -4,
    tapeColor: '#F472B6',
    chapter: 'We Met',
  },
  {
    id: 'mem_2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop',
    caption: 'Sunset laughs at the beach 🌅💛',
    date: '2023-08-20',
    location: { name: 'Goa Coast', year: '2023' },
    rotation: 6,
    tapeColor: '#F59E0B',
    chapter: 'Crazy Days',
  },
  {
    id: 'mem_3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop',
    caption: 'Starry night celebration 🌌🎂',
    date: '2024-01-01',
    location: { name: 'Home Sweet Home', year: '2024' },
    rotation: -2,
    tapeColor: '#38BDF8',
    chapter: 'Best Memories',
  },
];

const INITIAL_NOTE: WrittenNote = {
  id: 'note_1',
  author: 'Alex',
  message: 'Some people deserve more than a gift. They deserve a memory they will never forget. Happy Birthday Emily ❤️',
  handwritingFont: 'Caveat',
  paperTexture: 'parchment',
};

interface BuilderState {
  currentGift: DigitalGift;
  currentStep: number;
  isAiGenerating: boolean;
  aiPromptInput: string;
  setReceiverName: (name: string) => void;
  setSenderName: (name: string) => void;
  setOccasion: (occ: OccasionType) => void;
  setEmotion: (emo: EmotionCategory) => void;
  setTheme: (themeId: ThemeId) => void;
  addMemory: (mem: Omit<MemoryItem, 'id'>) => void;
  removeMemory: (id: string) => void;
  reorderMemories: (memories: MemoryItem[]) => void;
  updateNote: (message: string, font?: WrittenNote['handwritingFont']) => void;
  setAiPromptInput: (input: string) => void;
  generateWithAiDirector: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetGift: () => void;
}

const DEFAULT_GIFT: DigitalGift = {
  id: 'gift_demo',
  receiverName: 'Emily ❤️',
  senderName: 'Alex',
  occasion: 'birthday',
  emotion: 'loved',
  themeId: 'cute',
  aiPrompt: 'She loves dogs, sister, turning 21, purple aesthetics.',
  memories: INITIAL_MEMORIES,
  notes: [INITIAL_NOTE],
  spotifyUrl: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
  createdAt: new Date().toISOString(),
  isWrapped: false,
  viewsCount: 12,
  replayCount: 4,
  reactions: [
    { emoji: '❤️', timestamp: '2 mins ago' },
    { emoji: '🥹', timestamp: ' Just now' },
  ],
  scenes: [
    { id: 'sc_1', type: 'intro' },
    { id: 'sc_2', type: 'constellation' },
    { id: 'sc_3', type: 'story_chapters' },
    { id: 'sc_4', type: 'memory_map' },
    { id: 'sc_5', type: 'envelope' },
    { id: 'sc_6', type: 'finale' },
  ],
};

export const useGiftBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      currentGift: DEFAULT_GIFT,
      currentStep: 1,
      isAiGenerating: false,
      aiPromptInput: '',

      setReceiverName: (receiverName) =>
        set((state) => ({
          currentGift: { ...state.currentGift, receiverName },
        })),

      setSenderName: (senderName) =>
        set((state) => ({
          currentGift: { ...state.currentGift, senderName },
        })),

      setOccasion: (occasion) =>
        set((state) => ({
          currentGift: { ...state.currentGift, occasion },
        })),

      setEmotion: (emotion) =>
        set((state) => ({
          currentGift: { ...state.currentGift, emotion },
        })),

      setTheme: (themeId) =>
        set((state) => ({
          currentGift: { ...state.currentGift, themeId },
        })),

      addMemory: (memData) =>
        set((state) => {
          const newMem: MemoryItem = {
            ...memData,
            id: `mem_${Date.now()}`,
            rotation: (Math.random() * 12 - 6),
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

      setAiPromptInput: (aiPromptInput) => set({ aiPromptInput }),

      generateWithAiDirector: () => {
        const state = get();
        set({ isAiGenerating: true });
        
        setTimeout(() => {
          const res = runAIMemoryDirector({
            relationship: state.aiPromptInput,
            receiverName: state.currentGift.receiverName,
            occasion: state.currentGift.occasion,
            emotion: state.currentGift.emotion,
            keyDetails: state.aiPromptInput,
          });

          set((s) => ({
            isAiGenerating: false,
            currentGift: {
              ...s.currentGift,
              themeId: res.themeId,
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
        }, 1200);
      },

      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      goToStep: (currentStep) => set({ currentStep }),

      resetGift: () =>
        set({
          currentGift: DEFAULT_GIFT,
          currentStep: 1,
          aiPromptInput: '',
        }),
    }),
    {
      name: 'memorybloom_draft_store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
