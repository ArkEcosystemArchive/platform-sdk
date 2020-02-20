# ARK Wallet SDK

<p align="center">
    <img src="./banner.png" />
</p>

> Lead Maintainer: [Brian Faust](https://github.com/faustbrian)

## Installation

```bash
yarn add @arkecosystem/platform-sdk
```

## Usage

### Client

```ts
import { ClientFactory } from "@arkecosystem/platform-sdk";

ClientFactory.make("ark");
ClientFactory.make("btc");
ClientFactory.make("eth");
```

### Crypto

```ts
import { CryptoFactory } from "@arkecosystem/platform-sdk";

CryptoFactory.make("ark");
CryptoFactory.make("btc");
CryptoFactory.make("eth");
```

### Price Trackers

```ts
import { PriceTrackerFactory, PriceTrackerService } from "@arkecosystem/platform-sdk";

// Instantiation of a service that abstract the adapters behaviour.
PriceTrackerService.make("coincap");
PriceTrackerService.make("coingecko");
PriceTrackerService.make("cryptocompare");

// Instantiation of an adapter itself.
PriceTrackerFactory.make("coincap");
PriceTrackerFactory.make("coingecko");
PriceTrackerFactory.make("cryptocompare");
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@ark.io. All security vulnerabilities will be promptly addressed.

## Credits

This project exists thanks to all the people who [contribute](../../contributors).

## License

[MIT](LICENSE) © [ARK Ecosystem](https://ark.io)
