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
    title: "AI 商家入驻助手",
    type: "Multi-Agent / AI 产品工作流",
    summary:
      "基于 WhatsApp 和 Multi-Agent，将海外商家入驻从传统表单流程重构为对话式资料收集、问答、审核跟进和召回工作流。",
    subtitle:
      "用 Multi-Agent 将墨西哥商家入驻流程从表单填写重构为对话式 AI 工作流",
    heroDescription:
      "我参与面向海外商家的入驻 AI 助手产品设计与迭代，围绕注册后流失、资料提交复杂、审核理解成本高等问题，将原本依赖表单填写和人工解释的入驻链路，升级为基于 WhatsApp 的对话式入驻、资料识别、问答引导、审核跟进和召回流程。",
    overview:
      "这是一个真实业务场景里的 AI Agent 产品案例。项目面对的是海外商家入驻流程复杂、注册后流失高、审核沟通成本高的问题。方案不是简单增加聊天机器人，而是将原本由商家自己理解平台规则的表单式入驻链路，重构为由 Multi-Agent 协同驱动的对话式 AI 工作流。",
    problem:
      "商家注册后容易流失，原因包括表单填写负担重、资料提交复杂、审核要求理解成本高，以及补件和状态跟进不清晰。",
    role:
      "我参与了产品方案设计、Agent 场景设计、评测体系构建、Bad Case 分析、会话 ETL 数据分析与迭代判断，目标是把 AI 能力转化为可落地、可评测、可迭代的商家入驻产品流程。",
    solution:
      "设计对话式入驻流程，由主控 Agent 协调入驻 Agent、问答 Agent、审核跟进 Agent 和召回能力，结合 OCR、资料识别、系统回写和数据分析，推动商家从注册继续走向提审和上线。",
    capabilities: [
      "Multi-Agent",
      "WhatsApp",
      "商家入驻",
      "OCR",
      "QA Agent",
      "ETL 分析",
      "转化漏斗",
    ],
    metrics: [
      { label: "平均入驻耗时下降", value: "69.53%" },
      { label: "AI 预审后人工通过率", value: "97.6%" },
      { label: "AI 召回提审转化率", value: "78.39%" },
      { label: "核心城市灰度放量", value: "50%" },
    ],
    impact: [
      "平均入驻耗时下降 69.53%，显著压缩商家从注册到资料提交的完成周期。",
      "AI 预审后人工通过率达到 97.6%，降低无效提审和反复补件。",
      "AI 召回提审转化率达到 78.39%，高于标准召回流程的 64.65%。",
      "项目在核心城市实现 50% 灰度放量，进入真实业务流量验证。",
    ],
    architecture: [
      {
        title: "WhatsApp 入口",
        description: "商家通过熟悉的沟通渠道进入入驻流程，降低启动门槛。",
      },
      {
        title: "主控 Agent",
        description: "识别商家意图和当前状态，将任务分发给不同业务 Agent。",
      },
      {
        title: "入驻 Agent",
        description: "通过对话方式收集门店、法人、菜单、证件等必要信息。",
      },
      {
        title: "材料识别",
        description: "结合图片上传和 OCR，降低商家手动填写和重复确认成本。",
      },
      {
        title: "问答 Agent",
        description: "回答入驻相关问题，并在问答后将商家引导回主流程。",
      },
      {
        title: "审核跟进 Agent",
        description:
          "围绕审核状态、缺失材料、补件要求和重新提交进行引导。",
      },
      {
        title: "系统回写",
        description:
          "将会话结果和结构化信息同步回业务系统，保证前后端状态一致。",
      },
      {
        title: "数据分析与迭代",
        description:
          "通过 ETL 和漏斗指标分析已读、回复、失败、完成率等问题，支持持续优化。",
      },
    ],
    keyDecisions: [
      "降低认知负担：把一次性填写大量字段，改为按步骤对话引导，让商家一次只处理一个明确任务。",
      "渐进式信息披露：不在一开始暴露所有材料和字段要求，而是在当前步骤需要时再询问和解释。",
      "信任感与可解释反馈：通过预审、缺失材料提示和补件引导，让商家知道为什么没有通过、下一步应该做什么。",
      "数据驱动迭代：通过已读率、回复率、发送失败率、资料完成率和审核通过率，判断问题出在触达、理解、材料还是流程本身。",
    ],
    reflection:
      "这个项目让我意识到，AI 产品的价值不在于给原有流程增加一个聊天入口，而在于围绕用户意图、业务状态、系统能力和可量化指标重新设计完整流程。对于业务场景里的 Agent 来说，关键不只是回答正确，而是能把用户持续引导到任务完成，并让业务系统状态同步更新。",
    reflectionTitle: "从单点功能到可复用的 AI 入驻框架",
    tags: [
      "Multi-Agent",
      "WhatsApp",
      "商家入驻",
      "OCR",
      "QA Agent",
      "ETL 分析",
      "转化漏斗",
    ],
    problemCards: [
      {
        title: "表单填写负担重",
        description:
          "商家需要在多个页面填写结构化信息、上传材料，并理解不同字段要求，入驻过程对新商家不够友好。",
      },
      {
        title: "审核沟通成本高",
        description:
          "商家经常需要理解缺失材料、审核状态、补件要求和重新提交方式，人工解释成本较高。",
      },
      {
        title: "注册后转化流失",
        description:
          "部分商家完成初始注册后，没有继续完成资料提交和审核，导致注册到提审之间存在明显漏斗损耗。",
      },
    ],
    funnelSteps: [
      "访问",
      "注册",
      "填写门店信息",
      "提交审核",
      "审核通过",
      "上线",
    ],
    beforeAfterItems: [
      {
        before: "商家自己理解表单字段",
        after: "AI 分步骤引导商家完成",
      },
      {
        before: "一次性暴露大量信息要求",
        after: "按当前任务逐步询问",
      },
      {
        before: "材料问题依赖人工解释",
        after: "AI 识别材料并提示补件",
      },
      {
        before: "问答和主流程割裂",
        after: "QA 后自动拉回入驻流程",
      },
      {
        before: "审核状态感知弱",
        after: "Agent 跟进审核与补件",
      },
      {
        before: "数据问题事后排查",
        after: "ETL 持续分析流失与异常",
      },
    ],
    responsibilities: [
      {
        title: "市场洞察与方案定义",
        description:
          "围绕墨西哥商家入驻场景，结合本地商家画像、现有 BD 入驻痛点和竞品 Agent 能力，判断 AI 如何降低入驻门槛，并转化为产品设计依据。",
      },
      {
        title: "Multi-Agent 产品流程设计",
        description:
          "参与设计商家入驻中的 Multi-Agent 协同流程，让主控 Agent 能够根据商家意图和进度，调度不同业务 Agent 完成入驻。",
      },
      {
        title: "Agent 评测与 Bad Case 分析",
        description:
          "设计 Agent 评测体系，结合人工样本与 AI 巡检评估问答表现和流程稳定性，独立组织 Bad Case 复盘周会，引导研发定位问题。",
      },
      {
        title: "数据分析与埋点监控",
        description:
          "独立开发 session 数据分析脚本，自动化生成分析报告；同时参与官网入口埋点设计，建立指标口径，让功能迭代能够基于数据推进。",
      },
    ],
    resultCards: [
      {
        category: "效率",
        value: "69.53%",
        title: "平均入驻耗时下降",
        description: "将商家从注册到资料提交的完成周期显著压缩。",
      },
      {
        category: "转化",
        value: "78.39%",
        title: "AI 召回提审转化率",
        description: "相比标准召回流程 64.65%，AI 召回在提审转化上表现更优。",
      },
      {
        category: "审核质量",
        value: "97.6%",
        title: "AI 预审后人工通过率",
        description: "AI 预审帮助商家提前发现材料和信息问题，降低无效提审。",
      },
      {
        category: "业务验证",
        value: "50%",
        title: "核心城市灰度放量",
        description: "项目进入真实业务流量验证，而非停留在 Demo 阶段。",
      },
    ],
    productDecisionCards: [
      {
        title: "降低认知负担",
        description:
          "把一次性填写大量字段，改为按步骤对话引导，让商家一次只处理一个明确任务。",
      },
      {
        title: "渐进式信息披露",
        description:
          "不在一开始暴露所有材料和字段要求，而是在当前步骤需要时再询问和解释。",
      },
      {
        title: "信任感与可解释反馈",
        description:
          "通过预审、缺失材料提示和补件引导，让商家知道为什么没有通过、下一步应该做什么。",
      },
      {
        title: "数据驱动迭代",
        description:
          "通过已读率、回复率、发送失败率、资料完成率和审核通过率，判断问题出在触达、理解、材料还是流程本身。",
      },
    ],
    capabilityCards: [
      {
        title: "Agent 编排能力",
        description:
          "通过主控 Agent 协调入驻、问答、审核跟进、召回等业务 Agent，支持复杂商家状态下的任务分发。",
      },
      {
        title: "材料理解能力",
        description:
          "结合 OCR、图片识别、知识库问答和结构化提取，让 AI 能处理门店照片、菜单、证件和补充材料等非结构化输入。",
      },
      {
        title: "业务系统联动能力",
        description:
          "将 AI 会话结果、商家状态和业务系统流程打通，使 Agent 不只是回答问题，而是推动入驻流程继续向前。",
      },
    ],
  },
  {
    slug: "bytedance-ai-procurement",
    title: "字节跳动 AI 采购匹配工作流",
    type: "RAG / LLM 工作流 / 采购智能",
    summary:
      "将全球采购智能分析产品化，结合检索、结构化 LLM 推理与运营工具，支撑大规模批量处理。",
    overview:
      "这是一个把采购匹配从高成本人工分析升级为标准化智能工作流的案例，重点在于如何让检索、判断和批处理在真实业务里稳定协同。",
    problem:
      "全球采购匹配任务处理量大、判断维度复杂，人工分析耗时长，且缺少标准化证据与稳定的批处理能力。",
    role:
      "负责产品工作流设计、RAG 匹配逻辑抽象、结构化输出要求设计，以及批处理工具的产品化能力定义。",
    solution:
      "设计基于 RAG 的采购匹配系统，并配套批处理工具、结构化输出格式与异常机制，把分析流程产品化。",
    capabilities: [
      "RAG",
      "Structured JSON",
      "Batch Workflow",
      "Threshold Routing",
      "Operational Tooling",
    ],
    metrics: [
      { label: "匹配准确率", value: "96.45%" },
      { label: "中位匹配时长", value: "12 秒" },
      { label: "批处理效率", value: "天级 → 小时级" },
      { label: "输出格式", value: "结构化 JSON" },
    ],
    impact: [
      "设计基于 RAG 的全球采购智能匹配系统。",
      "结合 Top-K 检索、相似度阈值与带证据字段的结构化 JSON 生成。",
      "在保证质量的前提下，将批处理效率从天级压缩到小时级。",
      "将流程产品化，支持 Excel 批量上传、表头容错、多工区路由、行级进度跟踪与异常处理。",
    ],
    architecture: [
      {
        title: "候选检索与过滤",
        description:
          "先利用检索召回候选项，再通过相似度阈值和规则过滤降低无效推理成本。",
      },
      {
        title: "结构化判断与证据输出",
        description:
          "让模型在明确字段约束下输出结构化 JSON，同时保留证据依据，便于审核和后续使用。",
      },
      {
        title: "批处理与运营可见性",
        description:
          "为批量上传、进度追踪、异常记录和工区路由提供工具化支撑，让流程可以真正被团队消化。",
      },
    ],
    keyDecisions: [
      "选择结构化 JSON 作为标准输出，而不是只返回自然语言结论。",
      "将检索阈值与异常处理作为产品能力显式设计，降低规模化使用的不确定性。",
      "从一开始就面向批处理与运营工具设计，而不是先做单条 Demo 再补系统。",
    ],
    reflection:
      "这个项目强化了我对 AI 产品化的判断：当业务规模上来之后，决定价值的往往不是模型回答得多聪明，而是系统是否可批量处理、可解释、可追踪。",
  },
  {
    slug: "policy-news-rag-assistant",
    title: "政策新闻选题 RAG 助手",
    type: "独立 AI 项目 / RAG / 评测",
    summary:
      "围绕海南自贸港政策报道，构建证据约束的选题助手，并通过检索校验与降级逻辑提升生成可靠性。",
    overview:
      "这是一个偏研究与产品验证结合的案例，目标不是单纯生成选题，而是让政策新闻建议具备证据约束、质量验证和可回退的工作机制。",
    problem:
      "政策报道选题需要同时兼顾时效性、可信度和引用依据，单纯生成容易出现无证据支撑或质量波动。",
    role:
      "独立负责任务定义、RAG 工作流设计、评测框架构建、检索配置比较与输出可靠性验证。",
    solution:
      "搭建包含检索、重排、生成、验证和降级的分层流程，让选题建议建立在明确证据和可回退机制之上。",
    capabilities: [
      "RAG Evaluation",
      "Citation Binding",
      "Reranking",
      "Fallback Logic",
      "Latency Analysis",
    ],
    metrics: [
      { label: "引用覆盖率", value: "100%" },
      { label: "Gold 任务集", value: "50 条" },
      { label: "流程层级", value: "5 层" },
      { label: "评测重点", value: "时延 + 质量" },
    ],
    impact: [
      "设计检索、重排、生成、校验、降级的完整工作流。",
      "实现证据绑定与引用过滤，确保输出有据可依。",
      "实现任务级 100% 引用覆盖率。",
      "构建 Gold Task Set、无检索基线、开发集调优、向量配置对比与时延分析体系。",
    ],
    architecture: [
      {
        title: "检索与重排",
        description:
          "先召回政策相关资料，再通过重排保证进入生成环节的是更高相关度、更适合引用的内容。",
      },
      {
        title: "生成与校验",
        description:
          "生成阶段要求绑定证据来源，同时在后置校验阶段筛除不充分或不可信的结论。",
      },
      {
        title: "降级与评测闭环",
        description:
          "当证据不足时主动降级，避免强行输出；同时通过 Gold Task Set 和对比实验评估质量与时延。",
      },
    ],
    keyDecisions: [
      "把证据绑定作为输出要求的一部分，而不是事后补充参考来源。",
      "在生成流程中显式加入验证与降级机制，以可靠性优先于流畅度。",
      "通过无检索基线和配置对比来判断 RAG 设计是否真的带来增益。",
    ],
    reflection:
      "这个项目让我更确认，做 RAG 产品不能只看回答是否顺滑，还要看证据是否站得住、失败时是否能优雅降级，以及评测是否能支持持续迭代。",
  },
];

export const projectMap = Object.fromEntries(
  featuredProjects.map((project) => [project.slug, project]),
) as Record<string, CaseStudyProject>;
