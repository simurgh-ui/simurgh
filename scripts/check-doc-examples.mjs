import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';
import { compile as compileVue } from '../packages/vue/node_modules/vue/dist/vue.esm-bundler.js';
import { parseTemplate } from '../packages/angular/node_modules/@angular/compiler/fesm2022/compiler.mjs';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const files = (await readdir(docsRoot)).filter((name) => name.endsWith('.mdx')).sort();
const failures = [];
const counts = { react: 0, vue: 0, angular: 0, typescript: 0 };
let fencesChecked = 0;

function location(source, offset) {
  return source.slice(0, offset).split('\n').length;
}

function diagnosticText(diagnostic) {
  return ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ');
}

function compileTypeScript(code, jsx, label, contextual = false) {
  const normalized = code.replaceAll('…', jsx ? '{/* omitted */}' : 'undefined');
  let candidate = normalized;
  if (jsx && !/^\s*(?:import|export)/u.test(normalized)) {
    candidate = `function DocExample() { ${normalized}; return null; }`;
  } else if (contextual) {
    const lines = normalized.split('\n');
    const statements = lines.filter((line) => /^\s*this\./u.test(line));
    const members = lines.filter((line) => !/^\s*this\./u.test(line));
    candidate = `class DocExample { ${members.join('\n')} ${statements.length ? `run() { ${statements.join('\n')} }` : ''} }`;
  }
  const result = ts.transpileModule(candidate, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      experimentalDecorators: true,
    },
    fileName: jsx ? 'example.tsx' : 'example.ts',
    reportDiagnostics: true,
  });
  for (const diagnostic of result.diagnostics ?? []) {
    if (jsx && diagnostic.code === 2657) continue;
    failures.push(`${label}: ${diagnosticText(diagnostic)}`);
  }
}

function compileVueExample(code, label) {
  const script = code.match(/<script[^>]*>([\s\S]*?)<\/script>/u)?.[1];
  const template = code.match(/<template>([\s\S]*?)<\/template>/u)?.[1] ?? (script ? '' : code);
  if (script) compileTypeScript(script, false, label);
  if (!template.trim()) return;
  const errors = [];
  compileVue(template.replaceAll('…', '{{ undefined }}'), { onError: (error) => errors.push(error) });
  for (const error of errors) failures.push(`${label}: ${error.message}`);
}

for (const file of files) {
  const path = resolve(docsRoot, file);
  const source = await readFile(path, 'utf8');
  const fences = [...source.matchAll(/```(tsx|ts|vue|html)\s*\n([\s\S]*?)```/gu)];
  for (const fence of fences) {
    fencesChecked += 1;
    const [, language, code] = fence;
    const line = location(source, fence.index);
    const label = `${file}:${line}`;
    const preceding = source.slice(Math.max(0, fence.index - 240), fence.index);
    const tab = preceding.match(/<TabItem label="(React|Vue|Angular)">[\s\S]*$/u)?.[1];
    try {
      if (language === 'tsx') {
        counts.react += 1;
        compileTypeScript(code, true, label);
      } else if (language === 'vue') {
        counts.vue += 1;
        compileVueExample(code, label);
      } else if (language === 'html') {
        counts.angular += 1;
        const parsed = parseTemplate(code.replaceAll('…', ''), label, { preserveWhitespaces: false });
        for (const error of parsed.errors ?? []) failures.push(`${label}: ${error.msg}`);
      } else {
        counts.typescript += 1;
        const contextual = /^\s*@/u.test(code) || !/^\s*(?:import|export|const|let|var|class|interface|type|function|enum)/u.test(code);
        compileTypeScript(code, false, label, contextual);
        if (tab === 'Vue') counts.vue += 1;
        if (tab === 'Angular') counts.angular += 1;
      }
    } catch (error) {
      failures.push(`${label}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

if (failures.length) {
  console.error(`Documentation example compilation failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exit(1);
}
if (fencesChecked < 472) {
  console.error(`Documentation example coverage dropped unexpectedly: ${fencesChecked} fences.`);
  process.exit(1);
}

console.log(`Compiled documentation examples (${counts.react} React, ${counts.vue} Vue, ${counts.angular} Angular, ${counts.typescript} TypeScript checks).`);
