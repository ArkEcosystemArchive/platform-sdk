import { Signatory } from "../signatories";
import { IdentityOptions } from "./shared.contract";

export interface SignatoryService {
	mnemonic(mnemonic: string, options?: IdentityOptions): Promise<Signatory>;

	secondaryMnemonic(primary: string, secondary: string, options?: IdentityOptions): Promise<Signatory>;

	multiMnemonic(mnemonics: string[]): Promise<Signatory>;

	wif(primary: string): Promise<Signatory>;

	secondaryWif(primary: string, secondary: string): Promise<Signatory>;

	privateKey(privateKey: string, options?: IdentityOptions): Promise<Signatory>;

	signature(signature: string, senderPublicKey: string): Promise<Signatory>;

	senderPublicKey(publicKey: string, options?: IdentityOptions): Promise<Signatory>;

	multiSignature(min: number, publicKeys: string[]): Promise<Signatory>;

	ledger(path: string): Promise<Signatory>;
}
