import { Contracts } from "@arkecosystem/platform-sdk";
import { BIP32 } from "@arkecosystem/platform-sdk-crypto";
import * as bitcoin from "bitcoinjs-lib";
import BIP84 from "bip84";

export const bip44 = async (mnemonic: string, network: string) =>
	(
		await bitcoin.payments.p2pkh({
			pubkey: BIP32.fromMnemonic(mnemonic).publicKey,
			network: network === "livenet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet,
		})
	).address;

export const bip49 = async (mnemonic: string, network: string) =>
	(
		await bitcoin.payments.p2wpkh({
			pubkey: BIP32.fromMnemonic(mnemonic).publicKey,
			network: network === "livenet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet,
		})
	).address;

export const bip84 = async (mnemonic: string, options: Contracts.IdentityOptions) => {
	const root = new BIP84.fromSeed(mnemonic);
	const rootAccount = new BIP84.fromZPrv(root.deriveAccount(options.bip84?.account || 0));

	return rootAccount.getAddress(options.bip84?.addressIndex || 0);
};
