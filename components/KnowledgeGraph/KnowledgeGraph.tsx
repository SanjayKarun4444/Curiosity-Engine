"use client";

import { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { getNodeColor, getNodeGlow } from "@/lib/graph";

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

interface D3Node extends d3.SimulationNodeDatum {
  id: string;
  title: string;
  content: string;
  type: string;
  discipline: string;
  explored: boolean;
  createdAt: string;
  x?: number;
  y?: number;
}

interface D3Link extends d3.SimulationLinkDatum<D3Node> {
  id: string;
  relationship: string;
  strength: number;
}

interface KnowledgeGraphProps {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId?: string | null;
  onNodeClick?: (node: Node) => void;
  filterDiscipline?: string | null;
  width?: number;
  height?: number;
}

export default function KnowledgeGraph({
  nodes,
  edges,
  selectedNodeId,
  onNodeClick,
  filterDiscipline,
  width = 800,
  height = 600,
}: KnowledgeGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<D3Node, D3Link> | null>(null);

  const handleNodeClick = useCallback(
    (node: D3Node) => {
      if (onNodeClick) {
        onNodeClick(node as unknown as Node);
      }
    },
    [onNodeClick]
  );

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const filteredNodes =
      filterDiscipline
        ? nodes.filter((n) => n.discipline === filterDiscipline)
        : nodes;

    const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));

    const filteredEdges = edges.filter(
      (e) => filteredNodeIds.has(e.sourceId) && filteredNodeIds.has(e.targetId)
    );

    if (filteredNodes.length === 0) return;

    // Prepare D3 data
    const d3Nodes: D3Node[] = filteredNodes.map((n) => ({
      ...n,
      x: n.x ?? Math.random() * width,
      y: n.y ?? Math.random() * height,
    }));

    const nodeMap = new Map(d3Nodes.map((n) => [n.id, n]));

    const d3Links: D3Link[] = filteredEdges
      .map((e) => ({
        id: e.id,
        source: nodeMap.get(e.sourceId)!,
        target: nodeMap.get(e.targetId)!,
        relationship: e.relationship,
        strength: e.strength,
      }))
      .filter((l) => l.source && l.target);

    // Create defs for filters
    const defs = svg.append("defs");

    // Create glow filters for each discipline
    const disciplines = Array.from(new Set(filteredNodes.map((n) => n.discipline)));
    disciplines.forEach((disc) => {
      const color = getNodeColor(disc);
      const filter = defs
        .append("filter")
        .attr("id", `glow-${disc.toLowerCase().replace(/\s+/g, "-")}`)
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");

      filter
        .append("feGaussianBlur")
        .attr("stdDeviation", "4")
        .attr("result", "blur");

      const feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "blur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");

      // Also create colored filter
      filter
        .append("feColorMatrix")
        .attr("in", "blur")
        .attr("type", "matrix")
        .attr("values", `0 0 0 0 ${parseInt(color.slice(1, 3), 16) / 255} 0 0 0 0 ${parseInt(color.slice(3, 5), 16) / 255} 0 0 0 0 ${parseInt(color.slice(5, 7), 16) / 255} 0 0 0 1 0`);
    });

    // Create selected node glow
    const selectedFilter = defs
      .append("filter")
      .attr("id", "glow-selected")
      .attr("x", "-100%")
      .attr("y", "-100%")
      .attr("width", "300%")
      .attr("height", "300%");
    selectedFilter
      .append("feGaussianBlur")
      .attr("stdDeviation", "8")
      .attr("result", "blur");
    const selectedMerge = selectedFilter.append("feMerge");
    selectedMerge.append("feMergeNode").attr("in", "blur");
    selectedMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Setup zoom
    const g = svg.append("g");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        g.attr("transform", event.transform.toString());
      });

    svg.call(zoom);

    // Create force simulation
    const simulation = d3
      .forceSimulation<D3Node>(d3Nodes)
      .force(
        "link",
        d3
          .forceLink<D3Node, D3Link>(d3Links)
          .id((d) => d.id)
          .distance(120)
          .strength((l) => l.strength * 0.5)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

    simulationRef.current = simulation;

    // Draw edges
    const link = g
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(d3Links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "rgba(245, 158, 11, 0.2)")
      .attr("stroke-width", (d) => Math.max(1, d.strength * 2))
      .attr("stroke-dasharray", (d) =>
        d.relationship === "inspired_by" ? "4 4" : "none"
      );

    // Draw node groups
    const node = g
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(d3Nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .style("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, D3Node>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Node outer glow ring
    node
      .append("circle")
      .attr("r", (d) => (d.id === selectedNodeId ? 18 : 14))
      .attr("fill", "none")
      .attr("stroke", (d) => getNodeColor(d.discipline))
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.3)
      .style("filter", (d) => `url(#glow-${d.discipline.toLowerCase().replace(/\s+/g, "-")})`);

    // Main node circle
    node
      .append("circle")
      .attr("r", (d) => {
        if (d.id === selectedNodeId) return 14;
        if (d.explored) return 10;
        return 8;
      })
      .attr("fill", (d) => {
        const color = getNodeColor(d.discipline);
        return d.explored ? color : `${color}88`;
      })
      .attr("stroke", (d) => getNodeColor(d.discipline))
      .attr("stroke-width", (d) => (d.id === selectedNodeId ? 3 : 1.5))
      .style("filter", (d) =>
        d.id === selectedNodeId
          ? "url(#glow-selected)"
          : `url(#glow-${d.discipline.toLowerCase().replace(/\s+/g, "-")})`
      )
      .on("click", (_event, d) => {
        handleNodeClick(d);
      })
      .on("mouseover", (event, d) => {
        // Highlight connected links
        link
          .attr("stroke", (l) => {
            const src = l.source as D3Node;
            const tgt = l.target as D3Node;
            return src.id === d.id || tgt.id === d.id
              ? "rgba(245, 158, 11, 0.8)"
              : "rgba(245, 158, 11, 0.1)";
          })
          .attr("stroke-width", (l) => {
            const src = l.source as D3Node;
            const tgt = l.target as D3Node;
            return src.id === d.id || tgt.id === d.id
              ? Math.max(2, l.strength * 3)
              : Math.max(0.5, l.strength);
          });

        // Show tooltip
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("opacity", "1")
          .style("left", `${event.offsetX + 15}px`)
          .style("top", `${event.offsetY - 10}px`);
        tooltip.select(".tooltip-title").text(d.title);
        tooltip.select(".tooltip-discipline").text(d.discipline);
        tooltip.select(".tooltip-type").text(d.type);
        tooltip.select(".tooltip-content").text(
          d.content.length > 100 ? d.content.slice(0, 100) + "..." : d.content
        );
      })
      .on("mouseout", () => {
        // Reset links
        link
          .attr("stroke", "rgba(245, 158, 11, 0.2)")
          .attr("stroke-width", (d) => Math.max(1, d.strength * 2));

        // Hide tooltip
        d3.select(tooltipRef.current).style("opacity", "0");
      });

    // Pulse animation for new/unexplored nodes
    node
      .filter((d) => !d.explored)
      .append("circle")
      .attr("r", 8)
      .attr("fill", "none")
      .attr("stroke", (d) => getNodeColor(d.discipline))
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.6)
      .append("animate")
      .attr("attributeName", "r")
      .attr("from", 8)
      .attr("to", 20)
      .attr("dur", "2s")
      .attr("repeatCount", "indefinite");

    node
      .filter((d) => !d.explored)
      .append("circle")
      .attr("r", 8)
      .attr("fill", "none")
      .attr("stroke", (d) => getNodeColor(d.discipline))
      .attr("stroke-width", 0.5)
      .attr("stroke-opacity", 0.3)
      .append("animate")
      .attr("attributeName", "stroke-opacity")
      .attr("from", 0.5)
      .attr("to", 0)
      .attr("dur", "2s")
      .attr("repeatCount", "indefinite");

    // Node labels
    node
      .append("text")
      .attr("dy", "2em")
      .attr("text-anchor", "middle")
      .attr("fill", "#F0ECD8")
      .attr("font-size", "10px")
      .attr("font-family", "Inter, sans-serif")
      .text((d) => {
        const words = d.title.split(" ").slice(0, 3).join(" ");
        return words.length < d.title.length ? words + "..." : words;
      })
      .style("pointer-events", "none")
      .style("text-shadow", "0 0 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,1)");

    // Type indicator dot
    node
      .append("circle")
      .attr("r", 3)
      .attr("cx", 8)
      .attr("cy", -8)
      .attr("fill", (d) => {
        switch (d.type) {
          case "fact": return "#F59E0B";
          case "concept": return "#06B6D4";
          case "question": return "#10B981";
          case "insight": return "#8B5CF6";
          default: return "#94A3B8";
        }
      })
      .style("pointer-events", "none");

    // Simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as D3Node).x ?? 0)
        .attr("y1", (d) => (d.source as D3Node).y ?? 0)
        .attr("x2", (d) => (d.target as D3Node).x ?? 0)
        .attr("y2", (d) => (d.target as D3Node).y ?? 0);

      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    // Initial zoom to fit
    const initialTransform = d3.zoomIdentity.translate(0, 0).scale(0.9);
    svg.call(zoom.transform, initialTransform);

    return () => {
      simulation.stop();
    };
  }, [nodes, edges, selectedNodeId, filterDiscipline, width, height, handleNodeClick]);

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="graph-tooltip"
        style={{ opacity: 0, pointerEvents: "none", position: "absolute" }}
      >
        <p className="tooltip-discipline text-xs text-amber-400 mb-1" />
        <p className="tooltip-title text-sm font-semibold text-white mb-1" />
        <p className="tooltip-type text-xs text-slate-500 mb-2 capitalize" />
        <p className="tooltip-content text-xs text-slate-400 leading-relaxed" />
      </div>
    </div>
  );
}
