import { Handle, Position } from "reactflow";

export default function LurphNode({ data, selected }) {
  const { Icon, label, color } = data;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px",
        background: "rgba(12,12,12,0.95)",
        border: `1px solid ${selected ? color : `${color}55`}`,
        boxShadow: selected ? `0 0 0 2px ${color}33` : "none",
        borderRadius: 12,
        color: "#e5e7eb",
        fontSize: 12,
        fontWeight: 600,
        minWidth: 160,
        position: "relative",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{
          width: 10,
          height: 10,
          border: "2px solid #1f2937",
          background: "#0b0b0b",
        }}
      />
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
          flexShrink: 0,
        }}
      >
        <Icon size={14} />
      </div>
      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {label}
      </span>
      <Handle
        type="source"
        position={Position.Right}
        id="success"
        style={{
          width: 10,
          height: 10,
          top: "38%",
          border: "2px solid #1f2937",
          background: color,
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="error"
        style={{
          width: 10,
          height: 10,
          top: "70%",
          border: "2px solid #1f2937",
          background: "#ef4444",
        }}
      />
    </div>
  );
}
