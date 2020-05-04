export interface MessageService {
	sign(input: MessageInput): Promise<SignedMessage>;

	verify(input: SignedMessage): Promise<boolean>;
}

export interface SignedMessage {
	message: string;
	publicKey: string;
	signature: string;
}

export interface MessageInput {
	message: string;
	publicKey: string;
}
