# Changelog

All notable changes to LifeOS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
where applicable.

## [Unreleased]

### Added
- CI/CD pipeline via GitHub Actions for automated formatting, linting, type
  checking, security scanning, and tests.
- Local git hooks using Husky + lint-staged to enforce checks before commit/push.

### Fixed
- Resolved `main` branch tracking issue where pushes were defaulting to the
  GitLab remote (`gitlab`) instead of GitHub (`origin`) in the dual-remote setup.

---

## [0.2.0] - Deployment & Stabilization

### Added
- Production deployment: frontend on Vercel, backend (Node.js/Express,
  TypeScript) on Render.
- `.gitlab-ci.yml` for mirroring CI on Swecha's GitLab remote.

### Fixed
- Frontend-to-backend connectivity failure caused by an incorrect
  `VITE_API_URL` environment variable in Vercel.
- HTTP 413 (payload too large) error on push to GitLab caused by repository
  size bloat from previously committed `node_modules` files; cleaned up
  history and added proper `.gitignore` rules.

### Changed
- Repository configured with dual remotes: `origin` (GitHub) and `gitlab`
  (Swecha GitLab), to satisfy submission requirements on both platforms.

---

## [0.1.0] - Initial Build

### Added
- Initial release of LifeOS — an AI-powered personal experimentation platform
  ("Life Experiment Lab") built solo during a same-day hackathon at Swecha.
- Core experiment engine: create personal experiments, define hypotheses,
  log daily metrics (mood, energy, productivity, sleep, screen time, exercise).
- AI-generated insights comparing experiment outcomes.
- Personal Operating Manual generation: ideal sleep schedule, best study
  hours, most productive work period, recommended exercise timing.
- Support for local AI inference via Ollama (default, privacy-first) and
  optional online AI via OpenAI API (bring-your-own-key).
- Frontend built with React.js + Tailwind CSS.
- Backend built with Node.js + Express.js, MongoDB for storage.

[Unreleased]: https://github.com/aksharap22/LifeOS/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/aksharap22/LifeOS/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/aksharap22/LifeOS/releases/tag/v0.1.0
