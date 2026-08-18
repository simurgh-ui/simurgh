# Icon optical review

- Review version: 1
- Reviewer: Codex agent visual and automated audit
- Review date: 2026-08-18
- Catalog: 474 icons
- Target sizes: 16, 20, 24, and 32 pixels
- Render count: 1,896

## Method

Every source SVG was rasterized independently at each target size. The automated gate checked for
empty output, extreme optical-center displacement, sparse artwork, and collapsed bounds. Four
versioned review sheets then presented every raster beside an 18-pixel `Aa` label at 1× and as a 3×
nearest-neighbor preview. The review compared the sheets across sizes for recognizable silhouettes,
surviving internal detail, apparent-weight stability, optical centering, and baseline alignment.

## Result

Approved for the current catalog. No correction or deferral issues were identified. All 1,896
automated checks passed, the largest normalized coverage drift across sizes was 8.6% (`target-chart`),
and the visual comparison found no lost essential silhouette, misleading collapsed detail, material
weight discontinuity, or text-alignment failure.

The reproducible evidence is retained in `artifacts/icon-optical-audit.json` and
`artifacts/icon-review-sheets/`. Run `node scripts/generate-icon-optical-review.mjs --check` to verify
that the committed review evidence still matches the SVG catalog.
