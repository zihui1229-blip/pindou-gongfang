import type { BeadColor } from "../types/beadColor";

type PixelGridProps = {
  pattern: BeadColor[][];
};

export default function PixelGrid({ pattern }: PixelGridProps) {
  if (pattern.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-bold text-gray-700">
        🧸 拼豆图预览
      </h2>

      <div
        className="grid gap-0 border border-gray-300"
        style={{
          gridTemplateColumns: `repeat(${pattern[0].length}, 12px)`,
          width: "fit-content",
        }}
      >
        {pattern.flat().map((color, index) => (
          <div
            key={index}
            title={`${color.id} - ${color.name}`}
            style={{
              width: 12,
              height: 12,
              backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          />
        ))}
      </div>
    </div>
  );
}