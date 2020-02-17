import { NotImplemented } from "../../exceptions";
import { Crypto } from "../contracts";

export class Bitcoin implements Crypto {
	public createTransfer(recipient) {
		throw new NotImplemented(this.constructor.name, "createTransfer");
	}

	public createTransferWithSecondSignature(recipient) {
		throw new NotImplemented(this.constructor.name, "createTransferWithSecondSignature");
	}

	public createTransferWithMultiSignature(recipient) {
		throw new NotImplemented(this.constructor.name, "createTransferWithMultiSignature");
	}

	public createTransferWithWif(recipient) {
		throw new NotImplemented(this.constructor.name, "createTransferWithWif");
	}

	public createTransferWithLedger(recipient) {
		throw new NotImplemented(this.constructor.name, "createTransferWithLedger");
	}

	public createSecondSignature(recipient) {
		throw new NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public createSecondSignatureWithWif(recipient) {
		throw new NotImplemented(this.constructor.name, "createSecondSignatureWithWif");
	}

	public createSecondSignatureWithLedger(recipient) {
		throw new NotImplemented(this.constructor.name, "createSecondSignatureWithLedger");
	}

	public createVote(recipient) {
		throw new NotImplemented(this.constructor.name, "createVote");
	}

	public createVoteWithSecondSignature(recipient) {
		throw new NotImplemented(this.constructor.name, "createVoteWithSecondSignature");
	}

	public createVoteWithMultiSignature(recipient) {
		throw new NotImplemented(this.constructor.name, "createVoteWithMultiSignature");
	}

	public createVoteWithWif(recipient) {
		throw new NotImplemented(this.constructor.name, "createVoteWithWif");
	}

	public createVoteWithLedger(recipient) {
		throw new NotImplemented(this.constructor.name, "createVoteWithLedger");
	}
}
