import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface DailyCuriosityData {
  title: string;
  fact: string;
  explanation: string;
  significance: string;
  history: string;
  connections: string[];
  questions: string[];
  discipline: string;
}

export interface DeepDiveData {
  title: string;
  overview: string;
  scientificExplanation: string;
  analogy: string;
  historicalContext: string;
  modernApplications: string;
  connections: string[];
  furtherQuestions: string[];
  discipline: string;
}

export interface CuriosityChainData {
  title: string;
  steps: Array<{
    title: string;
    content: string;
    question: string;
    discipline: string;
  }>;
}

export interface ConnectionData {
  connections: Array<{
    targetTitle: string;
    relationship: string;
    explanation: string;
    strength: number;
  }>;
}

export async function generateDailyCuriosity(
  discipline?: string
): Promise<DailyCuriosityData> {
  const disciplinePrompt = discipline
    ? `Focus on the discipline: ${discipline}`
    : "Choose a fascinating discipline from: Physics, Biology, Mathematics, Philosophy, Engineering, Art, History, Psychology, Astronomy, Chemistry, Neuroscience, Economics";

  const prompt = `You are a brilliant intellectual guide inspired by Leonardo Da Vinci's curiosity. Generate a fascinating daily discovery for someone who loves deep intellectual exploration.

${disciplinePrompt}

Generate a rich, intellectually stimulating discovery. Return ONLY valid JSON in this exact format:
{
  "title": "A captivating title for this discovery (10-15 words)",
  "fact": "A stunning, counterintuitive, or deeply fascinating fact (2-3 sentences)",
  "explanation": "A clear, engaging scientific/intellectual explanation (4-6 sentences)",
  "significance": "Why this matters for our understanding of the world (3-4 sentences)",
  "history": "The historical context and how this was discovered or developed (3-4 sentences)",
  "connections": ["connection to another field or concept", "another unexpected connection", "a third fascinating connection"],
  "questions": ["A deep follow-up question this raises", "Another profound question", "A philosophical or practical question"],
  "discipline": "The primary discipline (single word like Physics, Biology, Mathematics, etc.)"
}`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from AI");
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not extract JSON from AI response");
  }

  return JSON.parse(jsonMatch[0]) as DailyCuriosityData;
}

export async function generateDeepDive(
  topic: string,
  _nodeId?: string
): Promise<DeepDiveData> {
  const prompt = `You are a brilliant polymath like Leonardo Da Vinci. Provide an extraordinarily deep and fascinating exploration of this topic: "${topic}"

Return ONLY valid JSON in this exact format:
{
  "title": "Deep Dive: ${topic}",
  "overview": "A compelling overview that hooks the reader immediately (3-4 sentences)",
  "scientificExplanation": "The precise scientific or intellectual explanation with key principles (5-7 sentences)",
  "analogy": "A brilliant, illuminating analogy that makes this concept click (3-4 sentences)",
  "historicalContext": "The rich historical story behind this concept (4-5 sentences)",
  "modernApplications": "How this knowledge is applied in modern science, technology, or everyday life (4-5 sentences)",
  "connections": ["A surprising connection to another field", "Another cross-disciplinary link", "A philosophical or mathematical connection", "A connection to human experience"],
  "furtherQuestions": ["The deepest question this raises", "A practical question for further exploration", "A philosophical question", "A question about future possibilities"],
  "discipline": "Primary discipline"
}`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from AI");
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not extract JSON from AI response");
  }

  return JSON.parse(jsonMatch[0]) as DeepDiveData;
}

export async function generateCuriosityChain(
  topic: string
): Promise<CuriosityChainData> {
  const prompt = `You are Leonardo Da Vinci's intellectual spirit, guiding someone through a chain of connected discoveries. Start with "${topic}" and create a fascinating intellectual journey of 5 connected steps, each building on the last.

Return ONLY valid JSON in this exact format:
{
  "title": "The ${topic} Curiosity Chain",
  "steps": [
    {
      "title": "Step 1 title (the starting concept)",
      "content": "Fascinating explanation of this step (3-4 sentences)",
      "question": "The question that leads to the next step",
      "discipline": "Primary discipline for this step"
    },
    {
      "title": "Step 2 title (following the question)",
      "content": "Fascinating explanation (3-4 sentences)",
      "question": "The question that leads further",
      "discipline": "Primary discipline"
    },
    {
      "title": "Step 3 title",
      "content": "Fascinating explanation (3-4 sentences)",
      "question": "The question that leads further",
      "discipline": "Primary discipline"
    },
    {
      "title": "Step 4 title",
      "content": "Fascinating explanation (3-4 sentences)",
      "question": "The question that leads further",
      "discipline": "Primary discipline"
    },
    {
      "title": "Step 5 title (surprising destination)",
      "content": "The surprising culminating insight (3-4 sentences)",
      "question": "An open question for further exploration",
      "discipline": "Primary discipline"
    }
  ]
}`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2500,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from AI");
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not extract JSON from AI response");
  }

  return JSON.parse(jsonMatch[0]) as CuriosityChainData;
}

export async function generateConnections(
  nodeTitle: string,
  existingNodes: string[]
): Promise<ConnectionData> {
  const nodesContext =
    existingNodes.length > 0
      ? `Existing knowledge nodes: ${existingNodes.join(", ")}`
      : "No existing nodes yet";

  const prompt = `You are a brilliant polymath identifying deep intellectual connections. For the concept "${nodeTitle}", find meaningful connections to other fields and ideas.

${nodesContext}

Return ONLY valid JSON in this exact format:
{
  "connections": [
    {
      "targetTitle": "Connected concept or field",
      "relationship": "builds_on|related_to|inspired_by|application_of",
      "explanation": "Why and how these are connected (2-3 sentences)",
      "strength": 0.9
    },
    {
      "targetTitle": "Another connected concept",
      "relationship": "related_to",
      "explanation": "The surprising connection (2-3 sentences)",
      "strength": 0.7
    },
    {
      "targetTitle": "A third connection",
      "relationship": "inspired_by",
      "explanation": "How one inspired the other (2-3 sentences)",
      "strength": 0.8
    }
  ]
}

Note: strength is a float between 0 and 1 representing connection strength. If any target titles match existing nodes, prefer those.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from AI");
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not extract JSON from AI response");
  }

  return JSON.parse(jsonMatch[0]) as ConnectionData;
}
