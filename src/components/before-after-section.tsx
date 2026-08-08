"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ChevronDown,
  FileText,
  Frown,
  Image as ImageIcon,
  IdCard,
  MapPin,
  MapPinned,
  MessageCircle,
  Upload,
} from "lucide-react";
import { GlassSurface, SectionLabel, WarmSurface } from "@/components/design-system";

type BeforeAfterSectionProps = {
  title: string;
  description: string;
};

type LegacyField =
  | {
      type: "input" | "select";
      label: string;
      value: string;
    }
  | {
      type: "map";
      label: string;
    }
  | {
      type: "upload";
      label: string;
      helper?: string;
    }
  | {
      type: "button";
      label: string;
    };

type ChatMessage =
  | {
      side: "ai" | "merchant";
      content: string;
      kind?: "text";
    }
  | {
      side: "merchant";
      content: string;
      kind: "upload" | "location";
    };

const legacyFields: LegacyField[] = [
  { type: "select", label: "Country", value: "Mexico" },
  { type: "select", label: "City", value: "Mexico City" },
  { type: "select", label: "Business Type", value: "Food & Beverage" },
  { type: "select", label: "Number of Stores", value: "1" },
  { type: "input", label: "Store Name", value: "Awei's Taqueria" },
  { type: "input", label: "Store Address", value: "13 Génova St, Mexico City" },
  { type: "map", label: "Map Location" },
  { type: "input", label: "Main Category", value: "Mexican" },
  { type: "select", label: "Offline Order Volume", value: "Please select" },
  { type: "upload", label: "Storefront Photo" },
  { type: "upload", label: "Menu Photo" },
  {
    type: "upload",
    label: "Proof of Address",
    helper: "Proof required",
  },
  { type: "button", label: "Submit for Review" },
];

const legacyHints = [
  "Tedious process",
  "No real-time pre-check",
  "Can't answer questions",
  "Scares new merchants",
];

const chatMessages: ChatMessage[] = [
  {
    side: "ai",
    content: "Hey there! Welcome aboard. Let me walk you through getting your store set up, nice and easy.",
  },
  { side: "ai", content: "To start off, what's the name of your store?" },
  { side: "merchant", content: "Awei's Taqueria" },
  { side: "ai", content: "Got it! And where is it located? Share me the address whenever you're ready." },
  { side: "merchant", content: "13 Génova St, Mexico City", kind: "location" },
  { side: "ai", content: "Nice! Could you snap a photo of your storefront so I can see the sign clearly?" },
  { side: "merchant", content: "Sent storefront photo", kind: "upload" },
  {
    side: "ai",
    content: "Great, thanks! One more photo needed: your menu, with dishes and prices visible if possible.",
  },
  { side: "merchant", content: "Sent menu photo", kind: "upload" },
  {
    side: "ai",
    content:
      "I can see everything now. Store name is Awei's Taqueria, looks like Mexican cuisine. Does that look right to you?",
  },
  { side: "merchant", content: "Correct" },
  {
    side: "ai",
    content: "Almost there! Just need a quick ID document for verification and we're good to go.",
  },
  { side: "merchant", content: "Sent ID document", kind: "upload" },
  { side: "ai", content: "You're all set! Ready for me to submit everything for review?" },
  { side: "merchant", content: "Submit for review" },
  { side: "ai", content: "Done! Your application is in. Expect an update within 1 to 3 business days." },
];

function FormFieldMock({
  field,
}: {
  field: LegacyField;
}) {
  if (field.type === "map") {
    return (
      <div className="space-y-2">
        <p className="text-xs font-medium text-[#86868b]">{field.label}</p>
        <div className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#eef4f8,#f7fafc)]">
          <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-300/70" />
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-slate-300/70" />
          <div className="absolute left-[18%] top-[28%] h-8 w-14 rounded-full border border-slate-300/60 bg-white/50" />
          <div className="absolute right-[16%] top-[18%] h-10 w-20 rounded-[1.4rem] border border-slate-300/60 bg-white/45" />
          <div className="absolute bottom-[18%] left-[28%] h-9 w-24 rounded-[1.2rem] border border-slate-300/60 bg-white/45" />
          <div className="absolute bottom-[24%] right-[22%] h-6 w-10 rounded-full border border-slate-300/60 bg-white/55" />
          <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/92 px-2 py-1 text-[11px] text-[#86868b] shadow-sm">
            <MapPin className="h-3.5 w-3.5" />
            Located
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0071e3] drop-shadow-[0_8px_18px_rgba(0, 113, 227,0.24)]">
            <MapPin className="h-7 w-7 fill-[#0071e3] stroke-white stroke-[1.5]" />
          </div>
        </div>
      </div>
    );
  }

  if (field.type === "upload") {
    return (
      <div className="space-y-2">
        <p className="text-xs font-medium text-[#86868b]">{field.label}</p>
        <div className="rounded-2xl border border-dashed border-black/10 bg-[#f5f5f7]/40 p-3">
          <div className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-3 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f7] text-[#86868b]">
              <Upload className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#515154]">Upload file</p>
              {field.helper ? (
                <p className="text-xs text-[#a1a1a6]">{field.helper}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (field.type === "button") {
    return (
      <button
        type="button"
        className="w-full rounded-2xl bg-[#0071e3] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,113,227,0.18)] transition active:scale-[0.97]"
      >
        {field.label}
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-[#86868b]">{field.label}</p>
      <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-3 py-3 text-sm text-[#515154]">
        <span className={field.value === "Please select" ? "text-[#a1a1a6]" : ""}>
          {field.value}
        </span>
        {field.type === "select" ? (
          <ChevronDown className="h-4 w-4 text-[#a1a1a6]" />
        ) : null}
      </div>
    </div>
  );
}

function UploadBubble({ content }: { content: string }) {
  const mediaType = content.includes("storefront")
    ? "storefront"
    : content.includes("menu")
      ? "menu"
      : "document";
  const imageSrc =
    mediaType === "storefront"
      ? "/store_front.png"
      : mediaType === "menu"
        ? "/menu.png"
        : "/id_card.png";
  const imageAlt =
    mediaType === "storefront"
      ? "Storefront photo"
      : mediaType === "menu"
        ? "Menu photo"
        : "ID document";

  return (
    <div className="inline-flex w-[15.5rem] overflow-hidden rounded-2xl border border-black/5 bg-white text-[#515154] shadow-[0_8px_20px_rgba(0, 0, 0,0.08)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[linear-gradient(135deg,#f5f5f7,#f5f5f7)]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain"
          sizes="248px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-white/8" />
        <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white/90 text-[#86868b] shadow-sm">
          {mediaType === "storefront" ? (
            <ImageIcon className="h-4 w-4" />
          ) : mediaType === "menu" ? (
            <FileText className="h-4 w-4" />
          ) : (
            <IdCard className="h-4 w-4" />
          )}
        </div>
        <div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-[#86868b] shadow-sm">
          {mediaType === "storefront"
            ? "Storefront photo"
            : mediaType === "menu"
              ? "Menu photo"
              : "ID document"}
        </div>
      </div>
    </div>
  );
}

function LocationBubble({ content }: { content: string }) {
  return (
    <div className="inline-flex w-[15.5rem] flex-col overflow-hidden rounded-2xl border border-black/5 bg-white text-[#515154] shadow-[0_8px_20px_rgba(0, 0, 0,0.08)]">
      <div className="relative h-28 bg-[linear-gradient(135deg,#eef4f8,#f7fafc)]">
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-300/70" />
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-slate-300/70" />
        <div className="absolute left-[18%] top-[28%] h-8 w-14 rounded-full border border-slate-300/60 bg-white/50" />
        <div className="absolute right-[16%] top-[18%] h-10 w-20 rounded-[1.4rem] border border-slate-300/60 bg-white/45" />
        <div className="absolute bottom-[18%] left-[28%] h-9 w-24 rounded-[1.2rem] border border-slate-300/60 bg-white/45" />
        <div className="absolute bottom-[24%] right-[22%] h-6 w-10 rounded-full border border-slate-300/60 bg-white/55" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0071e3] drop-shadow-[0_8px_18px_rgba(0, 113, 227,0.24)]">
          <MapPinned className="h-8 w-8 fill-[#0071e3] stroke-white stroke-[1.4]" />
        </div>
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-[#86868b] shadow-sm">
          Location shared
        </div>
      </div>
      <div className="flex items-center gap-3 px-3 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f5f5f7] text-[#86868b]">
          <MapPin className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#515154]">{content}</p>
          <p className="mt-0.5 text-xs text-[#a1a1a6]">Location message</p>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isAi = message.side === "ai";

  return (
    <motion.div
      className={`flex ${isAi ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {message.kind === "upload" ? (
        <UploadBubble content={message.content} />
      ) : message.kind === "location" ? (
        <LocationBubble content={message.content} />
      ) : (
        <div
          className={`max-w-[18rem] rounded-2xl px-4 py-3 text-sm leading-7 shadow-[0_8px_20px_rgba(0, 0, 0,0.05)] ${
            isAi
              ? "rounded-bl-md border border-black/5 bg-white text-[#515154]"
              : "rounded-br-md bg-[#0071e3] text-white"
          }`}
        >
          {message.content.split("\n").map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function LegacyFormSimulator() {
  const duplicatedFields = [...legacyFields, ...legacyFields];

  return (
    <GlassSurface className="overflow-hidden rounded-[1.9rem] p-0">
      <div className="border-b border-black/5 px-5 py-4">
        <SectionLabel>
          Before: <span className="font-semibold text-[#1d1d1f]">Traditional Form Onboarding</span>
        </SectionLabel>
      </div>

      <div className="relative h-[38rem] overflow-hidden rounded-b-[1.9rem]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white/95 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white/95 to-transparent" />

        <motion.div
          className="group absolute inset-x-0 top-0 px-5 pb-8"
          animate={{ y: ["0%", "-50%"] }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{}}
          style={{ animationPlayState: "running" }}
        >
          <div className="group-hover:[animation-play-state:paused]">
            <div className="space-y-5 pt-5">
              {duplicatedFields.map((field, index) => (
                <FormFieldMock key={`${field.label}-${index}`} field={field} />
              ))}
            </div>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 lg:inset-x-auto lg:right-4 lg:top-5 lg:bottom-auto lg:w-[12rem]">
          <div className="rounded-[1.4rem] border border-black/5 bg-white/92 p-3 shadow-[0_12px_30px_rgba(0, 0, 0,0.08)] backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f5f7] text-[#86868b]">
                <Frown className="h-4 w-4" />
              </div>
              <p className="text-xs font-medium tracking-[0.16em] text-[#86868b]">
                Poor user experience
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {legacyHints.map((hint, index) => (
                <motion.div
                  key={hint}
                  className="rounded-xl border border-black/5 bg-[#f5f5f7]/70 px-3 py-2 text-xs leading-5 text-[#6e6e73]"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.25, duration: 0.3 }}
                >
                  {hint}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GlassSurface>
  );
}

function AgentChatSimulator() {
  const [visibleCount, setVisibleCount] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const isLastMessage = visibleCount >= chatMessages.length;
    const delay = isLastMessage ? 2200 : 900;

    const timer = window.setTimeout(() => {
      setVisibleCount((current) =>
        current >= chatMessages.length ? 1 : current + 1,
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [visibleCount]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;

    const topSafeSpace = 20;
    const bottomSafeSpace = 18;
    const nextOffset = Math.max(
      0,
      content.scrollHeight - (viewport.clientHeight - topSafeSpace - bottomSafeSpace),
    );
    setOffsetY(nextOffset);
  }, [visibleCount]);

  const visibleMessages = chatMessages.slice(0, visibleCount);
  const lastMessage = visibleMessages.at(-1);
  const showTyping =
    lastMessage?.side === "merchant" && visibleCount < chatMessages.length;

  return (
    <WarmSurface className="rounded-[1.9rem] p-0">
      <div className="border-b border-black/5 px-5 py-4">
        <SectionLabel>
          After: <span className="font-semibold text-[#1d1d1f]">AI Conversational Onboarding</span>
        </SectionLabel>
      </div>

      <div
        ref={viewportRef}
        className="h-[38rem] overflow-hidden px-4 py-5"
      >
        <motion.div
          ref={contentRef}
          className="space-y-3 pt-4 pb-4"
          animate={{ y: -offsetY }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleMessages.map((message, index) => (
              <ChatBubble
                key={`${message.side}-${message.content}-${index}`}
                message={message}
              />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {showTyping ? (
              <motion.div
                key="typing"
                className="flex justify-start pb-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-2 text-xs text-[#a1a1a6]">
                  <MessageCircle className="h-3.5 w-3.5" />
                  Typing...
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </WarmSurface>
  );
}

export function BeforeAfterSection({
  title,
  description,
}: BeforeAfterSectionProps) {
  return (
    <section>
      <div className="w-full">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-semibold tracking-[0.02em] text-[#0071e3]">02</span>
          <span className="text-[13px] font-medium tracking-[0.01em] text-[#86868b]">Before / After Flow Redesign</span>
        </div>
        <h2 className="mt-2 text-[2rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[2.5rem] md:leading-[1.02]">
          {title}
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-[#6e6e73] md:text-base">
          {description}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <LegacyFormSimulator />
        <AgentChatSimulator />
      </div>
    </section>
  );
}
