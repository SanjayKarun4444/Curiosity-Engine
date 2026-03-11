export interface GraphNode {
  id: string;
  title: string;
  content: string;
  type: string;
  discipline: string;
  x?: number;
  y?: number;
  explored: boolean;
  createdAt: Date;
}

export interface GraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: string;
  strength: number;
}

export interface LayoutNode extends GraphNode {
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export const DISCIPLINE_COLORS: Record<string, string> = {
  Physics: "#06B6D4",       // cyan
  Biology: "#10B981",       // emerald
  Mathematics: "#8B5CF6",   // violet
  Philosophy: "#F59E0B",    // amber/gold
  Engineering: "#EF4444",   // red
  Art: "#EC4899",           // pink
  History: "#F97316",       // orange
  Psychology: "#84CC16",    // lime
  Astronomy: "#3B82F6",     // blue
  Chemistry: "#14B8A6",     // teal
  Neuroscience: "#A855F7",  // purple
  Economics: "#EAB308",     // yellow
  default: "#94A3B8",       // slate
};

export const DISCIPLINE_GLOW: Record<string, string> = {
  Physics: "rgba(6, 182, 212, 0.6)",
  Biology: "rgba(16, 185, 129, 0.6)",
  Mathematics: "rgba(139, 92, 246, 0.6)",
  Philosophy: "rgba(245, 158, 11, 0.6)",
  Engineering: "rgba(239, 68, 68, 0.6)",
  Art: "rgba(236, 72, 153, 0.6)",
  History: "rgba(249, 115, 22, 0.6)",
  Psychology: "rgba(132, 204, 22, 0.6)",
  Astronomy: "rgba(59, 130, 246, 0.6)",
  Chemistry: "rgba(20, 184, 166, 0.6)",
  Neuroscience: "rgba(168, 85, 247, 0.6)",
  Economics: "rgba(234, 179, 8, 0.6)",
  default: "rgba(148, 163, 184, 0.6)",
};

export function getNodeColor(discipline: string): string {
  return DISCIPLINE_COLORS[discipline] || DISCIPLINE_COLORS.default;
}

export function getNodeGlow(discipline: string): string {
  return DISCIPLINE_GLOW[discipline] || DISCIPLINE_GLOW.default;
}

export function calculateLayout(
  nodes: GraphNode[],
  _edges: GraphEdge[]
): GraphNode[] {
  const width = 800;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;

  // Group nodes by discipline
  const disciplineGroups: Record<string, GraphNode[]> = {};
  for (const node of nodes) {
    if (!disciplineGroups[node.discipline]) {
      disciplineGroups[node.discipline] = [];
    }
    disciplineGroups[node.discipline].push(node);
  }

  const disciplines = Object.keys(disciplineGroups);
  const numDisciplines = disciplines.length;

  return nodes.map((node) => {
    if (node.x !== undefined && node.y !== undefined && node.x !== null && node.y !== null) {
      return node;
    }

    const disciplineIndex = disciplines.indexOf(node.discipline);
    const angleOffset = (disciplineIndex / numDisciplines) * Math.PI * 2;
    const nodesInGroup = disciplineGroups[node.discipline];
    const nodeIndex = nodesInGroup.indexOf(node);
    const groupRadius = 150 + disciplineIndex * 30;

    const angle = angleOffset + (nodeIndex / nodesInGroup.length) * Math.PI * 0.5;
    const radius = groupRadius + Math.random() * 50;

    return {
      ...node,
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  });
}

export function findClusters(
  nodes: GraphNode[],
  edges: GraphEdge[]
): Map<string, string[]> {
  const clusters = new Map<string, string[]>();
  const visited = new Set<string>();

  // Build adjacency list
  const adjacency: Record<string, string[]> = {};
  for (const node of nodes) {
    adjacency[node.id] = [];
  }
  for (const edge of edges) {
    if (adjacency[edge.sourceId]) {
      adjacency[edge.sourceId].push(edge.targetId);
    }
    if (adjacency[edge.targetId]) {
      adjacency[edge.targetId].push(edge.sourceId);
    }
  }

  // DFS to find connected components
  let clusterIndex = 0;
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      const cluster: string[] = [];
      const stack = [node.id];

      while (stack.length > 0) {
        const current = stack.pop()!;
        if (!visited.has(current)) {
          visited.add(current);
          cluster.push(current);
          const neighbors = adjacency[current] || [];
          for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
              stack.push(neighbor);
            }
          }
        }
      }

      clusters.set(`cluster_${clusterIndex++}`, cluster);
    }
  }

  return clusters;
}

export function getDisciplines(): string[] {
  return Object.keys(DISCIPLINE_COLORS);
}
