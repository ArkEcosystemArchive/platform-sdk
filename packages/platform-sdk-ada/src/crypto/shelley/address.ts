import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import CardanoWasm from "@emurgo/cardano-serialization-lib-nodejs";

import { SHELLEY_COIN_PURPOSE, SHELLEY_COIN_TYPE } from "./constants";

const harden = (value: number): number => 0x80000000 + value;

export const generateRootKey = (mnemonic: string): CardanoWasm.Bip32PrivateKey => CardanoWasm.Bip32PrivateKey.from_bip39_entropy(
	  Buffer.from(BIP39.toEntropy(mnemonic), 'hex'),
	  Buffer.from('') // empty password
);

export const addressFromMnemonic = async (
	mnemonic: string,
	accountIdx: number,
	isChange: boolean,
	addressIdx: number,
	networkId: string,
): Promise<string> => {
	const accountKey = generateRootKey(mnemonic)
		.derive(harden(SHELLEY_COIN_PURPOSE))
		.derive(harden(SHELLEY_COIN_TYPE))
		.derive(harden(accountIdx));

	const spendKey = accountKey.derive(isChange ? 1 : 0).derive(addressIdx).to_public();
	const stakeKey = accountKey.derive(2).derive(0).to_public();

	return CardanoWasm.BaseAddress.new(
		parseInt(networkId),
		CardanoWasm.StakeCredential.from_keyhash(spendKey.to_raw_key().hash()),
		CardanoWasm.StakeCredential.from_keyhash(stakeKey.to_raw_key().hash()),
	).to_address().to_bech32();
};

export const addressFromAccountExtPublicKey = async (
	extPubKey: Buffer,
	isChange: boolean,
	addressIdx: number,
	networkId: string,
): Promise<string> => {
	const accountKey = CardanoWasm.Bip32PublicKey.from_bytes(extPubKey);

	const spendKey = accountKey.derive(isChange ? 1 : 0).derive(addressIdx);
	const stakeKey = accountKey.derive(2).derive(0);

	return CardanoWasm.BaseAddress.new(
		parseInt(networkId),
		CardanoWasm.StakeCredential.from_keyhash(spendKey.to_raw_key().hash()),
		CardanoWasm.StakeCredential.from_keyhash(stakeKey.to_raw_key().hash()),
	).to_address().to_bech32();
};
