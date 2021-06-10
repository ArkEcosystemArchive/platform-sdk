/// <reference types="node" />
import CardanoWasm, { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
export declare const HARDENED_THRESHOLD = 2147483648;
export declare const SHELLEY_COIN_PURPOSE = 1852;
export declare const SHELLEY_COIN_TYPE = 1815;
export declare const SHELLEY_DERIVATION_SCHEME = 2;
export declare const deriveAddress: (
	accountKey: CardanoWasm.Bip32PublicKey,
	isChange: boolean,
	addressIndex: number,
	networkId: string,
) => string;
export declare const deriveRootKey: (mnemonic: string) => Bip32PrivateKey;
export declare const deriveAccountKey: (rootKey: Bip32PrivateKey, index: number) => Bip32PrivateKey;
export declare const deriveSpendKey: (accountKey: Bip32PrivateKey, index: number) => Bip32PrivateKey;
export declare const deriveChangeKey: (accountKey: Bip32PrivateKey, index: number) => Bip32PrivateKey;
export declare const deriveStakeKey: (accountKey: Bip32PrivateKey, index: number) => Bip32PrivateKey;
export declare const addressFromMnemonic: (
	mnemonic: string,
	accountIndex: number,
	isChange: boolean,
	addressIndex: number,
	networkId: string,
) => string;
export declare const addressFromAccountExtPublicKey: (
	extPubKey: Buffer,
	isChange: boolean,
	addressIndex: number,
	networkId: string,
) => string;
