# Bytedance SKU Matching, 现场讲解稿

> **场景**：你在跟面试官现场播放 RAG 流程图（GSAP 动画从 step 1 推进到 step 7，每步 1.15s）。这是同步演示，不是录屏，所以你讲的话要跟动画节奏对得上。
>
> **节奏**：7 步总时长约 9 秒动画 + 你讲 1-1.5 分钟。如果你跟节奏说，每步 10-15 秒；如果你想讲细点，用 Pause 按钮停在某一步慢慢讲。
>
> **贯穿线**（讲之前心里默念）：*这是一个 entity-matching RAG workflow，把电商 listing 映射到稳定的内部 SKU。7 步走完整条管线，每步只做一件事。*

---

## 0. 滚动到位（10 秒开场）

画面是一个横版流程图，5 个节点：Raw Row、Standard SKU KB、R (Retrieve)、A (Add Context)、G (Generate)，加上中间决策菱形 (Score ≥ 40?) 和右侧两个出口 (Write Back / No Match)。

> "这一段是 SKU matching 的 RAG workflow。我用 7 步把一个外部 listing 一路映射到内部标准 SKU。我们看一遍跑起来什么样。"

操作：点 RAG 流程图进入视区，IntersectionObserver 触发自动播放。

---

## 1. Step 1, Raw Listing Arrives（10-15 秒）

**画面**：左下 Raw Row 节点亮起（蓝色描边），caption "A vendor listing arrives as free text. Nothing about it is canonical yet." 浮现。

> "Step 1：原行进来。这一行是从供应商 listing 抓的 DORITOS Nacho Che 1oz 40ct 的自由文本行。没有任何字段是规范的，名字拼写、pack size 都有 vendor 自己的写法。"

**英文术语速记**：raw row / vendor listing / free text / non-canonical / unnormalized input。

---

## 2. Step 2, Query Key 提取（10-15 秒）

**画面**：Raw Row 上方亮起 "Query Key: Product Name · Price" 标签，边 raw to r 亮起（虚线到 R 节点之前），caption "The product name becomes the query key against the standard SKU knowledge base."

> "Step 2：从这一行里抽 query key。不是整行都拿去搜，只拿 product name 和 price 两个字段做 key，对着我们的标准 SKU knowledge base 去查。"

**PM 侧重点**：**只选 2 个字段做 key**，避免 vendor 写错的其他字段污染 retrieval。
**SWE 侧重点**：query construction / field selection / key extraction。

**英文术语速记**：query key / product name / price / field selection / KB lookup。

---

## 3. Step 3, Hybrid Retrieval, Top 5（10-15 秒）

**画面**：Standard SKU KB 节点亮起，kb to r 边亮起，R 节点亮起，caption "Hybrid retrieval returns the five closest candidates. Retrieval rank is not a verdict."

> "Step 3：hybrid search 跑一次，从标准 SKU 库召回最像的 5 个 candidate。注意，**召回顺序不是答案**。向量近不代表真的 match。"

**PM 侧重点**：把"召回"和"判定"分开，是这个 workflow 的核心设计。
**SWE 侧重点**：hybrid search (vector + keyword) / top-K / recall precision tradeoff。

**英文术语速记**：hybrid search / candidate set / top-K retrieval / recall vs precision。

---

## 4. Step 4, Add Context（10-15 秒）

**画面**：r to a 边亮起，A 节点亮起，caption "Each candidate is expanded into its attributes: brand, short name, pack, flavor, price."

> "Step 4：把 5 个 candidate 每个都展开成结构化字段：brand、short name、pack、flavor、price。模型拿到的不是 raw candidate text，是一组 normalized attributes。"

**SWE 侧重点**：candidate expansion / attribute flattening / structured context。

**英文术语速记**：candidate expansion / attribute set / brand / pack size / flavor / normalized context。

---

## 5. Step 5, Generate Match + Rubric（10-15 秒）

**画面**：a到g 边亮起，G 节点亮起，caption "Generation applies the buyer's scoring rubric and emits a score with its reason."

> "Step 5：模型用一个固定的 scoring rubric 给每个 candidate 打分。rubric 是买家业务规则定义的，不是模型自己想的。每个分数都带一个 reason。"

**PM 侧重点**：**rubric 是业务方定义，不是 prompt 里现编**。这是可控性来源。
**SWE 侧重点**：scoring rubric / structured output / reason field / JSON schema。

**英文术语速记**：scoring rubric / reason field / structured generation / JSON schema / controllable output。

---

## 6. Step 6, Threshold Gate（10-15 秒）

**画面**：g to decision 边亮起，中间菱形 "Score ≥ 40?" 亮起，decision to yes 边亮起，caption "The top score of 100 clears the threshold of 40, so this row is safe to commit."

> "Step 6：top score 跟 40 这个 threshold 比。这里 Doritos Nacho Cheese 拿了 100 分，远超 40 分门槛。如果不到 40 分的 row 会被送进 No Match 等人工 review，**不会自动写回去**。"

**PM 侧重点**：threshold 控制是"机器能 commit 哪些行"的关键开关，business decides。
**SWE 侧重点**：threshold gate / manual review queue / no auto-write below threshold。

**英文术语速记**：threshold gate / score cutoff / manual review queue / safe-to-commit。

---

## 7. Step 7, Write Back as JSON（10-15 秒）

**画面**：decision到write-back 边亮起，右上 "Write Back" 节点亮起，caption "The canonical SKU, awarded price, and score are written back as JSON."

> "Step 7：把 canonical SKU、awarded price、score 三个字段写回到主表，写成结构化 JSON。这一行就完成了。"

**英文术语速记**：write-back / canonical SKU / awarded price / structured JSON / table commit。

---

## 8. 收尾（30-45 秒）

整套动画跑完停住。

> "总结一下这条管线：
> 1. raw listing 进来，抽 query key，再 hybrid search top 5，再 expand to attributes，再 rubric scoring，再 threshold gate，最后 JSON write back。
>
> 三个关键设计：
> - **召回和判定分开**：retrieval rank 不是 verdict，5 个 candidate 都要进 rubric。
> - **rubric 是业务方定义的**，不是 prompt 里临时编的。买家改 rubric，模型跟着改。
> - **threshold 兜底**：40 分以下的行进人工 review queue，不自动 commit。
>
> 这套管线的 4,000+ 行 vendor listing 一天跑完，写回主表的 match rate 大概 70%，剩下的进 review queue。"

操作：点 Replay 按钮重播。

---

## 用 Pause 按钮控制节奏（实操）

如果你想停在某一步细讲，**用 Pause 按钮**（Replay 左边那个，刚加的）。

| 你要做什么 | 操作 |
|---|---|
| 停在某一步讲细 | 走到那一步点 Pause（图标变 Play，文字变 Resume）|
| 继续播放 | 点 Resume |
| 重新看一遍 | 点 Replay（会从 step 1 重置）|

**关键**：动画是自动推进的，**不点 Pause 就会一路跑到 step 7**。如果讲到 step 4 时突然想细讲 candidate expansion，发现已经走完 step 5 了，那么只能 Replay 重来。所以提前在脑子里规划哪几步要细讲，进到那一步**先点 Pause**。

---

## 按 JD 调重点

**JD 偏 PM/产品**：
- Step 6 (threshold gate) 讲细：business 决定哪些可以自动 commit
- Step 5 (rubric) 讲细：业务方定义规则，模型执行
- Step 1 (raw listing) 讲细：什么是"非规范数据"
- Step 7 (write-back) 简讲

**JD 偏 SWE / AI Engineer**：
- Step 3 (hybrid search) 讲细：vector + keyword 的组合
- Step 4 (candidate expansion) 讲细：如何 structured context
- Step 5 (rubric) 讲细：JSON schema 怎么设计
- Step 6 (threshold) 讲细：如何 tune threshold
- Step 7 (write-back) 简讲

**JD 偏 R&D / 系统设计**：
- Step 2 to 3 讲细：query construction + retrieval architecture
- Step 4 to 5  to  6 讲细：context到generation  to  gate 整个 chain
- Step 7 (write-back) 讲细：transactional 写回，idempotency

---

## 通用建议

- **结论先行**：每步第一句是 takeaway（"step 3 是 hybrid search"），第二句才展开机制
- **不出现 em-dash / 箭头 / 加号**：用 "and" / "then" 代替
- **不用 AI 包装词**："thoughtful", "comprehensive", "robust" 都不说
- **被追问实现细节**：用 "I would check the code rather than guess" 兜底
- **总时长**：2-3 分钟（如果面试官想看 Replay 第二次，再加 1 分钟）
