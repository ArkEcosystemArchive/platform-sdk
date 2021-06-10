import { Coins } from "@arkecosystem/platform-sdk";
import { IContactAddress, IContactAddressData, IProfile } from "../../../contracts";
export declare class ContactAddress implements IContactAddress {
	#private;
	constructor(data: IContactAddressData, coin: Coins.Coin, profile: IProfile);
	/** {@inheritDoc IContactAddress.id} */
	id(): string;
	/** {@inheritDoc IContactAddress.coin} */
	coin(): string;
	/** {@inheritDoc IContactAddress.network} */
	network(): string;
	/** {@inheritDoc IContactAddress.address} */
	address(): string;
	/** {@inheritDoc IContactAddress.avatar} */
	avatar(): string;
	/** {@inheritDoc IContactAddress.isDelegate} */
	isDelegate(): boolean;
	/** {@inheritDoc IContactAddress.isKnown} */
	isKnown(): boolean;
	/** {@inheritDoc IContactAddress.isOwnedByExchange} */
	isOwnedByExchange(): boolean;
	/** {@inheritDoc IContactAddress.isOwnedByTeam} */
	isOwnedByTeam(): boolean;
	/** {@inheritDoc IContactAddress.isMultiSignature} */
	isMultiSignature(): boolean;
	/** {@inheritDoc IContactAddress.isSecondSignature} */
	isSecondSignature(): boolean;
	/** {@inheritDoc IContactAddress.hasSyncedWithNetwork} */
	hasSyncedWithNetwork(): boolean;
	/** {@inheritDoc IContactAddress.toObject} */
	toObject(): IContactAddressData;
	/** {@inheritDoc IContactAddress.setAddress} */
	setAddress(address: string): void;
	/** {@inheritDoc IContactAddress.syncIdentity} */
	syncIdentity(): Promise<void>;
}
