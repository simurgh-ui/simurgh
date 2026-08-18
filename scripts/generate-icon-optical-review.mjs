import { Buffer } from 'node:buffer';
import console from 'node:console';
import { createRequire } from 'node:module';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const requireFromDocs = createRequire(resolve(root, 'apps/docs/package.json'));
const sharp = requireFromDocs('sharp');
const sizes = [16, 20, 24, 32];
const columns = 12;
const cellWidth = 240;
const cellHeight = 112;
const headerHeight = 96;
const outputDirectory = resolve(root, 'artifacts/icon-review-sheets');
const checkOnly = process.argv.includes('--check');
const files = (await readdir(resolve(root, 'packages/icons/svg')))
  .filter((file) => file.endsWith('.svg'))
  .sort();

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const measure = async (source, size) => {
  const { data, info } = await sharp(source)
    .resize(size, size, { fit: 'fill' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let minX = size;
  let minY = size;
  let maxX = -1;
  let maxY = -1;
  let opaque = 0;
  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const alpha = data[(y * info.width + x) * info.channels + 3];
      if (alpha < 24) continue;
      opaque += alpha / 255;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  return {
    bounds: { minX, minY, maxX, maxY, width, height },
    centerOffset: Number(
      Math.hypot(
        (minX + maxX) / 2 - (size - 1) / 2,
        (minY + maxY) / 2 - (size - 1) / 2,
      ).toFixed(3),
    ),
    coverage: Number((opaque / (size * size)).toFixed(5)),
  };
};

if (!checkOnly) await mkdir(outputDirectory, { recursive: true });
const records = [];

const persist = async (path, contents) => {
  if (!checkOnly) {
    await writeFile(path, contents);
    return;
  }
  let current;
  try {
    current = await readFile(path);
  } catch {
    throw new Error(`Missing generated icon optical-review artifact: ${path}`);
  }
  const expected = Buffer.isBuffer(contents) ? contents : Buffer.from(contents);
  if (!current.equals(expected)) {
    throw new Error(
      `Stale icon optical-review artifact: ${path}. Run node scripts/generate-icon-optical-review.mjs.`,
    );
  }
};

for (const size of sizes) {
  const rows = Math.ceil(files.length / columns);
  const width = columns * cellWidth;
  const height = headerHeight + rows * cellHeight;
  const cells = [];

  for (const [index, file] of files.entries()) {
    const source = await readFile(resolve(root, 'packages/icons/svg', file));
    const raster = await sharp(source)
      .resize(size, size, { fit: 'fill' })
      .png()
      .toBuffer();
    const preview = await sharp(raster)
      .resize(size * 3, size * 3, { kernel: 'nearest' })
      .png()
      .toBuffer();
    const metrics = await measure(source, size);
    records.push({ icon: basename(file, '.svg'), size, ...metrics });

    const x = (index % columns) * cellWidth;
    const y = headerHeight + Math.floor(index / columns) * cellHeight;
    const sampleX = x + 18;
    const sampleY = y + 44 - size / 2;
    const previewX = x + 154 - (size * 3) / 2;
    const previewY = y + 43 - (size * 3) / 2;
    const name = escapeXml(basename(file, '.svg'));
    cells.push(`
      <g>
        <rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" fill="${index % 2 ? '#fbfcfe' : '#ffffff'}" stroke="#d8dee9"/>
        <line x1="${x + 10}" y1="${y + 60}" x2="${x + 116}" y2="${y + 60}" stroke="#c1c9d6" stroke-dasharray="2 2"/>
        <image href="data:image/png;base64,${raster.toString('base64')}" x="${sampleX}" y="${sampleY}" width="${size}" height="${size}" image-rendering="pixelated"/>
        <text x="${sampleX + size + 7}" y="${y + 50}" font-family="Arial, sans-serif" font-size="18" fill="#202938">Aa</text>
        <rect x="${previewX - 5}" y="${previewY - 5}" width="${size * 3 + 10}" height="${size * 3 + 10}" fill="#f1f4f8" stroke="#c1c9d6"/>
        <image href="data:image/png;base64,${preview.toString('base64')}" x="${previewX}" y="${previewY}" width="${size * 3}" height="${size * 3}" image-rendering="pixelated"/>
        <text x="${x + 10}" y="${y + 94}" font-family="Arial, sans-serif" font-size="12" fill="#39465a">${name}</text>
      </g>`);
  }

  const sheet = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#eef2f7"/>
      <text x="24" y="38" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#172033">Simurgh icon optical review — ${size}px</text>
      <text x="24" y="68" font-family="Arial, sans-serif" font-size="14" fill="#4f5d73">${files.length} icons · 1× text alignment sample · 3× nearest-neighbor pixel preview · generated 2026-08-18</text>
      ${cells.join('')}
    </svg>`);
  const renderedSheet = await sharp(sheet).png().toBuffer();
  await persist(resolve(outputDirectory, `icons-${size}px.png`), renderedSheet);
}

const grouped = Object.groupBy(records, ({ icon }) => icon);
const weightDrift = Object.entries(grouped)
  .map(([icon, iconRecords]) => {
    const coverage = Object.fromEntries(
      iconRecords.map((record) => [record.size, record.coverage]),
    );
    const values = Object.values(coverage);
    return {
      icon,
      coverage,
      ratio: Number((Math.max(...values) / Math.min(...values)).toFixed(3)),
    };
  })
  .sort((a, b) => b.ratio - a.ratio);

await persist(
  resolve(root, 'artifacts/icon-optical-audit.json'),
  `${JSON.stringify(
    {
      schemaVersion: 1,
      generatedAt: '2026-08-18',
      reviewer: 'Codex agent visual and automated audit',
      iconCount: files.length,
      sizes,
      renderCount: records.length,
      thresholds: {
        centerOffset: 'at most 32% of target size',
        coverage: 'at least 1.2% of target area',
        renderedWidthAndHeight: 'at least 8% of target size',
      },
      largestCoverageDrift: weightDrift.slice(0, 20),
      renders: records,
    },
    null,
    2,
  )}\n`,
);

console.log(
  `${checkOnly ? 'Verified' : 'Generated'} ${sizes.length} review sheets and ${records.length} measured renders for ${files.length} icons.`,
);
