# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 7.0.10 - 2021-05-13

### Added

- **[TRX]** Return default values for all fees (ba4ada1b, @faustbrian)
- **[TRX]** Implement wallet derivation (3de1dbcf, @faustbrian)
- **[ZIL-INDEXER]** Initial implementation (f0e1be43, @axeldelamarre)

### Fixed

- **[TRX]** Derive private key for transaction signing (5230ca75, @faustbrian)
- **[TRX]** Take frozen and TRC20 balances into account (3e31b3b7, @faustbrian)
- **[TRX]** Resolve signing and broadcasting failures (5b7af7d9, @faustbrian)
- **[TRX]** Map correct signed transaction data (38d83804, @faustbrian)

## 7.0.0 - 2021-05-12

### Added

- **[SDK]** Implement `PeerService#validate` (b900d198, @faustbrian)

### Changed

- **[SDK]** **[BREAKING]** Add support for multi-balance wallets (aca833b2, @faustbrian)

### Fixed

- **[TRX]** Fix transaction amount representation (4aaad8f5, @marianogoldman)
