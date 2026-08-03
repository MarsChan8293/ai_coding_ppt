/* F · 企业解决方案。页面 ID 与顺序须保持稳定。 */
(function registerSourceSolutionSlides() {
  const sourceFile = "slides/g-solution-material.html";
  let solutionSlideIndex = 0;
  const sourceSlide = ({ id, sourcePage, title, kicker, summary }) => {
    const displayIndex = ++solutionSlideIndex;
    return {
      id,
      section: "solution",
      title,
      summary,
      theme: { paper: "#f5f8fc", ink: "#12203b", accent: "#0787a0" },
      render: () => `
        <section class="presentation-slide source-frame-slide" data-source-page="${sourcePage}">
          ${slideChrome(`F.${displayIndex} · 企业解决方案`)}
          <h2 class="slide-title">${title}</h2>
          <iframe class="source-slide-frame" src="${sourceFile}?embed=${encodeURIComponent(sourcePage)}" title="${title}" tabindex="-1" aria-label="${title}"></iframe>
        </section>`
    };
  };

  window.sectionSlides = [
    ...(window.sectionSlides || []),
    sourceSlide({ id: "solution-challenges", sourcePage: "solution-challenges", title: "个人提效已经发生，企业级 AI Coding 仍需完成两重跨越", kicker: "CHALLENGES · 企业级落地的两重跨越", summary: "企业级落地既要让基础设施稳定可控，也要让团队交付真正同步提速。" }),
    sourceSlide({ id: "solution-security-cost-challenges", sourcePage: "security-cost-challenges", title: "安全与成本不是边缘问题，而是企业级 AI Coding 的硬门槛", kicker: "SECURITY & COST · 安全与成本硬门槛", summary: "代码边界与持续放大的 Token 消耗，决定了企业必须同时算清安全账与经济账。" }),
    sourceSlide({ id: "solution-model-agent-evolution-challenges", sourcePage: "model-agent-evolution-challenges", title: "Coding 模型与 Coding Agent 快速更新，企业必须持续追赶", kicker: "MODEL & AGENT · 持续演进挑战", summary: "模型、Agent 与工具生态不断演进，企业每次升级都要完成适配、验证和规模化交付。" }),
    sourceSlide({ id: "solution-performance-challenges", sourcePage: "performance-challenges", title: "用户与任务复杂度同步增长，AI Coding 遭遇性能瓶颈", kicker: "PERFORMANCE · 性能与稳定性", summary: "高并发、长上下文和多轮工具调用叠加，直接影响响应速度、完成率与稳定性。" }),
    sourceSlide({ id: "solution-token-management-challenges", sourcePage: "token-management-challenges", title: "Token 已成为新的研发资源，但多数企业仍在“无账本”运行", kicker: "TOKEN OPS · 资源治理", summary: "统一管理 Token，才能将用户需求、模型算力与研发产出转化为可规模化运营的资源。" }),
    sourceSlide({ id: "solution-team-delivery-challenges", sourcePage: "team-delivery-challenges", title: "个体提效显著，团队级交付效能却没同比提升", kicker: "TEAM DELIVERY · 团队交付效能", summary: "没有统一约束、共享记忆和协同机制，个人新增产出会更快地涌向原有交付瓶颈。" }),
    sourceSlide({ id: "solution-overview", sourcePage: "solution-overview", title: "助力客户构建最优研发基础设施，实现团队提效", kicker: "SOLUTION SYSTEM · 从挑战到体系化应对", summary: "以全栈私有化 AI Infra 为底座，持续更新模型、性能、Token 运营与研发实践能力。" }),
    sourceSlide({ id: "private-security", sourcePage: "private-security", title: "全栈私有化，同时算清 AI Coding 的安全账与经济账", kicker: "PRIVATE SECURITY · 安全与成本", summary: "代码、模型与研发数据留在企业安全边界内，并兼顾规模化使用的长期成本。" }),
    sourceSlide({ id: "model-day0", sourcePage: "model-day0", title: "AI Coding 效果取决于模型能力，Day 0 支持最新 Coding 模型当天可用", kicker: "MODEL DAY 0 · 模型与 Agent 适配", summary: "通过最新模型快速适配机制，让企业研发团队及时获得新的 Coding 能力。" }),
    sourceSlide({ id: "model-ever", sourcePage: "model-ever", title: "Model Ever：模型能力从感知到用户侧持续更新", kicker: "MODEL EVER · 能力持续更新", summary: "从模型与引擎适配，到企业侧推荐、部署、评测和更新的完整闭环。" }),
    sourceSlide({ id: "coding-helper", sourcePage: "coding-helper", title: "Coding Helper：10 分钟完成 Agent 安装与模型接入", kicker: "CODING HELPER · 10 分钟快速装配", summary: "将环境检测、Agent 安装、API 配置、模型探测和工具启动串成可执行流程。" }),
    sourceSlide({ id: "smart-accel", sourcePage: "smart-accel", title: "Smart 系列加速套件加持，FusionOne AI 提升 AI Coding 吞吐 30%+", kicker: "SMART ACCEL · 推理加速", summary: "来自真实研发负载的持续优化结果，覆盖推理加速与稳定体验。" }),
    sourceSlide({ id: "smart-qos", sourcePage: "smart-qos", title: "SmartQoS 保障高峰期核心 Coding 任务体验不降级", kicker: "SMART QOS · 高峰体验保障", summary: "通过会话级与密钥级优先调度，保障核心任务和 VIP 用户的稳定体验。" }),
    sourceSlide({ id: "smart-scenario", sourcePage: "smart-scenario", title: "关键团队与紧急项目，在高峰期获得稳定资源", kicker: "SCENARIO PRIORITY · 关键团队与紧急项目", summary: "用请求优先级和 Token 使用保障，让关键任务持续推进。" }),
    sourceSlide({ id: "roi-tokenops", sourcePage: "roi-tokenops", title: "Token 用量可见可控，私有化算力才能稳定运营", kicker: "TOKENOPS · Token 可见可控", summary: "将 Token 转化为可度量、可分配、可管控的研发预算。" }),
    sourceSlide({ id: "team-add-solution", sourcePage: "team-add-solution", title: "ADD 将个人使用 AI，升级为团队可复制的研发生产方式", kicker: "ADD · 团队研发范式", summary: "将流程、角色、规约与知识固化为工程资产，支持多人、多 Agent 协同。" }),
    sourceSlide({ id: "team-quality-knowledge", sourcePage: "team-quality-knowledge", title: "质量与知识双轮驱动，让团队提效不以失控和遗忘为代价", kicker: "QUALITY & KNOWLEDGE · 团队提效双轮驱动", summary: "把质量要求嵌入执行过程，并将工程资产沉淀为可持续复用的能力。" }),
    sourceSlide({ id: "team-project-proof", sourcePage: "team-project-proof", title: "真实项目验证：研发范式在实践回流中持续演进", kicker: "PRACTICE LOOP · 真实项目验证", summary: "四个内部项目在真实研发场景中持续将反馈、问题和工程纪律回流中央库。" }),
    sourceSlide({ id: "unified-skills", sourcePage: "unified-skills", title: "先提供经实践沉淀的基础 Agent / Skills，让客户少踩坑", kicker: "AGENT / SKILLS · 快速起步", summary: "覆盖需求、设计、开发和代码检视的统一 Skills，帮助客户快速起步。" }),
    sourceSlide({ id: "deploy-selection", sourcePage: "deploy-selection", title: "按模型规模、并发和团队规模选择部署配置", kicker: "DEPLOYMENT · 配置选型", summary: "用模型规模、典型并发和团队规模帮助客户完成部署配置选型。" })
  ];
}());
