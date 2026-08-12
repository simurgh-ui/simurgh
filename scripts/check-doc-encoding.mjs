import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../apps/docs/src', import.meta.url));
const textExtensions = new Set(['.astro', '.css', '.md', '.mdx', '.ts', '.tsx']);
const suspicious = /\u00c2|\u00c3|\u00e2[\u0080-\u00bf]|\ufffd/u;
const failures = [];

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(path);
    } else if (textExtensions.has(extname(entry.name))) {
      const lines = (await readFile(path, 'utf8')).split(/\r?\n/u);
      lines.forEach((line, index) => {
        if (suspicious.test(line)) failures.push(`${relative(root, path)}:${index + 1}`);
      });
    }
  }
}

await visit(root);

if (failures.length) {
  console.error(`Possible mojibake or replacement characters found:\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('Documentation encoding check passed.');
}
