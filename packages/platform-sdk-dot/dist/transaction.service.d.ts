import { Contracts, Services } from "@arkecosystem/platform-sdk";
import { ApiPromise } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
export declare class TransactionService extends Services.AbstractTransactionService {
	protected readonly client: ApiPromise;
	protected readonly keyring: Keyring;
	__destruct(): Promise<void>;
	transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData>;
}
