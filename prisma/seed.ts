import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedData = [
  {
    date: "2026-03-04",
    title: "Quantum Entanglement: Spooky Action at a Distance",
    fact: "When two particles become quantum entangled, measuring one instantly affects the other — regardless of whether they're separated by a meter or a galaxy. Einstein called this 'spooky action at a distance' and refused to believe it was real.",
    explanation: "Quantum entanglement occurs when pairs of particles interact in ways such that the quantum state of each particle cannot be described independently. When you measure a property (like spin) of one entangled particle, its partner instantly 'knows' the result and adopts a complementary state. This doesn't violate relativity because no usable information can be transmitted faster than light — the outcomes are random. The phenomenon has been experimentally verified countless times since the 1970s, and today powers quantum computing and quantum cryptography.",
    significance: "Entanglement challenges our deepest intuitions about locality and reality. It suggests that the universe at the quantum scale is fundamentally non-local — particles maintain connections across space that classical physics cannot explain. This isn't just philosophy; quantum computers harness entanglement to solve problems that would take classical computers the age of the universe.",
    history: "Einstein, Podolsky, and Rosen proposed the 'EPR paradox' in 1935, arguing that quantum mechanics must be incomplete — surely there were 'hidden variables' explaining entanglement. In 1964, John Bell devised a mathematical test to distinguish quantum entanglement from any hidden-variable theory. In the 1980s, Alain Aspect's experiments confirmed quantum mechanics was right. Einstein was wrong about this one. Bell, Aspect and others received the Nobel Prize in Physics 2022 for this work.",
    connections: JSON.stringify([
      "Entanglement is the backbone of quantum cryptography — enabling theoretically unbreakable encryption",
      "The phenomenon parallels synchronicity in Jungian psychology — meaningful connections that transcend space",
      "String theory proposes that entanglement is actually geometric — connected particles share a 'wormhole' in spacetime"
    ]),
    questions: JSON.stringify([
      "If entanglement persists across the universe, could consciousness itself be a quantum-entangled phenomenon?",
      "What does it mean for our concept of 'reality' if a particle has no definite state until observed?",
      "Could quantum entanglement ever be used for faster-than-light communication, or is that forever impossible?"
    ]),
    discipline: "Physics",
    nodeType: "fact"
  },
  {
    date: "2026-03-05",
    title: "The Octopus: Nine Brains, Three Hearts, and Alien Intelligence",
    fact: "An octopus has nine brains — one central brain and one in each of its eight arms. Each arm can taste, touch, and make decisions independently. They can solve puzzles, use tools, recognize individual humans, and have been observed playing. Yet their entire existence lasts only 1-2 years.",
    explanation: "Octopus intelligence evolved completely independently from vertebrate intelligence — they are our evolutionary cousins so distant that our last common ancestor was a primitive flatworm 750 million years ago. Their nervous system is radically distributed: two-thirds of their neurons are in their arms, allowing each arm to act semi-autonomously. They can change color and texture in milliseconds using chromatophores — despite being colorblind. This suggests a form of cognition so alien that studying it is helping us rethink what intelligence fundamentally is.",
    significance: "Octopuses represent one of the only examples of complex intelligence evolving completely independently on Earth. This suggests that intelligence isn't an evolutionary accident — it's a convergent solution. Understanding octopus cognition challenges anthropocentric views of consciousness and suggests that awareness and problem-solving might arise through many different architectures. Their distributed neural system also inspires robotics and AI design.",
    history: "Aristotle called octopuses 'stupid' in 350 BCE because they would approach humans without fear. For centuries they were thought to be simple invertebrates. The first systematic studies of octopus intelligence began in the 1950s. In 2019, researchers discovered octopuses dream and change color during REM sleep. Their genome was sequenced in 2015, revealing genes unique in the animal kingdom — and found to share surprising similarities with human brain genes.",
    connections: JSON.stringify([
      "The octopus's distributed cognition mirrors modern AI architectures with parallel processing units",
      "Their ability to change color for communication challenges our assumption that vision requires a brain",
      "The short lifespan paradox — why would evolution invest in such intelligence for only 2 years? — parallels questions about mayflies and meaning"
    ]),
    questions: JSON.stringify([
      "If an octopus arm can make decisions independently, how many 'selves' is an octopus?",
      "Could there be forms of consciousness so alien that we would fail to recognize them?",
      "What would human cognition look like if our hands could think independently?"
    ]),
    discipline: "Biology",
    nodeType: "fact"
  },
  {
    date: "2026-03-06",
    title: "The Golden Ratio: Nature's Hidden Aesthetic Algorithm",
    fact: "The golden ratio (φ ≈ 1.618) appears throughout nature — in nautilus shells, sunflower seeds, galaxy spirals, and human facial proportions. It's also the most irrational number, meaning it's the hardest number to approximate with fractions, which paradoxically makes it the most efficient packing algorithm in nature.",
    explanation: "The golden ratio emerges when you divide a line such that the ratio of the whole to the larger segment equals the ratio of the larger to the smaller segment. Mathematically, φ = (1+√5)/2 ≈ 1.618. It's intimately connected to the Fibonacci sequence: each successive Fibonacci number divided by the previous approaches φ. In sunflowers, seeds are packed at intervals of 360°/φ² — this creates the optimal packing where no seed wastes space. This isn't coincidence or selection; it's the mathematical consequence of growth by a constant rate.",
    significance: "The golden ratio suggests that beauty and efficiency are the same thing — what we perceive as aesthetically pleasing often represents mathematical optimization. This connects aesthetics to mathematics, art to biology, and perception to physics. Renaissance artists like Da Vinci used it deliberately; nature discovered it through evolution. The fact that humans find φ-proportioned objects beautiful might reflect our brains recognizing deep mathematical patterns.",
    history: "Euclid described the 'extreme and mean ratio' in 300 BCE. Luca Pacioli called it 'divine proportion' in 1509, with illustrations by Da Vinci. The term 'golden ratio' only appeared in the 1800s. Adolf Zeising spent his life measuring everything from human bodies to Greek temples finding φ. Modern analysis shows many classic claims were exaggerated — but the genuine mathematical appearances in phyllotaxis (plant growth) are indisputable and fascinating.",
    connections: JSON.stringify([
      "The golden ratio is connected to optimal search algorithms — computer science uses 'golden section search' for efficiency",
      "Stock market analysts use Fibonacci retracement levels based on φ to predict price movements",
      "The logarithmic spiral of φ appears identically in hurricanes, DNA helixes, and galaxy arms"
    ]),
    questions: JSON.stringify([
      "Is mathematical beauty discovered or invented — did φ exist before any mind to perceive it?",
      "If nature 'found' the golden ratio through evolution, does this suggest mathematics is more fundamental than matter?",
      "Could alien civilizations with different sensory systems find φ beautiful, or is that uniquely human?"
    ]),
    discipline: "Mathematics",
    nodeType: "fact"
  },
  {
    date: "2026-03-07",
    title: "Stoicism: The Ancient Philosophy That Runs Silicon Valley",
    fact: "Stoicism — a 2,300-year-old Greek philosophy — teaches that the only thing we truly control is our judgments and responses. Yet this ancient wisdom has become the unofficial philosophy of modern CEOs, Navy SEALs, athletes, and Silicon Valley founders. Marcus Aurelius wrote his Stoic meditations as private notes — never meant for publication. They became one of history's most read books.",
    explanation: "Stoicism was founded by Zeno of Citium around 300 BCE. Its central insight: the world is divided into things in our control (our thoughts, desires, judgments) and things not in our control (everything else). Suffering arises when we want externals (wealth, fame, health) to be different — but these aren't ours to control. The Stoics didn't advocate passivity; Stoic practitioners included generals, emperors, and slaves. They argued for living virtuously, engaging fully with life while maintaining 'equanimity' — mental stability amid chaos.",
    significance: "Cognitive Behavioral Therapy (CBT) — the most evidence-based psychotherapy — was explicitly modeled on Stoicism. Albert Ellis, CBT's founder, cited Epictetus directly. Stoicism's distinction between 'preferred indifferents' (things that are nice but not essential) and genuine goods (virtue, wisdom) offers a framework for navigating modern consumer culture. Its emphasis on memento mori — remembering death — as a tool for gratitude predates positive psychology by millennia.",
    history: "Zeno started teaching at the Stoa Poikile (painted porch) in Athens — giving Stoicism its name. Three great Stoics defined it: Epictetus (a slave), Marcus Aurelius (a Roman emperor), and Seneca (a playwright). The school declined with Christianity but was rediscovered in the Renaissance. Ryan Holiday's 2014 book 'The Obstacle Is The Way' sparked the modern Stoicism revival. Today, 'Stoicon' conferences draw thousands globally.",
    connections: JSON.stringify([
      "Stoicism's 'dichotomy of control' maps precisely onto modern locus of control psychology research",
      "Buddhist non-attachment and Stoic indifference to externals converged independently 2,500 years ago",
      "Stoicism inspired Epictetus, who inspired Marcus Aurelius, who inspired Frederick the Great, who influenced Kant's categorical imperative"
    ]),
    questions: JSON.stringify([
      "If Stoicism says we should accept what we cannot control, how do we distinguish acceptance from complicity in injustice?",
      "Is the Stoic 'self' — the inner citadel of judgment — consistent with neuroscience's view that 'we' are just neural patterns?",
      "Could a society of Stoics function — or does progress require discontent?"
    ]),
    discipline: "Philosophy",
    nodeType: "fact"
  },
  {
    date: "2026-03-08",
    title: "Resonance: How Soldiers Destroyed a Bridge by Walking in Step",
    fact: "In 1831, a column of British soldiers marching in step across the Broughton Suspension Bridge caused it to resonate at its natural frequency, amplifying oscillations until the bridge collapsed. Today, soldiers are ordered to break step when crossing bridges. The same principle destroyed the Tacoma Narrows Bridge in 1940 — and it's how opera singers shatter wine glasses.",
    explanation: "Every physical object has a natural frequency at which it vibrates most efficiently. When an external force applies energy at this exact frequency, the oscillations amplify — a phenomenon called resonance. The Tacoma Narrows Bridge didn't fail because wind pushed it; it failed because wind created vortices at the bridge's natural frequency, feeding energy into its oscillations until structural limits were exceeded. Resonance is why MRI machines work (hydrogen atoms resonate in magnetic fields), why microwave ovens heat food (water molecules resonate at 2.45 GHz), and why guitar bodies amplify strings.",
    significance: "Resonance is one of physics' most universal phenomena — it appears in mechanical systems, electrical circuits, quantum mechanics, and even economics (boom-bust cycles can be modeled as economic resonance). Understanding resonance is why modern buildings are engineered with tuned mass dampers — giant pendulums inside skyscrapers that counteract resonance during earthquakes and storms. The Taipei 101 has a 660-ton steel ball for this purpose.",
    history: "The Broughton Bridge collapse of 1831 was the first engineering disaster attributed to resonance. The Tacoma Narrows Bridge collapse of 1940 was filmed and became one of the most studied engineering failures in history — though modern analysis shows the mechanism was more complex than simple resonance. Nikola Tesla claimed to have built a mechanical oscillator that nearly brought down a New York building by matching its resonant frequency — though this story may be apocryphal.",
    connections: JSON.stringify([
      "Neural oscillations in the brain follow resonance principles — theta and gamma waves synchronize information processing",
      "Market crashes can be modeled as resonance phenomena where positive feedback loops amplify small disturbances",
      "The double helix structure of DNA was partly determined by X-ray diffraction — using resonance of X-rays with atomic structures"
    ]),
    questions: JSON.stringify([
      "If the universe had a natural frequency, could you destroy it by matching it?",
      "How do noise-canceling headphones use anti-resonance, and what does this reveal about the nature of waves?",
      "Could social movements be understood as resonance phenomena — ideas that match the 'frequency' of a culture's readiness?"
    ]),
    discipline: "Engineering",
    nodeType: "fact"
  },
  {
    date: "2026-03-09",
    title: "Chiaroscuro: How Da Vinci Invented Darkness to Create Light",
    fact: "Leonardo Da Vinci developed chiaroscuro — the dramatic use of light and shadow — to create three-dimensional forms on flat surfaces. His technique of sfumato (Italian for 'smoke') allowed him to blend tones so gradually that edges seemed to dissolve into shadow. The Mona Lisa's mysterious smile exists partly because peripheral vision perceives shadow differently than direct gaze.",
    explanation: "Chiaroscuro (Italian: 'light-dark') creates the illusion of depth by modeling forms with gradations from bright highlights to deep shadows. Da Vinci's innovation was sfumato — applying thin, translucent glazes that built up shadow so gradually no edges could be detected. The human visual system uses shadow to perceive three-dimensional form; chiaroscuro exploits this system to create 3D illusions on 2D surfaces. Caravaggio later radicalized it into tenebrism — placing figures against absolute darkness, creating theatrical spotlighting effects.",
    significance: "Chiaroscuro transformed art by shifting from symbolic representation (medieval flat painting) to perceptual realism. This was both an artistic revolution and a scientific one — Da Vinci developed it through systematic study of optics, anatomy, and how eyes perceive form. The technique influenced photography, cinema lighting, and even neuroscience — the Mona Lisa smile illusion is now studied as a model of how peripheral versus foveal vision process ambiguous stimuli differently.",
    history: "Da Vinci developed chiaroscuro in the 1480s, culminating in the Last Supper (1498) and Mona Lisa (1503-1519). He wrote extensively about it in his notebooks, developing a theory of light that wouldn't be equaled until Kepler's optics. Caravaggio (1571-1610) radicalized it into tenebrism. Rembrandt mastered it in the 17th century. It directly influenced cinematic lighting — Hollywood's golden age cinematographers explicitly cited Renaissance painting. Georges de La Tour took it so far he painted candlelit scenes where the candle was the only light source.",
    connections: JSON.stringify([
      "Chiaroscuro in cinema created noir lighting — the visual language of moral ambiguity through light and shadow",
      "The psychology of shadow — Jungian 'shadow work' — mirrors chiaroscuro: revealing the self by illuminating what's hidden",
      "Architects use chiaroscuro principles in building design, using shadows to reveal and conceal structural forms"
    ]),
    questions: JSON.stringify([
      "Does the way we use light and shadow in art shape how we culturally understand good and evil?",
      "If Da Vinci had photography, would he still have needed to invent sfumato?",
      "What does the Mona Lisa smile illusion reveal about the gap between what we see and what we perceive?"
    ]),
    discipline: "Art",
    nodeType: "fact"
  },
  {
    date: "2026-03-10",
    title: "The Library of Alexandria: History's Most Consequential Fire",
    fact: "The Great Library of Alexandria didn't burn in one dramatic fire — it was slowly eroded over centuries through budget cuts, staff departures, political neglect, and civil wars. Julius Caesar's accidental fire in 48 BCE burned only a warehouse of books awaiting export. The library's true death was a slow suffocation, not a dramatic blaze — a fact that makes it both more tragic and more relevant today.",
    explanation: "Founded around 295 BCE under Ptolemy I, the Library systematically collected all written knowledge — reportedly purchasing or confiscating all books from ships entering Alexandria's harbor and keeping the originals while giving copies to travelers. At its peak it may have held 700,000 scrolls — the entirety of Greek, Egyptian, Babylonian, Jewish, Persian, and Indian knowledge. Its scholars calculated Earth's circumference (Eratosthenes, to within 1%), proposed heliocentrism (Aristarchus), and performed the first critical analysis of Homer. The gradual decline under Roman rule meant centuries of knowledge accumulation simply... stopped being funded.",
    significance: "The Library represents our first experiment in universal knowledge preservation — and its failure suggests that knowledge isn't naturally self-sustaining. The myth of the single catastrophic fire serves a psychological need: we want dramatic causes for dramatic losses. The reality — slow institutional decay, funding cuts, political indifference — is harder to narrativize but more important to understand. Every generation believes its accumulated knowledge is secure; the Library suggests otherwise.",
    history: "The Library was founded as part of the Mouseion (museum) — literally 'seat of the Muses.' Callimachus cataloged its contents in the Pinakes — the first library catalog, at 120 volumes. The Library declined under Rome (who preferred military to intellectual investment), was damaged in Caesar's campaign, further reduced by Caracalla in 215 CE, and effectively ended when the Christian Bishop Theophilus had the attached temple converted in 391 CE. Ibn Khaldun's 14th century account of Arab general Amr burning it ('If the books agree with the Quran, they are unnecessary; if they disagree, they are heretical') is widely regarded as fabricated legend.",
    connections: JSON.stringify([
      "The Library's slow death through defunding mirrors modern debates about public humanities education and research",
      "Digital preservation faces the Library of Alexandria problem in reverse: too much is saved, but format obsolescence may make it unreadable",
      "The Library's polyglot, cross-cultural scholarship prefigures the modern internet's original ideal as a global knowledge commons"
    ]),
    questions: JSON.stringify([
      "If we had the Library's lost texts today, which would most change our understanding of history?",
      "Is Wikipedia the Library of Alexandria's successor — and what are the warning signs that it could fail?",
      "Does every civilization eventually lose more knowledge than it produces? What would break this cycle?"
    ]),
    discipline: "History",
    nodeType: "fact"
  },
  {
    date: "2026-03-11",
    title: "Flow State: The Neuroscience of Optimal Experience",
    fact: "Mihaly Csikszentmihalyi's 40-year study found that peak human happiness doesn't come from relaxation or pleasure, but from 'flow' — a state of complete absorption in a challenging task perfectly matched to your skills. In flow, the brain's default mode network goes quiet, time distorts, and performance can increase 500%. Athletes call it 'the zone.'",
    explanation: "Flow occurs when challenge and skill are in perfect balance. Too easy and you're bored; too hard and you're anxious. In the sweet spot, the prefrontal cortex — responsible for self-criticism and rumination — downregulates in a process called 'transient hypofrontality.' This is why flow feels effortless despite being high-performance: the inner critic goes offline. Neurochemically, flow floods the brain with dopamine, norepinephrine, serotonin, anandamide, and endorphins — simultaneously. It's the brain's maximum performance cocktail.",
    significance: "Flow research challenges hedonism — the idea that pleasure is life's goal. Csikszentmihalyi found that people in flow rated their quality of life highest, even though in the moment they reported neutral or negative emotions (absorption is so complete they don't notice feelings). This suggests the good life involves challenge and growth, not comfort. Flow also shows that consciousness has an optimal state — suggesting it could be engineered through appropriate challenge calibration, which has major implications for education, work design, and therapy.",
    history: "Csikszentmihalyi began studying flow in the 1960s by studying chess players, rock climbers, surgeons, and artists who did their work for intrinsic rather than extrinsic rewards. He published 'Flow: The Psychology of Optimal Experience' in 1990. The concept was adopted by sports psychology in the 1970s as 'the zone.' Steven Kotler founded the Flow Research Collective, applying flow science to extreme athletes and corporate performance. The neuroscience of flow (using fMRI and EEG) has confirmed many of Csikszentmihalyi's psychological observations since 2000.",
    connections: JSON.stringify([
      "Flow's transient hypofrontality resembles psychedelic states — both temporarily quiet the default mode network",
      "Game design explicitly engineers flow: difficulty curves are calibrated to keep players in the challenge-skill balance",
      "Zen meditation and flow describe the same cognitive state from different cultural frameworks: 'mushin' (no-mind) is flow"
    ]),
    questions: JSON.stringify([
      "If flow is optimal human functioning, why has modern life become so systematically anti-flow (notifications, multitasking, shallow work)?",
      "Could a society be designed around flow — and what would it sacrifice in terms of equality and efficiency?",
      "If the inner critic goes offline in flow, who is doing the achieving? What does this reveal about the 'self'?"
    ]),
    discipline: "Psychology",
    nodeType: "fact"
  },
];

async function main() {
  console.log("Seeding database...");

  for (const seed of seedData) {
    // Create a knowledge node
    const node = await prisma.knowledgeNode.create({
      data: {
        title: seed.title,
        content: seed.fact + "\n\n" + seed.explanation,
        type: seed.nodeType,
        discipline: seed.discipline,
        explored: true,
      },
    });

    // Create the daily curiosity
    await prisma.dailyCuriosity.upsert({
      where: { date: seed.date },
      update: {},
      create: {
        date: seed.date,
        title: seed.title,
        fact: seed.fact,
        explanation: seed.explanation,
        significance: seed.significance,
        history: seed.history,
        connections: seed.connections,
        questions: seed.questions,
        discipline: seed.discipline,
        nodeId: node.id,
      },
    });

    console.log(`✓ Created: ${seed.title}`);
  }

  // Create some edges between related nodes
  const nodes = await prisma.knowledgeNode.findMany();

  const edgePairs = [
    [0, 5], // Physics - Art (light)
    [1, 3], // Biology - Philosophy (consciousness)
    [2, 0], // Mathematics - Physics (quantum math)
    [3, 7], // Philosophy - Psychology (Stoicism/Flow)
    [4, 2], // Engineering - Mathematics (resonance math)
    [5, 6], // Art - History (Library/Art connection)
    [6, 3], // History - Philosophy (ancient wisdom)
    [7, 1], // Psychology - Biology (brain/consciousness)
    [2, 5], // Mathematics - Art (golden ratio/aesthetics)
    [0, 4], // Physics - Engineering (resonance physics)
  ];

  const relationships = [
    "related_to",
    "builds_on",
    "inspired_by",
    "application_of",
  ];

  for (const [sourceIdx, targetIdx] of edgePairs) {
    if (nodes[sourceIdx] && nodes[targetIdx]) {
      await prisma.knowledgeEdge.create({
        data: {
          sourceId: nodes[sourceIdx].id,
          targetId: nodes[targetIdx].id,
          relationship: relationships[Math.floor(Math.random() * relationships.length)],
          strength: Math.random() * 0.5 + 0.5,
        },
      });
    }
  }

  // Create a sample notebook entry
  await prisma.notebookEntry.create({
    data: {
      title: "Connections Between Quantum Entanglement and Consciousness",
      content: "Reading about quantum entanglement today made me wonder: if particles can maintain non-local connections across space, could consciousness be similarly non-local? Penrose and Hameroff's Orchestrated Objective Reduction theory suggests quantum effects in microtubules might underlie consciousness.\n\nBut I'm skeptical — the brain is too warm and wet for quantum coherence to persist. Yet the octopus problem is fascinating: if consciousness can arise in such a radically different architecture, maybe our assumptions about what consciousness requires are fundamentally wrong.\n\nKey question: Is the universe computational (like Wheeler's 'it from bit'), or is computation itself a subset of something more fundamental that consciousness taps into?",
      type: "hypothesis",
      nodeId: nodes[0]?.id,
    },
  });

  await prisma.notebookEntry.create({
    data: {
      title: "Why Flow States Feel Like Timelessness",
      content: "The flow state research connects beautifully with Buddhist concepts of 'now'. When the default mode network quiets and we're fully absorbed, we stop constructing the narrative of 'self moving through time'. Time perception is constructed by the brain, not directly experienced.\n\nThis suggests: boredom and anxiety might both be symptoms of excessive self-referential thinking. The antidote is absorption — not necessarily flow, but genuine engagement with something outside the self.\n\nDa Vinci must have spent hours in flow states studying anatomy, painting, designing machines. His notebooks suggest someone constantly absorbed, constantly curious. That's the practice.",
      type: "insight",
      nodeId: nodes[7]?.id,
    },
  });

  console.log("\nDatabase seeded successfully!");
  console.log(`Created ${seedData.length} daily curiosities and knowledge nodes`);
  console.log(`Created ${edgePairs.length} knowledge edges`);
  console.log("Created 2 sample notebook entries");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
