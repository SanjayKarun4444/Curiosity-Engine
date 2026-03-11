import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const entries = await prisma.notebookEntry.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        node: {
          select: { id: true, title: true, discipline: true },
        },
      },
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching notebook entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch notebook entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, type, nodeId } = body;

    if (!title || !content || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const entry = await prisma.notebookEntry.create({
      data: {
        title,
        content,
        type,
        nodeId: nodeId || null,
      },
      include: {
        node: {
          select: { id: true, title: true, discipline: true },
        },
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("Error creating notebook entry:", error);
    return NextResponse.json(
      { error: "Failed to create notebook entry" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, content, type, nodeId } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing entry ID" }, { status: 400 });
    }

    const entry = await prisma.notebookEntry.update({
      where: { id },
      data: {
        title: title ?? undefined,
        content: content ?? undefined,
        type: type ?? undefined,
        nodeId: nodeId !== undefined ? nodeId : undefined,
      },
      include: {
        node: {
          select: { id: true, title: true, discipline: true },
        },
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Error updating notebook entry:", error);
    return NextResponse.json(
      { error: "Failed to update notebook entry" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing entry ID" }, { status: 400 });
    }

    await prisma.notebookEntry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting notebook entry:", error);
    return NextResponse.json(
      { error: "Failed to delete notebook entry" },
      { status: 500 }
    );
  }
}
