import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Keyring, decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';

export class Address implements Contracts.Address {
	readonly #config: Coins.Config;
	readonly #keyring: Keyring;

	public constructor(config: Coins.Config) {
		this.#config = config;
		this.#keyring = new Keyring({ type: 'sr25519' });
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		return this.#keyring.addFromMnemonic(mnemonic).address;
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPublicKey");
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async validate(address: string): Promise<boolean> {
		try {
			encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

			return true;
		} catch {
			return false;
		}
	}
}
