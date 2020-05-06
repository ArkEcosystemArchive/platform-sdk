# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 0.5.2 - 2020-05-06

### Fixed

- try to first use a peer and then the network for the `PeerService` (4859be8b, @faustbrian)

## 0.5.1 - 2020-05-06

### Fixed

-   Handle underlying effects of new factory arguments (be625fe4, @faustbrian)

## 0.5.0 - 2020-05-06

### Fixed

-   Add missing exceptions for `IdentityService` (b5240108, @faustbrian)

### Added

-   Transfer transaction signing and broadcasting for `BTC` (017ce6fc, @faustbrian)
-   Implement `FeeService` to control fee behaviours (b6100d72, @faustbrian)

### Changed

-   Replace `bitcoin-*` libs with `bitcore-lib` (ccc6b1ad, @faustbrian)
-   Include basic network information in `manifest` (54e59a72, @faustbrian)
-   Normalise `Factory` options (04c02c89, @faustbrian)
-   Rename `PriceTrackerService` to `MarketService` and add documentation (aed26ab5, @faustbrian)

## 0.4.5 - 2020-05-05

### Added

-   Implement `ClientService#transaction/transactions/wallet` methods for `ATOM` (82e606ae, @faustbrian)
-   Transfer signing and broadcasting (f72bc101, @faustbrian)

### Changed

-   Always collect coverage (529876f6, @faustbrian)
-   Update manifests (6dd5e40e, @faustbrian)

## 0.4.1 - 2020-05-04

### Changed

-   Updated manifests (6dd5e40, @faustbrian)

## 0.4.0 - 2020-05-04

### Added

-   add `DelegateData#getUsername` and `DelegateData#getRank` (0a4ab515, @faustbrian)
-   add `ClientService#getVotes` and `ClientService#getVoters` methods (b9075224, @faustbrian)
-   implement transaction signing and identity geneneration (81486551, @faustbrian)
-   implement LinkService (f18a6d1c, @faustbrian)
-   add `options` for transaction signing (5c528f3a, @faustbrian)
-   implement `Factory` for each adapter (fa81ba4e, @faustbrian)
-   implement `LedgerService` (b894e16b, @faustbrian)

### Changed

-   make all public API methods async (72a5dd0b, @faustbrian)
-   return normalised object from `DTO#toObject` (8e413dfc, @faustbrian)
-   remove unused block code (64127a74, @faustbrian)
-   standardise the input for the `Transaction#create*` methods (b9fe08f3, @faustbrian)
-   add `Class#construct` and `Class#destruct` (406fd104, @faustbrian)
-   use ripple-lib connection for API requests (31617bbd, @faustbrian)
-   final method names (0b239fb3, @faustbrian)
-   drop `ClientService#searchTransactions` and `ClientService#searchWallets` (9cb7f2bc, @faustbrian)
-   merge `ClientService#cryptoConfiguration` into `ClientService#configuration` (4d5a414d, @faustbrian)
-   merge `ClientService#feesByNode` and `ClientService#feesByType` (9a6406b7, @faustbrian)
-   add contract for `MessageService` input (317188e6, @faustbrian)
-   add contract for `IdentityService` input (20cc46af, @faustbrian)
-   turn `PeerService` fluent helpers into options (9eaecafe, @faustbrian)

## 0.3.6 - 2020-04-29

### Changed

-   add package banners (80fda7dd, @faustbrian)

### Fixed

-   only list payments when using `Client#getTransactions` (0e0c7966, @faustbrian)
-   use testnet transaction structure (ac85331e, @faustbrian)
-   return `asset.payments` sum if transaction type is multipayment (78bd0671, @faustbrian)

## 0.3.3 - 2020-04-29

### Added

-   add `WalletData#getNonce` method (fbbc21ba, @faustbrian)

### Changed

-   add `yarn run publish` script (1a623033, @faustbrian)
-   expect an array of transactions for `#postTransactions` (777d7821, @faustbrian)
-

### Fixed

-   treat amounts as strings (d7d0d9ca, @faustbrian)

## 0.3.0 - 2020-04-29

### Added

-   initial draft of normalised Block DTO (2487fad5, @faustbrian)
-   initial draft of normalised Transaction DTO (15ca2eef, @faustbrian)
-   initial draft of normalised Peer DTO (398d123c, @faustbrian)
-   initial draft of normalised Wallet DTO (1cbe4dc7, @faustbrian)
-   add manifests to provide coin information (ae3ae870, @faustbrian)
-   implement `Client` methods (a35aa505, @faustbrian)
-   initial implementation (2eae2f0b, @faustbrian)
-   implement `getTransactions` (671887b3, @faustbrian)
-   initial implementation (40939eb3, @faustbrian)
-   implement `Client#getWallet` (7b60b859, @faustbrian)
-   implement `Message#sign` and `Message#verify` (596f9ebd, @faustbrian)
-   implement transaction, wallet and delegate methods for `Client` (dba67b63, @faustbrian)
-   introduce peer discovery service (f6147ff6, @faustbrian)
-

### Changed

-   update dependencies to latest versions (6aee2492, @github-actions[bot])
-   update dependencies to latest versions (395ae36a, @github-actions[bot])
-   use @liskhq/lisk-transactions-old for mainnet and testnet (b946b522, @faustbrian)
-   remove getBridgechainsByBusiness (9b891508, @faustbrian)
-   remove block methods (187a6787, @faustbrian)
-   use yarn workspace with multiple packages (e38562b3, @faustbrian)
-   setup boilerplate for NEO, XMR and XRP (ca079e52, @faustbrian)
-   break down price trackers into multiple packages (aad6b240, @faustbrian)
-   move everything to its final location with matching names (2684b89d, @faustbrian)
-   final package names (7bbca218, @faustbrian)

### Fixed

-   include meta data in collection-based responses (73ee7b32, @faustbrian)

## 0.2.0 - 2020-03-31

### Added

-   Implement delegate methods for clients (70517411, @faustbrian)
-   Add more endpoints for ARK client (d5cc49fd, @faustbrian)
-   Initial implementation of LSK (9be68718, @faustbrian)
-   Message signing for ARK, BTC and LSK (9bb77307, @faustbrian)
-   Add `getPeers` method to client contract (d3dc3e99, @faustbrian)
-   Initial implementation of TRX (fe71fb9f, @faustbrian)
-   Basic client setup for ETH (fe8168b9, @faustbrian)
-   Implement various ETH client methods (6935f8c9, @faustbrian)

### Changed

-   Bump acorn from 6.4.0 to 6.4.1 (8e67abab, @dependabot[bot])
-   Disable conflicting eslint rules (7f9dc896, @faustbrian)
-   Update dependencies to latest versions (628dff91, @github-actions[bot])

### Fixed

-   Usage of exceptions (a6a0d1f2, @faustbrian)
-   Default lisk to betanet (8b1e86bd, @faustbrian)

## 0.1.1 - 2020-03-24

### Fixed

-   Export IdentityFactory (d09b2ebf, @faustbrian)

## 0.1.0 - 2020-03-24

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

### Fixed

-   Export price tracker contracts (81fb042b, @faustbrian)
-   Add missing default plugins to dayjs (d62b0d53, @faustbrian)

## 0.0.2 - 2020-03-06

### Fixed

-   Export `PriceTrackerService`

## 0.0.1 - 2020-03-06

-   initial release

[unreleased]: https://github.com/ARKEcosystem/core/compare/master...develop
