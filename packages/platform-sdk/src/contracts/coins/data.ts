import { BigNumber } from "@arkecosystem/platform-sdk-support";

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
	// Wallet
	address(): string;

	publicKey(): string | undefined;

	balance(): BigNumber;

	nonce(): BigNumber;

	// Delegate
	username(): string | undefined;

	rank(): number | undefined;

	votes(): BigNumber | undefined;

	// Flags
	isDelegate(): boolean;

	isKnown(): boolean;

	isMultiSignature(): boolean;

	isSecondSignature(): boolean;

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
