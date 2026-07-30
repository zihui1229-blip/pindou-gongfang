import { BeadColor } from "../types/beadColor";

export async function loadPalette(): Promise<BeadColor[]> {
  const response = await fetch("/palettes/221.json");

  if (!response.ok) {
    throw new Error("无法读取调色盘");
  }

  return response.json();
}