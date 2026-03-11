"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  Plus,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Network,
  X,
} from "lucide-react";
import { Card, DisciplineBadge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatRelativeTime } from "@/lib/utils";

interface ChainStep {
  id: string;
  stepOrder: number;
  question: string;
  node: {
    id: string;
    title: string;
    discipline: string;
    content: string;
  };
}

interface Chain {
  id: string;
  title: string;
  startTopic: string;
  createdAt: string;
  steps: ChainStep[];
}

const SUGGESTED_TOPICS = [
  "How does the brain form memories?",
  "The physics of time",
  "Why do languages die?",
  "How do viruses evolve?",
  "The mathematics of music",
  "Why do we dream?",
  "How does money work?",
  "The nature of consciousness",
  "How did language evolve?",
  "Why does art move us?",
];

export default function ChainsPage() {
  const [chains, setChains] = useState<Chain[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [expandedChain, setExpandedChain] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadChains();
  }, []);

  async function loadChains() {
    try {
      const res = await fetch("/api/chains");
      const data = await res.json();
      setChains(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading chains:", err);
    } finally {
      setLoading(false);
    }
  }

  async function generateChain() {
    if (!topic.trim()) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/chains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) throw new Error("Failed to generate chain");
      const newChain = await res.json();
      setChains((prev) => [newChain, ...prev]);
      setExpandedChain(newChain.id);
      setTopic("");
      setShowInput(false);
    } catch (err) {
      console.error("Error generating chain:", err);
      setError("Failed to generate chain. Please check your API key and try again.");
    } finally {
      setGenerating(false);
    }
  }

  function getDisciplinesInChain(chain: Chain): string[] {
    return Array.from(new Set(chain.steps.map((s) => s.node.discipline)));
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-4xl font-bold text-gold-gradient mb-2">
          Curiosity Chains
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Follow intellectual rabbit holes across disciplines. One question leads to another,
          weaving a chain of connected ideas across science, art, philosophy, and beyond.
        </p>
      </motion.div>

      {/* Generate section */}
      <div className="mb-8">
        <AnimatePresence mode="wait">
          {showInput ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass rounded-xl p-5 border border-amber-500/20 mb-4"
            >
              <p className="text-sm text-slate-400 mb-3 font-medium">
                Start a curiosity chain from any topic:
              </p>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && generateChain()}
                  placeholder="e.g. Black holes, Evolution, Jazz music, Prime numbers..."
                  className="flex-1 border border-amber-500/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/30 transition-colors text-sm"
                  style={{ background: "rgba(10, 22, 40, 0.5)" }}
                  autoFocus
                />
                <Button
                  onClick={generateChain}
                  loading={generating}
                  disabled={!topic.trim()}
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  Generate Chain
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowInput(false);
                    setTopic("");
                    setError(null);
                  }}
                  icon={<X className="w-4 h-4" />}
                >
                  Cancel
                </Button>
              </div>

              {/* Suggestions */}
              <div>
                <p className="text-xs text-slate-600 mb-2">Or try one of these:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_TOPICS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setTopic(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-amber-500/10 text-slate-500 hover:text-amber-300 hover:border-amber-500/30 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="mt-3 text-sm text-red-400">{error}</p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                onClick={() => setShowInput(true)}
                icon={<Plus className="w-4 h-4" />}
                size="lg"
              >
                New Curiosity Chain
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading generation state */}
      {generating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <Card className="border-amber-500/20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
              <div>
                <p className="text-white font-medium">Generating curiosity chain...</p>
                <p className="text-slate-500 text-sm">
                  Following the thread of &ldquo;{topic}&rdquo; across disciplines
                </p>
              </div>
              <div className="ml-auto flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-6 rounded-full bg-amber-500/30"
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Chains list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 glass rounded-xl shimmer" />
          ))}
        </div>
      ) : chains.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center py-16">
            <GitBranch className="w-20 h-20 text-amber-500/20 mx-auto mb-6" />
            <h3 className="font-serif text-2xl text-amber-300 mb-3">
              No Curiosity Chains Yet
            </h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
              Start a chain from any topic and follow the thread of questions across disciplines.
              Each chain becomes a journey through connected ideas.
            </p>
            <Button
              onClick={() => setShowInput(true)}
              icon={<Plus className="w-4 h-4" />}
              size="lg"
            >
              Create Your First Chain
            </Button>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {chains.map((chain, chainIdx) => {
            const isExpanded = expandedChain === chain.id;
            const disciplines = getDisciplinesInChain(chain);

            return (
              <motion.div
                key={chain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: chainIdx * 0.05 }}
              >
                <Card
                  className={`transition-all duration-300 ${
                    isExpanded
                      ? "border-amber-500/25 glow-gold"
                      : "hover:border-amber-500/15"
                  }`}
                >
                  {/* Chain header */}
                  <button
                    className="w-full text-left"
                    onClick={() =>
                      setExpandedChain(isExpanded ? null : chain.id)
                    }
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <GitBranch className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg font-semibold text-white mb-1 leading-tight">
                          {chain.title}
                        </h3>
                        <p className="text-sm text-slate-500 mb-2">
                          Started from:{" "}
                          <span className="text-amber-500/70">
                            {chain.startTopic}
                          </span>{" "}
                          •{" "}
                          <span className="text-slate-600">
                            {formatRelativeTime(chain.createdAt)}
                          </span>
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {disciplines.map((d) => (
                            <DisciplineBadge
                              key={d}
                              discipline={d}
                              className="text-xs"
                            />
                          ))}
                          <span className="text-xs text-slate-600 ml-1">
                            • {chain.steps.length} steps
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 flex-shrink-0 mt-1 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded chain steps */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-amber-500/10 overflow-hidden"
                      >
                        <div className="relative">
                          {/* Connecting vertical line */}
                          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-amber-500/40 via-cyan-500/20 to-emerald-500/10" />

                          <div className="space-y-4">
                            {chain.steps.map((step, i) => (
                              <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07 }}
                                className="relative pl-14"
                              >
                                {/* Step number bubble */}
                                <div className="absolute left-0 w-10 h-10 rounded-full glass border border-amber-500/20 flex items-center justify-center z-10">
                                  <span className="text-amber-400 font-bold text-xs">
                                    {step.stepOrder}
                                  </span>
                                </div>

                                <div className="glass rounded-xl p-4 border border-amber-500/10 hover:border-amber-500/20 transition-colors">
                                  <DisciplineBadge
                                    discipline={step.node.discipline}
                                    className="mb-2"
                                  />
                                  <h4 className="font-serif text-base font-semibold text-white mb-2 leading-tight">
                                    {step.node.title}
                                  </h4>
                                  <p className="text-slate-400 text-sm leading-relaxed mb-3">
                                    {step.node.content.length > 250
                                      ? step.node.content.slice(0, 250) + "..."
                                      : step.node.content}
                                  </p>

                                  {i < chain.steps.length - 1 ? (
                                    <div className="flex items-start gap-2 pt-2 border-t border-amber-500/10">
                                      <ChevronRight className="w-4 h-4 text-amber-500/50 mt-0.5 flex-shrink-0" />
                                      <p className="text-xs text-amber-500/70 italic leading-relaxed">
                                        {step.question}
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="flex items-start gap-2 pt-2 border-t border-emerald-500/10">
                                      <Sparkles className="w-4 h-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />
                                      <p className="text-xs text-emerald-400/70 italic leading-relaxed">
                                        Open question: {step.question}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Graph link */}
                          <div className="mt-6 pt-4 border-t border-amber-500/10 pl-14">
                            <a
                              href="/graph"
                              className="inline-flex items-center gap-2 text-xs text-cyan-500/70 hover:text-cyan-400 transition-colors"
                            >
                              <Network className="w-3 h-3" />
                              <span>
                                These steps have been added to your Knowledge Graph
                              </span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Da Vinci inspiration */}
      {chains.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 glass rounded-2xl p-8 border border-amber-500/10"
        >
          <h3 className="font-serif text-xl font-bold text-gold-gradient mb-3">
            The Art of the Rabbit Hole
          </h3>
          <p className="text-slate-400 leading-relaxed">
            Da Vinci&apos;s notebooks never stayed on one topic. A study of water currents became
            a theory of flight. Anatomy led to engineering. Art became mathematics. He followed
            every question wherever it led — not because he lacked focus, but because he understood
            that reality is woven from the same threads. Every curiosity chain you follow deepens
            your understanding of the whole.
          </p>
        </motion.div>
      )}
    </div>
  );
}
