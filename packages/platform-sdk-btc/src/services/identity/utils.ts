import { BIP44 } from "@arkecosystem/platform-sdk-support";
import * as bitcoin from "bitcoinjs-lib";

export const p2pkh = async (passphrase: string, network: string) =>
	bitcoin.payments.p2pkh({
		pubkey: BIP44.deriveMasterKey(passphrase).publicKey,
		network: network === "livenet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet,
	});
