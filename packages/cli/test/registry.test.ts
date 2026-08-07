import { describe, expect, it } from 'vitest';
import { manifest, registryEntry } from '@simurgh-ui/registry';
describe('registry', () => { it('contains ten components for every framework', () => { expect(manifest.components).toHaveLength(10); for (const framework of ['react', 'vue', 'angular'] as const) expect(registryEntry('dialog', framework).framework).toBe(framework); }); });
