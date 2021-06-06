import { Coins, Contracts, IoC, Services } from "@arkecosystem/platform-sdk";
import { decodeAddress, encodeAddress, Keyring } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { createKeyMulti } from "@polkadot/util-crypto";

@IoC.injectable()
export class AddressService extends Services.AbstractAddressService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	private readonly configRepository!: Coins.ConfigRepository;

	#keyring!: Keyring;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#keyring = new Keyring({ type: "sr25519" });
		this.#keyring.setSS58Format(this.configRepository.get("network.meta.networkId"));
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "ss58",
			address: this.#keyring.addFromMnemonic(mnemonic).address,
		};
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Services.AddressDataTransferObject> {
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