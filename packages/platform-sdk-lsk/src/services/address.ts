import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { getAddressFromPassphrase, getAddressFromPublicKey } from "@liskhq/lisk-cryptography";
import { utils } from "@liskhq/lisk-transactions";

@IoC.injectable()
export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return { type: "bip39", address: getAddressFromPassphrase(mnemonic) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return { type: "bip39", address: getAddressFromPublicKey(publicKey) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		try {
			utils.validateAddress(address);

			return true;
		} catch {
			return false;
		}
	}
}
