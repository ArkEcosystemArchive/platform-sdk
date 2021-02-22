import lib from "cardano-crypto.js";

import { HARDENED_THRESHOLD, SHELLEY_COIN_PURPOSE, SHELLEY_COIN_TYPE, SHELLEY_DERIVATION_SCHEME } from "./constants";

const derivePrivateChild = (seed: Buffer, idx: number) => lib.derivePrivate(seed, idx, SHELLEY_DERIVATION_SCHEME);
const derivePublicChild = (seed: Buffer, idx: number) => lib.derivePublic(seed, idx, SHELLEY_DERIVATION_SCHEME);

export const shelleyPath = (account: number, isChange: boolean, addrIdx: number): number[] => [
	HARDENED_THRESHOLD + SHELLEY_COIN_PURPOSE,
	HARDENED_THRESHOLD + SHELLEY_COIN_TYPE,
	HARDENED_THRESHOLD + account,
	isChange ? 1 : 0,
	addrIdx,
];

export const shelleyStakeAccountPath = (account: number): number[] => [
	HARDENED_THRESHOLD + SHELLEY_COIN_PURPOSE,
	HARDENED_THRESHOLD + SHELLEY_COIN_TYPE,
	HARDENED_THRESHOLD + account,
	2, // "staking key chain"
	0,
];

export const derivePrivateNode = (path: number[], seed: Buffer): Buffer => path.reduce(derivePrivateChild, seed);
export const derivePublicNode = (path: number[], seed: Buffer): Buffer => path.reduce(derivePublicChild, seed);
