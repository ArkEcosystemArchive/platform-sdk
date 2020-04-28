export interface Message {
	sign(input): SignedMessage;

	verify(input): boolean;
}

export interface SignedMessage {
	message: string;
	publicKey: string;
	signature: string;
}
