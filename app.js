const STORAGE_KEY = "xfusion-ai-coding-compositions-v1";

const sections = [
  { id: "history", label: "历史与趋势", index: "B" },
  { id: "tools", label: "模型与工具", index: "C" },
  { id: "methods", label: "工程方法", index: "D" },
  { id: "practice", label: "入门实践", index: "E" },
  { id: "solution", label: "企业解决方案", index: "F" },
  { id: "proof", label: "内部实践与客户案例", index: "G" }
];

let slides = [...(window.sectionSlides || [])];

const sectionById = new Map(sections.map(section => [section.id, section]));
const sectionOrderById = new Map(sections.map((section, index) => [section.id, index]));
slides.push(...(window.sourceEntries || []).map(entry => ({ ...makeStructuredSlide(entry), legacy: true })));
const starterSlideIds = sections
  .map(section => slides.find(slide => !slide.legacy && slide.section === section.id)?.id)
  .filter(Boolean);
let slideById = new Map(slides.map(slide => [slide.id, slide]));

const state = {
  activeSection: "all",
  selected: starterSlideIds,
  currentId: null,
  playerIndex: 0,
  deck: []
};

const $ = selector => document.querySelector(selector);
const sectionTabs = $("#sectionTabs");
const slideLibrary = $("#slideLibrary");
const selectionList = $("#selectionList");
const emptySelection = $("#emptySelection");
const compositionName = $("#compositionName");
const saveDialog = $("#saveDialog");
const saveCompositionName = $("#saveCompositionName");
const player = $("#player");

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function slideChrome(chapter) {
  return `<span class="slide-chapter">${chapter}</span><img class="slide-logo" src="assets/media/xfusion-logo.svg" alt="超聚变"><span class="slide-index"></span>`;
}

function audienceReminder(entry) {
  const fallback = {
    history: "趋势判断需要同时注明数据口径、时间范围和适用条件。",
    tools: "工具选择先看任务、数据边界和可验证的实际体验。",
    methods: "可靠性来自可执行的规则、独立验证和可恢复的过程。",
    practice: "先完成一个小而真实的闭环，再逐步扩大任务范围。",
    solution: "企业落地要把安全、体验、性能、成本和治理放在同一张图里评估。",
    proof: "实践数据应保留来源、时间、计算口径和适用边界。"
  };
  const note = entry.note || "";
  return /(?:适合|可作为|可与|可跳过|概览页|学生|管理者|听众|版本)/.test(note)
    ? fallback[entry.section]
    : note || fallback[entry.section];
}

function trimText(value, limit = 150) {
  const text = plainText(value);
  return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
}

function toDenseCard(item, index) {
  if (typeof item === "object" && item) {
    return {
      title: trimText(item.title || `关键要点 ${String(index + 1).padStart(2, "0")}`, 26),
      text: trimText(item.text || item.detail || "", 145)
    };
  }
  const value = trimText(item, 145);
  const divider = value.search(/[：:]/);
  if (divider > 1 && divider < 24) {
    return { title: value.slice(0, divider), text: value.slice(divider + 1).trim() };
  }
  return { title: `关键要点 ${String(index + 1).padStart(2, "0")}`, text: value };
}

function denseCards(entry) {
  const raw = entry.cards?.length ? entry.cards : entry.points || [];
  const cards = raw.map(toDenseCard).filter(card => card.text);
  if (cards.length < 4) {
    cards.push({ title: "验证与边界", text: audienceReminder(entry) });
  }
  return cards.slice(0, 4);
}

function makeStructuredSlide(entry) {
  const section = sectionById.get(entry.section);
  const cards = denseCards(entry);
  return {
    ...entry,
    theme: { paper: "#f7f7f5", ink: "#151515", accent: "#f70000" },
    render: () => `
      <section class="presentation-slide generic-slide">
        ${slideChrome(`${section.index} · ${section.label}`)}
        <h2 class="slide-title">${escapeHtml(entry.title)}</h2>
        <p class="slide-subtitle">${escapeHtml(entry.summary)}</p>
        <div class="generic-content">
          <div class="generic-lead"><span>${escapeHtml(entry.label || "LESSON")}</span><strong>${escapeHtml(trimText(entry.lead, 180))}</strong><div><b>核心命题</b><p>${escapeHtml(trimText(entry.summary, 108))}</p></div></div>
          <div class="generic-points">${cards.map((card, index) => `<article><b>${String(index + 1).padStart(2, "0")}</b><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.text)}</p></article>`).join("")}</div>
          <aside class="generic-note"><b>关键提醒</b><p>${escapeHtml(audienceReminder(entry))}</p></aside>
        </div>
      </section>`
  };
}

function markdownTablesToText(value) {
  return String(value || "").replace(/(?:^\|.*\|\s*(?:\n|$))+/gm, group => {
    const rows = group.trim().split("\n").map(line => line.split("|").slice(1, -1).map(cell => cell.trim()))
      .filter(row => row.some(cell => cell) && !row.every(cell => /^:?-{3,}:?$/.test(cell)));
    if (rows.length < 2) return "";
    const [headers, ...data] = rows;
    return data.slice(0, 3).map(row => row.map((cell, index) => index === 0 ? cell : `${headers[index] || "说明"}：${cell}`).filter(Boolean).join("；")).join("；");
  });
}

function plainText(value) {
  return markdownTablesToText(value)
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[`*_>#|]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/^-{3,}$/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseList(frontmatter, field) {
  const inline = frontmatter.match(new RegExp(`^${field}:\\s*\\[(.*?)\\]\\s*$`, "m"));
  if (inline) return [...inline[1].matchAll(/["']([^"']+)["']/g)].map(hit => hit[1].trim()).filter(Boolean);
  const match = frontmatter.match(new RegExp(`^${field}:\\s*\\n((?:\\s+-.*\\n?)*)`, "m"));
  if (!match) return [];
  return match[1].split("\n").map(line => line.replace(/^\s+-\s*/, "").replace(/^"|"$/g, "").trim()).filter(Boolean);
}

function usefulParagraphs(raw, limit = 8) {
  return raw
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .map(plainText)
    .filter(text => text.length > 26 && !text.startsWith("export ") && !text.startsWith("import ") && !text.includes("Checklist"))
    .slice(0, limit);
}

function extractBullets(raw, limit = 8) {
  return [...raw.matchAll(/^\s*(?:[-*]|\d+\.)\s+(.+)$/gm)]
    .map(hit => plainText(hit[1]))
    .filter(text => text.length > 3 && !text.startsWith("id="))
    .slice(0, limit);
}

function extractLessonSections(body) {
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((hit, index) => {
    const start = hit.index + hit[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : body.length;
    const fragment = body.slice(start, end);
    const paragraphs = usefulParagraphs(fragment, 2);
    const bullets = extractBullets(fragment, 2);
    return { title: plainText(hit[1]), text: paragraphs[0] || bullets[0] || "" };
  }).filter(item => item.title.length > 2).slice(0, 6);
}

function extractChecklist(body) {
  const match = body.match(/items=\{\[([\s\S]*?)\]\}/);
  return match ? [...match[1].matchAll(/["']([^"']+)["']/g)].map(hit => plainText(hit[1])).filter(Boolean) : [];
}

function parseLesson(raw, path) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  const frontmatter = match ? match[1] : "";
  const body = match ? match[2] : raw;
  const field = name => (frontmatter.match(new RegExp(`^${name}:\\s*["']?(.+?)["']?\\s*$`, "m")) || [])[1] || "";
  const modules = extractLessonSections(body);
  const headings = modules.map(module => module.title).slice(0, 4);
  const paragraphs = usefulParagraphs(body, 6);
  return {
    id: path.replace(/^lessons\//, "").replace(/\.mdx$/, "").replace(/[^a-zA-Z0-9]+/g, "-"),
    section: field("section"),
    title: field("title"),
    description: field("description"),
    minutes: field("estimatedMinutes"),
    outcomes: parseList(frontmatter, "outcomes"),
    prerequisites: parseList(frontmatter, "prerequisites"),
    headings,
    paragraphs,
    modules,
    bullets: extractBullets(body),
    checklist: extractChecklist(body)
  };
}

function makeLessonSlides(lesson) {
  const section = sectionById.get(lesson.section);
  if (!section || !lesson.title) return [];
  const outcomes = lesson.outcomes.length ? lesson.outcomes : [lesson.description, ...lesson.headings].filter(Boolean).slice(0, 4);
  const overviewCards = outcomes.slice(0, 4).map((text, index) => ({ title: `学习目标 ${String(index + 1).padStart(2, "0")}`, text }));
  const frameworkCards = lesson.modules.length ? lesson.modules.slice(0, 4) : outcomes.slice(0, 4).map((text, index) => ({ title: `关键脉络 ${String(index + 1).padStart(2, "0")}`, text }));
  const workflowCards = lesson.modules.slice(0, 2).map(module => ({
    title: module.title,
    text: module.text || lesson.bullets.find(item => item.includes(module.title)) || "按这一节的输入、输出和边界完成操作。"
  }));
  const practiceCards = [
    { title: "开始前", text: lesson.prerequisites.length ? lesson.prerequisites.join("；") : "选择一个真实、边界清晰且可验证的任务。" },
    ...workflowCards,
    { title: "完成验证", text: lesson.checklist.slice(0, 2).join("；") || lesson.outcomes.slice(-2).join("；") || "用独立检查确认结果，而不是只看生成内容。" }
  ].slice(0, 4);
  const sourceLead = lesson.paragraphs[0] || lesson.description;
  return [
    makeStructuredSlide({
      id: `${lesson.id}-overview`, section: lesson.section, title: lesson.title, summary: lesson.description,
      label: `LESSON · ${section.index} · ${lesson.minutes || "—"} MIN`, lead: sourceLead,
      cards: overviewCards, note: "从目标、范围和验收起步，再进入更深入的方法与真实实践。"
    }),
    makeStructuredSlide({
      id: `${lesson.id}-framework`, section: lesson.section, title: `${lesson.title}：关键脉络`, summary: "从课程原文提取的核心章节与讨论顺序。",
      label: `LESSON · KEY IDEAS`, lead: lesson.paragraphs[1] || lesson.description,
      cards: frameworkCards, note: "关键概念要结合真实任务、工具反馈和验证证据一起理解。"
    }),
    makeStructuredSlide({
      id: `${lesson.id}-action`, section: lesson.section, title: `${lesson.title}：把理解变成行动`, summary: "用本课的前置条件、产出与验收方式连接到真实工作。",
      label: `LESSON · PRACTICE`, lead: lesson.paragraphs[2] || "不要只停留在概念层面：为下一次真实任务定义一个可观察、可验证的最小动作。",
      cards: practiceCards, note: "选择一个真实任务，明确前置条件、预期产出和独立验证方式。"
    })
  ];
}

function rebuildSlideIndex() {
  slideById = new Map(slides.map(slide => [slide.id, slide]));
}

async function loadLessonContent() {
  try {
    const bundled = window.lessonContent;
    const loaded = Array.isArray(bundled) && bundled.length
      ? bundled.map(({ path, raw }) => parseLesson(raw, path))
      : await Promise.all((window.lessonManifest || []).map(async path => {
          const response = await fetch(path);
          if (!response.ok) throw new Error(`${path} (${response.status})`);
          return parseLesson(await response.text(), path);
        }));
    slides.push(...loaded.flatMap(makeLessonSlides).map(slide => ({ ...slide, legacy: true })));
    rebuildSlideIndex();
    renderAll();
  } catch (error) {
    console.error("课程内容加载失败", error);
  }
}

function getPresets() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

function setPresets(presets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric" }).format(new Date(value));
}

function selectedSlides() {
  return state.selected.map(id => slideById.get(id)).filter(Boolean);
}

function selectedSectionIds() {
  return [...new Set(selectedSlides().map(slide => slide.section))];
}

function visibleSlides() {
  const catalog = slides.filter(slide => !slide.legacy);
  if (state.activeSection !== "all") return catalog.filter(slide => slide.section === state.activeSection);
  return catalog
    .map((slide, sourceIndex) => ({ slide, sourceIndex }))
    .sort((left, right) => (
      sectionOrderById.get(left.slide.section) - sectionOrderById.get(right.slide.section)
      || left.sourceIndex - right.sourceIndex
    ))
    .map(({ slide }) => slide);
}

function pageNumberInSection(slide) {
  return slides.filter(candidate => !candidate.legacy && candidate.section === slide.section).indexOf(slide) + 1;
}

function pageCode(slide) {
  const pageNumber = pageNumberInSection(slide);
  return pageNumber > 0 ? `${sectionById.get(slide.section).index}.${pageNumber}` : sectionById.get(slide.section).index;
}

function renderTabs() {
  const all = [{ id: "all", label: "全部页面", index: "A" }, ...sections];
  sectionTabs.innerHTML = all.map(section => `<button class="section-tab ${state.activeSection === section.id ? "active" : ""}" type="button" data-section="${section.id}"><span class="tab-index">${section.index}</span>${section.label}</button>`).join("");
}

const THUMBNAIL_NATIVE_WIDTH = 1440;

function scaleSlidePreview(preview) {
  const thumbnail = preview.closest(".slide-thumb");
  if (!thumbnail) return;
  preview.style.transform = `scale(${thumbnail.clientWidth / THUMBNAIL_NATIVE_WIDTH})`;
}

function scaleSlidePreviews() {
  document.querySelectorAll(".slide-preview").forEach(scaleSlidePreview);
}

function renderLibrary() {
  const visible = visibleSlides();
  const template = $("#slideCardTemplate");
  slideLibrary.innerHTML = "";
  visible.forEach(slide => {
    const node = template.content.firstElementChild.cloneNode(true);
    const section = sectionById.get(slide.section);
    node.dataset.slideId = slide.id;
    const preview = node.querySelector(".slide-preview");
    preview.src = `thumbnail.html?slide=${encodeURIComponent(slide.id)}`;
    preview.title = `${slide.title} 的页面缩略图`;
    node.dataset.pageCode = pageCode(slide);
    node.querySelector(".card-kicker").textContent = `${pageCode(slide)} · ${section.label}`;
    node.querySelector("h2").textContent = slide.title;
    const add = node.querySelector(".add-slide");
    const selected = state.selected.includes(slide.id);
    node.classList.toggle("is-selected", selected);
    add.textContent = selected ? "已加入 ✓" : "加入";
    add.setAttribute("aria-label", `${selected ? "移除" : "加入"} ${pageCode(slide)} ${slide.title}`);
    add.addEventListener("click", () => toggleSlide(slide.id));
    slideLibrary.append(node);
    scaleSlidePreview(preview);
  });
  window.requestAnimationFrame(scaleSlidePreviews);
}

function renderBulkControls() {
  const visible = visibleSlides();
  const selectedCount = visible.filter(slide => state.selected.includes(slide.id)).length;
  const currentLabel = state.activeSection === "all" ? "全部页面" : sectionById.get(state.activeSection).label;
  const button = $("#addVisibleSlides");
  $("#visibleSelectionStatus").textContent = `${currentLabel}：已加入 ${selectedCount} / ${visible.length} 张`;
  button.textContent = selectedCount === visible.length ? "已全部加入" : `全选加入 ${visible.length - selectedCount} 张`;
  button.disabled = selectedCount === visible.length;
  $("#clearSelectedSlides").disabled = state.selected.length === 0;
}

function renderSelection() {
  const selected = selectedSlides();
  selectionList.innerHTML = "";
  emptySelection.hidden = selected.length > 0;
  selectionList.hidden = selected.length === 0;
  selected.forEach((slide, index) => {
    const item = document.createElement("li");
    item.className = "selection-item";
    item.draggable = true;
    item.dataset.slideId = slide.id;
    item.innerHTML = `<span class="selection-number">${String(index + 1).padStart(2, "0")}</span><div class="selection-content"><p class="selection-title">${escapeHtml(slide.title)}</p><p class="selection-section">${escapeHtml(pageCode(slide))} · ${escapeHtml(sectionById.get(slide.section).label)}</p></div><button class="remove-slide" type="button" aria-label="移除 ${escapeHtml(pageCode(slide))} ${escapeHtml(slide.title)}">×</button>`;
    item.querySelector(".remove-slide").addEventListener("click", () => toggleSlide(slide.id));
    item.addEventListener("dragstart", event => { item.classList.add("dragging"); event.dataTransfer.effectAllowed = "move"; });
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
    item.addEventListener("dragover", event => event.preventDefault());
    item.addEventListener("drop", event => {
      event.preventDefault();
      const dragged = selectionList.querySelector(".dragging");
      if (!dragged || dragged === item) return;
      const from = state.selected.indexOf(dragged.dataset.slideId);
      const to = state.selected.indexOf(item.dataset.slideId);
      const [moved] = state.selected.splice(from, 1);
      state.selected.splice(to, 0, moved);
      renderAll();
    });
    selectionList.append(item);
  });
  $("#selectionCount").textContent = `${selected.length} 张内容页`;
  $("#sectionCount").textContent = `${selectedSectionIds().length} 个板块`;
}

function renderPresets() {
  const presets = getPresets();
  const container = $("#presetList");
  container.innerHTML = presets.length ? "" : `<p style="margin:0;color:#aaa;font-size:11px">尚未保存组合</p>`;
  presets.forEach(preset => {
    const line = document.createElement("div");
    line.className = `preset ${state.currentId === preset.id ? "is-active" : ""}`;
    line.innerHTML = `<button type="button" class="preset-load">${escapeHtml(preset.name)}<span>${formatDate(preset.updatedAt)}</span></button><button type="button" class="preset-delete" aria-label="删除 ${escapeHtml(preset.name)}">×</button>`;
    line.querySelector(".preset-load").addEventListener("click", () => loadPreset(preset.id));
    line.querySelector(".preset-delete").addEventListener("click", () => deletePreset(preset.id));
    container.append(line);
  });
}

function renderAll() {
  renderTabs();
  renderLibrary();
  renderSelection();
  renderBulkControls();
  renderPresets();
  $("#libraryTotal").textContent = slides.filter(slide => !slide.legacy).length;
}

function toggleSlide(id) {
  const index = state.selected.indexOf(id);
  if (index >= 0) state.selected.splice(index, 1);
  else state.selected.push(id);
  renderAll();
}

function addVisibleSlides() {
  const selectedIds = new Set(state.selected);
  state.selected.push(...visibleSlides().map(slide => slide.id).filter(id => !selectedIds.has(id)));
  renderAll();
}

function clearSelectedSlides() {
  state.selected = [];
  renderAll();
}

function persistComposition(name) {
  const presets = getPresets();
  const now = new Date().toISOString();
  const payload = { id: state.currentId || crypto.randomUUID(), name, slideIds: state.selected, updatedAt: now };
  const existing = presets.findIndex(preset => preset.id === payload.id);
  if (existing >= 0) presets[existing] = payload;
  else presets.unshift(payload);
  state.currentId = payload.id;
  compositionName.value = name;
  setPresets(presets);
  renderPresets();
  const button = $("#saveComposition");
  button.textContent = "已保存 ✓";
  setTimeout(() => { button.textContent = "命名并保存"; }, 1400);
}

function openSaveDialog() {
  saveCompositionName.value = compositionName.value.trim() || "未命名演讲";
  saveDialog.showModal();
  saveCompositionName.focus();
  saveCompositionName.select();
}

function saveComposition(event) {
  event.preventDefault();
  const name = saveCompositionName.value.trim();
  if (!name) {
    saveCompositionName.focus();
    return;
  }
  persistComposition(name);
  saveDialog.close();
}

function loadPreset(id) {
  const preset = getPresets().find(item => item.id === id);
  if (!preset) return;
  state.currentId = preset.id;
  state.selected = preset.slideIds.filter(slideId => slideById.has(slideId));
  compositionName.value = preset.name;
  renderAll();
}

function deletePreset(id) {
  const presets = getPresets().filter(preset => preset.id !== id);
  setPresets(presets);
  if (state.currentId === id) state.currentId = null;
  renderPresets();
}

function newComposition() {
  state.currentId = null;
  state.selected = [];
  compositionName.value = "未命名演讲";
  renderAll();
}

function duplicateComposition() {
  state.currentId = null;
  compositionName.value = `${compositionName.value.trim() || "未命名演讲"} · 副本`;
  renderPresets();
}

function exportComposition() {
  const payload = { type: "xfusion-ai-coding-composition", version: 1, name: compositionName.value.trim() || "未命名演讲", slideIds: state.selected, exportedAt: new Date().toISOString() };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${payload.name.replace(/[\\/:*?"<>|]/g, "-")}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function importComposition(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    const slideIds = Array.isArray(payload.slideIds) ? payload.slideIds.filter(id => slideById.has(id)) : [];
    if (!slideIds.length) throw new Error("没有可识别的页面");
    const preset = { id: crypto.randomUUID(), name: payload.name || "导入的演讲", slideIds, updatedAt: new Date().toISOString() };
    const presets = getPresets();
    presets.unshift(preset);
    setPresets(presets);
    loadPreset(preset.id);
  } catch {
    window.alert("导入失败：请选择由本编排器导出的组合文件。");
  } finally {
    event.target.value = "";
  }
}

function deckCover(name) {
  const pageCount = selectedSlides().length;
  const sectionCount = selectedSectionIds().length;
  return `<section class="presentation-slide cover-slide">
    <div class="cover-grid"></div>
    <div class="cover-glow cover-glow-one"></div><div class="cover-glow cover-glow-two"></div>
    <div class="cover-scanline"></div>
    <div class="cover-visual" aria-hidden="true">
      <span class="cover-visual-caption">AI CODING / ENGINEERING SYSTEM</span>
      <div class="cover-orbit cover-orbit-outer"></div><div class="cover-orbit cover-orbit-inner"></div>
      <span class="cover-connector cover-connector-model"></span><span class="cover-connector cover-connector-agent"></span><span class="cover-connector cover-connector-skill"></span><span class="cover-connector cover-connector-proof"></span>
      <div class="cover-node cover-node-model"><b>MODEL</b><span>推理能力</span></div>
      <div class="cover-node cover-node-agent"><b>AGENT</b><span>执行循环</span></div>
      <div class="cover-node cover-node-skill"><b>SKILL</b><span>团队复用</span></div>
      <div class="cover-node cover-node-proof"><b>PROOF</b><span>验证交付</span></div>
      <div class="cover-core"><span>AI</span><b>CODING</b><small>ENGINEERING<br>SYSTEM</small></div>
      <div class="cover-flow"><span>INTENT</span><i>→</i><span>PLAN</span><i>→</i><span>ACT</span><i>→</i><strong>PROOF</strong></div>
    </div>
    <img class="cover-brand-logo" src="assets/media/xfusion-logo.svg" alt="超聚变">
    <p class="slide-chapter">AI CODING · MODULAR DECK</p>
    <div class="cover-copy">
      <p class="cover-overline">FROM MODEL TO ENGINEERING</p>
      <h1 class="cover-title">${escapeHtml(name)}<span>。</span></h1>
      <i class="cover-line"></i>
      <p class="cover-lead">把模型、工具、工程方法与真实实践，编排成一条可验证的 AI Coding 交付路径。</p>
    </div>
    <div class="cover-meta"><b>${sectionCount}</b><span>个板块</span><i></i><b>${pageCount}</b><span>张内容页</span></div>
    <p class="cover-footnote">OFFLINE PRESENTATION LIBRARY · COMPOSABLE · VERIFIABLE</p>
  </section>`;
}

function deckToc() {
  const sectionIds = selectedSectionIds();
  const pageCountBySection = new Map(sectionIds.map(id => [id, selectedSlides().filter(slide => slide.section === id).length]));
  return `<section class="presentation-slide toc-slide">
    <div class="toc-grid"></div><p class="slide-chapter">CONTENT MAP · 当前组合</p>
    <div class="toc-head"><p class="toc-overline">TABLE OF CONTENTS</p><h2 class="slide-title">本次演讲的<span>内容导航</span></h2><p class="slide-subtitle">按当前选入页面自动生成；每一个板块都可以独立取用，也能顺着一条学习路径播放。</p></div>
    <div class="toc-summary"><b>${selectedSlides().length}</b><span>内容页</span><i></i><strong>${sectionIds.length}</strong><span>个板块</span></div>
    <div class="toc-list">${sectionIds.map(id => { const section = sectionById.get(id); return `<div class="toc-item"><b>${section.index}</b><span><strong>${section.label}</strong><small>${pageCountBySection.get(id)} 张已选页面</small></span><i>→</i></div>`; }).join("")}</div>
    <p class="toc-footnote">AI CODING · 模型、工具、方法与落地实践</p>
  </section>`;
}

function deckEnd() {
  return `<section class="presentation-slide end-slide">
    <div class="end-grid"></div><div class="end-orbit end-orbit-one"></div><div class="end-orbit end-orbit-two"></div>
    <p class="end-kicker">AI CODING · FROM KNOWING TO DOING</p>
    <div class="end-copy"><h2>让开发者拥有 <b>AI 伙伴</b>。</h2><p>让企业构建研发新生产力</p></div>
    <div class="end-route"><span>看懂趋势</span><i>→</i><span>掌握工具</span><i>→</i><span>开始交付</span></div>
    <p class="end-footnote">谢谢 · 现在就选择一个真实问题，开始第一轮协作。</p>
  </section>`;
}

function scaleSourceFrames(root = document) {
  root.querySelectorAll(".source-frame-slide").forEach(slide => {
    slide.style.setProperty("--source-slide-scale", String(slide.clientWidth / 1440));
  });
}

function scalePlayerCanvas() {
  const stage = $("#deckStage");
  const slide = stage.querySelector(".presentation-slide");
  if (!slide) return;
  const scale = Math.min(stage.clientWidth / 1440, stage.clientHeight / 810);
  slide.style.setProperty("--player-scale", String(Math.max(0, scale)));
}

function openPlayer() {
  if (!state.selected.length) {
    window.alert("请先从内容库加入至少一张页面。");
    return;
  }
  const name = compositionName.value.trim() || "未命名演讲";
  state.deck = [deckCover(name), deckToc(), ...selectedSlides().map(slide => slide.render()), deckEnd()];
  state.playerIndex = 0;
  $("#playerDeckName").textContent = name;
  player.classList.add("is-open");
  player.setAttribute("aria-hidden", "false");
  renderPlayer();
}

function renderPlayer() {
  const stage = $("#deckStage");
  stage.innerHTML = state.deck[state.playerIndex];
  scalePlayerCanvas();
  scaleSourceFrames(stage);
  const index = stage.querySelector(".slide-index");
  if (index) index.textContent = `${String(state.playerIndex + 1).padStart(2, "0")} / ${String(state.deck.length).padStart(2, "0")}`;
  $("#playerCounter").textContent = `${state.playerIndex + 1} / ${state.deck.length}`;
  $("#playerProgress").style.width = `${((state.playerIndex + 1) / state.deck.length) * 100}%`;
}

function movePlayer(delta) {
  const next = Math.max(0, Math.min(state.deck.length - 1, state.playerIndex + delta));
  if (next !== state.playerIndex) {
    state.playerIndex = next;
    renderPlayer();
  }
}

function closePlayer() {
  player.classList.remove("is-open");
  player.setAttribute("aria-hidden", "true");
  if (document.fullscreenElement) document.exitFullscreen();
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen();
  else player.requestFullscreen?.();
}

sectionTabs.addEventListener("click", event => {
  const button = event.target.closest("[data-section]");
  if (!button) return;
  state.activeSection = button.dataset.section;
  renderTabs();
  renderLibrary();
  renderBulkControls();
});

$("#saveComposition").addEventListener("click", openSaveDialog);
$("#saveCompositionForm").addEventListener("submit", saveComposition);
$("#cancelSaveComposition").addEventListener("click", () => saveDialog.close());
$("#cancelSaveCompositionText").addEventListener("click", () => saveDialog.close());
$("#newComposition").addEventListener("click", newComposition);
$("#duplicateComposition").addEventListener("click", duplicateComposition);
$("#addVisibleSlides").addEventListener("click", addVisibleSlides);
$("#clearSelectedSlides").addEventListener("click", clearSelectedSlides);
$("#playComposition").addEventListener("click", openPlayer);
$("#exportComposition").addEventListener("click", exportComposition);
$("#importButton").addEventListener("click", () => $("#importInput").click());
$("#importInput").addEventListener("change", importComposition);
$("#closePlayer").addEventListener("click", closePlayer);
$("#fullscreenButton").addEventListener("click", toggleFullscreen);
$("#helpButton").addEventListener("click", () => $("#helpDialog").showModal());
$(".close-dialog").addEventListener("click", () => $("#helpDialog").close());
document.addEventListener("keydown", event => {
  if (!player.classList.contains("is-open")) return;
  if (["ArrowRight", " ", "PageDown"].includes(event.key)) { event.preventDefault(); movePlayer(1); }
  if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); movePlayer(-1); }
  if (event.key.toLowerCase() === "f") toggleFullscreen();
  if (event.key === "Escape") closePlayer();
});

window.addEventListener("resize", () => {
  scaleSlidePreviews();
  scalePlayerCanvas();
  scaleSourceFrames($("#deckStage"));
});
document.addEventListener("fullscreenchange", () => {
  scalePlayerCanvas();
  scaleSourceFrames($("#deckStage"));
});

renderAll();
void loadLessonContent();
