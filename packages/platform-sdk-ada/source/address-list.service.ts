import { IoC, Services } from "@arkecosystem/platform-sdk";
import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

import { deriveAccountKey, deriveChangeKey, deriveRootKey, deriveSpendKey, deriveStakeKey } from "./shelley";

@IoC.injectable()
export class ExtendedAddressService extends Services.AbstractExtendedAddressService {
	public override async fromMnemonic(
		mnemonic: string,
		pageSize: number,
	): Promise<Services.ExtendedAddressDataTransferObject[]> {
		return this.#deriveAddresses(deriveAccountKey(deriveRootKey(mnemonic), 0), pageSize);
	}

	public override async fromPrivateKey(
		privateKey: string,
		pageSize: number,
	): Promise<Services.ExtendedAddressDataTransferObject[]> {
		return this.#deriveAddresses(Bip32PrivateKey.from_bech32(privateKey), pageSize);
	}

	async #deriveAddresses(
		accountKey: Bip32PrivateKey,
		pageSize: number,
	): Promise<Services.ExtendedAddressDataTransferObject[]> {
		const addresses: Services.ExtendedAddressDataTransferObject[] = [];

		for (let i = 0; i < pageSize; ++i) {
			addresses.push({
				index: i,
				spendAddress: deriveSpendKey(accountKey, i).to_public().to_bech32(),
				changeAddress: deriveChangeKey(accountKey, i).to_bech32(),
				stakeAddress: deriveStakeKey(accountKey, i).to_bech32(),
				used: false,
			});
		}

		return addresses;
	}
}
