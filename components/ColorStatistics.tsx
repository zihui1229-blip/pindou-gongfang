import type { BeadColor } from "../types/beadColor";

type Props = {
  pattern: BeadColor[][];
  selectedColorId: number | null;
};

export default function ColorStatistics({
  pattern,
  selectedColorId,
}: Props) {
  if (pattern.length === 0) {
    return null;
  }

  const countMap = new Map<number, { color: BeadColor; count: number }>();

  pattern.flat().forEach((color) => {
    const item = countMap.get(color.id);

    if (item) {
      item.count++;
    } else {
      countMap.set(color.id, {
        color,
        count: 1,
      });
    }
  });

  const statistics = [...countMap.values()].sort(
    (a, b) => b.count - a.count
  );

  const total = pattern.flat().length;
  const colorCount = statistics.length;

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-black">
      <h2 className="mb-4 text-2xl font-bold">
        🎨 顏色統計
      </h2>

      <p className="mb-4 font-semibold">
        總拼豆數：{total} 顆
      </p>

      <p className="mb-6 font-semibold">
        使用顏色：{colorCount} 種
      </p>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">顏色</th>
            <th className="py-2 text-left">名稱</th>
            <th className="py-2 text-right">數量</th>
            <th className="py-2 text-right">比例</th>
          </tr>
        </thead>

        <tbody>
          {statistics.map(({ color, count }) => {
            const selected = selectedColorId === color.id;

            return (
              <tr
                key={color.id}
                className={`border-b transition ${
                  selected ? "bg-blue-100" : ""
                }`}
              >
                <td className="py-2">
                  <div
                    className="h-6 w-6 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    }}
                  />
                </td>

                <td className="py-2 font-medium">
                  {color.id} - {color.name}
                </td>

                <td className="py-2 text-right">
                  {count}
                </td>

                <td className="py-2 text-right">
                  {((count / total) * 100).toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}