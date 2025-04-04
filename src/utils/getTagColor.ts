const tagThemeColors: Record<string, string> = {
    Action: "hsl(0, 70%, 92%)",
    Adventure: "hsl(25, 85%, 92%)",
    Romance: "hsl(330, 70%, 92%)",
    "Slice of life": "hsl(199, 77%, 92%)",
    Drama: "hsl(270, 70%, 92%)",
    Comedy: "hsl(50, 85%, 92%)",
    Fantasy: "hsl(140, 60%, 92%)",
};

export function getTagColor(tag: string): string {
  if (tagThemeColors[tag]) return tagThemeColors[tag];

  // Otherwise, generate a soft pastel color from hash
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 90%)`; // soft fallback
}

export function darkenColor(hsl: string, amount: number = 10): string {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
  if (!match) return hsl;

  const [_, h, s, l] = match.map(Number);
  const newLightness = Math.max(0, l - amount);
  return `hsl(${h}, ${s}%, ${newLightness}%)`;
}
