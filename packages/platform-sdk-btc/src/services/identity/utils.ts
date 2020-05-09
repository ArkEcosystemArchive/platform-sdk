import { Utils } from "@arkecosystem/platform-sdk";
import * as bitcoin from "bitcoinjs-lib";

export const p2pkh = async (passphrase: string, network: string) =>
	bitcoin.payments.p2pkh({
		pubkey: Utils.BIP44.deriveMasterKey(passphrase).publicKey,
		network: network === "livenet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet,
	});
