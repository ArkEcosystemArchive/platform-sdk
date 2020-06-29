import { Contracts } from "@arkecosystem/platform-sdk";

import { Avatar } from "./avatar";

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

	public constructor(data: ContactAddressProps, wallet: Contracts.WalletData) {
		this.#data = data;
		this.#wallet = wallet;
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
		return Avatar.make(this.#data.address);
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
