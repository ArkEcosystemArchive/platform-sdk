import { IdentityOptions } from "./identity";
import {
	MnemonicSignatory,
	MultiMnemonicSignatory,
	MultiSignatureSignatory,
	PrivateKeySignatory,
	SecondaryMnemonicSignatory,
	SecondaryWIFSignatory,
	SenderPublicKeySignatory,
	SignatureSignatory,
	WIFSignatory,
} from "../../signatories";

export interface SignatoryService {
	__destruct(): Promise<void>;

	mnemonic(mnemonic: string, options?: IdentityOptions): Promise<MnemonicSignatory>;

	secondaryMnemonic(
		primary: string,
		secondary: string,
		options?: IdentityOptions,
	): Promise<SecondaryMnemonicSignatory>;

	multiMnemonic(mnemonics: string[]): Promise<MultiMnemonicSignatory>;

	wif(primary: string): Promise<WIFSignatory>;

	secondaryWif(primary: string, secondary: string): Promise<SecondaryWIFSignatory>;

	privateKey(privateKey: string, options?: IdentityOptions): Promise<PrivateKeySignatory>;

	signature(signature: string): Promise<SignatureSignatory>;

	senderPublicKey(publicKey: string): Promise<SenderPublicKeySignatory>;

	multiSignature(min: number, publicKeys: string[]): Promise<MultiSignatureSignatory>;
}
