# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 3.2.7 - 2021-03-24

### Changed

-   **[PROFILES]** Perform concurrent delegate synchronisation if possible (41ce33ac, @faustbrian)

## 3.2.6 - 2021-03-24

### Added

-   **[JSON-RPC]** Implement message service (c3bfa90f, @faustbrian)

## 3.2.5 - 2021-03-23

### Added

-   **[JSON-RPC]** Implement wallet generation (d0ffc13a, @faustbrian)

### Changed

-   **[JSON-RPC]** Cache coin instance based on network (eed90c38, @faustbrian)

### Fixed

-   **[PROFILES]** Include bip38 data in ReadWriteWallet#toObject (2fef13e2, @goga-m)

## 3.2.2 - 2021-03-22

### Added

-   **[JSON-RPC]** Implement transfer signing and broadcasting (dd5f1cbc, @faustbrian)
-   **[JSON-RPC]** Retrieve transaction, wallet and delegate details (66935805, @faustbrian)

## 3.2.0 - 2021-03-19

### Added

-   **[JSON-RPC]** Initial implementation (5e86eb49, @faustbrian)

### Changed

-   **[PROFILES]** Remove excludeWalletsWithoutName export setting (27cd78aa, @dated)

## 3.1.24 - 2021-03-18

### Added

-   **[CRYPTO]** Implement `WIF` helpers (a187a096, @faustbrian)
-   **[ARK]** Implement `LedgerService#scan` (bac3e2eb, @marianogoldman)
-   **[ARK]** Implement BIP44 compliant ledger derivation (dc24ea0f, @faustbrian)

### Fixed

-   **[PROFILES]** Expose `ReadWriteWallet#wif` and `ReadWriteWallet#usesWIF` methods (03247207, @goga-m)

## 3.1.20 - 2021-03-12

### Added

-   Implement `UUID` helper (e23ad13d, @faustbrian)
-   Implement WIF and encrypted WIF import (846c6f4a, @faustbrian)

## 3.1.18 - 2021-03-11

### Changed

-   Append trailing zeros only if value is truthy (f30a82a2, @dated)

## 3.1.17 - 2021-03-10

### Added

-    **[CRYPTO]** Implement `HDKey` helper (9af92ebe, @faustbrian)
-    **[CRYPTO]** Implement `Base58` helper (0e067913, @faustbrian)
-    **[CRYPTO]** Implement more `BIP32` derivation methods (9071959f, @faustbrian)
-    **[CLI]** Import wallets from ledger device (f8f17370, @faustbrian)
-    **[CLI]** Implement IPFS (22c7348e, @faustbrian)
-    **[CLI]** Implement voting (27c0e8fb, @faustbrian)
-    **[CLI]** Implement second signature registration (66bfa9a1, @faustbrian)
-    **[CLI]** Implement delegate resignation (15753daa, @faustbrian)
-    **[CLI]** Implement delegate registration (1ffe1c33, @faustbrian)
-    **[CLI]** Implement multi-payment (f48847a8, @faustbrian)
-    **[PROFILES]** Implement bulk address import (ce7d965d, @faustbrian)
-    **[PROFILES]** Expose public key and private key import for wallets (e83e5446, @faustbrian)

### Changed

-    **[PROFILES]** Add `ProfileSetting.DoNotShowAdvancedModeDisclaimer` (c65ffb90, @dated)

## 3.1.4 - 2021-03-08

### Fixed

-   **[BTC-INDEXER]** Rename output to outputs (6c22f5ec, @faustbrian)

## 3.1.3 - 2021-03-08

### Fixed

-   **[BTC-INDEXER]** Query last block by number (f8dbadc5, @faustbrian)

## 3.1.2 - 2021-03-08

### Fixed

-   **[BTC-INDEXER]** Rename height to number (0dedbf87, @faustbrian)

## 3.1.1 - 2021-03-08

### Fixed

-   **[BTC-INDEXER]** Remove trailing comma from migration (ac3a51c5, @faustbrian)

## 3.1.0 - 2021-03-08

### Added

-   **[ADA]** Implement `AddressListFactory` (e787e6d0, @faustbrian)
-   **[SDK]** Implement `AddressList` for every coin (073b2371, @faustbrian)
-   **[SDK]** Implement derivation feature flags (df3c2210, @faustbrian)
-   **[SDK]** Implement `AddressList#fromPrivateKey` (660591e0, @faustbrian)
-   **[PROFILES]** Implement profile importing and exporting (a24b69e8, @marianogoldman)
-   **[PROFILES]** Support BIP39/44 derivation (7805d94e, @faustbrian)
-   **[BTC]** Implement BIP49 and BIP84 (6ad383bf, @faustbrian)
-   **[SDK]** Implement ledger feature flags for transactions (e35cb267, @faustbrian)
-   **[CLI]** Implement message signing and verifying (09bbcd1c, @faustbrian)
-   **[SDK]** Implement `LedgerService#getExtendedPublicKey` (a45dd4b8, @faustbrian)

### Changed

-   **[ADA]** Use `@emurgo/cardano-serialization-lib-nodejs` for address derivation (02b09386, @faustbrian)
-   **[CLI]** Enable SOL integration (afa7556f, @faustbrian)
-   **[SDK]** Use enum to access configuration values (4a01069c, @faustbrian)
-   **[SDK]** Make `AddressList#fromMnemonic` asynchronous (96080ccd, @faustbrian)
-   **[SDK]** Allow passing in of a BIP44 purpose to support BIP49/84 (a9b639fa, @faustbrian)
-   **[ADA]** Use `@emurgo/cardano-serialization-lib-nodejs` for message signing (97c3e8e1, @faustbrian)
-   **[ADA]** Use `bech32` for address validation (e51cfc71, @faustbrian)
-   **[CRYPTO]** Separate BIP32 from BIP44 (dbcb6ba2, @faustbrian)
-   **[BTC-INDEXER]** Remove unnecessary database columns (bcf97398, @faustbrian)

### Fixed

-   **[CLI]** Skip actions if values are falsy (6c60fe40, @faustbrian)
-   **[BTC-SERVER]** Add username and password flags (60ffbb35, @faustbrian)

## 3.0.41 - 2021-03-03

### Changed

-   Deprecate `platform-sdk-json-rpc` (6ef42d65, @faustbrian)

## 3.0.40 - 2021-03-02

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

## 3.0.31 - 2021-03-01

### Added

-   **[SOL]** Initial implementation (d209018f, @faustbrian)
-   **[BTC-SERVER]** Initial implementation (95567eb4, @marianogoldman)
-   **[CLI]** Initial implementation (c705cde9, @faustbrian)

### Changed

-   Support BIP44 options for identity derivation (acf7651f, @faustbrian)

### Fixed

-   **[ETH-INDEXER]** Allow block identifier to be number or hash (84182619, @marianogoldman)

## 3.0.26 - 2021-02-25

### Fixed

-   **[ETH-SERVER]** Strip out unknown parameters (baefe131, @faustbrian)

### Added

-   **[ETH-SERVER]** Set up rate limiting (56e17b04, @faustbrian)
-   **[ETH-SERVER]** Implement wallet endpoint (2b529c55, @faustbrian)
-   **[ETH-SERVER]** Implement transaction broadcasting (10292e30, @faustbrian)
-   **[ETH-SERVER]** Return state information from root path (b0f94396, @faustbrian)
-   **[ETH-SERVER]** Validate path parameters (164151a7, @faustbrian)

## 3.0.20 - 2021-02-25

### Added

-   **[ETH-SERVER]** initial implementation (adf51935, @faustbrian)

### Fixed

-   **[ETH-INDEXER]** Remove trailing commas from SQL migration (969160e4, @faustbrian)

## 3.0.18 - 2021-02-25

### Changed

-   Use SQLite as database engine (62202ba9, @marianogoldman)
-   Only store data that is required for API consumption (f6ee2e28, @faustbrian)

## 3.0.16 - 2021-02-24

### Fixed

-   Include ID in plugin data (4864c8b5, @faustbrian)

## 3.0.15 - 2021-02-24

### Added

-   Implement `ReadWriteWallet#displayName` (a886066c, @dated)

### Changed

-   Add missing block and transaction indices (e0bd9db9, @faustbrian)
-   Add `ProfileSetting.DashboardTransactionHistory` (e6fa351b, @dated)

## 3.0.12 - 2021-02-24

### Added

-   **[ETH]** Retrieve fees from `ethgas.watch` (c259a012, @faustbrian)

### Changed

-   Store plugins with an internal UUID (5fd0f0ec, @faustbrian)

## 3.0.10 - 2021-02-24

### Fixed

-   **[EGLD]** Link `blocks` to `miniblocks` (d0b02ae2, @faustbrian)
-   **[EGLD]** Treat transaction timestamp as unix (2009aeb9, @faustbrian)

## 3.0.8 - 2021-02-24

### Fixed

-   **[EGLD]** Normalise fees to satoshi (a2ccaf62, @faustbrian)

## 3.0.7 - 2021-02-24

### Fixed

-   **[EGLD]** Normalise numeric values to satoshis (4d4e3def, @faustbrian)

## 3.0.6 - 2021-02-24

### Fixed

-   **[EGLD]** Expect `egld.mainnet` or `egld.testnet` as networks (706c9076, @faustbrian)
-   **[EGLD]** Expect address or list of addresses for `ClientService#transactions` (56734116, @faustbrian)
-   Adjust validation of plugins (fbd078fb, @dated)

## 3.0.3 - 2021-02-24

### Added

-   **[EGLD]** Implement `ClientService#wallet` (6d7a0b15, @faustbrian)

### Changed

-   **[EGLD]** Adjust DTOs and some API paths (756ff46c, @faustbrian)

### Fixed

-   Use `EGLD` as export name (003c67e1, @faustbrian)

## 3.0.0 - 2021-02-23

See https://github.com/jeanlescure/string-crypto#v2-breaking-changes for breaking change details.

### Added

-   Add `ProfileSetting.ErrorReporting` (6ebbdb13, @luciorubeens)
-   **[EGLD]** Initial implementation (70dc816f, @faustbrian)
-   **[EGLD]** Implement transfer signing and broadcasting (0aa5dc2a, @faustbrian)

### Changed

-   **[BREAKING]** Update `string-crypto` dependency (7f323131, @faustbrian)
-   **[ARK]** Omit days from fee requests (de260f67, @faustbrian)
