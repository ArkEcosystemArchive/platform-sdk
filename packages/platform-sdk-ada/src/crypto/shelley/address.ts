import lib from "cardano-crypto.js";

import { SHELLEY_DERIVATION_SCHEME } from "./constants";
import {
	derivePrivateNode,
	derivePublicNode,
	shelleyPath,
	shelleyStakeAccountPath
} from "./hdpath";

const baseAddressFromXpub = (spendXpub: Buffer, stakeXpub: Buffer, networkId: number): string => {
	const addrBuffer = lib.packBaseAddress(
		lib.getPubKeyBlake2b224Hash(spendXpub.slice(0, 32)),
		lib.getPubKeyBlake2b224Hash(stakeXpub.slice(0, 32)),
		networkId,
	);
	return lib.bech32.encode("addr", addrBuffer);
};

const generateAddress = async (
	seed: Buffer,
	accountIdx: number,
	isChange: boolean,
	networkId: number,
	addressIdx: number,
) => {
	const spendPath = shelleyPath(accountIdx, isChange, addressIdx);
	const spendXpub = derivePrivateNode(spendPath, seed).slice(64, 128);

	const stakePath = shelleyStakeAccountPath(accountIdx);
	const stakeXpub = derivePrivateNode(stakePath, seed).slice(64, 128);

	return {
		path: spendPath,
		address: baseAddressFromXpub(spendXpub, stakeXpub, networkId),
	};
};

export const addressFromMnemonic = async (
	mnemonic: string,
	accountIdx: number,
	isChange: boolean,
	addressIdx: number,
	networkId: number,
): Promise<string> => {
	const seed = await lib.mnemonicToRootKeypair(mnemonic, SHELLEY_DERIVATION_SCHEME);
	const { address } = await generateAddress(seed, accountIdx, isChange, networkId, addressIdx);

	return address;
};

export const addressFromAccountExtPublicKey = async (
	extPubKey: Buffer,
	isChange: boolean,
	addressIdx: number,
	networkId: number
): Promise<string> => {
	const spendPath = shelleyPath(0, isChange, addressIdx).slice(3);
	const spendXpub = derivePublicNode(spendPath, extPubKey);

	const stakePath = shelleyStakeAccountPath(0).slice(3);
	const stakeXpub = derivePublicNode(stakePath, extPubKey);

	return baseAddressFromXpub(spendXpub, stakeXpub, networkId);
}

export const isValidShelleyAddress = (address: string): boolean => {
	return lib.isValidShelleyAddress(address);
}
