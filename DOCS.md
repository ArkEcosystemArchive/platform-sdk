# Documentation

1. [Architecture](#Architecture)
2. [Functionality](#Functionality)
3. [ClientService](#ClientService)
	- [construct](#construct)
	- [destruct](#destruct)
	- [getTransaction](#getTransaction)
	- [getTransactions](#getTransactions)
	- [getWallet](#getWallet)
	- [getWallets](#getWallets)
	- [getDelegate](#getDelegate)
	- [getDelegates](#getDelegates)
	- [getVotes](#getVotes)
	- [getVoters](#getVoters)
	- [getConfiguration](#getConfiguration)
	- [getCryptoConfiguration](#getCryptoConfiguration)
	- [getFeesByNode](#getFeesByNode)
	- [getFeesByType](#getFeesByType)
	- [getSyncStatus](#getSyncStatus)
	- [postTransactions](#postTransactions)
4. [IdentityService](#IdentityService)
	- [getAddress](#getAddress)
	- [getPublicKey](#getPublicKey)
	- [getPrivateKey](#getPrivateKey)
	- [getWIF](#getWIF)
	- [getKeyPair](#getKeyPair)
5. [LinkService](#LinkService)
	- [block](#block)
	- [transaction](#transaction)
	- [wallet](#wallet)
6. [MessageService](#MessageService)
	- [sign](#sign)
	- [verify](#verify)
7. [PeerService](#PeerService)
	- [findPeers](#findPeers)
	- [findPeersWithPlugin](#findPeersWithPlugin)
	- [findPeersWithoutEstimates](#findPeersWithoutEstimates)
8. [TransactionService](#TransactionService)
	- [createTransfer](#createTransfer)
	- [createSecondSignature](#createSecondSignature)
	- [createDelegateRegistration](#createDelegateRegistration)
	- [createVote](#createVote)
	- [createMultiSignature](#createMultiSignature)
	- [createIpfs](#createIpfs)
	- [createMultiPayment](#createMultiPayment)
	- [createDelegateResignation](#createDelegateResignation)
	- [createHtlcLock](#createHtlcLock)
	- [createHtlcClaim](#createHtlcClaim)
	- [createHtlcRefund](#createHtlcRefund)

## Architecture

### Contracts

Each coin follows a strict implementation contract. All of these contracts can be found at [platform-sdk/src/contracts](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk/src/contracts).

### Not Supported

Methods that are not supported will throw a `NotSupported` exception. A case of this would be if a coin doesn't have a the concept of voting which means we won't be able to support that feature.

### Not Implemented

Methods that will be supported in the future but are not implemented yet will throw a `NotImplemented` exception. A case of this would be a coin that supports voting but we have no plans yet of supporting this functionality in our applications.

### Async Operations

The majority of methods are `async` with a few exceptions. This is due to the fact that some coins require a network connection or perform computations in an async manner.

To avoid an inconsistent public API where some things are instantiated and called with `await` and others aren't you'll have to call most things with `await` and use the static `construct` method to create an instance of a service. This will allow you to swap out adapters without having to think about how they are instantiated.

## Functionality

| Class    | Functions                    | ARK                | BTC                | ETH                | LSK                | TRX                | EOS | ATOM | ADA |
| -------- | ---------------------------- | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | --- | ---- | --- |
| Client   | getTransaction               | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x:  | :x: |
| Client   | getTransactions              | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Client   | getWallet                    | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x:  | :x: |
| Client   | getWallets                   | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Client   | getDelegate                  | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Client   | getDelegates                 | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Client   | getPeers                     | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Client   | getConfiguration             | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Client   | getCryptoConfiguration       | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Client   | getFeesByNode                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Client   | getFeesByType                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Client   | getSyncStatus                | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Client   | postTransactions             | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x:  | :x: |
| Crypto   | createTransfer               | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x:  | :x: |
| Crypto   | createSecondSignature        | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Crypto   | createDelegateRegistration   | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Crypto   | createVote                   | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Crypto   | createMultiSignature         | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Crypto   | createIpfs                   | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Crypto   | createMultiPayment           | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Crypto   | createDelegateResignation    | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Crypto   | createHtlcLock               | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Crypto   | createHtlcClaim              | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Crypto   | createHtlcRefund             | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getAddress(passphrase)       | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Identity | getAddress(multiSignature)   | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getAddress(publicKey)        | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Identity | getAddress(privateKey)       | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getAddress(wif)              | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getPublicKey(passphrase)     | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Identity | getPublicKey(multiSignature) | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getPublicKey(wif)            | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getPrivateKey(passphrase)    | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Identity | getPrivateKey(wif)           | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getWIF(passphrase)           | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getKeyPair(passphrase)       | :white_check_mark: | :x:                | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Identity | getKeyPair(publicKey)        | :x:                | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getKeyPair(privateKey)       | :x:                | :x:                | :white_check_mark: | :x:                | :x:                | :x: | :x:  | :x: |
| Identity | getKeyPair(wif)              | :white_check_mark: | :x:                | :x:                | :x:                | :x:                | :x: | :x:  | :x: |
| Message  | sign                         | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
| Message  | verify                       | :white_check_mark: | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :x: | :x:  | :x: |
