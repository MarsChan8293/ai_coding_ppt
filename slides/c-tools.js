/* C · 模型与工具。板块内页面顺序即页面库顺序；页面 ID 须保持稳定。 */
window.sectionSlides = [
  ...(window.sectionSlides || []),
  {
    id: "tools-three-layers",
    section: "tools",
    title: "模型、Agent 与 Skill 是三层",
    summary: "能力、工作台和团队经验并不是同一件事；先分层，再选工具。",
    theme: {"paper":"#f4f7fc","ink":"#132544","accent":"#2563eb"},
    render: () => `
      <section class="presentation-slide tool-ecosystem-slide c-strategy-slide c-solution-slide">
        ${slideChrome("C.1 · 模型与工具")}
        <h2 class="slide-title">先分清三层，再问<span>哪种组合适合任务</span></h2>
        <p class="slide-subtitle">同一个模型放进不同 Agent，体验和安全边界会不同；同一个 Agent 配上不同模型，速度、能力和成本也会变化。</p>
        <div class="c-redesign-layout c1-architecture">
          <aside class="c1-connector" aria-label="MCP 连接边界"><span>CONNECT</span><strong>MCP</strong><i>连接<br>边界</i></aside>
          <section class="c1-layer-stack" aria-label="模型、Agent 与 Skill 的三层架构">
            <article class="c1-layer c1-model">
              <header><span>01 · MODEL</span><b>主责：生成</b></header>
              <div><h3>模型</h3><p>理解、推理与生成：Claude、GPT、Gemini、DeepSeek、GLM、Kimi 等。</p></div>
              <footer><span>输入：任务 + 上下文</span><i>→</i><strong>候选判断与内容</strong></footer>
            </article>
            <article class="c1-layer c1-agent">
              <header><span>02 · AGENT / HARNESS</span><b>主责：行动</b></header>
              <div><h3>Agent 工作台</h3><p>组织上下文、调用工具、执行循环：OpenCode、Claude Code、Codex CLI 等。</p></div>
              <footer><span>输入：事实 + 计划</span><i>→</i><strong>动作、状态与反馈</strong></footer>
            </article>
            <article class="c1-layer c1-skill">
              <header><span>03 · REUSABLE EXPERIENCE</span><b>主责：复用</b></header>
              <div><h3>Skill 与项目规则</h3><p>把验证过的步骤、边界和验收封装为可维护的团队经验。</p></div>
              <footer><span>输入：重复任务</span><i>→</i><strong>稳定流程与证据</strong></footer>
            </article>
          </section>
          <aside class="c1-boundary-rail">
            <span>FIRST DESIGN</span><h3>先画出<br><b>四条边界</b></h3>
            <div><b>01</b><p>数据能否出网？</p></div>
            <div><b>02</b><p>模型从哪里调用？</p></div>
            <div><b>03</b><p>凭证怎样托管？</p></div>
            <div><b>04</b><p>哪些命令必须审批？</p></div>
            <footer>Subagent 是 Agent 内部编排，不是第四层。</footer>
          </aside>
        </div>
        <p class="c-value-strip c1-value"><b>组合原则</b>　模型提供能力，Agent 把能力放入环境，Skill 把验证过的工程方法留下来；不能用同一个评分替代三层决策。</p>
        <p class="c-source-note">来源：lessons/tools/01-map.mdx、05-agent-subagents.mdx、06-mcp.mdx｜更新：2026-07-30｜说明：概念责任映射，不代表产品能力排名。</p>
      </section>`
  },
  {
    id: "tools-private-model-benchmark",
    section: "tools",
    title: "模型能力已不再是私有化部署的主要短板",
    summary: "以工程基准与前端盲测快照，对照闭源与开放权重模型在 Coding Agent 场景中的能力进展。",
    theme: {"paper":"#f5f8fc","ink":"#12203b","accent":"#1768f2"},
    render: () => `
      <section class="presentation-slide model-snapshot-slide c-strategy-slide c-solution-slide">
        ${slideChrome("C.2 · 模型与工具")}
        <h2 class="slide-title">模型能力已不再是私有化部署的<span>主要短板</span></h2>
        <p class="slide-subtitle">SWE-bench Verified 衡量仓库问题修复，Terminal-Bench 衡量终端执行，Frontend Code Arena 衡量前端盲测偏好；三种口径需分别解读。</p>
        <div class="model-snapshot-layout c-redesign-layout c2-benchmark-layout">
          <section class="c2-scoreboard">
            <div class="c2-spotlight" aria-label="三个基准的关键读数">
              <article><span>FRONTEND · #1</span><strong>1,679</strong><p>Kimi K3 · 前端盲测领先</p></article>
              <article><span>SWE · HIGHEST</span><strong>96.2%</strong><p>GPT-5.6 Sol · 仓库修复率</p></article>
              <article class="c2-reading-rule"><span>READING RULE</span><p>三类基准各自成立，<b>不能合成一个总分</b>。</p></article>
            </div>
            <div class="benchmark-table" role="table" aria-label="闭源与开放权重模型的 Coding Agent 基准快照">
              <div class="benchmark-head" role="row"><span>官方模型名称</span><span>SWE-bench<br>Verified</span><span>Terminal-Bench<br>2.1</span><span>Frontend Code Arena<br>2026.07.16 快照</span></div>
              <div class="benchmark-row open kimi" role="row"><div><b>开放权重 · Kimi K3</b><small>Moonshot · 2026.07</small></div><strong>93.4%</strong><strong>88.3%<small>Kimi Code</small></strong><strong>1,679<small>#1</small></strong></div>
              <div class="benchmark-row" role="row"><div><b>闭源 · Claude Fable 5</b><small>Anthropic · 2026.06</small></div><strong>95.0%</strong><strong>88.0%<small>Terminus 2</small></strong><strong>1,631<small>#2</small></strong></div>
              <div class="benchmark-row" role="row"><div><b>闭源 · GPT-5.6 Sol</b><small>OpenAI · xHigh · 2026.03</small></div><strong>96.2%</strong><strong>88.8%<small>Codex</small></strong><strong>1,618<small>#3</small></strong></div>
              <div class="benchmark-row open" role="row"><div><b>开放权重 · GLM-5.2</b><small>Z.ai · Max · MIT · 2026.06</small></div><strong>82.8%</strong><strong>82.7%<small>Claude Code</small></strong><strong>1,587<small>#4</small></strong></div>
              <div class="benchmark-row" role="row"><div><b>闭源 · Claude Opus 4.8</b><small>Anthropic · Thinking · 2026.04</small></div><strong>88.6%</strong><strong>84.6%<small>Terminus 2</small></strong><strong>1,562<small>#5</small></strong></div>
              <div class="benchmark-row open deepseek" role="row"><div><b>开放权重 · DeepSeek-V4-Flash-0731</b><small>DeepSeek · API 正式版 · 2026.07.31</small></div><strong>—<small>未披露</small></strong><strong>82.7<small>官方 Harness</small></strong><strong>—<small>未披露</small></strong></div>
              <p class="c2-deepseek-line"><b>DeepSeek 更新：</b>DeepSWE 54.4、NL2Repo 54.2、Cybergym 76.7、Toolathlon verified 70.3、Agent Last Exam 25.2、Automation Bench 25.1、DSBench-FullStack 68.7、DSBench-Hard 59.6。</p>
            </div>
          </section>
          <aside class="benchmark-reading c2-reading">
            <header><span>POSITIONING · 5 + 1 UPDATE</span><h3>三条证据线，不求一个总分</h3><p>用任务类型选择模型，而不是把异构榜单叠成“综合第一”。</p></header>
            <div class="c2-benchmark-lanes" aria-label="三种基准的领先模型">
              <article><span>SWE 修复</span><div><i style="width:96.2%"></i></div><b>GPT-5.6 Sol · 96.2%</b></article>
              <article><span>终端执行</span><div><i style="width:88.8%"></i></div><b>GPT-5.6 Sol · 88.8%</b></article>
              <article><span>前端盲测</span><div><i style="width:100%"></i></div><b>Kimi K3 · 1,679</b></article>
            </div>
            <div class="benchmark-interpretation"><b>关键洞察</b><p>Kimi K3 在前端盲测领先，但 GPT-5.6 Sol 的 SWE 修复率更高；领先维度取决于任务。</p><b>统计边界</b><p>榜单未披露统一置信区间；五个可比样本、不同 Harness，不能推断因果或总体优劣。</p><b>正式选型</b><p>开放权重模型已进入企业候选区，但仍需要在真实代码仓、权限边界和企业 Harness 中复测。</p></div>
          </aside>
        </div>
        <p class="c-value-strip model-snapshot-value"><b>选型结论</b>　开放权重模型已进入企业候选区，但任务口径、Harness、权限边界与真实代码仓验证仍决定最终选择。</p>
        <p class="c-source-note">来源：Vals / OpenLM、模型方披露、Arena 2026-07-16 快照、DeepSeek API Change Log（2026-07-31）｜更新：2026-07-31｜说明：DeepSeek 正式版评分使用官方 DeepSeek Harness；不同基准与 Harness 不可直接合成为综合分，正式选型仍需企业实测。</p>
      </section>`
  },
  {
    id: "agent-loop",
    section: "tools",
    title: "Agent 不是聊天框：它在环境中循环",
    summary: "任务、上下文、工具与反馈组成一个能对真实工程产生影响的运行闭环。",
    theme: {"paper":"#f4f7fc","ink":"#132544","accent":"#2563eb"},
    render: () => `
      <section class="presentation-slide agent-operating-loop-slide c-strategy-slide c-solution-slide">
        ${slideChrome("C.3 · 模型与工具")}
        <h2 class="slide-title">Agent 的价值不在“回答”，而在围绕事实<span>持续行动与收敛</span></h2>
        <p class="slide-subtitle">文件、命令、测试和 Diff 让下一步基于真实反馈；人保留目标、范围、高风险操作和最终交付的决定权。</p>
        <div class="agent-loop-layout c-redesign-layout c3-swimlane-layout">
          <section class="agent-loop-path c3-workflow-board" aria-label="人机协作的 Agent 工作流">
            <header><span>HUMAN + AGENT SWIMLANE</span><h3>人定义边界，Agent 在事实中执行</h3></header>
            <div class="c3-human-lane"><b>HUMAN CONTROL</b><span>定义目标与范围</span><i>批准计划</i><span>授权高风险操作</span><i>验收或回退</i></div>
            <div class="c3-agent-lane"><b>AGENT LOOP</b><div class="c3-agent-steps">
              <article class="loop-define"><b>01 · INTENT</b><h3>定义任务</h3><p>目标、范围、验收和不能触碰的边界。</p></article><i>→</i>
              <article class="loop-read"><b>02 · CONTEXT</b><h3>读取事实</h3><p>代码、规则、状态与已有决策进入上下文。</p></article><i>→</i>
              <article class="loop-action"><b>03 · ACTION</b><h3>调用工具</h3><p>搜索、修改、运行命令与检查环境。</p></article><i>→</i>
              <article class="loop-verify"><b>04 · EVIDENCE</b><h3>验证反馈</h3><p>测试、日志、Diff 与验收证据决定是否继续。</p></article>
            </div></div>
            <footer class="c3-feedback-loop"><span>测试、日志、Diff 是下一轮的事实输入</span><i>↺</i><b>不满足则回到读取事实</b></footer>
          </section>
          <aside class="agent-decision-panel c3-control-bar">
            <header><span>HUMAN GATES</span><h3>风险越高，人工介入越强</h3></header>
            <div class="c3-risk-controls">
              <div><b>低风险</b><p>人定目标 · Agent 可执行 · 人验收</p></div>
              <div><b>可逆写入</b><p>人审计划 · 授权修改 · 测试必做</p></div>
              <div><b>外部影响</b><p>逐项批准 · 禁止越权 · 双重验收</p></div>
            </div>
            <footer><b>反事实</b><p>没有测试、Diff 或回退路径，同一任务必须上调一级人工控制。</p></footer>
          </aside>
        </div>
        <p class="c-value-strip agent-loop-foot"><b>最小可靠循环</b>　观察事实 → 审查计划 → 授权修改 → 查看 Diff 与测试 → 决定接受、修正或回退。</p>
        <p class="c-source-note">来源：lessons/tools/02-opencode.mdx、05-agent-subagents.mdx｜更新：2026-07-30｜说明：控制强度为治理基线，不代表实测频率。</p>
      </section>`
  },
  {
    id: "tools-personal-choice",
    section: "tools",
    title: "个人选 AI Coding 工具，先选工作方式",
    summary: "用编辑器型与终端型两条路线，对照七款代表工具的体验、优势、约束和适用场景。",
    theme: {"paper":"#f4f7fc","ink":"#132544","accent":"#2563eb"},
    render: () => `
      <section class="presentation-slide personal-tool-choice-slide c-strategy-slide c-solution-slide">
        ${slideChrome("C.4 · 模型与工具")}
        <h2 class="slide-title">个人选工具，不先问“谁最强”，先问<span>怎样工作最顺手</span></h2>
        <p class="slide-subtitle">编辑器型把 AI 放在代码旁边；终端型让 Agent 直接使用 Git、命令和测试。账号、网络和数据边界同样影响真实体验。</p>
        <div class="personal-tool-layout c-redesign-layout c4-route-layout">
          <aside class="c4-start-card"><span>START HERE</span><h3>AI 应该<br>在<span>哪里</span>工作？</h3><p>先选你的操作界面，再比较模型、网络、账号与 API 边界。</p><div><b>代码旁</b><i>EDITOR</i></div><div><b>终端中</b><i>CLI</i></div><footer>同一仓库、同一任务、同一验收标准，才比得出真实差异。</footer></aside>
          <section class="c4-route-lanes" aria-label="编辑器型与终端型工具路线">
            <section class="c4-route c4-editor-route"><header><span>ROUTE A · EDITOR-FIRST</span><h3>编辑器优先</h3><p>适合把 AI 放在代码、Diff 和已有 IDE 工作流旁边。</p></header><div class="tool-choice-grid c4-tool-grid c4-editor-grid">
              <article><div><b>VS Code + Copilot</b><i>EDITOR</i></div><span class="c4-card-model">GPT-5.6 · Claude Sonnet 5</span><p>熟悉工作台 + GitHub 流程</p><footer><b>API</b><span>否 · Copilot 服务</span></footer></article>
              <article><div><b>Cursor</b><i>EDITOR</i></div><span class="c4-card-model">GPT-5.6 · Fable 5 · Gemini 3.6</span><p>Ask、Agent 与 Diff 一体</p><footer><b>API</b><span>部分 · BYOK / 固定 Provider</span></footer></article>
              <article><div><b>TRAE</b><i>EDITOR</i></div><span class="c4-card-model">Doubao-Seed-1.8 · Qwen3.5-Plus</span><p>中文交互与国内网络体验</p><footer><b>API</b><span>否 · 中国版个人；企业版另行配置</span></footer></article>
            </div></section>
            <section class="c4-route c4-terminal-route"><header><span>ROUTE B · TERMINAL-FIRST</span><h3>终端优先</h3><p>适合让 Agent 直接读取仓库、运行命令、测试和 CI。</p></header><div class="tool-choice-grid c4-tool-grid c4-terminal-grid">
              <article><div><b>OpenCode</b><i>CLI</i></div><span class="c4-card-model">GPT-5.6 / Fable 5 / Kimi K3</span><p>过程可观察、兼容企业 API</p><footer><b>API</b><span>是 · Provider / Base URL</span></footer></article>
              <article><div><b>Claude Code</b><i>CLI</i></div><span class="c4-card-model">Claude Fable 5 · Claude Sonnet 5</span><p>跨文件任务与验证循环</p><footer><b>API</b><span>部分 · 环境变量配置</span></footer></article>
              <article><div><b>Codex CLI</b><i>CLI</i></div><span class="c4-card-model">GPT-5.6 Sol · Terra · Luna</span><p>仓库、脚本与 CI 自动化</p><footer><b>API</b><span>否 · OpenAI</span></footer></article>
              <article><div><b>Kimi Code CLI</b><i>CLI</i></div><span class="c4-card-model">Kimi K3 · Kimi K2.6</span><p>中文生态，兼顾 CLI / IDE</p><footer><b>API</b><span>否 · Moonshot</span></footer></article>
            </div></section>
          </section>
        </div>
        <p class="c-value-strip personal-tool-note"><b>个人试用方法</b>　同一公开仓库 × 同一低风险任务 × 同一验收标准；记录完成率、人工纠正次数、命令风险与总成本。</p>
        <p class="c-source-note">来源：lessons/tools/01-map.mdx、03-editor-agents.mdx、04-terminal-agents.mdx、TRAE 官方模型 FAQ / 更新｜更新：2026-08-01｜说明：中国版与国际版模型清单不同；Claude Code 自定义 API 需通过环境变量配置；能力随版本、账号和套餐变化。</p>
      </section>`
  },
  {
    id: "skills-concept",
    section: "tools",
    title: "Skill 不是更长的 Prompt，而是可复用的工作方法",
    summary: "解释 Skill 的目录结构、渐进加载机制，以及它与 Prompt、项目规则、MCP 和脚本的边界。",
    theme: {"paper":"#f4f7fc","ink":"#132544","accent":"#2563eb"},
    render: () => `
      <section class="presentation-slide skill-concept-slide c-strategy-slide c-solution-slide">
        ${slideChrome("C.5 · 模型与工具")}
        <h2 class="slide-title">Skill 不是更长的 Prompt，而是<span>可复用的工作方法</span></h2>
        <p class="slide-subtitle">它把触发时机、操作步骤、边界和验收装进一个可审计目录；Agent 只在任务匹配时加载需要的内容。</p>
        <div class="skill-concept-layout c-redesign-layout c5-anatomy-layout">
          <article class="skill-anatomy c5-core-folder"><header><span>THE EXECUTABLE CONTRACT</span><h3>一个 Skill 的核心<br>不是文件夹，而是 <b>SKILL.md</b></h3></header><div class="c5-core-rule"><span>触发</span><i>→</i><span>步骤</span><i>→</i><span>停止</span><i>→</i><span>证据</span></div><div class="skill-tree"><b>github-pages-release-check/</b><p class="required"><i>├─</i><strong>SKILL.md</strong><em>必需 · 何时用、怎么做、何时停止</em></p><p><i>├─</i><strong>scripts/</strong><em>可选 · 确定性的重复操作</em></p><p><i>├─</i><strong>references/</strong><em>可选 · 规范、长文档与错误对照</em></p><p><i>└─</i><strong>assets/</strong><em>可选 · 模板、图标与样例文件</em></p></div><footer>目录用于组织；可审计的触发、范围、步骤、停止条件和验证证据，才让它成为 Skill。</footer></article>
          <section class="skill-loading c5-load-funnel"><header><span>CONTEXT LOAD FUNNEL</span><h3>渐进加载：让上下文只为当前任务付费</h3></header><div class="c5-load-steps"><article><b>01 · DISCOVER</b><strong>先发现</strong><p>只读取名称与描述，判断是否匹配任务。</p><em class="load-band load-low">最小负荷</em></article><i>↓</i><article><b>02 · MATCHED</b><strong>再加载</strong><p>匹配后读取完整 SKILL.md 与边界。</p><em class="load-band load-mid">中等负荷</em></article><i>↓</i><article><b>03 · ON DEMAND</b><strong>按需取用</strong><p>真正需要时才读取脚本、参考和模板。</p><em class="load-band load-high">任务相关负荷</em></article></div></section>
          <section class="skill-boundary-grid c5-boundary-strip"><article><b>PROMPT</b><h3>一次协作</h3><p>描述当前任务、上下文与期望结果。</p></article><article><b>AGENT.md</b><h3>常驻规则</h3><p>每次都适用的仓库约束与工作方式。</p></article><article><b>MCP</b><h3>外部连接</h3><p>让 Agent 使用经授权的数据与系统。</p></article><article><b>SCRIPT</b><h3>确定执行</h3><p>固定输入输出、很少需要判断的操作。</p></article></section>
        </div>
        <p class="c-value-strip skill-concept-note"><b>判断标准</b>　反复出现、包含判断、需要固定验证流程的任务才值得做成 Skill；一次性回答留在对话，固定操作优先写脚本。</p>
        <p class="c-source-note">来源：lessons/tools/07-agent-skills.mdx｜更新：2026-07-30｜说明：负荷带表示相对加载阶段，不是 Token 实测。</p>
      </section>`
  },
  {
    id: "skills-common-map",
    section: "tools",
    title: "常用 Skill 图谱：按高复用任务选择",
    summary: "按文档、数据、设计、测试与工程协作七类任务认识常见 Skill，并保留安装前审计闭环。",
    theme: {"paper":"#f4f7fc","ink":"#132544","accent":"#2563eb"},
    render: () => `
      <section class="presentation-slide skill-map-slide c-strategy-slide c-solution-slide">
        ${slideChrome("C.6 · 模型与工具")}
        <h2 class="slide-title">常用 Skill 不看“热度榜”，看<span>任务是否高频且可验收</span></h2>
        <p class="slide-subtitle">名称会变化，稳定的是任务类型：需要固定工具、检查顺序和产物证据的工作，最适合沉淀为 Skill。</p>
        <div class="skill-map-layout c-redesign-layout c6-adoption-layout">
          <section class="skill-map-grid c6-task-map"><header><span>FROM TASK TO SKILL</span><h3>先从高频任务开始，<b>再检查证据是否可观察</b></h3></header><div class="skill-register">
            <article><span>01</span><h3>文档</h3><b>documents · docx</b><p>文件可打开；版式截图已检查</p><footer>高频 · 易验收</footer></article>
            <article><span>02</span><h3>PDF</h3><b>pdf</b><p>页数、字段与渲染结果正确</p><footer>高频 · 易验收</footer></article>
            <article><span>03</span><h3>表格</h3><b>spreadsheets · xlsx</b><p>公式重算；关键单元格正确</p><footer>高频 · 易验收</footer></article>
            <article><span>04</span><h3>演示</h3><b>presentations · pptx</b><p>导出后逐页视觉检查</p><footer>中频 · 易验收</footer></article>
            <article><span>05</span><h3>前端设计</h3><b>frontend-design</b><p>响应式、键盘与对比度检查</p><footer>高频 · 需人工判断</footer></article>
            <article><span>06</span><h3>浏览器测试</h3><b>webapp-testing · agent-browser</b><p>截图、报告、控制台无错误</p><footer>高频 · 易验收</footer></article>
            <article><span>07</span><h3>工程协作</h3><b>gh-fix-ci · gh-address-comments</b><p>修复有测试；Diff 可审查</p><footer>高频 · 易验收</footer></article>
          </div></section>
          <aside class="skill-audit-flow c6-audit-gates"><b>INSTALL GATE</b><h3>先判断值得，<br>再进入审计</h3><p>高频 + 可验收，才有沉淀价值。</p><div><span>01</span><p><strong>读全量内容</strong>SKILL.md、引用文件与脚本</p></div><i>↓</i><div><span>02</span><p><strong>画权限账单</strong>读、写、Shell、网络与密钥</p></div><i>↓</i><div><span>03</span><p><strong>固定来源版本</strong>仓库、SHA、负责人和撤销方式</p></div><i>↓</i><div><span>04</span><p><strong>小范围试运行</strong>记录读取、命令、修改与验证</p></div><footer>低频或验收不可观察，即使热门也不应优先安装。</footer></aside>
        </div>
        <p class="c-value-strip skill-map-value"><b>引入原则</b>　优先沉淀高频且可验收的任务；任何社区 Skill 都必须经过来源、权限、脚本与小范围试运行审计。</p>
        <p class="skill-map-note">来源：lessons/tools/07-agent-skills.mdx、08-skill-map.mdx｜更新：2026-07-30｜说明：任务频率与验收清晰度为定性优先级框架；社区 Skill 可能包含提示注入或恶意脚本。</p>
      </section>`
  },
];
