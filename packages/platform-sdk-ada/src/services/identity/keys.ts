import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { deriveRootKey } from "./shelley";

export class Keys implements Contracts.Keys {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<Contracts.KeyPair> {
		try {
			const rootKey = deriveRootKey(mnemonic);

			return {
				publicKey: Buffer.from(rootKey.to_public().as_bytes()).toString("hex"),
				privateKey: Buffer.from(rootKey.to_raw_key().as_bytes()).toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
