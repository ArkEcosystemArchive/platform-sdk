import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { u8aToHex } from "@polkadot/util";
import { mnemonicToMiniSecret, naclKeypairFromSeed } from "@polkadot/util-crypto";

export class KeyPairService extends Services.AbstractKeyPairService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		const { publicKey, secretKey } = naclKeypairFromSeed(mnemonicToMiniSecret(mnemonic));

		return { publicKey: u8aToHex(publicKey), privateKey: u8aToHex(secretKey) };
	}
}
