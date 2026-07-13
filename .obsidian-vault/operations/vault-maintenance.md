---
type: operations
status: active
updated: 2026-07-13
tags: [operations, vault, maintenance]
---

# Vault maintenance

## When repository behavior changes

1. Inspect the changed route, page, context, data module, or service.
2. Update the smallest affected wiki pages and add `sources` paths.
3. Update [[index]] if a page is added, renamed, or retired.
4. Append a dated entry to [[log]] with scope and behavior impact.
5. Update [[roadmap]] or [[decisions/README]] when the change affects demo strategy.

## When adding an external source

Create an immutable note under `sources/` with URL, retrieval date, scope, key points, and limitations. Link it from affected wiki pages. Never rewrite a historical raw note to hide a contradiction.

## Lint pass

- Confirm every page has `type`, `status`, `updated`, and `tags`.
- Search wikilinks and resolve each target.
- Find orphan pages not reachable from [[index]].
- Compare claims such as “implemented”, “mocked”, “scaffolded”, and “persisted” with source code.
- Check route names against `client/src/App.jsx` and navigation labels against `client/src/components/layout/navConfig.js`.
- Check for contradictions between current-state pages and [[project/overview]].
- Flag stale dates, missing source paths, duplicate pages, and recommendations written as facts.
