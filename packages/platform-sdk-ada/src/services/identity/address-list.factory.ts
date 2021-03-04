import { Coins } from "@arkecosystem/platform-sdk";
import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

import { addressFromMnemonic, deriveAccountKey, deriveRootKey, deriveSpendKey, deriveChangeKey, deriveStakeKey, SHELLEY_COIN_TYPE } from "./shelley";

interface Address {
	index: number;
	spendAddress: string;
	changeAddress: string;
	stakeAddress: string;
	used: boolean;
}

interface Account {
	key: string;
	addresses: Address[];
}

export class AddressListFactory {
	public static make(mnemonic: string, pageSize: number) {
		const addresses: Address[] = [];

		const account0Key = deriveAccountKey(deriveRootKey(mnemonic), 0);
		const account0: Account = {
			key: Buffer.from(account0Key.as_bytes()).toString("hex"),
			addresses: [],
		};

		for (let i = 0; i < 20; ++i) {
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
