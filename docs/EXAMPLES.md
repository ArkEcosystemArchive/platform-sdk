# Examples

## ARK

## Send Transaction

```ts
import { Coins } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";

const argv = require("minimist")(process.argv.slice(2));

const main = async () => {
	// 1. Instantiate the Coin
	const adapter = await Coins.CoinFactory.make(ARK, { network: "devnet" });

	// 2. Get the nonce for the signer wallet
	const wallet = await adapter
		.client()
		.wallet(await adapter.identity().address().fromPassphrase(argv.passphrase));

	// 3. Sign transaction
	const transaction = await adapter.transaction().transfer({
		nonce: wallet.nonce().plus(1),
		sign: {
			passphrase: argv.passphrase,
		},
		data: {
			amount: "1",
			to: argv.recipient,
		},
	});

	// 4. Broadcast transaction
	console.log(await adapter.client().broadcast([transaction]));
};

main();
```
