# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 1.2.7 - 2020-12-02

Republish of 1.2.6

## 1.2.6 - 2020-12-02

### Changed

-   Implement `pqueueSettled` stub (2d7822e8, @faustbrian)

## 1.2.5 - 2020-12-02

### Changed

-   Use `p-queue` instead of `Promise.all` and `Promise.allSettled` (c18266e8, @faustbrian)

## 1.2.4 - 2020-12-02

### Changed

-   Compare network tokens after retrieving the crypto configuration (c8a115d8, @faustbrian)

## 1.2.3 - 2020-12-02

### Changed

-   Restore wallets before contacts (655fb0f5, @faustbrian)

## 1.2.2 - 2020-12-02

### Changed

-   Remove service exports (4c873f28, @faustbrian)
-   Pre-sync 1 wallet per network to avoid duplicate requests (d14138c4, @faustbrian)

## 1.2.0 - 2020-12-02

### Changed

-   Move responsibility of service bootstrapping to coins (90fb66ba, @faustbrian)
-   Import contacts and then sync them with `Promise.all` (42558c64, @faustbrian)

## 1.1.23 - 2020-12-01

### Added

-   Implement crypto for address derivation (8a9aba85, @faustbrian)

### Changed

-   Memoize the avatar by seed (cb9f7c6f, @faustbrian)
-   Use `Promise.all` to deconstruct coin services (25bbb0d6, @faustbrian)
-   Use `Promise.all` to construct coin services (c89f0300, @faustbrian)
-   Remove NEO check (a37780fe, @dated)

## 1.1.18 - 2020-11-30

### Fixed

-   Allow wallets without public keys (8f8f797e, @faustbrian)

## 1.1.17 - 2020-11-30

### Changed

-   Use `Promise.all` to restore wallets (f1887852, @faustbrian)

## 1.1.16 - 2020-11-28

### Fixed

-   Ensure that custom custom peers circumvent object caching (ca750408, @faustbrian)

## 1.1.15 - 2020-11-25

### Fixed

-   Call correct method in `Wallet#cannot` (f7d39c80, @dated)

## 1.1.14 - 2020-11-25

### Fixed

-   Reset array indices when forgetting a value (9419e81e, @faustbrian)

## 1.1.13 - 2020-11-25

### Added

-   Implement PriceTracker#dailyAverage (bdfd0d27, @dated)
-   Implement PriceTracker#dailyAverage (fe499327, @dated)
-   Edit custom peer (ec0a43b7, @brenopolanski)

## 1.1.10 - 2020-11-23

### Changed

-   Support multi-coin news retrieval (dc5e881d, @faustbrian)

## 1.1.9 - 2020-11-23

### Added

-   Implement `ReadWriteWallet#canAny` and `ReadWriteWallet#canAll` (684bca7f, @faustbrian)

## 1.1.8 - 2020-11-19

### Added

-   Implement `Wallet#sync` method (d29b4d7e, @faustbrian)

## 1.1.7 - 2020-11-19

### Added

-   Added `ClientService#broadcastSpread` tests (d60e17e0, @faustbrian)

## 1.1.6 - 2020-11-19

### Added

-   Implement multi-peer broadcasting (8f397040, @faustbrian)

### Changed

-   Fetch exchange rates only for live coins (74b87fd7, @dated)

## 1.1.4 - 2020-11-14

### Added

-   Add development network setting (3afe258d, @goga-m)

## 1.1.3 - 2020-11-13

### Added

-   Add custom peer usage setting (93a32ac1, @faustbrian)

### Changed

-   Store name and type for peers (91b6d3ca, @faustbrian)

### Fixed

-   Return 0 for test network balances (58b1fdc4, @faustbrian)

## 1.1.0 - 2020-11-12

### Added

-   AIP13 & AIP26 compatibility (72587c70, @faustbrian)

## 1.0.1 - 2020-11-09

### Fixed

-   Divide transaction total before converting it (a0bf4826, @faustbrian)

## 1.0.0 - 2020-11-09

**This is the first stable release.** Please note that not all coins are fully implemented as of now. All packages are tagged as `1.0.0` to indicate their compliance with the APIs exposed by the `@arkecosystem/platform-sdk` package. If major changes to the internals are required to make certain functionality work we will tag a new major release to make it clear that breaking changes to the architecture were introduced.
