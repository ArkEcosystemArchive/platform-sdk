import { Coins, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import * as bitcoin from "bitcoinjs-lib";

import { AddressFactory } from "./address.factory";
import { getNetworkConfig } from "./helpers";

@IoC.injectable()
export class AddressService extends Services.AbstractAddressService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	#factory!: AddressFactory;
	#network!: bitcoin.networks.Network;

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			if (options?.bip44) {
				return this.#factory.bip44(mnemonic, options);
			}

			if (options?.bip49) {
				return this.#factory.bip49(mnemonic, options);
			}

			return this.#factory.bip84(mnemonic, options);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	// @TODO: support for bip44/49/84
	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Services.AddressDataTransferObject> {
		try {
			const { address } = bitcoin.payments.p2sh({
				redeem: bitcoin.payments.p2ms({
					m: min,
					pubkeys: publicKeys.map((publicKey: string) => Buffer.from(publicKey, "hex")),
				}),
				network: this.#network,
			});

			if (!address) {
				throw new Error(`Failed to derive address for [${publicKeys}].`);
			}

			return {
				type: "bip39",
				address: address.toString(),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	// @TODO: support for bip44/49/84
	public async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			const { address } = bitcoin.payments.p2pkh({
				pubkey: bitcoin.ECPair.fromPublicKey(Buffer.from(publicKey, "hex")).publicKey,
				network: this.#network,
			});

			if (!address) {
				throw new Error(`Failed to derive address for [${publicKey}].`);
			}

			return {
				type: "bip39",
				address: address.toString(),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	// @TODO: support for bip44/49/84
	public async fromPrivateKey(
		privateKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			const { address } = bitcoin.payments.p2pkh({
				pubkey: bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, "hex")).publicKey,
				network: this.#network,
			});

			if (!address) {
				throw new Error(`Failed to derive address for [${privateKey}].`);
			}

			return {
				type: "bip39",
				address: address.toString(),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	// @TODO: support for bip44/49/84
	public async fromWIF(wif: string): Promise<Services.AddressDataTransferObject> {
		try {
			const { address } = bitcoin.payments.p2pkh({
				pubkey: bitcoin.ECPair.fromWIF(wif).publicKey,
				network: this.#network,
			});

			if (!address) {
				throw new Error(`Failed to derive address for [${wif}].`);
			}

			return {
				type: "bip39",
				address,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		return address !== undefined;
	}

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#network = getNetworkConfig(this.configRepository);
		this.#factory = new AddressFactory(this.configRepository);
	}
}
