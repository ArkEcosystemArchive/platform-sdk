# Examples

## Environment

### Create a new environment

```ts
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Environment } from "@arkecosystem/platform-sdk-profiles";

// 1. Create a new environment
const env = new Environment({ coins: { ARK }, httpClient: new HttpClient(), storage: "localstorage" });
```

## Profiles

These methods are accessible through `env.profiles()` which exposes a `ProfileRepository` instance.

```ts
// Get a list of all profiles
env.profiles().all();

// Find the profile for the given ID
env.profiles().findById("uuid");

// Create a new profile for the given name
env.profiles().create("John Doe");

// Forget the profile for the given ID
env.profiles().forget("uuid");
```

### Authentication

These methods are accessible through `env.auth()` which exposes a `Authenticator` instance.

```ts
// Determine if the profile is password protected
profile.usesPassword();

// Set a password to protect the profile
profile.auth().setPassword("password");

// Verify the password to ensure it matches the profile
profile.auth().verifyPassword("password");

// Change the password with a verification process that will throw if it fails
profile.auth().changePassword("oldPassword", "newPassword");
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
await profile.wallets().importByMnemonic("this is a top secret passphrase", "ARK", "devnet");

// Create a new wallet from an address, coin implementation and network
await profile.wallets().importByAddress("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib", "ARK", "devnet");

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

// Get information about a wallet from the network
await wallet.wallet("username");

// Get a list of wallets from the network that match the given criteria
await wallet.wallets({ ... });

// Get information about a delegate from the network
await wallet.delegate("username");

// Get a list of delegates from the network that match the given criteria
await wallet.delegates({ ... });

// List all votes that a wallet casted
await wallet.votes();

// List all voters that a wallet has
await wallet.voters();

// Check if the peer is syncing
await wallet.client().syncing();

// Broadcast all of the given transactions
await wallet.client().broadcast([transaction, transaction, transaction]);

// Create a new transfer transaction
await wallet.transaction().transfer(input, options);

// Create a new second signature transaction
await wallet.transaction().secondSignature(input, options);

// Create a new delegate registration transaction
await wallet.transaction().delegateRegistration(input, options);

// Create a new vote transaction
await wallet.transaction().vote(input, options);

// Create a new multi signature transaction
await wallet.transaction().multiSignature(input, options);

// Create a new ipfs transaction
await wallet.transaction().ipfs(input, options);

// Create a new multi payment transaction
await wallet.transaction().multiPayment(input, options);

// Create a new delegate resignation transaction
await wallet.transaction().delegateResignation(input, options);

// Create a new htlc lock transaction
await wallet.transaction().htlcLock(input, options);

// Create a new htlc claim transaction
await wallet.transaction().htlcClaim(input, options);

// Create a new htlc refund transaction
await wallet.transaction().htlcRefund(input, options);

// Create a new business registration transaction
await wallet.transaction().businessRegistration(input, options);

// Create a new business resignation transaction
await wallet.transaction().businessResignation(input, options);

// Create a new business update transaction
await wallet.transaction().businessUpdate(input, options);

// Create a new bridgechain registration transaction
await wallet.transaction().bridgechainRegistration(input, options);

// Create a new bridgechain resignation transaction
await wallet.transaction().bridgechainResignation(input, options);

// Create a new bridgechain update transaction
await wallet.transaction().bridgechainUpdate(input, options);

// Sign a new message
await wallet.message().sign(input);

// Verify an existing message
await wallet.message().verify(input);

// Get the version from ledger
await wallet.ledger().getVersion();

// Get a public key from ledger
await wallet.ledger().getPublicKey(path);

// Sign a transaction with ledger
await wallet.ledger().signTransaction(path, payload);

// Sign a transaction with ledger using schnorr
await wallet.ledger().signTransactionWithSchnorr(path, payload);

// Sign a message with ledger
await wallet.ledger().signMessage(path, payload);

// Sign a message with ledger using schnorr
await wallet.ledger().signMessageWithSchnorr(path, payload);

// Get an explorer link for a block
await wallet.link().block(id);

// Get an explorer link for a transaction
await wallet.link().transaction(id);

// Get an explorer link for a wallet
await wallet.link().wallet(id);
```

### Contacts

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

### Notifications

These methods are accessible through `profile.notifications()` which exposes a `NotificationRepository` instance.

```ts
// Get a list of all notifications with key and value
profile.notifications().all();

// Get a list of all notification keys
profile.notifications().keys();

// Get a list of all notification values
profile.notifications().values();

// Create a new notification for the given data
profile.notifications().push({
	icon: "warning",
	name: "Ledger Update Available",
	body: "...",
	action: "Read Changelog",
});

// Forget the notification for the given ID
profile.notifications().forget("uuid");

// Forget all notifications (Use with caution!)
profile.notifications().flush();

// Get all read notifications
profile.notifications().read();

// Get all unread notifications
profile.notifications().unread();

// Mark the for the given ID as read
profile.notifications().markAsRead("uuid");
```

### Plugins

These methods are accessible through `profile.plugins()` which exposes a `PluginRepository` instance.

```ts
// Get a list of all plugins
profile.plugins().all();

// Register a new plugin for the given data
profile.plugins().push({ id: 123, name: "@hello/world" });

// Find the plugin for the given ID
profile.plugins().findById(123);

// Forget the plugin for the given ID
profile.plugins().forget(123);

// Forget all plugins (Use with caution!)
profile.plugins().flush();
```

#### Blacklist

These methods are accessible through `profile.plugins().blacklist()` which exposes a `Set<number>` instance. The `Set` instance is a native [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) as opposed to a `DataRepository`.

```ts
// Add a plugin to the blacklist
profile.plugins().blacklist().add(123);

// Remove a plugin from the blacklist
profile.plugins().blacklist().delete(123);
```

#### Registry

These methods are accessible through `profile.plugins().registry()` which exposes a `PluginRegistry` instance.

```ts
// Get a list of plugins from the MarketSquare API
profile.plugins().registry().all();

// Get aa specific plugin from the MarketSquare API
profile.plugins().registry().findById(123);
```

#### Transactions

##### Sign and broadcast a transaction through a wallet

```ts
const wallet = await profile.wallets().create("this is a top secret passphrase", "ARK", "devnet");

// 4. Create a new transaction
const transaction = await wallet.transaction().transfer({
    sign: {
        mnemonic: "this is a top secret passphrase",
    },
    data: {
        amount: "1",
        to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
    },
});

// 5. Broadcast the transaction
console.log(await wallet.client().broadcast([transaction]));
```
