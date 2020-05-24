# Documentation

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Architecture](#architecture)
  - [Contracts](#contracts)
  - [Not Supported](#not-supported)
  - [Not Implemented](#not-implemented)
  - [Async Operations](#async-operations)
- [Functionality](#functionality)
- [API Methods](#api-methods)
- [API Documentation](#api-documentation)
  - [Coins](#coins)
  - [Markets](#markets)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Architecture

### Contracts

Each coin follows a strict implementation contract. All of these contracts can be found at [platform-sdk/src/contracts](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk/src/contracts).

### Not Supported

Methods that are not supported will throw a `NotSupported` exception. A case of this would be if a coin doesn't have a the concept of voting which means we won't be able to support that feature.

### Not Implemented

Methods that will be supported in the future but are not implemented yet will throw a `NotImplemented` exception. A case of this would be a coin that supports voting but we have no plans yet of supporting this functionality in our applications.

### Async Operations

The majority of methods are `async` with a few exceptions. This is due to the fact that some coins require a network connection or perform computations in an async manner.

To avoid an inconsistent public API where some things are instantiated and called with `await` and others aren't you'll have to call most things with `await` and use the static `construct` method to create an instance of a service. This will allow you to swap out adapters without having to think about how they are instantiated.

## Functionality

| Class              | Functions                 | ADA                | ARK                | ATOM               | BTC                | EOS                | ETH                | LSK                | NEO                | TRX                | XLM                | XMR                | XRP                |
| ------------------ | ------------------------- | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ |
| ClientService      | transaction               | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: |
| ClientService      | transactions              | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: |
| ClientService      | wallet                    | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: |
| ClientService      | wallets                   | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                |
| ClientService      | delegate                  | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                |
| ClientService      | delegates                 | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                |
| ClientService      | votes                     | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| ClientService      | voters                    | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| ClientService      | syncing                   | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| ClientService      | broadcast                 | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: |
| FeeService         | all                       | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| IdentityService    | address(passphrase)       | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: |
| IdentityService    | address(multiSignature)   | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| IdentityService    | address(publicKey)        | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :white_check_mark: |
| IdentityService    | address(privateKey)       | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x:                |
| IdentityService    | address(wif)              | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                |
| IdentityService    | publicKey(passphrase)     | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x:                |
| IdentityService    | publicKey(multiSignature) | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| IdentityService    | publicKey(wif)            | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                |
| IdentityService    | privateKey(passphrase)    | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x:                |
| IdentityService    | privateKey(wif)           | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                |
| IdentityService    | wif(passphrase)           | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                |
| IdentityService    | keyPair(passphrase)       | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: |
| IdentityService    | keyPair(privateKey)       | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x:                |
| IdentityService    | keyPair(wif)              | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                |
| LedgerService      | getVersion                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| LedgerService      | getPublicKey              | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| LedgerService      | signTransaction           | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| LedgerService      | signMessage               | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| LinkService        | block                     | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| LinkService        | transaction               | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| LinkService        | wallet                    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| MessageService     | sign                      | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: |
| MessageService     | verify                    | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: |
| PeerService        | search                    | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| PeerService        | searchWithPlugin          | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| PeerService        | searchWithoutEstimates    | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| TransactionService | transfer                  | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: |
| TransactionService | secondSignature           | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                |
| TransactionService | delegateRegistration      | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                |
| TransactionService | vote                      | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                |
| TransactionService | multiSignature            | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                |
| TransactionService | ipfs                      | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| TransactionService | multiPayment              | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| TransactionService | delegateResignation       | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| TransactionService | htlcLock                  | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| TransactionService | htlcClaim                 | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |
| TransactionService | htlcRefund                | :x:                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                | :x:                |

## API Methods

-   [ClientService](./services/client.md)
-   [FeeService](./services/fee.md)
-   [IdentityService](./services/identity.md)
-   [LedgerService](./services/ledger.md)
-   [LinkService](./services/link.md)
-   [MessageService](./services/message.md)
-   [PeerService](./services/peer.md)
-   [TransactionService](./services/transaction.md)

## API Documentation

### Coins

-   [SDK](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk/docs)
-   [ADA](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-ada/docs)
-   [ARK](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-ark/docs)
-   [ATOM](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-atom/docs)
-   [BTC](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-btc/docs)
-   [EOS](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-eos/docs)
-   [ETH](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-eth/docs)
-   [LSK](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-lsk/docs)
-   [NEO](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-neo/docs)
-   [TRX](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-trx/docs)
-   [XLM](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-xlm/docs)
-   [XMR](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-xmr/docs)
-   [XRP](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-xrp/docs)

### Markets

-   [Markets](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-markets/docs)
-   [CoinCap](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-coincap/docs)
-   [CoinGecko](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-coingecko/docs)
-   [CryptoCompare](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk-cryptocompare/docs)
