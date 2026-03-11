"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Search,
  ChevronDown,
  Lightbulb,
  BookOpen,
  Target,
  Zap,
  Puzzle,
  Users,
  TrendingUp,
  FlaskConical,
  TriangleAlert,
} from "lucide-react";
import { Card, DisciplineBadge } from "@/components/ui/Card";
import {
  MENTAL_MODELS,
  MENTAL_MODEL_CATEGORIES,
  type MentalModel,
} from "@/lib/mentalModels";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Thinking: Brain,
  "Decision Making": Target,
  Systems: Puzzle,
  "Human Nature": Users,
  Science: FlaskConical,
  Economics: TrendingUp,
};

const CATEGORY_COLORS: Record<string, string> = {
  Thinking: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Decision Making": "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Systems: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  "Human Nature": "text-pink-400 bg-pink-500/10 border-pink-500/20",
  Science: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Economics: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
};

function CategoryBadge({ category }: { category: string }) {
  const colors =
    CATEGORY_COLORS[category] ||
    "text-slate-400 bg-slate-500/10 border-slate-500/20";
  const Icon = CATEGORY_ICONS[category] || Brain;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors}`}
    >
      <Icon className="w-3 h-3" />
      {category}
    </span>
  );
}

function ModelCard({ model, index }: { model: MentalModel; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Card
        className={`transition-all duration-300 ${
          isExpanded
            ? "border-amber-500/25"
            : "hover:border-amber-500/10"
        }`}
      >
        <button
          className="w-full text-left"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <CategoryBadge category={model.category} />
                <div className="flex flex-wrap gap-1">
                  {model.disciplines.slice(0, 3).map((d) => (
                    <DisciplineBadge
                      key={d}
                      discipline={d}
                      className="text-xs py-0"
                    />
                  ))}
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-1">
                {model.name}
              </h3>
              <p className="text-amber-300/70 text-sm italic">
                &ldquo;{model.tagline}&rdquo;
              </p>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-slate-500 flex-shrink-0 mt-2 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5 pt-5 border-t border-amber-500/10 overflow-hidden"
            >
              <div className="space-y-5">
                {/* Description */}
                <p className="text-slate-300 leading-relaxed">
                  {model.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Example */}
                  <div className="glass rounded-lg p-4 border border-amber-500/10">
                    <h4 className="text-sm font-semibold text-amber-300 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Example in the Wild
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {model.example}
                    </p>
                  </div>

                  {/* Applications */}
                  <div className="glass rounded-lg p-4 border border-cyan-500/10">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Key Applications
                    </h4>
                    <ul className="space-y-1.5">
                      {model.applications.map((app) => (
                        <li
                          key={app}
                          className="flex items-start gap-2 text-sm text-slate-400"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 flex-shrink-0 mt-1.5" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pitfalls */}
                  <div className="glass rounded-lg p-4 border border-red-500/10">
                    <h4 className="text-sm font-semibold text-red-300 mb-2 flex items-center gap-2">
                      <TriangleAlert className="w-4 h-4" />
                      Common Pitfalls
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {model.pitfalls}
                    </p>
                  </div>

                  {/* Origin */}
                  <div className="glass rounded-lg p-4 border border-purple-500/10">
                    <h4 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Origins &amp; History
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {model.origin}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

export default function MentalModelsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return MENTAL_MODELS.filter((m) => {
      const q = search.toLowerCase();
      const matchesSearch =
        q === "" ||
        m.name.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.disciplines.some((d) => d.toLowerCase().includes(q));
      const matchesCategory =
        !selectedCategory || m.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of MENTAL_MODEL_CATEGORIES) {
      counts[cat] = MENTAL_MODELS.filter((m) => m.category === cat).length;
    }
    return counts;
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-4xl font-bold text-gold-gradient mb-2">
          Mental Models Library
        </h1>
        <p className="text-slate-400 max-w-2xl leading-relaxed">
          The cognitive frameworks the world&apos;s greatest thinkers use to understand reality.
          Master these models to think more clearly, decide more wisely, and see further than
          those who reason only from experience.
        </p>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <div className="glass rounded-xl p-4 border border-amber-500/10 text-center">
          <p className="text-2xl font-bold text-amber-400">{MENTAL_MODELS.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Mental Models</p>
        </div>
        <div className="glass rounded-xl p-4 border border-amber-500/10 text-center">
          <p className="text-2xl font-bold text-cyan-400">{MENTAL_MODEL_CATEGORIES.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Categories</p>
        </div>
        <div className="glass rounded-xl p-4 border border-amber-500/10 text-center">
          <p className="text-2xl font-bold text-emerald-400">
            {Array.from(new Set(MENTAL_MODELS.flatMap((m) => m.disciplines))).length}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Disciplines</p>
        </div>
      </motion.div>

      {/* Search and filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-8 space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mental models, categories, disciplines..."
            className="w-full border border-amber-500/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/30 transition-colors"
            style={{ background: "rgba(10, 22, 40, 0.5)" }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              !selectedCategory
                ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                : "text-slate-500 border-slate-700 hover:border-amber-500/20 hover:text-amber-400"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            All ({MENTAL_MODELS.length})
          </button>
          {MENTAL_MODEL_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] || Brain;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(isActive ? null : cat)
                }
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  isActive
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    : "text-slate-500 border-slate-700 hover:border-amber-500/20 hover:text-amber-400"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat} ({categoryCounts[cat]})
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Results count */}
      {(search || selectedCategory) && (
        <p className="text-sm text-slate-500 mb-4">
          Showing {filtered.length} of {MENTAL_MODELS.length} models
          {selectedCategory && ` in ${selectedCategory}`}
          {search && ` matching "${search}"`}
        </p>
      )}

      {/* Models list */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((model, i) => (
            <ModelCard key={model.id} model={model} index={i} />
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className="text-center py-12">
              <Brain className="w-16 h-16 text-amber-500/20 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No mental models match your search</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory(null);
                }}
                className="text-sm text-amber-500/70 hover:text-amber-400 transition-colors"
              >
                Clear filters
              </button>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Da Vinci method section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 glass rounded-2xl p-8 border border-amber-500/10"
      >
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center glow-gold">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-gold-gradient mb-2">
              How Da Vinci Used Mental Models
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Leonardo Da Vinci intuitively used first principles thinking, systems thinking,
              and inversion across all his domains. He observed birds to understand flight — not
              by imitating bird form but by identifying the underlying principles, then applying
              them differently. He used inversion in anatomy: to understand the living body, he
              systematically studied death and decay. He saw feedback loops in water turbulence
              and the spiraling growth of plants. Mental models aren&apos;t modern inventions —
              great thinkers have always reasoned this way. These are the patterns behind the patterns.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
