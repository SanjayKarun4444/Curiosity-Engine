import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const [nodes, edges] = await Promise.all([
      prisma.knowledgeNode.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.knowledgeEdge.findMany(),
    ]);

    return NextResponse.json({ nodes, edges });
  } catch (error) {
    console.error("Error fetching graph:", error);
    return NextResponse.json(
      { error: "Failed to fetch graph data" },
      { status: 500 }
    );
  }
}
