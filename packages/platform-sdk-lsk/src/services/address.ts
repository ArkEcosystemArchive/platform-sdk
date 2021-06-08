import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import {
	getLisk32AddressFromPassphrase,
	getLisk32AddressFromPublicKey,
	validateLisk32Address,
} from "@liskhq/lisk-cryptography";

@IoC.injectable()
export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return { type: "bip39", address: getLisk32AddressFromPassphrase(mnemonic) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return { type: "bip39", address: getLisk32AddressFromPublicKey(Buffer.from(publicKey, "hex")) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		return validateLisk32Address(address);
	}
}
