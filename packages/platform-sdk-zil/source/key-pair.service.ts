import { IoC, Services } from "@arkecosystem/platform-sdk";
import { Wallet } from "@zilliqa-js/account";

import { BindingType } from "./constants";
import { accountFromMnemonic, accountFromPrivateKey } from "./zilliqa";

@IoC.injectable()
export class KeyPairService extends Services.AbstractKeyPairService {
	@IoC.inject(BindingType.Wallet)
	private readonly wallet!: Wallet;

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		const { publicKey, privateKey } = await accountFromMnemonic(this.wallet, mnemonic, options);

		return { publicKey, privateKey };
	}

	public override async fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject> {
		const { publicKey } = await accountFromPrivateKey(this.wallet, privateKey);

		return { publicKey, privateKey };
	}
}
