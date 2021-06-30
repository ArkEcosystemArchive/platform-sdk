import { Interfaces } from "@arkecosystem/crypto";
import { Keys as BaseKeys } from "@arkecosystem/crypto-identities";
import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { abort_if, abort_unless } from "@arkecosystem/platform-sdk-support";

import { BindingType } from "./coin.contract";

@IoC.injectable()
export class KeyPairService extends Services.AbstractKeyPairService {
	@IoC.inject(BindingType.Crypto)
	private readonly config!: Interfaces.NetworkConfig;

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		try {
			abort_unless(BIP39.validate(mnemonic), "The given value is not BIP39 compliant.");

			const { publicKey, privateKey } = BaseKeys.fromPassphrase(mnemonic, true);

			return { publicKey, privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromSecret(secret: string): Promise<Services.KeyPairDataTransferObject> {
		try {
			abort_if(BIP39.validate(secret), "The given value is BIP39 compliant. Please use [fromMnemonic] instead.");

			const { publicKey, privateKey } = BaseKeys.fromPassphrase(secret, true);

			return { publicKey, privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromWIF(wif: string): Promise<Services.KeyPairDataTransferObject> {
		try {
			const { publicKey, privateKey } = BaseKeys.fromWIF(wif, this.config.network);

			return { publicKey, privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
