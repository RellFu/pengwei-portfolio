"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowRight,
  AtSign,
  BookOpen,
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
type KnowledgeTab = "overview" | "plot" | "characters" | "world" | "scenes";
type SkillFilter = "all" | "film" | "general";

gsap.registerPlugin(useGSAP);

const chats = {
  structure: {
    group: "Today",
    title: "Pilot structure diagnosis",
    subtitle: "Three-Act Skill · 28 scenes",
    project: "Glass Harbor / Pilot v12",
    prompt: "Read the pilot and tell me where Act I really ends. Do not use page count alone—compare the candidate turns and explain the structural cost of the current version.",
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
    evidence: ["Candidate A · Scene 6 · incident only", "Candidate B · Scene 14 · revelation", "Candidate C · Scene 18 · irreversible choice"],
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
      "The detective never asks for the code. She places two evidence bags on the table and deliberately labels the wrong one ‘Locker 17.’ The suspect corrects her—‘Seventeen is the camera cage’—then realizes he has disclosed the mapping. The camera stays on his hand flattening the label, making the reversal visible before either character names it.",
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

function ClawMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12.3 20.2c-4.7 0-7.9-2.6-7.9-6.6 0-2.9 1.7-5.1 4.5-5.8-.2 1.7.3 3.1 1.6 4.1.4-4.6 3.1-7.7 7.6-8.8-.8 2.1-.5 3.8 1.2 5.1-1.7.1-3 .6-3.9 1.5 2.3-.3 4.1.4 5.4 2-1.8 0-3.1.5-4 1.5 1.7.2 2.9.9 3.8 2.2-2.4 3.2-4.9 4.8-8.3 4.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.8 15.7c1.3.8 3.2.8 4.6 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

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
    ["agents", "Agent workspace", <ClawMark key="agents" className="h-4 w-4" />],
    ["knowledge", "Knowledge library", <BookOpen key="knowledge" className="h-4 w-4" />],
  ];
  return (
    <div className="flex items-center gap-1.5">
      {items.map(([id, label, icon]) => (
        <button key={id} type="button" aria-label={label} aria-pressed={mode === id} onClick={() => onChange(id)} className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] motion-reduce:transition-none ${mode === id ? "bg-[#e2e2e5] text-[#1d1d1f] shadow-inner" : "text-[#515154] hover:bg-black/[0.05]"}`}>{icon}</button>
      ))}
      <button type="button" aria-label="Create new" className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#111318] text-white transition active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 motion-reduce:transition-none"><Plus className="h-4 w-4" /></button>
    </div>
  );
}

function ChatRail({ chatId, onSelect, mode, onMode }: { chatId: ChatId; onSelect: (id: ChatId) => void; mode: ProductMode; onMode: (mode: ProductMode) => void }) {
  return (
    <aside className="hidden min-h-0 border-r border-black/8 bg-[#f7f7f8] p-3 lg:flex lg:flex-col">
      <button type="button" className="flex min-h-10 items-center gap-2 rounded-xl bg-white px-3 text-left text-[10px] font-semibold text-[#1d1d1f] shadow-sm transition active:scale-[0.97] motion-reduce:transition-none"><Plus className="h-3.5 w-3.5" />New task</button>
      <div className="mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto pr-0.5">
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
      <div className="border-t border-black/8 pt-3"><ModeDock mode={mode} onChange={onMode} /></div>
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
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#111318] font-serif text-xs italic text-white">φ</span>
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

function AgentRail({ selected, view, onAgent, onGroup, mode, onMode }: { selected: AgentId; view: AgentView; onAgent: (id: AgentId) => void; onGroup: () => void; mode: ProductMode; onMode: (mode: ProductMode) => void }) {
  return (
    <aside className="hidden min-h-0 border-r border-black/8 bg-[#f7f7f8] p-3 lg:flex lg:flex-col">
      <p className="px-2 text-[8px] font-medium text-[#b0b0b5]">Writers’ rooms</p>
      <button type="button" onClick={onGroup} className={`mt-1 flex w-full items-center gap-2 rounded-xl px-2.5 py-2.5 text-left transition active:scale-[0.98] ${view === "group" ? "bg-[#dedee1]" : "hover:bg-black/[0.035]"}`}><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#515154] shadow-sm"><Users className="h-3.5 w-3.5" /></span><div><p className="text-[9px] font-semibold text-[#1d1d1f]">Pilot Rewrite Room</p><p className="mt-0.5 text-[7px] text-[#86868b]">3 agents · 2 tasks</p></div></button>
      <p className="mt-5 px-2 text-[8px] font-medium text-[#b0b0b5]">My agents</p>
      <div className="mt-1 min-h-0 flex-1 space-y-1 overflow-y-auto">
        {(Object.entries(agents) as [AgentId, (typeof agents)[AgentId]][]).map(([id, item]) => (
          <button key={id} type="button" onClick={() => onAgent(id)} className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2.5 text-left transition active:scale-[0.98] ${view === "profile" && selected === id ? "bg-[#dedee1]" : "hover:bg-black/[0.035]"}`}><span className={`flex h-7 w-7 items-center justify-center rounded-lg text-[7px] font-bold ${item.color}`}>{item.initials}</span><div className="min-w-0"><p className="truncate text-[9px] font-semibold text-[#1d1d1f]">{item.name}</p><p className="mt-0.5 truncate text-[7px] text-[#86868b]">{item.role}</p></div></button>
        ))}
      </div>
      <div className="border-t border-black/8 pt-3"><ModeDock mode={mode} onChange={onMode} /></div>
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
        <aside className="hidden min-h-0 bg-[#fbfbfc] p-4 lg:block"><div className="flex items-center gap-2"><ClawMark className="h-4 w-4" /><p className="text-[9px] font-semibold text-[#1d1d1f]">Agent card</p></div><div className="mt-4 rounded-2xl border border-black/8 bg-white p-4 shadow-sm"><p className="text-[8px] font-semibold text-[#1d1d1f]">Shareable configuration</p><p className="mt-2 text-[8px] leading-4 text-[#86868b]">Profile, working memory, and personal Skills travel together when this Agent is shared.</p><button type="button" className="mt-4 w-full rounded-xl bg-[#f5f5f7] py-2 text-[8px] font-semibold text-[#515154] active:scale-[0.98]">Share agent</button></div></aside>
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

function KnowledgeRail({ category, onCategory, mode, onMode }: { category: string; onCategory: (value: string) => void; mode: ProductMode; onMode: (mode: ProductMode) => void }) {
  return (
    <aside className="hidden min-h-0 border-r border-black/8 bg-[#f7f7f8] p-3 lg:flex lg:flex-col">
      <div className="grid grid-cols-2 rounded-lg bg-[#eeeeef] p-1 text-[8px] font-semibold"><button type="button" className="rounded-md bg-white py-1.5 text-[#1d1d1f] shadow-sm">Built-in</button><button type="button" disabled aria-disabled="true" title="Personal library is not included in this public demo" className="cursor-not-allowed rounded-md py-1.5 text-[#b0b0b5]">Mine</button></div>
      <div className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto pr-0.5">
        {knowledgeCategories.map(([name, count], index) => <button key={name} type="button" onClick={() => onCategory(name)} className={`flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left transition active:scale-[0.98] ${category === name ? "bg-[#dedee1]" : "hover:bg-black/[0.035]"}`}><span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-[7px] font-bold text-white ${index % 3 === 0 ? "from-[#0071e3] to-[#173d76]" : index % 3 === 1 ? "from-[#ff7a59] to-[#7f1d1d]" : "from-[#8b5cf6] to-[#312e81]"}`}>{name.slice(0, 2).toUpperCase()}</span><div><p className="text-[9px] font-semibold text-[#1d1d1f]">{name}</p><p className="mt-0.5 text-[7px] text-[#86868b]">{count} titles</p></div></button>)}
      </div>
      <div className="border-t border-black/8 pt-3"><ModeDock mode={mode} onChange={onMode} /></div>
    </aside>
  );
}

function KnowledgeDetailView({ tab, onTab, onBack, onCite }: { tab: KnowledgeTab; onTab: (tab: KnowledgeTab) => void; onBack: () => void; onCite: () => void }) {
  const tabs: [KnowledgeTab, string][] = [["overview", "Story overview"], ["plot", "Plot structure"], ["characters", "Characters"], ["world", "World"], ["scenes", "Scene content"]];
  return (
    <section className="min-h-0 flex-1 overflow-y-auto bg-white p-4 sm:p-6">
      <div data-phai-transition>
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-[8px] font-semibold text-[#6e6e73] active:scale-95"><ChevronLeft className="h-3.5 w-3.5" />Back to library</button>
        <div className="mt-4 flex items-start gap-4"><div className="flex h-20 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#ef4444] to-[#7f1d1d] text-xs font-bold text-white shadow-md">DWP</div><div className="min-w-0"><h3 className="text-xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">The Devil Wears Prada</h3><p className="mt-1 text-[9px] text-[#86868b]">United States · 2006 · Film</p><div className="mt-3 flex flex-wrap gap-1.5">{["Workplace", "Dramedy", "Positive arc", "Linear narrative"].map((tag) => <span key={tag} className="rounded-full bg-[#f5f5f7] px-2 py-1 text-[7px] text-[#6e6e73]">{tag}</span>)}</div></div><div className="ml-auto flex gap-2"><button type="button" className="hidden min-h-9 items-center gap-1.5 rounded-full border border-black/8 px-3 text-[8px] font-semibold text-[#515154] sm:flex"><Search className="h-3 w-3" />Search</button><button type="button" onClick={onCite} className="flex min-h-9 items-center gap-1.5 rounded-full bg-[#111318] px-3 text-[8px] font-semibold text-white active:scale-95"><AtSign className="h-3 w-3" />Cite</button></div></div>
        <div className="mt-5 flex gap-1 overflow-x-auto border-b border-black/8">{tabs.map(([id, label]) => <button key={id} type="button" onClick={() => onTab(id)} className={`relative shrink-0 px-3 py-2.5 text-[8px] font-semibold ${tab === id ? "text-[#1d1d1f]" : "text-[#a1a1a6]"}`}>{label}{tab === id && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#0071e3]" />}</button>)}</div>
      </div>
      <div data-phai-transition className="py-5">
        {tab === "overview" && <div className="max-w-4xl"><div className="grid gap-px overflow-hidden rounded-2xl bg-black/8 sm:grid-cols-2">{[["Subject", "Workplace · fashion media"], ["Story form", "Linear narrative"], ["Genre", "Dramedy"], ["Narrative driver", "Workplace survival under an absolute authority"]].map(([label, value]) => <div key={label} className="bg-[#f8f8f9] p-3"><p className="text-[7px] uppercase tracking-[0.1em] text-[#a1a1a6]">{label}</p><p className="mt-1.5 text-[9px] font-semibold text-[#515154]">{value}</p></div>)}</div><h4 className="mt-6 text-[11px] font-semibold text-[#1d1d1f]">Core story overview</h4><p className="mt-2 text-[10px] leading-6 text-[#515154]">Andrea “Andy” Sachs is an ambitious journalism graduate who treats fashion as a shallow detour on the way to serious reporting. To gain a career-making recommendation, she becomes second assistant to Miranda Priestly, the absolute authority at a leading fashion magazine. The job forces Andy to confront a value system she neither understands nor respects.</p><p className="mt-3 text-[10px] leading-6 text-[#515154]">A chain of escalating failures—confusing instructions, public professional humiliation, and an impossible travel request—breaks her belief that intelligence alone makes her superior to the work. When Nigel tells her that she has not truly tried, Andy chooses active adaptation. Her outward transformation marks a deeper shift from dismissive outsider to capable participant, while also beginning a conflict between professional recognition and the relationships that anchored her old life.</p><div className="mt-5 rounded-2xl bg-[#eaf4ff] p-4"><p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#0071e3]">Creative retrieval value</p><p className="mt-2 text-[9px] leading-5 text-[#3f5f78]">The structured record makes “outsider enters a rigid hierarchy,” “positive workplace arc,” and “professional mastery versus personal cost” directly searchable—without relying on wording luck inside a long synopsis.</p></div></div>}
        {tab === "plot" && <div className="max-w-4xl"><div className="grid gap-2 sm:grid-cols-2">{[["Primary", "Andy’s workplace survival challenge"], ["Secondary", "Andy’s fashion transformation"], ["Secondary", "Andy and Nate’s relationship fracture"], ["Secondary", "Miranda Priestly’s display of power"]].map(([kind, title], index) => <div key={title} className={`rounded-2xl p-4 ${index === 0 ? "bg-[#111318] text-white" : "bg-[#f5f5f7] text-[#1d1d1f]"}`}><p className={`text-[7px] font-semibold uppercase tracking-[0.12em] ${index === 0 ? "text-[#65b5ff]" : "text-[#86868b]"}`}>{kind}</p><p className="mt-2 text-[10px] font-semibold">{title}</p></div>)}</div><h4 className="mt-6 text-[11px] font-semibold text-[#1d1d1f]">Workplace survival arc</h4><div className="mt-3 space-y-2">{[["Scenes 2, 5–6", "Entry", "Andy unexpectedly wins a job she neither understands nor values."], ["Scenes 9, 11–12", "Disorientation", "Complex orders, phone pressure, and Emily’s contempt expose her lack of professional fluency."], ["Scene 16", "Professional humiliation", "The cerulean lecture destroys Andy’s assumption that the field is intellectually empty."], ["Scenes 20–22", "Impossible test", "A hurricane travel request makes failure collide with her private life."], ["Scenes 23–24", "Choice", "Nigel reframes her complaint as a refusal to try; Andy asks for help."], ["Scenes 25, 28", "New state", "She returns transformed, anticipates needs, and begins to earn recognition."]].map(([scene, phase, detail], index) => <div key={scene} className="grid gap-2 rounded-xl border border-black/8 bg-white p-3 sm:grid-cols-[5rem_6rem_1fr]"><span className="text-[7px] font-semibold text-[#0071e3]">{scene}</span><span className="text-[8px] font-semibold text-[#1d1d1f]">{phase}</span><span className="text-[8px] leading-4 text-[#6e6e73]">{detail}</span>{index < 5 && <span className="absolute" />}</div>)}</div></div>}
        {tab === "characters" && <div className="max-w-4xl"><div className="rounded-2xl bg-[#f5f5f7] p-5"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#0071e3] shadow-sm">AS</span><div><h4 className="text-[11px] font-semibold text-[#1d1d1f]">Andrea “Andy” Sachs</h4><p className="mt-1 text-[8px] text-[#86868b]">Workplace newcomer · intellectual pride · survivor under pressure · visible transformation</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{[["Surface desire", "Survive one year and earn a recommendation into serious journalism."], ["Deeper need", "Prove value in an unfamiliar field and learn genuine professionalism."], ["Core lie", "My intelligence places me above this supposedly shallow world."], ["Core fear", "Being absorbed by the system will make my original values meaningless."]].map(([label, value]) => <div key={label} className="rounded-xl bg-white p-3"><p className="text-[7px] font-semibold uppercase tracking-[0.1em] text-[#86868b]">{label}</p><p className="mt-1.5 text-[8px] leading-4 text-[#515154]">{value}</p></div>)}</div></div><h4 className="mt-6 text-[11px] font-semibold text-[#1d1d1f]">Relationship network</h4><div className="mt-3 grid gap-2 sm:grid-cols-2">{[["Miranda Priestly", "Transformer ↔ transformed", "Employer pressure evolves into professional recognition and moral warning."], ["Nigel", "Mentor ↔ protégé", "He names Andy’s self-deception and gives her the tools to change."], ["Emily", "Competitor ↔ instructor", "Contempt becomes an informal education in the system’s survival rules."], ["Nate", "Emotional anchor ↔ widening distance", "Her old life measures the personal cost of adapting to Miranda’s world."]].map(([name, relation, detail]) => <div key={name} className="rounded-xl border border-black/8 p-3"><p className="text-[9px] font-semibold text-[#1d1d1f]">{name}</p><p className="mt-1 text-[7px] font-semibold text-[#0071e3]">{relation}</p><p className="mt-2 text-[8px] leading-4 text-[#6e6e73]">{detail}</p></div>)}</div></div>}
        {tab === "world" && <div className="grid max-w-4xl gap-2 sm:grid-cols-2">{[["Physical setting", "Early-2000s Manhattan; ordinary apartments and elite magazine offices make class distance spatially visible."], ["Technology", "Phones, email, and immediate availability turn communication tools into the machinery of pressure."], ["Social hierarchy", "Miranda rules at the top; Nigel and Emily enforce the system; Andy enters as an uninitiated outsider."], ["Office politics", "Inside the magazine, Miranda’s preference functions as law; employment, access, and status depend on anticipating it."], ["Economic system", "Publishing, design, retail, and celebrity form a high-value fashion economy whose labor remains invisible to outsiders."], ["Culture and belief", "Taste, scarcity, and proximity to authority become social currency; mastery requires learning the system’s language."]].map(([title, text], index) => <div key={title} className="rounded-2xl bg-[#f5f5f7] p-4"><span className="text-[7px] font-semibold text-[#0071e3]">0{index + 1}</span><h4 className="mt-2 text-[10px] font-semibold text-[#1d1d1f]">{title}</h4><p className="mt-2 text-[8px] leading-4 text-[#6e6e73]">{text}</p></div>)}</div>}
        {tab === "scenes" && <div className="max-w-4xl"><p className="text-[10px] leading-5 text-[#6e6e73]">Scene anchors make the knowledge usable for diagnosis: an Agent can return not just a summary, but the exact stage where a relationship, belief, or plotline changes.</p><div className="mt-4 overflow-hidden rounded-2xl border border-black/8"><div className="grid grid-cols-[5.5rem_1fr_7rem] bg-[#f5f5f7] px-3 py-2 text-[7px] font-semibold uppercase tracking-[0.1em] text-[#86868b]"><span>Anchor</span><span>Story event</span><span>Field</span></div>{[["Scenes 4–6", "Miranda ignores Andy’s self-presentation yet unexpectedly hires her.", "Relationship"], ["Scene 16", "Miranda’s industry explanation exposes Andy’s intellectual prejudice.", "Character lie"], ["Scenes 20–22", "The hurricane request makes professional pressure invade family time.", "Plot escalation"], ["Scenes 23–24", "Nigel confronts Andy’s refusal to respect the work; she asks for help.", "Turning point"], ["Scenes 25, 28", "Andy returns transformed and begins anticipating Miranda’s needs.", "New state"]].map(([scene, event, field]) => <div key={scene} className="grid grid-cols-[5.5rem_1fr_7rem] border-t border-black/8 px-3 py-3"><span className="text-[7px] font-semibold text-[#0071e3]">{scene}</span><span className="pr-3 text-[8px] leading-4 text-[#515154]">{event}</span><span className="text-[7px] text-[#86868b]">{field}</span></div>)}</div></div>}
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
    <div ref={rootRef} className="mt-9">
      <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_34px_100px_rgba(0,0,0,0.14)]">
        <div className="relative flex min-h-12 items-center border-b border-black/8 bg-white/82 px-3 backdrop-blur-2xl sm:px-4">
          <div className="flex items-center gap-3"><span className="hidden gap-1.5 sm:flex" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span><PanelLeft className="h-3.5 w-3.5 text-[#86868b]" /><RefreshCw className="h-3.5 w-3.5 text-[#86868b]" /><Search className="h-3.5 w-3.5 text-[#515154]" /></div>
          <button type="button" onClick={() => { setActiveTool(null); setMode("chat"); }} className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-[10px] font-semibold text-[#515154] active:scale-95"><span className="text-[10px] text-[#86868b]">Xingyun</span><span className="text-[#d2d2d7]">/</span><span className="font-serif text-sm italic text-[#1d1d1f]">φ Phai</span></button>
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

        <div className="flex min-h-[45rem] max-h-[52rem]">
          {activeTool === "models" ? <ModelMarketplace selected={selectedModel} onSelect={setSelectedModel} compare={compareModels} onCompare={() => setCompareModels((value) => !value)} /> : activeTool === "skills" ? <SkillCenter filter={skillFilter} onFilter={setSkillFilter} search={skillSearch} onSearch={setSkillSearch} enabled={enabledSkills} onToggle={toggleSkill} /> : <>
            {mode === "chat" && <ChatRail chatId={chatId} onSelect={setChatId} mode={mode} onMode={changeMode} />}
            {mode === "agents" && <AgentRail selected={selectedAgent} view={agentView} onAgent={openAgent} onGroup={() => setAgentView("group")} mode={mode} onMode={changeMode} />}
            {mode === "knowledge" && !knowledgeDetail && <KnowledgeRail category={knowledgeCategory} onCategory={setKnowledgeCategory} mode={mode} onMode={changeMode} />}
            <div className="flex min-w-0 flex-1 flex-col">
              {mode === "chat" && <ChatWorkspace chatId={chatId} scheduleEnabled={scheduleEnabled} onToggleSchedule={() => setScheduleEnabled((value) => !value)} />}
              {mode === "agents" && <AgentWorkspace view={agentView} selected={selectedAgent} onOpenGroup={() => setAgentView("group")} />}
              {mode === "knowledge" && <KnowledgeWorkspace category={knowledgeCategory} detail={knowledgeDetail} onDetail={(value) => { setKnowledgeDetail(value); if (value) setKnowledgeTab("overview"); }} tab={knowledgeTab} onTab={setKnowledgeTab} onCite={() => setToast("Added The Devil Wears Prada to the next prompt")} onUnavailable={(title) => setToast(`${title} is listed for context; open The Devil Wears Prada for the full structured demo.`)} />}
            </div>
          </>}
        </div>

        <AnimatePresence>{clipboardOpen && <ClipboardModal onClose={() => setClipboardOpen(false)} />}</AnimatePresence>
        <AnimatePresence>{toast && <motion.div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#111318] px-4 py-2.5 text-[8px] font-semibold text-white shadow-xl" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><CheckCircle2 className="h-3.5 w-3.5 text-[#65b5ff]" />{toast}</motion.div>}</AnimatePresence>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 text-[9px] text-[#86868b]"><p>Interactive Phai product simulation · click the three workspace modes and top-right platform tools</p><span className="inline-flex items-center gap-1.5"><LockKeyhole className="h-3 w-3" />Public-safe reconstruction from product materials</span></div>
      <div className="mt-6 rounded-[1.5rem] bg-[#111318] px-5 py-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-6"><p className="max-w-3xl text-sm leading-7 text-white/65">Phai is not a single chatbot. It is a creative workbench where tasks, Agents, structured IP knowledge, reusable Skills, files, models, and schedules meet—making quality a system problem rather than a final-answer score.</p><span className="mt-3 inline-flex shrink-0 items-center gap-2 text-[10px] font-semibold text-[#65b5ff] sm:mt-0">Next · the quality problem <ArrowRight className="h-3.5 w-3.5" /></span></div>
    </div>
  );
}
