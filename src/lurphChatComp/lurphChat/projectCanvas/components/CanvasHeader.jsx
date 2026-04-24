export default function CanvasHeader({ title, onDeleteSelected, hasSelection }) {
  return (
    <div
      className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]"
      style={{ background: "#080808" }}
    >
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        <p className="text-xs text-zinc-500 mt-1">Drag nodes, connect success/error paths</p>
      </div>
      <div className="flex items-center gap-3">
        {hasSelection && (
          <button
            onClick={onDeleteSelected}
            className="px-3 py-1.5 rounded-lg border border-red-500/40 text-xs font-semibold text-red-300 hover:text-white"
          >
            Delete selected
          </button>
        )}
        <div className="text-xs text-zinc-500">Frontend demo</div>
      </div>
    </div>
  );
}
