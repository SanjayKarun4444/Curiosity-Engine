import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateConnections } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, type, discipline, x, y } = body;

    if (!title || !content || !type || !discipline) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the node
    const node = await prisma.knowledgeNode.create({
      data: {
        title,
        content,
        type,
        discipline,
        x: x ?? null,
        y: y ?? null,
        explored: false,
      },
    });

    // Optionally generate connections to existing nodes
    const existingNodes = await prisma.knowledgeNode.findMany({
      select: { id: true, title: true },
      take: 20,
      orderBy: { createdAt: "desc" },
      where: { id: { not: node.id } },
    });

    if (existingNodes.length > 0) {
      try {
        const connectionData = await generateConnections(
          title,
          existingNodes.map((n) => n.title)
        );

        // Create edges for connections that match existing nodes
        for (const conn of connectionData.connections) {
          const matchingNode = existingNodes.find(
            (n) => n.title.toLowerCase() === conn.targetTitle.toLowerCase()
          );

          if (matchingNode) {
            await prisma.knowledgeEdge.create({
              data: {
                sourceId: node.id,
                targetId: matchingNode.id,
                relationship: conn.relationship,
                strength: conn.strength,
              },
            });
          } else {
            // Create a new node for the connection
            const newConnNode = await prisma.knowledgeNode.create({
              data: {
                title: conn.targetTitle,
                content: conn.explanation,
                type: "concept",
                discipline: discipline,
                explored: false,
              },
            });

            await prisma.knowledgeEdge.create({
              data: {
                sourceId: node.id,
                targetId: newConnNode.id,
                relationship: conn.relationship,
                strength: conn.strength,
              },
            });
          }
        }
      } catch (connError) {
        console.error("Error generating connections:", connError);
        // Don't fail the whole request if connection generation fails
      }
    }

    return NextResponse.json(node, { status: 201 });
  } catch (error) {
    console.error("Error creating node:", error);
    return NextResponse.json(
      { error: "Failed to create node" },
      { status: 500 }
    );
  }
}
