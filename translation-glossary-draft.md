# Analytics Dashboard Simulator — Translation Glossary (Draft for Review)

Scope: `src/components/analytics-dashboard-simulator.tsx` only (the embedded fake analytics tool inside Section 06 of the case study). This file is almost entirely Chinese UI copy; the surrounding case study prose is already in English.

Locked decisions from earlier: Dashboards (not Boards), Avg (not Average), Users (not Members), [Deprecated] (not [Legacy]), KPI numbers keep comma format (18,640), Section 06 metric concepts are rewritten to US conventions where the literal term would confuse a US reader.

---

## 1. Top nav tabs (`topNavTabs`, 11 items)

| Line | Chinese | Proposed English | Note |
|---|---|---|---|
| 32 | 看板 | Dashboards | active tab |
| 33 | 指标模型 | Metrics Catalog | Amplitude/Datadog call this "metrics catalog" |
| 34 | 数据查询 | Data Explorer | "raw query" tools are usually "Explorer" in US analytics tools |
| 35 | 用户行为分析 | Behavior Analytics | |
| 36 | 应用性能监测 | Performance Monitoring | APM convention |
| 37 | 用户反馈分析 | Feedback Analytics | |
| 38 | 告警&订阅 | Alerts & Subscriptions | |
| 39 | 智能体分析 | Agent Analytics | AI agent telemetry, not super common yet in US but self-explanatory |
| 40 | 语义数据集 | Semantic Datasets | |
| 41 | 数据中心 | Data Center | could also be "Data Hub"; Data Center is more literal and fine here |
| 42 | 项目设置 | Project Settings | |

## 2. Sidebar — "看板列表" section (3 items)

| Line | Chinese | Proposed English |
|---|---|---|
| 50 | 总览 | Overview |
| 51 | 用户画像 | User Profile |
| 52 | 产品分析 | Product Analytics |

## 3. Sidebar — "Alpha 用户分群" section (9 items)

| Line | Chinese | Proposed English | Note |
|---|---|---|---|
| 58 | h5致源看板 | H5 Attribution Board | "致源" = attribution/source-tracing |
| 59 | 制片用户看板 | Producer Users | role-based board, drop "看板" per item since section already says "boards" |
| 60 | 编剧用户看板 | Screenwriter Users | |
| 61 | 策划用户看板 | Planner Users | |
| 62 | 导演用户看板 | Director Users | |
| 63 | 其他用户看板 | Other Users | |
| 64 | 春苗用户 | Spring Sprout Users | this is likely an internal program name; flag for you to confirm — literal translation may mean nothing to a US reader |
| 65 | 用户对比 | User Comparison | |
| 66 | 聊一幕 | Chat Scene | product feature name, tentative — flag for confirmation |
| 67 | 小工具 | Mini Tools | |

## 4. Sidebar — "细分行为统计" section (9 items)

| Line | Chinese | Proposed English | Note |
|---|---|---|---|
| 72 | 细分行为统计 (section title) | Segment Analytics | |
| 73 | 翻译-用户行为数据统计 | Translation — User Behavior | |
| 74 | 动漫-用户行为数据统计 | Anime — User Behavior | |
| 75 | 头颈编剧-用户数据统计 | Head & Neck Writer — User Data | "头颈编剧" unclear internal team name, flag for confirmation |
| 76 | 海纳编剧团队-使用统计 | Hina Writer Team — Usage | "海纳" likely a team/product codename, flag |
| 77 | 漫画-用户行为统计 | Comics — User Behavior | |
| 78 | 少儿-用户行为数据统计 | Kids — User Behavior | |
| 79 | 功能应用 | Feature Usage | |
| 80 | 用户对比-剧本尝试 | User Comparison — Script Trials | |
| 81 | 剧集-内部用户行为数据统计 | Series — Internal User Behavior | |

## 5. Overview — KPI cards (`overviewCards.traffic`, 4 cards)

| Line | Chinese title | Proposed English |
|---|---|---|
| 89 | 页面访问人数 | Page Visitors |
| 98 | 页面访问次数 | Page Views |
| 107 | 页面访问人数均次数 | Views per Visitor |
| 116 | 停留时长平均值_按PV | Avg Session Time (per View) |

## 6. Overview — Stability cards (`overviewCards.stability`, 2 cards)

| Line | Chinese title | Proposed English |
|---|---|---|
| 127 | 脚本异常率_按人 | Client Error Rate (per User) |
| 136 | 接口异常率_按次 | API Error Rate (per Call) |

## 7. Overview — Conversion cards (`overviewCards.conversion`, 2 cards)

| Line | Chinese title | Proposed English | Note |
|---|---|---|---|
| 147 | [不推荐] onLoad 秒开率 | [Deprecated] Fast-Load Rate (onLoad) | keeping "onLoad" since it's the literal browser event name, matches what we discussed earlier |
| 156 | 卡顿率_按人 | Lag Rate (per User) | |

## 8. Overview — Section card titles

| Line | Chinese | Proposed English |
|---|---|---|
| 744 | 稳定性 | Stability |
| 751 | 流转性 | Conversion |
| 760 | BU 分布 | BU Distribution |
| 774 | 职务分布 | Role Distribution |

## 9. Overview — Distribution labels

| Line | Chinese | Proposed English |
|---|---|---|
| 166-170 (buDist names) | BU-A/B/C/D/其他 | BU-A/B/C/D/Other |
| 172-177 (roleDist names) | 制片/编剧/策划/导演/其他 | Producer/Screenwriter/Planner/Director/Other |

## 10. User Profile view — KPI cards (`userProfileKpis`, 4 cards)

| Line | Chinese title | Proposed English |
|---|---|---|
| 184 | 页面访问人数 | Page Visitors |
| 185 | 页面访问次数 | Page Views |
| 186 | 新用户数 | New Users |
| 187 | 站点活跃停留时长_平均值 | Avg Active Session Time |

## 11. User Profile view — section headers & body copy

| Line | Chinese | Proposed English |
|---|---|---|
| 820 | 流量趋势 | Traffic Trend |
| 823 | 页面访问人数 (legend) | Page Visitors |
| 824 | 页面访问次数 (legend) | Page Views |
| 840 | 页面访问 TOP10 | Top 10 Pages |
| 849/850 | pv / uv (unit labels) | pv / uv (keep — these already read as English abbreviations) |
| 859 | 访问分时统计 | Hourly Traffic |
| 859 (badge) | 不包含默认值 | Excludes Defaults |
| 875 | 核心事件排行 TOP10 | Top 10 Events |
| 886 | 自定义事件触发次数_次数 | Custom Event Triggers (count) |
| 891 | 自定义事件触发数_人数 | Custom Event Triggers (users) |
| 902 | 访客地图 | Visitor Map |
| 906-910 | 1-1 / 1-1.4 / 4-NaN (legend labels) | flag — these look like broken/placeholder labels in the source, not real Chinese-to-English text. Need your confirmation on what they should say (looks like a legend scale, maybe "Low" to "High") |
| 916 | 留存率 | Retention |
| 288 (retentionHead) | 日期/用户数/次日/第二日/第三日/第四日/第五日/第六日/第七日 | Date / Users / Day 1 / Day 2 / Day 3 / Day 4 / Day 5 / Day 6 / Day 7 |

## 12. Product Analysis view — KPI cards (`productKpis`, 4 cards)

| Line | Chinese title | Proposed English |
|---|---|---|
| 292 | 当日 DAU | Today's DAU |
| 293 | 当日 TS | Today's Session Time |
| 294 | 累计活跃人数 | Cumulative Active Users |
| 295 | 累计人均 TS | Cumulative Avg Session Time |

## 13. Product Analysis view — section headers & body copy

| Line | Chinese | Proposed English |
|---|---|---|
| 989 | 每日 DAU | Daily DAU |
| 992 | 点击曝光事件触发人数 (legend) | Click/Impression Triggers (users) |
| 1000 | 日人均停留时长 | Avg Daily Session Time |
| 1003 | 活跃停留时长平均值_按人 (legend) | Avg Active Session Time (per User) |
| 1014 | 产品模块（单天） | Product Modules (Single Day) |
| 1016/1083/1170 | 页面 ID: ... | Page ID: ... |
| 1024 | {module} DAU | {module} DAU (module names below) |
| 1025 | 点击曝光事件触发人数 | Click/Impression Triggers (users) |
| 1035 | {module} 人均停留时长 | {module} Avg Session Time |
| 1036 | 活跃停留时长平均值_按人 | Avg Active Session Time (per User) |
| 1056 | 小工具日人均停留时长 | Mini Tools Avg Daily Session Time |
| 1067 | 小工具 DAU | Mini Tools DAU |
| 1081 | 产品模块（多天） | Product Modules (Multi-Day) |
| 1096 | 每日用户使用排行榜 | Daily User Leaderboard |
| 1102 | 日期 (table header) | Date |
| 1103 | 用户名 (table header) | Username |
| 1104 | 活跃停留时长平均值_按人 (table header) | Avg Active Session Time (per User) |
| 1123 | 留存分析 | Retention Analysis |

## 14. Module names used as data labels (appear in charts/tables)

| Line | Chinese | Proposed English | Note |
|---|---|---|---|
| 304 | 写一写 | Write | product feature name, literal is "write-write" — tentative |
| 305 | 创建盒子 | Create Box | product feature name — tentative |
| 315/329/341/355/369 (table titles) | 写一写/创建盒子/知识库/评效/小工具 | Write / Create Box / Knowledge Base / Review / Mini Tools | "评效" = performance review feature |

## 15. Product tables — shared headers (`headers` arrays, appear 5x)

| Line | Chinese | Proposed English |
|---|---|---|
| 316 etc. | 日期 | Date |
| 316 etc. | 点击曝光事件触发数_人数 | Click/Impression Triggers (users) |
| 316 etc. | 活跃停留时长平均值_按人 | Avg Active Session Time (per User) |
| 316 (writewrite only) | 活跃停留时长长住_按人 | Cumulative Active Time (per User) — flag: "长住" is likely a typo for "累计" (cumulative); confirm before translating literally |

## 16. Table pagination / misc UI strings

| Line | Chinese | Proposed English |
|---|---|---|
| 1196 | 每页显示 10 | 10 per page |
| 1197 | Total: (already English) | keep |
| 1199 | &lt; 上一页 | &lt; Previous |
| 1201 | 下一页 &gt; | Next &gt; |

## 17. StatCard comparison labels (appears on every KPI card, ~10x)

| Line | Chinese | Proposed English |
|---|---|---|
| 693 | 同比上周 | vs Last Week |
| 695 | 环比昨日 | vs Yesterday |
| 979 | 同比上周 | vs Last Week |

## 18. Sidebar chrome

| Line | Chinese | Proposed English |
|---|---|---|
| 1258 | Alpha 看板 | Alpha Dashboards |
| 1319 | 新建看板 | New Dashboard |
| 1322 | 编辑目录 | Edit Folders |

## 19. Breadcrumb (view title + subtitle)

| Line | Chinese | Proposed English |
|---|---|---|
| 1412 | 看板 · 总览 | Dashboards · Overview |
| 1413 | 用户画像 | User Profile |
| 1414 | 产品分析 | Product Analytics |
| 1418 | 总流量、稳定性、流转性总览 | Traffic, stability, and conversion at a glance |
| 1419 | 用户行为、留存、地域分布 | Behavior, retention, and geographic distribution |
| 1420 | 各产品模块的 DAU、停留时长与排行 | DAU, session time, and rankings by module |
| 1424 | 日期 20260605 | Date: 2026-06-05 |
| 1426 | 已选 1 项 | 1 filter applied |

## 20. Footer

| Line | Chinese | Proposed English |
|---|---|---|
| 1441 | 数据已脱敏 (mixed with existing English) | data anonymized |

---

## Items flagged for your confirmation (cannot translate confidently without context)

1. **春苗用户** (line 64) — internal program name? Or descriptive ("new/budding users")? Need the real meaning to translate well.
2. **聊一幕** (line 66) — product feature name, literal "chat scene." Confirm intended meaning.
3. **头颈编剧** (line 75) — "head and neck screenwriter" is a literal nonsense translation. Is this a team codename, or does "头颈" mean something else in this internal context?
4. **海纳编剧团队** (line 76) — "海纳" likely a codename (could be a team/brand name kept as-is, like "Haina Writer Team"). Confirm if this should stay untranslated as a proper noun.
5. **1-1 / 1-1.4 / 4-NaN legend labels** (lines 863, 869, 906-910) — these read like broken placeholder data already in the Chinese version, not real content. Confirm what these should actually say (looks like it should be a "Low → High" scale legend).
6. **活跃停留时长长住_按人** (line 316, writewrite table only) — "长住" is unusual phrasing; likely should be "累计" (cumulative). Confirm before translating.
7. **写一写 / 创建盒子** (lines 304-305, 315, 329) — product feature names. Literal English ("Write", "Create Box") may read oddly to a US recruiter. Confirm if these should be renamed to something more idiomatic (e.g., "Write" stays, "Create Box" → "New Project" or similar) since they're clearly internal product feature names, not translatable concepts.

---

## Batching plan once glossary is approved

1. **Batch 1** — Structural nav: topNavTabs, sidebarSections (all 3 groups), Sidebar chrome, breadcrumb.
2. **Batch 2** — Overview view: KPI cards + section titles + distribution labels.
3. **Batch 3** — User Profile view: KPI cards + all card headers + table headers + legends.
4. **Batch 4** — Product Analysis view: KPI cards + card headers + product tables (5x) + leaderboard + retention table.
5. **Batch 5** — Cleanup pass: StatCard shared labels (同比上周/环比昨日), pagination strings, footer.

Each batch: edit → `tsc --noEmit` → banned-symbol grep → you review a screenshot before next batch.
