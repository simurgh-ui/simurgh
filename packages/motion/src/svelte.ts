import { bindMotion, type MotionDefinition } from './index.js';

export function motion(node: Element, definition: MotionDefinition) {
  let cleanup = bindMotion(node, definition);
  return {
    update(next: MotionDefinition) {
      cleanup();
      cleanup = bindMotion(node, next);
    },
    destroy() { cleanup(); },
  };
}

export * from './index.js';
