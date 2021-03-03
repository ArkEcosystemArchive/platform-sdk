import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import CardanoWasm from "@emurgo/cardano-serialization-lib-nodejs";

export const HARDENED_THRESHOLD = 0x80000000;
export const SHELLEY_COIN_PURPOSE = 1852;
export const SHELLEY_COIN_TYPE = 1815;
export const SHELLEY_DERIVATION_SCHEME = 2;

const harden = (value: number): number => HARDENED_THRESHOLD + value;

const deriveAddress = (
	accountKey: CardanoWasm.Bip32PublicKey,
	isChange: boolean,
	addressIdx: number,
	networkId: string,
): string => {
	const spendKey = accountKey.derive(isChange ? 1 : 0).derive(addressIdx);
	const stakeKey = accountKey.derive(2).derive(0);

	return CardanoWasm.BaseAddress.new(
		parseInt(networkId),
		CardanoWasm.StakeCredential.from_keyhash(spendKey.to_raw_key().hash()),
		CardanoWasm.StakeCredential.from_keyhash(stakeKey.to_raw_key().hash()),
	).to_address().to_bech32();
};

export const generateRootKey = (mnemonic: string): CardanoWasm.Bip32PrivateKey => CardanoWasm.Bip32PrivateKey.from_bip39_entropy(
	  Buffer.from(BIP39.toEntropy(mnemonic), 'hex'),
	  Buffer.from('') // empty password
);

export const addressFromMnemonic = (
	mnemonic: string,
	accountIdx: number,
	isChange: boolean,
	addressIdx: number,
	networkId: string,
): string => deriveAddress(generateRootKey(mnemonic).derive(harden(SHELLEY_COIN_PURPOSE)).derive(harden(SHELLEY_COIN_TYPE)).derive(harden(accountIdx)).to_public(), isChange, addressIdx, networkId)

export const addressFromAccountExtPublicKey = (
	extPubKey: Buffer,
	isChange: boolean,
	addressIdx: number,
	networkId: string,
): string => deriveAddress(CardanoWasm.Bip32PublicKey.from_bytes(extPubKey), isChange, addressIdx, networkId);
