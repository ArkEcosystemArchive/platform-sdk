# ARK Wallet SDK

<p align="center">
    <img src="./banner.png" />
</p>

> Lead Maintainer: [Brian Faust](https://github.com/faustbrian)

## Installation

```bash
yarn add @arkecosystem/wallet-sdk
```

## Usage

### Client

```ts
import { ClientFactory } from "@arkecosystem/wallet-sdk";

ClientFactory.make("ark");
ClientFactory.make("btc");
ClientFactory.make("eth");
```

### Crypto

```ts
import { CryptoFactory } from "@arkecosystem/wallet-sdk";

CryptoFactory.make("ark");
CryptoFactory.make("btc");
CryptoFactory.make("eth");
```

### Tracker

```ts
import { TrackerFactory } from "@arkecosystem/wallet-sdk";

TrackerFactory.make("coincap");
TrackerFactory.make("coingecko");
TrackerFactory.make("cryptocompare");
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@ark.io. All security vulnerabilities will be promptly addressed.

## Credits

This project exists thanks to all the people who [contribute](../../contributors).

## License

[MIT](LICENSE) © [ARK Ecosystem](https://ark.io)
