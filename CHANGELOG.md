# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 3.0.41 - 2020-03-03

### Changed

-   Deprecate `platform-sdk-json-rpc` (6ef42d65, @faustbrian)

## 3.0.40 - 2020-03-02

### Changed

- **[PROFILES]** Use internal and external transaction ID (1c3e4938, @faustbrian)

### Added

- **[CLI]** Implement storage persistence (ae697a38, @faustbrian)
- **[CLI]** List transactions for active wallet (abb58895, @faustbrian)
- **[CLI]** Ask for an optional password during profile creation (b8628e9c, @faustbrian)
- **[ETH-SERVER]** Pagination for wallet transactions (cd547e75, @marianogoldman)
- **[AVAX]** Implement `Address#fromPrivateKey` and `Keys#fromMnemonic` (86e7f5b2, @faustbrian)
- **[CLI]** Show explorer link for confirmed transaction (f5ff4312, @faustbrian)

### Fixed

- **[PROFILES]** Dump stale wallet state if it has been partially restored (26b1c6da, @faustbrian)
- **[EGLD]** Fix coin name in manifest (f4f36fcb, @marianogoldman)

## 3.0.31 - 2020-03-01

### Added

-   **[SOL]** Initial implementation (d209018f, @faustbrian)
-   **[BTC-SERVER]** Initial implementation (95567eb4, @marianogoldman)
-   **[CLI]** Initial implementation (c705cde9, @faustbrian)

### Changed

-   Support BIP44 options for identity derivation (acf7651f, @faustbrian)

### Fixed

-   **[ETH-INDEXER]** Allow block identifier to be number or hash (84182619, @marianogoldman)

## 3.0.26 - 2020-02-25

### Fixed

-   **[ETH-SERVER]** Strip out unknown parameters (baefe131, @faustbrian)

### Added

-   **[ETH-SERVER]** Set up rate limiting (56e17b04, @faustbrian)
-   **[ETH-SERVER]** Implement wallet endpoint (2b529c55, @faustbrian)
-   **[ETH-SERVER]** Implement transaction broadcasting (10292e30, @faustbrian)
-   **[ETH-SERVER]** Return state information from root path (b0f94396, @faustbrian)
-   **[ETH-SERVER]** Validate path parameters (164151a7, @faustbrian)

## 3.0.20 - 2020-02-25

### Added

-   **[ETH-SERVER]** initial implementation (adf51935, @faustbrian)

### Fixed

-   **[ETH-INDEXER]** Remove trailing commas from SQL migration (969160e4, @faustbrian)

## 3.0.18 - 2020-02-25

### Changed

-   Use SQLite as database engine (62202ba9, @marianogoldman)
-   Only store data that is required for API consumption (f6ee2e28, @faustbrian)

## 3.0.16 - 2020-02-24

### Fixed

-   Include ID in plugin data (4864c8b5, @faustbrian)

## 3.0.15 - 2020-02-24

### Added

-   Implement `ReadWriteWallet#displayName` (a886066c, @dated)

### Changed

-   Add missing block and transaction indices (e0bd9db9, @faustbrian)
-   Add `ProfileSetting.DashboardTransactionHistory` (e6fa351b, @dated)

## 3.0.12 - 2020-02-24

### Added

-   **[ETH]** Retrieve fees from `ethgas.watch` (c259a012, @faustbrian)

### Changed

-   Store plugins with an internal UUID (5fd0f0ec, @faustbrian)

## 3.0.10 - 2020-02-24

### Fixed

-   **[EGLD]** Link `blocks` to `miniblocks` (d0b02ae2, @faustbrian)
-   **[EGLD]** Treat transaction timestamp as unix (2009aeb9, @faustbrian)

## 3.0.8 - 2020-02-24

### Fixed

-   **[EGLD]** Normalise fees to satoshi (a2ccaf62, @faustbrian)

## 3.0.7 - 2020-02-24

### Fixed

-   **[EGLD]** Normalise numeric values to satoshis (4d4e3def, @faustbrian)

## 3.0.6 - 2020-02-24

### Fixed

-   **[EGLD]** Expect `egld.mainnet` or `egld.testnet` as networks (706c9076, @faustbrian)
-   **[EGLD]** Expect address or list of addresses for `ClientService#transactions` (56734116, @faustbrian)
-   Adjust validation of plugins (fbd078fb, @dated)

## 3.0.3 - 2020-02-24

### Added

-   **[EGLD]** Implement `ClientService#wallet` (6d7a0b15, @faustbrian)

### Changed

-   **[EGLD]** Adjust DTOs and some API paths (756ff46c, @faustbrian)

### Fixed

-   Use `EGLD` as export name (003c67e1, @faustbrian)

## 3.0.0 - 2020-02-23

See https://github.com/jeanlescure/string-crypto#v2-breaking-changes for breaking change details.

### Added

-   Add `ProfileSetting.ErrorReporting` (6ebbdb13, @luciorubeens)
-   **[EGLD]** Initial implementation (70dc816f, @faustbrian)
-   **[EGLD]** Implement transfer signing and broadcasting (0aa5dc2a, @faustbrian)

### Changed

-   **[BREAKING]** Update `string-crypto` dependency (7f323131, @faustbrian)
-   **[ARK]** Omit days from fee requests (de260f67, @faustbrian)
