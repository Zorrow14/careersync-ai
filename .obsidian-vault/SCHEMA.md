---
type: schema
status: active
updated: 2026-07-13
tags: [vault, schema, maintenance]
---

# Vault schema

This vault is the project-specific second brain for CareerSync AI. It is optimized for fast human and LLM retrieval during a hackathon: product intent, observable demo behavior, architecture as it exists, decisions, judging narrative, and maintenance.

## Layers

- **Raw/source**: `sources/` contains captured external references and source notes. Raw captures are immutable once ingested. Add a new dated capture instead of rewriting history.
- **Wiki**: `project/`, `product/`, `features/`, `journeys/`, `decisions/`, `operations/`, and `roadmap.md` are maintained interpretations. Update them when repository behavior changes.
- **Schema**: this page defines conventions and workflows.

## Naming and frontmatter

- Use lowercase kebab-case filenames, except root navigation files such as `README.md`, `SCHEMA.md`, `index.md`, and `log.md`.
- Every page has YAML frontmatter with `type`, `status`, `updated`, and `tags`.
- Use `status: active` for current knowledge, `status: draft` for a proposal, and `status: archived` for superseded knowledge.
- Add `sources` when a claim depends on a repository file, external URL, or source note. Use repository-relative paths in backticks in the body.
- Prefer short headings and one idea per paragraph. Mark interpretation explicitly as **Assumption**, **Recommendation**, or **Gap**.

## Links

- Link concepts with Obsidian wikilinks, for example `[[project/overview]]`, `[[features/job-discovery]]`, and `[[decisions/README]]`.
- Link from catalog pages to every maintained page. Link feature pages to relevant journeys, data modules, routes, and decisions.
- Use normal Markdown links for external URLs.
- When renaming a page, update all incoming wikilinks in the same change.

## Ingest, query, and lint

1. Inspect the repository or external source first; record the scope and date in `[[log]]`.
2. Add immutable source material or a concise source note under `sources/`.
3. Update affected wiki pages and `[[index]]`; do not silently overwrite an older source capture.
4. Query by browsing `[[index]]`, Obsidian backlinks, tags, and graph view. Search exact repository paths when checking implementation claims.
5. Lint manually or with a future script: every wikilink should resolve; every page should have required frontmatter; every page should be reachable from `[[index]]` or a linked page; dates should be ISO `YYYY-MM-DD`.
6. Check for orphan links, contradictions between pages, stale route names, claims that confuse mock data with persistence, and missing pages for new product areas.

## Claim discipline

Repository behavior outranks README promises. Say “implemented” only when code supports it. Say “demo/mocked” when data or AI responses are local. Say “scaffolded” for the server that is present but not called by the active client. Recommendations belong in `[[roadmap]]` or `[[decisions/README]]`, not in current-state descriptions.
