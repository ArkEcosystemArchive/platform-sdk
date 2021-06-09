# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 9.1.0 - 2021-06-07

### Added

- **[LSK]** Implement ledger signing (#1770) (ab0dfe5c, @faustbrian)

### Changed

- **[BTC-INDEXER]** Store pending blocks in database (#1768) (531b9618, @faustbrian)
- **[ARK]** **[BREAKING]** Handle ledger signing in `TransactionService` (#1777) (4f7f2c2f, @faustbrian)
- **[SDK]** **[BREAKING]** Remove `TransactionOptions` in favour of `Signatory` (#1778) (665dbfad, @faustbrian)
- **[SDK]** **[BREAKING]** Remove `SignatureSignatory` in favour of `LedgerSignatory` (#1779) (8f65cf38, @faustbrian)

## 9.0.10 - 2021-06-07

### Fixed

- **[SDK]** Prevent `Coin.__construct` race condition (#1775) (2bde3af4, @faustbrian)

## 9.0.9 - 2021-06-07

### Fixed

- **[ARK]** `compendia` => `bind` (92d662d3, @faustbrian)

## 9.0.8 - 2021-06-07

### Changed

- **[BTC-INDEXER]** Only ignore error if unique constraint violation (#1767) (a5571ccd, @marianogoldman)
- **[BTC-INDEXER]** Use upserts for blocks, transactions and parts (#1766) (afccd8f0, @marianogoldman)
- **[SDK]** Throw an exception if a duplicate binding is attempted (#1771) (7f7965b7, @faustbrian)

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
