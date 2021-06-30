import { Coins, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import * as bitcoin from "bitcoinjs-lib";

import { getNetworkConfig } from "./config";

const pathRegex = new RegExp("^m/(\\d*)'/(\\d*)'/(\\d*)'?/?(\\d*)'?/?(\\d*)'?$");

interface Levels {
	purpose?: number;
	coinType: number;
	account?: number;
	change?: number;
	index?: number;
}

@IoC.injectable()
export class AddressFactory {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	#network!: bitcoin.networks.Network;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#network = getNetworkConfig(this.configRepository);
	}

	public pathToLevels(path: string): Levels {
		const pathParts = pathRegex.exec(path);
		if (pathParts === null) {
			throw Error("Couldn't parse hd path");
		}
		return {
			purpose: parseInt(pathParts[1]),
			coinType: this.configRepository.get(Coins.ConfigKey.Slip44),
			account: parseInt(pathParts[3]),
			change: parseInt(pathParts[4]),
			index: parseInt(pathParts[5]),
		};
	}

	public bip44(mnemonic: string, options?: Services.IdentityOptions): Services.AddressDataTransferObject {
		const levels: Levels = {
			coinType: this.configRepository.get(Coins.ConfigKey.Slip44),
			account: options?.bip44?.account,
			index: options?.bip44?.addressIndex,
		};

		return this.#derive(
			"bip44",
			levels,
			bitcoin.payments.p2pkh({
				pubkey: BIP44.deriveChild(mnemonic, levels).publicKey,
				network: this.#network,
			}),
		);
	}

	public bip49(mnemonic: string, options?: Services.IdentityOptions): Services.AddressDataTransferObject {
		const levels: Levels = {
			purpose: 49,
			coinType: this.configRepository.get(Coins.ConfigKey.Slip44),
			account: options?.bip49?.account,
			index: options?.bip49?.addressIndex,
		};

		return this.#derive(
			"bip49",
			levels,
			bitcoin.payments.p2sh({
				redeem: bitcoin.payments.p2wpkh({
					pubkey: BIP44.deriveChild(mnemonic, levels).publicKey,
					network: this.#network,
				}),
				network: this.#network,
			}),
		);
	}

	public bip84(mnemonic: string, options?: Services.IdentityOptions): Services.AddressDataTransferObject {
		const levels: Levels = {
			purpose: 84,
			coinType: this.configRepository.get(Coins.ConfigKey.Slip44),
			account: options?.bip84?.account,
			index: options?.bip84?.addressIndex,
		};

		return this.#derive(
			"bip84",
			levels,
			bitcoin.payments.p2wpkh({
				pubkey: BIP44.deriveChild(mnemonic, levels).publicKey,
				network: this.#network,
			}),
		);
	}

	public deriveAddresses(mnemonic: string, path: string): Services.AddressDataTransferObject[] {
		const levels = this.pathToLevels(path);

		let addresses: Services.AddressDataTransferObject[] = [];
		let addressIndex = 0;
		do {
			const current = this.bip44(mnemonic, {
				bip44: {
					account: levels.account || 0, // TODO this should always be non-null
					change: levels.change,
					addressIndex: addressIndex,
				},
			});
			addresses.push(current);
		} while (addressIndex++ <= (levels.index || 0));

		console.log(addresses);
		return addresses;
	}

	#derive(
		type: "bip44" | "bip49" | "bip84",
		levels: Levels,
		payment: bitcoin.payments.Payment,
	): Services.AddressDataTransferObject {
		const { address } = payment;

		if (!address) {
			throw new Error("Failed to derive an address.");
		}

		return { type, address, path: BIP44.stringify(levels) };
	}
}
