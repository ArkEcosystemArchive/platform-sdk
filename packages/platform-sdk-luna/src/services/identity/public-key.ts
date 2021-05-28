import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { deriveKey } from "./helpers";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PublicKeyDataTransferObject> {
		try {
			return { publicKey: deriveKey(mnemonic).publicKey!.toString("hex") };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
