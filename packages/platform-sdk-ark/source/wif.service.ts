import { Interfaces } from "@arkecosystem/crypto";
import { WIF as BaseWIF } from "@arkecosystem/crypto-identities";
import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { abort_if, abort_unless } from "@arkecosystem/platform-sdk-support";

import { BindingType } from "./coin.contract";

@IoC.injectable()
export class WIFService extends Services.AbstractWIFService {
	@IoC.inject(BindingType.Crypto)
	private readonly config!: Interfaces.NetworkConfig;

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.WIFDataTransferObject> {
		try {
			abort_unless(BIP39.validate(mnemonic), "The given value is not BIP39 compliant.");

			return {
				wif: BaseWIF.fromPassphrase(mnemonic, this.config.network),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromSecret(secret: string): Promise<Services.WIFDataTransferObject> {
		try {
			abort_if(BIP39.validate(secret), "The given value is BIP39 compliant. Please use [fromMnemonic] instead.");

			return {
				wif: BaseWIF.fromPassphrase(secret, this.config.network),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromPrivateKey(privateKey: string): Promise<Services.WIFDataTransferObject> {
		try {
			return {
				// @ts-ignore - We don't care about having a public key for this
				wif: BaseWIF.fromKeys({ privateKey, compressed: true }, this.config.network),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
