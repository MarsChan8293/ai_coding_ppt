/* E · 入门实践。板块内页面顺序即页面库顺序；页面 ID 须保持稳定。 */
const practiceTerminal = (title, lines, footer) => `
  <article class="practice-sim-terminal" aria-label="${title}">
    <header>
      <span class="practice-window-dots">● ● ●</span>
      <b>${title}</b>
      <em>SIMULATED REPLAY</em>
    </header>
    <div class="practice-terminal-lines">
      ${lines.map((line, index) => `<p class="practice-term-line" style="--step:${index}">${line}</p>`).join("")}
    </div>
    <footer><span>模拟回放</span><b>${footer}</b></footer>
  </article>`;

const practiceSlide = ({
  id,
  number,
  title,
  summary,
  label,
  subtitle,
  className,
  terminalTitle,
  terminalLines,
  terminalFooter,
  guide,
}) => ({
  id,
  section: "practice",
  title,
  summary,
  theme: { paper: "#f4f7fc", ink: "#132544", accent: "#2563eb" },
  render: () => `
    <section class="presentation-slide practice-sim-slide ${className}" data-terminal-mode="simulated">
      ${slideChrome(`E.${number} · 入门实践`)}
      <p class="practice-sim-label">${label}</p>
      <h2 class="slide-title">${title}</h2>
      <p class="slide-subtitle">${subtitle}</p>
      <div class="practice-sim-layout">
        ${practiceTerminal(terminalTitle, terminalLines, terminalFooter)}
        <aside class="practice-sim-guide">${guide}</aside>
      </div>
      <p class="practice-sim-note"><b>30 分钟跟练</b><span>左侧为 OpenCode HTML 模拟回放；命令、Prompt 与验收口径均可照抄到真实空白仓库。</span></p>
    </section>`,
});

window.sectionSlides = [
  ...(window.sectionSlides || []),
  practiceSlide({
    id: "practice-first-session",
    number: 1,
    title: "从空白仓库开始，完成第一次 AI Coding",
    summary: "从空目录启动 OpenCode，明确本节要一次生成的 Astro 入门清单与完成证据。",
    label: "START FROM ZERO · 0–3 MIN",
    subtitle: "不下载示例代码：先进入一个真正的空目录，再让 Agent 和你共同建立项目。",
    className: "practice-first-session-slide",
    terminalTitle: "OpenCode · ai-coding-starter",
    terminalLines: [
      '<span class="term-shell">$</span> mkdir ai-coding-starter',
      '<span class="term-shell">$</span> cd ai-coding-starter',
      '<span class="term-shell">$</span> opencode',
      '<span class="term-system">◆</span> OpenCode <span class="term-muted">· current directory loaded</span>',
      '<span class="term-user">›</span> 先不要创建文件。请确认当前目录和 Git 状态。',
      '<span class="term-agent">●</span> 当前目录为空；尚未初始化为 Git 仓库。',
    ],
    terminalFooter: "先确认事实，再进入生成。",
    guide: `
      <div class="practice-guide-head"><span>本节成品</span><b>一页可运行的入门清单</b></div>
      <div class="practice-outcome-card">
        <strong>AI Coding 入门清单</strong>
        <p>4 个可勾选步骤、完成进度、刷新后保留状态，并适配桌面与手机。</p>
      </div>
      <div class="practice-copy-block"><span>复制到 Shell</span><pre>mkdir ai-coding-starter
cd ai-coding-starter
opencode</pre></div>
      <ul class="practice-check-list"><li>空目录，没有预制源码</li><li>固定 Astro + TypeScript</li><li>最终以测试、构建和页面验收</li></ul>`,
  }),
  practiceSlide({
    id: "practice-run-scaffold",
    number: 2,
    title: "先初始化 Git，留下可以比较的基线",
    summary: "让 OpenCode 在空目录执行 git init，并用无输出的 git status 确认干净基线。",
    label: "REPOSITORY BASELINE · 3–5 MIN",
    subtitle: "真实协作从可比较的状态开始：后面出现的每一个文件，都应该能在 Git 中被看见。",
    className: "practice-repository-slide",
    terminalTitle: "OpenCode · repository baseline",
    terminalLines: [
      '<span class="term-user">›</span> 初始化当前目录为 Git 仓库，并检查基线；不要创建项目文件。',
      '<span class="term-tool">→ Shell</span> git init',
      '<span class="term-output">Initialized empty Git repository in …/ai-coding-starter/.git/</span>',
      '<span class="term-tool">→ Shell</span> git status --short',
      '<span class="term-muted">(无输出)</span>',
      '<span class="term-tool">→ Shell</span> git rev-parse --is-inside-work-tree',
      '<span class="term-pass">true</span>',
    ],
    terminalFooter: "Git 已就绪，工作树仍为空。",
    guide: `
      <div class="practice-guide-head"><span>这一页只做一件事</span><b>建立零号状态</b></div>
      <div class="practice-copy-block"><span>复制给 OpenCode</span><pre>初始化当前目录为 Git 仓库，并检查基线；
不要创建项目文件。</pre></div>
      <div class="practice-evidence-list"><section><b>01</b><div><strong>仓库存在</strong><p><code>git rev-parse</code> 返回 <code>true</code></p></div></section><section><b>02</b><div><strong>工作树为空</strong><p><code>git status --short</code> 没有输出</p></div></section><section><b>03</b><div><strong>没有提前生成</strong><p>目录中仍只有 <code>.git/</code></p></div></section></div>`,
  }),
  practiceSlide({
    id: "practice-agent-rules",
    number: 3,
    title: "用 /init 建立可执行的 AGENTS.md",
    summary: "在空仓库运行 /init，再把技术栈、测试命令和完成定义补成短小的项目协作规则。",
    label: "PROJECT RULES · 5–9 MIN",
    subtitle: "空仓库提供不了多少上下文，因此要审查 `/init` 初稿，并明确补上这次项目真正采用的命令。",
    className: "practice-agent-rules-slide",
    terminalTitle: "OpenCode · /init",
    terminalLines: [
      '<span class="term-user">›</span> /init',
      '<span class="term-agent">●</span> Scanning repository <span class="term-muted">· empty work tree</span>',
      '<span class="term-agent">●</span> Wrote <strong>AGENTS.md</strong>',
      '<span class="term-user">›</span> 请补全为 Astro + TypeScript 项目规则，并写明测试和完成定义。',
      '<span class="term-agent">●</span> Updated <strong>AGENTS.md</strong>',
      '<span class="term-tool">→ Shell</span> git diff -- AGENTS.md',
      '<span class="term-pass">+ npm test · npm run dev · report changed files</span>',
    ],
    terminalFooter: "规则文件是下一轮生成的默认上下文。",
    guide: `
      <div class="practice-guide-head"><span>保留这份短规则</span><b>AGENTS.md</b></div>
      <div class="practice-file-card"><pre><strong># Project</strong>
- Astro + TypeScript 单页项目

<strong># Commands</strong>
- npm test
- npm run dev

<strong># Done</strong>
- 报告改动文件和命令结果</pre></div>
      <div class="practice-copy-block compact"><span>复制给 OpenCode</span><pre>请补全为 Astro + TypeScript 项目规则，
写明 npm test、npm run dev 和完成定义。</pre></div>`,
  }),
  practiceSlide({
    id: "practice-install-grill-me",
    number: 4,
    title: "安装项目级 grill-me，并让 OpenCode 发现它",
    summary: "使用已验证的 skills CLI 命令，把 grill-me 安装进当前仓库，重启 OpenCode 后确认发现。",
    label: "PROJECT SKILL · 9–13 MIN",
    subtitle: "项目级安装会留下可审查的 Skill 文件和锁文件；重启 OpenCode 后再进入需求追问。",
    className: "practice-install-skill-slide",
    terminalTitle: "OpenCode / Shell · grill-me",
    terminalLines: [
      '<span class="term-user">›</span> 退出后安装项目级 grill-me，再从当前仓库重新启动。',
      '<span class="term-shell">^C</span>',
      '<span class="term-shell">$</span> npx skills add https://github.com/mattpocock/skills --skill grill-me --agent opencode --yes',
      '<span class="term-pass">✓</span> .agents/skills/grill-me/SKILL.md',
      '<span class="term-pass">✓</span> skills-lock.json',
      '<span class="term-shell">$</span> opencode',
      '<span class="term-agent">●</span> Project skill discovered: <strong>grill-me</strong>',
    ],
    terminalFooter: "命令已按当前 skills CLI 实际验证。",
    guide: `
      <div class="practice-guide-head"><span>项目级安装</span><b>文件跟随仓库</b></div>
      <div class="practice-copy-block command"><span>复制到 Shell</span><pre>npx skills add https://github.com/mattpocock/skills \\
  --skill grill-me --agent opencode --yes</pre></div>
      <div class="practice-path-card"><span>安装后检查</span><code>.agents/skills/grill-me/SKILL.md</code><code>skills-lock.json</code></div>
      <ol class="practice-number-list"><li>退出当前 OpenCode</li><li>在仓库根目录执行安装命令</li><li>重新运行 <code>opencode</code></li></ol>`,
  }),
  practiceSlide({
    id: "practice-shape-task",
    number: 5,
    title: "让 grill-me 把想法问成一份任务",
    summary: "用真实追问锁定受众、成品、交互、技术栈和验收方式，再交给 Agent 一次生成。",
    label: "GRILLING SESSION · 13–18 MIN",
    subtitle: "这一轮只做需求收敛：每次回答一个问题，最后要求 Agent 复述所有已确认决定。",
    className: "practice-grilling-slide",
    terminalTitle: "OpenCode · grill-me",
    terminalLines: [
      '<span class="term-user">›</span> 请使用 grill-me，逐个问题帮我明确要生成的入门练习站。',
      '<span class="term-agent">◆</span> 谁会使用这个页面？',
      '<span class="term-user">›</span> 已经会聊天、但没在真实仓库中协作的人。',
      '<span class="term-agent">◆</span> 最小成品必须有什么？',
      '<span class="term-user">›</span> 4 项清单、完成进度、刷新后保留状态、响应式布局。',
      '<span class="term-agent">◆</span> 如何证明完成？',
      '<span class="term-user">›</span> Astro check、Vitest、build 通过，再用本地页面检查。',
      '<span class="term-pass">● 已确认</span> Astro + TypeScript · 单页 · 一次生成',
    ],
    terminalFooter: "追问结束后，先复述，再生成。",
    guide: `
      <div class="practice-guide-head"><span>复制这句开始追问</span><b>先问，不改文件</b></div>
      <div class="practice-copy-block"><span>复制给 OpenCode</span><pre>请使用 grill-me，逐个问题帮我明确要生成的
AI Coding 入门练习站。先提问，不修改文件。</pre></div>
      <div class="practice-decision-grid"><section><small>受众</small><b>仓库协作初学者</b></section><section><small>成品</small><b>四项入门清单</b></section><section><small>交互</small><b>进度 + localStorage</b></section><section><small>验收</small><b>check + test + build</b></section></div>`,
  }),
  practiceSlide({
    id: "practice-terminal-change",
    number: 6,
    title: "提交一次完整 Prompt，让 Agent 生成项目",
    summary: "把已确认决定写进一条完整任务 Prompt，模拟 OpenCode 创建 Astro 项目、安装依赖并运行测试。",
    label: "ONE-SHOT BUILD · 18–26 MIN",
    subtitle: "一次生成不等于一句话生成：技术栈、功能、文件约束和验收命令仍要写完整。",
    className: "practice-one-shot-slide",
    terminalTitle: "OpenCode · build in progress",
    terminalLines: [
      '<span class="term-user">›</span> 请按已确认需求，一次性创建完整项目并验证。',
      '<span class="term-agent">● Plan</span> scaffold → interaction → tests → verification',
      '<span class="term-tool">→ Write</span> package.json · src/pages/index.astro · src/scripts/progress.ts',
      '<span class="term-tool">→ Write</span> tests/progress.test.ts · src/styles/global.css',
      '<span class="term-tool">→ Shell</span> npm install',
      '<span class="term-tool">→ Shell</span> npm test',
      '<span class="term-pass">✓ astro check</span> <span class="term-muted">0 errors</span>',
      '<span class="term-pass">✓ vitest</span> 4 tests passed <span class="term-pass">· ✓ astro build</span>',
    ],
    terminalFooter: "模拟展示 Agent 的一次完整执行链。",
    guide: `
      <div class="practice-guide-head"><span>一次生成 Prompt</span><b>目标 + 功能 + 验收</b></div>
      <div class="practice-copy-block prompt"><span>复制给 OpenCode</span><pre>请在当前空仓库创建 Astro + TypeScript 单页项目：
1. 页面名为“AI Coding 入门清单”；
2. 展示 4 个可勾选步骤和完成进度；
3. 使用 localStorage 保存并恢复状态；
4. 提供清晰的桌面和移动端布局；
5. 用 Vitest 验证清单、进度和状态恢复；
6. npm test 依次运行 astro check、vitest run、astro build。
请创建所需文件、安装依赖、运行 npm test，并报告结果。</pre></div>`,
  }),
  practiceSlide({
    id: "practice-proof",
    number: 7,
    title: "用 Diff、测试和页面完成最后验收",
    summary: "在 OpenCode 中复核 Git 变更、npm test 和本地预览，把一次生成落到三份可检查证据。",
    label: "VERIFY THE RESULT · 26–30 MIN",
    subtitle: "不要只读 Agent 的完成总结；让它运行命令，再亲眼检查生成页面是否符合刚才确认的任务。",
    className: "practice-final-proof-slide",
    terminalTitle: "OpenCode · verification",
    terminalLines: [
      '<span class="term-user">›</span> 不要再修改文件。请依次展示 Git 变更、测试结果和本地地址。',
      '<span class="term-tool">→ Shell</span> git status --short',
      '<span class="term-output">?? AGENTS.md  ?? package.json  ?? src/  ?? tests/</span>',
      '<span class="term-tool">→ Shell</span> npm test',
      '<span class="term-pass">✓ astro check · ✓ 4 tests · ✓ build</span>',
      '<span class="term-tool">→ Shell</span> npm run dev -- --host 127.0.0.1',
      '<span class="term-pass">Local</span> http://127.0.0.1:4321/',
      '<span class="term-agent">●</span> 已生成 7 个项目文件；未执行 Git 提交。',
    ],
    terminalFooter: "三份证据齐全，第一次 AI Coding 闭环完成。",
    guide: `
      <div class="practice-guide-head"><span>最终页面</span><b>AI Coding 入门清单</b></div>
      <div class="practice-mini-product">
        <header><span>学习进度</span><b>2 / 4</b></header>
        <div class="practice-progress"><i></i></div>
        <p class="is-done"><span>✓</span> 初始化仓库</p>
        <p class="is-done"><span>✓</span> 编写 AGENTS.md</p>
        <p><span>○</span> 安装第一个 Skill</p>
        <p><span>○</span> 完成测试与预览</p>
      </div>
      <div class="practice-proof-strip"><span><b>DIFF</b> 文件可见</span><span><b>TEST</b> 4 passed</span><span><b>PAGE</b> 结果可操作</span></div>`,
  }),
];
