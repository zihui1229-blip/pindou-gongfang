import { BeadColor } from "../types/beadColor";

type PixelGridProps = {
  pattern: BeadColor[][];
};

export default function PixelGrid({
  pattern,
}: PixelGridProps) {
  if (pattern.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        🧩 拼豆预览
      </h2>

      <div
        className="grid gap-[1px] bg-gray-300 p-1 w-fit"
        style={{
          gridTemplateColumns: `repeat(${pattern[0].length}, 12px)`,
        }}
      >
        {pattern.flat().map((color, index) => (
          <div
            key={index}
            className="h-3 w-3"
            style={{
              backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
            }}
            title={`${color.id} - ${color.name}`}
          />
        ))}
      </div>
    </div>
  );
}