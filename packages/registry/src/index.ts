import manifest from '../registry.json' with { type: 'json' };
export type Framework = keyof typeof manifest.frameworks;
export type ComponentName = (typeof manifest.components)[number];
export type RegistryManifest = typeof manifest;
export { manifest };
export function registryEntry(component: string, framework: Framework) {
  if (!manifest.components.includes(component)) throw new Error(`Unknown component: ${component}`);
  const supported = (manifest.frameworks[framework] as { components?: readonly string[] }).components ?? manifest.components;
  if (!supported.includes(component)) throw new Error(`${framework} does not support the ${component} component yet`);
  const componentName = component;
  const symbolTables = manifest.symbols as Record<string, Record<string, readonly string[]>>;
  const fallbackTables = (manifest.newFrameworkSymbols ?? {}) as Record<string, Record<string, readonly string[]>>;
  const symbolFramework = (manifest.frameworks[framework] as { symbolsFrom?: string }).symbolsFrom ?? framework;
  const symbols = symbolTables[symbolFramework]?.[componentName] ?? fallbackTables[framework]?.[componentName] ?? [];
  return { name: component, version: manifest.version, framework, ...manifest.frameworks[framework], symbols, shared: manifest.shared };
}
