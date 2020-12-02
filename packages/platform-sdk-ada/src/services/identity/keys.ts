import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import lib from "cardano-crypto.js";

import { SHELLEY_DERIVATION_SCHEME } from "../../crypto/shelley/constants";

export class Keys implements Contracts.Keys {
	public async fromMnemonic(mnemonic: string): Promise<Contracts.KeyPair> {
		try {
			const rootKeyPair = await lib.mnemonicToRootKeypair(mnemonic, SHELLEY_DERIVATION_SCHEME);

			return {
				publicKey: rootKeyPair.slice(64, 128).toString("hex"),
				privateKey: rootKeyPair.slice(0, 64).toString("hex"),
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
