import createXpub from "create-xpub";
import Base, { fromExtendedKey, fromMasterSeed } from "hdkey";

const normalise = (value: string | Buffer) => (value instanceof Buffer ? value : Buffer.from(value, "hex"));

export class HDKey {
	public static fromSeed(seed: string | Buffer): Base {
		return fromMasterSeed(normalise(seed));
	}

	public static fromExtendedPublicKey(publicKey: string): Base {
		if (!publicKey.startsWith("xpub")) {
			throw new Error("The given key is not an extended public key.");
		}

		return fromExtendedKey(publicKey);
	}

	public static fromExtendedPrivateKey(privateKey: string): Base {
		if (!privateKey.startsWith("xprv")) {
			throw new Error("The given key is not an extended private key.");
		}

		return fromExtendedKey(privateKey);
	}

	public static fromCompressedPublicKey(
		publicKey: string,
		options: { depth: number; childNumber: number } = { depth: 0, childNumber: 2147483648 },
	): Base {
		return HDKey.fromExtendedPublicKey(
			createXpub({
				depth: options.depth,
				childNumber: options.childNumber, // Account 0 = 0 + 0x80000000
				chainCode: publicKey.slice(-64),
				publicKey: publicKey.slice(0, 66),
			}),
		);
	}
}
