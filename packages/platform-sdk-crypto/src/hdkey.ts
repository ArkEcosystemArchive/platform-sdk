import Base, { fromExtendedKey, fromMasterSeed } from "hdkey";

export class HDKey {
	public static fromSeed(seed: string): Base {
		return fromMasterSeed(Buffer.from(seed, 'hex'));
	}

	public static fromExtendedPublicKey(key: string): Base {
		if (!key.startsWith("xpub")) {
			throw new Error("The given key is not an extended public key.");
		}

		return fromExtendedKey(key);
	}

	public static fromExtendedPrivateKey(key: string): Base {
		if (!key.startsWith("xprv")) {
			throw new Error("The given key is not an extended private key.");
		}

		return fromExtendedKey(key);
	}
}
