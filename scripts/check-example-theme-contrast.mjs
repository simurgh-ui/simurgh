import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const themePath = fileURLToPath(
  new URL('../apps/docs/public/examples/custom-theme.css', import.meta.url),
);
const css = await readFile(themePath, 'utf8');
const tokenNames = [
  'background',
  'foreground',
  'surface',
  'muted',
  'muted-foreground',
  'primary',
  'primary-foreground',
  'accent',
  'danger',
  'border',
  'ring',
  'radius',
  'shadow',
  'duration',
];

function block(pattern, label) {
  const match = css.match(pattern);
  if (!match) throw new Error(`Missing ${label} theme block.`);
  const values = new Map();
  for (const token of tokenNames) {
    const value = match[1]
      .match(new RegExp(`--simurgh-${token}:\\s*([^;]+);`))?.[1]
      .trim();
    if (!value)
      throw new Error(`${label} theme is missing --simurgh-${token}.`);
    values.set(token, value);
  }
  return values;
}

const themes = new Map([
  ['light', block(/:root\s*\{([\s\S]*?)\}/u, 'light')],
  ['dark', block(/\.dark,\s*\[data-theme='dark'\]\s*\{([\s\S]*?)\}/u, 'dark')],
]);

function hslToRgb(value) {
  const match = value.match(
    /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/u,
  );
  if (!match) throw new Error(`Expected HSL channels, received "${value}".`);
  const h = Number(match[1]) / 360;
  const s = Number(match[2]) / 100;
  const l = Number(match[3]) / 100;
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue = (t) => {
    const channel = (t + 1) % 1;
    if (channel < 1 / 6) return p + (q - p) * 6 * channel;
    if (channel < 1 / 2) return q;
    if (channel < 2 / 3) return p + (q - p) * (2 / 3 - channel) * 6;
    return p;
  };
  return [hue(h + 1 / 3), hue(h), hue(h - 1 / 3)];
}

function luminance(value) {
  return hslToRgb(value)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    )
    .reduce(
      (sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index],
      0,
    );
}

function contrast(first, second) {
  const [lighter, darker] = [luminance(first), luminance(second)].sort(
    (a, b) => b - a,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

const checks = [
  ['foreground', 'background', 4.5],
  ['foreground', 'surface', 4.5],
  ['muted-foreground', 'background', 4.5],
  ['muted-foreground', 'surface', 4.5],
  ['muted-foreground', 'muted', 4.5],
  ['primary-foreground', 'primary', 4.5],
  ['ring', 'background', 3],
  ['ring', 'surface', 3],
  ['border', 'background', 3],
  ['border', 'surface', 3],
];
const failures = [];

for (const [themeName, values] of themes) {
  for (const [foreground, background, minimum] of checks) {
    const ratio = contrast(values.get(foreground), values.get(background));
    if (ratio < minimum) {
      failures.push(
        `${themeName}: ${foreground}/${background} is ${ratio.toFixed(2)}:1; expected ${minimum}:1`,
      );
    }
  }
}

if (failures.length) {
  console.error(`Example theme contrast check failed:\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(
    `Example theme contrast check passed (${checks.length * themes.size} pairings).`,
  );
}
