# Bundle analysis

The enforced bundle report measures complete adapters twice: once with library dependencies included and once with Floating UI externalized. The gzip delta is the positioning layer's effective contribution in a complete consumer bundle.

| Adapter | Complete | Without Floating UI | Contribution |
| ------- | -------: | ------------------: | -----------: |
| React   | 27,119 B |            14,290 B |     12,829 B |
| Vue     | 22,213 B |            15,935 B |      6,278 B |
| Angular | 26,975 B |            20,565 B |      6,410 B |

## React integration decision

Replacing `@floating-ui/react` interaction hooks with a hand-built `@floating-ui/dom` adapter would save meaningful bytes for the complete React entry, but it would also duplicate dismiss, focus, hover, click, role, and composed-event behavior already exercised by the overlay contracts. The production decision is to retain the React integration for behavior parity and expose smaller import boundaries instead:

- per-component subpaths remain the default recommendation;
- `basic` excludes floating components entirely;
- `overlays` groups components that intentionally pay the positioning cost;
- the size checker continues to report the Floating UI delta so the decision can be revisited with evidence.

This avoids a high-risk accessibility rewrite while giving non-overlay consumers a path that does not bundle Floating UI.

## 2026-08 revisit

The current measurements still support the original decision. React's potential reduction remains meaningful, but a custom DOM adapter would assume ownership of composed click, hover, focus, dismissal, role, and focus-management behavior. Component subpaths, the non-floating `basic` entry, and lazy overlay chunks now provide lower-risk ways to avoid paying that cost on initial application paths. Retain `@floating-ui/react` until profiling demonstrates that total overlay download size—not initial loading—is a product constraint.
