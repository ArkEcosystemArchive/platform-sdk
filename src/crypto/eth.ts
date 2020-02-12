import { Crypto } from "./contracts";

export class EthCrypto implements Crypto {
	public createTransfer(recipient) {
		return {}; // some signed object
	}

	public createTransferWithSecondSignature(recipient) {
		throw new Error("This feature has not been implemented in ETH.");
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
		throw new Error("This feature has not been implemented in ETH.");
	}

	public createSecondSignatureWithWif(recipient) {
		throw new Error("This feature has not been implemented in ETH.");
	}

	public createSecondSignatureWithLedger(recipient) {
		throw new Error("This feature has not been implemented in ETH.");
	}

	public createVote(recipient) {
		throw new Error("This feature has not been implemented in ETH.");
	}

	public createVoteWithSecondSignature(recipient) {
		throw new Error("This feature has not been implemented in ETH.");
	}

	public createVoteWithMultiSignature(recipient) {
		throw new Error("This feature has not been implemented in ETH.");
	}

	public createVoteWithWif(recipient) {
		throw new Error("This feature has not been implemented in ETH.");
	}

	public createVoteWithLedger(recipient) {
		throw new Error("This feature has not been implemented in ETH.");
	}
}
