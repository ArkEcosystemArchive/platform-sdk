/* istanbul ignore file */

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { KeyValuePair, WalletBalance } from "../contracts";

export abstract class AbstractWalletData {
	public constructor(protected readonly data: KeyValuePair) {}

	// Wallet
	abstract primaryKey(): string;

	abstract address(): string;

	abstract publicKey(): string | undefined;

	abstract balance(): WalletBalance;

	abstract nonce(): BigNumber;

	// Second Signature
	abstract secondPublicKey(): string | undefined;

	// Delegate
	abstract username(): string | undefined;

	abstract rank(): number | undefined;

	abstract votes(): BigNumber | undefined;

	// Flags
	abstract isDelegate(): boolean;

	abstract isResignedDelegate(): boolean;

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
			isDelegate: this.isDelegate(),
			isResignedDelegate: this.isResignedDelegate(),
			isMultiSignature: this.isMultiSignature(),
			isSecondSignature: this.isSecondSignature(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}

	public hasPassed(): boolean {
		return Object.keys(this.data).length > 0;
	}

	public hasFailed(): boolean {
		return !this.hasPassed();
	}
}
