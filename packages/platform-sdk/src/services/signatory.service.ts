/* istanbul ignore file */

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
} from "../signatories";
import { IdentityService } from "./identity.contract";
import { IdentityOptions } from "./shared.contract";
import { SignatoryService } from "./signatory.contract";

export class AbstractSignatoryService implements SignatoryService {
	readonly #identity: IdentityService;

	public constructor(identityService: IdentityService) {
		this.#identity = identityService;
	}

	public async mnemonic(mnemonic: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new MnemonicSignatory({
				signingKey: mnemonic,
				address: (await this.#identity.address().fromMnemonic(mnemonic, options)).address,
				publicKey: (await this.#identity.publicKey().fromMnemonic(mnemonic, options)).publicKey,
				privateKey: (await this.#identity.privateKey().fromMnemonic(mnemonic, options)).privateKey,
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
				address: (await this.#identity.address().fromMnemonic(signingKey, options)).address,
				publicKey: (await this.#identity.publicKey().fromMnemonic(signingKey, options)).publicKey,
				privateKey: (await this.#identity.privateKey().fromMnemonic(signingKey, options)).privateKey,
			}),
		);
	}

	public async multiMnemonic(mnemonics: string[]): Promise<Signatory> {
		return new Signatory(
			new MultiMnemonicSignatory(
				mnemonics,
				(
					await Promise.all(
						mnemonics.map((mnemonic: string) => this.#identity.publicKey().fromMnemonic(mnemonic)),
					)
				).map(({ publicKey }) => publicKey),
			),
		);
	}

	public async wif(primary: string): Promise<Signatory> {
		return new Signatory(
			new WIFSignatory({
				signingKey: primary,
				address: (await this.#identity.address().fromWIF(primary)).address,
				publicKey: (await this.#identity.publicKey().fromWIF(primary)).publicKey,
				privateKey: (await this.#identity.privateKey().fromWIF(primary)).privateKey,
			}),
		);
	}

	public async secondaryWif(signingKey: string, confirmKey: string): Promise<Signatory> {
		return new Signatory(
			new SecondaryWIFSignatory({
				signingKey,
				confirmKey,
				address: (await this.#identity.address().fromWIF(signingKey)).address,
				publicKey: (await this.#identity.publicKey().fromWIF(signingKey)).publicKey,
				privateKey: (await this.#identity.privateKey().fromWIF(signingKey)).privateKey,
			}),
		);
	}

	public async privateKey(privateKey: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new PrivateKeySignatory({
				signingKey: privateKey,
				address: (await this.#identity.address().fromPrivateKey(privateKey, options)).address,
			}),
		);
	}

	public async signature(signature: string, senderPublicKey: string): Promise<Signatory> {
		return new Signatory(
			new SignatureSignatory({
				signingKey: signature,
				address: (await this.#identity.address().fromPublicKey(senderPublicKey)).address,
				publicKey: senderPublicKey,
			}),
		);
	}

	public async senderPublicKey(publicKey: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new SenderPublicKeySignatory({
				signingKey: publicKey,
				address: (await this.#identity.address().fromPublicKey(publicKey, options)).address,
				publicKey,
			}),
		);
	}

	public async multiSignature(min: number, publicKeys: string[]): Promise<Signatory> {
		return new Signatory(new MultiSignatureSignatory({ min, publicKeys }));
	}
}
