import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { deriveAddress, deriveKeypair } from "ripple-keypairs";

export class IdentityService implements Contracts.IdentityService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async address(input: Contracts.AddressInput): Promise<string> {
		if (input.passphrase) {
			return deriveAddress(deriveKeypair(input.passphrase).publicKey);
		}

		if (input.publicKey) {
			return deriveAddress(input.publicKey);
		}

		throw new Exceptions.NotImplemented(this.constructor.name, "address");
	}

	public async publicKey(input: Contracts.PublicKeyInput): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "publicKey");
	}

	public async privateKey(input: Contracts.PrivateKeyInput): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "privateKey");
	}

	public async wif(input: Contracts.WifInput): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wif");
	}

	public async keyPair(input: Contracts.KeyPairInput): Promise<Contracts.KeyPair> {
		if (input.passphrase) {
			return deriveKeypair(input.passphrase);
		}

		throw new Exceptions.NotImplemented(this.constructor.name, "keyPair");
	}
}
