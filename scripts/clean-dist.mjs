import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const packageName = process.argv[2];
if (!['react', 'vue', 'angular', 'preact'].includes(packageName)) {
  throw new Error('Usage: node scripts/clean-dist.mjs react|vue|angular|preact');
}
await rm(resolve(import.meta.dirname, `../packages/${packageName}/dist`), {
  recursive: true,
  force: true,
});
