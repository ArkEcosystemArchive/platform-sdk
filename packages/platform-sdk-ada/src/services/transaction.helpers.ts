import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import CardanoWasm from "@emurgo/cardano-serialization-lib-nodejs";

import { Purpose } from "./transaction.models";

const harden = (num: number): number => 0x80000000 + num;

export const createValue = (value: string): CardanoWasm.Value =>
	CardanoWasm.Value.new(CardanoWasm.BigNum.from_str(value));

export const getCip1852Account = (mnemonic: string, slip44: number): CardanoWasm.Bip32PrivateKey =>
	CardanoWasm.Bip32PrivateKey.from_bip39_entropy(Buffer.from(BIP39.toEntropy(mnemonic), "hex"), Buffer.from(""))
		.derive(harden(Purpose.CIP1852))
		.derive(harden(slip44))
		.derive(harden(0));
