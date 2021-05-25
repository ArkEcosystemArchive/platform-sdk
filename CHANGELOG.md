# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
