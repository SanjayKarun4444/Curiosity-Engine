import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateDailyCuriosity } from "@/lib/ai";
import { getTodayDateString } from "@/lib/utils";

export async function GET() {
  try {
    const today = getTodayDateString();

    // Try to get today's curiosity
    const todayCuriosity = await prisma.dailyCuriosity.findUnique({
      where: { date: today },
    });

    // Get all previous curiosities
    const allCuriosities = await prisma.dailyCuriosity.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json({
      today: todayCuriosity,
      all: allCuriosities,
    });
  } catch (error) {
    console.error("Error fetching curiosities:", error);
    return NextResponse.json(
      { error: "Failed to fetch curiosities" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const discipline = body.discipline as string | undefined;
    const today = getTodayDateString();

    // Check if we already generated for today (unless forcing)
    if (!body.force) {
      const existing = await prisma.dailyCuriosity.findUnique({
        where: { date: today },
      });
      if (existing) {
        return NextResponse.json(existing);
      }
    }

    // Generate using AI
    const data = await generateDailyCuriosity(discipline);

    // Create a knowledge node for it
    const node = await prisma.knowledgeNode.create({
      data: {
        title: data.title,
        content: data.fact + "\n\n" + data.explanation,
        type: "fact",
        discipline: data.discipline,
        explored: false,
      },
    });

    // Save the daily curiosity
    const curiosity = await prisma.dailyCuriosity.upsert({
      where: { date: today },
      update: {
        title: data.title,
        fact: data.fact,
        explanation: data.explanation,
        significance: data.significance,
        history: data.history,
        connections: JSON.stringify(data.connections),
        questions: JSON.stringify(data.questions),
        discipline: data.discipline,
        nodeId: node.id,
      },
      create: {
        date: today,
        title: data.title,
        fact: data.fact,
        explanation: data.explanation,
        significance: data.significance,
        history: data.history,
        connections: JSON.stringify(data.connections),
        questions: JSON.stringify(data.questions),
        discipline: data.discipline,
        nodeId: node.id,
      },
    });

    return NextResponse.json(curiosity, { status: 201 });
  } catch (error) {
    console.error("Error generating curiosity:", error);
    return NextResponse.json(
      { error: "Failed to generate curiosity" },
      { status: 500 }
    );
  }
}
