import { BIP32Interface, fromBase58, fromSeed, fromPublicKey, fromPrivateKey } from "bip32";

import { BIP39 } from "./bip39";

export class BIP32 {
	public static fromMnemonic(mnemonic: string): BIP32Interface {
		mnemonic = BIP39.normalize(mnemonic);

		BIP39.validate(mnemonic);

		return fromSeed(BIP39.toSeed(mnemonic));
	}

	public static fromSeed(seed: string): BIP32Interface {
		return fromSeed(Buffer.from(seed, "hex"));
	}

	public static fromBase58(value: string): BIP32Interface {
		return fromBase58(value);
	}

	public static fromPublicKey(publicKey: string, chainCode: string): BIP32Interface {
		return fromPublicKey(Buffer.from(publicKey, "hex"), Buffer.from(chainCode, "hex"));
	}

	public static fromPrivateKey(privateKey: string, chainCode: string): BIP32Interface {
		return fromPrivateKey(Buffer.from(privateKey, "hex"), Buffer.from(chainCode, "hex"));
	}
}
