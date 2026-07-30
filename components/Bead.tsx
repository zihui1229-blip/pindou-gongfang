import type { BeadColor } from "../types/beadColor";

type BeadMode = "normal" | "number";

type BeadProps = {
  color: BeadColor;
  size?: number;
  mode?: BeadMode;
  selected?: boolean;
  onClick?: () => void;
};

export default function Bead({
  color,
  size = 14,
  mode = "normal",
  selected = false,
  onClick,
}: BeadProps) {
  const borderWidth = selected ? 2 : 1;
  const highlightSize = Math.max(2, Math.round(size * 0.3));

  return (
    <div
      title={`${color.id} - ${color.name}`}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
        borderRadius: "50%",
        border: `${borderWidth}px solid ${
          selected ? "#2563eb" : "rgba(0,0,0,0.12)"
        }`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        cursor: onClick ? "pointer" : "default",
        userSelect: "none",
        fontSize: Math.max(7, Math.round(size * 0.45)),
        fontWeight: "bold",
        color: "#111827",
      }}
    >
      {mode === "number" ? (
        color.id
      ) : (
        <div
          style={{
            width: highlightSize,
            height: highlightSize,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.45)",
          }}
        />
      )}
    </div>
  );
}