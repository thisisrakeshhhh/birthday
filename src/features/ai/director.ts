import { AIStoryRequest, AIStoryResponse, ThemeId } from '@/types/gift';

export function runAIMemoryDirector(req: AIStoryRequest): AIStoryResponse {
  const name = req.receiverName || 'my favorite human';
  const sender = req.senderName || 'Someone who cares';

  // Map Intent/Vibe to Theme
  let themeId: ThemeId = 'secret';
  if (req.intent === 'crush') {
    themeId = 'crush';
  } else if (req.intent === 'keep_anonymous' || req.familiarity === 'dont_know_name') {
    themeId = 'secret';
  } else if (req.intent === 'what_are_we') {
    themeId = 'delulu';
  } else if (req.intent === 'i_miss_you') {
    themeId = 'nostalgia';
  } else if (req.intent === 'roast') {
    themeId = 'chaotic';
  } else if (req.intent === 'i_love_you') {
    themeId = 'romantic';
  } else {
    themeId = 'midnight';
  }

  // Conversational Intros
  let conversationalIntro = "someone has something to tell you 👀";
  if (req.intent === 'keep_anonymous' || req.familiarity === 'dont_know_name') {
    conversationalIntro = "Someone has been noticing the little things 🕵️";
  } else if (req.intent === 'crush') {
    conversationalIntro = "okay… this is embarrassing 👀";
  } else if (req.intent === 'what_are_we') {
    conversationalIntro = "what are we? 🫠";
  } else if (req.intent === 'i_miss_you') {
    conversationalIntro = "I wasn't planning on sending this 🥀";
  } else if (req.intent === 'roast') {
    conversationalIntro = "WARNING: emotional damage ahead 💀";
  }

  // Clues for Anonymous Mode
  const clues = [
    { id: 'c1', label: 'CLUE 01', text: "You've probably seen me around before." },
    { id: 'c2', label: 'CLUE 02', text: 'You were wearing headphones and not paying attention.' },
    { id: 'c3', label: 'CLUE 03', text: 'I finally decided to say something.' },
  ];

  // Inside Joke AI Caption
  let insideJokeRoast = '';
  if (req.insideJokeInput) {
    insideJokeRoast = `And somehow this person still thinks they're coordinated 💀 ("${req.insideJokeInput}")`;
  } else if (req.funnyMemory) {
    insideJokeRoast = `Remembering when ${req.funnyMemory} and nobody survived 😭`;
  } else {
    insideJokeRoast = `bro thought they were the main character here 💀`;
  }

  // Gen-Z Copy Templates
  let generatedLetter = '';
  let closingMessage = '';
  let roastIntro = "Okay... we've reviewed the evidence 💀";
  let roastOutro = "Okay okay... we love you ❤️";
  let whatsappShareText = `Someone wants to tell you something 👀 Don't ask questions. Just open this 👇`;

  if (req.intent === 'crush') {
    generatedLetter = `I wasn't planning on saying this.\n\nThen I kept thinking about you.\n\nSo here we are. Maybe we should actually talk. ✨`;
    closingMessage = `Your move.`;
  } else if (req.intent === 'what_are_we') {
    generatedLetter = `Besties? Something more? Delusion?\n\nMaybe it's time we stop pretending we don't know what this is. 🫠`;
    closingMessage = `Let's figure this out.`;
  } else if (req.intent === 'i_miss_you') {
    generatedLetter = `I wasn't going to send this.\n\nThen a memory popped up, and I realized I still think about you.\n\nYou don't have to reply. Just wanted you to know. 🥀`;
    closingMessage = `Thinking of you.`;
  } else if (req.intent === 'roast') {
    generatedLetter = `Happy birthday ${name}! 🎉\n\nYou've somehow managed to survive another year despite making decisions that would concern a government investigation.\n\n${insideJokeRoast}\n\nYou're chaotic, unhinged, and completely irreplaceable. Stay legendary 💀❤️`;
    closingMessage = `Your 'happy birthday ❤️' text could never. Happy Birthday ${name}! 🎂🔥`;
  } else {
    generatedLetter = `Saying something without saying it.\n\n${req.rawInputText || 'Some feelings deserve an interactive story, not just a plain text message.'}\n\nMade with memories, specifically for you. ❤️`;
    closingMessage = `Made with feelings, not Canva.`;
  }

  return {
    themeId,
    conversationalIntro,
    generatedLetter,
    insideJokeRoast,
    closingMessage,
    roastIntro,
    roastOutro,
    whatsappShareText,
    clues,
    suggestedChapters: ['The Clues 🕵️', 'Shared Moments 📸', 'What Are We? 🫠'],
  };
}
