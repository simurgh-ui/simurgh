import { describe, expect, it } from 'vitest';
import { createServer } from '../src/index.js';

describe('Simurgh MCP server', () => {
  it('creates a server for the current registry', () => {
    expect(createServer()).toBeDefined();
  });
});
