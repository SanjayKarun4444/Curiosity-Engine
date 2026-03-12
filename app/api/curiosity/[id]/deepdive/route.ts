import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateDeepDive } from "@/lib/ai";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get the curiosity
    const curiosity = await prisma.dailyCuriosity.findUnique({
      where: { id },
    });

    if (!curiosity) {
      return NextResponse.json({ error: "Curiosity not found" }, { status: 404 });
    }

    // Generate deep dive
    const deepDive = await generateDeepDive(curiosity.title, curiosity.nodeId || undefined);

    // Update the node if it exists
    if (curiosity.nodeId) {
      await prisma.knowledgeNode.updateMany({
        where: { id: curiosity.nodeId },
        data: {
          explored: true,
          content: deepDive.overview + "\n\n" + deepDive.scientificExplanation,
        },
      });
    }

    return NextResponse.json(deepDive);
  } catch (error) {
    console.error("Error generating deep dive:", error);
    return NextResponse.json(
      { error: "Failed to generate deep dive" },
      { status: 500 }
    );
  }
}
