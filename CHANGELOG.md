# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
