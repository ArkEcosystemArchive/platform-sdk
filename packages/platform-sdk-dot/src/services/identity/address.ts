import { Coins, Contracts, Services } from "@arkecosystem/platform-sdk";
import { decodeAddress, encodeAddress, Keyring } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { createKeyMulti } from "@polkadot/util-crypto";

export class AddressService extends Services.AbstractAddressService {
	readonly #keyring: Keyring;

	public constructor(config: Coins.Config) {
		super();

		this.#keyring = new Keyring({ type: "sr25519" });
		this.#keyring.setSS58Format(config.get("network.meta.networkId"));
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		return {
			type: "ss58",
			address: this.#keyring.addFromMnemonic(mnemonic).address,
		};
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Contracts.AddressDataTransferObject> {
		return {
			type: "ss58",
			address: encodeAddress(createKeyMulti(publicKeys, min), 0),
		};
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
