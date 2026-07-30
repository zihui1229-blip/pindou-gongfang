import type { BeadColor } from "../types/beadColor";

export function renderPatternToCanvas(
  pattern: BeadColor[][],
  beadSize = 20
): HTMLCanvasElement {
  const rows = pattern.length;
  const cols = pattern[0]?.length ?? 0;

  const canvas = document.createElement("canvas");
  canvas.width = cols * beadSize;
  canvas.height = rows * beadSize;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("無法建立 Canvas");
  }

  // 背景
  ctx.fillStyle = "#f3f4f6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 畫每一顆拼豆
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const color = pattern[y][x];

      const centerX = x * beadSize + beadSize / 2;
      const centerY = y * beadSize + beadSize / 2;
      const radius = beadSize * 0.42;

      // 拼豆顏色
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.fill();

      // 外框
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 中間的小孔
      ctx.beginPath();
      ctx.arc(centerX, centerY, beadSize * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.fill();
    }
  }

  return canvas;
}