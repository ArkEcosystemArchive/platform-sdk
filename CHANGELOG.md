# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 9.3.0 - 2021-06-14

### Changed

- **[SDK]** Rename `isMultiSignature` to `isMultiSignatureRegistration` (2dc9eeed, @faustbrian)

## 9.2.11 - 2021-06-11

### Fixed

- **[JSON-RPC]** Return numbers in human-readable format (0ab54fd5, @faustbrian)

## 9.2.10 - 2021-06-11

### Fixed

- **[JSON-RPC]** Remove coin and network from cached instance (253f6a86, @faustbrian)
- **[JSON-RPC]** Turn transactions to JSON for response (a4aab367, @faustbrian)

## 9.2.8 - 2021-06-11

### Changed

- **[BTC-INDEXER]** Faster processing (50bde2dd, @marianogoldman)

## 9.2.7 - 2021-06-11

### Changed

- **[PROFILES]** Enable transaction history setting on profile creation (291d88d0, @goga-m)

## 9.2.6 - 2021-06-11

### Fixed

- **[ARK]** Add delegate resignation DTO (ea2949fd, @faustbrian)

## 9.2.5 - 2021-06-11

### Fixed

- **[ARK]** Add delegate resignation DTO (ea2949fd, @faustbrian)

## 9.2.4 - 2021-06-11

### Changed

- **[BTC-INDEXER]** Tweak configuration (309ad51a, @faustbrian)

## 9.2.3 - 2021-06-11

### Changed

- **[PROFILES]** Rename `SignedTransactionData#isMultiSignature` to `SignedTransactionData#usesMultiSignature` (c3d77494, @faustbrian)
- **[PROFILES]** Enforce strict structure for validation (fd431a39, @faustbrian)

## 9.2.1 - 2021-06-11

### Changed

- **[SDK]** Dry transaction DTOs (efab8165, @faustbrian)

## 9.2.0 - 2021-06-10

### Changed

- **[SDK]** Provide default implementations for DTOs (628d2a12, @faustbrian)
- **[SDK]** Flatten feature flags (0a74581d, @faustbrian)
- **[SDK]** Remove link methods from feature flags because they always exist (aab0fe30, @faustbrian)

### Fixed

- **[CLI]** Use ledger service to import wallets (9a06aa18, @marianogoldman)
- **[ARK]** Limit all fees to static (5c34036d, @faustbrian)

## 9.1.1 - 2021-06-07

### Changed

- **[ARK]** Derive ledger address early to determine nonce (cd27e080, @faustbrian)

## 9.1.0 - 2021-06-07

### Added

- **[LSK]** Implement ledger signing (ab0dfe5c, @faustbrian)

### Changed

- **[BTC-INDEXER]** Store pending blocks in database (531b9618, @faustbrian)
- **[ARK]** **[BREAKING]** Handle ledger signing in `TransactionService` (4f7f2c2f, @faustbrian)
- **[SDK]** **[BREAKING]** Remove `TransactionOptions` in favour of `Signatory` (665dbfad, @faustbrian)
- **[SDK]** **[BREAKING]** Remove `SignatureSignatory` in favour of `LedgerSignatory` (8f65cf38, @faustbrian)

## 9.0.10 - 2021-06-07

### Fixed

- **[SDK]** Prevent `Coin.__construct` race condition (2bde3af4, @faustbrian)

## 9.0.9 - 2021-06-07

### Fixed

- **[ARK]** `compendia` => `bind` (92d662d3, @faustbrian)

## 9.0.8 - 2021-06-07

### Changed

- **[BTC-INDEXER]** Only ignore error if unique constraint violation (a5571ccd, @marianogoldman)
- **[BTC-INDEXER]** Use upserts for blocks, transactions and parts (afccd8f0, @marianogoldman)
- **[SDK]** Throw an exception if a duplicate binding is attempted (7f7965b7, @faustbrian)

### Fixed

- **[LSK]** Try/catch syntax (6b588fd1, @faustbrian)

## 9.0.4 - 2021-06-07

### Fixed

- **[SDK]** Only unbind if binding exists (15f872f8, @faustbrian)

## 9.0.3 - 2021-06-07

### Changed

- **[SDK]** Initiate inversify through constructor (cc28e93c, @faustbrian)
- **[SDK]** Destroy container bindings in reverse order (a541b612, @faustbrian)

### Fixed

- **[SDK]** Do not construct or destruct if already done (f962b587, @faustbrian)

## 9.0.0 - 2021-06-07

### Changed

- **[SDK]** **[BREAKING CHANGE]** Migrate coin architecture to make use of IoC/DI (8e9655cc, @faustbrian)
- **[SDK]** **[BREAKING CHANGE]** Store explorer path schemas in manifest (0ad2fbc1, @faustbrian)
- **[SDK]** **[BREAKING CHANGE]** Provide default implementations of services (4c92e04e, @faustbrian)
