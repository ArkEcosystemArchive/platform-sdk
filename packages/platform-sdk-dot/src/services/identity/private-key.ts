import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { u8aToHex } from "@polkadot/util";
import { mnemonicToMiniSecret, naclKeypairFromSeed } from "@polkadot/util-crypto";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		return u8aToHex(naclKeypairFromSeed(mnemonicToMiniSecret(mnemonic)).secretKey);
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
