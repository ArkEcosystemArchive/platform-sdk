import { Contracts } from "@arkecosystem/platform-sdk";
import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-browser";

import { deriveAccountKey, deriveRootKey, deriveSpendKey, deriveChangeKey, deriveStakeKey } from "./shelley";

export class AddressList implements Contracts.AddressList {
	public async fromMnemonic(mnemonic: string, pageSize: number): Promise<Contracts.AddressListEntry[]> {
		return this.deriveAddresses(deriveAccountKey(deriveRootKey(mnemonic), 0), pageSize);
	}

	public async fromPrivateKey(privateKey: string, pageSize: number): Promise<Contracts.AddressListEntry[]> {
		return this.deriveAddresses(Bip32PrivateKey.from_bech32(privateKey), pageSize);
	}

	private async deriveAddresses(
		accountKey: Bip32PrivateKey,
		pageSize: number,
	): Promise<Contracts.AddressListEntry[]> {
		const addresses: Contracts.AddressListEntry[] = [];

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
