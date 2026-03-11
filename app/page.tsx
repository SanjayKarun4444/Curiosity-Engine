"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Network,
  Feather,
  GitBranch,
  BookOpen,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Card, DisciplineBadge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatDate, formatRelativeTime } from "@/lib/utils";

interface Stats {
  nodes: number;
  entries: number;
  chains: number;
  curiosities: number;
}

interface DailyCuriosity {
  id: string;
  title: string;
  fact: string;
  discipline: string;
  date: string;
  createdAt: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    nodes: 0,
    entries: 0,
    chains: 0,
    curiosities: 0,
  });
  const [todayCuriosity, setTodayCuriosity] = useState<DailyCuriosity | null>(null);
  const [recentCuriosities, setRecentCuriosities] = useState<DailyCuriosity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [curiosityRes, graphRes, notebookRes, chainsRes] =
          await Promise.all([
            fetch("/api/curiosity"),
            fetch("/api/graph"),
            fetch("/api/notebook"),
            fetch("/api/chains"),
          ]);

        const curiosityData = await curiosityRes.json();
        const graphData = await graphRes.json();
        const notebookData = await notebookRes.json();
        const chainsData = await chainsRes.json();

        setTodayCuriosity(curiosityData.today || null);
        setRecentCuriosities((curiosityData.all || []).slice(0, 3));
        setStats({
          nodes: graphData.nodes?.length || 0,
          entries: notebookData?.length || 0,
          chains: chainsData?.length || 0,
          curiosities: curiosityData.all?.length || 0,
        });
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const statCards = [
    {
      label: "Knowledge Nodes",
      value: stats.nodes,
      icon: Network,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      label: "Discoveries",
      value: stats.curiosities,
      icon: Sparkles,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Notebook Entries",
      value: stats.entries,
      icon: Feather,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Curiosity Chains",
      value: stats.chains,
      icon: GitBranch,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-500/60 text-sm">
            {formatDate(new Date())}
          </span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-gold-gradient mb-3">
          Welcome, Curious Mind
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Every day is an opportunity to discover something that changes how you see the world.
          Your intellectual journey continues below.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor} mb-3`}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  {loading ? (
                    <span className="inline-block w-8 h-8 rounded bg-slate-700 animate-pulse" />
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Curiosity */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-amber-300">
              Today&apos;s Discovery
            </h2>
            <Link href="/feed">
              <Button variant="ghost" size="sm" icon={<ChevronRight className="w-4 h-4" />}>
                View All
              </Button>
            </Link>
          </div>

          {loading ? (
            <Card className="h-48 shimmer" />
          ) : todayCuriosity ? (
            <Card glow className="border-amber-500/20">
              <div className="flex items-start justify-between mb-3">
                <DisciplineBadge discipline={todayCuriosity.discipline} />
                <span className="text-xs text-slate-500">
                  {formatRelativeTime(todayCuriosity.createdAt)}
                </span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-3 leading-tight">
                {todayCuriosity.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {todayCuriosity.fact}
              </p>
              <div className="flex gap-3">
                <Link href="/feed">
                  <Button size="sm" icon={<Sparkles className="w-4 h-4" />}>
                    Explore
                  </Button>
                </Link>
                <Link href={`/explore/${todayCuriosity.id}`}>
                  <Button variant="secondary" size="sm" icon={<BookOpen className="w-4 h-4" />}>
                    Deep Dive
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <Sparkles className="w-12 h-12 text-amber-500/40 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">No discovery generated yet today</p>
              <Link href="/feed">
                <Button icon={<Zap className="w-4 h-4" />}>
                  Generate Today&apos;s Discovery
                </Button>
              </Link>
            </Card>
          )}
        </motion.div>

        {/* Quick Links & Recent */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="font-serif text-xl font-semibold text-amber-300">
            Quick Access
          </h2>

          <Card className="p-4 hover:border-amber-500/20 transition-colors group cursor-pointer">
            <Link href="/graph" className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Network className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                  Knowledge Graph
                </p>
                <p className="text-xs text-slate-500">
                  {stats.nodes} nodes explored
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </Link>
          </Card>

          <Card className="p-4 hover:border-amber-500/20 transition-colors group cursor-pointer">
            <Link href="/notebook" className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Feather className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                  Da Vinci Notebook
                </p>
                <p className="text-xs text-slate-500">
                  {stats.entries} entries written
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition-colors" />
            </Link>
          </Card>

          {/* Recent Discoveries */}
          {recentCuriosities.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
                Recent
              </h3>
              <div className="space-y-2">
                {recentCuriosities.map((c) => (
                  <Link key={c.id} href="/feed">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-amber-500/5 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                      <span className="text-sm text-slate-400 hover:text-amber-300 transition-colors line-clamp-1 flex-1">
                        {c.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Da Vinci Inspiration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 glass rounded-2xl p-8 border border-amber-500/10"
      >
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center glow-gold">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-gold-gradient mb-2">
              The Da Vinci Method
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Leonardo Da Vinci kept notebooks filled with observations, experiments, and wild connections between art, science, and nature.
              He followed his curiosity without boundaries — from painting the Mona Lisa to designing flying machines.
              Your Curiosity Engine is your modern notebook. Follow your questions wherever they lead.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
