"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Zap,
  Link2,
  HelpCircle,
  FlaskConical,
  Lightbulb,
  GitBranch,
  Loader2,
} from "lucide-react";
import { Card, DisciplineBadge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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
}

interface DeepDive {
  title: string;
  overview: string;
  scientificExplanation: string;
  analogy: string;
  historicalContext: string;
  modernApplications: string;
  connections: string[];
  furtherQuestions: string[];
  discipline: string;
}

interface ChainStep {
  title: string;
  content: string;
  question: string;
  discipline: string;
}

interface Chain {
  id: string;
  title: string;
  startTopic: string;
  steps: Array<{
    id: string;
    stepOrder: number;
    question: string;
    node: {
      id: string;
      title: string;
      discipline: string;
      content: string;
    };
  }>;
}

export default function ExplorePage() {
  const params = useParams();
  const id = params.id as string;

  const [curiosity, setCuriosity] = useState<DailyCuriosity | null>(null);
  const [deepDive, setDeepDive] = useState<DeepDive | null>(null);
  const [chain, setChain] = useState<Chain | null>(null);
  const [loadingCuriosity, setLoadingCuriosity] = useState(true);
  const [loadingDeepDive, setLoadingDeepDive] = useState(false);
  const [loadingChain, setLoadingChain] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "deepdive" | "chain">("overview");

  useEffect(() => {
    loadCuriosity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadCuriosity() {
    try {
      const res = await fetch("/api/curiosity");
      const data = await res.json();
      const found = data.all?.find((c: DailyCuriosity) => c.id === id);
      if (found) {
        setCuriosity(found);
      }
    } catch (error) {
      console.error("Error loading curiosity:", error);
    } finally {
      setLoadingCuriosity(false);
    }
  }

  async function generateDeepDive() {
    if (!curiosity) return;
    setLoadingDeepDive(true);
    try {
      const res = await fetch(`/api/curiosity/${id}/deepdive`, {
        method: "POST",
      });
      const data = await res.json();
      setDeepDive(data);
      setActiveTab("deepdive");
    } catch (error) {
      console.error("Error generating deep dive:", error);
    } finally {
      setLoadingDeepDive(false);
    }
  }

  async function generateChain() {
    if (!curiosity) return;
    setLoadingChain(true);
    try {
      const res = await fetch("/api/chains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: curiosity.title }),
      });
      const data = await res.json();
      setChain(data);
      setActiveTab("chain");
    } catch (error) {
      console.error("Error generating chain:", error);
    } finally {
      setLoadingChain(false);
    }
  }

  function parseJSON(str: string): string[] {
    try {
      return JSON.parse(str) as string[];
    } catch {
      return [];
    }
  }

  if (loadingCuriosity) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (!curiosity) {
    return (
      <div className="text-center py-20">
        <BookOpen className="w-16 h-16 text-amber-500/30 mx-auto mb-4" />
        <h2 className="font-serif text-2xl text-amber-300 mb-2">
          Discovery Not Found
        </h2>
        <p className="text-slate-500 mb-6">
          This discovery doesn&apos;t exist or has been removed.
        </p>
        <Link href="/feed">
          <Button>Back to Feed</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back */}
      <Link
        href="/feed"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-300 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Feed</span>
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <DisciplineBadge discipline={curiosity.discipline} className="mb-3" />
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
          {curiosity.title}
        </h1>
        <p className="text-amber-200/70 text-lg italic font-serif leading-relaxed">
          &ldquo;{curiosity.fact}&rdquo;
        </p>
      </motion.div>

      {/* Action Tabs */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
            activeTab === "overview"
              ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
              : "text-slate-500 border-transparent hover:border-slate-700"
          }`}
        >
          Overview
        </button>
        <Button
          variant={activeTab === "deepdive" ? "primary" : "secondary"}
          size="sm"
          onClick={deepDive ? () => setActiveTab("deepdive") : generateDeepDive}
          loading={loadingDeepDive}
          icon={<BookOpen className="w-4 h-4" />}
        >
          {deepDive ? "Deep Dive" : "Generate Deep Dive"}
        </Button>
        <Button
          variant={activeTab === "chain" ? "primary" : "secondary"}
          size="sm"
          onClick={chain ? () => setActiveTab("chain") : generateChain}
          loading={loadingChain}
          icon={<GitBranch className="w-4 h-4" />}
        >
          {chain ? "Curiosity Chain" : "Generate Chain"}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card>
              <h2 className="font-serif text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Explanation
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {curiosity.explanation}
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-serif text-lg font-semibold text-amber-300 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Why It Matters
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {curiosity.significance}
                </p>
              </Card>

              <Card>
                <h3 className="font-serif text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Historical Context
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {curiosity.history}
                </p>
              </Card>
            </div>

            {parseJSON(curiosity.connections).length > 0 && (
              <Card>
                <h3 className="font-serif text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  Unexpected Connections
                </h3>
                <div className="space-y-3">
                  {parseJSON(curiosity.connections).map((conn, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 glass rounded-lg border border-purple-500/10"
                    >
                      <span className="text-purple-400 font-bold text-sm flex-shrink-0">
                        →
                      </span>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {conn}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {parseJSON(curiosity.questions).length > 0 && (
              <Card>
                <h3 className="font-serif text-lg font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Questions to Explore
                </h3>
                <div className="space-y-3">
                  {parseJSON(curiosity.questions).map((q, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 glass rounded-lg border border-emerald-500/10"
                    >
                      <span className="text-emerald-400 font-bold text-sm flex-shrink-0">
                        {i + 1}.
                      </span>
                      <p className="text-slate-400 text-sm leading-relaxed italic">
                        {q}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>
        )}

        {/* Deep Dive Tab */}
        {activeTab === "deepdive" && deepDive && (
          <motion.div
            key="deepdive"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="border-amber-500/20">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 font-medium">Deep Dive Analysis</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mb-4">
                {deepDive.title}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {deepDive.overview}
              </p>
            </Card>

            <Card>
              <h3 className="font-serif text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                <FlaskConical className="w-5 h-5" />
                Scientific Explanation
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {deepDive.scientificExplanation}
              </p>
            </Card>

            <Card>
              <h3 className="font-serif text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                The Perfect Analogy
              </h3>
              <p className="text-slate-300 leading-relaxed italic">
                {deepDive.analogy}
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-serif text-lg font-semibold text-amber-300 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Historical Context
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {deepDive.historicalContext}
                </p>
              </Card>

              <Card>
                <h3 className="font-serif text-lg font-semibold text-emerald-300 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Modern Applications
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {deepDive.modernApplications}
                </p>
              </Card>
            </div>

            {deepDive.connections?.length > 0 && (
              <Card>
                <h3 className="font-serif text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  Cross-Disciplinary Connections
                </h3>
                <div className="space-y-3">
                  {deepDive.connections?.map((conn, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 glass rounded-lg border border-purple-500/10"
                    >
                      <span className="text-purple-400 font-bold text-sm flex-shrink-0">
                        ◆
                      </span>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {conn}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {deepDive.furtherQuestions?.length > 0 && (
              <Card>
                <h3 className="font-serif text-lg font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Further Questions
                </h3>
                <div className="space-y-3">
                  {deepDive.furtherQuestions?.map((q, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 glass rounded-lg border border-emerald-500/10"
                    >
                      <span className="text-emerald-400 text-sm font-bold flex-shrink-0">
                        {i + 1}.
                      </span>
                      <p className="text-slate-400 text-sm leading-relaxed italic">
                        {q}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>
        )}

        {/* Chain Tab */}
        {activeTab === "chain" && chain && (
          <motion.div
            key="chain"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="mb-6 border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 font-medium">Curiosity Chain</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white">
                {chain.title}
              </h2>
            </Card>

            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-amber-500/50 via-cyan-500/30 to-amber-500/10" />

              <div className="space-y-4">
                {chain.steps.map((step, i) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-16"
                  >
                    {/* Step number */}
                    <div className="absolute left-0 w-12 h-12 rounded-full glass border border-amber-500/20 flex items-center justify-center">
                      <span className="text-amber-400 font-bold text-sm">
                        {step.stepOrder}
                      </span>
                    </div>

                    <Card className="border-amber-500/10 hover:border-amber-500/20 transition-colors">
                      <DisciplineBadge
                        discipline={step.node.discipline}
                        className="mb-3"
                      />
                      <h3 className="font-serif text-lg font-semibold text-white mb-2">
                        {step.node.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        {step.node.content}
                      </p>
                      {i < chain.steps.length - 1 && (
                        <div className="glass rounded-lg p-3 border border-amber-500/10">
                          <p className="text-xs text-amber-500/60 mb-1">
                            This leads us to ask:
                          </p>
                          <p className="text-sm text-amber-300/80 italic">
                            &ldquo;{step.question}&rdquo;
                          </p>
                        </div>
                      )}
                      {i === chain.steps.length - 1 && (
                        <div className="glass rounded-lg p-3 border border-emerald-500/10">
                          <p className="text-xs text-emerald-500/60 mb-1">
                            Open question:
                          </p>
                          <p className="text-sm text-emerald-300/80 italic">
                            &ldquo;{step.question}&rdquo;
                          </p>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
