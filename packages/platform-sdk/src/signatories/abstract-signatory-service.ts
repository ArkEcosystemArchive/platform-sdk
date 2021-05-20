/* istanbul ignore file */

import { IdentityOptions, IdentityService, SignatoryService } from "../contracts";
import {
	MnemonicSignatory,
	MultiMnemonicSignatory,
	MultiSignatureSignatory,
	PrivateKeySignatory,
	SecondaryMnemonicSignatory,
	SecondaryWIFSignatory,
	SenderPublicKeySignatory,
	Signatory,
	SignatureSignatory,
	WIFSignatory,
} from ".";

export class AbstractSignatoryService implements SignatoryService {
	readonly #identity: IdentityService;

	public constructor(identityService: IdentityService) {
		this.#identity = identityService;
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async mnemonic(mnemonic: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new MnemonicSignatory({
				signingKey: mnemonic,
				address: await this.#identity.address().fromMnemonic(mnemonic, options),
				publicKey: await this.#identity.publicKey().fromMnemonic(mnemonic, options),
				privateKey: await this.#identity.privateKey().fromMnemonic(mnemonic, options),
			}),
		);
	}

	public async secondaryMnemonic(
		signingKey: string,
		confirmKey: string,
		options?: IdentityOptions,
	): Promise<Signatory> {
		return new Signatory(
			new SecondaryMnemonicSignatory({
				signingKey,
				confirmKey,
				address: await this.#identity.address().fromMnemonic(signingKey, options),
				publicKey: await this.#identity.publicKey().fromMnemonic(signingKey, options),
				privateKey: await this.#identity.address().fromMnemonic(signingKey, options),
			}),
		);
	}

	public async multiMnemonic(mnemonics: string[]): Promise<Signatory> {
		return new Signatory(
			new MultiMnemonicSignatory(
				mnemonics,
				await Promise.all(
					mnemonics.map((mnemonic: string) => this.#identity.publicKey().fromMnemonic(mnemonic)),
				),
			),
		);
	}

	public async wif(primary: string): Promise<Signatory> {
		return new Signatory(
			new WIFSignatory({
				signingKey: primary,
				address: await this.#identity.address().fromWIF(primary),
				publicKey: await this.#identity.publicKey().fromWIF(primary),
				privateKey: await this.#identity.privateKey().fromWIF(primary),
			}),
		);
	}

	public async secondaryWif(signingKey: string, confirmKey: string): Promise<Signatory> {
		return new Signatory(
			new SecondaryWIFSignatory({
				signingKey,
				confirmKey,
				address: await this.#identity.address().fromWIF(signingKey),
				publicKey: await this.#identity.publicKey().fromWIF(signingKey),
				privateKey: await this.#identity.address().fromWIF(signingKey),
			}),
		);
	}

	public async privateKey(privateKey: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new PrivateKeySignatory({
				signingKey: privateKey,
				address: await this.#identity.address().fromPrivateKey(privateKey, options),
			}),
		);
	}

	public async signature(signature: string, senderPublicKey: string): Promise<Signatory> {
		return new Signatory(
			new SignatureSignatory({
				signingKey: signature,
				address: await this.#identity.address().fromPublicKey(senderPublicKey),
				publicKey: senderPublicKey,
			}),
		);
	}

	public async senderPublicKey(publicKey: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new SenderPublicKeySignatory({
				signingKey: publicKey,
				address: await this.#identity.address().fromPublicKey(publicKey, options),
				publicKey,
			}),
		);
	}

	public async multiSignature(min: number, publicKeys: string[]): Promise<Signatory> {
		return new Signatory(new MultiSignatureSignatory({ min, publicKeys }));
	}
}
