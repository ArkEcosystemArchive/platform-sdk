# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2.6.0 - 2020-01-28

### Fixed

-   Store flags when dumping wallet (6dd50c96, @dated)

### Changed

-   Only return partial information for npm listing (c694a8b2, @faustbrian)
-   Return empty list if known wallets response is not an array (0bb24c66, @dated)
-   Ignore plugins that don't publicly expose their source code (8783c600, @faustbrian)
-   Split requests between NPM and GitHub (9fc9134e, @faustbrian)

## 2.5.15 - 2020-01-27

### Added

-   Implement `WalletRepository#importByMnemonicWithEncryption` (0087dc09, @faustbrian)

### Changed

-   Remove `signTransactionWithSchnorr` and `signMessageWithSchnorr` (c272379e, @faustbrian)
-   **[ARK]** Use `schnorr` for message signing and verification (5aaf2aa6, @faustbrian)

## 2.5.12 - 2020-01-27

### Changed

-   Change plugin ID type from `number` to `string` (034ae79f, @faustbrian)

## 2.5.11 - 2020-01-26

### Changed

-   Use HTTP client from container within `PluginRegistry` (c490abf9, @faustbrian)

## 2.5.10 - 2020-01-26

### Fixed

-   Save profile after creating it (b86ee720, @faustbrian)

## 2.5.9 - 2020-01-26

### Fixed

-   Only use password if it is a string (0a8d00d0, @faustbrian)

## 2.5.8 - 2020-01-26

### Added

-   Implement `ReadWriteWallet#knownName` (6c963d89, @dated)

### Changed

-   Handle all save exceptions (3cbc496e, @faustbrian)

### Fixed

-   Add empty knownWallets key to bind network config (d0ef6c14, @dated)

## 2.5.5 - 2020-01-25

### Changed

-   Require manual profile dumping (encoding/encrypting) (bac9e24d, @faustbrian)

## 2.5.4 - 2020-01-25

### Fixed

-   Apply base64 encoding only if not already done (890cbec4, @faustbrian)

## 2.5.3 - 2020-01-25

### Fixed

-   Store encrypted password from raw data (ea334581, @faustbrian)

## 2.5.2 - 2020-01-25

### Changed

-   **[LSK]** drop `betanet` support (03e9003e, @faustbrian)

## 2.5.1 - 2020-01-25

### Changed

-   Use in-memory password for encryption if no password was provided (a0ab5fa7, @faustbrian)

## 2.5.0 - 2020-01-25

### Added

-   Export plugin logo from metadata (ebe77d4d, @luciorubeens)

### Changed

-   **[BREAKING]** Require explicit profile encryption (0911acfd, @faustbrian)

## 2.4.5 - 2020-01-22

### Fixed

-   Remove default avatar value in `ProfileFactory#fromName` (f7c725e4, @dated)

## 2.4.4 - 2020-01-22

### Changed

-   Throw exception if non-password profile tries to verify password (f7bd0835, @faustbrian)

## 2.4.3 - 2020-01-22

### Changed

-   Rename `wasCreated` to `wasRecentlyCreated` (ae7f3d46, @faustbrian)

### Fixed

-   Check for `pre` and `post` restore password usage (5d3cfd94, @faustbrian)

## 2.4.1 - 2020-01-22

### Added

-   Implement `Profile#wasCreated` (187127a8, @faustbrian)

## 2.4.0 - 2020-01-21

### Added

-   Restore signed transactions into their original DTO (00cfd879, @faustbrian)
-   Expose number of delegates on network through manifest (02aa46d6, @faustbrian)

### Changed

-   Deprecate `platform-sdk-ipfs` (d6d7350e, @faustbrian)
-   Deprecate `platform-sdk-xmr` (ff9ec485, @faustbrian)

## 2.3.6 - 2020-01-11

### Changed

-   Deprecate `@arkecosystem/platform-sdk-marketsquare` (4313ab42, @faustbrian)
-   Retrieve plugins from NPM (611197e3, @faustbrian)

## 2.3.4 - 2020-01-11

### Fixed

-   Prevent null entries in `ExchangeRateService#restore` (4262264f, @goga-m)

## 2.3.3 - 2020-01-08

### Changed

-   Flush only the aggregate transaction method (70fc1b23, @luciorubeens)

## 2.3.2 - 2020-01-07

### Added

-   Add ability to reset environment instance (6b41adbd, @faustbrian)

## 2.3.1 - 2020-01-06

### Added

-   Flush `env` container (045052d5, @goga-m)

## 2.3.0 - 2020-01-04

### Changed

-   Drop AIP36 builder (d5649e67, @faustbrian)
-   Replace `yup` with `joi` (d17e8ce7, @faustbrian)
-   Store name and avatar in profile struct (08401baf, @faustbrian)

## 2.2.0 - 2020-12-18

### Changed

-   Throw if an unknown binding is retrieved from the container (e103d123, @faustbrian)
-   Throw if known bindings are tried to be overwritten without explicit consent (a55381aa, @faustbrian)
-   Remove entity transaction signing (17479a42, @faustbrian)
-   Export `Migrator` (b29900e4, @goga-m)

## 2.1.3 - 2020-12-16

### Fixed

-   Return undefined for types that don't support memo (98877660, @goga-m)

## 2.1.2 - 2020-12-16

### Added

-   Implement `AIP36#fromStruct` (06911a23, @faustbrian)

### Fixed

-   Set in-memory password when setting the password (6570e950, @goga-m)

## 2.1.0 - 2020-12-15

### Added

-   Cache historic exchange rates (cbb6f1bb, @goga-m)
-   Cache historical exchange rates by date (b657c4fa, @faustbrian)
-   Implement `TransactionData#convertedAmount|fee` (97e67ff3, @faustbrian)

## 2.0.0 - 2020-12-14

### Added

-   **[BREAKING]** Encrypt profiles that use a password (e360e2f1, @faustbrian)
-   Implement `ClientService#entityHistory` (d855f67a, @faustbrian)
-   **[ADA]** Implement key derivation (2a36f9af, @sleepdefic1t)
-   Implement `@arkecosystem/platform-sdk-marketsquare` package (7e73dc8b, @faustbrian)
-   Implement `EntityRegistrationData#ipfsContent|marketSquareLink` (d6bba663, @faustbrian)
-   Implement `KnownWalletService` (f1e3b1fd, @goga-m)
-   Implement `ProfileRepository#findByName` (f543ec5c, @dated)
-   Implement AIP36 Builder & Validator (34507e80, @faustbrian)
-   Implement `WIF#fromPrivateKey` (4b11e735, @faustbrian)
-   Implement `WalletFactory#fromMnemonicWithEncryption` (baf2e796, @faustbrian)

### Changed

-   **[BREAKING]** Use explicit-restoring for profiles instead of auto-restoring (e5e4b90e, @faustbrian)
-   Extract profile creation into `ProfileFactory` (da29a8ce, @faustbrian)
-   Extract wallet creation into `WalletFactory` (d9190e51, @faustbrian)
-   Implement `ConfigKey` enum instead of using string literals (48e277ca, @faustbrian)
-   Make `Response#json` return type variable (cf1383c6, @faustbrian)
-   Move `TransactionData#memo` into `TransferData#memo` (1bbae419, @faustbrian)
-   **[ATOM]** Build pagination cursors (aefdecf1, @faustbrian)
-   Support memo for multi payments (read & write) (931900d7, @faustbrian)
-   Use `node-cache` for cache service (4cca6042, @faustbrian)
-   **[BREAKING]** Pass storage to migrations to allow for raw data modifications (aeb3c510, @faustbrian)
-   **[BREAKING]** Apply migrations per-profile instead of per-environment (3b0f5023, @faustbrian)

### Fixed

-   Respect contract for client input (4de276cd, @faustbrian)
