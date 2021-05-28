import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";
import * as transactions from "@liskhq/lisk-transactions";

export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			return { address: cryptography.getAddressFromPassphrase(mnemonic) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPublicKey(
		publicKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			return { address: cryptography.getAddressFromPublicKey(publicKey) };
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
