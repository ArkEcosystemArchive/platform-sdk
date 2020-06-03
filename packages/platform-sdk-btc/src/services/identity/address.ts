import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import Bitcoin from "bitcore-lib";

import { p2pkh } from "./utils";

export class Address implements Contracts.Address {
	readonly #network: Record<string, any>;

	public constructor(network: string) {
		this.#network = Bitcoin.Networks[network];
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		return (await p2pkh(mnemonic, this.#network.name)).address!;
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		const address = new Bitcoin.Address(publicKeys, min);

		if (!address) {
			throw new Error(`Failed to derive address for [${publicKeys}].`);
		}

		return address.toString();
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		const address = Bitcoin.Address.fromPublicKey(new Bitcoin.PublicKey(publicKey), this.#network);

		if (!address) {
			throw new Error(`Failed to derive address for [${publicKey}].`);
		}

		return address.toString();
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		const address = new Bitcoin.PrivateKey(privateKey).toAddress(this.#network);

		if (!address) {
			throw new Error(`Failed to derive address for [${privateKey}].`);
		}

		return address.toString();
	}

	public async fromWIF(wif: string): Promise<string> {
		const address = Bitcoin.PrivateKey.fromWIF(wif).toAddress(this.#network);

		if (!address) {
			throw new Error(`Failed to derive address for [${wif}].`);
		}

		return address.toString();
	}

	public async validate(address: string): Promise<boolean> {
		throw new Exceptions.NotSupported(this.constructor.name, "validate");
	}
}
