import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const registry = JSON.parse(await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'));
const start = '{/* component-form:start */}';
const end = '{/* component-form:end */}';
const failures = [];

const forms = {
  calendar: { initial: "'2026-08-12'", name: 'appointmentDate', invalid: false },
  checkbox: { initial: 'true', name: 'terms', invalid: false, checked: true, submitted: '`value` when checked; omitted when unchecked' },
  combobox: { initial: "'design'", name: 'team', invalid: false },
  command: { initial: "'archive'", name: 'command', invalid: false },
  'date-picker': { initial: "'2026-08-12'", name: 'appointmentDate', invalid: false },
  'file-upload': { initial: '[]', name: 'attachments', invalid: false, submitted: 'selected `File` objects using multipart form data' },
  input: { initial: "'ali@example.com'", name: 'email', invalid: true },
  'input-otp': { initial: "''", name: 'verificationCode', invalid: true },
  'native-select': { initial: "'pro'", name: 'plan', invalid: true },
  'number-input': { initial: '2', name: 'quantity', invalid: false },
  'password-input': { initial: "''", name: 'password', invalid: false },
  'radio-group': { initial: "'email'", name: 'contactMethod', invalid: false },
  rating: { initial: '4', name: 'rating', invalid: false },
  select: { initial: "'pro'", name: 'plan', invalid: false },
  slider: { initial: '50', name: 'volume', invalid: true },
  switch: { initial: 'true', name: 'notifications', invalid: false, checked: true, submitted: '`value` when checked; omitted when unchecked' },
  'tags-input': { initial: "['docs']", name: 'tags', invalid: false, submitted: 'one same-name hidden value per tag' },
  textarea: { initial: "'Initial notes'", name: 'notes', invalid: true },
};

const nativeValueControls = new Set(['input', 'input-otp', 'native-select', 'password-input', 'slider', 'textarea']);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function pascal(component) {
  return component.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
}

function reactExample(component, form) {
  const symbol = registry.symbols.react[component][0];
  const state = component === 'file-upload' ? 'files' : form.checked ? 'checked' : 'value';
  const change = component === 'file-upload' ? 'onFilesChange' : form.checked ? 'onCheckedChange' : nativeValueControls.has(component) ? 'onChange' : 'onValueChange';
  const changeValue = nativeValueControls.has(component)
    ? `(event) => set${pascal(state)}(event.currentTarget.value${component === 'slider' ? 'AsNumber' : ''})`
    : `set${pascal(state)}`;
  const stateBinding = component === 'file-upload' ? '' : ` ${state}={${state}}`;
  const invalid = form.invalid ? ' invalid={Boolean(errors.' + form.name + ')}' : '';
  return `\`\`\`tsx\nconst initial = ${form.initial};\nconst [${state}, set${pascal(state)}] = useState(initial);\nconst [errors, setErrors] = useState<Record<string, string>>({});\n\n<form onSubmit={(event) => {\n  event.preventDefault();\n  const data = new FormData(event.currentTarget);\n  // Submit data.get('${form.name}')${component === 'tags-input' ? ` or data.getAll('${form.name}')` : ''}.\n}}>\n  <${symbol} name="${form.name}"${stateBinding} ${change}={${changeValue}}\n    required disabled={isDisabled}${invalid} />\n  {errors.${form.name} && <p role="alert">{errors.${form.name}}</p>}\n  <button type="submit">Submit</button>\n</form>\n\`\`\``;
}

function vueExample(component, form) {
  const symbol = registry.symbols.vue[component][0];
  const invalid = form.invalid ? ` :invalid="Boolean(errors.${form.name})"` : '';
  const binding = component === 'file-upload' ? '@files-change="value = $event"' : 'v-model="value"';
  return `\`\`\`vue\n<script setup lang="ts">\nimport { reactive, ref } from 'vue';\nconst initial = ${form.initial};\nconst value = ref(initial);\nconst errors = reactive<Record<string, string>>({});\nfunction submit(event: Event) {\n  const data = new FormData(event.currentTarget as HTMLFormElement);\n  // Submit data.get('${form.name}')${component === 'tags-input' ? ` or data.getAll('${form.name}')` : ''}.\n}\n</script>\n\n<form @submit.prevent="submit">\n  <${symbol} ${binding} name="${form.name}" required :disabled="isDisabled"${invalid}></${symbol}>\n  <p v-if="errors.${form.name}" role="alert">{{ errors.${form.name} }}</p>\n  <button type="submit">Submit</button>\n</form>\n\`\`\``;
}

function angularExample(component, form) {
  const selector = `simurgh-${component}`;
  const state = component === 'file-upload' ? 'files' : form.checked ? 'checked' : 'value';
  const binding = component === 'file-upload' ? `(filesChange)="files = $event"` : `[(${state})]="${state}"`;
  const invalid = form.invalid ? ` [invalid]="!!errors.${form.name}"` : '';
  return `\`\`\`ts\ninitial = ${form.initial};\n${state} = this.initial;\nerrors: Record<string, string> = {};\nsubmit(form: HTMLFormElement) {\n  const data = new FormData(form);\n  // Submit data.get('${form.name}')${component === 'tags-input' ? ` or data.getAll('${form.name}')` : ''}.\n}\n\`\`\`\n\n\`\`\`html\n<form #form (submit)="submit(form); $event.preventDefault()">\n  <${selector} ${binding} name="${form.name}" required [disabled]="isDisabled"${invalid}></${selector}>\n  <p *ngIf="errors.${form.name}" role="alert">{{ errors.${form.name} }}</p>\n  <button type="submit">Submit</button>\n</form>\n\`\`\``;
}

function section(component) {
  const form = forms[component];
  if (!form) return `${start}\n### Form integration\n\nThis component is not a form control and does not contribute a named value to \`FormData\`. Use it\nto structure or describe a form only when its purpose and accessibility guidance apply.\n${end}`;
  const submitted = form.submitted ?? 'the current value under the documented field name';
  return `${start}\n### Form integration\n\nUse \`name="${form.name}"\` to serialize ${submitted}. The examples initialize the field, keep its\nvalue application-owned, forward \`disabled\` and \`required\`, render an accessible error, and read\nthe browser submission payload. ${form.invalid ? 'Set `invalid` when validation fails; it communicates visual/ARIA state but does not replace an error message.' : 'This component has no public `invalid` prop; announce validation errors next to the labeled control and use native validity where available.'}\n\n#### React\n\n${reactExample(component, form)}\n\n#### Vue\n\n${vueExample(component, form)}\n\n#### Angular\n\n${angularExample(component, form)}\n\nFor Angular reactive or template-driven forms, bridge the documented \`value\`/\`valueChange\` pair\nto your form control. The component does not implement \`ControlValueAccessor\`; update disabled and\nvalidation state from the Angular form explicitly.\n${end}`;
}

for (const component of registry.components) {
  const path = resolve(docsRoot, `${component}.mdx`);
  const source = await readFile(path, 'utf8');
  const generated = section(component);
  const marked = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`, 'u');
  const expected = marked.test(source)
    ? source.replace(marked, generated)
    : source.replace('## Customization', `${generated}\n\n## Customization`);
  if (process.argv.includes('--update')) await writeFile(path, expected);
  else if (source !== expected) failures.push(component);
}

if (failures.length) {
  process.stderr.write(`Component form documentation is missing or stale: ${failures.join(', ')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`${process.argv.includes('--update') ? 'Updated' : 'Validated'} form contracts for ${registry.components.length} component pages (${Object.keys(forms).length} form-capable).\n`);
}
