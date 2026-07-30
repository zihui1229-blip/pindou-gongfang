import { BeadColor } from "../types/beadColor";

export function findNearestColor(
  r: number,
  g: number,
  b: number,
  palette: BeadColor[]
): BeadColor {
  let nearest = palette[0];
  let minDistance = Number.MAX_VALUE;

  for (const color of palette) {
    const distance =
      (r - color.r) ** 2 +
      (g - color.g) ** 2 +
      (b - color.b) ** 2;

    if (distance < minDistance) {
      minDistance = distance;
      nearest = color;
    }
  }

  return nearest;
}