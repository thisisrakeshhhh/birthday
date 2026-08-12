import { AIStoryRequest, AIStoryResponse, ThemeId } from '@/types/gift';

export async function runAIMemoryDirector(req: AIStoryRequest): Promise<AIStoryResponse> {
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

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  // Live Gemini Flash API Integration
  if (apiKey) {
    try {
      const prompt = `You are the MemoryBloom Gen-Z AI Memory Director. Write a personalized birthday surprise experience for "${name}" from "${sender}".
Relationship: ${req.relationship}.
Vibe: ${req.vibe}.
Funny Memory / Inside Joke: ${req.funnyMemory || 'none'}.
Love Detail / Personality: ${req.loveDetail || req.personality || 'none'}.

Return strict JSON format with keys:
- generatedLetter: (2-3 paragraphs of warm, witty Gen-Z birthday letter)
- insideJokeRoast: (1 line funny roast or caption)
- roastIntro: (funny 1 line roast intro)
- roastOutro: (1 line roast outro)
- whatsappShareText: (short viral WhatsApp share line for recipient)`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          return {
            themeId,
            conversationalIntro,
            generatedLetter: parsed.generatedLetter || `Happy Birthday ${name}! 🎉`,
            insideJokeRoast: parsed.insideJokeRoast || `bro thought they were the main character here 💀`,
            closingMessage: `Made with magic for ${name} by ${sender} ✨`,
            roastIntro: parsed.roastIntro || "Okay... we've reviewed the evidence 💀",
            roastOutro: parsed.roastOutro || "Okay okay... we love you ❤️",
            whatsappShareText: parsed.whatsappShareText || `Yo ${name}, I made a tiny internet universe for your birthday 👀 Don't open this around other people 😂👇`,
            suggestedChapters: ['The Evidence 📸', 'Unfiltered Moments 🍿', 'Why We Love You ❤️'],
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API fetch fallback to local Gen-Z engine:', err);
    }
  }

  // Fallback Gen-Z Engine (Zero API Key Failure)
  let insideJokeRoast = '';
  if (req.insideJokeInput) {
    insideJokeRoast = `And somehow this person still thinks they're coordinated 💀 ("${req.insideJokeInput}")`;
  } else if (req.funnyMemory) {
    insideJokeRoast = `Remembering when ${req.funnyMemory} and nobody survived 😭`;
  } else {
    insideJokeRoast = `bro thought they were the main character here 💀`;
  }

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
