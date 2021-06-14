import { Interfaces } from "@arkecosystem/crypto";
import { WIF as BaseWIF } from "@arkecosystem/crypto-identities";
import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

import { Bindings } from "./coin.contract";

@IoC.injectable()
export class WIFService extends Services.AbstractWIFService {
	@IoC.inject(Bindings.Crypto)
	private readonly config!: Interfaces.NetworkConfig;

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.WIFDataTransferObject> {
		try {
			return {
				wif: BaseWIF.fromPassphrase(mnemonic, this.config.network),
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
