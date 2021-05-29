import { Contracts, Services } from "@arkecosystem/platform-sdk";
import { BIP32 } from "@arkecosystem/platform-sdk-crypto";
import * as bitcoin from "bitcoinjs-lib";
import BIP84 from "bip84";

// @TODO: make use of options.bip44 settings
export const bip44 = async (
	mnemonic: string,
	network: string,
	options?: Contracts.IdentityOptions,
): Promise<Contracts.AddressDataTransferObject> => {
	const { address } = bitcoin.payments.p2pkh({
		pubkey: BIP32.fromMnemonic(mnemonic).publicKey,
		network: network === "livenet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet,
	});

	if (!address) {
		throw new Error("Failed to derive an address.");
	}

	return { type: "bip44", address };
};

// @TODO: make use of options.bip49 settings
export const bip49 = async (
	mnemonic: string,
	network: string,
	options?: Contracts.IdentityOptions,
): Promise<Contracts.AddressDataTransferObject> => {
	const opts = network === "livenet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;

	const { address } = bitcoin.payments.p2sh({
		redeem: bitcoin.payments.p2wpkh({
			pubkey: BIP32.fromMnemonic(mnemonic).publicKey,
			network: opts,
		}),
		network: opts,
	});

	if (!address) {
		throw new Error("Failed to derive an address.");
	}

	return { type: "bip49", address };
};

export const bip84 = async (
	mnemonic: string,
	options: Contracts.IdentityOptions,
): Promise<Contracts.AddressDataTransferObject> => {
	const root = new BIP84.fromSeed(mnemonic);
	const rootAccount = new BIP84.fromZPrv(root.deriveAccount(options.bip84?.account || 0));

	return {
		type: "bip84",
		address: rootAccount.getAddress(options?.bip84?.addressIndex || 0),
	};
};
