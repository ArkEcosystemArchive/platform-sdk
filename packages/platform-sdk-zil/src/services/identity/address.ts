import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Wallet } from "@zilliqa-js/account";
import { validation } from "@zilliqa-js/zilliqa";

import { accountFromMnemonic, accountFromPrivateKey } from "../../zilliqa";

export class AddressService implements Contracts.AddressService {
	readonly #wallet: Wallet;

	public constructor(wallet: Wallet) {
		this.#wallet = wallet;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		return {
			address: (await accountFromMnemonic(this.#wallet, mnemonic, options)).bech32Address,
		};
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Contracts.AddressDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, this.fromMultiSignature.name);
	}

	public async fromPublicKey(
		publicKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, this.fromPublicKey.name);
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		return {
			address: (await accountFromPrivateKey(this.#wallet, privateKey)).bech32Address,
		};
	}

	public async fromWIF(wif: string): Promise<Contracts.AddressDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, this.fromWIF.name);
	}

	public async fromSecret(secret: string): Promise<Contracts.AddressDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}

	public async validate(address: string): Promise<boolean> {
		if (validation.isBech32(address)) {
			return true;
		}

		return validation.isAddress(address);
	}
}
