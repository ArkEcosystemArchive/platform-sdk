import { Interfaces } from "@arkecosystem/crypto";
import { PublicKey as BasePublicKey } from "@arkecosystem/crypto-identities";
import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { abort_if, abort_unless } from "@arkecosystem/platform-sdk-support";

import { BindingType } from "./coin.contract";

@IoC.injectable()
export class PublicKeyService extends Services.AbstractPublicKeyService {
	@IoC.inject(BindingType.Crypto)
	private readonly config!: Interfaces.NetworkConfig;

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		try {
			abort_unless(BIP39.validate(mnemonic), "The given value is not BIP39 compliant.");

			return {
				publicKey: BasePublicKey.fromPassphrase(mnemonic),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromMultiSignature(
		min: number,
		publicKeys: string[],
	): Promise<Services.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: BasePublicKey.fromMultiSignatureAsset({ min, publicKeys }),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromSecret(secret: string): Promise<Services.PublicKeyDataTransferObject> {
		try {
			abort_if(BIP39.validate(secret), "The given value is BIP39 compliant. Please use [fromMnemonic] instead.");

			return {
				publicKey: BasePublicKey.fromPassphrase(secret),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromWIF(wif: string): Promise<Services.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: BasePublicKey.fromWIF(wif, this.config.network),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
