/* istanbul ignore file */

import { IdentityOptions, IdentityService, SignatoryService } from "../contracts";
import { MnemonicSignatory, MultiMnemonicSignatory, MultiSignatureSignatory, PrivateKeySignatory, SecondaryMnemonicSignatory, SecondaryWIFSignatory, SenderPublicKeySignatory, SignatureSignatory, WIFSignatory } from ".";

export class AbstractSignatoryService implements SignatoryService {
	readonly #identity: IdentityService;

	public constructor(identityService: IdentityService) {
		this.#identity = identityService;
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async mnemonic(
		mnemonic: string,
		options?: IdentityOptions,
	): Promise<MnemonicSignatory> {
		return new MnemonicSignatory(
			mnemonic,
			await this.#identity.address().fromMnemonic(mnemonic, options),
		);
	}

	public async secondaryMnemonic(
		primary: string,
		secondary: string,
		options?: IdentityOptions,
	): Promise<SecondaryMnemonicSignatory> {
		return new SecondaryMnemonicSignatory(
			primary,
			secondary,
			await this.#identity.address().fromMnemonic(primary, options),
		);
	}

	public async multiMnemonic(mnemonics: string[]): Promise<MultiMnemonicSignatory> {
		return new MultiMnemonicSignatory(
			mnemonics,
			await Promise.all(mnemonics.map((mnemonic: string) => this.#identity.publicKey().fromMnemonic(mnemonic))),
		);
	}

	public async wif(primary: string): Promise<WIFSignatory> {
		return new WIFSignatory(primary, await this.#identity.address().fromWIF(primary));
	}

	public async secondaryWif(primary: string, secondary: string): Promise<SecondaryWIFSignatory> {
		return new SecondaryWIFSignatory(
			primary,
			secondary,
			await this.#identity.address().fromWIF(primary),
		);
	}

	public async privateKey(
		privateKey: string,
		options?: IdentityOptions,
	): Promise<PrivateKeySignatory> {
		return new PrivateKeySignatory(
			privateKey,
			await this.#identity.address().fromPrivateKey(privateKey, options),
		);
	}

	public async signature(signature: string, senderPublicKey: string): Promise<SignatureSignatory> {
		return new SignatureSignatory(signature, senderPublicKey);
	}

	public async senderPublicKey(
		publicKey: string,
		options?: IdentityOptions,
	): Promise<SenderPublicKeySignatory> {
		return new SenderPublicKeySignatory(
			publicKey,
			await this.#identity.address().fromPublicKey(publicKey, options),
		);
	}

	public async multiSignature(min: number, publicKeys: string[]): Promise<MultiSignatureSignatory> {
		return new MultiSignatureSignatory({ min, publicKeys });
	}
}
