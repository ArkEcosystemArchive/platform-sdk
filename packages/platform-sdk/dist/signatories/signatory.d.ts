import { LedgerSignatory } from "./ledger";
import { MnemonicSignatory } from "./mnemonic";
import { MultiMnemonicSignatory } from "./multi-mnemonic";
import { MultiSignature, MultiSignatureSignatory } from "./multi-signature";
import { PrivateKeySignatory } from "./private-key";
import { PrivateMultiSignatureSignatory } from "./private-multi-signature";
import { SecondaryMnemonicSignatory } from "./secondary-mnemonic";
import { SecondaryWIFSignatory } from "./secondary-wif";
import { SenderPublicKeySignatory } from "./sender-public-key";
import { WIFSignatory } from "./wif";
declare type SignatoryType =
	| LedgerSignatory
	| MnemonicSignatory
	| MultiMnemonicSignatory
	| MultiSignatureSignatory
	| PrivateKeySignatory
	| PrivateMultiSignatureSignatory
	| SecondaryMnemonicSignatory
	| SecondaryWIFSignatory
	| SenderPublicKeySignatory
	| WIFSignatory;
export declare class Signatory {
	#private;
	constructor(signatory: SignatoryType);
	signingKey(): string;
	signingKeys(): string[];
	signingList(): MultiSignature;
	confirmKey(): string;
	identifier(): string;
	identifiers(): string[];
	address(): string;
	publicKey(): string;
	privateKey(): string;
	path(): string;
	actsWithMnemonic(): boolean;
	actsWithMultiMnemonic(): boolean;
	actsWithSecondaryMnemonic(): boolean;
	actsWithWif(): boolean;
	actsWithSecondaryWif(): boolean;
	actsWithPrivateKey(): boolean;
	actsWithSenderPublicKey(): boolean;
	actsWithMultiSignature(): boolean;
	actsWithPrivateMultiSignature(): boolean;
	actsWithLedger(): boolean;
}
export {};
