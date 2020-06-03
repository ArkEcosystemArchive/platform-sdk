import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import * as bitcoin from "bitcoinjs-lib";

export const p2pkh = async (mnemonic: string, network: string) =>
	bitcoin.payments.p2pkh({
		pubkey: BIP44.deriveMasterKey(mnemonic).publicKey,
		network: network === "livenet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet,
	});
