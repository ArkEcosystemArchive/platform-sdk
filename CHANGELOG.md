# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 6.0.5 - 2021-04-30

### Added

- **[ARK-MUSIG]** Initial implementation (cf56c978, @faustbrian)

### Changed

- **[PROFILES]** Store import method on wallet (f590fe84, @faustbrian)
- **[SDK]** Only require account index for BIP44 arguments (a3732e86, @faustbrian)
- **[PROFILES]** Implement extended public key import from mnemonics (0284fca7, @faustbrian)

## 6.0.1 - 2021-04-29

### Changed

- **[NEO]** Update host lists (a0baa643, @faustbrian)

## 6.0.0 - 2021-04-28

### Added

- **[PROFILES]** **[BREAKING]** Save environment on change (a38ad46f, @faustbrian)

### Changed

- **[NEO]** **[BREAKING]** Only validate address length (41298729, @faustbrian)
- **[SDK]** **[BREAKING]** Treat magistrate as a generic transaction (918ea403, @faustbrian)
- **[SDK]** **[BREAKING]** Remove magistrate remnants (1efc4197, @faustbrian)
