import Base, { fromExtendedKey, fromMasterSeed } from "hdkey";

const normalise = (value: string | Buffer) => value instanceof Buffer ? value : Buffer.from(value, "hex")

export class HDKey {
	public static fromSeed(seed: string | Buffer): Base {
		return fromMasterSeed(normalise(seed));
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
