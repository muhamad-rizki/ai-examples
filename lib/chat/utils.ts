export function generateRandomName() {
  const adjectives = [
    "Brisk",
    "Calm",
    "Bright",
    "Swift",
    "Bold",
    "Clever",
    "Sunny",
    "Lucky",
    "Witty",
    "Nimble",
  ];
  const nouns = [
    "Falcon",
    "River",
    "Echo",
    "Pine",
    "Aurora",
    "Comet",
    "Harbor",
    "Atlas",
    "Sage",
    "Nest",
  ];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 900 + 100); // 100-999
  return `${adj} ${noun} ${num}`;
}
