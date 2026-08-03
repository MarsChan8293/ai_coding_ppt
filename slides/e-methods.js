/* D · 工程方法。按“演进 → 失败模式 → 控制面 → 护栏 → 共识 → 边界”组织。 */
(function registerEngineeringMethodSlides() {
  const sourceNote = "来源：Harness Engineering 工程方法材料（本地重构）｜更新：2026-07-30｜说明：方法框架，不含统计性效果宣称。";
  const runoobNote = "来源：菜鸟教程《Harness Engineering（驾驭工程）》｜更新：2026-08-01｜说明：内容为方法归纳，项目应按风险选择实现方式。";
  const loopNote = "来源：菜鸟教程《Loop Engineering（循环工程）》｜更新：2026-08-01｜说明：内容为方法归纳，模式与自动化范围应按任务风险和验收条件选择。";
  const theme = { paper: "#f5f8fc", ink: "#12203b", accent: "#1768f2" };

  const methodSlide = ({ id, index, title, slideTitle = title, summary, layout, value, footnote = sourceNote, className = "", chapterTag = "HARNESS ENGINEERING" }) => {
    const chapter = index > 1
      ? `D.${index} · 工程方法 <span class="method-subchapter">${chapterTag}</span>`
      : `D.${index} · 工程方法`;

    return {
      id,
      section: "methods",
      title,
      summary,
      theme,
      render: () => `
        <section class="presentation-slide methods-solution-slide ${className}">
          ${slideChrome(chapter)}
          <h2 class="slide-title">${slideTitle}</h2>
          <p class="slide-subtitle">${summary}</p>
          <div class="method-body">${layout}</div>
          <p class="method-value"><b>业务价值</b><span>${value}</span></p>
          <footer class="method-footnote">${footnote}</footer>
        </section>`
    };
  };

  window.sectionSlides = [
    ...(window.sectionSlides || []),
    methodSlide({
      id: "methods-engineering-evolution",
      index: 1,
      className: "methods-evolution-slide",
      title: "Agent 工程的重心，正从写好提示词走向设计可控系统",
      slideTitle: "Agent 工程的重心，正从写好提示词走向<span>设计可控系统</span>",
      summary: "四个公开节点依次把关注点从任务表达，扩展到信息、运行环境和可验证循环；它们是能力演进，不是彼此替代。",
      value: "先说清任务，再设计信息、环境与循环，团队才获得可复用、可治理的 Agent 交付能力。",
      footnote: "来源：Liu et al. 2021 · Anthropic 2025-09-29 · OpenAI 2026-02-11 · IBM 2026-07-17｜说明：公开概念锚点，不等同于术语发明时间。",
      layout: `
        <section class="method-evolution-layout">
          <div class="method-evolution-timeline">
            <header><span>PUBLIC CONCEPT MILESTONES</span><strong>工程对象从“一次回答”逐步扩展为“可控交付系统”</strong></header>
            <div class="method-evolution-stages">
              <article><time>2021.07</time><div><span>PHASE 01 · PROMPT</span><h3>Prompt Engineering</h3><p>把目标、范围、约束和验收写成一次可执行的任务描述。</p></div><b>单次任务</b></article>
              <i>→</i>
              <article><time>2025.09</time><div><span>PHASE 02 · CONTEXT</span><h3>Context Engineering</h3><p>管理 Agent 在决策时看到的相关事实、规则、工具结果与记忆。</p></div><b>信息环境</b></article>
              <i>→</i>
              <article><time>2026.02</time><div><span>PHASE 03 · HARNESS</span><h3>Harness Engineering</h3><p>把项目知识、工具、权限、反馈和恢复组织为可靠工作环境。</p></div><b>工程环境</b></article>
              <i>→</i>
              <article><time>2026.07</time><div><span>PHASE 04 · LOOP</span><h3>Loop Engineering</h3><p>以触发、观察、验证、停止与状态记忆形成可审查的工作循环。</p></div><b>可验证循环</b></article>
            </div>
            <div class="method-capability-rail"><span>能力递进</span><b>表达</b><i>→</i><b>判断</b><i>→</i><b>执行</b><i>→</i><b>交付</b></div>
          </div>
        </section>`
    }),
    methodSlide({
      id: "methods-agent-failure-patterns",
      index: 2,
      className: "methods-agent-failure-slide",
      title: "Agent 的三类失败，都是运行环境没有把过程约束好",
      slideTitle: "Agent 的三类失败，都是<span>运行环境没有把过程约束好</span>",
      summary: "长时间运行中，失败往往不是单点输出错误，而是任务拆分、完成判断和端到端验证缺少明确的控制信号。",
      value: "先识别失败模式，再把缺口编码为护栏、反馈或停止条件。",
      footnote: runoobNote,
      layout: `
        <section class="method-agent-failure-layout">
          <div class="method-agent-failure-wall">
            <header><span>AGENT FAILURE MODES</span><strong>长任务最容易出现的三种翻车姿势</strong></header>
            <div class="method-failure-axis"><span>任务拆分</span><i>→</i><span>完成判断</span><i>→</i><span>端到端验证</span></div>
            <div class="method-agent-failure-grid">
              <article><b>01</b><span>ONE-SHOTTING</span><h3>试图一步到位</h3><p>一个会话承接所有功能，耗尽上下文后留下没有文档的半成品。</p><em>拆分任务 · 持久化状态</em></article>
              <article><b>02</b><span>PREMATURE VICTORY</span><h3>过早宣布胜利</h3><p>看到局部进展就宣布完成，剩余范围没有被重新核对。</p><em>范围清单 · 完成门禁</em></article>
              <article><b>03</b><span>FALSE COMPLETION</span><h3>过早标记完成</h3><p>代码或单测通过，却没有做端到端验证，真实路径仍可能不可用。</p><em>独立验证 · 证据留痕</em></article>
            </div>
            <div class="method-agent-failure-foot"><b>放大效应</b><span>Agent 会复制代码库中的好模式，也会高速复制坏模式与架构漂移。</span></div>
          </div>
          <aside class="method-agent-failure-response">
            <span>CONTROL RESPONSE</span><h3>把“失败症状”翻译成<span>环境缺口</span></h3>
            <div><b>范围缺口</b><p>任务没有被拆成可恢复的阶段与工件。</p></div>
            <div><b>判断缺口</b><p>没有独立信号告诉 Agent 何时可以宣布完成。</p></div>
            <div><b>证据缺口</b><p>验证停留在局部命令，没有覆盖真实用户路径。</p></div>
            <footer>失败不是结案信息，而是下一条工程护栏的输入。</footer>
          </aside>
        </section>`
    }),
    methodSlide({
      id: "methods-control-loop",
      index: 3,
      className: "methods-foundation-slide",
      title: "可靠交付 = 模型能力 + Harness 运行环境",
      slideTitle: "可靠交付 = 模型能力 + <span>Harness 运行环境</span>",
      summary: "Prompt 只是一次输入；稳定的工程交付来自事实来源、边界、验证与恢复机制共同作用。",
      value: "把偶发的“好回答”转化为团队可复用、可审计的交付过程。",
      layout: `
        <section class="method-foundation-layout">
          <div class="method-architecture-card">
            <header><span>工程能力架构</span><strong>从指令输入，到可验证交付</strong></header>
            <div class="method-architecture-stack">
              <article class="arch-intent"><div><b>01</b><strong>任务意图</strong><span>Prompt · 当前请求</span></div><p>说明此刻想做什么，但不足以支撑多角色协作。</p></article>
              <i>↓</i>
              <article class="arch-context"><div><b>02</b><strong>上下文事实</strong><span>Context · 规格 / 代码 / 决策</span></div><p>让模型基于共享事实判断，而不是重新猜测。</p></article>
              <i>↓</i>
              <article class="arch-harness"><div><b>03</b><strong>Harness 控制面</strong><span>流程 / 权限 / 验证 / 审批 / 记忆</span></div><p>将能力编排为可停止、可回滚、可证明的执行。</p></article>
            </div>
            <div class="method-foundation-base"><b>MODEL 上限</b><span>·</span><strong>HARNESS 兑现</strong></div>
          </div>
          <aside class="method-delivery-card">
            <span>ENGINEERING PROBES</span><h3>每项能力都要回答<br><em>三个工程问题</em></h3>
            <ol><li><b>事实</b><span>Agent 看到了什么可引用的依据？</span></li><li><b>边界</b><span>它被允许做什么，又必须在哪停下？</span></li><li><b>证明</b><span>谁以何种独立机制确认交付完成？</span></li></ol>
            <footer>MODEL 提供能力上限 · HARNESS 决定稳定兑现</footer>
          </aside>
        </section>`
    }),
    methodSlide({
      id: "methods-harness-guardrails",
      index: 4,
      className: "methods-four-guardrails-slide",
      title: "驾驭工程的四大护栏，让 Agent 在边界内稳定执行",
      slideTitle: "驾驭工程的四大护栏，让 Agent <span>在边界内稳定执行</span>",
      summary: "上下文、架构约束、反馈回路与熵管理共同组成运行控制系统；每层都有触发条件、执行位置与可追溯证据。",
      value: "护栏不是减少智能，而是把不可控重试与长期系统衰减转成可治理的工程动作。",
      footnote: runoobNote,
      layout: `
        <section class="method-guardrail-blueprint">
          <div class="method-guardrail-map">
            <header><span>FOUR GUARDRAILS</span><strong>让 Agent 能力在工程环境中稳定兑现</strong></header>
            <div class="method-guardrail-grid">
              <article class="guardrail-context"><b>01 · CONTEXT</b><h3>上下文工程</h3><p>提供小而稳定的入口，再按任务检索相关规范、代码和证据。</p><em>入口 + 按需检索</em></article>
              <article class="guardrail-architecture"><b>02 · ARCHITECTURE</b><h3>架构约束</h3><p>把分层依赖、权限与禁区写进可执行规则，越界即被阻断。</p><em>规则 + 门禁</em></article>
              <article class="guardrail-feedback"><b>03 · FEEDBACK</b><h3>反馈回路</h3><p>让测试、审查与运行结果带着原因回流，帮助下一步修正。</p><em>证据 + 回流</em></article>
              <article class="guardrail-entropy"><b>04 · ENTROPY</b><h3>熵管理</h3><p>持续识别技术债、文档陈旧和模式漂移，以小步修复保持系统健康。</p><em>扫描 + 治理</em></article>
            </div>
            <div class="method-guardrail-rail"><b>INVARIANT</b><span>每道护栏都要能被触发、执行并留下证据。</span></div>
          </div>
          <aside class="method-guardrail-runtime">
            <span>CONTROL PLANE</span><h3>把四道护栏<br>嵌入<span>一次执行</span></h3>
            <div class="runtime-chain"><b>FACTS</b><i>→</i><b>AGENT</b><i>→</i><b>TOOLS</b><i>→</i><b>PROOF</b></div>
            <ul><li><b>开始前</b><span>装载最小必要事实与边界。</span></li><li><b>执行中</b><span>在工具、权限和架构约束内行动。</span></li><li><b>结束后</b><span>用独立证据判断完成，并回收问题。</span></li></ul>
            <footer>四层不是四个孤立工具，而是一套持续运转的控制面。</footer>
          </aside>
        </section>`
    }),
    methodSlide({
      id: "methods-industry-consensus",
      index: 5,
      className: "methods-consensus-slide",
      title: "六大行业共识，把 Harness 从理念落到组织动作",
      slideTitle: "六大行业共识，把 Harness 从理念落到<span>组织动作</span>",
      summary: "不同团队反复验证的不是某个模型或 SDK，而是文档、约束、反馈、状态与工程角色必须一起升级。",
      value: "共识的价值在于统一决策语言：先建设控制面，再讨论模型能力上限。",
      footnote: runoobNote,
      layout: `
        <section class="method-consensus-layout">
          <div class="method-consensus-register">
            <header><span>OPERATING CONSENSUS</span><strong>六个共识，六类工程动作</strong></header>
            <div class="method-consensus-grid">
              <article><b>01</b><h3>瓶颈在基础设施</h3><p>模型能力不是唯一变量，工具、文档与验证环境决定兑现程度。</p></article>
              <article><b>02</b><h3>文档必须活着</h3><p>文档应成为反馈循环的一部分，持续被检索、修订与验证。</p></article>
              <article><b>03</b><h3>思考与执行分离</h3><p>复杂任务需要 Orchestrator、Worker 与外部状态共同承载。</p></article>
              <article><b>04</b><h3>上下文不是越多越好</h3><p>上下文是稀缺预算，应按任务动态检索、注入和回收。</p></article>
              <article><b>05</b><h3>约束必须自动化</h3><p>把人工 Review 中稳定的判断编码进 Linter、CI 与类型系统。</p></article>
              <article><b>06</b><h3>工程师成为环境建筑师</h3><p>工作重点从写代码转向设计让 Agent 可靠工作的控制系统。</p></article>
            </div>
            <footer class="method-consensus-thesis"><span>COMMON THESIS</span><b>先建设控制面，再讨论模型能力上限。</b></footer>
          </div>
          <aside class="method-consensus-shift"><span>ROLE SHIFT</span><h3>从代码执行者<br>到<span>环境建筑师</span></h3><div><b>输入</b><p>目标、事实、约束与风险</p></div><div><b>控制</b><p>状态、工具、反馈与门禁</p></div><div><b>输出</b><p>可复验、可追踪的交付证据</p></div><footer>Harness 的交付物，是让下一次执行更可靠。</footer></aside>
        </section>`
    }),
    methodSlide({
      id: "methods-framework-boundary",
      index: 6,
      className: "methods-framework-relation-slide",
      title: "传统框架负责“构建 Agent”，Harness 负责“让它可靠运行”",
      slideTitle: "传统框架负责“构建 Agent”，Harness 负责<span>“让它可靠运行”</span>",
      summary: "Harness 不是 SDK、脚手架或 Agent 框架的替代品，而是在其上增加持久化、重放、成本、观测与恢复能力的一层。",
      value: "先明确框架与 Harness 的边界，团队才能避免用模型或 SDK 代码硬扛运行治理问题。",
      footnote: runoobNote,
      layout: `
        <section class="method-framework-relation">
          <div class="method-framework-stack">
            <header><span>FROM BUILD TO RUN</span><strong>两层能力，解决两类不同问题</strong></header>
            <div class="method-framework-layers"><article><b>01 · SDK / TOOLING</b><h3>构建能力</h3><p>连接模型、工具和数据，提供 Agent 定义、消息路由与任务生命周期。</p><em>怎么把 Agent 做出来</em></article><i>＋</i><article><b>02 · HARNESS</b><h3>运行可靠性</h3><p>补齐状态持久化、确定性重放、成本控制、可观测性与错误恢复。</p><em>怎么让 Agent 稳定交付</em></article></div>
            <div class="method-framework-bridge"><span>边界判断</span><b>如果问题是“怎么可靠运行”，就已经进入 Harness 的责任域。</b></div>
          </div>
          <aside class="method-framework-side"><span>CONTROL LAYER</span><h3>Harness<br>不是替代，而是<span>上层控制面</span></h3><div><b>框架</b><p>提供积木与调用路径。</p></div><div><b>Harness</b><p>定义边界、证据与恢复路径。</p></div><footer>模型能力决定上限，运行环境决定兑现。</footer></aside>
          <div class="method-framework-table"><header><span>能力层</span><span>解决的问题</span><span>关键资产</span><span>失败时的责任</span></header><div><b>SDK / 框架</b><span>如何调用能力</span><code>API · Tool · Workflow</code><span>节点实现与编排</span></div><div><b>Harness</b><span>如何可靠运行</span><code>State · Gate · Trace · Recovery</code><span>控制面与治理</span></div></div>
        </section>`
    }),
    methodSlide({
      id: "methods-loop-vs-prompt",
      index: 7,
      className: "methods-loop-vs-prompt-slide",
      chapterTag: "LOOP ENGINEERING",
      title: "Loop Engineering：从 Prompt 到交付系统",
      slideTitle: "Loop Engineering：从 <span>Prompt</span> 到交付系统",
      summary: "Prompt 优化一条指令；Loop 设计提示何时发生、结果如何验证，以及系统何时继续或停止。两者叠加，而非替代。",
      value: "Prompt 决定每一步的表达质量；Loop 决定这些步骤能否持续收敛为可验证的结果。",
      footnote: loopNote,
      layout: `
        <section class="loop-vs-prompt-layout">
          <article class="loop-prompt-card loop-prompt-card--prompt">
            <header><span>PROMPT ENGINEERING</span><strong>教 AI <b>这一次</b>怎么做</strong></header>
            <div class="loop-vs-list"><p><b>优化对象</b><span>一条指令的措辞与结构</span></p><p><b>工作单位</b><span>一轮手动输入的对话</span></p><p><b>成功衡量</b><span>第一个回复的质量</span></p><p><b>人的角色</b><span>提问者</span></p></div>
            <footer>输入：Prompt / 指令</footer>
          </article>
          <div class="loop-vs-bridge"><i>× N</i><span>嵌入</span><b>→</b></div>
          <article class="loop-prompt-card loop-prompt-card--loop">
            <header><span>LOOP ENGINEERING</span><strong>设计系统，让 AI <b>持续</b>完成目标</strong></header>
            <div class="loop-vs-list"><p><b>优化对象</b><span>提示节奏、状态、验收与停止条件</span></p><p><b>工作单位</b><span>跨多轮、自动运行的完整工作流</span></p><p><b>成功衡量</b><span>最终输出是否可验证、可交付</span></p><p><b>人的角色</b><span>规则制定者与结果审查者</span></p></div>
            <footer>输入：目标 · 状态 · 记忆 · 验证</footer>
          </article>
          <aside class="loop-vs-takeaway"><span>STACK RELATION</span><b>Loop 由多个 Prompt 组成</b><p>差的 Prompt 放进 Loop，只会更快地产出差的结果；Loop 是上层工程系统，不是 Prompt 的替代品。</p></aside>
        </section>`
    }),
    methodSlide({
      id: "methods-loop-core-cycle",
      index: 8,
      className: "methods-loop-core-slide",
      chapterTag: "LOOP ENGINEERING",
      title: "可靠的 Agent Loop，用五个阶段把错误变成下一轮输入",
      slideTitle: "可靠的 Agent Loop，用五个阶段把错误变成<span>下一轮输入</span>",
      summary: "Loop 的力量不在于某个独立步骤，而在于每次测试、错误、Diff 与 Review 都能回流为下一轮行动的真实依据。",
      value: "把验证结果设计成结构化输入，Agent 才能从“不断尝试”转为“基于证据收敛”。",
      footnote: loopNote,
      layout: `
        <section class="loop-core-layout">
          <div class="loop-core-cycle">
            <header><span>FIVE-STAGE AGENT LOOP</span><strong>目标、行动与证据在同一条闭环中持续更新</strong></header>
            <div class="loop-core-track">
              <article><b>01</b><span>INTENT</span><h3>意图</h3><p>定义成功结果、任务边界与约束。</p><em>Issue · CI 报告</em></article><i>→</i>
              <article><b>02</b><span>CONTEXT</span><h3>上下文</h3><p>收集相关代码、规范、日志与历史。</p><em>Repo · Docs · Logs</em></article><i>→</i>
              <article><b>03</b><span>ACTION</span><h3>行动</h3><p>编辑文件、运行命令、调用工具。</p><em>Agent execution</em></article><i>→</i>
              <article><b>04</b><span>OBSERVATION</span><h3>观察</h3><p>读取测试、编译、运行与 Diff 信号。</p><em>CI · Review · Runtime</em></article><i>→</i>
              <article><b>05</b><span>ADJUSTMENT</span><h3>调整</h3><p>更新计划，继续、完成或明确阻塞。</p><em>Next iteration</em></article>
            </div>
            <div class="loop-core-return"><i>↺</i><b>FEEDBACK CLOSES THE LOOP</b><span>观察不是结案信息，而是下一轮最有价值的上下文。</span></div>
          </div>
          <aside class="loop-core-control"><span>CONTROL QUESTION</span><h3>每轮执行都要<br>回答同一个问题：</h3><b>“什么证据，足以让我继续、停止或升级？”</b><div><strong>继续</strong><p>得到新线索，假设仍可验证。</p></div><div><strong>停止</strong><p>验收条件满足，并留下可复查证据。</p></div><div><strong>升级</strong><p>权限、风险或信息不足，交由人判断。</p></div></aside>
        </section>`
    }),
    methodSlide({
      id: "methods-loop-components",
      index: 9,
      className: "methods-loop-components-slide",
      chapterTag: "LOOP ENGINEERING",
      title: "六项要素，让 Agent Loop 能持续运行",
      slideTitle: "六项要素，让 Agent Loop <span>能持续运行</span>",
      summary: "独立运行的 Loop 不只需要模型和 Prompt；触发、隔离、项目知识、连接、检查与记忆必须一起到位。",
      value: "先补齐状态与验证基础，再扩大并行度或自动化范围，才能避免“跑得更快、失控也更快”。",
      footnote: loopNote,
      layout: `
        <section class="loop-components-layout">
          <div class="loop-components-column loop-components-column--left">
            <article><b>01</b><span>AUTOMATIONS</span><h3>自动触发器</h3><p>定义什么时候运行、运行什么任务。</p><em>心跳</em></article>
            <article><b>02</b><span>WORKTREES</span><h3>并行隔离</h3><p>为每个 Agent 留出独立工作目录与分支。</p><em>隔离</em></article>
            <article><b>03</b><span>SKILLS</span><h3>技能文件</h3><p>把项目规范和构建步骤变成常驻事实。</p><em>约定</em></article>
          </div>
          <div class="loop-components-core"><span>RUNNING SYSTEM</span><b>LOOP</b><strong>持续运行<br>≠ 持续调用</strong><i></i><p>目标 → 行动 → 观察 → 状态更新</p><footer>每项能力都要有明确的<br>权限边界与验证出口。</footer></div>
          <div class="loop-components-column loop-components-column--right">
            <article><b>04</b><span>CONNECTORS / MCP</span><h3>连接器</h3><p>把 Issue、数据、API 与通知接入工作流。</p><em>外部行动</em></article>
            <article><b>05</b><span>SUB-AGENTS</span><h3>子 Agent</h3><p>让制作者与检查者拥有独立的判断路径。</p><em>复核</em></article>
            <article><b>06</b><span>MEMORY</span><h3>持久记忆</h3><p>把状态写入仓库，让下一轮不从零开始。</p><em>延续</em></article>
          </div>
        </section>`
    }),
    methodSlide({
      id: "methods-loop-patterns",
      index: 10,
      className: "methods-loop-patterns-slide",
      chapterTag: "LOOP ENGINEERING",
      title: "五种 Loop 模式，用不同信号驱动同一套闭环",
      slideTitle: "五种 Loop 模式，用不同信号驱动<span>同一套闭环</span>",
      summary: "Loop 的差异不在“是否循环”，而在观察什么、以什么条件停止；任务类型必须决定反馈信号和完成定义。",
      value: "先选可信的反馈信号，再定义停止条件，能够减少无效重试与“测试绿了但任务没完成”。",
      footnote: loopNote,
      layout: `
        <section class="loop-patterns-layout">
          <header class="loop-patterns-head"><span>LOOP PATTERN</span><span>核心观察信号</span><span>停止条件</span><span>典型场景</span></header>
          <div class="loop-pattern-list">
            <article><div><b>01</b><strong>测试驱动</strong><small>TEST-DRIVEN</small></div><p><em>测试通过 / 失败</em></p><p>目标测试全部通过</p><p>Bug 修复 · 回归测试 · 数据转换</p></article>
            <article><div><b>02</b><strong>编译器驱动</strong><small>COMPILER-DRIVEN</small></div><p><em>类型 / 编译错误列表</em></p><p>类型检查零错误</p><p>TypeScript 迁移 · 依赖升级 · 重构</p></article>
            <article><div><b>03</b><strong>Review 驱动</strong><small>REVIEW-DRIVEN</small></div><p><em>人工 Review 评论</em></p><p>评论均已处理或有据忽略</p><p>PR Review 的机械性跟进</p></article>
            <article><div><b>04</b><strong>运行时调试</strong><small>RUNTIME DEBUG</small></div><p><em>日志 / 堆栈 / HTTP 响应</em></p><p>复现 → 假设 → 验证修复</p><p>生产 Bug · 性能 · 接口异常</p></article>
            <article><div><b>05</b><strong>产品迭代</strong><small>PRODUCT ITERATION</small></div><p><em>截图 / 浏览器 / 可访问性报告</em></p><p>设计对齐、响应式与规范通过</p><p>落地页 · UI 调整 · 营销组件</p></article>
          </div>
          <footer class="loop-patterns-insight"><span>SELECTION RULE</span><b>没有可信信号的自动化，不是 Loop，只是重复执行。</b><p>优先选择最接近真实用户结果、又可稳定获得的反馈。</p></footer>
        </section>`
    }),
    methodSlide({
      id: "methods-loop-risks",
      index: 11,
      className: "methods-loop-risks-slide",
      chapterTag: "LOOP ENGINEERING",
      title: "Loop 越自动，验证、理解与判断越不能外包",
      slideTitle: "Loop 越自动，验证、理解与判断<span>越不能外包</span>",
      summary: "Loop 改变的是执行速度，不会消除工程师的责任；自动化能力提升时，人类的验证、理解与价值判断反而更关键。",
      value: "把人放在验收、风险决策和异常升级点，才能让自主运行成为团队杠杆，而不是责任真空。",
      footnote: loopNote,
      layout: `
        <section class="loop-risk-layout">
          <aside class="loop-risk-principle"><span>HUMAN ACCOUNTABILITY</span><h3>自动化<br>不等于<br><b>自动正确</b></h3><p>每一次扩大 Loop 自主度，都应同步明确：谁验证、谁理解、谁有权接受结果。</p><footer><b>原则</b><span>高风险动作保留人工审批；异常信号必须能打断循环。</span></footer></aside>
          <div class="loop-risk-grid">
            <article><header><b>01</b><span>VERIFICATION</span><strong>验证仍是人的责任</strong></header><p>检查者 Agent 能降低风险，但“通过了验证”只是声明，不是最终证明。</p><div><b>早期信号</b><span>只看单一测试或自动摘要，就直接接受合并。</span></div><footer><b>工程应对</b><span>独立验证 + 人工 Review + 真实路径验收</span></footer></article>
            <article><header><b>02</b><span>COMPREHENSION DEBT</span><strong>理解债积累更快</strong></header><p>产出速度越快，工程师实际理解的代码比例越可能下降。</p><div><b>早期信号</b><span>Diff 越积越多，却无法解释关键变更的设计取舍。</span></div><footer><b>工程应对</b><span>控制变更粒度 + 阅读产物 + 定期审计</span></footer></article>
            <article><header><b>03</b><span>COGNITIVE SURRENDER</span><strong>认知投降最隐蔽</strong></header><p>Loop 运转顺畅时，人最容易用结果来回避本应承担的判断。</p><div><b>早期信号</b><span>把“Agent 说完成了”当作需求、质量与风险的结论。</span></div><footer><b>工程应对</b><span>明确停止规则 + 例外升级 + 负责人签收</span></footer></article>
          </div>
        </section>`
    })
  ];
}());
