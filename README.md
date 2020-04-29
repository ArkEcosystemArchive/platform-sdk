# ARK Platform SDK

<p align="center">
    <img src="./banner.png" />
</p>

> Lead Maintainer: [Brian Faust](https://github.com/faustbrian)

## Warning

**This package is only intended to be used by ARK Ecosystem to provide cross-platform utilities for ARK Applications. No support is provided in any way.**

## Installation

```bash
yarn add @arkecosystem/platform-sdk
```

## Usage

Documentation can be found [here](./docs/README.md).

## Functionality

| Class    | Functions                    | ARK                | BTC                | ETH                | LSK                | TRX                | EOS | ATOM | ADA |
| -------- | ---------------------------- | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | --- | ---- | --- |
| Client   | getTransaction               | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x:  | :x: |
| Client   | getTransactions              | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Client   | searchTransactions           | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Client   | getWallet                    | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x:  | :x: |
| Client   | getWallets                   | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Client   | searchWallets                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Client   | getDelegate                  | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Client   | getDelegates                 | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Client   | getPeers                     | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Client   | getConfiguration             | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Client   | getCryptoConfiguration       | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Client   | getFeesByNode                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Client   | getFeesByType                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Client   | getSyncStatus                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Client   | postTransactions             | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x:  | :x: |
| Crypto   | createTransfer               | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x:  | :x: |
| Crypto   | createSecondSignature        | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Crypto   | createDelegateRegistration   | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Crypto   | createVote                   | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Crypto   | createMultiSignature         | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Crypto   | createIpfs                   | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Crypto   | createMultiPayment           | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Crypto   | createDelegateResignation    | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Crypto   | createHtlcLock               | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Crypto   | createHtlcClaim              | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Crypto   | createHtlcRefund             | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getAddress(passphrase)       | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Identity | getAddress(multiSignature)   | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getAddress(publicKey)        | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Identity | getAddress(privateKey)       | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getAddress(wif)              | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getPublicKey(passphrase)     | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Identity | getPublicKey(multiSignature) | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getPublicKey(wif)            | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getPrivateKey(passphrase)    | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Identity | getPrivateKey(wif)           | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getWIF(passphrase)           | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getKeyPair(passphrase)       | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Identity | getKeyPair(publicKey)        | :x:                | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getKeyPair(privateKey)       | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getKeyPair(wif)              | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Message  | sign                         | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Message  | verify                       | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@ark.io. All security vulnerabilities will be promptly addressed.

## Credits

This project exists thanks to all the people who [contribute](../../contributors).

## License

[MIT](LICENSE) © [ARK Ecosystem](https://ark.io)
