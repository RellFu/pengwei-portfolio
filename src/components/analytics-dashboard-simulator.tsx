"use client";

import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { chinaProvinces } from "./china-provinces";
import { provinceIntensity } from "./china-provinces-intensity";
import {
  BarChart3,
  Bell,
  Bookmark,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleStop,
  Copy as CopyIcon,
  Filter,
  Home,
  LayoutGrid,
  ListFilter,
  Plus,
  Quote,
  Settings,
  Share2,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
  Users,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";

type BoardId = "overview" | "userProfile" | "productAnalysis" | "feedbackQuality";

gsap.registerPlugin(useGSAP);

// ----- Top nav (rendered as a horizontal tab strip below the dark project bar) -----
const topNavTabs = [
  { id: "board", label: "Dashboards" },
  { id: "metrics", label: "Metrics" },
  { id: "behavior", label: "Behavior" },
  { id: "performance", label: "Performance" },
  { id: "datasets", label: "Datasets" },
  { id: "settings", label: "Settings" },
];

// ----- Sidebar items -----
const sidebarSections = [
  {
    title: "My Dashboards",
    items: [
      { id: "overview", label: "Overview" },
      { id: "userProfile", label: "User Profile" },
      { id: "productAnalysis", label: "Product Analytics" },
      { id: "feedbackQuality", label: "Feedback & Quality" },
    ],
  },
  {
    title: "Alpha Segments",
    items: [
      { id: "h5", label: "H5 Attribution" },
      { id: "writer", label: "Producer Users" },
      { id: "screenwriter", label: "Screenwriter Users" },
      { id: "planner", label: "Planner Users" },
      { id: "director", label: "Director Users" },
      { id: "other", label: "Other Users" },
      { id: "spring", label: "New Users" },
      { id: "compare", label: "User Comparison" },
      { id: "chat", label: "Quick Chat" },
      { id: "tool", label: "Mini Tools" },
    ],
  },
  {
    title: "Segment Analytics",
    items: [
      { id: "translate", label: "Translation: User Behavior" },
      { id: "anime", label: "Anime: User Behavior" },
      { id: "headNeck", label: "Lead Writers: User Data" },
      { id: "hainateam", label: "Partner Writer Team: Usage" },
      { id: "manga", label: "Comics: User Behavior" },
      { id: "kids", label: "Kids: User Behavior" },
      { id: "funcUser", label: "Feature Usage" },
      { id: "userCompare", label: "User Comparison: Script Trials" },
      { id: "internal", label: "Series: Internal User Behavior" },
    ],
  },
];

// ----- Overview (default dashboard) -----
const overviewCards = {
  traffic: [
    {
      title: "Page Visitors",
      value: "18,640",
      unit: "users",
      dow: "-9.27%",
      dod: "-19.48%",
      isUp: false,
      series: [44, 58, 49, 72, 63, 80, 71, 88, 79, 96, 84, 100],
    },
    {
      title: "Page Views",
      value: "351,200",
      unit: "views",
      dow: "-31.74%",
      dod: "1.39%",
      isUp: true,
      series: [38, 52, 41, 66, 60, 76, 69, 82, 74, 90, 87, 96],
    },
    {
      title: "Views per Visitor",
      value: "1.9",
      unit: "views",
      dow: "-24.77%",
      dod: "25.91%",
      isUp: true,
      series: [62, 78, 71, 88, 81, 96, 84, 100, 92, 96, 88, 94],
    },
    {
      title: "Avg Session Time (per View)",
      value: "00:23:25",
      unit: "",
      dow: "13.51%",
      dod: "-11.18%",
      isUp: false,
      series: [56, 64, 58, 72, 66, 80, 74, 88, 81, 92, 86, 98],
    },
  ],
  stability: [
    {
      title: "Client Error Rate (per User)",
      value: "82.9412",
      unit: "%",
      dow: "5.17%",
      dod: "12.67%",
      isUp: false,
      series: [44, 60, 51, 76, 68, 84, 76, 92, 84, 96, 88, 100],
    },
    {
      title: "API Error Rate (per Call)",
      value: "2.1523",
      unit: "%",
      dow: "-54.01%",
      dod: "-24.18%",
      isUp: true,
      series: [38, 48, 44, 60, 56, 72, 64, 78, 72, 84, 76, 88],
    },
  ],
  conversion: [
    {
      title: "[Deprecated] Fast-Load Rate (onLoad)",
      value: "71.28",
      unit: "%",
      dow: "1.90%",
      dod: "1.23%",
      isUp: true,
      series: [56, 68, 60, 78, 70, 88, 80, 92, 86, 96, 88, 100],
    },
    {
      title: "Lag Rate (per User)",
      value: "0.0",
      unit: "%",
      dow: "0.00%",
      dod: "0.00%",
      isUp: false,
      series: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  buDist: [
    { name: "BU-A", value: 38 },
    { name: "BU-B", value: 24 },
    { name: "BU-C", value: 18 },
    { name: "BU-D", value: 12 },
    { name: "Other", value: 8 },
  ],
  roleDist: [
    { name: "Producer", value: 32 },
    { name: "Screenwriter", value: 28 },
    { name: "Planner", value: 18 },
    { name: "Director", value: 14 },
    { name: "Other", value: 8 },
  ],
};

// ----- User profile -----
const userProfileKpis = [
  { title: "Page Visitors", value: "18,640", unit: "users", date: "2026-06-05" },
  { title: "Page Views", value: "351,200", unit: "views", date: "2026-06-05" },
  { title: "New Users", value: "1,240", unit: "users", date: "2026-06-05" },
  { title: "Avg Active Session Time", value: "01:10:19", unit: "", date: "2026-06-05" },
] as const;

// Two-series daily traffic trend (12 data points, dates on x-axis)
const trafficTrend = {
  pv: [856, 913, 1004, 1124, 1356, 4572, 3437, 3380, 3464, 3512, 3208, 3512],
  uv: [67, 73, 94, 124, 168, 235, 214, 208, 231, 186, 192, 205],
  dates: ["05-30", "05-31", "06-01", "06-02", "06-03", "06-04", "06-05"],
};

const pageRankings = [
  { rank: 1, page: "/project_detail", pv: "71,852", uv: "18,141", isUp: true },
  { rank: 2, page: "/home", pv: "52,742", uv: "4,324", isUp: false },
  { rank: 3, page: "/conversation_detail", pv: "44,592", uv: "3,560", isUp: true },
  { rank: 4, page: "/pre-ai-screenwriter", pv: "22,382", uv: "1,510", isUp: true },
  { rank: 5, page: "/ai-screenwriter-yike", pv: "9,492", uv: "664", isUp: true },
  { rank: 6, page: "/ai-screenwriter-youku", pv: "7,612", uv: "2,290", isUp: false },
  { rank: 7, page: "/ai-screenwriter-youku-detail", pv: "6,648", uv: "2,141", isUp: true },
  { rank: 8, page: "/knowledge_base", pv: "5,584", uv: "1,012", isUp: false },
  { rank: 9, page: "/editor-render-performance", pv: "3,768", uv: "808", isUp: true },
  { rank: 10, page: "/project_list", pv: "3,762", uv: "894", isUp: true },
] as const;

// Heatmap: 24h (rows) x 8 days (cols)
// Columns are days in chronological order: 5/29, 5/30, 5/31, 6/1, 6/2, 6/3, 6/4, 6/5
// Each row is the 24-hour access intensity for that day (00:00 to 23:00)
// Values 0-1, mapped to rgba(0,113,227, 0.05..1) blue intensity
const heatmapData = [
  // 00:00 - all days are quiet overnight
  [0.04, 0.03, 0.04, 0.05, 0.04, 0.03, 0.02, 0.03],
  // 01:00
  [0.03, 0.02, 0.03, 0.04, 0.03, 0.02, 0.02, 0.02],
  // 02:00
  [0.02, 0.02, 0.03, 0.03, 0.03, 0.02, 0.01, 0.02],
  // 03:00
  [0.03, 0.03, 0.04, 0.04, 0.04, 0.03, 0.02, 0.03],
  // 04:00
  [0.04, 0.04, 0.05, 0.05, 0.05, 0.04, 0.03, 0.04],
  // 05:00
  [0.05, 0.05, 0.06, 0.07, 0.06, 0.05, 0.04, 0.05],
  // 06:00
  [0.08, 0.07, 0.10, 0.12, 0.10, 0.08, 0.05, 0.07],
  // 07:00
  [0.18, 0.12, 0.18, 0.22, 0.18, 0.14, 0.08, 0.12],
  // 08:00
  [0.32, 0.28, 0.34, 0.40, 0.34, 0.26, 0.16, 0.22],
  // 09:00
  [0.55, 0.46, 0.52, 0.58, 0.50, 0.42, 0.28, 0.36],
  // 10:00
  [0.78, 0.58, 0.66, 0.72, 0.64, 0.54, 0.40, 0.48],
  // 11:00
  [0.92, 0.72, 0.80, 0.84, 0.78, 0.68, 0.52, 0.62],
  // 12:00
  [0.95, 0.84, 0.86, 0.88, 0.86, 0.78, 0.62, 0.72],
  // 13:00
  [0.85, 0.78, 0.82, 0.84, 0.82, 0.74, 0.58, 0.68],
  // 14:00
  [0.95, 0.66, 0.70, 0.74, 0.72, 0.62, 0.48, 0.58],
  // 15:00
  [0.90, 0.54, 0.58, 0.60, 0.58, 0.50, 0.38, 0.46],
  // 16:00
  [0.72, 0.40, 0.42, 0.46, 0.44, 0.36, 0.28, 0.34],
  // 17:00
  [0.58, 0.30, 0.32, 0.34, 0.32, 0.26, 0.20, 0.26],
  // 18:00
  [0.42, 0.20, 0.22, 0.24, 0.22, 0.18, 0.14, 0.18],
  // 19:00
  [0.30, 0.14, 0.16, 0.18, 0.16, 0.14, 0.12, 0.14],
  // 20:00
  [0.22, 0.12, 0.13, 0.14, 0.13, 0.12, 0.10, 0.12],
  // 21:00
  [0.16, 0.10, 0.11, 0.12, 0.11, 0.10, 0.08, 0.10],
  // 22:00
  [0.10, 0.08, 0.09, 0.10, 0.09, 0.08, 0.06, 0.08],
  // 23:00
  [0.06, 0.05, 0.06, 0.07, 0.06, 0.05, 0.04, 0.06],
];
const heatmapDays = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const heatmapHours = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

const eventRankings = [
  { rank: 1, event: "DOCUMENT_COLLABORATION_C...", page: "project_detail_page", trigger: "44,786", users: "119" },
  { rank: 2, event: "DOCUMENT_COLLABORATION_C...", page: "homepage", trigger: "12,017", users: "76" },
  { rank: 3, event: "YJS_STATE_MISMATCH", page: "project_detail_page", trigger: "7,542", users: "180" },
  { rank: 4, event: "YJS_TARGET_DELTA_EMPTY", page: "project_detail_page", trigger: "7,528", users: "180" },
  { rank: 5, event: "DOCUMENT_COLLABORATION_L...", page: "conversation_detail_page", trigger: "4,176", users: "47" },
  { rank: 6, event: "YJS_STATE_MISMATCH", page: "conversation_detail_page", trigger: "3,378", users: "226" },
  { rank: 7, event: "YJS_TARGET_DELTA_EMPTY", page: "conversation_detail_page", trigger: "3,378", users: "226" },
  { rank: 8, event: "editor-render-performance", page: "project_detail_page", trigger: "2,597", users: "32" },
] as const;

const retentionRows = [
  { date: "Fri 05-29", users: 205, d1: "21.95%", d2: "55.61%", d3: "60.49%", d4: "52.20%", d5: "53.17%", d6: "43.41%" },
  { date: "Sat 05-30", users: 67, d1: "50.75%", d2: "49.25%", d3: "56.72%", d4: "49.25%", d5: "58.21%", d6: "40.30%" },
  { date: "Sun 05-31", users: 75, d1: "57.33%", d2: "54.67%", d3: "56.00%", d4: "52.00%", d5: "44.00%", d6: "" },
  { date: "Mon 06-01", users: 235, d1: "56.60%", d2: "62.34%", d3: "52.77%", d4: "44.26%", d5: "", d6: "" },
  { date: "Tue 06-02", users: 214, d1: "58.88%", d2: "58.41%", d3: "47.20%", d4: "", d5: "", d6: "" },
  { date: "Wed 06-03", users: 208, d1: "62.98%", d2: "47.12%", d3: "", d4: "", d5: "", d6: "" },
  { date: "Thu 06-04", users: 231, d1: "49.35%", d2: "", d3: "", d4: "", d5: "", d6: "" },
];

const retentionHead = ["Date", "Users", "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

// ----- Product analysis -----
const productKpis = [
  { title: "Today's DAU", value: "4,512", unit: "users", change: "32.84%", isUp: true },
  { title: "Today's Session Time", value: "00:45:05", unit: "", change: "", isUp: true },
  { title: "Cumulative Active Users", value: "63,512", unit: "users", change: "44.35%", isUp: true },
  { title: "Cumulative Avg Session Time", value: "11:54:04", unit: "", change: "47.30%", isUp: true },
];

// Daily DAU line chart (single series, multi-day)
const dailyDau = [205, 312, 297, 235, 248, 207, 198, 145, 76, 132, 195, 224, 168, 71];
const dailyAvgTs = [4680, 4521, 4426, 4603, 4500, 4418, 4312, 4335, 4485, 4617, 4526, 4438, 4611, 4245];

// Per-product module data
const moduleDau = [
  { name: "Quick Write", values: [195, 298, 256, 240, 209, 173, 169, 35, 32, 26, 33, 21] },
  { name: "New Project", values: [142, 156, 132, 156, 158, 168, 161, 174, 158, 156, 168, 162] },
];
const moduleAvgTs = [
  { name: "Quick Write", values: [4580, 4410, 4526, 4615, 4618, 4617, 4518, 4426, 4518, 4518, 4611, 4612] },
  { name: "New Project", values: [9615, 9628, 9815, 9835, 9734, 9815, 9618, 9620, 9718, 9715, 9618, 9611] },
];

const productTables = {
  writewrite: {
    title: "Quick Write",
    pageId: "project_...",
    headers: ["#", "Date", "Click/Impression Triggers (users)", "Avg Active Session Time (per User)", "Cumulative Active Time (per User)"],
    rows: [
      { date: "Sun 05-31", users: "31 users", avg: "02:46:57", long: "804:13:33" },
      { date: "Mon 06-01", users: "78 users", avg: "01:29:19", long: "110:10:17" },
      { date: "Tue 06-02", users: "73 users", avg: "01:44:22", long: "120:01:53" },
      { date: "Wed 06-03", users: "73 users", avg: "01:23:24", long: "93:08:26" },
      { date: "Thu 06-04", users: "65 users", avg: "01:43:28", long: "106:55:53" },
      { date: "Fri 06-05", users: "61 users", avg: "01:26:07", long: "83:14:52" },
      { date: "Sat 06-06", users: "38 users", avg: "01:00:01", long: "15:00:24" },
    ],
  },
  createbox: {
    title: "New Project",
    pageId: "creation_...",
    headers: ["#", "Date", "Click/Impression Triggers (users)", "Avg Active Session Time (per User)", "Cumulative Active Time (per User)"],
    rows: [
      { date: "Mon 06-01", users: "7 users", avg: "00:01:22", long: "00:05:15" },
      { date: "Tue 06-02", users: "3 users", avg: "00:05:59", long: "00:11:59" },
      { date: "Wed 06-03", users: "3 users", avg: "00:07:13", long: "00:21:41" },
      { date: "Thu 06-04", users: "10 users", avg: "00:08:16", long: "01:06:14" },
      { date: "Fri 06-05", users: "9 users", avg: "00:04:01", long: "00:32:11" },
    ],
  },
  knowledge: {
    title: "Knowledge Base",
    pageId: "kb_...",
    headers: ["#", "Date", "Click/Impression Triggers (users)", "Avg Active Session Time (per User)"],
    rows: [
      { date: "Mon 10-20", users: "15 users", avg: "00:25:14" },
      { date: "Tue 10-21", users: "30 users", avg: "00:14:56" },
      { date: "Wed 10-22", users: "22 users", avg: "00:13:34" },
      { date: "Thu 10-23", users: "22 users", avg: "00:13:29" },
      { date: "Fri 10-24", users: "16 users", avg: "00:16:31" },
      { date: "Sat 10-25", users: "2 users", avg: "00:13:33" },
      { date: "Mon 10-27", users: "20 users", avg: "00:18:49" },
    ],
  },
  evaluate: {
    title: "Performance Review",
    pageId: "review_...",
    headers: ["#", "Date", "Click/Impression Triggers (users)", "Avg Active Session Time (per User)"],
    rows: [
      { date: "Sun 05-31", users: "24 users", avg: "02:32:10" },
      { date: "Mon 06-01", users: "54 users", avg: "01:15:57" },
      { date: "Tue 06-02", users: "57 users", avg: "01:14:51" },
      { date: "Wed 06-03", users: "49 users", avg: "01:30:36" },
      { date: "Thu 06-04", users: "50 users", avg: "01:40:37" },
      { date: "Fri 06-05", users: "42 users", avg: "01:46:54" },
      { date: "Sat 06-06", users: "10 users", avg: "01:08:37" },
    ],
  },
  minitool: {
    title: "Mini Tools",
    pageId: "tool_...",
    headers: ["#", "Date", "Click/Impression Triggers (users)", "Avg Active Session Time (per User)"],
    rows: [
      { date: "Sun 05-31", users: "26 users", avg: "01:18:01" },
      { date: "Mon 06-01", users: "17 users", avg: "00:58:26" },
      { date: "Tue 06-02", users: "15 users", avg: "00:49:21" },
      { date: "Wed 06-03", users: "15 users", avg: "00:42:18" },
      { date: "Thu 06-04", users: "24 users", avg: "01:08:13" },
      { date: "Fri 06-05", users: "13 users", avg: "00:38:14" },
    ],
  },
};

// Per-user ranking table
const userRankings = [
  { name: "Alex Chen", time: "04:42:13" },
  { name: "Morgan Reed", time: "03:13:21" },
  { name: "Jordan Liu", time: "02:19:42" },
  { name: "Taylor Gao", time: "01:44:08" },
  { name: "Casey Song", time: "01:36:07" },
  { name: "Avery Fang", time: "01:33:37" },
  { name: "Drew Liu", time: "01:32:58" },
  { name: "Skylar Hu", time: "01:20:48" },
  { name: "Jamie Li", time: "01:15:11" },
  { name: "Hayden Chen", time: "01:09:41" },
] as const;

// Retention analysis heatmap (different shape)
const retentionAnalysisData = [
  [0.58, 0.52, 0.55, 0.51, 0.44, 0.18, 0.10],
  [0.54, 0.50, 0.52, 0.43, 0.07, 0.03, 0.02],
  [0.57, 0.58, 0.46, 0.07, 0.02, 0.01, 0.005],
  [0.64, 0.48, 0.07, 0.02, 0.01, 0.005, 0],
  [0.48, 0.12, 0.05, 0.01, 0.005, 0, 0],
  [0.12, 0.05, 0.02, 0.005, 0, 0, 0],
];
const retentionAnalysisHead = ["Date", "Users", "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
const retentionAnalysisRows = [
  { date: "Fri 05-31", users: "72" },
  { date: "Mon 06-01", users: "205" },
  { date: "Tue 06-02", users: "183" },
  { date: "Wed 06-03", users: "178" },
  { date: "Thu 06-04", users: "203" },
  { date: "Fri 06-05", users: "163" },
];

// ----- Feedback & Quality -----
const feedbackKpis = [
  { title: "Positive Feedback Rate", value: "48.6", unit: "%", change: "+4.2% vs last week", isUp: true },
  { title: "Negative Feedback Rate", value: "7.8", unit: "%", change: "-1.3% vs last week", isUp: true },
  { title: "Feedback-Engaged Runs", value: "3,842", unit: "", change: "+12.6% vs last week", isUp: true },
  { title: "Users Giving Feedback", value: "1,126", unit: "", change: "+8.4% vs last week", isUp: true },
] as const;

const feedbackTrendDates = ["05-24", "05-25", "05-26", "05-27", "05-28", "05-29", "05-30", "05-31", "06-01", "06-02", "06-03", "06-04", "06-05", "06-06"];
const feedbackTrendPositive = [42.1, 43.0, 44.2, 43.8, 45.1, 44.6, 45.8, 46.3, 46.0, 47.2, 47.8, 48.1, 48.3, 48.6];
const feedbackTrendNegative = [9.8, 9.3, 9.0, 8.9, 8.4, 8.6, 8.2, 8.0, 8.4, 7.9, 7.6, 7.7, 7.8, 7.8];

const positiveSignals = [
  { name: "Like", value: 1284 },
  { name: "Copy", value: 5932 },
  { name: "Reference", value: 1476 },
  { name: "Save to Memory", value: 612 },
  { name: "Share", value: 344 },
];

const negativeSignals = [
  { name: "Dislike", value: 428 },
  { name: "Stop Generating", value: 219 },
];

const copyKpis = [
  { title: "Total Copy Events", value: "5,932" },
  { title: "Users Who Copied", value: "1,018" },
  { title: "Copy Rate", value: "31.4%" },
];

const copyByEntryPoint = [
  { name: "Message Action Bar", value: 1750, pct: "29.5%" },
  { name: "Selection Toolbar", value: 1320, pct: "22.3%" },
  { name: "Group Message", value: 840, pct: "14.2%" },
  { name: "Code Block", value: 522, pct: "8.8%" },
  { name: "Keyboard Shortcut", value: 620, pct: "10.5%" },
  { name: "File Preview: View Mode", value: 510, pct: "8.6%" },
  { name: "File Preview: Edit Mode", value: 370, pct: "6.2%" },
];

const referenceKpis = [
  { title: "Total References", value: "1,476" },
  { title: "Users Referencing", value: "486" },
  { title: "Reference Rate", value: "9.7%" },
];

const referenceBySource = [
  { name: "Whole Message", value: 932, pct: "63.1%" },
  { name: "Selected Passage", value: 544, pct: "36.9%" },
];

const negativeFeedbackCards = [
  { name: "Dislike", value: "428", unit: "events", note: "5.1% of eligible runs", trend: [11.2, 10.6, 10.1, 9.8, 9.4, 8.9, 8.5, 8.1, 7.8, 7.4, 6.9, 6.4, 5.8, 5.1] },
  { name: "Stop Generating", value: "219", unit: "events", note: "2.7% of eligible runs", trend: [4.6, 4.3, 4.1, 3.9, 3.8, 3.6, 3.4, 3.3, 3.1, 3.0, 2.9, 2.8, 2.7, 2.7] },
];

const feedbackByModule = [
  { module: "Quick Write", positive: 56.8, negative: 5.4 },
  { module: "New Project", positive: 51.2, negative: 6.1 },
  { module: "Knowledge Base", positive: 47.5, negative: 4.8 },
  { module: "Performance Review", positive: 38.9, negative: 10.7 },
  { module: "Mini Tools", positive: 44.6, negative: 7.2 },
];

// ----- Helpers -----
function Sparkline({
  values,
  color = "#a8b0bd",
  height = 24,
}: {
  values: number[];
  color?: string;
  height?: number;
}) {
  if (values.length < 2) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);
  const stepX = 100 / (values.length - 1);
  const points = values
    .map((value, index) => {
      const x = index * stepX;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  const last = values[values.length - 1];
  const lastX = (values.length - 1) * stepX;
  const lastY = height - ((last - min) / range) * (height - 4) - 2;
  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      className="h-6 w-full"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.45"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={lastX} cy={lastY} r="1.6" fill={color} />
    </svg>
  );
}

function MultiLineChart({
  series,
  dates,
  height = 168,
}: {
  series: { name: string; values: number[]; color: string }[];
  dates: string[];
  height?: number;
}) {
  const width = 600;
  const padding = { top: 16, right: 16, bottom: 28, left: 36 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const allValues = series.flatMap((s) => s.values);
  const max = Math.max(...allValues, 1);
  const min = 0;
  const stepX = innerW / (series[0].values.length - 1);
  const ySteps = 5;
  const yLines = Array.from({ length: ySteps + 1 }, (_, i) => {
    const v = min + ((max - min) * i) / ySteps;
    return v;
  });

  function point(seriesIdx: number, valueIdx: number) {
    const v = series[seriesIdx].values[valueIdx];
    const x = padding.left + valueIdx * stepX;
    const y = padding.top + innerH - ((v - min) / (max - min)) * innerH;
    return { x, y, v };
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="h-44 w-full" aria-label="Trend chart">
      {yLines.map((v, i) => {
        const y = padding.top + innerH - ((v - min) / (max - min)) * innerH;
        return (
          <g key={`y-${i}`}>
            <line x1={padding.left} x2={padding.left + innerW} y1={y} y2={y} stroke="#eef0f3" strokeWidth="1" />
            <text x={padding.left - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#86868b">{Math.round(v)}</text>
          </g>
        );
      })}
      {dates.map((d, i) => (
        <text key={`d-${i}`} x={padding.left + i * stepX} y={padding.top + innerH + 16} textAnchor="middle" fontSize="9" fill="#86868b">{d}</text>
      ))}
      {series.map((s, si) => {
        const path = s.values.map((_, vi) => `${vi === 0 ? "M" : "L"} ${point(si, vi).x} ${point(si, vi).y}`).join(" ");
        return (
          <g key={s.name}>
            <path d={path} fill="none" stroke={s.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            {s.values.map((_, vi) => (
              <circle key={`pt-${si}-${vi}`} cx={point(si, vi).x} cy={point(si, vi).y} r="2.2" fill="#fff" stroke={s.color} strokeWidth="1.4" />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function HeatmapGrid({ rows, cols, data }: { rows: string[]; cols: string[]; data: number[][] }) {
  return (
    <div>
      {data.map((row, ri) => (
        <div key={`row-${ri}`} className="mt-0.5 flex items-center justify-center">
          <div className="flex w-14 shrink-0 items-center justify-end pr-2 text-[8px] text-[#86868b]">{rows[ri]}</div>
          <div className="flex items-center justify-start gap-1">
            {row.map((v, ci) => {
              const intensity = Math.min(1, Math.max(0, v));
              return (
                <div
                  key={`cell-${ri}-${ci}`}
                  className="h-4 w-4 shrink-0 rounded-sm"
                  style={{
                    background: `rgba(0,113,227,${0.05 + intensity * 0.95})`,
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
      <div className="mt-0.5 flex items-center justify-center">
        <div className="w-14 shrink-0" />
        <div className="flex items-center justify-start gap-1">
          {cols.map((c, ci) => (
            <div key={`col-${ci}`} className="w-4 text-center text-[8px] font-medium text-[#86868b]">{c}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniChinaMap() {
  // Highlighted cities with intensity (used for halo radius + opacity).
  // Coords are province centroids measured via DOM getBBox() against the china.svg viewBox 0 0 774.04 569.65.
  const cityPoints = [
    { cx: 542, cy: 247, intensity: 0.98 },
    { cx: 609, cy: 387, intensity: 0.96 },
    { cx: 504, cy: 505, intensity: 0.94 },
    { cx: 144, cy: 215, intensity: 0.1 },
    { cx: 481, cy: 149, intensity: 0.25 },
  ];

  // Color ramp: provinces fill ramps from very light blue at intensity 0 to deep blue at 1.
  // Use inverted-quadratic curve so low intensities (Xinjiang/Tibet) stay light and
  // high intensities (Beijing/Shanghai/Guangdong) stay saturated.
  const fillFor = (i: number) => {
    const a = 1 - Math.pow(1 - i, 2);
    return `rgba(0,113,227,${(0.07 + a * 0.91).toFixed(3)})`;
  };
  const strokeFor = (i: number) =>
    `rgba(0,53,160,${(0.25 + i * 0.55).toFixed(3)})`;

  return (
    <div className="relative h-44 w-full">
      <svg
        viewBox="0 0 774.04 569.65"
        className="h-full w-full"
        aria-label="China visitor geo distribution"
      >
        {chinaProvinces.map((p) => {
          const intensity = provinceIntensity[p.id] ?? 0.3;
          return (
            <path
              key={p.id}
              d={p.d}
              fill={fillFor(intensity)}
              stroke={strokeFor(intensity)}
              strokeWidth={0.5}
              strokeLinejoin="round"
            />
          );
        })}
        {cityPoints.map((p, i) => (
          <g key={`city-${i}`}>
            <circle
              cx={p.cx}
              cy={p.cy}
              r={3 + p.intensity * 4}
              fill={`rgba(0,113,227,${0.3 + p.intensity * 0.5})`}
            />
            <circle cx={p.cx} cy={p.cy} r="1.5" fill="#0071e3" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function Donut({ data, total }: { data: { name: string; value: number }[]; total: number }) {
  const radius = 38;
  const stroke = 12;
  const cx = 50;
  const cy = 50;
  const segments = useMemo(() => {
    const colors = ["#0071e3", "#5ac8fa", "#34c759", "#ff9500", "#af52de"];
    return data.reduce<{ name: string; value: number; dash: number; gap: number; offset: number; color: string }[]>((acc, slice, i) => {
      const dash = (slice.value / total) * 2 * Math.PI * radius;
      const gap = 2 * Math.PI * radius - dash;
      const offset = acc.length === 0 ? 0 : -(acc[acc.length - 1].offset + acc[acc.length - 1].dash);
      acc.push({ name: slice.name, value: slice.value, dash, gap, offset, color: colors[i % colors.length] });
      return acc;
    }, []);
  }, [data, total]);
  return (
    <svg viewBox="0 0 100 100" className="h-32 w-32" aria-label="Donut chart">
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f5f5f7" strokeWidth={stroke} />
      {segments.map((seg) => (
        <circle
          key={seg.name}
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={seg.color}
          strokeWidth={stroke}
          strokeDasharray={`${seg.dash} ${seg.gap}`}
          strokeDashoffset={seg.offset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      ))}
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize="10" fill="#86868b">Users</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="12" fontWeight="600" fill="#1d1d1f">{total}</text>
    </svg>
  );
}

function RankedBars({
  items,
  color = "#0071e3",
}: {
  items: { name: string; value: number; sub?: string }[];
  color?: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div key={item.name}>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-[#515154]">{item.name}</span>
            <span className="font-semibold tabular-nums text-[#1d1d1f]">
              {item.value.toLocaleString()}
              {item.sub && <span className="ml-1.5 font-normal text-[#86868b]">{item.sub}</span>}
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#f0f0f2]">
            <div
              className="h-full rounded-full"
              style={{ width: `${(item.value / max) * 100}%`, background: color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SplitBar({
  segments,
}: {
  segments: { name: string; value: number; pct: string; color: string }[];
}) {
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#f0f0f2]">
        {segments.map((s) => (
          <div key={s.name} style={{ width: s.pct, background: s.color }} />
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px]">
        {segments.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: s.color }} />
            <span className="text-[#515154]">{s.name}</span>
            <span className="font-semibold tabular-nums text-[#1d1d1f]">{s.pct}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Annotation({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 flex items-start gap-1.5 text-[10px] italic text-[#86868b]">
      <Quote className="mt-0.5 h-3 w-3 shrink-0 text-[#b0b0b5]" />
      <span>{children}</span>
    </p>
  );
}

function StatCard({
  title,
  value,
  unit,
  date = "2026-06-05",
  dow,
  dod,
  isUp,
  series,
}: {
  title: string;
  value: string;
  unit: string;
  date?: string;
  dow: string;
  dod: string;
  isUp: boolean;
  series: number[];
}) {
  return (
    <div data-board-item className="rounded-xl border border-black/8 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-[#1d1d1f]">{title}</p>
          <p className="mt-0.5 text-[10px] text-[#86868b]">{date}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-[#a8b0bd]">
          <Star className="h-3 w-3" />
          <ChevronDown className="h-3 w-3" />
          <span className="text-[10px]">&hellip;</span>
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums tracking-[-0.04em] text-[#1d1d1f]">
        {value}
        {unit && <span className="ml-1 text-[11px] font-medium text-[#86868b]">{unit}</span>}
      </p>
      <div className="mt-2">
        <Sparkline
          values={series}
          color={isUp ? "#34c759" : "#ff3b30"}
        />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px]">
        <span className="text-[#86868b]">Last Wk</span>
        <span className="text-right text-[#86868b]">Yest</span>
        <span className={`whitespace-nowrap tabular-nums font-semibold ${isUp ? "text-[#207a4b]" : "text-[#b3251f]"}`}>{dow}</span>
        <span className={`whitespace-nowrap tabular-nums text-right font-semibold ${isUp ? "text-[#207a4b]" : "text-[#b3251f]"}`}>{dod}</span>
      </div>
    </div>
  );
}

function SectionCard({ title, icon: Icon, children, action }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-black/8 bg-white">
      <div className="flex items-center justify-between border-b border-black/8 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-[#86868b]" />
          <p className="text-[11px] font-semibold text-[#1d1d1f]">{title}</p>
        </div>
        <div className="flex items-center gap-1.5 text-[#a8b0bd]">
          <Star className="h-3 w-3" />
          <ChevronDown className="h-3 w-3" />
          <span className="text-[10px]">&hellip;</span>
          {action}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function CardHeader({ title, date, badge }: { title: string; date?: string; badge?: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <div className="flex items-center gap-2">
        <p className="text-[11px] font-semibold text-[#1d1d1f]">{title}</p>
        {badge && <span className="rounded bg-[#f5f5f7] px-1.5 py-0.5 text-[8px] font-medium text-[#515154]">{badge}</span>}
      </div>
      {date && <p className="text-[10px] text-[#86868b]">{date}</p>}
    </div>
  );
}

// ----- View: Overview -----
function OverviewView() {
  return (
    <div className="space-y-4 p-4 sm:p-5">
      <div data-board-item className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {overviewCards.traffic.map((c) => (
          <StatCard key={c.title} {...c} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <SectionCard title="Stability" icon={BarChart3}>
          <div className="grid gap-3 sm:grid-cols-2">
            {overviewCards.stability.map((c) => (
              <StatCard key={c.title} {...c} />
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Conversion" icon={ListFilter}>
          <div className="grid gap-3 sm:grid-cols-2">
            {overviewCards.conversion.map((c) => (
              <StatCard key={c.title} {...c} />
            ))}
          </div>
        </SectionCard>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="BU Distribution" icon={LayoutGrid}>
          <div className="flex items-center gap-4">
            <Donut data={[...overviewCards.buDist]} total={100} />
            <div className="flex-1 space-y-1.5">
              {overviewCards.buDist.map((b, i) => (
                <div key={b.name} className="flex items-center gap-2 text-[10px]">
                  <span className="h-2 w-2 rounded-sm" style={{ background: ["#0071e3", "#5ac8fa", "#34c759", "#ff9500", "#af52de"][i % 5] }} />
                  <span className="flex-1 text-[#515154]">{b.name}</span>
                  <span className="font-semibold tabular-nums text-[#1d1d1f]">{b.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Role Distribution" icon={Users}>
          <div className="flex items-center gap-4">
            <Donut data={[...overviewCards.roleDist]} total={100} />
            <div className="flex-1 space-y-1.5">
              {overviewCards.roleDist.map((b, i) => (
                <div key={b.name} className="flex items-center gap-2 text-[10px]">
                  <span className="h-2 w-2 rounded-sm" style={{ background: ["#0071e3", "#5ac8fa", "#34c759", "#ff9500", "#af52de"][i % 5] }} />
                  <span className="flex-1 text-[#515154]">{b.name}</span>
                  <span className="font-semibold tabular-nums text-[#1d1d1f]">{b.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ----- View: User Profile -----
function UserProfileView() {
  return (
    <div className="space-y-4 p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {userProfileKpis.map((k) => (
          <div key={k.title} data-board-item className="rounded-xl border border-black/8 bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[#1d1d1f]">{k.title}</p>
                <p className="mt-0.5 text-[10px] text-[#86868b]">{k.date}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1 text-[#a8b0bd]">
                <Star className="h-3 w-3" />
                <ChevronDown className="h-3 w-3" />
                <span className="text-[10px]">&hellip;</span>
              </div>
            </div>
            <p className="mt-3 text-2xl font-semibold tabular-nums tracking-[-0.04em] text-[#1d1d1f]">
              {k.value}
              {k.unit && <span className="ml-1 text-[11px] font-medium text-[#86868b]">{k.unit}</span>}
            </p>
          </div>
        ))}
      </div>

      <div data-board-item className="rounded-xl border border-black/8 bg-white">
        <CardHeader title="Traffic Trend" date="2026-06-05" />
        <div className="p-4">
          <div className="flex items-center gap-4 text-[10px] text-[#515154]">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#0071e3]" /> Page Visitors</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#34c759]" /> Page Views</span>
          </div>
          <div className="mt-3">
            <MultiLineChart
              dates={trafficTrend.dates}
              series={[
                { name: "pv", values: trafficTrend.pv, color: "#34c759" },
                { name: "uv", values: trafficTrend.uv, color: "#0071e3" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr_1fr]">
        <div data-board-item className="rounded-xl border border-black/8 bg-white">
          <CardHeader title="Top 10 Pages" />
          <div className="px-4 pb-4">
            {pageRankings.map((row) => (
              <div key={row.page} className="flex items-center gap-2 border-b border-black/[0.04] py-2 last:border-b-0">
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${row.rank <= 3 ? "bg-[#0071e3] text-white" : "bg-[#f0f0f2] text-[#515154]"}`}>{row.rank}</span>
                <div className="min-w-0 flex-1 truncate">
                  <p className="truncate text-[10px] font-medium text-[#1d1d1f]">{row.page}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[10px] font-semibold tabular-nums text-[#1d1d1f]">{row.pv} <span className="font-normal text-[#86868b]">pv</span></p>
                  <p className="text-[9px] tabular-nums text-[#86868b]">{row.uv} <span className="text-[#b0b0b5]">uv</span></p>
                </div>
                <span className={`shrink-0 text-[10px] ${row.isUp ? "text-[#207a4b]" : "text-[#b3251f]"}`}>{row.isUp ? "\u2191" : "\u2193"}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-board-item className="rounded-xl border border-black/8 bg-white">
          <CardHeader title="Hourly Traffic" badge="Excludes Defaults" />
          <div className="p-4">
            <HeatmapGrid rows={heatmapHours} cols={heatmapDays} data={heatmapData} />
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[9px] text-[#86868b]">
              <span>Low</span>
              <span className="h-2 w-3" style={{ background: "rgba(0,113,227,0.1)" }} />
              <span className="h-2 w-3" style={{ background: "rgba(0,113,227,0.35)" }} />
              <span className="h-2 w-3" style={{ background: "rgba(0,113,227,0.6)" }} />
              <span className="h-2 w-3" style={{ background: "rgba(0,113,227,0.85)" }} />
              <span className="h-2 w-3" style={{ background: "rgba(0,113,227,1)" }} />
              <span>High</span>
            </div>
          </div>
        </div>

        <div data-board-item className="rounded-xl border border-black/8 bg-white">
          <CardHeader title="Top 10 Events" />
          <div className="px-4 pb-4">
            {eventRankings.map((row) => (
              <div key={row.rank} className="border-b border-black/[0.04] py-2 last:border-b-0">
                <div className="flex items-start gap-2">
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${row.rank <= 3 ? "bg-[#0071e3] text-white" : "bg-[#f0f0f2] text-[#515154]"}`}>{row.rank}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold tracking-[0.02em] text-[#1d1d1f]">{row.event}</p>
                    <p className="mt-0.5 truncate text-[9px] text-[#86868b]">{row.page}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[9px] leading-4 text-[#86868b]">Custom Event Triggers (count)</p>
                    <p className="text-[11px] font-semibold tabular-nums text-[#1d1d1f] underline decoration-[#86868b]/40 decoration-dotted underline-offset-2">{row.trigger}</p>
                  </div>
                </div>
                <div className="mt-1 flex items-baseline justify-end gap-1">
                  <span className="text-[9px] text-[#86868b]">Custom Event Triggers (users)</span>
                  <span className="text-[10px] font-semibold tabular-nums text-[#1d1d1f]">{row.users}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div data-board-item className="rounded-xl border border-black/8 bg-white">
          <CardHeader title="Visitor Map" />
          <div className="px-4 pb-4">
            <MiniChinaMap />
            <div className="mt-3 grid grid-cols-3 gap-2 text-[9px] text-[#515154]">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#0071e3]/20" /> Low</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#0071e3]/45" /> Low-mid</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#0071e3]/70" /> Mid</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#0071e3]" /> Mid-high</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#0071e3]" /> High</span>
            </div>
          </div>
        </div>

        <div data-board-item className="rounded-xl border border-black/8 bg-white">
          <CardHeader title="Retention" />
          <div className="overflow-x-auto px-4 pb-4">
            <table className="w-full min-w-[36rem] text-left">
              <thead>
                <tr className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#86868b]">
                  {retentionHead.map((h) => (
                    <th key={h} className="py-2 pr-2 text-center first:text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {retentionRows.map((row) => (
                  <tr key={row.date} className="border-t border-black/[0.04] text-[10px]">
                    <td className="py-2 pr-2 text-[#1d1d1f]">{row.date}</td>
                    <td className="py-2 pr-2 text-center tabular-nums text-[#515154]">{row.users}</td>
                    {([row.d1, row.d2, row.d3, row.d4, row.d5, row.d6] as string[]).map((v, vi) => {
                      const num = parseFloat(v);
                      const intensity = isNaN(num) ? 0 : num / 100;
                      const empty = v === "" || isNaN(num);
                      return (
                        <td key={vi} className="py-1 pr-1 text-center">
                          {empty ? (
                            <span className="block w-full py-1 text-center text-[10px] text-[#c7c7cc]">-</span>
                          ) : (
                            <span
                              className="mx-auto flex w-full items-center justify-center rounded px-1 py-1 text-[10px] font-semibold tabular-nums"
                              style={{
                                background: `rgba(0,113,227,${0.1 + intensity * 0.85})`,
                                color: num > 60 ? "#ffffff" : "#0058b8",
                              }}
                            >
                              {v}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----- View: Product Analysis -----
function ProductAnalysisView() {
  return (
    <div className="space-y-4 p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {productKpis.map((k) => (
          <div key={k.title} data-board-item className="rounded-xl border border-black/8 bg-white p-4">
            <p className="text-[11px] font-semibold text-[#1d1d1f]">{k.title}</p>
            <p className="mt-0.5 text-[10px] text-[#86868b]">2026-06-06</p>
            <p className="mt-3 text-2xl font-semibold tabular-nums tracking-[-0.04em] text-[#1d1d1f]">
              {k.value}
              {k.unit && <span className="ml-1 text-[11px] font-medium text-[#86868b]">{k.unit}</span>}
            </p>
            {k.change && (
              <div className="mt-2 flex items-center gap-2 text-[10px]">
                <span className="text-[#86868b]">vs Last Week</span>
                <span className={k.isUp ? "font-semibold text-[#207a4b]" : "font-semibold text-[#b3251f]"}>{k.change}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div data-board-item className="rounded-xl border border-black/8 bg-white">
          <CardHeader title="Daily DAU" date="2026-06-06" />
          <div className="px-4 pb-4">
            <div className="flex items-center gap-3 text-[10px] text-[#515154]">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#0071e3]" /> Click/Impression Triggers (users)</span>
            </div>
            <div className="mt-3">
              <MultiLineChart dates={["05-24", "05-25", "05-26", "05-27", "05-28", "05-29", "05-30", "05-31", "06-01", "06-02", "06-03", "06-04", "06-05", "06-06"]} series={[{ name: "DAU", values: dailyDau, color: "#0071e3" }]} />
            </div>
          </div>
        </div>
        <div data-board-item className="rounded-xl border border-black/8 bg-white">
          <CardHeader title="Avg Daily Session Time" date="2026-06-06" />
          <div className="px-4 pb-4">
            <div className="flex items-center gap-3 text-[10px] text-[#515154]">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#0071e3]" /> Avg Active Session Time (per User)</span>
            </div>
            <div className="mt-3">
              <MultiLineChart dates={["05-24", "05-25", "05-26", "05-27", "05-28", "05-29", "05-30", "05-31", "06-01", "06-02", "06-03", "06-04", "06-05", "06-06"]} series={[{ name: "TS", values: dailyAvgTs, color: "#0071e3" }]} />
            </div>
          </div>
        </div>
      </div>

      <div data-board-item className="rounded-xl border border-black/8 bg-white">
        <div className="flex items-center justify-between border-b border-black/8 px-4 py-2.5">
          <p className="text-[11px] font-semibold text-[#1d1d1f]">Product Modules (Single Day)</p>
          <div className="flex items-center gap-3 text-[10px] text-[#515154]">
            <span className="rounded border border-black/8 bg-white px-2 py-1">Page ID: project_...</span>
            <ChevronDown className="h-3 w-3 text-[#b0b0b5]" />
          </div>
        </div>
        <div className="grid gap-4 p-4 lg:grid-cols-2">
          {moduleDau.map((m) => (
            <div key={`dau-${m.name}`} className="rounded-lg border border-black/8 bg-[#fbfbfc]">
              <div className="flex items-center justify-between border-b border-black/[0.05] px-3 py-2">
                <p className="text-[11px] font-semibold text-[#1d1d1f]">{m.name} DAU</p>
                <span className="text-[9px] text-[#86868b]">Click/Impression Triggers (users)</span>
              </div>
              <div className="px-3 py-3">
                <MultiLineChart dates={["05-24", "05-25", "05-26", "05-27", "05-28", "05-29", "05-30", "05-31", "06-01", "06-02", "06-03", "06-04"]} series={[{ name: m.name, values: m.values, color: "#0071e3" }]} />
              </div>
            </div>
          ))}
          {moduleAvgTs.map((m) => (
            <div key={`ts-${m.name}`} className="rounded-lg border border-black/8 bg-[#fbfbfc]">
              <div className="flex items-center justify-between border-b border-black/[0.05] px-3 py-2">
                <p className="text-[11px] font-semibold text-[#1d1d1f]">{m.name} Avg Session Time</p>
                <span className="text-[9px] text-[#86868b]">Avg Active Session Time (per User)</span>
              </div>
              <div className="px-3 py-3">
                <MultiLineChart dates={["05-24", "05-25", "05-26", "05-27", "05-28", "05-29", "05-30", "05-31", "06-01", "06-02", "06-03", "06-04"]} series={[{ name: m.name, values: m.values, color: "#0071e3" }]} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ProductTable data={productTables.writewrite} />
        <ProductTable data={productTables.createbox} />
        <ProductTable data={productTables.knowledge} />
        <ProductTable data={productTables.evaluate} />
        <ProductTable data={productTables.minitool} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div data-board-item className="rounded-xl border border-black/8 bg-white">
          <CardHeader title="Mini Tools Avg Daily Session Time" />
          <div className="px-4 pb-3">
            <div className="flex items-center gap-3 text-[10px] text-[#515154]">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#0071e3]" /> Avg Active Session Time (per User)</span>
            </div>
            <div className="mt-3">
              <MultiLineChart dates={["05-25", "05-26", "05-27", "05-28", "05-29", "05-30", "05-31", "06-01", "06-02", "06-03", "06-04", "06-05", "06-06"]} series={[{ name: "ts", values: [4380, 4426, 4515, 4618, 4617, 4526, 4438, 4518, 4426, 4526, 4518, 4526, 4426], color: "#0071e3" }]} />
            </div>
          </div>
        </div>
        <div data-board-item className="rounded-xl border border-black/8 bg-white">
          <CardHeader title="Mini Tools DAU" />
          <div className="px-4 pb-3">
            <div className="flex items-center gap-3 text-[10px] text-[#515154]">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#0071e3]" /> Click/Impression Triggers (users)</span>
            </div>
            <div className="mt-3">
              <MultiLineChart dates={["05-25", "05-26", "05-27", "05-28", "05-29", "05-30", "05-31", "06-01", "06-02", "06-03", "06-04", "06-05", "06-06"]} series={[{ name: "dau", values: [16, 17, 14, 19, 13, 16, 14, 19, 17, 19, 14, 19, 24], color: "#0071e3" }]} />
            </div>
          </div>
        </div>
      </div>

      <div data-board-item className="rounded-xl border border-black/8 bg-white">
        <div className="flex items-center justify-between border-b border-black/8 px-4 py-2.5">
          <p className="text-[11px] font-semibold text-[#1d1d1f]">Product Modules (Multi-Day)</p>
          <div className="flex items-center gap-3 text-[10px] text-[#515154]">
            <span className="rounded border border-black/8 bg-white px-2 py-1">Page ID: project_...</span>
            <ChevronDown className="h-3 w-3 text-[#b0b0b5]" />
          </div>
        </div>
        <div className="grid gap-3 p-4 lg:grid-cols-3">
          <ProductSimpleTable data={productTables.evaluate} title="Performance Review" rows={1} />
          <ProductSimpleTable data={productTables.writewrite} title="Quick Write" rows={1} />
          <ProductSimpleTable data={productTables.knowledge} title="Knowledge Base" rows={1} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div data-board-item className="rounded-xl border border-black/8 bg-white">
          <CardHeader title="Daily User Leaderboard" />
          <div className="px-4 pb-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#86868b]">
                  <th className="py-2 pr-2 text-center">#</th>
                  <th className="py-2 pr-2">Date</th>
                  <th className="py-2 pr-2">Username</th>
                  <th className="py-2 pr-2 text-right">Avg Active Session Time (per User)</th>
                </tr>
              </thead>
              <tbody>
                {userRankings.map((u, idx) => (
                  <tr key={`${u.name}-${idx}`} className="border-t border-black/[0.04] text-[10px]">
                    <td className="py-2 pr-2 text-center text-[#515154]">{idx + 1}</td>
                    <td className="py-2 pr-2 text-[#1d1d1f]">Sat 06-06</td>
                    <td className="py-2 pr-2">
                      <span className="text-[#1d1d1f]">{u.name}</span>
                    </td>
                    <td className="py-2 pr-2 text-right tabular-nums text-[#1d1d1f]">{u.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div data-board-item className="rounded-xl border border-black/8 bg-white">
          <CardHeader title="Retention Analysis" />
          <div className="overflow-x-auto px-4 pb-4">
            <table className="w-full min-w-[36rem] text-left">
              <thead>
                <tr className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#86868b]">
                  {retentionAnalysisHead.map((h) => (
                    <th key={h} className="py-2 pr-2 text-center first:text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {retentionAnalysisRows.map((row, ri) => (
                  <tr key={row.date + ri} className="border-t border-black/[0.04] text-[10px]">
                    <td className="py-2 pr-2 text-[#1d1d1f]">{row.date}</td>
                    <td className="py-2 pr-2 text-center tabular-nums text-[#515154]">{row.users}</td>
                    {retentionAnalysisData[ri].map((v, vi) => {
                      return (
                        <td key={`cell-${ri}-${vi}`} className="py-1 pr-1 text-center">
                          <span
                            className="mx-auto flex w-full items-center justify-center rounded px-1 py-1 text-[10px] font-semibold tabular-nums"
                            style={{
                              background: `rgba(0,113,227,${0.08 + v * 0.9})`,
                              color: v > 0.5 ? "#ffffff" : "#0058b8",
                            }}
                          >
                            {(v * 100).toFixed(2)}%
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----- View: Feedback & Quality -----
function FeedbackQualityView() {
  const copyMax = Math.max(...copyByEntryPoint.map((c) => c.value));
  return (
    <div className="space-y-4 p-4 sm:p-5">
      {/* 1. Feedback Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {feedbackKpis.map((k) => (
          <div key={k.title} data-board-item className="rounded-xl border border-black/8 bg-white p-4">
            <p className="text-[11px] font-semibold text-[#1d1d1f]">{k.title}</p>
            <p className="mt-0.5 text-[10px] text-[#86868b]">2026-06-06</p>
            <p className="mt-3 text-2xl font-semibold tabular-nums tracking-[-0.04em] text-[#1d1d1f]">
              {k.value}
              {k.unit && <span className="ml-1 text-[11px] font-medium text-[#86868b]">{k.unit}</span>}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px]">
              <span className={`font-semibold ${k.isUp ? "text-[#207a4b]" : "text-[#b3251f]"}`}>{k.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div data-board-item className="rounded-xl border border-black/8 bg-white">
        <CardHeader title="Feedback Trend" date="2026-06-06" />
        <div className="px-4 pb-4">
          <div className="flex items-center gap-4 text-[10px] text-[#515154]">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#0071e3]" /> Positive Feedback Rate</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#ff9500]" /> Negative Feedback Rate</span>
          </div>
          <div className="mt-3">
            <MultiLineChart
              dates={feedbackTrendDates}
              series={[
                { name: "positive", values: feedbackTrendPositive, color: "#0071e3" },
                { name: "negative", values: feedbackTrendNegative, color: "#ff9500" },
              ]}
            />
          </div>
          <p className="mt-2 text-[9px] text-[#86868b]">Positive Feedback Rate = share of eligible Agent runs with at least one positive signal. Negative Feedback Rate = share with at least one negative signal.</p>
        </div>
      </div>

      {/* 2. Signal Breakdown */}
      <SectionCard title="Behavioral Signal Breakdown" icon={Sparkles}>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold text-[#207a4b]">
              <ThumbsUp className="h-3 w-3" /> Positive Signals
            </p>
            <RankedBars items={positiveSignals} color="#0071e3" />
          </div>
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold text-[#b3251f]">
              <ThumbsDown className="h-3 w-3" /> Negative Signals
            </p>
            <RankedBars items={negativeSignals} color="#ff9500" />
          </div>
        </div>
      </SectionCard>

      {/* 3. Copy Analysis */}
      <div data-board-item className="rounded-xl border border-black/8 bg-white">
        <div className="flex items-center justify-between border-b border-black/8 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <CopyIcon className="h-3.5 w-3.5 text-[#86868b]" />
            <div>
              <p className="text-[11px] font-semibold text-[#1d1d1f]">Copy Analysis</p>
              <p className="text-[9px] text-[#86868b]">Where users reuse Agent-generated content</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {copyKpis.map((k) => (
              <div key={k.title} className="rounded-lg border border-black/8 bg-[#fbfbfc] p-3">
                <p className="text-[10px] text-[#86868b]">{k.title}</p>
                <p className="mt-1.5 text-lg font-semibold tabular-nums text-[#1d1d1f]">{k.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[10px] font-semibold text-[#1d1d1f]">Copy by Entry Point</p>
          <div className="mt-2.5">
            <RankedBars items={copyByEntryPoint.map((c) => ({ name: c.name, value: c.value, sub: c.pct }))} color="#0071e3" />
          </div>
          <Annotation>One event, seven sources. Same behavior (message_copy.click), different entry point.</Annotation>
        </div>
      </div>

      {/* 4. Reference Analysis */}
      <div data-board-item className="rounded-xl border border-black/8 bg-white">
        <div className="flex items-center justify-between border-b border-black/8 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Bookmark className="h-3.5 w-3.5 text-[#86868b]" />
            <div>
              <p className="text-[11px] font-semibold text-[#1d1d1f]">Reference Analysis</p>
              <p className="text-[9px] text-[#86868b]">How users carry Agent output into the next interaction</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {referenceKpis.map((k) => (
              <div key={k.title} className="rounded-lg border border-black/8 bg-[#fbfbfc] p-3">
                <p className="text-[10px] text-[#86868b]">{k.title}</p>
                <p className="mt-1.5 text-lg font-semibold tabular-nums text-[#1d1d1f]">{k.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[10px] font-semibold text-[#1d1d1f]">By Entry Point</p>
          <div className="mt-2.5">
            <SplitBar
              segments={referenceBySource.map((r, i) => ({ ...r, color: i === 0 ? "#0071e3" : "#5ac8fa" }))}
            />
          </div>
          <Annotation>Whole-message references indicate reuse of a complete response, while selected-passage references indicate more targeted reuse.</Annotation>
        </div>
      </div>

      {/* 5. Negative Feedback */}
      <SectionCard title="Negative Feedback" icon={CircleStop}>
        <div className="grid gap-4 sm:grid-cols-2">
          {negativeFeedbackCards.map((c) => (
            <div key={c.name} className="rounded-lg border border-black/8 bg-[#fbfbfc] p-3">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1d1d1f]">
                  {c.name === "Dislike" ? <ThumbsDown className="h-3 w-3 text-[#b3251f]" /> : <CircleStop className="h-3 w-3 text-[#b3251f]" />}
                  {c.name}
                </p>
              </div>
              <p className="mt-2 text-xl font-semibold tabular-nums text-[#1d1d1f]">
                {c.value} <span className="text-[10px] font-medium text-[#86868b]">{c.unit}</span>
              </p>
              <p className="text-[10px] text-[#86868b]">{c.note}</p>
              <div className="mt-2">
                <Sparkline values={c.trend} color="#ff3b30" />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 6. Feedback by Product Module */}
      <div data-board-item className="rounded-xl border border-black/8 bg-white">
        <CardHeader title="Feedback by Product Module" />
        <div className="px-4 pb-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#86868b]">
                <th className="py-2 pr-2">Module</th>
                <th className="py-2 pr-2 text-right">Positive Rate</th>
                <th className="py-2 pr-2 text-right">Negative Rate</th>
              </tr>
            </thead>
            <tbody>
              {feedbackByModule.map((row) => {
                const flagged = row.module === "Performance Review";
                return (
                  <tr
                    key={row.module}
                    className={`border-t border-black/[0.04] text-[10px] ${flagged ? "bg-[#fff9f0]" : ""}`}
                  >
                    <td className="py-2 pr-2 text-[#1d1d1f]">{row.module}</td>
                    <td className="py-2 pr-2 text-right tabular-nums text-[#207a4b]">{row.positive.toFixed(1)}%</td>
                    <td className={`py-2 pr-2 text-right tabular-nums ${flagged ? "font-semibold text-[#b3251f]" : "text-[#b3251f]"}`}>{row.negative.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProductTable({ data }: { data: { title: string; pageId: string; headers: string[]; rows: Record<string, string>[] } }) {
  return (
    <div data-board-item className="rounded-xl border border-black/8 bg-white">
      <div className="flex items-center justify-between border-b border-black/8 px-4 py-2.5">
        <p className="text-[11px] font-semibold text-[#1d1d1f]">{data.title}</p>
        <div className="flex items-center gap-3 text-[10px] text-[#515154]">
          <span className="rounded border border-black/8 bg-white px-2 py-1">Page ID: {data.pageId}</span>
          <ChevronDown className="h-3 w-3 text-[#b0b0b5]" />
        </div>
      </div>
      <div className="overflow-x-auto px-4 pb-3">
        <table className="w-full min-w-[24rem] text-left">
          <thead>
            <tr className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#86868b]">
              <th className="py-2 pr-2 text-center">#</th>
              {data.headers.slice(1).map((h) => (
                <th key={h} className="py-2 pr-2 text-right">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, idx) => (
              <tr key={idx} className="border-t border-black/[0.04] text-[10px]">
                <td className="py-2 pr-2 text-center text-[#515154]">{idx + 1}</td>
                {Object.entries(row).map(([k, v]) => (
                  <td key={k} className="py-2 pr-2 text-right tabular-nums text-[#1d1d1f]">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 flex items-center justify-between text-[10px] text-[#86868b]">
          <span>10 per page</span>
          <span>Total: {data.rows.length}</span>
          <div className="flex items-center gap-1">
            <button className="rounded border border-black/8 bg-white px-2 py-0.5 text-[10px]">&lt; Previous</button>
            <button className="rounded bg-[#0071e3] px-2 py-0.5 text-[10px] text-white">1</button>
            <button className="rounded border border-black/8 bg-white px-2 py-0.5 text-[10px]">Next &gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSimpleTable({ data, title, rows }: { data: { title: string; pageId: string; headers: string[]; rows: Record<string, string>[] }; title: string; rows: number }) {
  const slice = data.rows.slice(0, rows);
  return (
    <div className="rounded-lg border border-black/8 bg-[#fbfbfc]">
      <div className="flex items-center justify-between border-b border-black/[0.05] px-3 py-2">
        <p className="text-[11px] font-semibold text-[#1d1d1f]">{title}</p>
      </div>
      <div className="px-3 py-3">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#86868b]">
              <th className="py-2 pr-2 text-center">#</th>
              {data.headers.slice(1).slice(0, 2).map((h) => (
                <th key={h} className="py-2 pr-2 text-right">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((row, idx) => (
              <tr key={idx} className="border-t border-black/[0.04] text-[10px]">
                <td className="py-2 pr-2 text-center text-[#515154]">{idx + 1}</td>
                {Object.entries(row).slice(0, 2).map(([k, v]) => (
                  <td key={k} className="py-2 pr-2 text-right tabular-nums text-[#1d1d1f]">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----- Sidebar -----
function Sidebar({
  view,
  setView,
  collapsed,
  setCollapsed,
}: {
  view: BoardId;
  setView: (v: BoardId) => void;
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}) {
  return (
    <aside className={`hidden shrink-0 border-r border-black/8 bg-[#f7f7f8] transition-[width] duration-200 lg:flex lg:flex-col ${collapsed ? "w-[3.5rem]" : "w-[14rem]"}`}>
      <div className="flex items-center justify-between border-b border-black/8 px-3 py-2">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-[#1d1d1f]">Alpha Dashboard</p>
        )}
        <button
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto flex h-6 w-6 items-center justify-center rounded text-[#86868b] hover:bg-black/[0.04]"
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sidebarSections.map((section) => (
          <div key={section.title} className="mb-3">
            {!collapsed && (
              <p className="px-2 pb-1 pt-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#86868b]">{section.title}</p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isMainBoard = item.id === "overview" || item.id === "userProfile" || item.id === "productAnalysis" || item.id === "feedbackQuality";
                const isActive = view === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (item.id === "overview" || item.id === "userProfile" || item.id === "productAnalysis" || item.id === "feedbackQuality") {
                        setView(item.id);
                      }
                    }}
                    aria-pressed={isActive}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[10px] transition active:scale-[0.98] motion-reduce:transition-none ${
                      isActive
                        ? "bg-[#0071e3]/10 text-[#0071e3]"
                        : isMainBoard
                          ? "text-[#1d1d1f] hover:bg-black/[0.04]"
                          : "text-[#6e6e73] hover:bg-black/[0.03]"
                    } ${!isMainBoard ? "cursor-default" : "cursor-pointer"} ${item.id === "overview" ? "font-semibold" : ""}`}
                    disabled={!isMainBoard}
                  >
                    {item.id === "overview" ? (
                      <Home className="h-3 w-3 shrink-0" />
                    ) : (
                      <LayoutGrid className="h-3 w-3 shrink-0" />
                    )}
                    {! collapsed && (
                      <>
                        <span className="flex-1 truncate">{item.label}</span>
                        {(item as { badge?: string }).badge && <span className="shrink-0 rounded bg-[#f5f5f7] px-1 py-0.5 text-[8px] font-medium text-[#515154]">{(item as { badge?: string }).badge}</span>}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {!collapsed && (
        <div className="flex shrink-0 items-center gap-2 border-t border-black/8 px-3 py-2">
          <button type="button" className="flex items-center gap-1 rounded px-2 py-1 text-[10px] text-[#0071e3] hover:bg-[#0071e3]/8">
            <Plus className="h-3 w-3" /> New Dashboard
          </button>
          <button type="button" className="flex items-center gap-1 rounded px-2 py-1 text-[10px] text-[#0071e3] hover:bg-[#0071e3]/8">
            <Settings className="h-3 w-3" /> Edit Folders
          </button>
        </div>
      )}
    </aside>
  );
}

// ----- TopBar (translucent) -----
function TopBar() {
  return (
    <div className="flex h-10 items-center gap-3 border-b border-black/[0.06] bg-white/75 px-6 backdrop-blur-md text-[#6e6e73]">
      <div className="ml-auto flex items-center gap-3">
        <Plus className="h-3.5 w-3.5" />
        <Calendar className="h-3.5 w-3.5" />
        <Bell className="h-3.5 w-3.5" />
        <Settings className="h-3.5 w-3.5" />
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f5f5f7] text-[9px] font-semibold text-[#1d1d1f]">PW</span>
        <span className="ml-1 rounded bg-[#0071e3] px-1.5 py-0.5 text-[9px] font-semibold text-white">Alpha</span>
      </div>
    </div>
  );
}

// ----- NavTabs (light) -----
function NavTabs({ setView }: { setView: (v: BoardId) => void }) {
  return (
    <div className="flex items-center gap-1 border-b border-black/8 bg-white px-3 py-1.5">
      {topNavTabs.map((tab) => {
        const isActive = tab.id === "board";
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              if (tab.id === "board") setView("overview");
            }}
            className={`relative flex items-center px-2.5 py-1.5 text-[11px] transition active:scale-[0.97] motion-reduce:transition-none ${isActive ? "font-semibold text-[#1d1d1f]" : "font-medium text-[#515154] hover:text-[#1d1d1f]"}`}
          >
            <span>{tab.label}</span>
            {isActive && <span className="absolute inset-x-2 -bottom-1.5 h-0.5 rounded-full bg-[#0071e3]" />}
          </button>
        );
      })}
    </div>
  );
}

// ----- Main -----
export function AnalyticsDashboardSimulator() {
  const [view, setView] = useState<BoardId>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-board-item]", rootRef.current);
      if (reduceMotion) {
        gsap.set(targets, { clearProps: "all" });
        return;
      }
      gsap.killTweensOf(targets);
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.03, ease: "power3.out", overwrite: "auto" },
      );
    },
    { scope: rootRef, dependencies: [view, reduceMotion], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className="mt-9">
      <div
        className="flex h-[760px] max-h-[calc(100vh-3rem)] min-h-[560px] flex-col overflow-hidden rounded-[2rem] border border-black/10 bg-[#f5f5f7] shadow-[0_34px_100px_rgba(0,0,0,0.13)]"
        style={{ containerType: "inline-size" }}
      >
        <TopBar />
        <NavTabs setView={setView} />
        <div className="flex min-h-0 flex-1 bg-white">
          <Sidebar view={view} setView={setView} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
          <main
            className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d2d2d7] hover:[&::-webkit-scrollbar-thumb]:bg-[#b0b0b5]"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#d2d2d7 transparent" }}
          >
            <div className="flex items-center justify-between border-b border-black/8 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-semibold text-[#1d1d1f]">
                  {view === "overview" && "Dashboards \u00b7 Overview"}
                  {view === "userProfile" && "User Profile"}
                  {view === "productAnalysis" && "Product Analytics"}
                  {view === "feedbackQuality" && "Feedback & Quality"}
                </p>
                <span className="text-[#d2d2d7]">/</span>
                <p className="text-[10px] text-[#86868b]">
                  {view === "overview" && "Traffic, stability, and conversion at a glance"}
                  {view === "userProfile" && "Behavior, retention, and geographic distribution"}
                  {view === "productAnalysis" && "DAU, session time, and rankings by module"}
                  {view === "feedbackQuality" && "Behavioral signals on Agent output quality"}
                </p>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-[#515154]">
                <span className="rounded-md border border-black/8 bg-white px-2 py-1">Date: 2026-06-05</span>
                <span className="flex items-center gap-1.5 rounded-md border border-black/8 bg-white px-2 py-1">
                  <Filter className="h-3 w-3 text-[#0071e3]" /> 1 filter applied
                </span>
              </div>
            </div>
            <div>
              {view === "overview" && <OverviewView />}
              {view === "userProfile" && <UserProfileView />}
              {view === "productAnalysis" && <ProductAnalysisView />}
              {view === "feedbackQuality" && <FeedbackQualityView />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
