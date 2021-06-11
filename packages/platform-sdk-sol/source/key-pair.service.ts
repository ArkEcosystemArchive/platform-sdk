import { Coins, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";

import { derivePrivateKey, derivePublicKey } from "./keys";

@IoC.injectable()
export class KeyPairService extends Services.AbstractKeyPairService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	private readonly configRepository!: Coins.ConfigRepository;

	#slip44!: number;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#slip44 = this.configRepository.get<number>("network.constants.slip44");
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		if (!BIP39.validate(mnemonic)) {
			throw new Exceptions.InvalidArguments(this.constructor.name, this.fromMnemonic.name);
		}

		const privateBuffer: Buffer = derivePrivateKey(
			mnemonic,
			options?.bip44?.account || 0,
			options?.bip44?.addressIndex || 0,
			this.#slip44,
		);

		return {
			publicKey: derivePublicKey(privateBuffer).toString("hex"),
			privateKey: privateBuffer.toString("hex"),
		};
	}

	public async fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject> {
		const privateBuffer: Buffer = Buffer.from(privateKey, "hex");

		return {
			publicKey: derivePublicKey(privateBuffer).toString("hex"),
			privateKey: privateBuffer.toString("hex"),
		};
	}
}
