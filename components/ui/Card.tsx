import { cn } from "@/lib/utils";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, glow, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass rounded-xl p-6 transition-all duration-300",
        glow && "hover:glow-gold hover:border-amber-500/30",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

interface DisciplineBadgeProps {
  discipline: string;
  className?: string;
}

const disciplineColors: Record<string, string> = {
  Physics: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Biology: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Mathematics: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Philosophy: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Engineering: "bg-red-500/20 text-red-300 border-red-500/30",
  Art: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  History: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Psychology: "bg-lime-500/20 text-lime-300 border-lime-500/30",
  Astronomy: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Chemistry: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Neuroscience: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Economics: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
};

export function DisciplineBadge({ discipline, className }: DisciplineBadgeProps) {
  const colors =
    disciplineColors[discipline] ||
    "bg-slate-500/20 text-slate-300 border-slate-500/30";

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        colors,
        className
      )}
    >
      {discipline}
    </span>
  );
}
