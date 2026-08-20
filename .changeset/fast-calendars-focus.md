---
"@simurgh-ui/vue": patch
"@simurgh-ui/cli": patch
---

Move Vue Calendar keyboard focus after rendering with Vue's deterministic `nextTick` boundary.
This avoids delayed animation-frame focus under heavy or instrumented workloads and keeps generated
CLI components synchronized with the package implementation.
