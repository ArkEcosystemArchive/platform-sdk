import lib from 'cardano-crypto.js';
import { HARDENED_THRESHOLD, SHELLEY_COIN_PURPOSE, SHELLEY_COIN_TYPE, SHELLEY_DERIVATION_SCHEME } from './constants';

export const shelleyPath = (
  account: number,
  isChange: boolean,
  addrIdx: number
) => {
  return [
    HARDENED_THRESHOLD + SHELLEY_COIN_PURPOSE,
    HARDENED_THRESHOLD + SHELLEY_COIN_TYPE,
    HARDENED_THRESHOLD + account,
    isChange ? 1 : 0,
    addrIdx,
  ]
}

export const shelleyStakeAccountPath = (
  account: number
) => {
  return [
    HARDENED_THRESHOLD + SHELLEY_COIN_PURPOSE,
    HARDENED_THRESHOLD + SHELLEY_COIN_TYPE,
    HARDENED_THRESHOLD + account,
    2, // "staking key chain"
    0,
  ]
}

function deriveChild(seed: Buffer, idx: number) {
  return lib.derivePrivate(seed, idx, SHELLEY_DERIVATION_SCHEME)
}

export const deriveNode = (path: number[], seed: Buffer) => {
  return path.reduce(deriveChild, seed)
}
