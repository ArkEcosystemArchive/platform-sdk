# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 0.9.385 - 2020-10-01

### Added

-   **[LSK]** Implement API pagination (e1a16729, @faustbrian)

### Changed

-   **[ARK]** Remove compendia testnet (#724) (1ef72ebb, @faustbrian)
-   **[ARK]** Re-apply ARK configurations before every crypto method call (#725) (ee26ad7f, @faustbrian)
-   **[LSK]** Don't enforce api limit and sort transactions by timestamp (#727) (09dba752, @dated)
-   **[LSK]** Handle delegate format in WalletData (#726) (7cb9a923, @dated)

### Fixed

-   **[LSK]** Use last response cursor for delegate aggregation (85850d96, @faustbrian)

## 0.9.379 - 2020-09-30

### Added

-   Implement `Wallet#findTransactionsByIds` (ba96e24d, @faustbrian)

## 0.9.378 - 2020-09-30

### Added

-   Implement `Wallet#findTransactionById` (714150c9, @faustbrian)

### Changed

-   Merge plugins and profiles packages (b15f63b7, @faustbrian)

## 0.9.376 - 2020-09-30

### Changed

-   Merge `NetworkData` into `platform-sdk` (e263e821, @faustbrian)

## 0.9.375 - 2020-09-30

### Fixed

-   Include `crypto.signingMethods` (b286ef01, @faustbrian)

## 0.9.374 - 2020-09-30

### Fixed

-   Include AIP36 in manifest (fa63f11b, @faustbrian)

## 0.9.373 - 2020-09-30

### Added

-   Implement `Wallet#can` and `Wallet#cannot` (5cbac4f6, @faustbrian)

### Changed

-   Extend `Notification` type (3d9cec8b, @goga-m)
-   Determine abilities and signing methods per network (caf21252, @faustbrian)
-   Reorganise manifests by type (e80cc1a2, @faustbrian)
-   Update types according to AIP36 changes (120154ce, @brenopolanski)

### Fixed

-   Export `FeatureFlag` enum (df5454d6, @faustbrian)

## 0.9.367 - 2020-09-25

### Added

-   Implement `TransactionData#explorerLinkForBlock` (183268db, @dated)

## 0.9.366 - 2020-09-24

### Changed

-   Add musig hosts (6b20793d, @faustbrian)

## 0.9.365 - 2020-09-24

### Changed

-   Adjust return types in notifications repo (b5e71c20, @goga-m)

## 0.9.364 - 2020-09-22

### Fixed

-   Remove name from update (088b0880, @faustbrian)

## 0.9.363 - 2020-09-22

### Changed

-   Return broadcast result (a865b1e1, @faustbrian)

## 0.9.362 - 2020-09-18

### Changed

-   Pass categories as array to signals endpoint (fd783e05, @dated)

## 0.9.361 - 2020-09-16

### Changed

-   Configure identity service through network (8cced2fe, @faustbrian)
-   Prefix networks with the token name for unique IDs (2941d474, @faustbrian)

## 0.9.359 - 2020-09-16

### Changed

-   Add compendia mainnet (8b9b490b, @faustbrian)
-   Add compendia testnet (57db6845, @faustbrian)

## 0.9.357 - 2020-09-15

### Added

-   **[ETH]** Implement `FeeService` (23fbd568, @faustbrian)

### Changed

-   **[ETH]** Use the Platform SDK Server to interact with data (722bd449, @faustbrian)
-   **[ARK]** Get AIP36 transaction fees by type (f575fe03, @faustbrian)

## 0.9.354 - 2020-09-11

### Added

-   Implement `ReadWriteWallet#entities` (8255a1f5, @dated)

## 0.9.353 - 2020-09-11

### Added

-   Implement `ReadWriteWallet#username` (eb39ae94, @dated)

## 0.9.352 - 2020-09-11

### Added

-   Implement TransactionData#convertedAmount (310b4bb9, @dated)
-   Implement `WalletData#entities` (b107ff5d, @dated)

### Fixed

-   Update fees url and fixture (8267e7e1, @dated)

## 0.9.349 - 2020-09-08

### Fixed

-   Do not set avatar during initialization (00b7e51c, @dated)
-   Update error message when address wasn't derived (480aa9f1, @faustbrian)

## 0.9.347 - 2020-09-08

### Changed

-   Set defaults when creating profile (26896aec, @dated)

## 0.9.346 - 2020-09-07

### Changed

-   Restore default profile settings after flushing (3c7d5ab3, @faustbrian)
-   Fetch fees for 30 days (31e0b7a9, @faustbrian)

## 0.9.344 - 2020-09-04

### Changed

-   Adds some ui profile settings (c2a1a7b1, @dated)

## 0.9.343 - 2020-09-03

### Fixed

-   Require entity type and sub-type as numbers (e8a6e14d, @faustbrian)

## 0.9.342 - 2020-09-03

### Fixed

-   process magistrate fees (e8578a53, @faustbrian)

## 0.9.341 - 2020-09-03

### Changed

-   Make sub-type optional (b5cd90dd, @faustbrian)

## 0.9.340 - 2020-09-03

### Fixed

-   Respect sub-type in cache key (38acf97d, @faustbrian)
-   Allow type and sub-type of 0 (7225d2c4, @faustbrian)

## 0.9.338 - 2020-09-03

### Added

-   Implement `WalletRepository#update` (d40781b0, @dated)

### Changed

-   Merge entity aggregates to be type agnostic (4252bea4, @faustbrian)

## 0.9.336 - 2020-09-03

### Fixed

-   Persist pending signature transactions (fa468248, @faustbrian)

### Added

-   Implement `ExchangeRateService#syncCoinByProfile` (f9b8b311, @dated)
-   Implement IPFS upload through SDK Server (e2dc6c30, @faustbrian)

## 0.9.333 - 2020-09-02

### Fixed

-   Return early from `promiseAllSettledByKey` if there are no promises (30ab7d22, @faustbrian)

## 0.9.332 - 2020-09-02

### Changed

-   Throw exception if HTTP request fails (25feb1be, @faustbrian)

## 0.9.331 - 2020-09-02

### Added

-   Store exchange currency in wallet data (3d9f3d5f, @dated)

### Changed

-   Sync identity before votes (0132ff5a, @faustbrian)

## 0.9.329 - 2020-09-01

### Added

-   Implement `WalletService` to manage all wallet instances (801800cd, @faustbrian)

### Changed

-   Simplify `DelegateService#syncAll` (e0fda275, @faustbrian)

## 0.9.327 - 2020-09-01

### Added

-   Introduce `CoinService` to manage coin instances (2e864ec8, @faustbrian)

### Changed

-   Throw `CryptoException` if any crypro-related errors occur (b1e8a149, @faustbrian)

## 0.9.325 - 2020-08-31

### Added

-   Sync exchanges rates globally instead of per wallet (c186612f, @faustbrian)

### Changed

-   Split `CoinRepository` into `DelegateService` and `FeeService` (17752b5a, @faustbrian)

### Fixed

-   Return result without mapping when using `findDelegateByAttribute` (0eba2b88, @faustbrian)

## 0.9.322 - 2020-08-31

### Changed

-   Return delegates as read-only wallets (67593e91, @faustbrian)

## 0.9.321 - 2020-08-31

### Added

-   Implement methods to find cached delegates (37f11900, @faustbrian)

## 0.9.320 - 2020-08-31

### Changed

-   Support options in toDataUrl (032d6488, @dated)

## 0.9.319 - 2020-08-29

### Added

-   Implement bulk syncing of delegates and fees (1812c8eb, @faustbrian)

## 0.9.318 - 2020-08-29

### Added

-   Sync fees per coin (239adf84, @faustbrian)

## 0.9.317 - 2020-08-28

### Changed

-   **[LSK]** Disable betanet support (8f2ba458, @faustbrian)

## 0.9.316 - 2020-08-28

### Added

-   Expose detailed voting information for networks (534cda5b, @faustbrian)
-   Expose multi-signature participants as wallet instances (fe68cc30, @faustbrian)

### Changed

-   Broadcast one transaction at a time (d89b92c4, @faustbrian)
-   Expose wallet network as `NetworkData` instance (1e7f41d2, @faustbrian)

## 0.9.312 - 2020-08-27

### Changed

-   **[ARK]** Update dependencies (f1f07160, @faustbrian)

## 0.9.311 - 2020-08-27

### Changed

-   **[ARK]** Integrate `@arkecosystem/multi-signature` (963860e7, @faustbrian)

### Fixed

-   **[ARK]** Use `getStruct()` if the transaction is a multi-signature registration (80e83420, @faustbrian)
-   **[ARK]** Remove timestamp from MuSig Server (b35656d3, @faustbrian)

## 0.9.308 - 2020-08-26

### Fixed

-   Pass `SignedTransactionData` to broadcast (40d025a9, @faustbrian)

## 0.9.307 - 2020-08-26

### Fixed

-   Add pending MuSig transactions before checking state (f2bd8394, @faustbrian)
-   Delete pending transactions that are already signed (2eb3c591, @faustbrian)

## 0.9.305 - 2020-08-26

### Changed

-   Sync pending/ready multi-signatures from the remote server (3d736444, @faustbrian)

### Fixed

-   Broadcast raw transaction data (133e99f5, @faustbrian)

## 0.9.303 - 2020-08-26

### Fixed

-   Remove usage of `multisigAsset` (0919910d, @faustbrian)

## 0.9.302 - 2020-08-26

### Fixed

-   Normalise `MultiSignatureService#findById` output (b6bab551, @faustbrian)

## 0.9.301 - 2020-08-26

### Added

-   Implement `WalletData#multiSignature` (e5c9d642, @faustbrian)
-   Implement `WalletData#isResignedDelegate` (03b96e34, @faustbrian)
-   Implement Multi-Signature signing and broadcasting (760679f7, @faustbrian)
-   Implement `WalletAggregate#convertedBalance` (49fd1561, @faustbrian)
-   Implement multi-signature helpers in `TransactionService` (fa608290, @faustbrian)
-   Implement `Wallet#isResignedDelegate` and `Wallet#multiSignature` (543897e8, @faustbrian)
-   Implement Multi-Signature for `TransactionService` (b171775c, @faustbrian)

### Fixed

-   Ark explorer links (8881f50f, @dated)

## 0.9.293 - 2020-08-24

### Fixed

-   **[ARK]** Set transaction ID (690f89a0, @faustbrian)

## 0.9.292 - 2020-08-24

### Changed

-   Break up environment booting process (7e58b7fd, @faustbrian)

## 0.9.291 - 2020-08-24

### Changed

-   Export DTO classes (630430ad, @faustbrian)

## 0.9.290 - 2020-08-24

### Added

-   Implement `ExtendedTransactionDataCollection` (196a9b7d, @faustbrian)

## 0.9.289 - 2020-08-24

### Added

-   Implement `Wallet#explorerLink` (0dccd07f, @faustbrian)
-   Implement `ReadOnlyWallet#explorerLink` (bb52c1a3, @faustbrian)

## 0.9.287 - 2020-08-24

### Changed

-   Throw error if `syncVotes` fails (4cc16cef, @faustbrian)

## 0.9.286 - 2020-08-23

### Changed

-   Export `DelegateMapper` and `CoinRepository` (8e0822ab, @faustbrian)

## 0.9.285 - 2020-08-23

### Added

-   Implement `Wallet#canVote` (0ee97aa5, @faustbrian)
-   Implement `TransactionData#total/convertedTotal` (628a664e, @faustbrian)

### Changed

-   Decouple `DelegateMapper` from `Wallet` (11620f26, @faustbrian)
-   Remove extraneous `Wallet` methods (ae11ed1d, @faustbrian)

### Fixed

-   Remove double slash from explorer links (b211d3f6, @faustbrian)

## 0.9.280 - 2020-08-23

### Fixed

-   Map TransactionData according to type (46386972, @faustbrian)

## 0.9.279 - 2020-08-23

### Added

-   Implement `CoinRepository` for direct coin interactions (7e5bac88, @faustbrian)
-   Expose more voting information (3def136b, @faustbrian)

## 0.9.277 - 2020-08-23

### Changed

-   Implement Profile and Wallet contracts (09aa999f, @faustbrian)

### Added

-   Add method to return all pending transactions (30cbaae3, @faustbrian)
-   Implement TransactionData wrapper DTO (44529290, @faustbrian)
-   Include rank in `ReadOnlyWallet` (acb5b030, @faustbrian)
-   Implement vote syncing for wallets (b26f3d61, @faustbrian)

## 0.9.272 - 2020-08-21

### Added

-   Implement entity aggregates (b70be328, @faustbrian)

## 0.9.271 - 2020-08-21

### Changed

-   Rename `AutomaticLogoffPeriod` to `AutomaticSignOutPeriod` (7d6fbeed, @dated)
-   Update plugin interface to include plugin data (138a5aa5, @faustbrian)

## 0.9.269 - 2020-08-20

### Fixed

-   Fix profile registration aggregate query params (e1f34bd3, @goga-m)

## 0.9.268 - 2020-08-20

### Added

-   Implement `RegistrationAggregate` for profile (7a273851, @faustbrian)

## 0.9.267 - 2020-08-19

### Changed

-   Add missing exports (5f05f0be, @faustbrian)

## 0.9.266 - 2020-08-19

### Changed

-   Expose more information through `SignedTransactionData` (00b48ba0, @faustbrian)

## 0.9.265 - 2020-08-18

### Added

-   Retrieve signed or broacasted transactions from storage (ba6635e6, @faustbrian)

## 0.9.264 - 2020-08-18

### Fixed

-   Return `VoteData` for unvote type (9ff39c68, @faustbrian)

## 0.9.263 - 2020-08-18

### Fixed

-   Identify AIP36 transaction types (ffb09ec2, @faustbrian)

## 0.9.262 - 2020-08-18

### Added

-   Implement AIP36 transaction identifiers (ccf9db35, @faustbrian)

## 0.9.261 - 2020-08-18

### Added

-   Implement `TransactionData#blockId` (023b8c61, @faustbrian)

## 0.9.260 - 2020-08-18

### Added

-   Implement query and category for blockfolio signals (f63c0482, @faustbrian)

## 0.9.259 - 2020-08-14

### Added

-   Implement `Environment#registerCoin` (a09c7162, @faustbrian)
-   Implement `DataRepository#first` and `DataRepository#last` (323b92cb, @faustbrian)

## 0.9.257 - 2020-08-10

### Added

-   Allow creation of coin instances (06a9c109, @faustbrian)

### Fixed

-   Throw an exception if the ID of a newly signed transaction is a duplicate (0f587089, @faustbrian)

## 0.9.255 - 2020-08-10

### Changed

-   Use helper methods for wallet balance and sequence (50e7221f, @faustbrian)

## 0.9.254 - 2020-08-10

### Fixed

-   Always cast the balance and sequence to BigNumber (59edcc2d, @faustbrian)

## 0.9.253 - 2020-08-10

### Fixed

-   Only persist and restore known wallet data (198083d1, @faustbrian)

## 0.9.252 - 2020-08-10

### Fixed

-   **[ADA]** Add index.ts where needed (d5509434, @faustbrian)

## 0.9.251 - 2020-08-10

### Added

-   **[NEO]** Implement `ClientService#wallet` (5fedc5d5, @faustbrian)
-   Verify that expected and actual sender of transactions are a match (837b68c4, @faustbrian)

## 0.9.249 - 2020-08-10

### Fixed

-   **[ARK]** Turn signed transaction into plain object before broadcasting (d1db6c38, @faustbrian)

## 0.9.248 - 2020-08-10

### Added

-   Persist signed and broadcasted transactions (72591998, @faustbrian)

### Changed

-   **[ARK]** Serialise and deserialise transaction after signing (d0c61d11, @faustbrian)

## 0.9.246 - 2020-08-07

### Fixed

-   Update API url (e8fc48c3, @faustbrian)

## 0.9.245 - 2020-08-07

### Added

-   Implement `RegistrationAggregate#plugins` (f0ee2971, @faustbrian)

### Changed

-   Determine transaction type based on `is*` methods (be4101df, @faustbrian)

## 0.9.243 - 2020-08-07

### Fixed

-   Delete "entityAction" after using it (35309700, @faustbrian)

## 0.9.242 - 2020-08-07

### Added

-   Support listing all entity registrations (9335c7c1, @faustbrian)

## 0.9.241 - 2020-08-07

### Added

-   Implement `RegistrationAggregate` (880cedc5, @faustbrian)

## 0.9.240 - 2020-08-07

### Added

-   Implement `SignedTransactionData` (abc51e67, @faustbrian)

## 0.9.239 - 2020-08-06

### Changed

-   Update dependencies (2f2e8acb, @faustbrian)

## 0.9.238 - 2020-08-06

### Added

-   Implement AIP36 (a5fa5503, @faustbrian)

### Changed

-   Return empty array from `TransactionData#recipients` (5245c5dc, @faustbrian)
-   Default decimals to 8 for `toHuman` (8e1939ec, @faustbrian)

## 0.9.235 - 2020-08-06

### Fixed

-   **[LSK]** Handle main and beta transaction types (b20f4445, @faustbrian)

## 0.9.234 - 2020-08-06

### Added

-   **[LSK]** Implement `TransactionData#recipients` (084dfc73, @faustbrian)

### Fixed

-   **[ARK]** Normalise `TransactionData#recipients` return value (ffb9b520, @faustbrian)
-   **[LSK]** Use `senderIdOrRecipientId` in place of `address` (ca267638, @faustbrian)

### Changed

-   Return timestamp as `DateTime` instance (bfef4a9b, @faustbrian)

## 0.9.230 - 2020-08-06

### Changed

-   Only return the ID of a signed transaction (c95fe7db, @faustbrian)

## 0.9.229 - 2020-08-06

### Fixed

-   Remove signed transactions once they have been confirmed (e8197833, @faustbrian)
-   Temporarily use `.getStruct()` to avoid serialiser corruption (64867d21, @faustbrian)

## 0.9.227 - 2020-08-05

### Fixed

-   Call `toFixed` with argument if argument is 0 (5538dc65, @dated)
-   Access transaction service to sign transactions (e866ba6f, @faustbrian)

## 0.9.225 - 2020-08-05

### Added

-   Implement `BigNumber#toHuman` (6cfdd26e, @faustbrian)

## 0.9.224 - 2020-08-05

### Fixed

-   Send `limit` instead of `perPage` parameter (4d6aa2b9, @faustbrian)

## 0.9.223 - 2020-08-05

### Added

-   Implement public key to delegate mapper (477937d1, @faustbrian)

## 0.9.222 - 2020-08-05

### Fixed

-   Call `isConfirmed` to ensure confirmation (7dc07ecd, @faustbrian)

## 0.9.221 - 2020-08-05

### Changed

-   Mark transactions as signed before broadcasting (37649c65, @faustbrian)

## 0.9.220 - 2020-08-05

### Added

-   Expose data validator (7a500d0f, @faustbrian)
-   Implement `TransactionData#isConfirmed` (a22de965, @faustbrian)
-   Implement wallet transaction service (bef86086, @faustbrian)

## 0.9.217 - 2020-08-04

### Fixed

-   Ignore the name of contact that is being updated (ddad5071, @faustbrian)

## 0.9.216 - 2020-08-04

### Added

-   Implement `DateTime#fromUnix` (a58aead2, @faustbrian)

## 0.9.215 - 2020-08-04

### Fixed

-   Bad relative import (69732558, @faustbrian)
-   Return unix timestamp for transactions (22565231, @faustbrian)

## 0.9.213 - 2020-08-04

### Changed

-   Pass query to transaction aggregate methods (1ddd6351, @faustbrian)

### Added

-   Implement `ProfileRepository#has` (e277b4c9, @faustbrian)
-   Implement `WalletRepository#has` (53d94b68, @faustbrian)

## 0.9.210 - 2020-08-04

### Fixed

-   Default to empty object if promises haven't been settled (e9bbcede, @faustbrian)

## 0.9.209 - 2020-08-03

### Added

-   Support pagination for transaction aggregate (7c32d81f, @faustbrian)

## 0.9.208 - 2020-08-03

### Added

-   Implement collection paginator (ab973e22, @faustbrian)

## 0.9.207 - 2020-08-01

### Added

-   Implement `Contact#avatar` (6cce3b5f, @dated)

### Fixed

-   Ensure uniqueness of contact name (ac50eac5, @dated)

## 0.9.205 - 2020-07-31

### Fixed

-   Support `query` for post requests (1f684d59, @faustbrian)

## 0.9.204 - 2020-07-31

### Added

-   Implement `ProfileRepository#count` (a4c564dd, @dated)
-   implement `DTO#hasPassed` and `DTO#hasFailed` (871233dd, @dated)

### Fixed

-   Exclude out-of-sync wallets from data aggregation (5d4555dc, @faustbrian)

## 0.9.201 - 2020-07-31

### Added

-   Implement `ContactAddress#hasSyncedWithNetwork` (690b9108, @faustbrian)

### Changed

-   Streamline profile repository methods (562a78fc, @dated)

### Fixed

-   Use `addresses` parameter for address searches (52045100, @faustbrian)

## 0.9.198 - 2020-07-30

### Changed

-   Export contact address types (b7676bdb, @dated)

## 0.9.197 - 2020-07-30

### Added

-   Implement `Profile#usesPassword` (4b0e12c1, @faustbrian)
-   Implement `Profile#flush` (d80e6ccf, @faustbrian)

## 0.9.195 - 2020-07-30

### Changed

-   Throw an exception if the wallet failed to sync with the network (918b126d, @faustbrian)

## 0.9.194 - 2020-07-30

### Changed

-   Move authentication behaviours into `Authenticator` (c5e58e0d, @faustbrian)

### Fixed

-   **[ARK]** Remove vote prefix from public keys (8fa0ae41, @faustbrian)

## 0.9.192 - 2020-07-30

### Added

-   Implement profile data aggregates (9dfade3d, @faustbrian)
-   Sync delegate list and store it locally (5cf11ea9, @faustbrian)

## 0.9.190 - 2020-07-30

### Changed

-   Return type-specific transaction DTOs (6bd1227f, @faustbrian)

## 0.9.189 - 2020-07-30

### Changed

-   Allow strings, numbers, booleans and objects for settings (7df67d97, @faustbrian)

### Fixed

-   Restore wallet data and public key on sync error (058806b3, @faustbrian)

## 0.9.187 - 2020-07-30

### Added

-   Add `ProfileSetting.AutomaticLogoffPeriod` (f4500198, @faustbrian)
-   Implement `bcryptjs` as `argon2` alternative (1e74f309, @faustbrian)
-   Add `DTO#hasData` method to determine if data is not undefined (4a050ade, @faustbrian)

### Changed

-   Temporarily disable `argon2` (1e74f309, @faustbrian)

## 0.9.183 - 2020-07-29

### Changed

-   Use browser-compatible argon2 dependency (92a881c7, @faustbrian)

## 0.9.182 - 2020-07-29

### Added

-   Add support for profile passwords (2dbcc9e6, @faustbrian)

## 0.9.181 - 2020-07-29

### Changed

-   Treat the profile name as a setting (3654f77e, @faustbrian)

## 0.9.180 - 2020-07-28

### Added

-   Implement plugin blacklist (85b2bf06, @faustbrian)

## 0.9.179 - 2020-07-28

### Fixed

-   Timeout neoscan.io requests after 1 second (c3381891, @faustbrian)
-   Restore wallet data and settings on boot (3b2ee58c, @faustbrian)

## 0.9.177 - 2020-07-27

### Fixed

-   Base profile avatar on name instead of id (7c4077e0, @faustbrian)

## 0.9.176 - 2020-07-27

Republish of 0.9.175

## 0.9.175 - 2020-07-27

### Added

-   Initial implementation of platform-sdk-plugins (1e1cbc91, @faustbrian)
-   Integrate platform-sdk-plugins into platform-sdk-profiles (a61dba11, @faustbrian)

## 0.9.173 - 2020-07-24

### Changed

-   Detach contacts from wallets (e20d67c2, @faustbrian)

## 0.9.172 - 2020-07-24

### Fixed

-   Modify contact instance instead of object (56cf84be, @faustbrian)

## 0.9.171 - 2020-07-24

### Changed

-   Remove `sodium-native` dependency (7900eaf9, @faustbrian)

### Fixed

-   Use `&&` for `findByCoinWithNetwork` filter (435b1210, @faustbrian)

## 0.9.169 - 2020-07-22

### Changed

-   Update dependencies (685f68d9, @faustbrian)

## 0.9.168 - 2020-07-22

### Added

-   Initial implementation of `platform-sdk-http-ky` (44ce288a, @faustbrian)

## 0.9.167 - 2020-07-22

### Fixed

-   **[ARK]** Use a random default host for the peer service if none is configured (f3ddb68d, @faustbrian)

## 0.9.166 - 2020-07-22

### Changed

-   Update ARK hosts (8f1f7cc5, @faustbrian)

## 0.9.165 - 2020-07-22

### Added

-   Implement `Request#withCacheStore` (b1e1ea31, @faustbrian)
-   Implement `Wallet#fiat` for fiat balance (62ed1d11, @faustbrian)
-   Implement blockfolio signals (1947fd05, @faustbrian)

### Fixed

-   Export `NetworkData` (eed60eec, @luciorubeens)

## 0.9.161 - 2020-07-21

### Added

-   Import wallet by address (7bcc9ea2, @faustbrian)

### Changed

-   Implement fluent interface for HTTP clients (d510108f, @faustbrian)

## 0.9.159 - 2020-07-20

### Added

-   Implement `NetworkData` (c8c1c96c, @faustbrian)
-   Implement `MemoryStorage` (6e5712a7, @faustbrian)

## 0.9.157 - 2020-07-20

### Added

-   Flag networks as `live` or `test` (3c0e08ba, @faustbrian)
-   Implement `platform-sdk-http-axios` (0cc5a1e3, @faustbrian)
-   Implement `platform-sdk-http-got` (17e9c102, @faustbrian)
-   Implement `platform-sdk-http-node-fetch` (8756f605, @faustbrian)
-   Implement `platform-sdk-http-bent` (e6d07f50, @faustbrian)

## 0.9.152 - 2020-07-20

### Added

-   Implement `Environment#bootFromObject` (031c6008, @faustbrian)

### Changed

-   Migrate from `eosjs-ecc` to `elliptic` (6d96fe9b, @faustbrian)

### Fixed

-   Validate data in `SettingRepository#fill` (65332ff5, @faustbrian)

## 0.9.149 - 2020-07-15

### Changed

-   Expect coin to be a string (74bcd0f2, @faustbrian)

## 0.9.148 - 2020-07-11

### Added

-   Implement `Environment#availableNetworks` to expose available networks (c63de791, @faustbrian)

### Changed

-   Rename `ProfileRepository#get` to `ProfileRepository#findById` (ec8d4be2, @faustbrian)
-   Organise profile setting keys (1dadcbe7, @faustbrian)

## 0.9.145 - 2020-07-07

### Changed

-   Use configured HTTP client instead of `@arkecosystem/client` (2938d0b8, @faustbrian)

## 0.9.144 - 2020-07-06

### Added

-   Implement `is*` methods to determine transaction types (85d09e1c, @faustbrian)
-   Implement exchange rate fetching (14eca3c7, @faustbrian)
-   Implement `TransactionData#isUnvote` (43d8abea, @faustbrian)

### Changed

-   Organise models into separate files by type (56232394, @faustbrian)

## 0.9.140 - 2020-07-01

### Changed

-   Use deterministic values for avatar generation (8c0f4b84, @faustbrian)

## 0.9.139 - 2020-07-01

### Added

-   Implement `platform-sdk-ipfs` (cc8668bb, @faustbrian)
-   Flag contacts with types like wallets (3ddcc5ea, @faustbrian)
-   Implement `Cache` (1346dc0c, @faustbrian)

### Changed

-   Pass profile to `Wallet` and `Contact` (86c4e4f9, @faustbrian)
-   Cache the avatar of a contact address (1386e629, @faustbrian)
-   Use `@vechain/picasso` for avatars (5f4f02c8, @faustbrian)

## 0.9.133 - 2020-06-29

### Changed

-   Update crypto dependencies to 2.6.42 (4ee8e951, @faustbrian)

## 0.9.132 - 2020-06-27

### Added

-   Implement `WalletRepository#sortBy` (34bd7116, @faustbrian)

### Changed

-   Update `ethereumjs-wallet` to `1.0.0` (e28f8c3f, @faustbrian)

### Fixed

-   Use `day` instead of `date` for differences (e217a2d0, @faustbrian)

## 0.9.129 - 2020-06-24

### Added

-   Implement `MultiSignatureService` (986b54bf, @faustbrian)

### Changed

-   Add Multi-Signature hosts to manifest (c43c4424, @faustbrian)

## 0.9.127 - 2020-06-24

### Added

-   Implement `WalletData#isDelegate/isKnown/isMultiSignature/isSecondSignature` (4dcd4aac, @faustbrian)

### Changed

-   Merge `WalletData` and `DelegateData` (9788bc75, @faustbrian)

## 0.9.125 - 2020-06-23

### Added

-   Implement `Wallet#isDelegate` (9d8c2326, @faustbrian)

### Changed

-   Rename `WalletRepository#createRandom/createFromObject` to `WalletRepository#generate/restore` (7ac4fd69, @faustbrian)
-   Update `ethereumjs-wallet` to `0.6.4` (f2125632, @faustbrian)

## 0.9.122 - 2020-06-23

### Added

-   Implement `Markdown` parser (13cc7f57, @faustbrian)

### Changed

-   Update dependencies (4977bf01, @faustbrian)

## 0.9.120 - 2020-06-23

### Added

-   Implement wallet flags (cffebc51, @faustbrian)
-   Implement `WalletRepository#allByCoin` (de80170c, @faustbrian)
-   Add profile aggregates (355d2efd, @faustbrian)

### Changed

-   Use `Coins.Config` by reference (1c385c34, @faustbrian)
-   Tename `Wallet#create` to `Wallet#import` (64907e13, @faustbrian)

## 0.9.115 - 2020-06-21

### Added

-   Cache the balance and nonce of a wallet (0ac07619, @faustbrian)
-   Implement `Profile#balance` (7df6ff94, @faustbrian)
-   Implement `Wallet#alias` (77f192c0, @faustbrian)

### Changed

-   Expose voting support through manifest (bfcdf086, @faustbrian)

### Fixed

-   Set wallet avatar and include voting manifest into validation (342e6788, @faustbrian)

## 0.9.110 - 2020-06-19

### Changed

-   Turn contact POJO into a class (661793a4, @faustbrian)

### Fixed

-   Add missing exports (82698aa4, @faustbrian)

## 0.9.108 - 2020-06-19

### Added

-   Add avatar to contacts (b092f931, @faustbrian)

### Changed

-   Replace `qrious` with `node-qrcode` (e2bb32ca, @faustbrian)

## 0.9.106 - 2020-06-17

### Fixed

-   Set profile avatar based on ID (53ef7ca9, @faustbrian)

## 0.9.105 - 2020-06-17

### Fixed

-   Add `qrious` as production dependency (923a287d, @faustbrian)

## 0.9.104 - 2020-06-17

### Added

-   Implement `WalletRepository#createRandom` (3c9f4b3c, @faustbrian)

### Changed

-   Require ledger transport to be explicitly passed in (56b38e8e, @faustbrian)

## 0.9.102 - 2020-06-17

### Added

-   Implement `LedgerService` for `EOS` (9cbd966d, @sleepdefic1t)
-   Add `Wallet#votes` and `Wallet#voter` proxy methods (e10f20bd, @faustbrian)
-   Add `MetaPagination` contract (e8c9f64b, @faustbrian)
-   Add `TransactionService` proxy methods to `Wallet` (873939a6, @faustbrian)
-   Add `MessageService` proxy methods to `Wallet` (122deec2, @faustbrian)
-   Add `LedgerService` proxy methods to `Wallet` (31e1a213, @faustbrian)
-   Add `ClientService` proxy methods to `Wallet` (1a8784f3, @faustbrian)
-   Add `LinkService` proxy methods to `Wallet` (b59fe627, @faustbrian)
-   Implement notifications (62979b01, @faustbrian)
-   Implement `Currency#fromString` to parse currency strings (ed20a90b, @faustbrian)
-   Implement `QRCode` (c6f9bb78, @faustbrian)

### Changed

-   Update `LedgerService` (e03a8753, @sleepdefic1t)
-   Use UUID as wallet identifier (f59dbae1, @faustbrian)
-   Pass in `HttpClient` instance to markets (3adf9249, @faustbrian)
-   Make `ProfileRepository#all/create` sync (285453cc, @faustbrian)
-   Setup boilerplate for `platform-sdk-json-rpc` (baa64776, @faustbrian)
-   Rename `signer` to `signatory` (1c0d1d6b, @faustbrian)
-   Less noisy coin proxy methods (9e8e003e, @faustbrian)

## 0.9.84 - 2020-06-11

### Added

-   Initial implementation of `platform-sdk-news` (623cb841, @faustbrian)
-   Automatically persist wallets after CRUD operations (c21a698a, @faustbrian)
-   Implement methods to save and load all environment data (25fd1632, @faustbrian)
-   Implement `MessageService#sign/verify` (b5da8dc3, @faustbrian)
-   Validate ARK and NEO addresses to avoid collisions (dd5540a4, @faustbrian)
-   Validate storage data on read/write (c6866b71, @faustbrian)
-   Implement `LedgerService` for `NEO` (4578aebc, @sleepdefic1t)

### Changed

-   Rename `passphrase` to `mnemonic` (f7fc2aa8, @faustbrian)
-   Use container to manage references (510e7e72, @faustbrian)
-   Replace `@hapi/joi` with `yup` (16d5d2f7, @faustbrian)
-   Pass supported coins to `Environment` (14936722, @faustbrian)
-   Add `ProfileStruct` and `WalletStruct` contracts (33f204f3, @faustbrian)
-   Rename `secondPassphrase` to `secondMnemonic` (a74e0549, @faustbrian)

### Fixed

-   Include data and settings in wallet object (2746433a, @faustbrian)
-   Handle connection attempt to peer of a different network (dbc3921d, @faustbrian)

## 0.9.69 - 2020-06-02

### Added

-   Implement `DateTime#toDate/startOf/from/fromNow` methods (dfcbcc34, @goga-m)

### Changed

-   Add `sodium-native` as dependency (50d76623, @faustbrian)

## 0.9.67 - 2020-06-02

### Fixed

-   Use same data store for profile and contacts (f5f751d6, @faustbrian)

## 0.9.66 - 2020-06-02

### Added

-   Implement CRUD actions for contacts (108f9536, @faustbrian)

### Changed

-   Automatically persist contacts as profile data (1312f7fb, @faustbrian)

## 0.9.64 - 2020-06-02

### Added

-   Implement `Contacts` (8b79e798, @faustbrian)

## 0.9.63 - 2020-06-01

### Changed

-   Add `decimals` parameter to `BigNumber#toFixed` (7f6c2fd9, @goga-m)

## 0.9.62 - 2020-06-01

### Added

-   Generate avatar for profiles and wallets (741eb37f, @faustbrian)

## 0.9.61 - 2020-06-01

### Added

-   Implement BIP38 & AES (02669a2c, @faustbrian)
-   Export everything from `platform-sdk-profiles` to allow for proper type hinting (9f2f8203, @faustbrian)

## 0.9.59 - 2020-05-29

### Added

-   Implement `TransactionService#transfer` (fb39d338, @faustbrian)
-   Implement `LedgerService` (3f6cf1c0, @sleepdefic1t)

### Changed

-   Fix type inclusion errors (26255039, @goga-m)

### Fixed

-   Prevent locale change for `DateTime` if it is invalid (e5253074, @faustbrian)
-   Prevent invalid settings from being stored (b9c5dac2, @faustbrian)

## 0.9.54 - 2020-05-27

### Changed

-   Require the consumer to specify an HTTP client (d8dbe30a, @faustbrian)

## 0.9.53 - 2020-05-27

### Fixed

-   Import `dayjs` plugins to force type inclusion (d0de77dd, @faustbrian)

## 0.9.52 - 2020-05-27

### Added

-   Implement `BIP39#generate` (e1dff21c, @faustbrian)
-   Integrate `@arkecosystem/core-magistrate-crypto` (220fcdfa, @faustbrian)

## 0.9.50 - 2020-05-25

### Added

-   Integrate `keytar` for system keychain access (a2390870, @faustbrian)
-   Implement `BIP39#validate` (eb90324c, @faustbrian)
-   Implement `Wallet#transactions/sentTransactions/receivedTransactions` (5b45733c, @faustbrian)
-   Implement `Address#validate` (1196c9df, @faustbrian)
-   Add `ClientTransactionsInput` and `ClientWalletsInput` contracts (7f72b3ea, @faustbrian)

### Changed

-   Extract supportive functionality into `platform-sdk-support` package (e02ed115, @faustbrian)
-   Move crypto functionality into `platform-sdk-crypto` (50c63489, @faustbrian)
-   Replace `bent` with `reqwest` (bb2ad1d9, @faustbrian)

## 0.9.42 - 2020-05-22

### Added

-   Allow usage of custom storage implementations (586218bc, @faustbrian)

## 0.9.41 - 2020-05-22

### Added

-   Implement `Migrator` for data migrations (a9e38b25, @faustbrian)

### Changed

-   Change duplicate error wording (7eded51e, @faustbrian)
-   Add allowed signing methods to manifest (a6f2c7f9, @faustbrian)

## 0.9.38 - 2020-05-22

### Added

-   Add `Money` class for currency handling (2667af3e, @faustbrian)
-   Implement `Numeral` for number formatting (255d273e, @faustbrian)

### Fixed

-   Prevent duplicate wallets per profile (ccfaf1ed, @faustbrian)

## 0.9.35 - 2020-05-22

### Added

-   Get profiles by ID or name (dd15a9dd, @faustbrian)

## 0.9.34 - 2020-05-22

### Added

-   Implement `censorMemo` method (79c3987d, @faustbrian)

### Changed

-   Remove `PeerService#searchWithPlugin` and `PeerService#searchWithoutEstimates` (519595e7, @faustbrian)

## 0.9.32 - 2020-05-21

### Changed

-   Make `BigNumber` immutable (9478fc48, @faustbrian)

## 0.9.31 - 2020-05-21

### Added

-   Implement `BigNumber#comparedTo` (a07e4722, @faustbrian)

## 0.9.30 - 2020-05-21

### Added

-   Added `DateTime#getMillisecond` (6a31e0ae, @faustbrian)
-   Added `DateTime#getSecond` (6a31e0ae, @faustbrian)
-   Added `DateTime#getMinute` (6a31e0ae, @faustbrian)
-   Added `DateTime#getHour` (6a31e0ae, @faustbrian)
-   Added `DateTime#getDayOfMonth` (6a31e0ae, @faustbrian)
-   Added `DateTime#getDay` (6a31e0ae, @faustbrian)
-   Added `DateTime#getWeek` (6a31e0ae, @faustbrian)
-   Added `DateTime#getMonth` (6a31e0ae, @faustbrian)
-   Added `DateTime#getQuarter` (6a31e0ae, @faustbrian)
-   Added `DateTime#getYear` (6a31e0ae, @faustbrian)
-   Added `DateTime#setMillisecond` (6a31e0ae, @faustbrian)
-   Added `DateTime#setSecond` (6a31e0ae, @faustbrian)
-   Added `DateTime#setMinute` (6a31e0ae, @faustbrian)
-   Added `DateTime#setHour` (6a31e0ae, @faustbrian)
-   Added `DateTime#setDayOfMonth` (6a31e0ae, @faustbrian)
-   Added `DateTime#setDay` (6a31e0ae, @faustbrian)
-   Added `DateTime#setWeek` (6a31e0ae, @faustbrian)
-   Added `DateTime#setMonth` (6a31e0ae, @faustbrian)
-   Added `DateTime#setQuarter` (6a31e0ae, @faustbrian)
-   Added `DateTime#setYear` (6a31e0ae, @faustbrian)

### Fixed

-   Pass the locale when creating a new immutable instance (6b05bbdf, @faustbrian)

## 0.9.9 - 2020-05-21

### Added

-   Initial draft implementation of `platform-sdk-intl` (49502c33, @faustbrian)

## 0.9.8 - 2020-05-21

### Added

-   Added `BigNumber#isNaN` (24d50d29, @faustbrian)
-   Added `BigNumber#isPositive` (24d50d29, @faustbrian)
-   Added `BigNumber#isFinite` (24d50d29, @faustbrian)

## 0.9.5 - 2020-05-21

### Added

-   Added `BigNumber#isGreaterThan` (667c5e6a, @faustbrian)
-   Added `BigNumber#isGreaterThanOrEqualTo` (667c5e6a, @faustbrian)
-   Added `BigNumber#isLessThan` (667c5e6a, @faustbrian)
-   Added `BigNumber#isLessThanOrEqualTo` (667c5e6a, @faustbrian)

## 0.9.4 - 2020-05-21

### Added

-   Remove `dayjs` imports that cause issues (dff61fcd, @faustbrian)

## 0.9.3 - 2020-05-21

### Added

-   Implement global, profile and wallet data (7b83390e, @faustbrian)
-   Implement DTO collections (2978b12d, @faustbrian)
-   Implement URIService (8da9ba53, @faustbrian)

## 0.9.0 - 2020-05-20

### Changed

-   Setup editor support for yarn berry and typescript (01cd9e5f, @faustbrian)

### Added

-   Implement `platform-sdk-profiles` (f393a561, @luciorubeens)
-   Implement data storages for profiles (63e8897b, @faustbrian)
-   Implement `global` and `profile` settings (716ea6a6, @faustbrian)
-   Add "quarter of year" plugin to `dayjs` (ce9dc6a4, @faustbrian)

### Fixed

-   Normalise mnemonics (1eb0d3cb, @faustbrian)

## 0.8.5 - 2020-05-19

### Added

-   Implement `LedgerService` for `ATOM` (6120a2c7, @sleepdefic1t)

### Fixed

-   Wrong method name for static `MarketService` constructor (f315cec9, @faustbrian)

## 0.8.3 - 2020-05-18

### Added

-   Generate API documentation with typedoc (4cd3469b, @faustbrian)

### Fixed

-   Increase nonce if retrieved via API (4fbe49d8, @faustbrian)

## 0.8.2 - 2020-05-18

### Added

-   Look up nonce if none is provided for `ARK` (8cf5d922, @faustbrian)

## 0.8.1 - 2020-05-18

### Fixed

-   Use fallback host if no peer is provided (81a3328b, @faustbrian)

## 0.8.0 - 2020-05-18

### Added

-   Implement `MessageService` for `XLM` (cbc276b5, @faustbrian)
-   Implement `TransactionData#asset` (2e2bb288, @faustbrian)
-   Implement `LedgerService` for `XRP` (f42be51e, @sleepdefic1t)
-   Support transferring `ERC20` tokens (384eb7c6, @faustbrian)
-   Implement `LedgerService` for `TRX` (9280e618, @faustbrian)
-   Implement `LedgerService` for `XLM` (0daf5b6e, @faustbrian)
-   Implement `LedgerService` for `ETH` (0881ea3a, @faustbrian)
-   Implement `NetworkRepository` (67d190a3, @faustbrian)
-   Implement `Manifest` (acc0300d, @faustbrian)
-   Implement `LedgerService` for LSK`` (cced5708, @sleepdefic1t)
-   Implement `Guard` to protect against bad method calls (0a0a7c1a, @faustbrian)
-   Implement `Config` service for coins (103111f1, @faustbrian)
-   Implement `LedgerService#connect` and `LedgerService#disconnect` (226b7f00, @faustbrian)
-   Handle peer discovery and network identifiers (34e74c27, @faustbrian)
-   Implement `betanet` support for `LSK` (1ba0a846, @faustbrian)

### Changed

-   Group repeated `Buffer` behaviours into a class (319d24f3, @faustbrian)
-   Automatically instantiate the `LedgerTransport` (aee01496, @faustbrian)
-   Return `undefined` for `TransactionData#memo` if it doesn't exist (97ae565d, @faustbrian)
-   Expect an `object` for `TransactionData#asset` (710796cf, @faustbrian)
-   Remove `TransactionData#nonce` method (37b9d7ff, @faustbrian)
-   Remove `@arkecosystem/utils` dependency (b3940cdf, @faustbrian)
-   Return a string identifier for `TransactionData#type` (70794060, @faustbrian)
-   Add all supported networks to `manifest` (0c9c9f6a, @faustbrian)
-   Replace `AbstractFactory` with `CoinFactory` (111ee2dd, @faustbrian)
-   Add currency symbols to manifest (a1a8ae21, @faustbrian)
-   Implement `Coin` to slim down `CoinFactory` (651068a7, @faustbrian)
-   Store network object in `Config.network` instead of string (fc870e2c, @faustbrian)

### Fixed

-   Return magistrate fees from `FeeService#all` (ba0be8b5, @faustbrian)
-   Only list `XRP` transactions (dc85f366, @faustbrian)
-   Always treat `fee` and `amount` as `string` (9c5b8758, @faustbrian)
-   Export naming (1d3626f9, @faustbrian)

## 0.7.0 - 2020-05-12

### Added

-   Implement mnemonic derivation for `IdentityService` for `XLM` (0c5ec51d, @faustbrian)
-   Implement `ClientService#transactions` (15ffde49, @faustbrian)
-   Implement `NumberFormatter` and `CurrencyFormatter` (6eebe105, 71d61016, @faustbrian)
-   Setup boilerplate for `XLM` (a61a40e0, @faustbrian)
-   Implement `IdentityService` for `XLM` (8e3ab1bc, @faustbrian)
-   Implement `ClientService` for `XLM` (9a6464de, @faustbrian)
-   Implement `TransactionService` for `XLM` (fe9cc00c, @faustbrian)
-   Include `nonce` in `WalletData` (6942cc6f, @faustbrian)
-   Support transaction signing with private key for `XLM` (892e7522, @faustbrian)

### Changed

-   Update manifest and docs for `NEO` (a2229e08, @faustbrian)
-   Split up `IdentityService` into subclasses (13524ae7, @faustbrian)
-   Force network name to be `live`, `demo` or `test` (33dbb695, @faustbrian)
-   Add `crypto` key to manifest to hold BIP values (da6e466a, @faustbrian)
-   Normalise `ClientService#broadcast` response (32a80670, @faustbrian)
-   Always treat `nonce` as `BigNumber` (e6b0b99b, @faustbrian)
-   Update manifest and documentation for `XLM` (e5ae3ece, @faustbrian)
-   Use `BigNumber` from `platform-sdk` instead of `utils` (47deb97c, @faustbrian)

### Fixed

-   UTC declaration for dayjs (c3461d50, @luciorubeens)

## 0.6.7 - 2020-05-08

### Changed

-   Add derivation path to manifests (f4e450fe, @faustbrian)
-   Remove `ClientService#configuration` (2b5b501b, @faustbrian)

### Added

-   Implement mnemonic derivation for `ETH` (b6f3931a, @faustbrian)
-   Implement `IdentityService` for `NEO` (863671f5, @faustbrian)
-   Implement `MessageService` for `NEO` (8c91be4d, @faustbrian)
-   Implement `TransactionService#transfer` for `NEO` (1968e333, @faustbrian)

## 0.6.1 - 2020-05-07

### Changed

-   Use `platform-sdk-server` for `ETH` communication (db0db34d, @faustbrian)

## 0.6.0 - 2020-05-07

### Added

-   Implement mnemonic usage for `IdentityService` for `BTC` (ff3796dd, @faustbrian)

### Changed

-   Use the `platform-sdk-server` for `BTC` communication (478a790d, @faustbrian)
-   Update manifest (7b0775cd, @faustbrian)

### Removed

-   Remove `IdentityService#keyPair(publicKey)` (e540ed17, @faustbrian)

### Fixed

-   Format UTXO response for transaction builder (5edb4aa7, @faustbrian)

## 0.5.3 - 2020-05-06

### Fixed

-   Support domain-based peers (c00eb200, @faustbrian)

## 0.5.2 - 2020-05-06

### Fixed

-   Try to first use a peer and then the network for the `PeerService` (4859be8b, @faustbrian)

## 0.5.1 - 2020-05-06

### Fixed

-   Handle underlying effects of new factory arguments (be625fe4, @faustbrian)

## 0.5.0 - 2020-05-06

### Fixed

-   Add missing exceptions for `IdentityService` (b5240108, @faustbrian)

### Added

-   Transfer transaction signing and broadcasting for `BTC` (017ce6fc, @faustbrian)
-   Implement `FeeService` to control fee behaviours (b6100d72, @faustbrian)

### Changed

-   Replace `bitcoin-*` libs with `bitcore-lib` (ccc6b1ad, @faustbrian)
-   Include basic network information in `manifest` (54e59a72, @faustbrian)
-   Normalise `Factory` options (04c02c89, @faustbrian)
-   Rename `PriceTrackerService` to `MarketService` and add documentation (aed26ab5, @faustbrian)

## 0.4.5 - 2020-05-05

### Added

-   Implement `ClientService#transaction/transactions/wallet` methods for `ATOM` (82e606ae, @faustbrian)
-   Transfer signing and broadcasting (f72bc101, @faustbrian)

### Changed

-   Always collect coverage (529876f6, @faustbrian)
-   Update manifests (6dd5e40e, @faustbrian)

## 0.4.1 - 2020-05-04

### Changed

-   Updated manifests (6dd5e40, @faustbrian)

## 0.4.0 - 2020-05-04

### Added

-   add `DelegateData#getUsername` and `DelegateData#getRank` (0a4ab515, @faustbrian)
-   add `ClientService#getVotes` and `ClientService#getVoters` methods (b9075224, @faustbrian)
-   implement transaction signing and identity geneneration (81486551, @faustbrian)
-   implement LinkService (f18a6d1c, @faustbrian)
-   add `options` for transaction signing (5c528f3a, @faustbrian)
-   implement `Factory` for each adapter (fa81ba4e, @faustbrian)
-   implement `LedgerService` (b894e16b, @faustbrian)

### Changed

-   make all public API methods async (72a5dd0b, @faustbrian)
-   return normalised object from `DTO#toObject` (8e413dfc, @faustbrian)
-   remove unused block code (64127a74, @faustbrian)
-   standardise the input for the `Transaction#create*` methods (b9fe08f3, @faustbrian)
-   add `Class#construct` and `Class#destruct` (406fd104, @faustbrian)
-   use ripple-lib connection for API requests (31617bbd, @faustbrian)
-   final method names (0b239fb3, @faustbrian)
-   drop `ClientService#searchTransactions` and `ClientService#searchWallets` (9cb7f2bc, @faustbrian)
-   merge `ClientService#cryptoConfiguration` into `ClientService#configuration` (4d5a414d, @faustbrian)
-   merge `ClientService#feesByNode` and `ClientService#feesByType` (9a6406b7, @faustbrian)
-   add contract for `MessageService` input (317188e6, @faustbrian)
-   add contract for `IdentityService` input (20cc46af, @faustbrian)
-   turn `PeerService` fluent helpers into options (9eaecafe, @faustbrian)

## 0.3.6 - 2020-04-29

### Changed

-   add package banners (80fda7dd, @faustbrian)

### Fixed

-   only list payments when using `Client#getTransactions` (0e0c7966, @faustbrian)
-   use testnet transaction structure (ac85331e, @faustbrian)
-   return `asset.payments` sum if transaction type is multipayment (78bd0671, @faustbrian)

## 0.3.3 - 2020-04-29

### Added

-   add `WalletData#getNonce` method (fbbc21ba, @faustbrian)

### Changed

-   add `yarn run publish` script (1a623033, @faustbrian)
-   expect an array of transactions for `#postTransactions` (777d7821, @faustbrian)
-

### Fixed

-   treat amounts as strings (d7d0d9ca, @faustbrian)

## 0.3.0 - 2020-04-29

### Added

-   initial draft of normalised Block DTO (2487fad5, @faustbrian)
-   initial draft of normalised Transaction DTO (15ca2eef, @faustbrian)
-   initial draft of normalised Peer DTO (398d123c, @faustbrian)
-   initial draft of normalised Wallet DTO (1cbe4dc7, @faustbrian)
-   add manifests to provide coin information (ae3ae870, @faustbrian)
-   implement `Client` methods (a35aa505, @faustbrian)
-   initial implementation (2eae2f0b, @faustbrian)
-   implement `getTransactions` (671887b3, @faustbrian)
-   initial implementation (40939eb3, @faustbrian)
-   implement `Client#getWallet` (7b60b859, @faustbrian)
-   implement `Message#sign` and `Message#verify` (596f9ebd, @faustbrian)
-   implement transaction, wallet and delegate methods for `Client` (dba67b63, @faustbrian)
-   introduce peer discovery service (f6147ff6, @faustbrian)
-

### Changed

-   update dependencies to latest versions (6aee2492, @github-actions[bot])
-   update dependencies to latest versions (395ae36a, @github-actions[bot])
-   use @liskhq/lisk-transactions-old for mainnet and testnet (b946b522, @faustbrian)
-   remove getBridgechainsByBusiness (9b891508, @faustbrian)
-   remove block methods (187a6787, @faustbrian)
-   use yarn workspace with multiple packages (e38562b3, @faustbrian)
-   setup boilerplate for NEO, XMR and XRP (ca079e52, @faustbrian)
-   break down price trackers into multiple packages (aad6b240, @faustbrian)
-   move everything to its final location with matching names (2684b89d, @faustbrian)
-   final package names (7bbca218, @faustbrian)

### Fixed

-   include meta data in collection-based responses (73ee7b32, @faustbrian)

## 0.2.0 - 2020-03-31

### Added

-   Implement delegate methods for clients (70517411, @faustbrian)
-   Add more endpoints for ARK client (d5cc49fd, @faustbrian)
-   Initial implementation of LSK (9be68718, @faustbrian)
-   Message signing for ARK, BTC and LSK (9bb77307, @faustbrian)
-   Add `getPeers` method to client contract (d3dc3e99, @faustbrian)
-   Initial implementation of TRX (fe71fb9f, @faustbrian)
-   Basic client setup for ETH (fe8168b9, @faustbrian)
-   Implement various ETH client methods (6935f8c9, @faustbrian)

### Changed

-   Bump acorn from 6.4.0 to 6.4.1 (8e67abab, @dependabot[bot])
-   Disable conflicting eslint rules (7f9dc896, @faustbrian)
-   Update dependencies to latest versions (628dff91, @github-actions[bot])

### Fixed

-   Usage of exceptions (a6a0d1f2, @faustbrian)
-   Default lisk to betanet (8b1e86bd, @faustbrian)

## 0.1.1 - 2020-03-24

### Fixed

-   Export IdentityFactory (d09b2ebf, @faustbrian)

## 0.1.0 - 2020-03-24

### Added

-   Initial implementation of ARK crypto (c7121fbd, @faustbrian)
-   Initial implementation of ARK client (593fd555, @faustbrian)
-   Add search methods to ARK client (ab3b1ee6, @faustbrian)
-   Identity generation for ARK (32a94c8c, @faustbrian)
-   Identity generation for BTC (fea0bb7b, @faustbrian)
-   Identity generation for ETH (c48615ba, @faustbrian)

### Changed

-   Add npm-check-updates as dev dependency (931de0f1, @faustbrian)
-   Update dependencies to latest versions (437dd822, @github-actions[bot])
-   Implement DTOs per adapter with a contract (ba882c5f, @faustbrian)
-   Update dependencies (4c03c69c, @faustbrian)
-   Organise concrete implementations by token (1f012929, @faustbrian)
-   Consolidate types for `Record<string, any>` (c0884c35, @faustbrian)
-   Move DTOs up a level to flatten directory structure (cd9e4307, @faustbrian)

### Fixed

-   Export price tracker contracts (81fb042b, @faustbrian)
-   Add missing default plugins to dayjs (d62b0d53, @faustbrian)

## 0.0.2 - 2020-03-06

### Fixed

-   Export `PriceTrackerService`

## 0.0.1 - 2020-03-06

-   initial release
