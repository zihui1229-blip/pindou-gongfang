import { Pixel } from "../types/pixel";
import { BeadColor } from "../types/beadColor";
import { findNearestColor } from "./colorMatcher";

export function generatePattern(
  pixels: Pixel[][],
  palette: BeadColor[]
): BeadColor[][] {
  return pixels.map((row) =>
    row.map((pixel) =>
      findNearestColor(pixel.r, pixel.g, pixel.b, palette)
    )
  );
}