import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";
import * as transactions from "@liskhq/lisk-transactions";

export class Address implements Contracts.Address {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			return cryptography.getAddressFromPassphrase(mnemonic);
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		try {
			return cryptography.getAddressFromPublicKey(publicKey);
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
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
