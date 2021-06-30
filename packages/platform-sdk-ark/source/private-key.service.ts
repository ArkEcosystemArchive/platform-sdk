import { Interfaces } from "@arkecosystem/crypto";
import { PrivateKey as BasePrivateKey } from "@arkecosystem/crypto-identities";
import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { abort_if, abort_unless } from "@arkecosystem/platform-sdk-support";

import { BindingType } from "./coin.contract";

@IoC.injectable()
export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	@IoC.inject(BindingType.Crypto)
	private readonly config!: Interfaces.NetworkConfig;

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			abort_unless(BIP39.validate(mnemonic), "The given value is not BIP39 compliant.");

			return {
				privateKey: BasePrivateKey.fromPassphrase(mnemonic),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromSecret(secret: string): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			abort_if(BIP39.validate(secret), "The given value is BIP39 compliant. Please use [fromMnemonic] instead.");

			return {
				privateKey: BasePrivateKey.fromPassphrase(secret),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromWIF(wif: string): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: BasePrivateKey.fromWIF(wif, this.config.network),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
