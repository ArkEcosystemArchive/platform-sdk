import { Contracts } from "@arkecosystem/platform-sdk";

import { Avatar } from "./avatar";
import { Profile } from "./profile";
import { Wallet } from "./wallet";

export interface ContactAddressProps {
	id: string;
	coin: string;
	network: string;
	name: string;
	address: string;
}

export class ContactAddress {
	readonly #data: ContactAddressProps;
	readonly #wallet: Contracts.WalletData;
	readonly #avatar: string;

	private constructor(data: ContactAddressProps, wallet: Contracts.WalletData) {
		this.#data = data;
		this.#wallet = wallet;
		this.#avatar = Avatar.make(data.id);
	}

	public static async make(data: ContactAddressProps, profile: Profile): Promise<ContactAddress> {
		const wallet: Wallet = profile.wallets().findByCoinWithNetwork(data.coin, data.network)[0];

		if (!wallet) {
			throw new Error(`This profile does not contain any wallets for ${data.coin}/${data.network}.`);
		}

		return new ContactAddress(data, await wallet.wallet(data.address));
	}

	public id(): string {
		return this.#data.id;
	}

	public coin(): string {
		return this.#data.coin;
	}

	public network(): string {
		return this.#data.network;
	}

	public name(): string {
		return this.#data.name;
	}

	public address(): string {
		return this.#data.address;
	}

	public avatar(): string {
		return this.#avatar;
	}

	public isDelegate(): boolean {
		return this.#wallet.isDelegate();
	}

	public isKnown(): boolean {
		return this.#wallet.isKnown();
	}

	public isMultiSignature(): boolean {
		return this.#wallet.isMultiSignature();
	}

	public isSecondSignature(): boolean {
		return this.#wallet.isSecondSignature();
	}

	public toObject(): ContactAddressProps {
		return {
			id: this.id(),
			coin: this.coin(),
			network: this.network(),
			name: this.name(),
			address: this.address(),
		};
	}
}
