import assert from 'node:assert/strict';
import test from 'node:test';
import { compareVersions } from './check-registry-versions.mjs';

test('compares stable semantic versions', () => {
  assert.equal(compareVersions('0.3.1', '0.3.1'), 0);
  assert.equal(compareVersions('0.3.2', '0.3.1'), 1);
  assert.equal(compareVersions('0.2.9', '0.3.1'), -1);
});

test('orders prereleases below their stable version and above prior patches', () => {
  assert.equal(compareVersions('0.3.2-beta.0', '0.3.1'), 1);
  assert.equal(compareVersions('0.3.2-beta.0', '0.3.2'), -1);
  assert.equal(compareVersions('0.3.2-beta.1', '0.3.2-beta.0'), 1);
});
