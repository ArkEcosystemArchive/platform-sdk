export interface Crypto {
	createTransfer(recipient);
	createTransferWithSecondSignature(recipient);
	createTransferWithMultiSignature(recipient);
	createTransferWithWif(recipient);
	createTransferWithLedger(recipient);

	createSecondSignature(recipient);
	createSecondSignatureWithWif(recipient);
	createSecondSignatureWithLedger(recipient);

	createVote(recipient);
	createVoteWithSecondSignature(recipient);
	createVoteWithMultiSignature(recipient);
	createVoteWithWif(recipient);
	createVoteWithLedger(recipient);
}
