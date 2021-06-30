import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { getAddressFromPassphrase, getAddressFromPublicKey } from "@liskhq/lisk-cryptography";
import { utils } from "@liskhq/lisk-transactions";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { abort_if, abort_unless } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class AddressService extends Services.AbstractAddressService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			abort_unless(BIP39.validate(mnemonic), "The given value is not BIP39 compliant.");

			return { type: "bip39", address: getAddressFromPassphrase(mnemonic) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			return { type: "bip39", address: getAddressFromPublicKey(publicKey) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromSecret(secret: string): Promise<Services.AddressDataTransferObject> {
		try {
			abort_if(BIP39.validate(secret), "The given value is BIP39 compliant. Please use [fromMnemonic] instead.");

			return { type: "bip39", address: getAddressFromPassphrase(secret) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async validate(address: string): Promise<boolean> {
		try {
			utils.validateAddress(address);

			return true;
		} catch {
			return false;
		}
	}
}
