import React from "react";
import { Star, Frown, Meh, Smile } from "lucide-react";

export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-[#1A1D23] border border-slate-800/60 rounded-2xl shadow-xl backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);

export const Label = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
    <Icon size={18} className="text-rose-400" />
    <span>{label}</span>
  </div>
);

export const RatingSelector = ({
  value,
  onChange,
  max = 5,
  icon: Icon,
  type = "default",
  colorClass = "text-rose-500",
}: {
  value: number;
  onChange: (val: number) => void;
  max?: number;
  icon?: any;
  type?: "default" | "faces";
  colorClass?: string;
}) => {
  const getIcon = (index: number) => {
    if (type === "faces") {
      if (index === 1) return Frown;
      if (index === 2) return Frown;
      if (index === 3) return Meh;
      return Smile;
    }
    return Icon || Star;
  };

  return (
    <div className="flex justify-between items-center w-full px-2">
      {Array.from({ length: max }).map((_, i) => {
        const ratingValue = i + 1;
        const CurrentIcon = getIcon(ratingValue);
        const isActive = ratingValue <= value;

        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(ratingValue)}
            className="group transition-all duration-200 transform hover:scale-110 focus:outline-none flex flex-col items-center gap-2"
          >
            <CurrentIcon
              size={32}
              className={`transition-all duration-300 ${
                isActive
                  ? `${colorClass} drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]`
                  : "text-slate-700 hover:text-slate-500"
              }`}
              fill={isActive && type !== "faces" ? "currentColor" : "none"}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <span
              className={`text-[10px] font-bold transition-colors ${isActive ? "text-slate-300" : "text-slate-700"}`}
            >
              {ratingValue}
            </span>
          </button>
        );
      })}
    </div>
  );
};
