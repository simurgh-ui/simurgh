import { createRequire } from 'node:module';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const requireFromDocs = createRequire(resolve(root, 'apps/docs/package.json'));
const sharp = requireFromDocs('sharp');
const sizes = [16, 20, 24, 32];
const files = (await readdir(resolve(root, 'packages/icons/svg'))).filter(
  (file) => file.endsWith('.svg'),
);
const failures = [];

for (const file of files) {
  const source = await readFile(resolve(root, 'packages/icons/svg', file));
  for (const size of sizes) {
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
    if (maxX < 0) {
      failures.push(`${file}@${size}: empty render`);
      continue;
    }
    const width = maxX - minX + 1;
    const height = maxY - minY + 1;
    const centerOffset = Math.hypot(
      (minX + maxX) / 2 - (size - 1) / 2,
      (minY + maxY) / 2 - (size - 1) / 2,
    );
    const coverage = opaque / (size * size);
    if (centerOffset > size * 0.32)
      failures.push(
        `${file}@${size}: optical center offset ${centerOffset.toFixed(2)}px`,
      );
    if (coverage < 0.012)
      failures.push(
        `${file}@${size}: occupied area ${(coverage * 100).toFixed(1)}% is too sparse`,
      );
    if (width < size * 0.08 || height < size * 0.08)
      failures.push(
        `${file}@${size}: rendered bounds ${width}x${height}px are too small`,
      );
  }
}

if (failures.length) {
  throw new Error(
    `Icon optical-quality audit failed:\n${failures.slice(0, 40).join('\n')}${failures.length > 40 ? `\n…and ${failures.length - 40} more` : ''}`,
  );
}
console.log(
  `Icon optical-quality audit passed for ${files.length} icons at ${sizes.join(', ')}px.`,
);
