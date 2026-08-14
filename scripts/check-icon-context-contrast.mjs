import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const css = await readFile(
  resolve(import.meta.dirname, '../packages/styles/tokens.css'),
  'utf8',
);
const tokenNames = [
  'background',
  'foreground',
  'surface',
  'primary',
  'primary-foreground',
  'danger',
  'danger-foreground',
  'success',
  'success-foreground',
  'warning',
  'warning-foreground',
  'disabled-surface',
  'disabled-foreground',
];

function theme(pattern, label) {
  const source = css.match(pattern)?.[1];
  if (!source) throw new Error(`Missing ${label} token block.`);
  const all = new Map(
    [...source.matchAll(/--simurgh-([\w-]+):\s*([^;]+);/gu)].map((match) => [
      match[1],
      match[2].trim(),
    ]),
  );
  const resolveToken = (name, seen = new Set()) => {
    if (seen.has(name)) throw new Error(`Circular color token: ${name}`);
    seen.add(name);
    const value = all.get(name);
    if (!value) throw new Error(`${label} is missing --simurgh-${name}.`);
    const reference = value.match(/^var\(--simurgh-([\w-]+)\)$/u)?.[1];
    return reference ? resolveToken(reference, seen) : value;
  };
  return new Map(tokenNames.map((name) => [name, resolveToken(name)]));
}

function rgb(value) {
  const match = value.match(
    /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/u,
  );
  if (!match) throw new Error(`Expected HSL channels, received ${value}.`);
  const h = Number(match[1]) / 360;
  const s = Number(match[2]) / 100;
  const l = Number(match[3]) / 100;
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue = (offset) => {
    const channel = (offset + 1) % 1;
    if (channel < 1 / 6) return p + (q - p) * 6 * channel;
    if (channel < 1 / 2) return q;
    if (channel < 2 / 3) return p + (q - p) * (2 / 3 - channel) * 6;
    return p;
  };
  return [hue(h + 1 / 3), hue(h), hue(h - 1 / 3)];
}
const luminance = (value) =>
  rgb(value)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    )
    .reduce(
      (sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index],
      0,
    );
const contrast = (first, second) => {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

const themes = new Map([
  ['light', theme(/:root\s*\{([\s\S]*?)\n\}/u, 'light')],
  [
    'dark',
    theme(/\.dark,\s*\n\[data-theme='dark'\]\s*\{([\s\S]*?)\n\}/u, 'dark'),
  ],
]);
const pairings = [
  ['foreground', 'background'],
  ['foreground', 'surface'],
  ['primary-foreground', 'primary'],
  ['danger-foreground', 'danger'],
  ['success-foreground', 'success'],
  ['warning-foreground', 'warning'],
  ['disabled-foreground', 'disabled-surface'],
];
const failures = [];
for (const [themeName, values] of themes)
  for (const [foreground, background] of pairings) {
    const ratio = contrast(values.get(foreground), values.get(background));
    if (ratio < 3)
      failures.push(
        `${themeName} ${foreground}/${background}: ${ratio.toFixed(2)}:1`,
      );
  }
if (failures.length)
  throw new Error(
    `Icon context contrast must reach 3:1:\n${failures.join('\n')}`,
  );
console.log(
  `Icon context contrast passed for ${pairings.length * themes.size} light/dark state pairings.`,
);
