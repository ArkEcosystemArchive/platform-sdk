import { Services } from "@arkecosystem/platform-sdk";
import { Keyring } from "@polkadot/keyring";
export declare class AddressService extends Services.AbstractAddressService {
	protected readonly keyring: Keyring;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<Services.AddressDataTransferObject>;
	validate(address: string): Promise<boolean>;
}
