import { access, readFile, readdir } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs');
const publicRoot = resolve(root, 'apps/docs/public');
const packageRoots = new Map([
  ['react', resolve(root, 'packages/react')],
  ['vue', resolve(root, 'packages/vue')],
  ['angular', resolve(root, 'packages/angular')],
  ['styles', resolve(root, 'packages/styles')],
]);
const pages = new Map();
const failures = [];

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else if (extname(entry.name) === '.mdx') files.push(path);
  }
  return files;
}

function routeFor(path) {
  const relative = path
    .slice(docsRoot.length + 1)
    .replaceAll('\\', '/')
    .replace(/\.mdx$/u, '');
  return relative === 'index' ? '/' : `/${relative}/`;
}

function slugify(heading) {
  return heading
    .toLowerCase()
    .replace(/[`*_{}[\]()<>]/gu, '')
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .trim()
    .replace(/\s+/gu, '-');
}

for (const path of await walk(docsRoot)) {
  const source = await readFile(path, 'utf8');
  const anchors = new Set(
    [...source.matchAll(/^#{2,6}\s+(.+)$/gmu)].map((match) =>
      slugify(match[1]),
    ),
  );
  pages.set(routeFor(path), { path, source, anchors });
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

for (const [route, page] of pages) {
  const links = [...page.source.matchAll(/\[[^\]]*\]\(([^)]+)\)/gu)].map(
    (match) => match[1],
  );
  for (const rawLink of links) {
    if (/^(?:https?:|mailto:)/u.test(rawLink)) continue;
    const [pathname, anchor] = rawLink.split('#');
    if (!pathname && anchor) {
      if (!page.anchors.has(anchor))
        failures.push(`${route}: missing local anchor #${anchor}`);
      continue;
    }
    if (!pathname.startsWith('/')) continue;
    if (pathname.startsWith('/examples/')) {
      if (!(await exists(resolve(publicRoot, pathname.slice(1))))) {
        failures.push(`${route}: missing public file ${pathname}`);
      }
      continue;
    }
    const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const target = pages.get(normalized);
    if (!target) failures.push(`${route}: missing internal page ${pathname}`);
    else if (anchor && !target.anchors.has(anchor)) {
      failures.push(`${route}: missing anchor ${pathname}#${anchor}`);
    }
  }

  const imports = [
    ...page.source.matchAll(
      /['"](@simurgh-ui\/([^/'"]+)(?:\/([^'"]+))?)['"]/gu,
    ),
  ];
  for (const [, specifier, packageName, subpath] of imports) {
    const packageRoot = packageRoots.get(packageName);
    if (!packageRoot) {
      failures.push(`${route}: unknown package import ${specifier}`);
      continue;
    }
    const packageJson = JSON.parse(
      await readFile(resolve(packageRoot, 'package.json'), 'utf8'),
    );
    const key = subpath ? `./${subpath}` : '.';
    let target = packageJson.exports[key];
    if (!target && subpath) {
      const wildcard = Object.entries(packageJson.exports).find(([pattern]) =>
        pattern.includes('*'),
      );
      if (wildcard) {
        const [pattern, value] = wildcard;
        const [prefix, suffix] = pattern.split('*');
        if (key.startsWith(prefix) && key.endsWith(suffix)) {
          const replacement = key.slice(
            prefix.length,
            key.length - suffix.length || undefined,
          );
          target =
            typeof value === 'string'
              ? value.replace('*', replacement)
              : Object.fromEntries(
                  Object.entries(value).map(([condition, path]) => [
                    condition,
                    path.replace('*', replacement),
                  ]),
                );
        }
      }
    }
    if (!target) {
      failures.push(`${route}: package does not export ${specifier}`);
      continue;
    }
    const candidates =
      typeof target === 'string' ? [target] : Object.values(target);
    if (
      !(
        await Promise.all(
          candidates.map((path) => exists(resolve(packageRoot, path))),
        )
      ).every(Boolean)
    ) {
      failures.push(`${route}: exported files are missing for ${specifier}`);
    }
  }
}

if (failures.length) {
  process.stderr.write(
    `Documentation integrity check failed:\n${failures.join('\n')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Documentation integrity check passed (${pages.size} pages; internal links, anchors, and package exports).\n`,
  );
}
