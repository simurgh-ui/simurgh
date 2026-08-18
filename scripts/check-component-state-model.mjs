import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const registry = JSON.parse(await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'));
const start = '{/* component-state-model:start */}';
const end = '{/* component-state-model:end */}';
const failures = [];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function apiBlock(source, framework) {
  const markerStart = `{/* ${framework}-api:start */}`;
  const markerEnd = `{/* ${framework}-api:end */}`;
  return source.match(new RegExp(`${escapeRegExp(markerStart)}([\\s\\S]*?)${escapeRegExp(markerEnd)}`, 'u'))?.[1] ?? '';
}

function tableNames(source, heading) {
  const block = source.match(new RegExp(`\\| ${heading} \\|[^\\n]*\\n\\|[^\\n]*\\|([\\s\\S]*?)(?:\\n\\n|$)`, 'u'))?.[1] ?? '';
  return [...block.matchAll(/^\| `([^`]+)` \|/gmu)].map((match) => match[1]);
}

function unique(values) {
  return values.filter((value, index) => values.indexOf(value) === index);
}

function reactModels(api) {
  const props = tableNames(api, 'Prop');
  return unique(props.flatMap((prop) => {
    const callback = `on${prop[0]?.toUpperCase()}${prop.slice(1)}Change`;
    if (!props.includes(callback)) return [];
    const defaultProp = `default${prop[0]?.toUpperCase()}${prop.slice(1)}`;
    return [{ name: prop, change: callback, defaultProp: props.includes(defaultProp) ? defaultProp : undefined }];
  }));
}

function vueModels(api) {
  const props = tableNames(api, 'Prop');
  const events = tableNames(api, 'Event');
  return events.filter((event) => event.startsWith('update:')).map((event) => {
    const argument = event.slice(7);
    const name = argument === 'modelValue' ? 'modelValue' : argument;
    const stem = name === 'modelValue' ? 'Value' : `${name[0].toUpperCase()}${name.slice(1)}`;
    const defaultProp = `default${stem}`;
    return { name, model: argument === 'modelValue' ? 'v-model' : `v-model:${argument}`, change: event, defaultProp: props.includes(defaultProp) ? defaultProp : undefined };
  });
}

function angularModels(api) {
  const inputs = tableNames(api, 'Input');
  const outputs = tableNames(api, 'Output');
  return outputs.filter((output) => output.endsWith('Change') && inputs.includes(output.slice(0, -6)))
    .map((output) => ({ name: output.slice(0, -6), change: output }));
}

const booleanModels = new Set(['checked', 'expanded', 'open', 'pressed']);
let currentComponent;

function initialValue(name) {
  if (currentComponent === 'rating' && name === 'value') return '0';
  return booleanModels.has(name) ? 'false' : "''";
}

function codeName(component, framework) {
  const symbol = registry.symbols[framework][component][0];
  if (framework !== 'angular') return symbol;
  return `simurgh-${component}`;
}

function rows(component, source) {
  const react = reactModels(apiBlock(source, 'react'));
  const vue = vueModels(apiBlock(source, 'vue'));
  const angular = angularModels(apiBlock(source, 'angular'));
  if ((component === 'checkbox' || component === 'switch') && !angular.length)
    angular.push({ name: 'checked', change: 'checkedChange' });
  if (!react.length && !vue.length && !angular.length) return [];
  const reactText = react.length
    ? react.map((model) => `Controlled: \`${model.name}\` + \`${model.change}\`. ${model.defaultProp ? `Uncontrolled: \`${model.defaultProp}\`.` : 'No uncontrolled prop is exposed.'} Reset controlled state by assigning the initial value; reset uncontrolled state by changing a React \`key\`.`).join('<br />')
    : 'No public controlled/uncontrolled state pair is exposed.';
  const vueText = vue.length
    ? vue.map((model) => `Controlled: \`${model.model}\` (\`${model.name}\` + \`${model.change}\`). ${model.defaultProp ? `Uncontrolled: \`${model.defaultProp}\`.` : 'No uncontrolled prop is exposed.'} Reset the model ref to its initial value; reset uncontrolled state with a changed Vue \`:key\`.`).join('<br />')
    : 'No public controlled/uncontrolled state pair is exposed.';
  const angularText = angular.length
    ? angular.map((model) => `Controlled two-way binding: \`[(${model.name})]\` (\`${model.name}\` + \`${model.change}\`). Angular exposes no separate default input; initialize and reset the bound class field explicitly.`).join('<br />')
    : 'No public two-way state binding is exposed.';
  return [reactText, vueText, angularText];
}

function examples(component, source) {
  currentComponent = component;
  const react = reactModels(apiBlock(source, 'react'))[0];
  const vue = vueModels(apiBlock(source, 'vue'))[0];
  const angularStates = angularModels(apiBlock(source, 'angular'));
  if ((component === 'checkbox' || component === 'switch') && !angularStates.length)
    angularStates.push({ name: 'checked', change: 'checkedChange' });
  const angular = angularStates[0];
  const result = [];
  if (react) {
    const tag = codeName(component, 'react');
    result.push(`**React**\n\n\`\`\`tsx\nconst initial${react.name[0].toUpperCase()}${react.name.slice(1)} = ${initialValue(react.name)};\nconst [${react.name}, set${react.name[0].toUpperCase()}${react.name.slice(1)}] = useState(initial${react.name[0].toUpperCase()}${react.name.slice(1)});\nconst [resetKey, setResetKey] = useState(0);\n\n<${tag} ${react.name}={${react.name}} ${react.change}={set${react.name[0].toUpperCase()}${react.name.slice(1)}}>…</${tag}>\n<button onClick={() => set${react.name[0].toUpperCase()}${react.name.slice(1)}(initial${react.name[0].toUpperCase()}${react.name.slice(1)})}>Reset controlled</button>${react.defaultProp ? `\n<${tag} key={resetKey} ${react.defaultProp}={initial${react.name[0].toUpperCase()}${react.name.slice(1)}}>…</${tag}>\n<button onClick={() => setResetKey((key) => key + 1)}>Reset uncontrolled</button>` : ''}\n\`\`\``);
  }
  if (vue) {
    const tag = codeName(component, 'vue');
    const binding = vue.model === 'v-model' ? 'v-model="state"' : `${vue.model}="state"`;
    result.push(`**Vue**\n\n\`\`\`vue\n<script setup lang="ts">\nimport { ref } from 'vue';\nconst initial = ${initialValue(vue.name)};\nconst state = ref(initial);\nconst resetKey = ref(0);\n</script>\n\n<${tag} ${binding}>…</${tag}>\n<button @click="state = initial">Reset controlled</button>${vue.defaultProp ? `\n<${tag} :key="resetKey" :${vue.defaultProp}="initial">…</${tag}>\n<button @click="resetKey++">Reset uncontrolled</button>` : ''}\n\`\`\``);
  }
  if (angular) {
    const tag = codeName(component, 'angular');
    result.push(`**Angular**\n\n\`\`\`ts\ninitial = ${initialValue(angular.name)};\n${angular.name} = this.initial;\nreset() { this.${angular.name} = this.initial; }\n\`\`\`\n\n\`\`\`html\n<${tag} [(${angular.name})]="${angular.name}">…</${tag}>\n<button type="button" (click)="reset()">Reset</button>\n\`\`\``);
  }
  return result.join('\n\n');
}

function section(component, source) {
  const contracts = rows(component, source);
  if (!contracts.length) return `${start}\n## State model\n\nThis component exposes no public controlled/uncontrolled state pair. Configure it through the props,\nevents, native attributes, or parent-owned state documented in the API tables.\n${end}`;
  return `${start}\n## State model\n\nControlled state remains the application’s source of truth and must be updated from every change\nevent. Uncontrolled state reads its default only when the component mounts. Do not pass both forms of\nthe same state at once.\n\n| Framework | Exact state contract and reset behavior |\n| --- | --- |\n| React | ${contracts[0]} |\n| Vue | ${contracts[1]} |\n| Angular | ${contracts[2]} |\n\n${examples(component, source)}\n${end}`;
}

for (const component of registry.components) {
  const path = resolve(docsRoot, `${component}.mdx`);
  const source = await readFile(path, 'utf8');
  const generated = section(component, source);
  const marked = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`, 'u');
  let expected = marked.test(source) ? source.replace(marked, generated) : source.replace('## State model', generated);
  const generatedBody = generated
    .replace(start, '')
    .replace(end, '')
    .replace(/^\s*## State model\s*/u, '')
    .trim();
  const duplicateAfterMarker = new RegExp(
    `${escapeRegExp(end)}\\r?\\n(?:\\r?\\n)+${escapeRegExp(generatedBody)}`,
    'u',
  );
  expected = expected.replace(duplicateAfterMarker, end).trimEnd() + '\n';
  if (process.argv.includes('--update')) await writeFile(path, expected);
  else if (source !== expected) failures.push(component);
}

if (failures.length) {
  process.stderr.write(`Component state-model documentation is missing or stale: ${failures.join(', ')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`${process.argv.includes('--update') ? 'Updated' : 'Validated'} state models for ${registry.components.length} component pages.\n`);
}
