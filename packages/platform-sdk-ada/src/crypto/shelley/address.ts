import lib from 'cardano-crypto.js';
import { SHELLEY_DERIVATION_SCHEME } from './constants';
import {
  shelleyPath,
  shelleyStakeAccountPath,
  deriveNode
} from './hdpath'

const baseAddressFromXpub = (
  spendXpub: Buffer,
  stakeXpub: Buffer,
  networkId: number
): string => {
  const addrBuffer = lib.packBaseAddress(
    lib.getPubKeyBlake2b224Hash(spendXpub.slice(0, 32)),
    lib.getPubKeyBlake2b224Hash(stakeXpub.slice(0, 32)),
    networkId
  )
  return lib.bech32.encode('addr', addrBuffer)
}

const ShelleyAddressGenerator = (
  seed: Buffer,
  accountIdx: number,
  isChange: boolean,
  networkId: number
) => async (addressIdx: number) => {
  const spendPath = shelleyPath(accountIdx, isChange, addressIdx)
  const spendXpub = deriveNode(spendPath, seed).slice(64, 128)
  console.log(`spendXpub ${accountIdx}: ${spendXpub.toString("hex")}\n`);

  const stakePath = shelleyStakeAccountPath(accountIdx)
  const stakeXpub = deriveNode(stakePath, seed).slice(64, 128)

  return {
    path: spendPath,
    address: baseAddressFromXpub(spendXpub, stakeXpub, networkId),
  }
}

export const ShelleyAddressFromMnemonic = async (
  mnemonic: string,
  accountIdx: number,
  isChange: boolean,
  addressIdx: number,
  networkId: number
): Promise<string> => {
  const seed = await lib.mnemonicToRootKeypair(mnemonic, SHELLEY_DERIVATION_SCHEME);
  const addGen = ShelleyAddressGenerator(seed, accountIdx, isChange, networkId)
  const { address } = await addGen(addressIdx)

  return address
}
