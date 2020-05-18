# Examples

## ARK

## Send Transaction

```ts
import { Coins } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const main = async () => {
	// 1. Instantiate the Coin
	const adapter = await Coins.CoinFactory.make(ARK, { network: "devnet" });

	// 2. Sign transaction
	const transaction = await adapter.transaction().transfer({
		sign: {
			passphrase: argv.passphrase,
		},
		data: {
			amount: "1",
			to: argv.recipient,
		},
	});

	// 3. Broadcast transaction
	console.log(await adapter.client().broadcast([transaction]));
};

main();
```
