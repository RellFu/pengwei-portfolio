export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectWorkflowStep = {
  title: string;
  description: string;
};

export type MerchantProblem = {
  title: string;
  description: string;
};

export type BeforeAfterItem = {
  before: string;
  after: string;
};

export type ResponsibilityItem = {
  title: string;
  description: string;
};

export type ProductDecisionItem = {
  title: string;
  description: string;
};

export type CapabilityCardItem = {
  title: string;
  description: string;
};

export type CaseStudyProject = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  overview: string;
  problem: string;
  role: string;
  solution: string;
  capabilities: string[];
  metrics: ProjectMetric[];
  impact: string[];
  architecture: ProjectWorkflowStep[];
  keyDecisions: string[];
  reflection: string;
  subtitle?: string;
  heroDescription?: string;
  tags?: string[];
  problemCards?: MerchantProblem[];
  funnelSteps?: string[];
  beforeAfterItems?: BeforeAfterItem[];
  responsibilities?: ResponsibilityItem[];
  resultCards?: Array<{
    category: string;
    value: string;
    title: string;
    description: string;
  }>;
  productDecisionCards?: ProductDecisionItem[];
  capabilityCards?: CapabilityCardItem[];
  reflectionTitle?: string;
};

export const featuredProjects: CaseStudyProject[] = [
  {
    slug: "ai-merchant-onboarding-agent",
    title: "AI Merchant Onboarding Assistant",
    type: "Multi-Agent / AI Product Workflow",
    summary:
      "Rebuilt overseas merchant onboarding — from a form-heavy flow into a WhatsApp, multi-agent conversation that handles data collection, Q&A, review follow-up, and re-engagement.",
    subtitle:
      "Using multi-agent orchestration to turn merchant onboarding in Mexico from form-filling into a conversational AI workflow",
    heroDescription:
      "I helped design and iterate an onboarding AI assistant for overseas merchants. To fight post-signup drop-off and a confusing, form-heavy submission process, we turned an onboarding path that relied on forms and manual explanation into a WhatsApp flow with conversational onboarding, document recognition, guided Q&A, review follow-up, and re-engagement.",
    overview:
      "This is a real-world AI agent product case. The project tackled a complex overseas merchant onboarding flow with high post-signup drop-off and costly review communication. Rather than simply bolting on a chatbot, we rebuilt the form-based onboarding path—where merchants had to interpret platform rules themselves—into a conversational AI workflow driven by coordinated multi-agent orchestration.",
    problem:
      "Merchants tend to drop off after signup because of a heavy form-filling burden, complex document submission, a high cost to understand review requirements, and unclear resubmission and status follow-up.",
    role:
      "I contributed to product solution design, agent scenario design, evaluation framework, bad-case analysis, and conversation ETL data analysis and iteration decisions, with the goal of turning AI capabilities into a merchant onboarding flow that is deployable, measurable, and iterable.",
    solution:
      "Designed a conversational onboarding flow in which a master agent coordinates the onboarding agent, Q&A agent, review follow-up agent, and re-engagement capability. Combined with OCR, document recognition, system write-back, and data analysis, it moves merchants from signup toward review submission and go-live.",
    capabilities: [
      "Multi-Agent",
      "WhatsApp",
      "Merchant Onboarding",
      "OCR",
      "QA Agent",
      "ETL Analysis",
      "Conversion Funnel",
    ],
    metrics: [
      { label: "Reduction in avg. onboarding time", value: "69.53%" },
      { label: "Manual pass rate after AI pre-check", value: "97.6%" },
      { label: "AI re-engagement submission rate", value: "78.39%" },
      { label: "Gray rollout in core cities", value: "50%" },
    ],
    impact: [
      "Reduced average onboarding time by 69.53%, significantly shortening the cycle from signup to document submission.",
      "Reached a 97.6% manual pass rate after AI pre-check, reducing invalid submissions and repeated resubmissions.",
      "Achieved a 78.39% AI re-engagement submission rate, above the 64.65% of the standard re-engagement flow.",
      "Reached 50% gray rollout in core cities, entering validation on real business traffic.",
    ],
    architecture: [
      {
        title: "WhatsApp Entry Point",
        description: "Merchants enter the onboarding flow through a familiar channel, lowering the barrier to start.",
      },
      {
        title: "Master Agent",
        description: "Recognizes merchant intent and current status, then routes tasks to the right business agents.",
      },
      {
        title: "Onboarding Agent",
        description: "Collects required information—store, legal entity, menu, documents—through conversation.",
      },
      {
        title: "Document Recognition",
        description: "Combines image upload and OCR to reduce manual entry and repeated confirmation for merchants.",
      },
      {
        title: "Q&A Agent",
        description: "Answers onboarding-related questions and guides merchants back to the main flow afterward.",
      },
      {
        title: "Review Follow-up Agent",
        description:
          "Guides merchants through review status, missing documents, resubmission requirements, and re-submission.",
      },
      {
        title: "System Write-back",
        description:
          "Syncs conversation results and structured information back to business systems, keeping front- and back-end state consistent.",
      },
      {
        title: "Analytics & Iteration",
        description:
          "Analyzes read, reply, failure, and completion rates via ETL and funnel metrics to support continuous optimization.",
      },
    ],
    keyDecisions: [
      "Reduce cognitive load: replace one-time entry of many fields with step-by-step conversational guidance, so merchants handle one clear task at a time.",
      "Progressive disclosure: instead of exposing all document and field requirements upfront, ask and explain only when the current step requires it.",
      "Trust and explainable feedback: through pre-check, missing-document prompts, and resubmission guidance, merchants understand why they didn't pass and what to do next.",
      "Data-driven iteration: use read rate, reply rate, send-failure rate, document-completion rate, and review pass rate to tell whether the issue is reach, comprehension, documents, or the flow itself.",
    ],
    reflection:
      "This project taught me that an AI product's value isn't a chat box bolted onto an existing flow — it's redesigning the whole flow around user intent, business state, system capabilities, and measurable outcomes. In a real business setting, an agent has to do more than answer correctly: it has to keep guiding the user to done, and keep the backend state in sync.",
    reflectionTitle: "From a single feature to a reusable AI onboarding framework",
    tags: [
      "Multi-Agent",
      "WhatsApp",
      "Merchant Onboarding",
      "OCR",
      "QA Agent",
      "ETL Analysis",
      "Conversion Funnel",
    ],
    problemCards: [
      {
        title: "Heavy form-filling burden",
        description:
          "Multi-page forms, document uploads, and unclear field requirements created a friction-heavy onboarding experience.",
      },
      {
        title: "High review communication cost",
        description:
          "Merchants repeatedly reached out about missing documents, status, and resubmission steps, creating a support bottleneck at scale.",
      },
      {
        title: "Post-signup conversion drop-off",
        description:
          "Many merchants signed up but abandoned before completing document review, causing significant drop-off between registration and approval.",
      },
    ],
    funnelSteps: [
      "Visit",
      "Sign Up",
      "Enter Store Info",
      "Submit for Review",
      "Approved",
      "Go Live",
    ],
    beforeAfterItems: [
      {
        before: "Merchants interpret form fields themselves",
        after: "AI guides merchants step by step",
      },
      {
        before: "All requirements exposed at once",
        after: "Ask step by step based on the current task",
      },
      {
        before: "Document issues rely on manual explanation",
        after: "AI recognizes documents and prompts for resubmission",
      },
      {
        before: "Q&A disconnected from the main flow",
        after: "Automatically pulls back to onboarding after Q&A",
      },
      {
        before: "Weak awareness of review status",
        after: "Agent follows up on review and resubmission",
      },
      {
        before: "Data issues investigated after the fact",
        after: "ETL continuously analyzes drop-off and anomalies",
      },
    ],
    responsibilities: [
      {
        title: "Market Insight & Solution Definition",
        description:
          "Mapped Mexico merchant profiles, BD pain points, and competitor agents to pinpoint where AI could cut onboarding friction, then set the product requirements.",
      },
      {
        title: "Multi-Agent Product Flow Design",
        description:
          "Designed the multi-agent collaboration flow for merchant onboarding, letting the master agent orchestrate different business agents based on merchant intent and progress.",
      },
      {
        title: "Agent Evaluation & Bad Case Analysis",
        description:
          "Designed the agent evaluation framework, assessing Q&A performance and flow stability with a mix of human samples and AI monitoring. Independently ran weekly bad-case reviews and guided engineering to locate issues.",
      },
      {
        title: "Data Analysis & Event Tracking",
        description:
          "Independently built session data analysis scripts that auto-generate reports. Also designed event tracking for the website entry point and defined the metric standards that guide feature iteration.",
      },
    ],
    resultCards: [
      {
        category: "Efficiency",
        value: "69.53%",
        title: "Reduction in avg. onboarding time",
        description: "Significantly shortened the cycle from signup to document submission.",
      },
      {
        category: "Conversion",
        value: "78.39%",
        title: "AI re-engagement submission rate",
        description: "Compared with the 64.65% of the standard flow, AI re-engagement performed better on submission conversion.",
      },
      {
        category: "Review Quality",
        value: "97.6%",
        title: "Manual pass rate after AI pre-check",
        description: "AI pre-check helped merchants catch document and information issues early, reducing invalid submissions.",
      },
      {
        category: "Business Validation",
        value: "50%",
        title: "Gray rollout in core cities",
        description: "The project entered validation on real business traffic rather than staying at the demo stage.",
      },
    ],
    productDecisionCards: [
      {
        title: "Reduce cognitive load",
        description:
          "Replace one-time entry of many fields with step-by-step conversational guidance, so merchants handle one clear task at a time.",
      },
      {
        title: "Progressive disclosure",
        description:
          "Instead of exposing all document and field requirements upfront, ask and explain only when the current step requires it.",
      },
      {
        title: "Trust and explainable feedback",
        description:
          "Through pre-check, missing-document prompts, and resubmission guidance, merchants understand why they didn't pass and what to do next.",
      },
      {
        title: "Data-driven iteration",
        description:
          "Use read rate, reply rate, send-failure rate, document-completion rate, and review pass rate to tell whether the issue is reach, comprehension, documents, or the flow itself.",
      },
    ],
    capabilityCards: [
      {
        title: "Agent orchestration",
        description:
          "The master agent coordinates onboarding, Q&A, review follow-up, and re-engagement agents, supporting task routing across complex merchant states.",
      },
      {
        title: "Document understanding",
        description:
          "Combining OCR, image recognition, knowledge-base Q&A, and structured extraction, the AI handles unstructured input such as storefront photos, menus, documents, and supplementary materials.",
      },
      {
        title: "Business system integration",
        description:
          "Connects AI conversation results, merchant state, and business system flows, so the agent not only answers questions but keeps pushing the onboarding flow forward.",
      },
    ],
  },
  {
    slug: "alibaba-creative-ai-quality-system",
    title: "Alibaba Creative AI Quality System",
    type: "AI Product Management / Agent Evaluation / Product Analytics",
    summary: "I read the Agent runtime from source, designed what to measure, and built three Agents that kept a 55-Skill creative product shippable.",
    overview: "At Alibaba's Youku AI Content Creation team, I worked on Alpha, a creative AI agent for professional content workflows. Alpha is a fictional name used in this public portfolio.",
    problem: "Creative quality was subjective, failures could originate across multiple Agent layers, and expert screenwriting methods were not directly executable by an AI system.",
    role: "As an AI Product Manager Intern, I reconstructed the Agent runtime from the codebase before touching it, then designed a five-layer evaluation framework (Task, Query, Agent, Skill, Sub-agent) and the feedback instrumentation underneath it. I owned the human-labeling effort used as ground truth for that framework, including which model configurations and context-window lengths to test against it, and caught a coverage gap that was producing a false 100 percent agreement signal. I independently audited all 55 Skills and built skill-evaluator; owned product design, Skill authoring, and test iteration for the Three-Act and Bible Skills; built a scheduled instrumentation patrol and a usage reporting Agent; ran the product analytics layer; and proposed the knowledge Schema through review.",
    solution: "Created a five-stage quality loop: observe, diagnose, formalize, validate, and operationalize.",
    capabilities: ["Product Analytics", "Agent Evaluation", "Skill Systems", "Instrumentation", "Langfuse", "AI Product Delivery"],
    metrics: [
      { label: "Product-behavior metrics", value: "29" },
      { label: "Vertical AI Skills audited", value: "55" },
      { label: "Labeled turns reviewed", value: "343" },
      { label: "Evaluation layers designed", value: "5" },
    ],
    impact: [
      "Reconstructed a 23-package Agent runtime from source, then instrumented 18 product surfaces against that model.",
      "Ran the product analytics layer across 29 tracked user behaviors, funnels, retention cohorts, and feedback signals.",
      "Audited 55 vertical AI Skills across 10 engineering dimensions and shipped skill-evaluator to make the audit repeatable.",
      "Designed a five-layer evaluation framework (Task, Query, Agent, Skill, Sub-agent) and owned the human-labeled ground truth used to validate it, catching a coverage gap that was producing a false 100 percent model-agreement signal across all eight tested configurations.",
      "Built three Agents: a daily instrumentation patrol, skill-evaluator, and a scheduled usage reporting bot that posts to the work group.",
    ],
    architecture: [
      { title: "Observe", description: "Monitor product health and feedback signals." },
      { title: "Diagnose", description: "Attribute failure across the Agent hierarchy." },
      { title: "Formalize", description: "Encode expert methods into executable workflows." },
      { title: "Validate", description: "Calibrate rubrics on real sessions." },
      { title: "Operationalize", description: "Turn checks into recurring product infrastructure." },
    ],
    keyDecisions: [
      "Measure the complete product path, not only the final response.",
      "Treat disagreement as a rubric-calibration signal.",
      "Keep sensitive user content outside public artifacts.",
    ],
    reflection: "When metrics, traces, expert rules, and product decisions share one structure, evaluation becomes part of how the product learns what to build next.",
  },
  {
    slug: "bytedance-ai-procurement-tools",
    title: "ByteDance AI Tools",
    type: "RAG / LLM Workflow / Procurement AI",
    summary:
      "Shipped three 0-to-1 AI tools for procurement — product normalization, supplier price comparison, and talent pricing — turning manual cleanup, comparison, and consultation into reusable workflows.",
    overview:
      "Around procurement and business-decision scenarios, I broke high-labor cleanup, comparison, and consultation work into three independent AI tools, distilled into reusable RAG + LLM workflows.",
    problem:
      "Procurement data was scattered and inconsistently named, and manual judgment was costly—hurting cleanup efficiency, decision consistency, and traceability.",
    role:
      "Independently designed and drove three 0-to-1 AI tools, from problem abstraction, retrieval, and output design to workflow productization and result validation.",
    solution:
      "Split product normalization, supplier price comparison, and talent pricing consultation into retrievable, structured, reusable AI workflows, each offering batch processing, evidence-backed output, and explainable recommendations respectively.",
    capabilities: [
      "RAG",
      "Structured JSON",
      "Batch Workflow",
      "Threshold Routing",
      "Operational Tooling",
    ],
    metrics: [
      { label: "Matching accuracy", value: "96.45%+" },
      { label: "Efficiency gain", value: "Tens of x" },
      { label: "Traceable output", value: "100%" },
      { label: "Consultation efficiency", value: "10x+" },
    ],
    impact: [
      "Shipped three AI tools for product normalization, supplier price comparison, and talent pricing consultation.",
      "Designed RAG retrieval, structured output, threshold control, and evidence binding into stable workflows.",
      "Upgraded procurement judgment from high-cost manual cleanup to a more efficient, controllable, and traceable process.",
      "Distilled a transferable procurement AI workflow methodology.",
    ],
    architecture: [
      {
        title: "Product Normalization Matching",
        description:
          "Built retrieval and matching logic around SKU mapping and naming standards, outputting structured standardized results.",
      },
      {
        title: "Supplier Comparison AI",
        description:
          "Combined historical quotes with structured-term comparison to output evidence-backed comparison summaries.",
      },
      {
        title: "Talent Pricing Consultation Agent",
        description:
          "Retrieves similar historical cases and generates explainable pricing recommendations, supporting fast consultation and reuse.",
      },
    ],
    keyDecisions: [
      "Prioritize breaking business scenarios into reusable workflows rather than building one generic LLM entry point.",
      "Insist on evidence binding and structured output to keep key conclusions verifiable and traceable.",
      "Design 0-to-1 tools with batch processing, write-back, and human fallback in mind to reduce post-launch uncertainty.",
    ],
    reflection:
      "This set of projects further validated a belief of mine: the value of an AI product lies not in how human-like the answers sound, but in whether it can organize retrieval, judgment, output, and review into reusable business workflows.",
  },
  {
    slug: "policy-news-rag-assistant",
    title: "Policy News Topic RAG Assistant",
    type: "Independent AI Project / RAG / Evaluation",
    summary:
      "For policy coverage of the Hainan Free Trade Port, built an evidence-constrained topic assistant and improved generation reliability through retrieval verification and fallback logic.",
    overview:
      "This case blends research and product validation. The goal was not simply to generate topics, but to give policy-news suggestions evidence constraints, quality verification, and a fallback mechanism.",
    problem:
      "Policy-coverage topics must balance timeliness, credibility, and citation basis; pure generation easily produces unsupported claims or inconsistent quality.",
    role:
      "Independently owned task definition, RAG workflow design, evaluation framework, retrieval configuration comparison, and output reliability validation.",
    solution:
      "Built a layered pipeline of retrieval, reranking, generation, verification, and fallback, so topic suggestions rest on explicit evidence and a fallback mechanism.",
    capabilities: [
      "RAG Evaluation",
      "Citation Binding",
      "Reranking",
      "Fallback Logic",
      "Latency Analysis",
    ],
    metrics: [
      { label: "Citation coverage", value: "100%" },
      { label: "Gold task set", value: "50 tasks" },
      { label: "Pipeline layers", value: "5 layers" },
      { label: "Evaluation focus", value: "Latency + Quality" },
    ],
    impact: [
      "Designed a complete workflow of retrieval, reranking, generation, verification, and fallback.",
      "Implemented evidence binding and citation filtering to ensure outputs are grounded.",
      "Achieved 100% citation coverage at the task level.",
      "Built a Gold Task Set, a no-retrieval baseline, dev-set tuning, vector-config comparison, and latency analysis.",
    ],
    architecture: [
      {
        title: "Retrieval & Reranking",
        description:
          "First recall policy-relevant materials, then rerank to ensure the content entering generation is higher-relevance and better suited for citation.",
      },
      {
        title: "Generation & Verification",
        description:
          "Generation requires binding to evidence sources, while a post-verification stage filters out insufficient or untrustworthy conclusions.",
      },
      {
        title: "Fallback & Evaluation Loop",
        description:
          "When evidence is insufficient, proactively fall back instead of forcing output; evaluate quality and latency via a Gold Task Set and comparison experiments.",
      },
    ],
    keyDecisions: [
      "Make evidence binding part of the output requirement, not an afterthought that appends references later.",
      "Explicitly add verification and fallback into the generation pipeline, prioritizing reliability over fluency.",
      "Use a no-retrieval baseline and configuration comparison to judge whether the RAG design truly adds value.",
    ],
    reflection:
      "This project further confirmed that building a RAG product isn't just about whether the answer reads smoothly—it's about whether the evidence holds up, whether it degrades gracefully on failure, and whether the evaluation can support continuous iteration.",
  },
{
    slug: "media-international-communications",
    title: "Media, Content & Audience Growth",
    type: "Media Operations / International Communications / Content Strategy",
    summary:
      "Worked across journalism, growth operations, and international social media, exploring how stories and products reach the right audiences. From reporting on AI to building content-led acquisition and platform-native communication.",
    overview:
      "Before moving into AI product internships, I worked on international content operations, English-language editorial production, and AI/technology research at media and communications organizations including The Paper, People's Daily New Media Center, and Hainan International Communication Center. This cluster is not the centerpiece of my U.S. PM narrative. Its role is to show that, alongside technical training and later AI product internships, I also bring audience insight, cross-cultural storytelling, and structured research skills from earlier media work. For U.S. applications targeting consumer products, creator tools, content platforms, or global-user roles, this experience strengthens the broader story of how I think about products that have to land with real users.",
    problem:
      "Pure technical or AI-product signals don't fully cover what consumer-product PM roles need. Companies like TikTok and other global To C products also value audience empathy, content judgment, cross-cultural communication, and operational awareness of distribution channels. This case study consolidates earlier media and communications work to show how those skills were developed alongside my AI product training.",
    role:
      "Across three organizations, I contributed to international content operations, English-language editorial production, and AI/technology research. This included producing and editing bilingual content for overseas social platforms, supporting English-language publishing workflows at People's Daily New Media Center's English app, and researching AI industry topics such as AIGC video tools, Chinese AI globalization, and AI compute infrastructure at The Paper.",
    solution:
      "I split this experience into three reinforcing workstreams. International content operations across overseas social platforms and English-language media channels. Bilingual editorial production and interview support for English-language publishing workflows. AI and technology research and topic synthesis. Together, these workstreams built a foundation in audience insight, cross-cultural communication, and structured research that complements my later AI product internships.",
    capabilities: [
      "Bilingual Content Production",
      "International Communications",
      "Cross-cultural Storytelling",
      "AI/Technology Research",
      "Editorial Workflow",
      "Audience Insight",
      "Content Operations",
    ],
    metrics: [
      { label: "Languages produced in", value: "EN / ZH" },
      { label: "Overseas platforms covered", value: "FB, X, WeChat" },
      { label: "Organizations contributed to", value: "3" },
      { label: "AI topic areas researched", value: "Multiple" },
    ],
    impact: [
      "Produced and edited bilingual content for overseas-facing campaigns across Facebook, X/Twitter, and WeChat channels.",
      "Supported English-language publishing workflows at People's Daily New Media Center's English app, including translation, editing, and interview preparation.",
      "Researched AI industry topics including AIGC video tools, Chinese AI globalization, multimodal AI, AI compute infrastructure, and DeepSeek, and synthesized findings into structured briefs and interview outlines.",
      "Contributed to international communications initiatives including Hainan International Communication Center outputs for cross-cultural audiences.",
      "Built audience insight and editorial judgment that later informed consumer-product AI work.",
    ],
    architecture: [
      {
        title: "International Content Operations",
        description:
          "Produced and edited bilingual articles and videos for overseas social platforms, tracking audience engagement across campaigns.",
      },
      {
        title: "Bilingual Editorial Production",
        description:
          "Supported English-language publishing workflows, including translation, editing, subtitles, and interview preparation for international communications projects.",
      },
      {
        title: "AI & Technology Research",
        description:
          "Researched and synthesized AI industry topics into structured briefs, interview outlines, and reporting notes for technology journalism.",
      },
    ],
    keyDecisions: [
      "Treat earlier media work as a transferable-signal layer, not as a competing primary narrative.",
      "Use confirmed organization names and documented outputs to keep the case study honest and verifiable.",
      "Connect media experience to consumer-product PM outcomes rather than presenting it as standalone journalism.",
    ],
    reflection:
      "This cluster taught me that media, communications, and product work share a common discipline: turning audience context into structured output that people actually engage with. Producing content for cross-cultural audiences, building interview outlines for ambiguous technical topics, and tracking engagement across platforms all trained the same instincts that later showed up in AI product work, where understanding user intent, structuring the workflow, and measuring outcomes are the whole game.",
  },

];

export const projectMap = Object.fromEntries(
  featuredProjects.map((project) => [project.slug, project]),
) as Record<string, CaseStudyProject>;
