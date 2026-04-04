export const DEFAULT_GRADIENT =
  "linear-gradient(135deg, #87CEEB 0%, #98D8C8 50%, #B6E5D8 100%)"

export const MOOD_GRADIENTS: Record<string, string> = {
  "😢": "linear-gradient(135deg, #6B8CAE 0%, #7B9DC0 50%, #8FAFD0 100%)",
  "😔": "linear-gradient(135deg, #789EC4 0%, #88AECF 50%, #9BBEDD 100%)",
  "😐": "linear-gradient(135deg, #87CEEB 0%, #98D8C8 50%, #B6E5D8 100%)",
  "😊": "linear-gradient(135deg, #7EC8A4 0%, #90D4B8 50%, #A8E6CC 100%)",
  "😄": "linear-gradient(135deg, #52C9A2 0%, #65D4B2 50%, #85DFC4 100%)",
}

export function getMoodGradient(emoji: string | undefined | null): string {
  if (!emoji) return DEFAULT_GRADIENT
  return MOOD_GRADIENTS[emoji] ?? DEFAULT_GRADIENT
}
