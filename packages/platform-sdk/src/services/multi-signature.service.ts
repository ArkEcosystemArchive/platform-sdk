/* istanbul ignore file */

import { SignedTransactionData } from "../contracts";
import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";
import { MultiSignatureService, MultiSignatureTransaction } from "./multi-signature.contract";

@injectable()
export class AbstractMultiSignatureService implements MultiSignatureService {
	public async allWithPendingState(publicKey: string): Promise<MultiSignatureTransaction[]> {
		throw new NotImplemented(this.constructor.name, this.allWithPendingState.name);
	}

	public async allWithReadyState(publicKey: string): Promise<MultiSignatureTransaction[]> {
		throw new NotImplemented(this.constructor.name, this.allWithReadyState.name);
	}

	public async findById(id: string): Promise<MultiSignatureTransaction> {
		throw new NotImplemented(this.constructor.name, this.findById.name);
	}

	public async broadcast(transaction: MultiSignatureTransaction): Promise<string> {
		throw new NotImplemented(this.constructor.name, this.broadcast.name);
	}

	public isMultiSignatureReady(transaction: SignedTransactionData, excludeFinal?: boolean): boolean {
		throw new NotImplemented(this.constructor.name, this.isMultiSignatureReady.name);
	}

	public needsSignatures(transaction: SignedTransactionData): boolean {
		throw new NotImplemented(this.constructor.name, this.needsSignatures.name);
	}

	public needsAllSignatures(transaction: SignedTransactionData): boolean {
		throw new NotImplemented(this.constructor.name, this.needsAllSignatures.name);
	}

	public needsWalletSignature(transaction: SignedTransactionData, publicKey: string): boolean {
		throw new NotImplemented(this.constructor.name, this.needsWalletSignature.name);
	}

	public needsFinalSignature(transaction: SignedTransactionData): boolean {
		throw new NotImplemented(this.constructor.name, this.needsFinalSignature.name);
	}

	public getValidMultiSignatures(transaction: SignedTransactionData): string[] {
		throw new NotImplemented(this.constructor.name, this.getValidMultiSignatures.name);
	}

	public remainingSignatureCount(transaction: SignedTransactionData): number {
		throw new NotImplemented(this.constructor.name, this.remainingSignatureCount.name);
	}
}
