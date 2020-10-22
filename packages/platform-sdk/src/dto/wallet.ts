import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Entity } from "../contracts/coins";
import { KeyValuePair } from "../contracts/types";

export abstract class AbstractWalletData {
	public constructor(protected readonly data: KeyValuePair) {}

	// Wallet
	abstract address(): string;

	abstract publicKey(): string | undefined;

	abstract balance(): BigNumber;

	abstract nonce(): BigNumber;

	// Second Signature
	abstract secondPublicKey(): string | undefined;

	// Delegate
	abstract username(): string | undefined;

	abstract rank(): number | undefined;

	abstract votes(): BigNumber | undefined;

	// Entities
	abstract entities(): Entity[];

	// Flags
	abstract isDelegate(): boolean;

	abstract isKnown(): boolean;

	abstract isMultiSignature(): boolean;

	abstract isSecondSignature(): boolean;

	public toObject(): KeyValuePair {
		return {
			address: this.address(),
			publicKey: this.publicKey(),
			balance: this.balance(),
			nonce: this.nonce(),
			username: this.username(),
			rank: this.rank(),
			votes: this.votes(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}

	public hasPassed(): boolean {
		return Boolean(this.data);
	}

	public hasFailed(): boolean {
		return !this.hasPassed();
	}
}
