# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 4.2.15 - 2021-04-14

### Changed

- **[BTC-INDEXER]** Drop inputs and outputs from database (43ec375a, @faustbrian)

## 4.2.14 - 2021-04-14

### Changed

- **[PROFILES]** Split profile `restore` and `sync` (38f26c33, @faustbrian)
- **[PROFILES]** Make coin instance available offline (9f5f1a16, @faustbrian)

## 4.2.12 - 2021-04-13

### Added

- **[DOT]** Add kusama manifest (1fb0a704, @faustbrian)

### Changed

- **[PROFILES]** Accept locale as argument in `WalletRepository#generate` (5186482f, @dated)
- **[PROFILES]** Expose if read-only wallet is a (resigned) delegate (a213f030, @faustbrian)

## 4.2.9 - 2021-04-13

### Changed

- **[SDK]** Determine if coin instance uses a custom host (00692b07, @faustbrian)

## 4.2.8 - 2021-04-12

### Changed

- **[PROFILES]** Mark as fully restored after coin has connected (6202ac48, @faustbrian)

## 4.2.7 - 2021-04-12

### Changed

- **[PROFILES]** Reset all restoration states (014ea0fb, @faustbrian)

## 4.2.6 - 2021-04-12

### Changed

- **[ARK]** Only return 1 cold wallet from ledger scanning (ddc91a17, @faustbrian)

### Fixed

- **[ADA]** Don't harden account key segments (619cc0cf, @faustbrian)

## 4.2.4 - 2021-04-09

### Changed

- **[SDK]** Target `es2020` (b55dbe72, @faustbrian)

### Fixed

- **[ARK]** Map correct path for BIP44 derivation (4bc1c906, @faustbrian)

## 4.2.2 - 2021-04-09

### Changed

- **[PROFILES]** Prevent duplicate coin synchronisation (733ff584, @faustbrian)
- **[PROFILES]** Implement `IProfile#hasBeenPartiallyRestored` (3df253ca, @faustbrian)

## 4.2.0 - 2021-04-09

### Changed

- **[ARK]** DRY up peer determination (19a4e8e3, @faustbrian)
- **[SDK]** Mirror `__construct` and `__destruct` in `CoinFactory` (e3205cb0, @faustbrian)

## 4.1.14 - 2021-04-08

### Changed

- **[ARK]** Include cold wallets in ledger scan results (3cddec82, @faustbrian)

## 4.1.13 - 2021-04-07

### Added

- **[PROFILES]** Implement portfolio breakdown by ticker (af67a59d, @faustbrian)

### Changed

- **[ARK]** Support `vendorField` search (f52e093d, @faustbrian)
- **[SDK]** Return BIP44 paths for ledger scan (90671f52, @faustbrian)

## 4.1.10 - 2021-03-31

### Fixed

- **[PROFILES]** Prevent addresses from being overridden by query (821bd642, @goga-m)

## 4.1.9 - 2021-03-31

### Changed

- **[PROFILES]** Implement `ReadWriteWallet#setWif` (056370f9, @dated)
- **[AVAX]** Compute transaction ID as sha256 hash (73c9858f, @faustbrian)
- **[SDK]** Implement `Network#expirationType` (891f8185, @luciorubeens)

## 4.1.4 - 2021-03-30

### Changed

-   **[PROFILES]** Make last known network configuration available before wallet sync (180fdaa5, @faustbrian)

## 4.1.3 - 2021-03-30

### Added

-   **[LUNA]** Initial draft implementation (9eef078c, @faustbrian)
-   **[NANO]** Initial draft implementation (23ea9dce, @faustbrian)

### Fixed

-   **[PROFILES]** Make `PluginRegistry` an `injectable` (67cdaf62, @faustbrian)

## 4.1.0 - 2021-03-30

### Fixed

-   **[PROFILES]** Only use custom peer if setting is enabled (b461135f, @faustbrian)

### Changed

-   **[PROFILES]** Use correct peer, plugin and notification interfaces (8f783ef7, @faustbrian)
-   **[PROFILES]** Use `inversify` as DI container (53a18606, @faustbrian)
-   **[PROFILES]** Split profile restoration into separate methods (71d1adb1, @faustbrian)

## 4.0.5 - 2021-03-29

### Changed

-   **[PROFILES]** Lazily construct driver instances (f0f28804, @faustbrian)

## 4.0.4 - 2021-03-26

### Added

-   **[ARK]** Sign message with wif (aacc2f36, @dated)
-   **[JSON-RPC]** Implement transaction listing (a69fb46e, @faustbrian)

## 4.0.2 - 2021-03-26

### Changed

-   **[PROFILES]** Expose externally used classes (b7083d77, @faustbrian)

## 4.0.1 - 2021-03-25

### Fixed

-   **[PROFILES]** export Avatar helper (ec014811, @faustbrian)

## 4.0.0 - 2021-03-25

This release contains internal breaking changes as well as external as a result. This mostly affects imports and type hinting of classes which should now use the exported `Contracts` to reference things instead of direct references of concrete implementations.

### Added

-   **[PROFILES]** Implement storage that uses system configuration path (e06cd77c, @faustbrian)

### Fixed

-   **[ARK]** Handle different broadcast response error types (4a7a442e, @dated)

### Changed

-   **[PROFILES]** Move default implementation into drivers/memory (31d8951d, @faustbrian)
-   **[PROFILES]** Extract environment configuration into drivers (c13b10ad, @faustbrian)
-   **[PROFILES]** Extract implementation contracts (207944d8, @faustbrian)
-   **[PROFILES]** Move DTO namespace into the root (09e4b8d9, @faustbrian)
-   **[PROFILES]** Temporarily prefix all contracts with I (136c2a31, @faustbrian)
-   **[PROFILES]** Use new implementation contracts (758e2999, @faustbrian)
