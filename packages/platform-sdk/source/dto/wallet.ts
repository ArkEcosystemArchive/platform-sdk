/* istanbul ignore file */

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { KeyValuePair, WalletBalance } from "../contracts";
import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";

@injectable()
export class AbstractWalletData {
	protected data!: KeyValuePair;

	public constructor(data: KeyValuePair) {
		this.data = data;
	}

	public fill(data: KeyValuePair) {
		this.data = data;

		return this;
	}

	// Wallet
	public primaryKey(): string {
		throw new NotImplemented(this.constructor.name, this.primaryKey.name);
	}

	public address(): string {
		throw new NotImplemented(this.constructor.name, this.address.name);
	}

	public publicKey(): string | undefined {
		throw new NotImplemented(this.constructor.name, this.publicKey.name);
	}

	public balance(): WalletBalance {
		throw new NotImplemented(this.constructor.name, this.balance.name);
	}

	public nonce(): BigNumber {
		throw new NotImplemented(this.constructor.name, this.nonce.name);
	}

	// Second Signature
	public secondPublicKey(): string | undefined {
		throw new NotImplemented(this.constructor.name, this.secondPublicKey.name);
	}

	// Delegate
	public username(): string | undefined {
		throw new NotImplemented(this.constructor.name, this.username.name);
	}

	public rank(): number | undefined {
		throw new NotImplemented(this.constructor.name, this.rank.name);
	}

	public votes(): BigNumber | undefined {
		throw new NotImplemented(this.constructor.name, this.votes.name);
	}

	// Flags
	public isDelegate(): boolean {
		throw new NotImplemented(this.constructor.name, this.isDelegate.name);
	}

	public isResignedDelegate(): boolean {
		throw new NotImplemented(this.constructor.name, this.isResignedDelegate.name);
	}

	public isMultiSignature(): boolean {
		throw new NotImplemented(this.constructor.name, this.isMultiSignature.name);
	}

	public isSecondSignature(): boolean {
		throw new NotImplemented(this.constructor.name, this.isSecondSignature.name);
	}

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

	public toHuman(): KeyValuePair {
		const { available, fees, locked, tokens } = this.balance();

		const balance: {
			available: number;
			fees: number;
			locked?: number | undefined;
			tokens?: Record<string, number> | undefined;
		} = {
			available: available.toHuman(),
			fees: fees.toHuman(),
			locked: undefined,
			tokens: undefined,
		};

		if (locked) {
			balance.locked = locked.toHuman();
		}

		if (tokens) {
			balance.tokens = {};

			for (const [key, value] of Object.entries(tokens)) {
				balance.tokens[key] = value.toHuman();
			}
		}

		return {
			...this.toObject(),
			balance,
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
