import lib from "cardano-crypto.js";

import { HARDENED_THRESHOLD, SHELLEY_COIN_PURPOSE, SHELLEY_COIN_TYPE, SHELLEY_DERIVATION_SCHEME } from "./constants";

const deriveChild = (seed: Buffer, idx: number) => lib.derivePrivate(seed, idx, SHELLEY_DERIVATION_SCHEME);

export const shelleyPath = (account: number, isChange: boolean, addrIdx: number) => [
	HARDENED_THRESHOLD + SHELLEY_COIN_PURPOSE,
	HARDENED_THRESHOLD + SHELLEY_COIN_TYPE,
	HARDENED_THRESHOLD + account,
	isChange ? 1 : 0,
	addrIdx,
];

export const shelleyStakeAccountPath = (account: number) => [
	HARDENED_THRESHOLD + SHELLEY_COIN_PURPOSE,
	HARDENED_THRESHOLD + SHELLEY_COIN_TYPE,
	HARDENED_THRESHOLD + account,
	2, // "staking key chain"
	0,
];

export const deriveNode = (path: number[], seed: Buffer) => path.reduce(deriveChild, seed);
