/* G · 内部实践与客户案例。板块内页面顺序即页面库顺序；页面 ID 须保持稳定。 */
window.sectionSlides = [
  ...(window.sectionSlides || []),
  {
    id: "proof-roi",
    section: "proof",
    title: "AI Coding ROI 应从效能与成本、商业价值两个层面评估",
    summary: "用投入回收与增长价值共同评估 AI Coding 的完整 ROI。",
    theme: {"paper":"#f5f8fc","ink":"#12203b","accent":"#1768f2"},
    render: () => `
      <section class="presentation-slide roi-evaluation-slide">
        ${slideChrome("G.1 · 内部实践与客户案例")}
        <h2 class="slide-title">AI Coding ROI 应从<span>效能与成本、商业价值</span>两个层面评估</h2>
        <p class="roi-page-lead">不仅要衡量“节省了多少”，还要衡量“创造了什么”：先算清效能与成本，再评估收入、新品与产品竞争力的增长价值。</p>
        <div class="roi-level-stack"><article class="roi-level roi-efficiency-level"><header class="roi-level-head"><div class="roi-level-title"><b>01</b><div><strong>效能与成本维度</strong><span>回答投入是否值得</span></div></div><em>EFFICIENCY &amp; COST</em></header><div class="roi-efficiency-body"><div class="roi-core-formula"><strong>ROI = 年提效收益 ÷ 年总投入</strong><span>以试点实测的端到端提效率为基线</span></div><div class="roi-metric-pair"><div><small>年提效收益</small><b>≈ ¥600万 / 年</b><span>100 人 × 人均 ¥30 万 / 年 × 提效 20%</span></div><div><small>年总投入</small><b>≈ ¥112万 / 年</b><span>硬件年摊销 + 电费运维 + 软件与服务</span></div></div><div class="roi-payback"><small>样例结论</small><strong>投入当年回正</strong><span>ROI 显著为正</span></div></div><div class="roi-baseline-strip"><strong>评估原则</strong><span>上线前后持续对比需求交付周期、代码生成占比、检视采纳率与端到端效率，使用客户自身试点数据复核。</span></div></article><article class="roi-level roi-business-level"><header class="roi-level-head"><div class="roi-level-title"><b>02</b><div><strong>商业维度</strong><span>回答 AI Coding 是否创造增长</span></div></div><em>BUSINESS GROWTH</em></header><div class="roi-business-grid"><div class="roi-business-item"><span>01</span><strong>直接创收</strong><p>将 AI 能力嵌入产品与服务，形成智能化功能、增值服务或可销售解决方案，直接带来新增合同与服务收入。</p></div><div class="roi-business-item"><span>02</span><strong>新品研发</strong><p>缩短从概念验证、原型到首版交付的周期，以更低成本并行验证更多机会，加快新品上市并提高创新成功率。</p></div><div class="roi-business-item"><span>03</span><strong>既有产品竞争力提升</strong><p>加快功能迭代、缺陷修复和客户需求响应，持续提升体验与交付速度，增强续约、增购和市场竞争力。</p></div></div><footer class="roi-total-value"><strong>完整 ROI</strong><span>降本增效的确定性</span><i>+</i><span>商业增长的上行空间</span></footer></article></div>
      </section>`
  },
  {
    id: "proof-guangdong-case",
    section: "proof",
    title: "广东移动网管：企业级 AI Coding 研发提效平台",
    summary: "用长代码理解、高峰并发与安全运营三组挑战验证方案能否进入真实研发。",
    theme: {"paper":"#f5f8fc","ink":"#12203b","accent":"#1768f2"},
    render: () => `
      <section class="presentation-slide case-study-slide">
        ${slideChrome("G.2 · 内部实践与客户案例")}
        <h2 class="slide-title">广东移动网管：建设企业级 <span>AI Coding 研发提效平台</span></h2>
        <p class="slide-subtitle">依托 FusionOne AI 一体化解决方案和 DeepSeek V4 Flash 大模型，构建安全可控、稳定高效、支持规模化研发使用的企业级 AI Coding 基础设施。</p>
        <div class="case-kpis"><div><b>Day 0</b><span>适配最新大模型，持续获得领先 Coding 能力</span></div><div><b>40%</b><span>首 Token 时延降低：20 秒缩短至 12 秒</span></div><div><b>67%</b><span>多人稳定并发能力提升，保障高峰任务不中断</span></div></div>
        <p class="case-context"><b>建设背景及方案概况</b>　广东移动网管团队覆盖自动化脚本、运维平台、SQL 与数据处理、历史代码维护、故障分析和日志处理等场景。团队将零散工具试用升级为全域赋能的研发提效平台。</p>
        <div class="case-matrix">
          <div class="case-row"><article class="case-problem"><b>挑战一 · 长代码理解慢</b><p>64K / 128K 长代码仓分析、多文件关联理解和历史代码维护等待时间长，复杂任务输出频繁中断、完成率低。</p></article><article class="case-solution"><b>FusionOne AI 自研推理加速引擎</b><p>针对长上下文深度优化，采用 PD 分离调度、KV-Cache 稀疏算法等技术，提升计算效率；相同配置下有效吞吐提升 1–3 倍。</p><span>PD 分离调度</span><span>KV-Cache 稀疏</span><span>吞吐提升 1–3 倍</span></article><article class="case-value"><strong>TTFT −40%</strong><b>复杂 Coding 体验明显改善</b><p>首字符生成由 20 秒降至 12 秒，大型代码仓、跨文件联查和复杂历史代码维护更流畅稳定。</p></article></div>
          <div class="case-row"><article class="case-problem"><b>挑战二 · 高峰期资源抢占</b><p>集中研发和交付高峰期，多人同时调用导致推理排队、IDE 卡顿和任务超时，核心研发任务难以连续推进。</p></article><article class="case-solution"><b>SmartQoS 多并发优先级调度</b><p>从请求优先级、全栈智能感知到 VIP 用户保障，构建生产级服务治理机制，优先保障关键研发调用。</p><span>请求优先级</span><span>VIP 保障</span><span>全栈智能感知</span></article><article class="case-value"><strong>稳定并发 +67%</strong><b>保障核心调用不中断</b><p>编码高峰期服务不中断、研发任务无卡顿，全面适配企业级 AI Coding 研发负载。</p></article></div>
          <div class="case-row"><article class="case-problem"><b>挑战三 · 安全与运营成本</b><p>公有云存在核心代码外泄、合规风险和 Token 成本持续上涨问题，也难以沉淀企业知识、代码规范和历史项目经验。</p></article><article class="case-solution"><b>构建企业级 AI Coding 基础设施</b><p>通过私有化部署实现数据安全、模型自主可控和统一运维，盘活硬件资源、统一调度推理算力。</p><span>数据不出域</span><span>模型自主可控</span><span>企业统一运营</span></article><article class="case-value"><b>安全可控，降低长期成本</b><p>避免 Token 费用持续增长，提升资源利用率，降低长期 AI 运营成本，并沉淀企业研发资产。</p></article></div>
        </div>
        <p class="case-final">从零散工具试用，升级为安全可控、稳定高效、规模化使用的研发提效平台</p>
      </section>`
  },
  {
    id: "proof-practice-infrastructure",
    section: "proof",
    title: "两年实践，AI Coding 已成为研发基础设施",
    summary: "规模化采用、研发效能看板与 FusionOne AI Coding 方案架构。",
    theme: {"paper":"#f5f8fc","ink":"#12203b","accent":"#1768f2"},
    render: () => `
      <section class="presentation-slide practice-infrastructure-slide">
        ${slideChrome("G.3 · 内部实践与客户案例")}
        <h2 class="slide-title">两年实践，AI Coding 已成为<span>研发基础设施</span></h2>
        <p class="practice-page-lead">覆盖 100% 的超聚变软件研发人员，人均 E2E 代码产出量提升 30%+</p>
        <div class="practice-infrastructure-layout"><div class="practice-left"><div class="practice-metrics"><div class="practice-metric"><strong>100%</strong><span>软件工程师使用覆盖率</span><small>FULL COVERAGE</small></div><div class="practice-metric"><strong>52.4%</strong><span>AI 代码生成率</span><small>CODE GENERATION</small></div><div class="practice-metric"><strong>150+</strong><span>Skills 落地</span><small>REUSABLE SKILLS</small></div><div class="practice-metric"><strong>65%</strong><span>AI 检视意见采纳率</span><small>REVIEW ACCEPTANCE</small></div><div class="practice-metric"><strong>10%+</strong><span>版本交付质量提升</span><small>DELIVERY QUALITY</small></div><div class="practice-metric"><strong>30%+</strong><span>人均代码产出量提升</span><small>E2E OUTPUT</small></div></div><div class="practice-dashboard"><div class="practice-panel-head"><strong>研发效能看板</strong><span>USAGE · OUTPUT · QUALITY</span></div><div class="practice-dashboard-image"><img src="assets/media/practice-efficiency-dashboard.jpg" alt="超聚变 AI Coding 研发效能看板"></div></div></div><aside class="practice-architecture"><div class="practice-panel-head"><strong>基于 FusionOne AI 构建 AI Coding 方案</strong><span>BUSINESS · AGENT · MAAS · XPU · COMPUTE</span></div><div class="practice-native-arch" aria-label="FusionOne AI Coding 方案架构"><section class="practice-arch-layer"><div class="practice-layer-rail"><b>业务领域</b><span>场景适配</span></div><div class="practice-domain-grid"><div><strong>BMC &amp; BIOS</strong><span>硬件强依赖 · 高稳定</span><em>C / 汇编</em></div><div><strong>OS 业务</strong><span>高性能 · 底层控制</span><em>C / C++ / Rust</em></div><div><strong>云智解决方案</strong><span>分布式 · 快速迭代</span><em>Go / Java / Python</em></div></div></section><section class="practice-arch-layer"><div class="practice-layer-rail"><b>研发 Agent</b><span>全场景覆盖</span></div><div class="practice-agent-content"><div class="practice-agent-grid"><div><strong>设计助手</strong><span>设计文档 · 接口文档 · 时序图</span></div><div><strong>开发助手</strong><span>代码生成 · 注释 · 优化</span></div><div><strong>测试助手</strong><span>测试脚本 · 单元测试</span></div><div><strong>运维助手</strong><span>问题单分析</span></div></div><div class="practice-agent-foundation"><div><b>基础组件</b><span>效能看板 · 部门 RAG 知识库</span></div><div class="practice-coding-agent"><b>Coding Agent</b><span>VS Code · Claude Code · OpenCode · Agent 扩展</span></div></div></div></section><section class="practice-arch-layer practice-platform-layer"><div class="practice-layer-rail"><b>FusionOne AI</b><span>MaaS 底座</span></div><div class="practice-platform-stack"><div class="practice-platform-row"><b>MaaS 能力</b><div><span>推理引擎与加速</span><span>模型服务</span><span>模型管理</span><span>运维监控</span></div></div><div class="practice-platform-row practice-model-row"><b>多模型 · 15+</b><p>GLM-4.7-FP8 · <strong>GLM-5.2</strong> · <strong>DeepSeek-V4-FLASH</strong> · Qwen3.6-27B · Embedding · bge-m3</p></div><div class="practice-platform-row"><b>XPU Engine</b><div><span>发现</span><span>资源分配</span><span>切分复用</span><span>智能调度</span><span>E2E 可视</span></div></div><div class="practice-platform-row practice-compute-row"><b>多样算力</b><div><span><b>G8600 V7</b></span><span class="practice-kunlun"><b>KunLun G8680 V3</b></span><span><b>G5500 V7</b></span></div></div></div></section></div></aside></div>
      </section>`
  }
];
