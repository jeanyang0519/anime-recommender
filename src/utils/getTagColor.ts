export function getTagColor(tag: string): string {
    // Simple hash from tag text
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    // Generate hue from hash (0-360)
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 85%)`; // soft pastel background
  }
  