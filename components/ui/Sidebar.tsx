"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  GitBranch,
  BookOpen,
  Network,
  Compass,
  Feather,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Compass, label: "Dashboard" },
  { href: "/feed", icon: Sparkles, label: "Daily Feed" },
  { href: "/graph", icon: Network, label: "Knowledge Graph" },
  { href: "/notebook", icon: Feather, label: "Da Vinci Notebook" },
  { href: "/chains", icon: GitBranch, label: "Curiosity Chains" },
  { href: "/mental-models", icon: Brain, label: "Mental Models" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 glass-dark border-r border-amber-500/10 z-50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-amber-500/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center glow-gold">
            <GitBranch className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-gold-gradient">
              Curiosity
            </h1>
            <p className="text-xs text-amber-500/60 -mt-1">Engine</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-slate-400 hover:text-amber-300 hover:bg-amber-500/5"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-amber-400" : "text-slate-500 group-hover:text-amber-400"
                )}
              />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Da Vinci Quote */}
      <div className="p-4 border-t border-amber-500/10">
        <div className="glass rounded-lg p-3">
          <p className="text-xs text-amber-500/70 italic font-serif leading-relaxed">
            &ldquo;Learning never exhausts the mind.&rdquo;
          </p>
          <p className="text-xs text-amber-500/40 mt-1">— Leonardo Da Vinci</p>
        </div>
      </div>

      {/* API Status */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-navy-800/50">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-400">Claude AI Connected</span>
          <BookOpen className="w-3 h-3 text-slate-500 ml-auto" />
        </div>
      </div>
    </aside>
  );
}
