import { Contracts } from "@arkecosystem/platform-sdk";
import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

import { addressFromMnemonic, deriveAccountKey, deriveRootKey, deriveSpendKey, deriveChangeKey, deriveStakeKey, SHELLEY_COIN_TYPE } from "./shelley";

export class AddressList implements Contracts.AddressList {
	public async fromMnemonic(mnemonic: string, pageSize: number): Promise<Contracts.AddressListEntry[]> {
		const accountKey = deriveAccountKey(deriveRootKey(mnemonic), 0);
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
