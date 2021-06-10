import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { KeyValuePair, WalletBalance } from "../contracts";
export declare class AbstractWalletData {
	protected readonly data: KeyValuePair;
	constructor(data: KeyValuePair);
	primaryKey(): string;
	address(): string;
	publicKey(): string | undefined;
	balance(): WalletBalance;
	nonce(): BigNumber;
	secondPublicKey(): string | undefined;
	username(): string | undefined;
	rank(): number | undefined;
	votes(): BigNumber | undefined;
	isDelegate(): boolean;
	isResignedDelegate(): boolean;
	isMultiSignature(): boolean;
	isSecondSignature(): boolean;
	toObject(): KeyValuePair;
	raw(): KeyValuePair;
	hasPassed(): boolean;
	hasFailed(): boolean;
}
