# Changelog

All notable changes to LifeOS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
where applicable.

## [Unreleased] - 2026-06-25 to 2026-06-26

### Added
- Issue templates (bug report, feature request, documentation, setup/dev
  query) under `.github/ISSUE_TEMPLATE/`.
- VS Code workspace settings (`.vscode/settings.json`) for consistent
  formatting, linting, and Tailwind IntelliSense across contributors.
- `CHANGELOG.md` to track project history going forward.

### Fixed
- CI/CD pipeline stabilized after repeated failures: removed heavy artifact
  uploads that were causing network/connection timeouts, safeguarded the
  backend test stage so it no longer breaks the build, and corrected the
  git clone strategy to eliminate branch-tracking bugs in CI runners.
- `git clean` step in CI was incorrectly dropping `node_modules` paths it
  shouldn't have touched; restricted its scope.
- Pipeline variables and folder paths corrected after moving CI configuration
  to the repository root.

### Changed
- Reorganized GitLab CI pipeline configuration: moved config to repo root,
  cleaned up folder tracking, and optimized npm install network flags for
  more reliable runs on the self-hosted runner.

---

## [0.3.0] - 2026-06-21 — CI/CD Introduction

### Added
- Initial clean GitLab CI pipeline configuration for LifeOS (lint, build,
  and test stages wired up for the self-hosted GitLab runner).

---

## [0.2.0] - 2026-06-12 to 2026-06-13 — Feature Expansion & UI Polish

### Added
- AIScout chatbot for personalized challenge recommendations.
- Dashboard search, quick filters, and several new challenge categories
  (Competence Loop, Language Acquisition, Micro-win, Self-compassion,
  well-being challenges).
- Challenge preview modal and custom challenge support in the library.
- Google OAuth2 login (later reverted — see Removed).
- Mobile-friendly hamburger menu with active touch feedback, plus a final
  UI polish pass (grid glow effects, responsive mobile layout).
- User testimonials section on the dashboard.

### Fixed
- Resolved a blank-screen bug on challenge acceptance and reworked the flow
  to be mobile-friendly.
- Restored experiment routes that had gone missing, and fixed title mapping
  and missing categories in the Experiment model enum.
- Relaxed an overly strict database connection check that was hurting
  serverless reliability on Render.
- Made CORS configuration more permissive to unblock legitimate
  frontend-backend requests.
- Removed an invalid `app.options` wildcard route that was throwing
  `PathError`.
- Hardcoded the API URL to bypass a Vercel routing issue and simplified
  `vercel.json` accordingly.
- Resolved strict TypeScript errors in the experiment API.
- Cleaned up unused imports (`CreateExperiment.tsx`) and removed duplicate
  challenge entries in favor of unique experiments.
- Added debug logging to the delete-experiment endpoint to track down and
  fix a failing delete flow.

### Removed
- Google OAuth2 login (reverted shortly after introduction).

---

## [0.1.0] - Initial Build — Hackathon MVP

### Added
- Initial build of LifeOS — an AI-powered personal experimentation platform
  ("Life Experiment Lab") built solo during a same-day hackathon at Swecha.
- Core experiment engine: create personal experiments, define hypotheses,
  and log daily metrics.
- AI-generated insights and Personal Operating Manual generation.
- Frontend built with React.js + Tailwind CSS; backend built with
  Node.js + Express.js (TypeScript) and MongoDB.
- Local AI inference via Ollama (privacy-first default) with optional
  OpenAI API support (bring-your-own-key).
- Deployment to Vercel (frontend) and Render (backend).
