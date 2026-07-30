import type { BeadColor } from "../types/beadColor";

type BeadMode = "normal" | "number";

type BeadProps = {
  color: BeadColor;
  mode?: BeadMode;
  selected?: boolean;
  onClick?: () => void;
};

export default function Bead({
  color,
  mode = "normal",
  selected = false,
  onClick,
}: BeadProps) {
  return (
    <div
      title={`${color.id} - ${color.name}`}
      onClick={onClick}
      style={{
        width: 14,
        height: 14,
        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
        borderRadius: "50%",
        border: selected
          ? "2px solid #2563eb"
          : "1px solid rgba(0,0,0,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        cursor: onClick ? "pointer" : "default",
        fontSize: 8,
        fontWeight: "bold",
        color: "#111827",
      }}
    >
      {mode === "number" ? (
        color.id
      ) : (
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.45)",
          }}
        />
      )}
    </div>
  );
}