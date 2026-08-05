import { AIStoryRequest, AIStoryResponse, ThemeId } from '@/types/gift';

export function runAIMemoryDirector(req: AIStoryRequest): AIStoryResponse {
  const promptLower = `${req.relationship} ${req.keyDetails}`.toLowerCase();
  
  // Theme Auto-Mapping based on prompt keywords
  let themeId: ThemeId = 'cute';
  if (promptLower.includes('galaxy') || promptLower.includes('space') || promptLower.includes('stars')) {
    themeId = 'galaxy';
  } else if (promptLower.includes('anime') || promptLower.includes('japan') || promptLower.includes('pink')) {
    themeId = 'anime';
  } else if (promptLower.includes('purple') || promptLower.includes('flower') || promptLower.includes('garden')) {
    themeId = 'flowers';
  } else if (promptLower.includes('travel') || promptLower.includes('paris') || promptLower.includes('vintage')) {
    themeId = 'retro';
  } else if (promptLower.includes('luxury') || promptLower.includes('gold') || promptLower.includes('wedding')) {
    themeId = 'luxury';
  } else if (promptLower.includes('nature') || promptLower.includes('green') || promptLower.includes('hike')) {
    themeId = 'nature';
  } else if (promptLower.includes('party') || promptLower.includes('neon') || promptLower.includes('21')) {
    themeId = 'neon';
  }

  // Emotion-driven letter generation
  let generatedLetter = `Dearest ${req.receiverName || 'Friend'},\n\nEvery memory we share is a small piece of magic. Looking back at our journey together, I realized how much light and happiness you bring into my world. Thank you for being you.\n\nAlways & Forever ❤️`;

  if (req.emotion === 'loved') {
    generatedLetter = `To my favorite human, ${req.receiverName || 'Emily'} ❤️,\n\nSome people make the world brighter just by being in it. You are that person for me. From our quiet moments to our biggest adventures, every single second with you is a gift I hold close to my heart.\n\nHere's to a lifetime of memories together ✨`;
  } else if (req.emotion === 'emotional') {
    generatedLetter = `For ${req.receiverName || 'you'},\n\nWords rarely capture what the heart truly feels. Through every high and low, you've been my constant anchor. I compiled these memories so you'll never forget how deeply you are cherished.\n\nWith all my love 🥹❤️`;
  } else if (req.emotion === 'funny') {
    generatedLetter = `Hey ${req.receiverName || 'Bestie'}! 😂,\n\nWe've survived our worst decisions, shared inside jokes nobody else understands, and somehow made it this far without getting arrested! Here are some of our iconic moments.\n\nStay legendary! 🔥✨`;
  } else if (req.emotion === 'nostalgic') {
    generatedLetter = `Remember when, ${req.receiverName || 'my friend'}? 📜,\n\nIt feels like yesterday when our story began. Time flies, but these photos are proof that the best memories never fade.\n\nNever stop dreaming! 🌟`;
  }

  return {
    themeId,
    suggestedChapters: ['We Met', 'Crazy Days', 'Best Memories', 'Today'],
    generatedLetter,
    suggestedMusic: 'Soft Ambient Piano & Strings',
    suggestedPaletteName: themeId.toUpperCase(),
  };
}
