import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateCuriosityChain } from "@/lib/ai";

export async function GET() {
  try {
    const chains = await prisma.curiosityChain.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        steps: {
          orderBy: { stepOrder: "asc" },
          include: {
            node: {
              select: {
                id: true,
                title: true,
                discipline: true,
                content: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(chains);
  } catch (error) {
    console.error("Error fetching chains:", error);
    return NextResponse.json(
      { error: "Failed to fetch chains" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic } = body;

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // Generate the curiosity chain using AI
    const chainData = await generateCuriosityChain(topic);

    // Create the chain
    const chain = await prisma.curiosityChain.create({
      data: {
        title: chainData.title,
        startTopic: topic,
      },
    });

    // Create nodes and steps for each step
    const createdSteps = [];
    for (let i = 0; i < chainData.steps.length; i++) {
      const step = chainData.steps[i];

      // Create a knowledge node for this step
      const node = await prisma.knowledgeNode.create({
        data: {
          title: step.title,
          content: step.content,
          type: "concept",
          discipline: step.discipline,
          explored: false,
        },
      });

      // Create the chain step
      const chainStep = await prisma.curiosityChainStep.create({
        data: {
          chainId: chain.id,
          nodeId: node.id,
          stepOrder: i + 1,
          question: step.question,
        },
      });

      // Create edge from previous node if exists
      if (i > 0 && createdSteps.length > 0) {
        const prevStep = createdSteps[createdSteps.length - 1];
        await prisma.knowledgeEdge.create({
          data: {
            sourceId: prevStep.nodeId,
            targetId: node.id,
            relationship: "builds_on",
            strength: 0.9,
          },
        });
      }

      createdSteps.push(chainStep);
    }

    // Return the complete chain
    const fullChain = await prisma.curiosityChain.findUnique({
      where: { id: chain.id },
      include: {
        steps: {
          orderBy: { stepOrder: "asc" },
          include: {
            node: {
              select: {
                id: true,
                title: true,
                discipline: true,
                content: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(fullChain, { status: 201 });
  } catch (error) {
    console.error("Error creating curiosity chain:", error);
    return NextResponse.json(
      { error: "Failed to create curiosity chain" },
      { status: 500 }
    );
  }
}
