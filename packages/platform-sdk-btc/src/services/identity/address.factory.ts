import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import * as bitcoin from "bitcoinjs-lib";

export class AddressFactory {
	readonly #config: Coins.Config;
	readonly #network: bitcoin.networks.Network;

	public constructor(config: Coins.Config, network: bitcoin.networks.Network) {
		this.#config = config;
		this.#network = network;
	}

	public bip44(mnemonic: string, options?: Contracts.IdentityOptions): Contracts.AddressDataTransferObject {
		return this.derive(
			"bip44",
			bitcoin.payments.p2pkh({
				pubkey: BIP44.deriveChild(mnemonic, {
					coinType: this.#config.get(Coins.ConfigKey.Slip44),
					account: options?.bip44?.account,
					index: options?.bip44?.addressIndex,
				}).publicKey,
				network: this.#network,
			}),
		);
	}

	public bip49(mnemonic: string, options?: Contracts.IdentityOptions): Contracts.AddressDataTransferObject {
		return this.derive(
			"bip49",
			bitcoin.payments.p2sh({
				redeem: bitcoin.payments.p2wpkh({
					pubkey: BIP44.deriveChild(mnemonic, {
						purpose: 49,
						coinType: this.#config.get(Coins.ConfigKey.Slip44),
						account: options?.bip49?.account,
						index: options?.bip49?.addressIndex,
					}).publicKey,
					network: this.#network,
				}),
				network: this.#network,
			}),
		);
	}

	public bip84(mnemonic: string, options?: Contracts.IdentityOptions): Contracts.AddressDataTransferObject {
		return this.derive(
			"bip84",
			bitcoin.payments.p2wpkh({
				pubkey: BIP44.deriveChild(mnemonic, {
					purpose: 84,
					coinType: this.#config.get(Coins.ConfigKey.Slip44),
					account: options?.bip84?.account,
					index: options?.bip84?.addressIndex,
				}).publicKey,
				network: this.#network,
			}),
		);
	}

	private derive(
		type: "bip44" | "bip49" | "bip84",
		payment: bitcoin.payments.Payment,
	): Contracts.AddressDataTransferObject {
		const { address } = payment;

		if (!address) {
			throw new Error("Failed to derive an address.");
		}

		return { type, address };
	}
}