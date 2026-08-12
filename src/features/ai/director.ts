import { AIStoryRequest, AIStoryResponse, ThemeId, VibeCategory, RelationshipCategory } from '@/types/gift';

export function runAIMemoryDirector(req: AIStoryRequest): AIStoryResponse {
  const name = req.receiverName || 'my favorite human';
  const sender = req.senderName || 'Me';

  // Map Vibe to Theme
  let themeId: ThemeId = 'soft';
  switch (req.vibe) {
    case 'roast':
    case 'unhinged':
      themeId = 'chaotic';
      break;
    case 'bro_code':
      themeId = 'bro_code';
      break;
    case 'romantic':
      themeId = 'romantic';
      break;
    case 'delulu':
      themeId = 'delulu';
      break;
    case 'main_character':
      themeId = 'main_character';
      break;
    case 'emotional':
      themeId = 'midnight';
      break;
    case 'wholesome':
    default:
      themeId = 'soft';
      break;
  }

  // Gen-Z Copy Generation Templates
  let generatedLetter = '';
  let openingText = '';
  let closingMessage = '';
  let roastIntro = "Okay... we've reviewed the evidence. 💀";
  let roastOutro = "Okay okay... we love you ❤️";
  let whatsappShareText = `Yo ${name}, I made something for you 👀 Don't open this around other people 😂👇`;

  if (req.vibe === 'roast' || req.vibe === 'unhinged') {
    openingText = `Proceed with emotional damage. 🔥`;
    generatedLetter = `Happy birthday ${name}! 🎉\n\nYou've somehow managed to survive another year despite making decisions that would concern a government investigation.\n\n${req.funnyMemory ? `Never forget when ${req.funnyMemory}. ` : ''}We've collected photographic evidence below. You're chaotic, unhinged, and completely irreplaceable.\n\nStay legendary 💀❤️`;
    closingMessage = `Your 'Happy Birthday' text could never. Happy Birthday ${name}! 🎂🔥`;
    whatsappShareText = `Yo ${name}, I made a mini roast website for your birthday 💀 Don't cry okay 👇`;
  } else if (req.vibe === 'bro_code') {
    openingText = `Happy birthday to the guy with zero survival instincts. 🗿`;
    generatedLetter = `Yo ${name},\n\nHappy birthday bro! Another year of you being the absolute menace of our group.\n\n${req.funnyMemory ? `Remember when ${req.funnyMemory}? Classic. ` : ''}Thanks for always having my back and being a real one.\n\nDrinks on me! 🗿🍺`;
    closingMessage = `Bro Code Approved. Happy Birthday ${name}! 🍻`;
    whatsappShareText = `Yo bro, made something for your birthday 👀 Check this out before opening gifts 👇`;
  } else if (req.vibe === 'romantic') {
    openingText = `Another year of you being my favorite notification. ❤️`;
    generatedLetter = `My love, ${name} ❤️,\n\nSome people make the world brighter just by existing in it. You are that person for me.\n\n${req.loveDetail ? `I love ${req.loveDetail}. ` : ''}From quiet coffee mornings to late-night talks, every second with you is my favorite memory.\n\nHappy Birthday to my main character ✨`;
    closingMessage = `Forever & Always, ${sender} ❤️`;
    whatsappShareText = `Made a little surprise for your special day my love ❤️ Open when you're alone 👇`;
  } else if (req.vibe === 'delulu') {
    openingText = `Delulu is the solulu. Happy Birthday Queen! 💅✨`;
    generatedLetter = `Happy Birthday ${name}! 🌸✨\n\nYou aren't aging, you're just leveling up your main character energy.\n\n${req.personality ? `Being ${req.personality} is literally your superpower. ` : ''}Never let anyone dim your sparkle!\n\nSlay all day 👑💅`;
    closingMessage = `Main Character Energy Certified ✨`;
    whatsappShareText = `OMG I made a birthday surprise for you 🌸✨ Tap to open Queen 👇`;
  } else if (req.vibe === 'main_character') {
    openingText = `Spotlight on. The main character was born today. 👑`;
    generatedLetter = `Dearest ${name},\n\nToday is officially your world, we're all just living in it. Happy Birthday!\n\n${req.funnyMemory ? `Throwback to ${req.funnyMemory}! ` : ''}May your year be filled with iconic fits, zero drama, and endless wins.\n\nKeep shining 🌟`;
    closingMessage = `Certified Main Character Moment 🎬`;
    whatsappShareText = `Attention: It's ${name}'s birthday! Made an interactive surprise for you 👀👇`;
  } else {
    // Wholesome / Emotional
    openingText = `Not a birthday wish. A whole experience. 🥹`;
    generatedLetter = `Dear ${name} 🥹,\n\nWords rarely capture what the heart truly feels. You've been a light through every season of life.\n\n${req.loveDetail ? `I cherish ${req.loveDetail}. ` : ''}I compiled these memories so you'll never forget how deeply you are loved.\n\nHappy Birthday! ❤️`;
    closingMessage = `Made with memories, not Canva. With all my love, ${sender} ❤️`;
    whatsappShareText = `Hey ${name}, I made a little birthday surprise for you 🥹❤️ Take a look 👇`;
  }

  return {
    themeId,
    openingText,
    generatedLetter,
    closingMessage,
    roastIntro,
    roastOutro,
    whatsappShareText,
    suggestedChapters: ['The Evidence 📸', 'Unfiltered Moments 🍿', 'Why We Love You ❤️'],
  };
}
