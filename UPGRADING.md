# Upgrading

Because there are many breaking changes an upgrade is not that easy. There are many edge cases this guide does not cover. We accept PRs to improve this guide.

## From v7 to v8

### Profile Persistence

As of [a6371bff](https://github.com/ArkEcosystem/platform-sdk/commit/a6371bff) profiles are no longer automatically persisted to give the client more control over when persistence occurs. Calling `env.profiles().persist(profile)` will take care of persistence. This should be called before calling `env.persist()`.

### Transaction Signing

As of [816a5f99](https://github.com/ArkEcosystem/platform-sdk/commit/816a5f99) transactions are no longer signed with plain string values but instead expect a `Signatory` instance to guarantee consistent behaviour across all coins. Below snippets can be used to create signatories for the available signing methods.

```ts
wallet.coin().signatory().mnemonic(mnemonic: string, options?: IdentityOptions);
wallet.coin().signatory().secondaryMnemonic(primary: string, secondary: string, options?: IdentityOptions);
wallet.coin().signatory().multiMnemonic(mnemonics: string[]);
wallet.coin().signatory().wif(primary: string);
wallet.coin().signatory().secondaryWif(primary: string, secondary: string);
wallet.coin().signatory().privateKey(privateKey: string, options?: IdentityOptions);
wallet.coin().signatory().signature(signature: string, senderPublicKey: string);
wallet.coin().signatory().senderPublicKey(publicKey: string, options?: IdentityOptions);
wallet.coin().signatory().multiSignature(min: number, publicKeys: string[]);
```

### Message Signing

As of [222d0f6e](https://github.com/ArkEcosystem/platform-sdk/commit/222d0f6e) messages are no longer signed with plain string values but instead expect a `Signatory` instance to guarantee consistent behaviour across all coins. The same snippets as for transaction signing apply.

## From v1 to v2

### Use explicit-restoring for profiles instead of auto-restoring (e5e4b90e)

This change was made to improve performance and bandwidth consumption. There is no reason to pull in information about profiles that you might not even own which should also greatly improve performance because a profile with 100 wallets won't slow down your profile with 5 wallets.

### Encrypt profiles that use a password (e360e2f1)

This change was made to improve privacy. If you are using a profile it will now be encrypted using PBKDF2 and your password. Your profile data won't be accessible until you accessed it and decrypted it with your password. This change also required to store the data differently, which means profiles are now stored ase base64 strings rather than plain JSON. This change was done to streamline the internals for handling encrypted and not-encrypted profiles.

#### Migration

##### Data

Migrating profiles is fairly straightforward. The biggest change is that you need to store the profile data as base64. For this purpose you can use [migrations](https://github.com/ArkEcosystem/platform-sdk/blob/master/packages/platform-sdk-profiles/src/environment/migrator.test.ts) which will allow you to modify the data that is stored before it is accessible to the user. _You will need to temporarily disable the password on all profiles that use one and inform the user about the need of resetting their password. If you do not reset the password you will be unable to restore the profile._

We recommend to take a look at [this](https://github.com/ArkEcosystem/platform-sdk/blob/master/packages/platform-sdk-profiles/test/fixtures/env-storage.json) and [this](https://github.com/ArkEcosystem/platform-sdk/commit/e360e2f1b5108ac92977eb09e5100c248429b5ab) to get the full picture of the changes that have been made to better understand what changes you need to apply and how they should be applied.

**Important:** When you apply migrations you should always do so before calling `env.verify` and `env.boot`. These methods will try to validate the integrity of the data as is. This means that something like the JSON profiles would fail validation because a different structure and Base64 was expected. That is why you should always make sure to make any data modifications before you verify and/or boot the environment.

##### Password

To ensure that we can encrypt the password protected profile of a user when they are signed out or the application crashes we need to _temporarily_ store the users password after they enter it. You can take a look at [this password helper](https://github.com/ArkEcosystem/platform-sdk/blob/master/packages/platform-sdk-profiles/src/helpers/password.ts) to see how the password needs to be stored. The password should be stored when the user successfully decrypted their profile and be forgotten when the application is closed or they are signed out of their profile on purpose or through a timeout.

If you are already in production and don't want to reset the password of the profiles you will need to perform a bit more complex migration where you have to ask the user for their password if they are using one and then manually encrypt and encode the profile. That is why we recommend to temporarily unset the profile passwords and show the user a message that explains which profiles have been affected.

> If your application is not yet in production and contains password protected profiles we would recommend to reset them and start fresh with the base64 handling that the Platform SDK takes care of.
