export interface IContactAddressInput {
	coin: string;
	network: string;
	name: string;
	address: string;
}

export interface IContactAddressProps {
	id: string;
	coin: string;
	network: string;
	name: string;
	address: string;
}

export interface IContactAddress {
	id(): string;
	coin(): string;
	network(): string;
	name(): string;
	address(): string;
	avatar(): string;
	isDelegate(): boolean;
	isKnown(): boolean;
	isOwnedByExchange(): boolean;
	isOwnedByTeam(): boolean;
	isMultiSignature(): boolean;
	isSecondSignature(): boolean;
	hasSyncedWithNetwork(): boolean;
	toObject(): IContactAddressProps;
	setName(value: string): void;
	setAddress(name: string): void;
	syncIdentity(): Promise<void>;
}
