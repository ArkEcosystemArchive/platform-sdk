import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { decodeAddress, encodeAddress, Keyring } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { createKeyMulti } from "@polkadot/util-crypto";

export class Address implements Contracts.Address {
	readonly #keyring: Keyring;

	public constructor(config: Coins.Config) {
		this.#keyring = new Keyring({ type: "sr25519" });
		this.#keyring.setSS58Format(config.get("network.meta.networkId"));
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		return this.#keyring.addFromMnemonic(mnemonic).address;
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		return encodeAddress(createKeyMulti(publicKeys, min), 0);
	}

	public async fromPublicKey(publicKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPublicKey");
	}

	public async fromPrivateKey(privateKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
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
