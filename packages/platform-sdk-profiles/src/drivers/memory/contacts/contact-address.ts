import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { Avatar } from "../../../helpers/avatar";
import { IContactAddress, IContactAddressData, IKnownWalletService, IProfile } from "../../../contracts";
import { State } from "../../../environment/state";
import { emitProfileChanged } from "../helpers";

export class ContactAddress implements IContactAddress {
	readonly #coin: Coins.Coin;
	readonly #data: IContactAddressData;
	#wallet: Contracts.WalletData | undefined;

	private constructor(data: IContactAddressData, coin: Coins.Coin) {
		this.#data = data;
		this.#coin = coin;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public static async make(data: IContactAddressData): Promise<ContactAddress> {
		const instance: Coins.Coin = State.profile().coins().push(data.coin, data.network);

		if (!instance.hasBeenSynchronized()) {
			await instance.__construct();
		}

		const result: ContactAddress = new ContactAddress(data, instance);

		await result.syncIdentity();

		return result;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public id(): string {
		return this.#data.id;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public coin(): string {
		return this.#data.coin;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public network(): string {
		return this.#data.network;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public name(): string {
		return this.#data.name;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public address(): string {
		return this.#data.address;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public avatar(): string {
		return Avatar.make(this.address());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isDelegate(): boolean {
		if (!this.#wallet) {
			throw new Error("This contact has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#wallet.isDelegate();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isKnown(): boolean {
		return container
			.get<IKnownWalletService>(Identifiers.KnownWalletService)
			.is(this.#coin.network().id(), this.address());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isOwnedByExchange(): boolean {
		return container
			.get<IKnownWalletService>(Identifiers.KnownWalletService)
			.isExchange(this.#coin.network().id(), this.address());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isOwnedByTeam(): boolean {
		return container
			.get<IKnownWalletService>(Identifiers.KnownWalletService)
			.isTeam(this.#coin.network().id(), this.address());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isMultiSignature(): boolean {
		if (!this.#wallet) {
			throw new Error("This contact has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#wallet.isMultiSignature();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isSecondSignature(): boolean {
		if (!this.#wallet) {
			throw new Error("This contact has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#wallet.isSecondSignature();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public hasSyncedWithNetwork(): boolean {
		if (this.#wallet === undefined) {
			return false;
		}

		return this.#wallet.hasPassed();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public toObject(): IContactAddressData {
		return {
			id: this.id(),
			coin: this.coin(),
			network: this.network(),
			name: this.name(),
			address: this.address(),
		};
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public setName(value: string): void {
		this.#data.name = value;

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public setAddress(name: string): void {
		this.#data.address = name;

		emitProfileChanged();
	}
	/** {@inheritDoc IWalletFactory.generate} */
	public async syncIdentity(): Promise<void> {
		const currentWallet = this.#wallet;

		try {
			this.#wallet = await this.#coin.client().wallet(this.address());
		} catch {
			this.#wallet = currentWallet;
		}
	}
}
