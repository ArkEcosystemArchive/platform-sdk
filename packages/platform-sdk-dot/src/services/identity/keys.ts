import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { u8aToHex } from "@polkadot/util";
import { mnemonicToMiniSecret, naclKeypairFromSeed } from "@polkadot/util-crypto";

export class Keys implements Contracts.Keys {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<Contracts.KeyPair> {
		const { publicKey, secretKey } = naclKeypairFromSeed(mnemonicToMiniSecret(mnemonic));

		return { publicKey: u8aToHex(publicKey), privateKey: u8aToHex(secretKey) };
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
