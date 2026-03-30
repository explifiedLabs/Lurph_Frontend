import React from "react";

export default function SidebarItem({
  icon: Icon,
  label,
  active,
  onClick,
  className = "",
  dot,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center w-full py-3  rounded-xl 
  transition relative group ${
    active ? "text-[#FFD600]" : "text-gray-400"
  } ${className}`}
    >
      <Icon
        className={`mx-auto ${
          active ? "text-[#FFD600]" : "text-gray-400 group-hover:text-[#FFD600]"
        }`}
        size={20}
      />
      <span
        className={`text-[11px] mt-1 ${
          active
            ? "font-semibold text-[#FFD600]"
            : "text-gray-500 group-hover:text-[#FFD600]"
        }`}
      >
        {label}
      </span>

      {/* Notification dot - kept pink/amber for contrast, or you can use FFD600 */}
      {dot && (
        <span className="absolute left-3 top-3 h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
      )}
    </button>
  );
}
