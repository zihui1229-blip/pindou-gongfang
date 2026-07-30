type SizeSelectorProps = {
  value: number;
  onChange: (size: number) => void;
};

const sizes = [29, 48, 64, 96, 128];

export default function SizeSelector({
  value,
  onChange,
}: SizeSelectorProps) {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        📏 图纸尺寸
      </h2>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`rounded-xl px-5 py-3 font-bold transition ${
              value === size
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {size} × {size}
          </button>
        ))}
      </div>
    </div>
  );
}