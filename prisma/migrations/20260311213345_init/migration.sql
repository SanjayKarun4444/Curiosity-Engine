-- CreateTable
CREATE TABLE "KnowledgeNode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "embedding" TEXT,
    "x" REAL,
    "y" REAL,
    "explored" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "KnowledgeEdge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "strength" REAL NOT NULL DEFAULT 1.0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "KnowledgeEdge_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "KnowledgeNode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "KnowledgeEdge_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "KnowledgeNode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DailyCuriosity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fact" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "significance" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "connections" TEXT NOT NULL,
    "questions" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "nodeId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "NotebookEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "nodeId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NotebookEntry_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "KnowledgeNode" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CuriosityChain" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "startTopic" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CuriosityChainStep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chainId" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "stepOrder" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    CONSTRAINT "CuriosityChainStep_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "CuriosityChain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CuriosityChainStep_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "KnowledgeNode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyCuriosity_date_key" ON "DailyCuriosity"("date");
