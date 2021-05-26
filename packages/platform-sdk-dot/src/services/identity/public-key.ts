import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { u8aToHex } from "@polkadot/util";
import { mnemonicToMiniSecret, naclKeypairFromSeed } from "@polkadot/util-crypto";

export class PublicKeyService implements Contracts.PublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PublicKeyDataTransferObject> {
		return { publicKey: u8aToHex(naclKeypairFromSeed(mnemonicToMiniSecret(mnemonic)).publicKey) };
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
