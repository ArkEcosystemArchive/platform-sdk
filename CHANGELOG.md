# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
