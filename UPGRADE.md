# Upgrading

Because there are many breaking changes an upgrade is not that easy. There are many edge cases this guide does not cover. We accept PRs to improve this guide.

## From v7 to v8

### Profile Persistence

As of [a6371bff](https://github.com/ArkEcosystem/platform-sdk/commit/a6371bff) profiles are no longer automatically persisted to give the client more control over when persistence occurs. Calling `env.profiles().persist(profile)` will take care of persistence. This should be called before calling `env.persist()`.

### Transaction Signing

As of [816a5f99](https://github.com/ArkEcosystem/platform-sdk/commit/816a5f99) transactions are no longer signed with plain string values but instead expect a `Signatory` instance to guarantee consistent behaviour across all coins. Below snippets can be used to create signatories for the available signing methods.

```ts
wallet.coin().signatory().mnemonic(mnemonic: string, options?: IdentityOptions);
wallet.coin().signatory().secondaryMnemonic(primary: string;
wallet.coin().signatory().multiMnemonic(mnemonics: string[]);
wallet.coin().signatory().wif(primary: string);
wallet.coin().signatory().secondaryWif(primary: string, secondary: string);
wallet.coin().signatory().privateKey(privateKey: string, options?: IdentityOptions);
wallet.coin().signatory().signature(signature: string, senderPublicKey: string);
wallet.coin().signatory().senderPublicKey(publicKey: string, options?: IdentityOptions);
wallet.coin().signatory().multiSignature(min: number, publicKeys: string[]);
```
