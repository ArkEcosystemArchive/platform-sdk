import { Signatory } from "../signatories";
import { AddressService } from "./address.contract";
import { ExtendedAddressService } from "./extended-address.contract";
import { KeyPairService } from "./key-pair.contract";
import { PrivateKeyService } from "./private-key.contract";
import { PublicKeyService } from "./public-key.contract";
import { IdentityOptions } from "./shared.contract";
import { SignatoryService } from "./signatory.contract";
import { WIFService } from "./wif.contract";
export declare class AbstractSignatoryService implements SignatoryService {
	protected readonly addressService: AddressService;
	protected readonly extendedAddressService: ExtendedAddressService;
	protected readonly keyPairService: KeyPairService;
	protected readonly privateKeyService: PrivateKeyService;
	protected readonly publicKeyService: PublicKeyService;
	protected readonly wifService: WIFService;
	mnemonic(mnemonic: string, options?: IdentityOptions): Promise<Signatory>;
	secondaryMnemonic(signingKey: string, confirmKey: string, options?: IdentityOptions): Promise<Signatory>;
	multiMnemonic(mnemonics: string[]): Promise<Signatory>;
	wif(primary: string): Promise<Signatory>;
	secondaryWif(signingKey: string, confirmKey: string): Promise<Signatory>;
	privateKey(privateKey: string, options?: IdentityOptions): Promise<Signatory>;
	senderPublicKey(publicKey: string, options?: IdentityOptions): Promise<Signatory>;
	multiSignature(min: number, publicKeys: string[]): Promise<Signatory>;
	ledger(path: string): Promise<Signatory>;
}
