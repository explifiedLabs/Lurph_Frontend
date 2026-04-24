import { NODE_CATEGORIES } from "../utils/nodePalette";

export default function NodePalette({ onDragStart }) {
  return (
    <div
      className="w-[260px] border-r border-white/[0.06] p-4"
      style={{ background: "#070707" }}
    >
      <div className="text-xs font-semibold text-zinc-400 mb-4">Node Palette</div>
      <div className="flex flex-col gap-5">
        {NODE_CATEGORIES.map((category) => (
          <div key={category.title}>
            <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 mb-2">
              {category.title}
            </div>
            <div className="flex flex-col gap-2">
              {category.items.map(({ id, label, Icon, color }) => (
                <div
                  key={id}
                  draggable
                  onDragStart={(e) => onDragStart(e, id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(12,12,12,0.9)",
                    cursor: "grab",
                    color: "#d4d4d8",
                    fontSize: 12,
                    fontWeight: 600,
                    transition: "box-shadow 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${color}66`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      background: `${color}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color,
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
