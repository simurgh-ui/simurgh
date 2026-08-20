# Release operations

Simurgh packages use independent versions managed by Changesets. When Changesets reach `main`, the
**Changelog** workflow automatically creates or updates a release pull request containing package
version bumps and generated `CHANGELOG.md` entries. Publishing remains deliberately manual: an
authorized maintainer starts the **Release** workflow, and the `npm` GitHub environment should
require a reviewer before the job can access publication credentials.

## Configure release access

1. Create an npm automation token restricted to the `@simurgh-ui` scope and save it as the
   repository secret `NPM_TOKEN`.
2. Protect the GitHub environment named `npm` with required reviewers and limit deployment branches
   to `main`.
3. Require two-factor authentication for maintainer accounts and grant package access to named
   maintainers rather than shared accounts.
4. Keep GitHub Actions OIDC enabled. Publications set `NPM_CONFIG_PROVENANCE=true` so npm can attach
   build provenance.

## Release procedure

1. Confirm all consumer-visible package changes have an accurate Changeset.
2. Run CI from a clean checkout and review package, API, accessibility, and bundle-size changes.
3. Review the version and changelog pull request automatically maintained by the Changelog
   workflow, then merge it.
4. Start the Release workflow on `main` to publish the versioned packages.
5. Verify npm package contents, provenance, changelogs, documentation links, and framework quick
   starts using the published versions.

Never publish from an uncommitted local working tree or bypass a failed release gate.

## Recovery

- If a token may be exposed, revoke it in npm immediately, rotate `NPM_TOKEN`, review package and
  workflow audit logs, and invalidate affected maintainer sessions.
- npm versions are immutable. Correct a bad non-security release with a new patch and deprecate the
  affected version with a clear message; do not reuse its version number.
- For a security release, coordinate disclosure through the private vulnerability report, publish
  fixed versions, and document affected ranges and mitigations.
- If provenance or package contents do not match the workflow run, stop further releases, preserve
  the run logs and tarballs, rotate credentials, and investigate before publishing again.
