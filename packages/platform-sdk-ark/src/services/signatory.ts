import { Coins, Contracts, Signatories } from "@arkecosystem/platform-sdk";

import { IdentityService } from "./identity";

export class SignatoryFactory implements Contracts.SignatoryFactory {
	readonly #identity: IdentityService;

	private constructor(identityService: IdentityService) {
		this.#identity = identityService;
	}

	public static async __construct(config: Coins.Config): Promise<SignatoryFactory> {
		return new SignatoryFactory(await IdentityService.__construct(config));
	}

	public async mnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Signatories.MnemonicSignatory> {
		return new Signatories.MnemonicSignatory(
			mnemonic,
			await this.#identity.address().fromMnemonic(mnemonic, options),
		);
	}

	public async secondaryMnemonic(
		primary: string,
		secondary: string,
		options?: Contracts.IdentityOptions,
	): Promise<Signatories.SecondaryMnemonicSignatory> {
		return new Signatories.SecondaryMnemonicSignatory(
			primary,
			secondary,
			await this.#identity.address().fromMnemonic(primary, options),
		);
	}

	public async multiMnemonic(mnemonics: string[]): Promise<Signatories.MultiMnemonicSignatory> {
		return new Signatories.MultiMnemonicSignatory(
			mnemonics,
			await Promise.all(mnemonics.map((mnemonic: string) => this.#identity.publicKey().fromMnemonic(mnemonic))),
		);
	}

	public async wif(primary: string): Promise<Signatories.WIFSignatory> {
		return new Signatories.WIFSignatory(primary, await this.#identity.address().fromWIF(primary));
	}

	public async secondaryWif(primary: string, secondary: string): Promise<Signatories.SecondaryWIFSignatory> {
		return new Signatories.SecondaryWIFSignatory(
			primary,
			secondary,
			await this.#identity.address().fromWIF(primary),
		);
	}

	public async privateKey(
		privateKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Signatories.PrivateKeySignatory> {
		return new Signatories.PrivateKeySignatory(
			privateKey,
			await this.#identity.address().fromPrivateKey(privateKey, options),
		);
	}

	public async signature(signature: string): Promise<Signatories.SignatureSignatory> {
		return new Signatories.SignatureSignatory(signature);
	}

	public async senderPublicKey(publicKey: string): Promise<Signatories.SenderPublicKeySignatory> {
		return new Signatories.SenderPublicKeySignatory(publicKey);
	}

	public async multiSignature(min: number, publicKeys: string[]): Promise<Signatories.MultiSignatureSignatory> {
		return new Signatories.MultiSignatureSignatory({ min, publicKeys });
	}
}
