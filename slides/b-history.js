/* B · 历史与趋势。板块内页面顺序即页面库顺序；页面 ID 须保持稳定。 */
window.sectionSlides = [
  ...(window.sectionSlides || []),
  {
    id: "history-vibe-coding-timeline",
    section: "history",
    title: "从 Vibe Coding 到 Agentic Engineering：工作单位如何变大",
    summary: "以六个关键节点串起工作单位的变化：从自然语言原型，到可审查、可回滚的工程协作。",
    theme: { paper: "#f5f8fc", ink: "#12203b", accent: "#1768f2" },
    render: () => `
      <section class="presentation-slide history-strategy-slide vibe-history-slide history-journey-slide">
        ${slideChrome("B.1 · 历史与趋势")}
        <h2 class="slide-title">从 <span>Vibe Coding</span> 到 Agentic Engineering</h2>
        <p class="slide-subtitle">决定性变化并非某个模型发布，而是人的<strong>工作单位</strong>从“做出可见效果”扩大为“交付可审查结果”，控制方式也随之从即时反馈升级为测试、权限、审查与回滚。</p>

        <section class="history-journey-board" aria-label="从 Vibe Coding 到 Agentic Engineering 的关键演进">
          <header><span>01 · KEY TURNING POINTS</span><strong>AI Coding 的演进，不是工具替换，而是<strong>工作单位与工程约束同步变大</strong></strong><small>每个节点都让 Agent 多承担一部分“读、改、跑、验”的真实工程责任。</small></header>
          <div class="history-journey-track">
            <article class="history-journey-node"><time>2025.02</time><i aria-hidden="true"></i><span>LANGUAGE</span><h3>Vibe Coding 被命名</h3><p>自然语言原型进入非研发角色，先把想法变成可见效果。</p></article>
            <article class="history-journey-node"><time>2025.02</time><i aria-hidden="true"></i><span>HARNESS</span><h3>终端 Agent 出现</h3><p>读仓、改文件、跑命令与测试开始连成一个执行循环。</p></article>
            <article class="history-journey-node"><time>2025.05–06</time><i aria-hidden="true"></i><span>FORM FACTOR</span><h3>Coding Agent 分化</h3><p>本地、云端与 PR Agent 分别进入不同研发协作环节。</p></article>
            <article class="history-journey-node"><time>2025.07–08</time><i aria-hidden="true"></i><span>MODULARITY</span><h3>模型与工作台解耦</h3><p>模型、执行环境和工程流程可以分别选择与验证。</p></article>
            <article class="history-journey-node"><time>2025.12</time><i aria-hidden="true"></i><span>METHOD</span><h3>Skills 成为标准</h3><p>团队经验开始可版本化、可审计地复用，不再只依赖个人提示词。</p></article>
            <article class="history-journey-node is-now"><time>2026 →</time><i aria-hidden="true"></i><span>GOVERNANCE</span><h3>Agentic Engineering</h3><p>多 Agent、验证、审查与审批共同组成持续交付系统。</p></article>
          </div>
        </section>

        <section class="history-workunit-transition" aria-label="工作单位和控制方式的演进">
          <header><span>02 · WHAT CHANGES FOR THE TEAM</span><strong>工作单位变大后，人的职责从“输入代码”转向“设计可验证的交付系统”</strong></header>
          <div>
            <article><b>VIBE</b><strong>可见原型</strong><p>用语言表达意图，快速验证方向。</p></article>
            <i aria-hidden="true">→</i>
            <article><b>AGENT</b><strong>工程任务</strong><p>定义目标、边界与验收条件。</p></article>
            <i aria-hidden="true">→</i>
            <article class="is-destination"><b>ENGINEERING</b><strong>协作交付</strong><p>用测试、权限、审查与回滚承担质量责任。</p></article>
          </div>
        </section>
        <div class="history-conclusion-strip"><span>STRATEGIC TAKEAWAY</span><strong>工作单位越大，团队越要用目标、测试、权限与回滚替代“逐行盯代码”。</strong><i>从 Vibe 到工程化，不是放弃速度，而是升级控制方式。</i></div>
        <p class="history-source-note">来源：lessons/history/01-timeline.mdx、Claude Code / Agent Skills 公开资料｜更新：2026-07-30｜说明：节点用于解释工作方式的演进，不构成单一产品功能或行业市场份额的完整时间线。</p>
      </section>`
  },
  {
    id: "history-agentic-maturity",
    section: "history",
    title: "Coding Agent 技术能力跨越，进入质变时刻",
    summary: "以 Copilot、Agent、Agentic 三阶段路径和五层技术栈，说明 Coding Agent 为何进入可验收交付的质变时刻。",
    theme: { paper: "#f5f8fc", ink: "#12203b", accent: "#1768f2" },
    render: () => `
      <section class="presentation-slide history-strategy-slide agent-maturity-slide maturity-reference-slide">
        ${slideChrome("B.2 · 历史与趋势")}
        <h2 class="slide-title">Coding Agent 技术能力跨越，进入<span>质变时刻</span></h2>
        <div class="maturity-reference-path" aria-label="Coding Agent 能力成熟路径">
          <article class="maturity-reference-stage copilot"><b>01</b><div><span>COPILOT</span><h3>辅助生成</h3><p>人操作，AI 在局部提供建议。</p></div></article><i aria-hidden="true">→</i>
          <article class="maturity-reference-stage agent"><b>02</b><div><span>AGENT</span><h3>任务执行</h3><p>人委托，Agent 完成边界任务。</p></div></article><i aria-hidden="true">→</i>
          <article class="maturity-reference-stage agentic"><b>03</b><div><span>AGENTIC · NOW</span><h3>自主闭环交付</h3><p>人定义目标与验收，Agent 持续执行并收敛。</p></div></article>
        </div>

        <div class="maturity-reference-proof"><strong>Agentic 技术栈已实现从模型能力到工程系统的全链路贯通</strong><span>模型能力 × 上下文 × 运行环境 × 反馈闭环 × 协作复用</span></div>

        <div class="maturity-reference-grid" aria-label="Agentic 技术栈五层能力">
          <article><b>01</b><span>MODEL</span><h3>推理与编码模型</h3><p>理解需求、规划任务、生成与修改工程代码，并能够根据反馈调整行动。</p><em>从预测代码到推理执行</em></article>
          <article><b>02</b><span>CONTEXT</span><h3>Context &amp; Memory</h3><p>理解完整代码仓、架构规范和历史状态，在长任务中持续保持关键上下文。</p><em>从当前文件到工程全局</em></article>
          <article><b>03</b><span>HARNESS</span><h3>Harness &amp; MCP</h3><p>通过受控运行环境和标准协议连接文件、终端、数据库、平台与外部工具。</p><em>从文本回答到真实行动</em></article>
          <article><b>04</b><span>LOOP</span><h3>Loop &amp; Verifier</h3><p>形成 Plan–Act–Observe–Verify–Recover 闭环，用测试与规则驱动自我纠错。</p><em>从一次生成到持续收敛</em></article>
          <article><b>05</b><span>COORDINATION</span><h3>Skills &amp; Subagents</h3><p>把专业经验封装为可复用能力，并通过任务分解、角色协作和并行执行扩展能力。</p><em>从单 Agent 到数字研发团队</em></article>
        </div>
        <div class="maturity-reference-arrival"><span>FULL-STACK MATURITY</span><strong>模型智能、工程上下文、开放工具生态、闭环验证与多 Agent 协同已完成体系化融合，Coding Agent 正从效率工具跃迁为新一代软件工程基础设施。</strong><b>AI CODING ERA</b></div>
        <p class="maturity-reference-source">来源：AI-Coding 解决方案客户交流材料第 4 页｜更新：2026-07-30｜说明：三阶段与五层技术栈为能力成熟度框架，用于说明系统条件；不构成单一模型或工具的统一性能排名。</p>
      </section>`
  },
  {
    id: "history-market-evidence",
    section: "history",
    title: "AI Coding 已成为 Agent 落地价值最清晰的场景",
    summary: "以真实工具调用、公开代码产出、头部团队实践和商业化信号构成四段市场证据链。",
    theme: { paper: "#f5f8fc", ink: "#12203b", accent: "#1768f2" },
    render: () => `
      <section class="presentation-slide history-strategy-slide market-evidence-slide market-reference-slide">
        ${slideChrome("B.3 · 历史与趋势")}
        <h2 class="slide-title">AI Coding 已成为 Agent 落地价值最清晰的场景</h2>
        <div class="market-reference-layout">
          <figure class="market-reference-domain">
            <header><span>01 · OBSERVED AGENT TOOL USE</span><h3>软件工程占 Agent 工具调用的 <b>49.7%</b></h3><p>显著领先其他领域｜样本：998,481 次公开 API 工具调用</p></header>
            <div class="market-reference-chart"><img src="assets/media/anthropic-agent-domains.png" alt="Anthropic：不同领域的 Agent 工具调用分布，软件工程占比 49.7%"></div>
            <figcaption><strong>软件工程是 Agent 真实行动最密集的领域</strong><span>这说明执行率最高的任务集中于 Coding，不代表职业替代比例或全行业市场份额。</span></figcaption>
          </figure>

          <div class="market-reference-stack">
            <section class="market-reference-output">
              <span>02 · PUBLIC CODE OUTPUT</span>
              <h3>Claude Code 对公开 GitHub 代码产出的影响正在快速放大</h3>
              <div class="market-share-flow" aria-label="公开 GitHub commits 中 Claude Code 影响占比由 4% 预计上升到 20%">
                <div><b>4%</b><small>2025.09 估算<br>公开 commits</small></div><i aria-hidden="true"></i><div class="is-forecast"><b>20%</b><small>预计 2026 年底<br>每 5 个 commit 中有 1 个</small></div>
              </div>
              <p>SemiAnalysis 预测｜从工具使用率，走向对全球代码供给的直接影响。</p>
            </section>

            <section class="market-reference-teams">
              <header><span>03 · OPERATING PROOF</span><h3>头部公司已进入“AI 主导代码生产”阶段</h3></header>
              <div class="market-company-grid">
                <article><strong>字节跳动 TRAE · 90%+</strong><p>团队代码由 AI 编写，生产力提升 43%；过去一年 AI 代码贡献率增长约 6 倍。</p><small>公开分享｜2026.06</small></article>
                <article><strong>Anthropic · 80%+ / 8×</strong><p>超过 80% 合并代码由 Claude 编写；典型工程师日均合并代码量达到 2024 年的 8 倍。</p><small>团队实践更新｜2026 Q2</small></article>
              </div>
            </section>

            <section class="market-reference-arr">
              <div><b>$2.5B+</b><span>ARR</span></div>
              <article><span>04 · COMMERCIAL SIGNAL</span><h3>Claude Code 年化收入</h3><p>发布后 6 个月即突破 10 亿美元，随后继续翻倍增长，成为软件史上增长最快的产品之一。</p></article>
            </section>
          </div>
        </div>
        <p class="market-reference-source">来源：Anthropic《Measuring AI agent autonomy in practice》（2026.02）及 Claude Code 团队实践更新（2026.05、2026 Q2）；SemiAnalysis《Claude Code Is The Inflection Point》（2025.09）；字节跳动 TRAE 团队公开分享（2026.06）；Anthropic 官方公告（2025.12、2026.05）。｜说明：不同来源的平台、样本与时间窗不一致；公司披露含自报与预测，不可相加或外推为全行业因果结论。</p>
      </section>`
  }
];
