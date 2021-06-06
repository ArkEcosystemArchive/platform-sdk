import { Coins, IoC, Services } from "@arkecosystem/platform-sdk";
import { BinTools } from "avalanche";

import { cb58Encode, keyPairFromMnemonic, useKeychain } from "./helpers";

@IoC.injectable()
export class KeyPairService extends Services.AbstractKeyPairService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		const { child, path } = keyPairFromMnemonic(this.configRepository, mnemonic, options);

		return {
			publicKey: cb58Encode(child.getPublicKey()),
			privateKey: cb58Encode(child.getPrivateKey()),
			path,
		};
	}

	public async fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject> {
		const keyPair = useKeychain(this.configRepository).importKey(BinTools.getInstance().cb58Decode(privateKey));

		return {
			publicKey: cb58Encode(keyPair.getPublicKey()),
			privateKey: cb58Encode(keyPair.getPrivateKey()),
		};
	}
}
