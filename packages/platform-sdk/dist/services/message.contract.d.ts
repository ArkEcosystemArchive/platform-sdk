import { Signatory } from "../signatories";
export interface MessageService {
	sign(input: MessageInput): Promise<SignedMessage>;
	verify(input: SignedMessage): Promise<boolean>;
}
export interface SignedMessage {
	message: string;
	signatory: string;
	signature: string;
	mnemonic?: string;
}
export interface MessageInput {
	message: string;
	signatory: Signatory;
}
