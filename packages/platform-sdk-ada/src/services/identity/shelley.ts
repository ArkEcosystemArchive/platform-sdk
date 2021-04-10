import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import CardanoWasm, { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

export const HARDENED_THRESHOLD = 0x80000000;
export const SHELLEY_COIN_PURPOSE = 1852;
export const SHELLEY_COIN_TYPE = 1815;
export const SHELLEY_DERIVATION_SCHEME = 2;

const harden = (value: number): number => HARDENED_THRESHOLD + value;

const deriveAddress = (
	accountKey: CardanoWasm.Bip32PublicKey,
	isChange: boolean,
	addressIndex: number,
	networkId: string,
): string => {
	const spendKey = accountKey.derive(isChange ? 1 : 0).derive(addressIndex);
	const stakeKey = accountKey.derive(2).derive(0);

	return CardanoWasm.BaseAddress.new(
		parseInt(networkId),
		CardanoWasm.StakeCredential.from_keyhash(spendKey.to_raw_key().hash()),
		CardanoWasm.StakeCredential.from_keyhash(stakeKey.to_raw_key().hash()),
	)
		.to_address()
		.to_bech32();
};

// Key Derivation
export const deriveRootKey = (mnemonic: string): Bip32PrivateKey =>
	Bip32PrivateKey.from_bip39_entropy(Buffer.from(BIP39.toEntropy(mnemonic), "hex"), Buffer.from(""));

export const deriveAccountKey = (rootKey: Bip32PrivateKey, index: number): Bip32PrivateKey =>
	rootKey
		.derive(harden(SHELLEY_COIN_PURPOSE)) // CIP1852
		.derive(harden(SHELLEY_COIN_TYPE))
		.derive(harden(index));

export const deriveSpendKey = (accountKey: Bip32PrivateKey, index: number): Bip32PrivateKey =>
	accountKey
		.derive(0) // External
		.derive(index);

export const deriveChangeKey = (accountKey: Bip32PrivateKey, index: number): Bip32PrivateKey =>
	accountKey
		.derive(1) // Change
		.derive(index);

export const deriveStakeKey = (accountKey: Bip32PrivateKey, index: number): Bip32PrivateKey =>
	accountKey
		.derive(2) // Chimeric
		.derive(index);

// Address Derivation
export const addressFromMnemonic = (
	mnemonic: string,
	accountIndex: number,
	isChange: boolean,
	addressIndex: number,
	networkId: string,
): string =>
	deriveAddress(
		deriveRootKey(mnemonic)
			.derive(harden(SHELLEY_COIN_PURPOSE))
			.derive(harden(SHELLEY_COIN_TYPE))
			.derive(harden(accountIndex))
			.to_public(),
		isChange,
		addressIndex,
		networkId,
	);

export const addressFromAccountExtPublicKey = (
	extPubKey: Buffer,
	isChange: boolean,
	addressIndex: number,
	networkId: string,
): string => deriveAddress(CardanoWasm.Bip32PublicKey.from_bytes(extPubKey), isChange, addressIndex, networkId);
