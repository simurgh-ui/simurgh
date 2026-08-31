import { AsyncDirective } from 'lit/async-directive.js';
import { directive, type PartInfo } from 'lit/directive.js';
import { bindMotion, type MotionDefinition } from './index.js';

class MotionDirective extends AsyncDirective {
  private cleanup: (() => void) | undefined;
  constructor(partInfo: PartInfo) { super(partInfo); }
  render(definition: MotionDefinition) { return definition; }
  update(part: Parameters<AsyncDirective['update']>[0], [definition]: [MotionDefinition]) {
    this.cleanup?.();
    this.cleanup = bindMotion((part as unknown as { element: Element }).element, definition);
    return definition;
  }
  disconnected() { this.cleanup?.(); this.cleanup = undefined; }
}

export const motion = directive(MotionDirective);
export * from './index.js';
