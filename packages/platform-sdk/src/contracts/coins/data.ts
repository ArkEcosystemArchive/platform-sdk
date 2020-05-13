import { BigNumber } from "../../utils";
import { KeyValuePair } from "../types";

export interface TransactionData {
	id(): string;

	type(): string;

	timestamp(): number | undefined;

	confirmations(): BigNumber;

	sender(): string;

	recipient(): string;

	amount(): BigNumber;

	fee(): BigNumber;

	memo(): string | undefined;

	asset(): object | undefined;

	toObject(): KeyValuePair;
}

export interface WalletData {
	address(): string;

	publicKey(): string | undefined;

	balance(): BigNumber;

	nonce(): BigNumber;

	toObject(): KeyValuePair;
}

export interface DelegateData {
	address(): string;

	publicKey(): string;

	username(): string;

	rank(): number;

	toObject(): KeyValuePair;
}

export interface PeerData {
	ip(): string;

	port(): number;

	version(): string;

	height(): number;

	latency(): number;

	toObject(): KeyValuePair;
}
