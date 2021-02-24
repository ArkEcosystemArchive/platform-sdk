import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { BigNum, Bip32PrivateKey, Value } from "@emurgo/cardano-serialization-lib-nodejs";

const harden = (num: number): number => 0x80000000 + num;

export const createValue = (value: string): Value => Value.new(BigNum.from_str(value));

export const deriveRootKey = (mnemonic: string): Bip32PrivateKey =>
	Bip32PrivateKey.from_bip39_entropy(Buffer.from(BIP39.toEntropy(mnemonic), "hex"), Buffer.from(""));

export const deriveAccountKey = (rootKey: Bip32PrivateKey, slip44: number, index: number): Bip32PrivateKey =>
	rootKey
		.derive(harden(1852)) // CIP1852
		.derive(harden(slip44))
		.derive(harden(index));

export const deriveUtxoKey = (accountKey: Bip32PrivateKey, index: number): Bip32PrivateKey =>
	accountKey
		.derive(harden(0)) // External
		.derive(harden(index));

export const deriveChangeKey = (accountKey: Bip32PrivateKey, index: number): Bip32PrivateKey =>
	accountKey
		.derive(harden(1)) // Change
		.derive(harden(index));

export const deriveStakeKey = (accountKey: Bip32PrivateKey, index: number): Bip32PrivateKey =>
	accountKey
		.derive(harden(2)) // Chimeric
		.derive(harden(index));
