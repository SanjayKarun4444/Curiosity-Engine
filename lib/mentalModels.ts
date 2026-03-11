export interface MentalModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  example: string;
  applications: string[];
  pitfalls: string;
  origin: string;
  category: string;
  disciplines: string[];
}

export const MENTAL_MODEL_CATEGORIES = [
  "Thinking",
  "Decision Making",
  "Systems",
  "Human Nature",
  "Science",
  "Economics",
] as const;

export const MENTAL_MODELS: MentalModel[] = [
  {
    id: "first-principles",
    name: "First Principles Thinking",
    tagline: "Break problems down to their fundamental truths",
    description:
      "Instead of reasoning by analogy — doing what has always been done — first principles thinking involves breaking complex problems to their most basic, foundational elements and rebuilding from there. Elon Musk used this to reduce rocket costs by 10x by asking: what is a rocket made of? What do those raw materials cost on the open market? Then figure out how to buy them at commodity prices and assemble differently.",
    example:
      "Instead of accepting 'electric cars can't be affordable,' ask: what are batteries made of? (lithium, cobalt, nickel). What would those materials cost at commodity prices? Then assemble at scale. Tesla broke the entire EV industry's cost structure this way — not by iterating on existing designs but by questioning which costs were actually necessary.",
    applications: [
      "Innovation and invention",
      "Problem-solving in unfamiliar domains",
      "Entrepreneurship and startup strategy",
      "Engineering design",
    ],
    pitfalls:
      "Can be time-consuming and requires deep domain knowledge to identify what the 'first principles' actually are. Sometimes analogy-based thinking is more efficient for non-novel problems. The danger is believing you've reached first principles when you've just reached your own assumptions.",
    origin:
      "Aristotle described first principles as 'the first basis from which a thing is known.' Descartes applied it in his Meditations. The term was revived in modern usage primarily through Elon Musk's interviews explaining SpaceX's cost reductions.",
    category: "Thinking",
    disciplines: ["Philosophy", "Engineering", "Physics"],
  },
  {
    id: "inversion",
    name: "Inversion",
    tagline: "Solve problems backwards",
    description:
      "Instead of thinking only about what you want to achieve, think about what you want to avoid and work backwards. Charlie Munger: 'Invert, always invert.' Rather than 'how do I succeed?' ask 'what would guarantee failure?' — then avoid those things. Rather than 'how do I make customers happy?' ask 'what would make them miserable?' and eliminate all of that. Inversion exposes the obvious that forward thinking misses.",
    example:
      "To write a great speech, first list everything that makes speeches terrible: clichés, no clear message, going over time, speaking too fast, no stories, no stakes. Eliminate all of those and you've dramatically improved your speech without ever asking 'how to be great.' Warren Buffett uses inversion constantly: 'Tell me where I'm going to die, so I'll never go there.'",
    applications: [
      "Risk management and failure prevention",
      "Quality improvement",
      "Strategic planning",
      "Writing and communication",
    ],
    pitfalls:
      "Can lead to excessive negativity if used in isolation. Best combined with positive goal-setting. Also, not all problems have clear inverse states — inversion works best for problems with definable failure modes.",
    origin:
      "The mathematician Carl Jacobi: 'Man muss immer umkehren' (Always invert). Popularized in modern business by Charlie Munger through 'The Psychology of Human Misjudgment' and various Berkshire Hathaway talks.",
    category: "Thinking",
    disciplines: ["Mathematics", "Philosophy", "Economics"],
  },
  {
    id: "second-order",
    name: "Second-Order Thinking",
    tagline: "Consider the consequences of consequences",
    description:
      "First-order thinking considers immediate outcomes. Second-order thinking asks: and then what? Most people stop at first-order effects. Second-order thinkers ask what happens after the immediate consequence, and then after that. Howard Marks: 'First-level thinking says, it's a good company; let's buy the stock. Second-level thinking says, it's a good company, but everyone thinks it's great, so it's overpriced; let's sell.'",
    example:
      "Cobra Effect: The British government in India offered bounties for dead cobras to reduce the population (first-order: fewer cobras). Entrepreneurial Indians bred cobras to collect bounties (second-order effect). When the government cancelled the program, breeders released their now-worthless cobras, massively increasing the wild population (third-order: more cobras than before the intervention).",
    applications: [
      "Policy-making and legislation",
      "Investment decisions",
      "Product design",
      "Parenting and education",
    ],
    pitfalls:
      "Analysis paralysis: thinking through too many orders becomes impractical. Each level of reasoning compounds uncertainty. The lesson is to think two or three levels ahead, not to infinite regress. Also useful for identifying unintended consequences, not predicting them with certainty.",
    origin:
      "Popularized by investor Howard Marks in 'The Most Important Thing.' Related to systems dynamics and Robert Merton's 1936 concept of 'unintended consequences' in sociology.",
    category: "Thinking",
    disciplines: ["Economics", "Psychology"],
  },
  {
    id: "occams-razor",
    name: "Occam's Razor",
    tagline: "The simplest explanation is usually correct",
    description:
      "When multiple explanations exist for a phenomenon, the one with fewest assumptions is usually correct. Named after 14th-century friar William of Ockham: 'entities should not be multiplied beyond necessity.' In science, this is the principle of parsimony. Not a guarantee of truth — but a powerful heuristic for choosing between competing hypotheses before gathering more evidence.",
    example:
      "If you hear hoofbeats, think horses not zebras. If a patient has fever and cough, it's more likely a common cold than a rare tropical disease. The simpler explanation — common causes — should be tested first. In cosmology, simpler models (like the Big Bang) are preferred over more complex alternatives when both explain the same observations, until the complex model makes unique predictions.",
    applications: [
      "Scientific hypothesis selection",
      "Medical diagnosis",
      "Conspiracy theory evaluation",
      "Debugging software and systems",
    ],
    pitfalls:
      "The universe isn't obligated to be simple. Quantum mechanics and general relativity are not simple theories — they are the simplest theories that explain the observed data. The razor cuts false positives (overcomplicated theories), not false negatives. Never use it to dismiss a complex explanation without testing it.",
    origin:
      "William of Ockham (1287-1347): 'Entities should not be multiplied without necessity.' Einstein paraphrase: 'Everything should be made as simple as possible, but not simpler.' Leibniz formalized it in the Principle of Sufficient Reason.",
    category: "Science",
    disciplines: ["Philosophy", "Physics", "Mathematics"],
  },
  {
    id: "hanlon-razor",
    name: "Hanlon's Razor",
    tagline: "Never attribute to malice what can be explained by incompetence",
    description:
      "Most of the time, when something bad happens to you, it wasn't malicious intent — it was a mistake, oversight, or incompetence. Assuming malice when incompetence is sufficient causes unnecessary conflict, paranoia, and escalation. Hanlon's Razor is a direct counter to the fundamental attribution error and conspiracy thinking. It's also a powerful tool for maintaining relationships and organizational health.",
    example:
      "Your colleague didn't respond to your email. You could assume they're ignoring you (malice). Or they forgot, were overwhelmed, or the email went to spam (incompetence). Acting on the incompetence assumption maintains the relationship and resolves the situation. Acting on malice damages the relationship and escalates. Most institutional failures are Hanlon's Razor situations: not evil, just miscommunication and incompetence.",
    applications: [
      "Conflict resolution and de-escalation",
      "Organizational culture",
      "News consumption and media literacy",
      "Online communication",
    ],
    pitfalls:
      "Occasionally, malice is real and must be named. This razor shouldn't prevent identifying genuine bad actors or structural injustice. The lesson is to start with incompetence as the hypothesis and require evidence to conclude malice — not to permanently excuse harmful behavior through attribution to error.",
    origin:
      "Attributed to Robert J. Hanlon, included in a Murphy's Law joke book in 1980. Goethe earlier: 'Misunderstandings and neglect create more confusion in this world than trickery and malice.' Napoleon: 'Never ascribe to malice that which is adequately explained by incompetence.'",
    category: "Human Nature",
    disciplines: ["Psychology", "Philosophy"],
  },
  {
    id: "map-territory",
    name: "The Map is Not the Territory",
    tagline: "Models are useful but always incomplete representations of reality",
    description:
      "Alfred Korzybski: 'The map is not the territory.' Our mental models, theories, and frameworks are maps of reality — not reality itself. A map is useful because it simplifies, but it is always wrong in some way. The danger is confusing the map for the territory. George Box: 'All models are wrong, some are useful.' The question is not whether your model is true, but whether it's useful.",
    example:
      "Economic models (supply/demand curves) are useful maps that fail in edge cases — the 2008 financial crisis models didn't account for rare correlated failures. Scientists use the Bohr model of atoms (electrons in circular orbits) knowing it's incorrect, because it's useful for certain predictions. The word 'dog' is a map — it represents a category of beings, not any specific dog.",
    applications: [
      "Scientific epistemology and model evaluation",
      "Business strategy",
      "Statistical modeling and AI",
      "Risk management",
    ],
    pitfalls:
      "The trap is updating your map (theory) instead of investigating the territory (reality). If your theory doesn't match observations, don't adjust the observations — update the theory. Paradigm shifts happen when maps become so incorrect they must be discarded entirely (Kuhn's scientific revolutions).",
    origin:
      "Alfred Korzybski, 'Science and Sanity' (1933). Related to Plato's cave allegory. Gregory Bateson expanded it in systems thinking. Karl Popper's falsifiability is a tool for testing when maps fail to match territory.",
    category: "Science",
    disciplines: ["Philosophy", "Mathematics", "Physics"],
  },
  {
    id: "circle-competence",
    name: "Circle of Competence",
    tagline: "Know what you know — and what you don't",
    description:
      "Charlie Munger and Warren Buffett: know what you're good at, stay within that domain, and resist the temptation to wander outside. Inside your circle of competence, you have genuine edge. Outside it, you're at a disadvantage against those who've spent years mastering that domain. The critical insight: the size of your circle matters less than knowing where the edges are.",
    example:
      "Warren Buffett doesn't invest in tech companies he doesn't understand. When asked about missing Amazon and Google, he admits: 'I'm not good at predicting which tech companies will dominate in 20 years.' He stays in sectors where he has deep understanding. Result: consistent outperformance in his domain for 60+ years without touching things he doesn't understand.",
    applications: [
      "Career decisions and specialization",
      "Investment strategy",
      "Hiring and team building",
      "Self-awareness development",
    ],
    pitfalls:
      "Circles can and should expand through deliberate learning. Don't use this as an excuse to never grow. The danger is overconfidence about where your circle ends — the Dunning-Kruger zone is just inside the circle's apparent edge. The most dangerous investors are those who think they understand things they don't.",
    origin:
      "Warren Buffett's 1996 shareholder letter. Philosophically related to Socratic wisdom: 'I know that I know nothing' — the foundation of intellectual humility that allows genuine learning.",
    category: "Decision Making",
    disciplines: ["Economics", "Psychology"],
  },
  {
    id: "dunning-kruger",
    name: "Dunning-Kruger Effect",
    tagline: "The less you know, the more confident you tend to be",
    description:
      "Cognitive bias where people with limited knowledge in a domain overestimate their competence — while experts tend to underestimate theirs. The learning curve creates a predictable pattern: confidence spikes rapidly with initial learning (easy gains), then drops sharply as complexity is revealed (the 'valley of despair'), then rises again as genuine mastery develops. Novices are often more confident than experts.",
    example:
      "After reading one article on macroeconomics, someone confidently explains why economists are wrong. After a PhD in economics, they say: 'It's deeply complicated.' New medical students think they understand diagnoses; experienced physicians know how often they're uncertain. The pattern repeats across domains: chess, surgery, politics, music. Experience reveals depth; novices can't see the depth yet.",
    applications: [
      "Self-assessment and calibration",
      "Team hiring and management",
      "Education design",
      "Expertise identification and evaluation",
    ],
    pitfalls:
      "The effect is somewhat contested — later replications showed it may be partly a statistical artifact. The core insight remains useful: metacognition (thinking about your thinking) is a skill that must be developed separately from domain knowledge. People who lack metacognitive skill can't accurately assess their own competence.",
    origin:
      "David Dunning and Justin Kruger, 'Unskilled and Unaware of It' (1999). Won the Ig Nobel Prize. Bertrand Russell: 'The fundamental cause of trouble in the world is that the stupid are cocksure while the intelligent are full of doubt.'",
    category: "Human Nature",
    disciplines: ["Psychology"],
  },
  {
    id: "survivorship-bias",
    name: "Survivorship Bias",
    tagline: "We only see success stories — and draw wrong conclusions",
    description:
      "We study survivors and ignore failures, drawing false conclusions. WWII statistician Abraham Wald: the military wanted to add armor to the most-shot parts of returning planes. Wald said armor the un-shot parts — because planes hit there didn't return. We only saw survivors. The same bias affects every domain: we hear about successful dropouts (Gates, Zuckerberg), not the millions who dropped out and struggled.",
    example:
      "Startup culture: we hear about the billion-dollar exits and 'overnight successes.' We don't hear about the 90% of startups that fail — they don't give TED talks. This creates false confidence in high-risk paths. History: we know about Napoleon's military genius because he survived to write about his victories. We know less about equally skilled generals who died in their first major battles.",
    applications: [
      "Investment analysis and portfolio construction",
      "Scientific methodology",
      "Historical analysis",
      "Business strategy and benchmarking",
    ],
    pitfalls:
      "Sometimes survivorship bias applies to the correction itself. Including all failures doesn't automatically reveal the correct causal analysis. You need to understand why survivors survived and why failures failed — which requires studying both populations carefully, not just including the failures in your dataset.",
    origin:
      "Abraham Wald's WWII statistical work was declassified and became famous in the 1980s. Kahneman and Tversky formalized survivorship bias as part of their broader work on cognitive heuristics and biases.",
    category: "Human Nature",
    disciplines: ["Mathematics", "Psychology", "History"],
  },
  {
    id: "feedback-loops",
    name: "Feedback Loops",
    tagline: "Outputs that become inputs — amplifying or stabilizing systems",
    description:
      "A feedback loop exists when output from a system is fed back as input, either amplifying change (positive/reinforcing feedback) or resisting it (negative/balancing feedback). Positive feedback: microphone squeal, nuclear chain reactions, stock market bubbles, viral social media, bank runs. Negative feedback: thermostats, blood sugar regulation, predator-prey population cycles.",
    example:
      "Bank runs demonstrate positive feedback: rumors of insolvency → people withdraw money → bank becomes insolvent → confirming the rumor → more withdrawals → collapse. Thermostats demonstrate negative feedback: room gets cold → heater turns on → room warms → heater turns off → room cools → cycle repeats, maintaining stability. The same principles govern ecological systems, economic cycles, and neural firing patterns.",
    applications: [
      "System design and control engineering",
      "Economics and market analysis",
      "Ecology and environmental management",
      "Organizational behavior",
    ],
    pitfalls:
      "Time delays in feedback loops cause oscillation and overshoot. The economy overshoots in boom-bust cycles partly because the feedback (job losses, credit tightening) arrives months after the signal (rate hikes). Ignoring delays leads to 'fixes that backfire' — the classic system dynamics failure mode.",
    origin:
      "Norbert Wiener's cybernetics (1948) formalized feedback loops in machines and living systems. Jay Forrester developed System Dynamics at MIT, applying feedback analysis to business and social systems. Donella Meadows popularized it in 'Thinking in Systems' (2008).",
    category: "Systems",
    disciplines: ["Engineering", "Biology", "Economics", "Physics"],
  },
  {
    id: "pareto",
    name: "Pareto Principle (80/20 Rule)",
    tagline: "80% of effects come from 20% of causes",
    description:
      "Vilfredo Pareto observed that 80% of Italy's land was owned by 20% of the population. The ratio appears everywhere: 80% of software bugs come from 20% of code; 80% of revenue from 20% of customers; 80% of results from 20% of effort. The insight: distribution of outcomes is profoundly unequal. Identify the vital few from the trivial many and allocate accordingly.",
    example:
      "In sales: identify the 20% of customers generating 80% of revenue and give them exceptional service. In productivity: identify the 20% of tasks generating 80% of your results, focus intensely on those, and ruthlessly eliminate or delegate the rest. In quality control: identify the 20% of defect types causing 80% of customer complaints and fix those first.",
    applications: [
      "Business optimization and prioritization",
      "Time management",
      "Quality control (Juran's Pareto Chart)",
      "Investment portfolio construction",
    ],
    pitfalls:
      "The 80/20 ratio is not universal — sometimes it's 95/5 or 70/30. The principle is about unequal distribution, not the specific numbers. Focusing only on the vital few can create brittleness if those inputs are disrupted. The 80% that doesn't produce results still matters for resilience and optionality.",
    origin:
      "Vilfredo Pareto, Italian economist, 1896. Joseph Juran applied it to quality management in the 1940s and named it the Pareto Principle. Richard Koch's '80/20 Principle' (1997) popularized it broadly.",
    category: "Systems",
    disciplines: ["Economics", "Mathematics"],
  },
  {
    id: "black-swan",
    name: "Black Swan Events",
    tagline: "Highly improbable events with massive, world-altering consequences",
    description:
      "Nassim Taleb: Black swan events are outliers beyond normal expectation that carry extreme impact and are rationalized in hindsight as predictable (narrative fallacy). Before 1697, Europeans believed all swans were white — finding black swans in Australia was a 'black swan event.' The financial crisis of 2008, the rise of the internet, COVID-19, World War I — all explained as inevitable after they happened, none predicted before.",
    example:
      "The 2008 financial crisis: risk models assumed housing prices couldn't fall nationally and simultaneously. The models were 'internally consistent' but catastrophically wrong about reality. The problem wasn't the unknown unknowns — it was that the models didn't even have a slot for them. Banks were not wrong within their models; the models were wrong about the world.",
    applications: [
      "Risk management and tail-risk hedging",
      "Strategy planning and scenario analysis",
      "Investment portfolio construction",
      "Disaster preparation and institutional resilience",
    ],
    pitfalls:
      "Some argue better models using fat-tailed distributions (power laws) rather than normal distributions could have anticipated 2008. The lesson isn't that black swans are impossible to anticipate — it's that we systematically underestimate tail risks because our models assume normalcy. After learning about black swans, the temptation is to see them everywhere.",
    origin:
      "Nassim Nicholas Taleb, 'The Black Swan' (2007) and 'Fooled by Randomness' (2001). Related to Mandelbrot's work on fractal geometry and power-law distributions in financial markets.",
    category: "Decision Making",
    disciplines: ["Economics", "Mathematics", "Philosophy"],
  },
  {
    id: "antifragility",
    name: "Antifragility",
    tagline: "Some things get stronger under stress — beyond mere resilience",
    description:
      "Nassim Taleb: Things that benefit from disorder, stress, and volatility are 'antifragile' — a property that goes beyond robustness (which merely resists stress). Fragile things break under stress. Robust things resist stress and remain unchanged. Antifragile things improve under stress. Muscles grow stronger from resistance. Children's immune systems develop through exposure. Ideas spread and sharpen through criticism.",
    example:
      "The mythological Hydra: cut one head, two grow back. Human bones: micro-fractures from exercise cause bones to rebuild stronger. Vaccines: exposure to a weakened pathogen trains the immune system. Entrepreneurial ecosystems: high failure rates generate learning, talent dispersal, and culture that makes the whole ecosystem stronger. Individual failure is fragile; ecosystems of failure are antifragile.",
    applications: [
      "Risk management and tail-risk hedging",
      "Personal resilience and stress tolerance",
      "Portfolio construction (barbell strategy)",
      "Organizational and system design",
    ],
    pitfalls:
      "The antifragile zone has limits — too much stress causes collapse. A bone stressed too hard breaks, not strengthens. Systems need sufficient robustness to survive enough stress to become antifragile. The optimization is 'appropriate stress with recovery time,' not 'maximum stress.' Confusing antifragility with masochism is the main pitfall.",
    origin:
      "Nassim Taleb, 'Antifragile' (2012). Philosophically related to Nietzsche: 'What doesn't kill me makes me stronger.' In biology, 'hormesis' describes beneficial effects from low doses of stressors — the same phenomenon at a cellular level.",
    category: "Systems",
    disciplines: ["Philosophy", "Biology", "Economics"],
  },
  {
    id: "mental-accounting",
    name: "Mental Accounting",
    tagline: "We irrationally treat money differently based on its source or intended use",
    description:
      "Richard Thaler: People create psychological 'accounts' for money based on its source, intended use, or emotional context. We treat a work bonus differently from a tax refund differently from inherited money — even though money is fungible (a dollar is a dollar). 'House money' from gambling is spent more freely than earned income. This irrationality is exploited in product design, pricing, and policy.",
    example:
      "Finding a $100 bill: people spend it on something frivolous. Getting a $100 tax refund: same. But saving $100 through frugality feels like sacrifice — psychologically different, economically identical. Companies exploit this: subscriptions feel cheaper than equivalent one-time payments. Gift cards are spent more freely than cash even for the same item. Casinos use chips to obscure the reality that you're spending money.",
    applications: [
      "Personal finance optimization",
      "Marketing and pricing psychology",
      "Policy design (retirement accounts, subsidies)",
      "Negotiation strategy",
    ],
    pitfalls:
      "Mental accounting can be protective: earmarking 'emergency funds' prevents spending them on non-emergencies. The problem is unconscious, irrational mental accounting that leads to poor decisions. Awareness of the bias is the first corrective — then consciously apply the fungibility rule.",
    origin:
      "Richard Thaler, 'Mental Accounting Matters' (1999). Nobel Prize in Economics 2017. Related to Kahneman and Tversky's Prospect Theory, which showed we evaluate outcomes relative to reference points, not in absolute terms.",
    category: "Economics",
    disciplines: ["Economics", "Psychology"],
  },
  {
    id: "regression-mean",
    name: "Regression to the Mean",
    tagline: "Extreme events tend to be followed by less extreme ones",
    description:
      "In any process with randomness, extreme measurements tend to be followed by measurements closer to the average. Francis Galton noticed tall parents tend to have shorter children; short parents, taller children. This is statistical, not genetic — exceptional performance is often partly luck, and luck doesn't repeat the same way. The implication: praise after excellent performance tends to be followed by worse performance, making praise look like it caused decline.",
    example:
      "Sports Illustrated cover jinx: athletes who appear on the cover often have worse seasons afterward. Not because the magazine is cursed — they appear on the cover because of an exceptional season, which was partly due to luck. The following season regresses toward their average. Medical treatments: severe symptoms often improve after treatment — but also through regression to the mean (symptoms peak before seeking treatment, then naturally improve regardless).",
    applications: [
      "Statistics and research design",
      "Medical trial interpretation",
      "Sports analysis and talent evaluation",
      "Investment returns analysis",
    ],
    pitfalls:
      "Regression to the mean is constantly confused with causation: 'we praised/criticized and performance changed' when actually it was pure regression. This leads to reinforcing wrong behaviors — punishing outliers who'd have improved anyway, and praising mediocrity that'd have worsened.",
    origin:
      "Francis Galton, 'Regression towards Mediocrity in Hereditary Stature' (1886). He called it 'regression to mediocrity.' Later renamed by statisticians. Daniel Kahneman used it to explain many military training myths in 'Thinking, Fast and Slow.'",
    category: "Science",
    disciplines: ["Mathematics", "Psychology", "Biology"],
  },
  {
    id: "sunk-cost",
    name: "Sunk Cost Fallacy",
    tagline: "Don't let past investments determine future decisions",
    description:
      "Sunk costs are costs already incurred and irrecoverable. Rational decision-making should ignore them — only future costs and benefits should determine choices. But humans are loss-averse and hate to 'waste' what they've invested, so they continue projects past the point of rationality because they've 'already invested so much.' This keeps people in bad relationships, failed projects, and losing investments.",
    example:
      "You buy a non-refundable concert ticket ($100). On the day, you feel sick. Rational choice: if you wouldn't pay $100 to go today with the ticket free, stay home. The $100 is spent whether you go or not — only the future experience differs. But most people go to 'not waste' the ticket. Companies continue failed products because 'we've invested $10M in development' — the investment is gone; only future costs and returns matter.",
    applications: [
      "Business strategy and project management",
      "Investment decisions",
      "Personal relationships",
      "Public policy and government projects",
    ],
    pitfalls:
      "Sometimes continued investment is genuinely rational — quitting prematurely ignores future returns. The distinction is between sunk costs (past, irrecoverable) and the genuine expected future value. Also, commitment and persistence are valuable — not all 'sunk cost thinking' is fallacious. The question is whether you're staying for good future reasons or just because of past investment.",
    origin:
      "Kahneman and Tversky's Prospect Theory (1979) explains it through loss aversion — we feel losses more acutely than equivalent gains, making the 'loss' of abandoning an investment feel worse than rationally warranted.",
    category: "Decision Making",
    disciplines: ["Economics", "Psychology"],
  },
  {
    id: "systems-thinking",
    name: "Systems Thinking",
    tagline: "See the whole system — not just the parts",
    description:
      "Systems thinking understands how a system's components interrelate and work over time within the context of larger systems. Rather than breaking problems into parts (reductionism), systems thinking looks at relationships, feedback loops, delays, and emergent properties — properties that can't be predicted from studying parts in isolation. The universe is made of systems, and most important problems are systems problems.",
    example:
      "Traffic: adding more roads often increases traffic (Braess's Paradox). Systems thinking reveals why: more roads attract more drivers and change where people live and work. Mental health: treating depression only biochemically (antidepressants) without addressing social isolation, purpose, and lifestyle misses systemic causes. The symptom (low serotonin) is a system output, not a root cause.",
    applications: [
      "Organizational management and culture",
      "Public health policy",
      "Ecology and environmental management",
      "Engineering and infrastructure",
    ],
    pitfalls:
      "Systems thinking can become an excuse for paralysis: 'everything is connected to everything' can prevent action. Systems also have boundaries — knowing what's in and out of your model is crucial but contested. Sometimes reductionist analysis is more useful for well-understood, linear problems.",
    origin:
      "Jay Forrester at MIT (1950s-60s) developed System Dynamics. Peter Senge's 'The Fifth Discipline' (1990) brought it to business. Donella Meadows' 'Thinking in Systems' (2008) remains the definitive popular introduction.",
    category: "Systems",
    disciplines: ["Engineering", "Biology", "Economics", "Philosophy"],
  },
  {
    id: "opportunity-cost",
    name: "Opportunity Cost",
    tagline: "Every choice forecloses other choices — that foreclosure is the real cost",
    description:
      "The true cost of any choice includes not just what you pay, but what you give up. The opportunity cost of spending 4 years in a PhD program includes 4 years of work experience and salary. The opportunity cost of holding cash is the return you could have earned investing. The opportunity cost of building Feature A is not building Features B and C. Economists think in opportunity costs constantly; most people don't consider them at all.",
    example:
      "Deciding whether to spend $1,000 on a course: the opportunity cost isn't just the $1,000 — it's also the $1,000 invested for 10 years (~$2,000+), or the alternative course you could take, or the experiences you could buy. A tech company's opportunity cost of building Feature A is not building Features B and C — and losing the users that B would have retained. Time has opportunity costs too: every hour you spend on one thing is an hour not spent on something else.",
    applications: [
      "Personal finance and investment",
      "Business strategy and product decisions",
      "Time management and prioritization",
      "Policy analysis and resource allocation",
    ],
    pitfalls:
      "Opportunity costs are counterfactuals — what might have been — which are inherently uncertain. This can lead to paralysis: there's always an alternative. The practical lesson is to consider obvious, large opportunity costs rather than all possible counterfactuals. Also, not all alternatives are equally feasible.",
    origin:
      "David Ricardo and John Stuart Mill developed the concept in classical economics. Alfred Marshall formalized it in 1890. Related to the concept of 'comparative advantage' which explains why trade benefits all parties even if one is better at everything.",
    category: "Economics",
    disciplines: ["Economics", "Mathematics"],
  },
  {
    id: "margin-safety",
    name: "Margin of Safety",
    tagline: "Build in buffers for when things go wrong — because they will",
    description:
      "From engineering and investing: build systems with capacity far beyond what you expect to need. Benjamin Graham (Buffett's teacher): buy stocks at a significant discount to intrinsic value — the difference is your 'margin of safety.' In engineering: design bridges to hold 3-4x the expected load. Why? Because your estimates will be wrong, and the consequences of underestimation are often catastrophic and irreversible.",
    example:
      "Engineering: an elevator rated for 500kg is built to hold 2,000kg. Weight estimates are imprecise, cables wear, and failure means death — so the margin is enormous. Investing: buying a stock at $60 that's worth $100 gives a $40 margin of safety — you can be significantly wrong about the valuation and still not lose money. Personal finance: keeping 6 months emergency fund means one job loss doesn't cause cascading catastrophe.",
    applications: [
      "Engineering design and construction",
      "Investment analysis (value investing)",
      "Project planning and timelines",
      "Personal financial planning",
    ],
    pitfalls:
      "Excessive margins of safety waste resources and can be paralyzingly expensive. Nuclear power plants are built with such large margins that they're uneconomically expensive. The art is calibrating the right margin to the severity of failure — larger where failure is catastrophic and irreversible, smaller where failure is recoverable and instructive.",
    origin:
      "Benjamin Graham, 'The Intelligent Investor' (1949). In engineering, safety factors have been standard since Roman aqueducts. Nassim Taleb extended the concept to complex systems through his 'barbell strategy' in 'Antifragile.'",
    category: "Decision Making",
    disciplines: ["Engineering", "Economics", "Mathematics"],
  },
  {
    id: "emergence",
    name: "Emergence",
    tagline: "Complex, unexpected behaviors arising from simple rules and interactions",
    description:
      "Emergence occurs when a system exhibits properties that its individual components do not possess. The whole is fundamentally different from the sum of its parts. Consciousness emerges from neurons. Markets emerge from buyers and sellers. Ant colonies build sophisticated structures without any ant having a blueprint. Cities emerge from millions of individual decisions. Turbulence emerges from fluid dynamics. Life itself is an emergent property of chemistry.",
    example:
      "Conway's Game of Life: four simple rules for cells turning on/off generate infinitely complex patterns, including 'gliders' that appear to move and self-replicating structures. No programmer programmed these — they emerged from the rules. Traffic jams emerge from individual driving decisions with no central coordinator. Language emerges from millions of interactions with no designer. The internet's culture was never planned.",
    applications: [
      "Artificial intelligence and agent-based modeling",
      "Urban planning and city design",
      "Ecology and evolutionary biology",
      "Organizational design and culture",
    ],
    pitfalls:
      "Emergence is often invoked to explain away complexity: 'it just emerges' can be intellectually lazy. The productive approach is identifying the rules and interactions that generate emergent properties — understanding the generative mechanism, not just naming the outcome. Also, not all complex behavior is true emergence.",
    origin:
      "G.H. Lewes (1875) distinguished 'resultants' (predictable from parts) from 'emergents' (not predictable). Philip Anderson's 'More is Different' (1972) is a seminal physics paper. Santa Fe Institute formalized the science of emergence and complex systems from the 1980s onward.",
    category: "Systems",
    disciplines: ["Physics", "Biology", "Mathematics", "Philosophy"],
  },
  {
    id: "confirmation-bias",
    name: "Confirmation Bias",
    tagline: "We seek information that confirms what we already believe",
    description:
      "Confirmation bias is the tendency to search for, interpret, favor, and recall information in a way that confirms our preexisting beliefs. We notice evidence supporting our views and discount contradicting evidence. It's the most pervasive cognitive bias — it affects scientists, doctors, lawyers, investors, and everyone else. Once we hold a belief, our minds become selective perceiving machines.",
    example:
      "An investor who believes Bitcoin will reach $1M finds articles supporting this view and dismisses critical ones. A doctor who suspects a patient has a rare condition orders tests that confirm it, rather than tests that would rule out common conditions. During elections, people on both sides find evidence that their candidate performed better in a debate — watching the same debate. We don't see the world as it is; we see the world as we are.",
    applications: [
      "Scientific research methodology",
      "Medical diagnosis and second opinions",
      "Investment research",
      "Journalism and fact-checking",
    ],
    pitfalls:
      "Complete absence of confirmation bias would make learning impossible — we need some degree of pattern confirmation to build on prior knowledge. The lesson is not to eliminate all prior beliefs but to actively seek disconfirming evidence, particularly for high-stakes beliefs. Red teaming and devil's advocacy are institutional correctives.",
    origin:
      "Formally studied by Peter Wason in the 1960s (Wason Selection Task). Francis Bacon described it in 1620: 'The human understanding when it has once adopted an opinion draws all things else to support and agree with it.' Kahneman and Tversky mapped it within their heuristics and biases framework.",
    category: "Human Nature",
    disciplines: ["Psychology", "Philosophy"],
  },
];
