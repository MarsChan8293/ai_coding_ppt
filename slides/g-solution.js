/* Source pages share the composer chrome, but their inner canvas widths vary. Keep the outer title on the same content rail. */
window.alignSourceFrameTitles = function alignSourceFrameTitles(root = document) {
  root.querySelectorAll(".source-frame-slide").forEach(slide => {
    const frame = slide.querySelector(".source-slide-frame");
    if (!frame || frame.dataset.titleAlignmentBound === "true") return;
    frame.dataset.titleAlignmentBound = "true";
    const apply = () => {
      const canvas = frame.contentDocument?.querySelector(".composer-embed-active .canvas, .canvas");
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (!Number.isFinite(rect.left) || !Number.isFinite(rect.right)) return;
      slide.style.setProperty("--source-content-left", `${rect.left}px`);
      slide.style.setProperty("--source-content-right", `${1440 - rect.right}px`);
    };
    frame.addEventListener("load", apply);
    apply();
    requestAnimationFrame(apply);
  });
};

/* F · 企业解决方案。页面 ID 与顺序须保持稳定。 */
(function registerSourceSolutionSlides() {
  const sourceFile = "slides/g-solution-material.html";
  const aMaterialSourceFile = "slides/a-material-source/AI-Coding解决方案客户交流材料.html";
  let solutionSlideIndex = 0;
  const sourceSlide = ({ id, sourcePage, title, kicker, summary, sourceFile: pageSourceFile = sourceFile }) => {
    const displayIndex = ++solutionSlideIndex;
    return {
      id,
      section: "solution",
      title,
      summary,
      theme: { paper: "#f5f8fc", ink: "#12203b", accent: "#0787a0" },
      render: (options = {}) => `
        <section class="presentation-slide source-frame-slide" data-source-page="${sourcePage}">
          ${slideChrome(`F.${displayIndex} · 企业解决方案`)}
          <h2 class="slide-title">${title}</h2>
          <iframe class="source-slide-frame" src="${pageSourceFile}?embed=${encodeURIComponent(sourcePage)}&mode=${options.thumbnail ? "thumbnail" : "player"}" title="${title}" tabindex="-1" aria-label="${title}"></iframe>
        </section>`
    };
  };

  const nativeSolutionSlide = ({ id, title, summary, render }) => {
    const displayIndex = ++solutionSlideIndex;
    return {
      id,
      section: "solution",
      title,
      summary,
      theme: { paper: "#f5f8fc", ink: "#12203b", accent: "#1768f2" },
      render: (options = {}) => render({ displayIndex, title, options })
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
    sourceSlide({ id: "solution-overview", sourcePage: "solution-overview", title: "AI Coding 解决方案助力客户构建最优研发基础设施，实现团队提效", kicker: "SOLUTION SYSTEM · 从挑战到体系化应对", summary: "以全栈私有化 AI Infra 为底座，持续更新模型、性能、Token 运营与研发实践能力。", sourceFile: aMaterialSourceFile }),
    sourceSlide({ id: "private-security", sourcePage: "private-security", title: "全栈私有化，同时算清 AI Coding 的安全账与经济账", kicker: "PRIVATE SECURITY · 安全与成本", summary: "代码、模型与研发数据留在企业安全边界内，并兼顾规模化使用的长期成本。", sourceFile: aMaterialSourceFile }),
    sourceSlide({ id: "model-day0", sourcePage: "model-day0", title: "模型能力决定 AI Coding 上限，Day 0 让最新模型当天进入企业生产", kicker: "MODEL DAY 0 · 模型与 Agent 适配", summary: "通过最新模型快速适配机制，让企业研发团队及时获得新的 Coding 能力。", sourceFile: aMaterialSourceFile }),
    sourceSlide({ id: "model-ever", sourcePage: "model-ever", title: "Model Ever 让本地 AI Coding 系统持续获得最新模型能力", kicker: "MODEL EVER · 能力持续更新", summary: "从模型与引擎适配，到企业侧推荐、部署、评测和更新的完整闭环。", sourceFile: aMaterialSourceFile }),
    sourceSlide({ id: "coding-helper", sourcePage: "coding-helper", title: "Coding Helper：10 分钟完成 Agent 安装与模型接入", kicker: "CODING HELPER · 10 分钟快速装配", summary: "将环境检测、Agent 安装、API 配置、模型探测和工具启动串成可执行流程。" }),
    nativeSolutionSlide({
      id: "solution-atm-suite",
      title: "ATM 门户：把 AI 工具、模型与能力装进统一入口",
      summary: "从统一门户、软件中心到模型列表，ATM 将 AI Coding 的入口收敛为可发现、可安装、可运营的企业能力层。",
      render: ({ displayIndex }) => `
        <section class="presentation-slide solution-proof-wall-slide solution-atm-slide">
          ${slideChrome(`F.${displayIndex} · 企业解决方案`)}
          <h2 class="slide-title">ATM 门户：把 AI 工具、模型与能力装进<span>统一入口</span></h2>
          <p class="solution-proof-lead">从统一门户、AI 软件中心到模型列表，ATM 将 AI Coding 的入口收敛为可发现、可安装、可运营的企业能力层。</p>
          <div class="solution-atm-grid">
            <figure class="solution-proof-card"><figcaption><span>01 · CONTROL PLANE</span><strong>ATM 门户</strong></figcaption><div class="solution-proof-image atm-image"><img src="assets/media/solution-atm-portal.png" alt="ATM 门户"></div></figure>
            <figure class="solution-proof-card"><figcaption><span>02 · SOFTWARE CENTER</span><strong>AI 软件中心</strong></figcaption><div class="solution-proof-image"><img src="assets/media/solution-atm-software-center.png" alt="ATM AI 软件中心"></div></figure>
            <figure class="solution-proof-card"><figcaption><span>03 · MODEL CATALOG</span><strong>可访问模型</strong></figcaption><div class="solution-proof-image"><img src="assets/media/solution-atm-model-list.png" alt="ATM 模型列表"></div></figure>
          </div>
          <p class="solution-proof-note"><b>统一入口</b><span>从找到工具，到安装软件、选择模型和复用能力，研发入口进入同一套运营界面。</span></p>
        </section>`
    }),
    sourceSlide({ id: "smart-accel", sourcePage: "smart-accel", title: "Smart 系列加速套件加持，FusionOne AI 提升 AI Coding 吞吐 30%+", kicker: "SMART ACCEL · 推理加速", summary: "来自真实研发负载的持续优化结果，覆盖推理加速与稳定体验。" }),
    nativeSolutionSlide({
      id: "solution-inference-observability",
      title: "推理服务观测：DeepSeek V4 与 GLM 5.2 的运行指标可视化",
      summary: "从调度效率、请求延迟到 Token 吞吐与 KV Cache，统一观测让模型服务的性能与稳定性进入可运营状态。",
      render: ({ displayIndex }) => `
        <section class="presentation-slide solution-proof-wall-slide solution-inference-slide">
          ${slideChrome(`F.${displayIndex} · 企业解决方案`)}
          <h2 class="slide-title">推理服务观测：DeepSeek V4 与 <span>GLM 5.2 的运行指标可视化</span></h2>
          <p class="solution-proof-lead">从调度效率、请求延迟到 Token 吞吐与 KV Cache，统一观测让模型服务的性能与稳定性进入可运营状态。</p>
          <div class="solution-observability-grid">
            <figure class="solution-proof-card"><figcaption><span>01 · DEEPSEEK V4</span><strong>请求与系统状态</strong></figcaption><div class="solution-proof-image"><img src="assets/media/solution-vllm-deepseek-overview.png" alt="DeepSeek V4 vLLM 请求与系统状态观测"></div></figure>
            <figure class="solution-proof-card"><figcaption><span>02 · DEEPSEEK V4</span><strong>Token 与缓存细节</strong></figcaption><div class="solution-proof-image"><img src="assets/media/solution-vllm-deepseek-detail.png" alt="DeepSeek V4 vLLM Token 与缓存细节观测"></div></figure>
            <figure class="solution-proof-card"><figcaption><span>03 · GLM 5.2</span><strong>请求与系统状态</strong></figcaption><div class="solution-proof-image"><img src="assets/media/solution-vllm-glm52-overview.png" alt="GLM 5.2 vLLM 请求与系统状态观测"></div></figure>
            <figure class="solution-proof-card"><figcaption><span>04 · GLM 5.2</span><strong>Token 与缓存细节</strong></figcaption><div class="solution-proof-image"><img src="assets/media/solution-vllm-glm52-detail.png" alt="GLM 5.2 vLLM Token 与缓存细节观测"></div></figure>
          </div>
          <p class="solution-proof-note"><b>统一观测</b><span>把请求、吞吐、延迟与缓存状态放到同一条性能诊断链路上。</span></p>
        </section>`
    }),
    sourceSlide({ id: "smart-qos", sourcePage: "smart-qos", title: "SmartQoS 保障高峰期核心 Coding 任务体验不降级", kicker: "SMART QOS · 高峰体验保障", summary: "通过会话级与密钥级优先调度，保障核心任务和 VIP 用户的稳定体验。", sourceFile: aMaterialSourceFile }),
    sourceSlide({ id: "smart-scenario", sourcePage: "smart-scenario", title: "关键团队与紧急项目，在高峰期获得稳定资源", kicker: "SCENARIO PRIORITY · 关键团队与紧急项目", summary: "用请求优先级和 Token 使用保障，让关键任务持续推进。" }),
    nativeSolutionSlide({
      id: "roi-tokenops",
      title: "Token 用量可见可控，私有化算力才能稳定运营",
      summary: "把组织总量与个人使用放在同一张账本里，Token 才能被度量、分配与治理。",
      render: ({ displayIndex }) => `
        <section class="presentation-slide solution-proof-wall-slide solution-token-slide">
          ${slideChrome(`F.${displayIndex} · 企业解决方案`)}
          <h2 class="slide-title">Token 用量可见可控，<span>私有化算力才能稳定运营</span></h2>
          <p class="solution-proof-lead">把组织总量与个人使用放在同一张账本里，Token 才能被度量、分配与治理。</p>
          <div class="solution-token-pair">
            <figure class="solution-proof-card"><figcaption><span>01 · ORGANIZATION VIEW</span><strong>Token 消耗统计</strong></figcaption><div class="solution-proof-image"><img src="assets/media/solution-token-dashboard.png" alt="Token 消耗统计"></div></figure>
            <figure class="solution-proof-card"><figcaption><span>02 · INDIVIDUAL VIEW</span><strong>个人 Token 用量</strong></figcaption><div class="solution-proof-image token-personal-image"><img src="assets/media/solution-token-personal-usage.png" alt="个人 Token 用量"></div></figure>
          </div>
          <p class="solution-proof-note"><b>TokenOps</b><span>组织总量回答资源盘子，个人用量回答使用行为，两层数据共同支撑预算和配额治理。</span></p>
        </section>`
    }),
    sourceSlide({ id: "team-add-solution", sourcePage: "team-add-solution", title: "ADD 将个人使用 AI，升级为团队可复制的研发生产方式", kicker: "ADD · 团队研发范式", summary: "将流程、角色、规约与知识固化为工程资产，支持多人、多 Agent 协同。", sourceFile: aMaterialSourceFile }),
    sourceSlide({ id: "team-quality-knowledge", sourcePage: "team-quality-knowledge", title: "质量守得住、知识沉得下，团队提效才能持续放大", kicker: "QUALITY & KNOWLEDGE · 团队提效双轮驱动", summary: "把质量要求嵌入执行过程，并将工程资产沉淀为可持续复用的能力。", sourceFile: aMaterialSourceFile }),
    sourceSlide({ id: "team-project-proof", sourcePage: "team-project-proof", title: "真实项目验证：研发范式在实践回流中持续演进", kicker: "PRACTICE LOOP · 真实项目验证", summary: "四个内部项目在真实研发场景中持续将反馈、问题和工程纪律回流中央库。" }),
    sourceSlide({ id: "unified-skills", sourcePage: "unified-skills", title: "先提供经实践沉淀的基础 Agent / Skills，让客户少踩坑", kicker: "AGENT / SKILLS · 快速起步", summary: "覆盖需求、设计、开发和代码检视的统一 Skills，帮助客户快速起步。" }),
    nativeSolutionSlide({
      id: "solution-skill-hub",
      title: "Skill 仓库：把可复用能力沉淀为团队资产",
      summary: "将成熟技能按需发现、复用和推广，让 Agent 能力从个人经验进入统一的组织资产库。",
      render: ({ displayIndex }) => `
        <section class="presentation-slide solution-proof-wall-slide solution-skill-hub-slide">
          ${slideChrome(`F.${displayIndex} · 企业解决方案`)}
          <h2 class="slide-title">Skill 仓库：把可复用能力<span>沉淀为团队资产</span></h2>
          <p class="solution-proof-lead">将成熟技能按需发现、复用和推广，让 Agent 能力从个人经验进入统一的组织资产库。</p>
          <div class="solution-skill-hub-layout">
            <aside class="solution-skill-hub-rail">
              <span>SKILL OPERATING LOOP</span><h3>从搜索开始，持续复用</h3>
              <div><b>01</b><strong>发现</strong><p>按场景找到可用技能</p></div>
              <div><b>02</b><strong>复用</strong><p>把成熟能力带入当前任务</p></div>
              <div><b>03</b><strong>沉淀</strong><p>把实践反馈回流仓库</p></div>
            </aside>
            <figure class="solution-skill-hub-figure"><figcaption><span>SKILLHUB · SHARED CAPABILITY CATALOG</span><strong>统一技能仓库</strong></figcaption><div><img src="assets/media/solution-atm-skill-hub.png" alt="SkillHub 技能仓库"></div></figure>
          </div>
          <p class="solution-proof-note"><b>组织资产</b><span>技能仓库让团队不必重复发明同一套 Agent 能力。</span></p>
        </section>`
    }),
    sourceSlide({ id: "deploy-selection", sourcePage: "deploy-selection", title: "按模型规模、并发和团队规模选择部署配置", kicker: "DEPLOYMENT · 配置选型", summary: "用模型规模、典型并发和团队规模帮助客户完成部署配置选型。" }),
    sourceSlide({ id: "reference-desktop-deploy", sourcePage: "reference-desktop-deploy", title: "桌面级部署：FusionXpark 满足 10–20 人团队编程需求", kicker: "DESKTOP DEPLOYMENT · 桌面级部署", summary: "以 FusionXpark 桌面版整合本地模型、Coding Agent 与实施服务，适合 10–20 人团队快速部署和场景验证。", sourceFile: aMaterialSourceFile }),
    sourceSlide({ id: "reference-datacenter-deploy", sourcePage: "reference-datacenter-deploy", title: "数据中心部署，承载规模化 AI Coding 与组织级服务运营", kicker: "DATACENTER DEPLOYMENT · 数据中心部署", summary: "以多元算力和 FusionOne AI Foundation 构建统一底座，配合实施服务与软件订阅支撑组织级运营。", sourceFile: aMaterialSourceFile })
  ];
}());
