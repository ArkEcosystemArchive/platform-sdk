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

export class AddressesHelper {
	readonly #networkId: string;
	readonly #pageSize: number;
	readonly #rootKeyPair: Bip32PrivateKey;
	readonly #addressesForAccount: Account[];

	public constructor(mnemonic: string, pageSize: number = 20) {
		this.#pageSize = pageSize;
		this.#networkId = "1";
		this.#rootKeyPair = deriveRootKey(mnemonic);
		this.#addressesForAccount = [];

		const account0Key = deriveAccountKey(this.#rootKeyPair, 0);

		console.log(Buffer.from(account0Key.as_bytes()).toString("hex"), account0Key.as_bytes());
		console.log(account0Key.to_bech32());
		console.log(account0Key.to_public().to_bech32());

		const account0: Account = {
			key: Buffer.from(account0Key.as_bytes()).toString("hex"),
			addresses: [],
		};
		this.#addressesForAccount.push(account0);

		for (let i = 0; i < 20; ++i) {
			const address = {
				index: i,
				spendAddress: deriveSpendKey(account0Key, i).to_public().to_bech32(),
				changeAddress: deriveChangeKey(account0Key, i).to_bech32(),
				stakeAddress: deriveStakeKey(account0Key, i).to_bech32(),
				used: false,
			};
			account0.addresses.push(address);
		}
	}

	account(accountIndex: number): Account {
		return this.#addressesForAccount[accountIndex];
	}
}
