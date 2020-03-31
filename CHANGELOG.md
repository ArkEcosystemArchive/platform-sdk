# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 0.2.0 - 2020-03-31

### Fixed

- Usage of exceptions (a6a0d1f2, @faustbrian)
- Default lisk to betanet (8b1e86bd, @faustbrian)

### Changed

- Bump acorn from 6.4.0 to 6.4.1 (8e67abab, @dependabot[bot])
- Disable conflicting eslint rules (7f9dc896, @faustbrian)
- Update dependencies to latest versions (628dff91, @github-actions[bot])

### Added

- Implement delegate methods for clients (70517411, @faustbrian)
- Add more endpoints for ARK client (d5cc49fd, @faustbrian)
- Initial implementation of LSK (9be68718, @faustbrian)
- Message signing for ARK, BTC and LSK (9bb77307, @faustbrian)
- Add `getPeers` method to client contract (d3dc3e99, @faustbrian)
- Initial implementation of TRX (fe71fb9f, @faustbrian)
- Basic client setup for ETH (fe8168b9, @faustbrian)
- Implement various ETH client methods (6935f8c9, @faustbrian)

## 0.1.1 - 2020-03-24

### Fixed

-   Export IdentityFactory (d09b2ebf, @faustbrian)

## 0.1.0 - 2020-03-24

### Fixed

-   Export price tracker contracts (81fb042b, @faustbrian)
-   Add missing default plugins to dayjs (d62b0d53, @faustbrian)

### Added

-   Initial implementation of ARK crypto (c7121fbd, @faustbrian)
-   Initial implementation of ARK client (593fd555, @faustbrian)
-   Add search methods to ARK client (ab3b1ee6, @faustbrian)
-   Identity generation for ARK (32a94c8c, @faustbrian)
-   Identity generation for BTC (fea0bb7b, @faustbrian)
-   Identity generation for ETH (c48615ba, @faustbrian)

### Changed

-   Add npm-check-updates as dev dependency (931de0f1, @faustbrian)
-   Update dependencies to latest versions (437dd822, @github-actions[bot])
-   Implement DTOs per adapter with a contract (ba882c5f, @faustbrian)
-   Update dependencies (4c03c69c, @faustbrian)
-   Organise concrete implementations by token (1f012929, @faustbrian)
-   Consolidate types for `Record<string, any>` (c0884c35, @faustbrian)
-   Move DTOs up a level to flatten directory structure (cd9e4307, @faustbrian)

## 0.0.2 - 2020-03-06

### Fixed

-   Export `PriceTrackerService`

## 0.0.1 - 2020-03-06

-   initial release

[unreleased]: https://github.com/ARKEcosystem/core/compare/master...develop
