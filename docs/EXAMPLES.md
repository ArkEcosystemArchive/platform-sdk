# Examples

## Environment

### Create a new environment

```ts
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Environment } from "@arkecosystem/platform-sdk-profiles";

// 1. Create a new environment
const env = new Environment({ coins: { ARK }, httpClient: new HttpClient(), storage: "localstorage" });
```

### Profiles

These methods are accessible through `env.profiles()` which exposes a `ProfileRepository` instance.

```ts
// Get a list of all data profiles
env.profiles().all();

// Create a new profile for the given name
await env.profiles().create("John Doe");

// Forget the profile for the given ID
env.profiles().forget("uuid");
```

### Data

These methods are accessible through `env.data()`, `profile.data()` and `wallet.data()` which expose a `DataRepository` instance.

```ts
// Get a list of all data with key and value
profile.data().all();

// Get a list of all data keys
profile.data().keys();

// Get a list of all data values
profile.data().values();

// Get the value for the given key
profile.data().get("theme");

// Set the value for the given key
profile.data().set("theme", "dark");

// Check if a data for the given key exists
profile.data().has("theme");

// Check if a data for the given key is missing
profile.data().missing("theme");

// Forget the value for the given key
profile.data().forget("theme");

// Forget all data (Use with caution!)
profile.data().flush();

// Take a snapshot of the current data (Use with caution!)
profile.data().snapshot();

// Restore a previously taken snapshot (Use with caution!)
profile.data().restore();
```

### Settings

These methods are accessible through `profile.settings()` and `wallet.settings()` which expose a `SettingRepository` instance.

```ts
// Get a list of all settings with key and value
profile.settings().all();

// Get a list of all setting keys
profile.settings().keys();

// Get a list of all setting values
profile.settings().values();

// Get the value for the given key
profile.settings().get("theme", "light");

// Set the value for the given key
profile.settings().set("theme", "dark");

// Check if a setting for the given key exists
profile.settings().has("theme");

// Forget the value for the given key
profile.settings().forget("theme");

// Forget all settings (Use with caution!)
profile.settings().flush();
```

### Wallets

These methods are accessible through `profile.wallets()` which exposes a `WalletRepository` instance.

```ts
// Get a list of all wallets with key and value
profile.wallets().all();

// Get a list of all wallet keys
profile.wallets().keys();

// Get a list of all wallet values
profile.wallets().values();

// Create a new wallet from a mnemonic, coin implementation and network
await profile.wallets().create("this is a top secret passphrase", ARK, "devnet");

// Find the wallet by the given ID
profile.wallets().findById("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");

// Find the wallet for the given address
profile.wallets().findByAddress("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");

// Find the wallet for the given public key
profile.wallets().findByPublicKey("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");

// Find all wallets that use the given coin
profile.wallets().findByCoin("ARK");

// Forget the wallet for the given ID
profile.wallets().forget("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");

// Forget all wallets (Use with caution!)
profile.wallets().flush();

// List all transactions that a wallet has sent or received
await wallet.transactions();

// List all transactions that a wallet has sent
await wallet.sentTransactions();

// List all transactions that a wallet received
await wallet.receivedTransactions();

// List all votes that a wallet casted
await wallet.votes();

// List all voters that a wallet has
await wallet.voters();

// Create a new transfer transaction
await wallet.createTransfer(input, options);

// Create a new second signature transaction
await wallet.createSecondSignature(input, options);

// Create a new delegate registration transaction
await wallet.createDelegateRegistration(input, options);

// Create a new vote transaction
await wallet.createVote(input, options);

// Create a new multi signature transaction
await wallet.createMultiSignature(input, options);

// Create a new ipfs transaction
await wallet.createIpfs(input, options);

// Create a new multi payment transaction
await wallet.createMultiPayment(input, options);

// Create a new delegate resignation transaction
await wallet.createDelegateResignation(input, options);

// Create a new htlc lock transaction
await wallet.createHtlcLock(input, options);

// Create a new htlc claim transaction
await wallet.createHtlcClaim(input, options);

// Create a new htlc refund transaction
await wallet.createHtlcRefund(input, options);

// Create a new business registration transaction
await wallet.createBusinessRegistration(input, options);

// Create a new business resignation transaction
await wallet.createBusinessResignation(input, options);

// Create a new business update transaction
await wallet.createBusinessUpdate(input, options);

// Create a new bridgechain registration transaction
await wallet.createBridgechainRegistration(input, options);

// Create a new bridgechain resignation transaction
await wallet.createBridgechainResignation(input, options);

// Create a new bridgechain update transaction
await wallet.createBridgechainUpdate(input, options);

// Get the version from ledger
await wallet.getVersionFromLedger();

// Get a public key from ledger
await wallet.getPublicKeyFromLedger(path);

// Sign a transaction with ledger
await wallet.signTransactionWithLedger(path, payload);

// Sign a transaction with ledger using schnorr
await wallet.signTransactionWithLedgerUsingSchnorr(path, payload);

// Sign a message with ledger
await wallet.signMessageWithLedger(path, payload);

// Sign a message with ledger using schnorr
await wallet.signMessageWithLedgerUsingSchnorr(path, payload);
```

## Contacts

These methods are accessible through `profile.contacts()` which exposes a `ContactRepository` instance.

```ts
// Get a list of all contacts with key and value
profile.contacts().all();

// Get a list of all wallet keys
profile.contacts().keys();

// Get a list of all wallet values
profile.contacts().values();

// Create a new contact for the given data
profile.contacts().create({
    name: "Jane Doe",
    addresses: [{ coin: "Ethereum", network: "testnet", address: "TESTNET-ADDRESS" }],
    starred: true,
});

// Find the contact for the given ID
profile.contacts().findById("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");

// Find the contact for the given address
profile.contacts().findByAddress("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");

// Find all contacts for the given coin
profile.contacts().findByCoin("ARK");

// Find the contact for the given address
profile.contacts().findByNetwork("devnet");

// Forget the contact for the given ID
profile.contacts().forget("uuid");

// Forget all contacts (Use with caution!)
profile.contacts().flush();
```

## Transactions

### Sign and broadcast a transaction through a wallet

```ts
const wallet = await profile.wallets().create("this is a top secret passphrase", ARK, "devnet");

// 4. Create a new transaction
const transaction = await wallet.coin().transaction().transfer({
    sign: {
        mnemonic: "this is a top secret passphrase",
    },
    data: {
        amount: "1",
        to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
    },
});

// 5. Broadcast the transaction
console.log(await wallet.coin().client().broadcast([transaction]));
```
