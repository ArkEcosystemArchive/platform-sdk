import { BigNumber } from "@arkecosystem/utils";

import { KeyValuePair } from "../types";

export interface TransactionData {
	id(): string;

	type(): number | undefined;

	typeGroup(): number | undefined;

	timestamp(): number | undefined;

	confirmations(): BigNumber;

	nonce(): BigNumber;

	sender(): string;

	recipient(): string;

	amount(): BigNumber;

	fee(): BigNumber;

	memo(): string | undefined;

	blockId(): string;

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
