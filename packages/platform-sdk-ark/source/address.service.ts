import { Interfaces } from "@arkecosystem/crypto";
import { Address as BaseAddress, Keys } from "@arkecosystem/crypto-identities";
import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

import { Bindings } from "./coin.contract";

@IoC.injectable()
export class AddressService extends Services.AbstractAddressService {
	@IoC.inject(Bindings.Crypto)
	private readonly config!: Interfaces.NetworkConfig;

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return {
				type: "bip39",
				address: BaseAddress.fromPassphrase(mnemonic, this.config.network),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromMultiSignature(min: number, publicKeys: string[]): Promise<Services.AddressDataTransferObject> {
		try {
			return {
				type: "bip39",
				address: BaseAddress.fromMultiSignatureAsset({ min, publicKeys }, this.config.network),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return {
				type: "bip39",
				address: BaseAddress.fromPublicKey(publicKey, this.config.network),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromPrivateKey(
		privateKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return {
				type: "bip39",
				address: BaseAddress.fromPrivateKey(Keys.fromPrivateKey(privateKey), this.config.network),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromWIF(wif: string): Promise<Services.AddressDataTransferObject> {
		try {
			return {
				type: "bip39",
				address: BaseAddress.fromWIF(wif, this.config.network),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async validate(address: string): Promise<boolean> {
		return BaseAddress.validate(address, this.config.network);
	}
}
