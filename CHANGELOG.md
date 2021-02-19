# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2.8.54 - 2020-02-19

### Added

-   **[ETH-INDEXER]** make database configurable (#1054) (c454186d, @faustbrian)
-   **[BTC-INDEXER]** Implement block and transaction indexing (#1057) (c6877927, @faustbrian)
-   Add `ProfileSetting.DoNotShowFeeWarning` (#1058) (dda4bda3, @dated)

## 2.8.51 - 2020-02-18

### Added

-   Listen for new block headers (be146da9, @faustbrian)

### Changed

-   Use prettier logger (5fcc9742, @faustbrian)

## 2.8.49 - 2020-02-18

### Fixed

-   Pass arguments as string to pm2 (10eaca13, @faustbrian)

## 2.8.48 - 2020-02-18

### Changed

-   **[ETH-INDEXER]** set up skeleton (3cf42679, @faustbrian)
-   **[BTC-INDEXER]** set up skeleton (e2282ce4, @faustbrian)

### Added

-   Implement primary key for wallets (61f6de3f, @faustbrian)
-   Implement `Wallet#toData` (c3820a43, @faustbrian)
-   **[ETH-INDEXER]** Implement block and transaction indexing (e10dcc9c, @faustbrian)

## 2.8.43 - 2020-02-17

### Added

-   Apply managed whitelist to plugins (e515ba11, @faustbrian)

### Changed

-   Remove blacklist plugins implementation (8fb867db, @goga-m)

## 2.8.41 - 2020-02-17

### Added

-   **[ADA]** Aggregate the wallet balance through `cardano-graphql` (219abbcf, @marianogoldman)

### Fixed

-   Expose `ReadWriteWallet#transactionTypes` method from wallet model (2f4bec7f, @goga-m)

## 2.8.39 - 2020-02-16

### Added

-   Expose what transaction types a network supports (#1030) (26f1279e, @faustbrian)

## 2.8.38 - 2020-02-16

### Changed

-   **[AVAX]** Drop `avalanchejs` for message signing (a4b86fa5, @faustbrian)

### Added

-   **[AVAX]** Draft implement `TransactionService#vote` (d15e7428, @faustbrian)
-   **[ADA]** Migrate from `cardano-rest` to `cardano-graphql` (483fd6bd, @marianogoldman)
-   **[ADA]** Implement `ClientService#broadcast` (c4daff65, @faustbrian)
-   **[ADA]** Implement `TransactionService#estimateExpiration` (cd2135ec, @faustbrian)
-   Implement `BIP39#toEntropy` (e4eef1f9, @faustbrian)
-   Implement `HttpClient#asOctet` (e908eba7, @faustbrian)
-   Implement `MissingArgument` exception (082b4993, @faustbrian)
-   **[ADA]** Draft implement `TransactionService#transfer` (25d828b1, @faustbrian)
-   **[AVAX]** Implement `ClientService#delegates` (dfff356e, @faustbrian)
-   Implement `WalletFactory#from(Public|Private)Key` (a909f5f6, @faustbrian)

## 2.8.27 - 2020-02-12

### Changed

-   Implement partial wallet restoration (0716315b, @faustbrian)

## 2.8.26 - 2020-02-12

### Added

-   Implement custom peer feature flag (9ab9134d, @faustbrian)
-   Implement `TransactionService#estimateExpiration` (67bce003, @faustbrian)

## 2.8.24 - 2020-02-11

### Fixed

-   Only use page, limit, orderBy as searchParams in v2 requests (c87ebd4f, @dated)

### Changed

-   Fix syncFees error message (7421b381, @dated)
-   Support additional input for `ClientService#transaction` (5cb3ded4, @faustbrian)

### Added

-   Implement `TransactionData#inputs/outputs` (d63d3489, @faustbrian)
-   Implement `UnspentTransactionData` (2daf1884, @faustbrian)
-   **[ADA]** Implement `ClientService#transactions` (235fd064, @marianogoldman)
-   **[ARK]** Sign transfer with custom expiration (58218267, @luciorubeens)
-   **[ADA]** Implement `ClientService#transaction` (86b79179, @marianogoldman)

## 2.8.16 - 2020-02-10

### Added

-   Implement `Config#getLoose` (65bd6876, @faustbrian)

### Changed

-   Add `dynamicFees` property to network configs (f25db102, @dated)
-   Support default value for `Config#get` (3cbb2d3a, @faustbrian)
-   Add UTXO feature flags (05af7399, @faustbrian)

## 2.8.12 - 2020-02-09

### Added

-   Use optional addresses param in transaction aggregate (3f5fcb51, @goga-m)

## 2.8.11 - 2020-02-09

### Added

-   Implement dynamic fee feature flag (82dbe987, @faustbrian)
-   Implement UTXO feature flag (632e0661, @faustbrian)
-   **[AVAX]** Implement `ClientService#transactions` (0555b2ba, @faustbrian)
-   **[AVAX]** Implement `ClientService#broadcast` (f6db06a1, @faustbrian)

### Changed

-   **[ARK]** Return strings in fee transform method (83b2d9c5, @dated)
-   Make unsupported feature flags optional (2f8df212, @faustbrian)
-   Remove extraneous properties from feature flags in manifests (048eceb0, @faustbrian)
-   Treat manifests as code to make use of typing (058436ec, @faustbrian)

### Fixed

-   **[AVAX]** Access correct transaction data properties (5bd318c1, @faustbrian)
-   **[AVAX]** Normalise wallet balance to `1e8` notation (34769e8f, @faustbrian)

## 2.8.1 - 2020-02-08

### Fixed

-   **[AVAX]** Fixed structure export (@faustbrian)

## 2.8.0 - 2020-02-08

### Added

-   **[DOT]** Initial implementation (1785a7f5, @faustbrian)
-   **[DOT]** Retrieve wallet balance and nonce (f62f943f, @faustbrian)
-   **[AVAX]** Initial implementation (51b531cf, @faustbrian)
-   **[AVAX]** Implement `TransactionService#transfer` (f5eb510f, @faustbrian)
-   **[AVAX]** Implement `ClientService#wallet` (78eea95a, @faustbrian)
-   **[AVAX]** Implement `ClientService#transaction` (f3c72ca4, @faustbrian)

## 2.7.13 - 2020-02-05

### Added

-   **[ADA]** Retrieve wallet information from network (8063e3ca, @marianogoldman)
-   **[DOT]** Implement ledger transaction signing (9b9cba49, @sleepdefic1t)
-   **[DOT]** Implement transaction broadcasting (1a92b410, @faustbrian)
-   Implement `SignedTransactionData#toBroadcast` (534d630f, @faustbrian)

### Changed

-   **[DOT]** Replace `WsProvider` with `HttpProvider` (99ee9b96, @faustbrian)
-   Drop AIP36 entity related code (95995fea, @faustbrian)
-   Prefix lifecycle methods with `__` (6e16114d, @faustbrian)

## 2.7.6 - 2020-02-02

### Added

-   Implement `LedgerService` (23249229, @sleepdefic1t)

### Changed

-   Define `LedgerIndex` as `WalletData` (8183cce7, @dated)

## 2.7.4 - 2020-02-01

### Added

-   Implement feature flag to indicate memo support (a4951515, @faustbrian)

### Changed

-   Verify message without mnemonic (892bc34f, @faustbrian)

## 2.7.2 - 2020-02-01

### Fixed

-   Add `unvote` before `votes` (3671c825, @faustbrian)

## 2.7.1 - 2020-02-01

### Changed

-   Update dependencies (c451edff, @faustbrian)

## 2.7.0 - 2020-02-01

### Fixed

-   **[DOT]** Set `ss58Format` before generating keypairs (9637b51b, @faustbrian)

### Added

-   **[Profiles]** Implement `RegistryPlugin#toObject` (6b4b3f03, @faustbrian)
-   **[DOT]** Initial implementation (1d39e505, @faustbrian)
-   **[DOT]** Implement `MessageService#verify` (0269e2b2, @faustbrian)
-   **[DOT]** Sign a transfer transaction (18a035c3, @faustbrian)

## 2.6.1 - 2020-01-29

### Changed

-   Support combinatory voting (dfadc97a, @faustbrian)

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
