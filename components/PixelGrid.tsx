import type { BeadColor } from "../types/beadColor";
import Bead from "./Bead";

type PixelGridProps = {
  pattern: BeadColor[][];
  selectedColorId: number | null;
  onSelectColor: (colorId: number | null) => void;
};

function columnLabel(index: number): string {
  let result = "";
  let n = index;

  while (n >= 0) {
    result = String.fromCharCode((n % 26) + 65) + result;
    n = Math.floor(n / 26) - 1;
  }

  return result;
}

export default function PixelGrid({
  pattern,
  selectedColorId,
  onSelectColor,
}: PixelGridProps) {
  if (pattern.length === 0) {
    return null;
  }

  const cols = pattern[0].length;

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-black">
        🧸 拼豆圖預覽
      </h2>

      <div className="overflow-auto">
        <div
          className="grid gap-[2px]"
          style={{
            gridTemplateColumns: `32px repeat(${cols}, 14px)`,
            width: "fit-content",
          }}
        >
          {/* 左上角 */}
          <div />

          {/* 欄標 A、B、C... */}
          {Array.from({ length: cols }).map((_, col) => (
            <div
              key={col}
              className="flex h-[14px] w-[14px] items-center justify-center text-[10px] font-bold text-gray-600"
            >
              {columnLabel(col)}
            </div>
          ))}

          {/* 每一列 */}
          {pattern.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "contents",
              }}
            >
              {/* 行號 */}
              <div className="flex items-center justify-center text-xs font-bold text-gray-600">
                {rowIndex + 1}
              </div>

              {row.map((color, colIndex) => (
                <Bead
                  key={`${rowIndex}-${colIndex}`}
                  color={color}
                  selected={selectedColorId === color.id}
                  onClick={() =>
                    onSelectColor(
                      selectedColorId === color.id ? null : color.id
                    )
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}