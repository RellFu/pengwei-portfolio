"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowRight,
  AtSign,
  BookOpen,
  Bot,
  Box,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  CircleUserRound,
  Clock3,
  Copy,
  FileText,
  Folder,
  Library,
  ListTodo,
  LockKeyhole,
  MessageSquare,
  PanelLeft,
  Paperclip,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  Sparkles,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type ProductMode = "chat" | "agents" | "knowledge";
type ProductTool = "models" | "skills" | null;
type ChatId = "structure" | "bible" | "rewrite";
type AgentId = "storyboard" | "dialogue" | "engineer" | "research";
type AgentView = "group" | "profile";
type KnowledgeTab = "overview" | "plot" | "characters" | "world";
type KnowledgeCharacterId = "andy" | "miranda" | "nigel" | "emily" | "nate";
type KnowledgePlotId = "survival" | "transformation" | "relationship" | "power";
type SkillFilter = "all" | "film" | "general";

gsap.registerPlugin(useGSAP);

const chats = {
  structure: {
    group: "Today",
    title: "Pilot structure diagnosis",
    subtitle: "Three-Act Skill · 28 scenes",
    project: "Glass Harbor / Pilot v12",
    prompt: "Read the pilot and tell me where Act I really ends. Do not use page count alone. Compare the candidate turns and explain the structural cost of the current version.",
    commands: [
      ["Read 3 files", "pilot-v12.md · series-bible.md · character-map.json"],
      ["Ran command", "storymap extract --scenes 28 --beats 41"],
      ["Loaded Skill", "Three-Act Diagnosis · candidate comparison contract"],
      ["Checked knowledge", "Workplace thriller patterns · mentor/protégé arcs"],
      ["Validated", "goal change · relationship change · irreversibility · cost"],
    ],
    resultTitle: "The apparent incident is not the Act I turn.",
    result: [
      "Scene 6 introduces the missing footage, but Mara can still hand the story back. Scene 14 reveals who altered the archive, but it only increases information. Scene 18 is the first irreversible choice: Mara sends the raw clip to the newsroom, exposes her source, and loses the option to remain a neutral observer.",
      "The current draft spends twelve scenes escalating evidence without changing Mara’s objective. That makes the middle feel busy rather than progressive. Merge Scenes 10 and 12, move the newsroom send to Scene 14, and use the rejected call from her father as the immediate personal cost. The audience then enters Act II with a clear engine: publish before the studio can erase the source.",
    ],
    evidence: ["Candidate A · Scene 6 · incident only", "Candidate B · Scene 14 · revelation", "Candidate C · Scene 18 · irreversible"],
    output: "pilot-structure-diagnosis.md",
  },
  bible: {
    group: "Yesterday",
    title: "Build the project Bible",
    subtitle: "Source-backed · 7 sections",
    project: "Glass Harbor / Development",
    prompt: "Turn the approved concept, character interviews, and episode notes into a project Bible. Keep evidence-backed decisions separate from unresolved creative choices.",
    commands: [
      ["Read 8 files", "concept · interviews · episode notes"],
      ["Loaded Skill", "Project Bible · seven-part editorial contract"],
      ["Mapped entities", "6 characters · 11 relationships · 4 world rules"],
      ["Cross-checked", "Bible claims against scene anchors"],
      ["Created", "project-bible-v1.md · decision-log.md"],
    ],
    resultTitle: "A creative blueprint with explicit uncertainty.",
    result: [
      "The approved material supports the central dramatic question, Mara’s positive arc, the harbor’s labor hierarchy, and the season’s investigation engine. I preserved each claim with a source anchor rather than smoothing gaps into plausible fiction.",
      "Three decisions still need the writers’ room: whether the brother is alive, who owns the final betrayal, and whether the newsroom becomes ally or antagonist. Those items remain marked ‘Creative decision required’ so the Bible guides writing without silently inventing canon.",
    ],
    evidence: ["27 source anchors", "3 unresolved decisions", "11 relationship states"],
    output: "project-bible-v1.md",
  },
  rewrite: {
    group: "Earlier",
    title: "Rewrite the interrogation scene",
    subtitle: "Dialogue + blocking · 5 beats",
    project: "Glass Harbor / Episode 03",
    prompt: "Rewrite Scene 32 so the detective learns the passcode without asking for it directly. Keep the power reversal visual and cut the exposition by at least 30%.",
    commands: [
      ["Read scene", "episode-03-scene-32.md"],
      ["Loaded Skills", "Dialogue Pass · Visual Blocking"],
      ["Mapped subtext", "want · tactic · resistance · reversal"],
      ["Generated variants", "quiet threat · false empathy · procedural trap"],
      ["Compared", "exposition density · character voice · shootability"],
    ],
    resultTitle: "Let the passcode arrive as a behavioral mistake.",
    result: [
      "The detective never asks for the code. She places two evidence bags on the table and deliberately labels the wrong one ‘Locker 17.’ The suspect corrects her: ‘Seventeen is the camera cage.’ He then realizes he has disclosed the mapping. The camera stays on his hand flattening the label, making the reversal visible before either character names it.",
      "This version removes four explanatory lines, gives the detective an active tactic, and leaves the suspect with the last spoken line but not the last move. A five-shot blocking plan is attached for the director.",
    ],
    evidence: ["Dialogue −38%", "5 camera beats", "1 visible reversal"],
    output: "scene-32-rewrite.md",
  },
} as const;

const agents: Record<AgentId, { name: string; role: string; tone: string; color: string; initials: string; skills: string[]; description: string }> = {
  storyboard: {
    name: "Storyboard Agent",
    role: "Turns dramatic beats into shootable visual coverage",
    tone: "Precise · spatial · economical",
    color: "bg-[#eaf4ff] text-[#0071e3]",
    initials: "SB",
    skills: ["Shot-list Planner", "Visual Blocking", "Continuity Check"],
    description: "Reads scene intention, maps power changes to blocking, then proposes coverage with lens, movement, and editorial purpose.",
  },
  dialogue: {
    name: "Dialogue Editor",
    role: "Protects voice, subtext, and speakability",
    tone: "Direct · character-first · unsentimental",
    color: "bg-[#f3edff] text-[#7c3aed]",
    initials: "DE",
    skills: ["Dialogue Pass", "Voice Consistency", "Exposition Audit"],
    description: "Diagnoses what each line is doing, removes duplicated information, and preserves character-specific rhythm under revision.",
  },
  engineer: {
    name: "Story Engineer",
    role: "Diagnoses structure and resolves cross-scene constraints",
    tone: "Analytical · candid · evidence-led",
    color: "bg-[#e8f7ee] text-[#248a3d]",
    initials: "SE",
    skills: ["Three-Act Diagnosis", "Project Bible", "Consistency Review"],
    description: "Connects scene-level changes to act structure, character arcs, world rules, and downstream episode dependencies.",
  },
  research: {
    name: "Research Agent",
    role: "Finds references and verifies production details",
    tone: "Source-conscious · concise · pragmatic",
    color: "bg-[#fff3df] text-[#9a6400]",
    initials: "RA",
    skills: ["Web Research", "IP Knowledge Retrieval", "Source Ledger"],
    description: "Collects comparable references, checks factual constraints, and keeps claims linked to their origin.",
  },
};

const knowledgeCategories = [
  ["Premium", "400+"], ["China", "700+"], ["Korea", "330+"], ["United States", "590+"],
  ["Other", "430+"], ["Television", "1,500+"], ["Film", "520+"], ["Novel", "3,100+"],
  ["Anime", "280+"], ["Games", "10+"], ["Comics", "420+"], ["Kids", "580+"],
] as const;

const knowledgeWorks = [
  { title: "The Devil Wears Prada", year: "2006", track: "Drama", genre: "Workplace", mark: "DWP", color: "from-[#ef4444] to-[#7f1d1d]", summary: "An aspiring journalist enters a fashion empire and discovers the cost of mastering a world she dismisses." },
  { title: "Wednesday", year: "2022", track: "Mystery", genre: "Coming-of-age", mark: "W", color: "from-[#667085] to-[#111827]", summary: "A fiercely independent student investigates a supernatural mystery while resisting every attempt at belonging." },
  { title: "The Queen’s Gambit", year: "2020", track: "Drama", genre: "Coming-of-age", mark: "QG", color: "from-[#d97706] to-[#451a03]", summary: "A chess prodigy’s ascent turns talent, addiction, and intimacy into one tightly linked character engine." },
  { title: "The Walking Dead", year: "2010", track: "Adventure", genre: "Survival", mark: "WD", color: "from-[#78716c] to-[#292524]", summary: "Survival pressure repeatedly reorganizes leadership, loyalty, and the meaning of community." },
  { title: "Black Mirror", year: "2011", track: "Sci-fi", genre: "Anthology", mark: "BM", color: "from-[#0f172a] to-[#0284c7]", summary: "Standalone stories turn a single technology premise into a social and moral stress test." },
  { title: "The Last of Us", year: "2023", track: "Adventure", genre: "Survival", mark: "LU", color: "from-[#3f6212] to-[#1c1917]", summary: "A transport mission gradually becomes a parent-child bond under escalating ethical cost." },
  { title: "The White Lotus", year: "2021", track: "Comedy", genre: "Satire", mark: "WL", color: "from-[#0891b2] to-[#164e63]", summary: "An ensemble vacation uses status rituals and small humiliations to reveal a larger class system." },
  { title: "The Bear", year: "2022", track: "Drama", genre: "Workplace", mark: "TB", color: "from-[#1d4ed8] to-[#172554]", summary: "A chef inherits a chaotic restaurant where grief, craft, and team systems collide in real time." },
  { title: "Sherlock", year: "2010", track: "Mystery", genre: "Detective", mark: "SH", color: "from-[#475569] to-[#020617]", summary: "Deduction becomes action through clue hierarchies, adversarial reveals, and an evolving partnership." },
  { title: "Better Call Saul", year: "2015", track: "Drama", genre: "Crime", mark: "BCS", color: "from-[#f59e0b] to-[#991b1b]", summary: "A character tragedy tracks how small tactical compromises accumulate into an identity." },
  { title: "Parasite", year: "2019", track: "Thriller", genre: "Class", mark: "P", color: "from-[#166534] to-[#052e16]", summary: "A family’s infiltration plot turns architectural space into a visible model of class mobility." },
  { title: "Spirited Away", year: "2001", track: "Adventure", genre: "Fantasy", mark: "SA", color: "from-[#fb7185] to-[#7e22ce]", summary: "A child’s moral growth is encoded in the rules, labor, and transformations of a spirit world." },
] as const;

const skills = [
  { id: "three-act", name: "Three-Act Diagnosis", group: "film", description: "Compares candidate turning points, tests irreversibility, and returns a source-anchored structural diagnosis.", on: true },
  { id: "bible", name: "Project Bible", group: "film", description: "Turns approved material into a seven-part creative blueprint with explicit evidence and open decisions.", on: true },
  { id: "structure", name: "Script Structure Review", group: "film", description: "Maps scene functions, act pressure, plotline balance, and pacing risks.", on: true },
  { id: "character", name: "Character Arc Diagnosis", group: "film", description: "Checks desire, need, lie, fear, relationship change, and scene-level arc evidence.", on: true },
  { id: "dialogue", name: "Dialogue Pass", group: "film", description: "Audits voice, subtext, exposition, rhythm, and speakability.", on: true },
  { id: "storyboard", name: "Shot-list Planner", group: "film", description: "Translates dramatic intention into blocking and efficient visual coverage.", on: true },
  { id: "knowledge", name: "IP Knowledge Retrieval", group: "general", description: "Finds structured story, character, relationship, world, and plot fields across the official library.", on: true },
  { id: "web", name: "Web Research", group: "general", description: "Collects current sources and keeps a traceable source ledger.", on: true },
  { id: "docx", name: "DOCX", group: "general", description: "Reads, creates, and reviews Word documents with layout verification.", on: true },
  { id: "pdf", name: "PDF", group: "general", description: "Extracts, renders, and inspects PDF content.", on: true },
  { id: "browser", name: "Browser Automation", group: "general", description: "Operates web workflows and captures structured results.", on: true },
  { id: "creator", name: "Skill Creator", group: "general", description: "Packages a repeatable professional workflow as a reusable Skill.", on: false },
] as const;

const models = [
  ["Tongyi Qianwen", "Alibaba", "QW"], ["Gemini", "Google", "GE"], ["ChatGPT", "OpenAI", "CG"],
  ["Claude", "Anthropic", "CL"], ["DeepSeek", "DeepSeek", "DS"], ["Doubao", "ByteDance", "DB"],
] as const;

function AppButton({ active = false, label, children, onClick }: { active?: boolean; label: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-[9px] font-semibold transition-colors active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] motion-reduce:transition-none ${active ? "bg-[#e8e8eb] text-[#1d1d1f]" : "text-[#515154] hover:bg-black/[0.045]"}`}
    >
      {children}
    </button>
  );
}

function ModeDock({ mode, onChange }: { mode: ProductMode; onChange: (mode: ProductMode) => void }) {
  const items: [ProductMode, string, React.ReactNode][] = [
    ["chat", "Conversation workspace", <MessageSquare key="chat" className="h-4 w-4" />],
    ["agents", "Agent workspace", <Bot key="agents" className="h-4 w-4" />],
    ["knowledge", "Knowledge library", <BookOpen key="knowledge" className="h-4 w-4" />],
  ];
  return (
    <div className="flex items-center gap-1.5">
      {items.map(([id, label, icon]) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          aria-pressed={mode === id}
          onClick={() => {
            const scrollPosition = window.scrollY;
            onChange(id);
            window.requestAnimationFrame(() => window.scrollTo(0, scrollPosition));
          }}
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] motion-reduce:transition-none ${mode === id ? "bg-[#e2e2e5] text-[#1d1d1f] shadow-inner" : "text-[#515154] hover:bg-black/[0.05]"}`}
        >{icon}</button>
      ))}
      <button type="button" aria-label="Create new" className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#111318] text-white transition active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 motion-reduce:transition-none"><Plus className="h-4 w-4" /></button>
    </div>
  );
}

function ChatRail({ chatId, onSelect }: { chatId: ChatId; onSelect: (id: ChatId) => void }) {
  return (
    <aside className="hidden h-full min-h-0 w-full overflow-hidden border-r border-black/8 bg-[#f7f7f8] p-3 lg:flex lg:flex-col">
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-0.5">
        {(["Today", "Yesterday", "Earlier"] as const).map((group) => (
          <div key={group}>
            <p className="px-2 text-[8px] font-medium text-[#b0b0b5]">{group}</p>
            <div className="mt-1 space-y-1">
              {(Object.entries(chats) as [ChatId, (typeof chats)[ChatId]][]).filter(([, item]) => item.group === group).map(([id, item]) => (
                <button key={id} type="button" onClick={() => onSelect(id)} className={`w-full rounded-xl px-2.5 py-2.5 text-left transition active:scale-[0.98] motion-reduce:transition-none ${chatId === id ? "bg-[#dedee1]" : "hover:bg-black/[0.035]"}`}>
                  <p className="truncate text-[10px] font-semibold text-[#1d1d1f]">{item.title}</p>
                  <p className="mt-1 truncate text-[8px] text-[#86868b]">{item.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function ChatWorkspace({ chatId, scheduleEnabled, onToggleSchedule }: { chatId: ChatId; scheduleEnabled: boolean; onToggleSchedule: () => void }) {
  const chat = chats[chatId];
  return (
    <div className="grid min-h-0 flex-1 bg-white lg:grid-cols-[minmax(0,1fr)_18rem]">
      <section className="flex min-h-0 min-w-0 flex-col border-r border-black/8">
        <div className="flex min-h-11 items-center gap-2 border-b border-black/8 px-4">
          <span className="truncate text-[10px] font-semibold text-[#1d1d1f]">{chat.project}</span><ChevronDown className="h-3 w-3 text-[#b0b0b5]" />
          <span className="ml-auto rounded-full bg-[#e8f7ee] px-2 py-1 text-[8px] font-semibold text-[#248a3d]">Agent ready</span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          <div data-phai-transition className="ml-auto max-w-[31rem] rounded-[1.05rem] bg-[#eaf4ff] px-4 py-3 text-[10px] leading-5 text-[#0066cc]">{chat.prompt}</div>
          <div data-phai-transition className="mt-5 flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#111318] font-serif text-xs italic text-white">α</span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-[#1d1d1f]">I’ll trace the current scene logic before recommending a rewrite.</p>
              <div className="mt-3 space-y-1.5">
                {chat.commands.map(([verb, detail]) => (
                  <div key={`${verb}-${detail}`} className="group flex items-center gap-2 rounded-lg px-1 py-1 text-[9px] text-[#86868b]">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#e8f7ee] text-[#248a3d]"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
                    <span><strong className="font-semibold text-[#515154]">{verb}</strong> · {detail}</span><ChevronDown className="ml-auto h-3 w-3 text-[#c7c7cc]" />
                  </div>
                ))}
              </div>
              <div className="mt-5 max-w-[42rem] text-[10px] leading-[1.65] text-[#515154]">
                <h4 className="text-[12px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">{chat.resultTitle}</h4>
                {chat.result.map((paragraph) => <p key={paragraph} className="mt-2.5">{paragraph}</p>)}
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {chat.evidence.map((item, index) => <div key={item} className={`rounded-xl p-3 text-[8px] leading-4 ${index === chat.evidence.length - 1 ? "bg-[#eaf4ff] font-semibold text-[#0066cc]" : "bg-[#f5f5f7] text-[#6e6e73]"}`}>{item}</div>)}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-black/8 bg-white px-3 py-2 shadow-sm"><FileText className="h-3.5 w-3.5 text-[#0071e3]" /><span className="text-[9px] font-semibold text-[#0066cc]">{chat.output}</span><span className="text-[8px] text-[#86868b]">created</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 mb-4 rounded-[1.1rem] border border-black/10 bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.055)] sm:mx-5">
          <p className="text-[9px] text-[#b0b0b5]">Describe a task or <span className="font-semibold text-[#0071e3]">@</span> mention files, Skills, or knowledge</p>
          <div className="mt-3 flex items-center gap-2 text-[#86868b]"><Plus className="h-3.5 w-3.5" /><Paperclip className="h-3.5 w-3.5" /><span className="ml-auto text-[8px]">Qwen Max</span><button type="button" aria-label="Send prompt" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111318] text-white active:scale-90"><Send className="h-3 w-3" /></button></div>
        </div>
      </section>
      <aside className="hidden min-h-0 bg-[#fbfbfc] lg:grid lg:grid-rows-2">
        <div className="min-h-0 border-b border-black/8 p-3.5">
          <div className="flex items-center gap-2"><Folder className="h-3.5 w-3.5 text-[#515154]" /><h4 className="text-[9px] font-semibold text-[#1d1d1f]">Generated documents</h4><span className="ml-auto text-[8px] text-[#b0b0b5]">3</span></div>
          <div className="mt-3 space-y-1.5">
            {[[chat.output, "FINAL"], ["scene-map.csv", "DATA"], ["revision-notes.md", "DRAFT"]].map(([name, tag], index) => (
              <button key={name} type="button" className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left transition active:scale-[0.98] ${index === 0 ? "bg-[#eaf4ff]" : "hover:bg-[#f5f5f7]"}`}><FileText className={`h-3.5 w-3.5 ${index === 0 ? "text-[#0071e3]" : "text-[#86868b]"}`} /><span className="min-w-0 flex-1 truncate text-[8px] font-medium text-[#515154]">{name}</span><span className={`rounded px-1 py-0.5 text-[6px] font-semibold ${tag === "FINAL" ? "bg-[#dff2e5] text-[#248a3d]" : "bg-[#eeeeef] text-[#86868b]"}`}>{tag}</span></button>
            ))}
          </div>
        </div>
        <div className="min-h-0 p-3.5">
          <div className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-[#515154]" /><h4 className="text-[9px] font-semibold text-[#1d1d1f]">Scheduled tasks</h4><Plus className="ml-auto h-3 w-3 text-[#86868b]" /></div>
          <div className="mt-3 rounded-xl border border-black/8 bg-white p-3 shadow-sm">
            <div className="flex items-start gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0071e3]"><RefreshCw className="h-3.5 w-3.5" /></span><div className="min-w-0 flex-1"><p className="text-[8px] font-semibold text-[#1d1d1f]">Weekly story-health review</p><p className="mt-1 text-[7px] leading-3 text-[#86868b]">Friday · 16:00 · review latest pilot</p></div><button type="button" aria-label="Toggle scheduled task" aria-pressed={scheduleEnabled} onClick={onToggleSchedule} className={`relative h-4 w-7 rounded-full transition-colors active:scale-95 ${scheduleEnabled ? "bg-[#0071e3]" : "bg-[#d2d2d7]"}`}><span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform ${scheduleEnabled ? "translate-x-3.5" : "translate-x-0.5"}`} /></button></div>
            <div className="mt-3 flex items-center gap-1.5 text-[7px] text-[#86868b]"><CheckCircle2 className="h-3 w-3 text-[#34c759]" />Last run · 3 issues · 1 document</div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function AgentRail({ selected, view, onAgent, onGroup }: { selected: AgentId; view: AgentView; onAgent: (id: AgentId) => void; onGroup: () => void }) {
  return (
    <aside className="hidden h-full min-h-0 w-full overflow-hidden border-r border-black/8 bg-[#f7f7f8] p-3 lg:flex lg:flex-col">
      <p className="px-2 text-[8px] font-medium text-[#b0b0b5]">Writers’ rooms</p>
      <button type="button" onClick={onGroup} className={`mt-1 flex w-full items-center gap-2 rounded-xl px-2.5 py-2.5 text-left transition active:scale-[0.98] ${view === "group" ? "bg-[#dedee1]" : "hover:bg-black/[0.035]"}`}><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#515154] shadow-sm"><Users className="h-3.5 w-3.5" /></span><div><p className="text-[9px] font-semibold text-[#1d1d1f]">Pilot Rewrite Room</p><p className="mt-0.5 text-[7px] text-[#86868b]">3 agents · 2 tasks</p></div></button>
      <p className="mt-5 px-2 text-[8px] font-medium text-[#b0b0b5]">My agents</p>
      <div className="mt-1 min-h-0 flex-1 space-y-1 overflow-y-auto">
        {(Object.entries(agents) as [AgentId, (typeof agents)[AgentId]][]).map(([id, item]) => (
          <button key={id} type="button" onClick={() => onAgent(id)} className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2.5 text-left transition active:scale-[0.98] ${view === "profile" && selected === id ? "bg-[#dedee1]" : "hover:bg-black/[0.035]"}`}><span className={`flex h-7 w-7 items-center justify-center rounded-lg text-[7px] font-bold ${item.color}`}>{item.initials}</span><div className="min-w-0"><p className="truncate text-[9px] font-semibold text-[#1d1d1f]">{item.name}</p><p className="mt-0.5 truncate text-[7px] text-[#86868b]">{item.role}</p></div></button>
        ))}
      </div>
    </aside>
  );
}

function AgentWorkspace({ view, selected, onOpenGroup }: { view: AgentView; selected: AgentId; onOpenGroup: () => void }) {
  if (view === "profile") {
    const agent = agents[selected];
    return (
      <div className="grid min-h-0 flex-1 bg-white lg:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="min-h-0 overflow-y-auto border-r border-black/8 p-5 sm:p-7">
          <div data-phai-transition className="mx-auto max-w-2xl">
            <div className="flex items-start gap-4"><span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-bold ${agent.color}`}>{agent.initials}</span><div className="min-w-0 flex-1"><p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">Agent profile</p><h3 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">{agent.name}</h3><p className="mt-1 text-[10px] text-[#6e6e73]">{agent.role}</p></div><button type="button" className="rounded-full border border-black/8 bg-white px-3 py-2 text-[8px] font-semibold text-[#515154] shadow-sm active:scale-95">Edit profile</button></div>
            <p className="mt-7 text-[11px] leading-6 text-[#515154]">{agent.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#f5f5f7] p-4"><p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Working style</p><p className="mt-2 text-[10px] font-semibold text-[#1d1d1f]">{agent.tone}</p></div>
              <div className="rounded-2xl bg-[#f5f5f7] p-4"><p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Memory scope</p><p className="mt-2 text-[10px] font-semibold text-[#1d1d1f]">Project decisions + review notes</p></div>
            </div>
            <div className="mt-7"><div className="flex items-center justify-between"><h4 className="text-[11px] font-semibold text-[#1d1d1f]">Personal Skills</h4><Plus className="h-3.5 w-3.5 text-[#86868b]" /></div><div className="mt-3 space-y-2">{agent.skills.map((skill) => <div key={skill} className="flex items-center gap-3 rounded-xl border border-black/8 bg-white p-3"><Wrench className="h-3.5 w-3.5 text-[#0071e3]" /><span className="text-[9px] font-semibold text-[#515154]">{skill}</span><span className="ml-auto h-4 w-7 rounded-full bg-[#0071e3] p-0.5"><span className="block h-3 w-3 translate-x-3 rounded-full bg-white shadow" /></span></div>)}</div></div>
            <button type="button" onClick={onOpenGroup} className="mt-7 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#111318] px-4 text-[9px] font-semibold text-white transition active:scale-[0.96]"><Users className="h-3.5 w-3.5" />Add to Pilot Rewrite Room</button>
          </div>
        </section>
        <aside className="hidden min-h-0 bg-[#fbfbfc] p-4 lg:block"><div className="flex items-center gap-2"><Bot className="h-4 w-4" /><p className="text-[9px] font-semibold text-[#1d1d1f]">Agent card</p></div><div className="mt-4 rounded-2xl border border-black/8 bg-white p-4 shadow-sm"><p className="text-[8px] font-semibold text-[#1d1d1f]">Shareable configuration</p><p className="mt-2 text-[8px] leading-4 text-[#86868b]">Profile, working memory, and personal Skills travel together when this Agent is shared.</p><button type="button" className="mt-4 w-full rounded-xl bg-[#f5f5f7] py-2 text-[8px] font-semibold text-[#515154] active:scale-[0.98]">Share agent</button></div></aside>
      </div>
    );
  }

  const messages = [
    { who: "Storyboard Agent", initials: "SB", color: agents.storyboard.color, text: "The reveal should land visually before the detective explains it. I’d stage the evidence bags in the same frame, then push in only when the suspect corrects the label.", meta: "Proposed 5-shot coverage" },
    { who: "Dialogue Editor", initials: "DE", color: agents.dialogue.color, text: "Agreed. If the correction carries the reveal, delete the detective’s next two lines. Give her only: ‘Then I mislabeled it.’ The suspect does the rest with silence.", meta: "Removed 4 exposition lines" },
    { who: "Story Engineer", initials: "SE", color: agents.engineer.color, text: "That preserves the scene objective and improves the power reversal. Constraint: the camera-cage fact must still seed Scene 41, so keep the phrase ‘camera cage’ in the suspect’s correction.", meta: "Checked 2 downstream dependencies" },
  ];
  return (
    <div className="grid min-h-0 flex-1 bg-white lg:grid-cols-[minmax(0,1fr)_18rem]">
      <section className="flex min-h-0 min-w-0 flex-col border-r border-black/8">
        <div className="flex min-h-11 items-center gap-2 border-b border-black/8 px-4"><Users className="h-3.5 w-3.5 text-[#515154]" /><span className="text-[10px] font-semibold text-[#1d1d1f]">Pilot Rewrite Room</span><span className="text-[8px] text-[#86868b]">3 agents</span><button type="button" className="ml-auto rounded-full border border-black/8 px-2.5 py-1.5 text-[8px] font-semibold text-[#515154] active:scale-95">Room brief</button></div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <div data-phai-transition className="ml-auto max-w-[31rem] rounded-[1.05rem] bg-[#eaf4ff] px-4 py-3 text-[10px] leading-5 text-[#0066cc]">@Storyboard Agent @Dialogue Editor Rework Scene 32 together. The audience should understand how the detective gets the passcode without a direct question. @Story Engineer check downstream continuity.</div>
          <div className="mt-5 space-y-5">
            {messages.map((message) => <div data-phai-transition key={message.who} className="flex items-start gap-3"><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[7px] font-bold ${message.color}`}>{message.initials}</span><div><div className="flex items-baseline gap-2"><p className="text-[9px] font-semibold text-[#1d1d1f]">{message.who}</p><span className="text-[7px] text-[#b0b0b5]">now</span></div><p className="mt-1.5 max-w-[38rem] text-[10px] leading-5 text-[#515154]">{message.text}</p><p className="mt-2 inline-flex items-center gap-1.5 text-[7px] font-medium text-[#0071e3]"><CheckCircle2 className="h-3 w-3" />{message.meta}</p></div></div>)}
          </div>
        </div>
        <div className="mx-4 mb-4 rounded-[1.1rem] border border-black/10 bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.055)] sm:mx-5"><p className="text-[9px] text-[#b0b0b5]">Message the room · use <span className="font-semibold text-[#0071e3]">@</span> to direct an Agent</p><div className="mt-3 flex items-center gap-2"><AtSign className="h-3.5 w-3.5 text-[#86868b]" /><Paperclip className="h-3.5 w-3.5 text-[#86868b]" /><button type="button" aria-label="Send to group" className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#111318] text-white active:scale-90"><Send className="h-3 w-3" /></button></div></div>
      </section>
      <aside className="hidden min-h-0 overflow-y-auto bg-[#fbfbfc] lg:block">
        <div className="border-b border-black/8 p-3.5"><div className="flex items-center gap-2"><Folder className="h-3.5 w-3.5" /><p className="text-[9px] font-semibold text-[#1d1d1f]">Room documents</p></div><div className="mt-3 space-y-1.5">{["scene-32-rewrite.md", "scene-32-shotlist.md"].map((file) => <div key={file} className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 text-[8px] text-[#515154] shadow-sm"><FileText className="h-3.5 w-3.5 text-[#0071e3]" />{file}</div>)}</div></div>
        <div className="border-b border-black/8 p-3.5"><div className="flex items-center gap-2"><ListTodo className="h-3.5 w-3.5" /><p className="text-[9px] font-semibold text-[#1d1d1f]">To do</p><span className="ml-auto text-[8px] text-[#86868b]">2</span></div><div className="mt-3 space-y-2">{[["Lock visual reveal", true], ["Verify Scene 41 seed", false]].map(([task, done]) => <div key={task as string} className="flex items-center gap-2 text-[8px] text-[#515154]"><span className={`flex h-4 w-4 items-center justify-center rounded-full border ${done ? "border-[#34c759] bg-[#34c759] text-white" : "border-[#c7c7cc]"}`}>{done && <Check className="h-2.5 w-2.5" />}</span>{task as string}</div>)}</div></div>
        <div className="p-3.5"><div className="flex items-center gap-2"><Users className="h-3.5 w-3.5" /><p className="text-[9px] font-semibold text-[#1d1d1f]">Members</p><span className="ml-auto text-[8px] text-[#86868b]">3</span></div><div className="mt-3 space-y-2">{(["storyboard", "dialogue", "engineer"] as AgentId[]).map((id, index) => <div key={id} className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm"><span className={`flex h-7 w-7 items-center justify-center rounded-lg text-[7px] font-bold ${agents[id].color}`}>{agents[id].initials}</span><div className="min-w-0"><p className="truncate text-[8px] font-semibold text-[#515154]">{agents[id].name}</p><p className={`mt-0.5 text-[7px] ${index === 2 ? "text-[#0071e3]" : "text-[#248a3d]"}`}>{index === 2 ? "Working · continuity" : "Completed"}</p></div></div>)}</div></div>
      </aside>
    </div>
  );
}

function KnowledgeRail({ category, onCategory }: { category: string; onCategory: (value: string) => void }) {
  return (
    <aside className="hidden h-full min-h-0 w-full overflow-hidden border-r border-black/8 bg-[#f7f7f8] p-3 lg:flex lg:flex-col">
      <div className="grid grid-cols-2 rounded-lg bg-[#eeeeef] p-1 text-[8px] font-semibold"><button type="button" className="rounded-md bg-white py-1.5 text-[#1d1d1f] shadow-sm">Built-in</button><button type="button" disabled aria-disabled="true" title="Personal library is not included in this public demo" className="cursor-not-allowed rounded-md py-1.5 text-[#b0b0b5]">Mine</button></div>
      <div className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto pr-0.5">
        {knowledgeCategories.map(([name, count], index) => <button key={name} type="button" onClick={() => onCategory(name)} className={`flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left transition active:scale-[0.98] ${category === name ? "bg-[#dedee1]" : "hover:bg-black/[0.035]"}`}><span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-[7px] font-bold text-white ${index % 3 === 0 ? "from-[#0071e3] to-[#173d76]" : index % 3 === 1 ? "from-[#ff7a59] to-[#7f1d1d]" : "from-[#8b5cf6] to-[#312e81]"}`}>{name.slice(0, 2).toUpperCase()}</span><div><p className="text-[9px] font-semibold text-[#1d1d1f]">{name}</p><p className="mt-0.5 text-[7px] text-[#86868b]">{count} titles</p></div></button>)}
      </div>
    </aside>
  );
}

const knowledgePlotlines: Record<KnowledgePlotId, { label: string; title: string; question: string; trajectory?: string; stages: [string, string, string][] }> = {
  survival: {
    label: "Primary",
    title: "Andy’s workplace survival challenge",
    question: "Can Andy, who knows nothing about fashion, perform competently as an assistant to the ‘dragon lady’ Miranda Priestly and survive working for her?",
    stages: [
      ["Episode 1 · Scenes 2, 5–6", "Beginning / inciting incident", "Aspiring journalist Andy Sachs is trying to establish herself in New York media when she unexpectedly lands a job as second assistant to Miranda Priestly, editor in chief of the fashion magazine Runway. Andy does not understand the publication at all. The position is described as ‘a job a million girls would kill for,’ but to Andy it is an unknown and punishing challenge that directly conflicts with her values."],
      ["Episode 1 · Scenes 9, 11–12", "Early chaos and clumsiness", "Andy’s first days are a disaster. She cannot keep up with Miranda’s exacting coffee order, cannot decipher complicated instructions, answers the phones awkwardly, and is continually scorned and reprimanded by first assistant Emily. She is completely unable to match the pace of the office."],
      ["Episode 1 · Scene 16", "The cerulean humiliation", "During an important wardrobe review, Andy laughs at two belts that look identical to her. Miranda publicly crushes and humiliates her with a precise explanation of the cerulean fashion supply chain. For the first time, Andy recognizes the professional depth of the field she has dismissed."],
      ["Episode 1 · Scenes 20–22", "The hurricane crisis and failure", "Miranda gives Andy an impossible assignment: find her a private plane from Miami to New York during a hurricane. Andy exhausts every option and still fails. The task also forces her to abandon a dinner with her father, who came specifically to see her, and Miranda’s severe rebuke leaves Andy’s career in jeopardy."],
      ["Episode 1 · Scenes 23–24", "Breakdown, confrontation, and choice", "After the string of failures, Andy breaks down in front of art director Nigel. She says Miranda hates her, the job is unfair, and no one recognizes how hard she is trying. Nigel answers that she is not trying at all. She is complaining. He reminds her that countless people dream of doing this work. His words destroy Andy’s self-defense. She must either quit or begin making a genuine effort. She dries her tears and asks him for help, marking the turn from passive frustration to active change."],
      ["Episode 1 · Scenes 25, 28", "Resolution / new state", "With Nigel’s help, Andy remakes her appearance and returns as a polished fashion professional. Her efficiency and initiative rise sharply; she starts anticipating Miranda’s needs and handling assignments with composure. She is no longer the novice who could be eliminated at any moment. She has begun to establish herself in the workplace survival contest."],
    ],
  },
  transformation: {
    label: "Secondary",
    title: "Andy’s fashion transformation",
    question: "How does a plainly dressed young woman who dismisses fashion move from resistance to active acceptance and finally become part of the fashion world?",
    trajectory: "Driven by both the need to survive at work and the desire to win, Andy gradually gives up her prejudice, accepts the rules of fashion, and completes a transformation in both appearance and attitude.",
    stages: [
      ["Episode 1 · Scenes 1–2", "Phase 1 · An outsider who does not belong", "Parallel editing contrasts Andy’s plain, disheveled clothes with the fashion world’s refined luxury, establishing her as an outsider who does not belong in this environment."],
      ["Episode 1 · Scenes 5, 11, 16", "Phase 1 · Resistance and prejudice", "In both her interview and early work, Andy states that she does not read Runway and knows nothing about fashion. She rejects designer clothes offered by coworkers and holds tightly to an identity she considers ‘serious’ and substantive. Her contempt peaks during the wardrobe review, when laughing at two belts prompts Miranda’s public lesson and forces Andy to confront the industry’s rules and depth."],
      ["Episode 1 · Scenes 23–24", "Phase 2 · Awakening after collapse", "After being battered at work, Andy cries to Nigel and still blames her failure on the environment. Nigel’s blunt rebuke wakes her up: her failure comes from not trying and from disrespecting the work. She realizes that changing is the only way to survive and actively asks him for help."],
      ["Episode 1 · Scene 25", "Phase 3 · Transformation and active integration", "Nigel takes Andy into the company wardrobe and gives her a complete fashion makeover. A montage shows her wearing Chanel and other designer labels with growing confidence through the office and New York streets. Her stunning change leaves her coworkers speechless and earns a subtle, appraising glance back from Miranda. It is the first recognition Andy receives in the language of fashion."],
      ["Episode 1 · Scenes 26–27", "Final state / ultimate effect", "Andy fully accepts her new identity. She can discuss fashion pieces with ease and enjoys the luxury goods that come with the job. She is no longer the woman who resists fashion, but a polished, efficient, highly professional ‘Miranda girl’ who has become part of it."],
    ],
  },
  relationship: {
    label: "Secondary",
    title: "Andy and Nate’s relationship fracture",
    question: "How will Andy’s immersion in a high-pressure fashion job affect the warm, grounded relationship she shares with her boyfriend, Nate?",
    stages: [
      ["Episode 1 · Scenes 7–8", "Beginning / emotional home", "Early in the story, Andy’s relationship with Nate and their friends is warm, grounded, and affectionate. They celebrate her new job together, and Nate kisses her on the street, presenting the couple as deeply intimate and secure."],
      ["Episode 1 · Scenes 17, 20", "Development / work enters private life", "After work, Andy vents her frustration to Nate, who still acts as listener and comforter; their relationship remains her safe harbor. Then work intrudes more aggressively: one call from Miranda forces Andy to leave dinner with her father. Nate is not present, but the interruption foreshadows how the job will outrank Andy’s personal relationships."],
      ["Episode 1 · Scene 27", "Climax / the gap becomes visible", "After her makeover, Andy waits for Nate beside a company car in stylish clothes and hands him a bag of expensive gifts, including a phone worth thousands of dollars. The image materializes the growing difference in worldview and class between them and becomes the defining moment when the relationship begins to fracture."],
      ["Episode 1 · Scene 27", "Resolution / separation", "Andy gets into the car with a slight smile and leaves Nate standing alone on the street, holding luxury goods that do not belong to his world and wearing a conflicted expression. Physical distance and symbolic distance appear at the same moment. Their former balance of intimacy has broken, and the crack is now unmistakable."],
    ],
  },
  power: {
    label: "Secondary",
    title: "Miranda Priestly’s display of power",
    question: "How does the story systematically establish Miranda Priestly as fashion’s absolute monarch and show the unquestioned authority with which she controls other people’s lives?",
    trajectory: "Through a succession of escalating events, Miranda’s power is revealed in three layers: indirect intimidation, direct dictatorship at work, and unrestricted invasion of private life.",
    stages: [
      ["Episode 1 · Scenes 2–3", "Phase 1 · Intimidation before arrival", "A single phone call announcing Miranda’s arrival sends the entire office into panic; employees prepare as though for a military inspection. Her power is visible through everyone else’s fear before she appears. When she enters the building, people automatically clear a path, and employees would rather wait for the next elevator than ride with her."],
      ["Episode 1 · Scenes 4, 11", "Phase 2 · Absolute rule at work", "Miranda fires off a rapid sequence of complicated professional and personal orders in a tone that permits no question, completely ignoring Andy’s introduction. She displays absolute dictatorship within the workplace and indifference toward the people who serve her."],
      ["Episode 1 · Scene 16", "Phase 2 · Intellectual authority", "The cerulean speech is the intellectual expression of Miranda’s power. Her authority does not come from title alone: her encyclopedic command of the industry gives her the power to define its discourse and dismantle any challenge at its foundation."],
      ["Episode 1 · Scenes 18, 20–22", "Phase 3 · Unrestricted invasion of private life", "A montage shows that Miranda’s instructions ignore time and space: a morning phone call demands breakfast, extending work pressure into Andy’s private life. The hurricane crisis takes that power to its extreme. Miranda ignores objective conditions such as weather and insists that Andy obtain a plane, placing her personal desire above everything else. Her authority is not only dictatorial but irrational; her will must be executed regardless of cost."],
      ["Episode 1 · Scene 24", "Final state / ultimate effect", "By the end of the episode, Miranda’s image of power is complete. She is the absolute ruler of the fashion empire, and her will is law. Her warning that she could find another girl who wants Andy’s job in five minutes provides the final proof of her authority over the careers of those beneath her."],
    ],
  },
};

const sourceCharacterProfiles: Record<KnowledgeCharacterId, { name: string; initials: string; role: string; tags: string[]; color: string; sourceType: string; overview: string; sections: [string, string][]; relations: [string, string, string][] }> = {
  andy: {
    name: "Andrea “Andy” Sachs", initials: "AS", role: "Protagonist · second assistant · aspiring journalist", color: "from-[#dbeafe] to-[#93c5fd] text-[#0756a4]",
    tags: ["Workplace novice", "Intellectual arrogance", "Survivor under pressure", "Glamorous transformation", "Positive arc"],
    sourceType: "Complete central-character biography from the source document",
    overview: "An ambitious would-be journalist who dismisses fashion must become the assistant to its most formidable editor in order to establish herself in New York media. Under extreme pressure, she is forced to remake both her outward image and her inner assumptions.",
    sections: [
      ["Basic profile", "Andy is a recent college graduate from Ohio who now lives in New York. At the beginning, she dresses plainly and appears completely disconnected from fashion; her signature garment is a loose blue sweater. After her makeover, she can carry Chanel, Dolce & Gabbana, and other elite labels with a polished, capable confidence. She is intelligent, quick to learn, hardworking, and strongly principled, but initially carries an intellectual’s pride and naïveté, prejudging fields she does not understand. Repeated setbacks reveal exceptional resilience, adaptability, professionalism, and practicality."],
      ["Education, work, and family", "A Northwestern University graduate, Andy served as editor in chief of The Daily Northwestern, won first place in a national college journalism competition, and was admitted to Stanford Law School. She wants to become a serious journalist but currently works as second assistant to Runway editor in chief Miranda Priestly. Her family is close; her father is deeply concerned about both her career choice and the hardship of the job. Andy begins with strong writing and investigative-reporting skills and quickly learns high-pressure multitasking, anticipating an executive’s needs, and fashion styling."],
      ["Psychological profile", "Andy’s inner journey overturns her own pride and prejudice. She begins protected by a sense of intellectual superiority, convinced that her talent and intelligence place her above what she sees as the shallow, materialistic world of fashion. She treats the assistant job as a dirty stepping-stone toward real journalism, which fills her work with resistance and contempt. Yet her surface desire to endure one year and gain a valuable résumé line keeps her inside a world that conflicts with her values. Miranda’s criticism and her coworkers’ scorn expose a deeper need: to prove that she is capable and worthy of recognition not only in familiar intellectual territory, but also in an unfamiliar arena she once despised. Her growth comes from the collision between desire and need. She learns that professionalism does not mean ignoring the rules; it means learning, respecting, and mastering the rules of any field well enough to create value within it."],
      ["Core desire and deeper need", "Core desire: survive the job for one year and earn the résumé and recommendation that could open the door to a top news organization. Deeper need: prove her value in a field she once looked down on, earn recognition from its highest authority, Miranda, and learn what professionalism actually requires."],
      ["Backstory", "Before the story begins, Andy is a high-achieving student and idealistic journalist. At Northwestern, she demonstrates exceptional talent as editor of the student newspaper and wins a national college journalism competition for an investigative series exposing the unlawful exploitation of a campus workers’ union. Those achievements become both the basis of her confidence and the source of her belief that content is king and talent alone can conquer the world. She arrives in New York with a dream of serious reporting, submitting applications throughout the media capital and expecting to prove herself."],
      ["Action line", "With no understanding of fashion, Andy unexpectedly becomes assistant to Miranda Priestly. Her dowdy clothes and inexperience make her Emily’s target and leave her virtually invisible to Miranda. The cerulean-belt humiliation reveals the professional system inside a field Andy dismissed. The impossible hurricane-flight request makes her miss dinner with her father and brings her career to the edge of collapse. When she complains to Nigel, he tells her she has not tried. She has only complained. Andy chooses change. With Nigel’s help, she transforms her appearance and attitude, becomes dramatically more efficient, shocks her coworkers, and earns Miranda’s first fleeting sign of recognition. Yet as she begins enjoying the access and polish of the job, a values-based fracture opens between her and Nate, signaling that her new world is already pulling away from her old life."],
      ["Character arc", "Andy follows a positive arc organized around breaking a core lie: ‘My intelligence places me above the shallow fashion world; appearance and industry rules do not matter.’ The cerulean lecture makes her see that contempt rooted in ignorance is not superiority. The failed hurricane assignment and Nigel’s rebuke destroy her victim mentality and redirect blame inward, toward her refusal to respect, enter, and work within the field. She lowers her defenses, asks for help, improves her performance, and accepts a new truth: success in any industry requires professionalism, and professionalism means respecting and mastering its rules rather than criticizing cheaply from outside. She moves from a prejudiced outsider to an insider who can create value within the system."],
      ["Core lie and core fear", "Core lie: ‘My intelligence places me above the shallow fashion world; appearance and industry rules are irrelevant.’ Core fear: being seen as shallow, and discovering that her intelligence has no value inside a different system of judgment."],
    ],
    relations: [
      ["Miranda Priestly", "Transformer ↔ transformed; demanding employer ↔ struggling assistant", "The relationship begins with an extreme imbalance of power. Miranda hires Andy almost as an experiment, ignores her, and pushes her toward collapse with impossible tasks. The cerulean lesson turns simple fear into awe of Miranda’s professional authority. After Andy chooses to change, Miranda’s first approving glance marks a new phase: Andy begins moving from passive victim to an assistant who can anticipate and satisfy Miranda’s needs, creating the first outline of an efficient but emotionally cold alliance."],
      ["Nigel", "Enlightening mentor ↔ protégé; fashion-world transformer", "Nigel initially mocks Andy’s clothes and outsider attitude. At her lowest point, he refuses to indulge her self-pity and tells her that she is complaining rather than trying. Once she shows a willingness to change, he brings her into the wardrobe archive and personally guides her transformation. The critic becomes a demanding mentor and the central catalyst of her professional reinvention."],
      ["Emily", "Workplace competitor ↔ direct instructor", "Emily greets Andy with contempt and treats the inexperienced outsider as an invading burden. Her onboarding consists of reprimands, impatience, and humiliation. When Andy returns transformed, Emily’s unquestioned superiority gives way to shock and unease. Andy is no longer someone she can simply bully, but a player she must reassess."],
      ["Nate", "Boyfriend ↔ emotional anchor to Andy’s old world", "Nate initially provides intimacy, humor, and emotional shelter. As work consumes Andy’s attention and personal time, the grounded life he represents begins to recede. The company car, fashionable clothes, and expensive gifts make their widening difference in values visible. Nate becomes increasingly unfamiliar with the person Andy is becoming."],
      ["Doug", "Friend ↔ representative of the old social circle", "Relationship overview: Doug belongs to Andy’s social life before fashion and responds to the new job with teasing distance. Evolution anchor, Episode 1, Scene 7: at the celebration, he imitates Miranda’s voice and jokes about the ‘dragon lady,’ yet also concedes that Miranda is important and that this is ‘a job a million girls would kill for.’ He represents an outsider who neither understands nor participates in Andy’s new world, but recognizes its public prestige."],
      ["Lily", "Friend ↔ supportive voice from the old social circle", "Relationship overview: Lily is the most actively supportive member of Andy’s old circle. Evolution anchor, Episode 1, Scene 7: she explicitly urges Andy to seize the opportunity to get ahead and also notices the practical problem that Andy has nothing suitable to wear. Her response combines uncomplicated encouragement with concrete, everyday concern."],
      ["Irv Ravitz", "Corporate chief ↔ entry-level employee", "Relationship overview: Irv Ravitz, president of Elias-Clark, shares only one brief and informal encounter with Andy. Evolution anchor, Episode 1, Scene 15: Andy awkwardly tries to greet him in an elevator. Instead of taking offense, Irv says, ‘Congratulations, young lady. A million girls would kill for that job.’ Recognition from the highest corporate authority lets a battered newcomer see the position’s scarcity and value from outside Miranda’s office."],
      ["Andy’s father", "Father ↔ daughter", "Relationship overview: her father represents family and voices concern about her career choice and condition. Evolution anchors, Episode 1, Scene 20: over dinner, he questions the low pay, punishing labor, distance from journalism, and why she abandoned the Stanford Law opportunity. Scenes 20–21: Miranda’s emergency call forces Andy to interrupt the visit and run out to solve the private-plane crisis. Her father becomes the first witness to family time being sacrificed to the new job."],
      ["Serena", "Coworker ↔ marker of the office’s social boundary", "Relationship overview: Serena is a Runway employee whose brief functional interaction primarily establishes Emily’s place in the office social circle and Andy’s isolation. Evolution anchor, Episode 1, Scene 14: Emily introduces Serena as her friend and announces that they are going to lunch while Andy must remain behind. Serena greets Andy politely, but the moment makes the office’s social barrier and status hierarchy immediately visible."],
    ],
  },
  miranda: {
    name: "Miranda Priestly", initials: "MP", role: "Key relationship profile · employer and transforming authority", color: "from-[#e5e7eb] to-[#9ca3af] text-[#26272a]",
    tags: ["Absolute authority", "Transformer", "Professional mastery", "Institutional power"],
    sourceType: "Andy–Miranda relationship report from the source document",
    overview: "This relationship begins in extreme inequality: Miranda sees Andy as an ill-fitting, negligible intruder, while Andy sees Miranda as a merciless ‘dragon lady.’ Under Miranda’s relentless pressure and indirect instruction, Andy is forced to change her appearance and professional attitude, moving from passive victim toward an assistant capable of anticipating and meeting Miranda’s demands.",
    sections: [
      ["Scenes 4–6 · First encounter and unexpected hire", "Andy knows nothing about fashion and meets Miranda’s indifference and absolute authority in the interview. Miranda barely looks at her and shows no interest in either résumé or appearance. Andy finally gives an honest declaration: she is smart, learns quickly, and will work hard. She unexpectedly gets the job. Their starting positions are established: an unreadable ruler above and an outsider selected for some quality other than conventional credentials below."],
      ["Scenes 9, 11, 18 · Ignored and pressured", "Miranda never uses Andy’s name and treats her as an incompetent tool available for any demand. Dense, trivial, and ambiguous instructions create a one-way structure of command and obedience. Andy repeatedly fails under the pressure and lives in Miranda’s shadow, defined by frustration and fear."],
      ["Scene 16 · Authority overwhelms and overturns perception", "Andy’s laugh at two similar belts finally earns Miranda’s full attention. Miranda’s cerulean explanation destroys Andy’s self-satisfied outsider position and reveals the authority and depth of her expertise. Andy’s view of Miranda begins to include professional awe alongside fear."],
      ["Scenes 20–24 · Limit test and near rupture", "The order to obtain a plane during a hurricane drives Andy to the edge. After the failure, she seeks some acknowledgment of effort, but Miranda answers that another girl could replace her in five minutes. The episode becomes the relationship’s lowest point and proves that any hope of humane reciprocity is useless inside its current terms."],
      ["Scenes 25, 28 · Transformation and silent recognition", "With Nigel’s help, Andy returns as a more polished and capable professional. Miranda’s brief second look from the car becomes her first real sign of recognition. Andy is no longer merely a problem to manage but is beginning to qualify as a useful asset. Miranda remains demanding, yet the relationship starts to resemble a highly efficient, emotionally cold working alliance."],
    ],
    relations: [],
  },
  nigel: {
    name: "Nigel", initials: "NG", role: "Key relationship profile · mentor and fashion-world transformer", color: "from-[#fef3c7] to-[#f59e0b] text-[#7c3d00]",
    tags: ["Mentor", "Art director", "Critic turned guide", "Transformation catalyst"],
    sourceType: "Andy–Nigel relationship report from the source document",
    overview: "Nigel is Andy’s first true mentor and her ‘transformer’ inside fashion. He begins by scorning her appearance and attitude, but when Andy reaches collapse and shows that she wants to change, he becomes a severe and essential guide. He breaks her self-pity, then directs her transformation in both image and mindset.",
    sections: [
      ["Scene 15 · First contact and contemptuous criticism", "In the company cafeteria, Nigel immediately criticizes Andy’s lunch, saying, ‘You know there’s a lot of fat in that,’ and her taste in clothes. When she tries to defend herself, he answers with cutting sarcasm about what the fashion industry actually is. At this stage, he is the elevated industry insider examining an uninformed outsider."],
      ["Scene 23 · The wake-up call after collapse", "After Miranda condemns Andy over the hurricane, Andy cries that Miranda hates her and fails to appreciate her effort. Nigel offers no sympathy. He says, with precision, that she is not trying but complaining, passionately defends the value of the work, and tells her to wake up. The confrontation breaks her self-pity and shifts Nigel from contemptuous observer to demanding teacher."],
      ["Scene 25 · Transformation under a mentor", "Once Andy’s attitude changes, Nigel takes on the mentor role directly. He leads her into Runway’s wardrobe archive, selects clothes and shoes, and begins her reinvention. The makeover montage shows Andy becoming stylish and more confident under his guidance. His voice-over explains that fashion is not about utility and that what you wear represents who you are. This confirms his role as her guide into the industry’s language."],
    ],
    relations: [],
  },
  emily: {
    name: "Emily", initials: "EM", role: "Key relationship profile · workplace guide and direct competitor", color: "from-[#fce7f3] to-[#f9a8d4] text-[#9d174d]",
    tags: ["First assistant", "Gatekeeper", "Direct instructor", "Competitor"],
    sourceType: "Andy–Emily relationship report from the source document",
    overview: "Emily is Andy’s workplace guide and direct competitor. The relationship is defined at first by Emily’s one-sided hostility, contempt, and exclusion. She views the unfashionable, clumsy newcomer as an unqualified intruder and burden. After Andy’s transformation, pure contempt gives way to shock, confusion, and implicit jealousy.",
    sections: [
      ["Scene 2 · The contemptuous gatekeeper", "When Andy arrives to interview at Runway, Emily examines her with an X-ray stare and openly disdains both her clothes and ignorance: ‘Runway is a fashion magazine, so an interest in fashion is crucial.’ From the first moment, Emily classifies Andy as an unqualified outsider."],
      ["Scenes 4, 9, 12 · Harsh workplace pressure", "After Andy is hired, Emily becomes her direct supervisor and instructor, but teaches through impatience and deliberate difficulty. She throws Miranda’s coat onto Andy’s desk to demonstrate authority, watches her flounder with contempt, cuts off questions with ‘You never ask Miranda anything!’ and mocks her assignments. Emily treats Andy as a recurring mess she must clean up."],
      ["Scene 25 · Shock at Andy’s change", "When Andy appears in Nigel’s new fashion styling, Emily and the others are stunned. She cannot reconcile this confident, polished colleague with the dowdy Andy she knew. The surprise breaks Emily’s assumption of superiority. Hostility remains, but Andy is now a peer-level player who must be reassessed."],
    ],
    relations: [],
  },
  nate: {
    name: "Nate", initials: "NT", role: "Key relationship profile · boyfriend and emotional anchor", color: "from-[#dcfce7] to-[#86efac] text-[#166534]",
    tags: ["Boyfriend", "Old world", "Emotional harbor", "Values fracture"],
    sourceType: "Andy–Nate relationship report from the source document",
    overview: "Nate represents the plain, warm ‘old world’ Andy occupied before fashion. The relationship begins in intimacy and mutual support, then develops fractures as Andy becomes immersed in her job. Nate neither understands nor accepts the new world she is pursuing, and the difference in values produces emotional distance.",
    sections: [
      ["Scene 7 · Intimate support and emotional anchor", "After Andy lands a job she herself finds strange, Nate celebrates with their friends. Although they joke about the position, he offers warmth, support, and intimate reassurance. He is Andy’s emotional harbor in an unfamiliar environment and the symbol of her ‘real life.’"],
      ["Scenes 17, 20 · Work invades life and distance begins", "Andy comes home able only to vent about Miranda, and an emergency call later forces her to leave dinner with her father. Nate is not directly present in every interruption, but the pattern shows Andy’s center of gravity shifting away from the relaxed life he represents."],
      ["Scene 27 · The values gap becomes visible", "Andy arrives in fashionable clothes and a company car, bringing Nate expensive gifts, including a costly phone. Her casual familiarity with luxury contrasts with his conflicted reaction. For the first time, the difference in their values has a visible form: Andy’s change is no longer only external; she has begun internalizing the logic of a world she once dismissed, while Nate feels alienated and uneasy."],
    ],
    relations: [],
  },
};

function KnowledgeDetailView({ tab, onTab, onBack, onCite }: { tab: KnowledgeTab; onTab: (tab: KnowledgeTab) => void; onBack: () => void; onCite: () => void }) {
  const [characterId, setCharacterId] = useState<KnowledgeCharacterId>("andy");
  const [plotId, setPlotId] = useState<KnowledgePlotId>("survival");
  const character = sourceCharacterProfiles[characterId];
  const plotline = knowledgePlotlines[plotId];
  const activeTabs: [KnowledgeTab, string, typeof BookOpen][] = [["overview", "Story overview", BookOpen], ["plot", "Plot structure", ListTodo], ["characters", "Characters", CircleUserRound], ["world", "World", Library]];
  const worldRules: [string, string][] = [
    ["1.1 · Physical laws and geography", "The story is set in contemporary New York City in the early twenty-first century. The world follows real physical laws and contains no supernatural or science-fiction elements. Its central geography is Manhattan, a global center of fashion, finance, and culture. New York’s dense architectural landscape and accelerated urban rhythm, together with the contrast between Andy’s modest apartment and the upscale office tower occupied by Runway, create a modern city defined by opportunity, pressure, and enormous class difference."],
    ["1.2 · Science and technology", "The world’s technological level matches that of the early twenty-first century. Communication technology is both a plot engine and a primary source of pressure: shrill landlines, constantly ringing cell phones, and an unending stream of email construct the protagonist’s high-pressure workplace. Andy’s struggle to answer two office phones at once and her desperate use of a cell phone to solve the hurricane-flight emergency show how completely instant communication has penetrated and come to dominate professional life. Objects such as the Bang & Olufsen phone also function as markers of period and status."],
    ["1.3 · Social structure and class ecology", "The story depicts a rigid micro-society whose central standard of classification is fashion. Power, status, and the right to define meaning are closely tied to a person’s position in the fashion value chain. Miranda occupies the top as the empire’s absolute monarch: her taste, decisions, and will become industry law, giving her the power to define beauty, create trends, move millions of dollars, and alter careers. Nigel and Emily form the inner power circle. They understand, believe in, execute, and defend Miranda’s rules; they possess authority over those below them while embodying the system’s severity. Andy enters at the bottom as an outsider whose ordinary, ‘uncultivated’ values and taste challenge a closed system simply by being present. Upward mobility is possible, but only at the price of accepting and internalizing the class’s rules. Andy does not rise through her original talent for journalism, but through remaking her appearance and conforming to fashion’s behavioral code."],
    ["1.4 · Political and legal system", "At the macro level, the story follows the legal system of the real world. Its central conflict, however, takes place inside Runway, a micro-level independent kingdom governed by office politics around absolute authority. Miranda serves simultaneously as chief legislator, enforcer, and judge; her orders function as law and permit neither question nor challenge. Relationships among employees are organized around competition, dependence, and survival. As company president, Irv Ravitz represents a higher order of capital power capable of influencing Miranda’s decisions, revealing that even fashion authority is constrained by commercial interest."],
    ["1.5 · Economic system and daily livelihood", "The setting is an advanced capitalist information economy centered on a fashion industry worth hundreds of millions of dollars. The industry extends beyond magazine publishing into design, manufacturing, retail, and media. Miranda’s cerulean explanation exposes the enormous economic chain and number of jobs behind a single fashion object. Characters’ livelihoods depend on their position within that system. Andy initially receives low wages for exhausting physical and administrative labor. As she advances, she gains access to luxury objects ordinary people cannot reach, including designer clothing and limited-edition handbags. These goods are working tools, noncash compensation, and visible signs of status, revealing the industry’s distinctive economic ecology."],
    ["1.6 · Culture, belief, and history", "The world is organized around an elite culture that treats fashion as doctrine. Its core values are outward beauty, professionalism, extreme dedication, and absolute obedience to authority. ‘Trying’ is not only an action but a posture; ‘taste’ is not merely personal preference but a professional capability that must be learned and mastered. Runway itself functions as a ‘beacon of hope’ and a bible for young people who dream of fashion, while Miranda acts as the faith’s high priest. Nigel’s defense of the field reveals an almost religious intensity: fashion is treated as a form of creation greater than ordinary art because people can live inside it. The world’s history is built from the achievements of legendary designers, including Halston, Lagerfeld, and de la Renta. Their names and work constitute its canon and standards of judgment."],
    ["1.7 · Nonrealistic high concept", "The work is realistic and contains no nonrealistic high-concept premise."],
  ];
  return (
    <section className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-gutter:stable]">
      <div className="px-4 pt-4 sm:px-6 sm:pt-5" data-phai-transition>
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-[8px] font-semibold text-[#6e6e73] active:scale-95"><ChevronLeft className="h-3.5 w-3.5" />Back to library</button>
        <div className="mt-4 flex items-start gap-4"><div className="flex h-20 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#ef4444] to-[#7f1d1d] text-xs font-bold text-white shadow-md">DWP</div><div className="min-w-0"><h3 className="text-xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">The Devil Wears Prada</h3><p className="mt-1 text-[9px] text-[#86868b]">United States · 2006 · Film</p><div className="mt-3 flex flex-wrap gap-1.5">{["Workplace", "Comedy-drama", "Positive arc", "Linear narrative"].map((tag) => <span key={tag} className="rounded-full bg-[#f5f5f7] px-2 py-1 text-[7px] text-[#6e6e73]">{tag}</span>)}</div></div><div className="ml-auto flex gap-2"><button type="button" className="hidden min-h-9 items-center gap-1.5 rounded-full border border-black/8 px-3 text-[8px] font-semibold text-[#515154] sm:flex"><Search className="h-3 w-3" />Search</button><button type="button" onClick={onCite} className="flex min-h-9 items-center gap-1.5 rounded-full bg-[#111318] px-3 text-[8px] font-semibold text-white active:scale-95"><AtSign className="h-3 w-3" />Cite</button></div></div>
        <div className="mt-5 flex gap-1 overflow-x-auto border-b border-black/8" aria-label="Knowledge record sections">{activeTabs.map(([id, label, Icon]) => <button key={id} type="button" onClick={() => onTab(id)} className={`relative inline-flex shrink-0 items-center gap-1.5 px-3 py-2.5 text-[8px] font-semibold active:scale-[0.97] ${tab === id ? "text-[#1d1d1f]" : "text-[#a1a1a6]"}`}><Icon className="h-3 w-3" />{label}{tab === id && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#0071e3]" />}</button>)}{[[FileText, "Episode content"], [Sparkles, "Creative analysis"]].map(([Icon, label]) => { const TabIcon = Icon as typeof FileText; return <button key={label as string} type="button" disabled aria-disabled="true" title="This section is not available in the public demo" className="inline-flex cursor-not-allowed shrink-0 items-center gap-1.5 px-3 py-2.5 text-[8px] font-semibold text-[#c7c7cc]"><TabIcon className="h-3 w-3" />{label as string}</button>; })}</div>
      </div>
      <div data-phai-transition className="px-4 py-5 sm:px-6">
        {tab === "overview" && <div className="max-w-5xl"><div className="grid gap-px overflow-hidden rounded-2xl bg-black/8 sm:grid-cols-2">{[["Subject", "Workplace · Fashion"], ["Story type", "Drama · Comedy"], ["Structure", "Linear narrative · Events unfold in chronological order, following Andy’s experience after entering Runway without structural flashbacks or temporal disruption."], ["Narrative form", "Dramatic form · A chain of difficult actions grows from the central problem: Andy must ‘survive’ Miranda’s exacting voice and earn recognition."]].map(([label, value]) => <div key={label} className="bg-[#f8f8f9] p-3"><p className="text-[7px] uppercase tracking-[0.1em] text-[#a1a1a6]">{label}</p><p className="mt-1.5 text-[9px] font-semibold leading-5 text-[#515154]">{value}</p></div>)}</div><h4 className="mt-6 text-[12px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">Core story overview</h4><div className="mt-3 space-y-3 text-[9px] leading-[1.8] text-[#515154]"><p>The story follows Andy Sachs, an ambitious recent college graduate and would-be journalist who finds the fashion industry superficial and beneath her. Hoping to establish herself in New York, she unexpectedly becomes assistant to Miranda Priestly, the formidable editor at the center of that world. Her plain clothes, unfamiliarity with the business, and resistance to its values make her an object of Emily’s contempt and leave her all but invisible to Miranda. Andy flounders through a workplace whose pace, hierarchy, and tacit rules she cannot yet read.</p><p>During a wardrobe review, Andy casually laughs at two similar belts. Miranda answers with a lesson on the cerulean fashion supply chain, publicly humiliating her and revealing the vast professional system inside the field Andy dismisses. Soon afterward, Miranda orders her to find a private plane during a hurricane. Andy fails despite exhausting every option, misses dinner with her visiting father, and receives Miranda’s cold condemnation. Near collapse, she complains to Nigel, who tells her plainly that she has not tried. She has only complained. His rebuke forces Andy to recognize her own arrogance and choose change.</p><p>Nigel takes Andy into Runway’s wardrobe archive and guides a complete transformation in both appearance and working attitude. She returns polished, efficient, and able to anticipate Miranda’s needs. Her coworkers are stunned, and Miranda gives her the first fleeting look of recognition. Andy begins enjoying the access, luxury goods, and confidence that come with doing the job well. At the same time, the distance between her new world and the grounded life represented by Nate, her father, and her friends becomes visible. Her professional adaptation is succeeding, but the relationship between that new identity and her original values has begun to fracture.</p></div><h4 className="mt-7 text-[11px] font-semibold text-[#1d1d1f]">Main structural threads in the source</h4><div className="mt-3 grid gap-2 sm:grid-cols-2">{[["Primary", "Andy’s workplace survival challenge"], ["Secondary", "Andy’s fashion transformation"], ["Secondary", "The fracture between Andy and Nate"], ["Secondary", "Miranda Priestly’s display of power"]].map(([label, copy]) => <div key={copy} className="rounded-2xl bg-[#f5f5f7] p-4"><p className="text-[7px] font-semibold uppercase tracking-[0.1em] text-[#86868b]">{label}</p><p className="mt-2 text-[9px] font-semibold text-[#1d1d1f]">{copy}</p></div>)}</div></div>}
        {tab === "plot" && <div className="max-w-5xl"><div className="grid gap-2 sm:grid-cols-2">{(Object.entries(knowledgePlotlines) as [KnowledgePlotId, typeof plotline][]).map(([id, item]) => <button key={id} type="button" onClick={() => setPlotId(id)} aria-pressed={plotId === id} className={`rounded-2xl p-4 text-left transition active:scale-[0.98] ${plotId === id ? "bg-[#111318] text-white shadow-[0_12px_30px_rgba(0,0,0,0.12)]" : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#eeeeef]"}`}><p className={`text-[7px] font-semibold uppercase tracking-[0.12em] ${plotId === id ? "text-[#65b5ff]" : "text-[#86868b]"}`}>{item.label}</p><p className="mt-2 text-[10px] font-semibold">{item.title}</p></button>)}</div><AnimatePresence mode="wait" initial={false}><motion.div key={plotId} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.2 }}><div className="mt-5 rounded-2xl bg-[#eaf4ff] p-4"><p className="text-[7px] font-semibold uppercase tracking-[0.12em] text-[#0071e3]">{plotId === "transformation" || plotId === "power" ? "Core narrative trajectory" : "Core dramatic question"}</p><p className="mt-2 text-[9px] font-medium leading-5 text-[#315a78]">{plotline.trajectory ?? plotline.question}</p>{plotline.trajectory && <p className="mt-3 border-t border-[#b9dbff] pt-3 text-[8px] leading-4 text-[#55718a]">{plotline.question}</p>}</div><h4 className="mt-6 text-[11px] font-semibold text-[#1d1d1f]">Detailed plotline analysis</h4><div className="mt-3 space-y-2">{plotline.stages.map(([scene, phase, detail], index) => <div key={`${scene}-${phase}`} className="grid gap-2 rounded-xl border border-black/8 bg-white p-3 sm:grid-cols-[8.5rem_9rem_1fr]"><span className="text-[7px] font-semibold text-[#0071e3]">{scene}</span><span className="text-[8px] font-semibold leading-4 text-[#1d1d1f]">{String(index + 1).padStart(2, "0")} · {phase}</span><span className="text-[8px] leading-[1.65] text-[#6e6e73]">{detail}</span></div>)}</div></motion.div></AnimatePresence></div>}
        {tab === "characters" && <div className="max-w-5xl"><div className="flex gap-3 overflow-x-auto pb-2" aria-label="Select character">{(Object.entries(sourceCharacterProfiles) as [KnowledgeCharacterId, typeof character][]).map(([id, item]) => <button key={id} type="button" onClick={() => setCharacterId(id)} aria-pressed={characterId === id} className="group w-20 shrink-0 text-center active:scale-[0.96]"><span className={`relative mx-auto flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br text-[9px] font-bold shadow-sm ring-offset-2 transition ${item.color} ${characterId === id ? "ring-2 ring-[#0071e3]" : "ring-1 ring-black/8 group-hover:ring-black/20"}`}><CircleUserRound className="absolute h-9 w-9 opacity-20" />{item.initials}</span><span className={`mt-1.5 block truncate text-[7px] font-semibold ${characterId === id ? "text-[#1d1d1f]" : "text-[#86868b]"}`}>{item.name.split(" ")[0]}</span></button>)}</div><AnimatePresence mode="wait" initial={false}><motion.div key={characterId} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.2 }}><div className="mt-4 rounded-2xl bg-[#f5f5f7] p-5"><div className="flex flex-wrap items-start gap-3"><span className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold ${character.color}`}>{character.initials}</span><div className="min-w-0 flex-1"><h4 className="text-[12px] font-semibold text-[#1d1d1f]">{character.name}</h4><p className="mt-1 text-[8px] text-[#86868b]">{character.role}</p><p className="mt-2 text-[7px] font-semibold text-[#0071e3]">{character.sourceType}</p><div className="mt-2 flex flex-wrap gap-1">{character.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-2 py-1 text-[7px] text-[#6e6e73]">{tag}</span>)}</div></div></div><p className="mt-5 text-[9px] leading-[1.75] text-[#515154]">{character.overview}</p></div><h4 className="mt-6 text-[11px] font-semibold text-[#1d1d1f]">{characterId === "andy" ? "Complete central-character biography" : "Relationship evolution from the source"}</h4><div className="mt-3 space-y-2">{character.sections.map(([title, detail]) => <div key={title} className="rounded-2xl border border-black/8 bg-white p-4"><p className="text-[9px] font-semibold text-[#1d1d1f]">{title}</p><p className="mt-2 text-[8px] leading-[1.72] text-[#6e6e73]">{detail}</p></div>)}</div>{character.relations.length > 0 && <><h4 className="mt-7 text-[11px] font-semibold text-[#1d1d1f]">Complete relationship network</h4><div className="mt-3 grid gap-2 sm:grid-cols-2">{character.relations.map(([name, relation, detail]) => <div key={name} className="rounded-2xl border border-black/8 p-4"><p className="text-[9px] font-semibold text-[#1d1d1f]">{name}</p><p className="mt-1 text-[7px] font-semibold text-[#0071e3]">{relation}</p><p className="mt-2 text-[8px] leading-[1.7] text-[#6e6e73]">{detail}</p></div>)}</div></>}</motion.div></AnimatePresence></div>}
        {tab === "world" && <div className="max-w-5xl"><div className="grid gap-2 sm:grid-cols-2">{worldRules.map(([title, text], index) => <div key={title} className={`rounded-2xl bg-[#f5f5f7] p-4 ${index === worldRules.length - 1 ? "sm:col-span-2" : ""}`}><span className="text-[7px] font-semibold text-[#0071e3]">{String(index + 1).padStart(2, "0")}</span><h4 className="mt-2 text-[10px] font-semibold text-[#1d1d1f]">{title}</h4><p className="mt-2 text-[8px] leading-[1.72] text-[#6e6e73]">{text}</p></div>)}</div><h4 className="mt-7 text-[11px] font-semibold text-[#1d1d1f]">Part II · Core themes and universal values</h4><div className="mt-3 space-y-2">{[["The conflict and integration of personal ideals and real-world rules", "This is the central theme running through the story. Andy begins with the ideal of becoming a serious journalist and enters Runway carrying contempt and prejudice toward fashion, treating the position as a stepping-stone to her long-term goal. Reality teaches her quickly and harshly: her writing talent has no immediate use here, while the outward appearance and fashion knowledge she dismisses as shallow are the basic price of survival and respect. The cerulean-sweater incident detonates the conflict by revealing the rigorous professional logic and enormous influence behind the world she disdains. Andy chooses to adapt by changing her appearance and working attitude, and she succeeds. The story asks whether, under social and workplace pressure, a person should preserve the self and risk marginalization or accept the rules and gain conventional success, and what that choice costs in identity and intimacy. It reflects the universal identity dilemma between ‘Who am I?’ and ‘Who should I become?’"], ["Professionalism and the operation of power beneath a ‘shallow’ surface", "Through Andy’s point of view, the screenplay repeatedly challenges stereotypes about fashion. At first, the field appears to be defined by unhealthy thinness, endless criticism, and materialism. As the story deepens, that surface reveals exacting professional standards, a rigorous industrial chain, and a complicated system of power and discourse. Miranda’s extreme attention to detail, Nigel’s defense of fashion as art, and the genealogy of cerulean prove that this is not merely a world about what people wear, but a professional field of creativity, business, and cultural influence. The theme argues that any industry dismissed as glamorous or frivolous may contain depth and barriers invisible to outsiders. It also shows that taste itself is power: whoever controls the definition of beauty controls immense economic and cultural capital."]].map(([title, copy]) => <div key={title} className="rounded-2xl border border-black/8 p-4"><p className="text-[9px] font-semibold text-[#1d1d1f]">{title}</p><p className="mt-2 text-[8px] leading-[1.72] text-[#6e6e73]">{copy}</p></div>)}</div><h4 className="mt-7 text-[11px] font-semibold text-[#1d1d1f]">Part III · Core selling points and market elements</h4><div className="mt-3 grid gap-2 sm:grid-cols-2">{[["The catharsis and broad resonance of a ‘workplace Cinderella’ comeback", "The story precisely adapts the classic ugly-duckling-to-swan pattern to an intensely attractive modern workplace. Andy is ordinary, plainly dressed, and talented but profoundly out of place, allowing anyone who has entered a new career or felt lost in an unfamiliar environment to identify with her. The first half accumulates emotional pressure through repeated failure and contempt. Then, under expert guidance, she transforms into a fashion professional who commands the room and rapidly improves at work. The shift from passive to active and from humiliation to command offers substantial emotional release and psychological satisfaction. It is a highly accessible story of survival, learning, and conquest."], ["A charismatic ‘dragon lady’ antagonist and access to an elite industry", "Miranda Priestly is one of the story’s central attractions. She is not a one-dimensional villain but a complex figure combining elegance, cruelty, authority, vulnerability, and extreme professionalism. Her cutting language, sovereign presence, and unreadable interior create an antagonist audiences can both fear and admire. The dramatic tension of the mentor–servant relationship drives the narrative. At the same time, the screenplay opens a window into the internal operation of a top fashion magazine, satisfying curiosity about the glamorous industry while exposing its brutal survival rules, luxury lifestyle, and hidden professional knowledge."]].map(([title, copy]) => <div key={title} className="rounded-2xl bg-[#111318] p-4 text-white"><p className="text-[9px] font-semibold leading-4">{title}</p><p className="mt-2 text-[8px] leading-[1.72] text-white/65">{copy}</p></div>)}</div><h4 className="mt-7 text-[11px] font-semibold text-[#1d1d1f]">Part IV · Core imagery and visual symbols</h4><div className="mt-3 space-y-2">{[["Clothing · From the blue sweater to the Chanel suit", "Clothing is the story’s most important visual symbol. It is not decoration but the outward expression of identity, class, values, and inner change. Andy’s initial loose blue sweater declares her anti-fashion position and symbolizes an outsider’s plainness, vulnerability, and ignorance of the system. Miranda’s genealogy of cerulean turns that sweater into a cultural symbol of the industry’s invisible influence over individual choice. Later Chanel suits and Dolce & Gabbana heels mark Andy’s allegiance and transformation. They become the uniform and armor that admit her into the power circle, showing her mastery of new rules, greater professionalism, and growing confidence. The shift in clothing visually traces her arc from idealistic journalist to pragmatic fashion assistant."], ["Miranda’s coats and handbags", "Each morning, Miranda enters and precisely throws a designer coat and handbag onto the assistants’ desk. The repeated action is a performance and daily confirmation of power. The luxury objects, especially the Prada bag, materialize her fashion authority, while the act of throwing them openly expresses dominance and the instrumental use of subordinates. The assistants’ desk becomes an altar that absorbs her authority and mood, and the assistants must catch the offerings without question. This daily ritual builds the office hierarchy visually, reinforces Miranda as absolute monarch, and creates a stable rhythmic source of psychological pressure."], ["The telephone", "Constantly ringing office phones and cell phones are key symbols of tension and circumstance. The ringtone extends Miranda’s omnipresent authority, allowing her to invade employees’ private time and space from anywhere. For Andy, the phone represents endless tasks, commands she cannot refuse, and crises that can arrive at any moment. Whether she is fumbling between two office lines or having dinner with her father interrupted by Miranda, the phone symbolizes work’s total erosion of personal life. It embodies the fast, cold, breathless workplace and makes Andy’s gradual consumption by the job visible."]].map(([title, copy]) => <div key={title} className="rounded-2xl bg-[#eaf4ff] p-4"><p className="text-[9px] font-semibold text-[#0756a4]">{title}</p><p className="mt-2 text-[8px] leading-[1.72] text-[#3f5f78]">{copy}</p></div>)}</div></div>}
      </div>
    </section>
  );
}

function KnowledgeWorkspace({ category, detail, onDetail, tab, onTab, onCite, onUnavailable }: { category: string; detail: boolean; onDetail: (value: boolean) => void; tab: KnowledgeTab; onTab: (tab: KnowledgeTab) => void; onCite: () => void; onUnavailable: (title: string) => void }) {
  const [track, setTrack] = useState("All tracks");
  const [genre, setGenre] = useState("All genres");
  const [sort, setSort] = useState("Curated");
  const visibleWorks = useMemo(() => {
    let result = [...knowledgeWorks];
    if (track !== "All tracks") result = result.filter((work) => work.track === track);
    if (genre !== "All genres") result = result.filter((work) => work.genre === genre);
    if (sort === "Newest") result.sort((a, b) => Number(b.year) - Number(a.year));
    if (sort === "A–Z") result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [track, genre, sort]);

  if (detail) return <KnowledgeDetailView tab={tab} onTab={onTab} onBack={() => onDetail(false)} onCite={onCite} />;
  return (
    <section className="min-h-0 flex-1 overflow-y-auto bg-white p-4 sm:p-5">
      <div data-phai-transition className="flex flex-wrap items-center gap-2">
        <label className="relative"><span className="sr-only">Track</span><select value={track} onChange={(event) => setTrack(event.target.value)} className="appearance-none rounded-full border border-black/8 bg-[#f5f5f7] py-2 pl-3 pr-7 text-[8px] font-semibold text-[#515154] outline-none focus:ring-2 focus:ring-[#0071e3]"><option>All tracks</option>{["Drama", "Mystery", "Adventure", "Comedy", "Thriller", "Sci-fi"].map((value) => <option key={value}>{value}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#86868b]" /></label>
        <label className="relative"><span className="sr-only">Genre</span><select value={genre} onChange={(event) => setGenre(event.target.value)} className="appearance-none rounded-full border border-black/8 bg-[#f5f5f7] py-2 pl-3 pr-7 text-[8px] font-semibold text-[#515154] outline-none focus:ring-2 focus:ring-[#0071e3]"><option>All genres</option>{["Workplace", "Coming-of-age", "Survival", "Anthology", "Satire", "Detective", "Crime", "Class", "Fantasy"].map((value) => <option key={value}>{value}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#86868b]" /></label>
        <label className="relative"><span className="sr-only">Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="appearance-none rounded-full border border-black/8 bg-[#f5f5f7] py-2 pl-3 pr-7 text-[8px] font-semibold text-[#515154] outline-none focus:ring-2 focus:ring-[#0071e3]"><option>Curated</option><option>Newest</option><option>A–Z</option></select><ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#86868b]" /></label>
        <div className="ml-auto flex items-center gap-2 rounded-full border border-black/8 px-3 py-2 text-[8px] text-[#86868b]"><Search className="h-3 w-3" />Search 4,700+ titles</div>
      </div>
      <div data-phai-transition className="mt-4 flex items-end justify-between"><div><p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#0071e3]">Official IP library</p><h3 className="mt-1 text-lg font-semibold tracking-[-0.04em] text-[#1d1d1f]">{category} stories</h3></div><p className="text-[8px] text-[#86868b]">{visibleWorks.length} shown · structured story knowledge</p></div>
      {visibleWorks.length > 0 ? <div data-phai-transition className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{visibleWorks.map((work, index) => <button key={work.title} type="button" onClick={() => work.title === "The Devil Wears Prada" ? onDetail(true) : onUnavailable(work.title)} className="group flex min-h-28 items-start gap-3 rounded-2xl border border-black/8 bg-white p-3 text-left shadow-[0_6px_18px_rgba(0,0,0,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"><span className={`relative flex h-20 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br text-[9px] font-bold text-white shadow-sm ${work.color}`}><span className="absolute left-1 top-1 rounded bg-black/35 px-1 py-0.5 text-[5px] font-semibold">{String(index + 1).padStart(2, "0")}</span>{work.mark}</span><span className="min-w-0"><span className="block truncate text-[9px] font-semibold text-[#1d1d1f]">{work.title}</span><span className="mt-1 block text-[7px] text-[#0071e3]">{work.track} · {work.genre} · {work.year}</span><span className="mt-2 line-clamp-3 block text-[7px] leading-4 text-[#86868b]">{work.summary}</span></span></button>)}</div> : <div className="mt-16 text-center"><Library className="mx-auto h-8 w-8 text-[#d2d2d7]" /><p className="mt-3 text-[10px] font-semibold text-[#515154]">No titles match both filters.</p><button type="button" onClick={() => { setTrack("All tracks"); setGenre("All genres"); }} className="mt-3 text-[8px] font-semibold text-[#0071e3]">Reset filters</button></div>}
    </section>
  );
}

function ModelMarketplace({ selected, onSelect, compare, onCompare }: { selected: string; onSelect: (value: string) => void; compare: boolean; onCompare: () => void }) {
  return (
    <section data-phai-transition className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto bg-white px-5 py-10 text-center sm:py-14">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f3edff] text-[#7c3aed]"><Box className="h-5 w-5" /></span><h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">One workspace. Multiple model families.</h3><p className="mt-2 max-w-xl text-[10px] leading-5 text-[#86868b]">Choose a model for a direct conversation, or compare the same creative prompt side by side without leaving the protected product workspace.</p>
      <div className="mt-7 flex max-w-4xl flex-wrap justify-center gap-2">{models.map(([name, maker, mark], index) => <button key={name} type="button" onClick={() => onSelect(name)} className={`flex min-w-28 items-center gap-2 rounded-xl border p-2.5 text-left transition active:scale-[0.96] ${selected === name ? "border-[#0071e3] bg-[#eaf4ff] shadow-[0_8px_22px_rgba(0,113,227,0.12)]" : "border-black/8 bg-white hover:border-black/15"}`}><span className={`flex h-8 w-8 items-center justify-center rounded-lg text-[8px] font-bold ${index % 2 === 0 ? "bg-[#111318] text-white" : "bg-[#f5f5f7] text-[#515154]"}`}>{mark}</span><span><span className="block text-[8px] font-semibold text-[#1d1d1f]">{name}</span><span className="mt-0.5 block text-[7px] text-[#86868b]">{maker}</span></span></button>)}</div>
      <div className={`mt-8 w-full max-w-4xl rounded-[1.5rem] border border-black/8 bg-white p-4 text-left shadow-[0_18px_50px_rgba(0,0,0,0.065)] ${compare ? "grid gap-3 sm:grid-cols-2" : ""}`}>
        <div><div className="flex items-center gap-2"><span className="rounded-full bg-[#eaf4ff] px-2.5 py-1 text-[7px] font-semibold text-[#0066cc]">{selected}</span><span className="text-[7px] text-[#86868b]">Primary</span></div><p className="mt-4 text-[10px] font-medium text-[#515154]">“Give Scene 32 a visual power reversal while preserving the camera-cage clue.”</p><div className="mt-4 rounded-xl bg-[#f5f5f7] p-3 text-[8px] leading-4 text-[#6e6e73]">Recommended approach: make the suspect correct a deliberately wrong evidence label. The clue becomes an involuntary disclosure, and the detective never asks for it directly.</div></div>
        {compare && <div className="border-t border-black/8 pt-3 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0"><div className="flex items-center gap-2"><span className="rounded-full bg-[#f3edff] px-2.5 py-1 text-[7px] font-semibold text-[#7c3aed]">Claude</span><span className="text-[7px] text-[#86868b]">Comparison</span></div><p className="mt-4 text-[10px] font-medium text-[#515154]">Same prompt · same project context</p><div className="mt-4 rounded-xl bg-[#f5f5f7] p-3 text-[8px] leading-4 text-[#6e6e73]">Alternative approach: let blocking reveal the code through a repeated hand movement, then reduce dialogue to one confirmation line after the audience has already understood.</div></div>}
        <div className={`${compare ? "sm:col-span-2" : ""} mt-4 flex items-center gap-2 border-t border-black/8 pt-3`}><Paperclip className="h-3.5 w-3.5 text-[#86868b]" /><span className="text-[8px] text-[#b0b0b5]">Attach a script or type a comparison prompt</span><button type="button" onClick={onCompare} className="ml-auto rounded-full border border-black/8 px-3 py-1.5 text-[8px] font-semibold text-[#515154] active:scale-95">{compare ? "Single view" : "Compare answers"}</button><button type="button" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111318] text-white active:scale-90"><Send className="h-3 w-3" /></button></div>
      </div>
    </section>
  );
}

function SkillCenter({ filter, onFilter, search, onSearch, enabled, onToggle }: { filter: SkillFilter; onFilter: (value: SkillFilter) => void; search: string; onSearch: (value: string) => void; enabled: Record<string, boolean>; onToggle: (id: string) => void }) {
  const visible = skills.filter((skill) => (filter === "all" || skill.group === filter) && skill.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <section data-phai-transition className="min-h-0 flex-1 overflow-y-auto bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-end gap-4"><div><p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#0071e3]">Capability platform</p><h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">Skill Center</h3><p className="mt-2 text-[9px] text-[#86868b]">Built-in expertise, team workflows, and user-created Skills in one manageable surface.</p></div><div className="ml-auto flex flex-wrap items-center gap-2"><label className="flex min-h-9 items-center gap-2 rounded-full border border-black/8 px-3"><Search className="h-3.5 w-3.5 text-[#86868b]" /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search Skills" className="w-28 bg-transparent text-[8px] text-[#515154] outline-none" /></label><button type="button" className="min-h-9 rounded-full border border-black/8 px-3 text-[8px] font-semibold text-[#515154] active:scale-95">Import</button><button type="button" className="min-h-9 rounded-full bg-[#111318] px-3 text-[8px] font-semibold text-white active:scale-95">Create Skill</button></div></div>
      <div className="mt-5 flex gap-1 border-b border-black/8">{(["all", "film", "general"] as SkillFilter[]).map((id) => <button key={id} type="button" onClick={() => onFilter(id)} className={`relative px-3 py-2.5 text-[8px] font-semibold capitalize ${filter === id ? "text-[#1d1d1f]" : "text-[#a1a1a6]"}`}>{id}{filter === id && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#0071e3]" />}</button>)}</div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visible.map((skill) => { const isOn = enabled[skill.id] ?? skill.on; return <div key={skill.id} className="rounded-2xl border border-black/8 bg-white p-4 shadow-[0_7px_20px_rgba(0,0,0,0.035)]"><div className="flex items-start gap-3"><span className={`flex h-8 w-8 items-center justify-center rounded-lg ${skill.group === "film" ? "bg-[#eaf4ff] text-[#0071e3]" : "bg-[#f5f5f7] text-[#515154]"}`}>{skill.group === "film" ? <Sparkles className="h-4 w-4" /> : <Wrench className="h-4 w-4" />}</span><button type="button" aria-label={`Toggle ${skill.name}`} aria-pressed={isOn} onClick={() => onToggle(skill.id)} className={`relative ml-auto h-4 w-7 rounded-full transition-colors active:scale-95 ${isOn ? "bg-[#0071e3]" : "bg-[#d2d2d7]"}`}><span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform ${isOn ? "translate-x-3.5" : "translate-x-0.5"}`} /></button></div><h4 className="mt-4 text-[10px] font-semibold text-[#1d1d1f]">{skill.name}</h4><p className="mt-2 line-clamp-3 text-[8px] leading-4 text-[#86868b]">{skill.description}</p><div className="mt-4 flex items-center justify-between text-[7px] text-[#b0b0b5]"><span className="capitalize">{skill.group}</span><span>Built-in</span></div></div>; })}</div>
      {visible.length === 0 && <div className="py-16 text-center"><Search className="mx-auto h-7 w-7 text-[#d2d2d7]" /><p className="mt-3 text-[9px] text-[#86868b]">No Skills match this search.</p></div>}
    </section>
  );
}

function ClipboardModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(0);
  const entries = [
    ["Compare all three candidate turns before naming the Act I break.", "Just now"],
    ["The evaluation should follow real use cases, not abstract score labels.", "12 min ago"],
    ["@Three-Act Diagnosis @Official Knowledge", "1 hour ago"],
    ["Scene 32 needs a visual reversal and 30% less exposition.", "Yesterday"],
    ["Character desire / need / lie / fear / relationship state", "Yesterday"],
  ];
  return (
    <motion.div className="absolute inset-0 z-30 flex items-center justify-center bg-black/35 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.div role="dialog" aria-modal="true" aria-labelledby="clipboard-title" className="w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/96 shadow-[0_35px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl" initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 12 }} transition={{ type: "spring", bounce: 0, duration: 0.32 }}>
        <div className="flex h-12 items-center border-b border-black/8 px-4"><h3 id="clipboard-title" className="text-[11px] font-semibold text-[#1d1d1f]">Clipboard history</h3><button type="button" onClick={onClose} aria-label="Close clipboard history" className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f5f7] text-[#515154] active:scale-90"><X className="h-3.5 w-3.5" /></button></div>
        <div className="grid min-h-80 sm:grid-cols-[15rem_1fr]"><div className="border-r border-black/8 bg-[#fbfbfc] p-3"><div className="flex items-center gap-2 rounded-xl border border-black/8 bg-white px-3 py-2"><Search className="h-3 w-3 text-[#86868b]" /><span className="text-[8px] text-[#b0b0b5]">Search copied content</span></div><div className="mt-2 space-y-1">{entries.map(([text, time], index) => <button key={text} type="button" onClick={() => setSelected(index)} className={`w-full rounded-xl px-3 py-2.5 text-left ${selected === index ? "bg-[#e2e2e5]" : "hover:bg-black/[0.035]"}`}><p className="line-clamp-2 text-[8px] font-medium leading-4 text-[#515154]">{text}</p><p className="mt-1 text-[7px] text-[#a1a1a6]">{time}</p></button>)}</div></div><div className="p-5"><p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Preview</p><p className="mt-4 text-[11px] leading-6 text-[#1d1d1f]">{entries[selected][0]}</p><div className="mt-6 rounded-xl bg-[#f5f5f7] p-3 text-[8px] leading-4 text-[#86868b]">Insert this item into the current prompt, preserve its original formatting, or cite it through the @ menu.</div><button type="button" onClick={onClose} className="mt-6 inline-flex min-h-9 items-center gap-2 rounded-full bg-[#111318] px-4 text-[8px] font-semibold text-white active:scale-95"><Copy className="h-3 w-3" />Insert into prompt</button></div></div>
      </motion.div>
    </motion.div>
  );
}

export function PhaiProductSimulator() {
  const [mode, setMode] = useState<ProductMode>("chat");
  const [activeTool, setActiveTool] = useState<ProductTool>(null);
  const [clipboardOpen, setClipboardOpen] = useState(false);
  const [chatId, setChatId] = useState<ChatId>("structure");
  const [scheduleEnabled, setScheduleEnabled] = useState(true);
  const [agentView, setAgentView] = useState<AgentView>("group");
  const [selectedAgent, setSelectedAgent] = useState<AgentId>("storyboard");
  const [knowledgeCategory, setKnowledgeCategory] = useState("Premium");
  const [knowledgeDetail, setKnowledgeDetail] = useState(false);
  const [knowledgeTab, setKnowledgeTab] = useState<KnowledgeTab>("overview");
  const [selectedModel, setSelectedModel] = useState("Tongyi Qianwen");
  const [compareModels, setCompareModels] = useState(false);
  const [skillFilter, setSkillFilter] = useState<SkillFilter>("all");
  const [skillSearch, setSkillSearch] = useState("");
  const [enabledSkills, setEnabledSkills] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const targets = gsap.utils.toArray<HTMLElement>("[data-phai-transition]", rootRef.current);
    gsap.killTweensOf(targets);
    if (reduceMotion) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }
    gsap.fromTo(targets, { autoAlpha: 0, y: 9 }, { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.035, ease: "power3.out", overwrite: "auto" });
  }, { scope: rootRef, dependencies: [mode, activeTool, chatId, agentView, selectedAgent, knowledgeDetail, knowledgeTab, selectedModel, compareModels, skillFilter, reduceMotion], revertOnUpdate: true });

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setClipboardOpen(false);
        setActiveTool(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const changeMode = (nextMode: ProductMode) => {
    setActiveTool(null);
    setMode(nextMode);
  };

  const openAgent = (id: AgentId) => {
    setSelectedAgent(id);
    setAgentView("profile");
  };

  const toggleSkill = (id: string) => {
    const source = skills.find((skill) => skill.id === id);
    setEnabledSkills((current) => ({ ...current, [id]: !(current[id] ?? source?.on ?? false) }));
  };

  return (
    <div ref={rootRef} className="mt-9 [overflow-anchor:none]">
      <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_34px_100px_rgba(0,0,0,0.14)]">
        <div className="relative flex min-h-12 items-center border-b border-black/8 bg-white/82 px-3 backdrop-blur-2xl sm:px-4">
          <div className="flex items-center gap-3"><span className="hidden gap-1.5 sm:flex" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span><PanelLeft className="h-3.5 w-3.5 text-[#86868b]" /><RefreshCw className="h-3.5 w-3.5 text-[#86868b]" /><Search className="h-3.5 w-3.5 text-[#515154]" /></div>
          <button type="button" onClick={() => { setActiveTool(null); setMode("chat"); }} className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 font-serif text-sm font-semibold italic tracking-[-0.025em] text-[#1d1d1f] active:scale-95"><span>α</span><span>Alpha</span></button>
          <div className="ml-auto flex items-center gap-0.5">
            <AppButton label="Model marketplace" active={activeTool === "models"} onClick={() => setActiveTool((current) => current === "models" ? null : "models")}><Box className="h-3.5 w-3.5" /><span className="hidden xl:inline">Models</span></AppButton>
            <AppButton label="Clipboard history" active={clipboardOpen} onClick={() => setClipboardOpen(true)}><Copy className="h-3.5 w-3.5" /><span className="hidden xl:inline">Copy</span></AppButton>
            <AppButton label="Skill center" active={activeTool === "skills"} onClick={() => setActiveTool((current) => current === "skills" ? null : "skills")}><Wrench className="h-3.5 w-3.5" /><span className="hidden xl:inline">Skills</span></AppButton>
            <CircleUserRound className="ml-1 h-4 w-4 text-[#86868b]" /><Settings className="ml-2 hidden h-3.5 w-3.5 text-[#86868b] sm:block" />
          </div>
        </div>

        <div className="flex gap-1 overflow-x-auto border-b border-black/8 bg-[#fbfbfc] px-3 py-2 lg:hidden">
          {(["chat", "agents", "knowledge"] as ProductMode[]).map((id) => <button key={id} type="button" onClick={() => changeMode(id)} className={`rounded-full px-3 py-1.5 text-[8px] font-semibold capitalize ${mode === id && !activeTool ? "bg-[#111318] text-white" : "bg-[#eeeeef] text-[#6e6e73]"}`}>{id}</button>)}
        </div>

        <div className={activeTool ? "flex h-[45rem] min-h-0 overflow-hidden" : "h-[45rem] min-h-0 overflow-hidden lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)]"}>
          {activeTool === "models" ? <ModelMarketplace selected={selectedModel} onSelect={setSelectedModel} compare={compareModels} onCompare={() => setCompareModels((value) => !value)} /> : activeTool === "skills" ? <SkillCenter filter={skillFilter} onFilter={setSkillFilter} search={skillSearch} onSearch={setSkillSearch} enabled={enabledSkills} onToggle={toggleSkill} /> : <>
            <div className="hidden h-full min-h-0 grid-rows-[minmax(0,1fr)_4rem] overflow-hidden bg-[#f7f7f8] lg:grid">
              <div className="min-h-0 overflow-hidden">
                {mode === "chat" && <ChatRail chatId={chatId} onSelect={setChatId} />}
                {mode === "agents" && <AgentRail selected={selectedAgent} view={agentView} onAgent={openAgent} onGroup={() => setAgentView("group")} />}
                {mode === "knowledge" && <KnowledgeRail category={knowledgeCategory} onCategory={setKnowledgeCategory} />}
              </div>
              <div className="h-16 border-r border-t border-black/8 bg-[#f7f7f8] p-3"><ModeDock mode={mode} onChange={changeMode} /></div>
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              {mode === "chat" && <ChatWorkspace chatId={chatId} scheduleEnabled={scheduleEnabled} onToggleSchedule={() => setScheduleEnabled((value) => !value)} />}
              {mode === "agents" && <AgentWorkspace view={agentView} selected={selectedAgent} onOpenGroup={() => setAgentView("group")} />}
              {mode === "knowledge" && <KnowledgeWorkspace category={knowledgeCategory} detail={knowledgeDetail} onDetail={(value) => { setKnowledgeDetail(value); if (value) setKnowledgeTab("overview"); }} tab={knowledgeTab} onTab={setKnowledgeTab} onCite={() => setToast("Added The Devil Wears Prada to the next prompt")} onUnavailable={(title) => setToast(`${title} is listed for context; open The Devil Wears Prada for the full structured demo.`)} />}
            </div>
          </>}
        </div>

        <AnimatePresence>{clipboardOpen && <ClipboardModal onClose={() => setClipboardOpen(false)} />}</AnimatePresence>
        <AnimatePresence>{toast && <motion.div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#111318] px-4 py-2.5 text-[8px] font-semibold text-white shadow-xl" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><CheckCircle2 className="h-3.5 w-3.5 text-[#65b5ff]" />{toast}</motion.div>}</AnimatePresence>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 text-[9px] text-[#86868b]"><p>Interactive Alpha product simulation · click the three workspace modes and top-right platform tools</p><span className="inline-flex items-center gap-1.5"><LockKeyhole className="h-3 w-3" />Public-safe reconstruction · product name and mark anonymized</span></div>
      <div className="mt-6 rounded-[1.5rem] bg-[#111318] px-5 py-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-6"><p className="max-w-3xl text-sm leading-7 text-white/65">Alpha is not a single chatbot. It is a creative workbench where tasks, Agents, structured IP knowledge, reusable Skills, files, models, and schedules meet. This makes quality a system problem rather than a final-answer score.</p><span className="mt-3 inline-flex shrink-0 items-center gap-2 text-[10px] font-semibold text-[#65b5ff] sm:mt-0">Next · the quality problem <ArrowRight className="h-3.5 w-3.5" /></span></div>
    </div>
  );
}
