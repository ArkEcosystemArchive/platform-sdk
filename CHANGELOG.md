# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 8.6.0 - 2021-06-03

### Changed

- **[PROFILES]** **[BREAKING]** Replace `fromMnemonicWithEncryption` with a `password` argument for `fromMnemonicWithBIP39` (35330311, @faustbrian)

## 8.5.0 - 2021-06-03

### Changed

- **[SDK]** Introduce `AbstractClientService` (f689f10b, @faustbrian)
- **[SDK]** Introduce `AbstractLedgerService` (0e4c8fea, @faustbrian)
- **[SDK]** Introduce `AbstractFeeService` (5b48e1e2, @faustbrian)
- **[SDK]** Introduce `AbstractMultiSignatureService` (8ba482e9, @faustbrian)
- **[SDK]** Introduce `AbstractMessageService` (1a79cb70, @faustbrian)
- **[SDK]** Move `AbstractSignatoryService` from `Signatories` to `Services` namespace (c991554b, @faustbrian)
- **[SDK]** Introduce `AbstractKnownWalletService` (83e99efb, @faustbrian)
- **[SDK]** Introduce `AbstractDataTransferObjectService` (4109c3a7, @faustbrian)
- **[SDK]** Update manifests (03443522, @faustbrian)
- **[SDK]** Organise services and contracts more closely together (183f38ea, @faustbrian)
- **[SDK]** Update to TypeScript 4.3.2 (129c5959, @faustbrian)
- **[SDK]** Use method name property when throwing exception (cf108c4f, @axeldelamarre)
- **[SDK]** Make private methods also private at runtime (1587d7f5, @faustbrian)
- **[MARKETS]** **[BREAKING]** Merge all market drivers (b551568f, @faustbrian)
- **[PROFILES]** Replace `LedgerPath` with `DerivationPath` (a3387e1f, @faustbrian)
- **[PROFILES]** **[BREAKING]** Split `fromMnemonic` into multiple methods (1dee2a9e, @faustbrian)

### Fixed

- **[SUPPORT]** **[BREAKING]** Case insensitive censoring (b9f2e9ca, @axeldelamarre)

## 8.4.0 - 2021-06-02

### Added

- **[NEWS]** Implement indexer and server for news (02221187, @faustbrian)

### Changed

- **[CLI]** Integrate `examples` into the CLI (e318ba5d, @faustbrian)
- **[SDK]** **[BREAKING]** Change `amount`, `fee` and `feeLimit` to type of `number` (2a479cb9, @faustbrian)

### Fixed

- **[ADA]** Add transaction to manifest and fix braces (bde01400, @marianogoldman)
- **[ADA]** Fix manifest for fee all (ee99ddbb, @marianogoldman)

## 8.3.4 - 2021-06-01

### Changed

- **[ARK]** Temporarily revert back to config bindings (17d3c312, @faustbrian)

## 8.3.3 - 2021-06-01

### Changed

- **[ARK]** Directly bind crypto and status values (823b2ac4, @faustbrian)

## 8.3.2 - 2021-06-01

### Fixed

- **[BTC]** Only mark BIP84 as default (87e54364, @faustbrian)

## 8.3.1 - 2021-06-01

### Fixed

- **[ARK]** Store musig timestamp (360a72f6, @faustbrian)

## 8.3.0 - 2021-06-01

### Added

- **[SDK]** Store decimals in coin manifests (f37ae32a, @axeldelamarre)

### Changed

- **[PROFILES]** Store coin service instances in container (60f6bbea, @faustbrian)
- **[PROFILES]** Make coin and config private and read-only (23e74bb7, @faustbrian)
- **[PROFILES]** Store required wallet information as data (16783661, @faustbrian)
- **[PROFILES]** Normalize input amounts (ba799dcd, @axeldelamarre)
- **[PROFILES]** Persist profile data only if marked as dirty (e3eeb2bf, @goga-m)

### Fixed

- **[PROFILES]** Set explorer link (56909cf0, @marianogoldman)
- **[PROFILES]** Explorer links (d308e53f, @marianogoldman)

## 8.2.11 - 2021-05-31

### Fixed

- **[PROFILES]** Accept partial address data (15073cd2, @faustbrian)

## 8.2.10 - 2021-05-31

### Changed

- **[PROFILES]** Store derivation type for wallets (e0a12132, @faustbrian)

## 8.2.9 - 2021-05-31

### Added

- **[CRYPTO]** Implement `BIP44#stringify` (a2e186d4, @faustbrian)

### Changed

- **[SDK]** Respect BIP44/49/84 settings for `AddressService#fromMnemonic` (85851c32, @faustbrian)
- **[BTC]** Use `bitcoinjs-lib` where possible (4589e6d5, @faustbrian)
- **[SDK]** Return BIP44/49/84 derivation paths (f34755fd, @faustbrian)
- **[ARK]** Return more meaningful broadcasting errors (37728c80, @faustbrian)
- **[XLM]** Remove `stellar-hd-wallet` dependency (7506eab0, @faustbrian)

### Fixed

- **[BTC]** Use `p2sh` for BIP49 (894bf86a, @faustbrian)

## 8.2.2 - 2021-05-28

### Fixed

- **[BTC-INDEXER]** Specify binary client targets (de277694, @marianogoldman)

## 8.2.1 - 2021-05-28

### Fixed

- **[BTC-INDEXER]** Use the schema file relative to running code (9c2da2e4, @marianogoldman)

## 8.2.0 - 2021-05-28

### Added

- **[SDK]** Implement `WalletDiscoveryService` (b6066c1f, @faustbrian)

### Changed

- **[SDK]** Crackdown on illegal `any`s (13dd3a58, @axeldelamarre)
- **[SDK]** Dryer `randomHostFromConfig` (ea984742, @axeldelamarre)

### Fixed

- **[BTC-INDEXER]** Prisma client is not a dev dependency (275fbc7c, @marianogoldman)

## 8.1.39 - 2021-05-28

### Fixed

- **[NANO]** Use configured client instead of got (6ee7a166, @faustbrian)

## 8.1.38 - 2021-05-28

### Added

- **[NANO]** Nano transactions & broadcasts (66c7a368, @axeldelamarre)

### Changed

- **[BTC-INDEXER]** Better handling of parallel fetching and sequential processing (1b6a2709, @marianogoldman)
- **[BTC-INDEXER]** Use `prisma` as database layer (891b1d07, @marianogoldman)
- **[SDK]** Introduce abstract identity services (779ee8fa, @faustbrian)
- **[SDK]** Introduce abstract transaction service (d8a3be55, @faustbrian)
- **[SDK]** Normalise signing keys (0f151caa, @faustbrian)

### Fixed

- **[ARK]** Apply signing key for double signatures (e7d239eb, @faustbrian)
- **[NANO]** Convert `NANO` to `RAW` (60a13416, @faustbrian)

## 8.1.29 - 2021-05-27

### Added

- **[SDK]** Include tokens in network manifest (c54fd892, @faustbrian)
- **[SDK]** Add `timestamp` method to `SignedTransactionData` (da89a0c2, @axeldelamarre)
- **[SUPPORT]** Add `BigNumber#sum` method (fc11ab72, @axeldelamarre)

### Changed

- **[SDK]** Normalise signing and confirmation keys (02975ba2, @faustbrian)
- **[BTC-INDEXER]** More meaningful variable names (34307470, @marianogoldman)
- **[SDK]** Introduce `AbstractIdentityService` (cdfa3258, @faustbrian)

## 8.1.23 - 2021-05-26

### Changed

- **[PROFILES]** Return DTO instances from identity services (0eae2422, @faustbrian)
- **[PROFILES]** Store derivation path if available (10bf552a, @faustbrian)

## 8.1.9 - 2021-05-24

### Changed

- **[PROFILES]** Remove `IContactAddress#name` (928297f2, @dated)
- **[SDK]** Further DRY the `LinkService` (d136f27f, @faustbrian)
- **[PROFILES]** Mark mnemonic wallets with specific import type (363fe3dc, @faustbrian)

### Fixed

- **[PROFILES]** Expose import methods for network (00467917, @faustbrian)

## 8.1.5 - 2021-05-24

### Changed

- **[SDK]** Streamline `LinkService` implementation (c76f76c5, @faustbrian)

### Fixed

- **[PROFILES]** Update wallet wif jsdoc (b40a6431, @alesmit)
- **[SDK]** Match coin transaction enums with `TransactionMethod` type (789c73a8, @goga-m)
- **[ARK]** Use ARK as coin name for devnet (e674b7be, @faustbrian)

## 8.1.1 - 2021-05-24

### Fixed

- **[EGLD]** Pick any of the given addresses for wallet details (7f7a97da, @faustbrian)

## 8.1.0 - 2021-05-24

### Changed

- **[PROFILES]** Implement `IProfile#hasAcceptedManualInstallationDisclaimer` (469bb506, @dated)
- **[SDK]** Streamline manifest structure (a1ae0eaf, @faustbrian)
- **[SDK]** Remove `PeerService` (e0233d4f, @faustbrian)

### Fixed

- **[XLM]** Proper way to fetch payments (c67d71c4, @marianogoldman)
- **[XLM]** Respect BIP44 account index option (32f63428, @faustbrian)

## 8.0.2 - 2021-05-20

### Changed

- **[PROFILES]** Expose `SignatoryService` (f78d64c2, @faustbrian)
- **[BREAKING]** **[PROFILES]** Use `Signatory` for `MessageService` (222d0f6e, @faustbrian)

## 8.0.0 - 2021-05-20

### Added

- **[NANO]** Derive address from public key (5678e62b, @axeldelamarre)
- **[EGLD]** Implement `MessageService` (504c39ed, @axeldelamarre)

### Changed

- **[SDK]** Always use manifest peers (e77af281, @faustbrian)
- **[PROFILES]** Make validator sync by moving out migration (7e91d957, @faustbrian)
- **[PROFILES]** Make theme available unencrypted (86b5c74e, @dated)
- **[BREAKING]** **[PROFILES]** Mark profiles as dirty instead of saving them (a6371bff, @faustbrian)
- **[BREAKING]** **[SDK]** Replace transaction signer values with `Signatory` entity (816a5f99, @faustbrian)
- **[XRP]** Use JSON-RPC instead of WebSocket (5f71a294, @faustbrian)
- **[XRP]** Delete websocket fixtures (4043c4cb, @faustbrian)
- **[SDK]** Introduce `AbstractSignatoryService` (02be717a, @faustbrian)

### Fixed

- **[XLM]** IsMultiSignatureRegistration returns false (e4a99c9b, @marianogoldman)
- **[XLM]** Explorer links without trailing slash (22cfff5e, @marianogoldman)
- **[XLM]** Broadcast transaction handling (27ea9925, @marianogoldman)
