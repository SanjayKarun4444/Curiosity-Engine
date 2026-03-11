"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Feather,
  Plus,
  Lightbulb,
  HelpCircle,
  FlaskConical,
  Eye,
  Trash2,
  Save,
  BookOpen,
} from "lucide-react";
import { Card, DisciplineBadge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatRelativeTime } from "@/lib/utils";

interface NotebookEntry {
  id: string;
  title: string;
  content: string;
  type: string;
  nodeId: string | null;
  createdAt: string;
  updatedAt: string;
  node: {
    id: string;
    title: string;
    discipline: string;
  } | null;
}

const ENTRY_TYPES = [
  { value: "insight", label: "Insight", icon: Lightbulb, color: "text-amber-400" },
  { value: "question", label: "Question", icon: HelpCircle, color: "text-emerald-400" },
  { value: "hypothesis", label: "Hypothesis", icon: FlaskConical, color: "text-purple-400" },
  { value: "observation", label: "Observation", icon: Eye, color: "text-cyan-400" },
];

const THINKING_PROMPTS = [
  "What if the opposite were true?",
  "How does this connect to what I already know?",
  "What would Leonardo Da Vinci ask about this?",
  "What patterns do I notice?",
  "What assumptions am I making?",
  "What would change if I applied this to a different domain?",
  "What's the most surprising aspect of this?",
  "What don't I understand about this yet?",
];

export default function NotebookPage() {
  const [entries, setEntries] = useState<NotebookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<NotebookEntry | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("insight");
  const [prompt] = useState(
    THINKING_PROMPTS[Math.floor(Math.random() * THINKING_PROMPTS.length)]
  );

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const res = await fetch("/api/notebook");
      const data = await res.json();
      setEntries(data || []);
    } catch (error) {
      console.error("Error loading notebook:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveEntry() {
    if (!title.trim() || !content.trim()) return;

    setSaving(true);
    try {
      const res = await fetch("/api/notebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, type }),
      });
      const newEntry = await res.json();
      setEntries((prev) => [newEntry, ...prev]);
      setCreating(false);
      setTitle("");
      setContent("");
      setType("insight");
      setSelectedEntry(newEntry);
    } catch (error) {
      console.error("Error saving entry:", error);
    } finally {
      setSaving(false);
    }
  }

  async function deleteEntry(id: string) {
    try {
      await fetch(`/api/notebook?id=${id}`, { method: "DELETE" });
      setEntries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEntry?.id === id) {
        setSelectedEntry(null);
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  }

  const getTypeIcon = (t: string) => {
    const found = ENTRY_TYPES.find((et) => et.value === t);
    return found ? found.icon : Lightbulb;
  };

  const getTypeColor = (t: string) => {
    const found = ENTRY_TYPES.find((et) => et.value === t);
    return found ? found.color : "text-amber-400";
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-start justify-between"
      >
        <div>
          <h1 className="font-serif text-4xl font-bold text-gold-gradient mb-2">
            Da Vinci Notebook
          </h1>
          <p className="text-slate-400">
            Record your insights, questions, and hypotheses like the great polymath
          </p>
        </div>
        <Button
          onClick={() => {
            setCreating(true);
            setSelectedEntry(null);
          }}
          icon={<Plus className="w-4 h-4" />}
          size="lg"
        >
          New Entry
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entry List */}
        <div className="lg:col-span-1 space-y-3">
          {/* Type Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {ENTRY_TYPES.map((et) => {
              const Icon = et.icon;
              return (
                <button
                  key={et.value}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-amber-500/10 hover:border-amber-500/30 transition-colors text-slate-400 hover:text-amber-300"
                >
                  <Icon className={`w-3 h-3 ${et.color}`} />
                  {et.label}s
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 glass rounded-xl shimmer" />
              ))}
            </div>
          ) : entries.length === 0 ? (
            <Card className="text-center py-10">
              <Feather className="w-10 h-10 text-amber-500/30 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">No entries yet</p>
              <p className="text-slate-600 text-xs mt-1">
                Start writing your first insight
              </p>
            </Card>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, i) => {
                const Icon = getTypeIcon(entry.type);
                const typeColor = getTypeColor(entry.type);
                const isSelected = selectedEntry?.id === entry.id;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => {
                        setSelectedEntry(entry);
                        setCreating(false);
                      }}
                      className={`w-full text-left glass rounded-xl p-4 transition-all border ${
                        isSelected
                          ? "border-amber-500/30 bg-amber-500/5"
                          : "border-transparent hover:border-amber-500/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`w-4 h-4 ${typeColor} mt-0.5 flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white line-clamp-1 mb-1">
                            {entry.title}
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {entry.content}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            {entry.node && (
                              <DisciplineBadge
                                discipline={entry.node.discipline}
                                className="text-xs py-0"
                              />
                            )}
                            <span className="text-xs text-slate-600">
                              {formatRelativeTime(entry.updatedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {creating ? (
              <motion.div
                key="creating"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-amber-500/20">
                  <h2 className="font-serif text-xl font-semibold text-amber-300 mb-6">
                    New Notebook Entry
                  </h2>

                  {/* Thinking prompt */}
                  <div className="glass rounded-lg p-3 mb-6 border border-purple-500/20">
                    <p className="text-xs text-purple-400 mb-1 font-medium">
                      Thinking Prompt
                    </p>
                    <p className="text-sm text-slate-400 italic">&ldquo;{prompt}&rdquo;</p>
                  </div>

                  {/* Entry Type */}
                  <div className="mb-4">
                    <label className="text-sm text-slate-400 mb-2 block">
                      Entry Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ENTRY_TYPES.map((et) => {
                        const Icon = et.icon;
                        return (
                          <button
                            key={et.value}
                            onClick={() => setType(et.value)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all ${
                              type === et.value
                                ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                                : "border-slate-700 text-slate-500 hover:border-slate-600"
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${et.color}`} />
                            {et.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <label className="text-sm text-slate-400 mb-2 block">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="What did you discover or realize?"
                      className="w-full bg-navy-800/50 border border-amber-500/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/30 transition-colors"
                      style={{ background: "rgba(10, 22, 40, 0.5)" }}
                    />
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <label className="text-sm text-slate-400 mb-2 block">
                      Your Thoughts
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your thoughts freely. What patterns do you see? What questions arise? What connections can you make?"
                      rows={8}
                      className="w-full bg-navy-800/50 border border-amber-500/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/30 transition-colors resize-none leading-relaxed"
                      style={{ background: "rgba(10, 22, 40, 0.5)" }}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={saveEntry}
                      loading={saving}
                      disabled={!title.trim() || !content.trim()}
                      icon={<Save className="w-4 h-4" />}
                    >
                      Save Entry
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setCreating(false);
                        setTitle("");
                        setContent("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ) : selectedEntry ? (
              <motion.div
                key={selectedEntry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = getTypeIcon(selectedEntry.type);
                        const color = getTypeColor(selectedEntry.type);
                        return <Icon className={`w-5 h-5 ${color}`} />;
                      })()}
                      <div>
                        <span className="text-xs text-slate-500 capitalize">
                          {selectedEntry.type}
                        </span>
                        {selectedEntry.node && (
                          <div className="mt-1">
                            <DisciplineBadge
                              discipline={selectedEntry.node.discipline}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntry(selectedEntry.id)}
                      className="text-slate-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-white mb-3 leading-tight">
                    {selectedEntry.title}
                  </h2>

                  <p className="text-xs text-slate-600 mb-6">
                    {formatRelativeTime(selectedEntry.updatedAt)}
                  </p>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {selectedEntry.content}
                    </p>
                  </div>

                  {selectedEntry.node && (
                    <div className="mt-6 pt-6 border-t border-amber-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-amber-300">
                          Related Knowledge Node
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">
                        {selectedEntry.node.title}
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="text-center py-16">
                  <Feather className="w-20 h-20 text-amber-500/20 mx-auto mb-6" />
                  <h3 className="font-serif text-2xl text-amber-300 mb-3">
                    Your Digital Codex
                  </h3>
                  <p className="text-slate-500 max-w-md mx-auto mb-8">
                    Like Da Vinci&apos;s notebooks, this is where your curiosity meets
                    reflection. Record insights, ask questions, form hypotheses.
                  </p>

                  {/* Thinking Prompts */}
                  <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                    {THINKING_PROMPTS.slice(0, 4).map((p, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setContent(p + "\n\n");
                          setCreating(true);
                        }}
                        className="text-left p-3 glass rounded-lg border border-amber-500/10 hover:border-amber-500/25 transition-all group"
                      >
                        <p className="text-xs text-slate-500 group-hover:text-amber-300 transition-colors italic">
                          &ldquo;{p}&rdquo;
                        </p>
                      </button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
