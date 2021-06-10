import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
export declare class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	primaryKey(): string;
	address(): string;
	publicKey(): string;
	balance(): Contracts.WalletBalance;
	nonce(): BigNumber;
	secondPublicKey(): string | undefined;
	username(): string | undefined;
	rank(): number | undefined;
	votes(): BigNumber | undefined;
	multiSignature(): Contracts.WalletMultiSignature;
	isDelegate(): boolean;
	isResignedDelegate(): boolean;
	isMultiSignature(): boolean;
	isSecondSignature(): boolean;
}
