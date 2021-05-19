import { PrivateMultiSignatureSignatory } from ".";
import { ForbiddenMethodCallException } from "../exceptions";
import { MnemonicSignatory } from "./mnemonic";
import { MultiMnemonicSignatory } from "./multi-mnemonic";
import { MultiSignature, MultiSignatureSignatory } from "./multi-signature";
import { PrivateKeySignatory } from "./private-key";
import { SecondaryMnemonicSignatory } from "./secondary-mnemonic";
import { SecondaryWIFSignatory } from "./secondary-wif";
import { SenderPublicKeySignatory } from "./sender-public-key";
import { SignatureSignatory } from "./signature";
import { WIFSignatory } from "./wif";

type SignatoryType =
	| MnemonicSignatory
	| MultiMnemonicSignatory
	| SecondaryMnemonicSignatory
	| WIFSignatory
	| SecondaryWIFSignatory
	| PrivateKeySignatory
	| SignatureSignatory
	| SenderPublicKeySignatory
	| PrivateMultiSignatureSignatory
	| MultiSignatureSignatory;

export class Signatory {
	readonly #signatory: SignatoryType;

	public constructor(signatory: SignatoryType) {
		this.#signatory = signatory;
	}

	public signingKey(): string {
		if (this.#signatory instanceof MultiMnemonicSignatory) {
			throw new ForbiddenMethodCallException(this.constructor.name, "signingKey");
		}

		if (this.#signatory instanceof MultiSignatureSignatory) {
			throw new ForbiddenMethodCallException(this.constructor.name, "signingKey");
		}

		return this.#signatory.signingKey();
	}

	public signingKeys(): string[] {
		if (this.#signatory instanceof MultiMnemonicSignatory) {
			return this.#signatory.signingKeys();
		}

		if (this.#signatory instanceof PrivateMultiSignatureSignatory) {
			return this.#signatory.signingKeys();
		}

		throw new ForbiddenMethodCallException(this.constructor.name, "signingKeys");
	}

	public signingList(): MultiSignature {
		if (this.#signatory instanceof MultiSignatureSignatory) {
			return this.#signatory.signingList();
		}

		throw new ForbiddenMethodCallException(this.constructor.name, "signingList");
	}

	public confirmKey(): string {
		if (this.#signatory instanceof SecondaryMnemonicSignatory) {
			return this.#signatory.confirmKey();
		}

		if (this.#signatory instanceof SecondaryWIFSignatory) {
			return this.#signatory.confirmKey();
		}

		throw new ForbiddenMethodCallException(this.constructor.name, "confirmKey");
	}

	public identifier(): string {
		if (this.#signatory instanceof MultiMnemonicSignatory) {
			throw new ForbiddenMethodCallException(this.constructor.name, "identifier");
		}

		if (this.#signatory instanceof MultiSignatureSignatory) {
			throw new ForbiddenMethodCallException(this.constructor.name, "identifier");
		}

		if (this.#signatory instanceof PrivateMultiSignatureSignatory) {
			throw new ForbiddenMethodCallException(this.constructor.name, "identifier");
		}

		return this.#signatory.identifier();
	}

	public identifiers(): string[] {
		if (!(this.#signatory instanceof MultiMnemonicSignatory)) {
			throw new ForbiddenMethodCallException(this.constructor.name, "identifiers");
		}

		return this.#signatory.identifiers();
	}

	public actsWithMnemonic(): boolean {
		return this.#signatory instanceof MnemonicSignatory;
	}

	public actsWithMultiMnemonic(): boolean {
		return this.#signatory instanceof MultiMnemonicSignatory;
	}

	public actsWithSecondaryMnemonic(): boolean {
		return this.#signatory instanceof SecondaryMnemonicSignatory;
	}

	public actsWithWif(): boolean {
		return this.#signatory instanceof WIFSignatory;
	}

	public actsWithSecondaryWif(): boolean {
		return this.#signatory instanceof SecondaryWIFSignatory;
	}

	public actsWithPrivateKey(): boolean {
		return this.#signatory instanceof PrivateKeySignatory;
	}

	public actsWithSignature(): boolean {
		return this.#signatory instanceof SignatureSignatory;
	}

	public actsWithSenderPublicKey(): boolean {
		return this.#signatory instanceof SenderPublicKeySignatory;
	}

	public actsWithMultiSignature(): boolean {
		return this.#signatory instanceof MultiSignatureSignatory;
	}

	public actsWithPrivateMultiSignature(): boolean {
		return this.#signatory instanceof PrivateMultiSignatureSignatory;
	}
}
