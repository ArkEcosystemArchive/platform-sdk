# Examples

## Create a new environment

```ts
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Environment } from "@arkecosystem/platform-sdk-profiles";

// 1. Create a new environment
const env = new Environment({ coins: { ARK }, httpClient: new HttpClient(), storage: "localstorage" });
```

## Create a new profile

```ts
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Environment } from "@arkecosystem/platform-sdk-profiles";

// 1. Create a new environment
const env = new Environment({ coins: { ARK }, httpClient: new HttpClient(), storage: "localstorage" });

// 2. Create a new profile
await env.profiles().create("John Doe");
```

## Create a new wallet

```ts
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Environment } from "@arkecosystem/platform-sdk-profiles";

// 1. Create a new environment
const env = new Environment({ coins: { ARK }, httpClient: new HttpClient(), storage: "localstorage" });

// 2. Create a new profile
const profile = await env.profiles().create("John Doe");

// 3. Create a new wallet
await profile.wallets().create("this is a top secret passphrase", ARK, "devnet");
```

## Create a new contact for a wallet

```ts
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Environment } from "@arkecosystem/platform-sdk-profiles";

// 1. Create a new environment
const env = new Environment({ coins: { ARK }, httpClient: new HttpClient(), storage: "localstorage" });

// 2. Create a new profile
const profile = await env.profiles().create("John Doe");

// 3. Create a new contact
profile.contacts().create({
    name: "Jane Doe",
    addresses: [{ coin: "Ethereum", network: "testnet", address: "TESTNET-ADDRESS" }],
    starred: true,
});
```

## Send Transaction

```ts
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Environment } from "@arkecosystem/platform-sdk-profiles";

// 1. Create a new environment
const env = new Environment({ coins: { ARK }, httpClient: new HttpClient(), storage: "localstorage" });

// 2. Create a new profile
const profile = await env.profiles().create("John Doe");

// 3. Create a new wallet
const wallet = await profile.wallets().create("this is a top secret passphrase", ARK, "devnet");

// 4. Create a new transaction
const transaction = await wallet.coin().transaction().transfer({
    sign: {
        mnemonic: "this is a top secret passphrase",
    },
    data: {
        amount: "1",
        to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib,
    },
});

// 5. Broadcast the transaction
console.log(await wallet.coin().client().broadcast([transaction]));
```
