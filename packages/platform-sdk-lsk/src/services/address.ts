import { Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";
import * as transactions from "@liskhq/lisk-transactions";

@IoC.injectable()
export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return { type: "bip39", address: cryptography.getAddressFromPassphrase(mnemonic) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return { type: "bip39", address: cryptography.getAddressFromPublicKey(publicKey) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		try {
			transactions.utils.validateAddress(address);

			return true;
		} catch {
			return false;
		}
	}
}
