"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Network,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  X,
  BookOpen,
  Link2,
} from "lucide-react";
import { DisciplineBadge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getNodeColor, DISCIPLINE_COLORS } from "@/lib/graph";
import { formatRelativeTime } from "@/lib/utils";

const KnowledgeGraph = dynamic(
  () => import("@/components/KnowledgeGraph/KnowledgeGraph"),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-full"><div className="text-slate-500 animate-pulse">Loading graph...</div></div> }
);

interface Node {
  id: string;
  title: string;
  content: string;
  type: string;
  discipline: string;
  x?: number;
  y?: number;
  explored: boolean;
  createdAt: string;
}

interface Edge {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: string;
  strength: number;
}

export default function GraphPage() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [filterDiscipline, setFilterDiscipline] = useState<string | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    loadGraph();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  async function loadGraph() {
    try {
      const res = await fetch("/api/graph");
      const data = await res.json();
      setNodes(data.nodes || []);
      setEdges(data.edges || []);
    } catch (error) {
      console.error("Error loading graph:", error);
    } finally {
      setLoading(false);
    }
  }

  const disciplines = Array.from(new Set(nodes.map((n) => n.discipline)));
  const connectedEdges = selectedNode
    ? edges.filter(
        (e) => e.sourceId === selectedNode.id || e.targetId === selectedNode.id
      )
    : [];

  const connectedNodeIds = new Set(
    connectedEdges.flatMap((e) => [e.sourceId, e.targetId])
  );

  const connectedNodes = nodes.filter(
    (n) => connectedNodeIds.has(n.id) && n.id !== selectedNode?.id
  );

  return (
    <div className="flex h-screen -m-8 overflow-hidden">
      {/* Graph Container */}
      <div className="flex-1 relative" ref={containerRef}>
        {/* Controls */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <Button
            size="sm"
            variant="secondary"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={loadGraph}
          >
            Refresh
          </Button>
        </div>

        {/* Top bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="glass rounded-full px-4 py-2 flex items-center gap-3">
            <Network className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">
              Knowledge Graph
            </span>
            <span className="text-xs text-slate-500">
              {nodes.length} nodes • {edges.length} connections
            </span>
          </div>
        </div>

        {/* Discipline Filters */}
        {disciplines.length > 0 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-wrap justify-center gap-2 px-4 max-w-2xl">
            <button
              onClick={() => setFilterDiscipline(null)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                filterDiscipline === null
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  : "text-slate-500 border-slate-700 hover:border-amber-500/30"
              }`}
            >
              All
            </button>
            {disciplines.map((d) => (
              <button
                key={d}
                onClick={() =>
                  setFilterDiscipline(filterDiscipline === d ? null : d)
                }
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all`}
                style={{
                  background:
                    filterDiscipline === d
                      ? `${getNodeColor(d)}20`
                      : "transparent",
                  color:
                    filterDiscipline === d ? getNodeColor(d) : "#64748B",
                  borderColor:
                    filterDiscipline === d
                      ? `${getNodeColor(d)}50`
                      : "#334155",
                }}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {/* Legend toggle */}
        <button
          onClick={() => setShowLegend(!showLegend)}
          className="absolute top-4 right-4 z-10 glass rounded-lg p-2 text-slate-400 hover:text-amber-300 transition-colors"
        >
          <Info className="w-4 h-4" />
        </button>

        {/* Legend */}
        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-14 right-4 z-10 glass rounded-xl p-4 w-56"
            >
              <h4 className="text-sm font-semibold text-amber-300 mb-3">
                Node Types
              </h4>
              <div className="space-y-2 mb-4">
                {[
                  { type: "fact", color: "#F59E0B", label: "Fact" },
                  { type: "concept", color: "#06B6D4", label: "Concept" },
                  { type: "question", color: "#10B981", label: "Question" },
                  { type: "insight", color: "#8B5CF6", label: "Insight" },
                ].map((t) => (
                  <div key={t.type} className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: t.color }}
                    />
                    <span className="text-xs text-slate-400">{t.label}</span>
                  </div>
                ))}
              </div>
              <h4 className="text-sm font-semibold text-amber-300 mb-3">
                Disciplines
              </h4>
              <div className="space-y-1">
                {Object.entries(DISCIPLINE_COLORS).slice(0, 8).map(([disc, color]) => (
                  <div key={disc} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: color }}
                    />
                    <span className="text-xs text-slate-400">{disc}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-amber-500/10">
                <p className="text-xs text-slate-500">
                  Pulsing = unexplored • Solid = explored
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Dashed lines = inspired by
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Network className="w-16 h-16 text-amber-500/30 mx-auto mb-4 animate-pulse" />
              <p className="text-slate-500">Loading knowledge graph...</p>
            </div>
          </div>
        ) : nodes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center glass rounded-2xl p-12">
              <Network className="w-20 h-20 text-amber-500/20 mx-auto mb-6" />
              <h3 className="font-serif text-2xl text-amber-300 mb-3">
                Your Knowledge Graph is Empty
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Start exploring the daily feed and generating discoveries. Each
                exploration adds nodes to your personal knowledge graph.
              </p>
            </div>
          </div>
        ) : (
          <KnowledgeGraph
            nodes={nodes}
            edges={edges}
            selectedNodeId={selectedNode?.id}
            onNodeClick={setSelectedNode}
            filterDiscipline={filterDiscipline}
            width={dimensions.width}
            height={dimensions.height}
          />
        )}
      </div>

      {/* Node Detail Sidebar */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-80 glass-dark border-l border-amber-500/10 overflow-y-auto flex-shrink-0"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DisciplineBadge discipline={selectedNode.discipline} />
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-slate-500 hover:text-amber-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="font-serif text-lg font-bold text-white mb-1 leading-tight">
                {selectedNode.title}
              </h3>

              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${getNodeColor(selectedNode.discipline)}15`,
                    color: getNodeColor(selectedNode.discipline),
                    border: `1px solid ${getNodeColor(selectedNode.discipline)}30`,
                  }}
                >
                  {selectedNode.type}
                </span>
                <span className="text-xs text-slate-500">
                  {formatRelativeTime(selectedNode.createdAt)}
                </span>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {selectedNode.content}
              </p>

              <div className="flex items-center gap-2 text-xs text-amber-500/60 mb-3">
                {selectedNode.explored ? (
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> Explored
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-amber-500/50 animate-pulse" />
                    Unexplored
                  </span>
                )}
              </div>

              {connectedNodes.length > 0 && (
                <div className="border-t border-amber-500/10 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Link2 className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-semibold text-amber-300">
                      Connected Nodes ({connectedNodes.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {connectedNodes.slice(0, 5).map((n) => {
                      const edge = connectedEdges.find(
                        (e) => e.sourceId === n.id || e.targetId === n.id
                      );
                      return (
                        <button
                          key={n.id}
                          onClick={() => setSelectedNode(n)}
                          className="w-full text-left flex items-start gap-3 p-2 rounded-lg hover:bg-amber-500/5 transition-colors group"
                        >
                          <div
                            className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                            style={{ background: getNodeColor(n.discipline) }}
                          />
                          <div>
                            <p className="text-xs font-medium text-slate-300 group-hover:text-amber-300 transition-colors">
                              {n.title}
                            </p>
                            {edge && (
                              <p className="text-xs text-slate-600 capitalize">
                                {edge.relationship.replace(/_/g, " ")}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                    {connectedNodes.length > 5 && (
                      <p className="text-xs text-slate-600 px-2">
                        +{connectedNodes.length - 5} more connections
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
