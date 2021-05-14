import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { Avatar } from "../../../helpers/avatar";
import { IContactAddress, IContactAddressData, IKnownWalletService, IProfile } from "../../../contracts";
import { emitProfileChanged } from "../helpers";

export class ContactAddress implements IContactAddress {
	readonly #coin: Coins.Coin;
	readonly #profile: IProfile;
	readonly #data: IContactAddressData;
	#wallet: Contracts.WalletData | undefined;

	public constructor(data: IContactAddressData, coin: Coins.Coin, profile: IProfile) {
		this.#data = data;
		this.#coin = coin;
		this.#profile = profile;
	}

	/** {@inheritDoc IContactAddress.id} */
	public id(): string {
		return this.#data.id;
	}

	/** {@inheritDoc IContactAddress.coin} */
	public coin(): string {
		return this.#data.coin;
	}

	/** {@inheritDoc IContactAddress.network} */
	public network(): string {
		return this.#data.network;
	}

	/** {@inheritDoc IContactAddress.name} */
	public name(): string {
		return this.#data.name;
	}

	/** {@inheritDoc IContactAddress.address} */
	public address(): string {
		return this.#data.address;
	}

	/** {@inheritDoc IContactAddress.avatar} */
	public avatar(): string {
		return Avatar.make(this.address());
	}

	/** {@inheritDoc IContactAddress.isDelegate} */
	public isDelegate(): boolean {
		if (!this.#wallet) {
			throw new Error("This contact has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#wallet.isDelegate();
	}

	/** {@inheritDoc IContactAddress.isKnown} */
	public isKnown(): boolean {
		return container
			.get<IKnownWalletService>(Identifiers.KnownWalletService)
			.is(this.#coin.network().id(), this.address());
	}

	/** {@inheritDoc IContactAddress.isOwnedByExchange} */
	public isOwnedByExchange(): boolean {
		return container
			.get<IKnownWalletService>(Identifiers.KnownWalletService)
			.isExchange(this.#coin.network().id(), this.address());
	}

	/** {@inheritDoc IContactAddress.isOwnedByTeam} */
	public isOwnedByTeam(): boolean {
		return container
			.get<IKnownWalletService>(Identifiers.KnownWalletService)
			.isTeam(this.#coin.network().id(), this.address());
	}

	/** {@inheritDoc IContactAddress.isMultiSignature} */
	public isMultiSignature(): boolean {
		if (!this.#wallet) {
			throw new Error("This contact has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#wallet.isMultiSignature();
	}

	/** {@inheritDoc IContactAddress.isSecondSignature} */
	public isSecondSignature(): boolean {
		if (!this.#wallet) {
			throw new Error("This contact has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#wallet.isSecondSignature();
	}

	/** {@inheritDoc IContactAddress.hasSyncedWithNetwork} */
	public hasSyncedWithNetwork(): boolean {
		if (this.#wallet === undefined) {
			return false;
		}

		return this.#wallet.hasPassed();
	}

	/** {@inheritDoc IContactAddress.toObject} */
	public toObject(): IContactAddressData {
		return {
			id: this.id(),
			coin: this.coin(),
			network: this.network(),
			name: this.name(),
			address: this.address(),
		};
	}

	/** {@inheritDoc IContactAddress.setName} */
	public setName(value: string): void {
		this.#data.name = value;

		emitProfileChanged(this.#profile);
	}

	/** {@inheritDoc IContactAddress.setAddress} */
	public setAddress(name: string): void {
		this.#data.address = name;

		emitProfileChanged(this.#profile);
	}

	/** {@inheritDoc IContactAddress.syncIdentity} */
	public async syncIdentity(): Promise<void> {
		this.#wallet = await this.#coin.client().wallet(this.address());
	}
}
