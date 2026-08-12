import { AIStoryRequest, AIStoryResponse, ThemeId, VibeCategory } from '@/types/gift';

export function runAIMemoryDirector(req: AIStoryRequest): AIStoryResponse {
  const name = req.receiverName || 'my favorite human';
  const sender = req.senderName || 'Me';

  // Map Vibe to Theme
  let themeId: ThemeId = 'pink_crush';
  switch (req.vibe) {
    case 'roast':
    case 'unhinged':
      themeId = 'toxic_bestie';
      break;
    case 'bro_code':
      themeId = 'emo';
      break;
    case 'romantic':
      themeId = 'pink_crush';
      break;
    case 'delulu':
      themeId = 'y2k';
      break;
    case 'main_character':
      themeId = 'cherry_bomb';
      break;
    case 'emotional':
      themeId = 'midnight';
      break;
    case 'wholesome':
    default:
      themeId = 'cloudcore';
      break;
  }

  // Conversational Intros
  let conversationalIntro = "someone has something to tell you 👀";
  if (req.vibe === 'roast' || req.vibe === 'unhinged') {
    conversationalIntro = "WARNING: emotional damage ahead 💀";
  } else if (req.vibe === 'romantic') {
    conversationalIntro = "okay… this one's for you ❤️";
  } else if (req.vibe === 'bro_code') {
    conversationalIntro = "bro… just open it 🗿";
  } else if (req.vibe === 'delulu') {
    conversationalIntro = "it's giving soulmate energy 🥀✨";
  }

  // Inside Joke AI Roast Caption
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
  let whatsappShareText = `Yo ${name}, I made a tiny internet universe for your birthday 👀 Don't open this around other people 😂👇`;

  if (req.vibe === 'roast' || req.vibe === 'unhinged') {
    generatedLetter = `Happy birthday ${name}! 🎉\n\nYou've somehow managed to survive another year despite making decisions that would concern a government investigation.\n\n${insideJokeRoast}\n\nYou're chaotic, unhinged, and completely irreplaceable. Stay legendary 💀❤️`;
    closingMessage = `Your 'happy birthday ❤️' text could never. Happy Birthday ${name}! 🎂🔥`;
  } else if (req.vibe === 'bro_code') {
    generatedLetter = `Yo ${name},\n\nHappy birthday bro! Another year of you being the absolute menace of our group.\n\n${insideJokeRoast}\n\nThanks for always having my back and being a real one. Drinks on me! 🗿🍺`;
    closingMessage = `Bro Code Approved. Happy Birthday ${name}! 🍻`;
  } else if (req.vibe === 'romantic') {
    generatedLetter = `My love, ${name} ❤️,\n\nSome people make the world brighter just by existing in it. You are that person for me.\n\n${req.loveDetail ? `I love ${req.loveDetail}. ` : ''}From quiet coffee mornings to late-night talks, every second with you is my favorite memory.\n\nHappy Birthday to my main character ✨`;
    closingMessage = `Forever & Always, ${sender} ❤️`;
  } else if (req.vibe === 'delulu') {
    generatedLetter = `Happy Birthday ${name}! 🌸✨\n\nYou aren't aging, you're just leveling up your main character energy.\n\n${req.personality ? `Being ${req.personality} is literally your superpower. ` : ''}Never let anyone dim your sparkle!\n\nSlay all day 👑💅`;
    closingMessage = `Main Character Energy Certified ✨`;
  } else {
    generatedLetter = `Dear ${name} 🥹,\n\nWords rarely capture what the heart truly feels. You've been a light through every season of life.\n\n${req.loveDetail ? `I cherish ${req.loveDetail}. ` : ''}I compiled these memories so you'll never forget how deeply you are loved.\n\nHappy Birthday! ❤️`;
    closingMessage = `Made with memories, not Canva. With all my love, ${sender} ❤️`;
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
    suggestedChapters: ['The Evidence 📸', 'Unfiltered Moments 🍿', 'Why We Love You ❤️'],
  };
}
