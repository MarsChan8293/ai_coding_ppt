# AI Coding 演讲编排器

这是一个完全离线的 HTML PPT 内容库与演讲编排器。页面库正在从“自动拆出的 110 张同版式页面”重构为按板块策展的高价值页面。当前库有 50 张可组合内容页，按六个内容板块组织；每页按内容采用不同的信息结构，而不是套用统一卡片。

## 本地打开

直接双击 [`index.html`](./index.html) 即可离线使用；课程源已经预打包为 `lesson-content.js`，不会因浏览器禁止本地 `fetch()` 而少页。

如果需要本地服务器预览，也可以在本目录启动：

```bash
python3 -m http.server 4173
```

然后在桌面 Chrome 或 Edge 中打开 `http://127.0.0.1:4173`。

## 编排流程

1. 从左侧页面库直接查看每张 HTML 页的真实缩略图并加入或移除内容页；A 为“全部页面”，B–G 为六个内容板块。每张内容页会以“板块字母.板块内序号”标识（例如 B.1、B.2），每个板块从 1 重新编号。A 下全选加入时，页面会按板块顺序加入；在任一板块下可一键加入当前可见页面。
2. 在右侧列表拖动页面调整顺序。
3. 右侧“全选清除”可一次清空当前组合；输入组合名称并“保存到浏览器”。
4. 点击“汇总并播放”：系统自动生成封面、目录和结束页。
5. 使用导入和导出功能，在安装完整内容库的其他电脑上恢复组合。

浏览器保存的信息只有组合名称与页面顺序；所有页面、图片、Logo、视频、样式和脚本都在本地目录中。

## 内容来源与维护

- 目标结构为六个可独立组合的板块：历史与趋势、模型与工具、工程方法、入门实践、企业解决方案、内部实践与客户案例。
- B–G 六个板块分别定义在 [`slides/b-history.js`](./slides/b-history.js)、[`slides/c-tools.js`](./slides/c-tools.js)、[`slides/e-methods.js`](./slides/e-methods.js)、[`slides/f-practice.js`](./slides/f-practice.js)、[`slides/g-solution.js`](./slides/g-solution.js) 和 [`slides/h-proof.js`](./slides/h-proof.js)。板块内页面顺序就是页面库中的编号顺序，页面 ID 须保持稳定以兼容已保存组合。
- 每张页面仍按信息性质使用双轨账本、发布流程、看板证据墙、运营链路、分层架构、成熟度路径、角色契约、状态机、控制回路、规格文件或门禁回流，而不是套用通用卡片。
- 趋势和客户数据页会保留原始材料中的统计时间与口径；预测、估算、样本统计和基准快照不会被表述为同口径的实时市场份额或统一排行榜。
- `lesson-manifest.js` 和 `lessons/` 仍是课程内容来源；`source-content.js` 保存从本地 HTML、PPTX 和 PDF 提炼的旧页内容。它们暂时从页面库隐藏，供后续按板块重制，并兼容已保存的旧组合。
- PDF 和 PPTX 不直接嵌入播放；视频可在专属演示页中本地播放。

课程内容的唯一编辑源仍是 `lessons/` 下的 MDX。修改课程后，执行以下命令更新离线内容包：

```bash
node scripts/build-lesson-content.mjs
```

## 验证

```bash
python3 /Users/chenmingmin/.agents/skills/webapp-testing/scripts/with_server.py \
  --server 'python3 -m http.server 4173' \
  --port 4173 \
  -- python3 tests/test_composer.py
```

该测试会验证页面库、加入/移除、拖拽排序、浏览器保存、组合导入、自动目录、键盘播放，以及本地视频和图片加载。
