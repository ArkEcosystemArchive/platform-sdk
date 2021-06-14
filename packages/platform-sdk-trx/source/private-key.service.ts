import { Coins, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";

@IoC.injectable()
export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		const { child, path } = BIP44.deriveChildWithPath(mnemonic, {
			coinType: this.configRepository.get(Coins.ConfigKey.Slip44),
			index: options?.bip44?.addressIndex,
		});

		return {
			privateKey: child.privateKey!.toString("hex"),
			path,
		};
	}
}
