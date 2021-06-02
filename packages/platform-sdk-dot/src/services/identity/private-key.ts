import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { u8aToHex } from "@polkadot/util";
import { mnemonicToMiniSecret, naclKeypairFromSeed } from "@polkadot/util-crypto";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		return { privateKey: u8aToHex(naclKeypairFromSeed(mnemonicToMiniSecret(mnemonic)).secretKey) };
	}
}
