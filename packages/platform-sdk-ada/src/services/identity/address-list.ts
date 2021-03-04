import { Contracts } from "@arkecosystem/platform-sdk";
import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

import { addressFromMnemonic, deriveAccountKey, deriveRootKey, deriveSpendKey, deriveChangeKey, deriveStakeKey, SHELLEY_COIN_TYPE } from "./shelley";

export class AddressList implements Contracts.AddressList {
	public make(mnemonic: string, pageSize: number) {
		const addresses: Contracts.AddressListEntry[] = [];

		const account0Key = deriveAccountKey(deriveRootKey(mnemonic), 0);

		for (let i = 0; i < pageSize; ++i) {
			addresses.push({
				index: i,
				spendAddress: deriveSpendKey(account0Key, i).to_public().to_bech32(),
				changeAddress: deriveChangeKey(account0Key, i).to_bech32(),
				stakeAddress: deriveStakeKey(account0Key, i).to_bech32(),
				used: false,
			});
		}

		return addresses;
	}
}
