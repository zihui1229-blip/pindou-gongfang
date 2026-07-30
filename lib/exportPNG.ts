import type { BeadColor } from "../types/beadColor";
import { renderPatternToCanvas } from "./renderPatternToCanvas";

export function exportPatternAsPNG(
  pattern: BeadColor[][],
  fileName = "pattern.png"
) {
  if (pattern.length === 0) {
    alert("請先生成拼豆圖！");
    return;
  }

  const canvas = renderPatternToCanvas(pattern);

  const link = document.createElement("a");
  link.download = fileName;
  link.href = canvas.toDataURL("image/png");
  link.click();
}