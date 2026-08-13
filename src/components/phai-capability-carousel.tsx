"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarClock,
  Check,
  ChevronRight,
  Copy,
  FileText,
  Folder,
  Globe2,
  MessageSquare,
  MousePointer2,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";

type VisualKind = "workspace" | "files" | "commands" | "research" | "skills" | "knowledge" | "agent" | "room" | "schedule" | "models" | "clipboard" | "search";

type Capability = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  visual: VisualKind;
  tone: string;
};

const capabilities: Capability[] = [
  { number: "01", eyebrow: "PROJECT WORKSPACE", title: "One project remembers the whole production.", description: "Keep scripts, research, character notes, generated documents, and every related conversation inside one persistent creative workspace.", tags: ["Persistent context", "Multiple tasks", "Local workspace"], visual: "workspace", tone: "from-[#ff8a63] to-[#d95639]" },
  { number: "02", eyebrow: "FILES & ARTIFACTS", title: "Read the source, then leave a usable artifact.", description: "Open Word, PDF, Markdown, images, tables, and project folders; generate structured documents directly back into the workspace.", tags: ["DOCX / PDF", "Markdown", "Source trace"], visual: "files", tone: "from-[#6f8cff] to-[#3442a5]" },
  { number: "03", eyebrow: "TOOLS & COMMANDS", title: "It can execute, not only answer.", description: "Phai breaks a creative request into steps, runs commands and tools, checks intermediate results, and exposes the execution trail for review.", tags: ["Command execution", "Step trace", "Validation"], visual: "commands", tone: "from-[#202124] to-[#050505]" },
  { number: "04", eyebrow: "RESEARCH", title: "Browse the outside world without losing the story.", description: "Search current sources, collect production references, compare locations, and return a linked research brief inside the same task.", tags: ["Browser", "Source ledger", "Research brief"], visual: "research", tone: "from-[#55b7c7] to-[#126579]" },
  { number: "05", eyebrow: "PROFESSIONAL SKILLS", title: "Turn expert methods into repeatable workflows.", description: "Invoke film-specific Skills for structure, project Bibles, character arcs, dialogue, storyboards, and consistency checks—with explicit inputs and output contracts.", tags: ["Built-in Skills", "Custom Skills", "@ invocation"], visual: "skills", tone: "from-[#c277ff] to-[#6435ad]" },
  { number: "06", eyebrow: "IP KNOWLEDGE", title: "Retrieve story logic—not just matching words.", description: "Search official IP knowledge by track, genre, character, relationship, world rule, plotline, or scene anchor, then cite the record into a task.", tags: ["4,700+ titles", "Structured schema", "Scene anchors"], visual: "knowledge", tone: "from-[#ed6877] to-[#8a273b]" },
  { number: "07", eyebrow: "CUSTOM AGENTS", title: "Raise a specialist for each kind of creative work.", description: "Configure an Agent’s role, temperament, memory, workspace, and Skills—for example a storyboard planner, dialogue editor, or story engineer.", tags: ["Role & memory", "Skill bundle", "Agent card"], visual: "agent", tone: "from-[#f3b34d] to-[#b66a10]" },
  { number: "08", eyebrow: "MULTI-AGENT ROOM", title: "Put specialists in the same writers’ room.", description: "Invite several Agents into a group conversation, direct them with @ mentions, and watch them negotiate blocking, dialogue, and continuity against shared files.", tags: ["Group chat", "Shared context", "Task status"], visual: "room", tone: "from-[#5f84f6] to-[#24459d]" },
  { number: "09", eyebrow: "SCHEDULED WORK", title: "Make recurring intelligence run on its own.", description: "Schedule a daily industry brief, weekly story-health review, or content patrol; keep the output, last-run state, and next trigger visible.", tags: ["Recurring tasks", "Agent routine", "Group delivery"], visual: "schedule", tone: "from-[#48a98c] to-[#17644e]" },
  { number: "10", eyebrow: "MODEL MARKETPLACE", title: "Choose the model that fits the creative decision.", description: "Use multiple approved model families inside one protected workspace and compare the same prompt side by side without buying or configuring each API.", tags: ["Model choice", "Side-by-side", "Protected workspace"], visual: "models", tone: "from-[#8c7cf4] to-[#4937a7]" },
  { number: "11", eyebrow: "CLIPBOARD", title: "Bring the useful fragment back at the right moment.", description: "Search copied passages, preview the original formatting, and insert a prior note or evaluation rule directly into the current prompt.", tags: ["Copy history", "Search", "Prompt insert"], visual: "clipboard", tone: "from-[#78aee8] to-[#23568d]" },
  { number: "12", eyebrow: "GLOBAL SEARCH", title: "Find any task, file, Skill, or decision.", description: "Search across conversations, generated artifacts, official knowledge, Skills, and Agent workspaces so long-running production work stays navigable.", tags: ["Cross-surface", "Fast recall", "Traceable context"], visual: "search", tone: "from-[#8e959e] to-[#34383e]" },
];

function AppFrame({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`h-full overflow-hidden rounded-[1.35rem] border shadow-[0_24px_60px_rgba(0,0,0,0.18)] ${dark ? "border-white/10 bg-[#171719] text-white" : "border-black/8 bg-white text-[#1d1d1f]"}`}>
      <div className={`flex h-9 items-center gap-1.5 border-b px-3 ${dark ? "border-white/10 bg-[#202023]" : "border-black/8 bg-white/90"}`}><span className="h-2 w-2 rounded-full bg-[#ff5f57]" /><span className="h-2 w-2 rounded-full bg-[#febc2e]" /><span className="h-2 w-2 rounded-full bg-[#28c840]" /><span className={`ml-auto text-[7px] font-semibold ${dark ? "text-white/35" : "text-[#a1a1a6]"}`}>φ Phai</span></div>
      {children}
    </div>
  );
}

function CapabilityVisual({ kind }: { kind: VisualKind }) {
  if (kind === "workspace") return <AppFrame><div className="grid h-[calc(100%-2.25rem)] grid-cols-[5.8rem_1fr]"><div className="border-r border-black/8 bg-[#f6f6f7] p-2"><div className="rounded-lg bg-white p-2 text-[7px] font-semibold shadow-sm">+ New task</div><p className="mt-3 text-[6px] text-[#a1a1a6]">GLASS HARBOR</p>{["Pilot diagnosis", "Project Bible", "Scene 32 rewrite"].map((item, index) => <div key={item} className={`mt-1.5 rounded-lg p-2 text-[6px] ${index === 0 ? "bg-[#dedee1] font-semibold" : "text-[#6e6e73]"}`}>{item}</div>)}</div><div className="p-3"><div className="flex items-center gap-2 text-[7px] font-semibold"><Folder className="h-3 w-3 text-[#0071e3]" />Pilot v12 <span className="ml-auto rounded-full bg-[#eaf4ff] px-2 py-1 text-[6px] text-[#0071e3]">context ready</span></div><div className="mt-4 rounded-xl bg-[#eaf4ff] p-3 text-[7px] leading-4 text-[#0066cc]">Find the real Act I turn and compare all candidate scenes.</div><div className="mt-3 space-y-2">{["Read project files", "Loaded Three-Act Skill", "Mapped 28 scenes"].map((item) => <div key={item} className="flex items-center gap-2 text-[6px] text-[#6e6e73]"><Check className="h-3 w-3 text-[#34c759]" />{item}</div>)}</div></div></div></AppFrame>;
  if (kind === "files") return <AppFrame><div className="grid h-[calc(100%-2.25rem)] grid-cols-[1fr_6.5rem]"><div className="p-3"><p className="text-[7px] font-semibold">Project Bible</p><div className="mt-3 space-y-2">{["Logline & promise", "Character system", "World rules", "Season engine"].map((item, index) => <div key={item} className="rounded-lg bg-[#f5f5f7] px-2.5 py-2"><p className="text-[6px] font-semibold">0{index + 1} · {item}</p><p className="mt-1 h-1.5 rounded-full bg-[#dedee1]" /></div>)}</div></div><div className="border-l border-black/8 bg-[#fbfbfc] p-2"><p className="text-[6px] font-semibold">FILES</p>{[["pilot-v12.md", FileText], ["notes.docx", FileText], ["references", Folder]].map(([name, Icon]) => <div key={name as string} className="mt-2 flex items-center gap-1.5 text-[5.5px] text-[#6e6e73]"><Icon className="h-3 w-3 text-[#0071e3]" />{name as string}</div>)}</div></div></AppFrame>;
  if (kind === "commands") return <AppFrame dark><div className="p-3 font-mono"><p className="text-[6px] text-white/35">story-engineer / scene-analysis</p><div className="mt-4 space-y-3">{[["$ read", "pilot-v12.md"], ["$ storymap", "extract --scenes 28"], ["$ validate", "--contract three-act"], ["✓ output", "diagnosis.md"]].map(([command, value], index) => <div key={command} className="text-[7px]"><span className={index === 3 ? "text-[#7ee787]" : "text-[#65b5ff]"}>{command}</span><span className="ml-2 text-white/65">{value}</span>{index < 3 && <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[#f3b34d] animate-pulse motion-reduce:animate-none" />}</div>)}</div><div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[6px] leading-4 text-white/55">Candidate C changes goal, relationship, available choices, and personal cost. Contract passed.</div></div></AppFrame>;
  if (kind === "research") return <AppFrame><div className="p-3"><div className="flex items-center gap-2 rounded-lg border border-black/8 px-2.5 py-2 text-[6px] text-[#86868b]"><Search className="h-3 w-3" />Shanghai locations for nine scripted environments</div><div className="mt-3 grid grid-cols-2 gap-2">{[["Studio complex", "9/9 scenes", "Best coverage"], ["Riverside street", "4/9 scenes", "Night exterior"], ["Heritage hotel", "3/9 scenes", "Period interior"], ["Transit hub", "2/9 scenes", "Permit risk"]].map(([name, coverage, note]) => <div key={name} className="rounded-xl bg-[#f5f5f7] p-2.5"><Globe2 className="h-3 w-3 text-[#0071e3]" /><p className="mt-2 text-[6px] font-semibold">{name}</p><p className="mt-1 text-[5.5px] text-[#86868b]">{coverage} · {note}</p></div>)}</div><div className="mt-3 flex items-center gap-2 text-[6px] text-[#248a3d]"><Check className="h-3 w-3" />Source-linked location brief created</div></div></AppFrame>;
  if (kind === "skills") return <AppFrame><div className="p-3"><div className="flex items-center justify-between"><p className="text-[7px] font-semibold">Skill Center</p><span className="rounded-full bg-[#111318] px-2 py-1 text-[5.5px] text-white">+ Create</span></div><div className="mt-3 grid grid-cols-2 gap-2">{[["Three-Act", "Compare turns", true], ["Project Bible", "7-part blueprint", true], ["Dialogue Pass", "Voice & subtext", true], ["Shot-list", "Blocking & coverage", false]].map(([name, detail, active]) => <div key={name as string} className="rounded-xl border border-black/8 p-2.5"><div className="flex items-center"><Sparkles className="h-3 w-3 text-[#7c3aed]" /><span className={`ml-auto h-2.5 w-4 rounded-full ${active ? "bg-[#0071e3]" : "bg-[#d2d2d7]"}`} /></div><p className="mt-2 text-[6px] font-semibold">{name as string}</p><p className="mt-1 text-[5.5px] text-[#86868b]">{detail as string}</p></div>)}</div></div></AppFrame>;
  if (kind === "knowledge") return <AppFrame><div className="p-3"><div className="flex gap-1.5">{["All tracks", "Drama", "Workplace"].map((item, index) => <span key={item} className={`rounded-full px-2 py-1 text-[5.5px] ${index === 0 ? "bg-[#111318] text-white" : "bg-[#f5f5f7] text-[#6e6e73]"}`}>{item}</span>)}</div><div className="mt-3 grid grid-cols-3 gap-2">{[["DWP", "The Devil Wears Prada"], ["SU", "Succession"], ["MM", "Mad Men"], ["BB", "Breaking Bad"], ["S", "Severance"], ["TL", "Ted Lasso"]].map(([mark, title], index) => <div key={title} className="rounded-xl border border-black/8 p-2"><div className={`flex h-12 items-center justify-center rounded-lg text-[7px] font-bold text-white ${index % 2 ? "bg-[#2f4773]" : "bg-[#a93f4c]"}`}>{mark}</div><p className="mt-1.5 truncate text-[5.5px] font-semibold">{title}</p></div>)}</div></div></AppFrame>;
  if (kind === "agent") return <AppFrame><div className="grid h-[calc(100%-2.25rem)] grid-cols-[6rem_1fr]"><div className="border-r border-black/8 bg-[#f6f6f7] p-2">{[["ST", "Storyboard"], ["DL", "Dialogue"], ["SE", "Story Engineer"]].map(([mark, name], index) => <div key={name} className={`mb-2 flex items-center gap-1.5 rounded-lg p-1.5 ${index === 0 ? "bg-white shadow-sm" : ""}`}><span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#eaf4ff] text-[5px] font-bold text-[#0071e3]">{mark}</span><span className="text-[5.5px] font-semibold">{name}</span></div>)}</div><div className="p-3"><div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf4ff] text-[7px] font-bold text-[#0071e3]">ST</span><div><p className="text-[7px] font-semibold">Storyboard Agent</p><p className="mt-1 text-[5.5px] text-[#86868b]">Visual grammar · precise · economical</p></div></div><p className="mt-4 text-[6px] leading-4 text-[#6e6e73]">Turns dramatic intention into blocking, shot priority, and production-efficient coverage.</p><p className="mt-3 text-[5.5px] font-semibold text-[#86868b]">SKILLS</p><div className="mt-1.5 flex flex-wrap gap-1">{["Shot-list", "Visual reveal", "Continuity"].map((item) => <span key={item} className="rounded-full bg-[#f5f5f7] px-2 py-1 text-[5px]">{item}</span>)}</div></div></div></AppFrame>;
  if (kind === "room") return <AppFrame><div className="grid h-[calc(100%-2.25rem)] grid-cols-[1fr_6.8rem]"><div className="p-3"><p className="text-[7px] font-semibold">Pilot Rewrite Room</p><div className="mt-3 space-y-2">{[["ST", "Make the label correction the visual reveal."], ["DL", "Then cut the detective’s explanation line."], ["SE", "Seed the hand movement again in Scene 41."]].map(([mark, text], index) => <div key={mark} className="flex gap-2"><span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[5px] font-bold ${index === 0 ? "bg-[#eaf4ff] text-[#0071e3]" : index === 1 ? "bg-[#f3edff] text-[#7c3aed]" : "bg-[#fff4dc] text-[#9a5b08]"}`}>{mark}</span><p className="rounded-xl bg-[#f5f5f7] p-2 text-[5.5px] leading-3 text-[#515154]">{text}</p></div>)}</div></div><div className="border-l border-black/8 bg-[#fbfbfc] p-2"><p className="text-[5.5px] font-semibold">MEMBERS · 3</p><div className="mt-3 flex -space-x-1">{["ST", "DL", "SE"].map((item) => <span key={item} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#eaf4ff] text-[4.5px] font-bold text-[#0071e3]">{item}</span>)}</div><p className="mt-4 text-[5.5px] font-semibold">TO DO · 2</p>{["Lock reveal", "Verify seed"].map((item, index) => <p key={item} className="mt-2 flex items-center gap-1 text-[5px] text-[#6e6e73]"><span className={`h-2.5 w-2.5 rounded-full border ${index === 0 ? "border-[#34c759] bg-[#34c759]" : "border-[#c7c7cc]"}`} />{item}</p>)}</div></div></AppFrame>;
  if (kind === "schedule") return <AppFrame><div className="p-3"><div className="flex items-center justify-between"><p className="text-[7px] font-semibold">Scheduled tasks</p><span className="rounded-full bg-[#eaf4ff] px-2 py-1 text-[5.5px] text-[#0071e3]">3 active</span></div><div className="mt-3 space-y-2">{[["Daily industry brief", "Every weekday · 09:00", "Delivered"], ["Story-health review", "Friday · 16:00", "Next in 2d"], ["Skill quality patrol", "Every day · 14:10", "3 findings"]].map(([title, time, status], index) => <div key={title} className="rounded-xl border border-black/8 p-2.5"><div className="flex items-start"><span className={`flex h-7 w-7 items-center justify-center rounded-lg ${index === 0 ? "bg-[#eaf4ff] text-[#0071e3]" : "bg-[#f5f5f7] text-[#6e6e73]"}`}><CalendarClock className="h-3.5 w-3.5" /></span><div className="ml-2"><p className="text-[6px] font-semibold">{title}</p><p className="mt-1 text-[5px] text-[#86868b]">{time}</p></div><span className="ml-auto text-[5px] font-semibold text-[#248a3d]">{status}</span></div></div>)}</div></div></AppFrame>;
  if (kind === "models") return <AppFrame><div className="p-3 text-center"><p className="text-[8px] font-semibold">Choose the model for the task</p><div className="mt-4 grid grid-cols-3 gap-2">{[["QW", "Qwen"], ["CG", "ChatGPT"], ["CL", "Claude"], ["GE", "Gemini"], ["DS", "DeepSeek"], ["DB", "Doubao"]].map(([mark, name], index) => <div key={name} className={`rounded-xl border p-2 ${index === 0 ? "border-[#0071e3] bg-[#eaf4ff]" : "border-black/8"}`}><span className={`mx-auto flex h-7 w-7 items-center justify-center rounded-lg text-[5.5px] font-bold ${index % 2 ? "bg-[#f5f5f7]" : "bg-[#111318] text-white"}`}>{mark}</span><p className="mt-1.5 text-[5.5px] font-semibold">{name}</p></div>)}</div><button type="button" className="mt-4 rounded-full bg-[#111318] px-3 py-1.5 text-[5.5px] font-semibold text-white">Compare two answers</button></div></AppFrame>;
  if (kind === "clipboard") return <AppFrame><div className="grid h-[calc(100%-2.25rem)] grid-cols-[6.5rem_1fr]"><div className="border-r border-black/8 bg-[#f6f6f7] p-2"><div className="flex items-center gap-1 rounded-lg bg-white px-2 py-1.5 text-[5px] text-[#a1a1a6]"><Search className="h-2.5 w-2.5" />Search copies</div>{["Candidate turns", "Evaluation rule", "Scene 32 note"].map((item, index) => <p key={item} className={`mt-2 rounded-lg p-2 text-[5.5px] ${index === 0 ? "bg-[#dedee1] font-semibold" : "text-[#6e6e73]"}`}>{item}</p>)}</div><div className="p-3"><p className="text-[5.5px] font-semibold uppercase tracking-[0.1em] text-[#86868b]">Preview</p><p className="mt-4 text-[7px] leading-4">Compare all candidate turns before naming the Act I break. Event count is not structural progression.</p><div className="mt-4 rounded-xl bg-[#f5f5f7] p-2 text-[5.5px] leading-3 text-[#6e6e73]">Preserve formatting · cite source · insert with @</div><span className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#111318] px-3 py-1.5 text-[5.5px] font-semibold text-white"><Copy className="h-2.5 w-2.5" />Insert</span></div></div></AppFrame>;
  return <AppFrame><div className="p-3"><div className="flex items-center gap-2 rounded-xl border-2 border-[#0071e3] bg-white px-3 py-2 text-[7px]"><Search className="h-3.5 w-3.5 text-[#0071e3]" />Scene 32 visual reveal</div><p className="mt-3 text-[5.5px] font-semibold text-[#86868b]">8 RESULTS ACROSS PHAI</p><div className="mt-2 space-y-1.5">{[[MessageSquare, "Conversation", "Pilot Rewrite Room"], [FileText, "Document", "scene-32-rewrite.md"], [Wrench, "Skill", "Shot-list Planner"], [BookOpen, "Knowledge", "Visual reversal patterns"]].map(([Icon, type, result]) => <div key={result as string} className="flex items-center gap-2 rounded-xl bg-[#f5f5f7] p-2"><span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white text-[#0071e3]"><Icon className="h-3 w-3" /></span><span><span className="block text-[5px] text-[#86868b]">{type as string}</span><span className="mt-0.5 block text-[6px] font-semibold">{result as string}</span></span><ChevronRight className="ml-auto h-3 w-3 text-[#a1a1a6]" /></div>)}</div></div></AppFrame>;
}

export function PhaiCapabilityCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, lastX: 0, lastTime: 0, velocity: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    const targets = gsap.utils.toArray<HTMLElement>("[data-capability-reveal]", sectionRef.current);
    if (reduceMotion) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }
    gsap.fromTo(targets, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out", scrollTrigger: undefined });
  }, { scope: sectionRef, dependencies: [reduceMotion], revertOnUpdate: true });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-capability-card]"));
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let distance = Number.POSITIVE_INFINITY;
        cards.forEach((card, index) => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const nextDistance = Math.abs(cardCenter - center);
          if (nextDistance < distance) { distance = nextDistance; closest = index; }
        });
        setActiveIndex(closest);
      });
    };
    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); window.cancelAnimationFrame(frame); };
  }, []);

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-capability-card]"));
    const targetIndex = Math.max(0, Math.min(cards.length - 1, index));
    const card = cards[targetIndex];
    const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { active: true, startX: event.clientX, startScroll: track.scrollLeft, lastX: event.clientX, lastTime: event.timeStamp, velocity: 0 };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragRef.current;
    const track = trackRef.current;
    if (!state.active || !track) return;
    const delta = event.clientX - state.startX;
    track.scrollLeft = state.startScroll - delta;
    const elapsed = Math.max(1, event.timeStamp - state.lastTime);
    state.velocity = (event.clientX - state.lastX) / elapsed;
    state.lastX = event.clientX;
    state.lastTime = event.timeStamp;
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragRef.current;
    if (!state.active) return;
    state.active = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const projected = activeIndex + (Math.abs(state.velocity) > 0.25 ? (state.velocity < 0 ? 1 : -1) : 0);
    scrollToCard(projected);
  };

  return (
    <section ref={sectionRef} aria-labelledby="phai-capabilities-title" className="relative w-full min-w-0 max-w-full overflow-hidden rounded-[2.5rem] bg-[#f5f5f7] py-10 shadow-[0_28px_90px_rgba(0,0,0,0.08)] sm:py-14">
      <div data-capability-reveal className="flex flex-wrap items-end gap-5 px-6 sm:px-10">
        <div className="max-w-3xl"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0071e3]">The complete product surface</p><h2 id="phai-capabilities-title" className="mt-4 text-3xl font-semibold leading-[1.03] tracking-[-0.045em] text-[#1d1d1f] sm:text-5xl">A creative Agent that meets every stage of production.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-[#6e6e73] sm:text-base sm:leading-8">Phai connects professional methods, project memory, tools, knowledge, specialist Agents, and recurring work in one place. Drag or swipe to explore the full capability map.</p></div>
        <div className="ml-auto flex items-center gap-2"><button type="button" aria-label="Previous capability" disabled={activeIndex === 0} onClick={() => scrollToCard(activeIndex - 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-white text-[#1d1d1f] shadow-sm transition active:scale-90 disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transition-none"><ArrowLeft className="h-4 w-4" /></button><button type="button" aria-label="Next capability" disabled={activeIndex === capabilities.length - 1} onClick={() => scrollToCard(activeIndex + 1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111318] text-white shadow-sm transition active:scale-90 disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transition-none"><ArrowRight className="h-4 w-4" /></button></div>
      </div>

      <div data-capability-reveal className="mt-9">
        <div ref={trackRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={finishDrag} onPointerCancel={finishDrag} className={`no-scrollbar flex w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 pt-2 select-none sm:gap-5 sm:px-10 ${dragging ? "cursor-grabbing snap-none" : "cursor-grab"}`} style={{ scrollPaddingInline: "2.5rem", touchAction: "pan-y" }}>
          {capabilities.map((capability) => (
            <article key={capability.title} data-capability-card className="w-[82vw] max-w-[27rem] shrink-0 snap-center sm:w-[25rem] lg:w-[26rem]">
              <div className={`relative h-[19rem] overflow-hidden rounded-[2rem] bg-gradient-to-br p-5 ${capability.tone}`}><div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 15%, white 0, transparent 30%), radial-gradient(circle at 85% 80%, white 0, transparent 28%)" }} /><div className="relative h-full translate-y-3"><CapabilityVisual kind={capability.visual} /></div></div>
              <div className="px-1 pb-2 pt-6"><div className="flex items-center justify-between"><p className="text-[9px] font-semibold tracking-[0.16em] text-[#86868b]">{capability.eyebrow}</p><span className="text-[10px] font-semibold text-[#b0b0b5]">{capability.number}</span></div><h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.035em] text-[#1d1d1f]">{capability.title}</h3><p className="mt-3 text-sm leading-7 text-[#6e6e73]">{capability.description}</p><div className="mt-4 flex flex-wrap gap-1.5">{capability.tags.map((tag) => <span key={tag} className="rounded-full border border-black/8 bg-white px-2.5 py-1.5 text-[9px] font-medium text-[#6e6e73]">{tag}</span>)}</div></div>
            </article>
          ))}
          <div aria-hidden="true" className="w-1 shrink-0" />
        </div>
      </div>

      <div data-capability-reveal className="mt-1 flex items-center gap-4 px-6 sm:px-10"><div className="flex items-center gap-2 text-[10px] font-semibold text-[#86868b]"><MousePointer2 className="h-3.5 w-3.5" />Drag · swipe · trackpad</div><div className="h-1 flex-1 overflow-hidden rounded-full bg-black/8"><div className="h-full rounded-full bg-[#1d1d1f] transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${((activeIndex + 1) / capabilities.length) * 100}%` }} /></div><span className="min-w-14 text-right text-[10px] font-semibold tabular-nums text-[#86868b]">{String(activeIndex + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}</span></div>
    </section>
  );
}
