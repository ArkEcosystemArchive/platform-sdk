import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class SignedTransactionData extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "sender");
	}

	public recipient(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "recipient");
	}

	public amount(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "amount");
	}

	public fee(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "fee");
	}

	public isMultiSignature(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isMultiSignature");
	}

	public isMultiSignatureRegistration(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isMultiSignatureRegistration");
	}

	public isMultiSignatureReady(excludeFinal = false): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isMultiSignatureReady");
	}

	public needsSignatures(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "needsSignatures");
	}

	public needsAllSignatures(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "needsAllSignatures");
	}

	public needsWalletSignature(publicKey: string): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "needsWalletSignature");
	}

	public needsFinalSignature(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "needsFinalSignature");
	}

	public getValidMultiSignatures(): string[] {
		throw new Exceptions.NotImplemented(this.constructor.name, "getValidMultiSignatures");
	}

	public remainingSignatureCount(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "remainingSignatureCount");
	}
}
