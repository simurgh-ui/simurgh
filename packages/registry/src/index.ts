import manifest from '../registry.json' with { type: 'json' };
export type Framework = keyof typeof manifest.frameworks;
export type ComponentName = (typeof manifest.components)[number];
export type RegistryManifest = typeof manifest;
export { manifest };
export function registryEntry(component: string, framework: Framework) {
  if (!manifest.components.includes(component)) throw new Error(`Unknown component: ${component}`);
  return { name: component, version: manifest.version, framework, ...manifest.frameworks[framework], shared: manifest.shared };
}
