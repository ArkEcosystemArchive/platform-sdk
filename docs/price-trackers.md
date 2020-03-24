# Price Trackers

## Instantiation of a service that abstract the adapters behaviour.

```ts
import { PriceTrackerFactory, PriceTrackerService } from "@arkecosystem/platform-sdk";

PriceTrackerService.make("coincap");
PriceTrackerService.make("coingecko");
PriceTrackerService.make("cryptocompare");
```

## Instantiation of an adapter itself.

```ts
import { PriceTrackerFactory, PriceTrackerService } from "@arkecosystem/platform-sdk";

PriceTrackerFactory.make("coincap");
PriceTrackerFactory.make("coingecko");
PriceTrackerFactory.make("cryptocompare");
```
