import { NODE_INDEX } from "../utils/nodePalette";

export default function NodeConfigModal({ node, onClose, onSave, onDelete }) {
  if (!node) return null;

  const definition = NODE_INDEX[node.data.typeId];
  const fields = definition?.fields || [];

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updated = {};
    fields.forEach((field) => {
      updated[field.key] = formData.get(field.key) || "";
    });
    onSave(updated);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="w-[520px] max-w-[90vw] rounded-2xl border border-white/[0.08] p-6"
        style={{ background: "#0b0b0b" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">Node Config</p>
            <h3 className="text-white text-lg font-bold mt-1">{definition?.label}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.key} className="flex flex-col gap-2 text-xs text-zinc-500">
              {field.label}
              {field.type === "textarea" ? (
                <textarea
                  name={field.key}
                  defaultValue={node.data.config?.[field.key] || ""}
                  placeholder={field.placeholder}
                  rows={4}
                  className="w-full rounded-xl bg-black/60 border border-white/[0.08] px-3 py-2 text-sm text-white outline-none focus:border-yellow-400/70"
                />
              ) : (
                <input
                  name={field.key}
                  defaultValue={node.data.config?.[field.key] || ""}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl bg-black/60 border border-white/[0.08] px-3 py-2 text-sm text-white outline-none focus:border-yellow-400/70"
                />
              )}
            </label>
          ))}
          <div className="flex items-center justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => onDelete?.(node.id)}
              className="px-4 py-2 rounded-xl border border-red-500/40 text-xs font-semibold text-red-300 hover:text-white"
            >
              Delete Node
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/[0.08] text-xs font-semibold text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold text-black"
              style={{ background: "#FFD600" }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
