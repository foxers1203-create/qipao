// 构建后处理：为 ESM 产物注入 __webpack_require__ 声明（webpack 5 outputModule 的已知问题）
// 用法：node postbuild.mjs  （在 tavern_helper_template 根目录运行）
import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'node:fs';

const htmlFiles = globSync('dist/**/界面/**/index.html');
let fixed = 0;
for (const f of htmlFiles) {
  let html = fs.readFileSync(f, 'utf8');
  if (html.includes('var __webpack_require__')) continue;
  const marker = "import{createPinia as a,defineStore as t}from'https://testingcf.jsdelivr.net/npm/pinia@3.0.4/+esm';";
  if (html.includes(marker)) {
    html = html.replace(marker, marker + 'var __webpack_require__=__webpack_require__||{};');
    fs.writeFileSync(f, html, 'utf8');
    fixed++;
    console.log('[postbuild] injected __webpack_require__ ->', f);
  }
}
console.log(`[postbuild] done, fixed ${fixed} file(s)`);
