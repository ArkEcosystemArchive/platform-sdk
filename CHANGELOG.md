# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 5.0.0 - 2021-04-26

### Added

- **[PROFILES]** Implement `AttributeBag#hasStrict` (b1f5bf1d, @faustbrian)
- **[BTC-INDEXER]** Store transaction fees (f0566fdb, @marianogoldman)
- **[BTC-INDEXER]** Store recipient address when indexing (c5cd33f2, @marianogoldman)
- **[PROFILES]** Introduce event emitter for internal events (5a831ffc, @faustbrian)

### Changed

- **[PROFILES]** Apply migrations before profile data validation (faf743d0, @faustbrian)
- **[PROFILES]** Use proper type for wallet object data (4d2ffdee, @faustbrian)
- **[PROFILES]** Remove import methods from `IWalletRepository` (972ec422, @faustbrian)
- **[PROFILES]** Extract ability methods into `IWalletGate` (e7d47bbd, @faustbrian)
- **[PROFILES]** Expose internal wallet data through getters and setters (85d416f2, @faustbrian)
- **[PROFILES]** Remove profile proxy methods for peers (34b90376, @faustbrian)
- **[PROFILES]** Extract mutation methods into `IWalletMutator` (a01af551, @faustbrian)
- **[PROFILES]** Extract synchronisation methods into `IWalletSynchroniser` (c94d909e, @faustbrian)
- **[PROFILES]** Replace raw data methods for profile with `AttributeBag` (77ae3509, @faustbrian)
- **[PROFILES]** Extract `import/export` and `encrypt/decrypt` into services (b9b17616, @faustbrian)
- **[PROFILES]** Extract dumping/serialising of profiles into services (9165963c, @faustbrian)
- **[PROFILES]** Split wallet into smaller services (82be24c9, @faustbrian)
- **[PROFILES]** Add missing interfaces (c7a6c1c1, @faustbrian)
- **[PROFILES]** Move property methods before functional methods (70471181, @faustbrian)
- **[PROFILES]** Clean up some inconsistencies (b35eab90, @faustbrian)
- **[ARK]** Ability to set a start path for ledger scan (f2a04583, @luciorubeens)
- **[SDK]** Add coin name to manifests (38faf34c, @dated)
- **[PROFILES]** Emit fatal logging only in production (aea78020, @faustbrian)

### Fixed

- **[BTC-INDEXER]** Use `height` instead of `number` (5bf43f38, @faustbrian)
- **[PROFILES]** Set delegate status to false when resigned (9addbb3f, @goga-m)
- **[BTC-SERVER]** Accommodate endpoint to new db structure (ffc43652, @marianogoldman)
- **[PROFILES]** Remove duplicate profile saving events (55ac850a, @faustbrian)
