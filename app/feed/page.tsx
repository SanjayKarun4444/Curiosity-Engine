"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  RefreshCw,
  BookOpen,
  ChevronRight,
  Lightbulb,
  Link2,
  HelpCircle,
} from "lucide-react";
import { Card, DisciplineBadge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatDate, formatRelativeTime } from "@/lib/utils";

interface DailyCuriosity {
  id: string;
  title: string;
  fact: string;
  explanation: string;
  significance: string;
  history: string;
  connections: string;
  questions: string;
  discipline: string;
  date: string;
  createdAt: string;
  nodeId: string | null;
}

const DISCIPLINES = [
  "All",
  "Physics",
  "Biology",
  "Mathematics",
  "Philosophy",
  "Engineering",
  "Art",
  "History",
  "Psychology",
  "Astronomy",
  "Chemistry",
  "Neuroscience",
  "Economics",
];

export default function FeedPage() {
  const [today, setToday] = useState<DailyCuriosity | null>(null);
  const [all, setAll] = useState<DailyCuriosity[]>([]);
  const [filtered, setFiltered] = useState<DailyCuriosity[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    loadCuriosities();
  }, []);

  useEffect(() => {
    if (selectedDiscipline === "All") {
      setFiltered(all);
    } else {
      setFiltered(all.filter((c) => c.discipline === selectedDiscipline));
    }
  }, [selectedDiscipline, all]);

  async function loadCuriosities() {
    try {
      const res = await fetch("/api/curiosity");
      const data = await res.json();
      setToday(data.today || null);
      setAll(data.all || []);
      setFiltered(data.all || []);
    } catch (error) {
      console.error("Error loading curiosities:", error);
    } finally {
      setLoading(false);
    }
  }

  async function generateNew(discipline?: string) {
    setGenerating(true);
    try {
      const res = await fetch("/api/curiosity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discipline, force: true }),
      });
      const data = await res.json();
      setToday(data);
      setAll((prev) => [data, ...prev.filter((c) => c.id !== data.id)]);
    } catch (error) {
      console.error("Error generating curiosity:", error);
    } finally {
      setGenerating(false);
    }
  }

  function parseJSON(str: string): string[] {
    try {
      return JSON.parse(str) as string[];
    } catch {
      return [];
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-4xl font-bold text-gold-gradient mb-2">
          Daily Curiosity Feed
        </h1>
        <p className="text-slate-400">
          AI-generated intellectual discoveries across disciplines — {formatDate(new Date())}
        </p>
      </motion.div>

      {/* Generate Button */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button
          onClick={() => generateNew()}
          loading={generating}
          icon={<Sparkles className="w-4 h-4" />}
          size="lg"
        >
          {today ? "Generate New Discovery" : "Generate Today's Discovery"}
        </Button>
        {DISCIPLINES.filter((d) => d !== "All").slice(0, 4).map((d) => (
          <Button
            key={d}
            variant="secondary"
            size="sm"
            onClick={() => generateNew(d)}
            loading={generating}
          >
            {d}
          </Button>
        ))}
      </div>

      {/* Today's Featured Discovery */}
      {loading ? (
        <Card className="h-64 shimmer mb-8" />
      ) : today ? (
        <motion.div
          key={today.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">
              Featured Discovery
            </span>
            <span className="text-slate-500 text-sm">• {formatRelativeTime(today.createdAt)}</span>
          </div>

          <Card className="border-amber-500/20 glow-gold">
            <div className="flex items-start justify-between mb-4">
              <DisciplineBadge discipline={today.discipline} />
              <div className="flex gap-2">
                <Link href={`/explore/${today.id}`}>
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={<BookOpen className="w-4 h-4" />}
                  >
                    Deep Dive
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  icon={<RefreshCw className="w-4 h-4" />}
                  onClick={() => generateNew(today.discipline)}
                  loading={generating}
                >
                  Refresh
                </Button>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-white mb-3 leading-tight">
              {today.title}
            </h2>

            <p className="text-amber-200/80 text-base leading-relaxed mb-4 font-serif italic">
              &ldquo;{today.fact}&rdquo;
            </p>

            <p className="text-slate-400 leading-relaxed mb-6">
              {today.explanation}
            </p>

            {/* Expandable sections */}
            <AnimatePresence>
              {expanded === today.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 mb-6"
                >
                  {/* Significance */}
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <h4 className="text-sm font-semibold text-amber-300">
                        Why This Matters
                      </h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {today.significance}
                    </p>
                  </div>

                  {/* History */}
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-semibold text-cyan-300">
                        Historical Context
                      </h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {today.history}
                    </p>
                  </div>

                  {/* Connections */}
                  {parseJSON(today.connections).length > 0 && (
                    <div className="glass rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Link2 className="w-4 h-4 text-purple-400" />
                        <h4 className="text-sm font-semibold text-purple-300">
                          Unexpected Connections
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {parseJSON(today.connections).map((conn, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-slate-400"
                          >
                            <span className="text-purple-500 mt-1">→</span>
                            {conn}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Questions */}
                  {parseJSON(today.questions).length > 0 && (
                    <div className="glass rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <HelpCircle className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-semibold text-emerald-300">
                          Questions to Ponder
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {parseJSON(today.questions).map((q, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-slate-400 italic"
                          >
                            <span className="text-emerald-500 mt-1 not-italic">{i + 1}.</span>
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded(expanded === today.id ? null : today.id)}
              className="flex items-center gap-2 text-sm text-amber-500/70 hover:text-amber-400 transition-colors"
            >
              <span>{expanded === today.id ? "Show Less" : "Explore Further"}</span>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  expanded === today.id ? "rotate-90" : ""
                }`}
              />
            </button>
          </Card>
        </motion.div>
      ) : (
        <Card className="text-center py-16 mb-8">
          <Sparkles className="w-16 h-16 text-amber-500/30 mx-auto mb-4" />
          <h3 className="font-serif text-xl text-amber-300 mb-2">
            No Discovery Yet Today
          </h3>
          <p className="text-slate-500 mb-6">
            Click the button above to generate today&apos;s intellectual discovery
          </p>
        </Card>
      )}

      {/* Filter Tabs */}
      {all.length > 0 && (
        <div className="mb-6">
          <h2 className="font-serif text-xl font-semibold text-amber-300 mb-4">
            All Discoveries
          </h2>
          <div className="flex flex-wrap gap-2">
            {DISCIPLINES.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDiscipline(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedDiscipline === d
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "text-slate-500 hover:text-amber-400 border border-transparent hover:border-amber-500/20"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Previous Discoveries Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((curiosity, i) => (
            <motion.div
              key={curiosity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                glow
                className="h-full hover:border-amber-500/25 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <DisciplineBadge discipline={curiosity.discipline} />
                  <span className="text-xs text-slate-500">
                    {formatRelativeTime(curiosity.createdAt)}
                  </span>
                </div>
                <h3 className="font-serif text-base font-semibold text-white mb-2 leading-tight line-clamp-2">
                  {curiosity.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {curiosity.fact}
                </p>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() =>
                      setExpanded(
                        expanded === curiosity.id ? null : curiosity.id
                      )
                    }
                    className="text-xs text-amber-500/70 hover:text-amber-400 transition-colors"
                  >
                    {expanded === curiosity.id ? "Collapse" : "Expand"}
                  </button>
                  <span className="text-slate-700">•</span>
                  <Link
                    href={`/explore/${curiosity.id}`}
                    className="text-xs text-cyan-500/70 hover:text-cyan-400 transition-colors"
                  >
                    Deep Dive →
                  </Link>
                </div>

                <AnimatePresence>
                  {expanded === curiosity.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-amber-500/10 space-y-3"
                    >
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {curiosity.explanation}
                      </p>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {curiosity.significance}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
