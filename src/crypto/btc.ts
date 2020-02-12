import { Crypto } from "./contracts";

export class BtcCrypto implements Crypto {
	public createTransfer(recipient) {
		return {}; // some signed object
	}

	public createTransferWithSecondSignature(recipient) {
		throw new Error("This feature has not been implemented in BTC.");
	}

	public createTransferWithMultiSignature(recipient) {
		return {}; // some signed object
	}

	public createTransferWithWif(recipient) {
		return {}; // some signed object
	}

	public createTransferWithLedger(recipient) {
		return {}; // some signed object
	}

	public createSecondSignature(recipient) {
		throw new Error("This feature has not been implemented in BTC.");
	}

	public createSecondSignatureWithWif(recipient) {
		throw new Error("This feature has not been implemented in BTC.");
	}

	public createSecondSignatureWithLedger(recipient) {
		throw new Error("This feature has not been implemented in BTC.");
	}

	public createVote(recipient) {
		throw new Error("This feature has not been implemented in BTC.");
	}

	public createVoteWithSecondSignature(recipient) {
		throw new Error("This feature has not been implemented in BTC.");
	}

	public createVoteWithMultiSignature(recipient) {
		throw new Error("This feature has not been implemented in BTC.");
	}

	public createVoteWithWif(recipient) {
		throw new Error("This feature has not been implemented in BTC.");
	}

	public createVoteWithLedger(recipient) {
		throw new Error("This feature has not been implemented in BTC.");
	}
}
