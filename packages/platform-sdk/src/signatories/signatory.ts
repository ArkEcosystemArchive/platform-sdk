/* istanbul ignore file */

import { ForbiddenMethodCallException } from "../exceptions";
import { AbstractDoubleSignatory } from "./abstract-double-signatory";
import { AbstractSignatory } from "./abstract-signatory";
import { AbstractValueSignatory } from "./abstract-value-signatory";
import { LedgerSignatory } from "./ledger";
import { MnemonicSignatory } from "./mnemonic";
import { MultiMnemonicSignatory } from "./multi-mnemonic";
import { MultiSignature, MultiSignatureSignatory } from "./multi-signature";
import { PrivateKeySignatory } from "./private-key";
import { PrivateMultiSignatureSignatory } from "./private-multi-signature";
import { SecondaryMnemonicSignatory } from "./secondary-mnemonic";
import { SecondaryWIFSignatory } from "./secondary-wif";
import { SenderPublicKeySignatory } from "./sender-public-key";
import { SignatureSignatory } from "./signature";
import { WIFSignatory } from "./wif";

type SignatoryType =
	| LedgerSignatory
	| MnemonicSignatory
	| MultiMnemonicSignatory
	| MultiSignatureSignatory
	| PrivateKeySignatory
	| PrivateMultiSignatureSignatory
	| SecondaryMnemonicSignatory
	| SecondaryWIFSignatory
	| SenderPublicKeySignatory
	| SignatureSignatory
	| WIFSignatory;

export class Signatory {
	readonly #signatory: SignatoryType;

	public constructor(signatory: SignatoryType) {
		this.#signatory = signatory;
	}

	public signingKey(): string {
		// @TODO: deduplicate this
		if (this.#signatory instanceof MultiMnemonicSignatory) {
			throw new ForbiddenMethodCallException(this.constructor.name, this.signingKey.name);
		}

		if (this.#signatory instanceof MultiSignatureSignatory) {
			throw new ForbiddenMethodCallException(this.constructor.name, this.signingKey.name);
		}

		return this.#signatory.signingKey();
	}

	public signingKeys(): string[] {
		// @TODO: deduplicate this
		if (this.#signatory instanceof MultiMnemonicSignatory) {
			return this.#signatory.signingKeys();
		}

		if (this.#signatory instanceof PrivateMultiSignatureSignatory) {
			return this.#signatory.signingKeys();
		}

		throw new ForbiddenMethodCallException(this.constructor.name, this.signingKeys.name);
	}

	public signingList(): MultiSignature {
		if (this.#signatory instanceof MultiSignatureSignatory) {
			return this.#signatory.signingList();
		}

		throw new ForbiddenMethodCallException(this.constructor.name, this.signingList.name);
	}

	public confirmKey(): string {
		// @TODO: deduplicate this
		if (this.#signatory instanceof SecondaryMnemonicSignatory) {
			return this.#signatory.confirmKey();
		}

		if (this.#signatory instanceof SecondaryWIFSignatory) {
			return this.#signatory.confirmKey();
		}

		throw new ForbiddenMethodCallException(this.constructor.name, this.confirmKey.name);
	}

	public identifier(): string {
		if (this.#signatory instanceof MultiSignatureSignatory) {
			return this.#signatory.identifier()!;
		}

		throw new ForbiddenMethodCallException(this.constructor.name, this.identifier.name);
	}

	public identifiers(): string[] {
		if (!(this.#signatory instanceof MultiMnemonicSignatory)) {
			throw new ForbiddenMethodCallException(this.constructor.name, this.identifiers.name);
		}

		return this.#signatory.identifiers();
	}

	public address(): string {
		// @TODO: deduplicate this
		if (this.#signatory instanceof AbstractSignatory) {
			return this.#signatory.address();
		}

		if (this.#signatory instanceof AbstractDoubleSignatory) {
			return this.#signatory.address();
		}

		if (this.#signatory instanceof AbstractValueSignatory) {
			return this.#signatory.address();
		}

		if (this.#signatory instanceof PrivateKeySignatory) {
			return this.#signatory.address();
		}

		throw new ForbiddenMethodCallException(this.constructor.name, this.address.name);
	}

	public publicKey(): string {
		// @TODO: deduplicate this
		if (this.#signatory instanceof AbstractSignatory) {
			return this.#signatory.publicKey();
		}

		if (this.#signatory instanceof AbstractDoubleSignatory) {
			return this.#signatory.publicKey();
		}

		if (this.#signatory instanceof AbstractValueSignatory) {
			return this.#signatory.publicKey();
		}

		throw new ForbiddenMethodCallException(this.constructor.name, this.publicKey.name);
	}

	public privateKey(): string {
		// @TODO: deduplicate this
		if (this.#signatory instanceof AbstractSignatory) {
			return this.#signatory.privateKey();
		}

		if (this.#signatory instanceof AbstractDoubleSignatory) {
			return this.#signatory.privateKey();
		}

		if (this.#signatory instanceof PrivateKeySignatory) {
			return this.#signatory.privateKey();
		}

		throw new ForbiddenMethodCallException(this.constructor.name, this.privateKey.name);
	}

	public path(): string {
		if (this.#signatory instanceof LedgerSignatory) {
			return this.#signatory.signingKey();
		}

		throw new ForbiddenMethodCallException(this.constructor.name, this.path.name);
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

	public actsWithLedger(): boolean {
		return this.#signatory instanceof LedgerSignatory;
	}
}
