export interface MessageService {
	sign(input): Promise<SignedMessage>;

	verify(input): Promise<boolean>;
}

export interface SignedMessage {
	message: string;
	publicKey: string;
	signature: string;
}
