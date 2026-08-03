from pathlib import Path
import re

from playwright.sync_api import sync_playwright

SINGLE_LINE_GLYPH_OVERHANG_PX = 6
SINGLE_LINE_HORIZONTAL_OVERHANG_PX = 4


def assert_text(page, selector, expected):
    value = page.locator(selector).inner_text()
    assert expected in value, f"expected {expected!r} in {value!r}"


def assert_single_line_title(locator):
    title = locator.inner_text().strip()
    metrics = locator.evaluate(
        """el => {
            const range = document.createRange();
            range.selectNodeContents(el);
            const lineTops = [...range.getClientRects()]
                .filter(rect => rect.width > 0 && rect.height > 0)
                .map(rect => Math.round(rect.top));
            return {
                clientWidth: el.clientWidth,
                scrollWidth: el.scrollWidth,
                clientHeight: el.clientHeight,
                scrollHeight: el.scrollHeight,
                lineTops: [...new Set(lineTops)],
                whiteSpace: getComputedStyle(el).whiteSpace,
                fontSize: getComputedStyle(el).fontSize,
                lineHeight: getComputedStyle(el).lineHeight,
                top: Math.round(el.getBoundingClientRect().top),
                height: Math.round(el.getBoundingClientRect().height),
                relativeTopPct: ((el.getBoundingClientRect().top - el.closest('.presentation-slide').getBoundingClientRect().top) / el.closest('.presentation-slide').getBoundingClientRect().height) * 100,
                display: getComputedStyle(el).display,
            };
        }"""
    )
    assert metrics["whiteSpace"] == "nowrap", f"标题未设为单行：{title}"
    assert metrics["scrollWidth"] <= metrics["clientWidth"] + SINGLE_LINE_HORIZONTAL_OVERHANG_PX, f"标题横向溢出：{title} ({metrics})"
    assert metrics["scrollHeight"] <= metrics["clientHeight"] + SINGLE_LINE_GLYPH_OVERHANG_PX, f"标题出现多行：{title} ({metrics})"
    assert len(metrics["lineTops"]) == 1, f"标题出现多行：{title} ({metrics})"
    return metrics


def assert_uniform_header_rail(metrics_by_slide, element_name):
    """Every content slide must match the C.4 header reference."""
    baseline_id = "tools-personal-choice"
    baseline = metrics_by_slide[baseline_id]
    for slide_id, metrics in metrics_by_slide.items():
        for property_name in ("fontSize", "lineHeight", "top", "height"):
            assert metrics[property_name] == baseline[property_name], (
                f"{element_name}格式不一致：{slide_id} 的 {property_name} 为 {metrics[property_name]!r}，"
                f"应与 {baseline_id} 的 {baseline[property_name]!r} 一致"
            )


def assert_title_raised_after_kicker_removal(metrics_by_slide):
    for slide_id, metrics in metrics_by_slide.items():
        assert 10 <= metrics["relativeTopPct"] <= 11, (
            f"标题未在删除第二行标题后上移：{slide_id} 的相对顶距为 "
            f"{metrics['relativeTopPct']:.2f}%"
        )


def assert_slide_font_minimum():
    styles = Path("styles.css").read_text()
    slide_styles = styles[styles.index(".presentation-slide{"):]
    minima = [
        *re.findall(r"clamp\(\s*([0-9.]+)px\s*,", slide_styles),
        *re.findall(r"font-size:\s*([0-9.]+)px", slide_styles),
        *re.findall(r"font:\s*(?:[1-9]00\s+)?([0-9.]+)px", slide_styles),
    ]
    assert all(float(value) >= 10 for value in minima), f"PPT 字号低于 10px：{minima}"


assert_slide_font_minimum()


with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    )
    page = browser.new_page(viewport={"width": 1440, "height": 960}, device_scale_factor=1)
    errors = []
    source_requests = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("request", lambda request: source_requests.append(request.url) if "/source/" in request.url else None)
    page.goto("http://127.0.0.1:4173", wait_until="networkidle")
    page.wait_for_function("Number(document.querySelector('#libraryTotal').textContent) == 50")

    assert page.locator(".slide-card").count() == 50
    assert "6 SECTIONS" in page.locator(".section-heading .eyebrow").inner_text()
    assert page.locator(".section-tab .tab-index").all_inner_texts() == list("ABCDEFG")
    assert page.locator(".section-tab").all_inner_texts() == [
        "A全部页面",
        "B历史与趋势",
        "C模型与工具",
        "D工程方法",
        "E入门实践",
        "F企业解决方案",
        "G内部实践与客户案例",
    ]
    assert page.locator('[data-slide-id="history-vibe-coding-timeline"] .card-kicker').inner_text() == "B.1 · 历史与趋势"
    assert page.locator('[data-slide-id="history-agentic-maturity"] .card-kicker').inner_text() == "B.2 · 历史与趋势"
    assert page.locator('[data-slide-id="history-market-evidence"] .card-kicker').inner_text() == "B.3 · 历史与趋势"
    assert page.locator('[data-slide-id="tools-three-layers"] .card-kicker').inner_text() == "C.1 · 模型与工具"
    assert page.locator('[data-slide-id="tools-private-model-benchmark"] .card-kicker').inner_text() == "C.2 · 模型与工具"
    assert page.locator('[data-slide-id="tools-personal-choice"] .card-kicker').inner_text() == "C.4 · 模型与工具"
    assert page.locator('[data-slide-id="skills-concept"] .card-kicker').inner_text() == "C.5 · 模型与工具"
    assert page.locator('[data-slide-id="skills-common-map"] .card-kicker').inner_text() == "C.6 · 模型与工具"
    assert page.locator(".selection-item .selection-section").all_inner_texts() == [
        "B.1 · 历史与趋势",
        "C.1 · 模型与工具",
        "D.1 · 工程方法",
        "E.1 · 入门实践",
        "F.1 · 企业解决方案",
        "G.1 · 内部实践与客户案例",
    ]
    assert page.locator(".slide-preview").count() == 50
    first_preview = page.locator(".slide-preview").first
    assert first_preview.get_attribute("src") == "thumbnail.html?slide=history-vibe-coding-timeline"
    assert page.locator(".thumb-art").count() == 0
    page.frame_locator(".slide-preview").first.locator(".vibe-history-slide").wait_for()
    vibe_preview = page.frame_locator('[data-slide-id="history-vibe-coding-timeline"] .slide-preview')
    vibe_preview.locator(".vibe-history-slide").wait_for()
    assert vibe_preview.locator(".history-journey-node").count() == 6
    market_preview = page.frame_locator('[data-slide-id="history-market-evidence"] .slide-preview')
    assert market_preview.locator(".slide-chapter").is_visible()
    assert market_preview.locator(".slide-logo").is_visible()
    assert market_preview.locator(".market-reference-domain").count() == 1
    assert market_preview.locator(".market-reference-stack > section").count() == 3
    assert market_preview.locator(".market-company-grid article").count() == 2
    assert "49.7%" in market_preview.locator(".market-reference-domain").inner_text()
    assert "$2.5B+" in market_preview.locator(".market-reference-arr").inner_text()
    expected_section_counts = {
        "history": 3,
        "tools": 6,
        "methods": 11,
        "practice": 7,
        "solution": 20,
        "proof": 3,
    }
    standard_slide_ids = [
        "history-market-evidence", "history-agentic-maturity", "history-vibe-coding-timeline",
        "tools-three-layers", "tools-private-model-benchmark", "agent-loop",
        "tools-personal-choice", "skills-concept", "skills-common-map",
        "methods-engineering-evolution", "methods-agent-failure-patterns", "methods-control-loop",
        "methods-harness-guardrails", "methods-industry-consensus", "methods-framework-boundary",
        "practice-first-session", "practice-run-scaffold", "practice-agent-rules",
        "practice-install-grill-me", "practice-shape-task", "practice-terminal-change", "practice-proof",
        "proof-roi", "proof-guangdong-case", "proof-practice-infrastructure",
    ]
    title_metrics = {}
    chapter_metrics = {}
    for slide_id in standard_slide_ids:
        card = page.locator(f'.slide-card[data-slide-id="{slide_id}"]')
        card.scroll_into_view_if_needed()
        preview = card.frame_locator(".slide-preview")
        title = preview.locator(".slide-title")
        chapter = preview.locator(".slide-chapter")
        title.wait_for(state="visible")
        chapter.wait_for(state="visible")
        assert preview.locator(".slide-kicker").count() == 0, f"页面仍存在第二行标题：{slide_id}"
        title_metrics[slide_id] = assert_single_line_title(title)
        chapter_metrics[slide_id] = assert_single_line_title(chapter)
    assert page.locator(".source-page-kicker").count() == 0
    assert "客户交流材料" not in page.locator("body").inner_text()
    solution_slide_ids = [
        ("solution-challenges", "solution-challenges"),
        ("solution-security-cost-challenges", "security-cost-challenges"),
        ("solution-model-agent-evolution-challenges", "model-agent-evolution-challenges"),
        ("solution-performance-challenges", "performance-challenges"),
        ("solution-token-management-challenges", "token-management-challenges"),
        ("solution-team-delivery-challenges", "team-delivery-challenges"),
        ("solution-overview", "solution-overview"),
        ("private-security", "private-security"), ("model-day0", "model-day0"), ("model-ever", "model-ever"),
        ("coding-helper", "coding-helper"), ("smart-accel", "smart-accel"), ("smart-qos", "smart-qos"),
        ("smart-scenario", "smart-scenario"), ("roi-tokenops", "roi-tokenops"),
        ("team-add-solution", "team-add-solution"), ("team-quality-knowledge", "team-quality-knowledge"),
        ("team-project-proof", "team-project-proof"), ("unified-skills", "unified-skills"),
        ("deploy-selection", "deploy-selection"),
    ]
    for slide_id, source_page in solution_slide_ids:
        preview = page.frame_locator(f'[data-slide-id="{slide_id}"] .slide-preview')
        title = preview.locator(".source-frame-slide > .slide-title")
        chapter = preview.locator(".source-frame-slide > .slide-chapter")
        title.wait_for(state="visible")
        chapter.wait_for(state="visible")
        assert preview.locator(".source-frame-slide > .slide-kicker").count() == 0, f"页面仍存在第二行标题：{slide_id}"
        title_metrics[slide_id] = assert_single_line_title(title)
        chapter_metrics[slide_id] = assert_single_line_title(chapter)
        solution_frame = preview.frame_locator(".source-slide-frame")
        source_title = solution_frame.locator(f"#{source_page} .canvas > h2")
        source_title.wait_for(state="attached")
        source_canvas = solution_frame.locator(f"#{source_page} .canvas")
        assert source_canvas.evaluate("el => getComputedStyle(el).transform") != "none", (
            f"嵌入页内容未随标题上移：{slide_id}"
        )
        assert source_title.evaluate("el => getComputedStyle(el).visibility") == "hidden", (
            f"嵌入页原始标题仍显示：{slide_id}"
        )
        assert solution_frame.locator(f"#{source_page}").evaluate(
            "el => getComputedStyle(el, '::after').display"
        ) == "none", f"原始页码仍显示：{slide_id}"
    f4_preview = page.frame_locator('[data-slide-id="solution-performance-challenges"] .slide-preview')
    f4_frame = f4_preview.frame_locator(".source-slide-frame")
    f4_frame.locator("#performance-challenges").wait_for(state="visible")
    assert f4_frame.locator(".performance-theme-card").count() == 3
    f4_text = f4_frame.locator("#performance-challenges").inner_text()
    for phrase in [
        "并发洪峰", "为什么人一多，响应就一起慢？", "资源争用 → 请求排队 → 高峰期任务超时",
        "上下文膨胀", "为什么代码越完整，Agent 越容易卡住？", "上下文膨胀 → KV Cache 打满 → 首 Token 延迟升高",
        "多轮调用", "为什么任务越自动，链路越容易失控？", "调用放大 → 输出中断 → 任务无法稳定闭环",
    ]:
        assert phrase in f4_text, f"F.4 主题内容缺失：{phrase}"
    assert f4_frame.locator("#performance-challenges img").count() == 0
    assert f4_frame.locator(".original-evidence-shot").count() == 0
    assert_uniform_header_rail(title_metrics, "标题")
    assert_title_raised_after_kicker_removal(title_metrics)
    assert_uniform_header_rail(chapter_metrics, "章节行")
    for section, expected_count in expected_section_counts.items():
        page.locator(f'[data-section="{section}"]').click()
        assert page.locator(".slide-card").count() == expected_count
    page.locator('[data-section="practice"]').click()
    assert_text(page, "#visibleSelectionStatus", "已加入 1 / 7 张")
    practice_previews = [
        ("practice-first-session", "practice-first-session-slide"),
        ("practice-run-scaffold", "practice-repository-slide"),
        ("practice-agent-rules", "practice-agent-rules-slide"),
        ("practice-install-grill-me", "practice-install-skill-slide"),
        ("practice-shape-task", "practice-grilling-slide"),
        ("practice-terminal-change", "practice-one-shot-slide"),
        ("practice-proof", "practice-final-proof-slide"),
    ]
    for slide_id, class_name in practice_previews:
        preview = page.frame_locator(f'[data-slide-id="{slide_id}"] .slide-preview')
        preview.locator(f".{class_name}").wait_for()
        assert preview.locator(".slide-kicker").count() == 0
        assert preview.locator('.practice-sim-slide[data-terminal-mode="simulated"]').count() == 1
        assert preview.locator(".practice-sim-terminal").count() == 1
        assert preview.locator(".practice-sim-guide").count() == 1
        assert "模拟回放" in preview.locator(".practice-sim-terminal").inner_text()
    assert "AGENTS.md" in page.frame_locator('[data-slide-id="practice-agent-rules"] .slide-preview').locator(
        ".practice-agent-rules-slide"
    ).inner_text()
    skill_text = page.frame_locator('[data-slide-id="practice-install-grill-me"] .slide-preview').locator(
        ".practice-install-skill-slide"
    ).inner_text()
    assert "grill-me" in skill_text
    assert "--agent opencode --yes" in skill_text
    page.locator('[data-section="all"]').click()
    assert_text(page, "#selectionCount", "6 张内容页")

    page.locator('[data-section="tools"]').click()
    model_benchmark_card = page.locator('[data-slide-id="tools-private-model-benchmark"]')
    assert model_benchmark_card.count() == 1
    model_benchmark_preview = page.frame_locator('[data-slide-id="tools-private-model-benchmark"] .slide-preview')
    model_benchmark_preview.locator(".model-snapshot-slide").wait_for()
    benchmark_text = model_benchmark_preview.locator(".benchmark-table").inner_text()
    assert "Kimi K3" in benchmark_text
    assert "Claude Fable 5" in benchmark_text
    assert "SWE-bench" in benchmark_text and "Verified" in benchmark_text
    assert "Frontend" in benchmark_text and "Code Arena" in benchmark_text
    assert "1,679" in benchmark_text
    assert "93.4%" in benchmark_text
    assert "FrontierSWE" not in benchmark_text
    assert "Dominance" not in benchmark_text
    assert model_benchmark_preview.locator(".benchmark-head > *").count() == 4
    assert model_benchmark_preview.locator(".benchmark-row").count() == 6
    assert model_benchmark_preview.locator(".benchmark-row").first.inner_text().startswith("开放权重 · Kimi K3")
    assert model_benchmark_preview.locator(".benchmark-row > strong:last-child").all_inner_texts() == [
        "1,679\n#1",
        "1,631\n#2",
        "1,618\n#3",
        "1,587\n#4",
        "1,562\n#5",
        "—\n未披露",
    ]
    assert "DeepSeek-V4-Flash-0731" in benchmark_text
    assert "82.7" in benchmark_text
    assert "DeepSWE" in benchmark_text and "Toolathlon verified" in benchmark_text
    assert "Agent Last Exam" in benchmark_text and "DSBench-Hard" in benchmark_text
    assert "POSITIONING · 5 + 1 UPDATE" in model_benchmark_preview.locator(".benchmark-reading").inner_text()
    assert "GPT-5.5" not in benchmark_text
    assert "Claude Opus 4.7" not in benchmark_text
    assert "DeepSeek-V4-Pro" not in benchmark_text

    personal_tool_preview = page.frame_locator('[data-slide-id="tools-personal-choice"] .slide-preview')
    personal_tool_preview.locator(".personal-tool-choice-slide").wait_for()
    assert personal_tool_preview.locator(".tool-choice-grid article").count() == 7
    personal_tool_text = personal_tool_preview.locator(".personal-tool-choice-slide").inner_text()
    for tool_name in ["VS Code + Copilot", "Cursor", "TRAE", "OpenCode", "Claude Code", "Codex CLI", "Kimi Code CLI"]:
        assert tool_name in personal_tool_text
    assert personal_tool_preview.locator(".tool-choice-grid article p").first.evaluate(
        "el => getComputedStyle(el).fontSize"
    ) == "12px"

    skill_concept_preview = page.frame_locator('[data-slide-id="skills-concept"] .slide-preview')
    skill_concept_preview.locator(".skill-concept-slide").wait_for()
    assert skill_concept_preview.locator(".skill-tree p").count() == 4
    assert skill_concept_preview.locator(".skill-boundary-grid article").count() == 4
    assert "渐进加载" in skill_concept_preview.locator(".skill-concept-slide").inner_text()

    skill_map_preview = page.frame_locator('[data-slide-id="skills-common-map"] .slide-preview')
    skill_map_preview.locator(".skill-map-slide").wait_for()
    assert skill_map_preview.locator(".skill-map-grid article").count() == 7
    assert skill_map_preview.locator(".skill-audit-flow > div").count() == 4
    assert "gh-fix-ci" in skill_map_preview.locator(".skill-map-slide").inner_text()

    page.locator('[data-section="solution"]').click()
    assert_text(page, "#visibleSelectionStatus", "已加入 1 / 20 张")
    solution_preview = page.frame_locator('[data-slide-id="solution-overview"] .slide-preview').locator(".source-slide-frame")
    assert solution_preview.get_attribute("src").startswith("slides/g-solution-material.html?embed=solution-overview")
    solution_preview_chrome = page.frame_locator('[data-slide-id="solution-overview"] .slide-preview').locator(".source-frame-slide")
    assert solution_preview_chrome.locator(".slide-chapter").inner_text() == "F.7 · 企业解决方案"
    assert solution_preview_chrome.locator(".slide-logo").is_visible()
    page.locator("#addVisibleSlides").click()
    assert_text(page, "#selectionCount", "25 张内容页")
    assert page.locator("#addVisibleSlides").is_disabled()
    page.locator("#clearSelectedSlides").click()
    assert_text(page, "#selectionCount", "0 张内容页")
    assert page.locator("#clearSelectedSlides").is_disabled()

    page.locator('[data-section="all"]').click()
    page.locator("#addVisibleSlides").click()
    assert_text(page, "#selectionCount", "50 张内容页")
    assert page.locator(".selection-item .selection-section").all_inner_texts() == (
        [f"B.{index} · 历史与趋势" for index in range(1, 4)]
        + [f"C.{index} · 模型与工具" for index in range(1, 7)]
        + [f"D.{index} · 工程方法" for index in range(1, 12)]
        + [f"E.{index} · 入门实践" for index in range(1, 8)]
        + [f"F.{index} · 企业解决方案" for index in range(1, 21)]
        + [f"G.{index} · 内部实践与客户案例" for index in range(1, 4)]
    )
    page.locator("#clearSelectedSlides").click()
    assert_text(page, "#selectionCount", "0 张内容页")
    for slide_id in [
        "agent-loop",
        "methods-engineering-evolution",
        "practice-first-session",
        "solution-overview",
        "proof-roi",
        "history-market-evidence",
        "tools-three-layers",
    ]:
        page.locator(f'[data-slide-id="{slide_id}"] .add-slide').click()
    assert_text(page, "#selectionCount", "7 张内容页")
    page.screenshot(path="/tmp/xfusion-composer.png", full_page=True)

    page.locator(".slide-card").first.locator(".add-slide").click()
    assert_text(page, "#selectionCount", "8 张内容页")
    page.locator(".slide-card").first.locator(".add-slide").click()
    assert_text(page, "#selectionCount", "7 张内容页")

    page.locator("#saveComposition").click()
    assert page.locator("#saveDialog").evaluate("dialog => dialog.open")
    page.locator("#saveCompositionName").fill("学生入门 · 45 分钟")
    page.locator("#saveCompositionForm button[type=submit]").click()
    assert page.locator(".preset").count() == 1
    assert "学生入门 · 45 分钟" in page.locator(".preset-load").first.inner_text()
    assert page.locator("#compositionName").input_value() == "学生入门 · 45 分钟"
    assert not page.locator("#saveDialog").evaluate("dialog => dialog.open")

    page.locator("#saveComposition").click()
    assert page.locator("#saveDialog").evaluate("dialog => dialog.open")
    assert page.locator("#saveCompositionName").input_value() == "学生入门 · 45 分钟"
    page.locator("#saveCompositionName").fill("学生入门 · 45 分钟 · 修订")
    page.locator("#saveCompositionForm button[type=submit]").click()
    assert page.locator(".preset").count() == 1
    assert "学生入门 · 45 分钟 · 修订" in page.locator(".preset-load").first.inner_text()

    source = page.locator(".selection-item").nth(5)
    target = page.locator(".selection-item").last
    source.drag_to(target)
    assert "Agent 不是聊天框" in page.locator(".selection-item").first.inner_text()
    assert "AI Coding 已成为 Agent 落地价值最清晰的场景" in page.locator(".selection-item").last.inner_text()

    page.locator("#playComposition").click()
    assert page.locator("#player").evaluate("el => el.classList.contains('is-open')")
    assert_text(page, "#playerCounter", "1 / 10")
    assert page.locator(".cover-slide .cover-lead").count() == 1
    assert "个板块" in page.locator(".cover-meta").inner_text()
    assert "张内容页" in page.locator(".cover-meta").inner_text()
    assert_single_line_title(page.locator(".cover-slide .cover-title"))
    page.keyboard.press("ArrowRight")
    assert_text(page, "#playerCounter", "2 / 10")
    assert page.locator(".toc-slide .toc-item").count() == 6
    assert "内容页" in page.locator(".toc-summary").inner_text()
    assert page.locator(".toc-slide .toc-item > b").first.inner_text().strip() == "C"
    assert page.locator(".toc-slide .toc-item > b").last.inner_text().strip() == "B"
    assert_single_line_title(page.locator(".toc-slide .slide-title"))
    page.keyboard.press("ArrowRight")
    assert page.locator(".agent-operating-loop-slide").count() == 1
    page.keyboard.press("ArrowRight")
    assert page.locator(".methods-evolution-slide").count() == 1
    page.keyboard.press("ArrowRight")
    practice_slide = page.locator(".practice-first-session-slide")
    assert practice_slide.count() == 1
    assert "AI Coding 入门清单" in practice_slide.inner_text()
    page.keyboard.press("ArrowRight")
    solution_frame = page.frame_locator("#deckStage .source-slide-frame")
    solution_frame.locator("#solution-overview").wait_for(state="visible")
    assert "助力客户构建最优研发基础设施" in page.locator(
        "#deckStage .source-frame-slide > .slide-title"
    ).inner_text()
    page.keyboard.press("ArrowRight")
    proof_slide = page.locator(".roi-evaluation-slide")
    assert proof_slide.count() == 1
    assert "AI Coding ROI" in proof_slide.inner_text()
    for _ in range(5):
        page.keyboard.press("ArrowRight")
    page.wait_for_timeout(450)
    page.screenshot(path="/tmp/xfusion-player.png", full_page=False)
    assert page.locator(".end-slide .end-route").count() == 1
    assert "开始交付" in page.locator(".end-route").inner_text()
    assert_single_line_title(page.locator(".end-slide .end-copy h2"))
    page.keyboard.press("Escape")
    assert not page.locator("#player").evaluate("el => el.classList.contains('is-open')")

    page.locator("#newComposition").click()
    assert_text(page, "#selectionCount", "0 张内容页")
    page.locator(".slide-card").first.locator(".add-slide").click()
    page.locator("#saveComposition").click()
    assert page.locator("#saveDialog").evaluate("dialog => dialog.open")
    page.locator("#saveCompositionName").fill("管理者 · 30 分钟")
    page.locator("#saveCompositionForm button[type=submit]").click()
    assert page.locator(".preset").count() == 2
    assert "管理者 · 30 分钟" in page.locator(".preset-load").first.inner_text()

    page.set_input_files(
        "#importInput",
        {
            "name": "imported-composition.json",
            "mimeType": "application/json",
            "buffer": '{"type":"xfusion-ai-coding-composition","version":1,"name":"导入组合","slideIds":["agent-loop","solution-overview"]}'.encode("utf-8"),
        },
    )
    page.wait_for_function("document.querySelector('#compositionName').value.includes('导入组合')")
    assert "导入组合" in page.locator("#compositionName").input_value()
    assert_text(page, "#selectionCount", "2 张内容页")

    page.locator('[data-section="solution"]').click()
    lifecycle_card = page.locator('[data-slide-id="model-day0"]')
    deployment_card = page.locator('[data-slide-id="deploy-selection"]')
    assert lifecycle_card.count() == 1
    assert deployment_card.count() == 1
    lifecycle_card.locator(".add-slide").click()
    assert_text(page, "#selectionCount", "3 张内容页")
    deployment_card.locator(".add-slide").click()
    assert_text(page, "#selectionCount", "4 张内容页")
    page.locator("#playComposition").click()
    for _ in range(4):
        page.keyboard.press("ArrowRight")
    solution_frame = page.frame_locator("#deckStage .source-slide-frame")
    solution_frame.locator("#model-day0").wait_for(state="visible")
    assert "Day 0 支持最新 Coding 模型当天可用" in page.locator(
        "#deckStage .source-frame-slide > .slide-title"
    ).inner_text()
    page.wait_for_timeout(450)
    page.screenshot(path="/tmp/enterprise-day0.png", full_page=False)
    page.keyboard.press("ArrowRight")
    solution_frame = page.frame_locator("#deckStage .source-slide-frame")
    solution_frame.locator("#deploy-selection").wait_for(state="visible")
    assert "按模型规模、并发和团队规模选择部署配置" in page.locator(
        "#deckStage .source-frame-slide > .slide-title"
    ).inner_text()
    page.keyboard.press("Escape")

    page.locator('[data-section="proof"]').click()
    case_card = page.locator(".slide-card").filter(has_text="广东移动网管：企业级 AI Coding 研发提效平台")
    assert case_card.count() == 1
    case_card.locator(".add-slide").click()
    assert_text(page, "#selectionCount", "5 张内容页")
    page.locator("#playComposition").click()
    for _ in range(6):
        page.keyboard.press("ArrowRight")
    assert page.locator(".case-study-slide").count() == 1
    assert "稳定并发 +67%" in page.locator(".case-study-slide").inner_text()
    page.wait_for_timeout(450)
    page.screenshot(path="/tmp/enterprise-case.png", full_page=False)
    page.keyboard.press("Escape")

    page.locator("#newComposition").click()
    page.locator('[data-section="history"]').click()
    market_card = page.locator(".slide-card").filter(has_text="AI Coding 已成为 Agent 落地价值最清晰的场景")
    maturity_card = page.locator(".slide-card").filter(has_text="Coding Agent 技术能力跨越，进入质变时刻")
    vibe_timeline_card = page.locator(".slide-card").filter(has_text="从 Vibe Coding 到 Agentic Engineering：工作单位如何变大")
    assert market_card.count() == 1
    assert maturity_card.count() == 1
    assert vibe_timeline_card.count() == 1
    market_card.locator(".add-slide").click()
    maturity_card.locator(".add-slide").click()
    vibe_timeline_card.locator(".add-slide").click()
    assert_text(page, "#selectionCount", "3 张内容页")
    page.locator("#playComposition").click()
    page.keyboard.press("ArrowRight")
    page.keyboard.press("ArrowRight")
    assert page.locator(".market-evidence-slide").count() == 1
    assert "49.7%" in page.locator(".market-evidence-slide").inner_text()
    assert page.locator(".market-evidence-slide figure img").get_attribute("src") == "assets/media/anthropic-agent-domains.png"
    page.wait_for_timeout(450)
    page.screenshot(path="/tmp/history-market-evidence.png", full_page=False)
    page.keyboard.press("ArrowRight")
    assert page.locator(".agent-maturity-slide").count() == 1
    assert page.locator(".maturity-reference-stage").count() == 3
    assert page.locator(".maturity-reference-grid article").count() == 5
    assert "FULL-STACK MATURITY" in page.locator(".agent-maturity-slide").inner_text()
    assert page.locator(".maturity-reference-arrival").count() == 1
    assert page.locator(".maturity-reference-grid p").first.evaluate("el => getComputedStyle(el).fontSize") == "12px"
    page.wait_for_timeout(450)
    page.screenshot(path="/tmp/history-agentic-maturity.png", full_page=False)
    page.keyboard.press("ArrowRight")
    assert page.locator(".vibe-history-slide").count() == 1
    assert page.locator(".history-journey-node").count() == 6
    assert "Vibe Coding 被命名" in page.locator(".vibe-history-slide").inner_text()
    assert page.locator(".vibe-history-slide .history-journey-board").count() == 1
    assert page.locator(".vibe-history-slide .history-workunit-transition article").count() == 3
    page.wait_for_timeout(450)
    page.screenshot(path="/tmp/history-vibe-coding-timeline.png", full_page=False)
    page.keyboard.press("Escape")

    page.locator("#newComposition").click()
    page.locator('[data-section="proof"]').click()
    roi_card = page.locator(".slide-card").filter(has_text="AI Coding ROI 应从效能与成本、商业价值两个层面评估")
    practice_card = page.locator(".slide-card").filter(has_text="两年实践，AI Coding 已成为研发基础设施")
    assert roi_card.count() == 1
    assert practice_card.count() == 1
    roi_card.locator(".add-slide").click()
    practice_card.locator(".add-slide").click()
    page.locator("#playComposition").click()
    page.keyboard.press("ArrowRight")
    page.keyboard.press("ArrowRight")
    assert page.locator(".roi-evaluation-slide").count() == 1
    assert "投入当年回正" in page.locator(".roi-evaluation-slide").inner_text()
    page.wait_for_timeout(450)
    page.screenshot(path="/tmp/customer-material-roi.png", full_page=False)
    page.keyboard.press("ArrowRight")
    assert page.locator(".practice-infrastructure-slide").count() == 1
    assert "150+" in page.locator(".practice-infrastructure-slide").inner_text()
    assert page.locator(".practice-dashboard-image img").evaluate("el => el.naturalWidth") > 0
    page.wait_for_timeout(450)
    page.screenshot(path="/tmp/customer-material-practice.png", full_page=False)
    page.keyboard.press("Escape")

    page.locator("#newComposition").click()
    page.locator('[data-section="solution"]').click()
    lifecycle_card = page.locator('[data-slide-id="model-day0"]')
    performance_card = page.locator('[data-slide-id="smart-accel"]')
    tokenops_card = page.locator('[data-slide-id="roi-tokenops"]')
    delivery_card = page.locator('[data-slide-id="team-add-solution"]')
    deployment_card = page.locator('[data-slide-id="deploy-selection"]')
    for card in [lifecycle_card, performance_card, tokenops_card, delivery_card, deployment_card]:
        assert card.count() == 1
    tokenops_card.locator(".add-slide").click()
    lifecycle_card.locator(".add-slide").click()
    performance_card.locator(".add-slide").click()
    assert_text(page, "#selectionCount", "3 张内容页")
    page.locator("#playComposition").click()
    page.keyboard.press("ArrowRight")
    page.keyboard.press("ArrowRight")
    solution_frame = page.frame_locator("#deckStage .source-slide-frame")
    solution_frame.locator("#roi-tokenops").wait_for(state="visible")
    assert solution_frame.locator("#roi-tokenops img").count() == 2
    page.wait_for_timeout(450)
    page.screenshot(path="/tmp/enterprise-tokenops.png", full_page=False)
    page.keyboard.press("ArrowRight")
    solution_frame = page.frame_locator("#deckStage .source-slide-frame")
    solution_frame.locator("#model-day0").wait_for(state="visible")
    assert solution_frame.locator("#model-day0 img").get_attribute("src").startswith("pic/day0")
    page.keyboard.press("ArrowRight")
    solution_frame = page.frame_locator("#deckStage .source-slide-frame")
    solution_frame.locator("#smart-accel").wait_for(state="visible")
    assert "吞吐 30%+" in page.locator(
        "#deckStage .source-frame-slide > .slide-title"
    ).inner_text()
    page.wait_for_timeout(450)
    page.screenshot(path="/tmp/enterprise-performance.png", full_page=False)
    page.keyboard.press("Escape")

    page.locator("#newComposition").click()
    page.locator('[data-section="tools"]').click()
    loop_card = page.locator(".slide-card").filter(has_text="Agent 不是聊天框：它在环境中循环")
    assert loop_card.count() == 1
    loop_card.locator(".add-slide").click()
    assert_text(page, "#selectionCount", "1 张内容页")
    page.locator("#playComposition").click()
    page.keyboard.press("ArrowRight")
    page.keyboard.press("ArrowRight")
    assert page.locator(".agent-operating-loop-slide").count() == 1
    assert page.locator(".agent-loop-path article").count() == 4
    page.wait_for_timeout(450)
    page.screenshot(path="/tmp/agent-operating-loop.png", full_page=False)
    page.keyboard.press("Escape")

    page.locator("#newComposition").click()
    page.locator('[data-section="methods"]').click()
    failure_card = page.locator(".slide-card").filter(has_text="Agent 的三类失败，都是运行环境没有把过程约束好")
    guardrail_card = page.locator(".slide-card").filter(has_text="驾驭工程的四大护栏，让 Agent 在边界内稳定执行")
    consensus_card = page.locator(".slide-card").filter(has_text="六大行业共识，把 Harness 从理念落到组织动作")
    framework_card = page.locator(".slide-card").filter(has_text="传统框架负责“构建 Agent”，Harness 负责“让它可靠运行”")
    for card in [failure_card, guardrail_card, consensus_card, framework_card]:
        assert card.count() == 1
        card.locator(".add-slide").click()
    assert_text(page, "#selectionCount", "4 张内容页")
    page.locator("#playComposition").click()
    page.keyboard.press("ArrowRight")
    page.keyboard.press("ArrowRight")
    assert page.locator(".methods-agent-failure-slide").count() == 1
    assert page.locator(".method-agent-failure-grid article").count() == 3
    assert page.locator(".method-failure-axis span").count() == 3
    page.keyboard.press("ArrowRight")
    assert page.locator(".methods-four-guardrails-slide").count() == 1
    assert page.locator(".method-guardrail-rail").count() == 1
    page.keyboard.press("ArrowRight")
    assert page.locator(".methods-consensus-slide").count() == 1
    assert page.locator(".method-consensus-grid article").count() == 6
    assert page.locator(".method-consensus-thesis").count() == 1
    page.wait_for_timeout(450)
    page.screenshot(path="/tmp/harness-consensus.png", full_page=False)
    page.keyboard.press("ArrowRight")
    assert page.locator(".methods-framework-relation-slide").count() == 1
    assert page.locator(".method-framework-table > div").count() == 2
    assert page.locator(".method-framework-bridge").count() == 1
    page.keyboard.press("Escape")

    assert not errors, "page errors: " + "; ".join(errors)
    assert not source_requests, "演示稿不应在运行时请求 source/：" + "; ".join(source_requests)

    local_page = browser.new_page()
    local_errors = []
    local_source_requests = []
    local_page.on("pageerror", lambda error: local_errors.append(str(error)))
    local_page.on("request", lambda request: local_source_requests.append(request.url) if "/source/" in request.url else None)
    local_page.goto(Path("index.html").resolve().as_uri(), wait_until="load")
    local_page.wait_for_function("Number(document.querySelector('#libraryTotal').textContent) == 50")
    assert local_page.locator(".slide-card").count() == 50
    local_preview = local_page.locator(".slide-preview").first
    assert local_preview.get_attribute("src") == "thumbnail.html?slide=history-vibe-coding-timeline"
    local_page.frame_locator(".slide-preview").first.locator(".vibe-history-slide").wait_for()
    local_page.locator("#newComposition").click()
    local_page.locator('[data-section="solution"]').click()
    local_day0_card = local_page.locator('[data-slide-id="model-day0"]')
    local_day0_card.locator(".add-slide").click()
    local_page.locator("#playComposition").click()
    local_page.keyboard.press("ArrowRight")
    local_page.keyboard.press("ArrowRight")
    local_solution_frame = local_page.frame_locator("#deckStage .source-slide-frame")
    local_day0_image = local_solution_frame.locator("#model-day0 img")
    local_day0_image.wait_for(state="visible")
    assert local_day0_image.evaluate("el => el.naturalWidth") > 0
    assert not local_errors, "file:// page errors: " + "; ".join(local_errors)
    assert not local_source_requests, "file:// 演示稿不应在运行时请求 source/：" + "; ".join(local_source_requests)

    browser.close()
