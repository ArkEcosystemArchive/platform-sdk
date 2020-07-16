# Documentation

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
| MessageService     | sign                      | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: |
| MessageService     | verify                    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: |
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

## API Documentation

### Coins

-   [SDK](https://platform-sdk.netlify.app/)
-   [ADA](https://platform-sdk-ada.netlify.app/)
-   [ARK](https://platform-sdk-ark.netlify.app/)
-   [ATOM](https://platform-sdk-atom.netlify.app/)
-   [BTC](https://platform-sdk-btc.netlify.app/)
-   [EOS](https://platform-sdk-eos.netlify.app/)
-   [ETH](https://platform-sdk-eth.netlify.app/)
-   [LSK](https://platform-sdk-lsk.netlify.app/)
-   [NEO](https://platform-sdk-neo.netlify.app/)
-   [TRX](https://platform-sdk-trx.netlify.app/)
-   [XLM](https://platform-sdk-xlm.netlify.app/)
-   [XMR](https://platform-sdk-xmr.netlify.app/)
-   [XRP](https://platform-sdk-xrp.netlify.app/)

### Markets

-   [Markets](https://platform-sdk-markets.netlify.app/)
-   [CoinCap](https://platform-sdk-coincap.netlify.app/)
-   [CoinGecko](https://platform-sdk-coingecko.netlify.app/)
-   [CryptoCompare](https://platform-sdk-cryptocompare.netlify.app/)

### Miscellaneous

-   [Crypto](https://platform-sdk-crypto.netlify.app/)
-   [Intl](https://platform-sdk-intl.netlify.app/)
-   [Ipfs](https://platform-sdk-ipfs.netlify.app/)
-   [JSON-RPC](https://platform-sdk-json-rpc.netlify.app/)
-   [News](https://platform-sdk-news.netlify.app/)
-   [Profiles](https://platform-sdk-profiles.netlify.app/)
-   [Support](https://platform-sdk-support.netlify.app/)
