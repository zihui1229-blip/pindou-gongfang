type ToolbarProps = {
  displayMode: "normal" | "number";
  setDisplayMode: React.Dispatch<
    React.SetStateAction<"normal" | "number">
  >;
};

export default function Toolbar({
  displayMode,
  setDisplayMode,
}: ToolbarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-bold text-black">
        🛠️ 工具列
      </h2>

      <button
        onClick={() =>
          setDisplayMode(
            displayMode === "normal"
              ? "number"
              : "normal"
          )
        }
        className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
      >
        {displayMode === "normal"
          ? "🔢 色號模式"
          : "🧸 拼豆模式"}
      </button>
    </div>
  )
}